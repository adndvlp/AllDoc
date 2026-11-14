import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeEditorContextResolver, resolvePracticeContext, resolvePracticeEditorContext} from '../src/practice/context.ts';
import {concepts} from '../src/content/concepts.ts';
import {practiceLayout, practiceSize} from '../src/practice/layout.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';
import {createDraftStore} from '../src/practice/drafts.ts';
import {createPracticeSessionManager} from '../src/practice/session-manager.ts';
import {memoryRepository, workspace, context} from './fixtures/practice-session.ts';
import {createPracticeRegistry} from '../src/practice/registry.ts';
import {hasOtherModal, openExclusiveModal} from '../src/lib/dialog-coordination.ts';

test('panel: resolver reconoce SQL/pandas ejecutables, sin categorías', () => {
  const sql = resolvePracticeEditorContext(concepts[0].slug)!;
  assert.equal(sql.profile.availability, 'enabled'); assert.ok(resolvePracticeContext(concepts[0].slug));
  assert.ok(resolvePracticeContext('/apuntes/analisis-de-datos/pandas/dataframe'));
  const where = resolvePracticeEditorContext('/apuntes/analisis-de-datos/sql/where?x=1#x')!;
  assert.equal(sql.workspaceKey, where.workspaceKey);
  assert.notEqual(resolvePracticeEditorContext('/apuntes/analisis-de-datos/pandas/dataframe')!.workspaceKey, sql.workspaceKey);
  for (const path of ['/', '/apuntes/analisis-de-datos', '/apuntes/analisis-de-datos/sql', '//example.com', '/apuntes/analisis-de-datos/sql/no']) assert.equal(resolvePracticeEditorContext(path), null);
  assert.throws(() => createPracticeEditorContextResolver({registry: practiceRegistry, entries: [concepts[0], concepts[0]]}));
});

test('panel: disposición por espacio real y tamaño raíz, sin clasificar por dispositivo', () => {
  assert.equal(practiceLayout({width: 1200, height: 800, rem: 16}), 'parallel');
  assert.equal(practiceLayout({width: 768, height: 940, rem: 16}), 'bottom');
  assert.equal(practiceLayout({width: 390, height: 788, rem: 16}), 'modal');
  assert.equal(practiceLayout({width: 844, height: 334, rem: 16}), 'modal');
  assert.equal(practiceLayout({width: 1200, height: 800, rem: 32}), 'modal');
  assert.equal(practiceLayout({width: 1600, height: 200, rem: 16}), 'modal');
});

test('panel: separador conserva mínimos legibles, limita arrastre y tiene tamaño inicial restablecible', () => {
  const space = {width: 1200, height: 800, rem: 16}; const bounds = practiceSize(space, 'parallel');
  assert.equal(bounds.min, 28 * 16); assert.equal(bounds.max, 1200 - 26 * 16 - 8);
  assert.ok(bounds.value >= bounds.min && bounds.value <= bounds.max);
  assert.equal(practiceSize(space, 'parallel', -100).value, bounds.min);
  assert.equal(practiceSize(space, 'parallel', 9000).value, bounds.max);
  const bottom = practiceSize({width: 768, height: 940, rem: 16}, 'bottom');
  assert.equal(bottom.min, 20 * 16); assert.ok(bottom.max <= 940 - 14 * 16);
});

test('panel: perfil pendiente permite editar y guardar, sin cargar proveedores ni inventar resultados', async () => {
  const profile = {...practiceRegistry.get('sql-sqlite')!, availability: 'planned' as const}; const repository = memoryRepository(); const drafts = createDraftStore(() => repository.repository);
  let loads = 0;
  const manager = createPracticeSessionManager({registry: {...practiceRegistry, async loadProviders() {loads++; throw new Error('No debe cargar');}}, drafts,
    bootstrap: async () => ({workspace: workspace(), environment: null})});
  const editorContext = {...context(), profile};
  await manager.setContext(editorContext); await manager.open();
  assert.equal(manager.getSnapshot().phase, 'ready'); manager.edit('main.sql', 'SELECT nombre FROM productos;');
  await manager.execute(); await manager.resetEnvironment();
  assert.equal(loads, 0); assert.equal(manager.getSnapshot().events.length, 0);
  await manager.collapse(); await manager.open();
  assert.equal(manager.getSnapshot().draft!.workspace.files[0].content, 'SELECT nombre FROM productos;');
  await manager.dispose(); await drafts.close(); assert.equal(repository.records.size, 1);
});

test('panel: añadir un perfil futuro no activa automáticamente un editor sin preparación', () => {
  const profile = practiceRegistry.get('sql-sqlite')!;
  const registry = createPracticeRegistry([{profile: {...profile, availability: 'planned', editorAvailability: undefined}}]);
  assert.equal(createPracticeEditorContextResolver({registry})(concepts[0].slug), null);
});

test('diálogos: detectar otra ventana al rotar permite suspender práctica sin cerrar la búsqueda', () => {
  let active: unknown = {};
  const dialog = {ownerDocument: {querySelector: () => active}} as unknown as HTMLDialogElement;
  assert.equal(hasOtherModal(dialog), true);
  active = dialog; assert.equal(hasOtherModal(dialog), false);
  active = null; assert.equal(hasOtherModal(dialog), false);
});

test('diálogos: suspender y cerrar el anterior ocurre antes de enfocar el invocador y abrir el siguiente', () => {
  const calls: string[] = [];
  const other = {dispatchEvent() {calls.push('suspend');}, close() {calls.push('close');}};
  const target = {ownerDocument: {querySelectorAll: () => [other]}, open: false, showModal() {calls.push('show');}} as unknown as HTMLDialogElement;
  openExclusiveModal(target, {focus() {calls.push('focus');}} as unknown as HTMLElement);
  assert.deepEqual(calls, ['suspend', 'close', 'focus', 'show']);
});
