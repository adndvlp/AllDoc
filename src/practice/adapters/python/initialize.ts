import type {PyodideAPI, loadPyodide} from 'pyodide';
import {practicePhase} from '../../timing.ts';
export async function initializePythonVM(load: typeof loadPyodide, options: Parameters<typeof loadPyodide>[0]): Promise<PyodideAPI> {
  const vm = await practicePhase('python-sdk', () => load({...options, packages: []}));
  const errors: string[] = [];
  await practicePhase('python-packages', async () => {
    await vm.loadPackage(['pandas', 'jedi'], {messageCallback() {}, errorCallback(message) {errors.push(message);}});
    if (errors.length) throw new Error('No se pudieron cargar los paquetes Python: ' + errors.join('; ').slice(0, 1500));
  });
  return vm;
}
