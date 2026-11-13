import {test, expect, type Page, type Locator} from '@playwright/test';
import {sqlConcepts} from '../../src/content/sql';
import {palettes} from '../../src/content/palettes';

const route = (id: string) => `/apuntes/analisis-de-datos/sql/${id}`;
const reader = (page: Page) => page.locator('[data-scroll-panel="content"]');
const card = (page: Page) => page.locator('[data-sql-concept]');
const examples = (page: Page) => page.locator('[data-sql-example]');
async function go(page: Page, id = 'select') {
  await page.goto(route(id), {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}
async function noPageOverflow(page: Page) {
  expect(await page.evaluate(() => ({page: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1, scroll: window.scrollY}))).toEqual({page: false, scroll: 0});
  expect(await reader(page).evaluate((element) => element.scrollWidth > element.clientWidth + 1)).toBe(false);
}
async function fontSize(locator: Locator) {
  return locator.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
}

test('una envoltura por ejemplo, tipografía legible y contenido esencial compacto', async ({page}) => {
  expect(sqlConcepts.map(({id, examples}) => [id, examples.length])).toEqual([
    ['select', 2], ['where', 1], ['order-by', 1], ['limit', 2], ['comentarios', 2],
  ]);
  for (const concept of sqlConcepts) {
    await go(page, concept.id);
    await expect(page.getByRole('heading', {level: 1, name: concept.title, exact: true})).toHaveCount(1);
    await expect(examples(page)).toHaveCount(concept.examples.length);
    await expect(examples(page).locator('details[open]')).toHaveCount(0);
    for (let i = 0; i < concept.examples.length; i++) {
      const example = examples(page).nth(i);
      const borders = await example.locator('.theme-code-block').evaluate((element) => {
        const style = getComputedStyle(element);
        return [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth].map(parseFloat);
      });
      expect(borders, `${concept.title}: el código comparte la envoltura exterior`).toEqual([0, 0, 0, 0]);
      await expect(example.getByRole('heading', {level: 2, name: concept.examples[i].title, exact: true})).toHaveCount(1);
      expect(await fontSize(example.locator('pre code')), `${concept.title}: código de al menos 14 px`).toBeGreaterThanOrEqual(14);
      expect(await fontSize(example.getByText(concept.examples[i].hint, {exact: true}))).toBeGreaterThanOrEqual(14);
      const code = (await example.locator('pre code .token-line').allTextContents()).join('\n');
      expect(code.trimEnd()).toBe(concept.examples[i].code.trimEnd());
    }
    const viewport = page.viewportSize()!;
    if ((viewport.width === 390 && viewport.height === 844) || (viewport.width === 1280 && viewport.height === 800)) {
      const bounds = await reader(page).boundingBox();
      for (const element of [page.getByRole('heading', {level: 1}), card(page).locator(':scope > p').first(), examples(page), card(page).getByText(concept.remember, {exact: true})]) {
        for (const match of await element.all()) {
          const box = await match.boundingBox();
          expect(box, concept.title).not.toBeNull();
          expect(box!.y, concept.title).toBeGreaterThanOrEqual(bounds!.y - 1);
          expect(box!.y + box!.height, `${concept.title}: contenido esencial sin scroll`).toBeLessThanOrEqual(bounds!.y + bounds!.height + 1);
        }
      }
      expect(await reader(page).evaluate((element) => element.scrollTop)).toBe(0);
    }
    await noPageOverflow(page);
    if (concept.id === 'comentarios') await expect(page).toHaveScreenshot('comentarios.png');
  }
});

test('resultados independientes, tabla semántica y scroll horizontal limitado al resultado', async ({page}) => {
  await go(page);
  const first = examples(page).first();
  const second = examples(page).nth(1);
  await first.locator('summary').focus();
  await page.keyboard.press('Space');
  await expect(first.locator('details')).toHaveAttribute('open', '');
  await expect(second.locator('details')).not.toHaveAttribute('open');
  const table = first.getByRole('table', {name: 'Resultado de SELECT: Todas las columnas', exact: true});
  await expect(table.getByRole('columnheader')).toHaveText(['nombre', 'categoria', 'precio']);
  await expect(table.locator('tbody tr')).toHaveCount(3);
  expect(await table.locator('th').evaluateAll((headers) => headers.every((header) => header.getAttribute('scope') === 'col'))).toBe(true);
  const wrapper = table.locator('..');
  await expect(wrapper).toHaveAttribute('role', 'region');
  await expect(wrapper).toHaveAccessibleName('Resultado de SELECT: Todas las columnas');
  await expect(wrapper).toHaveAttribute('tabindex', '0');
  const header = await page.locator('.navbar').boundingBox();
  // Fixture de una columna ancha: no añade contenido ficticio al catálogo publicado.
  await table.locator('th').first().evaluate((element) => {element.textContent = 'columna_larga_para_comprobar_scroll_'.repeat(20);});
  await expect.poll(() => wrapper.evaluate((element) => element.scrollWidth > element.clientWidth + 1)).toBe(true);
  await wrapper.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => wrapper.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await noPageOverflow(page);
  expect(await page.locator('.navbar').boundingBox()).toEqual(header);
  if (page.viewportSize()!.width > 996) await expect(page.locator('.theme-doc-sidebar-container').getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first.locator('details')).not.toHaveAttribute('open');
  await expect(second.locator('details')).not.toHaveAttribute('open');
});

test('copiar cada variante conserva la consulta completa y mantiene la posición del contenido', async ({page, context}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await go(page);
  await page.keyboard.press('Tab');
  for (let i = 0; i < 2; i++) {
    const example = examples(page).nth(i);
    const button = example.getByRole('button', {name: 'Copiar código', exact: true});
    await button.focus();
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('opacity', '1');
    if (page.viewportSize()!.width <= 996) {
      const box = await button.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    const bounds = await example.boundingBox();
    await button.press('Enter');
    await expect.poll(async () => (await page.evaluate(() => navigator.clipboard.readText())).trimEnd()).toBe(sqlConcepts[0].examples[i].code);
    expect(await example.boundingBox()).toEqual(bounds);
  }
});

test('anterior y siguiente conservan rutas, teclado y alineación con la ficha', async ({page}) => {
  await go(page);
  for (let i = 0; i < sqlConcepts.length; i++) {
    const pagination = page.getByRole('navigation', {name: 'Página del documento', exact: true});
    const previous = page.locator('.pagination-nav__link--prev');
    const next = page.locator('.pagination-nav__link--next');
    if (i) await expect(previous).toHaveAttribute('href', sqlConcepts[i - 1].slug);
    else await expect(previous).toHaveCount(0);
    if (i < sqlConcepts.length - 1) await expect(next).toHaveAttribute('href', sqlConcepts[i + 1].slug);
    else await expect(next).toHaveCount(0);
    const [navBounds, articleBounds] = await Promise.all([pagination.boundingBox(), page.locator('article').boundingBox()]);
    expect(Math.abs(navBounds!.x - articleBounds!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(navBounds!.width - articleBounds!.width)).toBeLessThanOrEqual(1);
    if (i < sqlConcepts.length - 1) {
      await next.focus();
      await next.press('Enter');
      await expect(page).toHaveURL(new RegExp(`/sql/${sqlConcepts[i + 1].id}$`));
      await expect(examples(page).locator('details[open]')).toHaveCount(0);
    }
  }
  await page.locator('.pagination-nav__link--prev').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sql\/limit$/);
});

test('texto al 200% conserva código, explicaciones y controles accesibles sin desbordar la página', async ({page}) => {
  await go(page);
  const originalSize = await fontSize(examples(page).first().locator('code'));
  const originalRoot = await fontSize(page.locator('html'));
  await page.addStyleTag({content: 'html { font-size: 200% !important; }'});
  await expect.poll(() => fontSize(page.locator('html'))).toBeGreaterThanOrEqual(originalRoot * 1.99);
  await expect.poll(() => fontSize(examples(page).first().locator('code'))).toBeGreaterThanOrEqual(originalSize * 1.99);
  await noPageOverflow(page);
  for (const code of await examples(page).locator('.theme-code-block').all()) {
    expect(await code.evaluate((element) => element.scrollWidth > element.clientWidth + 1)).toBe(false);
  }
  const remember = card(page).getByText(sqlConcepts[0].remember, {exact: true});
  await remember.scrollIntoViewIfNeeded();
  await expect(remember).toBeInViewport();
  const summary = examples(page).first().locator('summary');
  await summary.focus();
  await summary.press('Enter');
  await expect(examples(page).first().getByRole('table')).toBeVisible();
  await noPageOverflow(page);
  await summary.press('Space');
  await reader(page).evaluate((element) => element.scrollTo({top: 0, behavior: 'instant'}));
  await summary.evaluate((element) => (element as HTMLElement).blur());
  await expect(page).toHaveScreenshot('select-texto-200.png');
});

test('ocho acentos conservan negro puro, contraste y sintaxis; la última elección persiste', async ({page}) => {
  await go(page, 'limit');
  expect(palettes).toHaveLength(8);
  const summary = page.locator('summary[aria-label^="Elegir color de texto:"]');
  await summary.click();
  for (const palette of palettes) {
    await summary.locator('..').getByText(palette.name, {exact: true}).click();
    await expect(page.locator('html')).toHaveAttribute('data-palette', palette.id);
    const rgb = palette.color.slice(1).match(/../g)!.map((part) => parseInt(part, 16));
    await expect.poll(() => examples(page).first().evaluate((element) => {
      const color = (target: Element) => getComputedStyle(target).color;
      const keyword = element.querySelector('.token.keyword')!;
      return {keyword: color(keyword), number: color(element.querySelector('.token.number')!),
        backgrounds: [element, element.querySelector('.theme-code-block')!, element.querySelector('pre')!].map((target) => getComputedStyle(target).backgroundColor)};
    })).toEqual({keyword: `rgb(${rgb.join(', ')})`, number: 'rgb(181, 206, 168)',
      backgrounds: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(0, 0, 0)']});
    const linear = rgb.map((value) => value / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    expect((.2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2] + .05) / .05).toBeGreaterThanOrEqual(4.5);
  }
  await page.keyboard.press('Escape');
  await page.reload({waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'blanco');
  await go(page, 'comentarios');
  await expect(examples(page).first().locator('.token.comment').first()).toHaveCSS('color', 'rgb(106, 153, 85)');
});
