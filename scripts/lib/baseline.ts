import {createHash} from 'node:crypto';
import {readFile, readdir, mkdir, copyFile, stat} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
import {gzipSync} from 'node:zlib';

export const sha256 = (value: string | Uint8Array): string => createHash('sha256').update(value).digest('hex');

export async function filesUnder(directory: string): Promise<string[]> {
  let entries;
  try { entries = await readdir(directory, {withFileTypes: true}); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error; }
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(filename));
    else if (entry.isFile()) files.push(filename);
  }
  return files;
}

export async function sourceFingerprint(root: string) {
  const directories = ['src', 'docs', 'static', 'i18n'];
  const rootFiles = (await readdir(root)).filter((name) =>
    /^(package(-lock)?\.json|docusaurus\.config\.[cm]?[jt]s|sidebars\.[jt]s|babel\.config\.[cm]?[jt]s|tsconfig\.json)$/.test(name));
  const filenames = [...rootFiles.map((name) => path.join(root, name))];
  for (const directory of directories) filenames.push(...await filesUnder(path.join(root, directory)));
  const files = [];
  for (const filename of filenames.sort()) {
    files.push({path: path.relative(root, filename).split(path.sep).join('/'), sha256: sha256(await readFile(filename))});
  }
  return {sha256: sha256(JSON.stringify(files)), files};
}

export function summarize(values: number[]) {
  if (values.some((value) => !Number.isFinite(value) || value < 0)) throw new Error('Muestra de tiempo inválida');
  const sorted = [...values].sort((a, b) => a - b);
  const percentile = (p: number) => sorted.length ? sorted[Math.ceil(sorted.length * p) - 1] : null;
  return {
    count: sorted.length,
    min: sorted[0] ?? null,
    median: percentile(0.5),
    p95: percentile(0.95),
    max: sorted.at(-1) ?? null,
  };
}

export type Asset = {path: string; bytes: number; gzipBytes: number; sha256: string};

export function declaredAssets(html: string): string[] {
  const assets = new Set<string>();
  for (const tag of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
    const script = /^<script\b/i.test(tag[0]);
    const attributes = Object.fromEntries([...tag[0].matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), match[2]]));
    if (!script && !['stylesheet', 'preload', 'modulepreload'].includes(attributes.rel)) continue;
    const url = attributes[script ? 'src' : 'href'];
    if (!url || /^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    const filename = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\/+/, '');
    if (filename.split('/').includes('..')) throw new Error('Ruta de asset fuera del build');
    if (!script && attributes.rel !== 'stylesheet' && !/\.(?:js|css)$/.test(filename)) continue;
    assets.add(filename);
  }
  return [...assets].sort();
}

const total = (assets: Asset[]) => ({
  files: assets.length,
  bytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
  gzipBytes: assets.reduce((sum, asset) => sum + asset.gzipBytes, 0),
});

export async function inventoryBuild(directory: string) {
  const assets: Asset[] = [];
  const htmlFiles: string[] = [];
  for (const filename of await filesUnder(directory)) {
    if (!/\.(?:js|css|html)$/.test(filename)) continue;
    const content = await readFile(filename);
    assets.push({path: path.relative(directory, filename).split(path.sep).join('/'), bytes: content.length, gzipBytes: gzipSync(content, {level: 9}).length, sha256: sha256(content)});
    if (filename.endsWith('.html')) htmlFiles.push(filename);
  }
  const byPath = new Map(assets.map((asset) => [asset.path, asset]));
  const pages = [];
  for (const filename of htmlFiles) {
    const references = declaredAssets(await readFile(filename, 'utf8'));
    const missing = references.filter((name) => !byPath.has(name));
    if (missing.length) throw new Error('Assets iniciales ausentes: ' + missing.join(', '));
    const initial = references.map((name) => byPath.get(name)!);
    pages.push({html: path.relative(directory, filename).split(path.sep).join('/'), assets: references, js: total(initial.filter((asset) => asset.path.endsWith('.js'))), css: total(initial.filter((asset) => asset.path.endsWith('.css')))});
  }
  return {
    compression: 'gzip nivel 9, por archivo; no incluye cabeceras HTTP',
    totals: {js: total(assets.filter((asset) => asset.path.endsWith('.js'))), css: total(assets.filter((asset) => asset.path.endsWith('.css'))), html: total(assets.filter((asset) => asset.path.endsWith('.html')))},
    pages,
    assets,
  };
}

export async function archiveUiReferences(root: string, output: string) {
  const source = path.join(root, 'tests/ui/__screenshots__');
  const files = [];
  for (const filename of (await filesUnder(source)).filter((name) => name.endsWith('.png'))) {
    const relative = path.relative(source, filename);
    const destination = path.join(output, 'prior-ui-references', relative);
    await mkdir(path.dirname(destination), {recursive: true});
    await copyFile(filename, destination);
    files.push({path: path.relative(output, destination).split(path.sep).join('/'), sha256: sha256(await readFile(destination))});
  }
  return {provenance: 'Copias de referencias existentes de la suite UI; no son capturas nuevas ni acreditan este hash de fuente.', files};
}

export async function buildFile(root: string, pathname: string): Promise<string | null> {
  const filename = path.resolve(root, '.' + pathname);
  if (filename !== root && !filename.startsWith(root + path.sep)) return null;
  // Con trailingSlash:false, área.html puede coexistir con área/sql/select.html.
  // Un index ausente no debe descartar el HTML hermano de ese directorio.
  const candidates = [filename, path.join(filename, 'index.html'),
    ...(!path.extname(filename) && filename !== root ? [filename + '.html'] : [])];
  for (const candidate of candidates) {
    try {if ((await stat(candidate)).isFile()) return candidate;}
    catch (error) {if (!['ENOENT', 'ENOTDIR'].includes((error as NodeJS.ErrnoException).code ?? '')) throw error;}
  }
  return null;
}

// Servidor propio en un puerto efímero. No reutiliza ni modifica el servidor del usuario.
export async function serveBuild(directory: string) {
  const root = path.resolve(directory);
  const mime: Record<string, string> = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2'};
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url!, 'http://localhost').pathname);
      const filename = await buildFile(root, pathname);
      if (!filename) {response.writeHead(404).end(); return;}
      const content = await readFile(filename);
      const compress = /\.(?:html|css|js|svg|json)$/.test(filename) && /\bgzip\b/.test(request.headers['accept-encoding'] ?? '');
      const body = compress ? gzipSync(content, {level: 9}) : content;
      response.writeHead(200, {'content-type': mime[path.extname(filename)] ?? 'application/octet-stream', 'cache-control': 'no-store', vary: 'Accept-Encoding', 'content-length': body.length, ...(compress ? {'content-encoding': 'gzip'} : {})});
      response.end(body);
    } catch (error) {
      response.writeHead((error as NodeJS.ErrnoException).code === 'ENOENT' ? 404 : 500).end();
    }
  });
  await new Promise<void>((resolve, reject) => {server.once('error', reject); server.listen(0, '127.0.0.1', resolve);});
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No se obtuvo un puerto local');
  return {url: 'http://127.0.0.1:' + address.port, close: () => new Promise<void>((resolve, reject) => {server.close((error) => error ? reject(error) : resolve()); server.closeAllConnections();})};
}
