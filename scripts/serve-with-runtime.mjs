import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {buildRuntime} from './build-practice-runtime.mjs';

// Este servidor entrega archivos. Las consultas se ejecutan exclusivamente en el navegador.
const ui = process.argv[2] === 'ui';
const serve = ui || process.argv[2] === 'serve';
const appPort = ui ? 4173 : 3000;
const runtimePort = ui ? 4174 : 3001;
const appOrigin = process.env.PRACTICE_APP_ORIGIN ?? `http://127.0.0.1:${appPort}`;
const runtimeOrigin = process.env.PRACTICE_ORIGIN ?? `http://localhost:${runtimePort}`;
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = await buildRuntime({appOrigin, runtimeOrigin});
const allowed = new Set(manifest.files);
const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {response.writeHead(405).end(); return;}
  const name = new URL(request.url, runtimeOrigin).pathname.slice(1);
  if (!allowed.has(name)) {response.writeHead(404).end(); return;}
  try {
    const bytes = await readFile(resolve(root, '.runtime-build', name));
    const type = name.endsWith('.wasm') ? 'application/wasm' : /\.[cm]?js$/.test(name) ? 'text/javascript'
      : /\.(?:zip|whl)$/.test(name) ? 'application/zip' : name.endsWith('.html') ? 'text/html' : 'text/plain';
    response.writeHead(200, {'Content-Type': type, 'Content-Security-Policy': manifest.csp,
      'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff',
      'Cache-Control': name === 'frame.html' ? 'no-store' : 'public, max-age=31536000, immutable'});
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch {response.writeHead(500).end();}
});
await new Promise((yes, no) => {server.once('error', no); server.listen(new URL(runtimeOrigin).port, 'localhost', yes);});
const child = spawn(process.execPath, [resolve(root, 'node_modules/@docusaurus/core/bin/docusaurus.mjs'),
  serve ? 'serve' : 'start', '--host', '127.0.0.1', '--port', String(appPort), '--no-open', ...(ui ? ['--dir', '.ui-build'] : []), ...process.argv.slice(3)],
{stdio: 'inherit', env: {...process.env, PRACTICE_ORIGIN: runtimeOrigin}});
const stop = () => {child.kill('SIGTERM'); server.close();};
process.once('SIGINT', stop); process.once('SIGTERM', stop);
child.once('exit', (code) => {server.close(); process.exitCode = code ?? 1;});
