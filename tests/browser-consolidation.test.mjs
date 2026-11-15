import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reviewFocusChange,assembleEvidence} from '../specs/verification/browser-point-3-consolidate.mjs';
import {assessBrowserRun} from '../scripts/lib/browser-run.ts';
const source=body=>`import {test} from 'x';\ntest(caseTitle('APP-04'),async()=>{${body}});\ntest(caseTitle('APP-05'),async()=>{unchanged();});\n`;
function group(id='SQL-01',status='passed') {return {execution:'original/results.json',projects:['firefox-escritorio'],raw:{stats:{expected:999},suites:[{file:'practice-desktop.spec.ts',specs:[{file:'practice-desktop.spec.ts',title:`[${id}] prueba`,tests:[{projectName:'firefox-escritorio',status:status==='passed'?'expected':'unexpected',expectedStatus:'passed',results:[{status,retry:0,duration:12}]}]}]}]}};}
test('consolidación: acredita solo un cambio limitado a APP-04 y conserva hashes de las partes sin cambios',()=>{
  const review=reviewFocusChange(source('pointer();'),source('keyboard();'));
  assert.equal(review.status,'reviewed'); assert.deepEqual(review.affectedCases,['APP-04']); assert.equal(review.beforeUnchangedHash,review.afterUnchangedHash);
});
test('consolidación: rechaza cambios fuera de APP-04 y marcadores ausentes o repetidos',()=>{
  assert.throws(()=>reviewFocusChange(source('a();'),source('b();').replace('unchanged();','changed();')));
  assert.throws(()=>reviewFocusChange('missing',source('b();')));
  assert.throws(()=>reviewFocusChange(source('a();')+source('a();'),source('b();')));
});
test('consolidación: recalcula contadores de los resultados reales y conserva procedencia por caso',()=>{
  const assembled=assembleEvidence([group()]);
  assert.equal(assembled.kind,'consolidated-evidence'); assert.equal(assembled.stats.expected,1);
  assert.equal(assembled.provenance[0].execution,'original/results.json');
  assert.equal(assessBrowserRun(assembled,{projects:['firefox-escritorio'],grep:'SQL-01',smoke:false,list:false,buildOnly:false}).status,'subset-passed');
});
test('consolidación: no oculta un fallo con un contador favorable ni acepta duplicar un caso',()=>{
  const failed=assembleEvidence([group('SQL-01','failed')]);
  assert.equal(failed.stats.unexpected,1);
  assert.equal(assessBrowserRun(failed,{projects:['firefox-escritorio'],grep:'SQL-01',smoke:false,list:false,buildOnly:false}).status,'incomplete');
  assert.throws(()=>assembleEvidence([group(),group()]));
});
test('consolidación: selección explícita separa el foco corregido de los casos históricos',()=>{
  const old=group(),focus=group('APP-04'); focus.raw.suites[0].file='application.spec.ts'; focus.raw.suites[0].specs[0].file='application.spec.ts';
  old.includeIds=['APP-04'];
  const result=assembleEvidence([old,focus]); assert.equal(result.provenance.length,1); assert.equal(result.provenance[0].id,'APP-04');
});
