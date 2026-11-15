# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog.spec.ts >> páginas de área: mismo catálogo, sidebar independiente y áreas vacías sin contenido ficticio
- Location: tests/ui/catalog.spec.ts:89:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "true"
Received: ""
Timeout:  7000ms

Call log:
  - Expect "toHaveAttribute" locator('html') with timeout 7000ms
  - waiting for locator('html')
    18 × locator resolved to <html>…</html>
       - unexpected value "null"

```

```yaml
- document
```

# Test source

```ts
  1   | import {test, expect, type Page} from '@playwright/test';
  2   | import {chooseHeaderArea, expectSelectedHeaderArea} from './header-helpers';
  3   | 
  4   | const library = (page: Page) => page.locator('[data-catalog]');
  5   | const item = (page: Page, id: string) => library(page).locator(`[data-catalog-item="${id}"] > details`);
  6   | const search = (page: Page) => page.locator('[data-search-surface="inline"]').getByRole('searchbox');
  7   | async function go(page: Page, route = '/') {
  8   |   await page.goto(route, {waitUntil: 'networkidle'});
> 9   |   await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
      |                                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  10  | }
  11  | async function noOverflow(page: Page) {
  12  |   expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1)).toBe(false);
  13  |   expect(await library(page).evaluate((element) => element.scrollWidth > element.clientWidth + 1)).toBe(false);
  14  | }
  15  | 
  16  | test('portada: catálogo completo contraído, despliegues independientes y navegación directa a un concepto', async ({page}) => {
  17  |   await go(page);
  18  |   await expect(library(page)).toHaveAttribute('data-catalog', 'analisis-de-datos');
  19  |   await expect(page.locator('[data-personal-shortcuts]')).toHaveCount(0);
  20  |   await expect(library(page).locator('details')).toHaveCount(24);
  21  |   await expect(library(page).locator('details[open]')).toHaveCount(0);
  22  |   expect(await library(page).locator(':scope > ul > li > details > summary').evaluateAll((summaries) => summaries.map((summary) => summary.getAttribute('aria-label')))).toEqual([
  23  |     'Excel', 'Power Query', 'SQL', 'Tablas y archivos', 'Cálculo científico', 'Visualización',
  24  |     'Conexiones SQL', 'Peticiones y formatos', 'R', 'Power BI', 'Tableau',
  25  |   ]);
  26  |   await expect(library(page).getByLabel('SQL', {exact: true})).toContainText('5 conceptos');
  27  |   expect(await library(page).locator('[data-topic-icon]:not([data-icon-kind="group"])').evaluateAll((icons) => icons.map((icon) => icon.getAttribute('data-topic-icon')))).toEqual([
  28  |     'Excel', 'Power Query', 'SQL', 'Pandas', 'openpyxl', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn',
  29  |     'SQLAlchemy', 'sqlite3', 'mysql-connector-python', 'psycopg', 'requests', 'httpx', 'json', 'R', 'Power BI', 'Tableau',
  30  |   ]);
  31  |   await library(page).getByLabel('SQL', {exact: true}).focus();
  32  |   await page.keyboard.press('Enter');
  33  |   await expect(item(page, 'sql')).toHaveAttribute('open', '');
  34  |   await library(page).getByLabel('Tablas y archivos', {exact: true}).click();
  35  |   await library(page).getByLabel('Pandas', {exact: true}).click();
  36  |   await expect(item(page, 'sql')).toHaveAttribute('open', '');
  37  |   await expect(item(page, 'pandas').getByRole('link', {name: /DataFrame/})).toBeVisible();
  38  |   await expect(page).toHaveURL(/\/$/);
  39  |   expect(await page.evaluate(() => localStorage.getItem('alldoc-recents-v1'))).toBeNull();
  40  |   await noOverflow(page);
  41  |   await library(page).locator('img[data-topic-icon]').evaluateAll((images) => Promise.all(images.map((image) => (image as HTMLImageElement).decode())));
  42  |   await expect(page).toHaveScreenshot('catalogo.png');
  43  |   await item(page, 'sql').getByRole('link').filter({hasText: 'WHERE'}).click();
  44  |   await expect(page).toHaveURL(/\/sql\/where$/);
  45  |   await expect(page.getByRole('heading', {name: 'WHERE', exact: true})).toBeVisible();
  46  |   if (page.viewportSize()!.width <= 996) await page.locator('.navbar__toggle').click();
  47  |   const sidebar = page.viewportSize()!.width <= 996
  48  |     ? page.locator('.navbar-sidebar .theme-doc-sidebar-menu')
  49  |     : page.locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu');
  50  |   await expect(sidebar.getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  51  |   if (page.viewportSize()!.width <= 996) await page.getByRole('button', {name: 'Cerrar barra de lateral', exact: true}).click();
  52  |   await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
  53  | });
  54  | 
  55  | test('cambiar área conserva URL, búsqueda y accesos globales; contrae el catálogo y no persiste selección', async ({page}) => {
  56  |   await page.addInitScript(() => {
  57  |     if (!localStorage.getItem('alldoc-favorites-v1')) {
  58  |       localStorage.setItem('alldoc-favorites-v1', JSON.stringify({version: 1, conceptIds: ['analisis-de-datos/sql/select']}));
  59  |       localStorage.setItem('alldoc-recents-v1', JSON.stringify({version: 1, items: [{conceptId: 'analisis-de-datos/sql/where', visitedAt: 100}]}));
  60  |     }
  61  |   });
  62  |   await go(page);
  63  |   const before = await page.evaluate(() => ({recents: localStorage.getItem('alldoc-recents-v1'), favorites: localStorage.getItem('alldoc-favorites-v1')}));
  64  |   await library(page).getByLabel('SQL', {exact: true}).click();
  65  |   await search(page).fill('filtrar');
  66  |   await chooseHeaderArea(page, 'Desarrollo web');
  67  |   await expect(page).toHaveURL(/\/$/);
  68  |   await expect(search(page)).toHaveValue('filtrar');
  69  |   await expect(page.locator('[data-search-surface="inline"]').getByRole('link')).toContainText('WHERE');
  70  |   await expectSelectedHeaderArea(page, 'Desarrollo web');
  71  |   await page.getByRole('button', {name: 'Limpiar búsqueda', exact: true}).click();
  72  |   await expect(library(page)).toHaveAttribute('data-catalog', 'desarrollo-web');
  73  |   await expect(library(page).getByText('Sin apuntes todavía', {exact: true})).toBeVisible();
  74  |   await expect(page.getByRole('region', {name: 'Favoritos', exact: true}).getByRole('link')).toContainText('SELECT');
  75  |   await expect(page.getByRole('region', {name: 'Recientes', exact: true}).getByRole('link')).toContainText('WHERE');
  76  |   await chooseHeaderArea(page, 'Análisis de datos');
  77  |   await expect(library(page).locator('details[open]')).toHaveCount(0);
  78  |   await chooseHeaderArea(page, 'IA');
  79  |   await page.reload({waitUntil: 'networkidle'});
  80  |   await expect(library(page)).toHaveAttribute('data-catalog', 'analisis-de-datos');
  81  |   expect(await page.evaluate(() => ({recents: localStorage.getItem('alldoc-recents-v1'), favorites: localStorage.getItem('alldoc-favorites-v1')}))).toEqual(before);
  82  |   await chooseHeaderArea(page, 'IA');
  83  |   await expectSelectedHeaderArea(page, 'IA');
  84  |   await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
  85  |   await expect(library(page)).toHaveAttribute('data-catalog', 'ia');
  86  |   await expect(page).toHaveURL(/\/$/);
  87  | });
  88  | 
  89  | test('páginas de área: mismo catálogo, sidebar independiente y áreas vacías sin contenido ficticio', async ({page}) => {
  90  |   await go(page, '/apuntes/analisis-de-datos');
  91  |   await expect(library(page).locator('details')).toHaveCount(24);
  92  |   await expect(library(page).locator('details[open]')).toHaveCount(0);
  93  |   await library(page).getByLabel('SQL', {exact: true}).click();
  94  |   await expect(item(page, 'sql').getByRole('link')).toHaveCount(5);
  95  |   await noOverflow(page);
  96  |   await expect(page).toHaveScreenshot('area.png');
  97  |   if (page.viewportSize()!.width > 996) await expect(page.locator('.theme-doc-sidebar-container').getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  98  |   for (const [areaId, title] of [['desarrollo-web', 'Desarrollo web'], ['ia', 'IA']]) {
  99  |     await chooseHeaderArea(page, title);
  100 |     await expect(page).toHaveURL(new RegExp(`/apuntes/${areaId}$`));
  101 |     await expect(page.getByRole('heading', {level: 1, name: title, exact: true})).toHaveCount(1);
  102 |     await expect(library(page)).toHaveAttribute('data-catalog', areaId);
  103 |     await expect(library(page).getByText('Sin apuntes todavía', {exact: true})).toBeVisible();
  104 |     await expect(library(page).getByRole('link')).toHaveCount(0);
  105 |     await expect(library(page).locator('details')).toHaveCount(0);
  106 |     await noOverflow(page);
  107 |   }
  108 | });
  109 | 
```