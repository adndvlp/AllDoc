import {test,before} from 'node:test';import assert from 'node:assert/strict';
import initSQLite,{type Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {readFile} from 'node:fs/promises';
import {sqlConcepts} from '../src/content/sql.ts';
import {sqlCurriculum,getPublishedSqlCurriculum} from '../src/content/sql/curriculum.ts';
import {sqlDialects,getSqlCapability} from '../src/content/sql/capabilities.ts';
import {resolveNoteExample} from '../src/content/notes/sql/factory.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {createSQLiteEngine,type SQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {entries} from '../src/content/search-index.ts';import {searchEntries} from '../src/lib/search.ts';
const plans=sqlCurriculum.slice(23).flatMap(g=>g.children),ids=plans.map(c=>c.id);
const notes=()=>sqlConcepts.filter(c=>ids.includes(c.conceptId));
const get=(key:string)=>{const n=notes().find(n=>n.key===key);assert.ok(n,'Ficha completa: '+key);return n;};
let runId=0;const run=(engine:SQLiteEngine,sql:string)=>{const events:RuntimeEvent[]=[];engine.run({runId:'tercer-'+(++runId),workspaceId:'editorial',generation:1,revision:1,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:sql}]},e=>events.push(e));return events;};
const rows=(events:RuntimeEvent[])=>{const last=events.filter(e=>e.type==='table').at(-1);assert.ok(last&&last.type==='table',JSON.stringify(events));return last.rows;};
test('tercer bloque: 48 fichas nuevas cierran los 153 destinos y los 34 grupos',()=>{
 assert.equal(plans.length,48);assert.deepEqual(notes().map(n=>n.conceptId),ids);assert.equal(sqlConcepts.length,153);assert.equal(getPublishedSqlCurriculum().length,34);
 for(const n of notes()){assert.ok(n.description&&n.remember&&n.examples.length);for(const e of n.examples)assert.ok(e.code&&e.hint&&e.output.columns.length,e.id);}
});
test('tercer bloque: seis dialectos revisados y ausencias sin SQL ni ejecución inventados',()=>{
 for(const p of plans)for(const d of sqlDialects){assert.equal(getSqlCapability(p.feature,d.id).status,'reviewed',p.key+'/'+d.id);const n=get(p.key);for(const e of n.examples)assert.notEqual(resolveNoteExample(n,e,d.id).action.kind,'disabled',e.id+'/'+d.id);}
 for(const d of ['mysql','postgresql','sqlserver'] as const){const n=get('views/if-not-exists'),r=resolveNoteExample(n,n.examples[0],d);assert.equal(r.variant.code,undefined);assert.equal(r.action.kind,'external');}
 const n=get('except/equivalentes');assert.match(resolveNoteExample(n,n.examples[0],'oracle').variant.code!,/MINUS/);
});
test('tercer bloque: bloques procedurales externos no se preparan ni ejecutan como un equivalente SQLite',()=>{
 const n=get('transactions/definicion'),e=n.examples.find(e=>e.title==='Transferencia comprobada');assert.ok(e);
 for(const dialect of ['postgresql','mysql','mariadb','sqlserver','oracle'] as const){const {action,variant}=resolveNoteExample(n,e,dialect);assert.equal(action.kind,'external');assert.equal(action.code,variant.code);assert.equal(action.label,'Copiar SQL');assert.equal(action.executesAutomatically,false);assert.notEqual(action.code,e.code);}
 assert.equal(resolveNoteExample(n,e,'sqlite').action.kind,'sqlite');
});
test('tercer bloque: alias propios de los RDBMS buscan un solo concepto',()=>{
 for(const [q,id] of [['MINUS','except/equivalentes'],['sp_rename','alter-table/rename-column'],['pg_indexes','indexes/consultar'],['START TRANSACTION','transactions/begin']])assert.equal(searchEntries(entries,q).filter(e=>e.id==='analisis-de-datos/sql/'+id).length,1,q);
});
let sqlite:Sqlite3Static;
before(async()=>{sqlite=await (initSQLite as unknown as (o:object)=>Promise<Sqlite3Static>)({print(){},printErr(){}});});
async function fresh(){const e=createSQLiteEngine(sqlite);e.init(await createDatasetAdapter().materialize({id:'negocio-relacional',version:1},'sqlite-wasm',new AbortController().signal));return e;}
test('tercer bloque: programas completos desde semilla limpia reproducen todas las salidas en WASM',async()=>{
 assert.equal(notes().length,48);const engine=await fresh();try{for(const n of notes())for(const example of n.examples){engine.reset();const events=run(engine,example.code);assert.equal(events.some(e=>e.type==='error'),false,example.id+JSON.stringify(events));
  const table=events.filter(e=>e.type==='table').at(-1);assert.ok(table&&table.type==='table');assert.deepEqual(table.columns.map(c=>c.name),example.output.columns,example.id);assert.deepEqual(rows(events).map(r=>r.map(v=>v===null?'NULL':String(v))),example.output.rows,example.id);
 }}finally{engine.dispose();}
});
test('tercer bloque: empates de RANK, ROW_NUMBER determinista y marcos ROWS/RANGE distintos',async()=>{
 const engine=await fresh();try{
  const n=get('window-functions/rank');const output=rows(run(engine,n.examples[0].code));assert.deepEqual(output.slice(0,4).map(r=>r.slice(-2)),[[1,1],[1,1],[1,1],[4,2]]);
  const f=get('window-functions/frame');const r=rows(run(engine,f.examples[0].code));assert.notEqual(r[0][2],r[0][3],'ROWS y RANGE deben mostrar efectos distintos con empates');
  for(const key of ['window-functions/row-number','window-functions/lag-lead'])assert.match(get(key).examples[0].code,/ORDER BY salario DESC, id/);
 }finally{engine.dispose();}
});
test('tercer bloque: transferencia revierte saldo insuficiente o cuenta ausente, y confirma solo dos cambios válidos',async()=>{
 const n=get('transactions/definicion'),example=n.examples.find(e=>e.title==='Transferencia comprobada');assert.ok(example);
 const engine=await fresh();try{
  for(const setup of ['UPDATE cuentas SET saldo=0 WHERE id=1;','DELETE FROM cuentas WHERE id=1;','DELETE FROM cuentas WHERE id=2;']){engine.reset();run(engine,setup);const before=rows(run(engine,'SELECT id,saldo FROM cuentas WHERE id IN(1,2) ORDER BY id;'));
   const events=run(engine,example.code);assert.equal(events.some(e=>e.type==='error'),true,'Debe abortar: '+setup);assert.deepEqual(rows(run(engine,'SELECT id,saldo FROM cuentas WHERE id IN(1,2) ORDER BY id;')),before,'No se admite crédito sin débito ni débito sin crédito');
   assert.equal(run(engine,'BEGIN; ROLLBACK;').some(e=>e.type==='error'),false,'La transferencia fallida no deja abierta la transacción');
  }
  engine.reset();assert.deepEqual(rows(run(engine,example.code)),[[1,9500],[2,11500]]);
 }finally{engine.dispose();}
});
test('tercer bloque: transacción abierta entre ejecuciones, rollback DDL y UNIQUE reales',async()=>{
 const engine=await fresh();try{run(engine,'BEGIN; UPDATE cuentas SET saldo=saldo-500 WHERE id=1;');assert.deepEqual(rows(run(engine,'SELECT saldo FROM cuentas WHERE id=1;')),[[9500]]);run(engine,'ROLLBACK;');assert.deepEqual(rows(run(engine,'SELECT saldo FROM cuentas WHERE id=1;')),[[10000]]);
  run(engine,'BEGIN; CREATE TABLE practica_revertida(id INTEGER);');run(engine,'ROLLBACK;');assert.deepEqual(rows(run(engine,"SELECT COUNT(*) FROM sqlite_schema WHERE name='practica_revertida';")),[[0]]);
  const n=get('indexes/unique');run(engine,n.examples[0].code);assert.equal(run(engine,"INSERT INTO practica_indice_unico VALUES (2,'A-1');").some(e=>e.type==='error'),true);
 }finally{engine.dispose();}
});
test('tercer bloque: los 99 originales y once vacíos están cubiertos por cuerpos publicados',async()=>{
 const i=JSON.parse(await readFile('specs/sql/source-inventory.json','utf8'));assert.equal(i.sources.length,99);assert.equal(i.sources.filter((s:any)=>s.empty).length,11);
 for(const s of i.sources)for(const id of s.targets)assert.ok(sqlConcepts.some(n=>n.conceptId===id),s.path+' → '+id);
 for(const n of sqlConcepts){const p=sqlCurriculum.flatMap(g=>g.children).find(c=>c.id===n.conceptId)!;const metadataFile=n.conceptId==='analisis-de-datos/sql/comentarios'?'docs/analisis-de-datos/sql/comentarios.mdx':p.stage==='published-legacy'?'docs/'+p.id+'.mdx':'docs/analisis-de-datos/sql/'+p.file;assert.match(await readFile(metadataFile,'utf8'),/SqlConceptCard/);}
});
