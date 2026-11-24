import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('power-query: muestra pasos y código M, y descarga las cinco consultas de ejemplo', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.locator('[data-catalog-item="power-query"] > details > summary').click();
  const group = catalog.locator('[data-power-query-group="power-query-y-etl"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Power Query y ETL', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/power-query\/power-query-y-etl\/definicion$/);
  const note = page.locator('[data-power-query-concept]');
  const example = note.locator('[data-power-query-example]');
  await expect(example.getByRole('heading', {name: 'Preparar pedidos para un reporte'})).toBeVisible();
  await expect(example.getByRole('listitem')).toHaveText([
    'Abre una copia de Pedidos en el editor', 'Filtra estado a completado', 'Conserva id e importe',
  ]);
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('5 filas');
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);

  const setup = note.getByText('Preparar los datos de Power Query', {exact: true});
  await setup.focus();
  await setup.press('Enter');
  await expect(note.getByText(/Abre el Editor avanzado, pega el contenido completo/)).toBeVisible();
  const kit = note.getByRole('link', {name: 'power-query-datos.zip', exact: true});
  const [download] = await Promise.all([page.waitForEvent('download'), kit.click()]);
  expect(download.suggestedFilename()).toBe('power-query-datos.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/power-query/power-query-datos.zip'));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.goto('/apuntes/analisis-de-datos/power-query/power-query-y-etl/power-query-m-y-dax', {waitUntil: 'networkidle'});
  await expect(example.locator('code')).toContainText('Table.AddColumn(Pedidos');
  await expect(example.getByRole('listitem')).toHaveCount(0);
  expect(requests.some(url => /\.wasm(?:$|\?)|\/frame\.html/.test(url))).toBe(false);
});
