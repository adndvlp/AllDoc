import {writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {expect} from '@playwright/test';
import {assessCompletionSamples, completionScenarios, sampleCount} from './sql-closure.ts';
import {summarize} from './baseline.ts';

export const practiceProfiles = [
  {id: 'sql-sqlite', label: 'SQL', language: 'sql', route: '/apuntes/analisis-de-datos/sql/select', title: 'SELECT',
    keyword: 'SEL', keywordLabel: 'SELECT', columns: 'SELECT productos.pre', columnLabel: 'precio', comment: '--'},
  {id: 'python-pandas', label: 'pandas', language: 'python', route: '/apuntes/analisis-de-datos/pandas/dataframe', title: 'DataFrame',
    keyword: 'import pandas as pd\npd.Da', keywordLabel: 'DataFrame', columns: 'productos["pre', columnLabel: 'precio', comment: '#'},
];
const panel = page => page.locator('dialog[data-practice-panel]');
const results = page => panel(page).locator('[data-practice-region="results"]');
async function openRegion(page,name){
  const region=panel(page).locator(`[data-practice-region="${name}"]`);
  if(name==='results'&&!await region.count())return;
  const button=region.getByRole('button',{name:({data:'Datos',editor:'Editor',results:'Resultado'})[name],exact:true});
  if(await button.getAttribute('aria-expanded')==='false')await button.click();
}
const editor = page => panel(page).getByRole('textbox', {name: /^Código /});
const ready = page => expect(panel(page).getByRole('button', {name: 'Ejecutar', exact: true})).toBeEnabled({timeout: 120_000});

// Esta instrumentación solo se inyecta en el navegador de medición.
function installProbe() {
  const state = {supported: PerformanceObserver.supportedEntryTypes ?? [], events: [], longTasks: [], frames: [], observers: [], current: null};
  window.__alldocPracticeProbe = state;
  performance.setResourceTimingBufferSize(10000);
  const watch = (type, receive, extra = {}) => {
    if (!state.supported.includes(type)) return;
    const observer = new PerformanceObserver(list => receive(list.getEntries()));
    observer.observe({type, buffered: true, ...extra}); state.observers.push({observer, receive});
  };
  watch('event', entries => state.events.push(...entries.filter(e => e.interactionId > 0).map(e => ({name: e.name, startTime: e.startTime,
    duration: e.duration, interactionId: e.interactionId, inputDelay: e.processingStart - e.startTime,
    processingDuration: e.processingEnd - e.processingStart, presentationDelay: Math.max(0, e.startTime + e.duration - e.processingEnd)}))), {durationThreshold: 16});
  watch('longtask', entries => state.longTasks.push(...entries.map(e => ({name: e.name, startTime: e.startTime, duration: e.duration}))));
  watch('long-animation-frame', entries => state.frames.push(...entries.map(e => ({startTime: e.startTime, duration: e.duration,
    blockingDuration: e.blockingDuration, renderStart: e.renderStart, styleAndLayoutStart: e.styleAndLayoutStart,
    scripts: Array.from(e.scripts ?? [], s => ({sourceURL: s.sourceURL, sourceFunctionName: s.sourceFunctionName, duration: s.duration,
      forcedStyleDuration: s.forcedStyleDuration, forcedLayoutDuration: s.forcedLayoutDuration, forcedStyleAndLayoutDuration: s.forcedStyleAndLayoutDuration}))}))));
}

async function measure(page, target, specification, act) {
  await target.evaluate((element, specification) => {
    const state = window.__alldocPracticeProbe;
    const sample = {id: specification.id, armedAt: performance.now(), eventAt: null, observedAt: null, satisfied: false, responses: {}, done: false};
    state.current = sample;
    const capture = event => {
      if (specification.key && event.key !== specification.key) return;
      element.removeEventListener(specification.event ?? 'click', capture, true);
      sample.eventAt = event.timeStamp;
      const pending = new Set(specification.conditions);
      const check = () => {
        const dialog = document.querySelector('dialog[data-practice-panel]');
        const code = dialog?.querySelector('[role="textbox"]');
        const text = () => Array.from(code?.querySelectorAll('.cm-line') ?? [], line => line.textContent).join('\n');
        const executing = Array.from(dialog?.querySelectorAll('button') ?? []).find(button => button.textContent.trim() === 'Ejecutar');
        const satisfied = condition => {
          if (condition === 'note') return location.pathname === specification.path
            && document.querySelector('article [data-sql-concept]')?.getAttribute('data-sql-concept') === specification.concept;
          if (condition === 'dialect') return document.querySelector('[data-sql-concept] pre')?.textContent.includes(specification.code);
          if (condition === 'closed') return !dialog?.open;
          if (!dialog?.open) return false;
          if (condition === 'editor') return Boolean(code);
          if (condition === 'ready' || condition === 'open') return Boolean(code && executing && !executing.disabled);
          if (condition === 'text') return text() === specification.text;
          if (condition === 'option') return Array.from(dialog.querySelectorAll('.cm-completionLabel')).some(label => label.textContent === specification.label);
          if (condition === 'executed') return dialog.textContent.includes('Ejecución completada') && Boolean(dialog.querySelector('[data-practice-region="results"] table'));
          if (condition === 'context') return document.querySelector('h1')?.textContent.trim() === specification.title
            && code?.getAttribute('data-language') === specification.language && text() === specification.text;
          return false;
        };
        const alert = dialog?.querySelector('[role="alert"]');
        if (alert && specification.conditions.includes('ready')) {sample.error = alert.textContent; sample.done = true; return;}
        for (const condition of pending) if (satisfied(condition)) {
          pending.delete(condition);
          requestAnimationFrame(() => {
            sample.responses[condition] = performance.now();
            if (Object.keys(sample.responses).length === specification.conditions.length) {
              sample.observedAt = Math.max(...Object.values(sample.responses)); sample.satisfied = true; sample.done = true;
              sample.runtimeReadyAtObservation = Boolean(executing && !executing.disabled);
            }
          });
        }
        if (pending.size) requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    };
    element.addEventListener(specification.event ?? 'click', capture, true);
  }, specification);
  await act();
  await page.waitForFunction(() => window.__alldocPracticeProbe.current?.done, null, {timeout: specification.timeout ?? 10000});
  const sample = await page.evaluate(() => ({...window.__alldocPracticeProbe.current, timeOrigin: performance.timeOrigin}));
  if (sample.error) throw new Error(sample.error);
  return sample;
}

async function fillCode(page, text) {
  await editor(page).fill(text); await editor(page).press('End');
}
// Chromium no incluye detail en PerformanceMeasure.toJSON(). Leerlo explícitamente
// conserva el estado real de cada fase al cruzar Playwright, también en Workers.
export function readPracticeMeasures() {
  return performance.getEntriesByType('measure').filter(entry => entry.name.startsWith('alldoc-practice/'))
    .map(entry => ({name: entry.name, startTime: entry.startTime, duration: entry.duration, detail: entry.detail}));
}
async function phases(page) {
  const entries = await page.evaluate(readPracticeMeasures);
  const workerEntries = [];
  for (const worker of page.workers()) workerEntries.push(...await worker.evaluate(readPracticeMeasures));
  const keyed = values => Object.fromEntries(values.map(e => [e.name.slice('alldoc-practice/'.length), {startTime: e.startTime, duration: e.duration, ...e.detail}]));
  return {phases: keyed(entries), workerPhases: keyed(workerEntries)};
}
async function observerData(page, samples) {
  // La entrega de Event Timing es diferida. La espera está fuera de las ventanas medidas.
  await page.waitForTimeout(150);
  const data = await page.evaluate(() => {
    const state = window.__alldocPracticeProbe;
    for (const {observer, receive} of state.observers) receive(observer.takeRecords());
    return {supported: state.supported, events: state.events, longTasks: state.longTasks, longAnimationFrames: state.frames};
  });
  for (const sample of samples) sample.eventTiming = data.events.filter(e => e.startTime >= sample.eventAt && e.startTime <= sample.observedAt);
  const phase = task => samples.find(s => task.startTime < s.observedAt && task.startTime + task.duration > s.eventAt)?.action ?? 'outside-timed-action';
  return {supported: data.supported, longTasks: data.longTasks.map(task => ({...task, phase: phase(task)})),
    longAnimationFrames: data.longAnimationFrames.map(frame => ({...frame, phase: phase(frame)}))};
}
async function saveScreenshot(page, output, name) {
  await mkdir(path.join(output, 'screenshots'), {recursive: true});
  const file = 'screenshots/' + name + '.png';
  await page.screenshot({path: path.join(output, file), animations: 'disabled', caret: 'hide'}); return file;
}

async function selectConcept(page, target) {
  await panel(page).getByRole('button', {name: 'Buscar un concepto', exact: true}).click();
  const search = page.getByRole('dialog', {name: 'Buscar en tus apuntes'});
  await search.getByRole('searchbox').fill(target.title);
  return search.getByRole('link').filter({hasText: target.title}).first();
}

async function diagnosticTrace(page, client, profile, project, output) {
  await mkdir(path.join(output, 'traces'), {recursive: true});
  const file = 'traces/' + project.name + '-' + profile.id + '.json';
  await client.send('Tracing.start', {categories: 'devtools.timeline,v8.execute,blink.user_timing', transferMode: 'ReturnAsStream'});
  let replayError;
  try {
    await page.evaluate(() => performance.mark('practice-diagnostic-replay'));
    await panel(page).getByRole('button', {name: 'Volver al apunte', exact: true}).click();
    await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click();
    await fillCode(page, profile.comment + ' diagnóstico'); await editor(page).press('x');
    await fillCode(page, profile.keyword); await editor(page).press('Control+Space');
    await expect(panel(page).locator('.cm-completionLabel').filter({hasText: profile.keywordLabel})).toBeVisible();
    await editor(page).press('Escape');
    for (const target of [practiceProfiles.find(item => item.id !== profile.id), profile]) {
      const link = await selectConcept(page, target);
      await page.evaluate(label => performance.mark('practice-diagnostic-context-' + label), target.label);
      await link.click(); await ready(page);
    }
  } catch (error) {replayError = error.message;}
  let timeout;
  try {
    const complete = new Promise((resolve, reject) => {
      client.once('Tracing.tracingComplete', resolve);
      timeout = setTimeout(() => reject(new Error('La traza no terminó en 30 s')), 30000); timeout.unref();
    });
    await client.send('Tracing.end'); const event = await complete;
    if (!event.stream) throw new Error('Falta el stream de la traza');
    const chunks = [];
    try {
      while (true) {
        const part = await client.send('IO.read', {handle: event.stream});
        chunks.push(Buffer.from(part.data, part.base64Encoded ? 'base64' : 'utf8')); if (part.eof) break;
      }
    } finally {await client.send('IO.close', {handle: event.stream});}
    await writeFile(path.join(output, file), Buffer.concat(chunks));
    return {file, status: replayError || event.dataLossOccurred ? 'partial' : 'complete', replayError: replayError ?? null,
      note: 'Reproducción posterior: apertura, escritura, sugerencias y cambios SQL ↔ pandas, fuera de las treinta muestras. Revisar junto con Long Tasks y LoAF.'};
  } finally {clearTimeout(timeout);}
}

/** Una VM nueva por perfil. Las muestras preparadas no incluyen descarga ni arranque. */
export async function measurePracticeProfile(chromium, project, profile, baseURL, output) {
  const browser = await chromium.launch();
  const context = await browser.newContext({...project.use, baseURL, locale: 'es-MX', colorScheme: 'dark', reducedMotion: 'no-preference'});
  await context.addInitScript(installProbe);
  const page = await context.newPage(); const client = await context.newCDPSession(page);
  const result = {project: project.name, profileId: profile.id, viewport: project.use.viewport,
    cpuRate: project.name === 'celular' ? 4 : 1, samplesPerAction: 30, status: 'partial', actions: {}, screenshots: [], network: [], traces: []};
  const pending = []; const errors = []; const samples = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfinished', request => pending.push((async () => {
    const response = await request.response(); const timing = request.timing();
    result.network.push({url: request.url(), timing, status: response?.status(), contentLength: response?.headers()['content-length'] ?? null});
  })().catch(() => {})));
  page.on('requestfailed', request => result.network.push({url: request.url(), failure: request.failure()?.errorText}));
  try {
    await client.send('Network.enable'); await client.send('Network.setCacheDisabled', {cacheDisabled: true});
    await client.send('Emulation.setCPUThrottlingRate', {rate: result.cpuRate});
    await page.goto(profile.route, {waitUntil: 'networkidle'});
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    const before = await page.evaluate(() => ({timeOrigin: performance.timeOrigin, now: performance.now()}));
    await Promise.all(pending);
    result.readingRequests = result.network.map(item => item.url);
    if (result.readingRequests.some(url => /\/python\/|\.whl(?:$|\?)|\.wasm(?:$|\?)|alldoc-(?:python|sqlite)/.test(url))) throw new Error('La lectura descargó un motor');
    const cold = await measure(page, page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}),
      {id: 'cold', conditions: ['editor', 'ready'], timeout: 120000}, () => page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click());
    result.cold = {editorReadyMs: cold.responses.editor - cold.eventAt, runtimeReadyMs: cold.responses.ready - cold.eventAt,
      eventAt: cold.eventAt, timeOrigin: cold.timeOrigin, reading: before, ...await phases(page)};
    result.screenshots.push(await saveScreenshot(page, output, project.name + '-' + profile.id + '-ready'));
    await openRegion(page,'data');
    result.screenshots.push(await saveScreenshot(page, output, project.name + '-' + profile.id + '-data'));
    await openRegion(page,'editor');
    const collect = (action, sample) => {sample.action = action; (result.actions[action] ??= []).push(sample); samples.push(sample);};
    for (let index = 0; index < 30; index++) {
      const close = panel(page).getByRole('button', {name: 'Volver al apunte', exact: true});
      collect('close', await measure(page, close, {id: 'close-' + index, conditions: ['closed']}, () => close.click()));
      const trigger = page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true});
      collect('open', await measure(page, trigger, {id: 'open-' + index, conditions: ['open']}, () => trigger.click()));
    }
    for (let index = 0; index < 30; index++) {
      const text = profile.comment + ' escritura ' + index; await fillCode(page, text);
      collect('write', await measure(page, editor(page), {id: 'write-' + index, event: 'keydown', key: 'x', text: text + 'x', conditions: ['text']}, () => editor(page).press('x')));
    }
    for (const [action, code, label] of [['completionKeyword', profile.keyword, profile.keywordLabel], ['completionColumns', profile.columns, profile.columnLabel]]) {
      // Preparación explícita fuera de las treinta muestras; no se ejecuta el documento.
      await fillCode(page, code); await editor(page).press('Control+Space');
      await expect(panel(page).locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')})).toBeVisible({timeout: 10000});
      await editor(page).press('Escape');
      for (let index = 0; index < 30; index++) {
        await fillCode(page, code);
        collect(action, await measure(page, editor(page), {id: action + '-' + index, event: 'keydown', key: ' ', label, conditions: ['option']}, () => editor(page).press('Control+Space')));
        await editor(page).press('Escape');
      }
    }
    await fillCode(page, profile.id === 'sql-sqlite' ? 'SELECT nombre, precio FROM productos WHERE precio > 300;' : 'productos[productos["precio"] > 300][["nombre", "precio"]]');
    const execute = panel(page).getByRole('button', {name: 'Ejecutar', exact: true});
    const execution = await measure(page, execute, {id: 'execution', conditions: ['executed'], timeout: 30000}, async () => {
      await execute.click(); await openRegion(page,'results');
    });
    result.execution = {...execution, durationMs: execution.observedAt - execution.eventAt, budgetMs: null};
    await expect(results(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', '500']);
    result.screenshots.push(await saveScreenshot(page, output, project.name + '-' + profile.id + '-result'));
    await openRegion(page,'editor');
    if (profile.id === 'python-pandas') {
      result.contextMeasurements = {};
      const texts = {'sql-sqlite': 'SELECT * FROM productos;', 'python-pandas': 'productos.head(1)'};
      await fillCode(page, texts[profile.id]);
      const sqlLink = await selectConcept(page, practiceProfiles[0]); await sqlLink.click(); await ready(page); await fillCode(page, texts['sql-sqlite']);
      const pythonLink = await selectConcept(page, profile); await pythonLink.click(); await ready(page);
      for (let index = 0; index < 60; index++) {
        const target = practiceProfiles[index % 2]; const link = await selectConcept(page, target);
        const sample = await measure(page, link, {id: 'context-' + target.id + '-' + Math.floor(index / 2), conditions: ['context'],
          title: target.title, language: target.language, text: texts[target.id]}, () => link.click());
        sample.action = 'context'; sample.targetProfile = target.id;
        (result.contextMeasurements[target.id] ??= []).push(sample); samples.push(sample);
      }
      // El presupuesto de contexto termina al mostrar el borrador, no al arrancar la nueva VM.
      await ready(page);
    }
    Object.assign(result, await observerData(page, samples));
    // Se reproduce siempre una vez: también documenta el código de las acciones
    // cuando una tarea fría cae fuera de las ventanas preparadas.
    result.traces.push(await diagnosticTrace(page, client, profile, project, output));
    if (errors.length) throw new Error(errors.join('\n'));
    result.status = 'complete';
    await Promise.all(pending);
    result.cold.downloads = result.network.filter(item => item.timing?.startTime >= cold.timeOrigin + cold.eventAt
      && item.timing.startTime <= cold.timeOrigin + Math.max(...Object.values(cold.responses))).map(item => ({...item,
      kind: new URL(item.url).origin === new URL(baseURL).origin ? 'app/editor' : /\.whl(?:$|\?)/.test(item.url) ? 'python-package' : 'runtime'}));
    return result;
  } catch (error) {
    result.failure = error.message;
    await saveScreenshot(page, output, project.name + '-' + profile.id + '-failure').catch(() => {});
    throw Object.assign(error, {profileResult: result});
  } finally {await context.close(); await browser.close();}
}

/** Mide el mismo menú que usa el lector, con el cursor en la consulta real. */
export async function measureSqlProfile(chromium, project, baseURL, onScenario = () => {}) {
  const browser = await chromium.launch();
  const cpuRate = project.name === 'celular' ? 4 : 1;
  const report = {project: project.name, viewport: project.use.viewport, cpuRate, status: 'partial', actions: {}, completion: {}};
  try {
    const context = await browser.newContext({...project.use, baseURL, locale: 'es-MX', colorScheme: 'dark'});
    await context.addInitScript(installProbe);
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.setCacheDisabled', {cacheDisabled: true});
    await client.send('Emulation.setCPUThrottlingRate', {rate: cpuRate});
    const requests = [], errors = [], samples = [];
    page.on('request', request => requests.push(request.url()));
    page.on('pageerror', error => errors.push(error.message));
    const limit = '/apuntes/analisis-de-datos/sql/limit';
    await page.goto(limit, {waitUntil: 'networkidle'});
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    const trigger = page.getByRole('button', {name: 'Practicar SQL', exact: true});
    await expect(editor(page)).toHaveCount(0);
    report.readingRequests = requests.slice();
    if (requests.some(url => new URL(url).origin !== new URL(baseURL).origin
      || /\.wasm|\.whl|practice-(?:editor|panel)|negocio-relacional-1\//.test(url))) {
      throw new Error('La lectura inicial descargó recursos de práctica');
    }
    const initial = await measure(page, trigger, {id: 'cold', conditions: ['editor', 'ready'], timeout: 120000}, () => trigger.click());
    report.cold = {editorReadyMs: initial.responses.editor - initial.eventAt, runtimeReadyMs: initial.responses.ready - initial.eventAt,
      downloads: Array.from(new Set(requests.slice(report.readingRequests.length))), ...await phases(page)};
    const collect = (action, sample) => {
      sample.action = action;
      (report.actions[action] ??= []).push(sample);
      samples.push(sample);
    };
    const close = panel(page).getByRole('button', {name: 'Volver al apunte', exact: true});
    onScenario('apertura y escritura');
    for (let index = 0; index < sampleCount; index++) {
      collect('close', await measure(page, close, {id: 'close-' + index, conditions: ['closed']}, () => close.click()));
      collect('open', await measure(page, trigger, {id: 'open-' + index, conditions: ['open']}, () => trigger.click()));
      const text = '-- escritura ' + index;
      await fillCode(page, text);
      collect('write', await measure(page, editor(page), {id: 'write-' + index, event: 'keydown', key: 'x', text: text + 'x',
        conditions: ['text']}, () => editor(page).press('x')));
    }
    const input = editor(page);
    const menu = panel(page).locator('.cm-tooltip-autocomplete');
    const run = panel(page).locator('[data-practice-run]');
    for (const {id, marked, label} of completionScenarios) {
      onScenario(id);
      if (id === 'esquema-vivo') {
        await fillCode(page, 'ALTER TABLE productos ADD COLUMN precio_extra INTEGER;');
        await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
        await expect(results(page).getByText('Ejecución completada', {exact: true})).toBeVisible();
      }
      const [before, after] = marked.split('▏');
      await fillCode(page, before + after);
      for (let i = 0; i < after.length; i++) await input.press('ArrowLeft');
      const runId = await run.count() ? await run.getAttribute('data-practice-run') : null;
      const activate = () => input.press('Control+Space');
      await activate();
      await expect(menu.locator('.cm-completionLabel').filter({hasText: new RegExp('^' + label + '$')})).toBeVisible();
      await input.press('Escape');
      const measured = [];
      for (let index = 0; index < sampleCount; index++) {
        await expect(menu).toBeHidden();
        const sample = await measure(page, input, {id: id + '-' + index, event: 'keydown', key: ' ', label, conditions: ['option']}, activate);
        sample.action = id;
        measured.push(sample);
        samples.push(sample);
        await input.press('Escape');
      }
      if (runId === null) await expect(run).toHaveCount(0);
      else await expect(run).toHaveAttribute('data-practice-run', runId);
      report.completion[id] = {...assessCompletionSamples(measured), samples: measured};
    }
    await close.click();
    onScenario('dialecto');
    const selector = page.getByRole('combobox', {name: 'Dialecto SQL', exact: true});
    const dialects = [{id: 'sqlserver', code: 'TOP (5)'}, {id: 'sqlite', code: 'LIMIT 5'}];
    await selector.selectOption('sqlserver');
    await expect(page.locator('[data-sql-concept] pre').first()).toContainText('TOP (5)');
    await selector.selectOption('sqlite');
    await expect(page.locator('[data-sql-concept] pre').first()).toContainText('LIMIT 5');
    for (let index = 0; index < sampleCount; index++) {
      const next = dialects[index % dialects.length];
      collect('dialect', await measure(page, selector, {id: 'dialect-' + index, event: 'change', code: next.code,
        conditions: ['dialect']}, () => selector.selectOption(next.id)));
    }
    onScenario('concepto');
    const next = page.locator('.pagination-nav__link--next');
    const previous = page.locator('.pagination-nav__link--prev');
    const nextPath = new URL(await next.getAttribute('href'), baseURL).pathname;
    const concept = page.locator('[data-sql-concept]');
    const initialConcept = await concept.getAttribute('data-sql-concept');
    await next.click();
    await expect(page).toHaveURL(url => url.pathname === nextPath);
    await expect(concept).not.toHaveAttribute('data-sql-concept', initialConcept);
    const nextConcept = await concept.getAttribute('data-sql-concept');
    await previous.click();
    await expect(concept).toHaveAttribute('data-sql-concept', initialConcept);
    for (let index = 0; index < sampleCount; index++) {
      const forward = index % 2 === 0;
      const link = forward ? next : previous;
      collect('concept', await measure(page, link, {id: 'concept-' + index, conditions: ['note'],
        path: forward ? nextPath : limit, concept: forward ? nextConcept : initialConcept}, () => link.click()));
    }
    report.observers = await observerData(page, samples);
    report.errors = errors;
    if (errors.length) throw new Error(errors[0]);
    report.actionSummary = Object.fromEntries(Object.entries(report.actions).map(([action, items]) =>
      [action, summarize(items.map(item => item.observedAt - item.eventAt))]));
    report.status = Object.values(report.completion).every(scenario => scenario.status === 'passed') ? 'passed' : 'budget-exceeded';
    return report;
  } catch (error) {
    report.failure = error.message;
    return report;
  } finally {
    await browser.close();
  }
}

export async function crossBrowserSmoke(browserType, name, baseURL, output) {
  const result = {browser: name, status: 'not-run', cases: [], screenshots: []};
  let browser;
  try {browser = await browserType.launch();}
  catch (error) {result.status = error.message.includes("Executable doesn't exist") ? 'not-installed' : 'failed'; result.reason = error.message.split('\n')[0]; return result;}
  try {
    result.version = browser.version();
    for (const profile of practiceProfiles) {
      const context = await browser.newContext({baseURL, viewport: {width: 1280, height: 800}, locale: 'es-MX', colorScheme: 'dark'});
      try {
        const page = await context.newPage(); await page.goto(profile.route, {waitUntil: 'networkidle'});
        await page.getByRole('button', {name: 'Practicar ' + profile.label, exact: true}).click(); await ready(page);
        await fillCode(page, profile.id === 'sql-sqlite' ? 'SELECT nombre, precio FROM productos WHERE precio > 300;' : 'productos[productos["precio"] > 300][["nombre", "precio"]]');
        await panel(page).getByRole('button', {name: 'Ejecutar', exact: true}).click();
        await openRegion(page,'results');
        await expect(panel(page).getByText('Ejecución completada', {exact: true})).toBeVisible({timeout: 30000});
        await expect(results(page).getByRole('table').getByRole('row').nth(1).getByRole('cell')).toHaveText(['Teclado', '500']);
        await expect(results(page).getByRole('table').getByRole('row').nth(2).getByRole('cell')).toHaveText(['Monitor', '3500']);
        result.screenshots.push(await saveScreenshot(page, output, name + '-' + profile.id));
        result.cases.push({profileId: profile.id, status: 'passed'});
      } finally {await context.close();}
    }
    result.status = 'passed';
  } catch (error) {result.status = 'failed'; result.reason = error.message;}
  finally {await browser.close();}
  return result;
}
