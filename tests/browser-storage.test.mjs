import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFile,rm} from 'node:fs/promises';
import {requireBrowserSpace,minimumBrowserFreeBytes} from '../scripts/lib/browser-storage.mjs';

test('espacio: mide los destinos y exige margen antes de iniciar navegadores/build',async()=>{
  const seen=[];
  const result=await requireBrowserSpace(['/workspace','/tmp'],{filesystem:async path=>{seen.push(path);return {bsize:4096,bavail:200000};}});
  assert.deepEqual(seen,['/workspace','/tmp']);assert.equal(result.minimumFreeBytes,minimumBrowserFreeBytes);
  assert.equal(result.samples[0].availableBytes,819200000);
});
test('espacio: el temporal lleno bloquea aunque el destino de informes tenga espacio',async()=>{
  await assert.rejects(requireBrowserSpace(['/workspace','/tmp'],{filesystem:async path=>({bsize:4096,bavail:path==='/tmp'?0:200000})}),error=>{
    assert.equal(error.code,'INSUFFICIENT_DISK_SPACE');assert.match(error.message,/\/tmp.*0 MiB.*512 MiB/);return true;
  });
});
test('espacio: usa bloques disponibles al usuario y admite el límite exacto',async()=>{
  const result=await requireBrowserSpace(['/workspace'],{filesystem:async()=>({bsize:1024,bavail:minimumBrowserFreeBytes/1024,bfree:999999999})});
  assert.equal(result.samples[0].availableBytes,minimumBrowserFreeBytes);
  await assert.rejects(requireBrowserSpace(['/workspace'],{filesystem:async()=>({bsize:1024,bavail:0,bfree:999999999})}),/Espacio insuficiente/);
});

test('CLI con disco sin margen: diagnóstico único, informe parcial y ningún navegador o build iniciado',async context=>{
  const script=`import filesystem from 'node:fs/promises';import {syncBuiltinESMExports} from 'node:module';
    filesystem.statfs=async()=>({bsize:4096,bavail:0});syncBuiltinESMExports();
    process.argv=[process.execPath,'scripts/test-browser.mjs','--visual','--update-snapshots'];
    await import('./scripts/test-browser.mjs');`;
  const result=spawnSync(process.execPath,['--experimental-strip-types','--input-type=module','-e',script],{encoding:'utf8',timeout:20000});
  assert.equal(result.status,1,result.stderr);assert.match(result.stdout,/00-espacio-disponible/);
  assert.match(result.stderr,/Espacio insuficiente/);assert.doesNotMatch(result.stdout,/firefox:|webkit:|01-build-app/);
  assert.doesNotMatch(result.stderr,/Unhandled|node:events/);
  const filename=/Informe: (.+)\/README\.md/.exec(result.stdout)?.[1];assert.ok(filename);
  context.after(()=>rm(filename,{recursive:true,force:true}));
  const report=JSON.parse(await readFile(filename+'/verification.json','utf8'));
  assert.equal(report.status,'partial');assert.equal(report.failure.stage,'00-espacio-disponible');assert.equal(report.preflight,undefined);
});

test('CLI: si falta el navegador después de medir espacio, el informe identifica preflight',async context=>{
  const script=`import filesystem from 'node:fs/promises';import {syncBuiltinESMExports} from 'node:module';
    filesystem.statfs=async()=>({bsize:4096,bavail:1000000});syncBuiltinESMExports();
    process.argv=[process.execPath,'scripts/test-browser.mjs','--visual','--update-snapshots'];
    await import('./scripts/test-browser.mjs');`;
  const result=spawnSync(process.execPath,['--experimental-strip-types','--input-type=module','-e',script],{encoding:'utf8',timeout:20000,
    env:{...process.env,PLAYWRIGHT_BROWSERS_PATH:'/tmp/alldoc-deliberately-missing-browser-binaries'}});
  assert.equal(result.status,1,result.stderr);
  const filename=/Informe: (.+)\/README\.md/.exec(result.stdout)?.[1];assert.ok(filename);context.after(()=>rm(filename,{recursive:true,force:true}));
  const report=JSON.parse(await readFile(filename+'/verification.json','utf8'));
  assert.equal(report.preflight.status,'blocked');assert.equal(report.checks['00-espacio-disponible'].status,'passed');
  assert.equal(report.failure.stage,'preflight');assert.doesNotMatch(result.stdout,/01-build-app/);
});
