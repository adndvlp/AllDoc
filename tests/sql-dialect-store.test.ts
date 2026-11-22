import {test} from 'node:test';import assert from 'node:assert/strict';
import {createSqlDialectStore,sqlDialectStorageKey} from '../src/content/sql/dialect-store.ts';
const fixture=()=>{const values=new Map<string,string>();return {values,storage:{getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>{values.set(key,value);}}};};
test('dialecto: SQLite inicial SSR, selección validada y preferencia persistente con notificación estable',()=>{
 const {values,storage}=fixture();const s=createSqlDialectStore(()=>storage);assert.equal(s.getServerSnapshot(),'sqlite');assert.equal(s.getSnapshot(),'sqlite');let calls=0;s.subscribe(()=>calls++);
 s.select('mysql');assert.equal(s.getSnapshot(),'mysql');assert.equal(values.get(sqlDialectStorageKey),'mysql');s.select('mysql');assert.equal(calls,1);s.select('__proto__');assert.equal(s.getSnapshot(),'mysql');
 const again=createSqlDialectStore(()=>storage);again.navigate('');assert.equal(again.getSnapshot(),'mysql');
});
test('dialecto: parámetro de enlace prevalece solo en esa navegación, inválido usa SQLite sin borrar preferencia',()=>{
 const {values,storage}=fixture();values.set(sqlDialectStorageKey,'oracle');const s=createSqlDialectStore(()=>storage);
 s.navigate('?dialect=postgresql');assert.equal(s.getSnapshot(),'postgresql');assert.equal(values.get(sqlDialectStorageKey),'oracle');
 s.navigate('?dialect=desconocido');assert.equal(s.getSnapshot(),'sqlite');assert.equal(values.get(sqlDialectStorageKey),'oracle');s.navigate('');assert.equal(s.getSnapshot(),'oracle');
 s.navigate('?dialect=mysql&dialect=oracle');assert.equal(s.getSnapshot(),'sqlite');
});
test('dialecto: almacenamiento corrupto o bloqueado conserva selección en memoria y no lanza',()=>{
 const {values,storage}=fixture();values.set(sqlDialectStorageKey,'{"dialect":"mysql"}');const s=createSqlDialectStore(()=>storage);s.navigate('');assert.equal(s.getSnapshot(),'sqlite');
 const blocked=createSqlDialectStore(()=>{throw new Error('blocked');});assert.doesNotThrow(()=>blocked.navigate(''));blocked.select('mariadb');assert.equal(blocked.getSnapshot(),'mariadb');blocked.navigate('');assert.equal(blocked.getSnapshot(),'mariadb');
});
