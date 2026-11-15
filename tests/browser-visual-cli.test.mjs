import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {parseBrowserRunArgs} from '../scripts/lib/browser-run.ts';

const run = args => spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/test-browser.mjs', ...args], {
  encoding: 'utf8', timeout: 20_000,
  env: {...process.env, PLAYWRIGHT_BROWSERS_PATH: '/tmp/alldoc-browser-discovery-no-binaries'},
});

test('visual: selección explícita separada, seis proyectos y actualización solo intencional', () => {
  const options=parseBrowserRunArgs(['--visual','--update-snapshots']);
  assert.equal(options.visual,true); assert.equal(options.updateSnapshots,true); assert.equal(options.projects.length,6);
  assert.throws(()=>parseBrowserRunArgs(['--update-snapshots']),/requiere --visual/);
  for(const flag of ['--smoke','--desktop','--build-only']) assert.throws(()=>parseBrowserRunArgs(['--visual',flag]),/no se combina/);
  assert.throws(()=>parseBrowserRunArgs(['--visual','--update-snapshots','--grep=VIS-01']),/proyecto completo/);
});

test('visual: descubrimiento de 26 casos sin motores ni casos funcionales y configuración estricta', () => {
  const result=run(['--visual','--list']); assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/Total: 26 tests in 1 file/);
  assert.doesNotMatch(result.stdout,/APP-|PY-|SQL-|01-build-app|checking/);
  assert.equal((result.stdout.match(/\[firefox-estrecho\]/g)??[]).length,5);
  assert.equal((result.stdout.match(/\[webkit-escritorio\]/g)??[]).length,4);
  const config=spawnSync(process.execPath,['--experimental-strip-types','--input-type=module','-e',
    "const {default:c}=await import('./playwright.cross-browser.config.ts'); console.log(JSON.stringify({update:c.updateSnapshots,ratio:c.expect.toHaveScreenshot.maxDiffPixelRatio,snapshot:c.snapshotPathTemplate}));"],
    {encoding:'utf8',env:{...process.env,BROWSER_VISUAL_MODE:'1'}});
  assert.equal(config.status,0,config.stderr);
  const c=JSON.parse(config.stdout); assert.equal(c.update,'none'); assert.equal(c.ratio,0.001);
  assert.equal(c.snapshot,'{testDir}/__screenshots__/{projectName}/{arg}{ext}');
});
