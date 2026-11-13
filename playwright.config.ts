import {defineConfig} from '@playwright/test';

const mobile = {isMobile: true, hasTouch: true, deviceScaleFactor: 1};

export default defineConfig({
  testDir: './tests/ui',
  globalSetup: './tests/ui/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  maxFailures: process.env.CI ? 0 : 1,
  timeout: 30_000,
  expect: {
    timeout: 7_000,
    toHaveScreenshot: {animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.001},
  },
  outputDir: 'test-results/artifacts',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  reporter: [
    ['dot'],
    ['html', {open: 'never'}],
    ['json', {outputFile: 'test-results/results.json'}],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173',
    browserName: 'chromium',
    locale: 'es-MX',
    colorScheme: 'dark',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {name: 'celular-pequeno', use: {...mobile, viewport: {width: 320, height: 568}}},
    {name: 'celular', use: {...mobile, viewport: {width: 390, height: 844}}},
    {name: 'celular-horizontal', use: {...mobile, viewport: {width: 844, height: 390}}},
    {name: 'ipad', use: {...mobile, viewport: {width: 768, height: 1024}}},
    {name: 'ipad-horizontal', use: {...mobile, viewport: {width: 1024, height: 768}}},
    {name: 'laptop', use: {viewport: {width: 1280, height: 800}}},
    {name: 'escritorio', use: {viewport: {width: 1920, height: 1080}}},
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'npm run build:ui && npm run serve:ui',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
