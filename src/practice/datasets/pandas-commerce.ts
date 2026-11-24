import type {ColumnType, RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const tables: readonly [name: string, rowCount: number, columns: readonly [string, ColumnType][]][] = [
  ['clientes', 5, [['cliente_id', 'integer'], ['nombre', 'text'], ['pais', 'text'], ['alta', 'datetime']]],
  ['pedidos', 7, [['pedido_id', 'integer'], ['cliente_id', 'integer'], ['fecha', 'datetime'],
    ['monto', 'integer'], ['estado', 'text'], ['canal', 'text']]],
  ['productos', 4, [['producto_id', 'integer'], ['producto', 'text'], ['categoria', 'text'], ['precio', 'integer']]],
  ['detalle', 9, [['pedido_id', 'integer'], ['producto_id', 'integer'], ['cantidad', 'integer'], ['precio_unitario', 'integer']]],
  ['leads', 5, [['lead_id', 'integer'], ['email', 'text'], ['importe_texto', 'text'], ['nombre_raw', 'text']]],
];

export const pandasCommerceSchema: RuntimeSchema = {
  version: 0,
  entities: tables.map(([name, rowCount, columns]) => ({
    name, kind: 'dataframe', rowCount, columns: columns.map(([name, type]) => ({name, type})),
  })),
};

export const pandasCommerceManifest: DatasetManifest = {
  reference: {id: 'pandas-comercio', version: 1},
  title: 'Comercio y captación',
  tables: pandasCommerceSchema.entities.map(({name, columns}) => ({name, columns})),
};
