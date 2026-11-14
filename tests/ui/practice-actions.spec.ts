import {test, expect, type Page} from '@playwright/test';

const sql = '/apuntes/analisis-de-datos/sql/select';
const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
const code = (page: Page) => panel(page).getByRole('textbox', {name: /^Código /});
const ready = (page: Page) => expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
async function action(page: Page, name: string) {
  await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  await page.getByRole('region', {name: 'Opciones de código', exact: true}).getByRole('button', {name, exact: true}).click();
}
async function open(page: Page) {
  await page.goto(sql, {waitUntil: 'networkidle'}); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click(); await ready(page);
}
async function savedCode(page: Page, content: string) {
  await expect.poll(() => page.evaluate(async (content) => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {const r = indexedDB.open('alldoc-practice', 1); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error);});
    try {return await new Promise<boolean>((resolve, reject) => {const r = db.transaction('drafts').objectStore('drafts').get(JSON.stringify(['analisis-de-datos/sql', 'sql-sqlite', 'productos-basico', 1])); r.onsuccess = () => resolve(r.result?.workspace.files[0].content === content); r.onerror = () => reject(r.error);});}
    finally {db.close();}
  }, content)).toBe(true);
}

test('ejemplo explícito: abre el editor, conserva código anterior y prepara sin ejecutar', async ({page}) => {
  await page.goto(sql, {waitUntil: 'networkidle'});
  const variant = page.locator('[data-sql-example="Columnas concretas"]');
  await variant.getByRole('button', {name: 'Probar este ejemplo: Columnas concretas', exact: true}).click();
  await expect(code(page)).toHaveText('SELECT nombre, precio FROM productos;'); await ready(page);
  await expect(code(page)).toBeFocused();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  await action(page, 'Recuperar código anterior');
  await expect(code(page)).toHaveText('SELECT * FROM productos;'); await expect(code(page)).toBeFocused();
  await expect(page.locator('dialog:modal')).toHaveCount((await panel(page).getAttribute('data-layout')) === 'modal' ? 1 : 0);
});

test('revisión anterior: persiste tras recargar y restaura la edición sin cambiar datos', async ({page}) => {
  await open(page); await code(page).fill('SELECT 42;'); await savedCode(page, 'SELECT 42;');
  await action(page, 'Restaurar código inicial'); await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await savedCode(page, 'SELECT * FROM productos;');
  await page.reload(); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click(); await ready(page);
  await action(page, 'Recuperar código anterior'); await expect(code(page)).toHaveText('SELECT 42;');
  await expect(code(page)).toBeFocused();
  await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  await expect(page.getByRole('region', {name: 'Opciones de código', exact: true}).getByRole('button', {name: 'Recuperar código anterior', exact: true})).toHaveCount(0);
  await page.keyboard.press('Escape');
});

test('restaurar código: conserva las mutaciones y el menú cabe al ampliar el texto', async ({page}) => {
  await open(page); await code(page).fill('UPDATE productos SET precio = 1;');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
  await action(page, 'Restaurar código inicial'); await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', 'Accesorios', '1']);
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  await panel(page).getByRole('button', {name: 'Opciones de código', exact: true}).click();
  const menu = page.getByRole('region', {name: 'Opciones de código', exact: true}); await expect(menu).toBeVisible();
  const rect = (await menu.boundingBox())!; const size = page.viewportSize()!;
  expect(rect.x).toBeGreaterThanOrEqual(0); expect(rect.y).toBeGreaterThanOrEqual(0);
  expect(rect.x + rect.width).toBeLessThanOrEqual(size.width + 1); expect(rect.y + rect.height).toBeLessThanOrEqual(size.height + 1);
  await expect(page).toHaveScreenshot('practice-actions.png');
  await page.keyboard.press('Escape'); await expect(menu).toBeHidden(); await expect(panel(page)).toBeVisible();
});

test('descarga fallida: mantiene el ejemplo y la edición; reintentar prepara sin ejecutar', async ({page}) => {
  await page.route('**/alldoc-sqlite.*.js', route => route.abort());
  await page.goto(sql, {waitUntil: 'networkidle'});
  await page.locator('[data-sql-example="Columnas concretas"]').getByRole('button', {name: /^Probar este ejemplo:/}).click();
  await expect(code(page)).toHaveText('SELECT nombre, precio FROM productos;');
  await expect(panel(page).getByRole('button', {name: 'Reintentar', exact: true})).toBeVisible({timeout: 15_000});
  await code(page).fill('SELECT 73;'); await savedCode(page, 'SELECT 73;');
  await page.unroute('**/alldoc-sqlite.*.js'); await panel(page).getByRole('button', {name: 'Reintentar', exact: true}).click(); await ready(page);
  await expect(code(page)).toHaveText('SELECT 73;');
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
  expect(page.frames().filter(frame => new URL(frame.url()).hostname === 'localhost')).toHaveLength(1);
});

test('almacenamiento bloqueado: backup en memoria, reintento de IndexedDB y recuperación tras recargar', async ({page}) => {
  await page.addInitScript(() => {
    if (window.top !== window) return;
    const original = window.indexedDB;
    Object.defineProperty(window, 'indexedDB', {configurable: true, get() {throw new DOMException('blocked', 'SecurityError');}});
    window.addEventListener('test-enable-practice-idb', () => Object.defineProperty(window, 'indexedDB', {configurable: true, value: original}), {once: true});
  });
  await open(page); await expect(panel(page).getByText('Guardado en esta sesión', {exact: true})).toBeVisible();
  await code(page).fill('SELECT 42;'); await code(page).press('End');
  await action(page, 'Restaurar código inicial'); await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await page.evaluate(() => window.dispatchEvent(new Event('test-enable-practice-idb')));
  await action(page, 'Reintentar guardado'); await savedCode(page, 'SELECT * FROM productos;');
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await page.reload(); await page.evaluate(() => window.dispatchEvent(new Event('test-enable-practice-idb')));
  await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click(); await ready(page);
  await action(page, 'Recuperar código anterior'); await expect(code(page)).toHaveText('SELECT 42;');
});

test('ejemplo pandas: conserva el entorno y recupera su código anterior sin ejecutar', async ({page}) => {
  test.setTimeout(60_000);
  await page.goto('/apuntes/analisis-de-datos/pandas/dataframe', {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar pandas', exact: true}).click(); await ready(page);
  const frame = page.frames().find(value => new URL(value.url()).hostname === 'localhost');
  await code(page).fill('numero = 42'); await code(page).press('End');
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  await page.getByRole('button', {name: 'Probar este ejemplo: Crear una tabla de productos', exact: true}).click();
  await expect(code(page)).toContainText('pd.DataFrame'); await ready(page); await expect(code(page)).toBeFocused();
  expect(page.frames()).toContain(frame);
  await action(page, 'Recuperar código anterior'); await expect(code(page)).toHaveText('numero = 42');
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
});

test('carga del panel fallida: reintentar conserva el ejemplo solicitado antes de tener editor', async ({page}) => {
  await page.route('**/*practice-session*.js', route => route.abort());
  await page.goto(sql, {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Probar este ejemplo: Columnas concretas', exact: true}).click();
  await expect(panel(page).getByRole('button', {name: 'Reintentar', exact: true})).toBeVisible();
  await page.unroute('**/*practice-session*.js'); await panel(page).getByRole('button', {name: 'Reintentar', exact: true}).click();
  await ready(page); await expect(code(page)).toHaveText('SELECT nombre, precio FROM productos;');
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
});
