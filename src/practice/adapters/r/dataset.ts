import type {ColumnType, DatasetAdapter, RuntimeSchema} from '../../contracts.ts';
import {rCommerceBootstrap} from '../../datasets/rows/r-commerce.ts';

export const rCommerce = {id: 'r-comercio', version: 1};
const entity = (name: string, rowCount: number, fields: Record<string, ColumnType>) => ({
  name, rowCount, kind: 'dataframe' as const, columns: Object.entries(fields).map(([name, type]) => ({name, type})),
});
export const rCommerceSchema: RuntimeSchema = {version: 0, entities: [
  entity('clientes', 5, {id: 'integer', nombre: 'text', pais: 'text', alta: 'date'}),
  entity('pedidos', 6, {id: 'integer', cliente_id: 'integer', fecha: 'date', monto: 'number', estado: 'text', cupon: 'text'}),
  entity('productos', 3, {id: 'integer', producto: 'text', categoria: 'text', precio: 'number'}),
  entity('detalle', 7, {pedido_id: 'integer', producto_id: 'integer', cantidad: 'number', precio_unitario: 'number'}),
  entity('leads', 5, {id: 'integer', email: 'text', canal: 'text'}),
]};

export function createRDataset(): DatasetAdapter {
  return {async materialize(reference, runtimeId, signal) {
    signal.throwIfAborted();
    if (runtimeId !== 'webr' || reference.id !== rCommerce.id || reference.version !== rCommerce.version) throw new Error('Dataset de R desconocido');
    return {reference, bootstrap: rCommerceBootstrap, files: [], schema: rCommerceSchema};
  }};
}
