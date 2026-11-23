import {test,before} from 'node:test';
import assert from 'node:assert/strict';
import initSQLite,{type Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {sqlConcepts} from '../src/content/sql.ts';
import {concepts} from '../src/content/concepts.ts';
import {sqlCurriculum} from '../src/content/sql/curriculum.ts';
import {sqlDialects,getSqlCapability} from '../src/content/sql/capabilities.ts';
import {createDatasetAdapter} from '../src/practice/datasets/index.ts';
import {createSQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';
import {resolveNoteExample} from '../src/content/notes/sql/factory.ts';
import {readFile} from 'node:fs/promises';
const firstBlock=sqlConcepts.filter(c=>c.order<1500);

test('bloque SELECT → CAST: publica exactamente 53 destinos completos, con las cinco identidades anteriores',()=>{
  const expected=sqlCurriculum.slice(0,14).flatMap(g=>g.children.map(c=>c.id));
  assert.equal(expected.length,53);assert.deepEqual(concepts.filter(c=>c.topicId==='sql'&&c.order<1500).map(c=>c.id),expected);
  assert.deepEqual(firstBlock.map(c=>c.conceptId),expected);
  for(const c of firstBlock){assert.ok(c.description.trim());assert.ok(c.examples.length);assert.ok(c.examples.every(e=>e.code.trim()));}
  for(const id of ['select','where','limit','order-by','comentarios'])assert.ok(sqlConcepts.some(c=>c.conceptId==='analisis-de-datos/sql/'+id));
});
test('bloque SELECT → CAST: las seis variantes tienen revisión explícita y las capacidades desconocidas permanecen pendientes',()=>{
  for(const group of sqlCurriculum.slice(0,14))for(const c of group.children)for(const d of sqlDialects)assert.equal(getSqlCapability(c.feature,d.id).status,'reviewed',c.key+'/'+d.id);
  assert.equal(getSqlCapability('capacidad-futura','mysql').status,'pending');
  for(const dialect of ['mysql','mariadb'] as const){const c=getSqlCapability('full-outer-join',dialect);assert.equal(c.status,'reviewed');if(c.status==='reviewed')assert.equal(c.support,'unavailable');}
});
test('bloque SELECT → CAST: no se ofrece práctica local sin una salida verificada del ejemplo',()=>{
 const c=sqlConcepts[0],example={...c.examples[0],output:{columns:[],rows:[]}};assert.equal(resolveNoteExample(c,example,'sqlite').action.kind,'disabled');
});
test('bloque SELECT → CAST: documentos modulares resuelven todos los destinos sin importar el corpus completo',async()=>{
 for(const c of concepts.filter(c=>c.topicId==='sql')){const file=await readFile('docs/'+(c.docId??c.id)+'.mdx','utf8');assert.match(file,/notes\/sql\/[a-z-]+'/);assert.doesNotMatch(file,/@site\/src\/content\/sql['"]/);assert.ok(file.includes(sqlConcepts.find(n=>n.conceptId===c.id)!.key));}
});
let sqlite:Sqlite3Static;
before(async()=>{sqlite=await (initSQLite as unknown as (o:object)=>Promise<Sqlite3Static>)({print(){},printErr(){}});});
test('bloque SELECT → CAST: los resultados publicados proceden del dataset relacional real en SQLite WASM',async()=>{
 const engine=createSQLiteEngine(sqlite);try{
  engine.init(await createDatasetAdapter().materialize({id:'negocio-relacional',version:1},'sqlite-wasm',new AbortController().signal));let id=0;
  for(const c of firstBlock)for(const example of c.examples){const events:RuntimeEvent[]=[];
   engine.run({runId:'editorial-'+(++id),workspaceId:'editorial',generation:1,revision:1,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:example.code}]},e=>events.push(e));
   assert.ok(!events.some(e=>e.type==='error'),c.conceptId+': '+JSON.stringify(events));const table=events.filter(e=>e.type==='table').at(-1);assert.ok(table&&table.type==='table');
   assert.deepEqual(table.columns.map(c=>c.name),example.output.columns,c.conceptId);
   assert.deepEqual(table.rows.map(row=>row.map(v=>v===null?'NULL':String(v))),example.output.rows,c.conceptId);
   if(c.key.startsWith('cast/'))assert.equal(typeof table.rows[0][0],c.key==='cast/conversion'?'number':'string','CAST cambia el tipo efectivo, no solo el aspecto de 500');
   if(c.key==='in/not-in'&&example.code.includes('(1, NULL)'))assert.deepEqual(table.rows,[],'NOT IN con NULL no produce un complemento');
   if(c.key==='outer-joins/anti-join')assert.deepEqual(table.rows,[['Lucía 19'],['Raúl 20'],['Sofía 21'],['Diego 22'],['Inés 23'],['Andrés 24']]);
   if(c.key==='case/condiciones')assert.ok(table.rows.some(row=>row[0]==='Control remoto'&&row[1]==='Sin precio'),'CASE debe elegir el primer WHEN aplicable');
  }
 }finally{engine.dispose();}
});
