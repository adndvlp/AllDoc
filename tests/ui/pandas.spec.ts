import {test, expect} from '@playwright/test';
import {goHome} from './header-helpers';
import {openPracticeRegion, practiceResults} from './practice-helpers';

const route = '/apuntes/analisis-de-datos/pandas/dataframe';

test('pandas: navegación, ejemplo compacto, resultado con índice y acceso desde búsqueda', async ({page, context}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Tablas y archivos', {exact: true}).click();
  await catalog.getByLabel('Pandas', {exact: true}).click();
  await expect(page).toHaveURL(/\/$/);
  await catalog.getByLabel('Series y DataFrame', {exact: true}).click();
  await catalog.getByRole('link', {name: 'Crear una tabla de productos', exact: true}).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(page.getByRole('heading', {level: 1, name: 'DataFrame', exact: true})).toHaveCount(1);
  const note = page.locator('[data-pandas-concept]');
  await expect(note.locator('[data-pandas-example]')).toHaveCount(1);
  await expect(note.locator('code')).toContainText('import pandas as pd');
  await expect(note.locator('.token.keyword').first()).toBeVisible();
  await expect(note.locator('details[open]')).toHaveCount(0);
  await expect(page).toHaveScreenshot('pandas-dataframe.png');
  await note.getByText('Ver resultado', {exact: false}).click();
  const table = note.getByRole('table');
  await expect(table.getByRole('columnheader')).toHaveText(['Índice', 'nombre', 'categoria', 'precio']);
  await expect(table.locator('tbody tr')).toHaveCount(3);
  await expect(table.locator('tbody tr').first()).toHaveText('0TecladoAccesorios500');
  await expect(page.locator('.pagination-nav__link')).toHaveCount(0);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await note.getByRole('button', {name: /copiar/i}).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('pd.DataFrame');
  await page.getByRole('button', {name: 'Guardar en favoritos', exact: true}).click();
  await goHome(page);
  await expect(page.getByRole('region', {name: 'Favoritos', exact: true}).getByRole('link')).toContainText('DataFrame');
  await page.locator('[data-search-surface="inline"]').getByRole('searchbox').fill('crear tabla pandas');
  await page.locator(`[data-search-surface="inline"] a[href="${route}"]`).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(note.locator('details[open]')).toHaveCount(0);
});

test('temario pandas: grupo colapsable, resultado de referencia y práctica con pedidos', async ({page}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Tablas y archivos', {exact: true}).click();
  await catalog.getByLabel('Pandas', {exact: true}).click();
  const group = catalog.locator('[data-pandas-group="seleccion-de-datos"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Selección de datos', {exact: true}).click();
  await group.getByRole('link', {name: 'loc', exact: true}).click();
  await expect(page).toHaveURL(/\/pandas\/seleccion-de-datos\/loc$/);
  const note = page.locator('[data-pandas-concept]');
  await note.getByText('Ver resultado en pandas 2.2.3', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de loc/})).toContainText('101');
  await note.getByRole('button', {name: 'Probar este ejemplo: Elegir las etiquetas 0 a 2'}).click();
  const panel = page.locator('[data-practice-panel]');
  await expect(panel.getByRole('textbox', {name: 'Código pandas'})).toContainText('pedidos.loc');
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 25_000});
  await run.click();
  await openPracticeRegion(page, 'results');
  const table = practiceResults(page).getByRole('table');
  await expect(table.getByRole('row')).toHaveCount(4);
  await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['101', '100']);
});

test('temario pandas: los requisitos externos están junto al ejemplo', async ({page}) => {
  await page.goto('/apuntes/analisis-de-datos/pandas/importar-datos/read-excel', {waitUntil: 'networkidle'});
  const note = page.locator('[data-pandas-concept]');
  await expect(note.getByText(/Requiere openpyxl/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
  await expect(note.getByRole('link', {name: 'Descargar los datos de los ejemplos'})).toHaveAttribute('href', '/practice/pandas/datos.py');
});

test('pandas al 200% mantiene código, copia, resultado y scroll limitado a la tabla', async ({page}) => {
  await page.goto(route, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await page.addStyleTag({content: 'html {font-size: 200% !important;}'});
  const note = page.locator('[data-pandas-concept]');
  await expect.poll(() => note.locator('code').evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(28);
  await note.getByText('Ver resultado', {exact: false}).click();
  await expect(note.getByRole('table')).toBeVisible();
  await expect(note.getByRole('button', {name: /copiar/i})).toBeVisible();
  expect(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= innerWidth + 1)).toBe(true);
  expect(await note.locator('pre').evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  await expect(page).toHaveScreenshot('pandas-texto-200.png');
});
