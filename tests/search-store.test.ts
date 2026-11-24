import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createSearchStore} from '../src/lib/search-store.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries, searchTerms, prepareSearchIndex, searchPreparedEntries} from '../src/lib/search.ts';

test('consultas pedagógicas: auxiliares, acentos, preguntas y operadores de comentarios', () => {
  for (const [query, title] of [['cómo filtrar', 'WHERE'], ['¿qué es SELECT?', 'SELECT'], ['ordenar', 'ORDER BY'], ['máximo', 'LIMIT'], ['--', 'Comentarios'], ['/*', 'Comentarios']]) {
    assert.equal(searchEntries(entries, query).find(entry => entry.context.endsWith('/ SQL'))?.title, title);
  }
  assert.deepEqual(searchTerms('qué es para'), []);
  assert.deepEqual(searchEntries(entries, 'qué es para'), []);
  assert.deepEqual(searchEntries(entries, ''), entries);
});

test('título completo y prefijo superan coincidencias de palabras y los empates conservan orden', () => {
  const fixture = [
    {...entries[0], id: 'word', title: 'ORDER', keywords: ['by']},
    {...entries[0], id: 'prefix', title: 'ORDER BY precio', keywords: []},
    {...entries[0], id: 'exact', title: 'ORDER BY', keywords: []},
    {...entries[0], id: 'tied', title: 'ORDER BY', keywords: []},
  ];
  assert.deepEqual(searchEntries(fixture, 'qué es ORDER BY').map((entry) => entry.id), ['exact', 'tied', 'prefix', 'word']);
});

test('índice preparado: mil entradas conservan coincidencias sin reconstruir la normalización', () => {
  const fixture = Array.from({length: 1000}, (_, index) => ({...entries[0], id: 'fixture/' + index, title: 'Concepto ' + index, keywords: ['acción' + index]}));
  const prepared = prepareSearchIndex(fixture);
  assert.equal(searchPreparedEntries(prepared, 'ACCIÓN999')[0]?.id, 'fixture/999');
  assert.equal(searchPreparedEntries(prepared, 'Concepto 999')[0]?.id, 'fixture/999');
  assert.equal(searchPreparedEntries(prepared, 'Concepto').length, 1000);
});

test('la carga es diferida, comparte promesa y resuelve la consulta más reciente sin reabrir el diálogo', async () => {
  let calls = 0;
  let resolve!: (value: typeof entries) => void;
  const pending = new Promise<typeof entries>((done) => {resolve = done;});
  const store = createSearchStore(() => {calls++; return pending;});
  assert.equal(calls, 0);
  assert.equal(store.getServerSnapshot(), store.getServerSnapshot());
  store.mountInline();
  const first = store.activateInline();
  const second = store.openDialog();
  assert.equal(first, second);
  await Promise.resolve();
  assert.equal(calls, 1);
  assert.equal(store.getSnapshot().status, 'loading');
  store.setQuery('SELECT');
  store.setQuery('cómo filtrar');
  store.closeDialog();
  resolve(entries);
  await first;
  assert.equal(store.getSnapshot().surface, 'inline');
  assert.equal(store.getSnapshot().query, 'cómo filtrar');
  assert.deepEqual(store.getSnapshot().results, searchEntries(entries, 'cómo filtrar'));
  assert.ok(store.getSnapshot().results.some(entry => entry.id === 'analisis-de-datos/sql/where'));
  assert.ok(store.getSnapshot().results.some(entry => entry.context.endsWith('/ Pandas')));
  await store.openDialog();
  assert.equal(calls, 1);
  assert.equal(store.getSnapshot().query, 'cómo filtrar');
  assert.equal(store.getServerSnapshot().status, 'idle');
});

test('un error permite reintentar sin perder la consulta; elegir un resultado limpia y conserva la caché', async () => {
  let calls = 0;
  const store = createSearchStore(async () => {if (++calls === 1) throw new Error('sin red'); return entries;});
  store.setQuery('filtrar');
  await store.openDialog();
  assert.equal(store.getSnapshot().status, 'error');
  await store.retry();
  assert.equal(calls, 2);
  assert.equal(store.getSnapshot().status, 'ready');
  assert.equal(store.getSnapshot().query, 'filtrar');
  assert.equal(store.getSnapshot().results.find(entry => entry.context.endsWith('/ SQL'))?.title, 'WHERE');
  store.chooseResult();
  store.closeDialog();
  assert.equal(store.getSnapshot().query, '');
  assert.equal(store.getSnapshot().surface, null);
  await store.openDialog();
  assert.equal(calls, 2);
});

test('los resultados se muestran en lotes de diez y una consulta nueva restaura el límite', async () => {
  const fixture = Array.from({length: 25}, (_, index) => ({...entries[0], id: 'fixture/' + index, title: 'Concepto ' + index}));
  const store = createSearchStore(async () => fixture);
  await store.activateInline();
  store.setQuery('concepto');
  assert.equal(store.getSnapshot().visibleCount, 10);
  store.showMore();
  assert.equal(store.getSnapshot().visibleCount, 20);
  store.showMore();
  assert.equal(store.getSnapshot().visibleCount, 25);
  store.setQuery('24');
  assert.equal(store.getSnapshot().visibleCount, 10);
  assert.equal(store.getSnapshot().results.length, 1);
});

test('salir de la landing elimina su superficie y las suscripciones se pueden limpiar', async () => {
  const store = createSearchStore(async () => entries);
  let notifications = 0;
  const unsubscribe = store.subscribe(() => notifications++);
  store.mountInline();
  await store.activateInline();
  store.setQuery('SELECT');
  await store.openDialog();
  store.releaseInline();
  store.closeDialog();
  assert.equal(store.getSnapshot().surface, null);
  assert.equal(store.getSnapshot().query, 'SELECT');
  assert.ok(notifications > 0);
  const previous = notifications;
  unsubscribe();
  store.setQuery('WHERE');
  assert.equal(notifications, previous);
});

test('buscador vacío: recientes primero sin duplicados; una consulta conserva su ranking', async () => {
  const store = createSearchStore(async () => entries);
  const recentIds = [entries[3].id, entries[1].id, entries[3].id, 'retirado'];
  store.setRecentIds(recentIds);
  await store.openDialog();
  assert.deepEqual(store.getSnapshot().results.map(({id}) => id), [entries[3].id, entries[1].id,...entries.filter((_,i)=>i!==3&&i!==1).map(e=>e.id)]);
  store.setQuery('cómo filtrar');
  assert.deepEqual(store.getSnapshot().results, searchEntries(entries, 'cómo filtrar'));
  store.setQuery('');
  assert.equal(store.getSnapshot().results[0].id, entries[3].id);
});

test('recientes recibidos durante la carga se usan al resolver; no mueven enlaces de un diálogo ya visible', async () => {
  let resolve!: (value: typeof entries) => void;
  const store = createSearchStore(() => new Promise((done) => {resolve = done;}));
  const loaded = store.openDialog();
  await Promise.resolve();
  store.setRecentIds([entries[3].id]);
  resolve(entries);
  await loaded;
  assert.equal(store.getSnapshot().results[0].id, entries[3].id);
  const visible = store.getSnapshot().results;
  store.setRecentIds([entries[1].id]);
  assert.equal(store.getSnapshot().results, visible);
  store.closeDialog();
  await store.openDialog();
  assert.equal(store.getSnapshot().results[0].id, entries[1].id);
});
