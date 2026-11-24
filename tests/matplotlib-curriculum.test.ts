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
import {eventBytes, isRuntimeEvent} from '../src/practice/protocol.ts';

const prefix = '/apuntes/analisis-de-datos/matplotlib/';

test('Matplotlib publica 131 fichas buscables en 25 grupos contraídos', () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'matplotlib');
  assert.equal(topic?.sections?.length, 25);
  assert.equal(topic.concepts.length, 131);
  assert.ok(topic.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  assert.ok(searchEntries(entries, 'savefig').some(entry => entry.href === prefix + 'exportacion/definicion'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-matplotlib-notes.mjs', '--check'], {encoding: 'utf8'}), /131 fichas/);
});

test('Matplotlib activa gráficas y carga su propio dataset descargable', async () => {
  const context = resolvePracticeContext(prefix + 'fundamentos/definicion');
  const exportacion = resolvePracticeContext(prefix + 'exportacion/definicion');
  assert.ok(context && exportacion);
  assert.equal(context.profile.id, 'python-matplotlib');
  assert.equal(context.profile.capabilities.figures, true);
  assert.equal(context.workspaceKey, exportacion.workspaceKey);
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.equal(workspace.files[0].content, 'plt.plot(meses, ventas)\nplt.show()');
  assert.deepEqual(schema.entities.slice(0, 2).map(({name, rowCount}) => [name, rowCount]), [['df', 6], ['transacciones', 6]]);
  const dataset = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.equal(dataset.bootstrap + '\n', await readFile('static/practice/matplotlib/datos.py', 'utf8'));
  assert.deepEqual(getPythonAdditionalPackages(context.profile.id), ['matplotlib']);
  for (const name of ['matplotlib', 'pillow', 'fonttools']) {
    assert.ok(environment.packages.some(pkg => pkg.name.toLowerCase() === name));
    assert.ok(!getPythonEnvironment('python-pandas').packages.some(pkg => pkg.name.toLowerCase() === name));
  }
});

test('protocolo valida PNG acotados y exportaciones de Matplotlib como datos binarios', () => {
  const identity = {protocolVersion: 1, runId: 'chart', generation: 1, revision: 0};
  const png = new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,2,128,0,0,1,224]);
  const figure = {...identity, type: 'figure', title: 'Ventas', bytes: png};
  assert.ok(isRuntimeEvent(figure));
  assert.ok(eventBytes(figure, new TextEncoder()) < JSON.stringify(figure).length);
  const oversized = png.slice();
  oversized[18] = 32;
  assert.equal(isRuntimeEvent({...figure, bytes: oversized}), false);
  assert.equal(isRuntimeEvent({...figure, bytes: new Uint8Array(100)}), false);
  const pdf = new TextEncoder().encode('%PDF-1.4\n');
  assert.ok(isRuntimeEvent({...identity, type: 'file', path: 'salidas_matplotlib/ventas.pdf', bytes: pdf}));
  assert.equal(isRuntimeEvent({...identity, type: 'file', path: '../ventas.pdf', bytes: pdf}), false);
  assert.equal(isRuntimeEvent({...identity, type: 'file', path: 'ventas.html', bytes: pdf}), false);
});
