import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createDraftStore, readDraft, MAX_CODE_BYTES} from '../src/practice/drafts.ts';
import {createPracticeSessionManager} from '../src/practice/session-manager.ts';
import {context, deferred, engineFixture, environment, memoryRepository, until, workspace} from './fixtures/practice-session.ts';

function setup() {
  const repository = memoryRepository(); const engines = engineFixture();
  const drafts = createDraftStore(() => repository.repository, {debounceMs: 60_000});
  const manager = createPracticeSessionManager({registry: engines.registry, drafts,
    bootstrap: async (ctx) => ({workspace: workspace(ctx), environment})});
  return {repository, engines, drafts, manager, async close() {await manager.dispose(); await drafts.close();}};
}

test('acciones: sustituir y recuperar conserva todos los archivos, revisiones y el backup al recargar', async () => {
  const repository = memoryRepository(); let store = createDraftStore(() => repository.repository);
  const seed = {...workspace(), files: [...workspace().files, {path: 'notas.sql', languageId: 'sql', content: '-- mío'}]};
  await store.load(seed); store.edit(seed.id, 'main.sql', 'SELECT 42;');
  store.replace(seed.id, {activeFile: 'main.sql', files: [{path: 'main.sql', languageId: 'sql', content: 'SELECT nombre FROM productos;'}]});
  assert.equal(store.get(seed.id)!.previous!.files[0].content, 'SELECT 42;');
  assert.equal(store.get(seed.id)!.previous!.files[1].content, '-- mío');
  store.edit(seed.id, 'main.sql', 'SELECT 7;'); await store.close();
  store = createDraftStore(() => repository.repository); await store.load(seed);
  const revision = store.get(seed.id)!.workspace.revision;
  store.restorePrevious(seed.id);
  assert.equal(store.get(seed.id)!.workspace.files[0].content, 'SELECT 42;');
  assert.equal(store.get(seed.id)!.workspace.files[1].content, '-- mío');
  assert.equal(store.get(seed.id)!.workspace.revision, revision + 1);
  assert.equal(store.get(seed.id)!.previous, null);
  await store.close();
});

test('acciones: sustituciones iguales no consumen backup y las inválidas no cambian el borrador', async () => {
  const repository = memoryRepository(); const store = createDraftStore(() => repository.repository); const seed = workspace();
  try {
    await store.load(seed); store.replace(seed.id, {files: seed.files, activeFile: seed.activeFile});
    assert.equal(store.get(seed.id)!.workspace.revision, 0); assert.equal(store.get(seed.id)!.previous, null);
    store.edit(seed.id, 'main.sql', 'SELECT 4;');
    store.replace(seed.id, {files: seed.files, activeFile: seed.activeFile});
    const before = store.get(seed.id)!;
    store.replace(seed.id, {files: seed.files, activeFile: seed.activeFile});
    assert.equal(store.get(seed.id), before);
    assert.throws(() => store.replace(seed.id, {files: [{...seed.files[0], content: 'ñ'.repeat(MAX_CODE_BYTES)}], activeFile: seed.activeFile}));
    assert.throws(() => store.replace(seed.id, {files: seed.files, activeFile: '../otro'}));
    assert.equal(store.get(seed.id), before);
  } finally {await store.close();}
});

test('acciones: un backup corrupto o ajeno no descarta el código principal y el formato anterior sigue válido', () => {
  const seed = workspace(); const record = {formatVersion: 1, storageRevision: 1, savedAt: 1, workspace: seed};
  for (const previous of [undefined, {mal: true}, workspace(context('pandas'))]) {
    const loaded = readDraft({...record, previous}, seed.id)!;
    assert.equal(loaded.workspace.files[0].content, seed.files[0].content);
    assert.equal(loaded.previous, null);
  }
});

test('acciones: fallo de escritura conserva backup en memoria y el reintento guarda la edición más reciente', async () => {
  const repository = memoryRepository(); const original = repository.repository.write;
  let blocked = true; repository.repository.write = async (...args) => {if (blocked) throw new Error('QuotaExceededError'); return original(...args);};
  const store = createDraftStore(() => repository.repository); const seed = workspace();
  try {
    await store.load(seed); store.edit(seed.id, 'main.sql', 'SELECT 8;');
    store.replace(seed.id, {files: seed.files, activeFile: seed.activeFile}); await store.flush();
    assert.equal(store.get(seed.id)!.status, 'memory');
    store.edit(seed.id, 'main.sql', 'SELECT 9;'); blocked = false; await store.retryPersistence(seed.id);
    assert.equal(store.get(seed.id)!.status, 'saved');
    const saved = repository.records.get(seed.id)!;
    assert.equal(saved.workspace.files[0].content, 'SELECT 9;');
    assert.equal(saved.previous!.files[0].content, 'SELECT 8;');
  } finally {await store.close();}
});

test('acciones: una escritura pendiente no guarda una revisión anterior como backup de la nueva', async () => {
  const repository = memoryRepository(); const original = repository.repository.write; const gate = deferred(); const began = deferred();
  repository.repository.write = async (...args) => {began.resolve(); await gate.promise; return original(...args);};
  const store = createDraftStore(() => repository.repository, {debounceMs: 60_000}); const seed = workspace();
  try {
    await store.load(seed); store.edit(seed.id, 'main.sql', 'SELECT 8;');
    store.replace(seed.id, {files: seed.files, activeFile: seed.activeFile});
    const saving = store.flush(); await began.promise; store.restorePrevious(seed.id); gate.resolve(); await saving;
    const saved = repository.records.get(seed.id)!;
    assert.equal(saved.workspace.files[0].content, 'SELECT 8;'); assert.equal(saved.previous, null);
  } finally {gate.resolve(); await store.close();}
});

test('acciones: un ejemplo abre, conserva la revisión anterior y no ejecuta ni reinicia el motor', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context()); await f.manager.open(); f.manager.edit('main.sql', 'SELECT 42;');
    await f.manager.useExample({id: 'sql/select/columnas', workspaceId: workspace().id, languageId: 'sql', code: 'SELECT nombre FROM productos;'});
    assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT nombre FROM productos;');
    assert.equal(f.manager.getSnapshot().draft!.previous!.files[0].content, 'SELECT 42;');
    assert.equal(f.engines.calls.created, 1); assert.equal(f.engines.calls.runs.length, 0); assert.equal(f.engines.calls.resets, 0);
    f.manager.restorePreviousCode(); assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 42;');
    await f.manager.restoreInitialCode(); assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT * FROM productos;');
    assert.equal(f.engines.calls.resets, 0); assert.equal(f.engines.calls.runs.length, 0);
  } finally {await f.close();}
});

test('acciones: un ejemplo idéntico no anuncia una recuperación inexistente', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context());
    await f.manager.useExample({id: 'sql/select/todas-las-columnas', workspaceId: workspace().id, languageId: 'sql', code: 'SELECT * FROM productos;'});
    assert.equal(f.manager.getSnapshot().draft!.previous, null);
    assert.doesNotMatch(f.manager.getSnapshot().notice ?? '', /recuperar/i);
  } finally {await f.close();}
});

test('acciones: el ejemplo queda editable aunque la descarga falle; reintentar no reemplaza el texto', async () => {
  const f = setup(); const gate = deferred(); f.engines.deferInit(gate.promise);
  try {
    await f.manager.setContext(context());
    await f.manager.useExample({id: 'sql/select/columnas', workspaceId: workspace().id, languageId: 'sql', code: 'SELECT nombre FROM productos;'});
    await until(() => f.engines.calls.init === 1); gate.reject(new Error('sin red'));
    await until(() => f.manager.getSnapshot().phase === 'error'); f.manager.edit('main.sql', 'SELECT 9;');
    await f.manager.retry(); assert.equal(f.manager.getSnapshot().phase, 'ready');
    assert.equal(f.manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT 9;');
    assert.equal(f.engines.calls.runs.length, 0); assert.equal(f.engines.calls.maxActive, 1);
  } finally {gate.resolve(); await f.close();}
});

test('acciones: navegar o colapsar durante una sustitución tardía no reemplaza ni reabre el contexto', async () => {
  for (const leave of ['navigate', 'collapse']) {
    const f = setup(); const gate = deferred(); let delayed = false;
    const manager = createPracticeSessionManager({registry: f.engines.registry, drafts: f.drafts, bootstrap: async (ctx) => {
      if (delayed) {delayed = false; await gate.promise;} return {workspace: workspace(ctx), environment};
    }});
    try {
      await manager.setContext(context()); await manager.open(); manager.edit('main.sql', 'SELECT 42;'); delayed = true;
      const action = manager.useExample({id: 'sql/select/columnas', workspaceId: workspace().id, languageId: 'sql', code: 'SELECT 7;'});
      if (leave === 'navigate') await manager.setContext(context('pandas')); else await manager.collapse();
      gate.resolve(); await action;
      assert.equal(f.drafts.get(workspace().id)!.workspace.files[0].content, 'SELECT 42;');
      if (leave === 'collapse') assert.equal(manager.getSnapshot().visible, false);
      assert.equal(f.engines.calls.runs.length, 0);
    } finally {gate.resolve(); await manager.dispose(); await f.close();}
  }
});

test('acciones: los IDs y lenguajes incompatibles se rechazan antes de modificar código o crear recursos', async () => {
  const f = setup();
  try {
    await f.manager.setContext(context());
    const base = {id: 'sql/select/columnas', workspaceId: workspace().id, languageId: 'sql', code: 'SELECT 1;'};
    for (const invalid of [{...base, workspaceId: workspace(context('pandas')).id}, {...base, languageId: 'python'}, {...base, id: ''}])
      await assert.rejects(() => f.manager.useExample(invalid));
    assert.equal(f.engines.calls.created, 0); assert.equal(f.repository.calls.reads, 0);
  } finally {await f.close();}
});
