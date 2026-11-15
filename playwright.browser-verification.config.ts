import {defineConfig} from '@playwright/test';
import path from 'node:path';
import legacy from './playwright.config.ts';
import cross from './playwright.cross-browser.config.ts';

export type AcceptanceSuite='functional'|'visual'|'chromium';
export function browserAcceptanceConfig(suite:AcceptanceSuite, directory=process.env.BROWSER_ACCEPTANCE_REPORT_DIR) {
  if(!['functional','visual','chromium'].includes(suite))throw new Error('Suite desconocida: '+suite);
  const base=suite==='chromium'?legacy:cross;
  const output=directory??path.join('test-results/browser-acceptance',suite);
  return defineConfig({...base,
    globalSetup:undefined,webServer:undefined,retries:0,workers:2,maxFailures:1,updateSnapshots:'none',
    testIgnore:suite==='functional'?'**/visual.spec.ts':suite==='visual'?/(?:application|practice-[^/]+)\.spec\.ts$/:[],
    outputDir:path.join(output,'artifacts'),
    use:{...base.use,headless:true,baseURL:process.env.PLAYWRIGHT_BASE_URL??'http://127.0.0.1:4173'},
    reporter:[['./scripts/lib/browser-progress.mjs',{compact:true}],['html',{open:'never',outputFolder:path.join(output,'html')}],['json',{outputFile:path.join(output,'results.json')}]],
    metadata:{stage:'browser-final-verification',suite},
  });
}
export default browserAcceptanceConfig((process.env.BROWSER_ACCEPTANCE_SUITE??'functional') as AcceptanceSuite);
