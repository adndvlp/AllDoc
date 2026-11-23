import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sqlCurriculum,sqlConceptPlans,inspectSqlCurriculum,getPublishedSqlCurriculum} from '../src/content/sql/curriculum.ts';
import {sqlDialects,getSqlCapability} from '../src/content/sql/capabilities.ts';
import {resolveSqlPlacement,sqlPracticeIdentity} from '../src/content/sql/placements.ts';
import {assessSqlVariant,resolveSqlExampleAction} from '../src/content/sql/variants.ts';
import {concepts} from '../src/content/concepts.ts';
import {catalog} from '../src/content/catalog.ts';
import {practiceRegistry} from '../src/practice/profiles.ts';
import {workspaceKey} from '../src/practice/context.ts';
import type {SqlVariant,VerifiedSqliteExample,SqlGroupPlan} from '../src/content/sql/contracts.ts';

const groupKeys=['select','limit','where','between','in','like','order-by','distinct','join','outer-joins','null','coalesce','case','cast','text-functions','numeric-functions','aggregation','group-by','logical-order','insert','update','delete','create-table','alter-table','drop-table','views','indexes','subqueries','union','intersect','except','cte','window-functions','transactions'];
const legacy=concepts.filter(c=>['select','where','order-by','limit','comentarios'].some(id=>c.id==='analisis-de-datos/sql/'+id));
const source={url:'https://sqlite.org/lang_select.html',targetVersion:'SQLite 3.54',checkedAt:'2026-11-21'};
const example:VerifiedSqliteExample={id:'test/select',conceptId:'analisis-de-datos/sql/select',code:'SELECT 1;',runtimeId:'sqlite-wasm',status:'verified'};
const variant:SqlVariant={conceptId:'analisis-de-datos/sql/select',feature:'select',dialectId:'sqlite',stage:'reviewed',support:'native',code:example.code,sources:[source],localExecution:{kind:'sqlite',exampleId:example.id}};

test('SQL: 34 grupos ordenados, definición inicial, dependientes dentro de su grupo y sin numeración visible',()=>{
  assert.deepEqual(sqlCurriculum.map(g=>g.key),groupKeys);
  assert.deepEqual(sqlCurriculum.map(g=>g.order),groupKeys.map((_,i)=>i+1));
  assert.deepEqual(inspectSqlCurriculum(sqlCurriculum),[]);
  for(const g of sqlCurriculum){assert.equal(g.children[0].label,'Definición');assert.equal(g.collapsed,true);assert.doesNotMatch(g.label,/^\d+[.\-]/);}
  for(const [group,key] of [['where','and'],['where','or'],['order-by','desc'],['select','comentarios']])assert.ok(sqlCurriculum.find(g=>g.key===group)?.children.some(c=>c.key===group+'/'+key));
  assert.equal(new Set(sqlConceptPlans.map(c=>c.id)).size,sqlConceptPlans.length);
  assert.equal(new Set(sqlConceptPlans.map(c=>c.canonicalPath)).size,sqlConceptPlans.length);
});
test('SQL: rechaza árboles con identidad repetida, definición ausente, orden ambiguo o rutas inseguras',()=>{
  const base=structuredClone(sqlCurriculum) as unknown as {key:string;label:string;order:number;collapsed:true;children:any[]}[];
  for(const mutate of [(g:typeof base)=>g[1].key=g[0].key,(g:typeof base)=>g[0].children.reverse(),(g:typeof base)=>g[1].order=g[0].order,(g:typeof base)=>g[0].children[0].file='../escape.mdx',(g:typeof base)=>g[1].children[0].id=g[0].children[0].id]){
    const changed=structuredClone(base);mutate(changed);assert.ok(inspectSqlCurriculum(changed as SqlGroupPlan[]).length>0);
  }
});
test('SQL: publicación incluye solo los 153 conceptos revisados y no importa cuerpos, filas o motores',async()=>{
  const published=getPublishedSqlCurriculum().flatMap(g=>g.children);
  assert.deepEqual(published.map(c=>c.id).sort(),concepts.filter(c=>c.topicId==='sql').map(c=>c.id).sort());
  for(const c of sqlConceptPlans){assert.equal(c.stage,legacy.some(l=>l.id===c.id)?'published-legacy':concepts.some(l=>l.id===c.id)?'published':'planned');assert.match(c.file,/^[a-z][a-z0-9/-]*\.mdx$/);}
  assert.deepEqual(catalog.map(a=>a.id),['analisis-de-datos','desarrollo-web','ia']);
  assert.equal((await readdir('docs/analisis-de-datos/sql',{recursive:true})).filter(f=>f.endsWith('.mdx')).length,153);
  for(const file of ['curriculum','contracts','capabilities','placements','variants'])assert.doesNotMatch(await readFile('src/content/sql/'+file+'.ts','utf8'),/import\s.*(?:notes\/|datasets\/rows|sqlite-wasm|pyodide|PracticeEditor)/);
});
test('SQL: inventario conserva las 99 fuentes con hash, once vacíos y destinos existentes',async()=>{
  const inventory=JSON.parse(await readFile('specs/sql/source-inventory.json','utf8'));
  assert.equal(inventory.schemaVersion,1);assert.equal(inventory.sources.length,99);assert.equal(inventory.instructions.length,2);
  assert.equal(new Set(inventory.sources.map((s:any)=>s.path)).size,99);
  assert.equal(inventory.sources.filter((s:any)=>s.empty).length,11);
  for(const s of [...inventory.sources,...inventory.instructions]){
    assert.equal(createHash('sha256').update(s.content).digest('hex'),s.sha256);
    assert.equal(Buffer.byteLength(s.content),s.bytes);
    if('targets' in s){assert.equal(s.empty,!s.content.trim());assert.ok(s.targets.length);assert.ok(s.reason.trim());for(const id of s.targets)assert.ok(sqlConceptPlans.some(c=>c.id===id),s.path+' → '+id);}
  }
  const destinations=new Set([...inventory.sources.flatMap((s:any)=>s.targets),...inventory.additions.map((a:any)=>a.conceptId)]);
  assert.deepEqual([...destinations].sort(),sqlConceptPlans.map(c=>c.id).sort());
  assert.deepEqual(inventory.groups.map((g:any)=>g.key),groupKeys);
  // El snapshot versionado permite comprobar el inventario sin depender de tmp en CI.
  const originals=await readdir('tmp/SQL').catch(error=>{if(error.code==='ENOENT')return null;throw error;});
  if(originals){
    for(const s of [...inventory.sources,...inventory.instructions])assert.equal(await readFile(s.path,'utf8'),s.content);
    const current=(await readdir('tmp/SQL',{recursive:true})).filter(p=>p.includes('/')&&p.endsWith('.md')).map(p=>'tmp/SQL/'+p);
    assert.deepEqual(current.sort(),inventory.sources.map((s:any)=>s.path).sort());
  }
});
test('SQL: cinco rutas e IDs históricos y sus ubicaciones Lenguajes comparten identidad y workspace',()=>{
  for(const c of legacy){
    const primary=resolveSqlPlacement(c.slug+'/?dialect=mysql#ejemplo');
    const alias=resolveSqlPlacement(c.slug.replace('/analisis-de-datos/','/lenguajes/'));
    assert.ok(primary);assert.ok(alias);assert.equal(primary.conceptId,c.id);assert.equal(alias.conceptId,c.id);assert.equal(alias.canonicalPath,c.slug);assert.equal(alias.locationId,'lenguajes');
    assert.deepEqual(alias.practice,sqlPracticeIdentity);
    const profile=practiceRegistry.defaultForTool(alias.practice.toolKey)!;
    assert.equal(workspaceKey(profile),workspaceKey(practiceRegistry.defaultForTool(primary.practice.toolKey)!));
    assert.equal(profile.id,'sql-sqlite');
  }
});
test('SQL: rutas de grupos, otras herramientas, URL externa y escapes no se confunden con conceptos',()=>{
  for(const pathname of ['/apuntes/lenguajes/sql','/apuntes/analisis-de-datos/sql','https://example.com/apuntes/lenguajes/sql/select','//example.com/apuntes/lenguajes/sql/select','/apuntes/analisis-de-datos/pandas/dataframe','/apuntes/lenguajes/sql/where/desconocido','/apuntes/lenguajes/sql/%2e%2e/select','/apuntes/lenguajes/sql//select'])assert.equal(resolveSqlPlacement(pathname),null,pathname);
});
test('SQL: la matriz tiene seis dialectos y ninguna capacidad pendiente se convierte en soporte implícito',()=>{
  assert.deepEqual(sqlDialects.map(d=>d.id),['sqlite','postgresql','mysql','sqlserver','mariadb','oracle']);
  for(const c of sqlConceptPlans)for(const dialect of sqlDialects){
    const cell=getSqlCapability(c.feature,dialect.id);assert.ok(cell);
    if(cell.status==='pending'){assert.ok(cell.reason);assert.equal('support' in cell,false);}
    else{assert.ok(cell.sources.length);assert.ok(cell.syntax||cell.explanation);for(const s of cell.sources){assert.match(s.url,/^https:\/\//);assert.ok(s.targetVersion);assert.match(s.checkedAt,/^\d{4}-\d{2}-\d{2}$/);}}
  }
  assert.equal(getSqlCapability('inexistente','sqlite').status,'pending');
});
test('SQL: límite distingue LIMIT, TOP y FETCH sin confundir el dialecto documental con otro runtime',()=>{
  for(const [dialect,syntax,support] of [['sqlite','LIMIT','native'],['postgresql','LIMIT','native'],['mysql','LIMIT','native'],['mariadb','LIMIT','native'],['sqlserver','TOP','equivalent'],['oracle','FETCH','equivalent']] as const){
    const cell=getSqlCapability('limit',dialect);assert.equal(cell.status,'reviewed');if(cell.status==='reviewed'){assert.equal(cell.syntax,syntax);assert.equal(cell.support,support);}
  }
});
test('SQL: ausencia de sintaxis nativa se explica y no publica código ni ejecución local ficticios',()=>{
  const cell=getSqlCapability('full-outer-join','mysql');assert.equal(cell.status,'reviewed');
  if(cell.status==='reviewed')assert.equal(cell.support,'unavailable');
  const unavailable={...variant,conceptId:'analisis-de-datos/sql/outer-joins/full-outer-join',feature:'full-outer-join',dialectId:'mysql',support:'unavailable',code:undefined,
    explanation:'No existe esta sintaxis nativa en la gramática revisada. La emulación requiere una variante propia.',
    sources:[{...source,url:'https://dev.mysql.com/doc/refman/9.7/en/join.html',targetVersion:'MySQL 9.7'}],
    localExecution:{kind:'external',explanation:'Consultar alternativas para el RDBMS del usuario.'}};
  assert.equal(assessSqlVariant(unavailable).status,'ready');
  const action=resolveSqlExampleAction(unavailable);assert.equal(action.kind,'external');assert.equal(action.code,undefined);assert.equal(action.label,'Ver alternativa');
  assert.equal(assessSqlVariant({...unavailable,code:'FULL OUTER JOIN'}).status,'invalid');
  assert.equal(assessSqlVariant({...unavailable,localExecution:{kind:'sqlite',exampleId:example.id}},[example]).status,'invalid');
});
test('SQL: variante revisada requiere fuentes y un ejemplo SQLite verificado con el mismo código',()=>{
  assert.equal(assessSqlVariant(variant,[example]).status,'ready');
  assert.notEqual(assessSqlVariant({...variant,sources:[]},[example]).status,'ready');
  assert.notEqual(assessSqlVariant(variant,[]).status,'ready');
  assert.notEqual(assessSqlVariant({...variant,code:'DELETE FROM productos;'},[example]).status,'ready');
  assert.notEqual(assessSqlVariant({...variant,sources:[{...source,checkedAt:'2026-02-30'}]},[example]).status,'ready');
  assert.notEqual(assessSqlVariant({...variant,dialectId:'inventado'},[example]).status,'ready');
  assert.notEqual(assessSqlVariant({...variant,sources:[{...source,url:'https://example.com/sql'}]},[example]).status,'ready');
});
test('SQL: borradores y variantes sin capacidad revisada no se publican aunque tengan SQL',()=>{
  assert.equal(assessSqlVariant({...variant,stage:'draft'},[example]).status,'pending');
  assert.equal(assessSqlVariant({...variant,stage:'draft',conceptId:'analisis-de-datos/sql/window-functions',feature:'window-functions',code:'SELECT SUM(precio) OVER () FROM productos;',
    localExecution:{kind:'external',explanation:'La variante aún debe revisarse.'}}).status,'pending');
  for(const value of [null,undefined,[],{},42,'SELECT 1;'])assert.equal(assessSqlVariant(value,[example]).status,'invalid');
});
test('SQL: estados y modos de ejecución mal serializados no eluden la revisión',()=>{
  for(const malformed of [
    {...variant,stage:['reviewed']},{...variant,stage:['draft']},{...variant,support:['native']},
    {...variant,localExecution:{kind:['sqlite'],exampleId:example.id}},
  ]){
    assert.equal(assessSqlVariant(malformed,[example]).status,'invalid');
    assert.equal(resolveSqlExampleAction(malformed,[example]).kind,'disabled');
  }
});
test('SQL: una variante externa no habilita ejecutar MySQL en SQLite ni inventa un resultado',()=>{
  const external={...variant,conceptId:'analisis-de-datos/sql/limit',dialectId:'mysql',feature:'limit',code:'SELECT nombre FROM productos LIMIT 2;',sources:[{...source,url:'https://dev.mysql.com/doc/refman/9.7/en/select.html',targetVersion:'MySQL 9.7'}],localExecution:{kind:'external',explanation:'Ejecutar en el MySQL del usuario.'}};
  assert.equal(assessSqlVariant(external).status,'ready');
  const action=resolveSqlExampleAction(external);assert.equal(action.kind,'external');assert.equal(action.code,external.code);assert.equal(action.executesAutomatically,false);assert.equal(action.exampleId,undefined);
  assert.notEqual(assessSqlVariant({...external,localExecution:{kind:'external',explanation:''}}).status,'ready');
});
test('SQL: equivalente local exige explicación y acción explícita; nunca cambia el borrador por cambiar dialecto',()=>{
  const local:VerifiedSqliteExample={id:'test/limit',conceptId:'analisis-de-datos/sql/limit',code:'SELECT nombre FROM productos LIMIT 1;',runtimeId:'sqlite-wasm',status:'verified',equivalentTo:[{dialectId:'sqlserver',code:'SELECT TOP (1) nombre FROM productos;'}]};
  const equivalent={...variant,conceptId:'analisis-de-datos/sql/limit',dialectId:'sqlserver',feature:'limit',support:'equivalent',code:'SELECT TOP (1) nombre FROM productos;',sources:[{...source,url:'https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql',targetVersion:'SQL Server 2025'}],localExecution:{kind:'sqlite-equivalent',exampleId:local.id,explanation:'El panel ejecuta el ejemplo SQLite equivalente.'}};
  assert.equal(assessSqlVariant(equivalent,[local]).status,'ready');
  const action=resolveSqlExampleAction(equivalent,[local]);assert.equal(action.kind,'sqlite-equivalent');assert.match(action.label,/equivalente.*SQLite/);assert.equal(action.code,local.code);assert.equal(action.executesAutomatically,false);
  assert.notEqual(assessSqlVariant({...equivalent,localExecution:{...equivalent.localExecution,explanation:''}},[local]).status,'ready');
  assert.notEqual(assessSqlVariant(equivalent,[{...local,conceptId:example.conceptId}]).status,'ready');
  assert.notEqual(assessSqlVariant(equivalent,[{...local,equivalentTo:[]}]).status,'ready');
  assert.notEqual(assessSqlVariant(equivalent,[local,local]).status,'ready');
  assert.equal(resolveSqlExampleAction({...variant,stage:'draft'},[example]).kind,'disabled');
});
