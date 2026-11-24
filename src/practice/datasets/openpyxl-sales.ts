import type {RuntimeSchema} from '../contracts.ts';
import type {DatasetManifest} from './types.ts';

const columns = (letters: string) => Array.from(letters, name => ({name, type: 'text' as const}));
export const openpyxlSalesSchema: RuntimeSchema = {
  version: 0,
  entities: [
    {name: 'Ventas', kind: 'variable', rowCount: 6, columns: columns('ABCDEFG')},
    {name: 'Resumen', kind: 'variable', rowCount: 2, columns: columns('AB')},
  ],
};

export const openpyxlSalesManifest: DatasetManifest = {
  reference: {id: 'openpyxl-ventas', version: 1},
  title: 'Libro de ventas y resumen',
  tables: openpyxlSalesSchema.entities.map(({name, columns}) => ({name, columns})),
};
