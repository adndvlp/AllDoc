import type {DatasetAdapter, DatasetReference} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';
import {productsManifest} from './manifest.ts';
import {businessManifest} from './business-manifest.ts';
import {pandasCommerceManifest, pandasCommerceSchema} from './pandas-commerce.ts';

export function getDatasetManifest(reference: DatasetReference): DatasetManifest | undefined {
  return [productsManifest, businessManifest, pandasCommerceManifest].find(m=>m.reference.id===reference.id&&m.reference.version===reference.version);
}
export async function loadPracticeDataset(reference:DatasetReference){
  const manifest = getDatasetManifest(reference);
  if (!manifest || manifest === pandasCommerceManifest) throw new Error('Dataset tabular desconocido o versión no disponible');
  return reference.id===businessManifest.reference.id?(await import('./rows/business.ts')).businessDataset:(await import('./products.ts')).productsDataset;
}
export function createDatasetAdapter(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    const manifest = getDatasetManifest(reference);
    if (!manifest) throw new Error('Dataset desconocido o versión no disponible');
    if (runtimeId !== 'sqlite-wasm' && runtimeId !== 'pyodide') throw new Error('Runtime sin materializador de datos: ' + runtimeId);
    if (manifest === pandasCommerceManifest) {
      if (runtimeId !== 'pyodide') throw new Error('Los datos del temario de pandas requieren Python');
      const {pandasCommerceBootstrap} = await import('./rows/pandas-commerce.ts');
      signal.throwIfAborted();
      return {reference: {...reference}, files: [], bootstrap: pandasCommerceBootstrap, schema: pandasCommerceSchema};
    }
    const [dataset, {materializeDataset}] = await Promise.all([loadPracticeDataset(reference), import('./materialize.ts')]);
    signal.throwIfAborted();
    return materializeDataset(dataset, runtimeId);
  }};
}
