import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import initSQLite, {type Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {createSQLiteEngine, type SQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import type {MaterializedDataset, RunRequest, RuntimeEvent} from '../src/practice/contracts.ts';
import {isRuntimeEvent} from '../src/practice/protocol.ts';
import {getSqlConcept} from '../src/content/notes/sql.ts';
import {sqliteEnvironment} from '../src/practice/adapters/sqlite/environment.ts';
import {createSQLCompletion} from '../src/practice/adapters/sqlite/completion.ts';
import {readFile} from 'node:fs/promises';

let sqlite: Sqlite3Static; let dataset: MaterializedDataset;
const engines: SQLiteEngine[] = [];
before(async () => {
  sqlite = await (initSQLite as unknown as (options: object) => Promise<Sqlite3Static>)({print() {}, printErr() {}});
  dataset = await createDatasetAdapter().materialize({id: 'productos-basico', version: 1}, 'sqlite-wasm', new AbortController().signal);
});
after(() => {for (const engine of engines) engine.dispose();});
function engine() {const value = createSQLiteEngine(sqlite); engines.push(value); value.init(dataset); return value;}
let sequence = 0;
function run(engine: SQLiteEngine, code: string, selection?: {from: number; to: number}) {
  const request: RunRequest = {runId: `test-${++sequence}`, workspaceId: 'test-workspace', generation: 1, revision: sequence,
    files: [{path: 'consulta.sql', languageId: 'sql', content: code}], entryFile: 'consulta.sql', selection};
  const events: RuntimeEvent[] = []; engine.run(request, (event) => events.push(event));
  assert.ok(events.every((event) => isRuntimeEvent(event, request)));
  assert.equal(events.filter((event) => event.type === 'end').length, 1);
  return events;
}
const tables = (events: RuntimeEvent[]) => events.filter((event) => event.type === 'table');

test('SQLite WASM real: los ocho ejemplos conservan valores, columnas y precio entero', () => {
  const db = engine();
  for (const id of ['select', 'where', 'order-by', 'limit', 'comentarios']) {
    const note = getSqlConcept('analisis-de-datos/sql/' + id)!;
    for (const example of note.examples) {
      const result = tables(run(db, example.code)); assert.equal(result.length, 1);
      assert.deepEqual(result[0].columns.map((column) => column.name), example.output.columns);
      assert.deepEqual(result[0].rows.map((row) => row.map(String)), example.output.rows);
      if (result[0].columns.some((column) => column.name === 'precio')) assert.equal(result[0].columns.find((column) => column.name === 'precio')!.type, 'integer');
    }
  }
});

test('SQLite WASM real: sentencias y triggers con punto y coma se separan con el parser del motor', () => {
  const db = engine();
  const result = tables(run(db, `CREATE TABLE registro(valor TEXT);
    CREATE TRIGGER copia AFTER INSERT ON productos BEGIN INSERT INTO registro VALUES('uno;dos'); INSERT INTO registro VALUES('tres'); END;
    INSERT INTO productos VALUES ('Nuevo', 'Prueba', 100);
    SELECT * FROM registro; SELECT 'texto;literal' AS texto;`));
  assert.equal(result.length, 2); assert.deepEqual(result[0].rows, [['uno;dos'], ['tres']]);
  assert.deepEqual(result[1].rows, [['texto;literal']]);
});

test('SQLite WASM real: selección UTF-16 ejecuta solo lo seleccionado y conserva el archivo en errores', () => {
  const db = engine(); const code = `SELECT '😀';\nSELECT nombre FROM productos LIMIT 1;\nDROP TABLE productos;`;
  const from = code.indexOf('SELECT nombre'); const to = code.indexOf('\nDROP');
  assert.deepEqual(tables(run(db, code, {from, to}))[0].rows, [['Teclado']]);
  assert.equal(db.inspect().entities[0].name, 'productos');
  const error = run(db, `SELECT 'ñ';\nSELEC nombre FROM productos;`).find((event) => event.type === 'error');
  assert.ok(error); assert.equal(error.file, 'consulta.sql'); assert.equal(error.line, 2); assert.equal(error.column, 1);
});

test('SQLite WASM real: mutaciones, esquema tras error parcial y reinicio no modifican el paquete ni otra sesión', () => {
  const a = engine(); const b = engine();
  const result = run(a, `UPDATE productos SET precio = 1; CREATE TABLE ventas(total INTEGER); SELECT * FROM inexistente; UPDATE productos SET precio = 2;`);
  assert.equal(result.at(-1)!.type, 'end'); assert.ok(result.some((event) => event.type === 'error'));
  assert.ok(a.inspect().entities.some((entity) => entity.name === 'ventas'));
  const current = a.inspect().entities.find((entity) => entity.name === 'productos')!;
  assert.equal(current.rowCount, 3);
  assert.deepEqual((current as typeof current & {preview?: {rows: unknown[]}}).preview?.rows, [['Teclado', 'Accesorios', 1], ['Mouse', 'Accesorios', 1], ['Monitor', 'Pantallas', 1]]);
  assert.deepEqual(tables(run(a, 'SELECT precio FROM productos;'))[0].rows, [[1], [1], [1]]);
  assert.deepEqual(tables(run(b, 'SELECT precio FROM productos;'))[0].rows, [[500], [250], [3500]]);
  a.reset(); assert.equal(a.inspect().entities.some((entity) => entity.name === 'ventas'), false);
  assert.deepEqual(tables(run(a, 'SELECT precio FROM productos;'))[0].rows, [[500], [250], [3500]]);
});

test('SQLite WASM real: respeta transacciones explícitas, sin envolver el programa en otra transacción', () => {
  const db = engine(); run(db, 'BEGIN; UPDATE productos SET precio = 7;');
  assert.deepEqual(tables(run(db, 'SELECT precio FROM productos LIMIT 1;'))[0].rows, [[7]]);
  run(db, 'ROLLBACK;'); assert.deepEqual(tables(run(db, 'SELECT precio FROM productos LIMIT 1;'))[0].rows, [[500]]);
});

test('SQLite WASM real: null, texto vacío, bigint, blob y columnas mixtas son serializables sin perder precisión', () => {
  const db = engine();
  const result = tables(run(db, `SELECT NULL AS vacio, '' AS texto, 9223372036854775807 AS grande, x'00ff' AS bytes;`))[0];
  assert.deepEqual(result.rows, [[null, '', '9223372036854775807', '0x00ff']]);
  assert.equal(result.columns[2].type, 'bigint'); assert.doesNotThrow(() => JSON.stringify(result));
  const mixed = tables(run(db, `SELECT 1 AS mixto UNION ALL SELECT 'texto';`))[0];
  assert.equal(mixed.columns[0].type, 'text'); assert.deepEqual(mixed.rows, [['1'], ['texto']]);
});

test('SQLite WASM real: cero filas sigue teniendo columnas y la vista previa corta en 200 sin inventar un total', () => {
  const db = engine(); const empty = tables(run(db, 'SELECT nombre, precio FROM productos WHERE 0;'))[0];
  assert.equal(empty.rows.length, 0); assert.deepEqual(empty.columns.map((column) => column.name), ['nombre', 'precio']);
  const large = tables(run(db, 'WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<10000) SELECT x FROM n;'))[0];
  assert.equal(large.rows.length, 200); assert.equal(large.truncated, true); assert.equal('totalRows' in large, false);
});

test('SQLite WASM real: límites y extensiones de archivos fallan con error visible, sin impedir reiniciar', () => {
  const db = engine();
  for (const code of [`SELECT randomblob(2000000);`, `ATTACH DATABASE 'otro.db' AS otro;`, `SELECT load_extension('x');`, `PRAGMA hard_heap_limit=1;`, 'SELECT 1;\0SELECT 2;']) {
    const events = run(db, code); assert.ok(events.some((event) => event.type === 'error'), code);
  }
  db.reset(); assert.equal(tables(run(db, 'SELECT count(*) FROM productos;'))[0].rows[0][0], 3);
});

test('SQLite WASM real: manifiesto coincide con motor y lockfile; completado utiliza el esquema inspeccionado', async () => {
  assert.equal(sqlite.capi.sqlite3_libversion(), sqliteEnvironment.runtime.version);
  const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  assert.equal(sqliteEnvironment.packages[0].version, lock.packages['node_modules/@sqlite.org/sqlite-wasm'].version);
  const db = engine(); run(db, 'CREATE TABLE ventas(total INTEGER);');
  const completion = createSQLCompletion();
  const result = await completion.complete({requestId: 'completion-1', generation: 1, workspaceId: 'workspace', revision: 1,
    file: 'consulta.sql', document: 'SELECT ventas.', position: 14, schema: db.inspect()}, new AbortController().signal);
  assert.ok(result.items.some((entry) => entry.label === 'total'));
  await completion.dispose();
});

test('SQLite WASM real: truncar RETURNING conserva todas las mutaciones y rechaza salida excesiva con fin explícito', () => {
  const db = engine();
  const result = run(db, 'CREATE TABLE numeros(x); WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<300) INSERT INTO numeros SELECT x FROM n RETURNING x;');
  assert.equal(tables(result)[0].truncated, true);
  assert.equal(tables(run(db, 'SELECT count(*) FROM numeros;'))[0].rows[0][0], 300);
  const output = run(db, Array.from({length: 20000}, () => 'SELECT 1 AS numero;').join('\n'));
  assert.equal(output.filter((event) => event.type === 'error').length, 1);
  assert.deepEqual(output.filter((event) => event.type === 'end').map((event) => event.status), ['error']);
  assert.ok(output.reduce((sum, event) => sum + new TextEncoder().encode(JSON.stringify(event)).byteLength, 0) < 1_048_576);
});
