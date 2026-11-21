import type {PracticeDataset} from './types.ts';
import type {SqlDialectId} from '../../content/sql/contracts.ts';
import {createTableSql,quoteSql,sqlLiteral,validateDataset} from './sql-ddl.ts';

/** Solo genera texto para una base de práctica vacía; nunca conecta ni ejecuta SQL. */
export function exportSqlDataset(dataset:PracticeDataset,dialect:SqlDialectId):string {
  if(!['sqlite','postgresql','mysql','sqlserver','mariadb','oracle'].includes(dialect))throw new Error('Dialecto de exportación desconocido');
  validateDataset(dataset);
  const ordered:PracticeDataset['tables'][number][]=[],pending=[...dataset.tables];
  while(pending.length){const index=pending.findIndex(t=>(t.foreignKeys??[]).every(f=>f.references.table===t.name||ordered.some(p=>p.name===f.references.table)));if(index<0)throw new Error('Las referencias cíclicas requieren una estrategia de importación explícita');ordered.push(pending.splice(index,1)[0]);}
  const lines=[`-- AllDoc: ${dataset.reference.id}@${dataset.reference.version} / ${dialect}`,
    '-- Ejecutar únicamente en una base de práctica vacía (o esquema vacío), con codificación Unicode.',
    '-- Importes de esta semilla: enteros en MXN. Fechas ISO, booleanos representados por 0/1.',
    '-- No incluye borrado ni credenciales. La creación de tablas puede confirmar cambios según el motor.',
    ...(dialect==='sqlite'?['PRAGMA foreign_keys=ON;']:[]),...(dialect==='sqlserver'?['SET XACT_ABORT ON;']:[]),...(dialect==='mysql'||dialect==='mariadb'?['SET NAMES utf8mb4;']:[]),'',
    ...ordered.map(t=>createTableSql(t,dialect)),'',
    ...(dialect==='oracle'?[]:dialect==='mysql'||dialect==='mariadb'?['START TRANSACTION;']:dialect==='sqlserver'?['BEGIN TRANSACTION;']:['BEGIN;']),
  ];
  for(const table of ordered){const columns=table.columns.map(c=>quoteSql(c.name,dialect)).join(', ');
    for(const row of table.rows)lines.push(`INSERT INTO ${quoteSql(table.name,dialect)} (${columns}) VALUES (${row.map((v,i)=>sqlLiteral(v,dialect,table.columns[i].type==='date')).join(', ')});`);
  }
  lines.push('COMMIT;',...(dialect==='sqlite'?['PRAGMA foreign_key_check;']:[]),'');
  return lines.join('\n');
}
