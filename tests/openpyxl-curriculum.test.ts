import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {getTopics} from '../src/content/catalog.ts';
import {searchEntries} from '../src/lib/search.ts';
import {entries} from '../src/content/search-index.ts';
import {resolvePracticeContext} from '../src/practice/context.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {isRuntimeEvent} from '../src/practice/protocol.ts';

const prefix = '/apuntes/analisis-de-datos/openpyxl/';

test('openpyxl publica las 172 fichas en 27 grupos contraídos con búsqueda', () => {
  const topic = getTopics('analisis-de-datos').find(topic => topic.id === 'openpyxl');
  assert.equal(topic?.sections?.length, 27);
  assert.equal(topic.concepts.length, 172);
  assert.ok(topic.sections.every(group => group.collapsed && group.concepts[0].label === 'Definición'));
  assert.ok(searchEntries(entries, 'abrir archivo excel').some(entry => entry.href === prefix + 'workbook/load-workbook'));
  assert.match(execFileSync(process.execPath, ['scripts/prepare-openpyxl-notes.mjs', '--check'], {encoding: 'utf8'}), /172 fichas/);
});

test('openpyxl prepara el mismo libro entre fichas y lo aísla del editor de pandas', async () => {
  const context = resolvePracticeContext(prefix + 'workbook/load-workbook');
  const save = resolvePracticeContext(prefix + 'workbook/guardar-y-cerrar');
  assert.ok(context && save);
  assert.equal(context.profile.id, 'python-openpyxl');
  assert.equal(context.workspaceKey, save.workspaceKey);
  assert.notEqual(context.workspaceKey, resolvePracticeContext('/apuntes/analisis-de-datos/pandas/dataframe')?.workspaceKey);
  const {workspace, schema, environment} = await editorBootstrap(context);
  assert.match(workspace.files[0].content, /load_workbook\('ventas_base.xlsx'\)/);
  assert.deepEqual(schema.entities.map(entity => entity.name), ['Ventas', 'Resumen']);
  assert.ok(environment.packages.some(pkg => pkg.name === 'openpyxl'));
  const dataset = await createDatasetAdapter().materialize(workspace.dataset, 'pyodide', new AbortController().signal);
  assert.match(dataset.bootstrap, /wb.save\("ventas_base.xlsx"\)/);
});

test('el protocolo admite libros pequeños con rutas relativas y rechaza salidas binarias inválidas', () => {
  const file = {type: 'file', protocolVersion: 1, runId: 'run-1', generation: 1, revision: 0,
    path: 'salida/ventas.xlsx', bytes: new Uint8Array([80, 75, 3, 4, 1])};
  assert.ok(isRuntimeEvent(file));
  for (const path of ['../ventas.xlsx', '/ventas.xlsx', 'salida/../ventas.xlsx', 'salida\\ventas.xlsx', 'ventas.html']) {
    assert.equal(isRuntimeEvent({...file, path}), false, path);
  }
  assert.equal(isRuntimeEvent({...file, bytes: new Uint8Array(5)}), false);
  const oversized = new Uint8Array(1_048_577);
  oversized.set(file.bytes);
  assert.equal(isRuntimeEvent({...file, bytes: oversized}), false);
});
