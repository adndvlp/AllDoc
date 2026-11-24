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

const prefix = '/apuntes/analisis-de-datos/seaborn/';

test('Seaborn publica 163 fichas buscables en 24 grupos contraídos', () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'seaborn');
  assert.equal(topic?.sections?.length, 24);
  assert.equal(topic.concepts.length, 163);
  assert.ok(topic.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  assert.ok(searchEntries(entries, 'lowess').some(entry => entry.href === prefix + 'regresion/logistic-lowess-y-robust'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-seaborn-notes.mjs', '--check'], {encoding: 'utf8'}), /163 fichas/);
});

test('Seaborn prepara su propia sesión con gráficos, datos descargables y dependencias estadísticas', async () => {
  const context = resolvePracticeContext(prefix + 'introduccion/definicion');
  const regression = resolvePracticeContext(prefix + 'regresion/logistic-lowess-y-robust');
  assert.ok(context && regression);
  assert.equal(context.profile.id, 'python-seaborn');
  assert.equal(context.profile.capabilities.figures, true);
  assert.equal(context.workspaceKey, regression.workspaceKey);
  assert.notEqual(context.workspaceKey, resolvePracticeContext('/apuntes/analisis-de-datos/matplotlib/fundamentos/definicion')?.workspaceKey);
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.equal(workspace.files[0].content, 'sns.scatterplot(data=ventas, x="inversion", y="ingresos")');
  assert.deepEqual(schema.entities.map(({name, rowCount}) => [name, rowCount]), [
    ['ventas', 16], ['diarias', 4], ['matriz', 2], ['simulacion', 800],
  ]);
  const dataset = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/seaborn/datos.py', 'utf8'));
  assert.deepEqual(getPythonAdditionalPackages(context.profile.id), ['seaborn']);
  for (const name of ['matplotlib', 'scipy', 'statsmodels', 'patsy', 'seaborn']) {
    assert.ok(environment.packages.some(pkg => pkg.name.toLowerCase() === name));
    assert.ok(!getPythonEnvironment('python-pandas').packages.some(pkg => pkg.name.toLowerCase() === name));
  }
  for (const name of ['seaborn', 'statsmodels']) {
    assert.ok(!getPythonEnvironment('python-matplotlib').packages.some(pkg => pkg.name === name));
  }
});
