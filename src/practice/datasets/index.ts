import type {DatasetAdapter, DatasetReference} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';
import {productsManifest} from './manifest.ts';

export function getDatasetManifest(reference: DatasetReference): DatasetManifest | undefined {
  return reference.id === productsManifest.reference.id && reference.version === productsManifest.reference.version ? productsManifest : undefined;
}
export function createDatasetAdapter(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    if (!getDatasetManifest(reference)) throw new Error('Dataset desconocido o versión no disponible');
    if (runtimeId !== 'sqlite-wasm' && runtimeId !== 'pyodide') throw new Error('Runtime sin materializador de datos: ' + runtimeId);
    const [{productsDataset}, {materializeDataset}] = await Promise.all([import('./products.ts'), import('./materialize.ts')]);
    signal.throwIfAborted();
    return materializeDataset(productsDataset, runtimeId);
  }};
}
