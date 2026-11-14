import {test} from 'node:test';
import assert from 'node:assert/strict';
import {copyWorkspace, createDraftStore, MAX_CODE_BYTES, readDraft} from '../src/practice/drafts.ts';
import {context, deferred, memoryRepository, workspace} from './fixtures/practice-session.ts';

test('borradores: carga diferida, edición inmediata, revisiones y guardado agrupado por herramienta', async () => {
  const fixture = memoryRepository(); let constructed = 0;
  const store = createDraftStore(() => {constructed++; return fixture.repository;}, {debounceMs: 60_000});
  assert.equal(constructed, 0);
  const sql = workspace(); const pandas = workspace(context('pandas'));
  await Promise.all([store.load(sql), store.load(sql), store.load(pandas)]);
  assert.equal(fixture.calls.reads, 2);
  assert.equal(fixture.calls.writes, 0);
  const old = store.get(sql.id)!.workspace;
  store.edit(sql.id, 'main.sql', 'SELECT nombre FROM productos;');
  store.edit(sql.id, 'main.sql', 'SELECT precio FROM productos;');
  assert.equal(store.get(sql.id)!.workspace.revision, 2);
  assert.equal(old.files[0].content, sql.files[0].content);
  assert.equal(store.get(pandas.id)!.workspace.files[0].content, 'productos.head()');
  assert.equal(fixture.calls.writes, 0);
  await store.flush();
  assert.equal(fixture.calls.writes, 1);
  assert.equal(fixture.records.get(sql.id)!.workspace.files[0].content, 'SELECT precio FROM productos;');
  await store.close();
});

test('borradores: recuperar en otra sesión conserva texto y avisa del cambio de entorno', async () => {
  const fixture = memoryRepository(); const first = createDraftStore(() => fixture.repository);
  const seed = workspace(); await first.load(seed); first.edit(seed.id, 'main.sql', 'SELECT 42;'); await first.close();
  const second = createDraftStore(() => fixture.repository);
  const loaded = await second.load({...seed, environmentVersion: 'test-env@2'});
  assert.equal(loaded.workspace.files[0].content, 'SELECT 42;');
  assert.equal(loaded.workspace.environmentVersion, 'test-env@2');
  assert.equal(loaded.environmentChanged, true);
  await second.close();
});

test('borradores: una escritura tardía no declara guardada una edición posterior', async () => {
  const fixture = memoryRepository(); const gate = deferred(); const writing = deferred();
  const original = fixture.repository.write;
  fixture.repository.write = async (...args) => {writing.resolve(); await gate.promise; return original(...args);};
  const store = createDraftStore(() => fixture.repository, {debounceMs: 60_000}); const seed = workspace();
  await store.load(seed); store.edit(seed.id, 'main.sql', 'SELECT 1;');
  const flushing = store.flush(); await writing.promise;
  store.edit(seed.id, 'main.sql', 'SELECT 2;'); gate.resolve(); await flushing;
  assert.equal(fixture.records.get(seed.id)!.workspace.files[0].content, 'SELECT 2;');
  assert.equal(fixture.calls.writes, 2);
  await store.close();
});

test('borradores: fallo de almacenamiento conserva edición en memoria', async () => {
  const fixture = memoryRepository(); fixture.repository.read = async () => {throw new Error('denegado');};
  const store = createDraftStore(() => fixture.repository); const seed = workspace();
  assert.equal((await store.load(seed)).status, 'memory');
  store.edit(seed.id, 'main.sql', 'SELECT 7;'); await store.flush();
  assert.equal(store.get(seed.id)!.workspace.files[0].content, 'SELECT 7;');
  assert.equal(store.get(seed.id)!.status, 'memory'); await store.close();
});

test('borradores: conflicto entre sesiones guarda copia recuperable sin sobrescribir la ganadora', async () => {
  const fixture = memoryRepository(); const a = createDraftStore(() => fixture.repository); const b = createDraftStore(() => fixture.repository);
  const seed = workspace(); await a.load(seed); await b.load(seed);
  a.edit(seed.id, 'main.sql', 'SELECT 1;'); b.edit(seed.id, 'main.sql', 'SELECT 2;');
  await a.flush(); await b.flush();
  assert.equal(b.get(seed.id)!.status, 'conflict');
  assert.equal(fixture.records.get(seed.id)!.workspace.files[0].content, 'SELECT 1;');
  assert.equal((await fixture.repository.recoveries(seed.id))[0].workspace.files[0].content, 'SELECT 2;');
  b.edit(seed.id, 'main.sql', 'SELECT 3;'); await b.flush();
  assert.equal(fixture.records.get(seed.id)!.workspace.files[0].content, 'SELECT 1;');
  await a.close(); await b.close();
});

test('borradores: valida clave, archivos, versión, UTF-8 y restaura una copia inmutable', () => {
  const seed = workspace(); const copied = copyWorkspace(seed);
  assert.notEqual(copied, seed); assert.equal(Object.isFrozen(copied.files[0]), true);
  for (const invalid of [{...seed, id: 'otra'}, {...seed, activeFile: 'falta.sql'}, {...seed, revision: -1},
    {...seed, files: [{...seed.files[0], path: '../x.sql'}]}, {...seed, files: [seed.files[0], seed.files[0]]},
    {...seed, files: [{...seed.files[0], content: 'ñ'.repeat(MAX_CODE_BYTES / 2 + 1)}]}]) {
    assert.throws(() => copyWorkspace(invalid));
  }
  assert.equal(readDraft({formatVersion: 99, workspace: seed}, seed.id), null);
  assert.equal(readDraft({formatVersion: 1, storageRevision: 1, savedAt: 10, workspace: seed}, 'otra'), null);
});
