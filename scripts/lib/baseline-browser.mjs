import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {expect} from '@playwright/test';
import {summarize, sha256} from './baseline.ts';

const selectRoute = '/apuntes/analisis-de-datos/sql/select';
const searchTrigger = (page) => page.getByRole('button', {name: 'Buscar un concepto', exact: true});
const dialog = (page) => page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
const input = (page) => dialog(page).getByRole('searchbox');
async function closeSearch(page) {
  await dialog(page).getByRole('button', {name: 'Cerrar buscador', exact: true}).click();
  await expect(dialog(page)).not.toBeVisible();
}
const go = async (page, route = selectRoute) => {
  await page.goto(route, {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
};

async function categorySettled(button, expanded) {
  await expect(button).toHaveAttribute('aria-expanded', String(expanded));
  const list = button.locator('..').locator('..').locator(':scope > .menu__list');
  await expect.poll(() => list.evaluate((element, expanded) =>
    expanded ? element.style.height === 'auto' && element.style.display !== 'none' : element.style.display === 'none', expanded),
  ).toBe(true);
}

async function expandCategory(menu, name) {
  const button = menu.getByRole('button', {name, exact: true});
  if (await button.getAttribute('aria-expanded') === 'false') await button.click();
  await categorySettled(button, true);
}

async function openTopics(page) {
  if (page.viewportSize().width <= 996) {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar')).toHaveClass(/navbar-sidebar--show/);
    return page.locator('.navbar-sidebar .theme-doc-sidebar-menu');
  }
  return page.locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu');
}

async function stableImages(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
    await Promise.all([...document.querySelectorAll('svg image')].map((element) => {
      const image = new Image();
      image.src = element.href.baseVal;
      return image.decode();
    }));
  });
}

export async function captureScreens(browser, project, output, baseURL) {
  const context = await browser.newContext({...project.use, baseURL, locale: 'es-MX', colorScheme: 'dark', reducedMotion: 'reduce'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await context.addInitScript(() => {localStorage.setItem('alldoc-palette', 'azul');});
  const directory = path.join(output, 'screenshots', project.name);
  await mkdir(directory, {recursive: true});
  const files = [];
  const result = {project: project.name, viewport: project.use.viewport, status: 'partial', files};
  const capture = async (name) => {
    await stableImages(page);
    await page.mouse.move(page.viewportSize().width - 1, 0);
    const filename = path.join(directory, name + '.png');
    const png = await page.screenshot({path: filename, animations: 'disabled', caret: 'hide'});
    files.push({path: path.relative(output, filename).split(path.sep).join('/'), sha256: sha256(png), route: new URL(page.url()).pathname});
  };
  try {
    await go(page, '/');
    await capture('inicio');
    await go(page);
    await capture('select');
    await go(page, '/apuntes/analisis-de-datos/sql/comentarios');
    await capture('comentarios');
    await go(page);
    const menu = await openTopics(page);
    for (const name of ['SQL', 'Tablas y archivos', 'Pandas', 'openpyxl', 'Conexiones SQL']) {
      await expandCategory(menu, name);
    }
    await expect.poll(() => menu.evaluate((root) => [...root.querySelectorAll('.menu__list-item:not(.menu__list-item--collapsed) > .menu__list')].every((list) => list.clientHeight >= list.scrollHeight - 1))).toBe(true);
    await menu.evaluate((root) => {if (root.contains(document.activeElement)) document.activeElement.blur();});
    const scroller = page.viewportSize().width <= 996 ? page.locator('.navbar-sidebar__item:has(.theme-doc-sidebar-menu)') : page.locator('.theme-doc-sidebar-container nav.menu');
    await scroller.evaluate((element) => element.scrollTo({top: 0, left: 0, behavior: 'instant'}));
    await capture('menu');
    await go(page);
    await searchTrigger(page).click();
    await input(page).fill('filtrar');
    await expect(dialog(page).getByRole('link')).toHaveCount(1);
    await capture('buscador');
    await closeSearch(page);
    const palette = page.locator('summary[aria-label^="Elegir color de texto:"]');
    await palette.click();
    await palette.locator('..').getByText('Violeta', {exact: true}).click();
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'violeta');
    await capture('color-texto');
    if (errors.length) throw new Error(errors.join('\n'));
    result.status = 'complete';
    return result;
  } catch (error) {
    result.failure = error.message;
    await writeFile(path.join(directory, 'failure-dom.html'), await page.content());
    await page.screenshot({path: path.join(directory, 'failure.png'), animations: 'disabled'});
    throw error;
  } finally {
    await writeFile(path.join(directory, 'manifest.json'), JSON.stringify(result, null, 2) + '\n');
    await context.close();
  }
}

// Solo se inyecta en el navegador de medición. No modifica el código de la app.
function installObservers() {
  const supported = PerformanceObserver.supportedEntryTypes ?? [];
  const data = {supported, events: [], longTasks: [], observers: [], current: null};
  window.__alldocBaseline = data;
  performance.setResourceTimingBufferSize(2000);
  if (supported.includes('event')) {
    const observer = new PerformanceObserver((list) => {
      data.events.push(...list.getEntries().filter((entry) => entry.interactionId > 0).map((entry) => ({
        name: entry.name, startTime: entry.startTime, duration: entry.duration, interactionId: entry.interactionId,
        inputDelay: entry.processingStart - entry.startTime,
        processingDuration: entry.processingEnd - entry.processingStart,
        presentationDelay: Math.max(0, entry.startTime + entry.duration - entry.processingEnd),
      })));
    });
    observer.observe({type: 'event', buffered: true, durationThreshold: 16});
    data.observers.push(observer);
  }
  if (supported.includes('longtask')) {
    const observer = new PerformanceObserver((list) => data.longTasks.push(...list.getEntries().map((entry) => ({startTime: entry.startTime, duration: entry.duration, name: entry.name}))));
    observer.observe({type: 'longtask', buffered: true});
    data.observers.push(observer);
  }
}

async function measure(page, target, conditions, action, eventName = 'click') {
  await target.evaluate((element, {conditions, eventName}) => {
    const data = window.__alldocBaseline;
    const current = {armedAt: performance.now(), responses: {}, done: false, eventAt: null};
    data.current = current;
    element.addEventListener(eventName, (event) => {
      current.eventAt = event.timeStamp;
      const pending = new Set(conditions);
      const check = () => {
        const links = [...document.querySelectorAll('dialog[open] ul a')];
        const satisfied = (kind) => {
          if (kind === 'dialogVisible') return Boolean(document.querySelector('dialog[open] input[role="searchbox"], dialog[open] input[type="search"]'));
          if (kind === 'resultsReady') return links.length > 0;
          if (kind === 'filtered') return document.querySelector('dialog[open] input')?.value === 'w' && links.length === 1 && links[0].pathname.endsWith('/where');
          if (kind === 'categoryOpen') return element.getAttribute('aria-expanded') === 'true';
          if (kind === 'categoryClosed') return element.getAttribute('aria-expanded') === 'false';
          if (kind === 'navigated') return location.pathname.endsWith('/where') && document.querySelector('h1')?.textContent.trim() === 'WHERE';
          return false;
        };
        for (const kind of pending) {
          if (satisfied(kind)) {
            pending.delete(kind);
            // Proxy DOM + siguiente rAF: no se etiqueta como INP ni como pintura real.
            requestAnimationFrame(() => {
              current.responses[kind] = performance.now() - current.eventAt;
              current.done = Object.keys(current.responses).length === conditions.length;
            });
          }
        }
        if (pending.size) requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    }, {once: true, capture: true});
  }, {conditions, eventName});
  await action();
  await page.waitForFunction(() => window.__alldocBaseline.current?.done, null, {timeout: 10_000});
  // Las entradas Event Timing pueden entregarse después del frame observado.
  await page.waitForTimeout(120);
  return page.evaluate(() => {
    const data = window.__alldocBaseline;
    const current = data.current;
    const events = data.events.filter((entry) => entry.startTime >= current.armedAt);
    return {domResponseMs: current.responses, eventTiming: events, maxObservedEventDurationMs: events.length ? Math.max(...events.map((entry) => entry.duration)) : null};
  });
}

async function resources(page) {
  return page.evaluate(() => ({
    navigation: performance.getEntriesByType('navigation').map((entry) => ({duration: entry.duration, domContentLoaded: entry.domContentLoadedEventEnd, loadEventEnd: entry.loadEventEnd, ttfb: entry.responseStart - entry.requestStart})),
    resources: performance.getEntriesByType('resource').map((entry) => ({path: new URL(entry.name).pathname, initiatorType: entry.initiatorType, startTime: entry.startTime, duration: entry.duration, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize})),
  }));
}

function groupSummary(samples, key) {
  return {
    domResponseMs: summarize(samples.map((sample) => sample.domResponseMs[key])),
    observedEventDurationMs: summarize(samples.flatMap((sample) => sample.maxObservedEventDurationMs === null ? [] : [sample.maxObservedEventDurationMs])),
    samplesWithoutEventTiming: samples.filter((sample) => sample.maxObservedEventDurationMs === null).length,
  };
}

export async function measureProfile(browser, project, baseURL, sampleCount, output) {
  const cpuRate = project.name === 'celular' ? 4 : 1;
  const context = await browser.newContext({...project.use, baseURL, locale: 'es-MX', colorScheme: 'dark', reducedMotion: 'no-preference'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await context.addInitScript(installObservers);
  const client = await context.newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', {rate: cpuRate});
  await client.send('Network.enable');
  await client.send('Network.setCacheDisabled', {cacheDisabled: true});
  const result = {project: project.name, viewport: project.use.viewport, cpuRate, samplesPerAction: sampleCount, reducedMotion: 'no-preference', status: 'partial', cold: null, actions: {}, unavailable: ['Guardar/quitar favorito: la función todavía no existe en la app actual.']};
  const opened = [], typed = [], navigated = [], toggled = [];
  try {
    await go(page);
    result.navigator = await page.evaluate(() => ({userAgent: navigator.userAgent, hardwareConcurrency: navigator.hardwareConcurrency, deviceMemory: navigator.deviceMemory ?? null, devicePixelRatio, supportedEntryTypes: window.__alldocBaseline.supported}));
    const before = await resources(page);
    const cold = await measure(page, searchTrigger(page), ['dialogVisible', 'resultsReady'], () => searchTrigger(page).click());
    result.cold = {...cold, beforeSearch: before, afterSearch: await resources(page)};
    await closeSearch(page);
    for (let index = 0; index < sampleCount; index++) {
      opened.push(await measure(page, searchTrigger(page), ['dialogVisible', 'resultsReady'], () => searchTrigger(page).click()));
      await input(page).fill('');
      await expect(dialog(page).getByRole('link')).toHaveCount(5);
      typed.push(await measure(page, input(page), ['filtered'], () => input(page).press('w'), 'keydown'));
      const link = dialog(page).getByRole('link').filter({hasText: 'WHERE'});
      navigated.push(await measure(page, link, ['navigated'], () => link.click()));
      await expect(dialog(page)).not.toBeVisible();
      // Volver mediante el enlace real conserva la instancia del buscador y su índice cargado.
      await page.locator('a.pagination-nav__link--prev').click();
      await expect(page.getByRole('heading', {name: 'SELECT', exact: true})).toBeVisible();
    }
    const menu = await openTopics(page);
    const category = menu.getByRole('button', {name: 'SQL', exact: true});
    // Un estado inicial explícito evita medir accidentalmente aperturas como cierres.
    if (await category.getAttribute('aria-expanded') !== 'false') {
      await category.click();
      await categorySettled(category, false);
    }
    for (let index = 0; index < sampleCount; index++) {
      const opening = index % 2 === 0;
      const key = opening ? 'categoryOpen' : 'categoryClosed';
      toggled.push({...await measure(page, category, [key], () => category.click()), direction: opening ? 'open' : 'close'});
      await categorySettled(category, opening);
    }
    result.longTasks = await page.evaluate(() => window.__alldocBaseline.longTasks);
    if (errors.length) throw new Error(errors.join('\n'));
    result.status = 'complete';
    return result;
  } catch (error) {
    result.failure = error.message;
    throw error;
  } finally {
    result.actions = {
      warmSearchOpen: {summary: groupSummary(opened, 'dialogVisible'), resultsReadyMs: summarize(opened.map((sample) => sample.domResponseMs.resultsReady)), samples: opened},
      typeW: {summary: groupSummary(typed, 'filtered'), samples: typed},
      navigateToWhere: {summary: groupSummary(navigated, 'navigated'), samples: navigated},
      toggleSql: {domResponseMs: summarize(toggled.map((sample) => sample.domResponseMs[sample.direction === 'open' ? 'categoryOpen' : 'categoryClosed'])), samples: toggled},
    };
    await writeFile(path.join(output, 'timings-' + project.name + '.json'), JSON.stringify(result, null, 2) + '\n');
    await context.close();
  }
}
