import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {PassThrough,Writable} from 'node:stream';
import {runBrowserCommand} from '../scripts/lib/browser-command.mjs';

function fixture() {
  const child=new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.signals=[];
  child.kill=signal=>{child.signals.push(signal);queueMicrotask(()=>child.emit('close',null,signal));return true;};
  const spawnProcess=()=>{queueMicrotask(()=>child.stdout.write('salida real del proceso'));return child;};
  return {child,spawnProcess};
}

test('ENOSPC al escribir el log: rechaza, termina el hijo y espera su cierre sin error global',{timeout:1500},async()=>{
  const {child,spawnProcess}=fixture(),error=Object.assign(new Error('No space left on device'),{code:'ENOSPC'});
  const log=new Writable({write(_chunk,_encoding,callback){callback(error);}});
  let current;
  await assert.rejects(runBrowserCommand({args:[],logPath:'injected.log',onChild:value=>{current=value;}},{spawnProcess,openLog:()=>log}),{code:'ENOSPC'});
  assert.deepEqual(child.signals,['SIGTERM']);assert.equal(current,undefined);assert.equal(log.destroyed,true);
});

test('ENOSPC al cerrar el log: un proceso con código cero no se presenta como aprobado',{timeout:1500},async()=>{
  const {spawnProcess,child}=fixture();const error=Object.assign(new Error('No space left on device'),{code:'ENOSPC'});
  const log=new Writable({write(_chunk,_encoding,callback){queueMicrotask(()=>child.emit('close',0));callback();},final(callback){callback(error);}});
  await assert.rejects(runBrowserCommand({args:[],logPath:'injected.log'},{spawnProcess,openLog:()=>log}),{code:'ENOSPC'});
});

test('comando real: espera stdout/stderr y cierre del log sin cambiar el código de salida',async()=>{
  const chunks=[],log=new Writable({write(chunk,_encoding,callback){chunks.push(chunk);callback();}});
  const result=await runBrowserCommand({args:['-e','process.stdout.write("salida");process.stderr.write("diagnóstico");process.exitCode=3;'],logPath:'injected.log'},{openLog:()=>log});
  assert.equal(result,3);assert.equal(log.writableFinished,true);
  const output=Buffer.concat(chunks).toString();assert.match(output,/salida/);assert.match(output,/diagnóstico/);
});

test('fallo al crear el log no inicia un proceso y fallo de spawn no deja la promesa pendiente',{timeout:1500},async()=>{
  const error=Object.assign(new Error('No space left on device'),{code:'ENOSPC'});let spawned=false;
  await assert.rejects(runBrowserCommand({args:[],logPath:'injected.log'},{openLog:()=>{throw error;},spawnProcess:()=>{spawned=true;}}),{code:'ENOSPC'});
  assert.equal(spawned,false);
  const log=new Writable({write(_chunk,_encoding,callback){callback();}});
  await assert.rejects(runBrowserCommand({args:[],cwd:'/alldoc-deliberately-missing-directory',logPath:'injected.log'},{openLog:()=>log}),{code:'ENOENT'});
  assert.equal(log.writableFinished,true);
});
