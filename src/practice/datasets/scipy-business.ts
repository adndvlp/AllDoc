import type {ColumnType, RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const vectors: readonly [string, number, ColumnType][] = [
  ['ventas', 5, 'number'], ['ventas_nan', 5, 'number'],
  ['canal_a', 8, 'integer'], ['canal_b', 8, 'integer'],
  ['antes', 8, 'integer'], ['despues', 8, 'integer'], ['canal_c', 8, 'integer'],
  ['publicidad', 5, 'integer'], ['ingresos', 5, 'integer'],
];

export const scipyBusinessSchema: RuntimeSchema = {
  version: 0,
  entities: [
    ...vectors.map(([name, rowCount, type]) => ({
      name, rowCount, kind: 'variable' as const, columns: [{name: 'valor', type}],
    })),
    {name: 'matriz', kind: 'variable', rowCount: 2,
      columns: ['Periodo 1', 'Periodo 2', 'Periodo 3'].map(name => ({name, type: 'integer'}))},
    {name: 'conversiones', kind: 'variable', rowCount: 2,
      columns: ['Conversión', 'Sin conversión'].map(name => ({name, type: 'integer'}))},
  ],
};

export const scipyBusinessManifest: DatasetManifest = {
  reference: {id: 'scipy-negocio', version: 1},
  title: 'Ventas, tiempos y conversiones de SciPy',
  tables: scipyBusinessSchema.entities.map(({name, columns}) => ({name, columns})),
};
