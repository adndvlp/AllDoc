import {createServer} from 'node:http';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {buildRuntime} from './build-practice-runtime.mjs';
import {createRuntimeHandler} from './lib/runtime-http.mjs';

// Este servidor entrega archivos. Las consultas se ejecutan exclusivamente en el navegador.
const ui = process.argv[2] === 'ui';
const serve = ui || process.argv[2] === 'serve';
const appPort = ui ? 4173 : 3000;
const runtimePort = ui ? 4174 : 3001;
const appOrigin = process.env.PRACTICE_APP_ORIGIN ?? `http://127.0.0.1:${appPort}`;
const runtimeOrigin = process.env.PRACTICE_ORIGIN ?? `http://localhost:${runtimePort}`;
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = await buildRuntime({appOrigin, runtimeOrigin});
const server = createServer(createRuntimeHandler({directory: resolve(root, '.runtime-build'), manifest}));
await new Promise((yes, no) => {server.once('error', no); server.listen(new URL(runtimeOrigin).port, 'localhost', yes);});
const child = spawn(process.execPath, [resolve(root, 'node_modules/@docusaurus/core/bin/docusaurus.mjs'),
  serve ? 'serve' : 'start', '--host', '127.0.0.1', '--port', String(appPort), '--no-open', ...(ui ? ['--dir', '.ui-build'] : []), ...process.argv.slice(3)],
{stdio: 'inherit', env: {...process.env, PRACTICE_ORIGIN: runtimeOrigin}});
const stop = () => {child.kill('SIGTERM'); server.close();};
process.once('SIGINT', stop); process.once('SIGTERM', stop);
child.once('exit', (code) => {server.close(); process.exitCode = code ?? 1;});
