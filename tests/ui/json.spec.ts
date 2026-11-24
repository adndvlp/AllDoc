import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/json';

test('json: catálogo, datos anidados y lectura real del archivo de pedidos', async ({page}) => {
  test.setTimeout(45_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Peticiones y formatos', {exact: true}).click();
  await catalog.getByLabel('json', {exact: true}).click();
  const group = catalog.locator('[data-json-group="deserializacion"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Deserialización', {exact: true}).click();
  await group.getByRole('link', {name: 'json.load()', exact: true}).click();
  await expect(page).toHaveURL(base + '/deserializacion/load');
  const note = page.locator('[data-json-concept]');
  await expect(note.locator('[data-json-example] .token.keyword').first()).toBeVisible();
  await note.getByRole('button', {name: 'Probar este ejemplo: Leer pedidos', exact: true}).click();
  const panel = page.locator('[data-practice-panel]');
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('json.load');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 25_000});
  expect(await practiceResults(page).count()).toBe(0);
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(4);
  await expect(orders.getByRole('row').nth(1)).toContainText('Ana');
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  await openPracticeRegion(page, 'results');
  await expect(practiceResults(page).locator('pre')).toHaveText('3', {useInnerText: true});
});

test('json: búsqueda, resultado esperado, código de terminal y preparación descargable', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('json.tool');
  await search.locator(`a[href="${base}/seguridad-y-terminal/json-tool"]`).click();
  const example = page.locator('[data-json-example]');
  await expect(example.locator('code').first()).toContainText('python -m json.tool');
  await expect(example.getByText('Ejecuta este comando en una terminal con Python.', {exact: false})).toBeVisible();
  await expect(example.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('tres pedidos');
  await expect(page.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/json/datos.py');
});
