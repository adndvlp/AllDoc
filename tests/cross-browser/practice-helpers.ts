import {expect, test, type Page, type TestInfo} from '@playwright/test';

export const profiles = [
  {id: 'SQL', label: 'SQL', route: '/apuntes/analisis-de-datos/sql/select', seed: 'SELECT * FROM productos;',
    query: 'SELECT nombre, precio FROM productos WHERE precio > 300 ORDER BY precio DESC;',
    rows: [['Monitor', '3500'], ['Teclado', '500']], keyword: 'SELECT'},
  {id: 'PY', label: 'pandas', route: '/apuntes/analisis-de-datos/pandas/dataframe', seed: 'pd.DataFrame',
    query: 'productos[productos["precio"] > 300][["nombre", "precio"]]',
    rows: [['Teclado', '500'], ['Monitor', '3500']], keyword: 'import'},
] as const;
export type Profile = typeof profiles[number];
export const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
export const code = (page: Page, profile: Profile) => panel(page).getByRole('textbox', {name: 'Código ' + profile.label, exact: true});
export const runButton = (page: Page) => panel(page).getByRole('button', {name: 'Ejecutar', exact: true});
// CodeMirror representa cada línea como un bloque. textContent concatena sus
// límites; innerText conserva los saltos que ve y edita el usuario.
export async function expectCode(page: Page, profile: Profile, content: string) {
  await expect(code(page, profile)).toHaveText(content, {useInnerText: true});
}

export async function openPractice(page: Page, profile: Profile, waitForRuntime = true) {
  await test.step('Apunte hidratado y apertura explícita del editor', async () => {
    await page.goto(profile.route, {waitUntil: 'networkidle'});
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    await expect(page.locator('.cm-editor')).toHaveCount(0);
    await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click();
    await expect(code(page, profile)).toBeVisible();
    await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  });
  if (waitForRuntime) await ready(page, profile);
}
export async function ready(page: Page, profile: Profile) {
  await test.step('Motor real preparado: ' + profile.label, async () => {
    await expect(runButton(page)).toBeEnabled({timeout: profile.id === 'PY' ? 90_000 : 25_000});
  });
}
export async function showResults(page: Page) {
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
}
export async function expectNoExecution(page: Page) {
  await showResults(page);
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('table')).toHaveCount(0);
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
}
export async function fillCode(page: Page, profile: Profile, content: string) {
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await code(page, profile).fill(content);
  await code(page, profile).press('End');
  await expectCode(page, profile, content);
}
export async function execute(page: Page, profile: Profile, content: string) {
  await test.step('Ejecución explícita y resultado del motor', async () => {
    await fillCode(page, profile, content);
    await runButton(page).click(); await showResults(page);
    await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 15_000});
  });
}
export const completion = (page: Page, label: string) => panel(page).getByRole('option').filter({
  has: page.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')}),
});
export async function capture(page: Page, info: TestInfo, name: string) {
  await page.evaluate(() => document.fonts.ready);
  await info.attach(name, {body: await page.screenshot({animations: 'disabled', caret: 'hide'}), contentType: 'image/png'});
}
export async function codeAction(page: Page, name: string) {
  await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  await page.getByRole('region', {name: 'Opciones de código', exact: true}).getByRole('button', {name, exact: true}).click();
}
export async function searchTo(page: Page, query: string) {
  await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const dialog=page.getByRole('dialog', {name: 'Buscar en tus apuntes', exact: true});
  await dialog.getByRole('searchbox').fill(query);
  await dialog.getByRole('link').filter({hasText: query}).first().click();
}
export async function savedCode(page: Page, profile: Profile, content: string) {
  const tool=profile.id==='SQL'?'sql':'pandas', engine=profile.id==='SQL'?'sql-sqlite':'python-pandas';
  await expect.poll(()=>page.evaluate(async ({tool,engine})=>{
    const db=await new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open('alldoc-practice',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);});
    try {return await new Promise<string|undefined>((resolve,reject)=>{
      const request=db.transaction('drafts').objectStore('drafts').get(JSON.stringify(['analisis-de-datos/'+tool,engine,'productos-basico',1]));
      request.onsuccess=()=>resolve(request.result?.workspace.files[0].content); request.onerror=()=>reject(request.error);
    });} finally {db.close();}
  },{tool,engine})).toBe(content);
}
