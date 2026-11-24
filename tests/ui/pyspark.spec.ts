import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('pyspark: catálogo de Apache Spark, ejemplos externos y descarga del laboratorio', async ({page}) => {
  const runtimeRequests: string[] = [];
  page.on('request', request => {
    if (/\.wasm(?:$|\?)|\/frame\.html/.test(request.url())) runtimeRequests.push(request.url());
  });
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  const topic = catalog.locator('[data-catalog-item="pyspark"]');
  const summary = topic.locator(':scope > details > summary');
  await expect(summary).toHaveAccessibleName('Apache Spark (PySpark)');
  await expect(summary).toContainText('222 conceptos');
  await expect(topic.locator('details[open]')).toHaveCount(0);
  await summary.click();
  const group = topic.locator('[data-pyspark-group="spark-session"]');
  await expect(group.getByRole('link')).toHaveCount(0);
  await group.getByLabel('SparkSession', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/pyspark\/spark-session\/definicion$/);
  const note = page.locator('[data-pyspark-concept]');
  const example = note.locator('[data-pyspark-example]');
  await expect(example.locator('code')).toContainText('SparkSession.builder.master("local[2]")');
  await example.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(example.getByRole('region', {name: /Resultado de/})).toContainText('dos hilos');
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Preparar el laboratorio de PySpark', {exact: true}).press('Enter');
  await expect(note.getByText('python -i lab_pyspark.py', {exact: true})).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    note.getByRole('link', {name: 'lab_pyspark.py', exact: true}).click(),
  ]);
  expect(download.suggestedFilename()).toBe('lab_pyspark.py');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/pyspark/lab_pyspark.py'));

  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('Spill GC OOM PySpark');
  await search.locator('a[href="/apuntes/analisis-de-datos/pyspark/recursos-y-observabilidad/spill-gc-y-oom"]').click();
  await expect(example.getByRole('listitem')).toHaveText([
    'ejecutar una agregación', 'abrir Spark UI > Stages > etapa lenta', 'revisar Peak Execution Memory, Spill y GC Time.',
  ]);
  await expect(example.locator('pre')).toHaveCount(0);
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(runtimeRequests).toEqual([]);
});
