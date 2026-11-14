import initialize from '@sqlite.org/sqlite-wasm';
import type {Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import {createSQLiteEngine} from './core.ts';
import {isBridgeRequest, type BridgeReply} from '../../isolation/messages.ts';

const scope = self as unknown as {onmessage: ((event: MessageEvent) => void) | null; postMessage(value: unknown): void};
let session: string | null = null;
let engine: ReturnType<typeof createSQLiteEngine> | null = null;
type ReplyBody = BridgeReply extends infer R ? R extends BridgeReply ? Omit<R, 'version' | 'session' | 'id'> : never : never;
scope.onmessage = (event) => {
  const request = event.data;
  if (!session && request?.command === 'init' && typeof request.session === 'string' && isBridgeRequest(request, request.session)) session = request.session;
  if (!session || !isBridgeRequest(request, session)) return;
  const reply = (value: ReplyBody) => scope.postMessage({version: 1, session, id: request.id, ...value});
  void (async () => {
    if (request.command === 'init') {
      if (engine) throw new Error('El motor ya está inicializado');
      const response = await fetch(new URL('@sqlite.org/sqlite-wasm/sqlite3.wasm', import.meta.url), {credentials: 'omit', redirect: 'error'});
      if (!response.ok) throw new Error('No se pudo descargar SQLite');
      const wasmBinary = new Uint8Array(await response.arrayBuffer());
      const sqlite = await (initialize as unknown as (options: object) => Promise<Sqlite3Static>)({wasmBinary, print() {}, printErr() {}});
      if (sqlite.capi.sqlite3_libversion() !== (request.payload as import('../../contracts.ts').RuntimeContext).environment.runtime.version) throw new Error('La versión de SQLite no coincide con el entorno');
      engine = createSQLiteEngine(sqlite);
      // El puente valida el contexto completo antes de entregarlo al motor.
      engine.init((request.payload as import('../../contracts.ts').RuntimeContext).dataset);
    } else {
      if (!engine) throw new Error('Motor sin inicializar');
      switch (request.command) {
        case 'run': engine.run(request.payload as import('../../contracts.ts').RunRequest,
          (event) => reply({kind: 'event', event})); break;
        case 'inspect': reply({kind: 'result', value: engine.inspect()}); return;
        case 'reset': engine.reset(); break;
        case 'dispose': engine.dispose(); engine = null; break;
        default: throw new Error('Comando no disponible');
      }
    }
    reply({kind: 'result'});
  })().catch((reason) => reply({kind: 'failure', message: reason instanceof Error ? reason.message : String(reason)}));
};
