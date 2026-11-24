import {readFile} from 'node:fs/promises';
import {expect, test} from '@playwright/test';

test('mysql-connector-python: navega a la ficha y descarga el laboratorio sin abrir práctica', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.getByLabel('Conexiones SQL', {exact: true}).click();
  await catalog.getByLabel('mysql-connector-python', {exact: true}).click();
  const group = catalog.locator('[data-mysql-connector-python-group="instalacion-y-db-api"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Instalación y DB-API', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/mysql-connector-python\/instalacion-y-db-api\/definicion$/);
  const note = page.locator('[data-mysql-connector-python-concept]');
  await expect(note.getByRole('heading', {name: 'Comprobar que está instalado'})).toBeVisible();
  await expect(page.getByRole('button', {name: /Practicar|Probar este ejemplo/})).toHaveCount(0);
  await note.getByText('Ver resultado esperado', {exact: true}).click();
  await expect(note.getByRole('region', {name: /Resultado de/})).toContainText('La versión instalada del conector.');

  const setup = note.getByText('Preparar tu entorno de MySQL', {exact: true});
  await setup.focus();
  await setup.press('Enter');
  await expect(note.getByText(/MySQL 8\.4 LTS/)).toBeVisible();
  for (const filename of ['datos.sql', 'lab_mysql.py']) {
    const [download] = await Promise.all([
      page.waitForEvent('download'), note.getByRole('link', {name: filename, exact: true}).click(),
    ]);
    expect(download.suggestedFilename()).toBe(filename);
    expect(await readFile(await download.path())).toEqual(await readFile(`static/practice/mysql-connector-python/${filename}`));
  }

  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(note.getByRole('link', {name: 'lab_mysql.py', exact: true})).toBeVisible();
  expect(requests.some(url => /\.wasm(?:$|\?)|\/frame\.html|\/alldoc-python\./.test(url))).toBe(false);
});
