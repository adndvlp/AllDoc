import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';

const prefix = '/apuntes/analisis-de-datos/sqlite3/';

test('sqlite3 publica 133 fichas en 21 grupos contraídos con rutas y búsqueda', async () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'sqlite3');
  assert.equal(topic?.sections?.length, 21);
  assert.equal(topic.concepts.length, 133);
  assert.equal(topic.sections[0].label, 'Conexión a SQLite');
  const indexed = new Map(entries.map(entry => [entry.id, entry]));
  for (const group of topic.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.equal(indexed.get(note.id)?.href, note.slug);
      assert.match(await readFile(`docs/${note.id}.mdx`, 'utf8'), /Sqlite3CourseCard/);
    }
  }
  assert.ok(searchEntries(entries, 'sqlite3 conectar base de datos')
    .some(entry => entry.href === prefix + 'conexion-a-sqlite/definicion'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-sqlite3-notes.mjs', '--check'], {encoding: 'utf8'}), /133 fichas/);
});

test('sqlite3 usa Python con una base de tienda y separa sus borradores de SQL', async () => {
  const connection = resolvePracticeContext(prefix + 'conexion-a-sqlite/definicion');
  const cursor = resolvePracticeContext(prefix + 'conexion-a-sqlite/connection-y-cursor');
  const sql = resolvePracticeContext('/apuntes/analisis-de-datos/sql/select');
  assert.ok(connection && cursor && sql);
  assert.equal(connection.profile.id, 'python-sqlite3');
  assert.equal(connection.workspaceKey, cursor.workspaceKey);
  assert.notEqual(connection.workspaceKey, sql.workspaceKey);
  const {workspace, schema} = await editorBootstrap(connection);
  assert.equal(workspace.activeFile, 'main.py');
  assert.match(workspace.files[0].content, /SELECT nombre FROM clientes/);
  assert.deepEqual(schema.entities.map(({name, rowCount}) => [name, rowCount]), [
    ['clientes', 4], ['pedidos', 5], ['contactos', 4],
  ]);
  const signal = new AbortController().signal;
  const adapter = createDatasetAdapter();
  const dataset = await adapter.materialize(workspace.dataset, 'pyodide', signal);
  assert.deepEqual(dataset.schema, schema);
  assert.match(dataset.bootstrap, /\ncon = abrir_demo\(\)$/);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/sqlite3/datos.py', 'utf8'));
  await assert.rejects(adapter.materialize(workspace.dataset, 'sqlite-wasm', signal), /requieren Python/);
});
