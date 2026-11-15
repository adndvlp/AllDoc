import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const run = args => spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/test-browser.mjs', ...args], {
  encoding: 'utf8', timeout: 20_000,
  // El descubrimiento debe funcionar aunque no haya binarios en esta ubicación.
  env: {...process.env, PLAYWRIGHT_BROWSERS_PATH: '/tmp/alldoc-browser-discovery-no-binaries'},
});

test('CLI de compatibilidad: descubre la matriz sin iniciar motores ni incluir la suite Chromium', () => {
  const result = run(['--list']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Total: 168 tests in 5 files/);
  assert.equal((result.stdout.match(/\[firefox-escritorio\]/g) ?? []).length, 36);
  assert.equal((result.stdout.match(/\[webkit-escritorio\]/g) ?? []).length, 36);
  assert.doesNotMatch(result.stdout, /\[(?:celular|laptop)\]|01-build-app/);
  assert.match(result.stdout, /ningún caso ejecutado/);
});

test('CLI de escritorio: smoke, motor y filtro reducen los casos antes de construir', () => {
  const smoke = run(['--list', '--smoke']);
  assert.equal(smoke.status, 0, smoke.stderr); assert.match(smoke.stdout, /Total: 4 tests/);
  const filtered = run(['--list', '--project=webkit-escritorio', '--grep=SQL-03']);
  assert.equal(filtered.status, 0, filtered.stderr); assert.match(filtered.stdout, /Total: 1 test/);
  assert.match(filtered.stdout, /\[webkit-escritorio\].*SQL-03/); assert.doesNotMatch(filtered.stdout, /\[firefox-escritorio\]/);
});

test('CLI de compatibilidad: rechaza un proyecto desconocido con un único diagnóstico', () => {
  const result = run(['--project=desconocido']);
  assert.equal(result.status, 1); assert.match(result.stderr, /Proyecto desconocido/);
  assert.doesNotMatch(result.stdout, /build|checking|casos/); assert.doesNotMatch(result.stderr, /at verify|Error \[/);
});

test('CLI de compatibilidad: selección estrecha ejecuta sus casos aplicables y conserva el recorrido histórico de escritorio', () => {
  const narrow=run(['--list','--project=webkit-estrecho']); assert.equal(narrow.status,0,narrow.stderr);
  assert.match(narrow.stdout,/Total: 24 tests/); assert.doesNotMatch(narrow.stdout,/@desktop/);
  const desktop=run(['--list','--desktop']); assert.equal(desktop.status,0,desktop.stderr); assert.match(desktop.stdout,/Total: 20 tests/);
});
