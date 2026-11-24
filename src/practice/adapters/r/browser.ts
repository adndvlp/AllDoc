import type {RuntimeAdapter} from '../../contracts.ts';
import {createIsolatedRuntime, type IsolatedRuntime} from '../../isolation/browser.ts';

export const createRRuntime = () => createIsolatedRuntime({label: 'R', hardReset: true, startupTimeoutMs: 90_000});
export function createRCompletion(runtime: RuntimeAdapter) {
  return {complete: (runtime as IsolatedRuntime).complete, async dispose() {}};
}
