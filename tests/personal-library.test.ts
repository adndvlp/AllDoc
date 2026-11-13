import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createPersonalLibrary, readRecents, readFavorites, RECENTS_KEY, FAVORITES_KEY} from '../src/lib/personal-library.ts';

const entries = Array.from({length: 30}, (_, i) => ({id: `area-${i % 3}/topic/concept-${i}`, slug: `/apuntes/area-${i % 3}/topic/concept-${i}`}));
const ids = entries.map(({id}) => id);
const known = new Set(ids);
const encodeRecents = (items: unknown[]) => JSON.stringify({version: 1, items});
const encodeFavorites = (conceptIds: unknown[]) => JSON.stringify({version: 1, conceptIds});
function memory(seed: Record<string, string> = {}) {
  const values = new Map(Object.entries(seed));
  const writes: string[] = [];
  return {values, writes, getItem: (key: string) => values.get(key) ?? null,
    setItem(key: string, value: string) {writes.push(key); values.set(key, value);}};
}

test('recientes: valida fechas e IDs, deduplica por fecha, desempata por ID y limita a veinte', () => {
  const items: unknown[] = entries.map(({id: conceptId}, i) => ({conceptId, visitedAt: i}));
  items.push(null, false, {conceptId: ids[0], visitedAt: 100}, {conceptId: ids[0], visitedAt: 99},
    {conceptId: ids[1], visitedAt: 100}, {conceptId: ids[2], visitedAt: '200'},
    {conceptId: ids[3], visitedAt: 9e15}, {conceptId: 'retirado', visitedAt: 1000});
  const result = readRecents(encodeRecents(items), known);
  assert.equal(result.length, 20);
  assert.deepEqual(result.slice(0, 2).map(({conceptId}) => conceptId), [ids[0], ids[1]]);
  assert.equal(result[2].visitedAt, 29);
  assert.equal(new Set(result.map(({conceptId}) => conceptId)).size, 20);
  assert.deepEqual(readRecents('{"version":1,"items":[{"conceptId":"' + ids[0] + '","visitedAt":1e999}]}', known), []);
});

test('versiones y formas inválidas se recuperan sin lanzar; favoritos filtran sin cambiar orden', () => {
  for (const raw of [null, '{roto', 'null', '[]', 'true', '{"version":2,"items":[],"conceptIds":[]}', '{"version":1,"items":{},"conceptIds":"a"}']) {
    assert.deepEqual(readRecents(raw, known), []);
    assert.deepEqual(readFavorites(raw, known), []);
  }
  assert.deepEqual(readFavorites(encodeFavorites([ids[3], 'retirado', ids[1], ids[3], 7, null]), known), [ids[3], ids[1]]);
});

test('SSR vacío y estable; hidratar lee ambas colecciones sin escribir ni sobrescribirlas', () => {
  const adapter = memory({[RECENTS_KEY]: encodeRecents([{conceptId: ids[0], visitedAt: 10}]), [FAVORITES_KEY]: encodeFavorites([ids[1]])});
  const store = createPersonalLibrary(entries);
  const initial = store.getServerSnapshot();
  assert.equal(initial.hydrated, false);
  assert.deepEqual(initial.recents, []);
  store.toggleFavorite(ids[2]);
  store.hydrate(adapter);
  store.hydrate(memory());
  assert.equal(store.getServerSnapshot(), initial);
  assert.deepEqual(adapter.writes, []);
  assert.deepEqual(store.getSnapshot().favorites, [ids[1]]);
  assert.equal(store.getSnapshot().recents[0].conceptId, ids[0]);
});

test('activación directa antes de hidratar espera la lectura; efectos repetidos registran una sola visita', () => {
  const adapter = memory({[RECENTS_KEY]: encodeRecents([{conceptId: ids[1], visitedAt: 10}])});
  const store = createPersonalLibrary(entries, () => 20);
  store.activateRoute(entries[0].slug);
  store.activateRoute(entries[0].slug + '/?q=ignored#ejemplo');
  assert.deepEqual(adapter.writes, []);
  store.hydrate(adapter);
  store.hydrate(adapter);
  store.activateRoute(entries[0].slug);
  assert.deepEqual(adapter.writes, [RECENTS_KEY]);
  assert.deepEqual(store.getSnapshot().recents.map(({conceptId}) => conceptId), [ids[0], ids[1]]);
});

test('visitas y revisitas en cualquier área: una por activación, fechas crecientes y máximo veinte', () => {
  const store = createPersonalLibrary(entries, () => 100);
  store.hydrate(memory());
  entries.forEach(({slug}) => store.activateRoute(slug));
  assert.equal(store.getSnapshot().recents.length, 20);
  assert.equal(store.getSnapshot().recents[0].conceptId, ids[29]);
  store.activateRoute('/apuntes/area-0');
  store.activateRoute(entries[15].slug);
  assert.equal(store.getSnapshot().recents[0].conceptId, ids[15]);
  assert.equal(store.getSnapshot().recents[0].visitedAt, 130);
  assert.equal(new Set(store.getSnapshot().recents.map(({conceptId}) => conceptId)).size, 20);
  store.activateRoute('/');
  store.activateRoute(entries[15].slug);
  assert.equal(store.getSnapshot().recents[0].visitedAt, 131);
});

test('favoritos conservan inserción y quitar/guardar envía al final; cada escritura afecta solo su clave', () => {
  const rawRecents = encodeRecents([{conceptId: ids[4], visitedAt: 10}, {conceptId: 'retirado', visitedAt: 9}]);
  const adapter = memory({[RECENTS_KEY]: rawRecents, [FAVORITES_KEY]: encodeFavorites([ids[2], 'retirado', ids[0], ids[2]]), 'alldoc-palette': 'violeta'});
  const store = createPersonalLibrary(entries, () => 20);
  store.hydrate(adapter);
  store.toggleFavorite(ids[2]);
  store.toggleFavorite(ids[2]);
  assert.deepEqual(store.getSnapshot().favorites, [ids[0], ids[2]]);
  assert.deepEqual(adapter.writes, [FAVORITES_KEY, FAVORITES_KEY]);
  assert.equal(adapter.getItem(FAVORITES_KEY), encodeFavorites([ids[0], ids[2]]));
  assert.equal(adapter.getItem(RECENTS_KEY), rawRecents);
  store.activateRoute(entries[1].slug);
  assert.deepEqual(JSON.parse(adapter.getItem(RECENTS_KEY)!).items.map((item: {conceptId: string}) => item.conceptId), [ids[1], ids[4]]);
  assert.equal(adapter.getItem(FAVORITES_KEY), encodeFavorites([ids[0], ids[2]]));
  assert.equal(adapter.getItem('alldoc-palette'), 'violeta');
  const writes = adapter.writes.length;
  store.toggleFavorite('desconocido');
  store.activateRoute('/sin-concepto');
  assert.equal(adapter.writes.length, writes);
});

test('corrupción de una clave no borra la otra ni escribe al iniciar', () => {
  for (const broken of [RECENTS_KEY, FAVORITES_KEY]) {
    const adapter = memory({[RECENTS_KEY]: encodeRecents([{conceptId: ids[0], visitedAt: 10}]), [FAVORITES_KEY]: encodeFavorites([ids[1]])});
    adapter.values.set(broken, '{roto');
    const store = createPersonalLibrary(entries);
    store.hydrate(adapter);
    assert.deepEqual(adapter.writes, []);
    assert.equal(store.getSnapshot().recents.length, broken === RECENTS_KEY ? 0 : 1);
    assert.equal(store.getSnapshot().favorites.length, broken === FAVORITES_KEY ? 0 : 1);
  }
});

test('almacenamiento inaccesible: conserva memoria y solo avisa tras una acción; no sobrescribe lo que no pudo leer', () => {
  for (const adapter of [null, {getItem() {throw new Error('bloqueado');}, setItem() {assert.fail('no debe sobrescribir datos sin leer');}}]) {
    const store = createPersonalLibrary(entries);
    store.hydrate(adapter);
    assert.deepEqual(store.getSnapshot().sessionOnly, {recents: false, favorites: false});
    store.activateRoute(entries[0].slug);
    store.toggleFavorite(ids[0]);
    assert.deepEqual(store.getSnapshot().sessionOnly, {recents: true, favorites: true});
    assert.deepEqual(store.getSnapshot().favorites, [ids[0]]);
    assert.equal(store.getSnapshot().recents.length, 1);
  }
});

test('cuota llena: acción inmediata en memoria, siguientes escrituras pueden recuperar persistencia', () => {
  const adapter = memory();
  let full = true;
  const store = createPersonalLibrary(entries);
  store.hydrate({...adapter, setItem(key, value) {if (full) throw new Error('QuotaExceededError'); adapter.setItem(key, value);}});
  store.toggleFavorite(ids[0]);
  assert.deepEqual(store.getSnapshot().favorites, [ids[0]]);
  assert.equal(store.getSnapshot().sessionOnly.favorites, true);
  full = false;
  store.toggleFavorite(ids[1]);
  assert.equal(store.getSnapshot().sessionOnly.favorites, false);
  assert.equal(adapter.getItem(FAVORITES_KEY), encodeFavorites([ids[0], ids[1]]));
});

test('storage sincroniza solo la clave afectada, última escritura gana y nunca responde con otra escritura', () => {
  const adapter = memory({[FAVORITES_KEY]: encodeFavorites([ids[0]])});
  const store = createPersonalLibrary(entries);
  store.hydrate(adapter);
  store.receiveStorage(RECENTS_KEY, encodeRecents([{conceptId: ids[1], visitedAt: 10}]));
  assert.deepEqual(store.getSnapshot().favorites, [ids[0]]);
  store.receiveStorage(FAVORITES_KEY, encodeFavorites([ids[2], ids[3]]));
  store.receiveStorage(FAVORITES_KEY, encodeFavorites([ids[4]]));
  assert.deepEqual(store.getSnapshot().favorites, [ids[4]]);
  assert.equal(store.getSnapshot().recents[0].conceptId, ids[1]);
  store.receiveStorage('alldoc-palette', 'rojo');
  assert.deepEqual(store.getSnapshot().favorites, [ids[4]]);
  store.receiveStorage(FAVORITES_KEY, null);
  assert.deepEqual(store.getSnapshot().favorites, []);
  store.receiveStorage(null, null);
  assert.deepEqual(store.getSnapshot().recents, []);
  assert.deepEqual(adapter.writes, []);
});
