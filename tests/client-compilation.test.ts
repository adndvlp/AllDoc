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
import {productsManifest} from '../src/practice/datasets/manifest.ts';
import {businessManifest} from '../src/practice/datasets/business-manifest.ts';
import {pandasCommerceManifest, pandasCommerceSchema} from '../src/practice/datasets/pandas-commerce.ts';
import {jsonOrdersManifest, jsonOrdersSchema} from '../src/practice/datasets/json-orders.ts';
import {numpySalesManifest, numpySalesSchema} from '../src/practice/datasets/numpy-sales.ts';
import {sqlite3ShopManifest, sqlite3ShopSchema} from '../src/practice/datasets/sqlite3-shop.ts';
import {openpyxlSalesManifest, openpyxlSalesSchema} from '../src/practice/datasets/openpyxl-sales.ts';
import {scipyBusinessManifest, scipyBusinessSchema} from '../src/practice/datasets/scipy-business.ts';
import {sqlalchemySalesManifest, sqlalchemySalesSchema} from '../src/practice/datasets/sqlalchemy-sales.ts';

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

function regionModules() {
  const region=compile<typeof import('../src/components/PracticePanel/Region.tsx')>('../src/components/PracticePanel/Region.tsx',{'./styles.module.css':{}});
  const inspector=compile<typeof import('../src/components/PracticePanel/DataInspector.tsx')>('../src/components/PracticePanel/DataInspector.tsx',{'./styles.module.css':{},'./Region':region});
  return {'./Region':region,'./DataInspector':inspector,'@site/src/practice/layout':compile<typeof import('../src/practice/layout.ts')>('../src/practice/layout.ts')};
}

test('preset cliente: autocompletado SQL conserva arrays de columnas CTE y nombres de tablas al transformar iteradores',async()=>{
 const {EditorState}=require('@codemirror/state');const {CompletionContext}=require('@codemirror/autocomplete');const {sql,SQLite,schemaCompletionSource}=require('@codemirror/lang-sql');
 const {sqlSchemaCompletion}=compile<typeof import('../src/practice/sql-completion.ts')>('../src/practice/sql-completion.ts');
 const schema={version:1,entities:[{name:'productos',kind:'table' as const,columns:[{name:'nombre',type:'text' as const},{name:'precio',type:'integer' as const}]}]};
 const source=sqlSchemaCompletion(schema,schemaCompletionSource({dialect:SQLite,schema:{productos:['nombre','precio']}}));
 for(const [marked,label] of [['WITH c AS (SELECT nombre,precio AS importe FROM productos) SELECT c.▏ FROM c;','importe'],['SELECT * FROM ▏','productos'],['SELECT pre▏','precio']]){
  const position=marked.indexOf('▏');const state=EditorState.create({doc:marked.replace('▏',''),extensions:[sql({dialect:SQLite})]});
  const result=await source(new CompletionContext(state,position,true));assert.ok(result?.options.some(option=>option.label===label),marked);
  assert.ok(result!.options.every(option=>typeof option.label==='string'));
 }
});

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

test('preset cliente: las flechas recorren un NodeList de resultados y devuelven el foco al buscador', context => {
  const {searchKeyboard} = compile<typeof import('../src/components/SearchResults/keyboard.ts')>('../src/components/SearchResults/keyboard.ts');
  const doc = {activeElement: {} as object};
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', {configurable: true, value: doc});
  context.after(() => {
    if (previous) Object.defineProperty(globalThis, 'document', previous);
    else Reflect.deleteProperty(globalThis, 'document');
  });
  const target = () => {
    const element = {focus: () => {doc.activeElement = element;}};
    return element;
  };
  const input = target(), first = target(), second = target();
  const links = {0: first, 1: second, length: 2, [Symbol.iterator]: () => [first, second].values()};
  const {onResultsKeyDown} = searchKeyboard({current: input as unknown as HTMLInputElement},
    {current: {querySelectorAll: () => links} as unknown as HTMLUListElement});
  const move = (key: string) => onResultsKeyDown({key, preventDefault() {}} as Parameters<typeof onResultsKeyDown>[0]);
  first.focus();
  move('ArrowDown');
  assert.equal(doc.activeElement, second);
  move('ArrowUp');
  assert.equal(doc.activeElement, first);
  move('ArrowUp');
  assert.equal(doc.activeElement, input);
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
  assert.equal(profiles.practiceRegistry.list().length, 9);
});

test('preset cliente: resuelve los manifiestos de Python por ID y versión', () => {
  const {getDatasetManifest} = compile<typeof import('../src/practice/datasets/index.ts')>('../src/practice/datasets/index.ts', {
    './manifest.ts': {productsManifest},
    './business-manifest.ts': {businessManifest},
    './pandas-commerce.ts': {pandasCommerceManifest, pandasCommerceSchema},
    './json-orders.ts': {jsonOrdersManifest, jsonOrdersSchema},
    './numpy-sales.ts': {numpySalesManifest, numpySalesSchema},
    './sqlite3-shop.ts': {sqlite3ShopManifest, sqlite3ShopSchema},
    './openpyxl-sales.ts': {openpyxlSalesManifest, openpyxlSalesSchema},
    './scipy-business.ts': {scipyBusinessManifest, scipyBusinessSchema},
    './sqlalchemy-sales.ts': {sqlalchemySalesManifest, sqlalchemySalesSchema},
  });
  for (const manifest of [productsManifest, businessManifest, pandasCommerceManifest, jsonOrdersManifest,
    numpySalesManifest, sqlite3ShopManifest, openpyxlSalesManifest, scipyBusinessManifest, sqlalchemySalesManifest]) {
    assert.equal(getDatasetManifest({...manifest.reference}), manifest);
  }
  assert.equal(getDatasetManifest({...jsonOrdersManifest.reference, version: 0}), undefined);
});

test('preset cliente: el gestor y los borradores conservan SQL/pandas y guardan todas las entradas del Map', async () => {
  const guards = compile<typeof import('../src/practice/guards.ts')>('../src/practice/guards.ts');
  const drafts = compile<typeof import('../src/practice/drafts.ts')>('../src/practice/drafts.ts', {'./guards.ts': guards});
  const protocol = compile<typeof import('../src/practice/protocol.ts')>('../src/practice/protocol.ts', {'./guards.ts': guards, './contracts.ts': {PRACTICE_PROTOCOL_VERSION: 1}});
  const timing = compile<typeof import('../src/practice/timing.ts')>('../src/practice/timing.ts');
  const sessions = compile<typeof import('../src/practice/session-manager.ts')>('../src/practice/session-manager.ts', {'./protocol.ts': protocol, './drafts.ts': drafts, './guards.ts': guards, './timing.ts': timing});
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
    ...regionModules(),
    '@site/src/practice/interaction': compile<typeof import('../src/practice/interaction.ts')>('../src/practice/interaction.ts'),
    '@docusaurus/theme-common/internal': {useNavbarMobileSidebar: () => ({shouldRender: false})},
    '../PracticeProvider': {usePractice: () => fixture}, '../SearchProvider': {useSearch: () => ({store: {}})},
    '../Icon': {__esModule: true, default: () => null}, '../PracticeResults': resultModule,
    '@site/src/lib/dialog-coordination': {suspendDialogEvent: 'test'}, './styles.module.css': {},
  });
  const html = renderToStaticMarkup(createElement(Panel, {layout: 'parallel'}));
  assert.ok(html.includes('Perfil de prueba')); assert.ok(html.includes('Detener')); assert.ok(html.includes('Reiniciar entorno'));
});

test('regiones: el panel comparte Datos/Editor, no monta pestañas ni una salida vacía antes de ejecutar', () => {
  const resultModule=compile<typeof import('../src/components/PracticeResults/index.tsx')>('../src/components/PracticeResults/index.tsx',{'../PracticePanel/styles.module.css':{}});
  const fixture={context:practiceContext(),state:{phase:'ready',generation:1,draft:{workspace:workspace(),status:'clean'},schema:{version:1,entities:[
    {name:'productos',kind:'table',columns:[{name:'precio',type:'integer'}],rowCount:1,preview:{columns:[{name:'precio',type:'integer'}],rows:[[500]],truncated:false}},
    {name:'clientes',kind:'table',columns:[{name:'nombre',type:'text'}],rowCount:1,preview:{columns:[{name:'nombre',type:'text'}],rows:[['Ana']],truncated:false}},
  ]},events:[],error:null},visible:true,requested:true,error:null};
  const {default:Panel}=compile<typeof import('../src/components/PracticePanel/index.tsx')>('../src/components/PracticePanel/index.tsx',{
    ...regionModules(),
    '@site/src/practice/interaction':compile<typeof import('../src/practice/interaction.ts')>('../src/practice/interaction.ts'),
    '@docusaurus/theme-common/internal':{useNavbarMobileSidebar:()=>({shouldRender:false})},
    '../PracticeProvider':{usePractice:()=>fixture},'../SearchProvider':{useSearch:()=>({store:{}})},
    '../Icon':{__esModule:true,default:()=>null},'../PracticeResults':resultModule,
    '@site/src/lib/dialog-coordination':{suspendDialogEvent:'test'},'./styles.module.css':{},
  });
  const html=renderToStaticMarkup(createElement(Panel,{layout:'parallel'}));
  assert.ok(!html.includes('role="tablist"'),'Las regiones no deben ocultarse con pestañas excluyentes');
  assert.ok(html.indexOf('data-practice-region="data"')<html.indexOf('data-practice-region="editor"'));
  assert.ok(html.includes('data-practice-region="editor"'));
  assert.ok(!html.includes('data-practice-region="results"'));
  assert.equal((html.match(/<table>/g)??[]).length,1,'Solo se monta la vista previa de la tabla seleccionada');
  assert.ok(html.includes('Tabla de datos'));
});
