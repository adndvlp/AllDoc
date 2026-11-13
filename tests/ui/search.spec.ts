import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';

const home = (page: Page) => page.locator('[data-search-surface="inline"]');
const input = (page: Page) => home(page).getByRole('searchbox');
const dialog = (page: Page) => page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
const open = (page: Page) => page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
const indexChunk = '**/assets/js/search-index.*.js';
async function go(page: Page, route = '/') {
  await page.goto(route, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}

test('buscador de portada: carga diferida, consulta pedagógica y navegación por teclado', async ({page}) => {
  let requests = 0;
  page.on('request', (request) => {if (/\/search-index\.[^/]+\.js/.test(request.url())) requests++;});
  await go(page);
  await expect(input(page)).not.toBeFocused();
  expect(requests).toBe(0);
  await input(page).fill('cómo filtrar');
  const result = home(page).getByRole('link').filter({hasText: 'WHERE'});
  await expect(result).toHaveCount(1);
  await expect(page.getByRole('heading', {name: 'Explora por área'})).not.toBeVisible();
  await expect(page).toHaveScreenshot('busqueda-inicio.png');
  await input(page).press('ArrowDown');
  await expect(result).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sql\/where$/);
  await open(page);
  await expect(dialog(page).getByRole('searchbox')).toHaveValue('');
  expect(requests).toBe(1);
  await expect(page.locator('dialog')).toHaveCount(1);
});

test('consulta compartida y Esc nativo: cierra, conserva texto y devuelve el foco', async ({page}) => {
  await go(page);
  await input(page).fill('¿qué es SELECT?');
  await expect(home(page).getByRole('link')).toHaveCount(1);
  await input(page).press('Control+k');
  await expect(dialog(page).getByRole('searchbox')).toHaveValue('¿qué es SELECT?');
  await expect(home(page).locator('ul')).toHaveCount(0);
  await dialog(page).getByRole('searchbox').fill('limitar');
  await page.keyboard.press('Escape');
  await expect(dialog(page)).not.toBeVisible();
  await expect(input(page)).toHaveValue('limitar');
  await expect(input(page)).toBeFocused();
  await expect(home(page).getByRole('link').filter({hasText: 'LIMIT'})).toBeVisible();
  await home(page).getByRole('button', {name: 'Limpiar búsqueda'}).click();
  await expect(page.getByRole('heading', {name: 'Explora por área'})).toBeVisible();
});

test('una carga tardía conserva lo escrito y no vuelve a abrir el diálogo', async ({page}) => {
  let release!: () => void;
  let requests = 0;
  const gate = new Promise<void>((resolve) => {release = resolve;});
  await page.route(indexChunk, async (route) => {requests++; await gate; await route.continue();});
  try {
    await go(page);
    await open(page);
    await dialog(page).getByRole('searchbox').fill('filtrar');
    await expect(dialog(page).getByRole('status')).toHaveText('Cargando apuntes…');
    await dialog(page).getByRole('button', {name: 'Cerrar buscador'}).click();
    await expect(dialog(page)).not.toBeVisible();
    release();
    await expect(home(page).getByRole('link').filter({hasText: 'WHERE'})).toBeVisible();
    await expect(dialog(page)).not.toBeVisible();
    expect(requests).toBe(1);
  } finally {release();}
});

test('error del índice y reintento visible sin perder la consulta', async ({page}) => {
  let requests = 0;
  await page.route(indexChunk, (route) => ++requests === 1 ? route.abort('failed') : route.continue());
  await go(page);
  await input(page).fill('filtrar');
  await expect(home(page).getByRole('alert')).toContainText('No pude cargar los apuntes');
  await home(page).getByRole('button', {name: 'Reintentar'}).click();
  await expect(home(page).getByRole('link').filter({hasText: 'WHERE'})).toBeVisible();
  await expect(input(page)).toHaveValue('filtrar');
  expect(requests).toBe(2);
});

test('sin coincidencias, solo auxiliares y Enter durante composición IME', async ({page}) => {
  await go(page);
  await input(page).fill('no-existe-ese-concepto');
  await expect(home(page).getByText('No encontré ese concepto', {exact: true})).toBeVisible();
  await input(page).fill('qué es para');
  await expect(home(page).getByText('Escribe un concepto o una acción', {exact: true})).toBeVisible();
  await input(page).fill('SELECT');
  await expect(home(page).getByRole('link')).toHaveCount(1);
  for (const composing of [true, false]) {
    await input(page).evaluate((element, composing) => {
      const event = new KeyboardEvent('keydown', {key: 'Enter', bubbles: true, cancelable: true, isComposing: composing});
      if (!composing) Object.defineProperty(event, 'keyCode', {value: 229});
      element.dispatchEvent(event);
    }, composing);
    await expect(page).toHaveURL(/\/$/);
  }
  await input(page).press('Enter');
  await expect(page).toHaveURL(/\/sql\/select$/);
});

test('diálogo ajustado a un viewport visual reducido por teclado', async ({page}) => {
  await go(page);
  await open(page);
  await page.evaluate(() => {
    const viewport = window.visualViewport!;
    Object.defineProperty(viewport, 'height', {configurable: true, get: () => 240});
    viewport.dispatchEvent(new Event('resize'));
  });
  await expect.poll(() => dialog(page).evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(240);
  const close = await dialog(page).getByRole('button', {name: 'Cerrar buscador'}).boundingBox();
  expect(close).not.toBeNull();
  expect(close!.y + close!.height).toBeLessThanOrEqual(240);
});

test('el diálogo contiene el scroll sin desplazar el apunte del fondo', async ({page}) => {
  await page.setViewportSize({width: page.viewportSize()!.width, height: 400});
  await go(page, '/apuntes/analisis-de-datos/sql/select');
  for (const summary of await page.getByText('Ver resultado', {exact: false}).all()) await summary.click();
  const reader = page.locator('[data-scroll-panel="content"]');
  const before = await reader.evaluate((element) => element.scrollTop);
  await open(page);
  await expect(dialog(page)).toBeVisible();
  await page.mouse.move(1, 399);
  await page.mouse.wheel(0, 700);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
  expect(await reader.evaluate((element) => element.scrollTop)).toBe(before);
});
