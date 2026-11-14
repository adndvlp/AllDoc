import type {PyodideAPI} from 'pyodide';
import type {CompletionRequest, RunRequest, RuntimeContext} from '../../contracts.ts';
import {isBridgeRequest, type BridgeReply} from '../../isolation/messages.ts';
import {isCompletionResult} from '../../protocol.ts';
import {createPythonEngine, type PythonEngine} from './core.ts';
import {pythonPackages} from './packages.ts';
import {initializePythonVM} from './initialize.ts';

// Webpack emite los assets intactos. El SDK carga su módulo WASM y stdlib desde
// este directorio; los wheels compatibles se añaden al manifiesto del runtime.
const assets = [new URL('pyodide/pyodide.mjs', import.meta.url), new URL('pyodide/pyodide.asm.mjs', import.meta.url),
  new URL('pyodide/pyodide.asm.wasm', import.meta.url), new URL('pyodide/python_stdlib.zip', import.meta.url)];
const scope = self as unknown as {onmessage: ((event: MessageEvent) => void) | null; postMessage(value: unknown): void};
type Body = BridgeReply extends infer R ? R extends BridgeReply ? Omit<R, 'version' | 'session' | 'id'> : never : never;
let session: string | null = null; let engine: PythonEngine | null = null; let busy = false;
scope.onmessage = ({data: request}) => {
  if (!session && request?.command === 'init' && typeof request.session === 'string' && isBridgeRequest(request, request.session)) session = request.session;
  if (!session || !isBridgeRequest(request, session)) return;
  const reply = (body: Body) => scope.postMessage({version: 1, session, id: request.id, ...body});
  if (busy) {reply({kind: 'failure', message: 'El motor Python está ocupado'}); return;}
  busy = true;
  void (async () => {
    if (request.command === 'init') {
      const context = request.payload as RuntimeContext;
      if (engine || context.profile.runtimeId !== 'pyodide') throw new Error('Contexto Python incompatible');
      if (assets.some((url) => url.origin !== self.location.origin)) throw new Error('Assets Python fuera del origen');
      const module = await import(/* webpackIgnore: true */ assets[0].href) as {loadPyodide: typeof import('pyodide').loadPyodide};
      const indexURL = new URL('./', assets[0]).href;
      const pyodide = await initializePythonVM(module.loadPyodide, {indexURL, packageBaseUrl: indexURL,
        lockFileContents: JSON.stringify(pythonPackages.lock),
        jsglobals: Object.freeze({}), stdout() {}, stderr() {}});
      if (pyodide.version !== context.environment.runtime.version) throw new Error('Versión de Pyodide incompatible');
      engine = createPythonEngine(pyodide); await engine.init(context.dataset);
      const document = 'import pandas as pd\npd.Da';
      const check = engine.complete({requestId: 'prepare', generation: 0, revision: 0, workspaceId: 'prepare',
        file: 'main.py', document, position: document.length, schema: engine.inspect()});
      if (!check.items.some((item) => item.label === 'DataFrame')) throw new Error('Jedi no pudo validar el análisis de pandas');
    } else {
      if (!engine) throw new Error('Python sin inicializar');
      switch (request.command) {
        case 'run': {
          const payload = request.payload as RunRequest;
          if (payload.files.some((file) => file.languageId !== 'python')) throw new Error('Lenguaje incompatible');
          await engine.run(payload, (event) => reply({kind: 'event', event})); break;
        }
        case 'inspect': reply({kind: 'result', value: engine.inspect()}); return;
        case 'complete': {
          const payload = request.payload as CompletionRequest;
          const result = engine.complete(payload);
          if (!isCompletionResult(result, payload)) throw new Error('Sugerencias Python incompatibles');
          reply({kind: 'result', value: result}); return;
        }
        case 'reset': await engine.reset(); break;
        case 'dispose': engine.dispose(); engine = null; break;
        default: throw new Error('Comando Python no disponible');
      }
    }
    reply({kind: 'result'});
  })().catch((reason) => reply({kind: 'failure', message: (reason instanceof Error ? reason.message : String(reason)).slice(0, 2048)}))
    .finally(() => {busy = false;});
};
