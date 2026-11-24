import {createIsolatedRuntime, type IsolatedRuntime} from '../../isolation/browser.ts';
import type {RuntimeAdapter} from '../../contracts.ts';

export const createExcelRuntime = (label = 'Excel') => createIsolatedRuntime({label});
export function createExcelCompletion(runtime: RuntimeAdapter) {
  return {complete: (runtime as IsolatedRuntime).complete, async dispose() {}};
}
