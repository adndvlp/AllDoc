import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {performance} from 'node:perf_hooks';
import {filesUnder, summarize, buildFile} from './baseline.ts';
import {prepareSearchIndex, searchPreparedEntries} from '../../src/lib/search.ts';

type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue => value && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : {};
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const validNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const stats = (values: unknown[]) => values.every(validNumber) ? summarize(values) : null;
const at = (object: unknown, ...keys: string[]): unknown => keys.reduce((value, key) => record(value)[key], object);

function delta(before: unknown, after: unknown) {
  const a = validNumber(before) ? before : null;
  const b = validNumber(after) ? after : null;
  return {before: a, after: b, deltaBytes: a !== null && b !== null ? b - a : null,
    percent: a !== null && a > 0 && b !== null ? (b - a) / a * 100 : null};
}

const metricDefinitions = [
  {action: 'warmSearchOpen', source: 'warmSearchOpen', key: 'dialogVisible'},
  {action: 'warmSearchResults', source: 'warmSearchOpen', key: 'resultsReady'},
  {action: 'typeW', source: 'typeW', key: 'filtered'},
  {action: 'navigateToWhere', source: 'navigateToWhere', key: 'navigated'},
  {action: 'toggleSql', source: 'toggleSql', key: ''},
  {action: 'toggleFavorite', source: 'toggleFavorite', key: ''},
];

function rawSamples(profile: unknown, action: string) {return list(at(profile, 'actions', action, 'samples'));}
function metricValues(profile: unknown, definition: typeof metricDefinitions[number]) {
  return rawSamples(profile, definition.source).map((sample) => {
    const direction = at(sample, 'direction');
    const key = definition.key || (definition.action === 'toggleSql'
      ? direction === 'open' ? 'categoryOpen' : direction === 'close' ? 'categoryClosed' : ''
      : direction === 'add' ? 'favoriteAdded' : direction === 'remove' ? 'favoriteRemoved' : '');
    return at(sample, 'domResponseMs', key);
  });
}
function observedEvents(samples: unknown[]) {
  const maxima = samples.map((sample) => {
    const durations = list(at(sample, 'eventTiming')).map((event) => at(event, 'duration')).filter(validNumber);
    return durations.length ? Math.max(...durations) : null;
  });
  return {samplesWithoutEntries: maxima.filter((value) => value === null).length,
    observed: summarize(maxima.filter((value) => value !== null))};
}

/** Raw samples are authoritative; a cached favorable summary cannot pass a budget. */
export function compareRuns(before: unknown, after: unknown) {
  const reasons: string[] = [], incomplete: string[] = [], warnings: string[] = [];
  const beforeReport = record(at(before, 'report')), afterReport = record(at(after, 'report'));
  for (const [label, report] of [['referencia', beforeReport], ['actual', afterReport]] as const) {
    if (report.schemaVersion !== 1) incomplete.push(`Esquema desconocido: ${label}`);
    if (!Object.keys(record(report.packages)).length) incomplete.push(`Faltan versiones del stack: ${label}`);
    if (report.status !== 'complete' || at(report, 'build', 'status') !== 'complete' || at(report, 'browser', 'status') !== 'complete' || list(report.failures).length) incomplete.push(`Ejecución ${label} incompleta`);
  }
  for (const key of ['node', 'platform', 'release', 'arch', 'cpu', 'logicalCpus', 'totalMemoryBytes']) {
    const a = at(beforeReport, 'environment', key), b = at(afterReport, 'environment', key);
    if (a === undefined || b === undefined) incomplete.push(`Falta entorno: ${key}`);
    else if (!same(a, b)) reasons.push(`Entorno distinto: ${key}`);
  }
  for (const key of ['name', 'version']) {
    const a = at(beforeReport, 'browser', key), b = at(afterReport, 'browser', key);
    if (typeof a !== 'string' || !a || typeof b !== 'string' || !b) incomplete.push(`Falta navegador: ${key}`);
    else if (!same(a, b)) reasons.push(`Navegador distinto: ${key}`);
  }
  for (const key of ['network', 'cache', 'domMetric']) {
    const a = at(beforeReport, 'conditions', key), b = at(afterReport, 'conditions', key);
    if (a === undefined || b === undefined) incomplete.push(`Falta condición: ${key}`);
    else if (!same(a, b)) reasons.push(`Condición distinta: ${key}`);
  }
  if (!same(beforeReport.packages, afterReport.packages)) reasons.push('Versiones del stack distintas');
  if (!same(beforeReport.tooling, afterReport.tooling)) warnings.push('La herramienta cambió: revisar el diff y conservar el método de las acciones comunes.');

  const profilesBefore = list(at(before, 'profiles')), profilesAfter = list(at(after, 'profiles'));
  const metrics = [];
  const longTasks = [];
  for (const project of ['laptop', 'celular']) {
    const oldProfiles = profilesBefore.filter((profile) => at(profile, 'project') === project);
    const newProfiles = profilesAfter.filter((profile) => at(profile, 'project') === project);
    const old = oldProfiles[0], current = newProfiles[0];
    if (oldProfiles.length !== 1 || newProfiles.length !== 1 || at(old, 'status') !== 'complete' || at(current, 'status') !== 'complete') incomplete.push(`Perfil incompleto o repetido: ${project}`);
    for (const key of ['cpuRate', 'viewport', 'reducedMotion']) if (!same(at(old, key), at(current, key))) reasons.push(`${project}: ${key} distinto`);
    for (const definition of metricDefinitions) {
      const oldValues = metricValues(old, definition), values = metricValues(current, definition);
      const previous = definition.action === 'toggleFavorite' && oldValues.length === 0 ? null : stats(oldValues);
      const measured = stats(values);
      let complete = values.length === 30 && measured !== null && at(current, 'samplesPerAction') === 30;
      if (definition.action !== 'toggleFavorite' && (oldValues.length !== 30 || previous === null || at(old, 'samplesPerAction') !== 30)) complete = false;
      if (definition.action === 'toggleFavorite' || definition.action === 'toggleSql') {
        const samples = rawSamples(current, definition.source);
        const first = definition.action === 'toggleSql' ? 'open' : 'add', second = definition.action === 'toggleSql' ? 'close' : 'remove';
        if (samples.filter((sample) => at(sample, 'direction') === first).length !== 15 || samples.filter((sample) => at(sample, 'direction') === second).length !== 15) complete = false;
      }
      if (!complete) incomplete.push(`${project}/${definition.action}: faltan 30 muestras válidas y estados equilibrados`);
      metrics.push({project, action: definition.action, before: previous, after: measured,
        deltaP95: previous?.p95 !== null && previous?.p95 !== undefined && measured?.p95 !== null && measured?.p95 !== undefined ? measured.p95 - previous.p95 : null,
        budget: !complete ? 'pending' : measured!.p95! <= 100 ? 'met' : 'exceeded',
        eventTiming: observedEvents(rawSamples(current, definition.source))});
    }
    const tasks = list(at(current, 'longTasks')).filter((task) => validNumber(at(task, 'duration')) && (at(task, 'duration') as number) > 50);
    longTasks.push({project, tasks});
    if (tasks.length) warnings.push(`${project}: ${tasks.length} tareas de más de 50 ms; revisar su fase y trazas antes de atribuirlas al nuevo código.`);
  }
  const oldPages = list(at(before, 'bundle', 'pages')), newPages = list(at(after, 'bundle', 'pages'));
  if (!oldPages.length || !newPages.length) incomplete.push('Falta inventario por página');
  const pages = oldPages.map((page) => {
    const html = String(at(page, 'html'));
    const current = newPages.find((candidate) => at(candidate, 'html') === html);
    if (!current) incomplete.push(`Falta ruta publicada: ${html}`);
    return {html, js: delta(at(page, 'js', 'gzipBytes'), at(current, 'js', 'gzipBytes')),
      css: delta(at(page, 'css', 'gzipBytes'), at(current, 'css', 'gzipBytes'))};
  });
  const totals = {js: delta(at(before, 'bundle', 'totals', 'js', 'gzipBytes'), at(after, 'bundle', 'totals', 'js', 'gzipBytes')),
    css: delta(at(before, 'bundle', 'totals', 'css', 'gzipBytes'), at(after, 'bundle', 'totals', 'css', 'gzipBytes'))};
  if ([totals.js, totals.css, ...pages.flatMap((p) => [p.js, p.css])].some((value) => value.before === null || value.after === null)) incomplete.push('Tamaños de bundle ausentes o inválidos');
  const status = incomplete.length ? 'incomplete' : reasons.length ? 'incomparable' : metrics.some((metric) => metric.budget === 'exceeded') ? 'budget-exceeded' : 'complete';
  return {status, metric: 'DOM + siguiente rAF', budgetMs: 100, inp: 'not-measured', reasons: [...incomplete, ...reasons], warnings,
    bundle: {totals, pages}, metrics, longTasks,
    cold: ['laptop', 'celular'].map((project) => ({project,
      before: at(profilesBefore.find((p) => at(p, 'project') === project), 'cold', 'domResponseMs'),
      after: at(profilesAfter.find((p) => at(p, 'project') === project), 'cold', 'domResponseMs')}))};
}

/** Checks published HTML rather than removed notes in repository history. */
export async function auditPublishedBuild(directory: string) {
  const failures: string[] = [], pages = [];
  for (const filename of (await filesUnder(directory)).filter((name) => name.endsWith('.html')).sort()) {
    const html = await readFile(filename, 'utf8');
    const route = path.relative(directory, filename).split(path.sep).join('/');
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    const h1 = [...visible.matchAll(/<h1\b/gi)].length;
    if (h1 !== 1) failures.push(`${route}: se esperaba un h1 y hay ${h1}`);
    const text = visible.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    if (/repaso completo|sql de un vistazo/i.test(text)) failures.push(`${route}: contenido retirado publicado`);
    if (/repaso(?:-completo)?|vistazo/i.test(route)) failures.push(`${route}: ruta retirada publicada`);
    const viewport = html.match(/<meta\b(?=[^>]*name=["']viewport["'])[^>]*>/i)?.[0] ?? '';
    if (/user-scalable\s*=\s*(?:no|0)|maximum-scale\s*=\s*(?:0(?:\.\d+)?|1(?:\.0+)?)\b/i.test(viewport)) failures.push(`${route}: zoom bloqueado`);
    const url = route === 'index.html' ? '/' : '/' + route.replace(/(?:\/index)?\.html$/, '');
    const resolved = await buildFile(path.resolve(directory), url);
    const servedAs = resolved ? path.relative(directory, resolved).split(path.sep).join('/') : null;
    if (servedAs !== route) failures.push(`${route}: la ruta ${url} resuelve a ${servedAs ?? '404'}`);
    pages.push({route, h1, viewport, url, servedAs});
  }
  if (!pages.length) failures.push('No hay HTML publicado');
  const homeJS = {loaderFound: false, chunkIds: [] as number[], bodyAssets: [] as string[], loadedBodies: [] as string[]};
  const bodyChunks: {file: string; ids: number[]}[] = [];
  for (const filename of (await filesUnder(directory)).filter((name) => name.endsWith('.js'))) {
    const script = await readFile(filename, 'utf8');
    const file = path.relative(directory, filename).split(path.sep).join('/');
    // notes-* cubre futuras herramientas; el marcador detecta el chunk común
    // heredado antes de separar el corpus de SQL de la portada.
    if (path.basename(file).startsWith('notes-') || script.includes('SELECT nombre, precio FROM productos;')) {
      const ids = script.match(/\.push\(\[\[([0-9,]+)\]/)?.[1].split(',').map(Number) ?? [];
      bodyChunks.push({file, ids});
    }
    const marker = script.indexOf('"@site/src/pages/index.tsx"');
    const start = marker >= 0 ? script.lastIndexOf('[function', marker) : -1;
    if (start >= 0) {
      homeJS.loaderFound = true;
      const loader = script.slice(start, marker);
      homeJS.chunkIds = [...loader.matchAll(/\b[\w$]+\.e\((\d+)\)/g)].map((match) => Number(match[1]));
    }
  }
  homeJS.bodyAssets = bodyChunks.map((chunk) => chunk.file);
  homeJS.loadedBodies = bodyChunks.filter((chunk) => chunk.ids.some((id) => homeJS.chunkIds.includes(id))).map((chunk) => chunk.file);
  if (bodyChunks.length && !homeJS.loaderFound) failures.push('No se pudo comprobar el cargador de portada frente a los cuerpos de apuntes');
  if (homeJS.loadedBodies.length) failures.push('La portada carga cuerpos de apuntes: ' + homeJS.loadedBodies.join(', '));
  return {status: failures.length ? 'failed' : 'passed', pages, homeJS, failures};
}

/** Growth check only: synthetic entries never modify the published catalog. */
export function syntheticSearchBenchmark() {
  const entries = Array.from({length: 1000}, (_, index) => ({id: `synthetic/${String(index).padStart(4, '0')}`,
    title: `Concepto ${String(index).padStart(4, '0')}`, description: 'Operación sintética para comprobar crecimiento.',
    context: 'Prueba local', href: `/synthetic/${index}`, keywords: ['operación']}));
  const start = performance.now();
  const index = prepareSearchIndex(entries);
  const prepareMs = performance.now() - start;
  const samples = [];
  for (let i = 0; i < 30; i++) {
    const start = performance.now();
    searchPreparedEntries(index, i % 2 ? 'operación' : 'concepto 0999');
    samples.push(performance.now() - start);
  }
  return {entries: entries.length, uniqueIds: new Set(entries.map((entry) => entry.id)).size,
    exactMatch: searchPreparedEntries(index, 'concepto 0999')[0]?.id,
    commonMatches: searchPreparedEntries(index, 'operación').length,
    prepareMs, samples: summarize(samples), rawSamplesMs: samples,
    environment: 'Node; no mide renderizado ni teclado de navegador'};
}

export const practiceActions = ['open', 'close', 'write', 'completionKeyword', 'completionColumns', 'context'] as const;
export const practicePhases = ['bootstrap', 'draft', 'dataset', 'runtime-init', 'inspect'] as const;
export const pythonPhases = ['python-sdk', 'python-packages', 'python-data', 'python-jedi'] as const;

/** Solo los timestamps de las muestras deciden el presupuesto; no sus resúmenes. */
export function assessPracticeMetrics(input: unknown) {
  const reasons: string[] = [];
  const profiles = list(at(input, 'profiles'));
  if (at(input, 'schemaVersion') !== 1 || at(input, 'metric') !== 'DOM + siguiente rAF') reasons.push('Formato de medición desconocido');
  if (profiles.length !== 4) reasons.push('Se requieren los cuatro perfiles de medición');
  const metrics: {project: string; profileId: string; action: string; count: number; p95: number | null; budgetMs: number;
    status: 'pending' | 'met' | 'exceeded'; eventTiming: {observedCount: number; samplesWithoutEntries: number; p95: number | null}}[] = [];
  for (const project of ['laptop', 'celular']) for (const profileId of ['sql-sqlite', 'python-pandas']) {
    const matches = profiles.filter(p => at(p, 'project') === project && at(p, 'profileId') === profileId);
    const p = matches[0]; const label = project + '/' + profileId;
    if (matches.length !== 1 || at(p, 'status') !== 'complete') reasons.push(label + ': perfil ausente, repetido o incompleto');
    if (at(p, 'samplesPerAction') !== 30 || at(p, 'cpuRate') !== (project === 'laptop' ? 1 : 4)
      || !same(at(p, 'viewport'), project === 'laptop' ? {width: 1280, height: 800} : {width: 390, height: 844})) reasons.push(label + ': condiciones distintas de las declaradas');
    for (const name of ['editorReadyMs', 'runtimeReadyMs']) if (!validNumber(at(p, 'cold', name))) reasons.push(label + ': falta ' + name);
    for (const name of practicePhases) if (!validNumber(at(p, 'cold', 'phases', name, 'duration')) || at(p, 'cold', 'phases', name, 'status') !== 'success') reasons.push(label + ': fase incompleta ' + name);
    if (profileId === 'python-pandas') for (const name of pythonPhases) if (!validNumber(at(p, 'cold', 'workerPhases', name, 'duration')) || at(p, 'cold', 'workerPhases', name, 'status') !== 'success') reasons.push(label + ': fase Python incompleta ' + name);
    for (const action of practiceActions) {
      const samples = list(at(p, 'actions', action));
      const ids = samples.map(s => at(s, 'id'));
      const valid = samples.length === 30 && ids.every(id => typeof id === 'string' && id.length > 0) && new Set(ids).size === 30
        && samples.every(s => validNumber(at(s, 'armedAt')) && validNumber(at(s, 'eventAt')) && validNumber(at(s, 'observedAt'))
          && (at(s, 'eventAt') as number) >= (at(s, 'armedAt') as number) && (at(s, 'observedAt') as number) >= (at(s, 'eventAt') as number) && at(s, 'satisfied') === true);
      const measured = valid ? summarize(samples.map(s => (at(s, 'observedAt') as number) - (at(s, 'eventAt') as number))) : null;
      const eventMaxima = samples.map(s => list(at(s, 'eventTiming')).map(e => at(e, 'duration')).filter(validNumber)).filter(events => events.length).map(events => Math.max(...events));
      const observed = summarize(eventMaxima);
      const budgetMs = profileId === 'python-pandas' && action.startsWith('completion') ? 300 : 100;
      if (!valid) reasons.push(label + '/' + action + ': faltan 30 muestras válidas y distintas');
      metrics.push({project, profileId, action, count: samples.length, p95: measured?.p95 ?? null, budgetMs,
        status: !valid ? 'pending' : measured!.p95! <= budgetMs ? 'met' : 'exceeded',
        eventTiming: {observedCount: eventMaxima.length, samplesWithoutEntries: samples.length - eventMaxima.length, p95: observed.p95}});
    }
  }
  const longTasks = profiles.flatMap(p => list(at(p, 'longTasks')).filter(task => validNumber(at(task, 'duration')) && (at(task, 'duration') as number) > 50)
    .map(task => ({project: at(p, 'project'), profileId: at(p, 'profileId'), ...record(task)})));
  return {status: reasons.length ? 'incomplete' : metrics.some(m => m.status === 'exceeded') ? 'budget-exceeded' : 'complete',
    metric: 'DOM + siguiente rAF', inp: 'not-measured', reasons, metrics, longTasks, requiresTraceReview: longTasks.length > 0};
}

export function assessPracticeBundle(before: unknown, after: unknown) {
  const reasons: string[] = []; const oldPages = list(at(before, 'pages')), newPages = list(at(after, 'pages'));
  if (!oldPages.length || !newPages.length) reasons.push('Falta inventario por página');
  const pages = oldPages.map(old => {
    const html = at(old, 'html'); const current = newPages.find(p => at(p, 'html') === html);
    const sizes = [at(old, 'js', 'gzipBytes'), at(old, 'css', 'gzipBytes'), at(current, 'js', 'gzipBytes'), at(current, 'css', 'gzipBytes')];
    const valid = sizes.every(validNumber);
    if (!valid) reasons.push(String(html) + ': faltan tamaños iniciales');
    const deltaBytes = valid ? (sizes[2] as number) + (sizes[3] as number) - (sizes[0] as number) - (sizes[1] as number) : null;
    return {html, before: valid ? (sizes[0] as number) + (sizes[1] as number) : null,
      after: valid ? (sizes[2] as number) + (sizes[3] as number) : null, deltaBytes, status: !valid ? 'pending' : deltaBytes! <= 5120 ? 'met' : 'exceeded'};
  });
  return {status: reasons.length ? 'incomplete' : pages.some(p => p.status === 'exceeded') ? 'budget-exceeded' : 'complete', budgetBytes: 5120, reasons, pages,
    interactionBaseline: 'not-available', note: 'La referencia precede al panel; permite comparar archivos iniciales, no inventar latencias previas de práctica.'};
}

export type PracticeUICase = {file: string; title: string; projectName: string; status: 'passed' | 'failed' | 'skipped'};
export function practiceUICases(input: unknown): PracticeUICase[] {
  const result: PracticeUICase[] = [];
  function visit(suite: unknown, inheritedFile = '') {
    const file = String(at(suite, 'file') ?? inheritedFile);
    for (const spec of list(at(suite, 'specs'))) for (const test of list(at(spec, 'tests'))) {
      const final = at(list(at(test, 'results')).at(-1), 'status');
      result.push({file: String(at(spec, 'file') ?? file), title: String(at(spec, 'title') ?? ''), projectName: String(at(test, 'projectName') ?? ''),
        status: at(test, 'status') === 'skipped' && final === 'skipped' ? 'skipped'
          : at(test, 'status') === 'expected' && final === 'passed' ? 'passed' : 'failed'});
    }
    for (const child of list(at(suite, 'suites'))) visit(child, file);
  }
  visit(input); return result;
}

// Se requieren casos ejecutados; la presencia de un archivo no acredita un criterio.
const acceptanceRequirements = [
  ['Contexto habilitado', 'practice-context.test.ts', 'practice.spec.ts', 'entrada contextual'],
  ['Workspaces por herramienta', 'practice-session.test.ts', 'python.spec.ts', 'cambio SQL'],
  ['Cambio abierto y colapsado', 'practice-session.test.ts', 'practice.spec.ts', 'borradores'],
  ['Cargas tardías y reintento', 'practice-session.test.ts', 'practice.spec.ts', 'descarga tardía'],
  ['Persistencia de borradores', 'practice-drafts.test.ts', 'practice.spec.ts', 'borradores'],
  ['Ejemplos y revisión anterior', 'practice-actions.test.ts', 'practice-actions.spec.ts', 'revisión anterior'],
  ['Miniapunte pandas', 'practice-data.test.ts', 'python.spec.ts', 'DataFrame real'],
  ['Ocho ejemplos SQL', 'practice-sqlite.test.ts', 'sqlite.spec.ts', 'consulta real'],
  ['Dataset común tipado', 'practice-data.test.ts', 'python.spec.ts', 'DataFrame real'],
  ['Mutación y reinicio', 'practice-sqlite.test.ts', 'python.spec.ts', 'pandas vivo'],
  ['Completado SQL', 'practice-editor.test.ts', 'sqlite.spec.ts', 'esquema vivo'],
  ['Completado pandas/Jedi', 'practice-python.test.ts', 'python.spec.ts', 'Jedi y columnas'],
  ['Respuestas de sugerencias obsoletas', 'practice-editor-completion.test.ts', 'python.spec.ts', 'Jedi y columnas'],
  ['Éxito, error, timeout y cancelación', 'practice-session.test.ts', 'python.spec.ts', 'timeout Python'],
  ['Detener conserva edición', 'practice-session.test.ts', 'sqlite.spec.ts', 'cancelación real'],
  ['Identidad de respuestas', 'practice-contracts.test.ts', 'python.spec.ts', 'cambio SQL'],
  ['Salidas seguras y acotadas', 'practice-contracts.test.ts', 'sqlite.spec.ts', 'selección:'],
  ['Extensibilidad mediante contrato', 'practice-context.test.ts', '', ''],
  ['Perfil futuro sin ejecución ficticia', 'practice-panel.test.ts', '', ''],
  ['Diálogo único y foco', 'practice-panel.test.ts', 'practice.spec.ts', 'modal:'],
  ['Scroll independiente', 'practice-panel.test.ts', 'practice.spec.ts', 'separador:'],
  ['Adaptación y accesibilidad', 'practice-panel.test.ts', 'practice.spec.ts', 'responsive:'],
  ['Almacenamiento no disponible o corrupto', 'practice-drafts.test.ts', 'practice-actions.spec.ts', 'almacenamiento bloqueado'],
  ['Carga diferida y liberación', 'practice-session.test.ts', 'sqlite.spec.ts', 'aislamiento real'],
  ['Rendimiento y bundle', 'practice-verification.test.ts', '', ''],
  ['Aislamiento entre orígenes', 'practice-isolation.test.ts', 'python.spec.ts', 'aislamiento Python'],
  ['Regresión global y capturas', 'client-compilation.test.ts', 'notes.spec.ts', 'una envoltura'],
] as const;

export function assessPracticeAcceptance(input: unknown) {
  const native = list(at(input, 'nativeCases')), ui = list(at(input, 'uiCases'));
  const criteria = acceptanceRequirements.map(([title, nativeFile, uiFile, pattern], index) => {
    const matchesFile = (c: unknown, name: string) => String(at(c, 'file')) === name || String(at(c, 'file')).endsWith('/' + name);
    const nativeEvidence = native.filter(c => matchesFile(c, nativeFile) && at(c, 'status') === 'passed' && !at(c, 'skipped'));
    const uiEvidence = uiFile ? ui.filter(c => matchesFile(c, uiFile) && String(at(c, 'title')).includes(pattern) && at(c, 'status') === 'passed') : [];
    const checks = record(at(input, 'checks'));
    const extra = index === 24 ? checks.performance === true && checks.bundle === true
      : index === 26 ? checks.types === true && checks.build === true && checks.stable === true && checks.strictUI === true : true;
    return {id: 'PA-' + String(index + 1).padStart(2, '0'), title,
      status: nativeEvidence.length > 0 && (!uiFile || uiEvidence.length > 0) && extra ? 'verified' : 'pending', nativeEvidence, uiEvidence};
  });
  const projects = ['celular-pequeno', 'celular', 'celular-horizontal', 'ipad', 'ipad-horizontal', 'laptop', 'escritorio'];
  const missingProjects = projects.filter(project => !ui.some(c => at(c, 'projectName') === project && at(c, 'status') === 'passed'));
  const failed = ui.filter(c => at(c, 'status') === 'failed');
  return {status: criteria.every(c => c.status === 'verified') && !missingProjects.length && !failed.length ? 'complete' : 'incomplete', criteria, missingProjects, failed};
}
