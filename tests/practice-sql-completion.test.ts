import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EditorState} from '@codemirror/state';
import {CompletionContext,type CompletionSource,type CompletionResult as CMResult} from '@codemirror/autocomplete';
import {editorLanguage} from '../src/practice/editor-language.ts';
import {createSQLCompletion} from '../src/practice/adapters/sqlite/completion.ts';
import type {RuntimeSchema} from '../src/practice/contracts.ts';

const schema:RuntimeSchema={version:1,entities:[
 {name:'productos',kind:'table',columns:[{name:'id',type:'integer'},{name:'nombre',type:'text'},{name:'categoria',type:'text'},{name:'precio',type:'integer'},{name:'proveedor_id',type:'integer'}]},
 {name:'proveedores',kind:'table',columns:[{name:'id',type:'integer'},{name:'nombre',type:'text'},{name:'telefono',type:'text'}]},
 {name:'clientes',kind:'table',columns:[{name:'id',type:'integer'},{name:'email',type:'text'}]},
]};
async function suggestions(marked:string,current=schema){
 const position=marked.indexOf('▏');assert.ok(position>=0);const document=marked.replace('▏','');
 const state=EditorState.create({doc:document,extensions:[await editorLanguage('sql',current)]});
 const context=new CompletionContext(state,position,true);
 const results=(await Promise.all(state.languageDataAt<CompletionSource>('autocomplete',position).map(source=>source(context)))).filter(Boolean) as CMResult[];
 const items=results.flatMap(result=>result.options.map(item=>({result,item})));
 return {document,position,items,labels:items.map(({item})=>item.label),insert(label:string){const entry=items.find(({item})=>item.label===label);assert.ok(entry,`Falta ${label}: ${items.map(({item})=>item.label).join(', ')}`);const {result,item}=entry;assert.notEqual(typeof item.apply,'function');return document.slice(0,result.from)+(item.apply??item.label)+document.slice(result.to??position);}};
}

test('SQL contextual: columnas sin alias se deducen del FROM y no de otra tabla',async()=>{
 const value=await suggestions('SELECT ▏ FROM productos;');
 for(const name of ['nombre','categoria','precio'])assert.ok(value.labels.includes(name),name);
 assert.ok(!value.labels.includes('email'));assert.ok(!value.labels.includes('telefono'));
});
test('SQL contextual: prefijo, cursor intermedio y reemplazo no duplican letras',async()=>{
 assert.equal((await suggestions('SELECT pre▏ FROM productos;')).insert('precio'),'SELECT precio FROM productos;');
 assert.equal((await suggestions('SELECT pre▏cio FROM productos;')).insert('precio'),'SELECT precio FROM productos;');
});
test('SQL contextual: alias, JOIN, WHERE y ORDER BY limitan columnas al origen calificado',async()=>{
 for(const marked of ['SELECT p.▏ FROM productos p;','SELECT p.▏ FROM productos AS p JOIN proveedores AS v ON p.proveedor_id=v.id;','SELECT * FROM productos p WHERE p.▏;','SELECT * FROM productos p ORDER BY p.pre▏;']){
  const value=await suggestions(marked);assert.ok(value.labels.includes('precio'),marked);assert.ok(!value.labels.includes('telefono'),marked);
  assert.equal(value.insert('precio'),marked.replace(/pre?▏|▏/,'precio'));
 }
});
test('SQL contextual: JOIN sin calificar ofrece fuentes reales y califica nombres ambiguos',async()=>{
 const value=await suggestions('SELECT ▏ FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;');
 for(const name of ['precio','telefono','p.nombre','v.nombre'])assert.ok(value.labels.includes(name),name);
 assert.ok(!value.labels.includes('nombre'));assert.ok(!value.labels.includes('email'));
 assert.equal(value.insert('p.nombre'),'SELECT p.nombre FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;');
});
test('SQL contextual: comas en ORDER BY conservan columnas; JOIN y FROM incompletos ofrecen solo tablas',async()=>{
 const ordered=await suggestions('SELECT * FROM productos ORDER BY nombre, pre▏');assert.ok(ordered.labels.includes('precio'));
 for(const marked of ['SELECT nombre FROM ▏','SELECT * FROM productos JOIN ▏']){
  const value=await suggestions(marked);assert.ok(value.labels.includes('proveedores'));assert.ok(!value.labels.includes('precio'));
 }
});
test('SQL contextual: FROM ofrece tablas y vistas; columnas antes del FROM indican su tabla',async()=>{
 const current:RuntimeSchema={...schema,entities:[...schema.entities,{name:'catalogo',kind:'table',columns:[{name:'etiqueta',type:'text'}]}]};
 const tables=await suggestions('SELECT nombre FROM ▏',current);
 for(const name of ['productos','proveedores','catalogo'])assert.ok(tables.labels.includes(name));
 assert.ok(!tables.labels.includes('precio'));
 const fallback=await suggestions('SELECT pre▏');const price=fallback.items.find(({item})=>item.label==='precio');
 assert.ok(price);assert.match(price.item.detail??'',/productos/);
});
test('SQL contextual: CTE y subconsulta proyectan columnas, alias explícitos y comodines conservadores',async()=>{
 for(const marked of ['WITH c AS (SELECT nombre,precio AS importe FROM productos) SELECT c.▏ FROM c;','SELECT q.▏ FROM (SELECT nombre,precio AS importe FROM productos) q;','WITH c(nombre_corto,importe) AS (SELECT nombre,precio FROM productos) SELECT c.▏ FROM c;']){
  const value=await suggestions(marked);assert.ok(value.labels.includes('importe'),marked);assert.ok(!value.labels.includes('precio'),marked);assert.ok(!value.labels.includes('email'),marked);
 }
 const star=await suggestions('WITH c AS (SELECT p.* FROM productos p) SELECT c.▏ FROM c;');assert.ok(star.labels.includes('precio'));
 const complex=await suggestions('SELECT q.▏ FROM (SELECT precio+1,COUNT(*) AS total FROM productos) q;');assert.ok(complex.labels.includes('total'));assert.ok(!complex.labels.includes('precio'));
});
test('SQL contextual: alcances anidados y sentencias separadas no mezclan alias ni fuentes',async()=>{
 const nested=await suggestions('SELECT * FROM productos p WHERE EXISTS (SELECT v.▏ FROM proveedores v WHERE v.id=p.proveedor_id);');
 assert.ok(nested.labels.includes('telefono'));assert.ok(!nested.labels.includes('precio'));
 const separated=await suggestions('SELECT * FROM clientes c; SELECT ▏ FROM productos;');assert.ok(separated.labels.includes('precio'));assert.ok(!separated.labels.includes('email'));
 const unknown=await suggestions('SELECT x.▏ FROM inexistente x;');assert.ok(!unknown.labels.includes('precio'));assert.ok(!unknown.labels.includes('email'));
});
test('SQL contextual: comentarios y literales no participan como FROM ni activan sugerencias',async()=>{
 for(const marked of ["SELECT 'FROM clientes pre▏' FROM productos;",'SELECT * FROM productos; -- pre▏','/* SELECT pre▏ FROM clientes */'])assert.equal((await suggestions(marked)).labels.length,0,marked);
 const value=await suggestions('SELECT ▏ /* FROM clientes */ FROM productos;');assert.ok(value.labels.includes('precio'));assert.ok(!value.labels.includes('email'));
});
test('SQL contextual: identificadores entre comillas y alias con mayúsculas insertan sin duplicar el calificador',async()=>{
 const current:RuntimeSchema={version:1,entities:[{name:'Mi tabla',kind:'table',columns:[{name:'precio final',type:'integer'},{name:'nombre',type:'text'}]}]};
 const value=await suggestions('SELECT P.▏ FROM "Mi tabla" AS P;',current);
 assert.ok(value.labels.includes('precio final'));assert.ok(['SELECT P."precio final" FROM "Mi tabla" AS P;','SELECT P.`precio final` FROM "Mi tabla" AS P;'].includes(value.insert('precio final')));
});
test('SQL contextual: adaptador conserva columnas y palabras clave con identidades y rangos correctos',async()=>{
 const adapter=createSQLCompletion();const document='SELECT pre FROM productos;';const request={requestId:'sql-1',workspaceId:'sql',file:'consulta.sql',revision:2,generation:3,position:10,document,schema};
 const value=await adapter.complete(request,new AbortController().signal);assert.ok(value.items.some(item=>item.label==='precio'));
 assert.deepEqual([value.requestId,value.workspaceId,value.file,value.revision,value.generation],['sql-1','sql','consulta.sql',2,3]);
 const price=value.items.find(item=>item.label==='precio')!;assert.equal(document.slice(0,value.from)+price.insertText+document.slice(value.to),'SELECT precio FROM productos;');
 const keyword=await adapter.complete({...request,document:'SEL',position:3},new AbortController().signal);assert.ok(keyword.items.some(item=>item.label==='SELECT'));
 const joined=await adapter.complete({...request,document:'SELECT nom FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;',position:10},new AbortController().signal);
 for(const label of ['p.nombre','v.nombre'])assert.ok(joined.items.some(item=>item.label===label),label);
 await adapter.dispose();
});
