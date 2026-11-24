import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('tableau: catálogo, procedimientos, fórmulas y descarga del laboratorio', async ({page}) => {
  const runtimeRequests: string[] = [];
  page.on('request', request => {
    if (/\.wasm(?:$|\?)|\/frame\.html/.test(request.url())) runtimeRequests.push(request.url());
  });
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const topic = page.locator('[data-catalog="analisis-de-datos"] [data-catalog-item="tableau"]');
  const summary = topic.locator(':scope > details > summary');
  await expect(summary).toHaveAccessibleName('Tableau');
  await expect(summary).toContainText('189 conceptos');
  await expect(topic.locator('details[open]')).toHaveCount(0);
  await summary.click();
  const group = topic.locator('[data-tableau-group="entorno-de-trabajo"]');
  await expect(group.getByRole('link')).toHaveCount(0);
  await group.getByLabel('Entorno de trabajo', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/tableau\/entorno-de-trabajo\/definicion$/);
  const note = page.locator('[data-tableau-concept]');
  const example = note.locator('[data-tableau-example]');
  await expect(example.getByText('Conecta ventas.csv y pulsa Sheet 1. Arrastra Ventas a Text.', {exact: true})).toBeVisible();
  await expect(example.locator('pre, ol')).toHaveCount(0);
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('SUM(Ventas) = 1750');
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);

  await note.getByText('Preparar los datos de Tableau', {exact: true}).press('Enter');
  await expect(note.getByText('preparar-datos.md', {exact: true})).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    note.getByRole('link', {name: 'tableau-laboratorio.zip', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('tableau-laboratorio.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/tableau/tableau-laboratorio.zip'));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.goto('/apuntes/analisis-de-datos/tableau/conexiones/definicion', {waitUntil: 'domcontentloaded'});
  await expect(example.getByRole('listitem')).toHaveText(['Connect > Text File > ventas.csv', 'abre una hoja.']);
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('Campos calculados Tableau');
  await search.locator('a[href="/apuntes/analisis-de-datos/tableau/campos-calculados/definicion"]').click();
  await expect(example.getByText('Crea un campo calculado con esta expresión y muéstralo por Linea:', {exact: true})).toBeVisible();
  await expect(example.locator('pre')).toContainText('[Ventas]-[Costo]');
  await expect(example.locator('p + div').locator('pre')).toHaveCount(1);
  expect(runtimeRequests).toEqual([]);
});
