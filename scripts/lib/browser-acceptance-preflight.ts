import {preflightBrowsers,closeBrowser,type BrowserLauncher} from './browser-foundation.ts';

export type RequiredEngine='firefox'|'webkit'|'chromium';
export async function preflightAcceptance(engines:RequiredEngine[],launchers:Partial<Record<RequiredEngine,BrowserLauncher>>,
  onProgress:(event:{engine:string;status:string})=>void=()=>{}) {
  const checks:{engine:string;status:string;version?:string;error?:string;durationMs:number}[]=[];
  const progress=(engine:string,status:string)=>{try{onProgress({engine,status});}catch{}};
  const cross=engines.filter(e=>e!=='chromium');
  if(cross.length) {
    const result=await preflightBrowsers(cross.map(e=>e+'-escritorio'),launchers,{onProgress});checks.push(...result.engines);
  }
  if(engines.includes('chromium')) {
    const start=performance.now(),check:{engine:string;status:string;version?:string;error?:string;durationMs:number}={engine:'chromium',status:'launch-failed',durationMs:0};
    let browser;
    progress('chromium','checking');
    try {
      if(!launchers.chromium)throw new Error('Falta el launcher Chromium');
      browser=await launchers.chromium.launch({headless:true,timeout:15000});check.status='version-failed';
      const version=browser.version();if(!version?.trim())throw new Error('No se obtuvo la versión Chromium');check.version=version;check.status='ready';
    } catch(error) {
      const message=error instanceof Error?error.message:String(error);check.error=message.split('\n')[0].slice(0,400);
      if(message.includes("Executable doesn't exist"))check.status='missing-executable';
    } finally {
      if(browser)try{await closeBrowser(browser,5000);}catch(error){check.status='close-failed';check.error=String(error).split('\n')[0];}
      check.durationMs=performance.now()-start;checks.push(check);progress('chromium',check.status);
    }
  }
  const missing=checks.filter(c=>c.status==='missing-executable').map(c=>c.engine),failed=checks.filter(c=>c.status!=='ready');
  return {status:engines.length&&!failed.length?'ready':'blocked',engines:checks,
    diagnostic:failed.length?failed.map(c=>c.engine+': '+c.error).join('; ')+(missing.length?'. Ejecuta npx playwright install '+missing.join(' '):''):null};
}
