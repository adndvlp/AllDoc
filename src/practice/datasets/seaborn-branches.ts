import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const channels = [{name: 'Online', type: 'integer'}, {name: 'Tienda', type: 'integer'}] as const;

export const seabornBranchesSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'ventas', kind: 'dataframe', rowCount: 16, columns: [
      {name: 'fecha', type: 'datetime'}, {name: 'sucursal', type: 'text'}, {name: 'region', type: 'text'},
      {name: 'canal', type: 'text'}, {name: 'ingresos', type: 'integer'}, {name: 'inversion', type: 'integer'},
      {name: 'pedidos', type: 'integer'}, {name: 'satisfaccion', type: 'number'}, {name: 'meta', type: 'integer'},
    ]},
    {name: 'diarias', kind: 'dataframe', rowCount: 4, columns: channels},
    {name: 'matriz', kind: 'dataframe', rowCount: 2, columns: channels},
    {name: 'simulacion', kind: 'dataframe', rowCount: 800, columns: [
      {name: 'canal', type: 'text'}, {name: 'ingresos', type: 'number'},
    ]},
  ],
};

export const seabornBranchesManifest: DatasetManifest = {
  reference: {id: 'seaborn-sucursales', version: 1},
  title: 'Ventas diarias por sucursal, canal y región',
  tables: seabornBranchesSchema.entities.map(({name, columns}) => ({name, columns})),
};
