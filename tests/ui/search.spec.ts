import {test, expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import {focusSearchResult} from './search-helpers';

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
  const result = home(page).getByRole('link').filter({has: page.getByText('WHERE',{exact:true})});
  await expect(result).toHaveCount(1);
  await expect(page.locator('[data-catalog]')).not.toBeVisible();
  await expect(page).toHaveScreenshot('busqueda-inicio.png');
  await focusSearchResult(home(page), result);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sql\/where$/);
  await open(page);
  await expect(dialog(page).getByRole('searchbox')).toHaveValue('');
  expect(requests).toBe(1);
  // El menú de temas también usa dialog: se exige un solo buscador montado
  // y una única ventana abierta, aunque el menú cerrado permanezca en el DOM.
  await expect(page.locator('dialog[data-search-surface="dialog"]')).toHaveCount(1);
  await expect(page.locator('dialog[open]')).toHaveCount(1);
});

test('consulta compartida y Esc nativo: cierra, conserva texto y devuelve el foco', async ({page}) => {
  await go(page);
  await input(page).fill('¿qué es SELECT?');
  await expect(home(page).getByRole('link').filter({has: page.getByText('SELECT', {exact: true})})).toHaveCount(1);
  await expect(home(page).getByRole('link').first()).toHaveAttribute('href', '/apuntes/analisis-de-datos/sql/select');
  await input(page).press('Control+k');
  await expect(dialog(page).getByRole('searchbox')).toHaveValue('¿qué es SELECT?');
  await expect(home(page).locator('ul')).toHaveCount(0);
  await dialog(page).getByRole('searchbox').fill('limitar');
  await page.keyboard.press('Escape');
  await expect(dialog(page)).not.toBeVisible();
  await expect(input(page)).toHaveValue('limitar');
  await expect(input(page)).toBeFocused();
  await expect(home(page).getByRole('link').filter({has: page.getByText('LIMIT', {exact: true})})).toBeVisible();
  await home(page).getByRole('button', {name: 'Limpiar búsqueda'}).click();
  await expect(page.locator('[data-catalog]')).toBeVisible();
});

test('atajo desde el menú de temas: un solo diálogo abierto y retorno a un control visible', async ({page}) => {
  if (page.viewportSize()!.width > 996) await page.setViewportSize({width: 768, height: 600});
  await go(page, '/apuntes/analisis-de-datos/sql/select');
  await page.locator('.navbar__toggle').click();
  const topics = page.getByRole('dialog', {name: 'Temas del área', exact: true});
  await expect(topics).toBeVisible();
  await page.keyboard.press('Control+k');
  await expect(dialog(page)).toBeVisible();
  await expect(page.locator('dialog[open]')).toHaveCount(1);
  await expect(topics).toBeHidden();
  await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
  await dialog(page).getByRole('searchbox').fill('filtrar');
  await expect(dialog(page).getByRole('link').filter({has: page.getByText('WHERE',{exact:true})})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toBeHidden();
  await expect(page.getByRole('button', {name: 'Buscar un concepto', exact: true})).toBeFocused();
  await page.locator('[data-scroll-panel="content"] summary').first().click();
  await expect(page.locator('[data-scroll-panel="content"]').getByRole('table').first()).toBeVisible();
});

for (const control of ['área', 'color'] as const) {
  test(`atajo desde el selector de ${control}: cerrar búsqueda devuelve el foco a su control visible`, async ({page}) => {
    if (page.viewportSize()!.width > 996) await page.setViewportSize({width: 768, height: 600});
    await go(page, '/apuntes/analisis-de-datos/sql/select');
    const header = page.locator('.navbar__inner');
    const trigger = control === 'área'
      ? header.getByRole('button', {name: /^Elegir área:/})
      : header.locator('summary[aria-label^="Elegir color de texto:"]');
    await trigger.click();
    const disclosure = trigger.locator('..');
    const option = control === 'área'
      ? disclosure.getByRole('link', {name: 'IA', exact: true})
      : disclosure.locator('input[value="violeta"]');
    await option.focus();
    await expect(option).toBeFocused();
    await page.keyboard.press('Control+k');
    await expect(dialog(page)).toBeVisible();
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(page.locator('dialog[open]')).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toBeInViewport();
  });
}

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
    await expect(home(page).getByRole('link').filter({has: page.getByText('WHERE',{exact:true})})).toBeVisible();
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
  await expect(home(page).getByRole('link').filter({has: page.getByText('WHERE',{exact:true})})).toBeVisible();
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
  await expect(home(page).getByRole('link').filter({has: page.getByText('SELECT', {exact: true})})).toHaveCount(1);
  await expect(home(page).getByRole('link').first()).toHaveAttribute('href', '/apuntes/analisis-de-datos/sql/select');
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
