import type {CompletionSource} from '@codemirror/autocomplete';
import type {CompletionResult} from './contracts.ts';
export type SemanticCompletion = (document: string, position: number, signal: AbortSignal) => Promise<CompletionResult | null>;
export function createEditorCompletionSource(complete: SemanticCompletion): CompletionSource {
  let pending: AbortController | null = null;
  return async (context) => {
    pending?.abort(); const controller = new AbortController(); pending = controller;
    context.addEventListener('abort', () => controller.abort(), {onDocChange: true});
    try {
      const result = await complete(context.state.doc.toString(), context.pos, controller.signal);
      if (!result || controller.signal.aborted || context.aborted || pending !== controller) return null;
      return {from: result.from, to: result.to, options: result.items.map(({label, insertText, detail}) => ({label, apply: insertText, detail}))};
    } catch {return null;}
  };
}
