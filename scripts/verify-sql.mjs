import {execFileSync, spawnSync} from 'node:child_process';
import {cp, mkdir, mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {arch, cpus, platform, release, tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium, firefox, webkit} from '@playwright/test';
import {assessChromiumRegression, browserReportCases, parseBrowserAcceptanceArgs, projectsForSuite, sameFiles, strictReportReasons} from './lib/browser-acceptance.ts';
import {preflightAcceptance} from './lib/browser-acceptance-preflight.ts';
import {runBrowserCommand} from './lib/browser-command.mjs';
import {requireBrowserSpace} from './lib/browser-storage.mjs';
import {assessBrowserRun} from './lib/browser-run.ts';
import {assessVisualRun} from './lib/browser-visual.ts';
import {filesUnder, inventoryBuild, serveBuild, sha256, sourceFingerprint} from './lib/baseline.ts';
import {auditPublishedBuild} from './lib/final-verification.ts';
import {measureSqlProfile} from './lib/practice-browser.mjs';
import {sqlReferenceDirectories} from './lib/sql-closure.ts';
import {createRuntimeHandler} from './lib/runtime-http.mjs';
import {buildRuntime} from './build-practice-runtime.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const suites = ['chromium', 'functional', 'visual', 'sql'];
const cli = ['node_modules/@playwright/test/cli.js', 'test', '--config=playwright.sql-verification.config.ts'];
const refDir = suite => path.resolve(root, sqlReferenceDirectories[suite]);
const readJson = async file => JSON.parse(await readFile(file, 'utf8'));
const saveJson = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n');
const discovery = (suite, filters) => {
  const result = spawnSync(process.execPath, [...cli, '--list', '--reporter=json', ...filters], {
    cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
    env: {...process.env, SQL_VERIFICATION_SUITE: suite, PLAYWRIGHT_JSON_OUTPUT_FILE: '', PLAYWRIGHT_JSON_OUTPUT_NAME: ''},
  });
  if (result.status !== 0) throw new Error(result.error?.message ?? (result.stderr.trim() || result.stdout.trim() || 'Descubrimiento fallido'));
  const raw = JSON.parse(result.stdout);
  if (!browserReportCases(raw).length) throw new Error('El filtro no seleccionó casos');
  return raw;
};

function argumentsForRun(argv) {
  const capture = argv.includes('--capture'), measure = argv.includes('--measure');
  const isSql = argv.includes('--suite=sql') || argv.some((arg, i) => arg === '--suite' && argv[i + 1] === 'sql');
  const args = argv.filter(arg => !['--capture', '--measure'].includes(arg)).map((arg, index, all) =>
    arg === '--suite=sql' ? '--suite=functional' : arg === 'sql' && all[index - 1] === '--suite' ? 'functional' : arg);
  const options = parseBrowserAcceptanceArgs(args);
  if (isSql) options.suite = 'sql';
  if (measure && (options.suite || options.mode === 'code-only' || options.list || capture)) throw new Error('--measure se ejecuta por separado');
  if (capture && (!options.suite || options.suite === 'functional' || options.list)) throw new Error('--capture requiere --suite=chromium, visual o sql');
  return {...options, measure, capture};
}

async function fingerprint() {
  const tooling = [
    ...await filesUnder(path.join(root, 'scripts')),
    ...(await filesUnder(path.join(root, 'tests'))).filter(file => /\.(?:ts|mjs|css|html)$/.test(file)),
    ...['playwright.config.ts', 'playwright.cross-browser.config.ts', 'playwright.browser-verification.config.ts',
      'playwright.sql-verification.config.ts', 'tsconfig.tests.json'].map(file => path.join(root, file)),
  ];
  const files = await Promise.all(tooling.sort().map(async file => [path.relative(root, file), sha256(await readFile(file))]));
  return {source: (await sourceFingerprint(root)).sha256, tooling: sha256(JSON.stringify(files))};
}

async function images(directory) {
  return Promise.all((await filesUnder(directory)).filter(file => file.endsWith('.png')).map(async file =>
    ({path: path.relative(directory, file), sha256: sha256(await readFile(file))})));
}

function assessSuite(suite, raw, discovered, projects, grep) {
  const actual = browserReportCases(raw), expected = browserReportCases(discovered);
  const keys = actual.map(test => test.key).sort(), expectedKeys = expected.map(test => test.key).sort();
  if (new Set(keys).size !== keys.length || JSON.stringify(keys) !== JSON.stringify(expectedKeys)) throw new Error('Los casos ejecutados difieren del descubrimiento');
  const reasons = strictReportReasons(raw, suite);
  let result;
  if (suite === 'chromium') result = assessChromiumRegression(raw, discovered, projects);
  else if (suite === 'functional') result = assessBrowserRun(raw, {projects, smoke: false, list: false, buildOnly: false, grep});
  else if (suite === 'visual') result = assessVisualRun(raw, {projects, grep});
  else {
    const failed = actual.find(({test}) => test.expectedStatus !== 'passed' || test.status !== 'expected'
      || test.results?.length !== 1 || test.results[0].status !== 'passed' || test.results[0].retry !== 0 || test.results[0].errors?.length);
    result = {status: failed ? 'incomplete' : 'passed', reasons: failed ? [failed.project + ' / ' + failed.title] : []};
    if (raw.stats.expected !== actual.length || raw.stats.skipped !== 0) reasons.push('No se aprobaron todos los casos SQL seleccionados');
  }
  if (raw.errors?.length || raw.stats.unexpected || raw.stats.flaky) reasons.push('El informe registra fallos o errores globales');
  if (reasons.length || result.reasons.length) throw new Error([...reasons, ...result.reasons][0]);
  return {status: 'passed', cases: actual.length, passed: raw.stats.expected, skipped: raw.stats.skipped};
}

async function verify(options, selected, filters) {
  const before = await fingerprint();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const output = path.resolve(root, 'benchmarks/sql-verifications', stamp + '-' + before.source.slice(0, 10));
  await mkdir(output, {recursive: true});
  const report = {point: 9, status: 'partial', options, ...before, checks: {}, suites: {},
    commit: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim(),
    environment: {node: process.version, platform: platform(), arch: arch(), release: release(), cpu: cpus()[0]?.model},
    playwright: (await readJson(path.join(root, 'node_modules/@playwright/test/package.json'))).version};
  let temporary, app, runtimeServer, activeChild, ownsLock = false, interrupted = false, phase = 'preparación';
  const lock = path.join(root, '.docusaurus-browser-verification-lock');
  const stop = () => {interrupted = true; activeChild?.kill('SIGINT');};
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  const run = (name, args, env = {}, visible = false) => runBrowserCommand({
    args, cwd: root, env, visible, logPath: path.join(output, name + '.log'), onChild: child => {activeChild = child;},
  });
  const step = async (name, action) => {
    if (interrupted) throw new Error('Ejecución interrumpida');
    phase = name;
    console.log(name);
    const start = Date.now();
    const value = await action();
    if (interrupted) throw new Error('Ejecución interrumpida');
    report.checks[name] = {status: 'passed', durationMs: Date.now() - start};
    return value;
  };
  const command = async (name, args, env) => {
    if (await run(name, args, env)) throw new Error('Consulta ' + name + '.log');
  };

  try {
    await step('espacio', () => requireBrowserSpace([root, tmpdir()]));
    const engines = new Set();
    if (options.measure || selected.includes('chromium')) engines.add('chromium');
    for (const suite of selected.filter(suite => suite !== 'chromium')) {
      for (const project of projectsForSuite('functional', options.projects)) engines.add(project.use.browserName);
    }
    if (engines.size) await step('preflight', async () => {
      report.preflight = await preflightAcceptance(Array.from(engines), {chromium, firefox, webkit}, check => console.log(check.engine + ' · ' + check.status));
      if (report.preflight.status !== 'ready') throw new Error(report.preflight.diagnostic);
    });
    if (options.mode === 'code-only' || (!options.suite && !options.measure)) {
      const tests = (await filesUnder(path.join(root, 'tests'))).filter(file => /\.test\.(?:ts|mjs)$/.test(file));
      await step('código', () => command('native', ['--test', '--test-concurrency=2', ...tests]));
      await step('tipos-app', () => command('types-app', ['node_modules/typescript/bin/tsc', '--noEmit']));
      await step('tipos-pruebas', () => command('types-tests', ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.tests.json']));
      report.editorial = await step('inventario-editorial', async () => {
        const {auditSqlEditorial} = await import('./lib/sql-editorial.ts');
        const audit = await auditSqlEditorial(root);
        await saveJson(path.join(output, 'editorial.json'), audit);
        if (audit.reasons.length) throw new Error(audit.reasons[0]);
        return audit.summary;
      });
    }
    await mkdir(lock);
    ownsLock = true;
    temporary = await mkdtemp(path.join(tmpdir(), 'alldoc-sql-final-'));
    const site = path.join(temporary, 'site'), runtime = path.join(temporary, 'runtime');
    let appOrigin = 'http://127.0.0.1:4173', runtimeOrigin = 'http://localhost:4174', runtimeHandler;
    if (engines.size) await step('servidores', async () => {
      app = await serveBuild(site);
      appOrigin = app.url;
      runtimeServer = createServer((req, res) => runtimeHandler ? runtimeHandler(req, res) : res.writeHead(503).end());
      await new Promise((resolve, reject) => {
        runtimeServer.once('error', reject);
        runtimeServer.listen(0, 'localhost', resolve);
      });
      runtimeOrigin = 'http://localhost:' + runtimeServer.address().port;
    });
    await step('build', () => command('build', ['node_modules/@docusaurus/core/bin/docusaurus.mjs', 'build', '--out-dir', site],
      {PRACTICE_ORIGIN: runtimeOrigin, DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-sql-verification'}));
    await step('runtime', async () => {
      const manifest = await buildRuntime({appOrigin, runtimeOrigin, outDir: runtime});
      runtimeHandler = createRuntimeHandler({directory: runtime, manifest});
      await saveJson(path.join(output, 'runtime-manifest.json'), manifest);
    });
    const baseline = await readJson(path.join(root, 'specs/verification/sql-point-9/baseline.json'));
    await step('entrega-publicada', async () => {
      const audit = await auditPublishedBuild(site);
      await saveJson(path.join(output, 'published.json'), audit);
      if (audit.status !== 'passed') throw new Error(audit.failures[0]);
      const bundle = await inventoryBuild(site);
      await saveJson(path.join(output, 'bundle.json'), bundle);
      report.initialAssets = baseline.pages.map(previous => {
        const current = bundle.pages.find(page => page.html === previous.html);
        if (!current) throw new Error('Página de referencia ausente: ' + previous.html);
        return {html: previous.html, beforeJS: previous.js.gzipBytes, afterJS: current.js.gzipBytes,
          beforeCSS: previous.css.gzipBytes, afterCSS: current.css.gzipBytes,
          deltaJS: current.js.gzipBytes - previous.js.gzipBytes, deltaCSS: current.css.gzipBytes - previous.css.gzipBytes};
      });
    });
    for (const suite of selected) await step('suite-' + suite, async () => {
      const directory = path.join(output, suite);
      await mkdir(directory, {recursive: true});
      const discovered = discovery(suite, filters);
      await saveJson(path.join(directory, 'discovery.json'), discovered);
      const references = refDir(suite);
      const old = await images(references);
      const candidates = options.capture ? path.join(directory, 'candidates') : '';
      if (candidates) {
        await mkdir(candidates, {recursive: true});
        if (old.length) await cp(references, candidates, {recursive: true, filter: file => !file.endsWith('.json')});
      }
      const env = {SQL_VERIFICATION_SUITE: suite, SQL_VERIFICATION_REPORT_DIR: directory, SQL_VERIFICATION_CANDIDATES: candidates,
        PLAYWRIGHT_BASE_URL: appOrigin, PLAYWRIGHT_JSON_OUTPUT_FILE: path.join(directory, 'results.json')};
      const code = await run(suite, [...cli, '--update-snapshots=' + (candidates ? 'all' : 'none'), ...filters], env, true);
      const raw = await readJson(path.join(directory, 'results.json'));
      if (!sameFiles(old, await images(references))) throw new Error('Las referencias de comparación cambiaron durante la ejecución');
      if (candidates) {
        const changes = (await images(candidates)).filter(file => !old.some(previous => previous.path === file.path && previous.sha256 === file.sha256));
        await saveJson(path.join(directory, 'changed-references.json'), {destination: path.relative(root, references), images: changes});
        report.suites[suite] = {status: 'awaiting-review', images: changes.length, cases: browserReportCases(discovered).length, passed: raw.stats.expected, skipped: raw.stats.skipped};
      }
      if (code) throw new Error('Fallos en ' + suite + '/results.json');
      if (!candidates) report.suites[suite] = assessSuite(suite, raw, discovered,
        projectsForSuite(suite === 'chromium' ? 'chromium' : 'functional', options.projects).map(p => p.name), options.grep);
      await saveJson(path.join(directory, 'references.json'), old);
    });
    if (options.measure || (!options.suite && options.mode === 'full')) await step('mediciones', async () => {
      const measured = [];
      for (const project of projectsForSuite('chromium', ['celular', 'laptop'])) {
        measured.push(await measureSqlProfile(chromium, project, appOrigin, scenario => {
          if (interrupted) throw new Error('Ejecución interrumpida');
          console.log(project.name + ' · ' + scenario);
        }));
        await saveJson(path.join(output, 'measurements.json'), measured);
      }
      report.measurements = measured.map(({project, viewport, cpuRate, status, completion, failure, actionSummary = {}}) => {
        const reference = baseline.profiles.find(p => p.project === project && p.cpuRate === cpuRate
          && p.viewport.width === viewport.width && p.viewport.height === viewport.height);
        const actions = {...actionSummary, completionKeyword: completion.palabra, completionColumns: completion.calificada};
        const comparison = reference ? Object.entries(actions).flatMap(([name, current]) => {
          const before = reference.warm[name]?.p95;
          return typeof before === 'number' && typeof current?.p95 === 'number'
            ? [{name, before, after: current.p95, delta: current.p95 - before}] : [];
        }) : [];
        return {project, status, failure, comparison, p95: Object.fromEntries(
          Object.entries(completion).map(([name, scenario]) => [name, scenario.p95]))};
      });
      if (measured.some(p => p.status !== 'passed')) throw new Error('Consulta los escenarios y sus p95 en measurements.json');
    });
    const after = await fingerprint();
    if (before.source !== after.source || before.tooling !== after.tooling) throw new Error('Cambió la fuente o la prueba durante la ejecución');
    report.status = options.capture ? 'awaiting-visual-review' : options.mode === 'code-only' ? 'code-only-complete'
      : options.measure ? 'measurements-complete' : options.suite ? 'suite-complete' : 'ready-for-review';
  } catch (error) {
    report.failure = {phase, message: error.message};
    process.exitCode = 1;
  } finally {
    activeChild?.kill('SIGTERM');
    if (runtimeServer?.listening) await new Promise(resolve => {runtimeServer.close(resolve); runtimeServer.closeAllConnections();});
    await app?.close();
    if (temporary) await rm(temporary, {recursive: true, force: true});
    if (ownsLock) await rm(lock, {recursive: true, force: true});
    process.off('SIGINT', stop);
    process.off('SIGTERM', stop);
    await saveJson(path.join(output, 'verification.json'), report);
    await writeFile(path.join(output, 'README.md'), [
      '# Verificación de SQL · Punto 9', '', 'Estado **' + report.status + '**.', '',
      ...Object.entries(report.suites).map(([suite, result]) => '- ' + suite + ' · ' + result.passed + ' aprobados, ' + result.skipped + ' omitidos de ' + result.cases + '.'),
      ...(report.failure ? ['', 'Fallo en ' + report.failure.phase + ' · ' + report.failure.message.split('\n')[0]] : []),
      '', '[Informe completo](verification.json). Las mediciones usan DOM y el siguiente cuadro de animación.',
    ].join('\n') + '\n');
    console.log('Resultado: ' + report.status);
    console.log('Informe: ' + path.relative(root, output) + '/README.md');
    if (report.failure) console.error(report.failure.phase + ' · ' + report.failure.message.split('\n')[0]);
  }
}

try {
  const options = argumentsForRun(process.argv.slice(2));
  const selected = options.mode === 'code-only' || options.measure ? [] : options.suite ? [options.suite] : suites;
  const filters = [...options.projects.map(project => '--project=' + project), ...(options.grep ? ['--grep=' + options.grep] : [])];
  if (options.list) for (const suite of selected) console.log(suite + ' · ' + browserReportCases(discovery(suite, filters)).length + ' casos');
  else await verify(options, selected, filters);
} catch (error) {
  console.error(String(error.message).split('\n')[0]);
  process.exitCode = 1;
}
