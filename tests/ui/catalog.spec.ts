import {test, expect, type Page} from '@playwright/test';

const library = (page: Page) => page.locator('[data-catalog]');
const item = (page: Page, id: string) => library(page).locator(`[data-catalog-item="${id}"] > details`);
const headerAreas = (page: Page) => page.viewportSize()!.width <= 996
  ? page.getByRole('navigation', {name: 'Áreas de estudio', exact: true})
  : page.locator('.navbar__inner > .navbar__items').first();
const search = (page: Page) => page.locator('[data-search-surface="inline"]').getByRole('searchbox');
async function go(page: Page, route = '/') {
  await page.goto(route, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1)).toBe(false);
  expect(await library(page).evaluate((element) => element.scrollWidth > element.clientWidth + 1)).toBe(false);
}

test('portada: catálogo completo contraído, despliegues independientes y navegación directa a un concepto', async ({page}) => {
  await go(page);
  await expect(library(page)).toHaveAttribute('data-catalog', 'analisis-de-datos');
  await expect(page.locator('[data-personal-shortcuts]')).toHaveCount(0);
  await expect(library(page).locator('details')).toHaveCount(24);
  await expect(library(page).locator('details[open]')).toHaveCount(0);
  expect(await library(page).locator(':scope > ul > li > details > summary').evaluateAll((summaries) => summaries.map((summary) => summary.getAttribute('aria-label')))).toEqual([
    'Excel', 'Power Query', 'SQL', 'Tablas y archivos', 'Cálculo científico', 'Visualización',
    'Conexiones SQL', 'Peticiones y formatos', 'R', 'Power BI', 'Tableau',
  ]);
  await expect(library(page).getByLabel('SQL', {exact: true})).toContainText('5 conceptos');
  expect(await library(page).locator('[data-topic-icon]:not([data-icon-kind="group"])').evaluateAll((icons) => icons.map((icon) => icon.getAttribute('data-topic-icon')))).toEqual([
    'Excel', 'Power Query', 'SQL', 'Pandas', 'openpyxl', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn',
    'SQLAlchemy', 'sqlite3', 'mysql-connector-python', 'psycopg', 'requests', 'httpx', 'json', 'R', 'Power BI', 'Tableau',
  ]);
  await library(page).getByLabel('SQL', {exact: true}).focus();
  await page.keyboard.press('Enter');
  await expect(item(page, 'sql')).toHaveAttribute('open', '');
  await library(page).getByLabel('Tablas y archivos', {exact: true}).click();
  await library(page).getByLabel('Pandas', {exact: true}).click();
  await expect(item(page, 'sql')).toHaveAttribute('open', '');
  await expect(item(page, 'pandas').getByText('Sin apuntes todavía', {exact: true})).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('alldoc-recents-v1'))).toBeNull();
  await noOverflow(page);
  await library(page).locator('img[data-topic-icon]').evaluateAll((images) => Promise.all(images.map((image) => (image as HTMLImageElement).decode())));
  await expect(page).toHaveScreenshot('catalogo.png');
  await item(page, 'sql').getByRole('link').filter({hasText: 'WHERE'}).click();
  await expect(page).toHaveURL(/\/sql\/where$/);
  await expect(page.getByRole('heading', {name: 'WHERE', exact: true})).toBeVisible();
  if (page.viewportSize()!.width <= 996) await page.locator('.navbar__toggle').click();
  const sidebar = page.viewportSize()!.width <= 996
    ? page.locator('.navbar-sidebar .theme-doc-sidebar-menu')
    : page.locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu');
  await expect(sidebar.getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  if (page.viewportSize()!.width <= 996) await page.getByRole('button', {name: 'Cerrar barra de lateral', exact: true}).click();
  await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
});

test('cambiar área conserva URL, búsqueda y accesos globales; contrae el catálogo y no persiste selección', async ({page}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('alldoc-favorites-v1')) {
      localStorage.setItem('alldoc-favorites-v1', JSON.stringify({version: 1, conceptIds: ['analisis-de-datos/sql/select']}));
      localStorage.setItem('alldoc-recents-v1', JSON.stringify({version: 1, items: [{conceptId: 'analisis-de-datos/sql/where', visitedAt: 100}]}));
    }
  });
  await go(page);
  const before = await page.evaluate(() => ({recents: localStorage.getItem('alldoc-recents-v1'), favorites: localStorage.getItem('alldoc-favorites-v1')}));
  await library(page).getByLabel('SQL', {exact: true}).click();
  await search(page).fill('filtrar');
  await headerAreas(page).getByRole('button', {name: 'Desarrollo web', exact: true}).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(search(page)).toHaveValue('filtrar');
  await expect(page.locator('[data-search-surface="inline"]').getByRole('link')).toContainText('WHERE');
  await expect(headerAreas(page).getByRole('button', {name: 'Desarrollo web', exact: true})).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', {name: 'Limpiar búsqueda', exact: true}).click();
  await expect(library(page)).toHaveAttribute('data-catalog', 'desarrollo-web');
  await expect(library(page).getByText('Sin apuntes todavía', {exact: true})).toBeVisible();
  await expect(page.getByRole('region', {name: 'Favoritos', exact: true}).getByRole('link')).toContainText('SELECT');
  await expect(page.getByRole('region', {name: 'Recientes', exact: true}).getByRole('link')).toContainText('WHERE');
  await headerAreas(page).getByRole('button', {name: 'Análisis de datos', exact: true}).click();
  await expect(library(page).locator('details[open]')).toHaveCount(0);
  await headerAreas(page).getByRole('button', {name: 'IA', exact: true}).click();
  await page.reload({waitUntil: 'networkidle'});
  await expect(library(page)).toHaveAttribute('data-catalog', 'analisis-de-datos');
  expect(await page.evaluate(() => ({recents: localStorage.getItem('alldoc-recents-v1'), favorites: localStorage.getItem('alldoc-favorites-v1')}))).toEqual(before);
  if (page.viewportSize()!.width <= 996) {
    await page.locator('.navbar__toggle').click();
    await page.locator('.navbar-sidebar').getByRole('button', {name: 'IA', exact: true}).click();
    await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
    await expect(library(page)).toHaveAttribute('data-catalog', 'ia');
    await expect(page).toHaveURL(/\/$/);
  }
});

test('páginas de área: mismo catálogo, sidebar independiente y áreas vacías sin contenido ficticio', async ({page}) => {
  await go(page, '/apuntes/analisis-de-datos');
  await expect(library(page).locator('details')).toHaveCount(24);
  await expect(library(page).locator('details[open]')).toHaveCount(0);
  await library(page).getByLabel('SQL', {exact: true}).click();
  await expect(item(page, 'sql').getByRole('link')).toHaveCount(5);
  await noOverflow(page);
  await expect(page).toHaveScreenshot('area.png');
  if (page.viewportSize()!.width > 996) await expect(page.locator('.theme-doc-sidebar-container').getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  for (const [areaId, title] of [['desarrollo-web', 'Desarrollo web'], ['ia', 'IA']]) {
    await headerAreas(page).getByRole('link', {name: title, exact: true}).click();
    await expect(page).toHaveURL(new RegExp(`/apuntes/${areaId}$`));
    await expect(page.getByRole('heading', {level: 1, name: title, exact: true})).toHaveCount(1);
    await expect(library(page)).toHaveAttribute('data-catalog', areaId);
    await expect(library(page).getByText('Sin apuntes todavía', {exact: true})).toBeVisible();
    await expect(library(page).getByRole('link')).toHaveCount(0);
    await expect(library(page).locator('details')).toHaveCount(0);
    await noOverflow(page);
  }
});

test('buscar y limpiar conserva despliegues; el catálogo no crea otro panel de scroll', async ({page}) => {
  await go(page);
  await library(page).getByLabel('SQL', {exact: true}).click();
  await library(page).getByLabel('Conexiones SQL', {exact: true}).click();
  await library(page).getByLabel('mysql-connector-python', {exact: true}).click();
  await search(page).fill('ordenar');
  await expect(library(page)).not.toBeVisible();
  await page.getByRole('button', {name: 'Limpiar búsqueda', exact: true}).click();
  for (const name of ['sql', 'conexiones-sql', 'mysql-connector-python']) await expect(item(page, name)).toHaveAttribute('open', '');
  expect(await library(page).evaluate((element) => ({overflow: getComputedStyle(element).overflowY, scrolls: element.scrollHeight > element.clientHeight + 1}))).toEqual({overflow: 'visible', scrolls: false});
  await noOverflow(page);
  await library(page).getByLabel('SQL', {exact: true}).focus();
  await page.keyboard.press('Space');
  await expect(item(page, 'sql')).not.toHaveAttribute('open');
  await expect(item(page, 'conexiones-sql')).toHaveAttribute('open', '');
});
