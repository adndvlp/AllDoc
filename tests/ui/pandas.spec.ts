import {test, expect} from '@playwright/test';
import {goHome} from './header-helpers';

const route = '/apuntes/analisis-de-datos/pandas/dataframe';

test('pandas: navegación, ejemplo compacto, resultado con índice y acceso desde búsqueda', async ({page, context}) => {
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog]');
  await catalog.getByLabel('Tablas y archivos', {exact: true}).click();
  await catalog.getByLabel('Pandas', {exact: true}).click();
  await expect(page).toHaveURL(/\/$/);
  await catalog.getByRole('link', {name: /DataFrame/}).click();
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
  await page.locator('[data-search-surface="inline"]').getByRole('link').filter({hasText: 'DataFrame'}).click();
  await expect(page).toHaveURL(new RegExp(route + '$'));
  await expect(note.locator('details[open]')).toHaveCount(0);
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
