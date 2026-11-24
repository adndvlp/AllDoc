import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {getPythonAdditionalPackages, getPythonEnvironment} from '../src/practice/adapters/python/environment.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';

const prefix = '/apuntes/analisis-de-datos/sqlalchemy/';

test('SQLAlchemy publica 235 fichas buscables en 36 grupos contraídos', () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'sqlalchemy');
  assert.equal(topic?.sections?.length, 36);
  assert.equal(topic.concepts.length, 235);
  assert.equal(topic.sections[0].label, 'SQLAlchemy y su arquitectura');
  assert.ok(topic.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  assert.ok(searchEntries(entries, 'autogenerate').some(entry => entry.href === prefix + 'alembic/revision-y-autogenerate'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-sqlalchemy-notes.mjs', '--check'], {encoding: 'utf8'}), /235 fichas/);
});

test('SQLAlchemy comparte borrador entre Core y ORM y carga su propia base SQLite', async () => {
  const context = resolvePracticeContext(prefix + 'sqlalchemy-arquitectura/definicion');
  const orm = resolvePracticeContext(prefix + 'orm-modelos/definicion');
  assert.ok(context && orm);
  assert.equal(context.profile.id, 'python-sqlalchemy');
  assert.equal(context.workspaceKey, orm.workspaceKey);
  const sqlite3 = resolvePracticeContext('/apuntes/analisis-de-datos/sqlite3/conexion-a-sqlite/definicion');
  assert.ok(sqlite3);
  assert.notEqual(context.workspaceKey, sqlite3.workspaceKey);
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.equal(workspace.files[0].content, 'valor(text("SELECT COUNT(*) FROM pedidos"))');
  assert.deepEqual(workspace.dataset, {id: 'sqlalchemy-ventas', version: 1});
  assert.deepEqual(schema.entities.map(({name, rowCount}) => [name, rowCount]), [
    ['clientes', 5], ['pedidos', 7], ['productos', 3], ['detalles', 5],
  ]);
  const dataset = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/sqlalchemy/datos.py', 'utf8'));
  assert.match(dataset.bootstrap, /class Pedido\(Base\):/);
  assert.deepEqual(getPythonAdditionalPackages(context.profile.id), ['sqlalchemy']);
  for (const name of ['sqlalchemy', 'typing-extensions']) {
    assert.ok(environment.packages.some(pkg => pkg.name === name));
    assert.ok(!getPythonEnvironment('python-pandas').packages.some(pkg => pkg.name === name));
  }
});
