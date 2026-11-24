import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/sqlite3';

test('sqlite3 de Python: catálogo, tablas de tienda y consulta real desde un cursor', async ({page}) => {
  test.setTimeout(45_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Conexiones SQL', {exact: true}).click();
  await catalog.getByLabel('sqlite3', {exact: true}).click();
  const group = catalog.locator('[data-sqlite3-group="conexion-a-sqlite"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Conexión a SQLite', {exact: true}).click();
  await group.getByRole('link', {name: 'Connection y Cursor', exact: true}).click();
  await expect(page).toHaveURL(base + '/conexion-a-sqlite/connection-y-cursor');

  const note = page.locator('[data-sqlite3-concept]');
  await note.getByRole('button', {name: 'Probar este ejemplo: Crear un cursor explícito', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica sqlite3', exact: true});
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('con.cursor()');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 25_000});
  await expect(practiceResults(page)).toHaveCount(0);
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(6);
  await expect(orders.getByRole('row').nth(1).getByRole('cell')).toHaveText(['101', '1', '12000', '2026-08-01', 'completado']);

  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  await openPracticeRegion(page, 'results');
  await expect(practiceResults(page).locator('pre')).toHaveText("('Ana',)", {useInnerText: true});
});

test('sqlite3 de Python: búsqueda encuentra la CLI y la ficha mantiene su práctica en terminal', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('python -m sqlite3');
  await search.locator(`a[href="${base}/pruebas-y-flujos-reproducibles/cli-de-sqlite3"]`).click();
  const note = page.locator('[data-sqlite3-concept]');
  await expect(note.locator('[data-sqlite3-example] code').first()).toContainText('python -m sqlite3');
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('(5,)');
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/sqlite3/datos.py');
});
