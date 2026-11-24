import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

export const jsonOrdersSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'pedidos', kind: 'variable', rowCount: 3, columns: [
      {name: 'id', type: 'integer'}, {name: 'cliente', type: 'text'}, {name: 'monto', type: 'number'},
      {name: 'estado', type: 'text'}, {name: 'pagado', type: 'boolean'}, {name: 'items', type: 'text'},
    ]},
    {name: 'resumen', kind: 'variable', rowCount: 3, columns: [
      {name: 'id', type: 'integer'}, {name: 'monto', type: 'number'},
    ]},
  ],
};

export const jsonOrdersManifest: DatasetManifest = {
  reference: {id: 'json-pedidos', version: 1},
  title: 'Pedidos en JSON y JSONL',
  tables: jsonOrdersSchema.entities.map(({name, columns}) => ({name, columns})),
};
