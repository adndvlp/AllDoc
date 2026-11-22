import {test} from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';
import {sqlConcepts} from '../src/content/sql.ts';
const require=createRequire(import.meta.url);const {transformSync}=require('@babel/core');
const cache=new Map<string,{exports:any}>();
function compile<T>(file:string):T{
 const filename=path.resolve(file);if(cache.has(filename))return cache.get(filename)!.exports;
 const module={exports:{}};cache.set(filename,module);
 const {code}=transformSync(readFileSync(filename,'utf8'),{filename,babelrc:false,configFile:false,envName:'production',caller:{name:'client'},presets:[require.resolve('@docusaurus/babel/preset')],plugins:[require.resolve('@babel/plugin-transform-modules-commonjs')]});
 new Function('require','module','exports',code)((id:string)=>id.startsWith('.')?compile(path.resolve(path.dirname(filename),id.endsWith('.ts')?id:id+'.ts')):require(id),module,module.exports);return module.exports as T;
}
test('preset cliente SQL: la matriz conserva capacidades y acciones revisadas para todas las fichas',()=>{
 const {sqlDialects,getSqlCapability}=compile<typeof import('../src/content/sql/capabilities.ts')>('src/content/sql/capabilities.ts');
 const {resolveNoteExample}=compile<typeof import('../src/content/notes/sql/factory.ts')>('src/content/notes/sql/factory.ts');
 assert.equal(getSqlCapability('limit','sqlserver').status,'reviewed');
 for(const c of sqlConcepts)for(const e of c.examples)for(const d of sqlDialects)assert.notEqual(resolveNoteExample(c,e,d.id).action.kind,'disabled',e.id+'/'+d.id);
});
test('preset cliente SQL: seleccionar y navegar notifican al selector de React',()=>{
 const {createSqlDialectStore}=compile<typeof import('../src/content/sql/dialect-store.ts')>('src/content/sql/dialect-store.ts');const store=createSqlDialectStore();let calls=0;store.subscribe(()=>calls++);store.select('mysql');assert.equal(calls,1);store.navigate('?dialect=oracle');assert.equal(calls,2);
});
