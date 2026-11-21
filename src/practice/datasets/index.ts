import type {DatasetAdapter, DatasetReference} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';
import {productsManifest} from './manifest.ts';
import {businessManifest} from './business-manifest.ts';

export function getDatasetManifest(reference: DatasetReference): DatasetManifest | undefined {
  return [productsManifest,businessManifest].find(m=>m.reference.id===reference.id&&m.reference.version===reference.version);
}
export async function loadPracticeDataset(reference:DatasetReference){
  if(!getDatasetManifest(reference))throw new Error('Dataset desconocido o versión no disponible');
  return reference.id===businessManifest.reference.id?(await import('./rows/business.ts')).businessDataset:(await import('./products.ts')).productsDataset;
}
export function createDatasetAdapter(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    if (!getDatasetManifest(reference)) throw new Error('Dataset desconocido o versión no disponible');
    if (runtimeId !== 'sqlite-wasm' && runtimeId !== 'pyodide') throw new Error('Runtime sin materializador de datos: ' + runtimeId);
    const [dataset, {materializeDataset}] = await Promise.all([loadPracticeDataset(reference), import('./materialize.ts')]);
    signal.throwIfAborted();
    return materializeDataset(dataset, runtimeId);
  }};
}
