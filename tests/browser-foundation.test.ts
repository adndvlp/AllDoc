import {test} from 'node:test';
import assert from 'node:assert/strict';
import {browserProjects, selectBrowserProjects, parseBrowserPreflightArgs, preflightBrowsers, type BrowserEngine, type BrowserLauncher} from '../scripts/lib/browser-foundation.ts';

function launchers(failures: Partial<Record<BrowserEngine, Error>> = {}) {
  const calls: {launched: string[]; closed: string[]} = {launched: [], closed: []};
  const engines = Object.fromEntries((['firefox', 'webkit'] as const).map(engine => [engine, {async launch(options) {
    assert.equal(options.headless, true); assert.ok(options.timeout > 0);
    calls.launched.push(engine);
    if (failures[engine]) throw failures[engine];
    return {version: () => engine + '-version', async close() {calls.closed.push(engine);}};
  }} satisfies BrowserLauncher]));
  return {calls, engines};
}

test('matriz de compatibilidad: seis proyectos con tamaños y capacidades propios, sin modificar otra lectura', () => {
  const projects = browserProjects();
  assert.deepEqual(projects.map(p => [p.name, p.use.browserName, p.use.viewport.width, p.use.viewport.height, p.use.isMobile, p.use.hasTouch]), [
    ['firefox-estrecho', 'firefox', 390, 844, false, false], ['firefox-tableta', 'firefox', 768, 1024, false, false],
    ['firefox-escritorio', 'firefox', 1280, 800, false, false], ['webkit-estrecho', 'webkit', 390, 844, true, true],
    ['webkit-tableta', 'webkit', 768, 1024, true, true], ['webkit-escritorio', 'webkit', 1280, 800, false, false],
  ]);
  projects[0].use.viewport.width = 1;
  assert.equal(browserProjects()[0].use.viewport.width, 390);
  assert.ok(projects.every(p => p.use.deviceScaleFactor === 1));
});

test('selección de compatibilidad: todos por defecto, subconjunto deduplicado y error para un nombre desconocido', () => {
  assert.equal(selectBrowserProjects().length, 6);
  assert.deepEqual(selectBrowserProjects(['webkit-tableta', 'webkit-tableta', 'firefox-escritorio']).map(p => p.name), ['firefox-escritorio', 'webkit-tableta']);
  assert.throws(() => selectBrowserProjects(['chromium']), /desconocido/i);
  assert.throws(() => selectBrowserProjects(['']), /desconocido/i);
});

test('selección CLI: admite proyectos repetidos y listado; rechaza valores ausentes y opciones desconocidas', () => {
  assert.deepEqual(parseBrowserPreflightArgs(['--project=firefox-estrecho', '--project', 'webkit-tableta', '--list']), {projects: ['firefox-estrecho', 'webkit-tableta'], list: true});
  assert.deepEqual(parseBrowserPreflightArgs([]), {projects: [], list: false});
  for (const args of [['--project'], ['--project='], ['--project', '--list'], ['--project=firefox-*'], ['--browser=firefox']]) assert.throws(() => parseBrowserPreflightArgs(args));
});

test('preflight: seleccionar Firefox no abre WebKit ni Chromium y cierra la única instancia', async () => {
  const f = launchers();
  const result = await preflightBrowsers(['firefox-estrecho', 'firefox-tableta'], f.engines);
  assert.equal(result.status, 'ready'); assert.equal(result.diagnostic, null);
  assert.deepEqual(f.calls, {launched: ['firefox'], closed: ['firefox']});
  assert.deepEqual(result.projects, ['firefox-estrecho', 'firefox-tableta']);
  assert.equal(result.engines[0].version, 'firefox-version');
});

test('preflight: seleccionar solo WebKit funciona sin un launcher Chromium o Firefox', async () => {
  const f = launchers();
  const result = await preflightBrowsers(['webkit-escritorio'], {webkit: f.engines.webkit});
  assert.equal(result.status, 'ready'); assert.deepEqual(f.calls.launched, ['webkit']);
});

test('preflight completo: cada motor arranca una vez, con versión y liberación comprobadas', async () => {
  const f = launchers(); const result = await preflightBrowsers([], f.engines);
  assert.equal(result.status, 'ready'); assert.equal(result.projects.length, 6);
  assert.deepEqual(f.calls, {launched: ['firefox', 'webkit'], closed: ['firefox', 'webkit']});
  assert.ok(result.engines.every(e => e.status === 'ready' && e.version && e.durationMs >= 0));
});

test('preflight: binarios ausentes dejan el resultado bloqueado con un diagnóstico agregado', async () => {
  const f = launchers({firefox: new Error("Executable doesn't exist at /fake/firefox"), webkit: new Error("Executable doesn't exist at /fake/webkit")});
  const result = await preflightBrowsers([], f.engines);
  assert.equal(result.status, 'blocked');
  assert.deepEqual(result.engines.map(e => e.status), ['missing-executable', 'missing-executable']);
  assert.match(result.diagnostic!, /npx playwright install firefox webkit/);
  assert.deepEqual(f.calls, {launched: ['firefox', 'webkit'], closed: []});
});

test('preflight: un motor listo no compensa un fallo del otro y no se recomienda instalar por un error de permisos', async () => {
  const f = launchers({firefox: new Error('Permission denied\nlog largo')});
  const result = await preflightBrowsers([], f.engines);
  assert.equal(result.status, 'blocked'); assert.deepEqual(result.engines.map(e => e.status), ['launch-failed', 'ready']);
  assert.match(result.diagnostic!, /firefox.*Permission denied/);
  assert.doesNotMatch(result.diagnostic!, /playwright install|log largo/);
  assert.deepEqual(f.calls.closed, ['webkit']);
});

test('preflight: un proyecto desconocido se rechaza antes de abrir cualquier motor', async () => {
  const f = launchers(); await assert.rejects(preflightBrowsers(['desconocido'], f.engines), /desconocido/);
  assert.deepEqual(f.calls.launched, []);
});

test('preflight: una versión ausente o un cierre fallido no se declaran listos', async () => {
  let closed = 0;
  const invalid = await preflightBrowsers(['firefox-escritorio'], {firefox: {async launch() {return {version: () => '', async close() {closed++;}};}}});
  assert.equal(invalid.status, 'blocked'); assert.equal(invalid.engines[0].status, 'version-failed'); assert.equal(closed, 1);
  const failed = await preflightBrowsers(['firefox-escritorio'], {firefox: {async launch() {return {version: () => 'version', async close() {throw new Error('cierre fallido');}};}}});
  assert.equal(failed.status, 'blocked'); assert.equal(failed.engines[0].status, 'close-failed');
});

test('preflight: un cierre que no responde tiene un límite y bloquea continuar', async () => {
  const result = await preflightBrowsers(['firefox-escritorio'], {firefox: {async launch() {return {version: () => 'version', close: () => new Promise(() => {})};}}}, {closeTimeoutMs: 5});
  assert.equal(result.status, 'blocked'); assert.equal(result.engines[0].status, 'close-failed'); assert.match(result.diagnostic!, /cierre/i);
});

test('preflight: informa qué motor está comprobando y conserva el estado final de cada uno', async () => {
  const f = launchers(); const progress: string[] = [];
  await preflightBrowsers([], f.engines, {onProgress: event => progress.push(event.engine + ':' + event.status)});
  assert.deepEqual(progress, ['firefox:checking', 'firefox:ready', 'webkit:checking', 'webkit:ready']);
});
