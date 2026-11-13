import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, mkdir, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {summarize, declaredAssets, inventoryBuild, sourceFingerprint, buildFile} from '../scripts/lib/baseline.ts';

test('percentiles de referencia: nearest rank, valores cero y muestras ausentes', () => {
  assert.deepEqual(summarize([]), {count: 0, min: null, median: null, p95: null, max: null});
  assert.deepEqual(summarize([30, 0, 10, 20]), {count: 4, min: 0, median: 10, p95: 30, max: 30});
  assert.equal(summarize(Array.from({length: 30}, (_, index) => index + 1)).p95, 29);
  assert.throws(() => summarize([NaN]), /inválida/);
  assert.throws(() => summarize([-1]), /inválida/);
});

test('assets declarados: incluye preloads JS/CSS y elimina duplicados, sin contar fuentes o scripts inline', () => {
  const html = `<script defer src="/assets/main.js"></script><script src='/assets/main.js'></script>
    <link rel="stylesheet" href="/assets/site.css"><link rel="preload" href="/assets/lazy.js">
    <link rel="modulepreload" href="/assets/module.js"><link rel="preload" as="font" href="/assets/font.woff2">
    <script>const inline = true;</script><link rel="canonical" href="https://example.com">
    <script src="https://example.com/external.js"></script>`;
  assert.deepEqual(declaredAssets(html), ['assets/lazy.js', 'assets/main.js', 'assets/module.js', 'assets/site.css']);
  assert.throws(() => declaredAssets('<script src="/../outside.js"></script>'), /fuera/);
});

test('inventario: separa total del build y assets declarados por página y usa gzip real', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-inventory-test-'));
  try {
    await mkdir(path.join(directory, 'assets'));
    const main = 'console.log("principal");';
    await writeFile(path.join(directory, 'assets/main.js'), main);
    await writeFile(path.join(directory, 'assets/lazy.js'), 'console.log("diferido");');
    await writeFile(path.join(directory, 'assets/site.css'), 'html{background:#000}');
    await writeFile(path.join(directory, 'index.html'), '<script src="/assets/main.js"></script><link rel="stylesheet" href="/assets/site.css">');
    const result = await inventoryBuild(directory);
    assert.equal(result.totals.js.files, 2);
    assert.equal(result.pages[0].js.files, 1);
    assert.equal(result.pages[0].js.gzipBytes, gzipSync(main, {level: 9}).length);
    assert.equal(result.pages[0].css.files, 1);
    await writeFile(path.join(directory, 'index.html'), '<script src="/assets/missing.js"></script>');
    await assert.rejects(inventoryBuild(directory), /ausentes/);
  } finally {await rm(directory, {recursive: true, force: true});}
});

test('huella: detecta cambios de la app y excluye los informes y resultados generados', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-fingerprint-test-'));
  try {
    await mkdir(path.join(directory, 'src'));
    await mkdir(path.join(directory, 'benchmarks'));
    await writeFile(path.join(directory, 'src/app.ts'), 'const app = 1;');
    await writeFile(path.join(directory, 'package-lock.json'), '{}');
    const initial = await sourceFingerprint(directory);
    await writeFile(path.join(directory, 'benchmarks/report.json'), '{}');
    assert.equal((await sourceFingerprint(directory)).sha256, initial.sha256);
    await writeFile(path.join(directory, 'src/app.ts'), 'const app = 2;');
    assert.notEqual((await sourceFingerprint(directory)).sha256, initial.sha256);
  } finally {await rm(directory, {recursive: true, force: true});}
});

test('servidor de referencia: resuelve rutas estáticas con y sin trailing slash y bloquea salir del build', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alldoc-routes-test-'));
  try {
    await mkdir(path.join(directory, 'area'));
    await writeFile(path.join(directory, 'index.html'), 'inicio');
    await writeFile(path.join(directory, 'select.html'), 'select');
    await writeFile(path.join(directory, 'area/index.html'), 'área');
    assert.equal(await buildFile(directory, '/'), path.join(directory, 'index.html'));
    assert.equal(await buildFile(directory, '/select'), path.join(directory, 'select.html'));
    assert.equal(await buildFile(directory, '/area/'), path.join(directory, 'area/index.html'));
    assert.equal(await buildFile(directory, '/../outside.html'), null);
    assert.equal(await buildFile(directory, '/missing'), null);
  } finally {await rm(directory, {recursive: true, force: true});}
});
