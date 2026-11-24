import {expect, test} from '@playwright/test';

const prefix = '/apuntes/analisis-de-datos/excel';

test('excel: catálogo, referencias entre hojas, recálculo y persistencia', async ({page}) => {
  test.setTimeout(55_000);
  let requests = 0;
  page.on('request', request => {if (/alldoc-excel.*\.js|\.wasm(?:$|\?)/.test(request.url())) requests++;});
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.locator('[data-catalog-item="hojas-de-calculo"] > details > summary').click();
  await catalog.getByLabel('Excel', {exact: true}).click();
  const group = catalog.locator('[data-excel-group="agregaciones"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Agregaciones', {exact: true}).click();
  await group.getByRole('link', {name: 'SUM', exact: true}).click();
  await expect(page).toHaveURL(prefix + '/agregaciones/sum');
  expect(requests).toBe(0);
  await page.getByRole('button', {name: 'Probar este ejemplo: Sumar pedidos', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica Excel', exact: true});
  const cell = (address: string) => panel.locator(`[data-excel-cell="${address}"]`);
  const input = panel.getByRole('textbox', {name: 'Valor o fórmula', exact: true});
  await expect(cell('Scratch!A1')).toHaveText('2100', {timeout: 20_000});
  expect(requests).toBeGreaterThan(0);
  await expect(input).toHaveValue('=SUM(tSales[amount])');
  await panel.getByRole('button', {name: 'Sales', exact: true}).click();
  await cell('Sales!I2').click();
  await expect(input).toHaveValue('200');
  await input.fill('250');
  await input.press('Enter');
  await expect(cell('Sales!I2')).toHaveText('250');
  await panel.getByRole('button', {name: 'Scratch', exact: true}).click();
  await expect(cell('Scratch!A1')).toHaveText('2150');
  await expect(panel.getByText('Guardado local', {exact: true})).toBeVisible();
  await page.reload({waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Practicar Excel', exact: true}).click();
  await expect(cell('Scratch!A1')).toHaveText('2150', {timeout: 20_000});
});

test('excel: matrices dinámicas, sugerencias y scroll confinado a la cuadrícula', async ({page}) => {
  test.setTimeout(55_000);
  await page.goto(prefix + '/matrices-dinamicas/sequence-y-randarray', {waitUntil: 'networkidle'});
  const note = page.locator('[data-excel-concept]');
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(1);
  await note.getByRole('button', {name: /Probar este ejemplo/}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica Excel', exact: true});
  const cell = (address: string) => panel.locator(`[data-excel-cell="${address}"]`);
  await expect(cell('Scratch!A4')).toHaveText('16', {timeout: 20_000});
  await expect(cell('Scratch!A1')).toHaveText('10');
  const region = panel.getByRole('region', {name: 'Cuadrícula Scratch'});
  expect(await region.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(panel.getByRole('grid', {name: 'Hoja Scratch'})).toHaveCount(1);
  await expect(region).toHaveScreenshot('excel-cuadricula.png');

  await cell('Scratch!B1').click();
  const input = panel.getByRole('textbox', {name: 'Valor o fórmula', exact: true});
  await input.fill('=SU');
  await panel.getByRole('button', {name: 'SUM', exact: true}).click();
  await expect(input).toHaveValue('=SUM(');
  await input.fill('=SUM(A1:A4)');
  await panel.getByRole('button', {name: 'Aplicar', exact: true}).click();
  await expect(cell('Scratch!B1')).toHaveText('52');
  await panel.getByRole('button', {name: 'Restaurar libro', exact: true}).click();
  await expect(cell('Scratch!A4')).toBeEmpty();
});
