import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/seaborn';

test('seaborn: catálogo agrupado, ventas por sucursal y dispersión visible', async ({page}) => {
  test.setTimeout(65_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.locator('[data-catalog-item="visualizacion"] > details > summary').click();
  await catalog.getByLabel('Seaborn', {exact: true}).click();
  const group = catalog.locator('[data-seaborn-group="introduccion"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Introducción y entorno', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(base + '/introduccion/definicion');

  await page.locator('[data-seaborn-concept]').getByRole('button', {name: 'Probar este ejemplo: Dibujar ventas frente a inversión', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica Seaborn', exact: true});
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 40_000});
  const sales = await selectPracticeTable(page, 'ventas');
  await expect(sales.getByRole('row')).toHaveCount(17);
  await expect(sales.getByRole('row').nth(1).getByRole('cell')).toHaveText(['2026-09-01T00:00:00', 'N1', 'Norte', 'Online', '100', '24', '11', '4', '0']);
  await expect(practiceResults(page)).toHaveCount(0);

  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  const plot = results.getByRole('img', {name: 'Gráfica 1', exact: true});
  await expect.poll(() => plot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await plot.scrollIntoViewIfNeeded();
  await expect(plot).toBeInViewport({ratio: 0.99});
  await expect(plot).toHaveScreenshot('seaborn-result.png');
});

test('seaborn: Objects muestra la gráfica y exporta el PNG generado', async ({page}) => {
  test.setTimeout(65_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('exportar gráfico declarativo');
  await search.locator(`a[href="${base}/objects-composicion/show-save-y-on"]`).click();
  await page.locator('[data-seaborn-concept]').getByRole('button', {name: 'Probar este ejemplo: Exportar gráfico declarativo', exact: true}).click();
  const run = page.getByRole('dialog', {name: 'Práctica Seaborn', exact: true}).getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 40_000});
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  await expect(results.getByRole('status')).toHaveText('Ejecución completada');
  const plot = results.getByRole('img');
  await expect.poll(() => plot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  const [download] = await Promise.all([
    page.waitForEvent('download'), results.getByRole('link', {name: 'Descargar totales-objects.png', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('totales-objects.png');
  expect([...(await readFile(await download.path())).subarray(0, 8)]).toEqual([137,80,78,71,13,10,26,10]);
});
