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
      const ordered=results.filter(entry=>entry?.options.length).sort((a,b)=>Math.max(...b!.options.map(option=>option.boost??0))-Math.max(...a!.options.map(option=>option.boost??0)));
      const result=ordered[0];const from=result?.from??request.position;const to=result?.to??request.position;
      const prefix=request.document.slice(from,request.position).replace(/^["`\[]/,'').toLowerCase();
      const options=ordered.flatMap(entry=>entry!.from===from&&(entry!.to??request.position)===to?entry!.options:[]);
      const items=Array.from(new Map(options.filter(option=>!prefix||option.label.toLowerCase().startsWith(prefix)||option.label.toLowerCase().split('.').at(-1)!.startsWith(prefix)).map(({label,detail,apply})=>
        [label+'\0'+(typeof apply==='string'?apply:label),{label,insertText:typeof apply==='string'?apply:label,...(detail?{detail}:{})}])).values()).slice(0,200);
      return {requestId: request.requestId, workspaceId: request.workspaceId, file: request.file,
        generation: request.generation, revision: request.revision, from,to,items};
    },
    async dispose() {},
  };
}
