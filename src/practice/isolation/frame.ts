import {isBridgeReply, isBridgeRequest} from './messages.ts';
import {trustedMessageOrigin} from './policy.ts';

declare const __APP_ORIGIN__: string;
let connected = false;
window.addEventListener('message', (event) => {
  const data = event.data;
  if (connected || event.source !== parent || !trustedMessageOrigin(event.origin, __APP_ORIGIN__)
    || data?.version !== 1 || data.kind !== 'connect' || typeof data.session !== 'string'
    || data.session.length > 256 || !data.session || event.ports.length !== 1) return;
  connected = true;
  const port = event.ports[0]; const session: string = data.session;
  let worker: Worker | null = null;
  const pending = new Set<number>();
  const failure = (id: number, message: string) => {pending.delete(id); port.postMessage({version: 1, session, id, kind: 'failure', message});};
  port.onmessage = ({data: request}) => {
    if (!isBridgeRequest(request, session) || pending.has(request.id) || pending.size > 8) return;
    pending.add(request.id);
    if (request.command === 'init') {
      if (worker) {failure(request.id, 'Motor ya inicializado'); return;}
      const runtimeId = (request.payload as import('../contracts.ts').RuntimeContext).profile.runtimeId;
      worker = runtimeId === 'pyodide'
        ? new Worker(new URL('../adapters/python/worker.ts', import.meta.url), {name: 'alldoc-python'})
        : runtimeId === 'ironcalc'
          ? new Worker(new URL('../adapters/excel/worker.ts', import.meta.url), {name: 'alldoc-excel'})
          : runtimeId === 'webr'
            ? new Worker(new URL('../adapters/r/worker.ts', import.meta.url), {name: 'alldoc-r'})
            : new Worker(new URL('../adapters/sqlite/worker.ts', import.meta.url), {name: 'alldoc-sqlite'});
      worker.onmessage = ({data: reply}) => {
        if (!isBridgeReply(reply, session) || !pending.has(reply.id)) return;
        if (reply.kind !== 'event') pending.delete(reply.id);
        port.postMessage(reply);
      };
      worker.onerror = (error) => {
        error.preventDefault();
        for (const id of [...pending]) failure(id, 'No se pudo cargar el motor de práctica');
        worker?.terminate(); worker = null;
      };
    }
    if (request.command === 'cancel' || request.command === 'dispose') {
      worker?.terminate(); worker = null;
      for (const id of [...pending]) if (id !== request.id) failure(id, 'Motor detenido');
      pending.delete(request.id); port.postMessage({version: 1, session, id: request.id, kind: 'result', value: {environmentReset: true}}); return;
    }
    if (!worker) {failure(request.id, 'Motor no disponible'); return;}
    worker.postMessage(request);
  };
  port.start();
  window.addEventListener('pagehide', () => {worker?.terminate(); port.close();}, {once: true});
});
