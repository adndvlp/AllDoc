import {test, expect, type Page} from '@playwright/test';

test.setTimeout(60_000);

const route = '/apuntes/analisis-de-datos/pandas/dataframe';
const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
const code = (page: Page) => panel(page).getByRole('textbox', {name: 'Código pandas', exact: true});
const option = (page: Page, label: string) => panel(page).getByRole('option').filter({
  has: page.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')}),
});
async function open(page: Page) {
  await page.goto(route, {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar pandas', exact: true}).click();
  await expect(code(page)).toBeVisible();
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
}
async function execute(page: Page, content: string) {
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click(); await code(page).fill(content);
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 25_000});
}

test('DataFrame real: pandas filtra los productos en Pyodide y conserva precio numérico', async ({page}) => {
  await open(page);
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 20_000});
  await execute(page, 'productos[productos["precio"] > 300][["nombre", "precio"]]');
  const table = panel(page).getByRole('table');
  await expect(table.getByRole('row')).toHaveCount(3);
  await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', '500']);
  await expect(table.getByRole('row').nth(2).getByRole('cell')).toHaveText(['Monitor', '3500']);
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await expect(page).toHaveScreenshot('python-result.png');
});

test('atajo durante la preparación: Ctrl+Enter respeta el botón desactivado y no deja una ejecución pendiente', async ({page}) => {
  let release!: () => void; const gate = new Promise<void>((resolve) => {release = resolve;});
  let requested = false;
  await page.route('**/frame.html', async (route) => {requested = true; await gate; await route.continue();});
  await page.goto(route, {waitUntil: 'networkidle'}); await page.getByRole('button', {name: 'Practicar pandas', exact: true}).click();
  try {
    await expect(code(page)).toBeVisible(); await expect.poll(() => requested).toBe(true);
    await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeDisabled();
    await code(page).press('ControlOrMeta+Enter');
  } finally {release();}
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Todavía no has ejecutado código.', {exact: true})).toBeVisible();
});

test('pandas vivo: variables, columnas e inspección sobreviven entre ejecuciones y reiniciar crea una VM limpia', async ({page}) => {
  await open(page);
  await execute(page, 'numero = 7\nproductos["precio"] = 1\nventas = productos[["precio"]].copy()\nproductos');
  await panel(page).getByRole('tab', {name: 'Datos', exact: true}).click();
  await expect(panel(page).getByRole('table', {name: 'Datos de ventas', exact: true})).toContainText('1');
  const table = panel(page).getByRole('table', {name: 'Datos de productos', exact: true});
  await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', 'Accesorios', '1']);
  await execute(page, 'numero + 1'); await expect(panel(page)).toContainText('8');
  await execute(page, 'pd.DataFrame = None');
  await panel(page).getByRole('button', {name: 'Reiniciar entorno', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await expect(code(page)).toHaveText('pd.DataFrame = None');
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
  await execute(page, 'productos[["precio"]]');
  await expect(panel(page).getByRole('table')).toContainText('500'); await expect(panel(page).getByRole('table')).toContainText('3500');
  await panel(page).getByRole('tab', {name: 'Datos', exact: true}).click();
  await expect(panel(page).getByRole('table', {name: 'Datos de ventas', exact: true})).toHaveCount(0);
});

test('Jedi y columnas: sugerencias reales, inserción correcta y esquema actualizado sin ejecutar para completar', async ({page}) => {
  await open(page);
  await code(page).fill('raise Exception("no ejecutar")\nimport pandas as pd\npd.Da'); await code(page).press('Control+Space');
  await expect(option(page, 'DataFrame')).toBeVisible();
  await code(page).press('Escape');
  await code(page).fill('productos["pre"]'); await code(page).press('ArrowLeft'); await code(page).press('ArrowLeft'); await code(page).press('Control+Space');
  await expect(option(page, 'precio')).toBeVisible();
  // Selección explícita: Enter tiene una protección temporal propia de CodeMirror.
  await option(page, 'precio').click(); await expect(code(page)).toHaveText('productos["precio"]');
  await execute(page, 'ventas = productos.rename(columns={"precio": "importe"})\ndel productos');
  await panel(page).getByRole('tab', {name: 'Datos', exact: true}).click();
  await expect(panel(page).getByRole('table', {name: 'Datos de ventas', exact: true})).toContainText('importe');
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await expect(page).toHaveScreenshot('python-schema.png');
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await code(page).fill('ventas["imp"]'); await code(page).press('ArrowLeft'); await code(page).press('ArrowLeft'); await code(page).press('Control+Space');
  await expect(option(page, 'importe')).toBeVisible();
  await code(page).press('Escape');
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('alert')).toHaveCount(0);
});

test('salida Python: selección, stdout, cero filas y errores seguros con archivo y línea', async ({page}) => {
  await open(page); const selected = 'productos.head(1)';
  await code(page).fill(selected + '\nraise ValueError("no seleccionado")'); await code(page).press('ControlOrMeta+Home');
  for (let i = 0; i < selected.length; i++) await code(page).press('Shift+ArrowRight');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('table').getByRole('row')).toHaveCount(2);
  await execute(page, 'import sys\nprint("salida real")\nprint("aviso real", file=sys.stderr)\nproductos.head(0)');
  await expect(panel(page)).toContainText('salida real'); await expect(panel(page)).toContainText('aviso real');
  await expect(panel(page).getByRole('table').getByRole('row')).toHaveCount(1);
  await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await code(page).fill('x = 1\nraise ValueError("<img src=x onerror=alert(1)>")');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByRole('alert')).toContainText('main.py:2:');
  await expect(panel(page).getByRole('alert')).toContainText('<img src=x onerror=alert(1)>');
  await expect(panel(page).locator('img')).toHaveCount(0);
});

test('cancelación Python: detener un bucle conserva la edición y permite ejecutar con datos iniciales', async ({page}) => {
  await open(page); await code(page).fill('productos["precio"] = 1\nwhile True:\n    pass');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await expect(panel(page).getByRole('button', {name: 'Detener', exact: true})).toBeVisible();
  await code(page).fill('productos[["precio"]]');
  await panel(page).getByRole('button', {name: 'Detener', exact: true}).click();
  await expect(code(page)).toHaveText('productos[["precio"]]'); await expect(panel(page)).toContainText('Entorno reiniciado');
  await execute(page, 'productos[["precio"]]'); await expect(panel(page).getByRole('table')).toContainText('3500');
});

test('timeout Python: el Worker ocupado termina en diez segundos y la interfaz conserva el borrador', async ({page}) => {
  await open(page); await code(page).fill('while True:\n    pass');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Se alcanzó el tiempo máximo', {exact: true})).toBeVisible({timeout: 13_000});
  await expect(panel(page)).toContainText('Entorno reiniciado');
  await execute(page, 'productos.head(1)'); await expect(panel(page).getByRole('table')).toContainText('Teclado');
});

test('aislamiento Python: carga diferida y almacenamiento de AllDoc inaccesible desde el código', async ({page}) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await page.goto(route, {waitUntil: 'networkidle'});
  expect(requests.some((url) => url.includes('/python/') || url.endsWith('.whl'))).toBe(false);
  await page.evaluate(() => localStorage.setItem('python-isolation', 'app-only'));
  await page.getByRole('button', {name: 'Practicar pandas', exact: true}).click();
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
  await code(page).fill('from js import localStorage');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('La ejecución terminó con error', {exact: true})).toBeVisible();
  await expect(panel(page).getByRole('alert')).toContainText('localStorage');
  expect(await page.evaluate(() => localStorage.getItem('python-isolation'))).toBe('app-only');
  expect(requests.filter((url) => url.endsWith('.whl')).every((url) => new URL(url).hostname === 'localhost')).toBe(true);
});

test('cambio SQL ↔ pandas: workspace compartido entre conceptos, entornos separados y borradores conservados', async ({page}) => {
  async function search(query: string, title: string) {
    await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
    const dialog = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
    await dialog.getByRole('searchbox').fill(query); await dialog.getByRole('link').filter({hasText: title}).first().click();
    await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
  }
  await page.goto('/apuntes/analisis-de-datos/sql/select', {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  const sqlCode = panel(page).getByRole('textbox', {name: 'Código SQL', exact: true});
  await expect(sqlCode).toBeVisible(); await sqlCode.fill('UPDATE productos SET precio=1; SELECT precio FROM productos;');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
  await search('WHERE', 'WHERE'); await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await sqlCode.fill('SELECT precio FROM productos;'); await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['1']);
  await search('DataFrame', 'DataFrame'); await execute(page, 'productos[["precio"]]');
  await expect(panel(page).getByRole('table')).toContainText('500');
  await search('SELECT', 'SELECT'); await panel(page).getByRole('tab', {name: 'Código', exact: true}).click();
  await expect(sqlCode).toHaveText('SELECT precio FROM productos;');
  await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
  await panel(page).getByRole('tab', {name: 'Resultados', exact: true}).click();
  await expect(panel(page).getByRole('table')).toContainText('3500');
});
