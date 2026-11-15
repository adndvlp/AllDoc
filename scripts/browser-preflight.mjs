import {readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {cpus, platform, arch, release} from 'node:os';
import {parseBrowserPreflightArgs, selectBrowserProjects, preflightBrowsers} from './lib/browser-foundation.ts';
import {sourceFingerprint, sha256} from './lib/baseline.ts';
import config from '../playwright.cross-browser.config.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let output;
try {
  const args = parseBrowserPreflightArgs(process.argv.slice(2));
  const projects = selectBrowserProjects(args.projects);
  if (args.list) {
    for (const project of projects) console.log(`${project.name}: ${project.use.browserName}, ${project.use.viewport.width}×${project.use.viewport.height}, móvil=${project.use.isMobile}, táctil=${project.use.hasTouch}`);
    console.log('Solo configuración; no se iniciaron navegadores ni pruebas de la aplicación.');
  } else {
    const startedAt = new Date().toISOString(), source = await sourceFingerprint(root);
    output = path.join(root, 'benchmarks/browser-verifications', startedAt.replace(/[:.]/g, '-') + '-' + source.sha256.slice(0, 10));
    await mkdir(output, {recursive: true});
    const toolingPaths = ['scripts/browser-preflight.mjs', 'scripts/lib/browser-foundation.ts', 'playwright.cross-browser.config.ts', 'tsconfig.tests.json'];
    const report = {schemaVersion: 1, stage: 'preflight', status: 'partial', startedAt, source,
      scope: 'Arranque y cierre de motores seleccionados. No ejecuta build, servidor ni casos funcionales de AllDoc.',
      applicationCompatibility: 'not-tested', functionalCases: 0,
      projects: projects.map(project => ({...project, use: {...config.use, ...project.use}})),
      environment: {node: process.version, platform: platform(), release: release(), arch: arch(), cpu: cpus()[0]?.model},
      packages: {playwright: require('@playwright/test/package.json').version},
      browserRevisions: JSON.parse(await readFile(path.join(root, 'node_modules/playwright-core/browsers.json'), 'utf8')),
      tooling: await Promise.all(toolingPaths.map(async filename => ({path: filename, sha256: sha256(await readFile(path.join(root, filename)))})))};
    await writeFile(path.join(output, 'preflight.json'), JSON.stringify(report, null, 2) + '\n');
    const {firefox, webkit} = await import('@playwright/test');
    const result = await preflightBrowsers(args.projects, {firefox, webkit}, {onProgress: event => console.log(`${event.engine}: ${event.status === 'checking' ? 'comprobando…' : event.status}`)});
    Object.assign(report, {status: result.status === 'ready' ? 'preflight-ready' : 'preflight-blocked', result, finishedAt: new Date().toISOString()});
    await writeFile(path.join(output, 'preflight.json'), JSON.stringify(report, null, 2) + '\n');
    await writeFile(path.join(output, 'README.md'), ['# Preflight Firefox/WebKit', '', `Estado: **${report.status}**.`, '', report.scope, '',
      `Playwright: ${report.packages.playwright}. Fuente: \`${source.sha256}\`.`, '',
      ...result.engines.map(engine => `- ${engine.engine}: ${engine.status}${engine.version ? ' (' + engine.version + ')' : ''}.`), '',
      result.diagnostic ?? 'Motores seleccionados iniciados y cerrados. Compatibilidad de la aplicación pendiente del punto 2.', '',
      'Configuración efectiva, versiones, detalles y hashes: [preflight.json](preflight.json).'].join('\n') + '\n');
    console.log('Resultado: ' + report.status);
    console.log('Informe: ' + path.relative(root, output) + '/README.md');
    if (result.status !== 'ready') {console.error(result.diagnostic); process.exitCode = 1;}
  }
} catch (error) {
  console.error((error instanceof Error ? error.message : String(error)).split('\n')[0]);
  if (output) console.error('Informe parcial: ' + path.relative(root, output) + '/preflight.json');
  process.exitCode = 1;
}
