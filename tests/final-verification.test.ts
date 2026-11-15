import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {compareRuns, auditPublishedBuild, syntheticSearchBenchmark} from '../scripts/lib/final-verification.ts';

function fixture(after = false) {
  const profiles = ['laptop', 'celular'].map((project) => {
    const sample = (domResponseMs: Record<string, number>, direction?: string) => ({domResponseMs,
      eventTiming: [], maxObservedEventDurationMs: null, ...(direction ? {direction} : {})});
    const repeated = (key: string) => Array.from({length: 30}, () => sample({[key]: 20}));
    return {project, status: 'complete', cpuRate: project === 'celular' ? 4 : 1,
      viewport: project === 'celular' ? {width: 390, height: 844} : {width: 1280, height: 800},
      reducedMotion: 'no-preference', samplesPerAction: 30,
      cold: {domResponseMs: {dialogVisible: 30, resultsReady: 60}}, longTasks: [],
      actions: {
        warmSearchOpen: {samples: Array.from({length: 30}, () => sample({dialogVisible: 20, resultsReady: 25}))},
        typeW: {samples: repeated('filtered')}, navigateToWhere: {samples: repeated('navigated')},
        toggleSql: {samples: Array.from({length: 30}, (_, index) => sample({[index % 2 ? 'categoryClosed' : 'categoryOpen']: 20}, index % 2 ? 'close' : 'open'))},
        ...(after ? {toggleFavorite: {samples: Array.from({length: 30}, (_, index) => sample({[index % 2 ? 'favoriteRemoved' : 'favoriteAdded']: 20}, index % 2 ? 'remove' : 'add'))}} : {}),
      },
    };
  });
  return {
    report: {schemaVersion: 1, status: 'complete', failures: [],
      environment: {node: 'v26', platform: 'darwin', release: '27', arch: 'arm64', cpu: 'CPU', logicalCpus: 8, totalMemoryBytes: 8e9},
      packages: {react: '19'}, browser: {status: 'complete', name: 'chromium', version: '158'},
      build: {status: 'complete'}, source: {sha256: after ? 'after' : 'before'},
      conditions: {network: 'loopback gzip', cache: 'disabled', domMetric: 'event + DOM + rAF'},
      tooling: [{path: 'measurement.mjs', sha256: after ? 'new' : 'old'}]},
    bundle: {totals: {js: {gzipBytes: after ? 600 : 500}, css: {gzipBytes: 60}},
      pages: ['index.html', 'apuntes/sql/select.html'].map((html) => ({html, js: {gzipBytes: after ? 120 : 100}, css: {gzipBytes: 50}}))},
    profiles,
  };
}

test('auditoría publicada: comprueba la ruta canónica de cada HTML antes de ejecutar UI', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-published-routes-'));
  try {
    await mkdir(path.join(directory, 'apuntes/area/sql'), {recursive: true});
    await writeFile(path.join(directory, 'index.html'), '<h1>Inicio</h1>');
    await writeFile(path.join(directory, 'apuntes/area.html'), '<h1>Área</h1>');
    await writeFile(path.join(directory, 'apuntes/area/sql/select.html'), '<h1>SELECT</h1>');
    const result = await auditPublishedBuild(directory);
    assert.equal(result.status, 'passed');
    assert.deepEqual(Object.fromEntries(result.pages.map(p => [p.url, p.servedAs])), {
      '/apuntes/area/sql/select': 'apuntes/area/sql/select.html',
      '/apuntes/area': 'apuntes/area.html', '/': 'index.html',
    });
  } finally {await rm(directory, {recursive: true, force: true});}
});

test('comparación final: distingue bundle total e inicial y favoritos sin referencia previa', () => {
  const result = compareRuns(fixture(), fixture(true));
  assert.equal(result.status, 'complete');
  assert.equal(result.bundle.totals.js.deltaBytes, 100);
  assert.equal(result.bundle.pages[0].js.deltaBytes, 20);
  assert.equal(result.bundle.pages[0].js.percent, 20);
  const favorite = result.metrics.find((m) => m.action === 'toggleFavorite' && m.project === 'celular')!;
  assert.equal(favorite.before, null);
  assert.equal(favorite.after?.count, 30);
  assert.equal(favorite.budget, 'met');
  assert.ok(result.warnings.some((message) => message.includes('herramienta')));
});

test('presupuesto: recalcula p95 de muestras crudas y no acepta un resumen antiguo favorable', () => {
  const after = fixture(true);
  after.profiles[0].actions.typeW.samples[28].domResponseMs.filtered = 150;
  after.profiles[0].actions.typeW.samples[29].domResponseMs.filtered = 160;
  Object.assign(after.profiles[0].actions.typeW, {summary: {domResponseMs: {p95: 10}}});
  const result = compareRuns(fixture(), after);
  assert.equal(result.status, 'budget-exceeded');
  assert.equal(result.metrics.find((m) => m.project === 'laptop' && m.action === 'typeW')!.after?.p95, 150);
});

test('muestras ausentes o inválidas no se convierten en cero ni acreditan el presupuesto', () => {
  for (const invalid of ['missing', 'negative', 'null']) {
    const after = fixture(true);
    if (invalid === 'missing') after.profiles[0].actions.typeW.samples.pop();
    else if (invalid === 'negative') after.profiles[0].actions.typeW.samples[0].domResponseMs.filtered = -1;
    else Object.assign(after.profiles[0].actions.typeW.samples[0].domResponseMs, {filtered: null});
    const result = compareRuns(fixture(), after);
    assert.equal(result.status, 'incomplete');
    assert.equal(result.metrics.find((m) => m.project === 'laptop' && m.action === 'typeW')!.budget, 'pending');
  }
});

test('comparación: ejecuciones parciales, perfiles o rutas eliminados y favoritos sin medir quedan pendientes', () => {
  for (const change of ['partial', 'profile', 'page', 'favorite']) {
    const after = fixture(true);
    if (change === 'partial') after.report.status = 'partial';
    if (change === 'profile') after.profiles.pop();
    if (change === 'page') after.bundle.pages.pop();
    if (change === 'favorite') delete after.profiles[0].actions.toggleFavorite;
    assert.equal(compareRuns(fixture(), after).status, 'incomplete', change);
  }
});

test('comparación: cambiar navegador, CPU, viewport o red impide atribuir diferencias a la aplicación', () => {
  for (const change of ['browser', 'cpu', 'viewport', 'network']) {
    const after = fixture(true);
    if (change === 'browser') after.report.browser.version = '159';
    if (change === 'cpu') after.profiles[1].cpuRate = 1;
    if (change === 'viewport') after.profiles[1].viewport.width = 400;
    if (change === 'network') after.report.conditions.network = 'WAN';
    const result = compareRuns(fixture(), after);
    assert.equal(result.status, 'incomparable', change);
    assert.ok(result.reasons.length > 0);
  }
});

test('Event Timing: conserva cobertura parcial y no etiqueta el proxy DOM como INP', () => {
  const result = compareRuns(fixture(), fixture(true));
  const type = result.metrics.find((m) => m.action === 'typeW')!;
  assert.equal(type.eventTiming.samplesWithoutEntries, 30);
  assert.equal(type.eventTiming.observed.p95, null);
  assert.equal(result.inp, 'not-measured');
  assert.equal(result.metric, 'DOM + siguiente rAF');
});

test('procedencia incompleta o esquema desconocido no permiten una comparación aprobada', () => {
  for (const change of ['schema', 'browser', 'packages']) {
    const after = fixture(true);
    if (change === 'schema') after.report.schemaVersion = 99;
    if (change === 'browser') Reflect.deleteProperty(after.report.browser, 'version');
    if (change === 'packages') Reflect.deleteProperty(after.report.packages, 'react');
    assert.equal(compareRuns(fixture(), after).status, 'incomplete', change);
  }
});

test('crecimiento: mil entradas sintéticas conservan IDs únicos y ranking del motor real', () => {
  const result = syntheticSearchBenchmark();
  assert.equal(result.entries, 1000);
  assert.equal(result.uniqueIds, 1000);
  assert.equal(result.exactMatch, 'synthetic/0999');
  assert.equal(result.commonMatches, 1000);
  assert.equal(result.samples.count, 30);
  assert.ok(result.samples.p95 !== null && result.samples.p95 >= 0);
  assert.equal(result.environment, 'Node; no mide renderizado ni teclado de navegador');
});

test('auditoría publicada: detecta repaso retirado, h1 duplicado y zoom bloqueado', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-final-audit-'));
  try {
    await writeFile(path.join(directory, 'index.html'), '<meta name="viewport" content="width=device-width, initial-scale=1"><h1>Inicio</h1>');
    assert.equal((await auditPublishedBuild(directory)).status, 'passed');
    await writeFile(path.join(directory, 'index.html'), '<meta name="viewport" content="user-scalable=no"><h1>SQL</h1><h1>Otro</h1><p>SQL de un <strong>vistazo</strong></p>');
    const failed = await auditPublishedBuild(directory);
    assert.equal(failed.status, 'failed');
    assert.ok(failed.failures.some((f) => f.includes('h1')));
    assert.ok(failed.failures.some((f) => f.includes('zoom')));
    assert.ok(failed.failures.some((f) => f.includes('retirado')));
    await mkdir(path.join(directory, 'repaso-completo'));
    await writeFile(path.join(directory, 'repaso-completo/index.html'), '<h1>Repaso</h1>');
    assert.ok((await auditPublishedBuild(directory)).failures.some((f) => f.includes('ruta')));
  } finally {await rm(directory, {recursive: true, force: true});}
});

test('auditoría publicada: los literales de scripts no se cuentan como estructura visible', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-final-script-'));
  try {
    await writeFile(path.join(directory, 'index.html'), '<h1>Inicio</h1><script>const example="<h1>SQL de un vistazo</h1>";</script>');
    assert.equal((await auditPublishedBuild(directory)).status, 'passed');
  } finally {await rm(directory, {recursive: true, force: true});}
});

test('portada: el cargador no debe descargar un chunk compartido con cuerpos de apuntes', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-final-bodies-'));
  try {
    await mkdir(path.join(directory, 'assets/js'), {recursive: true});
    await writeFile(path.join(directory, 'index.html'), '<h1>Inicio</h1><script src="/assets/js/main.js"></script>');
    const home = 'const routes={home:[function(){return Promise.all([n.e(7),n.e(9)]).then(()=>n(1))},"@site/src/pages/index.tsx",1]};';
    await writeFile(path.join(directory, 'assets/js/main.js'), home);
    await writeFile(path.join(directory, 'assets/js/common.js'), 'self.webpackChunkalldoc.push([[7],{1:()=>"SELECT nombre, precio FROM productos;"}]);');
    const before = await auditPublishedBuild(directory);
    assert.equal(before.status, 'failed');
    assert.ok(before.failures.some((failure) => failure.includes('cuerpos de apuntes')));
    await writeFile(path.join(directory, 'assets/js/main.js'), home.replace('n.e(7),', ''));
    const after = await auditPublishedBuild(directory);
    assert.equal(after.status, 'passed');
    assert.deepEqual(after.homeJS.loadedBodies, []);
  } finally {await rm(directory, {recursive: true, force: true});}
});
