import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('snowflake: plataforma, procedimientos, búsqueda de COPY INTO y descarga del laboratorio', async ({page}) => {
  const runtimeRequests: string[] = [];
  page.on('request', request => {
    if (/\.wasm(?:$|\?)|\/frame\.html/.test(request.url())) runtimeRequests.push(request.url());
  });
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const platforms = page.locator('[data-catalog="analisis-de-datos"] [data-catalog-item="plataformas-de-datos"]');
  await platforms.locator(':scope > details > summary').click();
  const topic = platforms.locator('[data-catalog-item="snowflake"]');
  const summary = topic.locator(':scope > details > summary');
  await expect(summary).toHaveAccessibleName('Snowflake');
  await expect(summary).toContainText('231 conceptos');
  await expect(topic.locator('details[open]')).toHaveCount(0);
  await summary.click();
  const group = topic.locator('[data-snowflake-group="arquitectura"]');
  await expect(group.getByRole('link')).toHaveCount(0);
  await group.getByLabel('Arquitectura', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/snowflake\/arquitectura\/definicion$/);
  const note = page.locator('[data-snowflake-concept]');
  const example = note.locator('[data-snowflake-example]');
  await expect(example.getByRole('listitem')).toHaveText([
    'Una tienda carga ORDERS al almacenamiento.',
    'Un warehouse ejecuta el informe de ventas.',
    'Cloud Services autentica, resuelve metadatos y coordina la consulta.',
  ]);
  await expect(example.locator('pre')).toHaveCount(0);
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);

  await note.getByText('Preparar el laboratorio de Snowflake', {exact: true}).press('Enter');
  await expect(note.getByText('preparar.sql', {exact: true})).toBeVisible();
  await expect(note.getByText('connections.example.toml', {exact: true})).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    note.getByRole('link', {name: 'snowflake-laboratorio.zip', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('snowflake-laboratorio.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/snowflake/snowflake-laboratorio.zip'));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('Snowflake importar ventas.csv en una tabla aislada');
  await search.locator('a[href="/apuntes/analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/definicion"]').click();
  await expect(example.locator('pre')).toContainText('COPY INTO DEMO_LOAD FROM @DEMO_STAGE/ventas.csv');
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('2 filas cargadas.');
  expect(runtimeRequests).toEqual([]);
});
