import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
import {createDatasetAdapter, getDatasetManifest} from '../src/practice/datasets/index.ts';
import {sqlSeedFor, type SqlSeed} from '../src/practice/datasets/materialize.ts';
import {productsDataset} from '../src/practice/datasets/products.ts';
import {getPandasConcept} from '../src/content/notes/pandas.ts';
import {concepts, getConcept} from '../src/content/concepts.ts';
import {catalog, countConcepts} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {sqlConcepts,getSqlConcept} from '../src/content/sql.ts';
import {parseConceptFrontMatter} from '../src/lib/concept-front-matter.ts';
import path from 'node:path';

const reference = {id: 'productos-basico', version: 1};
const expectedColumns = ['nombre', 'categoria', 'precio'];
const expectedRows = [['Teclado', 'Accesorios', 500], ['Mouse', 'Accesorios', 250], ['Monitor', 'Pantallas', 3500]];
const signal = () => new AbortController().signal;

test('el dataset canónico conserva tres columnas, tres productos y el precio entero, sin id añadido', () => {
  assert.deepEqual(productsDataset.tables[0]?.columns.map(({name, type}) => [name, type]), [['nombre', 'text'], ['categoria', 'text'], ['precio', 'integer']]);
  assert.deepEqual(productsDataset.tables[0]?.rows, expectedRows);
  const manifest = getDatasetManifest(reference);
  assert.ok(manifest);
  assert.equal('rows' in manifest.tables[0], false);
  assert.deepEqual(manifest.reference, reference);
});

test('materializar el dataset histórico SQLite prepara parámetros y conserva sus tres productos', async () => {
  const materialized = await createDatasetAdapter().materialize(reference, 'sqlite-wasm', signal());
  const seed = JSON.parse(materialized.bootstrap) as SqlSeed;
  assert.equal(seed.format, 'alldoc/sql-seed@1');
  const db = new DatabaseSync(':memory:');
  try {
    for (const statement of seed.statements) db.prepare(statement.sql).run(...statement.parameters);
    const result=db.prepare('SELECT nombre,categoria,precio FROM productos').all();
    assert.deepEqual(result.map(row=>expectedColumns.map(c=>row[c])),expectedRows);
    assert.equal(db.prepare('SELECT typeof(precio) AS tipo FROM productos LIMIT 1').get()?.tipo, 'integer');
    assert.deepEqual(materialized.schema.entities[0].columns.map(({name}) => name), expectedColumns);
    assert.equal(materialized.schema.entities[0].kind, 'table');
  } finally {db.close();}
});

test('los valores con comillas o SQL se enlazan como datos, sin interpolarlos en sentencias', () => {
  const name = "O'Reilly'); DROP TABLE productos; --";
  const dataset = {...productsDataset, tables: [{...productsDataset.tables[0], rows: [[name, 'Accesorios', 10]]}]};
  const seed = sqlSeedFor(dataset);
  assert.equal(seed.statements.some(({sql}) => sql.includes(name)), false);
  const db = new DatabaseSync(':memory:');
  try {
    for (const statement of seed.statements) db.prepare(statement.sql).run(...statement.parameters);
    assert.equal(db.prepare('SELECT nombre FROM productos').get()?.nombre, name);
  } finally {db.close();}
});

test('Python recibe el mismo JSON tipado y cada materialización tiene su propia copia', async () => {
  const adapter = createDatasetAdapter();
  const first = await adapter.materialize(reference, 'pyodide', signal());
  const second = await adapter.materialize(reference, 'pyodide', signal());
  assert.equal(first.schema.entities[0].name, 'productos');
  assert.equal(first.schema.entities[0].kind, 'dataframe');
  const data = JSON.parse(new TextDecoder().decode(first.files[0].bytes));
  assert.deepEqual(data, {columns: expectedColumns, data: expectedRows});
  first.files[0].bytes[0] = 0;
  assert.deepEqual(JSON.parse(new TextDecoder().decode(second.files[0].bytes)).data, expectedRows);
  assert.deepEqual(productsDataset.tables[0].rows, expectedRows);
  assert.match(first.bootstrap, /pd\.DataFrame/);
});

test('dataset y runtime desconocidos o una operación abortada no preparan otro entorno por defecto', async () => {
  const adapter = createDatasetAdapter();
  await assert.rejects(adapter.materialize({...reference, version: 2}, 'pyodide', signal()), /dataset/i);
  await assert.rejects(adapter.materialize(reference, 'rust', signal()), /runtime/i);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(adapter.materialize(reference, 'pyodide', controller.signal), {name: 'AbortError'});
});

test('DataFrame está publicado bajo Pandas, con búsqueda propia y un único ejemplo breve', async () => {
  const id = 'analisis-de-datos/pandas/dataframe';
  const metadata = getConcept(id); assert.ok(metadata, 'El concepto DataFrame debe existir');
  assert.equal(metadata.slug, '/apuntes/' + id);
  const note = getPandasConcept(id); assert.ok(note, 'La ficha pandas debe existir');
  assert.equal(note.examples.length, 1);
  assert.equal(note.examples[0].id, 'pandas/dataframe/productos');
  assert.equal(note.examples[0].code.split('\n').length <= 10, true);
  assert.deepEqual(note.examples[0].output.columns, expectedColumns);
  assert.deepEqual(note.examples[0].output.rows, expectedRows.map((row) => row.map(String)));
  assert.deepEqual(note.examples[0].output.rowLabels, ['0', '1', '2']);
  assert.equal(countConcepts(catalog[0].items), 106);
  assert.equal(concepts.filter(({topicId}) => topicId === 'sql').length, 105);
  assert.equal(searchEntries(entries, 'crear una tabla con pandas')[0]?.id, id);
  assert.match(await readFile('docs/' + id + '.mdx', 'utf8'), /PandasConceptCard/);
});

test('las cinco rutas históricas conservan su identidad y ejemplos al revisar el contenido; el snapshot original sigue disponible', async () => {
  const before = JSON.parse(await readFile('specs/verification/practice-point-2-before.json', 'utf8'));
  assert.deepEqual(before.sqlTable.rows,productsDataset.tables[0].rows.map(row=>row.map(String)));
  for(const previous of before.sqlConcepts){const current=getSqlConcept(previous.conceptId);assert.ok(current);assert.equal(current.slug,previous.slug);for(const e of previous.examples)assert.ok(current.examples.some(example=>example.title===e.title));}
});

test('anterior y siguiente permanecen dentro de la misma herramienta', async () => {
  for (const [id, previous, next] of [
    ['analisis-de-datos/sql/select', null, 'analisis-de-datos/sql/select/todas-las-columnas'],
    ['analisis-de-datos/sql/comentarios', 'analisis-de-datos/sql/select/alias', 'analisis-de-datos/sql/limit'],
    ['analisis-de-datos/pandas/dataframe', null, null],
  ] as const) {
    const result = await parseConceptFrontMatter({filePath: path.resolve('docs', id + '.mdx'), fileContent: '',
      defaultParseFrontMatter: async () => ({content: '', frontMatter: {}})});
    assert.equal(result.frontMatter.pagination_prev, previous);
    assert.equal(result.frontMatter.pagination_next, next);
  }
  const explicit = await parseConceptFrontMatter({filePath: path.resolve('docs/analisis-de-datos/sql/where.mdx'), fileContent: '',
    defaultParseFrontMatter: async () => ({content: '', frontMatter: {pagination_prev: null, pagination_next: null}})});
  assert.equal(explicit.frontMatter.pagination_prev, null);
  assert.equal(explicit.frontMatter.pagination_next, null);
});
