import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('airflow: catálogo, procedimientos, búsqueda del DAG y descarga del laboratorio', async ({page}) => {
  const runtimeRequests: string[] = [];
  page.on('request', request => {
    if (/\.wasm(?:$|\?)|\/frame\.html/.test(request.url())) runtimeRequests.push(request.url());
  });
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const topic = page.locator('[data-catalog="analisis-de-datos"] [data-catalog-item="airflow"]');
  const summary = topic.locator(':scope > details > summary');
  await expect(summary).toHaveAccessibleName('Apache Airflow');
  await expect(summary).toContainText('200 conceptos');
  await expect(topic.locator('details[open]')).toHaveCount(0);
  await summary.click();
  const group = topic.locator('[data-airflow-group="arquitectura"]');
  await expect(group.getByRole('link')).toHaveCount(0);
  await group.getByLabel('Arquitectura y componentes', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/airflow\/arquitectura\/definicion$/);
  const note = page.locator('[data-airflow-concept]');
  const example = note.locator('[data-airflow-example]');
  await expect(example.getByRole('listitem')).toHaveText([
    'Activa un DAG de prueba.', 'Dispara una ejecución.', 'Abre Grid y Logs.',
  ]);
  await expect(example.locator('pre')).toHaveCount(0);
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Preparar el laboratorio de Airflow', {exact: true}).press('Enter');
  await expect(note.getByText('airflow standalone', {exact: true})).toBeVisible();
  await expect(note.getByText(/pulsa Trigger DAG/)).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    note.getByRole('link', {name: 'airflow-laboratorio.zip', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('airflow-laboratorio.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/airflow/airflow-laboratorio.zip'));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('Airflow generar un resumen de ventas reproducible');
  await search.locator('a[href="/apuntes/analisis-de-datos/airflow/pipeline-ventas/definicion"]').click();
  await expect(example.locator('pre')).toContainText('publicar(transformar(extraer()))');
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('pedidos=4 y ventas=3000');
  expect(runtimeRequests).toEqual([]);
});
