import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as evidence from '../specs/verification/browser-point-5-consolidate.mjs';
const {combineChromiumParts}=evidence;
import {assessChromiumRegression,chromiumNames} from '../scripts/lib/browser-acceptance.ts';

function fixture() {
  const raw={config:{updateSnapshots:'none',workers:2,projects:chromiumNames.map(name=>({name,retries:0,repeatEach:1})),metadata:{suite:'chromium'}},
    errors:[],stats:{startTime:'2026-11-15T10:00:00Z',expected:7,skipped:0,flaky:0,unexpected:0},
    suites:[{file:'sample.spec.ts',specs:[{title:'caso real',file:'sample.spec.ts',line:1,column:1,tests:chromiumNames.map(projectName=>({projectName,expectedStatus:'passed',status:'expected',results:[{status:'passed',retry:0,duration:1}]}))}]}]};
  const discovery=structuredClone(raw);for(const t of discovery.suites[0].specs[0].tests){t.results=[];t.status='skipped';}
  return {raw,discovery};
}
test('consolidación: recalcula casos reales y conserva procedencia sin mutar resultados originales',()=>{
  const {raw,discovery}=fixture(),before=JSON.stringify(raw);raw.errors=[{message:'Fallo global original en un caso excluido'}];
  const result=combineChromiumParts([{label:'original',raw,select:()=>true,reviewedGlobalErrors:structuredClone(raw.errors)}],discovery);
  assert.equal(result.kind,'consolidated-evidence');assert.equal(result.provenance.cases.length,7);
  assert.equal(assessChromiumRegression(result,discovery).status,'passed');assert.equal(result.provenance.sources[0].errors.length,1);
  raw.errors=[];assert.equal(JSON.stringify(raw),before);
});

test('consolidación: errores globales requieren revisión explícita y ningún resultado inestable se oculta',()=>{
  const {raw,discovery}=fixture();raw.errors=[{message:'error global'}];
  assert.throws(()=>combineChromiumParts([{label:'bad',raw,select:()=>true}],discovery),/sin revisión/);
  raw.errors=[];raw.stats.flaky=1;
  assert.throws(()=>combineChromiumParts([{label:'bad',raw,select:()=>true}],discovery),/inestable/);
});
test('consolidación: rechaza duplicados y huecos aunque cada fuente tenga contadores favorables',()=>{
  const {raw,discovery}=fixture();const part={label:'one',raw,select:()=>true};
  assert.throws(()=>combineChromiumParts([part,{...part,label:'two'}],discovery),/duplicado/);
  assert.throws(()=>combineChromiumParts([{...part,select:c=>c.project!=='laptop'}],discovery),/Falta/);
});
test('consolidación: no selecciona fallos ni reintentos ni transforma datos en aprobaciones',()=>{
  for(const result of [{status:'failed',retry:0},{status:'passed',retry:1}]){
    const {raw,discovery}=fixture();raw.suites[0].specs[0].tests[0].results=[result];
    assert.throws(()=>combineChromiumParts([{label:'bad',raw,select:()=>true}],discovery),/sin aprobación/);
  }
});
test('consolidación: selecciona por caso/proyecto y rechaza identidades que no pertenecen al descubrimiento',()=>{
  const {raw,discovery}=fixture();const a={label:'mobile',raw,select:c=>!['laptop','escritorio'].includes(c.project)},b={label:'desktop',raw,select:c=>['laptop','escritorio'].includes(c.project)};
  assert.equal(combineChromiumParts([a,b],discovery).stats.expected,7);
  raw.suites[0].specs[0].title='otro caso';assert.throws(()=>combineChromiumParts([{label:'bad',raw,select:()=>true}],discovery),/ajeno/);
});

test('consolidación: ninguna fuente puede actualizar capturas aunque sus casos estén aprobados',()=>{
  const {raw,discovery}=fixture();raw.config.updateSnapshots='all';
  assert.throws(()=>combineChromiumParts([{label:'bad',raw,select:()=>true}],discovery),/actualizar/);
});

test('compatibilidad: exige hashes idénticos salvo cada cambio de herramienta revisado explícitamente',()=>{
  const before=[{path:'old',sha256:'a'},{path:'same',sha256:'s'}],after=[{path:'new',sha256:'n'},{path:'old',sha256:'b'},{path:'same',sha256:'s'}];
  const reviewed=[{path:'new',before:null,after:'n'},{path:'old',before:'a',after:'b'}];
  assert.deepEqual(evidence.reviewToolingChanges(before,after,reviewed),reviewed);
  assert.throws(()=>evidence.reviewToolingChanges(before,after,reviewed.slice(1)),/no revisado/);
  assert.throws(()=>evidence.reviewToolingChanges(before,after,[...reviewed,{path:'same',before:'s',after:'s'}]),/no revisado/);
  assert.throws(()=>evidence.reviewToolingChanges([...before,before[0]],after,reviewed),/duplicado/);
});
