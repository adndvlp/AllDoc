import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as acceptance from '../scripts/lib/browser-acceptance.ts';
import {browserProjects} from '../scripts/lib/browser-foundation.ts';
import {visualFilesFor,referenceRoot} from '../scripts/lib/browser-visual.ts';
import {visualCases,visualTitle} from '../scripts/lib/browser-visual.ts';
import {browserCases,appliesToProject,caseTitle} from '../scripts/lib/browser-cases.ts';

const fn=(name:string)=>{const f=Reflect.get(acceptance,name);assert.equal(typeof f,'function','Falta '+name);return f as (...args:any[])=>any;};
const hash='a'.repeat(64),reviewHash='b'.repeat(64);
function references() {
  const images=browserProjects().flatMap(p=>visualFilesFor(p.name).map(path=>({path,sha256:hash,status:'approved',project:p.name})));
  const manifests=browserProjects().map(p=>({path:referenceRoot+'/'+p.name+'/manifest.json',sha256:hash}));
  const approval={point:4,status:'complete',source:'source',generation:{directory:'run'},references:{approvedImages:52,projects:6,manifests,review:{path:'review.json',sha256:reviewHash}}};
  const review={point:4,status:'approved',source:'source',execution:'run',images:structuredClone(images),manifests:structuredClone(manifests)};
  return {approval,review,images,manifests,reviewFile:{path:'review.json',sha256:reviewHash}};
}

test('aceptación: filtros y modos parciales nunca se confunden con cierre; actualizar referencias se rechaza',()=>{
  assert.equal(acceptance.parseBrowserAcceptanceArgs([]).mode,'full');
  assert.equal(acceptance.parseBrowserAcceptanceArgs(['--suite=visual']).mode,'subset');
  assert.equal(acceptance.parseBrowserAcceptanceArgs(['--code-only']).mode,'code-only');
  for(const args of [['--update-snapshots'],['--grep=SQL'],['--suite=visual','--project=celular'],['--code-only','--suite=visual'],['--suite=chromium','--grep=responsive:\n  rotación y texto']])assert.throws(()=>acceptance.parseBrowserAcceptanceArgs(args));
});
test('referencias aprobadas: exige las 52 imágenes y los seis manifiestos ligados a la revisión',()=>{
  const f=references();assert.equal(fn('assessReviewedReferences')(f).status,'approved');
  const changes:Array<(f:ReturnType<typeof references>)=>void>=[f=>{f.review.status='pending';},f=>{f.review.images[0].status='pending';},f=>{f.images[0]={...f.images[0],sha256:reviewHash};},f=>{f.images.pop();},f=>{f.manifests.push(f.manifests[0]);},f=>{f.reviewFile.sha256=hash;}];
  for(const change of changes){
    const data=references();change(data);assert.equal(fn('assessReviewedReferences')(data).status,'blocked');
  }
});

function chromium() {
  const specs=acceptance.chromiumNames.map((projectName,i)=>({title:'caso '+i,file:'sample.spec.ts',line:i+1,column:1,tests:[{projectName,expectedStatus:'passed',status:'expected',results:[{status:'passed',retry:0}]}]}));
  return {config:{updateSnapshots:'none',workers:2,projects:acceptance.chromiumNames.map(name=>({name,retries:0,repeatEach:1})),metadata:{suite:'chromium'}},suites:[{file:'sample.spec.ts',specs}],stats:{expected:7,skipped:0,unexpected:0,flaky:0},errors:[]};
}
test('Chromium: contrasta todos los casos descubiertos y rechaza resumen favorable con huecos, duplicados o retries',()=>{
  const raw=chromium(),discovery=structuredClone(raw);assert.equal(fn('assessChromiumRegression')(raw,discovery).status,'passed');
  const changes:Array<(r:ReturnType<typeof chromium>)=>void>=[r=>{r.suites[0].specs.pop();r.stats.expected--;},r=>{r.suites[0].specs.push(r.suites[0].specs[0]);r.stats.expected++;},r=>{r.suites[0].specs[0].tests[0].results[0].retry=1;},r=>{r.config.updateSnapshots='missing';},r=>{r.config.projects[0].retries=1;}];
  for(const change of changes){
    const data=chromium();change(data);assert.equal(fn('assessChromiumRegression')(data,discovery).status,'incomplete');
  }
});

function complete() {
  const projects=browserProjects().map(p=>p.name);
  function report(entries:{id:string;file:string;title:string;projects:string[]}[],suite:string) {
    const specs=entries.map((entry,i)=>({file:entry.file,line:i+1,column:1,title:entry.title,tests:entry.projects.map(projectName=>({projectName,expectedStatus:'passed',status:'expected',results:[{status:'passed',retry:0}]}))}));
    return {config:{updateSnapshots:'none',workers:2,projects:projects.map(name=>({name,retries:0,repeatEach:1})),metadata:{suite}},
      suites:[{specs}],stats:{startTime:'2026-11-15T10:01:00Z',expected:specs.reduce((n,s)=>n+s.tests.length,0),unexpected:0,skipped:0,flaky:0},errors:[]};
  }
  const functional=report(browserCases.map(c=>({...c,title:caseTitle(c.id),projects:projects.filter(p=>appliesToProject(c,p))})),'functional');
  const visual=report(visualCases.map(c=>({id:c.id,file:'visual.spec.ts',title:visualTitle(c.id),projects:projects.filter(p=>!c.narrow||p.endsWith('-estrecho'))})),'visual');
  const chrom={...chromium(),stats:{...chromium().stats,startTime:'2026-11-15T10:01:00Z'}};
  return {mode:'full',startedAt:'2026-11-15T10:00:00Z',suites:{functional,visual,chromium:chrom},chromiumDiscovery:structuredClone(chrom),
    nativeCases:[{file:'tests/sample.test.ts',name:'comprobación',line:1,status:'passed',skipped:false}],nativeFiles:['tests/sample.test.ts'],
    preflight:{status:'ready',engines:['chromium','firefox','webkit'].map(engine=>({engine,status:'ready',version:'1'}))},
    checks:Object.fromEntries(['native','typesApp','typesTests','buildApp','runtime'].map(key=>[key,{status:'passed'}])),
    runtimeManifest:{appOrigin:'http://127.0.0.1:1234',runtimeOrigin:'http://localhost:2345'},published:{status:'passed',pages:[{route:'/'}]},
    review:{status:'approved',images:52,manifests:6},tdd:{status:'recorded'},productPaths:{status:'unchanged'},artifacts:{status:'hashed'},
    invariants:{source:true,tooling:true,references:true,review:true,packages:true,chromiumBaseline:true},
    scope:{physicalDevices:false,commercialSafari:false,fieldINP:false,browserDistributions:'Playwright'}};
}
test('cierre global: doce criterios dependen de evidencia ejecutada, revisión, invariantes y fuente final',()=>{
  const data=complete(),result=fn('assessBrowserAcceptance')(data);
  assert.equal(result.status,'complete',JSON.stringify(result.criteria));assert.ok(result.criteria.every((c:{status:string})=>c.status==='passed'));
  const changes:Array<(d:ReturnType<typeof complete>)=>void>=[
    d=>{d.mode='subset';},d=>{d.preflight.engines[0].status='missing-executable';},d=>{d.review.status='pending';},
    d=>{d.invariants.references=false;},d=>{d.checks.typesApp.status='not-run';},d=>{d.nativeCases[0].status='failed';},
    d=>{d.suites.visual.config.updateSnapshots='missing';},d=>{d.scope.physicalDevices=true;},d=>{d.productPaths.status='changed';},
    d=>{d.suites.chromium.stats.startTime='2026-11-14T10:00:00Z';},
  ];
  for(const change of changes){const input=complete();change(input);assert.equal(fn('assessBrowserAcceptance')(input).status,'incomplete');}
});
test('Chromium: una omisión nueva no se acredita como aprobada',()=>{
  const raw=chromium(),discovery=structuredClone(raw);Object.assign(raw.suites[0].specs[0].tests[0],{expectedStatus:'skipped',status:'skipped',results:[{status:'skipped',retry:0}]});raw.stats.expected--;raw.stats.skipped++;
  assert.equal(fn('assessChromiumRegression')(raw,discovery).status,'incomplete');
});

test('Chromium: el diagnóstico prioriza el fallo real frente a casos que no llegaron a ejecutarse',()=>{
  const raw=chromium(),discovery=structuredClone(raw);
  raw.suites[0].specs[0].tests[0].results=[];raw.suites[0].specs[0].tests[0].status='skipped';
  const failed=raw.suites[0].specs.at(-1)!.tests[0];failed.status='unexpected';failed.results[0].status='failed';raw.stats.unexpected=1;
  const result=fn('assessChromiumRegression')(raw,discovery);
  assert.match(result.reasons[0],/escritorio\/caso 6/);assert.equal(result.status,'incomplete');
});

test('Chromium: las nueve omisiones previstas conservan identidad y motivo; un motivo distinto se rechaza',()=>{
  const raw=chromium();
  const policies=[
    {file:'practice.spec.ts',title:'separador: teclado, arrastre y restablecer mantienen mínimos y scroll independiente',projects:['celular-pequeno','celular','celular-horizontal'],reason:'El modo modal ocupa el área visible y no tiene separador.'},
    {file:'responsive.spec.ts',title:'la navegación se adapta al girar el dispositivo',projects:['laptop','escritorio'],reason:'La rotación se prueba en los proyectos táctiles.'},
    {file:'responsive.spec.ts',title:'scroll independiente del contenido y el sidebar',projects:['celular-pequeno','celular','celular-horizontal','ipad'],reason:'En pantallas pequeñas los temas están en un panel móvil.'},
  ];
  for(const [index,p] of policies.entries())raw.suites[0].specs.push({title:p.title,file:p.file,line:index+100,column:1,
    tests:p.projects.map(projectName=>({projectName,expectedStatus:'skipped',status:'skipped',results:[{status:'skipped',retry:0}],annotations:[{type:'skip',description:p.reason}]}))});
  raw.stats.skipped=9;const discovered=structuredClone(raw),result=fn('assessChromiumRegression')(raw,discovered);
  assert.equal(result.status,'passed',result.reasons.join());assert.equal(result.passed,7);assert.equal(result.skipped,9);
  const item=raw.suites[0].specs.at(-1)!.tests[0];Reflect.set(item,'annotations',[{type:'skip',description:'sin motivo válido'}]);
  assert.equal(fn('assessChromiumRegression')(raw,discovered).status,'incomplete');
});
test('cierre global: faltan pruebas, revisión y navegadores aunque se declare un contador favorable',()=>{
  const result=fn('assessBrowserAcceptance')({status:'complete',count:9999});assert.equal(result.status,'incomplete');assert.equal(result.criteria.length,12);
  assert.ok(result.criteria.every((c:{status:string})=>c.status==='pending'));
});
