import {test} from 'node:test';import assert from 'node:assert/strict';
import {createDraftStore} from '../src/practice/drafts.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {resolvePracticeEditorContext} from '../src/practice/context.ts';
import {sqlDraftMigrationCandidates} from '../src/practice/sql-draft-migration.ts';
import {memoryRepository,deferred} from './fixtures/practice-session.ts';
import type {Workspace} from '../src/practice/contracts.ts';
async function seeds(){const ctx=resolvePracticeEditorContext('/apuntes/analisis-de-datos/sql/select')!;const {workspace:seed}=await editorBootstrap(ctx);const old:Workspace={...seed,id:JSON.stringify([seed.toolKey,seed.profileId,'productos-basico',1]),dataset:{id:'productos-basico',version:1},files:[{path:'consulta.sql',languageId:'sql',content:"SELECT 'mi borrador';"}],revision:7};return {seed,old};}
const options={migrationCandidates:sqlDraftMigrationCandidates};
test('migración SQL: copia código una vez, guarda revisión recuperable y conserva el registro original',async()=>{
 const {seed,old}=await seeds();const fixture=memoryRepository();await fixture.repository.write(old,null,10);const before=structuredClone(fixture.records.get(old.id));
 const store=createDraftStore(()=>fixture.repository,options);const loaded=await store.load(seed);
 assert.deepEqual(loaded.workspace.files,old.files);assert.equal(loaded.workspace.id,seed.id);assert.deepEqual(loaded.workspace.dataset,seed.dataset);
 assert.ok(loaded.previous);assert.deepEqual(loaded.previous.files,old.files);assert.deepEqual(fixture.records.get(old.id),before);
 await store.close();const writes=fixture.calls.writes;const again=createDraftStore(()=>fixture.repository,options);assert.deepEqual((await again.load(seed)).workspace.files,old.files);assert.equal(fixture.calls.writes,writes);await again.close();
});
test('migración SQL: no sustituye un borrador nuevo ya editado y nunca migra pandas u otro dataset',async()=>{
 const {seed,old}=await seeds();assert.deepEqual(sqlDraftMigrationCandidates(seed),[old.id]);assert.deepEqual(sqlDraftMigrationCandidates(old),[]);
 assert.deepEqual(sqlDraftMigrationCandidates({...seed,profileId:'python-pandas'}),[]);assert.deepEqual(sqlDraftMigrationCandidates({...seed,dataset:{id:'otro',version:1}}),[]);
 const f=memoryRepository();await f.repository.write(old,null,10);const winner={...seed,files:[{...seed.files[0],content:'SELECT 999;'}]};await f.repository.write(winner,null,20);
 const store=createDraftStore(()=>f.repository,options);assert.equal((await store.load(seed)).workspace.files[0].content,'SELECT 999;');assert.equal(f.calls.writes,2);await store.close();
});
test('migración SQL: dos conexiones conservan la ganadora por CAS y el origen sigue íntegro',async()=>{
 const {seed,old}=await seeds();const f=memoryRepository();await f.repository.write(old,null,10);const original=structuredClone(f.records.get(old.id));
 const a=createDraftStore(()=>f.repository,options),b=createDraftStore(()=>f.repository,options);await Promise.all([a.load(seed),b.load(seed)]);
 assert.equal(f.records.get(seed.id)?.workspace.files[0].content,old.files[0].content);assert.deepEqual(f.records.get(old.id),original);assert.equal(f.recoveries.length,1);await a.close();await b.close();
});
test('migración SQL: fallo de escritura conserva la copia en memoria y permite reintentar sin borrar el origen',async()=>{
 const {seed,old}=await seeds();const f=memoryRepository();await f.repository.write(old,null,10);const write=f.repository.write;f.repository.write=async()=>{throw new Error('quota');};
 const store=createDraftStore(()=>f.repository,options);const state=await store.load(seed);assert.equal(state.status,'memory');assert.equal(state.workspace.files[0].content,old.files[0].content);assert.ok(f.records.has(old.id));
 f.repository.write=write;await store.retryPersistence(seed.id);assert.equal(f.records.get(seed.id)?.workspace.files[0].content,old.files[0].content);await store.close();
});
test('migración SQL: cerrar durante la lectura no escribe un seed vacío ni borra el origen',async()=>{
 const {seed,old}=await seeds();const f=memoryRepository();await f.repository.write(old,null,10);const gate=deferred(),reading=deferred();const read=f.repository.read;
 f.repository.read=async id=>{if(id===old.id){reading.resolve();await gate.promise;}return read(id);};
 const store=createDraftStore(()=>f.repository,options);const loaded=store.load(seed);const rejected=assert.rejects(loaded,/cerrado/);await reading.promise;await store.close();gate.resolve();await rejected;
 assert.ok(f.records.has(old.id));assert.equal(f.records.has(seed.id),false);
});
