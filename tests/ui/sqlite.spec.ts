import {test, expect, type Page} from '@playwright/test';

const route = '/apuntes/analisis-de-datos/sql/select';
const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
const code = (page: Page) => panel(page).getByRole('textbox', {name: 'Código SQL', exact: true});
async function open(page: Page) {
  await page.goto(route, {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  await expect(code(page)).toBeVisible();
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled();
}
async function execute(page: Page, sql: string) {
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await code(page).fill(sql); await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
}

test('consulta real: ejecutar SQL con WHERE y ORDER BY produce resultados del WASM aislado', async ({page}) => {
  await open(page);
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled();
  await execute(page, 'SELECT nombre, precio FROM productos WHERE precio > 300 ORDER BY precio DESC;');
  const table = panel(page).getByRole('table');
  await expect(table.getByRole('row')).toHaveCount(3);
  await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['Monitor', '3500']);
  await expect(table.getByRole('row').nth(2).getByRole('cell')).toHaveText(['Teclado', '500']);
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await expect(page).toHaveScreenshot('sqlite-result.png');
});

test('esquema vivo: cambios parciales aparecen en Datos y completado aunque una sentencia posterior falle', async ({page}) => {
  await open(page);
  await code(page).fill("CREATE TABLE ventas(total INTEGER); INSERT INTO ventas VALUES(7); UPDATE productos SET precio=1; SELECT * FROM no_existe;");
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('La ejecución terminó con error', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('alert')).toContainText('no_existe');
  await panel(page).getByRole('tab', {name: 'Datos', exact: true}).click();
  await expect(panel(page).getByRole('table', {name: 'Datos de ventas', exact: true})).toContainText('7');
  const products = panel(page).getByRole('table', {name: 'Datos de productos', exact: true});
  await expect(products.getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', 'Accesorios', '1']);
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await expect(page).toHaveScreenshot('sqlite-schema.png');
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await code(page).fill('SELECT * FROM ven'); await code(page).press('Control+Space');
  await expect(panel(page).getByRole('option', {name: 'ventas', exact: true})).toBeVisible();
});

test('selección: el botón ejecuta solo la selección; varios resultados, cero filas y HTML se muestran como datos', async ({page}) => {
  await open(page);
  const selection = 'SELECT 42 AS respuesta;';
  await code(page).fill(selection + '\nSELECT * FROM no_existe;');
  await code(page).press('ControlOrMeta+Home');
  for (let i = 0; i < selection.length; i++) await code(page).press('Shift+ArrowRight');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('table')).toContainText('42');
  await execute(page, "SELECT nombre FROM productos WHERE 0; SELECT '<img src=x onerror=alert(1)>' AS texto, NULL AS vacio;");
  await expect(panel(page).getByRole('table')).toHaveCount(2);
  await expect(panel(page).getByRole('table').first().getByRole('row')).toHaveCount(1);
  await expect(panel(page).getByRole('table').last()).toContainText('<img src=x onerror=alert(1)>');
  await expect(panel(page).getByRole('table').last()).toContainText('NULL');
  await expect(panel(page).locator('img')).toHaveCount(0);
});

test('aislamiento real: carga diferida, otro hostname, sin almacenamiento, red o navegación superior de la app', async ({page}) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await page.goto(route, {waitUntil: 'networkidle'});
  expect(requests.some((url) => new URL(url).port === '4174' || url.endsWith('.wasm'))).toBe(false);
  await page.evaluate(() => {localStorage.setItem('isolation-secret', 'app-only'); document.cookie = 'isolation-secret=app-only;path=/';});
  await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled();
  const element = page.locator('iframe[data-practice-runtime]');
  await expect(element).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin');
  const handle = await element.elementHandle(); const frame = (await handle!.contentFrame())!;
  expect(new URL(frame.url()).hostname).not.toBe(new URL(page.url()).hostname);
  const checks = await frame.evaluate(async (app) => {
    let parentDenied = false; let networkDenied = false; let navigationDenied = false;
    try {void parent.localStorage.getItem('isolation-secret');} catch {parentDenied = true;}
    try {await fetch(app, {credentials: 'include'});} catch {networkDenied = true;}
    try {top!.location.href = app + '/forbidden-navigation';} catch {navigationDenied = true;}
    return {parentDenied, networkDenied, navigationDenied, secret: localStorage.getItem('isolation-secret'), cookie: document.cookie};
  }, new URL(page.url()).origin);
  expect(checks).toMatchObject({parentDenied: true, networkDenied: true, navigationDenied: true, secret: null});
  expect(checks.cookie).not.toContain('app-only');
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await execute(page, 'SELECT 1 AS aislado;');
  await expect(panel(page).getByRole('table')).toContainText('1');
  expect(requests.filter((url) => url.endsWith('.wasm')).every((url) => new URL(url).hostname === new URL(frame.url()).hostname)).toBe(true);
});

test('timeout real: consulta ocupada termina en diez segundos y el borrador puede ejecutarse después', async ({page}) => {
  await open(page);
  await code(page).fill('WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n) SELECT sum(x) FROM n;');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Se alcanzó el tiempo máximo', {exact: true})).toBeVisible({timeout: 13_000});
  await expect(panel(page)).toContainText('Entorno reiniciado');
  await execute(page, 'SELECT 9 AS despues;'); await expect(panel(page).getByRole('table')).toContainText('9');
});

test('datos mutables: reiniciar conserva el código y restaura solo la sesión SQL', async ({page}) => {
  await open(page); await execute(page, 'UPDATE productos SET precio = 1; SELECT precio FROM productos;');
  await expect(panel(page).getByRole('table').getByRole('row').nth(1)).toContainText('1');
  await panel(page).getByRole('button', {name: 'Reiniciar entorno', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await expect(code(page)).toContainText('UPDATE productos SET precio = 1;');
  await execute(page, 'SELECT precio FROM productos ORDER BY precio;');
  await expect(panel(page).getByRole('table')).toContainText('250'); await expect(panel(page).getByRole('table')).toContainText('3500');
});

test('cancelación real: el Worker ocupado se detiene y permite ejecutar sin perder edición', async ({page}) => {
  await open(page);
  const infinite = 'WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n) SELECT sum(x) FROM n;';
  await code(page).fill(infinite); await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await expect(panel(page).getByRole('button', {name: 'Detener', exact: true})).toBeVisible();
  await code(page).fill('SELECT 42 AS respuesta;');
  await panel(page).getByRole('button', {name: 'Detener', exact: true}).click();
  await expect(code(page)).toHaveText('SELECT 42 AS respuesta;');
  await expect(panel(page)).toContainText('Entorno reiniciado');
  await execute(page, 'SELECT 42 AS respuesta;'); await expect(panel(page).getByRole('table')).toContainText('42');
});
