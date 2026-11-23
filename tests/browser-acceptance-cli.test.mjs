import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFile,rm} from 'node:fs/promises';

const run=args=>spawnSync(process.execPath,['--experimental-strip-types','scripts/verify-browser.mjs',...args],{encoding:'utf8',timeout:30000,
  env:{...process.env,PLAYWRIGHT_BROWSERS_PATH:'/tmp/alldoc-acceptance-no-browser-binaries'}});

test('CLI final: descubre 26/168/770 casos sin motores, build ni multiplicar la suite Chromium',()=>{
  const result=run(['--list']);assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/visual: 26 casos; 6 proyectos/);assert.match(result.stdout,/functional: 168 casos; 6 proyectos/);assert.match(result.stdout,/chromium: 770 casos; 7 proyectos/);
  assert.match(result.stdout,/ningún caso ejecutado/);assert.doesNotMatch(result.stdout,/checking|05-build-app|02-código/);
});
test('CLI final: selección de un caso no pretende aceptación completa y no permite actualizar',()=>{
  const selected=run(['--list','--suite=visual','--project=webkit-estrecho','--grep=VIS-05']);
  assert.equal(selected.status,0,selected.stderr);assert.match(selected.stdout,/visual: 1 casos; 1 proyectos/);assert.doesNotMatch(selected.stdout,/chromium:|functional:/);
  const invalid=run(['--update-snapshots']);assert.equal(invalid.status,1);assert.match(invalid.stderr,/nunca actualiza/);assert.doesNotMatch(invalid.stdout,/build|checking/);
});

test('CLI corto de zoom: descubre siete casos sin un filtro que pueda romperse al copiar',()=>{
  const result=spawnSync(process.execPath,['scripts/check-zoom.mjs','--list'],{encoding:'utf8',timeout:20000,
    env:{...process.env,PLAYWRIGHT_BROWSERS_PATH:'/tmp/alldoc-acceptance-no-browser-binaries'}});
  assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/chromium: 7 casos; 7 proyectos/);
  assert.doesNotMatch(result.stdout,/functional:|visual:|checking|05-build-app/);
});
test('CLI de pendientes: descubre solo los 220 casos de laptop y escritorio',()=>{
  const result=spawnSync(process.execPath,['scripts/check-desktops.mjs','--list'],{encoding:'utf8',timeout:20000,
    env:{...process.env,PLAYWRIGHT_BROWSERS_PATH:'/tmp/alldoc-acceptance-no-browser-binaries'}});
  assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/chromium: 220 casos; 2 proyectos/);
  assert.doesNotMatch(result.stdout,/functional:|visual:|checking|05-build-app/);
});
test('CLI final: solo el motor seleccionado se exige antes de código/build; informe parcial con preflight',async context=>{
  for(const [engine,args] of [['chromium',['--suite=chromium']],['webkit',['--suite=visual','--project=webkit-estrecho']]]) {
    const result=run(args);assert.equal(result.status,1,result.stderr);
    assert.match(result.stdout,new RegExp(engine+': missing-executable'));assert.doesNotMatch(result.stdout,/firefox:|02-código|05-build-app/);
    const directory=/Informe: (.+)\/README\.md/.exec(result.stdout)?.[1];assert.ok(directory);context.after(()=>rm(directory,{recursive:true,force:true}));
    const report=JSON.parse(await readFile(directory+'/verification.json','utf8'));
    assert.equal(report.status,'partial');assert.equal(report.mode,'subset');assert.equal(report.failure.stage,'preflight');assert.equal(report.preflight.engines.length,1);
    assert.equal(report.preflight.engines[0].engine,engine);assert.equal(report.acceptance.status,'incomplete');
  }
});
