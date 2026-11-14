import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {concepts} from '../src/content/concepts.ts';
import {entries} from '../src/content/search-index.ts';
import {registration} from './fixtures/practice.ts';
import {context as practiceContext, engineFixture, environment, memoryRepository, workspace} from './fixtures/practice-session.ts';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {sqlConcepts} from '../src/content/notes/sql.ts';

const require = createRequire(import.meta.url);
const {transformSync} = require('@babel/core');

// Usa el preset cliente real: Node nativo no detecta las diferencias de Babel loose.
function compile<T>(path: string, imports: Record<string, unknown> = {}): T {
  const filename = fileURLToPath(new URL(path, import.meta.url));
  const {code} = transformSync(readFileSync(filename, 'utf8'), {
    filename, babelrc: false, configFile: false, envName: 'production', caller: {name: 'client'},
    presets: [require.resolve('@docusaurus/babel/preset')],
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
  });
  const module = {exports: {}};
  new Function('require', 'exports', 'module', code)((id: string) => imports[id] ?? require(id), module.exports, module);
  return module.exports as T;
}

test('ejemplos: las fichas ofrecen acciones accesibles con identidad estable solo en un contexto compatible', () => {
  const fixture: {context: ReturnType<typeof practiceContext> | null; openExample(): void} = {context: practiceContext(), openExample() {}};
  const {ConceptNote} = compile<{ConceptNote: import('react').ComponentType<{concept: (typeof sqlConcepts)[number]; conceptId: string; kind: string; language: string}>}>('../src/components/ConceptNote/index.tsx', {
    '../PracticeProvider': {usePractice: () => fixture},
    '@theme/CodeBlock': {__esModule: true, default: ({children}: {children: string}) => createElement('pre', null, children)},
    '@docusaurus/theme-common': {HtmlClassNameProvider: ({children}: {children: import('react').ReactNode}) => children},
    '../SqlNotes/styles.module.css': {},
  });
  const render = () => renderToStaticMarkup(createElement(ConceptNote, {concept: sqlConcepts[0], conceptId: 'select', kind: 'sql', language: 'sql'}));
  const html = render();
  assert.equal((html.match(/aria-label="Probar este ejemplo:/g) ?? []).length, 2);
  assert.ok(html.includes('data-practice-example="sql/select/todas-las-columnas"'));
  fixture.context = null;
  assert.ok(!render().includes('data-practice-example'));
});

test('preset cliente: favoritos y recientes siguen siendo arrays de IDs/visitas tras guardar y recargar', () => {
  const {createPersonalLibrary} = compile<typeof import('../src/lib/personal-library.ts')>('../src/lib/personal-library.ts');
  const values = new Map<string, string>();
  const adapter = {getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => {values.set(key, value);}};
  const first = createPersonalLibrary(concepts, () => 10);
  first.hydrate(adapter);
  first.activateRoute(concepts[0].slug);
  first.toggleFavorite(concepts[0].id);
  const reloaded = createPersonalLibrary(concepts, () => 20);
  reloaded.hydrate(adapter);
  assert.deepEqual(reloaded.getSnapshot().favorites, [concepts[0].id]);
  assert.deepEqual(reloaded.getSnapshot().recents, [{conceptId: concepts[0].id, visitedAt: 10}]);
  reloaded.activateRoute(concepts[1].slug);
  assert.deepEqual(reloaded.getSnapshot().recents.map(({conceptId}) => conceptId), [concepts[1].id, concepts[0].id]);
});

test('preset cliente: las sugerencias priorizan recientes y eliminan duplicados', async () => {
  const search = compile<typeof import('../src/lib/search.ts')>('../src/lib/search.ts');
  const {createSearchStore} = compile<typeof import('../src/lib/search-store.ts')>('../src/lib/search-store.ts', {'./search.ts': search});
  const store = createSearchStore(async () => entries);
  store.setRecentIds([entries[3].id, entries[1].id, entries[3].id]);
  await store.openDialog();
  assert.deepEqual(store.getSnapshot().results.slice(0, 2).map(({id}) => id), [entries[3].id, entries[1].id]);
  assert.equal(store.getSnapshot().results.length, entries.length);
});

test('preset cliente: el registro de práctica resuelve defaults de Map sin cargar proveedores', () => {
  const guards = compile<typeof import('../src/practice/guards.ts')>('../src/practice/guards.ts');
  const registryModule = compile<typeof import('../src/practice/registry.ts')>('../src/practice/registry.ts', {'./guards.ts': guards});
  const profiles = compile<typeof import('../src/practice/profiles.ts')>('../src/practice/profiles.ts', {'./registry.ts': registryModule});
  const context = compile<typeof import('../src/practice/context.ts')>('../src/practice/context.ts', {
    '../content/concepts.ts': {concepts, docsBasePath: '/apuntes'}, './guards.ts': guards, './profiles.ts': profiles,
  });
  const fixture = registration();
  const registry = registryModule.createPracticeRegistry([fixture.entry]);
  const resolved = context.createPracticeContextResolver({registry})(concepts[0].slug);
  assert.equal(resolved?.profile.id, 'sql-sqlite');
  assert.equal(fixture.calls.runtime, 0);
  assert.equal(profiles.practiceRegistry.list().length, 2);
});

test('preset cliente: el gestor y los borradores conservan SQL/pandas y guardan todas las entradas del Map', async () => {
  const guards = compile<typeof import('../src/practice/guards.ts')>('../src/practice/guards.ts');
  const drafts = compile<typeof import('../src/practice/drafts.ts')>('../src/practice/drafts.ts', {'./guards.ts': guards});
  const protocol = compile<typeof import('../src/practice/protocol.ts')>('../src/practice/protocol.ts', {'./guards.ts': guards, './contracts.ts': {PRACTICE_PROTOCOL_VERSION: 1}});
  const sessions = compile<typeof import('../src/practice/session-manager.ts')>('../src/practice/session-manager.ts', {'./protocol.ts': protocol, './drafts.ts': drafts, './guards.ts': guards});
  const repo = memoryRepository(); const store = drafts.createDraftStore(() => repo.repository); const engines = engineFixture();
  const manager = sessions.createPracticeSessionManager({registry: engines.registry, drafts: store,
    bootstrap: async (ctx) => ({workspace: workspace(ctx), environment})});
  await manager.setContext(practiceContext()); await manager.open(); manager.edit('main.sql', 'SELECT 8;');
  await manager.setContext(practiceContext('pandas')); manager.edit('main.py', 'productos.shape');
  await manager.dispose(); await store.close();
  assert.equal(repo.records.size, 2); assert.equal(engines.calls.active, 0);
  assert.equal(repo.records.get(workspace().id)!.workspace.files[0].content, 'SELECT 8;');
  assert.equal(repo.records.get(workspace(practiceContext('pandas')).id)!.workspace.files[0].content, 'productos.shape');
});

test('salida de práctica: tablas semánticas, valores escapados y revisión anterior sin depender del motor', () => {
  const {default: Results} = compile<typeof import('../src/components/PracticeResults/index.tsx')>('../src/components/PracticeResults/index.tsx', {'../PracticePanel/styles.module.css': {}});
  const identity = {protocolVersion: 1 as const, runId: 'test', generation: 1, revision: 2};
  const events: RuntimeEvent[] = [
    {...identity, type: 'stream', channel: 'stdout', text: '<script>alert(1)</script>'},
    {...identity, type: 'table', columns: [{name: 'activo', type: 'boolean'}, {name: 'precio', type: 'integer'}], rows: [[false, null], [true, 500]], truncated: true},
    {...identity, type: 'error', message: 'error <img>', file: 'consulta.sql', line: 2},
    {...identity, type: 'end', status: 'error', environmentReset: false},
  ];
  const html = renderToStaticMarkup(createElement(Results, {events, revision: 3}));
  assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('scope="col"')); assert.ok(html.includes('false')); assert.ok(html.includes('NULL'));
  assert.ok(html.includes('anterior')); assert.ok(html.includes('truncada')); assert.ok(html.includes('consulta.sql:2'));
});

test('panel con tercer perfil de prueba: etiqueta propia y controles de detener/reiniciar sin cambiar componentes', () => {
  const resultModule = compile<typeof import('../src/components/PracticeResults/index.tsx')>('../src/components/PracticeResults/index.tsx', {'../PracticePanel/styles.module.css': {}});
  const ws = {...workspace(), id: JSON.stringify(['analisis-de-datos/otro', 'otro', 'productos-basico', 1]), toolKey: 'analisis-de-datos/otro', profileId: 'otro', files: [{path: 'main.otro', content: 'ejemplo', languageId: 'otro'}], activeFile: 'main.otro'};
  const fixture = {context: {...practiceContext(), toolKey: ws.toolKey, workspaceKey: ws.id, conceptId: ws.toolKey + '/concepto', conceptSlug: '/apuntes/' + ws.toolKey + '/concepto', profile: {...practiceContext().profile, id: 'otro', toolKey: ws.toolKey, languageId: 'otro', label: 'Perfil de prueba'}},
    state: {phase: 'running', draft: {workspace: ws, status: 'clean'}, schema: {version: 0, entities: []}, events: [], error: null},
    requested: true, visible: true, error: null};
  const {default: Panel} = compile<typeof import('../src/components/PracticePanel/index.tsx')>('../src/components/PracticePanel/index.tsx', {
    '@site/src/practice/interaction': compile<typeof import('../src/practice/interaction.ts')>('../src/practice/interaction.ts'),
    '@docusaurus/theme-common/internal': {useNavbarMobileSidebar: () => ({shouldRender: false})},
    '../PracticeProvider': {usePractice: () => fixture}, '../SearchProvider': {useSearch: () => ({store: {}})},
    '../Icon': {__esModule: true, default: () => null}, '../PracticeResults': resultModule,
    '@site/src/lib/dialog-coordination': {suspendDialogEvent: 'test'}, './styles.module.css': {},
  });
  const html = renderToStaticMarkup(createElement(Panel, {layout: 'parallel'}));
  assert.ok(html.includes('Perfil de prueba')); assert.ok(html.includes('Detener')); assert.ok(html.includes('Reiniciar entorno'));
});
