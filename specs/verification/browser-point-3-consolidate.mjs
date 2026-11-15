import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256,sourceFingerprint} from '../../scripts/lib/baseline.ts';
import {assessBrowserRun} from '../../scripts/lib/browser-run.ts';
import {browserProjects} from '../../scripts/lib/browser-foundation.ts';

export function reviewFocusChange(before, after) {
  const strip=source=>{
    const start="test(caseTitle('APP-04'),", end="test(caseTitle('APP-05'),";
    const a=source.indexOf(start),b=source.indexOf(end);
    if(a<0||b<a||a!==source.lastIndexOf(start)||b!==source.lastIndexOf(end))throw new Error('Marcadores de APP-04 ausentes o ambiguos');
    return source.slice(0,a)+source.slice(b);
  };
  const beforeUnchangedHash=sha256(strip(before)),afterUnchangedHash=sha256(strip(after));
  if(beforeUnchangedHash!==afterUnchangedHash)throw new Error('Cambió código fuera de APP-04');
  return {status:'reviewed',affectedCases:['APP-04'],beforeHash:sha256(before),afterHash:sha256(after),beforeUnchangedHash,afterUnchangedHash};
}

function specs(raw) {const result=[];const visit=s=>{for(const spec of s.specs??[])result.push({...spec,file:spec.file??s.file});for(const child of s.suites??[])visit(child);};for(const suite of raw.suites??[])visit(suite);return result;}

/** Documento derivado, nunca se presenta como una ejecución Playwright nueva. */
export function assembleEvidence(groups) {
  const byFile=new Map(),seen=new Set(),provenance=[],sourceErrors=[];
  const stats={expected:0,unexpected:0,skipped:0,flaky:0};
  for(const group of groups) {
    sourceErrors.push({execution:group.execution,errors:group.raw.errors??[]});
    for(const spec of specs(group.raw)) {
      const id=/^\[([A-Z]+-\d+)\]/.exec(spec.title)?.[1];
      for(const original of spec.tests??[]) {
        if(!group.projects.includes(original.projectName)||group.includeIds&&!group.includeIds.includes(id)||group.excludeIds?.includes(id))continue;
        const key=original.projectName+'/'+id;
        if(!id||seen.has(key))throw new Error('Caso sin identidad o duplicado: '+key);
        seen.add(key);
        const test=structuredClone(original),results=test.results??[];
        const passed=test.status==='expected'&&test.expectedStatus==='passed'&&results.length===1&&results[0].status==='passed'&&results[0].retry===0;
        if(passed)stats.expected++;else if(test.status==='skipped'||results[0]?.status==='skipped')stats.skipped++;else stats.unexpected++;
        if(test.status==='flaky'||results.length>1)stats.flaky++;
        for(const result of results) result.attachments=result.attachments?.map(({body,...attachment})=>({...attachment,...(body?{bodyInOriginalExecution:true}:{})}));
        if(!byFile.has(spec.file))byFile.set(spec.file,{file:spec.file,specs:[]});
        byFile.get(spec.file).specs.push({file:spec.file,title:spec.title,tests:[test]});
        provenance.push({project:original.projectName,id,file:spec.file,execution:group.execution});
      }
    }
  }
  return {kind:'consolidated-evidence',scope:'Selección explícita de casos originales; no es una ejecución única de Playwright.',errors:[],suites:[...byFile.values()],stats,provenance,sourceErrors};
}

async function main(webkitDirectory) {
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
  const proof=path.join(root,'specs/verification');
  const firefoxDirectory='benchmarks/browser-verifications/2026-11-15T04-51-29-570Z-a4baa35590';
  const focusDirectory='benchmarks/browser-verifications/2026-11-15T04-59-35-262Z-a4baa35590';
  if(!webkitDirectory)throw new Error('Falta el directorio de la ejecución WebKit completa');
  const resolve=filename=>{const resolved=path.resolve(root,filename);if(!resolved.startsWith(root+path.sep))throw new Error('Evidencia fuera del repositorio');return resolved;};
  const load=async directory=>{
    const reportBytes=await readFile(resolve(directory+'/verification.json')),rawBytes=await readFile(resolve(directory+'/results.json'));
    return {directory,report:JSON.parse(reportBytes),raw:JSON.parse(rawBytes),hashes:{report:sha256(reportBytes),results:sha256(rawBytes)}};
  };
  const [firefox,focus,webkit]=await Promise.all([load(firefoxDirectory),load(focusDirectory),load(webkitDirectory)]);
  if(webkit.report.status!=='matrix-ready-for-review'||!webkit.report.stable||webkit.report.exitCode!==0)throw new Error('La ejecución WebKit todavía no está aprobada');
  if(focus.report.status!=='subset-ready-for-review'||!focus.report.stable||focus.report.assessment.cases.length!==6)throw new Error('La corrección de foco no tiene sus seis casos aprobados');
  const wkNames=browserProjects().filter(p=>p.use.browserName==='webkit').map(p=>p.name),ffNames=browserProjects().filter(p=>p.use.browserName==='firefox').map(p=>p.name);
  if(JSON.stringify(webkit.report.options.projects)!==JSON.stringify(wkNames)||webkit.report.options.grep||webkit.report.options.smoke||webkit.report.options.desktop)throw new Error('Se necesitan los tres proyectos WebKit sin filtros');
  const assessment=assessBrowserRun(webkit.raw,webkit.report.options);
  if(assessment.status!=='passed'||assessment.cases.length!==84)throw new Error('Faltan casos WebKit reales');
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const snapshotMap=r=>Object.fromEntries(r.snapshots.map(s=>[s.path,s.sha256]).sort(([a],[b])=>a.localeCompare(b)));
  const normalizedUse=use=>{const {baseURL,...rest}=use;return rest;};
  for(const run of [firefox,focus,webkit]) {
    if(run.report.source.sha256!==webkit.report.source.sha256||!same(run.report.packages,webkit.report.packages)||!same(run.report.environment,webkit.report.environment)||!same(snapshotMap(run.report),snapshotMap(webkit.report)))throw new Error('Fuente, versiones, entorno o referencias incompatibles: '+run.directory);
    for(const p of run.report.projects) {
      const current=webkit.report.projects.find(x=>x.name===p.name)??focus.report.projects.find(x=>x.name===p.name);
      if(!current||!same(normalizedUse(p.use),normalizedUse(current.use))||p.use.baseURL!==run.report.origins.appOrigin)throw new Error('Configuración efectiva incompatible: '+p.name);
    }
    for(const engine of run.report.preflight.engines) {
      const current=focus.report.preflight.engines.find(e=>e.engine===engine.engine);
      if(engine.status!=='ready'||current?.status!=='ready'||current.version!==engine.version)throw new Error('Motor o versión incompatibles');
    }
  }
  const appFile='tests/cross-browser/application.spec.ts',oldHash=firefox.report.tooling.find(f=>f.path===appFile).sha256;
  const archivedSource='specs/verification/browser-point-3-application-before-focus.txt';
  // Se reconstruyó revirtiendo exclusivamente la corrección de foco. Su SHA-256
  // debe coincidir con el registrado antes de aquella ejecución, byte por byte.
  const beforeSource=await readFile(resolve(archivedSource),'utf8');
  const currentSource=await readFile(resolve(appFile),'utf8'),delta=reviewFocusChange(beforeSource,currentSource);
  if(delta.beforeHash!==oldHash)throw new Error('La fuente anterior no coincide con el SHA-256 registrado antes de ejecutar');
  const currentTooling=new Map(webkit.report.tooling.map(f=>[f.path,f.sha256]));
  for(const run of [firefox,focus]) {
    if(run.report.tooling.length!==currentTooling.size)throw new Error('Cambió el inventario de herramientas');
    for(const file of run.report.tooling) {
      const current=currentTooling.get(file.path);
      if(current===file.sha256)continue;
      if(run!==firefox||file.path!==appFile||file.sha256!==delta.beforeHash||current!==delta.afterHash)throw new Error('Cambio de herramienta no revisado: '+file.path);
    }
  }
  for(const file of [...webkit.report.tooling,...webkit.report.snapshots])if(sha256(await readFile(resolve(file.path)))!==file.sha256)throw new Error('Archivo actual diferente: '+file.path);
  if((await sourceFingerprint(root)).sha256!==webkit.report.source.sha256)throw new Error('Cambió la fuente actual');
  const assembled=assembleEvidence([
    {execution:firefox.directory+'/results.json',raw:firefox.raw,projects:ffNames,excludeIds:['APP-04']},
    {execution:focus.directory+'/results.json',raw:focus.raw,projects:ffNames,includeIds:['APP-04']},
    {execution:webkit.directory+'/results.json',raw:webkit.raw,projects:wkNames},
  ]);
  const options={projects:browserProjects().map(p=>p.name),smoke:false,list:false,buildOnly:false};
  const consolidated=assessBrowserRun(assembled,options);
  if(consolidated.status!=='passed'||consolidated.cases.length!==168)throw new Error('Consolidación incompleta: '+consolidated.reasons[0]);
  await writeFile(path.join(proof,'browser-point-3-consolidated-results.json'),JSON.stringify(assembled,null,2)+'\n');
  const review={point:3,status:'ready-for-review',kind:'consolidated-evidence',recordedAt:new Date().toISOString(),source:webkit.report.source.sha256,
    inputs:[firefox,focus,webkit].map(run=>({directory:run.directory,...run.hashes,status:run.report.status,selectedCases:assembled.provenance.filter(p=>p.execution===run.directory+'/results.json').length})),
    compatibility:{sameSource:true,samePackages:true,sameEnvironment:true,sameSnapshots:true,effectiveProjects:true,browserVersions:focus.report.preflight.engines.map(e=>({engine:e.engine,version:e.version}))},
    reviewedToolingChange:{...delta,archivedSource,provenance:'Reconstrucción del archivo anterior al revertir la corrección conocida; SHA-256 idéntico al registrado previamente.',note:'Solo cambia APP-04. Sus seis casos nuevos pasaron; se utilizan los tres de Firefox y los de WebKit se toman de la ejecución WebKit completa.'},
    assessment:consolidated,verifier:{path:'specs/verification/browser-point-3-consolidate.mjs',sha256:sha256(await readFile(fileURLToPath(import.meta.url)))}};
  await writeFile(path.join(proof,'browser-point-3-consolidation-review.json'),JSON.stringify(review,null,2)+'\n');
  console.log('Consolidación: 168 casos aprobados; procedencia y compatibilidad verificadas.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv[2]).catch(error=>{console.error(error.message);process.exitCode=1;});
