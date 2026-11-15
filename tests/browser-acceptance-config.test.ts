import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import strict from '../playwright.browser-verification.config.ts';
import {browserAcceptanceConfig} from '../playwright.browser-verification.config.ts';
import legacy from '../playwright.config.ts';
import cross from '../playwright.cross-browser.config.ts';

test('aceptación: comparación estricta, sin actualización, reintentos ni servidores/preflight duplicados',()=>{
  assert.equal(strict.updateSnapshots,'none');assert.equal(strict.retries,0);assert.equal(strict.workers,2);
  assert.equal(strict.globalSetup,undefined);assert.equal(strict.webServer,undefined);
  assert.equal(strict.expect?.toHaveScreenshot?.maxDiffPixelRatio,.001);
});

test('aceptación: conserva siete proyectos Chromium, seis por motor/tamaño y rutas originales de referencias',()=>{
  assert.deepEqual(browserAcceptanceConfig('chromium').projects,legacy.projects);
  for(const suite of ['functional','visual'] as const)assert.deepEqual(browserAcceptanceConfig(suite).projects,cross.projects);
  for(const suite of ['functional','visual','chromium'] as const)assert.equal(browserAcceptanceConfig(suite).snapshotPathTemplate,'{testDir}/__screenshots__/{projectName}/{arg}{ext}');
});

test('aceptación: descubre los 168 casos funcionales sin iniciar navegadores y sin mezclar Chromium',()=>{
  const result=spawnSync(process.execPath,['node_modules/@playwright/test/cli.js','test','--config=playwright.browser-verification.config.ts','--list','--reporter=json'],
    {encoding:'utf8',timeout:20000,env:{...process.env,BROWSER_ACCEPTANCE_SUITE:'functional',PLAYWRIGHT_BROWSERS_PATH:'/tmp/alldoc-no-browser-discovery'}});
  assert.equal(result.status,0,result.stderr);
  const raw=JSON.parse(result.stdout);let count=0;
  const visit=(suite:any)=>{for(const spec of suite.specs??[])count+=spec.tests.length;for(const child of suite.suites??[])visit(child);};
  for(const suite of raw.suites)visit(suite);
  assert.equal(count,168);assert.equal(raw.config.projects.length,6);
});
