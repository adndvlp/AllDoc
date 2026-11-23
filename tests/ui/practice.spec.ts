import {test, expect, type Page, type Locator} from '@playwright/test';
import {openPracticeRegion,practiceRegion,practiceResults} from './practice-helpers';

const sql = '/apuntes/analisis-de-datos/sql/select';
const panel = (page: Page) => page.locator('dialog[data-practice-panel]');
const code = (page: Page) => panel(page).getByRole('textbox', {name: /^Código /});
async function go(page: Page, path = sql) {
  await page.goto(path, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
}
async function open(page: Page) {
  await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  await expect(code(page)).toBeVisible();
}
async function fits(page: Page, element: Locator) {
  await expect(element).toBeVisible(); const rect = (await element.boundingBox())!;
  const size = page.viewportSize()!;
  expect(rect.x).toBeGreaterThanOrEqual(-1); expect(rect.y).toBeGreaterThanOrEqual(-1);
  expect(rect.x + rect.width).toBeLessThanOrEqual(size.width + 1);
  expect(rect.y + rect.height).toBeLessThanOrEqual(size.height + 1);
}
async function searchTo(page: Page, query: string, title: string) {
  await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill(query);
  await search.getByRole('link').filter({hasText: title}).first().click();
  await expect(code(page)).toBeVisible();
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 25_000});
}

test('entrada contextual: apertura diferida, editor real y SQL ejecutable', async ({page}) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await go(page, '/'); await expect(page.getByRole('button', {name: /^Practicar /})).toHaveCount(0);
  await go(page, '/apuntes/analisis-de-datos'); await expect(page.getByRole('button', {name: /^Practicar /})).toHaveCount(0);
  await go(page); expect(requests.filter((url) => /practice-editor|practice-session/.test(url))).toHaveLength(0);
  await expect(page.locator('.cm-editor')).toHaveCount(0); await open(page);
  await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled();
  await expect(panel(page)).not.toContainText('La ejecución aún no está disponible');
  expect(requests.some((url) => /practice-editor/.test(url))).toBe(true);
  await fits(page, panel(page)); await expect(page.locator('footer')).toHaveCount(0);
  await expect(page).toHaveScreenshot('practice-sql.png');
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  await expect(panel(page)).toBeHidden();
  await expect(page.getByRole('button', {name: 'Practicar SQL', exact: true})).toBeFocused();
});

test('borradores: SELECT/WHERE comparten edición y pandas conserva su propio contexto tras recargar', async ({page}) => {
  await go(page); await open(page); await code(page).fill('SELECT nombre FROM productos;');
  await searchTo(page, 'WHERE', 'WHERE'); await expect(code(page)).toHaveText('SELECT nombre FROM productos;');
  await searchTo(page, 'DataFrame', 'DataFrame'); await expect(code(page)).toHaveAccessibleName('Código pandas');
  await expect(code(page)).toContainText('pd.DataFrame'); await code(page).fill('productos.head(2)');
  await expect(panel(page).getByText('Guardado local', {exact: true})).toBeVisible();
  await expect(page).toHaveScreenshot('practice-pandas.png');
  await searchTo(page, 'SELECT', 'SELECT'); await expect(code(page)).toHaveText('SELECT nombre FROM productos;');
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  await page.reload(); await expect(panel(page)).toBeHidden(); await open(page);
  await expect(code(page)).toHaveText('SELECT nombre FROM productos;');
});

test('datos: tabla común tipada y regiones por teclado sin resultados inventados', async ({page}) => {
  await go(page); await open(page);
  await openPracticeRegion(page,'data');
  const data = practiceRegion(page,'data').getByRole('button', {name: 'Datos', exact: true});
  await data.focus();await data.press('Space');await expect(data).toHaveAttribute('aria-expanded','false');
  await data.press('Enter');await expect(data).toHaveAttribute('aria-expanded','true');
  const table = panel(page).getByRole('table', {name: 'Datos de productos'});
  await expect(table).toBeVisible(); await expect(table.getByRole('row')).toHaveCount(19);
  await expect(table).toContainText('Teclado'); await expect(table).toContainText('3500');
  await expect(panel(page)).toContainText('precio'); await expect(panel(page)).toContainText('integer');
  await expect(page).toHaveScreenshot('practice-data.png');
  await expect(practiceResults(page)).toHaveCount(0);
  const toggle=practiceRegion(page,'editor').getByRole('button',{name:'Editor',exact:true});
  await toggle.focus();await toggle.press('Space');await expect(code(page)).toBeHidden();
  await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  await toggle.press('Enter');await expect(toggle).toBeFocused();
  await expect(code(page)).toBeVisible();
});

test('editor: Tab sale, deshacer funciona y el cambio de acento conserva instancia e historial', async ({page}) => {
  await go(page); await open(page);
  await panel(page).locator('.cm-editor').evaluate((element) => {element.setAttribute('data-instance-test', 'original');});
  await code(page).fill('SELECT 42;'); await code(page).press('Tab'); await expect(code(page)).not.toBeFocused();
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  await page.locator('.navbar__inner summary[aria-label^="Elegir color de texto:"]').click();
  await page.getByText('Violeta', {exact: true}).click(); await open(page);
  await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test', 'original');
  await expect(code(page)).toHaveText('SELECT 42;'); await code(page).press('ControlOrMeta+z');
  await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await expect.poll(() => panel(page).locator('.cm-editor').evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(0, 0, 0)');
});

test('modal: búsqueda y temas suspenden práctica sin apilar ventanas y reanudan con foco visible', async ({page}) => {
  await page.setViewportSize({width: 390, height: 700}); await go(page); await open(page);
  await code(page).fill('SELECT 7;'); await code(page).press('ControlOrMeta+k');
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await expect(search).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible();
  await expect(page.locator('dialog:modal')).toHaveCount(1); await expect(code(page)).toHaveText('SELECT 7;');
  await panel(page).getByRole('button', {name: 'Abrir temas', exact: true}).click();
  const topics = page.getByRole('dialog', {name: 'Temas del área', exact: true});
  await expect(topics).toBeVisible(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  await topics.getByRole('link', {name: 'AllDoc', exact: true}).click();
  await expect(page).toHaveURL(/\/$/); await expect(panel(page)).toHaveCount(0);
  // Volver mediante una navegación SPA real desde la búsqueda de portada.
  await page.locator('[data-search-surface="inline"]').getByRole('searchbox').fill('SELECT');
  await page.locator('[data-search-surface="inline"]').getByRole('link').filter({hasText: 'SELECT'}).first().click();
  await expect(code(page)).toBeVisible(); await expect(code(page)).toHaveText('SELECT 7;');
  await page.keyboard.press('Escape'); await expect(panel(page)).toBeHidden();
  await expect(page.getByRole('button', {name: 'Practicar SQL', exact: true})).toBeFocused();
});

test('descarga tardía del editor no reabre práctica después de colapsar', async ({page}) => {
  let release!: () => void; const gate = new Promise<void>((resolve) => {release = resolve;});
  let requested = false;
  await page.route(/\/practice-editor\.[^/]+\.js$/, async (route) => {requested = true; await gate; await route.continue();});
  await go(page); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  await expect.poll(() => requested).toBe(true);
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
  release(); await expect(panel(page)).toBeHidden(); await expect(page.locator('.cm-editor')).toHaveCount(0);
  await open(page); await expect(code(page)).toHaveText('SELECT * FROM productos;');
});

test('error de descarga permite reintentar el editor sin duplicarlo ni perder el borrador', async ({page}) => {
  let failed = false;
  await page.route(/\/practice-editor\.[^/]+\.js$/, async (route) => {
    if (!failed) {failed = true; await route.abort('failed');} else await route.continue();
  });
  await go(page); await page.getByRole('button', {name: 'Practicar SQL', exact: true}).click();
  await expect(panel(page).getByRole('alert')).toContainText('No se pudo preparar');
  await panel(page).getByRole('button', {name: 'Reintentar', exact: true}).click();
  await expect(code(page)).toBeVisible(); await expect(panel(page).locator('.cm-editor')).toHaveCount(1);
  await expect(code(page)).toHaveText('SELECT * FROM productos;');
});

test('responsive: rotación y texto al 200% conservan editor, selección y controles accesibles', async ({page}) => {
  await go(page); await open(page); /* Las teclas evitan estilos en línea de fill en contenteditable. */ await code(page).press('ControlOrMeta+a'); await code(page).pressSequentially('SELECT nombre FROM productos;');
  await panel(page).locator('.cm-editor').evaluate((element) => {element.setAttribute('data-instance-test', 'original');});
  await page.setViewportSize({width: 1920, height: 1080}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  await page.addStyleTag({content: 'html {font-size: 200% !important}'}); await expect(panel(page)).toHaveAttribute('data-layout', 'modal');
  await page.addStyleTag({content: 'html {font-size: 100% !important}'}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  await page.setViewportSize({width: 768, height: 1024}); await expect(panel(page)).toHaveAttribute('data-layout', 'bottom');
  await page.setViewportSize({width: 390, height: 844}); await expect(panel(page)).toHaveAttribute('data-layout', 'modal');
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  await expect.poll(() => code(page).evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(27); await expect.poll(() => code(page).locator('.cm-line').first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(27);
  await expect(panel(page).locator('.cm-editor')).toHaveAttribute('data-instance-test', 'original');
  await expect(code(page)).toHaveText('SELECT nombre FROM productos;'); await fits(page, panel(page));
  for (const button of await panel(page).getByRole('button').all()) {
    if (!await button.isVisible()) continue; const bounds = (await button.boundingBox())!;
    expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(page).toHaveScreenshot('practice-200.png');
});

test('teclado virtual: práctica usa el área visual reducida y mantiene el cierre accesible', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844}); await go(page); await open(page);
  await code(page).focus();
  await page.evaluate(() => {
    const viewport = window.visualViewport!;
    Object.defineProperty(viewport, 'height', {configurable: true, value: 280});
    Object.defineProperty(viewport, 'offsetTop', {configurable: true, value: 12});
    viewport.dispatchEvent(new Event('resize'));
  });
  await expect.poll(async () => (await panel(page).boundingBox())!.height).toBeLessThanOrEqual(280);
  const close = panel(page).getByRole('button', {name: 'Volver al apunte', exact: true});
  const rect = (await close.boundingBox())!; expect(rect.y + rect.height).toBeLessThanOrEqual(292);
  await close.click(); await expect(panel(page)).toBeHidden();
});

test('rotación con búsqueda abierta conserva su consulta y suspende la nueva modalidad de práctica', async ({page}) => {
  await page.setViewportSize({width: 1920, height: 1080}); await go(page); await open(page);
  await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill('WHERE');
  await page.setViewportSize({width: 390, height: 700});
  await expect(search).toBeVisible(); await expect(search.getByRole('searchbox')).toHaveValue('WHERE');
  await expect(search.getByRole('searchbox')).toBeFocused(); await expect(page.locator('dialog:modal')).toHaveCount(1);
  await page.keyboard.press('Escape'); await expect(panel(page)).toBeVisible();
  await expect(panel(page)).toHaveAttribute('data-layout', 'modal'); await expect(code(page)).toHaveText('SELECT * FROM productos;');
  await page.setViewportSize({width: 1920, height: 1080}); await expect(panel(page)).toHaveAttribute('data-layout', 'parallel');
  await expect(page.locator('dialog:modal')).toHaveCount(0);
});

test('control compacto: al 200% y con poca altura conserva acceso sin tapar el apunte con una etiqueta grande', async ({page}) => {
  await page.setViewportSize({width: 844, height: 390}); await go(page);
  await page.addStyleTag({content: 'html {font-size: 200% !important}'});
  const trigger = page.getByRole('button', {name: 'Practicar SQL', exact: true});
  await expect.poll(async () => (await trigger.boundingBox())!.width).toBeLessThanOrEqual(48);
  const bounds = (await trigger.boundingBox())!;
  expect(bounds.width).toBeGreaterThanOrEqual(44); expect(bounds.height).toBeGreaterThanOrEqual(44);
  expect(bounds.height).toBeLessThanOrEqual(48); await fits(page, trigger);
  await trigger.click(); await expect(code(page)).toBeVisible();
  await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click(); await expect(trigger).toBeFocused();
});

test('separador: teclado, arrastre y restablecer mantienen mínimos y scroll independiente', async ({page}) => {
  await go(page); await open(page);
  test.skip(await panel(page).getAttribute('data-layout') === 'modal', 'El modo modal ocupa el área visible y no tiene separador.');
  const separator = page.getByRole('separator', {name: 'Tamaño de práctica'});
  const before = Number(await separator.getAttribute('aria-valuenow'));
  await separator.focus(); await page.keyboard.press((await separator.getAttribute('aria-orientation')) === 'vertical' ? 'ArrowLeft' : 'ArrowUp');
  await expect.poll(async () => Number(await separator.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
  const box = (await separator.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  await page.mouse.move(box.x - 80, box.y - 80); await page.mouse.up();
  const value = Number(await separator.getAttribute('aria-valuenow'));
  expect(value).toBeGreaterThanOrEqual(Number(await separator.getAttribute('aria-valuemin')));
  expect(value).toBeLessThanOrEqual(Number(await separator.getAttribute('aria-valuemax')));
  await separator.press('Home'); await expect(separator).toHaveAttribute('aria-valuenow', String(before));
  await code(page).fill(Array.from({length: 200}, (_, index) => `-- ${index} ${'x'.repeat(150)}`).join('\n'));
  const reader = page.locator('[data-scroll-panel="content"]'); const top = await reader.evaluate((element) => element.scrollTop);
  await panel(page).locator('.cm-scroller').hover(); await page.mouse.wheel(0, 4000);
  await expect.poll(() => panel(page).locator('.cm-scroller').evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  expect(await reader.evaluate((element) => element.scrollTop)).toBe(top); expect(await page.evaluate(() => scrollY)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
