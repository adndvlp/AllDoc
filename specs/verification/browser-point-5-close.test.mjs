import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as closing from './browser-point-5-close.mjs';

function fixture() {
  const hashes=()=>[{path:'fixture',sha256:'original'}];
  const r={source:{sha256:'same-source'},before:{source:'same-source',tooling:hashes(),references:hashes(),review:hashes(),packages:hashes()},
    environment:{node:'v26'},packages:{playwright:'same'},status:'subset-complete',failure:null,
    checks:Object.fromEntries(['native','typesApp','typesTests','buildApp','runtime'].map(k=>[k,{status:'passed'}])),
    invariants:{source:true,tooling:true,references:true,review:true,packages:true,chromiumBaseline:true},
    review:{status:'approved',images:52,manifests:6},tdd:{status:'recorded'},productPaths:{status:'unchanged'},chromiumBaseline:true,
    preflight:{status:'ready',engines:[{engine:'chromium',status:'ready',version:'159'}]},
    origins:{appOrigin:'http://127.0.0.1:4000',runtimeOrigin:'http://localhost:4001'},
    runtimeManifest:{appOrigin:'http://127.0.0.1:4000',runtimeOrigin:'http://localhost:4001'},
    projects:{chromium:[{name:'laptop',use:{baseURL:'http://127.0.0.1:4000',viewport:{width:1280,height:800},colorScheme:'dark'}}]}};
  return {run:structuredClone(r),target:structuredClone(r),baseline:structuredClone(r)};
}
test('cierre: admite puertos propios diferentes con las mismas fuentes, versiones, referencias y configuración efectiva',()=>{
  const {run,target,baseline}=fixture();run.origins.appOrigin='http://127.0.0.1:5000';run.runtimeManifest.appOrigin=run.origins.appOrigin;run.projects.chromium[0].use.baseURL=run.origins.appOrigin;
  assert.equal(closing.checkCompatibleRun(run,target,baseline,[]).status,'compatible');
});
test('cierre: rechaza cambios de producto, referencias, herramientas, motor y viewport',()=>{
  for(const mutate of [r=>r.source.sha256='changed',r=>r.before.references[0].sha256='changed',r=>r.before.tooling[0].sha256='changed',r=>r.preflight.engines[0].version='160',r=>r.projects.chromium[0].use.viewport.width=800]){
    const {run,target,baseline}=fixture();mutate(run);assert.throws(()=>closing.checkCompatibleRun(run,target,baseline,[]),/incompatible|no revisado/);
  }
});
test('cierre: exige comprobaciones e invariantes y vincula los orígenes del runtime al build',()=>{
  for(const mutate of [r=>r.checks.typesTests.status='failed',r=>r.invariants.tooling=false,r=>r.runtimeManifest.appOrigin='http://other:1',r=>r.origins.runtimeOrigin='http://127.0.0.1:4001']){
    const {run,target,baseline}=fixture();mutate(run);assert.throws(()=>closing.checkCompatibleRun(run,target,baseline,[]),/incompatible|incompleta/);
  }
});
test('cierre: solo la pasada original revisada puede estar abortada y los cambios de herramienta exigen hashes exactos',()=>{
  const {run,target,baseline}=fixture();run.status='partial';run.failure={stage:'suite-chromium'};delete run.invariants;
  assert.throws(()=>closing.checkCompatibleRun(run,target,baseline,[]),/incompleta/);
  assert.equal(closing.checkCompatibleRun(run,target,baseline,[],true).status,'compatible');
  run.before.tooling[0].sha256='previous';
  assert.equal(closing.checkCompatibleRun(run,target,baseline,[{path:'fixture',before:'previous',after:'original'}],true).status,'compatible');
  run.before.tooling[0].sha256='original';run.failure.stage='suite-functional';assert.throws(()=>closing.checkCompatibleRun(run,target,baseline,[],true),/incompleta/);
});
