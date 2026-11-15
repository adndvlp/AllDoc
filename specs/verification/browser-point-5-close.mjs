// Cierre derivado de resultados originales; no inicia ni simula navegadores.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sourceFingerprint,sha256} from '../../scripts/lib/baseline.ts';
import {browserReportCases,sameFiles,assessChromiumRegression,assessBrowserAcceptance,strictReportReasons,chromiumNames} from '../../scripts/lib/browser-acceptance.ts';
import {combineChromiumParts,reviewToolingChanges} from './browser-point-5-consolidate.mjs';

const sorted=value=>Array.isArray(value)?value.map(sorted):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,sorted(value[k])])):value;
const same=(a,b)=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
const withoutOrigin=use=>{const {baseURL,...rest}=use;return rest;};

export function checkCompatibleRun(run,target,baseline,reviewedChanges,reviewedAbort=false) {
  if(run.source.sha256!==target.source.sha256||run.before.source!==target.source.sha256||!same(run.environment,target.environment)||!same(run.packages,target.packages))throw new Error('Fuente, entorno o versiones incompatibles');
  for(const group of ['references','review','packages'])if(!sameFiles(run.before[group],target.before[group]))throw new Error('Hashes incompatibles: '+group);
  reviewToolingChanges(run.before.tooling,target.before.tooling,reviewedChanges);
  if(!['native','typesApp','typesTests','buildApp','runtime'].every(k=>run.checks[k]?.status==='passed'))throw new Error('Comprobación de código/build incompleta');
  if(reviewedAbort) {
    if(run.status!=='partial'||run.failure?.stage!=='suite-chromium')throw new Error('Pasada original incompleta fuera del caso revisado');
  } else if(run.status!=='subset-complete'||run.failure||!['source','tooling','references','review','packages','chromiumBaseline'].every(k=>run.invariants?.[k]===true))throw new Error('Pasada o invariantes incompletas');
  if(run.review.status!=='approved'||run.review.images!==52||run.review.manifests!==6||run.productPaths.status!=='unchanged'||run.tdd.status!=='recorded'||run.chromiumBaseline!==true)throw new Error('Aprobación de fuente/referencias incompatible');
  if(run.preflight.status!=='ready'||!run.preflight.engines.length||run.preflight.engines.some(e=>e.status!=='ready'||!baseline.preflight.engines.some(b=>b.engine===e.engine&&b.status==='ready'&&b.version===e.version)))throw new Error('Motor o versión incompatible');
  for(const p of run.projects.chromium) {
    const reference=baseline.projects.chromium.find(x=>x.name===p.name);
    if(!reference||!same(withoutOrigin(p.use),withoutOrigin(reference.use))||p.use.baseURL!==run.origins.appOrigin)throw new Error('Configuración efectiva incompatible: '+p.name);
  }
  if(run.runtimeManifest.appOrigin!==run.origins.appOrigin||run.runtimeManifest.runtimeOrigin!==run.origins.runtimeOrigin||new URL(run.origins.appOrigin).hostname===new URL(run.origins.runtimeOrigin).hostname)throw new Error('Orígenes del build/runtime incompatibles');
  return {status:'compatible',reviewedChanges:reviewedChanges.length};
}

async function main(desktopDirectory) {
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
  const resolve=filename=>{const result=path.resolve(root,filename);if(!result.startsWith(root+path.sep))throw new Error('Evidencia fuera del repositorio');return result;};
  const json=async filename=>JSON.parse(await readFile(resolve(filename),'utf8'));
  const hash=async filename=>sha256(await readFile(resolve(filename)));
  const reviewPath='specs/verification/browser-point-5-resume-review.json',review=await json(reviewPath);
  if(!desktopDirectory)throw new Error('Falta el directorio de la pasada de laptop/escritorio');
  const runs=[];
  for(const directory of [...review.inputs.map(i=>i.directory),desktopDirectory]) {
    const filename=directory+'/verification.json',bytes=await readFile(resolve(filename)),report=JSON.parse(bytes);
    const raw=await json(directory+'/chromium/results.json'),discovery=await json(directory+'/chromium/discovery.json');
    if(!same(raw,report.suites.chromium)||!same(discovery,report.discoveries.chromium))throw new Error('JSON original diferente del informe: '+directory);
    runs.push({directory,report,raw,discovery,reportSha256:sha256(bytes)});
  }
  const [first,zoom,desktop]=runs;
  const supplementalPath='specs/verification/browser-point-5-close-tdd.json',supplemental=await json(supplementalPath);
  if(supplemental.phase!=='green'||supplemental.exitCode!==0||supplemental.cases.length!==4||supplemental.cases.some(c=>c.status!=='passed'||c.skipped))throw new Error('Pruebas suplementarias incompletas');
  for(const f of [...supplemental.files,supplemental.red,supplemental.green])if(await hash(f.path)!==f.sha256)throw new Error('Evidencia suplementaria modificada: '+f.path);
  for(let i=0;i<2;i++)if(review.inputs[i].reportSha256!==runs[i].reportSha256)throw new Error('La pasada revisada cambió: '+runs[i].directory);
  if(review.status!=='awaiting-desktop-run'||!sameFiles(review.targetTooling,desktop.report.before.tooling))throw new Error('Herramientas distintas de las fijadas antes de reanudar');
  for(const f of [...desktop.report.before.tooling,...desktop.report.before.references,...desktop.report.before.review,...desktop.report.before.packages,...review.supplementalTooling])if(await hash(f.path)!==f.sha256)throw new Error('Archivo actual distinto del revisado: '+f.path);
  if((await sourceFingerprint(root)).sha256!==desktop.report.source.sha256)throw new Error('La fuente actual cambió');
  for(const [i,r] of runs.entries())checkCompatibleRun(r.report,desktop.report,first.report,i<2?review.inputs[i].reviewedChanges:[],i===0);
  const firstReviewPath='specs/verification/browser-point-5-first-run-review.json',firstReview=await json(firstReviewPath);
  if(firstReview.reportSha256!==first.reportSha256||firstReview.source!==desktop.report.source.sha256||!['source','tooling','references','review','packages'].every(k=>firstReview.invariantsCheckedAfterAbort.includes(k)))throw new Error('Falta la revisión posterior al aborto original');
  const title='responsive: rotación y texto al 200% conservan editor, selección y controles accesibles';
  const zoomCases=browserReportCases(zoom.raw),desktopCases=browserReportCases(desktop.raw);
  if(zoomCases.length!==7||zoomCases.some(c=>c.file!=='practice.spec.ts'||c.title!==title)||assessChromiumRegression(zoom.raw,zoom.discovery).status!=='passed')throw new Error('Los siete casos corregidos no están aprobados');
  if(desktop.report.options.suite!=='chromium'||desktop.report.options.grep||!same(desktop.report.options.projects,['laptop','escritorio'])||desktopCases.length!==162||assessChromiumRegression(desktop.raw,desktop.discovery,['laptop','escritorio']).status!=='passed')throw new Error('Falta la pasada completa de laptop/escritorio');
  const bad=browserReportCases(first.raw).filter(c=>c.test.results?.some(r=>['failed','timedOut'].includes(r.status)));
  if(bad.length!==1||bad[0].project!=='laptop'||bad[0].title!==title||first.raw.errors?.length!==1)throw new Error('El aborto original contiene un fallo no revisado');
  const mobile=chromiumNames.filter(n=>!['laptop','escritorio'].includes(n));
  const part=r=>({label:r.directory,raw:r.raw,rawFile:r.directory+'/chromium/results.json'});
  const combined=combineChromiumParts([
    {...part(first),sha256:await hash(part(first).rawFile),select:c=>mobile.includes(c.project)&&c.title!==title,reviewedGlobalErrors:first.raw.errors},
    {...part(zoom),sha256:await hash(part(zoom).rawFile),select:c=>mobile.includes(c.project)},
    {...part(desktop),sha256:await hash(part(desktop).rawFile),select:()=>true}
  ],first.discovery);
  if(combined.stats.expected!==558||combined.stats.skipped!==9||!same(combined.provenance.sources.map(s=>s.selectedCases),[400,5,162]))throw new Error('La selección consolidada no cubre los 567 casos esperados');
  for(const suite of ['visual','functional']) {
    const original=await json(first.directory+'/'+suite+'/results.json');
    if(!same(original,first.report.suites[suite])||strictReportReasons(original,suite).length||first.report.checks['suite-'+suite]?.status!=='passed')throw new Error('Fase anterior sin aprobación estricta: '+suite);
  }
  const resultsPath='specs/verification/browser-point-5-chromium-consolidated.json';
  await writeFile(resolve(resultsPath),JSON.stringify(combined,null,2)+'\n');
  const final=structuredClone(desktop.report);
  final.kind='consolidated-evidence';final.mode='full';final.options={mode:'full',list:false,projects:[]};final.startedAt=first.report.startedAt;final.finishedAt=new Date().toISOString();
  final.preflight=first.report.preflight;final.suites={visual:first.report.suites.visual,functional:first.report.suites.functional,chromium:combined};
  final.discoveries={visual:first.report.discoveries.visual,functional:first.report.discoveries.functional,chromium:first.discovery};final.chromiumDiscovery=first.discovery;
  final.projects={...first.report.projects,chromium:first.report.projects.chromium};
  final.checks={...first.report.checks,...desktop.report.checks};
  final.failure=null;final.provenance={kind:'consolidated-evidence',inputs:runs.map(r=>({directory:r.directory,sha256:r.reportSha256,status:r.report.status})),
    selection:combined.provenance.sources.map(s=>({execution:s.label,selectedCases:s.selectedCases})),
    configurations:runs.map(r=>({execution:r.directory,origins:r.report.origins,projects:r.report.projects})),
    review:reviewPath,firstRunReview:firstReviewPath,
    timing:'Ejecuciones independientes. startedAt/finishedAt delimitan la campaña; no representan una suite única.',
    tooling:'Cada pasada estable más cambios de herramientas revisados por ruta/hash; las fuentes del producto y referencias coinciden.'};
  final.supplementalVerification={file:supplementalPath,cases:supplemental.cases,status:'passed'};
  const artifactPaths=new Set([reviewPath,firstReviewPath,resultsPath,supplementalPath,...review.supplementalTooling.map(f=>f.path),...supplemental.files.map(f=>f.path),supplemental.red.path,supplemental.green.path]);
  for(const r of runs) {
    for(const file of ['verification.json','native-cases.ndjson','runtime-manifest.json','bundle.json','chromium/results.json','chromium/discovery.json'])artifactPaths.add(r.directory+'/'+file);
  }
  for(const suite of ['visual','functional'])for(const file of ['results.json','discovery.json'])artifactPaths.add(first.directory+'/'+suite+'/'+file);
  artifactPaths.add(first.directory+'/visual/states.json');
  final.artifacts={status:'hashed',files:await Promise.all([...artifactPaths].sort().map(async p=>({path:p,sha256:await hash(p)})))};
  final.acceptance=assessBrowserAcceptance(final);
  if(final.acceptance.status!=='complete')throw new Error('Criterios pendientes: '+final.acceptance.criteria.filter(c=>c.status!=='passed').map(c=>c.id).join(', '));
  final.status='ready-for-review';
  const acceptancePath='specs/verification/browser-point-5-acceptance.json';await writeFile(resolve(acceptancePath),JSON.stringify(final,null,2)+'\n');
  console.log('Aceptación consolidada: CA-01 a CA-12 aprobados. 26 visuales, 168 funcionales, Chromium 558 aprobados y 9 omisiones previstas.');
  console.log('Informe: '+acceptancePath);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv[2]).catch(error=>{console.error(error.message);process.exitCode=1;});
