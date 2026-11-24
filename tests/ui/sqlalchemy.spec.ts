import {expect, test} from '@playwright/test';
import {openPracticeRegion, practiceResults, selectPracticeTable} from './practice-helpers';

const base = '/apuntes/analisis-de-datos/sqlalchemy';

test('sqlalchemy: catálogo agrupado, pedidos y consulta real en SQLite', async ({page}) => {
  test.setTimeout(50_000);
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Conexiones SQL', {exact: true}).click();
  await catalog.getByLabel('SQLAlchemy', {exact: true}).click();
  const group = catalog.locator('[data-sqlalchemy-group="sqlalchemy-arquitectura"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('SQLAlchemy y su arquitectura', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(base + '/sqlalchemy-arquitectura/definicion');

  await page.locator('[data-sqlalchemy-concept]').getByRole('button', {name: 'Probar este ejemplo: Contar pedidos con SQL directo', exact: true}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica SQLAlchemy', exact: true});
  await expect(panel.getByRole('textbox', {name: 'Código python'})).toContainText('SELECT COUNT(*) FROM pedidos');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 30_000});
  await expect(practiceResults(page)).toHaveCount(0);
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(8);
  await expect(orders.getByRole('row').nth(1).getByRole('cell')).toHaveText(['101', '1', '100', '2026-02-01', 'completed', 'NULL']);
  await run.click();
  await expect(practiceResults(page)).toHaveCount(1);
  const results = await openPracticeRegion(page, 'results');
  await expect(results.locator('pre')).toHaveText('7', {useInnerText: true});
});

test('sqlalchemy: Alembic se encuentra por búsqueda y conserva el ejemplo de terminal', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const search = page.locator('[data-search-surface="inline"]');
  await search.getByRole('searchbox').fill('autogenerate');
  await search.locator(`a[href="${base}/alembic/revision-y-autogenerate"]`).click();
  const note = page.locator('[data-sqlalchemy-concept]');
  await expect(note.getByText(/Ejecuta este comando en tu terminal/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('upgrade() y downgrade()');
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'}))
    .toHaveAttribute('href', '/practice/sqlalchemy/datos.py');
});
