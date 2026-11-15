import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseBrowserRunArgs, assessBrowserRun, effectiveBrowserProjects, type BrowserRunOptions} from '../scripts/lib/browser-run.ts';
import {browserProjects} from '../scripts/lib/browser-foundation.ts';
import {browserCases, appliesToProject, caseTitle} from '../scripts/lib/browser-cases.ts';
import config from '../playwright.cross-browser.config.ts';

const projects = browserProjects().map(p => p.name);
const options: BrowserRunOptions = {projects, smoke: false, list: false, buildOnly: false};
function full() {
  const suites = [...new Set(browserCases.map(c => c.file))].map(file => ({file, specs: browserCases.filter(c => c.file === file).map(c => ({title: caseTitle(c.id), file, tests: projects.filter(p => appliesToProject(c, p)).map(projectName => ({projectName, expectedStatus: 'passed', status: 'expected', results: [{status: 'passed', retry: 0}]}))}))}));
  return {errors: [], stats: {expected: suites.flatMap(s => s.specs).reduce((n, s) => n + s.tests.length, 0), unexpected: 0, skipped: 0, flaky: 0}, suites};
}
test('matriz: valores por defecto cubren seis proyectos; smoke conserva cuatro casos y se puede seleccionar estrecho', () => {
  assert.deepEqual(parseBrowserRunArgs([]).projects, projects);
  assert.deepEqual(parseBrowserRunArgs(['--smoke']).projects, ['firefox-escritorio', 'webkit-escritorio']);
  assert.deepEqual(parseBrowserRunArgs(['--project=webkit-estrecho']).projects, ['webkit-estrecho']);
});
test('matriz: registra los veinte requisitos y configura exclusiones por alcance sin tests omitidos', () => {
  assert.deepEqual([...new Set(browserCases.flatMap(c => c.requirements))].sort(), Array.from({length:20}, (_,i) => 'CB-' + String(i+1).padStart(2,'0')));
  for (const p of config.projects!) assert.equal(Boolean((p.grepInvert as RegExp | undefined)?.test('@desktop')), !p.name!.endsWith('-escritorio'));
  assert.equal(new Set(browserCases.map(c => c.id)).size, browserCases.length);
});
test('matriz: exige cada caso aplicable con archivo correcto y rechaza huecos aunque el contador sea favorable', () => {
  const data=full(); assert.equal(data.stats.expected,168);
  assert.equal(assessBrowserRun(data,options).status,'passed');
  data.suites.find(s=>s.file==='application.spec.ts')!.specs[0].tests.pop(); data.stats.expected--;
  assert.equal(assessBrowserRun(data,options).status,'incomplete');
});
test('matriz: veinte casos históricos de escritorio no acreditan la matriz ampliada', () => {
  const data=full(); data.suites=data.suites.filter(s=>s.file==='practice-desktop.spec.ts');
  data.stats.expected=data.suites[0].specs.reduce((n,s)=>n+s.tests.length,0);
  assert.equal(assessBrowserRun(data,options).status,'incomplete');
});
test('matriz: filtros de casos de escritorio no exigen resultados inventados en los otros tamaños', () => {
  const data=full(); data.suites=data.suites.filter(s=>s.file==='practice-errors.spec.ts');
  data.suites[0].specs=data.suites[0].specs.filter(s=>s.title.includes('[SQL-11]'));
  data.stats.expected=2;
  assert.equal(assessBrowserRun(data,{...options,grep:'SQL-11'}).status,'subset-passed');
});

test('matriz: el informe acredita cada requisito con sus casos reales y distingue capacidades no aplicables',()=>{
  const data=full(), report=assessBrowserRun(data,options);
  type Cell={project:string;requirement:string;status:string;requiredCases:string[];passedCases:string[]};
  const cells=Reflect.get(report,'coverage') as Cell[]|undefined;
  assert.ok(cells,'Falta la matriz de evidencia por requisito y proyecto');
  const desktop=cells.find(c=>c.project==='webkit-escritorio'&&c.requirement==='CB-14')!;
  assert.deepEqual([...desktop.requiredCases].sort(),['PY-10','PY-11','SQL-10','SQL-11']); assert.equal(desktop.status,'passed');
  const narrow=cells.find(c=>c.project==='webkit-estrecho'&&c.requirement==='CB-14')!;
  assert.equal(narrow.status,'not-applicable'); assert.deepEqual(narrow.requiredCases,[]);
  data.suites.find(s=>s.file==='practice-errors.spec.ts')!.specs.find(s=>s.title.includes('[PY-11]'))!.tests.pop(); data.stats.expected--;
  const failed=Reflect.get(assessBrowserRun(data,options),'coverage') as Cell[];
  assert.equal(failed.find(c=>c.project==='webkit-escritorio'&&c.requirement==='CB-14')!.status,'incomplete');
});

test('informe: registra el origen efímero efectivo sin arrastrar la baseURL por defecto ni mutar opciones',()=>{
  const common={baseURL:'http://127.0.0.1:4173',locale:'es-MX',headless:true};
  const selected=effectiveBrowserProjects(['webkit-tableta'],common,'http://127.0.0.1:54321');
  assert.equal(Reflect.get(selected[0].use,'baseURL'),'http://127.0.0.1:54321');
  assert.equal(selected[0].use.browserName,'webkit'); assert.deepEqual(selected[0].use.viewport,{width:768,height:1024});
  assert.equal(common.baseURL,'http://127.0.0.1:4173');
});
