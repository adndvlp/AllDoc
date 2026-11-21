import type {SqlDialectId} from '../../content/sql/contracts.ts';
import type {Cell} from '../contracts.ts';
import type {DatasetTable,PracticeDataset} from './types.ts';

export function quoteSql(name:string,dialect:SqlDialectId='sqlite'):string {
  if(!name||name.length>128||name.includes('\0'))throw new Error('Identificador de dataset inválido');
  if(dialect==='mysql'||dialect==='mariadb')return '`'+name.replaceAll('`','``')+'`';
  if(dialect==='sqlserver')return '['+name.replaceAll(']',']]')+']';
  return '"'+(dialect==='oracle'?name.toUpperCase():name).replaceAll('"','""')+'"';
}
export function sqlLiteral(value:Cell,dialect:SqlDialectId='sqlite',date=false):string {
  if(value===null)return 'NULL';if(typeof value==='boolean')return value?'1':'0';
  if(typeof value==='number'){if(!Number.isFinite(value))throw new Error('Número de dataset inválido');return String(value);}
  if(value.includes('\0'))throw new Error('Texto SQL con NUL');
  if(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||new Date(value).toISOString().slice(0,10)!==value)throw new Error('Fecha de dataset inválida');
    if(dialect==='oracle'||dialect==='postgresql')return `DATE '${value}'`;
    if(dialect==='sqlserver')return `CONVERT(date, '${value.replaceAll('-','')}', 112)`;
  }
  if((dialect==='mysql'||dialect==='mariadb')&&value.includes('\\')){
    return 'CONVERT(0x'+Array.from(new TextEncoder().encode(value),b=>b.toString(16).padStart(2,'0')).join('')+' USING utf8mb4)';
  }
  return (dialect==='sqlserver'||dialect==='oracle'?'N':'')+"'"+value.replaceAll("'","''")+"'";
}
export function validateDataset(dataset:PracticeDataset):void {
  const tables=new Map(dataset.tables.map(t=>[t.name,t]));if(tables.size!==dataset.tables.length||!tables.size)throw new Error('Tablas vacías o duplicadas');
  for(const t of dataset.tables){
    quoteSql(t.name);const names=new Set(t.columns.map(c=>c.name));if(!names.size||names.size!==t.columns.length)throw new Error('Columnas vacías o duplicadas');
    const columns=(list:readonly string[])=>{if(!list.length||new Set(list).size!==list.length||list.some(c=>!names.has(c)))throw new Error('Restricción con columnas inválidas');};
    if(t.primaryKey)columns(t.primaryKey);for(const u of t.unique??[])columns(u);
    for(const c of t.columns){quoteSql(c.name);if(c.default!==undefined)sqlLiteral(c.default);}
    for(const f of t.foreignKeys??[]){columns(f.columns);const parent=tables.get(f.references.table);if(!parent||f.columns.length!==f.references.columns.length||!f.references.columns.length||f.references.columns.some(c=>!parent.columns.some(p=>p.name===c)))throw new Error('Referencia foránea inválida');
      if(![parent.primaryKey,...parent.unique??[]].some(key=>JSON.stringify(key)===JSON.stringify(f.references.columns)))throw new Error('La referencia debe apuntar a PK o UNIQUE');
      if(f.onDelete&&!['CASCADE','SET NULL'].includes(f.onDelete))throw new Error('Acción referencial inválida');
      if(f.onDelete==='SET NULL'&&f.columns.some(n=>t.columns.find(c=>c.name===n)?.nullable!==true))throw new Error('SET NULL requiere columnas opcionales');
    }
    for(const check of t.checks??[]){if(!names.has(check.column)||!['>','>=','<=','in'].includes(check.operator))throw new Error('CHECK inválido');
      if(check.operator==='in'){if(!Array.isArray(check.value)||!check.value.length)throw new Error('Lista de CHECK inválida');for(const v of check.value)sqlLiteral(v);}
      else if(typeof check.value!=='number'||!Number.isFinite(check.value))throw new Error('Valor de CHECK inválido');
    }
    for(const row of t.rows){if(row.length!==t.columns.length)throw new Error('Fila incompatible');for(const value of row){if(value!==null&&!['string','number','boolean'].includes(typeof value))throw new Error('Celda inválida');if(typeof value==='number'&&!Number.isFinite(value))throw new Error('Celda numérica inválida');}}
  }
}
export function createTableSql(table:DatasetTable,dialect:SqlDialectId='sqlite'):string {
  const q=(name:string)=>quoteSql(name,dialect);
  const definitions=table.columns.map(c=>{
    const text=dialect==='oracle'?'NVARCHAR2(255)':dialect==='sqlserver'?'NVARCHAR(255)':dialect==='mysql'||dialect==='mariadb'?'VARCHAR(255)':'TEXT';
    const integer=dialect==='oracle'?'NUMBER(19,0)':'INTEGER';
    const types={text,integer,boolean:integer,number:dialect==='oracle'?'BINARY_DOUBLE':dialect==='postgresql'?'DOUBLE PRECISION':'REAL',bigint:text,decimal:text,date:dialect==='sqlite'?'TEXT':'DATE',datetime:text};
    if(!Object.hasOwn(types,c.type))throw new Error('Tipo de columna desconocido');
    return q(c.name)+' '+types[c.type]+(c.default!==undefined?' DEFAULT '+sqlLiteral(c.default,dialect,c.type==='date'):'')+(c.nullable===false?' NOT NULL':'');
  });
  if(table.primaryKey)definitions.push('PRIMARY KEY ('+table.primaryKey.map(q).join(', ')+')');
  for(const unique of table.unique??[])definitions.push('UNIQUE ('+unique.map(q).join(', ')+')');
  for(const f of table.foreignKeys??[])definitions.push('FOREIGN KEY ('+f.columns.map(q).join(', ')+') REFERENCES '+q(f.references.table)+' ('+f.references.columns.map(q).join(', ')+')'+(f.onDelete?' ON DELETE '+f.onDelete:''));
  for(const c of table.checks??[])definitions.push('CHECK ('+q(c.column)+(c.operator==='in'?' IN ('+(c.value as readonly Cell[]).map(v=>sqlLiteral(v,dialect)).join(', ')+')':' '+c.operator+' '+sqlLiteral(c.value as number,dialect))+')');
  return 'CREATE TABLE '+q(table.name)+' (\n  '+definitions.join(',\n  ')+'\n)'+(dialect==='mysql'||dialect==='mariadb'?' ENGINE=InnoDB CHARACTER SET utf8mb4':'')+';';
}
