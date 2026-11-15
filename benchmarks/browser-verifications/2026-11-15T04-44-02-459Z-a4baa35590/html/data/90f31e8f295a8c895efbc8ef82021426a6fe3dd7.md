# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: practice-state.spec.ts >> pandas >> [PY-09] pandas: origen separado, almacenamiento, red y navegación protegidos
- Location: tests/cross-browser/practice-state.spec.ts:67:5

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true })
Expected: enabled
Received: disabled

Call log:
  - Expect "toBeEnabled" locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true }) with timeout 90000ms
  - waiting for locator('dialog[data-practice-panel]').getByRole('button', { name: 'Ejecutar', exact: true })
    8 × locator resolved to <button disabled type="button">Ejecutar</button>
      - unexpected value "disabled"
  - Test ended.

```

```yaml
- button "Ejecutar" [disabled]
```

# Test source

```ts
  1  | import {expect, test, type Page, type TestInfo} from '@playwright/test';
  2  | 
  3  | export const profiles = [
  4  |   {id: 'SQL', label: 'SQL', route: '/apuntes/analisis-de-datos/sql/select', seed: 'SELECT * FROM productos;',
  5  |     query: 'SELECT nombre, precio FROM productos WHERE precio > 300 ORDER BY precio DESC;',
  6  |     rows: [['Monitor', '3500'], ['Teclado', '500']], keyword: 'SELECT'},
  7  |   {id: 'PY', label: 'pandas', route: '/apuntes/analisis-de-datos/pandas/dataframe', seed: 'pd.DataFrame',
  8  |     query: 'productos[productos["precio"] > 300][["nombre", "precio"]]',
  9  |     rows: [['Teclado', '500'], ['Monitor', '3500']], keyword: 'import'},
  10 | ] as const;
  11 | export type Profile = typeof profiles[number];
  12 | export const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
  13 | export const code = (page: Page, profile: Profile) => panel(page).getByRole('textbox', {name: 'Código ' + profile.label, exact: true});
  14 | export const runButton = (page: Page) => panel(page).getByRole('button', {name: 'Ejecutar', exact: true});
  15 | // CodeMirror representa cada línea como un bloque. textContent concatena sus
  16 | // límites; innerText conserva los saltos que ve y edita el usuario.
  17 | export async function expectCode(page: Page, profile: Profile, content: string) {
  18 |   await expect(code(page, profile)).toHaveText(content, {useInnerText: true});
  19 | }
  20 | 
  21 | export async function openPractice(page: Page, profile: Profile, waitForRuntime = true) {
  22 |   await test.step('Apunte hidratado y apertura explícita del editor', async () => {
  23 |     await page.goto(profile.route, {waitUntil: 'networkidle'});
  24 |     await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  25 |     await expect(page.locator('.cm-editor')).toHaveCount(0);
  26 |     await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click();
  27 |     await expect(code(page, profile)).toBeVisible();
  28 |     await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  29 |   });
  30 |   if (waitForRuntime) await ready(page, profile);
  31 | }
  32 | export async function ready(page: Page, profile: Profile) {
  33 |   await test.step('Motor real preparado: ' + profile.label, async () => {
> 34 |     await expect(runButton(page)).toBeEnabled({timeout: profile.id === 'PY' ? 90_000 : 25_000});
     |                                   ^ Error: expect(locator).toBeEnabled() failed
  35 |   });
  36 | }
  37 | export async function showResults(page: Page) {
  38 |   await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  39 | }
  40 | export async function expectNoExecution(page: Page) {
  41 |   await showResults(page);
  42 |   await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  43 |   await expect(panel(page).getByRole('table')).toHaveCount(0);
  44 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  45 | }
  46 | export async function fillCode(page: Page, profile: Profile, content: string) {
  47 |   await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  48 |   await code(page, profile).fill(content);
  49 |   await code(page, profile).press('End');
  50 |   await expectCode(page, profile, content);
  51 | }
  52 | export async function execute(page: Page, profile: Profile, content: string) {
  53 |   await test.step('Ejecución explícita y resultado del motor', async () => {
  54 |     await fillCode(page, profile, content);
  55 |     await runButton(page).click(); await showResults(page);
  56 |     await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 15_000});
  57 |   });
  58 | }
  59 | export const completion = (page: Page, label: string) => panel(page).getByRole('option').filter({
  60 |   has: page.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')}),
  61 | });
  62 | export async function capture(page: Page, info: TestInfo, name: string) {
  63 |   await page.evaluate(() => document.fonts.ready);
  64 |   await info.attach(name, {body: await page.screenshot({animations: 'disabled', caret: 'hide'}), contentType: 'image/png'});
  65 | }
  66 | export async function codeAction(page: Page, name: string) {
  67 |   await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  68 |   await page.getByRole('region', {name: 'Opciones de código', exact: true}).getByRole('button', {name, exact: true}).click();
  69 | }
  70 | export async function searchTo(page: Page, query: string) {
  71 |   await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  72 |   const dialog=page.getByRole('dialog', {name: 'Buscar en tus apuntes', exact: true});
  73 |   await dialog.getByRole('searchbox').fill(query);
  74 |   await dialog.getByRole('link').filter({hasText: query}).first().click();
  75 | }
  76 | export async function savedCode(page: Page, profile: Profile, content: string) {
  77 |   const tool=profile.id==='SQL'?'sql':'pandas', engine=profile.id==='SQL'?'sql-sqlite':'python-pandas';
  78 |   await expect.poll(()=>page.evaluate(async ({tool,engine,content})=>{
  79 |     const db=await new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open('alldoc-practice',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);});
  80 |     try {return await new Promise<boolean>((resolve,reject)=>{
  81 |       const request=db.transaction('drafts').objectStore('drafts').get(JSON.stringify(['analisis-de-datos/'+tool,engine,'productos-basico',1]));
  82 |       request.onsuccess=()=>resolve(request.result?.workspace.files[0].content===content); request.onerror=()=>reject(request.error);
  83 |     });} finally {db.close();}
  84 |   },{tool,engine,content})).toBe(true);
  85 | }
  86 | 
```