import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/numpy';
const shape = base + '/ndarray-y-fundamentos/shape-ndim-y-size';

test('numpy: catálogo, inspección de ventas y ejecución de la ficha de shape', async ({page}) => {
  test.setTimeout(45_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Cálculo científico', {exact: true}).click();
  await catalog.getByLabel('NumPy', {exact: true}).click();
  const group = catalog.locator('[data-numpy-group="ndarray-y-fundamentos"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('ndarray y fundamentos', {exact: true}).click();
  await group.getByRole('link', {name: 'shape, ndim y size', exact: true}).click();
  await expect(page).toHaveURL(shape);

  const note = page.locator('[data-numpy-concept]');
  await note.getByRole('button', {name: 'Probar este ejemplo: Inspeccionar la matriz de ventas', exact: true}).click();
  const panel = page.locator('[data-practice-panel]');
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('ventas.shape');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 25_000});
  await expect(practiceResults(page)).toHaveCount(0);
  const sales = await selectPracticeTable(page, 'ventas');
  await expect(sales.getByRole('columnheader')).toHaveText(['T1integer', 'T2integer', 'T3integer', 'T4integer']);
  await expect(sales.getByRole('row').nth(2).getByRole('cell')).toHaveText(['150', '200', '250', '350']);
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  await openPracticeRegion(page, 'results');
  await expect(practiceResults(page).locator('pre')).toHaveText('(3, 4) 2 12', {useInnerText: true});
});

test('numpy: búsqueda encuentra memmap y la ficha distingue la práctica en Python local', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('memmap');
  await search.locator(`a[href="${base}/archivos-e-intercambio-de-datos/memmap"]`).click();
  const note = page.locator('[data-numpy-concept]');
  await expect(note.getByText(/Ejecuta este ejemplo en Python local/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado en NumPy 2.3.5', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('[150 200 250 350]');
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/numpy/datos.py');
});
