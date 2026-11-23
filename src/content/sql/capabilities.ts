import {sqlConceptPlans,sqlCurriculum} from './curriculum.ts';
import {isSqlSource,isOfficialSqlSource,type SqlCapability,type SqlDialectId,type SqlSupport,type SqlSource} from './contracts.ts';
import {firstBlockSources} from './first-block-sources.ts';
import {secondBlockSources,type SqlSourceFamily} from './second-block-sources.ts';
import {thirdBlockSources,type ThirdBlockFamily} from './third-block-sources.ts';
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

for(const feature of Array.from(new Set(sqlCurriculum.slice(0,14).flatMap(g=>g.children.map(c=>c.feature))))){
  for(const dialect of sqlDialects){
    if(feature==='limit'){
      const prior=facts.limit[dialect.id]!;if(prior.status==='reviewed')facts.limit[dialect.id]=reviewed(prior.support,prior.syntax,prior.explanation,firstBlockSources[dialect.id]);
      continue; // TOP/FETCH conservan su clasificación explícita.
    }
    const unavailable=feature==='full-outer-join'&&['mysql','mariadb'].includes(dialect.id);
    const offsetEquivalent=feature==='offset'&&['sqlserver','oracle'].includes(dialect.id);
    (facts[feature]??={})[dialect.id]=reviewed(unavailable?'unavailable':offsetEquivalent?'equivalent':'native',unavailable?'':offsetEquivalent?'OFFSET / FETCH':feature,
      unavailable?`${dialect.label} no tiene FULL OUTER JOIN nativo en la gramática revisada. Usa LEFT JOIN y consulta la alternativa anti join.`:
      feature==='comments'&&['mysql','mariadb'].includes(dialect.id)?'Después de -- escribe un espacio. Los comentarios de bloque usan /* ... */.':
      feature==='cast'?'El tipo de destino y el tratamiento de valores inválidos dependen del motor.':
      feature==='like'?'La distinción de mayúsculas y acentos depende del motor y de su collation.':
      feature==='null'&&dialect.id==='oracle'?'Oracle trata la cadena vacía como NULL; cero es un valor distinto.':
      offsetEquivalent?'OFFSET/FETCH exige adaptar la sintaxis; en SQL Server requiere ORDER BY.':'Sintaxis revisada para este concepto. No acredita ejecución en un servidor externo.',firstBlockSources[dialect.id]);
  }
}

for(const group of sqlCurriculum.slice(14,23)){
 const family:SqlSourceFamily=group.order===15?'text':group.order===16?'numeric':group.order===17?'aggregate':group.order<20?'query':group.order<23?'write':'ddl';
 for(const feature of Array.from(new Set(group.children.map(c=>c.feature))))for(const {id,label} of sqlDialects){
  const unavailable=(feature==='insert-replace'&&['postgresql','sqlserver','oracle'].includes(id))
   ||(feature==='insert-ignore'&&['sqlserver','oracle'].includes(id))
   ||(feature==='create-table-if-not-exists'&&id==='sqlserver');
  const equivalent=(['insert-ignore','insert-replace'].includes(feature)&&id!=='sqlite')
   ||(feature==='string-aggregate'&&['postgresql','sqlserver','oracle'].includes(id))
   ||(feature==='length'&&['mysql','mariadb','sqlserver'].includes(id))
   ||(feature==='substring'&&id==='sqlserver')
   ||(feature==='concat'&&['mysql','mariadb','sqlserver'].includes(id));
  (facts[feature]??={})[id]=reviewed(unavailable?'unavailable':equivalent?'equivalent':'native',unavailable?'':feature,
   unavailable?`${label} no ofrece esta sintaxis con la semántica descrita. Consulta la variante SQLite y su explicación.`:
   'Revisión documental del ejemplo y sus diferencias. La salida guardada corresponde exclusivamente a SQLite.',secondBlockSources(id,family));
 }
}

for(const group of sqlCurriculum.slice(23)){
 const family:ThirdBlockFamily=group.key==='alter-table'?'alter':group.key==='drop-table'?'drop':group.key==='views'?'views':group.key==='indexes'?'indexes':group.key==='window-functions'?'window':group.key==='transactions'?'transactions':'query';
 for(const feature of Array.from(new Set(group.children.map(c=>c.feature))))for(const {id} of sqlDialects){
  const unavailable=feature==='view-if-not-exists'&&['postgresql','mysql','sqlserver'].includes(id);
  const equivalent=(['alter-table','add-column','rename-column','rename-table'].includes(feature)&&id==='sqlserver')
   ||(feature==='replace-view'&&['sqlite','sqlserver'].includes(id))
   ||(feature==='inspect-indexes'&&id!=='sqlite')
   ||(feature==='drop-index'&&['mysql','mariadb','sqlserver'].includes(id))
   ||(['transactions','autocommit'].includes(feature)&&['mysql','mariadb','sqlserver','oracle'].includes(id));
  (facts[feature]??={})[id]=reviewed(unavailable?'unavailable':equivalent?'equivalent':'native',unavailable?'':feature,
   unavailable?'CREATE VIEW IF NOT EXISTS no forma parte de la gramática revisada. No equivale a OR REPLACE.':'Sintaxis y diferencias documentales revisadas. La ejecución del panel y sus resultados siguen siendo SQLite.',thirdBlockSources(id,family));
 }
}

export const sqlCapabilityMatrix:Readonly<Record<string,Readonly<Record<SqlDialectId,SqlCapability>>>>=Object.freeze(Object.fromEntries(
  Array.from(new Set(sqlConceptPlans.map(c=>c.feature))).map(feature=>[feature,Object.freeze(Object.fromEntries(
    sqlDialects.map(d=>[d.id,facts[feature]?.[d.id]??pending]),
  ) as Record<SqlDialectId,SqlCapability>)]),
));
export function getSqlCapability(feature:string,dialect:SqlDialectId):SqlCapability {
  if(!Object.hasOwn(sqlCapabilityMatrix,feature)||!sqlDialects.some(d=>d.id===dialect))return pending;
  const cell=sqlCapabilityMatrix[feature][dialect];
  if(cell.status==='reviewed'&&!cell.sources.some(s=>isOfficialSqlSource(s,dialect)))throw new Error('Capacidad sin fuente oficial del dialecto');
  return cell;
}
