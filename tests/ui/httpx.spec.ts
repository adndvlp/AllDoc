import {expect, test} from '@playwright/test';
import {openPracticeRegion, selectPracticeTable} from './practice-helpers';

test('httpx: catálogo, pedidos y peticiones síncronas y asíncronas en memoria', async ({page}) => {
  test.setTimeout(55_000);
  const contacted: string[] = [];
  page.context().on('request', request => contacted.push(request.url()));
  await page.goto('/', {waitUntil: 'networkidle'});
  const catalog = page.locator('[data-catalog="analisis-de-datos"]');
  await catalog.getByLabel('Peticiones y formatos', {exact: true}).click();
  await catalog.getByLabel('httpx', {exact: true}).click();
  const group = catalog.locator('[data-httpx-group="programacion-asincrona"]');
  await expect(group.locator('details')).not.toHaveAttribute('open', '');
  await group.getByLabel('Programación asíncrona', {exact: true}).click();
  await group.getByRole('link', {name: 'asyncio.gather()', exact: true}).click();
  await expect(page).toHaveURL(/\/httpx\/programacion-asincrona\/asyncio-gather$/);
  const note = page.locator('[data-httpx-concept]');
  await expect(note.locator('code').filter({hasText: 'asyncio.run(main())'})).toHaveCount(1);
  await expect(note.getByRole('link', {name: 'Descargar los datos y la API simulada'})).toHaveAttribute('href', '/practice/httpx/datos.py');
  await note.getByRole('button', {name: 'Probar este ejemplo: Obtener tres pedidos'}).click();

  const panel = page.getByRole('dialog', {name: 'Práctica httpx', exact: true});
  const run = panel.getByRole('button', {name: 'Ejecutar', exact: true});
  await expect(run).toBeEnabled({timeout: 35_000});
  const orders = await selectPracticeTable(page, 'pedidos');
  await expect(orders.getByRole('row')).toHaveCount(5);
  await expect(orders.getByRole('row').nth(1).getByRole('cell')).toHaveText(['1', 'Ana', '800', 'completed', '2026-08-01']);
  const editor = (await openPracticeRegion(page, 'editor')).getByRole('textbox', {name: 'Código python'});
  await expect(editor).toContainText('await main()');
  await expect(editor).not.toContainText('asyncio.run(main())');
  await run.click();
  const results = await openPracticeRegion(page, 'results');
  await expect(results.getByRole('status')).toHaveText('Ejecución completada');
  await expect(results.locator('pre')).toHaveText('[1, 3, 4]');

  await editor.fill('with demo() as c:\n    r = c.post("/pedidos", json={"importe": 500})\n    print(r.status_code, json.loads(r.json()["body"])["importe"])');
  await run.click();
  await expect(results.locator('pre')).toHaveText('201 500');
  expect(contacted.some(url => new URL(url).hostname === 'ventas.example')).toBe(false);
  await expect((await selectPracticeTable(page, 'pedidos')).getByRole('row')).toHaveCount(5);

  await page.goto('/apuntes/analisis-de-datos/httpx/metodos-http/get', {waitUntil: 'networkidle'});
  await expect(note.getByText(/Ejecuta este ejemplo en Python local con acceso a Internet/)).toBeVisible();
  await expect(note.getByRole('button', {name: /Probar este ejemplo/})).toHaveCount(0);
});
