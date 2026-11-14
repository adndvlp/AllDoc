import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import {workspace} from '../fixtures/practice-session.ts';

const loadDependency = createRequire(path.resolve('package.json'));
const {transformSync} = loadDependency('@babel/core');
// Elimina tipos/módulos para evaluar el código real con APIs nativas del navegador.
// El preset de producción se comprueba por separado en client-compilation.test.ts.
const modules = Object.fromEntries(['guards', 'drafts', 'indexeddb-drafts'].map((name) => {
  const filename = path.resolve(`src/practice/${name}.ts`);
  return [`./${name}.ts`, transformSync(readFileSync(filename, 'utf8'), {filename, babelrc: false, configFile: false,
    presets: [loadDependency.resolve('@babel/preset-typescript')],
    plugins: [loadDependency.resolve('@babel/plugin-transform-modules-commonjs')]}).code as string];
}));

test('IndexedDB real: persistir, reabrir y resolver conflictos atómicos con copia recuperable', async ({page}) => {
  await page.goto('/');
  const result = await page.evaluate(async ({modules, seed}) => {
    const cache: Record<string, {exports: unknown}> = {};
    const load = (id: string): any => {
      if (cache[id]) return cache[id].exports;
      const module = {exports: {}}; cache[id] = module;
      new Function('require', 'module', 'exports', modules[id])(load, module, module.exports); return module.exports;
    };
    const {createIndexedDBDraftRepository} = load('./indexeddb-drafts.ts') as typeof import('../../src/practice/indexeddb-drafts.ts');
    const name = `practice-test-${crypto.randomUUID()}`;
    const a = createIndexedDBDraftRepository({name}); const b = createIndexedDBDraftRepository({name});
    const missing = await a.read(seed.id);
    const first = await a.write(seed, null, 1); a.close();
    const reopened = createIndexedDBDraftRepository({name}); const restored = await reopened.read(seed.id);
    const one = {...seed, revision: 1, files: [{...seed.files[0], content: 'SELECT 1;'}]};
    const two = {...seed, revision: 1, files: [{...seed.files[0], content: 'SELECT 2;'}]};
    const writes = await Promise.all([reopened.write(one, 1, 2), b.write(two, 1, 3)]);
    const current = await reopened.read(seed.id); const recoveries = await b.recoveries(seed.id);
    reopened.close(); b.close(); indexedDB.deleteDatabase(name);
    return {missing, first, restored, writes, current, recoveries};
  }, {modules, seed: workspace()});
  expect(result.missing).toBeNull(); expect(result.first.status).toBe('saved');
  expect(result.restored).toMatchObject({formatVersion: 1, storageRevision: 1, workspace: workspace()});
  expect(result.writes.map((item) => item.status).sort()).toEqual(['conflict', 'saved']);
  expect(result.current).toMatchObject({storageRevision: 2}); expect(result.recoveries).toHaveLength(1);
  const saved = (result.current as {workspace: {files: {content: string}[]}}).workspace.files[0].content;
  expect(result.recoveries[0].workspace.files[0].content).not.toBe(saved);
});

test('IndexedDB real: el store recupera archivos activos, revisiones y falla a memoria si no hay almacenamiento', async ({page}) => {
  await page.goto('/');
  const result = await page.evaluate(async ({modules, seed}) => {
    const cache: Record<string, {exports: unknown}> = {};
    const load = (id: string): any => {
      if (cache[id]) return cache[id].exports;
      const module = {exports: {}}; cache[id] = module;
      new Function('require', 'module', 'exports', modules[id])(load, module, module.exports); return module.exports;
    };
    const {createIndexedDBDraftRepository} = load('./indexeddb-drafts.ts') as typeof import('../../src/practice/indexeddb-drafts.ts');
    const {createDraftStore} = load('./drafts.ts') as typeof import('../../src/practice/drafts.ts');
    const name = `practice-test-${crypto.randomUUID()}`;
    const first = createDraftStore(() => createIndexedDBDraftRepository({name}));
    await first.load(seed); first.edit(seed.id, seed.activeFile, 'SELECT nombre FROM productos;');
    first.activate(seed.id, 'extra.sql'); await first.close();
    const second = createDraftStore(() => createIndexedDBDraftRepository({name}));
    const restored = await second.load(seed); await second.close(); indexedDB.deleteDatabase(name);
    const memory = createDraftStore(() => createIndexedDBDraftRepository({factory: {open() {throw new Error('SecurityError');}} as unknown as IDBFactory}));
    await memory.load(seed); memory.edit(seed.id, seed.activeFile, 'SELECT 7;'); await memory.flush();
    const fallback = memory.get(seed.id); await memory.close(); return {restored, fallback};
  }, {modules, seed: {...workspace(), files: [...workspace().files, {path: 'extra.sql', languageId: 'sql', content: '-- extra'}]}});
  expect(result.restored.workspace.activeFile).toBe('extra.sql');
  expect(result.restored.workspace.revision).toBe(2);
  expect(result.restored.workspace.files[0].content).toBe('SELECT nombre FROM productos;');
  expect(result.fallback!.status).toBe('memory'); expect(result.fallback!.workspace.files[0].content).toBe('SELECT 7;');
});
