import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {buildRuntime} from '../scripts/build-practice-runtime.mjs';
import {pythonPackages} from '../src/practice/adapters/python/packages.ts';
import {maxAssetBytes, readRLock, rContrib, rPackageFile, rRepoPath} from '../scripts/lib/r-assets.mjs';

test('runtime publicado: SDK/WASM/stdlib conservan los bytes de la distribución y los wheels cumplen el pin', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'alldoc-runtime-integrity-'));
  const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
  try {
    const manifest = await buildRuntime({outDir: directory});
    const prefix = 'python/' + pythonPackages.runtimeVersion + '/';
    for (const name of ['pyodide.mjs', 'pyodide.asm.mjs', 'pyodide.asm.wasm', 'python_stdlib.zip']) {
      assert.equal(digest(await readFile(join(directory, prefix, name))),
        digest(await readFile(new URL('../node_modules/pyodide/' + name, import.meta.url))), name);
    }
    for (const item of Object.values(pythonPackages.lock.packages)) {
      assert.equal(digest(await readFile(join(directory, prefix, item.file_name))), item.sha256, item.name);
    }
    const lock = await readRLock(process.cwd());
    assert.ok(manifest.files.includes('r/' + lock.webr + '/R.wasm'));
    assert.ok(manifest.files.includes('r/' + lock.webr + '/webr-worker.js'));
    const browserSDK = await readFile(new URL('../node_modules/webr/dist/webr.js', import.meta.url));
    assert.equal(manifest.integrity[`r/${lock.webr}/webr.js`], digest(browserSDK));
    assert.ok(manifest.files.includes(`${rRepoPath(lock)}/${rContrib}/PACKAGES`));
    for (const item of lock.packages) {
      const file = `${rRepoPath(lock)}/${rContrib}/${rPackageFile(item.name, item.version)}`;
      assert.equal(manifest.integrity[file], item.sha256);
    }
    for (const name of manifest.files.filter(name => name.startsWith('r/'))) {
      assert.ok((await readFile(join(directory, name))).length <= maxAssetBytes, name);
    }
    for (const name of manifest.files) assert.equal(digest(await readFile(join(directory, name))), manifest.integrity[name], name);
  } finally {await rm(directory, {recursive: true, force: true});}
});
