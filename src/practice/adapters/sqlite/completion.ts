import {EditorState} from '@codemirror/state';
import {CompletionContext, type CompletionSource} from '@codemirror/autocomplete';
import {editorLanguage} from '../../editor-language.ts';
import type {CompletionAdapter} from '../../contracts.ts';

export function createSQLCompletion(): CompletionAdapter {
  return {
    async complete(request, signal) {
      signal.throwIfAborted();
      if (!Number.isSafeInteger(request.position) || request.position < 0 || request.position > request.document.length) throw new Error('Posición de sugerencia inválida');
      const state = EditorState.create({doc: request.document, extensions: [await editorLanguage('sql', request.schema)]});
      const context = new CompletionContext(state, request.position, true);
      const results = await Promise.all(state.languageDataAt<CompletionSource>('autocomplete', request.position).map((source) => source(context)));
      signal.throwIfAborted();
      const result = results.find((entry) => entry?.options.length);
      return {requestId: request.requestId, workspaceId: request.workspaceId, file: request.file,
        generation: request.generation, revision: request.revision, from: result?.from ?? request.position,
        to: result?.to ?? request.position, items: (result?.options ?? []).slice(0, 200).map(({label, detail, apply}) =>
          ({label, insertText: typeof apply === 'string' ? apply : label, ...(detail ? {detail} : {})}))};
    },
    async dispose() {},
  };
}
