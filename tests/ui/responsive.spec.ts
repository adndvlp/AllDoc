import {openSqlGroup, openCatalogSqlGroup} from './sql-tree-helpers';
import {test, expect} from '@playwright/test';
import type {Locator, Page} from '@playwright/test';
import {chooseHeaderArea} from './header-helpers';
import {focusSearchResult} from './search-helpers';

const selectRoute = '/apuntes/analisis-de-datos/sql/select';
const browserErrors = new WeakMap<Page, string[]>();

async function openPage(page: Page, route = selectRoute) {
  await page.goto(route, {waitUntil: 'networkidle'});
}

async function fitsViewport(page: Page, element: Locator) {
  const box = await element.boundingBox();
  expect(box).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(box!.x).toBeGreaterThanOrEqual(-1);
  expect(box!.y).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height + 1);
}

async function noPageOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const reader = document.querySelector('[data-scroll-panel="content"]');
    return {
      page: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1,
      reader: reader ? reader.scrollWidth > reader.clientWidth + 1 : false,
      documentScroll: window.scrollY,
    };
  });
  expect(overflow).toEqual({page: false, reader: false, documentScroll: 0});
}

async function openTopics(page: Page) {
  if (page.viewportSize()!.width <= 996) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar')).toHaveClass(/navbar-sidebar--show/);
    const menu = page.locator('.navbar-sidebar .theme-doc-sidebar-menu');
    await expect(menu).toBeVisible();
    return menu;
  }
  return page.locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu');
}

test.beforeEach(async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {if (message.type() === 'error') errors.push(message.text());});
  await page.addInitScript(() => {
    if (!localStorage.getItem('alldoc-palette')) localStorage.setItem('alldoc-palette', 'azul');
  });
  browserErrors.set(page, errors);
});

test.afterEach(async ({page}) => {
  expect(browserErrors.get(page) ?? []).toEqual([]);
});

test('inicio sin desbordamientos', async ({page}) => {
  await openPage(page, '/');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
  await noPageOverflow(page);
  await fitsViewport(page, page.locator('.navbar__inner'));
  await expect(page).toHaveScreenshot('inicio.png');
});

test('apunte compacto y resultados legibles', async ({page}) => {
  await openPage(page);
  await expect(page.locator('[data-sql-example]')).toHaveCount(2);
  await noPageOverflow(page);
  await expect(page).toHaveScreenshot('select.png');
  await page.getByText('Ver resultado', {exact: false}).first().click();
  await expect(page.locator('[data-sql-example]').first().getByRole('table')).toBeVisible();
  await noPageOverflow(page);
});

test('grupos contraídos, logos y navegación desde el menú', async ({page}) => {
  await openPage(page);
  const menu = await openTopics(page);
  await expect(menu.getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('button', {name: 'SELECT', exact: true})).toHaveAttribute('aria-expanded', 'true');
  for (const label of ['Tablas y archivos', 'Cálculo científico']) {
    await expect(menu.getByRole('button', {name: label, exact: true})).toHaveAttribute('aria-expanded', 'false');
  }
  const originalUrl = page.url();
  for (const label of ['SQL', 'Tablas y archivos', 'Conexiones SQL']) {
    const button = menu.getByRole('button', {name: label, exact: true});
    if (await button.getAttribute('aria-expanded') === 'false') await button.click();
    await expect(menu.getByRole('button', {name: label, exact: true})).toHaveAttribute('aria-expanded', 'true');
    expect(page.url()).toBe(originalUrl);
  }
  await expect(menu.getByRole('button', {name: 'openpyxl', exact: true}).locator('[data-topic-icon]')).toBeVisible();
  for (const label of ['Pandas', 'openpyxl']) {
    const button = menu.getByRole('button', {name: label, exact: true});
    await button.click();
    const category = button.locator('..').locator('..');
    if (label === 'Pandas') {
      const group = category.getByRole('button', {name: 'Series y DataFrame', exact: true});
      await expect(group).toHaveAttribute('aria-expanded', 'false');
      await group.click();
      const dataframe = category.getByRole('link', {name: 'DataFrame', exact: true});
      await expect(dataframe).toBeVisible();
      await expect(dataframe).toHaveAttribute('href', '/apuntes/analisis-de-datos/pandas/series-y-dataframe/dataframe');
      await expect(category.getByRole('link', {name: 'Crear una tabla de productos', exact: true})).toBeVisible();
    } else await expect(category.getByRole('button', {name: 'Workbook y archivos', exact: true})).toHaveAttribute('aria-expanded', 'false');
  }
  await expect.poll(async () => menu.locator('img[data-topic-icon]').evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await menu.locator('svg image').evaluateAll((images) => Promise.all(images.map((image) => {
    const source = new Image();
    source.src = (image as SVGImageElement).href.baseVal;
    return source.decode();
  })));
  // Espera a que los grupos terminen de ocupar su altura antes de fijar el encuadre.
  await expect.poll(() => menu.evaluate((root) =>
    [...root.querySelectorAll<HTMLElement>('.menu__list-item:not(.menu__list-item--collapsed) > .menu__list')]
      .every((list) => list.clientHeight >= list.scrollHeight - 1),
  )).toBe(true);
  const scroller = page.viewportSize()!.width <= 996
    ? page.locator('.navbar-sidebar__item:has(.theme-doc-sidebar-menu)')
    : page.locator('.theme-doc-sidebar-container nav.menu');
  await menu.evaluate((root) => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && root.contains(focused)) focused.blur();
  });
  await scroller.evaluate((element) => element.scrollTo({top: 0, left: 0, behavior: 'instant'}));
  await expect.poll(() => scroller.evaluate((element) => element.scrollTop)).toBe(0);
  await expect(menu.locator(':scope > .sidebar-topic-group > .menu__list-item-collapsible')
    .getByRole('button', {name: 'Hojas de cálculo', exact: true})).toBeInViewport();
  await page.mouse.move(page.viewportSize()!.width - 1, 0);
  await expect(page).toHaveScreenshot('menu.png');
  const where = await openSqlGroup(menu, 'WHERE');
  await where.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/sql\/where$/);
  await expect(page.getByRole('heading', {name: 'WHERE', exact: true})).toBeVisible();
  if (page.viewportSize()!.width <= 996) await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
});

test('buscador accesible y dentro de la pantalla', async ({page}, testInfo) => {
  await openPage(page);
  await page.getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const dialog = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole('searchbox');
  await input.fill('filtrar');
  const result = dialog.locator('a[href="/apuntes/analisis-de-datos/sql/where"]');
  await expect(dialog.getByRole('link').first()).toHaveAttribute('href', '/apuntes/analisis-de-datos/power-query/filtrar-filas/definicion');
  await fitsViewport(page, dialog);
  await fitsViewport(page, dialog.getByRole('button', {name: 'Cerrar buscador'}));
  await expect(page).toHaveScreenshot('buscador.png');
  await dialog.getByRole('button', {name: /Mostrar más resultados/}).click();
  await expect(result).toHaveCount(1);
  if (testInfo.project.use.hasTouch) {
    await result.click();
  } else {
    await focusSearchResult(dialog, result);
    await page.keyboard.press('Enter');
  }
  await expect(page).toHaveURL(/\/sql\/where$/);
  await expect(dialog).not.toBeVisible();
});

test('selector de texto visible y elección persistente', async ({page}) => {
  await openPage(page);
  const summary = page.locator('summary[aria-label^="Elegir color de texto:"]');
  await summary.click();
  const selector = summary.locator('..');
  const panel = selector.locator('fieldset').locator('..');
  await fitsViewport(page, panel);
  await selector.getByText('Violeta', {exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'violeta');
  await expect(selector.locator('input[value="violeta"]')).toBeChecked();
  await expect(selector).not.toHaveAttribute('open');
  await expect(summary).toBeFocused();
  // Captura del selector abierto con la elección ya aplicada.
  await summary.click();
  await expect(page).toHaveScreenshot('color-texto.png');
  await page.reload({waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'violeta');
  // Infima pinta el fondo en html; body permanece transparente.
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(page.locator('[data-sql-concept] .token.keyword').first()).toHaveCSS('color', 'rgb(176, 44, 255)');
});

test('la navegación se adapta al girar el dispositivo', async ({page}, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'La rotación se prueba en los proyectos táctiles.');
  await openPage(page);
  const original = page.viewportSize()!;
  const rotated = {width: original.height, height: original.width};
  await page.setViewportSize(rotated);
  await expect(page.getByRole('heading', {name: 'SELECT', exact: true})).toBeVisible();
  if (rotated.width <= 996) {
    await expect(page.locator('.navbar__toggle')).toBeVisible();
    await expect(page.locator('.navbar__inner').getByRole('button', {name: /^Elegir área:/})).toBeVisible();
  } else {
    await expect(page.locator('.navbar__toggle')).toBeHidden();
    await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  }
  await noPageOverflow(page);
  const menu = await openTopics(page);
  const where = await openSqlGroup(menu, 'WHERE');
  await where.getByRole('link', {name: 'Definición', exact: true}).click();
  await expect(page).toHaveURL(/\/sql\/where$/);
});

test('las áreas se pueden abrir desde el encabezado', async ({page}) => {
  await openPage(page);
  await chooseHeaderArea(page, 'Desarrollo web');
  await expect(page).toHaveURL(/\/apuntes\/desarrollo-web$/);
  await expect(page.getByRole('heading', {name: 'Desarrollo web', exact: true})).toBeVisible();
  await noPageOverflow(page);
  await chooseHeaderArea(page, 'IA');
  await expect(page).toHaveURL(/\/apuntes\/ia$/);
  await noPageOverflow(page);
});

test('scroll independiente del contenido y el sidebar', async ({page}) => {
  test.skip(page.viewportSize()!.width <= 996, 'En pantallas pequeñas los temas están en un panel móvil.');
  await page.setViewportSize({width: page.viewportSize()!.width, height: 400});
  await openPage(page);
  for (const result of await page.getByText('Ver resultado', {exact: false}).all()) await result.click();
  const menu = await openTopics(page);
  const labels = ['Hojas de cálculo', 'Power Query', 'SQL', 'Tablas y archivos', 'Cálculo científico', 'Visualización', 'Conexiones SQL', 'Peticiones y formatos', 'R', 'Power BI', 'Tableau', 'Pandas', 'openpyxl', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn'];
  for (const label of labels) {
    const button = menu.getByRole('button', {name: label, exact: true});
    if (await button.getAttribute('aria-expanded') === 'false') await button.click();
  }
  const reader = page.locator('[data-scroll-panel="content"]');
  const sidebar = page.locator('.theme-doc-sidebar-container nav.menu');
  await reader.evaluate((element) => {element.scrollTop = 0;});
  await sidebar.evaluate((element) => {element.scrollTop = 0;});
  const header = await page.locator('.navbar').boundingBox();
  await reader.hover();
  await page.mouse.wheel(0, 700);
  await expect.poll(() => reader.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  expect(await sidebar.evaluate((element) => element.scrollTop)).toBe(0);
  const contentTop = await reader.evaluate((element) => element.scrollTop);
  await sidebar.hover();
  await page.mouse.wheel(0, 10_000);
  await expect.poll(() => sidebar.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await page.mouse.wheel(0, 10_000);
  expect(await reader.evaluate((element) => element.scrollTop)).toBe(contentTop);
  expect(await page.locator('.navbar').boundingBox()).toEqual(header);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('footer')).toHaveCount(0);
});
