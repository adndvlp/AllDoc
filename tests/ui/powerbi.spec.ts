import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('powerbi: catálogo, procedimientos, DAX y M con descarga del modelo de ventas', async ({page}) => {
  const runtimeRequests: string[] = [];
  page.on('request', request => {
    if (/\.wasm(?:$|\?)|\/frame\.html/.test(request.url())) runtimeRequests.push(request.url());
  });
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const topic = page.locator('[data-catalog="analisis-de-datos"] [data-catalog-item="powerbi"]');
  const summary = topic.locator(':scope > details > summary');
  await expect(summary).toHaveAccessibleName('Power BI');
  await expect(summary).toContainText('229 conceptos');
  await expect(topic.locator('details[open]')).toHaveCount(0);
  await summary.click();
  const group = topic.locator('[data-powerbi-group="power-bi-y-flujo-de-trabajo"]');
  await expect(group.getByRole('link')).toHaveCount(0);
  await group.getByLabel('Power BI y flujo de trabajo', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/powerbi\/power-bi-y-flujo-de-trabajo\/definicion$/);
  const note = page.locator('[data-powerbi-concept]');
  const example = note.locator('[data-powerbi-example]');
  await expect(example.getByRole('listitem')).toHaveText([
    'Abre Desktop y carga Pedidos con Introducir datos.',
    'Añade una tabla visual con PedidoID y Estado.',
    'Guarda el archivo PBIX.',
  ]);
  await expect(example.locator('pre')).toHaveCount(0);
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);

  await note.getByText('Preparar el modelo de Power BI', {exact: true}).press('Enter');
  await expect(note.getByText('preparar-modelo.md', {exact: true})).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    note.getByRole('link', {name: 'powerbi-laboratorio.zip', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('powerbi-laboratorio.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/powerbi/powerbi-laboratorio.zip'));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('Agregaciones DAX Power BI');
  await search.locator('a[href="/apuntes/analisis-de-datos/powerbi/agregaciones-dax/definicion"]').click();
  await expect(example.locator('pre.language-dax')).toContainText('Unidades = SUM(Pedidos[Cantidad])');
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('12 unidades incluyendo cancelados');

  await page.goto('/apuntes/analisis-de-datos/powerbi/lenguaje-m/definicion', {waitUntil: 'domcontentloaded'});
  await expect(example.locator('pre.language-powerquery')).toContainText('Table.SelectRows(Fuente, each [Estado] = "completed")');
  expect(runtimeRequests).toEqual([]);
});
