import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

/** Solo sirve los archivos estáticos autorizados por el manifiesto. */
export function createRuntimeHandler({directory, manifest}) {
  const allowed = new Set(manifest.files);
  return async (request, response) => {
    // El servidor local entrega cada descarga binaria en una conexión propia.
    response.setHeader('Connection', 'close');
    if (request.method !== 'GET' && request.method !== 'HEAD') {response.writeHead(405).end(); return;}
    const name = new URL(request.url, manifest.runtimeOrigin).pathname.slice(1);
    if (!allowed.has(name)) {response.writeHead(404).end(); return;}
    try {
      const bytes = await readFile(resolve(directory, name));
      const type = name.endsWith('.wasm') ? 'application/wasm' : /\.[cm]?js$/.test(name) ? 'text/javascript'
        : /\.(?:zip|whl)$/.test(name) ? 'application/zip' : /\.(?:gz|tgz|so)$/.test(name) ? 'application/octet-stream'
          : name.endsWith('.html') ? 'text/html' : 'text/plain';
      response.writeHead(200, {'Content-Type': type, 'Content-Length': bytes.length, 'Content-Security-Policy': manifest.csp,
        'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff',
        'Cache-Control': name === 'frame.html' ? 'no-store' : 'public, max-age=31536000, immutable'});
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch {response.writeHead(500).end();}
  };
}
