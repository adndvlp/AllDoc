import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {getTopics} from '../src/content/catalog.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {searchEntries} from '../src/lib/search.ts';

const prefix = '/apuntes/analisis-de-datos/numpy/';

test('NumPy publica las 198 fichas y sus 31 grupos contraídos con búsqueda', async () => {
  const numpy = getTopics('analisis-de-datos').find(topic => topic.id === 'numpy');
  assert.equal(numpy?.sections?.length, 31);
  assert.equal(numpy.concepts.length, 198);
  assert.equal(numpy.sections[0].label, 'ndarray y fundamentos');
  assert.equal(numpy.sections.at(-1)?.label, 'Rendimiento y validación');
  const indexed = new Map(entries.map(entry => [entry.id, entry]));
  for (const group of numpy.sections) {
    assert.equal(group.collapsed, true);
    assert.equal(group.concepts[0].label, 'Definición');
    for (const concept of group.concepts) {
      assert.equal(indexed.get(concept.id)?.href, concept.slug);
      assert.match(await readFile(`docs/${concept.id}.mdx`, 'utf8'), /NumpyCourseCard/);
    }
  }
  assert.ok(searchEntries(entries, 'inspeccionar la matriz de ventas')
    .some(entry => entry.href === prefix + 'ndarray-y-fundamentos/shape-ndim-y-size'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-numpy-notes.mjs', '--check'], {encoding: 'utf8'}), /198 fichas/);
});

test('NumPy comparte datos y borradores entre fichas con un entorno distinto de json y pandas', async () => {
  const fundamentals = resolvePracticeContext(prefix + 'ndarray-y-fundamentos/definicion');
  const shape = resolvePracticeContext(prefix + 'ndarray-y-fundamentos/shape-ndim-y-size');
  assert.ok(fundamentals && shape);
  assert.equal(fundamentals.profile.id, 'python-numpy');
  assert.equal(fundamentals.workspaceKey, shape.workspaceKey);
  for (const route of ['/apuntes/analisis-de-datos/json/formato-json/definicion', '/apuntes/analisis-de-datos/pandas/dataframe']) {
    assert.notEqual(fundamentals.workspaceKey, resolvePracticeContext(route)?.workspaceKey);
  }
  const {workspace, schema} = await editorBootstrap(shape);
  assert.equal(workspace.files[0].content, 'print(ventas.shape, ventas.ndim, ventas.size)');
  assert.equal(schema.entities.length, 12);
  const sales = schema.entities.find(entity => entity.name === 'ventas');
  assert.equal(sales?.rowCount, 3);
  assert.deepEqual(sales.columns.map(column => column.name), ['T1', 'T2', 'T3', 'T4']);
  const signal = new AbortController().signal;
  const adapter = createDatasetAdapter();
  const dataset = await adapter.materialize(workspace.dataset, 'pyodide', signal);
  assert.deepEqual(dataset.schema, schema);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/numpy/datos.py', 'utf8'));
  await assert.rejects(adapter.materialize(workspace.dataset, 'sqlite-wasm', signal), /requieren Python/);
});
