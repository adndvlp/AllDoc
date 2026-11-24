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

const prefix = '/apuntes/analisis-de-datos/scipy/';

test('SciPy publica 178 fichas buscables en 32 grupos contraídos', () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'scipy');
  assert.equal(topic?.sections?.length, 32);
  assert.equal(topic.concepts.length, 178);
  assert.equal(topic.sections[0].label, 'SciPy y entorno');
  assert.ok(topic.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  assert.ok(searchEntries(entries, 'matrix market').some(entry => entry.href === prefix + 'io/matrix-market'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-scipy-notes.mjs', '--check'], {encoding: 'utf8'}), /178 fichas/);
});

test('SciPy comparte borrador entre fichas y carga un dataset propio descargable', async () => {
  const context = resolvePracticeContext(prefix + 'entorno/definicion');
  const axis = resolvePracticeContext(prefix + 'entorno/axis');
  assert.ok(context && axis);
  assert.equal(context.profile.id, 'python-scipy');
  assert.equal(context.workspaceKey, axis.workspaceKey);
  const numpy = resolvePracticeContext('/apuntes/analisis-de-datos/numpy/ndarray-y-fundamentos/shape-ndim-y-size');
  assert.ok(numpy);
  assert.notEqual(context.workspaceKey, numpy.workspaceKey);
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.equal(workspace.files[0].content, 'from scipy import stats\nprint(round(stats.describe(ventas).mean, 2))');
  assert.deepEqual(workspace.dataset, {id: 'scipy-negocio', version: 1});
  assert.deepEqual(schema.entities.map(entity => entity.name), [
    'ventas', 'ventas_nan', 'canal_a', 'canal_b', 'antes', 'despues', 'canal_c',
    'publicidad', 'ingresos', 'matriz', 'conversiones',
  ]);
  const dataset = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/scipy/datos.py', 'utf8'));
  assert.ok(environment.packages.some(pkg => pkg.name === 'scipy'));
  assert.ok(!environment.packages.some(pkg => pkg.name === 'openpyxl'));
  assert.deepEqual(getPythonAdditionalPackages(context.profile.id), ['scipy']);
  assert.deepEqual(getPythonAdditionalPackages('python-openpyxl'), ['openpyxl']);
  for (const id of ['python-pandas', 'python-numpy', 'python-openpyxl']) {
    assert.ok(!getPythonEnvironment(id).packages.some(pkg => pkg.name === 'scipy'), id);
    assert.ok(!getPythonAdditionalPackages(id).includes('scipy'), id);
  }
});
