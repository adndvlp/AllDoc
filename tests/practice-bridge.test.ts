import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isBridgeReply, isBridgeRequest, isRunRequest, isRuntimeContext, isRuntimeSchema} from '../src/practice/isolation/messages.ts';
import {context, environment, workspace} from './fixtures/practice-session.ts';

test('puente: identidad, sesión, tipos y revisión se validan antes de cruzar la frontera', () => {
  const request = {runId: 'run-1', generation: 1, workspaceId: 'workspace', revision: 4,
    files: [{path: 'consulta.sql', content: 'SELECT 1;', languageId: 'sql'}], entryFile: 'consulta.sql'};
  assert.equal(isRunRequest(request), true);
  assert.equal(isRunRequest({...request, revision: -1}), false);
  assert.equal(isRunRequest({...request, entryFile: 'falta.sql'}), false);
  assert.equal(isRunRequest({...request, selection: {from: 0, to: 99}}), false);
  assert.equal(isBridgeRequest({version: 1, session: 'session', id: 1, command: 'run', payload: request}, 'session'), true);
  assert.equal(isBridgeRequest({version: 1, session: 'otra', id: 1, command: 'run', payload: request}, 'session'), false);
  assert.equal(isBridgeRequest({version: 1, session: 'session', id: 1, command: 'eval', payload: 'alert(1)'}, 'session'), false);
  assert.equal(isBridgeReply({version: 1, session: 'session', id: 1, kind: 'failure', message: 'falló'}, 'session'), true);
  assert.equal(isBridgeReply({version: 2, session: 'session', id: 1, kind: 'result'}, 'session'), false);
});

test('puente: contexto SQL y esquema serializables, con límites y tipos completos', () => {
  const value = {profile: context().profile, environment: {...environment, runtime: {id: 'sqlite-wasm', version: 'test'}}, dataset: {reference: workspace().dataset, files: [], bootstrap: '{}', schema: {version: 0, entities: []}}};
  assert.equal(isRuntimeContext(value), true);
  assert.equal(isRuntimeContext({...value, profile: {...value.profile, runtimeId: 'otro'}}), false);
  assert.equal(isRuntimeContext({...value, dataset: {...value.dataset, files: [{path: '../x', bytes: new Uint8Array()}]}}), false);
  const schema = {version: 1, entities: [{name: 'productos', kind: 'table', columns: [{name: 'precio', type: 'integer'}], rowCount: 3}]};
  assert.equal(isRuntimeSchema(schema), true);
  assert.equal(isRuntimeSchema({...schema, entities: [{...schema.entities[0], columns: [{name: 'x', type: 'html'}]}]}), false);
});
