import {execFileSync,spawnSync} from 'node:child_process';
import {mkdir,mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir,cpus,platform,release,arch} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium,firefox,webkit} from '@playwright/test';
import {browserAcceptanceConfig} from '../playwright.browser-verification.config.ts';
import {parseBrowserAcceptanceArgs,acceptanceSuites,projectsForSuite,sameFiles,assessReviewedReferences,assessBrowserAcceptance,assessChromiumRegression,strictReportReasons,browserReportCases} from './lib/browser-acceptance.ts';
import {preflightAcceptance} from './lib/browser-acceptance-preflight.ts';
import {browserProjects} from './lib/browser-foundation.ts';
import {assessBrowserRun} from './lib/browser-run.ts';
import {assessVisualRun,checkVisualManifest,checkVisualStates,referenceRoot} from './lib/browser-visual.ts';
import {sourceFingerprint,filesUnder,sha256,serveBuild,inventoryBuild} from './lib/baseline.ts';
import {auditPublishedBuild} from './lib/final-verification.ts';
import {buildRuntime} from './build-practice-runtime.mjs';
import {createRuntimeHandler} from './lib/runtime-http.mjs';
import {runBrowserCommand} from './lib/browser-command.mjs';
import {requireBrowserSpace} from './lib/browser-storage.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const configArg='--config=playwright.browser-verification.config.ts';
const cli=['node_modules/@playwright/test/cli.js','test',configArg,'--update-snapshots=none','--retries=0','--workers=2'];
const jsonRead=async p=>JSON.parse(await readFile(path.resolve(root,p),'utf8'));
const hashNames=async names=>Promise.all([...new Set(names)].sort().map(async p=>({path:p,sha256:sha256(await readFile(path.resolve(root,p)))})));
const nativeFiles=async()=>(await filesUnder('tests')).filter(p=>/\.test\.(ts|mjs)$/.test(p));
const suiteNames=(options)=>options.mode==='code-only'?[]:options.suite?[options.suite]:acceptanceSuites;
const filters=options=>[...options.projects.map(p=>'--project='+p),...(options.grep?['--grep='+options.grep]:[])];
let options;
try{options=parseBrowserAcceptanceArgs(process.argv.slice(2));}catch(error){console.error(error.message);process.exitCode=1;}
if(options)try{
  if(options.list) {
    for(const suite of suiteNames(options)) {
      const result=spawnSync(process.execPath,[...cli,'--list','--reporter=json',...filters(options)],{cwd:root,encoding:'utf8',maxBuffer:10*1024*1024,
        env:{...process.env,BROWSER_ACCEPTANCE_SUITE:suite,PLAYWRIGHT_JSON_OUTPUT_FILE:'',PLAYWRIGHT_JSON_OUTPUT_NAME:''}});
      if(result.status!==0)throw new Error(result.stderr.split('\n')[0]||'Descubrimiento fallido');
      const raw=JSON.parse(result.stdout);let count=0;const visit=s=>{for(const spec of s.specs??[])count+=spec.tests.length;for(const child of s.suites??[])visit(child);};
      for(const s of raw.suites)visit(s);console.log(`${suite}: ${count} casos; ${options.projects.length||raw.config.projects.length} proyectos.`);
    }
    console.log(`Código: ${(await nativeFiles()).length} archivos. Solo descubrimiento: ningún caso ejecutado, navegador, build o servidor iniciado.`);
  } else await verify(options);
}catch(error){console.error('Preparación: '+error.message.split('\n')[0]);process.exitCode=1;}

async function verify(options) {
  const startedAt=new Date().toISOString(),source=await sourceFingerprint(root);
  const output=path.join(root,'benchmarks/browser-verifications',startedAt.replace(/[:.]/g,'-')+'-'+source.sha256.slice(0,10));
  await mkdir(output,{recursive:true});
  const report={schemaVersion:1,point:5,mode:options.mode,status:'partial',startedAt,source,options,checks:{},suites:{},discoveries:{},
    environment:{node:process.version,platform:platform(),release:release(),arch:arch(),cpu:cpus()[0]?.model},packages:{},
    scope:{physicalDevices:false,commercialSafari:false,fieldINP:false,browserDistributions:'Playwright'},failure:null};
  try{report.commitBase=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{report.commitBase=null;}
  for(const name of ['@playwright/test','@docusaurus/core','react','typescript','@codemirror/view','@sqlite.org/sqlite-wasm','pyodide'])report.packages[name]=JSON.parse(await readFile(path.join(root,'node_modules',name,'package.json'),'utf8')).version;
  const packageFiles=()=>hashNames(Object.keys(report.packages).map(n=>'node_modules/'+n+'/package.json'));
  const proofFiles=['specs/verification/browser-point-4-green.json','specs/verification/browser-point-4-visual-review.json','specs/verification/browser-point-5-red.json'];
  const fingerprint=async()=>({source:(await sourceFingerprint(root)).sha256,
    tooling:await hashNames([...await filesUnder('scripts'),...(await filesUnder('tests')).filter(p=>!p.includes('/__screenshots__/')),'playwright.config.ts','playwright.cross-browser.config.ts','playwright.browser-verification.config.ts','tsconfig.tests.json'].filter(p=>!p.endsWith('.DS_Store'))),
    references:await hashNames([...(await filesUnder(referenceRoot)).filter(p=>/\.(png|json)$/.test(p)),...(await filesUnder('tests/ui/__screenshots__')).filter(p=>p.endsWith('.png'))]),
    review:await hashNames(proofFiles),packages:await packageFiles()});
  const save=async()=>writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
  const json=(name,data)=>writeFile(path.join(output,name),JSON.stringify(data,null,2)+'\n');
  const lock=path.join(root,'.docusaurus-browser-verification-lock');let ownsLock=false,temporary,app,runtimeServer,child,interrupted=false,stage='preparation';
  const stop=()=>{interrupted=true;child?.kill('SIGINT');};process.on('SIGINT',stop);process.on('SIGTERM',stop);
  async function phase(key,title,action,heartbeat=true) {
    if(interrupted)throw new Error('Ejecución interrumpida');stage=key;console.log(title);const start=Date.now();
    const timer=heartbeat?setInterval(()=>console.log(title+': en curso, '+Math.round((Date.now()-start)/1000)+' s'),15000):null;
    try{const value=await action();if(interrupted)throw new Error('Ejecución interrumpida');report.checks[key]={status:'passed',title,durationMs:Date.now()-start};await save();return value;}
    finally{if(timer)clearInterval(timer);}
  }
  const command=(name,args,env={},visible=false)=>runBrowserCommand({args,cwd:root,env,logPath:path.join(output,name+'.log'),visible,onChild:value=>{child=value;}});
  try {
    report.before=await fingerprint();
    await phase('space','00-espacio-disponible',async()=>{report.storage=await requireBrowserSpace([root,tmpdir()]);});
    const approval=await jsonRead(proofFiles[0]),review=await jsonRead(proofFiles[1]);
    const generation=await jsonRead(approval.generation.directory+'/verification.json');
    const generationHash=sha256(await readFile(path.join(root,approval.generation.directory,'verification.json')));
    if(generationHash!==approval.generation.reportSha256)throw new Error('La procedencia de las referencias aprobadas cambió');
    const images=report.before.references.filter(f=>f.path.startsWith(referenceRoot+'/')&&f.path.endsWith('.png'));
    const manifests=report.before.references.filter(f=>f.path.startsWith(referenceRoot+'/')&&f.path.endsWith('/manifest.json'));
    report.review=assessReviewedReferences({approval,review,images,manifests,reviewFile:{path:proofFiles[1],sha256:sha256(await readFile(path.join(root,proofFiles[1])))}});
    if(report.review.status!=='approved')throw new Error(report.review.reasons.join('; '));
    const oldChromium=generation.snapshots,currentChromium=report.before.references.filter(f=>f.path.startsWith('tests/ui/'));
    report.chromiumBaseline=sameFiles(oldChromium,currentChromium)&&currentChromium.length===165;
    if(!report.chromiumBaseline)throw new Error('Las 165 referencias Chromium difieren de las conservadas en el punto 4');
    const productFiles=files=>files.filter(f=>/^(src\/|docs\/|static\/|i18n\/|package-lock\.json$|docusaurus\.config\.|sidebars\.)/.test(f.path));
    report.productPaths={status:sameFiles(productFiles(source.files),productFiles(generation.source.files))?'unchanged':'changed',
      reason:'Se comparan fuentes del producto, configuración y lockfile con la generación aprobada. Un cambio exige revisar la regresión/medición afectada.'};
    const red=await jsonRead(proofFiles[2]);
    proofFiles.push(...(red.cases??[]).map(entry=>entry.log));
    report.before.review=await hashNames(proofFiles);
    for(const entry of red.cases??[])if(entry.exitCode!==1||sha256(await readFile(path.join(root,entry.log)))!==entry.sha256)throw new Error('Evidencia TDD no verificable');
    report.tdd={status:red.phase==='red'&&red.cases?.length?'recorded':'missing',file:proofFiles[2]};
    if(report.tdd.status!=='recorded')throw new Error('Falta evidencia TDD del cierre');
    const suites=suiteNames(options);
    if(options.mode!=='code-only')await phase('preflight','01-preflight',async()=>{
      const engines=[...new Set(suites.flatMap(s=>s==='chromium'?['chromium']:projectsForSuite(s,options.projects).map(p=>p.use.browserName)))];
      report.preflight=await preflightAcceptance(engines,{firefox,webkit,chromium},event=>console.log(event.engine+': '+event.status));
      await json('preflight.json',report.preflight);if(report.preflight.status!=='ready')throw new Error(report.preflight.diagnostic??'Preflight bloqueado');
      const selectedCross=new Set(suites.filter(s=>s!=='chromium').flatMap(s=>projectsForSuite(s,options.projects).map(p=>p.name)));
      for(const p of browserProjects().filter(p=>selectedCross.has(p.name))) {
        const filename=referenceRoot+'/'+p.name+'/manifest.json',manifest=await jsonRead(filename);
        const config=browserAcceptanceConfig('visual'),project={...p,use:{...config.use,...p.use}};
        const packages=Object.fromEntries(Object.keys(manifest.context.packages).map(name=>[name,report.packages[name]]));
        const context={project,environment:report.environment,packages,browser:{engine:p.use.browserName,version:report.preflight.engines.find(e=>e.engine===p.use.browserName).version}};
        const check=checkVisualManifest(manifest,context,images.filter(f=>f.path.startsWith(referenceRoot+'/'+p.name+'/')));
        if(check.status!=='compatible')throw new Error(p.name+': '+check.reasons.join('; '));
      }
    });
    report.nativeFiles=await nativeFiles();
    await phase('native','02-código',async()=>{
      const filename=path.join(output,'native-cases.ndjson');
      const code=await command('02-native',['--experimental-strip-types','--test','--test-concurrency=2','--test-reporter=./scripts/lib/practice-test-reporter.mjs','--test-reporter-destination='+filename,...report.nativeFiles]);
      report.nativeCases=(await readFile(filename,'utf8')).trim().split('\n').filter(Boolean).map(s=>JSON.parse(s)).filter(c=>c.file).map(c=>({...c,file:path.relative(root,c.file).split(path.sep).join('/')}));
      if(code||!report.nativeCases.length||report.nativeCases.some(c=>c.status!=='passed'||c.skipped))throw new Error('Pruebas de código sin aprobar; consultar native-cases.ndjson y 02-native.log');
    });
    for(const [key,title,args] of [['typesApp','03-tipos-app',['--noEmit']],['typesTests','04-tipos-pruebas',['--noEmit','-p','tsconfig.tests.json']]])await phase(key,title,async()=>{
      if(await command(title,['node_modules/typescript/bin/tsc',...args]))throw new Error('Tipos sin aprobar; consultar '+title+'.log');
    });
    await requireBrowserSpace([root,tmpdir()]);await mkdir(lock);ownsLock=true;
    temporary=await mkdtemp(path.join(tmpdir(),'alldoc-browser-final-'));const site=path.join(temporary,'site'),runtimeDirectory=path.join(temporary,'runtime');
    await writeFile(path.join(lock,'owner.json'),JSON.stringify({pid:process.pid,startedAt,temporary}));
    let appOrigin='http://127.0.0.1:4173',runtimeOrigin='http://localhost:4174',setHandler;
    if(options.mode!=='code-only') {
      stage='servers';app=await serveBuild(site);appOrigin=app.url;let handler=(_request,response)=>response.writeHead(503).end();
      runtimeServer=createServer((request,response)=>handler(request,response));
      await new Promise((resolve,reject)=>{runtimeServer.once('error',reject);runtimeServer.listen(0,'localhost',resolve);});
      runtimeOrigin='http://localhost:'+runtimeServer.address().port;setHandler=value=>{handler=value;};
    }
    report.origins={appOrigin,runtimeOrigin};
    report.projects=Object.fromEntries(suites.map(s=>[s,projectsForSuite(s,options.projects).map(p=>({...p,use:{...browserAcceptanceConfig(s).use,...p.use,baseURL:appOrigin}}))]));
    await phase('buildApp','05-build-app',async()=>{
      if(await command('05-build-app',['node_modules/@docusaurus/core/bin/docusaurus.mjs','build','--out-dir',site],
        {PRACTICE_ORIGIN:runtimeOrigin,DOCUSAURUS_GENERATED_FILES_DIR_NAME:'.docusaurus-browser-acceptance'}))throw new Error('Build sin aprobar; consultar 05-build-app.log');
    });
    await phase('runtime','06-runtime-rutas-inventario',async()=>{
      report.runtimeManifest=await buildRuntime({appOrigin,runtimeOrigin,outDir:runtimeDirectory});setHandler?.(createRuntimeHandler({directory:runtimeDirectory,manifest:report.runtimeManifest}));
      await json('runtime-manifest.json',report.runtimeManifest);await json('bundle.json',await inventoryBuild(site));report.published=await auditPublishedBuild(site);
      if(report.published.status!=='passed')throw new Error('Rutas publicadas sin aprobar');
    });
    for(const suite of suites) {
      const directory=path.join(output,suite);await mkdir(directory,{recursive:true});
      const environment={PLAYWRIGHT_BASE_URL:appOrigin,BROWSER_ACCEPTANCE_SUITE:suite,BROWSER_ACCEPTANCE_REPORT_DIR:directory,PLAYWRIGHT_HTML_OUTPUT_DIR:path.join(directory,'html')};
      await phase('discovery-'+suite,'07-descubrimiento-'+suite,async()=>{
        const code=await command('07-discovery-'+suite,[...cli,'--list','--reporter=json',...filters(options)],{...environment,PLAYWRIGHT_JSON_OUTPUT_FILE:path.join(directory,'discovery.json')});
        if(code)throw new Error('Descubrimiento fallido: '+suite);report.discoveries[suite]=await jsonRead(path.join(directory,'discovery.json'));
      });
      await phase('suite-'+suite,'08-'+suite,async()=>{
        const code=await command('08-'+suite,[...cli,...filters(options)],{...environment,PLAYWRIGHT_JSON_OUTPUT_FILE:path.join(directory,'results.json')},true);
        const raw=await jsonRead(path.join(directory,'results.json'));report.suites[suite]=raw;
        const names=projectsForSuite(suite,options.projects).map(p=>p.name);
        const result=suite==='functional'?assessBrowserRun(raw,{projects:names,smoke:false,list:false,buildOnly:false,grep:options.grep}):suite==='visual'?assessVisualRun(raw,{projects:names,grep:options.grep}):assessChromiumRegression(raw,report.discoveries[suite],names);
        const problems=[...strictReportReasons(raw,suite),...result.reasons];
        if(code||result.status==='incomplete'||problems.length)throw new Error(problems[0]??('Suite '+suite+' terminó con código '+code));
        if(suite==='visual') {
          const states=[];for(const c of browserReportCases(raw))for(const r of c.test.results)for(const a of r.attachments??[])if(a.name.startsWith('visual-state-')) {
            if(!a.path||!path.resolve(a.path).startsWith(directory+path.sep))throw new Error('Estado visual fuera del informe');states.push(await jsonRead(a.path));
          }
          for(const project of names)checkVisualStates(project,states.filter(s=>s.project===project),result.cases.filter(c=>c.project===project).map(c=>c.id));
          await writeFile(path.join(directory,'states.json'),JSON.stringify(states,null,2)+'\n');
        }
        report.checks['assessment-'+suite]=result;
      },false);
    }
    await phase('invariants','09-invariantes-y-criterios',async()=>{
      const after=await fingerprint();report.invariants={source:after.source===report.before.source,tooling:sameFiles(after.tooling,report.before.tooling),references:sameFiles(after.references,report.before.references),review:sameFiles(after.review,report.before.review),packages:sameFiles(after.packages,report.before.packages),chromiumBaseline:report.chromiumBaseline};
      if(!Object.values(report.invariants).every(Boolean))throw new Error('Fuente, herramientas, referencias, revisión o paquetes cambiaron durante la ejecución');
      const artifactNames=(await filesUnder(output)).filter(p=>/\/(results|discovery)\.json$/.test(p)||/\/(native-cases\.ndjson|runtime-manifest\.json|bundle\.json)$/.test(p));
      report.artifacts={status:'hashed',files:await hashNames(artifactNames.map(p=>path.relative(root,p)))};report.chromiumDiscovery=report.discoveries.chromium;
      report.acceptance=assessBrowserAcceptance(report);
      if(options.mode==='full'&&report.acceptance.status!=='complete')throw new Error('Criterios pendientes: '+report.acceptance.criteria.filter(c=>c.status!=='passed').map(c=>c.id).join(', '));
    });
    report.status=options.mode==='full'?'ready-for-review':options.mode==='code-only'?'code-only-complete':'subset-complete';
  }catch(error){report.failure={stage,message:error.message};process.exitCode=1;}
  finally {
    child?.kill('SIGTERM');await app?.close();if(runtimeServer?.listening)await new Promise(resolve=>{runtimeServer.close(resolve);runtimeServer.closeAllConnections();});
    if(temporary)await rm(temporary,{recursive:true,force:true});if(ownsLock)await rm(lock,{recursive:true,force:true});process.off('SIGINT',stop);process.off('SIGTERM',stop);
    report.finishedAt=new Date().toISOString();if(!report.acceptance)report.acceptance=assessBrowserAcceptance(report);await save();
    const lines=['# Aceptación Firefox/WebKit — punto 5','',`Estado: **${report.status}**. Modo: ${report.mode}.`,'',`Fuente: \`${source.sha256}\`.`,
      '', '## Comprobaciones','', '| Fase | Estado |','| --- | --- |',...Object.entries(report.checks).map(([key,c])=>`| ${key} | ${c.status} |`),
      '', '## Criterios','', '| ID | Criterio | Estado |','| --- | --- | --- |',...report.acceptance.criteria.map(c=>`| ${c.id} | ${c.title} | ${c.status} |`),
      '', '[Datos completos](verification.json). Resultados originales y descubrimiento están en los subdirectorios de cada suite.',
      '', 'Se conservan las omisiones previstas de Chromium como omisiones. Ninguna referencia se actualiza. Se prueban distribuciones Playwright; no hardware físico, Safari comercial ni INP de campo. No se repiten los benchmarks de rendimiento del producto sin cambios.',
      ...(report.failure?['',`Fallo en ${report.failure.stage}: ${report.failure.message.split('\n')[0]}`]:[])];
    await writeFile(path.join(output,'README.md'),lines.join('\n')+'\n');console.log('Resultado: '+report.status);console.log('Informe: '+path.relative(root,output)+'/README.md');
    if(report.failure)console.error(report.failure.stage+': '+report.failure.message.split('\n')[0].slice(0,500));
  }
}
