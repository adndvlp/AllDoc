import {readFile} from 'node:fs/promises';
import {expect, test, type Locator} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/r';

async function runWhenReady(panel: Locator) {
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  const failure = panel.getByRole('alert').filter({hasText: 'No se pudo preparar la práctica'});
  await expect.poll(async () => {
    if (await failure.isVisible()) throw new Error(await failure.innerText());
    return run.isEnabled();
  }, {timeout: 65_000}).toBe(true);
  return run;
}

test('r: desde Lenguajes abre el dataset, sugiere columnas y calcula una tabla real', async ({page}) => {
  test.setTimeout(95_000);
  const requests: string[] = [];
  page.context().on('request', request => {if (/\/r\/0\.6|alldoc-r\./.test(request.url())) requests.push(request.url());});
  await page.goto('/apuntes/lenguajes', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="lenguajes"]');
  await catalog.getByLabel('R', {exact: true}).click();
  const group = catalog.locator('[data-r-group="filtrar-filas"]');
  await group.getByLabel('Filtrar filas', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(base + '/filtrar-filas/definicion');
  expect(requests).toEqual([]);
  await page.getByRole('button', {name: 'Probar este ejemplo: Conservar pedidos completados', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica R', exact: true});
  const run = await runWhenReady(panel);
  expect(requests.length).toBeGreaterThan(0);
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(7);
  await expect(orders.getByRole('row').nth(1).getByRole('cell')).toHaveText(['101', '1', '2026-03-01', '100', 'completado', 'NULL']);
  const editor = (await openPracticeRegion(page, 'editor')).getByRole('textbox', {name: 'Código R', exact: true});
  await editor.fill('pedidos$mo');
  await editor.press('Control+Space');
  await expect(panel.getByRole('option', {name: /^monto/})).toBeVisible();
  await editor.press('Escape');
  await editor.fill('pedidos |> dplyr::filter(monto > 150) |> select(id, monto)');
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const result = await openPracticeRegion(page, 'results');
  await expect(result.getByRole('table').getByRole('row').nth(2).getByRole('cell')).toHaveText(['103', '300']);
});

test('r: renderiza ggplot2 en el panel y descarga el PNG de R', async ({page}) => {
  test.setTimeout(95_000);
  await page.goto(base + '/visualizacion-con-ggplot2/definicion', {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Probar este ejemplo: Graficar dos cantidades', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica R', exact: true});
  const run = await runWhenReady(panel);
  await run.click();
  const result = await openPracticeRegion(page, 'results');
  await expect(result.getByRole('status')).toHaveText('Ejecución completada', {timeout: 20_000});
  const image = result.getByRole('img', {name: 'Gráfica 1', exact: true});
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBe(760);
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveScreenshot('r-ggplot2.png');
  const [download] = await Promise.all([page.waitForEvent('download'), result.getByRole('link', {name: 'Descargar gráfica PNG'}).click()]);
  expect(download.suggestedFilename()).toBe('grafica-1.png');
  expect([...(await readFile(await download.path())).slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
});

test('r: SQLite y dbplyr consultan en memoria desde una ficha', async ({page}) => {
  test.setTimeout(95_000);
  await page.goto(base + '/bases-de-datos-y-sql/dbplyr-y-evaluacion-diferida', {waitUntil: 'networkidle'});
  await page.getByRole('button', {name: 'Probar este ejemplo: Consultar una tabla remota', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica R', exact: true});
  const run = await runWhenReady(panel);
  await run.click();
  const result = await openPracticeRegion(page, 'results');
  await expect(result.getByRole('status')).toHaveText('Ejecución completada', {timeout: 20_000});
  await expect(result).toContainText(/\b102\s+200\b/);
  await expect(result).toContainText(/\b103\s+300\b/);
});
