import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compatiblePythonPin, selectPythonPackages, type PythonLock} from '../scripts/lib/python-assets.ts';

test('assets Python: cierre transitivo determinista sin paquetes ajenos y con hashes completos', () => {
  const item = (name: string, depends: string[] = []) => ({name, version: '1.0', file_name: name+'.whl', sha256: 'a'.repeat(64), depends});
  const lock: PythonLock = {info: {}, packages: {pandas: item('pandas', ['numpy']), numpy: item('numpy'), jedi: item('jedi', ['parso']), parso: item('parso'), otro: item('otro')}};
  const selected = selectPythonPackages(lock, ['pandas', 'jedi']);
  assert.deepEqual(Object.keys(selected), ['jedi', 'numpy', 'pandas', 'parso']);
  assert.equal(selected.pandas.version, '1.0'); assert.equal(selected.otro, undefined);
  selected.pandas.version = '2'; assert.equal(lock.packages.pandas.version, '1.0');
});
test('assets Python: preparar reutiliza el pin compatible; actualizar o cambiar runtime exige resolver versiones', () => {
  const pinned = {runtimeVersion: '314.0.8', digest: 'fixed'};
  assert.equal(compatiblePythonPin('314.0.8', pinned), pinned);
  assert.equal(compatiblePythonPin('314.0.8', pinned, true), undefined);
  assert.equal(compatiblePythonPin('314.0.9', pinned), undefined);
  assert.equal(compatiblePythonPin('314.0.8', undefined), undefined);
});

test('assets Python: rechaza dependencias ausentes, ciclos, rutas y checksum sin integridad', () => {
  const item = {name: 'pandas', version: '1', file_name: 'pandas.whl', sha256: 'a'.repeat(64), depends: [] as string[]};
  for (const modified of [{...item, file_name: '../x.whl'}, {...item, file_name: 'https://x/y.whl'}, {...item, sha256: ''}, {...item, depends: ['falta']}, {...item, depends: ['pandas']}]) {
    assert.throws(() => selectPythonPackages({info: {}, packages: {pandas: modified}}, ['pandas']));
  }
});
