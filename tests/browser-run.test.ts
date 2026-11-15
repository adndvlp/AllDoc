import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseDesktopRunArgs, assessDesktopRun, beforeBrowserWork, desktopCaseIds, type DesktopRunOptions} from '../scripts/lib/browser-run.ts';

const options: DesktopRunOptions = {projects: ['firefox-escritorio', 'webkit-escritorio'], smoke: false, list: false, buildOnly: false};
function result(ids: readonly string[] = desktopCaseIds) {
  return {errors: [], stats: {expected: ids.length * 2, unexpected: 0, flaky: 0, skipped: 0}, suites: [{file: 'practice-desktop.spec.ts', specs: ids.map(id => ({title: `[${id}] caso`, file: 'practice-desktop.spec.ts', tests: options.projects.map(projectName => ({projectName, expectedStatus: 'passed', status: 'expected', results: [{status: 'passed', retry: 0}]}))}))}]};
}

test('runner de escritorio: valores por defecto, selección y filtro como un solo argumento', () => {
  assert.deepEqual(parseDesktopRunArgs([]), options);
  assert.deepEqual(parseDesktopRunArgs(['--project=webkit-escritorio', '-g', '--project=texto', '--smoke']), {...options, projects: ['webkit-escritorio'], grep: '--project=texto', smoke: true});
  for (const args of [['--project'], ['--project=firefox-estrecho'], ['--project=chromium'], ['-g'], ['-g', '['], ['--update-snapshots'], ['--build-only', '--list']]) assert.throws(() => parseDesktopRunArgs(args));
});

test('runner de escritorio: preflight bloqueado impide construir o iniciar un servidor', async () => {
  let calls = 0;
  await assert.rejects(beforeBrowserWork(async () => ({status: 'blocked'}), async () => {calls++;}), /preflight/i);
  assert.equal(calls, 0);
  assert.equal(await beforeBrowserWork(async () => ({status: 'ready'}), async () => {calls++; return 7;}), 7);
  assert.equal(calls, 1);
});

test('informe de escritorio: exige cada caso aprobado en ambos motores, no solo un contador favorable', () => {
  const data = result();
  assert.equal(assessDesktopRun(data, options).status, 'passed');
  data.suites[0].specs.pop(); data.stats.expected = 999;
  assert.equal(assessDesktopRun(data, options).status, 'incomplete');
});

test('informe de escritorio: rechaza omisiones, resultados ausentes, duplicados y pruebas de otro proyecto', () => {
  for (const corrupt of [
    (d: ReturnType<typeof result>) => {d.suites[0].specs[0].tests[0].results = [];},
    (d: ReturnType<typeof result>) => {d.suites[0].specs[0].tests[0].status = 'skipped';},
    (d: ReturnType<typeof result>) => {d.suites[0].specs[0].tests.push(d.suites[0].specs[0].tests[0]);},
    (d: ReturnType<typeof result>) => {d.suites[0].specs[0].tests[0].projectName = 'firefox-estrecho';},
  ]) {const data = result(); corrupt(data); assert.notEqual(assessDesktopRun(data, options).status, 'passed');}
});

test('informe de escritorio: fallo, interrupción y reintento no quedan como aprobados', () => {
  for (const status of ['failed', 'timedOut', 'interrupted']) {
    const data = result(); data.suites[0].specs[0].tests[0].results[0].status = status;
    assert.notEqual(assessDesktopRun(data, options).status, 'passed');
  }
  const data = result(); data.stats.flaky = 1;
  assert.notEqual(assessDesktopRun(data, options).status, 'passed');
});

test('informe de escritorio: smoke y filtros no acreditan la cobertura completa', () => {
  const smoke = result(['SQL-01', 'PY-01']);
  assert.equal(assessDesktopRun(smoke, {...options, smoke: true}).status, 'passed');
  assert.equal(assessDesktopRun(smoke, options).status, 'incomplete');
  assert.equal(assessDesktopRun(result(['SQL-03']), {...options, grep: 'sugerencias'}).status, 'subset-passed');
  assert.equal(assessDesktopRun({errors: [], stats: {}, suites: []}, {...options, grep: 'ninguna'}).status, 'incomplete');
});

test('informe de escritorio: el diagnóstico principal identifica el fallo real antes de los casos no ejecutados', () => {
  const data = result();
  data.suites[0].specs[0].tests[1].results[0].status = 'skipped';
  data.suites[0].specs.find(spec => spec.title.startsWith('[SQL-04]'))!.tests[0].results[0].status = 'failed';
  const assessment = assessDesktopRun(data, options);
  assert.match(assessment.reasons[0], /firefox-escritorio\/SQL-04/);
  assert.notEqual(assessment.status, 'passed');
});
