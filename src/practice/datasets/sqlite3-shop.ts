import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const id = {name: 'id', type: 'integer', primaryKey: true} as const;

export const sqlite3ShopSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'clientes', kind: 'table', rowCount: 4, columns: [
      id, {name: 'nombre', type: 'text'}, {name: 'pais', type: 'text'},
    ]},
    {name: 'pedidos', kind: 'table', rowCount: 5, columns: [
      id, {name: 'cliente_id', type: 'integer'}, {name: 'monto', type: 'integer'},
      {name: 'fecha', type: 'text'}, {name: 'estado', type: 'text'},
    ]},
    {name: 'contactos', kind: 'table', rowCount: 4, columns: [
      id, {name: 'email', type: 'text'},
    ]},
  ],
};

export const sqlite3ShopManifest: DatasetManifest = {
  reference: {id: 'sqlite3-tienda', version: 1},
  title: 'Clientes, pedidos y contactos de la tienda',
  tables: sqlite3ShopSchema.entities.map(({name, columns}) => ({name, columns})),
};
