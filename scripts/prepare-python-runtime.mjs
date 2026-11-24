import {createRequire} from 'node:module';
import {readFile, writeFile, mkdir, rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {compatiblePythonPin, selectPythonPackages} from './lib/python-assets.ts';

const require = createRequire(import.meta.url);
async function prepare() {
const root = fileURLToPath(new URL('../', import.meta.url));
const version = require('pyodide/package.json').version;
const target = resolve(root, 'src/practice/adapters/python/packages.ts');
let previous;
try {previous = (await import(pathToFileURL(target).href)).pythonPackages;} catch (error) {if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;}
const pinned = compatiblePythonPin(version, previous, process.argv.includes('--update'));
const lock = structuredClone(require('pyodide/pyodide-lock.json'));
if (pinned) Object.assign(lock.packages, pinned.lock.packages);
const sources = {...pinned?.sources};
async function get(url) {
  const response = await fetch(url, {redirect: 'error', signal: AbortSignal.timeout(90_000)});
  if (!response.ok) throw new Error(`No se pudo descargar ${url}: HTTP ${response.status}`);
  return response;
}
// Los binarios deben pertenecer a la distribución/ABI instalada. Los paquetes
// de Python puro se resuelven en PyPI y se fijan antes de publicar.
const pure = {
  jedi: {module: 'jedi', depends: ['parso']},
  parso: {module: 'parso', depends: []},
  'et-xmlfile': {module: 'et_xmlfile', depends: []},
  openpyxl: {module: 'openpyxl', depends: ['et-xmlfile']},
};
for (const [name, {module, depends}] of Object.entries(pure)) {
  if (pinned?.lock.packages[name]) continue;
  const metadata = await (await get(`https://pypi.org/pypi/${name}/json`)).json();
  const released = metadata.info.version;
  if (!/^\d+(?:\.\d+)+$/.test(released)) throw new Error('Se requiere una versión estable de ' + name);
  const wheel = metadata.urls.find((item) => item.filename.startsWith(`${module}-${released}-`) && item.filename.endsWith('-none-any.whl') && !item.yanked);
  if (!wheel || new URL(wheel.url).origin !== 'https://files.pythonhosted.org') throw new Error('Wheel oficial no disponible: ' + name);
  lock.packages[name] = {
    ...lock.packages[name], name, imports: [module], depends, install_dir: 'site', package_type: 'package',
    version: released, file_name: wheel.filename, sha256: wheel.digests.sha256,
  };
  sources[name] = wheel.url;
}
const selected = selectPythonPackages(lock, ['pandas', 'jedi', 'openpyxl', 'scipy', 'sqlalchemy']);
const cache = resolve(root, '.python-packages', version); await mkdir(cache, {recursive: true});
let bytes = 0;
for (const [name, item] of Object.entries(selected)) {
  const url = sources[name] ?? `https://cdn.jsdelivr.net/pyodide/v${version}/full/${item.file_name}`;
  sources[name] = url;
  const target = resolve(cache, item.file_name);
  const hash = (data) => createHash('sha256').update(data).digest('hex');
  let data;
  try {data = await readFile(target);} catch {}
  if (!data || hash(data) !== item.sha256) {
    data = new Uint8Array(await (await get(url)).arrayBuffer());
    if (data.byteLength > 67_108_864 || hash(data) !== item.sha256) throw new Error('Checksum Python incorrecto: ' + name);
    await writeFile(target + '.partial', data); await rename(target + '.partial', target);
  }
  bytes += data.byteLength; console.log(`${name}@${item.version}`);
}
const manifest = {runtimeVersion: version, pythonVersion: lock.info.python, lock: {info: lock.info, packages: selected}, sources};
const digest = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
await mkdir(dirname(target), {recursive: true});
await writeFile(target, '// Generado por npm run prepare:python. Versiones y SHA-256 fijados.\nexport const pythonPackages = ' + JSON.stringify({...manifest, digest}, null, 2) + ' as const;\n');
console.log(`Python preparado: ${Object.keys(selected).length} paquetes, ${(bytes / 1_048_576).toFixed(1)} MiB. Sin descargas durante el build.`);
}
try {await prepare();} catch (reason) {
  console.error('No se pudo preparar Python: ' + (reason?.cause?.message ?? reason?.message ?? String(reason)));
  process.exitCode = 1;
}
