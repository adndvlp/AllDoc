import {test} from 'node:test';
import assert from 'node:assert/strict';
import {IncomingMessage, ServerResponse} from 'node:http';
import {Duplex} from 'node:stream';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRuntimeHandler} from '../scripts/lib/runtime-http.mjs';

// HTTP nativo sobre un socket en memoria: comprueba los bytes de Node sin abrir puertos.
async function responseBytes(handler, method, url) {
  const chunks = [];
  const socket = new Duplex({read() {}, write(chunk, encoding, done) {chunks.push(Buffer.from(chunk)); done();}});
  const request = new IncomingMessage(socket); request.method = method; request.url = url;
  request.httpVersionMajor = 1; request.httpVersionMinor = 1;
  const response = new ServerResponse(request); response.assignSocket(socket);
  const done = new Promise((resolve, reject) => {response.once('finish', resolve); response.once('error', reject);});
  try {
    await handler(request, response); await done;
    const bytes = Buffer.concat(chunks); const end = bytes.indexOf('\r\n\r\n');
    return {headers: bytes.subarray(0, end).toString(), body: bytes.subarray(end + 4)};
  } finally {socket.destroy();}
}

test('HTTP del runtime: GET/HEAD anuncian longitud exacta y entregan binarios intactos sin framing chunked', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'alldoc-http-'));
  try {
    const binary = Buffer.from(Array.from({length: 65537}, (_, index) => index % 256));
    const manifest = {runtimeOrigin: 'http://localhost:4174', csp: "default-src 'none'", files: ['jedi.whl', 'runtime.wasm', 'frame.html']};
    await Promise.all(manifest.files.map(name => writeFile(join(directory, name), binary)));
    const handler = createRuntimeHandler({directory, manifest});
    for (const name of manifest.files) for (const method of ['GET', 'HEAD']) {
      const response = await responseBytes(handler, method, '/' + name);
      assert.match(response.headers, new RegExp('Content-Length: ' + binary.length + '(?:\\r\\n|$)', 'i'));
      assert.doesNotMatch(response.headers, /Transfer-Encoding/i);
      assert.match(response.headers, /Content-Security-Policy: default-src 'none'/);
      assert.deepEqual(response.body, method === 'HEAD' ? Buffer.alloc(0) : binary);
    }
    assert.match((await responseBytes(handler, 'GET', '/otro.whl')).headers, /^HTTP\/1\.1 404/);
    assert.match((await responseBytes(handler, 'POST', '/jedi.whl')).headers, /^HTTP\/1\.1 405/);
  } finally {await rm(directory, {recursive: true, force: true});}
});
