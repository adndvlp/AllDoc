import {defineConfig} from '@playwright/test';
import {browserProjects} from './scripts/lib/browser-foundation.ts';

// Los comandos dedicados hacen el preflight antes del build. No se importa la
// configuración Chromium ni se ejecuta su globalSetup o su webServer.
export default defineConfig({
  testDir: './tests/cross-browser',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  maxFailures: 1,
  timeout: 30_000,
  expect: {timeout: 7_000, toHaveScreenshot: {animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.001}},
  outputDir: 'test-results/cross-browser/artifacts',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  reporter: [['dot'], ['html', {open: 'never', outputFolder: 'playwright-report/cross-browser'}],
    ['json', {outputFile: 'test-results/cross-browser/results.json'}]],
  use: {baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173',
    headless: true, locale: 'es-MX', colorScheme: 'dark', reducedMotion: 'reduce',
    trace: 'retain-on-failure', screenshot: 'only-on-failure'},
  projects: browserProjects(),
  metadata: {stage: 'configuration-only', preflight: 'npm run test:browser:preflight',
    coverage: 'Punto 1: no contiene todavía los casos funcionales de la aplicación.'},
});
