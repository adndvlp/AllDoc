import {expect, test} from '@playwright/test';
import {openPracticeRegion, selectPracticeTable} from './practice-helpers';

test('requests: abre la API simulada, consulta un pedido y ejecuta un POST sin tráfico externo', async ({page}) => {
  test.setTimeout(55_000);
  const contacted: string[] = [];
  page.context().on('request', request => contacted.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.getByLabel('Peticiones y formatos', {exact: true}).click();
  await catalog.getByLabel('requests', {exact: true}).click();
  const group = catalog.locator('[data-requests-group="http-y-apis"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('HTTP y APIs', {exact: true}).click();
  await group.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/requests\/http-y-apis\/definicion$/);
  const note = page.locator('[data-requests-concept]');
  await expect(note.getByRole('link', {name: 'Descargar el servidor de práctica local'})).toHaveAttribute('href', '/practice/requests/datos.py');
  await note.getByRole('button', {name: 'Probar este ejemplo: Consultar un pedido'}).click();
  const panel = page.getByRole('dialog', {name: 'Práctica requests', exact: true});
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 35_000});
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(5);
  await expect(orders.getByRole('row').nth(1).getByRole('cell')).toHaveText(['101', '800', 'completed', '2026-08-01', '1', 'MX']);

  await run.click();
  const results = await openPracticeRegion(page, 'results');
  await expect(results.getByRole('status')).toHaveText('Ejecución completada');
  await expect(results.locator('pre')).toHaveText('200 800');

  const editor = (await openPracticeRegion(page, 'editor')).getByRole('textbox', {name: 'Código python'});
  await editor.fill('r = requests.post(BASE + "/orders", json={"amount": 500}, timeout=5)\nprint(r.status_code, r.json()["body"]["amount"])');
  await run.click();
  await expect(results.locator('pre')).toHaveText('201 500');
  expect(contacted.some(url => new URL(url).port === '8765')).toBe(false);
  await expect((await selectPracticeTable(page, 'pedidos')).getByRole('row')).toHaveCount(5);
});
