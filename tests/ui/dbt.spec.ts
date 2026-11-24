import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('dbt: abre los apuntes desde Transformación de datos y descarga el proyecto PostgreSQL', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.getByLabel('Transformación de datos', {exact: true}).click();
  await catalog.getByLabel('dbt', {exact: true}).click();
  const group = catalog.locator('[data-dbt-group="fundamentos-de-dbt"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Fundamentos de dbt', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/dbt\/fundamentos-de-dbt\/definicion$/);
  const note = page.locator('[data-dbt-concept]');
  await expect(note.getByRole('heading', {name: 'Seguir una transformación'})).toBeVisible();
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('Cuatro pedidos completados');

  const setup = note.getByText('Preparar el proyecto de dbt', {exact: true});
  await setup.focus();
  await setup.press('Enter');
  await expect(note.getByText(/PostgreSQL 15 o posterior/)).toBeVisible();
  await expect(note.locator('code').filter({hasText: 'dbt show --select customer_revenue'})).toBeVisible();
  const kit = note.getByRole('link', {name: 'tienda_dbt.zip', exact: true});
  const [download] = await Promise.all([page.waitForEvent('download'), kit.click()]);
  expect(download.suggestedFilename()).toBe('tienda_dbt.zip');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/dbt/tienda_dbt.zip'));

  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(kit).toBeVisible();
  expect(requests.some(url => /\.wasm(?:$|\?)|\/frame\.html|\/alldoc-python\./.test(url))).toBe(false);
});
