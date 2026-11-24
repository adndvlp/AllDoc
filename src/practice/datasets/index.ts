import type {DatasetAdapter, DatasetReference} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';
import {productsManifest} from './manifest.ts';
import {businessManifest} from './business-manifest.ts';
import {pandasCommerceManifest, pandasCommerceSchema} from './pandas-commerce.ts';
import {jsonOrdersManifest, jsonOrdersSchema} from './json-orders.ts';
import {numpySalesManifest, numpySalesSchema} from './numpy-sales.ts';
import {scipyBusinessManifest, scipyBusinessSchema} from './scipy-business.ts';
import {sqlalchemySalesManifest, sqlalchemySalesSchema} from './sqlalchemy-sales.ts';
import {sqlite3ShopManifest, sqlite3ShopSchema} from './sqlite3-shop.ts';
import {openpyxlSalesManifest, openpyxlSalesSchema} from './openpyxl-sales.ts';

const pythonDatasets = new Map([
  [pandasCommerceManifest, {schema: pandasCommerceSchema, load: () => import('./rows/pandas-commerce.ts').then(module => module.pandasCommerceBootstrap)}],
  [jsonOrdersManifest, {schema: jsonOrdersSchema, load: () => import('./rows/json-orders.ts').then(module => module.jsonOrdersBootstrap)}],
  [numpySalesManifest, {schema: numpySalesSchema, load: () => import('./rows/numpy-sales.ts').then(module => module.numpySalesBootstrap)}],
  [scipyBusinessManifest, {schema: scipyBusinessSchema, load: () => import('./rows/scipy-business.ts').then(module => module.scipyBusinessBootstrap)}],
  [sqlalchemySalesManifest, {schema: sqlalchemySalesSchema, load: () => import('./rows/sqlalchemy-sales.ts').then(module => module.sqlalchemySalesBootstrap)}],
  [sqlite3ShopManifest, {schema: sqlite3ShopSchema, load: () => import('./rows/sqlite3-shop.ts').then(module => module.sqlite3ShopBootstrap)}],
  [openpyxlSalesManifest, {schema: openpyxlSalesSchema, load: () => import('./rows/openpyxl-sales.ts').then(module => module.openpyxlSalesBootstrap)}],
]);
const manifests = [productsManifest, businessManifest, ...Array.from(pythonDatasets.keys())];

export function getDatasetManifest(reference: DatasetReference): DatasetManifest | undefined {
  return manifests.find(manifest =>
    manifest.reference.id === reference.id && manifest.reference.version === reference.version);
}
export async function loadPracticeDataset(reference:DatasetReference){
  const manifest = getDatasetManifest(reference);
  if (!manifest || pythonDatasets.has(manifest)) throw new Error('Dataset tabular desconocido o versión no disponible');
  return reference.id===businessManifest.reference.id?(await import('./rows/business.ts')).businessDataset:(await import('./products.ts')).productsDataset;
}
export function createDatasetAdapter(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    const manifest = getDatasetManifest(reference);
    if (!manifest) throw new Error('Dataset desconocido o versión no disponible');
    if (runtimeId !== 'sqlite-wasm' && runtimeId !== 'pyodide') throw new Error('Runtime sin materializador de datos: ' + runtimeId);
    const pythonDataset = pythonDatasets.get(manifest);
    if (pythonDataset) {
      if (runtimeId !== 'pyodide') throw new Error('Los datos de ' + manifest.title + ' requieren Python');
      const bootstrap = await pythonDataset.load();
      signal.throwIfAborted();
      return {reference: {...reference}, files: [], bootstrap, schema: pythonDataset.schema};
    }
    const [dataset, {materializeDataset}] = await Promise.all([loadPracticeDataset(reference), import('./materialize.ts')]);
    signal.throwIfAborted();
    return materializeDataset(dataset, runtimeId);
  }};
}
