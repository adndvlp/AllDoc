import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {readFile, writeFile, mkdir, mkdtemp, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';
import uiConfig from '../playwright.config.ts';
import {sourceFingerprint, inventoryBuild, archiveUiReferences, serveBuild, sha256} from './lib/baseline.ts';
import {captureScreens, measureProfile} from './lib/baseline-browser.mjs';
import {auditPublishedBuild} from './lib/final-verification.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const bundleOnly = args.includes('--bundle-only');
const postRedesign = args.includes('--post-redesign');
if (args.some((arg) => !['--bundle-only', '--post-redesign'].includes(arg))) throw new Error('Uso: npm run baseline [-- --bundle-only] [--post-redesign]');
const startedAt = new Date().toISOString();
const source = await sourceFingerprint(root);
const output = path.join(root, 'benchmarks/runs', startedAt.replace(/[:.]/g, '-') + '-' + source.sha256.slice(0, 10));
await mkdir(output, {recursive: true});
const workspace = await mkdtemp(path.join(os.tmpdir(), 'alldoc-baseline-'));
const buildDirectory = path.join(workspace, 'site');
// Nombre estable: los IDs de módulos de Webpack pueden depender de esta ruta.
const generatedName = '.docusaurus-baseline';
const lockDirectory = path.join(root, '.docusaurus-baseline-lock');
const packageNames = ['@docusaurus/core', 'react', 'react-dom', 'typescript', 'react-icons', '@playwright/test', 'webpack'];
const packages = {};
for (const name of packageNames) packages[name] = JSON.parse(await readFile(path.join(root, 'node_modules', name, 'package.json'), 'utf8')).version;
const measurementFiles = ['scripts/capture-baseline.mjs', 'scripts/lib/baseline.ts', 'scripts/lib/baseline-browser.mjs', 'playwright.config.ts', ...(postRedesign ? ['scripts/lib/final-verification.ts'] : [])];
const tooling = [];
for (const filename of measurementFiles) tooling.push({path: filename, sha256: sha256(await readFile(path.join(root, filename)))});
const report = {
  schemaVersion: 1, startedAt, finishedAt: null, status: 'partial',
  purpose: postRedesign ? 'post-redesign' : 'baseline',
  source, tooling, packages,
  environment: {node: process.version, platform: os.platform(), release: os.release(), arch: os.arch(), cpu: os.cpus()[0]?.model ?? 'unknown', logicalCpus: os.cpus().length, totalMemoryBytes: os.totalmem(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, buildVariables: {SITE_URL: process.env.SITE_URL ?? null}},
  conditions: {
    build: 'Producción; generado en un directorio aislado y temporal.',
    network: 'Servidor HTTP en 127.0.0.1 y puerto efímero; sin emulación de red WAN; gzip nivel 9; Cache-Control: no-store.',
    cache: 'Contextos nuevos sin almacenamiento previo. Primera apertura del índice fría; posteriores usan caché de módulos en la misma SPA. Caché HTTP deshabilitada en mediciones.',
    screenshots: 'Siete proyectos de playwright.config.ts; seis estados por proyecto; reducedMotion=reduce; viewport, no fullPage.',
    performance: 'Secuencial; laptop CPU 1× y celular emulado CPU 4×; reducedMotion=no-preference; 30 muestras por acción.',
    domMetric: 'Tiempo desde event.timeStamp de click/keydown hasta condición DOM satisfecha y siguiente requestAnimationFrame. Proxy de disponibilidad, no pintura real ni INP.',
    eventTiming: 'Entradas nativas observadas con umbral de 16 ms; las ausentes se conservan como null, sin asignarles 0 ni inferir rapidez. Percentiles de entradas observadas tienen cobertura parcial.',
    inp: 'No se calcula INP de campo ni se acredita CA-23 completo con esta referencia.',
  },
  build: {status: 'pending'}, browser: {status: 'pending'}, captures: [], timings: [], previousUiReferences: null, failures: [],
};

function markdown() {
  const lines = [
    postRedesign ? '# Medición posterior al rediseño de AllDoc' : '# Referencia de AllDoc', '',
    '**Estado:** ' + report.status + '.  ',
    '**Fuente SHA-256:** `' + source.sha256 + '`.  ',
    '**Inicio:** ' + startedAt + '.  ',
    '**Build:** ' + report.build.status + '. **Navegador:** ' + report.browser.status + '.', '',
    postRedesign ? 'Esta ejecución contribuye al punto 8 del SDD. Comparar con la referencia inicial; no sobrescribe ejecuciones anteriores. Condiciones en [report.json](report.json).' : 'Esta ejecución registra una referencia. No modifica el diseño de la app. Los datos completos y las condiciones están en [report.json](report.json).', '',
  ];
  if (report.build.status === 'complete') {
    lines.push('## Bundle de producción', '', 'Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.', '', '| Conjunto | Archivos | Bytes | Gzip bytes |', '| --- | ---: | ---: | ---: |');
    for (const [name, item] of Object.entries(report.build.totals)) lines.push(`| ${name.toUpperCase()} total | ${item.files} | ${item.bytes} | ${item.gzipBytes} |`);
    lines.push('', '| Página | JS inicial gzip | CSS inicial gzip |', '| --- | ---: | ---: |');
    for (const page of report.build.pages) lines.push(`| ${page.html} | ${page.js.gzipBytes} | ${page.css.gzipBytes} |`);
    lines.push('', 'Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).', '');
  }
  lines.push('## Capturas', '', `${report.captures.length} proyectos capturados en esta ejecución. Se esperan ${uiConfig.projects.length}, con seis estados por proyecto.`, '');
  for (const capture of report.captures) lines.push('- ' + capture.project + ': ' + capture.files.map((file) => `[${path.basename(file.path, '.png')}](${file.path})`).join(' · '));
  lines.push('', `${report.previousUiReferences?.files.length ?? 0} referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.`, '', '## Tiempos', '');
  for (const profile of report.timings) {
    lines.push(`### ${profile.project} — CPU ${profile.cpuRate}×`, '', `Datos y muestras: [timings-${profile.project}.json](timings-${profile.project}.json).`, '', '| Acción | Muestras | Mediana proxy DOM (ms) | p95 proxy DOM (ms) |', '| --- | ---: | ---: | ---: |');
    for (const [name, value] of Object.entries(profile.actions)) {
      const stats = value.summary?.domResponseMs ?? value.domResponseMs;
      lines.push(`| ${name} | ${stats.count} | ${stats.median?.toFixed(2) ?? 'N/D'} | ${stats.p95?.toFixed(2) ?? 'N/D'} |`);
    }
    lines.push('');
  }
  lines.push('El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. ' + (postRedesign ? 'Favoritos: 15 altas y 15 bajas por perfil; no existe referencia previa de esta función.' : 'Este modo no mide favoritos; usar --post-redesign para incluirlos.'), '');
  if (report.failures.length) lines.push('## Pendientes de esta ejecución', '', ...report.failures.map((failure) => '- ' + failure.stage + ': ' + failure.message.replace(/\n/g, ' ').slice(0, 1200)), '', 'Una ejecución parcial conserva evidencia válida de las etapas terminadas y no acredita las que faltan. Para obtener una ejecución completa, ejecutar `npm run baseline` en un entorno que pueda iniciar Chromium.', '');
  lines.push('## Reproducción y comparación', '', 'Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.', '', 'Procedimiento: [benchmarks/README.md](../../README.md).');
  return lines.join('\n') + '\n';
}

async function save() {
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(path.join(output, 'README.md'), markdown());
}

async function build() {
  const log = createWriteStream(path.join(output, 'build.log'));
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.join(root, 'node_modules/@docusaurus/core/bin/docusaurus.mjs'), 'build', '--out-dir', buildDirectory], {cwd: root, env: {...process.env, DOCUSAURUS_GENERATED_FILES_DIR_NAME: generatedName}});
      child.stdout.on('data', (chunk) => {process.stdout.write(chunk); log.write(chunk);});
      child.stderr.on('data', (chunk) => {process.stderr.write(chunk); log.write(chunk);});
      child.once('error', reject);
      child.once('exit', (code) => code === 0 ? resolve() : reject(new Error('El build terminó con código ' + code)));
    });
  } finally {await new Promise((resolve) => log.end(resolve));}
}

let server, browser, ownsLock = false, stage = 'lock';
try {
  await mkdir(lockDirectory);
  ownsLock = true;
  console.log('Referencia: ' + path.relative(root, output));
  stage = 'archive';
  report.previousUiReferences = await archiveUiReferences(root, output);
  await save();
  stage = 'build';
  await build();
  if (postRedesign) {
    const audit = await auditPublishedBuild(buildDirectory);
    await writeFile(path.join(output, 'published-audit.json'), JSON.stringify(audit, null, 2) + '\n');
    report.publishedAudit = {status: audit.status, file: 'published-audit.json'};
    if (audit.status !== 'passed') throw new Error('La auditoría del HTML publicado detectó: ' + audit.failures.join('; '));
  }
  const bundle = await inventoryBuild(buildDirectory);
  await writeFile(path.join(output, 'bundle.json'), JSON.stringify(bundle, null, 2) + '\n');
  report.build = {status: 'complete', manifest: 'bundle.json', totals: bundle.totals, pages: bundle.pages};
  if ((await sourceFingerprint(root)).sha256 !== source.sha256) throw new Error('Las fuentes cambiaron durante el build; esta ejecución no sirve como referencia estable.');
  await save();
  if (bundleOnly) {
    report.browser.status = 'not-requested';
  } else {
    stage = 'server';
    server = await serveBuild(buildDirectory);
    stage = 'browser-launch';
    browser = await chromium.launch();
    report.browser = {status: 'running', name: 'chromium', version: browser.version()};
    for (const project of uiConfig.projects) {
      stage = 'screenshots-' + project.name;
      console.log('Capturas: ' + project.name);
      report.captures.push(await captureScreens(browser, project, output, server.url, {postRedesign}));
      await save();
    }
    for (const name of ['laptop', 'celular']) {
      const project = uiConfig.projects.find((item) => item.name === name);
      if (!project) throw new Error('Falta el perfil de medición: ' + name);
      stage = 'timings-' + name;
      console.log('Tiempos: ' + name + ' (30 muestras por acción)');
      report.timings.push(await measureProfile(browser, project, server.url, 30, output, {postRedesign}));
      await save();
    }
    report.browser.status = 'complete';
    if ((await sourceFingerprint(root)).sha256 !== source.sha256) throw new Error('Las fuentes cambiaron durante la captura; conservar como ejecución parcial.');
    report.status = 'complete';
  }
} catch (error) {
  report.failures.push({stage, message: error.message});
  if (stage === 'build') report.build.status = 'failed';
  if (stage === 'server' || stage === 'lock') report.browser.status = 'not-run';
  else if (stage !== 'archive' && stage !== 'build') report.browser.status = 'failed';
  await writeFile(path.join(output, 'failure.log'), error.stack ?? String(error));
  process.exitCode = 1;
  console.error('Referencia parcial (' + stage + '): ' + error.message.slice(0, 700));
} finally {
  if (browser) await browser.close();
  if (server) await server.close();
  await rm(workspace, {recursive: true, force: true});
  if (ownsLock) {
    await rm(path.join(root, generatedName), {recursive: true, force: true});
    await rm(lockDirectory, {recursive: true, force: true});
  }
  report.finishedAt = new Date().toISOString();
  await save();
  console.log('Informe: ' + path.relative(root, path.join(output, 'README.md')));
}
