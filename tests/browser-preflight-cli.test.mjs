import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const root = resolve('.');
function run(args) {
  const result = spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/browser-preflight.mjs', ...args],
    {cwd: root, encoding: 'utf8', timeout: 10000});
  assert.equal(result.error, undefined); return result;
}

test('CLI de preflight: listado completo y selección WebKit sin iniciar navegadores o declarar pruebas aprobadas', () => {
  const all = run(['--list']); assert.equal(all.status, 0, all.stderr);
  assert.equal(all.stdout.split('\n').filter(line => /^(firefox|webkit)-/.test(line)).length, 6);
  assert.match(all.stdout, /no se iniciaron navegadores/);
  const selected = run(['--list', '--project=webkit-tableta']);
  assert.equal(selected.status, 0, selected.stderr); assert.match(selected.stdout, /^webkit-tableta:/);
  assert.doesNotMatch(selected.stdout, /firefox|preflight-ready|tests passed/);
});

test('CLI de preflight: un proyecto desconocido falla una vez antes del trabajo pesado', () => {
  const result = run(['--project=inexistente']); assert.equal(result.status, 1);
  assert.equal(result.stdout, ''); assert.match(result.stderr, /Proyecto desconocido: inexistente/);
  assert.equal((result.stderr.match(/Proyecto desconocido/g) ?? []).length, 1);
});
