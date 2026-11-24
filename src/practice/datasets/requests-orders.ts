import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

export const requestsOrdersSchema: RuntimeSchema = {version: 0, entities: [{
  name: 'pedidos', kind: 'dataframe', rowCount: 4,
  columns: [
    {name: 'id', type: 'integer'}, {name: 'amount', type: 'integer'}, {name: 'status', type: 'text'},
    {name: 'updated_at', type: 'text'}, {name: 'customer_id', type: 'integer'}, {name: 'customer_country', type: 'text'},
  ],
}]};

export const requestsOrdersManifest: DatasetManifest = {
  reference: {id: 'requests-pedidos', version: 1}, title: 'Pedidos de la API simulada',
  tables: requestsOrdersSchema.entities.map(({name, columns}) => ({name, columns})),
};
