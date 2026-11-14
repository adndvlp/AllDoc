import type {DataColumn} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const columns: readonly DataColumn[] = Object.freeze([
  Object.freeze({name: 'nombre', type: 'text' as const}),
  Object.freeze({name: 'categoria', type: 'text' as const}),
  Object.freeze({name: 'precio', type: 'integer' as const}),
]);

// Ayuda y esquema ligeros: las filas están en un módulo diferido distinto.
export const productsManifest: DatasetManifest = Object.freeze({
  reference: Object.freeze({id: 'productos-basico', version: 1}),
  title: 'Productos',
  tables: Object.freeze([Object.freeze({name: 'productos', columns})]),
});
