import type {Cell, DataColumn, DatasetReference} from '../contracts.ts';

export type DatasetColumn=DataColumn & Readonly<{nullable?:boolean;default?:Cell}>;
export type DatasetCheck=Readonly<{column:string;operator:'>'|'>='|'<='|'in';value:number|readonly (string|number)[]}>;
export type DatasetTable=Readonly<{
  name:string;columns:readonly DatasetColumn[];primaryKey?:readonly string[];unique?:readonly (readonly string[])[];
  foreignKeys?:readonly Readonly<{columns:readonly string[];references:Readonly<{table:string;columns:readonly string[]}>;onDelete?:'CASCADE'|'SET NULL'}>[];
  checks?:readonly DatasetCheck[];
}>;

export type DatasetManifest = Readonly<{
  reference: DatasetReference;
  title: string;
  tables: readonly DatasetTable[];
}>;
export type PracticeDataset = Readonly<{
  reference: DatasetReference;
  tables: readonly (DatasetTable & Readonly<{rows:readonly (readonly Cell[])[] }>)[];
}>;
