import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {readFile, writeFile, mkdir, rm, copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';
import {sourceFingerprint, sha256, filesUnder} from './lib/baseline.ts';
import {syntheticSearchBenchmark} from './lib/final-verification.ts';
import {writeComparison} from './lib/benchmark-comparison.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--code-only')) throw new Error('Uso: npm run verify:final [-- --code-only]');
const codeOnly = args.includes('--code-only');
const source = await sourceFingerprint(root);
const startedAt = new Date().toISOString();
const output = path.join(root, 'benchmarks/verifications', startedAt.replace(/[:.]/g, '-') + '-' + source.sha256.slice(0, 10));
const reference = path.join(root, 'benchmarks/runs/2026-11-13T05-50-13-968Z-543ae4e484');
const lock = path.join(root, '.docusaurus-final-lock');
await mkdir(output, {recursive: true});
const report = {startedAt, finishedAt: null, mode: codeOnly ? 'code-only' : 'full', status: 'partial',
  source, tooling: [], reference: path.relative(root, reference), checks: {}, benchmarkRun: null,
  browserReview: 'pending', limitations: [], failure: null};
for (const file of ['scripts/verify-final.mjs', 'scripts/lib/benchmark-comparison.mjs', 'scripts/lib/final-verification.ts', 'scripts/capture-baseline.mjs', 'scripts/lib/baseline-browser.mjs', 'scripts/lib/baseline.ts', 'playwright.config.ts', ...(await filesUnder('tests')).filter((file) => file.endsWith('.ts'))]) report.tooling.push({path: file, sha256: sha256(await readFile(path.join(root, file)))});
let stage = 'lock', ownsLock = false;
const save = () => writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2) + '\n');

async function run(name, executable, arguments_) {
  console.log(name);
  const logfile = path.join(output, name.split(' ')[0] + '.log');
  const log = createWriteStream(logfile);
  let text = '';
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(executable, arguments_, {cwd: root, env: {...process.env, DOCUSAURUS_NO_PERSISTENT_CACHE: '1'}, stdio: ['ignore', 'pipe', 'pipe']});
      for (const stream of [child.stdout, child.stderr]) stream.on('data', (chunk) => {log.write(chunk); text = (text + chunk.toString()).slice(-100000);});
      child.once('error', reject);
      child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`${name}: código ${code}. ${text.slice(-1000)}`)));
    });
  } finally {await new Promise((resolve) => log.end(resolve));}
  report.checks[name] = {status: 'passed', log: path.basename(logfile)};
  await save();
  return text;
}

function uiSummary(data) {
  const projects = {};
  function visit(suites) {
    for (const suite of suites) {
      for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) {
        const counts = projects[test.projectName] ??= {passed: 0, skipped: 0};
        const last = test.results.at(-1);
        if (last.status === 'passed') counts.passed++;
        else if (last.status === 'skipped') counts.skipped++;
        else throw new Error('Prueba UI sin aprobar: ' + spec.title);
      }
      visit(suite.suites ?? []);
    }
  }
  visit(data.suites);
  if (Object.keys(projects).length !== 7 || data.stats.expected < 260 || data.stats.unexpected || data.stats.flaky || data.errors.length) throw new Error('La suite UI no acredita los siete proyectos sin fallos');
  if (Date.parse(data.stats.startTime) < Date.parse(startedAt)) throw new Error('El informe UI es de una ejecución anterior');
  return {stats: data.stats, projects};
}

try {
  await mkdir(lock); ownsLock = true;
  if (!codeOnly) {
    stage = 'navegador';
    console.log('Comprobando Chromium…');
    const browser = await chromium.launch();
    report.browserVersion = browser.version();
    await browser.close();
  }
  stage = 'código';
  const testFiles = (await filesUnder('tests')).filter((file) => file.endsWith('.test.ts')).sort();
  await run('01-pruebas de código', process.execPath, ['--experimental-strip-types', '--test', ...testFiles]);
  await run('02-tipos de aplicación', 'npm', ['run', 'typecheck']);
  await run('03-tipos de pruebas', 'npm', ['run', 'typecheck:tests']);
  const synthetic = syntheticSearchBenchmark();
  await writeFile(path.join(output, 'synthetic-search.json'), JSON.stringify({...synthetic, runtime: {node: process.version, platform: process.platform, arch: process.arch}}, null, 2) + '\n');
  report.checks.synthetic = {status: 'passed', file: 'synthetic-search.json', entries: synthetic.entries};
  if (!codeOnly) {
    stage = 'UI';
    await run('04-UI contra referencias revisadas', 'npm', ['run', 'test:ui']);
    const ui = JSON.parse(await readFile(path.join(root, 'test-results/results.json'), 'utf8'));
    report.checks.ui = {status: 'passed', ...uiSummary(ui)};
    await copyFile(path.join(root, 'test-results/results.json'), path.join(output, 'ui-results.json'));
    await save();
  } else {
    report.checks.ui = {status: 'not-run'};
    report.limitations.push('Modo --code-only: faltan UI, capturas nuevas y medición de interacciones.');
  }
  stage = 'medición';
  const text = await run('05-build y medición de producción', process.execPath,
    [path.join(root, 'scripts/capture-baseline.mjs'), '--post-redesign', ...(codeOnly ? ['--bundle-only'] : [])]);
  const match = text.match(/^Informe: (.+)\/README\.md$/m);
  if (!match) throw new Error('No se encontró el informe de la medición');
  const current = path.resolve(root, match[1]);
  report.benchmarkRun = path.relative(root, current);
  const audit = JSON.parse(await readFile(path.join(current, 'published-audit.json'), 'utf8'));
  if (audit.status !== 'passed') throw new Error('Auditoría publicada sin aprobar');
  report.checks.published = {status: audit.status, pages: audit.pages.length};
  stage = 'comparación';
  const comparison = await writeComparison(reference, current, output);
  report.checks.comparison = {status: comparison.status, file: 'comparison.md'};
  if ((await sourceFingerprint(root)).sha256 !== source.sha256) throw new Error('Las fuentes cambiaron durante la verificación');
  for (const file of report.tooling) if (sha256(await readFile(path.join(root, file.path))) !== file.sha256) throw new Error('La herramienta o las pruebas cambiaron: ' + file.path);
  if (!codeOnly && comparison.status !== 'complete') {
    report.status = comparison.status;
    throw new Error('Comparación ' + comparison.status + '; revisar comparison.md');
  }
  report.status = codeOnly ? 'partial' : 'ready-for-review';
  report.limitations.push('La revisión de imágenes y trazas requiere inspección del informe; no se acredita INP de usuarios reales ni Safari/iOS físico.');
} catch (error) {
  report.failure = {stage, message: error.message};
  process.exitCode = 1;
  console.error('Verificación detenida (' + stage + '): ' + error.message.replace(/\s+/g, ' ').slice(0, 1000));
} finally {
  if (ownsLock) await rm(lock, {recursive: true, force: true});
  report.finishedAt = new Date().toISOString();
  await save();
  const current = report.benchmarkRun ? path.relative(output, path.join(root, report.benchmarkRun)) : null;
  const lines = ['# Verificación final de AllDoc', '', `Estado: **${report.status}**. Modo: ${report.mode}.`, '',
    `Fuente: \`${source.sha256}\`.`, '',
    '| Comprobación | Resultado |', '| --- | --- |', ...Object.entries(report.checks).map(([name, value]) => `| ${name} | ${value.status} |`), '',
    '[Datos completos](verification.json)', '',
    ...(report.checks.comparison ? ['[Comparación](comparison.md)', ''] : []),
    ...(report.checks.synthetic ? ['[Buscador con mil entradas](synthetic-search.json)', ''] : []),
    ...(current ? [`[Medición de producción](${current}/README.md)`, ''] : []),
    ...report.limitations.map((item) => '- ' + item), '',
    ...(report.failure ? ['## Etapa pendiente', '', report.failure.stage + ': ' + report.failure.message.replace(/\s+/g, ' ').slice(0, 1200), ''] : []),
    'Las omisiones de la suite UI se conservan como omisiones; no se cuentan como aprobadas. Los logs locales completos están junto a este informe y no se versionan.', ''];
  await writeFile(path.join(output, 'README.md'), lines.join('\n'));
  console.log('Resultado: ' + report.status);
  console.log('Informe: ' + path.relative(root, path.join(output, 'README.md')));
}
