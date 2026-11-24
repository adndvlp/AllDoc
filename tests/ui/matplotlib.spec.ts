import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/matplotlib';

test('matplotlib: catálogo, ventas y gráfica PNG real en el panel', async ({page}) => {
  test.setTimeout(60_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.locator('[data-catalog-item="visualizacion"] > details > summary').click();
  await catalog.getByLabel('Matplotlib', {exact: true}).click();
  const group = catalog.locator('[data-matplotlib-group="fundamentos"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Fundamentos de Matplotlib', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(base + '/fundamentos/definicion');

  await page.locator('[data-matplotlib-concept]').getByRole('button', {name: 'Probar este ejemplo: Mostrar la evolución de ventas', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica Matplotlib', exact: true});
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('plt.plot(meses, ventas)');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 35_000});
  const sales = await selectPracticeTable(page, 'df');
  await expect(sales.getByRole('row')).toHaveCount(7);
  await expect(sales.getByRole('row').nth(1)).toContainText('120');
  await expect(practiceResults(page)).toHaveCount(0);

  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  const plot = results.getByRole('img', {name: 'Gráfica 1', exact: true});
  await expect.poll(() => plot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  expect(await plot.evaluate(image => image.getBoundingClientRect().width <= image.parentElement!.getBoundingClientRect().width + 1)).toBe(true);
  await plot.scrollIntoViewIfNeeded();
  await expect(plot).toBeInViewport({ratio: 0.99});
  await expect(plot).toHaveScreenshot('matplotlib-result.png');
  const [download] = await Promise.all([
    page.waitForEvent('download'), results.getByRole('link', {name: 'Descargar gráfica PNG', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('grafica-1.png');
  expect([...(await readFile(await download.path())).subarray(0, 8)]).toEqual([137,80,78,71,13,10,26,10]);
});

test('matplotlib: exporta PNG, JPG, SVG y PDF y conserva una vista PNG', async ({page}) => {
  test.setTimeout(60_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('svg pdf');
  await search.locator(`a[href="${base}/exportacion/formatos"]`).click();
  await page.locator('[data-matplotlib-concept]').getByRole('button', {name: 'Probar este ejemplo: Exportar en varios formatos', exact: true}).click();
  const run = page.getByRole('dialog', {name: 'Práctica Matplotlib', exact: true}).getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 35_000});
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  await expect(results.getByRole('status')).toHaveText('Ejecución completada');
  await expect(results.getByRole('img')).toHaveCount(1);
  for (const extension of ['png', 'jpg', 'svg', 'pdf']) {
    await expect(results.getByRole('link', {name: 'Descargar salidas_matplotlib/ventas.' + extension, exact: true})).toBeVisible();
  }
  const [download] = await Promise.all([
    page.waitForEvent('download'), results.getByRole('link', {name: 'Descargar salidas_matplotlib/ventas.svg', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('ventas.svg');
  expect(await readFile(await download.path(), 'utf8')).toMatch(/<svg\b/);
});
