import {test} from 'node:test';
import assert from 'node:assert/strict';
import {preflightAcceptance} from '../scripts/lib/browser-acceptance-preflight.ts';

test('preflight final: los tres motores arrancan y cierran antes del build; selección solo Chromium',async()=>{
  const opened:string[]=[],closed:string[]=[];
  const launcher=(engine:string)=>({async launch(){opened.push(engine);return {version:()=>engine+' versión',async close(){closed.push(engine);}};}});
  const launchers={firefox:launcher('firefox'),webkit:launcher('webkit'),chromium:launcher('chromium')};
  assert.equal((await preflightAcceptance(['firefox','webkit','chromium'],launchers)).status,'ready');assert.deepEqual(opened,closed);assert.equal(closed.length,3);
  opened.length=0;closed.length=0;assert.equal((await preflightAcceptance(['chromium'],launchers)).status,'ready');assert.deepEqual(opened,['chromium']);assert.deepEqual(closed,opened);
});
test('preflight final: Chromium ausente impide el cierre y conserva la liberación de otros motores',async()=>{
  let closed=0;
  const ready={async launch(){return {version:()=> 'versión',async close(){closed++;}};}};
  const result=await preflightAcceptance(['firefox','webkit','chromium'],{firefox:ready,webkit:ready,chromium:{async launch(){throw new Error("Executable doesn't exist");}}});
  assert.equal(result.status,'blocked');assert.equal(closed,2);assert.match(result.diagnostic!,/install chromium/);
});
test('preflight final: versión vacía y cierre fallido nunca acreditan Chromium',async()=>{
  let closed=0;
  const empty=await preflightAcceptance(['chromium'],{chromium:{async launch(){return {version:()=>'',async close(){closed++;}};}}});
  assert.equal(empty.engines[0].status,'version-failed');assert.equal(closed,1);
  const broken=await preflightAcceptance(['chromium'],{chromium:{async launch(){return {version:()=> 'versión',async close(){throw new Error('fallo al cerrar');}};}}});
  assert.equal(broken.status,'blocked');assert.equal(broken.engines[0].status,'close-failed');
});
