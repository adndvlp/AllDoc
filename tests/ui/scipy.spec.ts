import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/scipy';

test('scipy: catálogo agrupado, ventas y promedio real en el navegador', async ({page}) => {
  test.setTimeout(55_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Cálculo científico', {exact: true}).click();
  await catalog.getByLabel('SciPy', {exact: true}).click();
  const group = catalog.locator('[data-scipy-group="entorno"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('SciPy y entorno', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(base + '/entorno/definicion');

  await page.locator('[data-scipy-concept]').getByRole('button', {name: 'Probar este ejemplo: Importar estadística y obtener el promedio'}).click();
  const panel = page.locator('[data-practice-panel]');
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('stats.describe(ventas)');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 35_000});
  await expect(practiceResults(page)).toHaveCount(0);
  const sales = await selectPracticeTable(page, 'ventas');
  await expect(sales.getByRole('cell')).toHaveText(['100', '120', '120', '140', '220']);
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  await expect(results.locator('pre')).toHaveText('140.0', {useInnerText: true});
});

test('scipy: búsqueda, resultado esperado y descarga de los datos de Matrix Market', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('mmwrite');
  await search.locator(`a[href="${base}/io/matrix-market"]`).click();
  const note = page.locator('[data-scipy-concept]');
  await expect(note.getByText(/Ejecuta este ejemplo en Python local/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('[0 2]');
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/scipy/datos.py');
});
