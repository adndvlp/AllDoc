import type {CompletionAdapter, RuntimeAdapter} from '../../contracts.ts';
import {createIsolatedRuntime, type IsolatedRuntime} from '../../isolation/browser.ts';

export const createPythonRuntime = () => createIsolatedRuntime({label: 'Python', hardReset: true, startupTimeoutMs: 90_000});
export function createPythonCompletion(runtime: RuntimeAdapter): CompletionAdapter {
  if (!('complete' in runtime) || typeof runtime.complete !== 'function') throw new Error('El runtime no ofrece análisis Python');
  const engine = runtime as IsolatedRuntime;
  return {complete: (request, signal) => engine.complete(request, signal), async dispose() {}};
}
