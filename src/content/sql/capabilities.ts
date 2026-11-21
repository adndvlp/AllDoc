import {sqlConceptPlans} from './curriculum.ts';
import {isSqlSource,isOfficialSqlSource,type SqlCapability,type SqlDialectId,type SqlSupport,type SqlSource} from './contracts.ts';
export const sqlDialects: readonly Readonly<{id:SqlDialectId;label:string}>[]=Object.freeze([
  {id:'sqlite',label:'SQLite'},{id:'postgresql',label:'PostgreSQL'},{id:'mysql',label:'MySQL'},
  {id:'sqlserver',label:'SQL Server'},{id:'mariadb',label:'MariaDB'},{id:'oracle',label:'Oracle SQL'},
].map(d=>Object.freeze(d)) as {id:SqlDialectId;label:string}[]);

const source=(url:string,targetVersion:string):SqlSource=>Object.freeze({url,targetVersion,checkedAt:'2026-11-21'});
const selectSources:Readonly<Record<SqlDialectId,SqlSource>>={
  sqlite:source('https://sqlite.org/lang_select.html','SQLite 3'),
  postgresql:source('https://www.postgresql.org/docs/19/sql-select.html','PostgreSQL 19'),
  mysql:source('https://dev.mysql.com/doc/refman/9.7/en/select.html','MySQL 9.7'),
  sqlserver:source('https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17','SQL Server 2025 (17.x)'),
  mariadb:source('https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select','MariaDB Server, referencia vigente 2026-11-21'),
  oracle:source('https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html','Oracle Database 26'),
};
const pending:SqlCapability=Object.freeze({status:'pending',reason:'Requiere revisar esta operación y sus ejemplos en este dialecto.'});
const reviewed=(support:SqlSupport,syntax:string,explanation:string,sources:readonly SqlSource[]):SqlCapability=>{
  if(!sources.length||!sources.every(isSqlSource))throw new Error('Fuente de capacidad inválida');
  return Object.freeze({status:'reviewed',support,syntax,explanation,sources:Object.freeze([...sources])});
};

// Solo hechos documentales contrastados. No se deduce soporte del nombre de la
// familia ni se acredita haber ejecutado estos motores desde el navegador.
const facts:Record<string,Partial<Record<SqlDialectId,SqlCapability>>>={};
for(const dialect of sqlDialects){
  for(const [feature,syntax,explanation] of [
    ['select','SELECT','Consultar columnas de una tabla.'],
    ['where','WHERE','Filtrar filas por una condición.'],
    ['order-by','ORDER BY','Ordenar las filas del resultado.'],
  ])(facts[feature]??={})[dialect.id]=reviewed('native',syntax,explanation,[selectSources[dialect.id]]);
  const syntax=dialect.id==='sqlserver'?'TOP':dialect.id==='oracle'?'FETCH':'LIMIT';
  const support=syntax==='LIMIT'?'native':'equivalent';
  (facts.limit??={})[dialect.id]=reviewed(support,syntax,
    syntax==='LIMIT'?'Límite de filas con LIMIT.':`El concepto de límite usa ${syntax}; no se sustituye el texto de una consulta automáticamente.`,
    [dialect.id==='sqlserver'?source('https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql?view=sql-server-ver17','SQL Server 2025 (17.x)'):selectSources[dialect.id]]);
}
facts.comments={sqlite:reviewed('native','-- / /* */','Comentarios SQL de una línea y de bloque.',[source('https://sqlite.org/lang_comment.html','SQLite 3')])};
facts['full-outer-join']={
  sqlite:reviewed('native','FULL OUTER JOIN','Disponible desde SQLite 3.39; no se aplica a binarios anteriores.',[source('https://sqlite.org/releaselog/3_39_0.html','SQLite >=3.39.0')]),
  postgresql:reviewed('native','FULL OUTER JOIN','Conserva las filas no coincidentes de ambos lados.',[selectSources.postgresql]),
  sqlserver:reviewed('native','FULL OUTER JOIN','Conserva las filas no coincidentes de ambos lados.',[source('https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=sql-server-ver17','SQL Server 2025 (17.x)')]),
  oracle:reviewed('native','FULL OUTER JOIN','Unión externa de ambos lados.',[selectSources.oracle]),
  mysql:reviewed('unavailable','','La gramática MySQL 9.7 no incluye FULL OUTER JOIN nativo. Una emulación requiere una variante y pruebas propias.',[source('https://dev.mysql.com/doc/refman/9.7/en/join.html','MySQL 9.7')]),
};

export const sqlCapabilityMatrix:Readonly<Record<string,Readonly<Record<SqlDialectId,SqlCapability>>>>=Object.freeze(Object.fromEntries(
  [...new Set(sqlConceptPlans.map(c=>c.feature))].map(feature=>[feature,Object.freeze(Object.fromEntries(
    sqlDialects.map(d=>[d.id,facts[feature]?.[d.id]??pending]),
  ) as Record<SqlDialectId,SqlCapability>)]),
));
export function getSqlCapability(feature:string,dialect:SqlDialectId):SqlCapability {
  if(!Object.hasOwn(sqlCapabilityMatrix,feature)||!sqlDialects.some(d=>d.id===dialect))return pending;
  const cell=sqlCapabilityMatrix[feature][dialect];
  if(cell.status==='reviewed'&&!cell.sources.some(s=>isOfficialSqlSource(s,dialect)))throw new Error('Capacidad sin fuente oficial del dialecto');
  return cell;
}
