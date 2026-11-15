import {browserProjects} from './browser-foundation.ts';

export const visualCases = [
  {id:'VIS-01', label:'portada con catálogo y buscador', narrow:false, images:['inicio.png']},
  {id:'VIS-02', label:'SQL real: código, resultado y datos', narrow:false, images:['sql-codigo.png','sql-resultado.png','sql-datos.png']},
  {id:'VIS-03', label:'pandas real: resultado y sugerencias Jedi', narrow:false, images:['pandas-resultado.png','pandas-sugerencias.png']},
  {id:'VIS-04', label:'práctica con búsqueda y temas', narrow:false, images:['practica-busqueda.png','practica-temas.png']},
  {id:'VIS-05', label:'320 px y ventana horizontal al 200%', narrow:true, images:['320-texto-200.png','horizontal-texto-200.png']},
] as const;
export const visualTitle = (id:string) => {
  const entry=visualCases.find(c=>c.id===id); if(!entry) throw new Error('Caso visual desconocido: '+id);
  return `[${id}] ${entry.narrow?'@narrow ':''}${entry.label}`;
};
export const visualCasesFor = (project:string) => {
  if(!browserProjects().some(p=>p.name===project)) throw new Error('Proyecto visual desconocido: '+project);
  return visualCases.filter(c=>!c.narrow||project.endsWith('-estrecho'));
};
export const referenceRoot='tests/cross-browser/__screenshots__';
export const visualFilesFor=(project:string)=>visualCasesFor(project).flatMap(c=>c.images.map(image=>`${referenceRoot}/${project}/${image}`));
export type FileHash={path:string;sha256:string};
export type VisualContext={project:{name:string;use:Record<string,unknown>};
  environment:{platform:string;release:string;arch:string;[key:string]:unknown};
  packages:Record<string,string>;browser:{engine:string;version:string}};
export type VisualState={project:string;image:string;viewport:{width:number;height:number};fontScale:number};
export type VisualManifest={schemaVersion:1;status:'awaiting-review';capturedAt:string;context:VisualContext;
  source:string;tooling:FileHash[];snapshots:FileHash[];states:VisualState[];policy:typeof visualPolicy};
export const visualPolicy=Object.freeze({animations:'disabled',caret:'hide',maxDiffPixelRatio:0.001,fullPage:false} as const);
const canonical=(value:unknown):string=>JSON.stringify(value,(_key,item)=>item&&typeof item==='object'&&!Array.isArray(item)?Object.fromEntries(Object.entries(item).sort(([a],[b])=>a.localeCompare(b))):item);
const renderContext=(c:VisualContext)=>({project:{name:c.project.name,use:Object.fromEntries(Object.entries(c.project.use).filter(([key])=>key!=='baseURL'))},
  environment:{platform:c.environment.platform,release:c.environment.release,arch:c.environment.arch},packages:c.packages,browser:c.browser});

function checkFiles(project:string, snapshots:FileHash[]) {
  const expected=visualFilesFor(project), paths=snapshots.map(f=>f.path);
  if(canonical([...paths].sort())!==canonical([...expected].sort())||snapshots.some(f=>!/^[a-f0-9]{64}$/.test(f.sha256))) throw new Error('Referencias incompletas, duplicadas o ajenas a '+project);
}
export function checkVisualStates(project:string, states:VisualState[], selectedIds?:readonly string[]) {
  const cases=visualCasesFor(project);
  if(selectedIds?.some(id=>!cases.some(c=>c.id===id))) throw new Error('Caso visual desconocido en '+project);
  const expected=cases.filter(c=>!selectedIds||selectedIds.includes(c.id)).flatMap(c=>[...c.images]);
  if(canonical(states.map(s=>s.image).sort())!==canonical([...expected].sort())) throw new Error('Estados visuales incompletos o duplicados: '+project);
  const viewport=browserProjects().find(p=>p.name===project)!.use.viewport;
  for(const state of states) {
    const small=state.image==='320-texto-200.png', horizontal=state.image==='horizontal-texto-200.png';
    const wanted=small?{width:320,height:568}:horizontal?{width:844,height:390}:viewport;
    if(state.project!==project||canonical(state.viewport)!==canonical(wanted)||state.fontScale!==(small||horizontal?2:1)) throw new Error('Viewport o texto inesperado: '+state.image);
  }
}
export function makeVisualManifest(context:VisualContext,snapshots:FileHash[],states:VisualState[],provenance:{source:string;tooling:FileHash[]}):VisualManifest {
  checkFiles(context.project.name,snapshots); checkVisualStates(context.project.name,states);
  return {schemaVersion:1,status:'awaiting-review',capturedAt:new Date().toISOString(),context,source:provenance.source,tooling:provenance.tooling,
    snapshots:[...snapshots].sort((a,b)=>a.path.localeCompare(b.path)),states,policy:{...visualPolicy}};
}
export function checkVisualManifest(input:unknown, context:VisualContext, snapshots:FileHash[]):{status:'compatible'|'blocked';reasons:string[]} {
  const reasons:string[]=[];
  try {
    const manifest=input as VisualManifest;
    if(manifest?.schemaVersion!==1||manifest.status!=='awaiting-review') throw new Error('Falta un manifiesto visual válido');
    if(canonical(renderContext(manifest.context))!==canonical(renderContext(context))) throw new Error('Entorno visual distinto: regenerar y revisar referencias explícitamente');
    if(canonical(manifest.policy)!==canonical(visualPolicy)) throw new Error('La política de comparación visual cambió');
    checkFiles(context.project.name,manifest.snapshots); checkFiles(context.project.name,snapshots); checkVisualStates(context.project.name,manifest.states);
    if(canonical([...manifest.snapshots].sort((a,b)=>a.path.localeCompare(b.path)))!==canonical([...snapshots].sort((a,b)=>a.path.localeCompare(b.path)))) throw new Error('Los hashes de las referencias no coinciden con el manifiesto');
  } catch(error) {reasons.push(error instanceof Error?error.message:String(error));}
  return {status:reasons.length?'blocked':'compatible',reasons};
}

/** Los contadores no sustituyen los casos originales ni convierten un filtro en matriz completa. */
export function assessVisualRun(raw:any, options:{projects:string[];grep?:string}) {
  const cases:{project:string;id:string;status:string;file:string;durationMs:number}[]=[],reasons:string[]=[],seen=new Set<string>();
  function visit(suite:any) {
    for(const spec of suite.specs??[]) for(const test of spec.tests??[]) {
      const id=/^\[(VIS-\d+)\]/.exec(spec.title??'')?.[1]??'',project=test.projectName,key=project+'/'+id;
      const valid=options.projects.includes(project)&&visualCasesFor(project).some(c=>c.id===id)&&(spec.file??suite.file)==='visual.spec.ts';
      const result=test.results?.[0], passed=valid&&test.expectedStatus==='passed'&&test.status==='expected'&&test.results.length===1&&result?.status==='passed'&&result.retry===0;
      if(!passed) reasons.push('Caso visual no aprobado: '+key); if(seen.has(key)) reasons.push('Caso visual duplicado: '+key); seen.add(key);
      cases.push({project,id,status:passed?'passed':result?.status??'invalid',file:spec.file??suite.file,durationMs:result?.duration??0});
    }
    for(const child of suite.suites??[]) visit(child);
  }
  try {for(const suite of raw.suites??[]) visit(suite);} catch(error) {reasons.push(String(error));}
  if(!cases.length) reasons.push('No se ejecutaron casos visuales');
  if(raw.errors?.length) reasons.push('Errores globales de Playwright');
  for(const key of ['unexpected','flaky','skipped']) if(raw.stats?.[key]!==0) reasons.push('Contador visual no aprobado: '+key);
  if(raw.stats?.expected!==cases.length) reasons.push('El contador visual no coincide con los casos originales');
  for(const project of options.projects) for(const entry of visualCasesFor(project)) {
    if((!options.grep||cases.some(c=>c.id===entry.id))&&!seen.has(project+'/'+entry.id)) reasons.push('Falta '+project+'/'+entry.id);
  }
  return {status:reasons.length?'incomplete':options.grep?'subset-passed':'passed',reasons,cases,coverage:[]};
}
