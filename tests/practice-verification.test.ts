import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as verification from '../scripts/lib/final-verification.ts';

function profile(project = 'laptop', profileId = 'sql-sqlite') {
  const phases = Object.fromEntries(['bootstrap', 'draft', 'dataset', 'runtime-init', 'inspect'].map(name => [name, {duration: 1, status: 'success'}]));
  const workerPhases = Object.fromEntries(['python-sdk', 'python-packages', 'python-data', 'python-jedi'].map(name => [name, {duration: 1, status: 'success'}]));
  const actions = Object.fromEntries(['open', 'close', 'write', 'completionKeyword', 'completionColumns', 'context'].map(action => [action,
    Array.from({length: 30}, (_, index) => ({id: action + index, armedAt: index * 100, eventAt: index * 100 + 1, observedAt: index * 100 + 21, satisfied: true, eventTiming: []}))]));
  return {project, profileId, cpuRate: project === 'laptop' ? 1 : 4,
    viewport: project === 'laptop' ? {width: 1280, height: 800} : {width: 390, height: 844}, status: 'complete', samplesPerAction: 30,
    cold: {editorReadyMs: 50, runtimeReadyMs: 100, phases, workerPhases}, actions, longTasks: []};
}
function measurement() {
  return {schemaVersion: 1, metric: 'DOM + siguiente rAF', profiles: ['laptop', 'celular'].flatMap(project => ['sql-sqlite', 'python-pandas'].map(id => profile(project, id)))};
}

test('aceptación de tiempos: exige cuatro perfiles, treinta muestras por acción y fases frías separadas', () => {
  const result = verification.assessPracticeMetrics(measurement());
  assert.equal(result.status, 'complete'); assert.equal(result.metrics.length, 24);
  assert.ok(result.metrics.every(metric => metric.count === 30 && metric.p95 === 20 && metric.status === 'met'));
});
test('aceptación de tiempos: un resumen favorable no oculta muestras lentas ni redefine el presupuesto', () => {
  const data = measurement();
  for (const sample of data.profiles[0].actions.write.slice(-2)) sample.observedAt = sample.eventAt + 150;
  Object.assign(data.profiles[0].actions.write, {summary: {p95: 1}, budget: 9999});
  const result = verification.assessPracticeMetrics(data);
  assert.equal(result.status, 'budget-exceeded');
  assert.equal(result.metrics.find(metric => metric.project === 'laptop' && metric.profileId === 'sql-sqlite' && metric.action === 'write')!.p95, 150);
});
test('aceptación de tiempos: muestras ausentes, repetidas, negativas y fases incompletas impiden aprobar', () => {
  for (const corrupt of [
    (data: ReturnType<typeof measurement>) => {data.profiles.pop();},
    (data: ReturnType<typeof measurement>) => {data.profiles[0].actions.open.pop();},
    (data: ReturnType<typeof measurement>) => {data.profiles[0].actions.open[1].id = data.profiles[0].actions.open[0].id;},
    (data: ReturnType<typeof measurement>) => {data.profiles[0].actions.open[0].observedAt = -1;},
    (data: ReturnType<typeof measurement>) => {delete data.profiles[1].cold.workerPhases['python-packages'];},
  ]) {const data = measurement(); corrupt(data); assert.equal(verification.assessPracticeMetrics(data).status, 'incomplete');}
});
test('aceptación de tiempos: Event Timing no observado se conserva como ausente y no se declara INP', () => {
  const result = verification.assessPracticeMetrics(measurement());
  assert.equal(result.inp, 'not-measured');
  assert.ok(result.metrics.every(metric => metric.eventTiming.observedCount === 0 && metric.eventTiming.p95 === null));
});
test('aceptación de tiempos: pandas admite 300 ms de completado y el resto conserva 100 ms', () => {
  const data = measurement();
  for (const p of data.profiles) for (const sample of p.actions.completionKeyword) sample.observedAt = sample.eventAt + 250;
  const result = verification.assessPracticeMetrics(data);
  assert.equal(result.metrics.find(metric => metric.profileId === 'python-pandas' && metric.action === 'completionKeyword')!.status, 'met');
  assert.equal(result.metrics.find(metric => metric.profileId === 'sql-sqlite' && metric.action === 'completionKeyword')!.status, 'exceeded');
});
test('aceptación del bundle: compara iniciales por página, sin confundir chunks diferidos con descarga inicial', () => {
  const before = {pages: [{html: 'index.html', js: {gzipBytes: 100}, css: {gzipBytes: 50}}], totals: {js: {gzipBytes: 200}}};
  const after = {pages: [{html: 'index.html', js: {gzipBytes: 200}, css: {gzipBytes: 100}}], totals: {js: {gzipBytes: 10000000}}};
  const result = verification.assessPracticeBundle(before, after);
  assert.equal(result.status, 'complete'); assert.equal(result.pages[0].deltaBytes, 150);
  after.pages[0].js.gzipBytes = 6000;
  assert.equal(verification.assessPracticeBundle(before, after).status, 'budget-exceeded');
  after.pages = [];
  assert.equal(verification.assessPracticeBundle(before, after).status, 'incomplete');
});

test('aceptación global: no basta con declarar que la suite pasó ni con omitir un tamaño', () => {
  const missing = verification.assessPracticeAcceptance({nativeCases: [], uiCases: [], checks: {types: true, build: true}});
  assert.equal(missing.status, 'incomplete'); assert.equal(missing.criteria.length, 27);
  assert.ok(missing.criteria.every(item => item.status === 'pending'));
});

test('informe UI: conserva fallos, omisiones y proyecto al recorrer suites anidadas', () => {
  const cases = verification.practiceUICases({suites: [{title: 'fichero', file: 'ui/practice.spec.ts', suites: [{title: 'grupo', specs: [
    {title: 'funciona', file: 'ui/practice.spec.ts', tests: [{projectName: 'celular', status: 'expected', results: [{status: 'passed'}]}]},
    {title: 'falla', tests: [{projectName: 'laptop', status: 'unexpected', results: [{status: 'failed'}]}]},
    {title: 'interrumpido', tests: [{projectName: 'ipad', status: 'unexpected', results: [{status: 'interrupted'}]}]},
    {title: 'omisión prevista', tests: [{projectName: 'laptop', status: 'skipped', results: [{status: 'skipped'}]}]},
  ]}]}]});
  assert.deepEqual(cases.map(item => [item.projectName, item.status]), [['celular', 'passed'], ['laptop', 'failed'], ['ipad', 'failed'], ['laptop', 'skipped']]);
  assert.equal(cases[0].file, 'ui/practice.spec.ts');
});
