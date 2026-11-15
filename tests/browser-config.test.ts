import {test} from 'node:test';
import assert from 'node:assert/strict';
import legacy from '../playwright.config.ts';
import cross from '../playwright.cross-browser.config.ts';
import {browserProjects} from '../scripts/lib/browser-foundation.ts';

test('configuración dedicada: seis proyectos, idioma/tema y referencias independientes, sin arranque pesado automático', () => {
  assert.deepEqual(cross.projects, browserProjects());
  assert.equal(cross.testDir, './tests/cross-browser');
  assert.equal(cross.globalSetup, undefined); assert.equal(cross.webServer, undefined);
  assert.notEqual(cross.outputDir, legacy.outputDir);
  assert.equal(cross.snapshotPathTemplate, '{testDir}/__screenshots__/{projectName}/{arg}{ext}');
  assert.equal(cross.use?.locale, 'es-MX'); assert.equal(cross.use?.colorScheme, 'dark');
  assert.equal(cross.use?.reducedMotion, 'reduce'); assert.equal(cross.use?.headless, true);
  assert.equal(cross.expect?.toHaveScreenshot?.maxDiffPixelRatio, 0.001);
});

test('configuración Chromium: conserva los siete proyectos y la ruta de referencias existentes', () => {
  assert.equal(legacy.use?.browserName, 'chromium');
  assert.deepEqual(legacy.projects?.map(p => p.name), ['celular-pequeno', 'celular', 'celular-horizontal', 'ipad', 'ipad-horizontal', 'laptop', 'escritorio']);
  assert.equal(legacy.testDir, './tests/ui'); assert.equal(legacy.globalSetup, './tests/ui/global-setup.ts');
  assert.equal(legacy.snapshotPathTemplate, '{testDir}/__screenshots__/{projectName}/{arg}{ext}');
});
