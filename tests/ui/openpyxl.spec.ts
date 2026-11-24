import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/openpyxl';

test('openpyxl: catálogo, libro de ventas y descarga del XLSX editado', async ({page}) => {
  test.setTimeout(45_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Tablas y archivos', {exact: true}).click();
  await catalog.getByLabel('openpyxl', {exact: true}).click();
  const group = catalog.locator('[data-openpyxl-group="workbook"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Workbook y archivos', {exact: true}).click();
  await group.getByRole('link', {name: 'Guardar cambios y cerrar', exact: true}).click();
  await expect(page).toHaveURL(base + '/workbook/guardar-y-cerrar');
  const note = page.locator('[data-openpyxl-concept]');
  await note.getByRole('button', {name: 'Probar este ejemplo: Modificar una copia y cerrar', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica openpyxl', exact: true});
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('ventas_editadas.xlsx');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 25_000});
  const data = await selectPracticeTable(page, 'Ventas');
  await expect(data.getByRole('row').nth(2)).toContainText('Laptop');
  await expect(practiceResults(page)).toHaveCount(0);

  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  await expect(results.locator('pre')).toHaveText('Monitor', {useInnerText: true});
  const link = results.getByRole('link', {name: 'Descargar ventas_editadas.xlsx', exact: true});
  const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
  expect(download.suggestedFilename()).toBe('ventas_editadas.xlsx');
  const content = await readFile(await download.path());
  expect([...content.subarray(0, 4)]).toEqual([80, 75, 3, 4]);
});

test('openpyxl: búsqueda de macros y ejemplo que requiere un libro externo', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('keep_vba');
  await search.locator(`a[href="${base}/formatos-avanzados/macros"]`).click();
  const note = page.locator('[data-openpyxl-concept]');
  await expect(note.getByText(/Este ejemplo requiere el archivo indicado/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/openpyxl/datos.py');
});
