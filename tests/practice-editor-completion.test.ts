import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EditorState} from '@codemirror/state';
import {CompletionContext} from '@codemirror/autocomplete';
import {createEditorCompletionSource} from '../src/practice/editor-completion.ts';
import {deferred} from './fixtures/practice-session.ts';
import type {CompletionResult} from '../src/practice/contracts.ts';

const result: CompletionResult = {requestId: 'one', generation: 1, workspaceId: 'pandas', revision: 1, file: 'main.py',
  from: 3, to: 5, items: [{label: 'DataFrame', insertText: 'DataFrame', detail: 'class'}]};
const context = (doc = 'pd.Da') => new CompletionContext(EditorState.create({doc}), doc.length, true);
test('editor semántico: adapta datos del proveedor al menú, con documento, posición y cancelación', async () => {
  let received: unknown;
  const source = createEditorCompletionSource(async (document, position, signal) => {received = {document, position, aborted: signal.aborted}; return result;});
  const value = await source(context());
  assert.deepEqual(received, {document: 'pd.Da', position: 5, aborted: false});
  assert.equal(value?.from, 3); assert.equal(value?.to, 5);
  assert.equal(value?.options[0].label, 'DataFrame'); assert.equal(value?.options[0].apply, 'DataFrame');
});
test('editor semántico: respuestas tardías de otro documento no reemplazan la sugerencia actual', async () => {
  const first = deferred<CompletionResult>(); let original: AbortSignal | undefined;
  const source = createEditorCompletionSource(async (document, _position, signal) => {
    if (document === 'pd.Da') {original = signal; return first.promise;}
    return {...result, from: 3, to: 6, items: [{label: 'DataFrame', insertText: 'DataFrame'}]};
  });
  const pending = source(context()); const current = await source(context('pd.Dat'));
  assert.equal(original?.aborted, true); assert.equal(current?.from, 3);
  first.resolve(result); assert.equal(await pending, null);
});
test('editor semántico: errores del análisis permiten seguir escribiendo sin sugerencias inventadas', async () => {
  const source = createEditorCompletionSource(async () => {throw new Error('Proveedor ocupado');});
  assert.equal(await source(context()), null);
});
