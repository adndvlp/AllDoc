import type {Cell, DataColumn, DatasetReference} from '../contracts.ts';

export type DatasetManifest = Readonly<{
  reference: DatasetReference;
  title: string;
  tables: readonly Readonly<{name: string; columns: readonly DataColumn[]}>[];
}>;
export type PracticeDataset = Readonly<{
  reference: DatasetReference;
  tables: readonly Readonly<{name: string; columns: readonly DataColumn[]; rows: readonly (readonly Cell[])[]}>[];
}>;
