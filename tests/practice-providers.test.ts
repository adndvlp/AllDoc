import {test} from 'node:test';
import assert from 'node:assert/strict';
import type {RuntimeAdapter} from '../src/practice/contracts.ts';
import {createPracticeSessionManager} from '../src/practice/session-manager.ts';
import {createDraftStore} from '../src/practice/drafts.ts';
import {context, engineFixture, environment, memoryRepository, workspace} from './fixtures/practice-session.ts';

test('proveedores: el completador recibe el mismo runtime del workspace sin crear otra VM', async () => {
  const fixture = engineFixture(); const repository = memoryRepository();
  const drafts = createDraftStore(() => repository.repository);
  let created: RuntimeAdapter | undefined; let received: RuntimeAdapter | undefined;
  const manager = createPracticeSessionManager({drafts, bootstrap: async () => ({workspace: workspace(), environment}),
    registry: {...fixture.registry, async loadProviders() {return {...fixture.factories,
      createRuntime() {created = fixture.factories.createRuntime(); return created;},
      createCompletion(runtime?: RuntimeAdapter) {received = runtime; return fixture.factories.createCompletion(runtime!);}};}}});
  try {
    await manager.setContext(context()); await manager.open();
    assert.ok(created); assert.equal(received, created); assert.equal(fixture.calls.created, 1);
    assert.equal(manager.getSnapshot().phase, 'ready');
  } finally {await manager.dispose(); await drafts.close();}
  assert.equal(fixture.calls.active, 0);
});

test('proveedores: un fallo al crear el completador libera el runtime ya creado', async () => {
  const fixture = engineFixture(); const repository = memoryRepository();
  const drafts = createDraftStore(() => repository.repository);
  const manager = createPracticeSessionManager({drafts, bootstrap: async () => ({workspace: workspace(), environment}),
    registry: {...fixture.registry, async loadProviders() {return {...fixture.factories,
      createCompletion() {throw new Error('Completador no disponible');}};}}});
  try {
    await manager.setContext(context()); await manager.open();
    assert.equal(manager.getSnapshot().phase, 'error'); assert.equal(fixture.calls.created, 1);
    assert.equal(fixture.calls.disposed, 1); assert.equal(fixture.calls.active, 0);
    assert.equal(manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT * FROM productos;');
  } finally {await manager.dispose(); await drafts.close();}
});
