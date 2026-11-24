import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';

const prefix = '/apuntes/analisis-de-datos/pandas/';

test('el Markdown, los módulos, las rutas y los datos descargables coinciden', () => {
  assert.match(execFileSync(process.execPath, ['scripts/prepare-pandas-notes.mjs', '--check'], {encoding: 'utf8'}), /224 fichas/);
});

test('pandas publica el temario importado en el orden del Markdown y conserva el DataFrame original', async () => {
  const pandas = getTopics('analisis-de-datos').find(topic => topic.id === 'pandas')!;
  assert.equal(pandas.sections?.length, 33);
  assert.equal(pandas.concepts.length, 225);
  assert.deepEqual(pandas.sections?.slice(0, 5).map(({label}) => label), [
    'Series y DataFrame', 'Inspección', 'Importar datos', 'Selección de datos', 'Filtros',
  ]);
  for (const group of pandas.sections!) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const note of group.concepts) {
      assert.ok(entries.some(entry => entry.id === note.id && entry.href === note.slug));
      assert.match(await readFile(`docs/${note.docId ?? note.id}.mdx`, 'utf8'), /Pandas(?:Concept|Course)Card/);
    }
  }
  assert.ok(entries.some(entry => entry.href === prefix + 'dataframe'));
  assert.ok(entries.find(entry => entry.href === prefix + 'seleccion-de-datos/loc')?.keywords.includes('loc'));
});

test('las fichas importadas comparten datos y borradores entre sí, con identidad distinta del ejercicio inicial', async () => {
  const legacy = resolvePracticeContext(prefix + 'dataframe')!;
  const select = resolvePracticeContext(prefix + 'seleccion-de-datos/loc');
  const merge = resolvePracticeContext(prefix + 'merge-y-relaciones/definicion');
  assert.ok(select && merge);
  assert.equal(select.workspaceKey, merge.workspaceKey);
  assert.notEqual(select.workspaceKey, legacy.workspaceKey);
  assert.deepEqual(legacy.profile.defaultDataset, {id: 'productos-basico', version: 1});
  const {workspace, schema} = await editorBootstrap(select);
  assert.equal(workspace.id, select.workspaceKey);
  assert.deepEqual(schema.entities.map(entity => [entity.name, entity.rowCount]), [
    ['clientes', 5], ['pedidos', 7], ['productos', 4], ['detalle', 9], ['leads', 5],
  ]);
  const materialized = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.deepEqual(materialized.schema, schema);
  assert.match(materialized.bootstrap, /diario = pd.Series/);
});
