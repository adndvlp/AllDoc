import {test} from 'node:test';
import assert from 'node:assert/strict';
import {browserProjects} from '../scripts/lib/browser-foundation.ts';
import {visualCasesFor,visualTitle,visualFilesFor,makeVisualManifest,checkVisualManifest,assessVisualRun,checkVisualStates,type VisualContext,type VisualState} from '../scripts/lib/browser-visual.ts';

const projects=browserProjects(),project=projects[0].name;
const context:VisualContext={project:projects[0],environment:{platform:'darwin',release:'27.0.0',arch:'arm64',node:'v26'},
  packages:{'@playwright/test':'1.65.1'},browser:{engine:'firefox',version:'159.0'}};
const files=()=>visualFilesFor(project).map(path=>({path,sha256:'a'.repeat(64)}));
const states=():VisualState[]=>visualCasesFor(project).flatMap(c=>c.images.map(image=>({project,image,
  viewport:image==='320-texto-200.png'?{width:320,height:568}:image==='horizontal-texto-200.png'?{width:844,height:390}:projects[0].use.viewport,
  fontScale:image.endsWith('texto-200.png')?2:1})));
const manifest=()=>makeVisualManifest(context,files(),states(),{source:'source-1',tooling:[]});
const raw=()=>({errors:[],stats:{expected:26,unexpected:0,skipped:0,flaky:0},suites:projects.map(p=>({file:'visual.spec.ts',specs:visualCasesFor(p.name).map(c=>({title:visualTitle(c.id),file:'visual.spec.ts',tests:[{projectName:p.name,expectedStatus:'passed',status:'expected',results:[{status:'passed',retry:0,duration:1}]}]}))}))});

test('referencias: 52 imágenes independientes, 26 casos y adaptación solo en proyectos estrechos',()=>{
  assert.equal(projects.flatMap(p=>visualFilesFor(p.name)).length,52);
  assert.equal(assessVisualRun(raw(),{projects:projects.map(p=>p.name)}).status,'passed');
  assert.equal(visualCasesFor('webkit-escritorio').length,4);
  assert.throws(()=>visualFilesFor('../celular'),/desconocido/);
});
test('referencias: generación pendiente de revisión, archivos exactos y dimensiones reales de cada estado',()=>{
  const m=manifest();assert.equal(m.status,'awaiting-review');assert.equal(m.snapshots.length,10);
  assert.throws(()=>makeVisualManifest(context,files().slice(1),states(),{source:'x',tooling:[]}),/incompletas/);
  const duplicate=files();duplicate[0]=duplicate[1];assert.throws(()=>makeVisualManifest(context,duplicate,states(),{source:'x',tooling:[]}),/duplicadas/);
  const wrong=states();wrong[0].viewport={width:1280,height:800};assert.throws(()=>checkVisualStates(project,wrong),/Viewport/);
  assert.throws(()=>checkVisualStates(project,states().slice(1)),/incompletos/);
});
test('referencias: rechaza entorno o binario distintos sin comparar silenciosamente entre plataformas',()=>{
  const m=manifest();assert.equal(checkVisualManifest(m,context,files()).status,'compatible');
  for(const patch of [{environment:{...context.environment,arch:'x64'}},{environment:{...context.environment,release:'28'}},
    {packages:{'@playwright/test':'2.0.0'}},{browser:{...context.browser,version:'160.0'}},
    {project:{...context.project,use:{...context.project.use,deviceScaleFactor:2}}}]) {
    const report=checkVisualManifest(m,{...context,...patch},files());assert.equal(report.status,'blocked');assert.match(report.reasons.join(),/Entorno/);
  }
  assert.equal(checkVisualManifest(m,{...context,project:{...context.project,use:{...context.project.use,baseURL:'http://127.0.0.1:55555'}}},files()).status,'compatible');
});
test('referencias: falta de manifiesto, edición manual, PNG ajeno o política ampliada bloquean la comparación',()=>{
  assert.equal(checkVisualManifest(undefined,context,files()).status,'blocked');
  const changed=files();changed[0].sha256='b'.repeat(64);assert.equal(checkVisualManifest(manifest(),context,changed).status,'blocked');
  const m=manifest();Reflect.set(m.policy,'maxDiffPixelRatio',.1);assert.equal(checkVisualManifest(m,context,files()).status,'blocked');
  const extra=files();extra.push({path:'tests/ui/__screenshots__/celular/inicio.png',sha256:'a'.repeat(64)});
  assert.equal(checkVisualManifest(manifest(),context,extra).status,'blocked');
});
test('referencias: evaluación estricta rechaza huecos, duplicados, fallos, reintentos y contadores inventados',()=>{
  const options={projects:projects.map(p=>p.name)};
  const missing=raw();missing.suites[0].specs.pop();missing.stats.expected--;assert.equal(assessVisualRun(missing,options).status,'incomplete');
  const duplicate=raw();duplicate.suites[0].specs.push(duplicate.suites[0].specs[0]);duplicate.stats.expected++;assert.equal(assessVisualRun(duplicate,options).status,'incomplete');
  for(const field of ['skipped','flaky','unexpected','expected']){const data=raw();data.stats[field as keyof typeof data.stats]++;assert.equal(assessVisualRun(data,options).status,'incomplete');}
  for(const patch of [{status:'failed',retry:0},{status:'passed',retry:1}]){const data=raw();Object.assign(data.suites[0].specs[0].tests[0].results[0],patch);assert.equal(assessVisualRun(data,options).status,'incomplete');}
});

test('referencias: los estados capturados corresponden exactamente a los casos seleccionados, también al comparar',()=>{
  const selected=states().filter(s=>s.image==='inicio.png');
  assert.doesNotThrow(()=>checkVisualStates(project,selected,['VIS-01']));
  assert.throws(()=>checkVisualStates(project,[],['VIS-01']),/incompletos/);
  assert.throws(()=>checkVisualStates(project,states(),['VIS-01']),/duplicados/);
});
