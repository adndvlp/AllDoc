import {test, expect, type Page} from '@playwright/test';
import {RECENTS_KEY, FAVORITES_KEY} from '../../src/lib/personal-library';
import {goHome} from './header-helpers';

const id = (name: string) => `analisis-de-datos/sql/${name}`;
const route = (name: string) => `/apuntes/${id(name)}`;
const recents = (page: Page) => page.getByRole('region', {name: 'Recientes', exact: true});
const favorites = (page: Page) => page.getByRole('region', {name: 'Favoritos', exact: true});
const search = (page: Page) => page.locator('[data-search-surface="inline"]').getByRole('searchbox');
const star = (page: Page) => page.getByRole('button', {name: /^(Guardar en favoritos|Quitar de favoritos)$/});
async function go(page: Page, path = '/') {
  await page.goto(path, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}
async function storedRecents(page: Page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{"items":[]}').items as {conceptId: string; visitedAt: number}[], RECENTS_KEY);
}

test('recientes: entrada directa, categorías sin visita, historial, recarga y sugerencias del buscador', async ({page}) => {
  await go(page);
  await expect(recents(page)).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), RECENTS_KEY)).toBeNull();
  await go(page, '/apuntes/analisis-de-datos');
  expect(await storedRecents(page)).toEqual([]);
  await go(page, route('select'));
  const first = await storedRecents(page);
  expect(first.map(({conceptId}) => conceptId)).toEqual([id('select')]);
  if (page.viewportSize()!.width <= 996) await page.locator('.navbar__toggle').click();
  const menu = page.viewportSize()!.width <= 996
    ? page.locator('.navbar-sidebar .theme-doc-sidebar-menu')
    : page.locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu');
  await menu.getByRole('button', {name: 'SQL', exact: true}).click();
  await expect(menu.getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'true');
  expect(await storedRecents(page)).toEqual(first);
  await menu.getByRole('link', {name: 'WHERE', exact: true}).click();
  await expect(page).toHaveURL(/\/where$/);
  await expect.poll(async () => (await storedRecents(page)).map(({conceptId}) => conceptId)).toEqual([id('where'), id('select')]);
  await page.goBack();
  await expect(page).toHaveURL(/\/select$/);
  await expect.poll(async () => (await storedRecents(page)).map(({conceptId}) => conceptId)).toEqual([id('select'), id('where')]);
  const beforeReload = await storedRecents(page);
  await page.reload({waitUntil: 'networkidle'});
  await expect.poll(async () => (await storedRecents(page))[0].visitedAt).toBeGreaterThan(beforeReload[0].visitedAt);
  expect((await storedRecents(page)).length).toBe(2);
  await go(page);
  await expect(recents(page).getByRole('link')).toHaveText(['SELECTSQL · Análisis de datos', 'WHERESQL · Análisis de datos']);
  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const dialog = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await expect(dialog.getByRole('link').first()).toContainText('SELECT');
  await expect(dialog.getByRole('link').nth(1)).toContainText('WHERE');
  await expect(dialog.getByRole('link')).toHaveCount(5);
});

test('favorito accesible: respuesta sin desplazamiento, persistencia y foco al quitar el último', async ({page}) => {
  await page.addInitScript(() => {if (!localStorage.getItem('alldoc-palette')) localStorage.setItem('alldoc-palette', 'violeta');});
  await go(page, route('select'));
  const before = await page.locator('[data-sql-concept]').boundingBox();
  await star(page).focus();
  await page.keyboard.press('Space');
  await expect(star(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(star(page)).toBeFocused();
  expect(await page.locator('[data-sql-concept]').boundingBox()).toEqual(before);
  await page.reload({waitUntil: 'networkidle'});
  await expect(star(page)).toHaveAttribute('aria-pressed', 'true');
  await goHome(page);
  await expect(favorites(page).getByRole('link')).toHaveText(['SELECTSQL · Análisis de datos']);
  const visited = await storedRecents(page);
  const remove = favorites(page).getByRole('button', {name: 'Quitar SELECT de favoritos'});
  await remove.focus();
  await page.keyboard.press('Enter');
  await expect(favorites(page)).toHaveCount(0);
  await expect(search(page)).toBeFocused();
  expect(await storedRecents(page)).toEqual(visited);
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).conceptIds, FAVORITES_KEY)).toEqual([]);
  expect(await page.evaluate(() => localStorage.getItem('alldoc-palette'))).toBe('violeta');
});

test('colecciones visibles: orden, quitar conserva foco útil y buscar no desplaza resultados por sincronización', async ({page, context}) => {
  await page.addInitScript(({favoriteKey, recentKey}) => {
    if (!localStorage.getItem(favoriteKey)) {
      localStorage.setItem(favoriteKey, JSON.stringify({version: 1, conceptIds: ['select', 'where', 'limit'].map((name) => `analisis-de-datos/sql/${name}`)}));
      localStorage.setItem(recentKey, JSON.stringify({version: 1, items: ['comentarios', 'limit', 'where'].map((name, i) => ({conceptId: `analisis-de-datos/sql/${name}`, visitedAt: 300 - i}))}));
    }
  }, {favoriteKey: FAVORITES_KEY, recentKey: RECENTS_KEY});
  await go(page);
  await expect(favorites(page).getByRole('link')).toHaveCount(3);
  await expect(recents(page).getByRole('link')).toHaveCount(3);
  await expect(page).toHaveScreenshot('colecciones.png');
  await favorites(page).getByRole('button', {name: 'Quitar WHERE de favoritos'}).focus();
  await page.keyboard.press('Space');
  await expect(favorites(page).getByRole('button', {name: 'Quitar LIMIT de favoritos'})).toBeFocused();
  await search(page).fill('filtrar');
  const results = page.locator('[data-search-surface="inline"]').getByRole('link');
  await expect(results).toHaveCount(1);
  const before = await results.first().boundingBox();
  const other = await context.newPage();
  await go(other);
  await other.evaluate((key) => localStorage.setItem(key, JSON.stringify({version: 1, items: [{conceptId: 'analisis-de-datos/sql/order-by', visitedAt: 500}]})), RECENTS_KEY);
  // Espera la actualización real del store a través de storage.
  await search(page).fill('');
  await expect(recents(page).getByRole('link').first()).toContainText('ORDER BY');
  await search(page).fill('filtrar');
  await expect(results).toHaveCount(1);
  expect(await results.first().boundingBox()).toEqual(before);
  await expect(search(page)).toBeFocused();
  await other.close();
});

test('datos dañados o retirados: no se escriben al iniciar; la siguiente acción limpia solo su colección', async ({page}) => {
  await page.addInitScript(({favoriteKey, recentKey}) => {
    localStorage.setItem(favoriteKey, JSON.stringify({version: 1, conceptIds: ['retirado', 'analisis-de-datos/sql/where', 'analisis-de-datos/sql/where']}));
    localStorage.setItem(recentKey, '{roto');
    localStorage.setItem('alldoc-palette', 'rojo');
  }, {favoriteKey: FAVORITES_KEY, recentKey: RECENTS_KEY});
  await go(page);
  await expect(favorites(page).getByRole('link')).toHaveText(['WHERESQL · Análisis de datos']);
  await expect(recents(page)).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), RECENTS_KEY)).toBe('{roto');
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).conceptIds.length, FAVORITES_KEY)).toBe(3);
  await favorites(page).getByRole('button', {name: 'Quitar WHERE de favoritos'}).click();
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).conceptIds, FAVORITES_KEY)).toEqual([]);
  expect(await page.evaluate((key) => localStorage.getItem(key), RECENTS_KEY)).toBe('{roto');
  expect(await page.evaluate(() => localStorage.getItem('alldoc-palette'))).toBe('rojo');
  await page.locator('[data-catalog]').getByLabel('SQL', {exact: true}).click();
  await page.locator('[data-catalog]').getByRole('link').filter({hasText: 'SELECT'}).click();
  await expect(page).toHaveURL(/\/select$/);
  await expect.poll(async () => (await storedRecents(page)).map(({conceptId}) => conceptId)).toEqual([id('select')]);
});

for (const mode of ['bloqueado', 'lleno'] as const) {
  test(`almacenamiento ${mode}: lectura, navegación y favoritos siguen en memoria`, async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(({mode, prefix}) => {
      if (mode === 'bloqueado') Object.defineProperty(window, 'localStorage', {get() {throw new DOMException('Blocked', 'SecurityError');}});
      else {
        const set = Storage.prototype.setItem;
        Storage.prototype.setItem = function(key, value) {
          if (key.startsWith(prefix)) throw new DOMException('Full', 'QuotaExceededError');
          set.call(this, key, value);
        };
      }
    }, {mode, prefix: 'alldoc-'});
    await go(page, route('select'));
    await expect(page.getByRole('heading', {name: 'SELECT', exact: true})).toBeVisible();
    await star(page).click();
    await expect(star(page)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('status').filter({hasText: 'Guardado en esta sesión'})).toBeVisible();
    await goHome(page);
    await expect(favorites(page).getByRole('link')).toContainText('SELECT');
    await expect(recents(page).getByRole('link')).toContainText('SELECT');
    await favorites(page).getByRole('link').click();
    await expect(star(page)).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);
  });
}

test('dos pestañas sincronizan favoritos y recientes sin sobrescribir la otra colección ni la paleta', async ({page, context}) => {
  await go(page, route('select'));
  const other = await context.newPage();
  await go(other);
  const visited = await storedRecents(page);
  await star(page).click();
  await expect(favorites(other).getByRole('link')).toContainText('SELECT');
  await star(page).focus();
  await favorites(other).getByRole('button', {name: 'Quitar SELECT de favoritos'}).click();
  await expect(star(page)).toHaveAttribute('aria-pressed', 'false');
  await expect(star(page)).toBeFocused();
  expect(await storedRecents(page)).toEqual(visited);
  await other.locator('[data-catalog]').getByLabel('SQL', {exact: true}).click();
  await other.locator('[data-catalog]').getByRole('link').filter({hasText: 'WHERE'}).click();
  await expect(other).toHaveURL(/\/where$/);
  await goHome(page);
  await expect(recents(page).getByRole('link').first()).toContainText('WHERE');
  await expect(recents(page).getByRole('link')).toHaveCount(2);
  await other.evaluate((key) => localStorage.setItem(key, JSON.stringify({version: 1, conceptIds: ['retirado', 'analisis-de-datos/sql/limit']})), FAVORITES_KEY);
  await expect(favorites(page).getByRole('link')).toHaveText(['LIMITSQL · Análisis de datos']);
  expect(await storedRecents(page)).toHaveLength(2);
  await other.evaluate((key) => localStorage.removeItem(key), FAVORITES_KEY);
  await expect(favorites(page)).toHaveCount(0);
  await expect(recents(page).getByRole('link')).toHaveCount(2);
  await other.close();
});
