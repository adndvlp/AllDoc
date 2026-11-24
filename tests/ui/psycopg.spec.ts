import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('psycopg: abre la ficha desde Conexiones SQL y descarga el laboratorio de PostgreSQL', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.getByLabel('Conexiones SQL', {exact: true}).click();
  await catalog.getByLabel('psycopg', {exact: true}).click();
  const group = catalog.locator('[data-psycopg-group="instalacion-y-compatibilidad"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Instalación y compatibilidad', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/psycopg\/instalacion-y-compatibilidad\/definicion$/);
  const note = page.locator('[data-psycopg-concept]');
  await expect(note.getByRole('heading', {name: 'Consultar la versión instalada'})).toBeVisible();
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('Una versión 3.3.x');

  const setup = note.getByText('Preparar tu entorno de PostgreSQL', {exact: true});
  await setup.focus();
  await setup.press('Enter');
  await expect(note.getByText(/PostgreSQL 15 o posterior/)).toBeVisible();
  await expect(note.locator('code').filter({hasText: 'from lab_psycopg import DSN'})).toBeVisible();
  const lab = note.getByRole('link', {name: 'lab_psycopg.py', exact: true});
  const [download] = await Promise.all([page.waitForEvent('download'), lab.click()]);
  expect(download.suggestedFilename()).toBe('lab_psycopg.py');
  expect(await readFile(await download.path())).toEqual(await readFile('static/practice/psycopg/lab_psycopg.py'));

  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(lab).toBeVisible();
  expect(requests.some(url => /\.wasm(?:$|\?)|\/frame\.html|\/alldoc-python\./.test(url))).toBe(false);
});
