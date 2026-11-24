import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';

const prefix = '/apuntes/analisis-de-datos/json/';

test('json publica los 15 grupos contraídos y sus 90 fichas con rutas y búsqueda', async () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'json');
  assert.equal(topic?.sections?.length, 15);
  assert.equal(topic?.concepts.length, 90);
  assert.equal(topic?.sections?.at(0)?.label, 'Formato JSON');
  assert.equal(topic?.sections?.at(-1)?.label, 'Conversión entre formatos');
  for (const group of topic!.sections!) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.ok(entries.some(entry => entry.id === note.id && entry.href === note.slug));
      assert.match(await readFile(`docs/${note.id}.mdx`, 'utf8'), /JsonCourseCard/);
    }
  }
  const load = entries.find(entry => entry.href === prefix + 'deserializacion/load');
  assert.ok(load?.keywords.includes('abrir archivo JSON'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-json-notes.mjs', '--check'], {encoding: 'utf8'}), /90 fichas/);
});

test('json comparte la sesión entre fichas, conserva un borrador propio y prepara pedidos para Python', async () => {
  const format = resolvePracticeContext(prefix + 'formato-json/definicion');
  const load = resolvePracticeContext(prefix + 'deserializacion/load');
  const pandas = resolvePracticeContext('/apuntes/analisis-de-datos/pandas/dataframe');
  assert.ok(format && load && pandas);
  assert.equal(format.profile.id, 'python-json');
  assert.equal(format.workspaceKey, load.workspaceKey);
  assert.notEqual(format.workspaceKey, pandas.workspaceKey);
  const {workspace, schema} = await editorBootstrap(format);
  assert.equal(workspace.activeFile, 'main.py');
  assert.match(workspace.files[0].content, /json\.loads\(texto\)/);
  assert.deepEqual(schema.entities.map(({name, kind}) => [name, kind]), [['pedidos', 'variable'], ['resumen', 'variable']]);
  const adapter = createDatasetAdapter();
  const signal = new AbortController().signal;
  const dataset = await adapter.materialize(workspace.dataset, 'pyodide', signal);
  assert.deepEqual(dataset.schema, schema);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/json/datos.py', 'utf8'));
  await assert.rejects(adapter.materialize(workspace.dataset, 'sqlite-wasm', signal), /requieren Python/);
});
