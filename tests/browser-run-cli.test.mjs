import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const run = args => spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/test-browser.mjs', ...args], {
  encoding: 'utf8', timeout: 20_000,
  // El descubrimiento debe funcionar aunque no haya binarios en esta ubicación.
  env: {...process.env, PLAYWRIGHT_BROWSERS_PATH: '/tmp/alldoc-browser-discovery-no-binaries'},
});

test('CLI de escritorio: descubre veinte casos sin iniciar motores ni incluir la suite Chromium', () => {
  const result = run(['--list']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Total: 20 tests in 1 file/);
  assert.equal((result.stdout.match(/\[firefox-escritorio\]/g) ?? []).length, 10);
  assert.equal((result.stdout.match(/\[webkit-escritorio\]/g) ?? []).length, 10);
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

test('CLI de escritorio: rechaza un proyecto fuera de este punto con un único diagnóstico', () => {
  const result = run(['--project=firefox-estrecho']);
  assert.equal(result.status, 1); assert.match(result.stderr, /los otros tamaños corresponden al punto 3/);
  assert.doesNotMatch(result.stdout, /build|checking|casos/); assert.doesNotMatch(result.stderr, /at verify|Error \[/);
});
