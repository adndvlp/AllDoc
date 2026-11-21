import {test} from 'node:test';import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';
import {businessDataset} from '../src/practice/datasets/rows/business.ts';
import {exportSqlDataset} from '../src/practice/datasets/export-sql.ts';
import {createTableSql,sqlLiteral} from '../src/practice/datasets/sql-ddl.ts';
import {readFile} from 'node:fs/promises';
import type {SqlDialectId} from '../src/content/sql/contracts.ts';
const dialects:SqlDialectId[]=['sqlite','postgresql','mysql','sqlserver','mariadb','oracle'];
test('exportación: seis scripts deterministas, mismos datos y restricciones, sin DROP ni credenciales',()=>{
 for(const dialect of dialects){const a=exportSqlDataset(businessDataset,dialect);assert.equal(a,exportSqlDataset(businessDataset,dialect));assert.equal((a.match(/CREATE TABLE /g)??[]).length,13);assert.equal((a.match(/INSERT INTO /g)??[]).length,businessDataset.tables.reduce((n,t)=>n+t.rows.length,0));assert.match(a,/FOREIGN KEY/);assert.match(a,/CHECK/);assert.doesNotMatch(a,/\bDROP\s+(TABLE|DATABASE|SCHEMA)\b|password\s*=/i);assert.match(a,/vac[ií]a/);}
});
test('exportación: script SQLite se importa entero y comprueba FK, texto Unicode y fechas',()=>{
 const db=new DatabaseSync(':memory:');try{db.exec(exportSqlDataset(businessDataset,'sqlite'));assert.equal(db.prepare('PRAGMA foreign_keys').get()?.foreign_keys,1);assert.equal(db.prepare('SELECT count(*) AS n FROM productos').get()?.n,18);assert.equal(db.prepare('SELECT nombre FROM productos WHERE id=9').get()?.nombre,'Micrófono');assert.equal(db.prepare('SELECT typeof(precio) AS t FROM productos LIMIT 1').get()?.t,'integer');assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),[]);}finally{db.close();}
});
test('exportación: fechas Oracle, Unicode SQL Server y charset MySQL tienen sintaxis propia',()=>{
 const oracle=exportSqlDataset(businessDataset,'oracle'),ms=exportSqlDataset(businessDataset,'sqlserver'),mysql=exportSqlDataset(businessDataset,'mysql');
 assert.match(oracle,/DATE '2024-01-01'/);assert.match(oracle,/"PRODUCTOS"/);assert.doesNotMatch(oracle,/BEGIN;|START TRANSACTION/);
 assert.match(ms,/NVARCHAR\(255\)/);assert.match(ms,/N'Micrófono'/);assert.match(ms,/CONVERT\(date,/);assert.match(ms,/BEGIN TRANSACTION;/);
 assert.match(mysql,/CHARACTER SET utf8mb4/);assert.match(mysql,/START TRANSACTION;/);assert.match(mysql,/`productos`/);
 for(const dialect of ['mysql','mariadb'] as const){const script=exportSqlDataset(businessDataset,dialect);assert.equal((script.match(/ENGINE=InnoDB/g)??[]).length,13);assert.match(script,/SET NAMES utf8mb4;/);}
 const table=businessDataset.tables.find(t=>t.name==='productos')!;assert.match(createTableSql(table,'oracle'),/DEFAULT 0 NOT NULL/);
});
test('exportación: valores con comillas y backslash no rompen los literales ni interpolan identificadores',()=>{
 assert.equal(sqlLiteral("O'Reilly",'postgresql'),"'O''Reilly'");assert.match(sqlLiteral('a\\b', 'mysql'),/^CONVERT\(0x/);
 assert.throws(()=>exportSqlDataset(businessDataset,'desconocido' as SqlDialectId),/dialecto/i);
});
test('exportación: archivos estáticos publicados coinciden byte a byte con el generador',async()=>{
 for(const dialect of dialects)assert.equal(await readFile('static/sql/datasets/negocio-relacional-1/'+dialect+'.sql','utf8'),exportSqlDataset(businessDataset,dialect));
});
