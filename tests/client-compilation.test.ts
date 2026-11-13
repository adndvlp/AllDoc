import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {concepts} from '../src/content/concepts.ts';
import {entries} from '../src/content/search-index.ts';

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
