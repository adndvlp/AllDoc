import {spawn, execFileSync} from 'node:child_process';
import {mkdir, mkdtemp, readFile, writeFile, rm} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir, cpus, platform, release, arch} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {firefox, webkit} from '@playwright/test';
import config from '../playwright.cross-browser.config.ts';
import {parseBrowserRunArgs, assessBrowserRun, effectiveBrowserProjects, beforeBrowserWork} from './lib/browser-run.ts';
import {assessVisualRun, checkVisualManifest, checkVisualStates, makeVisualManifest, referenceRoot} from './lib/browser-visual.ts';
import {preflightBrowsers} from './lib/browser-foundation.ts';
import {sourceFingerprint, filesUnder, sha256, serveBuild, inventoryBuild} from './lib/baseline.ts';
import {auditPublishedBuild} from './lib/final-verification.ts';
import {buildRuntime} from './build-practice-runtime.mjs';
import {createRuntimeHandler} from './lib/runtime-http.mjs';
import {runBrowserCommand} from './lib/browser-command.mjs';
import {requireBrowserSpace} from './lib/browser-storage.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = ['node_modules/@playwright/test/cli.js', 'test', '--config=playwright.cross-browser.config.ts'];
let options;
try {options = parseBrowserRunArgs(process.argv.slice(2));}
catch (error) {console.error(error.message); process.exitCode = 1;}
if (options) {
  if (options.visual) {process.env.BROWSER_VISUAL_MODE = '1'; cli.push('visual.spec.ts');}
  if (options.desktop || options.smoke) cli.push('practice-desktop.spec.ts');
  const filters = options.projects.map(name => '--project=' + name);
  const grep = options.smoke ? (options.grep ? '(?=.*@smoke)(?=.*(?:' + options.grep + '))' : '@smoke') : options.grep;
  if (grep) filters.push('--grep=' + grep);
  // Incluso una referencia ausente debe fallar durante la comparación.
  if (options.visual) filters.push('--update-snapshots=' + (options.updateSnapshots ? 'all' : 'none'));
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
  const report = {schemaVersion: 1, point: options.visual ? 4 : 3, status: 'partial', startedAt, source, options,
    scope: options.visual ? 'Referencias visuales por proyecto Firefox/WebKit. La generación requiere revisión; no acredita la aceptación global.' : options.desktop ? 'Comprobación histórica de práctica de escritorio.' : 'Matriz funcional Firefox/WebKit. Las referencias visuales y aceptación consolidada corresponden a los puntos 4 y 5.',
    projects: effectiveBrowserProjects(options.projects, config.use, config.use.baseURL),
    environment: {node: process.version, platform: platform(), release: release(), arch: arch(), cpu: cpus()[0]?.model},
    packages: {}, tooling: [], snapshots: [], checks: {}, failure: null};
  try {report.commitBase = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();} catch {report.commitBase = null;}
  for (const name of ['@playwright/test', '@codemirror/view', '@sqlite.org/sqlite-wasm', 'pyodide']) report.packages[name] = JSON.parse(await readFile(path.join(root, 'node_modules', name, 'package.json'), 'utf8')).version;
  report.browserRevisions = JSON.parse(await readFile(path.join(root, 'node_modules/playwright-core/browsers.json'), 'utf8'));
  const toolingFiles = [...await filesUnder('scripts'), ...await filesUnder('tests/cross-browser'), 'playwright.cross-browser.config.ts', 'tsconfig.tests.json'].filter(file => !file.endsWith('.DS_Store') && !file.startsWith(referenceRoot + '/'));
  const hashFiles = async names => Promise.all(names.sort().map(async filename => ({path: filename, sha256: sha256(await readFile(path.join(root, filename)))})));
  const hashes = async () => ({tooling: await hashFiles(toolingFiles), snapshots: await hashFiles((await filesUnder('tests/ui/__screenshots__')).filter(file => file.endsWith('.png'))),
    visualReferences: await hashFiles((await filesUnder(referenceRoot)).filter(file => /\.(png|json)$/.test(file)))});
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
    return runBrowserCommand({args: arguments_, cwd: root, env, logPath: path.join(output, name + '.log'), visible, onChild: value => {child = value;}});
  }
  async function buildAndTest() {
    report.buildSpace = await requireBrowserSpace([root, tmpdir()]);
    const visualContext = project => ({project: report.projects.find(p => p.name === project), environment: report.environment, packages: report.packages,
      browser: {engine: project.split('-')[0], version: report.preflight.engines.find(e => e.engine === project.split('-')[0]).version}});
    const projectReferences = async project => hashFiles((await filesUnder(path.join(referenceRoot, project))).filter(file => file.endsWith('.png')));
    if (options.visual && !options.updateSnapshots) await phase('referencias-y-entorno', async () => {
      for (const project of options.projects) {
        let manifest, references;
        try {manifest = JSON.parse(await readFile(path.join(root, referenceRoot, project, 'manifest.json'), 'utf8')); references = await projectReferences(project);}
        catch {throw new Error('Faltan referencias o manifiesto de ' + project + '. Generar explícitamente con npm run test:browser:update y revisar.');}
        const check = checkVisualManifest(manifest, visualContext(project), references);
        if (check.status !== 'compatible') throw new Error(project + ': ' + check.reasons.join('; '));
      }
    });
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
    report.projects = effectiveBrowserProjects(options.projects, config.use, appOrigin);
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
      report.assessment = options.visual ? assessVisualRun(raw, options) : assessBrowserRun(raw, options);
      if (report.exitCode || report.assessment.status === 'incomplete') throw new Error(report.assessment.reasons[0] ?? 'Playwright terminó con código ' + report.exitCode);
      report.checks[stage] = {status: 'passed'};
      if (options.visual) {
        report.referenceMode = options.updateSnapshots ? 'generate-awaiting-review' : 'compare';
        report.referenceManifests = [];
        const attachments = [];
        const visit = suite => {
          for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) for (const result of test.results ?? []) {
            for (const attachment of result.attachments ?? []) if (attachment.name.startsWith('visual-state-')) attachments.push(attachment.path);
          }
          for (const child of suite.suites ?? []) visit(child);
        };
        for (const suite of raw.suites ?? []) visit(suite);
        const states = await Promise.all(attachments.map(async filename => {
          if (!filename || !path.resolve(filename).startsWith(output + path.sep)) throw new Error('Estado visual fuera del informe');
          return JSON.parse(await readFile(filename, 'utf8'));
        }));
        await json('visual-states.json', states);
        for (const project of options.projects) {
          checkVisualStates(project, states.filter(s => s.project === project), report.assessment.cases.filter(c => c.project === project).map(c => c.id));
          const filename = path.join(referenceRoot, project, 'manifest.json');
          if (options.updateSnapshots) {
            const manifest = makeVisualManifest(visualContext(project), await projectReferences(project), states.filter(s => s.project === project), {source: source.sha256, tooling: report.tooling});
            await writeFile(path.join(root, filename), JSON.stringify(manifest, null, 2) + '\n');
          }
          report.referenceManifests.push({path: filename, sha256: sha256(await readFile(path.join(root, filename)))});
        }
      }
    }
    stage = 'invariantes'; const after = await hashes();
    report.stable = source.sha256 === (await sourceFingerprint(root)).sha256 && JSON.stringify(after.tooling) === JSON.stringify(report.tooling) && JSON.stringify(after.snapshots) === JSON.stringify(report.snapshots)
      && (!options.visual || options.updateSnapshots || JSON.stringify(after.visualReferences) === JSON.stringify(report.visualReferences));
    if (!report.stable) throw new Error('La fuente, herramientas o referencias cambiaron durante la ejecución');
    if (options.visual) report.visualReferencesAfter = after.visualReferences;
    report.status = options.visual ? (options.updateSnapshots ? 'visual-generated-awaiting-review' : options.grep ? 'visual-subset-compared' : 'visual-compared') : options.buildOnly ? 'build-only-complete' : options.grep ? 'subset-ready-for-review' : options.smoke ? 'smoke-ready-for-review' : options.desktop ? 'desktop-ready-for-review' : 'matrix-ready-for-review';
  }
  try {
    await phase('00-espacio-disponible', async () => {report.storage = await requireBrowserSpace([root, tmpdir()]);});
    if (options.buildOnly) await buildAndTest();
    else {
      stage = 'preflight';
      await beforeBrowserWork(async () => {
      report.preflight = await preflightBrowsers(options.projects, {firefox, webkit}, {onProgress: event => console.log(event.engine + ': ' + event.status)});
      await json('preflight.json', report.preflight);
      if (report.preflight.status !== 'ready') console.error(report.preflight.diagnostic?.slice(0, 500));
      return report.preflight;
      }, buildAndTest);
    }
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
    const lines = ['# Firefox/WebKit — ' + (options.visual ? 'referencias visuales' : 'matriz funcional'), '', `Estado: **${report.status}**.`, '', report.scope, '',
      `Fuente: \`${source.sha256}\`. Playwright: ${report.packages['@playwright/test']}.`, '',
      '| Proyecto | Caso | Estado | Duración ms |', '| --- | --- | --- | ---: |',
      ...cases.map(c => `| ${c.project} | ${c.id} | ${c.status} | ${c.durationMs} |`), '',
      'Casos originales: results.json. Configuración, invariantes y versiones: [verification.json](verification.json).', '',
      options.visual ? 'Referencias y manifiestos: tests/cross-browser/__screenshots__/{projectName}/. Estados reales: visual-states.json. Generar no equivale a aprobar; falta inspeccionar y registrar la revisión.' : 'Las capturas adjuntas son diagnóstico, sin crear ni actualizar referencias. La revisión del punto 3 se registra aparte.'];
    if (report.assessment && !options.visual) lines.push('', '## Evidencia por requisito', '',
      'Se contrasta con el catálogo completo. Los casos no seleccionados permanecen incompletos; un filtro no acredita la matriz.', '',
      '| Proyecto | Requisito | Estado | Casos aprobados / requeridos |', '| --- | --- | --- | --- |',
      ...report.assessment.coverage.map(c => `| ${c.project} | ${c.requirement} | ${c.status} | ${c.passedCases.length} / ${c.requiredCases.length} |`));
    if (options.buildOnly) lines.push('', 'Solo build: no abrió navegadores ni servidores; no acredita compatibilidad funcional.');
    if (report.failure) lines.push('', 'Fallo en ' + report.failure.stage + ': ' + report.failure.message.split('\n')[0]);
    await writeFile(path.join(output, 'README.md'), lines.join('\n') + '\n');
    console.log('Resultado: ' + report.status); console.log('Informe: ' + path.relative(root, output) + '/README.md');
    if (report.failure) console.error(report.failure.stage + ': ' + report.failure.message.split('\n')[0].slice(0, 300));
  }
}
