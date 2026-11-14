import type {PracticeDataset} from './types.ts';
import type {Cell, MaterializedDataset, RuntimeSchema} from '../contracts.ts';
export type SqlSeed = {format: 'alldoc/sql-seed@1'; statements: {sql: string; parameters: (string | number | null)[]}[]};

const quote = (name: string) => '"' + name.replaceAll('"', '""') + '"';
const sqlTypes = {text: 'TEXT', integer: 'INTEGER', number: 'REAL', boolean: 'INTEGER', bigint: 'TEXT', decimal: 'TEXT', date: 'TEXT', datetime: 'TEXT'};

export function sqlSeedFor(dataset: PracticeDataset): SqlSeed {
  const statements: SqlSeed['statements'] = [];
  for (const table of dataset.tables) {
    statements.push({sql: `CREATE TABLE ${quote(table.name)} (${table.columns.map((column) => `${quote(column.name)} ${sqlTypes[column.type]}`).join(', ')});`, parameters: []});
    const sql = `INSERT INTO ${quote(table.name)} (${table.columns.map(({name}) => quote(name)).join(', ')}) VALUES (${table.columns.map(() => '?').join(', ')});`;
    for (const row of table.rows) statements.push({sql, parameters: row.map((value) => typeof value === 'boolean' ? Number(value) : value)});
  }
  return {format: 'alldoc/sql-seed@1', statements};
}

function pythonLiteral(value: Cell): string {
  if (value === null) return 'None';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  return JSON.stringify(value);
}

export function pandasExampleCode(table: PracticeDataset['tables'][number]): string {
  return ['import pandas as pd', '', `${table.name} = pd.DataFrame({`,
    ...table.columns.map((column, index) => `    ${JSON.stringify(column.name)}: [${table.rows.map((row) => pythonLiteral(row[index])).join(', ')}],`),
    '})', table.name].join('\n');
}

export function materializeDataset(dataset: PracticeDataset, runtimeId: 'sqlite-wasm' | 'pyodide'): MaterializedDataset {
  const files = dataset.tables.map((table, index) => ({path: `datos/table-${index}.json`,
    bytes: new TextEncoder().encode(JSON.stringify({columns: table.columns.map(({name}) => name), data: table.rows}))}));
  const schema: RuntimeSchema = {
    version: 0,
    entities: dataset.tables.map((table) => ({name: table.name, kind: runtimeId === 'pyodide' ? 'dataframe' : 'table',
      columns: table.columns.map((column) => ({...column})), rowCount: table.rows.length})),
  };
  const python = ['import json as _alldoc_json', 'import pandas as pd',
    ...dataset.tables.flatMap((table, index) => [
      `with open(${JSON.stringify(files[index].path)}, encoding="utf-8") as _alldoc_file:`,
      '    _alldoc_payload = _alldoc_json.load(_alldoc_file)',
      `globals()[${JSON.stringify(table.name)}] = pd.DataFrame(_alldoc_payload["data"], columns=_alldoc_payload["columns"])`,
    ]), 'del _alldoc_json, _alldoc_file, _alldoc_payload'].join('\n');
  return {reference: {...dataset.reference}, files, schema,
    bootstrap: runtimeId === 'sqlite-wasm' ? JSON.stringify(sqlSeedFor(dataset)) : python};
}
