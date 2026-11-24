import type {ColumnType, RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const vectors: readonly [string, number, ColumnType][] = [
  ['sucursales', 3, 'text'],
  ['importes', 6, 'integer'], ['clientes', 6, 'integer'], ['estados', 6, 'text'],
  ['codigos', 6, 'integer'], ['fechas', 6, 'date'],
  ['unidades', 3, 'integer'], ['precios', 3, 'integer'], ['serie', 6, 'integer'],
  ['faltantes', 4, 'number'], ['invalidos', 5, 'number'],
];

export const numpySalesSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'ventas', kind: 'variable', rowCount: 3,
      columns: ['T1', 'T2', 'T3', 'T4'].map(name => ({name, type: 'integer'}))},
    ...vectors.map(([name, rowCount, type]) => ({
      name, rowCount, kind: 'variable' as const, columns: [{name: 'valor', type}],
    })),
  ],
};

export const numpySalesManifest: DatasetManifest = {
  reference: {id: 'numpy-ventas', version: 1},
  title: 'Ventas, pedidos y series de NumPy',
  tables: numpySalesSchema.entities.map(({name, columns}) => ({name, columns})),
};
