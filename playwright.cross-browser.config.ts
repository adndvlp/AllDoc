import {defineConfig} from '@playwright/test';
import {browserProjects} from './scripts/lib/browser-foundation.ts';
import path from 'node:path';

const reportDirectory = process.env.BROWSER_REPORT_DIR;
const visual = process.env.BROWSER_VISUAL_MODE === '1';

// Los comandos dedicados hacen el preflight antes del build. No se importa la
// configuración Chromium ni se ejecuta su globalSetup o su webServer.
export default defineConfig({
  testDir: './tests/cross-browser',
  testMatch: '**/*.spec.ts',
  testIgnore: visual ? /(?:application|practice-[^/]+)\.spec\.ts$/ : '**/visual.spec.ts',
  updateSnapshots: 'none',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  maxFailures: 1,
  timeout: 30_000,
  expect: {timeout: 7_000, toHaveScreenshot: {animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.001}},
  outputDir: path.join(reportDirectory ?? 'test-results/cross-browser', 'artifacts'),
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  reporter: [['./scripts/lib/browser-progress.mjs'],
    ['html', {open: 'never', outputFolder: reportDirectory ? path.join(reportDirectory, 'html') : 'playwright-report/cross-browser'}],
    ['json', {outputFile: path.join(reportDirectory ?? 'test-results/cross-browser', 'results.json')}]],
  use: {baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173',
    headless: true, locale: 'es-MX', colorScheme: 'dark', reducedMotion: 'reduce',
    trace: 'retain-on-failure', screenshot: 'only-on-failure'},
  projects: browserProjects().map(p => {
    const exclusions=[...(!p.name.endsWith('-escritorio')?['@desktop']:[]),...(!p.name.endsWith('-estrecho')?['@narrow']:[])];
    return {...p,...(exclusions.length?{grepInvert:new RegExp(exclusions.join('|'))}:{})};
  }),
  metadata: {stage: visual ? 'visual-references' : 'functional-matrix', preflight: 'npm run test:browser:preflight',
    coverage: visual ? 'Punto 4: referencias por proyecto; generación explícita y revisión posterior.' : 'Punto 3: matriz funcional de seis proyectos. Los casos @desktop se excluyen antes de ejecutar en los otros tamaños.'},
});
