import {test} from 'node:test';
import assert from 'node:assert/strict';
import type {CompletionRequest, RuntimeEvent} from '../src/practice/contracts.ts';
import {isRuntimeEvent, isCompletionResult} from '../src/practice/protocol.ts';

const identity = {protocolVersion: 1 as const, runId: 'run-1', generation: 2, revision: 3};
const table: RuntimeEvent = {...identity, type: 'table', truncated: false,
  columns: [{name: 'nombre', type: 'text'}, {name: 'precio', type: 'integer'}], rows: [['Teclado', 500], ['', null]]};

test('el protocolo acepta eventos de ambos motores sin handles o clases del runtime', () => {
  const events: RuntimeEvent[] = [table, {...identity, type: 'progress', phase: 'Preparando datos'},
    {...identity, type: 'stream', channel: 'stderr', text: '<script>texto, no HTML</script>'},
    {...identity, type: 'error', message: 'Error de sintaxis', file: 'main.py', line: 1, column: 2},
    {...identity, type: 'end', status: 'cancelled', environmentReset: true}];
  for (const event of events) assert.equal(isRuntimeEvent(event, identity), true, event.type);
});

test('versiones, tipos desconocidos, identidades ausentes y respuestas de otro contexto se rechazan', () => {
  for (const event of [null, [], 'error', {...table, protocolVersion: 2}, {...table, type: 'figure'},
    {...table, runId: ''}, {...table, generation: -1}, {...table, revision: Infinity}, {...table, revision: 0.5}]) {
    assert.equal(isRuntimeEvent(event), false);
  }
  for (const expected of [{...identity, runId: 'run-viejo'}, {...identity, generation: 1}, {...identity, revision: 4}]) {
    assert.equal(isRuntimeEvent(table, expected), false);
  }
});

test('columnas y valores coinciden sin confundir null, vacío, booleanos o enteros grandes', () => {
  const event: RuntimeEvent = {...table,
    columns: [{name: 'a', type: 'text'}, {name: 'a', type: 'boolean'}, {name: 'cantidad', type: 'bigint'}, {name: 'importe', type: 'decimal'}],
    rows: [['', false, '9007199254740993', '12.50'], [null, true, '-123', '-0.01']]};
  assert.equal(isRuntimeEvent(event), true);
  for (const bad of [
    {...table, rows: [['Teclado']]}, {...table, rows: [['Teclado', '500']]},
    {...table, rows: [['Teclado', NaN]]}, {...table, rows: [['Teclado', 2 ** 53]]},
    {...table, rows: [[{nombre: 'Teclado'}, 500]]}, {...table, columns: [{name: 'x', type: 'objeto'}]},
    {...event, rows: [['a', false, 9007199254740992, '12.50']]},
  ]) assert.equal(isRuntimeEvent(bad), false);
});

test('el protocolo limita tablas y exige estados finales y localizaciones de error válidos', () => {
  assert.equal(isRuntimeEvent({...table, rows: Array.from({length: 201}, () => ['Mouse', 250])}), false);
  for (const bad of [
    {...identity, type: 'end', status: 'success'},
    {...identity, type: 'end', status: 'listo', environmentReset: false},
    {...identity, type: 'error', message: 'error', line: 0},
    {...identity, type: 'stream', channel: 'console', text: 'hola'},
  ]) assert.equal(isRuntimeEvent(bad), false);
});

test('arrays dispersos no se aceptan como filas, columnas o sugerencias completas', () => {
  for (const bad of [{...table, rows: [Array(2)]}, {...table, rows: Array(1)}, {...table, columns: Array(2)}]) {
    assert.equal(isRuntimeEvent(bad), false);
  }
  assert.equal(isCompletionResult({...completion, items: Array(1)}, request), false);
});

const request: CompletionRequest = {requestId: 'completion-1', workspaceId: 'workspace-1', generation: 2,
  revision: 3, file: 'main.py', document: '😀 productos["pre', position: 17, schema: {version: 0, entities: []}};
const completion = {requestId: request.requestId, workspaceId: request.workspaceId, file: request.file,
  generation: 2, revision: 3, from: 14, to: 17, items: [{label: 'precio', insertText: 'precio', detail: 'entero'}]};

test('sugerencias validadas por archivo, workspace, revisión y offsets UTF-16 del documento', () => {
  assert.equal(request.document.length, 17);
  assert.equal(isCompletionResult(completion, request), true);
  for (const change of [{requestId: 'otro'}, {workspaceId: 'otro'}, {file: 'otra.py'}, {revision: 2}, {generation: 1},
    {from: -1}, {to: 18}, {from: 18, to: 14}, {to: 16}, {items: [{label: 'a', insertText: 123}]}]) {
    assert.equal(isCompletionResult({...completion, ...change}, request), false);
  }
  assert.equal(isCompletionResult(completion, {...request, position: 18}), false);
  for (const key of ['requestId', 'workspaceId', 'file'] as const) {
    assert.equal(isCompletionResult({...completion, [key]: ''}, {...request, [key]: ''}), false);
  }
});
