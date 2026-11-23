import {test,before} from 'node:test';
import assert from 'node:assert/strict';
import initSQLite,{type Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {sqlConcepts} from '../src/content/sql.ts';
import {sqlCurriculum,getPublishedSqlCurriculum} from '../src/content/sql/curriculum.ts';
import {sqlDialects,getSqlCapability} from '../src/content/sql/capabilities.ts';
import {resolveNoteExample} from '../src/content/notes/sql/factory.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {createSQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {entries} from '../src/content/search-index.ts';
import {searchEntries} from '../src/lib/search.ts';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const groups=sqlCurriculum.slice(14,23);
const ids=groups.flatMap(g=>g.children.map(c=>c.id));
const notes=()=>sqlConcepts.filter(c=>ids.includes(c.conceptId));
test('segundo bloque: buscar nombres de otros dialectos encuentra el mismo concepto sin duplicarlo',()=>{
 for(const [query,id] of [['CHAR_LENGTH','text-functions/length'],['LEN','text-functions/length'],['SUBSTR','text-functions/substring'],['STRING_AGG','aggregation/string-aggregate'],['LISTAGG','aggregation/string-aggregate'],['GROUP_CONCAT','aggregation/string-aggregate'],['AUTO_INCREMENT','create-table/primary-key'],['ON CONFLICT','insert/ignore']]){
  const result=searchEntries(entries,query).filter(e=>e.id==='analisis-de-datos/sql/'+id);assert.equal(result.length,1,query);
 }
});
test('segundo bloque: 52 fichas nuevas completas, nueve grupos entre texto y CREATE TABLE',()=>{
 assert.equal(ids.length,52);assert.deepEqual(notes().map(c=>c.conceptId),ids);
 assert.equal(getPublishedSqlCurriculum().slice(0,23).length,23);
 for(const c of notes()){assert.ok(c.description);assert.ok(c.remember);assert.ok(c.examples.length);for(const e of c.examples){assert.ok(e.code);assert.ok(e.output.columns.length,e.id);}}
 assert.equal(getSqlCapability('capacidad-futura','sqlite').status,'pending');
});
test('segundo bloque: seis variantes revisadas; diferencias de sintaxis y ausencias explícitas',()=>{
 for(const g of groups)for(const c of g.children)for(const d of sqlDialects){
  const cap=getSqlCapability(c.feature,d.id);assert.equal(cap.status,'reviewed',c.key+'/'+d.id);
  const n=notes().find(n=>n.key===c.key)!;assert.ok(n,c.key);
  for(const e of n.examples){const r=resolveNoteExample(n,e,d.id);assert.notEqual(r.action.kind,'disabled',e.id+'/'+d.id);assert.equal(r.action.executesAutomatically,false);}
 }
 for(const dialect of ['postgresql','sqlserver','oracle'] as const){const cap=getSqlCapability('insert-replace',dialect);assert.ok(cap.status==='reviewed'&&cap.support==='unavailable');}
 const cap=getSqlCapability('create-table-if-not-exists','oracle');assert.ok(cap.status==='reviewed'&&cap.support==='native','Oracle 26 sí admite IF NOT EXISTS');
});
test('segundo bloque: una variante no disponible lleva al mismo concepto SQLite, nunca a un anti join ajeno',()=>{
 const c=notes().find(n=>n.key==='insert/replace')!;assert.ok(c);
 const resolved=resolveNoteExample(c,c.examples[0],'postgresql');
 assert.equal(resolved.action.kind,'external');assert.equal(resolved.variant.code,undefined);
 assert.deepEqual(resolved.alternative,{label:'Ver variante SQLite',href:c.slug+'?dialect=sqlite'});
});
test('segundo bloque: las fechas de DELETE son explícitas para motores con formato de sesión',()=>{
 const c=notes().find(n=>n.key==='delete/condiciones')!;assert.ok(c);
 assert.match(resolveNoteExample(c,c.examples[0],'oracle').variant.code!,/DATE '2025-01-01'/);
 assert.match(resolveNoteExample(c,c.examples[0],'sqlserver').variant.code!,/CONVERT\(date, '20250101', 112\)/);
});
test('segundo bloque: agregación global antes de GROUP BY y secuencias de escritura explícitas',()=>{
 assert.equal(notes().length,52);
 for(const c of notes().filter(n=>n.key.startsWith('aggregation/')))for(const e of c.examples)assert.doesNotMatch(e.code,/GROUP BY/i);
 for(const group of ['insert','update','delete','create-table'])for(const c of notes().filter(n=>n.key.startsWith(group+'/')))for(const e of c.examples){
  assert.match(e.code,/SELECT /i,'Salida final comprobable: '+e.id);
  if(['update','delete'].includes(group))assert.match(c.remember+c.note,/sin WHERE|Sin WHERE/);
 }
});
test('segundo bloque: las fuentes originales y diez vacíos tienen destinos revisados y verificables',async()=>{
 const bytes=await readFile('specs/sql/source-inventory.json');const inventory=JSON.parse(bytes.toString());
 const review=JSON.parse(await readFile('specs/verification/sql-point-4/editorial-review.json','utf8'));
 assert.equal(review.sourceInventorySha256,createHash('sha256').update(bytes).digest('hex'));
 const expected=inventory.sources.filter((s:any)=>inventory.groups.slice(14,23).some((g:any)=>s.path.startsWith(g.sourceFolder+'/')));
 assert.deepEqual(review.sources.map((s:any)=>s.path),expected.map((s:any)=>s.path));assert.equal(review.scope.emptySourcesResolved,10);
 for(const source of review.sources){const original=expected.find((s:any)=>s.path===source.path);assert.equal(source.sha256,original.sha256);assert.equal(source.status,'reviewed');assert.deepEqual(source.pendingTargets,[]);
  assert.deepEqual(source.publishedTargets,original.targets);for(const id of source.publishedTargets)assert.ok(notes().some(n=>n.conceptId===id));
 }
});
let sqlite:Sqlite3Static;
before(async()=>{sqlite=await (initSQLite as unknown as (o:object)=>Promise<Sqlite3Static>)({print(){},printErr(){}});});
test('segundo bloque: cada programa completo reproduce su salida desde semilla limpia en WASM',async()=>{
 assert.equal(notes().length,52);
 const seed=await createDatasetAdapter().materialize({id:'negocio-relacional',version:1},'sqlite-wasm',new AbortController().signal);
 const engine=createSQLiteEngine(sqlite);let id=0;
 try{engine.init(seed);for(const c of notes())for(const e of c.examples){engine.reset();const events:RuntimeEvent[]=[];
  engine.run({runId:'bloque2-'+(++id),workspaceId:'editorial',generation:1,revision:1,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:e.code}]},v=>events.push(v));
  assert.ok(!events.some(v=>v.type==='error'),e.id+': '+JSON.stringify(events));const last=events.filter(v=>v.type==='table').at(-1);assert.ok(last&&last.type==='table',e.id);
  assert.deepEqual(last.columns.map(v=>v.name),e.output.columns,e.id);assert.deepEqual(last.rows.map(r=>r.map(v=>v===null?'NULL':String(v))),e.output.rows,e.id);
  if(c.key==='aggregation/count'&&e.title==='Filas y valores presentes')assert.deepEqual(last.rows,[[18,16]]);
  if(c.key==='aggregation/con-where'&&e.title==='Sin coincidencias')assert.deepEqual(last.rows,[[0,null,null,null,null]]);
  if(c.key==='create-table/on-delete-cascade')assert.deepEqual(last.rows,[[0]]);
  if(c.key==='create-table/on-delete-set-null')assert.deepEqual(last.rows,[[1,null]]);
  if(c.key==='text-functions/substring')assert.deepEqual(last.rows,[['Tec']]);
  if(c.key==='numeric-functions/round')assert.deepEqual(last.rows,[[166.67]]);
  if(c.key==='numeric-functions/abs')assert.deepEqual(last.rows,[[100]]);
  if(c.key==='aggregation/string-aggregate')assert.deepEqual(last.rows,[['Teclado, Mouse, Monitor']]);
  if(c.key==='insert/ignore')assert.deepEqual(last.rows,[[1,'Original']]);
  if(c.key==='insert/replace')assert.deepEqual(last.rows,[[1,'Nuevo',0]]);
 }}finally{engine.dispose();}
});
test('segundo bloque: las restricciones de las tablas enseñadas rechazan datos inválidos realmente',async()=>{
 const seed=await createDatasetAdapter().materialize({id:'negocio-relacional',version:1},'sqlite-wasm',new AbortController().signal);
 const engine=createSQLiteEngine(sqlite);let id=0;
 const run=(sql:string)=>{const events:RuntimeEvent[]=[];engine.run({runId:'regla-'+(++id),workspaceId:'editorial',generation:1,revision:1,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:sql}]},e=>events.push(e));return events;};
 try{engine.init(seed);
  for(const [key,invalid,message] of [
   ['primary-key',"INSERT INTO practica_clave VALUES (101, 'Duplicado');",/UNIQUE/],
   ['not-null','INSERT INTO practica_obligatorio VALUES (2, NULL);',/NOT NULL/],
   ['unique',"INSERT INTO practica_correo VALUES (2, 'compras@empresa.test');",/UNIQUE/],
   ['check','INSERT INTO practica_regla VALUES (2, -1);',/CHECK/],
   ['foreign-key','INSERT INTO practica_reservas VALUES (2, 9999);',/FOREIGN KEY/],
   ['varias-foreign-key','INSERT INTO practica_solicitudes VALUES (9999, 1);',/FOREIGN KEY/],
  ] as const){engine.reset();const n=notes().find(n=>n.key==='create-table/'+key);assert.ok(n);
   assert.equal(run(n.examples[0].code).some(e=>e.type==='error'),false);
   const failure=run(invalid).find(e=>e.type==='error');assert.ok(failure&&failure.type==='error');assert.match(failure.message,message);
  }
  engine.reset();const n=notes().find(n=>n.key==='create-table/default');assert.ok(n);run(n.examples[0].code);
  const table=run('INSERT INTO practica_stock VALUES (2,NULL); SELECT unidades FROM practica_stock WHERE id=2;').find(e=>e.type==='table');assert.ok(table&&table.type==='table');assert.deepEqual(table.rows,[[null]],'DEFAULT no sustituye NULL explícito');
 }finally{engine.dispose();}
});
