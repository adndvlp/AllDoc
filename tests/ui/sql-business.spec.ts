import {test,expect,type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';import {createRequire} from 'node:module';import path from 'node:path';
import {sqliteEnvironment} from '../../src/practice/adapters/sqlite/environment';

const route='/apuntes/analisis-de-datos/sql/select';
const panel=(p:Page)=>p.locator('dialog[data-practice-panel]');
const code=(p:Page)=>panel(p).getByRole('textbox',{name:'Código SQL',exact:true});
const key=(dataset:string)=>JSON.stringify(['analisis-de-datos/sql','sql-sqlite',dataset,1]);
const seed={id:key('negocio-relacional'),toolKey:'analisis-de-datos/sql',profileId:'sql-sqlite',dataset:{id:'negocio-relacional',version:1},files:[{path:'consulta.sql',languageId:'sql',content:'SELECT * FROM productos;'}],activeFile:'consulta.sql',revision:0,environmentVersion:sqliteEnvironment.version};
const old={...seed,id:key('productos-basico'),dataset:{id:'productos-basico',version:1},files:[{...seed.files[0],content:"SELECT 'mi borrador' AS mensaje;"}],revision:7,environmentVersion:'sqlite@3.54.1-build1/productos@1/protocol@1'};
const legacyRecord={formatVersion:1,storageRevision:3,savedAt:10,workspace:old,previous:null};
async function open(p:Page){await p.goto(route,{waitUntil:'networkidle'});await p.getByRole('button',{name:'Practicar SQL',exact:true}).click();await expect(code(p)).toBeVisible();await expect(panel(p).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();}
async function execute(p:Page,sql:string){await panel(p).getByRole('tab',{name:'Código',exact:true}).click();await code(p).fill(sql);await expect(panel(p).getByRole('button',{name:'Ejecutar',exact:true})).toBeEnabled();await code(p).press('ControlOrMeta+Enter');await panel(p).getByRole('tab',{name:'Resultados',exact:true}).click();await expect(panel(p).getByText('Ejecución completada',{exact:true})).toBeVisible();}

test('negocio real: trece tablas, JOIN y CTE con ranking, FK activas y reinicio',async({page})=>{
 await open(page);await panel(page).getByRole('tab',{name:'Datos',exact:true}).click();await expect(panel(page).getByRole('table')).toHaveCount(13);
 await expect(panel(page).getByRole('table',{name:'Datos de productos',exact:true})).toContainText('Monitor');await expect(page).toHaveScreenshot('business-data.png');
 await execute(page,`WITH ventas AS (SELECT c.id,SUM(d.cantidad*d.precio_unitario) AS total FROM clientes c JOIN pedidos p ON p.cliente_id=c.id JOIN detalle_pedidos d ON d.pedido_id=p.id GROUP BY c.id) SELECT id,total,DENSE_RANK() OVER(ORDER BY total DESC) AS posicion FROM ventas ORDER BY total DESC,id LIMIT 3;`);
 const table=panel(page).getByRole('table');await expect(table.getByRole('row')).toHaveCount(4);await expect(table.getByRole('row').nth(1).getByRole('cell')).toHaveText(['3','17550','1']);await expect(table.getByRole('row').nth(2).getByRole('cell')).toHaveText(['6','16450','2']);await expect(table.getByRole('row').nth(3).getByRole('cell')).toHaveText(['9','11400','3']);await expect(page).toHaveScreenshot('business-result.png');
 await panel(page).getByRole('tab',{name:'Código',exact:true}).click();await code(page).fill('UPDATE productos SET proveedor_id=9999 WHERE id=1;');await panel(page).getByRole('button',{name:'Ejecutar',exact:true}).click();await panel(page).getByRole('tab',{name:'Resultados',exact:true}).click();await expect(panel(page).getByRole('alert')).toContainText(/FOREIGN KEY/i);
 await execute(page,'CREATE TABLE libre(id INTEGER); INSERT INTO libre VALUES(7); SELECT * FROM libre;');await expect(panel(page).getByRole('table')).toContainText('7');
 await panel(page).getByRole('button',{name:'Reiniciar entorno',exact:true}).click();await panel(page).getByRole('tab',{name:'Código',exact:true}).click();await expect(code(page)).toContainText('CREATE TABLE libre');
 await execute(page,"SELECT count(*) AS tablas FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%';");await expect(panel(page).getByRole('table').getByRole('row').nth(1)).toContainText('13');
});

test('migración en la app: IndexedDB antiguo se copia una vez y abrir no ejecuta el borrador',async({page})=>{
 await page.goto('/');await page.evaluate(async record=>{
  await new Promise<void>((resolve,reject)=>{const request=indexedDB.open('alldoc-practice',1);request.onupgradeneeded=()=>{const db=request.result;db.createObjectStore('drafts',{keyPath:'workspace.id'});const recoveries=db.createObjectStore('recoveries',{keyPath:'id'});recoveries.createIndex('workspaceId','workspaceId');};request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result;const tx=db.transaction('drafts','readwrite');tx.objectStore('drafts').put(record);tx.oncomplete=()=>{db.close();resolve();};tx.onabort=()=>reject(tx.error);};});
 },legacyRecord);
 await open(page);await expect(code(page)).toHaveText(old.files[0].content);await expect(panel(page)).toContainText('Dataset actualizado');
 await panel(page).getByRole('tab',{name:'Resultados',exact:true}).click();await expect(panel(page).getByRole('table')).toHaveCount(0);await expect(panel(page).getByText('Ejecución completada',{exact:true})).toHaveCount(0);
 const stored=await page.evaluate(async({oldId,newId})=>await new Promise<{old:any;current:any}>((resolve,reject)=>{const r=indexedDB.open('alldoc-practice');r.onsuccess=()=>{const db=r.result;const tx=db.transaction('drafts');const a=tx.objectStore('drafts').get(oldId),b=tx.objectStore('drafts').get(newId);tx.oncomplete=()=>{resolve({old:a.result,current:b.result});db.close();};tx.onabort=()=>reject(tx.error);};}),{oldId:old.id,newId:seed.id});
 expect(stored.old).toEqual(legacyRecord);expect(stored.current.workspace.files).toEqual(old.files);expect(stored.current.previous.files).toEqual(old.files);const revision=stored.current.storageRevision;
 await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'Practicar SQL',exact:true}).click();await expect(code(page)).toHaveText(old.files[0].content);
 const after=await page.evaluate(async id=>await new Promise<number>(resolve=>{const r=indexedDB.open('alldoc-practice');r.onsuccess=()=>{const db=r.result;const q=db.transaction('drafts').objectStore('drafts').get(id);q.onsuccess=()=>{resolve(q.result.storageRevision);db.close();};};}),seed.id);expect(after).toBe(revision);
});

const requireFromProject=createRequire(path.resolve('package.json'));const {transformSync}=requireFromProject('@babel/core');
const modules=Object.fromEntries(['guards','drafts','indexeddb-drafts','sql-draft-migration'].map(name=>{const filename=path.resolve('src/practice/'+name+'.ts');return ['./'+name+'.ts',transformSync(readFileSync(filename,'utf8'),{filename,babelrc:false,configFile:false,presets:[requireFromProject.resolve('@babel/preset-typescript')],plugins:[requireFromProject.resolve('@babel/plugin-transform-modules-commonjs')]}).code as string];}));
test('migración IndexedDB real: CAS entre conexiones conserva ganadora y copia recuperable',async({page})=>{
 await page.goto('/');const result=await page.evaluate(async({modules,seed,legacyRecord})=>{
  const cache:Record<string,{exports:any}>={};const load=(id:string):any=>{if(cache[id])return cache[id].exports;const module={exports:{}};cache[id]=module;new Function('require','module','exports',modules[id])(load,module,module.exports);return module.exports;};
  const {createIndexedDBDraftRepository}=load('./indexeddb-drafts.ts');const {createDraftStore}=load('./drafts.ts');const {sqlDraftMigrationCandidates}=load('./sql-draft-migration.ts');
  const name='migration-'+crypto.randomUUID();const a=createIndexedDBDraftRepository({name}),b=createIndexedDBDraftRepository({name});await a.write(legacyRecord.workspace,null,10);
  let waiting=0,release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);
  const wrap=(repo:any)=>({...repo,read:async(id:string)=>{const value=await repo.read(id);if(id===seed.id&&value==null){if(++waiting===2)release();await gate;}return value;}});
  const options={migrationCandidates:sqlDraftMigrationCandidates};const one=createDraftStore(()=>wrap(a),options),two=createDraftStore(()=>wrap(b),options);
  const loaded=await Promise.all([one.load(seed),two.load(seed)]);const source=await a.read(legacyRecord.workspace.id),current=await a.read(seed.id),recoveries=await a.recoveries(seed.id);
  await one.close();await two.close();indexedDB.deleteDatabase(name);return {source,current,recoveries,loaded};
 },{modules,seed,legacyRecord});
 expect(result.current.workspace.files).toEqual(old.files);expect(result.source.workspace.files).toEqual(old.files);expect(result.current.storageRevision).toBe(1);expect(result.recoveries).toHaveLength(1);expect(result.loaded.map((v:any)=>v.workspace.files)).toEqual([old.files,old.files]);
});
