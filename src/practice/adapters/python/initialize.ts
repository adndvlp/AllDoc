import type {PyodideAPI, loadPyodide} from 'pyodide';
export async function initializePythonVM(load: typeof loadPyodide, options: Parameters<typeof loadPyodide>[0]): Promise<PyodideAPI> {
  const vm = await load({...options, packages: []});
  const errors: string[] = [];
  await vm.loadPackage(['pandas', 'jedi'], {messageCallback() {}, errorCallback(message) {errors.push(message);}});
  if (errors.length) throw new Error('No se pudieron cargar los paquetes Python: ' + errors.join('; ').slice(0, 1500));
  return vm;
}
