import type {ColumnType, RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const vectors: readonly [string, number, ColumnType][] = [
  ['ventas', 6, 'integer'], ['metas', 6, 'integer'], ['publicidad', 6, 'integer'],
  ['pedidos', 6, 'integer'], ['conversion', 6, 'number'], ['importes', 9, 'integer'],
  ['ventas_region', 3, 'integer'], ['meta_region', 3, 'integer'], ['online', 3, 'integer'], ['tienda', 3, 'integer'],
];

export const matplotlibSalesSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'df', kind: 'dataframe', rowCount: 6, columns: [
      {name: 'mes', type: 'text'}, {name: 'fecha', type: 'datetime'},
      {name: 'ventas', type: 'integer'}, {name: 'meta', type: 'integer'},
      {name: 'publicidad', type: 'integer'}, {name: 'pedidos', type: 'integer'}, {name: 'conversion', type: 'number'},
    ]},
    {name: 'transacciones', kind: 'dataframe', rowCount: 6, columns: [
      {name: 'region', type: 'text'}, {name: 'importe', type: 'integer'},
    ]},
    {name: 'matriz', kind: 'variable', rowCount: 3,
      columns: ['Ene', 'Feb', 'Mar'].map(name => ({name, type: 'integer'}))},
    ...vectors.map(([name, rowCount, type]) => ({
      name, rowCount, kind: 'variable' as const, columns: [{name: 'valor', type}],
    })),
  ],
};

export const matplotlibSalesManifest: DatasetManifest = {
  reference: {id: 'matplotlib-ventas', version: 1},
  title: 'Ventas mensuales y transacciones regionales de Matplotlib',
  tables: matplotlibSalesSchema.entities.map(({name, columns}) => ({name, columns})),
};
