import {expect, test} from '@playwright/test';

const prefix = '/apuntes/analisis-de-datos/google-sheets';

test('google sheets: catálogo, matrices y recálculo con ventas editables y persistentes', async ({page}) => {
  test.setTimeout(55_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.locator('[data-catalog-item="hojas-de-calculo"] > details > summary').click();
  await catalog.getByLabel('Google Sheets', {exact: true}).click();
  const group = catalog.locator('[data-google-sheets-group="arrays-y-expansion"]');
  await group.getByLabel('Arrays y expansión', {exact: true}).click();
  await group.getByRole('link', {name: 'ARRAYFORMULA', exact: true}).click();
  await expect(page).toHaveURL(prefix + '/arrays-y-expansion/arrayformula');
  await page.getByRole('button', {name: 'Probar este ejemplo: Calcular importes en bloque', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica Google Sheets', exact: true});
  const cell = (address: string) => panel.locator(`[data-excel-cell="${address}"]`);
  const input = panel.getByRole('textbox', {name: 'Valor o fórmula', exact: true});
  await expect(cell('Practica!A8')).toHaveText('300', {timeout: 20_000});
  await expect(input).toHaveValue('=ARRAYFORMULA(Ventas!E2:E9*Ventas!F2:F9)');
  const region = panel.getByRole('region', {name: 'Cuadrícula Practica'});
  await expect(region).toHaveScreenshot('google-sheets-cuadricula.png');
  await panel.getByRole('button', {name: 'Ventas', exact: true}).click();
  await cell('Ventas!J2').click();
  await expect(input).toHaveValue('=E2*F2');
  await cell('Ventas!F2').click();
  await input.fill('150');
  await input.press('Enter');
  await expect(cell('Ventas!J2')).toHaveText('300');
  await panel.getByRole('button', {name: 'Practica', exact: true}).click();
  await expect(cell('Practica!A1')).toHaveText('300');
  await expect(panel.getByText('Guardado local', {exact: true})).toBeVisible();
  await page.reload({waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar Google Sheets', exact: true}).click();
  await expect(cell('Practica!A1')).toHaveText('300', {timeout: 20_000});
});

test('google sheets: QUERY conserva el ejemplo, indica el entorno y mantiene diferido el motor', async ({page}) => {
  const wasm: string[] = [];
  page.on('request', request => {if (/alldoc-excel.*\.js|\.wasm(?:$|\?)/.test(request.url())) wasm.push(request.url());});
  await page.goto(prefix + '/query/definicion', {waitUntil: 'networkidle'});
  const note = page.locator('[data-google-sheets-concept]');
  await expect(note.getByText(/QUERY\(Ventas!A1:K9/)).toBeVisible();
  await expect(note.getByText(/Practica este ejemplo en Google Sheets/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await expect(note.getByRole('link', {name: 'Descargar los datos del libro'})).toHaveAttribute('href', '/practice/google-sheets/datos.json');
  expect(wasm).toEqual([]);
});
