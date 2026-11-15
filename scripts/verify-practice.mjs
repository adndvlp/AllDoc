import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {readFile, writeFile, mkdir, rm, mkdtemp} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir, cpus, totalmem, release, platform, arch} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium, firefox, webkit} from '@playwright/test';
import config from '../playwright.config.ts';
import {sourceFingerprint, filesUnder, sha256, inventoryBuild, serveBuild} from './lib/baseline.ts';
import {assessPracticeMetrics, assessPracticeBundle, assessPracticeAcceptance, practiceUICases, auditPublishedBuild} from './lib/final-verification.ts';
import {measurePracticeProfile, practiceProfiles, crossBrowserSmoke} from './lib/practice-browser.mjs';
import {buildRuntime} from './build-practice-runtime.mjs';
import {createRuntimeHandler} from './lib/runtime-http.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some(arg => !['--code-only', '--measure-only', '--ui-only'].includes(arg)) || args.length > 1) throw new Error('Uso: npm run verify:practice [-- --code-only | --measure-only | --ui-only]');
const codeOnly = args.includes('--code-only'), measureOnly = args.includes('--measure-only'), uiOnly = args.includes('--ui-only');
const source = await sourceFingerprint(root), startedAt = new Date().toISOString();
const relativeOutput = 'benchmarks/practice-verifications/' + startedAt.replace(/[:.]/g, '-') + '-' + source.sha256.slice(0, 10);
const output = path.join(root, relativeOutput);
const reference = 'benchmarks/runs/2026-11-14T05-52-07-925Z-68412ecc98';
const lock = path.join(root, '.docusaurus-practice-verification-lock');
await mkdir(output, {recursive: true});
const report = {schemaVersion: 1, point: 8, status: 'partial', mode: codeOnly ? 'code-only' : measureOnly ? 'measure-only' : uiOnly ? 'ui-only' : 'full', startedAt,
  source, tooling: [], snapshots: [], checks: {}, reference, environment: {node: process.version, platform: platform(), release: release(), arch: arch(),
    cpu: cpus()[0]?.model, logicalCpus: cpus().length, totalMemoryBytes: totalmem()},
  conditions: {metric: 'DOM + siguiente rAF', inp: 'not-measured', cache: 'Contexto nuevo por perfil, caché HTTP deshabilitada por CDP',
    network: 'HTTP estático local; sin throttling de red. Código Python y SQL se ejecuta en el navegador.',
    cpu: 'Página Chromium por CDP: laptop 1×, celular 4×. No equivale a un teléfono físico ni acredita throttling idéntico del Worker.',
    samples: '30 por acción, perfil y tamaño. Cierre/apertura ya preparados; contextos terminan al mostrar nombre y borrador, no al arrancar la VM.',
    completions: 'SQL: SEL y SELECT productos.pre. Pandas/Jedi: pd.Da y productos["pre. Invocación explícita Ctrl+Space, sin ejecutar para completar.',
    trace: 'Una reproducción posterior por perfil; queda fuera de las muestras del presupuesto.'},
  packages: {}, browserReview: 'pending', limitations: [], failure: null};
let ownsLock = false, temporary, app, runtimeServer, activeChild, stage = 'preflight';
const json = (name, data) => writeFile(path.join(output, name), JSON.stringify(data, null, 2) + '\n');
async function hashes(filenames) {
  return Promise.all(filenames.sort().map(async filename => ({path: filename, sha256: sha256(await readFile(path.join(root, filename)))})));
}
const snapshotHashes = async () => hashes((await filesUnder('tests/ui/__screenshots__')).filter(file => file.endsWith('.png')));
const toolingHashes = async () => hashes([...await filesUnder('scripts'), ...(await filesUnder('tests')).filter(file => !file.includes('/__screenshots__/')),
  'playwright.config.ts', 'tsconfig.tests.json'].filter(file => !file.endsWith('.DS_Store')));
async function run(name, executable, arguments_, env = {}) {
  stage = name; console.log(name);
  const logName = name.split(' ')[0] + '.log', log = createWriteStream(path.join(output, logName));
  let tail = '';
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(executable, arguments_, {cwd: root, env: {...process.env, DOCUSAURUS_NO_PERSISTENT_CACHE: '1', ...env}, stdio: ['ignore', 'pipe', 'pipe']});
      activeChild = child;
      for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => {log.write(chunk); tail = (tail + chunk.toString()).slice(-1200);});
      child.once('error', reject); child.once('exit', code => code === 0 ? resolve() : reject(new Error(`${name}: código ${code}. ${tail}`)));
    });
    report.checks[name] = {status: 'passed', log: logName};
  } finally {activeChild = null; await new Promise(resolve => log.end(resolve));}
}
async function runtimeHost() {
  let handler = (_request, response) => response.writeHead(503).end();
  runtimeServer = createServer((request, response) => handler(request, response));
  await new Promise((resolve, reject) => {runtimeServer.once('error', reject); runtimeServer.listen(0, 'localhost', resolve);});
  return {url: 'http://localhost:' + runtimeServer.address().port, setHandler: value => {handler = value;}};
}
async function saveReport() {
  report.finishedAt = new Date().toISOString();
  await json('verification.json', report);
  const lines = ['# Aceptación de práctica — punto 8', '', `Estado: **${report.status}**. Modo: ${report.mode}.`, '',
    `Fuente: \`${source.sha256}\`. Inicio: ${startedAt}.`, '',
    'Los tiempos son un proxy de laboratorio DOM + siguiente rAF. No son INP de campo. La carga fría y la ejecución se registran por separado.', '',
    '## Comprobaciones', '', ...Object.entries(report.checks).map(([name, value]) => `- ${name}: ${value.status} (${value.log ?? 'verification.json'}).`), '',
    '## Rendimiento', '', '| Tamaño | Perfil | Acción | Muestras | p95 ms | Límite ms | Estado |', '| --- | --- | --- | ---: | ---: | ---: | --- |'];
  for (const m of report.performance?.metrics ?? []) lines.push(`| ${m.project} | ${m.profileId} | ${m.action} | ${m.count} | ${m.p95?.toFixed(2) ?? '—'} | ${m.budgetMs} | ${m.status} |`);
  lines.push('', 'Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).', '',
    'La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.', '',
    '## Criterios', '', '| ID | Criterio | Evidencia ejecutada |', '| --- | --- | --- |');
  for (const c of report.acceptance?.criteria ?? []) lines.push(`| ${c.id} | ${c.title} | ${c.status}; ${c.nativeEvidence.length} casos de código y ${c.uiEvidence.length} UI. |`);
  lines.push('', 'Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.', '',
    '## Revisión y límites', '', 'Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.', '',
    ...report.limitations.map(value => '- ' + value));
  if (report.failure) lines.push('', `Fallo en ${report.failure.stage}:`, '', '```text', report.failure.message, '```');
  await writeFile(path.join(output, 'README.md'), lines.join('\n') + '\n');
}
try {
  await mkdir(lock); ownsLock = true;
  report.tooling = await toolingHashes(); report.snapshots = await snapshotHashes();
  if (!report.snapshots.length) throw new Error('Faltan las referencias visuales revisadas');
  const pinned = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'));
  for (const name of ['@playwright/test', '@docusaurus/core', 'react', 'typescript', '@codemirror/view', '@sqlite.org/sqlite-wasm', 'pyodide']) report.packages[name] = pinned.packages['node_modules/' + name]?.version;
  if (!codeOnly) {
    console.log('Comprobando Chromium…');
    let browser;
    try {browser = await chromium.launch(); report.browser = {name: 'Chromium', version: browser.version()};}
    catch (error) {throw new Error(error.message.includes("Executable doesn't exist") ? 'Falta Chromium. Ejecuta npx playwright install chromium y vuelve a ejecutar npm run verify:practice.' : error.message);}
    finally {await browser?.close();}
  }
  const testFiles = (await filesUnder('tests')).filter(file => /\.test\.(?:ts|mjs)$/.test(file));
  const nativeFile = path.join(output, 'native-cases.ndjson');
  await run('01-código', process.execPath, ['--experimental-strip-types', '--test', '--test-reporter=./scripts/lib/practice-test-reporter.mjs', '--test-reporter-destination=' + nativeFile, ...testFiles]);
  report.nativeCases = (await readFile(nativeFile, 'utf8')).trim().split('\n').filter(Boolean).map(line => JSON.parse(line))
    .map(item => ({...item, file: path.relative(root, item.file).split(path.sep).join('/')}));
  if (!report.nativeCases.length || report.nativeCases.some(c => c.status !== 'passed' || c.skipped)) throw new Error('Casos de código fallidos, omitidos o ausentes');
  await run('02-tipos-app', process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit']);
  await run('03-tipos-pruebas', process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.tests.json']);
  temporary = await mkdtemp(path.join(tmpdir(), 'alldoc-practice-acceptance-'));
  const site = path.join(temporary, 'site'), runtimeDirectory = path.join(temporary, 'runtime');
  let appOrigin = 'http://127.0.0.1:4173', runtimeOrigin = 'http://localhost:4174', runtime;
  if (!codeOnly) {app = await serveBuild(site); runtime = await runtimeHost(); appOrigin = app.url; runtimeOrigin = runtime.url;}
  await run('04-build', process.execPath, ['node_modules/@docusaurus/core/bin/docusaurus.mjs', 'build', '--out-dir', site],
    {PRACTICE_ORIGIN: runtimeOrigin, DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-practice-verification'});
  console.log('05-runtime e inventario'); stage = '05-runtime';
  const manifest = await buildRuntime({appOrigin, runtimeOrigin, outDir: runtimeDirectory});
  runtime?.setHandler(createRuntimeHandler({directory: runtimeDirectory, manifest}));
  await json('runtime-manifest.json', manifest);
  const bundle = await inventoryBuild(site); await json('bundle.json', bundle);
  report.bundle = assessPracticeBundle(JSON.parse(await readFile(path.join(root, reference, 'bundle.json'), 'utf8')), bundle);
  await json('bundle-comparison.json', report.bundle);
  report.published = await auditPublishedBuild(site);
  if (report.published.status !== 'passed' || report.bundle.status !== 'complete') throw new Error('Build publicado o presupuesto inicial no aprobado; consultar bundle-comparison.json y verification.json');
  report.checks['05-runtime'] = {status: 'passed'};
  if (!codeOnly) {
    if (!uiOnly) {
    stage = '06-mediciones'; const measurements = {schemaVersion: 1, metric: 'DOM + siguiente rAF', profiles: []};
    try {
      for (const name of ['laptop', 'celular']) {
        const project = config.projects.find(item => item.name === name);
        for (const profile of practiceProfiles) {
          console.log('06-mediciones: ' + name + ' / ' + profile.label + ' (30 por acción)');
          measurements.profiles.push(await measurePracticeProfile(chromium, project, profile, appOrigin, output));
          await json('measurements.json', measurements);
        }
        const python = measurements.profiles.find(p => p.project === name && p.profileId === 'python-pandas');
        for (const profile of measurements.profiles.filter(p => p.project === name)) profile.actions.context = python.contextMeasurements[profile.profileId];
      }
    } catch (error) {if (error.profileResult) measurements.profiles.push(error.profileResult); throw error;}
    finally {await json('measurements.json', measurements); report.performance = assessPracticeMetrics(measurements);}
    const problems = [...report.performance.reasons,
      ...report.performance.metrics.filter(metric => metric.status === 'exceeded').map(metric => `${metric.project}/${metric.profileId}/${metric.action}: p95 ${metric.p95.toFixed(2)} ms > ${metric.budgetMs} ms`),
      ...measurements.profiles.flatMap(p => p.traces.filter(t => t.status !== 'complete').map(t => `${p.project}/${p.profileId}: traza ${t.status}`))];
    if (report.performance.status !== 'complete' || problems.length) throw new Error(problems.join('; ') || 'Mediciones incompletas; consultar measurements.json y verification.json');
    report.checks['06-mediciones'] = {status: 'passed'};
    console.log('07-otros navegadores disponibles'); stage = '07-otros-navegadores'; report.otherBrowsers = [];
    for (const [name, type] of [['Firefox', firefox], ['WebKit', webkit]]) {
      const smoke = await crossBrowserSmoke(type, name, appOrigin, output); report.otherBrowsers.push(smoke);
      if (smoke.status === 'not-installed') report.limitations.push(name + ': ejecutable no instalado; casos SQL/pandas no ejecutados.');
      else if (smoke.status !== 'passed') throw new Error(name + ': ' + smoke.reason);
    }
    } else report.limitations.push('Modo UI: no mide rendimiento ni repite otros navegadores. Se necesita evidencia compatible separada para cerrar la aceptación global.');
    if (!measureOnly) {
      const uiFile = path.join(output, 'ui-results.json');
      await run('08-UI-sin-actualizar-referencias', process.execPath, ['node_modules/@playwright/test/cli.js', 'test', '--reporter=dot,json'],
        {PLAYWRIGHT_BASE_URL: appOrigin, PLAYWRIGHT_JSON_OUTPUT_NAME: uiFile});
      const ui = JSON.parse(await readFile(uiFile, 'utf8')); report.uiCases = practiceUICases(ui); report.uiStats = ui.stats;
      if (ui.errors?.length || ui.stats?.unexpected || ui.stats?.flaky || !report.uiCases.length || report.uiCases.some(c => c.status === 'failed')) throw new Error('La regresión UI no se aprobó de forma estricta');
    }
  } else report.limitations.push('Modo código: no se abrieron puertos ni navegadores. No acredita tiempos, interacción o capturas.');
  stage = 'invariantes';
  report.stable = source.sha256 === (await sourceFingerprint(root)).sha256 && JSON.stringify(report.tooling) === JSON.stringify(await toolingHashes())
    && JSON.stringify(report.snapshots) === JSON.stringify(await snapshotHashes());
  if (!report.stable) throw new Error('La fuente, herramienta o referencias cambiaron durante la validación; repetir con archivos estables');
  report.acceptance = assessPracticeAcceptance({nativeCases: report.nativeCases, uiCases: report.uiCases ?? [], checks: {
    types: true, build: report.published.status === 'passed', bundle: report.bundle.status === 'complete', performance: report.performance?.status === 'complete',
    stable: report.stable, strictUI: Boolean(report.uiStats?.expected && !report.uiStats?.unexpected && !report.uiStats?.flaky),
  }});
  if (!codeOnly && !measureOnly && !uiOnly && report.acceptance.status !== 'complete') throw new Error('Faltan criterios de aceptación; consultar la matriz en verification.json');
  report.status = codeOnly ? 'code-only-complete' : measureOnly ? 'measurement-complete' : uiOnly ? 'ui-only-complete' : 'ready-for-review';
} catch (error) {
  report.failure = {stage, message: error instanceof Error ? error.message : String(error)};
  process.exitCode = 1;
} finally {
  activeChild?.kill('SIGTERM');
  await app?.close();
  if (runtimeServer?.listening) await new Promise(resolve => {runtimeServer.close(resolve); runtimeServer.closeAllConnections();});
  if (temporary) await rm(temporary, {recursive: true, force: true});
  if (ownsLock) await rm(lock, {recursive: true, force: true});
  await saveReport();
  console.log('Resultado: ' + report.status); console.log('Informe: ' + relativeOutput + '/README.md');
  if (report.failure) console.error(report.failure.stage + ': ' + report.failure.message.replace(/\u001b\[[0-9;]*m/g, '').split('\n')[0].slice(0, 300));
}
