import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import initSQLite,{type Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {createDatasetAdapter,getDatasetManifest} from '../src/practice/datasets/index.ts';
import {sqlSeedFor,materializeDataset} from '../src/practice/datasets/materialize.ts';
import {createSQLiteEngine,type SQLiteEngine} from '../src/practice/adapters/sqlite/core.ts';
import {editorBootstrap} from '../src/practice/editor-bootstrap.ts';
import {resolvePracticeEditorContext} from '../src/practice/context.ts';
import {productsDataset} from '../src/practice/datasets/products.ts';
import type {PracticeDataset} from '../src/practice/datasets/types.ts';
import type {RuntimeEvent} from '../src/practice/contracts.ts';

const ref={id:'negocio-relacional',version:1};
let sqlite:Sqlite3Static;const engines:SQLiteEngine[]=[];
before(async()=>{sqlite=await (initSQLite as unknown as (o:object)=>Promise<Sqlite3Static>)({print(){},printErr(){}});});
after(()=>engines.forEach(e=>e.dispose()));
async function engine(){const e=createSQLiteEngine(sqlite);engines.push(e);e.init(await createDatasetAdapter().materialize(ref,'sqlite-wasm',new AbortController().signal));return e;}
let sequence=0;
function run(e:SQLiteEngine,code:string){const events:RuntimeEvent[]=[];e.run({runId:'data-'+(++sequence),workspaceId:'data',generation:1,revision:sequence,entryFile:'consulta.sql',files:[{path:'consulta.sql',languageId:'sql',content:code}]},v=>events.push(v));return events;}
function rows(e:SQLiteEngine,code:string){const out=run(e,code);assert.ok(!out.some(e=>e.type==='error'),JSON.stringify(out));return out.filter(e=>e.type==='table').at(-1)!.rows;}

test('negocio: trece tablas, 300–600 filas y valores tipados reproducibles; pandas conserva su dataset',async()=>{
  const manifest=getDatasetManifest(ref);assert.ok(manifest,'El dataset relacional debe estar registrado');assert.equal(manifest.tables.length,13);
  const a=await createDatasetAdapter().materialize(ref,'sqlite-wasm',new AbortController().signal);
  const b=await createDatasetAdapter().materialize(ref,'sqlite-wasm',new AbortController().signal);
  assert.equal(a.bootstrap,b.bootstrap);const total=a.schema.entities.reduce((n,e)=>n+(e.rowCount??0),0);assert.ok(total>=300&&total<=600);
  const sql=resolvePracticeEditorContext('/apuntes/analisis-de-datos/sql/select')!,python=resolvePracticeEditorContext('/apuntes/analisis-de-datos/pandas/dataframe')!;
  assert.deepEqual(sql.profile.defaultDataset,ref);assert.deepEqual(python.profile.defaultDataset,{id:'productos-basico',version:1});
  const bootstrap=await editorBootstrap(sql);assert.equal(bootstrap.schema.entities.length,13);assert.equal(bootstrap.workspace.activeFile,'consulta.sql');assert.equal(bootstrap.workspace.files[0].content,'SELECT * FROM productos;');
  const pandas=await createDatasetAdapter().materialize(python.profile.defaultDataset,'pyodide',new AbortController().signal);assert.equal(pandas.schema.entities.length,1);assert.equal(pandas.schema.entities[0].rowCount,3);
});
test('negocio: PK/FK/UNIQUE/CHECK/DEFAULT son restricciones reales, no etiquetas',async()=>{
  const e=await engine();assert.deepEqual(rows(e,'PRAGMA foreign_keys;'),[[1]]);assert.deepEqual(rows(e,'PRAGMA foreign_key_check;'),[]);
  for(const sql of ["INSERT INTO clientes(id,nombre,email,ciudad,fecha_alta) VALUES(100,'X','cliente1@ejemplo.test','X','2026-01-01');",'UPDATE productos SET precio=-1 WHERE id=1;','UPDATE productos SET proveedor_id=9999 WHERE id=1;','INSERT INTO inventario(almacen_id,producto_id,unidades) VALUES(1,1,5);'])assert.ok(run(e,sql).some(e=>e.type==='error'),sql);
  assert.deepEqual(rows(e,"INSERT INTO categorias(id,nombre) VALUES(99,'Prueba'); SELECT descripcion FROM categorias WHERE id=99;"),[[null]]);
});
test('negocio: consultas complejas, ausencias, NULL y empates de ventanas producen datos reales',async()=>{
  const e=await engine();assert.ok(rows(e,'SELECT c.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id WHERE p.id IS NULL;').length>0);
  assert.ok(rows(e,'SELECT p.id FROM productos p WHERE NOT EXISTS(SELECT 1 FROM detalle_pedidos d WHERE d.producto_id=p.id);').length>0);
  assert.ok(rows(e,'SELECT id FROM productos WHERE proveedor_id IS NULL;').length>0);
  assert.ok(rows(e,'SELECT e.nombre,g.nombre FROM empleados e JOIN empleados g ON e.gerente_id=g.id;').length>0);
  const result=rows(e,`WITH ventas AS (SELECT c.id,SUM(d.cantidad*d.precio_unitario) AS total FROM clientes c JOIN pedidos p ON p.cliente_id=c.id JOIN detalle_pedidos d ON d.pedido_id=p.id GROUP BY c.id) SELECT id,total,DENSE_RANK() OVER(ORDER BY total DESC) AS posicion FROM ventas ORDER BY total DESC,id;`);
  assert.ok(result.length>5);assert.ok(result.every(r=>typeof r[1]==='number'&&typeof r[2]==='number'));
  assert.deepEqual(result.slice(0,3),[[3,17550,1],[6,16450,2],[9,11400,3]]);
  const tied=result.filter(r=>r[0]===17||r[0]===18);assert.deepEqual(tied.map(r=>r[1]),[2000,2000]);assert.equal(tied[0][2],tied[1][2]);
  assert.ok(rows(e,'SELECT salario FROM empleados GROUP BY salario HAVING COUNT(*)>1;').length>0);
});
test('negocio: inspeccionar no confirma transacciones y reiniciar conserva una semilla limpia',async()=>{
  const e=await engine();const before=rows(e,'SELECT saldo FROM cuentas WHERE id=1;');
  run(e,'BEGIN; UPDATE cuentas SET saldo=saldo-100 WHERE id=1;');e.inspect();assert.deepEqual(rows(e,'SELECT saldo FROM cuentas WHERE id=1;'),[[Number(before[0][0])-100]]);
  run(e,'ROLLBACK;');assert.deepEqual(rows(e,'SELECT saldo FROM cuentas WHERE id=1;'),before);
  run(e,'BEGIN; UPDATE cuentas SET saldo=saldo+100 WHERE id=1;');e.inspect();run(e,'COMMIT;');assert.deepEqual(rows(e,'SELECT saldo FROM cuentas WHERE id=1;'),[[Number(before[0][0])+100]]);
  run(e,'CREATE TABLE libre(id INTEGER); INSERT INTO libre VALUES(7);');assert.ok(e.inspect().entities.some(x=>x.name==='libre'));e.reset();assert.ok(!e.inspect().entities.some(x=>x.name==='libre'));assert.deepEqual(rows(e,'SELECT saldo FROM cuentas WHERE id=1;'),before);
});
test('negocio: cascada y SET NULL actúan de verdad y no modifican otra sesión',async()=>{
  const a=await engine(),b=await engine();run(a,'DELETE FROM pedidos WHERE id=1;');assert.deepEqual(rows(a,'SELECT count(*) FROM detalle_pedidos WHERE pedido_id=1;'),[[0]]);
  assert.ok(Number(rows(b,'SELECT count(*) FROM detalle_pedidos WHERE pedido_id=1;')[0][0])>0);
  run(a,'DELETE FROM proveedores WHERE id=1;');assert.ok(Number(rows(a,'SELECT count(*) FROM productos WHERE proveedor_id IS NULL;')[0][0])>Number(rows(b,'SELECT count(*) FROM productos WHERE proveedor_id IS NULL;')[0][0]));
});
test('materializador: restricciones de un dataset se crean incluso fuera del registro de negocio',()=>{
  const fixture={reference:{id:'constraints',version:1},tables:[
    {name:'padres',columns:[{name:'id',type:'integer',nullable:false}],primaryKey:['id'],rows:[[1]]},
    {name:'hijos',columns:[{name:'id',type:'integer',nullable:false},{name:'padre_id',type:'integer',nullable:false},{name:'cantidad',type:'integer',nullable:false,default:1}],primaryKey:['id'],foreignKeys:[{columns:['padre_id'],references:{table:'padres',columns:['id']}}],checks:[{column:'cantidad',operator:'>',value:0}],rows:[[1,1,1]]},
  ]} as unknown as PracticeDataset;
  const e=createSQLiteEngine(sqlite);engines.push(e);e.init(materializeDataset(fixture,'sqlite-wasm'));
  assert.ok(run(e,'INSERT INTO hijos(id,padre_id) VALUES(2,999);').some(e=>e.type==='error'));
  assert.ok(run(e,'INSERT INTO hijos VALUES(1,1,2);').some(e=>e.type==='error'));
  assert.ok(run(e,'UPDATE hijos SET cantidad=0;').some(e=>e.type==='error'));
  assert.deepEqual(rows(e,'INSERT INTO hijos(id,padre_id) VALUES(2,1); SELECT cantidad FROM hijos WHERE id=2;'),[[1]]);
  assert.equal(JSON.stringify(sqlSeedFor(productsDataset)).includes('FOREIGN KEY'),false);
});
