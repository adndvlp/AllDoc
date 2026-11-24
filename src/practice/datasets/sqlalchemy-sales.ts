import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const id = {name: 'id', type: 'integer', primaryKey: true} as const;

export const sqlalchemySalesSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'clientes', kind: 'table', rowCount: 5, columns: [
      id, {name: 'nombre', type: 'text'}, {name: 'pais', type: 'text'}, {name: 'alta', type: 'date'},
    ]},
    {name: 'pedidos', kind: 'table', rowCount: 7, columns: [
      id, {name: 'cliente_id', type: 'integer'}, {name: 'monto', type: 'integer'},
      {name: 'fecha', type: 'date'}, {name: 'estado', type: 'text'}, {name: 'cupon', type: 'text'},
    ]},
    {name: 'productos', kind: 'table', rowCount: 3, columns: [
      id, {name: 'nombre', type: 'text'}, {name: 'categoria', type: 'text'}, {name: 'precio', type: 'integer'},
    ]},
    {name: 'detalles', kind: 'table', rowCount: 5, columns: [
      id, {name: 'pedido_id', type: 'integer'}, {name: 'producto_id', type: 'integer'},
      {name: 'cantidad', type: 'integer'}, {name: 'precio', type: 'integer'},
    ]},
  ],
};

export const sqlalchemySalesManifest: DatasetManifest = {
  reference: {id: 'sqlalchemy-ventas', version: 1},
  title: 'Clientes, pedidos, productos y detalles de SQLAlchemy',
  tables: sqlalchemySalesSchema.entities.map(({name, columns}) => ({name, columns})),
};
