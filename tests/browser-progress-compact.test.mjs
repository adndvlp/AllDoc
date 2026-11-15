import {test} from 'node:test';
import assert from 'node:assert/strict';
import Progress from '../scripts/lib/browser-progress.mjs';

test('progreso compacto: conserva contadores, caso/fase y fallo breve sin una línea por cada inicio y éxito',()=>{
  const lines=[],original=console.log;console.log=(...args)=>lines.push(args.join(' '));
  const reporter=new Progress({compact:true}),item={id:'one',title:'caso real',expectedStatus:'passed',parent:{project:()=>({name:'chromium'})}};
  try {
    reporter.onBegin({}, {allTests:()=>[item]});reporter.onTestBegin(item);reporter.onStepBegin(item,{}, {category:'test.step',title:'fase visible'});
    reporter.progress();reporter.onTestEnd(item,{status:'passed',duration:1});reporter.onEnd();
    assert.ok(lines.some(l=>l.includes('fase visible')));assert.ok(lines.some(l=>l.includes('1 aprobados')));
    assert.ok(!lines.some(l=>l.startsWith('Inicio:')||l.startsWith('passed:')));
  } finally {reporter.onEnd();console.log=original;}
});
