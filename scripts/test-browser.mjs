import {spawn, execFileSync} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {mkdir, mkdtemp, readFile, writeFile, rm} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir, cpus, platform, release, arch} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {firefox, webkit} from '@playwright/test';
import config from '../playwright.cross-browser.config.ts';
import {parseDesktopRunArgs, assessDesktopRun, beforeBrowserWork} from './lib/browser-run.ts';
import {preflightBrowsers, selectBrowserProjects} from './lib/browser-foundation.ts';
import {sourceFingerprint, filesUnder, sha256, serveBuild, inventoryBuild} from './lib/baseline.ts';
import {auditPublishedBuild} from './lib/final-verification.ts';
import {buildRuntime} from './build-practice-runtime.mjs';
import {createRuntimeHandler} from './lib/runtime-http.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = ['node_modules/@playwright/test/cli.js', 'test', '--config=playwright.cross-browser.config.ts', 'practice-desktop.spec.ts'];
let options;
try {options = parseDesktopRunArgs(process.argv.slice(2));}
catch (error) {console.error(error.message); process.exitCode = 1;}
if (options) {
  const filters = options.projects.map(name => '--project=' + name);
  const grep = options.smoke ? (options.grep ? '(?=.*@smoke)(?=.*(?:' + options.grep + '))' : '@smoke') : options.grep;
  if (grep) filters.push('--grep=' + grep);
  if (options.list) {
    const child = spawn(process.execPath, [...cli, ...filters, '--list', '--reporter=list'], {cwd: root, stdio: 'inherit'});
    process.exitCode = await new Promise(resolve => {child.once('error', () => resolve(1)); child.once('close', code => resolve(code ?? 1));});
    console.log('Solo descubrimiento: no se iniciaron motores, build ni servidores; ningún caso ejecutado.');
  } else try {await verify(options, filters);}
  catch (error) {console.error('Preparación: ' + error.message.split('\n')[0]); process.exitCode = 1;}
}

async function verify(options, filters) {
  const startedAt = new Date().toISOString(), source = await sourceFingerprint(root);
  const output = path.join(root, 'benchmarks/browser-verifications', startedAt.replace(/[:.]/g, '-') + '-' + source.sha256.slice(0, 10));
  await mkdir(output, {recursive: true});
  const report = {schemaVersion: 1, point: 2, status: 'partial', startedAt, source, options,
    scope: 'Escritorio: editor, sugerencias y ejecución real SQL/pandas. La matriz restante y las referencias visuales son puntos posteriores.',
    projects: selectBrowserProjects(options.projects).map(p => ({...p, use: {...config.use, ...p.use}})),
    environment: {node: process.version, platform: platform(), release: release(), arch: arch(), cpu: cpus()[0]?.model},
    packages: {}, tooling: [], snapshots: [], checks: {}, failure: null};
  try {report.commitBase = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();} catch {report.commitBase = null;}
  for (const name of ['@playwright/test', '@codemirror/view', '@sqlite.org/sqlite-wasm', 'pyodide']) report.packages[name] = JSON.parse(await readFile(path.join(root, 'node_modules', name, 'package.json'), 'utf8')).version;
  report.browserRevisions = JSON.parse(await readFile(path.join(root, 'node_modules/playwright-core/browsers.json'), 'utf8'));
  const toolingFiles = [...await filesUnder('scripts'), ...await filesUnder('tests/cross-browser'), 'playwright.cross-browser.config.ts', 'tsconfig.tests.json'].filter(file => !file.endsWith('.DS_Store'));
  const hashFiles = async names => Promise.all(names.sort().map(async filename => ({path: filename, sha256: sha256(await readFile(path.join(root, filename)))})));
  const hashes = async () => ({tooling: await hashFiles(toolingFiles), snapshots: await hashFiles((await filesUnder('tests/ui/__screenshots__')).filter(file => file.endsWith('.png')))});
  Object.assign(report, await hashes());
  let temporary, app, runtimeServer, child, interrupted = false, stage = 'preflight';
  const lock = path.join(root, '.docusaurus-browser-verification-lock'); let ownsLock = false;
  const json = (name, value) => writeFile(path.join(output, name), JSON.stringify(value, null, 2) + '\n');
  const signal = () => {interrupted = true; child?.kill('SIGINT');};
  process.on('SIGINT', signal); process.on('SIGTERM', signal);
  async function phase(name, action) {
    if (interrupted) throw new Error('Ejecución interrumpida');
    stage = name; console.log(name); const start = Date.now();
    const heartbeat = setInterval(() => console.log(name + ': en curso, ' + Math.round((Date.now() - start) / 1000) + ' s'), 15_000);
    try {const value = await action(); if (interrupted) throw new Error('Ejecución interrumpida'); report.checks[name] = {status: 'passed', durationMs: Date.now() - start}; return value;}
    finally {clearInterval(heartbeat);}
  }
  async function command(name, arguments_, env = {}, visible = false) {
    const log = createWriteStream(path.join(output, name + '.log'));
    try {
      return await new Promise((resolve, reject) => {
        child = spawn(process.execPath, arguments_, {cwd: root, env: {...process.env, DOCUSAURUS_NO_PERSISTENT_CACHE: '1', ...env}, stdio: ['ignore', 'pipe', 'pipe']});
        child.stdout.on('data', bytes => {log.write(bytes); if (visible) process.stdout.write(bytes);});
        child.stderr.on('data', bytes => log.write(bytes));
        child.once('error', reject); child.once('close', code => {child = undefined; resolve(code ?? 1);});
      });
    } finally {await new Promise(resolve => log.end(resolve));}
  }
  async function buildAndTest() {
    await mkdir(lock); ownsLock = true;
    temporary = await mkdtemp(path.join(tmpdir(), 'alldoc-browser-'));
    const site = path.join(temporary, 'site'), runtimeDirectory = path.join(temporary, 'runtime');
    let appOrigin = 'http://127.0.0.1:4173', runtimeOrigin = 'http://localhost:4174', setHandler;
    if (!options.buildOnly) {
      stage = 'servidores'; app = await serveBuild(site); appOrigin = app.url;
      let handler = (_request, response) => response.writeHead(503).end();
      runtimeServer = createServer((request, response) => handler(request, response));
      await new Promise((resolve, reject) => {runtimeServer.once('error', reject); runtimeServer.listen(0, 'localhost', resolve);});
      runtimeOrigin = 'http://localhost:' + runtimeServer.address().port;
      setHandler = value => {handler = value;};
    }
    report.origins = {appOrigin, runtimeOrigin};
    await phase('01-build-app', async () => {
      const code = await command('01-build-app', ['node_modules/@docusaurus/core/bin/docusaurus.mjs', 'build', '--out-dir', site],
        {PRACTICE_ORIGIN: runtimeOrigin, DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-browser-verification'});
      if (code) throw new Error('Build fallido; consultar 01-build-app.log');
    });
    await phase('02-runtime-e-inventario', async () => {
      const manifest = await buildRuntime({appOrigin, runtimeOrigin, outDir: runtimeDirectory});
      setHandler?.(createRuntimeHandler({directory: runtimeDirectory, manifest}));
      await json('runtime-manifest.json', manifest); await json('bundle.json', await inventoryBuild(site));
      report.published = await auditPublishedBuild(site);
      if (report.published.status !== 'passed') throw new Error('Auditoría de las rutas publicadas fallida');
    });
    if (!options.buildOnly) {
      // Reporter propio identifica caso y fase cada 15 s; sus artefactos quedan
      // directamente en este informe y no dependen del siguiente test-results/.
      stage = '03-casos'; console.log(stage);
      report.exitCode = await command(stage, [...cli, ...filters], {PLAYWRIGHT_BASE_URL: appOrigin, BROWSER_REPORT_DIR: output}, true);
      const raw = JSON.parse(await readFile(path.join(output, 'results.json'), 'utf8'));
      report.assessment = assessDesktopRun(raw, options);
      if (report.exitCode || report.assessment.status === 'incomplete') throw new Error(report.assessment.reasons[0] ?? 'Playwright terminó con código ' + report.exitCode);
      report.checks[stage] = {status: 'passed'};
    }
    stage = 'invariantes'; const after = await hashes();
    report.stable = source.sha256 === (await sourceFingerprint(root)).sha256 && JSON.stringify(after.tooling) === JSON.stringify(report.tooling) && JSON.stringify(after.snapshots) === JSON.stringify(report.snapshots);
    if (!report.stable) throw new Error('La fuente, herramientas o referencias cambiaron durante la ejecución');
    report.status = options.buildOnly ? 'build-only-complete' : options.grep ? 'subset-ready-for-review' : options.smoke ? 'smoke-ready-for-review' : 'desktop-ready-for-review';
  }
  try {
    if (options.buildOnly) await buildAndTest();
    else await beforeBrowserWork(async () => {
      report.preflight = await preflightBrowsers(options.projects, {firefox, webkit}, {onProgress: event => console.log(event.engine + ': ' + event.status)});
      await json('preflight.json', report.preflight);
      if (report.preflight.status !== 'ready') console.error(report.preflight.diagnostic?.slice(0, 500));
      return report.preflight;
    }, buildAndTest);
  } catch (error) {report.failure = {stage, message: error.message}; process.exitCode = 1;}
  finally {
    child?.kill('SIGTERM');
    await app?.close();
    if (runtimeServer?.listening) await new Promise(resolve => {runtimeServer.close(resolve); runtimeServer.closeAllConnections();});
    if (temporary) await rm(temporary, {recursive: true, force: true});
    if (ownsLock) await rm(lock, {recursive: true, force: true});
    process.off('SIGINT', signal); process.off('SIGTERM', signal);
    report.finishedAt = new Date().toISOString(); await json('verification.json', report);
    const cases = report.assessment?.cases ?? [];
    const lines = ['# Firefox/WebKit — práctica en escritorio', '', `Estado: **${report.status}**.`, '', report.scope, '',
      `Fuente: \`${source.sha256}\`. Playwright: ${report.packages['@playwright/test']}.`, '',
      '| Proyecto | Caso | Estado | Duración ms |', '| --- | --- | --- | ---: |',
      ...cases.map(c => `| ${c.project} | ${c.id} | ${c.status} | ${c.durationMs} |`), '',
      'Casos originales: results.json. Configuración, invariantes y versiones: [verification.json](verification.json).', '',
      'Las capturas adjuntas son diagnóstico, sin crear ni actualizar referencias. La revisión y aceptación del punto 2 se registran aparte.'];
    if (options.buildOnly) lines.push('', 'Solo build: no abrió navegadores ni servidores; no acredita compatibilidad funcional.');
    if (report.failure) lines.push('', 'Fallo en ' + report.failure.stage + ': ' + report.failure.message.split('\n')[0]);
    await writeFile(path.join(output, 'README.md'), lines.join('\n') + '\n');
    console.log('Resultado: ' + report.status); console.log('Informe: ' + path.relative(root, output) + '/README.md');
    if (report.failure) console.error(report.failure.stage + ': ' + report.failure.message.split('\n')[0].slice(0, 300));
  }
}
