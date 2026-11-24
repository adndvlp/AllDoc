import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {readFile, readdir} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {rRepositoryVersion, webRVersion, rPackages} from '../../src/practice/adapters/r/environment.ts';

export const maxAssetBytes = 25 * 1024 ** 2;
export const rLockPath = 'specs/r-packages.lock.json';
export const rCache = `.r-packages/${webRVersion}`;
export const rContrib = `bin/emscripten/contrib/${rRepositoryVersion}`;
export const rPackageFile = (name, version) => `${name}_${version}.tgz`;
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

export function rRepoPath(lock) {
  if (lock.webr !== webRVersion || lock.r !== rRepositoryVersion || JSON.stringify(lock.roots) !== JSON.stringify(rPackages)) {
    throw new Error('Cambió el entorno de R. Ejecuta npm run prepare:r -- --update');
  }
  return `r/${webRVersion}/repo-${sha256(JSON.stringify(lock)).slice(0, 12)}`;
}

export async function readRLock(root) {
  try {return JSON.parse(await readFile(join(root, rLockPath), 'utf8'));}
  catch (error) {
    if (error.code === 'ENOENT') throw new Error('Faltan los paquetes R. Ejecuta npm run prepare:r');
    throw error;
  }
}

export async function publishRAssets(root, lock, emit) {
  const require = createRequire(import.meta.url);
  const dist = dirname(require.resolve('webr'));
  const installed = JSON.parse(await readFile(join(dist, '..', 'package.json'), 'utf8'));
  if (installed.version !== webRVersion) throw new Error(`Se esperaba WebR ${webRVersion} y está instalado ${installed.version}`);
  const prefix = `r/${webRVersion}`;
  const files = ['webr.js', 'webr-worker.js', 'R.js', 'R.wasm', 'libRblas.so', 'libRlapack.so'];
  const vfs = await readdir(join(dist, 'vfs'), {recursive: true, withFileTypes: true});
  files.push(...vfs.filter(item => item.isFile()).map(item => 'vfs/' + join(item.parentPath.slice(join(dist, 'vfs').length), item.name).replace(/^\//, '')));
  for (const file of files.sort()) await publish(`${prefix}/${file}`, await readFile(join(dist, file)));
  await publish(`${prefix}/LICENSE.md`, await readFile(join(dist, '..', 'LICENSE.md')));
  const repo = `${rRepoPath(lock)}/${rContrib}`;
  for (const item of lock.packages) {
    const file = rPackageFile(item.name, item.version);
    let bytes;
    try {bytes = await readFile(join(root, rCache, file));}
    catch {throw new Error(`Falta ${file}. Ejecuta npm run prepare:r`);}
    if (sha256(bytes) !== item.sha256) throw new Error(`Checksum incorrecto de ${file}. Ejecuta npm run prepare:r`);
    await publish(`${repo}/${file}`, bytes);
  }
  await publish(`${repo}/PACKAGES`, Buffer.from(lock.packages.map(item => item.record).join('\n\n') + '\n'));

  async function publish(name, bytes) {
    if (bytes.length > maxAssetBytes) throw new Error(`El archivo ${name} supera 25 MiB`);
    await emit(name, bytes);
  }
}
