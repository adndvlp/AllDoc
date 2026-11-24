import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

export const httpxOrdersSchema: RuntimeSchema = {version: 0, entities: [{
  name: 'pedidos', kind: 'dataframe', rowCount: 4,
  columns: [
    {name: 'id', type: 'integer'}, {name: 'cliente', type: 'text'}, {name: 'importe', type: 'integer'},
    {name: 'estado', type: 'text'}, {name: 'fecha', type: 'text'},
  ],
}]};

export const httpxOrdersManifest: DatasetManifest = {
  reference: {id: 'httpx-pedidos', version: 1}, title: 'Pedidos de la API simulada de HTTPX',
  tables: httpxOrdersSchema.entities.map(({name, columns}) => ({name, columns})),
};
