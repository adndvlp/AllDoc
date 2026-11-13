import {test, expect, type Locator, type Page} from '@playwright/test';

const route = '/apuntes/analisis-de-datos/sql/select';
const header = (page: Page) => page.locator('.navbar__inner');
const areaTrigger = (page: Page) => header(page).getByRole('button', {name: /^Elegir área:/});
const reader = (page: Page) => page.locator('[data-scroll-panel="content"]');
const textTrigger = (page: Page) => header(page).locator('summary[aria-label^="Elegir color de texto:"]');
const searchTrigger = (page: Page) => header(page).getByRole('button', {name: 'Buscar un concepto', exact: true});

async function go(page: Page, path = route) {
  await page.goto(path, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}

async function compactViewport(page: Page) {
  const viewport = page.viewportSize()!;
  await page.setViewportSize({width: Math.min(viewport.width, 996), height: viewport.height});
}

async function fits(page: Page, target: Locator) {
  await expect(target).toBeVisible();
  const bounds = await target.boundingBox();
  const viewport = page.viewportSize()!;
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(-1);
  expect(bounds!.y).toBeGreaterThanOrEqual(-1);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1);
}

async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => ({
    horizontal: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1,
    pageTop: scrollY,
    readerHorizontal: (() => {
      const element = document.querySelector('[data-scroll-panel="content"]');
      return element ? element.scrollWidth > element.clientWidth + 1 : false;
    })(),
  }))).toEqual({horizontal: false, pageTop: 0, readerHorizontal: false});
}

async function touchTargetsInOneRow(page: Page, controls: Locator[]) {
  const boxes = [];
  for (const control of controls) {
    await fits(page, control);
    const box = (await control.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.width).toBeGreaterThanOrEqual(44);
    boxes.push(box);
    expect(await control.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  }
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].x).toBeGreaterThanOrEqual(boxes[i - 1].x + boxes[i - 1].width - 1);
    expect(Math.abs((boxes[i].y + boxes[i].height / 2) - (boxes[0].y + boxes[0].height / 2))).toBeLessThanOrEqual(2);
  }
}

test('encabezado compacto: una fila, selector de áreas y controles táctiles sin footer', async ({page}) => {
  await go(page, '/');
  if (page.viewportSize()!.width <= 996) {
    await expect(areaTrigger(page)).toBeVisible();
    await expect(areaTrigger(page)).toHaveAccessibleName('Elegir área: Análisis de datos');
    await expect(areaTrigger(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(header(page).locator('.navbar__toggle')).toBeHidden();
    await touchTargetsInOneRow(page, [header(page).getByRole('link', {name: 'AllDoc', exact: true}), areaTrigger(page), searchTrigger(page), textTrigger(page)]);
    expect((await page.locator('.navbar').boundingBox())!.height).toBeLessThanOrEqual(64);
    await areaTrigger(page).click();
    const areas = page.getByRole('navigation', {name: 'Áreas de estudio', exact: true});
    await expect(areas.getByRole('button')).toHaveText(['Análisis de datos', 'Desarrollo web', 'IA']);
    await fits(page, areas);
    await expect(page).toHaveScreenshot('selector-areas.png');
  } else {
    await expect(areaTrigger(page)).toBeHidden();
    for (const name of ['Análisis de datos', 'Desarrollo web', 'IA']) {
      await expect(header(page).getByRole('button', {name, exact: true})).toBeVisible();
    }
  }
  await noOverflow(page);
  await expect(page.locator('footer')).toHaveCount(0);
});

test('selector de áreas: teclado, cierre, foco y consulta conservada en portada', async ({page}) => {
  await compactViewport(page);
  await go(page, '/');
  const input = page.locator('[data-search-surface="inline"]').getByRole('searchbox');
  await input.fill('filtrar');
  const trigger = areaTrigger(page);
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const choices = page.getByRole('navigation', {name: 'Áreas de estudio', exact: true});
  await choices.getByRole('button', {name: 'IA', exact: true}).focus();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  await trigger.press('Space');
  await choices.getByRole('button', {name: 'Desarrollo web', exact: true}).focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAccessibleName('Elegir área: Desarrollo web');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  await expect(page).toHaveURL(/\/$/);
  await expect(input).toHaveValue('filtrar');
  await expect(page.locator('[data-search-surface="inline"]').getByRole('link').filter({hasText: 'WHERE'})).toBeVisible();
  await trigger.click();
  await choices.getByRole('button', {name: 'Desarrollo web', exact: true}).click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await page.locator('.navbar').click({position: {x: 1, y: 1}});
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('texto al 200%: altura natural, controles sin solaparse y sidebar legible', async ({page}) => {
  await go(page);
  const initialHeader = (await page.locator('.navbar').boundingBox())!.height;
  const originalRoot = await page.locator('html').evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => page.locator('html').evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(originalRoot * 1.99);
  await expect.poll(async () => (await page.locator('.navbar').boundingBox())!.height).toBeGreaterThan(initialHeader * 1.3);
  // Deja que las container queries terminen el reflujo antes de elegir controles.
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  const controls = [searchTrigger(page), textTrigger(page)];
  if (await areaTrigger(page).isVisible()) controls.unshift(areaTrigger(page));
  else for (const name of ['Análisis de datos', 'Desarrollo web', 'IA'].reverse()) {
    controls.unshift(header(page).getByRole('link', {name, exact: true}));
  }
  if (page.viewportSize()!.width <= 996) controls.unshift(header(page).locator('.navbar__toggle'));
  else controls.unshift(header(page).getByRole('link', {name: 'AllDoc', exact: true}));
  await touchTargetsInOneRow(page, controls);
  const navbar = (await page.locator('.navbar').boundingBox())!;
  expect((await reader(page).boundingBox())!.y).toBeGreaterThanOrEqual(navbar.y + navbar.height - 1);
  if (page.viewportSize()!.width > 996) {
    const powerQuery = page.locator('.theme-doc-sidebar-container').getByRole('button', {name: 'Power Query', exact: true});
    const label = powerQuery.locator('span').last();
    expect(await label.evaluate((element) => {
      const styles = getComputedStyle(element);
      return element.getBoundingClientRect().height / parseFloat(styles.lineHeight);
    })).toBeLessThanOrEqual(2.1);
    expect(await powerQuery.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  }
  await noOverflow(page);
  await expect(page).toHaveScreenshot('encabezado-texto-200.png');
  await textTrigger(page).click();
  const palette = textTrigger(page).locator('..');
  await fits(page, palette.locator('fieldset').locator('..'));
  await palette.getByText('Violeta', {exact: true}).click();
  await expect(palette).not.toHaveAttribute('open');
  await expect(textTrigger(page)).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'violeta');
  await searchTrigger(page).click();
  const dialog = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await fits(page, dialog);
  await fits(page, dialog.getByRole('button', {name: 'Cerrar buscador', exact: true}));
  await page.keyboard.press('Escape');
  await expect(searchTrigger(page)).toBeFocused();
});

test('menú de temas: modal con inicio, foco contenido y cierre con Esc sin mover el apunte', async ({page}) => {
  await compactViewport(page);
  await page.setViewportSize({width: page.viewportSize()!.width, height: 400});
  await go(page);
  for (const summary of await reader(page).locator('summary').all()) await summary.click();
  await reader(page).evaluate((element) => {element.scrollTop = 30;});
  const toggle = header(page).locator('.navbar__toggle');
  const position = await reader(page).evaluate((element) => element.scrollTop);
  await toggle.click();
  const drawer = page.getByRole('dialog', {name: 'Temas del área', exact: true});
  await fits(page, drawer);
  await expect.poll(() => drawer.evaluate((element) => element.matches(':modal'))).toBe(true);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(drawer.getByRole('link', {name: 'AllDoc', exact: true})).toBeVisible();
  await expect(drawer.getByRole('link', {name: 'Desarrollo web', exact: true})).toHaveCount(0);
  await expect(drawer.getByRole('button', {name: 'SQL', exact: true})).toHaveAttribute('aria-expanded', 'false');
  for (const name of ['SQL', 'Tablas y archivos', 'Pandas', 'openpyxl', 'Cálculo científico', 'NumPy', 'SciPy', 'Visualización', 'Matplotlib', 'Seaborn', 'Conexiones SQL', 'Peticiones y formatos']) {
    await drawer.getByRole('button', {name, exact: true}).click();
  }
  const scroller = drawer.locator('.navbar-sidebar__item');
  await scroller.hover();
  await page.mouse.wheel(0, 3000);
  await expect.poll(() => scroller.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await page.mouse.wheel(0, 3000);
  expect(await reader(page).evaluate((element) => element.scrollTop)).toBe(position);
  const home = drawer.getByRole('link', {name: 'AllDoc', exact: true});
  const close = drawer.getByRole('button', {name: 'Cerrar barra de lateral', exact: true});
  await home.focus();
  await expect(home).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  // El límite nativo puede dar paso a la interfaz del navegador (activeElement
  // pasa a body). Nunca debe alcanzar un control del documento de fondo.
  await expect.poll(() => drawer.evaluate((element) => {
    const active = document.activeElement;
    return element.matches(':modal') && (active === document.body || element.contains(active));
  })).toBe(true);
  await close.focus();
  for (const background of [toggle, searchTrigger(page), reader(page)]) {
    await background.evaluate((element) => (element as HTMLElement).focus());
    await expect(close).toBeFocused();
  }
  await page.keyboard.press('Tab');
  await expect.poll(() => drawer.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(toggle).toBeFocused();
  expect(await reader(page).evaluate((element) => element.scrollTop)).toBe(position);
  await toggle.click();
  await drawer.getByRole('link', {name: 'AllDoc', exact: true}).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(drawer).toBeHidden();
  await expect(header(page).locator('.navbar__toggle')).toBeHidden();
  await noOverflow(page);
});

test('rotación con menú abierto elimina la capa modal y permite seguir leyendo y buscando', async ({page}) => {
  await page.setViewportSize({width: 768, height: 600});
  await go(page);
  await header(page).locator('.navbar__toggle').click();
  await expect(page.getByRole('dialog', {name: 'Temas del área', exact: true})).toBeVisible();
  await page.setViewportSize({width: 1024, height: 768});
  await expect(page.getByRole('dialog', {name: 'Temas del área', exact: true})).toBeHidden();
  await expect(page.locator('.navbar')).not.toHaveClass(/navbar-sidebar--show/);
  await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  await reader(page).locator('summary').first().click();
  await expect(reader(page).getByRole('table').first()).toBeVisible();
  await page.setViewportSize({width: 768, height: 600});
  await expect(header(page).locator('.navbar__toggle')).toHaveAttribute('aria-expanded', 'false');
  await searchTrigger(page).click();
  const dialog = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await dialog.getByRole('searchbox').fill('filtrar');
  await expect(dialog.getByRole('link').filter({hasText: 'WHERE'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(searchTrigger(page)).toBeFocused();
  await reader(page).locator('summary').first().click();
  await expect(reader(page).getByRole('table').first()).toBeHidden();
  await noOverflow(page);
});

test('paneles: extremos sin arrastre y ausencia de scroll cuando todo cabe', async ({page}) => {
  const width = page.viewportSize()!.width;
  await page.setViewportSize({width, height: 400});
  await go(page);
  for (const summary of await reader(page).locator('summary').all()) await summary.click();
  await expect.poll(() => reader(page).evaluate((element) => element.scrollHeight - element.clientHeight)).toBeGreaterThan(0);
  const navbar = await page.locator('.navbar').boundingBox();
  const sidebar = page.locator('.theme-doc-sidebar-container nav.menu');
  const sidebarTop = width > 996 ? await sidebar.evaluate((element) => element.scrollTop) : null;
  for (const end of ['bottom', 'top']) {
    await reader(page).evaluate((element, boundary) => {element.scrollTop = boundary === 'bottom' ? element.scrollHeight : 0;}, end);
    const position = await reader(page).evaluate((element) => element.scrollTop);
    await reader(page).hover();
    await page.mouse.wheel(0, end === 'bottom' ? 2000 : -2000);
    await expect.poll(() => reader(page).evaluate((element) => element.scrollTop)).toBe(position);
    if (width > 996) expect(await sidebar.evaluate((element) => element.scrollTop)).toBe(sidebarTop);
    expect(await page.locator('.navbar').boundingBox()).toEqual(navbar);
    await noOverflow(page);
  }
  await page.setViewportSize({width, height: 2400});
  await go(page, '/apuntes/analisis-de-datos/sql/where');
  await expect.poll(() => reader(page).evaluate((element) => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
  await reader(page).hover();
  await page.mouse.wheel(0, 2000);
  expect(await reader(page).evaluate((element) => element.scrollTop)).toBe(0);
  if (width > 996) expect(await sidebar.evaluate((element) => element.scrollHeight <= element.clientHeight + 1 && element.scrollTop === 0)).toBe(true);
  await noOverflow(page);
});
