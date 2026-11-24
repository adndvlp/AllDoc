import {createHash} from 'node:crypto';
import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {rBasePackages, rPackages, rRepositoryVersion, webRVersion} from '../src/practice/adapters/r/environment.ts';
import {maxAssetBytes, rCache, rContrib, rLockPath, rPackageFile, rRepoPath, sha256} from './lib/r-assets.mjs';

const repository = `https://repo.r-wasm.org/${rContrib}/`;
const update = process.argv.includes('--update');
const filename = /^[A-Za-z][A-Za-z0-9.]*$/;
const version = /^\d+(?:[.-]\d+)+$/;

function records(text) {
  const entries = new Map();
  for (const record of text.replaceAll('\r\n', '\n').trim().split(/\n\s*\n/)) {
    const fields = {};
    let field;
    for (const line of record.split('\n')) {
      const match = /^([\w-]+):\s*(.*)$/.exec(line);
      if (match) {field = match[1]; fields[field] = match[2];}
      else if (field && /^\s/.test(line)) fields[field] += ' ' + line.trim();
    }
    if (!filename.test(fields.Package ?? '') || !version.test(fields.Version ?? '')) continue;
    const dependencies = [fields.Depends, fields.Imports].filter(Boolean).join(',').split(',')
      .map(value => value.trim().match(/^[A-Za-z][\w.]*/)?.[0]).filter(Boolean);
    entries.set(fields.Package, {name: fields.Package, version: fields.Version, md5: fields.MD5sum, dependencies, record});
  }
  return entries;
}

async function get(name, source) {
  const url = new URL(source ?? name, repository);
  if (url.protocol !== 'https:') throw new Error(`Origen incompatible para ${name}`);
  const response = await fetch(url, {signal: AbortSignal.timeout(60_000)});
  if (!response.ok) throw new Error(`HTTP ${response.status} al descargar ${url.pathname}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > maxAssetBytes) throw new Error(`Tamaño incompatible en ${name}`);
  return bytes;
}

async function cached(item) {
  const file = rPackageFile(item.name, item.version);
  if (item.source && !/^[a-f\d]{64}$/.test(item.sha256 ?? '')) throw new Error(`Falta fijar el SHA-256 de ${file}`);
  const target = `${rCache}/${file}`;
  let bytes = await readFile(target).catch(error => {if (error.code !== 'ENOENT') throw error;});
  const valid = buffer => buffer?.[0] === 31 && buffer?.[1] === 139
    && (!item.sha256 || sha256(buffer) === item.sha256)
    && (!item.md5 || createHash('md5').update(buffer).digest('hex') === item.md5);
  if (!valid(bytes)) {
    bytes = await get(file, item.source);
    if (!valid(bytes)) throw new Error(`El archivo ${file} no coincide con el repositorio`);
    const temporary = `${target}.${process.pid}.tmp`;
    await writeFile(temporary, bytes);
    await rename(temporary, target);
  }
  return {...item, sha256: sha256(bytes)};
}

try {
  const previous = await readFile(rLockPath, 'utf8').then(JSON.parse).catch(error => {if (error.code !== 'ENOENT') throw error;});
  let lock = update ? undefined : previous;
  if (!lock) {
    console.log('Resolviendo paquetes de R ' + rRepositoryVersion + '…');
    const index = records((await get('PACKAGES')).toString('utf8'));
    if (previous?.webr === webRVersion && previous.r === rRepositoryVersion) {
      for (const item of previous.packages) if (item.source) index.set(item.name, item);
    }
    const dependencies = new Map();
    const base = new Set(rBasePackages);
    function requirePackage(name) {
      if (base.has(name) || dependencies.has(name)) return;
      const entry = index.get(name);
      if (!entry) throw new Error(`${name} no está disponible para WebR ${webRVersion}`);
      dependencies.set(name, entry);
      entry.dependencies.forEach(requirePackage);
    }
    rPackages.forEach(requirePackage);
    lock = {webr: webRVersion, r: rRepositoryVersion, roots: rPackages, packages: [...dependencies.values()].sort((a, b) => a.name.localeCompare(b.name))};
  }
  rRepoPath(lock);
  await mkdir(rCache, {recursive: true});
  const prepared = [];
  for (let index = 0; index < lock.packages.length; index += 4) {
    prepared.push(...await Promise.all(lock.packages.slice(index, index + 4).map(cached)));
    console.log(`Paquetes R: ${prepared.length}/${lock.packages.length}`);
  }
  const temporary = `${rLockPath}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify({...lock, packages: prepared}, null, 2) + '\n');
  await rename(temporary, rLockPath);
  console.log(`WebR preparado con ${prepared.length} paquetes.`);
} catch (error) {
  console.error(error.cause?.code ? `${error.cause.code} al descargar paquetes R` : error.message);
  process.exitCode = 1;
}
