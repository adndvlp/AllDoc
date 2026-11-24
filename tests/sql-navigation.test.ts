import {test} from 'node:test';import assert from 'node:assert/strict';
import path from 'node:path';
import {catalog,getTopics} from '../src/content/catalog.ts';import {areas} from '../src/content/areas.ts';
import {concepts,getConceptByDocId} from '../src/content/concepts.ts';import {entries} from '../src/content/search-index.ts';
import {getPublishedSqlCurriculum} from '../src/content/sql/curriculum.ts';
import {createSidebars} from '../src/lib/catalog-sidebar.ts';
import {parseConceptFrontMatter} from '../src/lib/concept-front-matter.ts';
import {resolveSqlPlacement,sqlAreaTarget,sqlHrefInLocation,sqlPathForLocation,sqlDocIdForLocation} from '../src/content/sql/placements.ts';
import {resolvePracticeEditorContext} from '../src/practice/context.ts';
import {createPersonalLibrary} from '../src/lib/personal-library.ts';

const sql=concepts.filter(c=>c.topicId==='sql');
const alias=(slug:string)=>slug.replace('/analisis-de-datos/sql/','/lenguajes/sql/');
test('navegación SQL: cuatro áreas y SQL conserva sus rutas compartidas en Lenguajes',()=>{
 assert.deepEqual(areas.map(a=>a.id),['analisis-de-datos','desarrollo-web','ia','lenguajes']);
 assert.deepEqual(getTopics('lenguajes').map(t=>t.id),['sql','r']);
 const primary=getTopics('analisis-de-datos').find(t=>t.id==='sql')!,other=getTopics('lenguajes')[0];assert.deepEqual(other.concepts,primary.concepts);assert.equal(other.sections,primary.sections);
 assert.equal(sql.length,153);assert.equal(entries.filter(e=>e.context.endsWith('/ SQL')).length,153);assert.equal(new Set(entries.map(e=>e.id)).size,concepts.length);
});
test('navegación SQL: cambiar de área mantiene el concepto y los enlaces mantienen consulta y fragmento',()=>{
 assert.equal(sqlAreaTarget('/apuntes/analisis-de-datos/sql/where/and','lenguajes'),'/apuntes/lenguajes/sql/where/and');
 assert.equal(sqlAreaTarget('/apuntes/lenguajes/sql/limit','analisis-de-datos'),'/apuntes/analisis-de-datos/sql/limit');
 assert.equal(sqlAreaTarget('/apuntes/lenguajes/sql/select','ia'),'/apuntes/ia');
 assert.equal(sqlAreaTarget('/apuntes/analisis-de-datos/pandas/dataframe','lenguajes'),'/apuntes/lenguajes');
 assert.equal(sqlHrefInLocation('/apuntes/analisis-de-datos/sql/null?dialect=mysql#dato','lenguajes'),'/apuntes/lenguajes/sql/null?dialect=mysql#dato');
 assert.equal(sqlHrefInLocation('https://example.com/sql/select','lenguajes'),'https://example.com/sql/select');
});
test('navegación SQL: solo conceptos y ubicaciones publicados crean rutas o documentos',()=>{
 for(const id of ['retirado','analisis-de-datos/sql/no-existe','']){assert.equal(sqlPathForLocation(id,'lenguajes'),null);assert.equal(sqlDocIdForLocation(id,'lenguajes'),null);}
 for(const route of ['//apuntes/lenguajes/sql/select','/apuntes/lenguajes/sql/no-existe','/apuntes/lenguajes/sql/../select'])assert.equal(resolveSqlPlacement(route),null);
});
test('navegación SQL: catálogo y ambos sidebars usan los 34 grupos con Definición primero',()=>{
 const bars=createSidebars(catalog);assert.ok(bars.lenguajes);const expected=getPublishedSqlCurriculum();
 for(const name of ['analisisDeDatos','lenguajes']){const root=bars[name].find(n=>n.label==='SQL')!;assert.ok(root);assert.ok(Array.isArray(root.items));assert.equal(root.items.length,34);
  root.items.forEach((g:any,i:number)=>{assert.equal(g.type,'category');assert.equal(g.label,expected[i].label);assert.equal(g.collapsed,true);assert.equal(g.link,undefined);assert.equal(g.items.length,expected[i].children.length);assert.equal(g.items[0].label,'Definición');});
 }
});
test('navegación SQL: cada documento alias resuelve la identidad canónica, ruta y contexto de práctica',()=>{
 for(const c of sql){const plan=getPublishedSqlCurriculum().flatMap(g=>g.children).find(p=>p.id===c.id)!;const id='lenguajes/sql/'+plan.file.replace(/\.mdx$/,'');
  assert.equal(getConceptByDocId(id)?.id,c.id,id);const placement=resolveSqlPlacement(alias(c.slug));assert.equal(placement?.conceptId,c.id);assert.equal(placement?.locationStage,'existing');
  const first=resolvePracticeEditorContext(c.slug),second=resolvePracticeEditorContext(alias(c.slug));assert.ok(first&&second);assert.deepEqual(second,first);
 }
});
test('navegación SQL: los recientes y favoritos guardan una identidad al alternar ubicaciones',()=>{
 const c=sql[0];const store=createPersonalLibrary(concepts,()=>10);store.hydrate(null);store.activateRoute(alias(c.slug));assert.deepEqual(store.getSnapshot().recents.map(r=>r.conceptId),[c.id]);
 store.toggleFavorite(c.id);store.activateRoute(c.slug);store.activateRoute(alias(c.slug));assert.deepEqual(store.getSnapshot().favorites,[c.id]);assert.deepEqual(store.getSnapshot().recents.map(r=>r.conceptId),[c.id]);
});
test('navegación SQL: front matter alias usa su sidebar/paginación y conserva canonical hacia Análisis',async()=>{
 const c=sql[0];const parsed={content:'cuerpo compartido',frontMatter:{hide_table_of_contents:true}};
 const result=await parseConceptFrontMatter({filePath:path.resolve('docs/lenguajes/sql/select/definicion.mdx'),fileContent:'',defaultParseFrontMatter:async()=>parsed});
 assert.equal(result.content,parsed.content);assert.equal(result.frontMatter.slug,alias(c.slug).slice('/apuntes'.length));assert.equal(result.frontMatter.displayed_sidebar,'lenguajes');
 assert.equal(result.frontMatter.alldoc_canonical,c.slug);assert.equal(result.frontMatter.pagination_prev,null);assert.equal(result.frontMatter.pagination_next,'lenguajes/sql/select/todas-las-columnas');
});
