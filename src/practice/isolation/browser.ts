import type {CompletionAdapter, CompletionRequest, RunRequest, RuntimeAdapter, RuntimeContext, RuntimeEvent} from '../contracts.ts';
import {isBridgeReply, isBridgeRequest, isRuntimeSchema, type Command} from './messages.ts';
import {validateRuntimeLocation} from './policy.ts';

import {isCompletionResult} from '../protocol.ts';

export type IsolatedRuntime = RuntimeAdapter & Pick<CompletionAdapter, 'complete'>;
/** AllDoc recibe datos: los motores y el análisis se ejecutan en el otro origen. */
export function createIsolatedRuntime(options: {label: string; hardReset?: boolean; startupTimeoutMs?: number}): IsolatedRuntime {
  let frame: HTMLIFrameElement | null = null; let port: MessagePort | null = null;
  let session = ''; let sequence = 0; let context: RuntimeContext | null = null;
  let analysis: Promise<unknown> = Promise.resolve(); let latestAnalysis = 0;
  const pending = new Map<number, {resolve(value: unknown): void; reject(error: Error): void; event?(event: RuntimeEvent): void; timer: ReturnType<typeof setTimeout>}>();
  function dispose() {
    port?.close(); port = null; frame?.remove(); frame = null;
    for (const item of pending.values()) {clearTimeout(item.timer); item.reject(new Error('Motor detenido'));}
    pending.clear();
  }
  function rpc(command: Command, payload?: unknown, event?: (event: RuntimeEvent) => void): Promise<unknown> {
    const id = ++sequence; const request = {version: 1, session, id, command, ...(payload === undefined ? {} : {payload})};
    if (!port || !isBridgeRequest(request, session)) return Promise.reject(new Error('Solicitud de práctica incompatible'));
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {pending.delete(id); reject(new Error('El motor ' + options.label + ' no respondió')); if (command !== 'complete') dispose();}, command === 'run' ? 15_000 : command === 'complete' ? 10_000 : options.startupTimeoutMs ?? 30_000);
      pending.set(id, {resolve, reject, event, timer}); port!.postMessage(request);
    });
  }
  const adapter: IsolatedRuntime = {
    async init(value: RuntimeContext, signal: AbortSignal) {
      context = value;
      dispose(); signal.throwIfAborted();
      const endpoint = document.querySelector<HTMLMetaElement>('meta[name="alldoc-practice-origin"]')?.content;
      if (!endpoint) throw new Error('Falta configurar el origen aislado de práctica');
      const location = validateRuntimeLocation(window.location.origin, endpoint);
      session = crypto.randomUUID();
      const element = document.createElement('iframe'); frame = element;
      element.hidden = true; element.title = 'Motor ' + options.label + ' aislado'; element.dataset.practiceRuntime = '';
      element.setAttribute('sandbox', 'allow-scripts allow-same-origin'); element.referrerPolicy = 'no-referrer';
      element.src = location.runtimeOrigin + '/frame.html';
      const channel = new MessageChannel(); port = channel.port1;
      port.onmessage = ({data}) => {
        if (!isBridgeReply(data, session)) return;
        const item = pending.get(data.id); if (!item) return;
        if (data.kind === 'event') {item.event?.(data.event as RuntimeEvent); return;}
        clearTimeout(item.timer); pending.delete(data.id);
        if (data.kind === 'failure') item.reject(new Error(data.message)); else item.resolve(data.value);
      };
      port.start();
      const abort = () => dispose(); signal.addEventListener('abort', abort, {once: true});
      try {
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(() => {clean(); reject(new Error('No se pudo abrir el origen de práctica'));}, 15_000);
          const cancelled = () => {clean(); reject(signal.reason ?? new Error('Inicialización cancelada'));};
          const clean = () => {clearTimeout(timer); signal.removeEventListener('abort', cancelled);};
          signal.addEventListener('abort', cancelled, {once: true});
          element.onload = () => {clean(); element.contentWindow!.postMessage({version: 1, kind: 'connect', session}, location.runtimeOrigin, [channel.port2]); resolve();};
          element.onerror = () => {clean(); reject(new Error('No se pudo cargar el origen de práctica'));};
          document.body.append(element);
        });
        signal.throwIfAborted(); await rpc('init', value); signal.throwIfAborted();
      } catch (error) {dispose(); throw error;} finally {signal.removeEventListener('abort', abort);}
    },
    async *run(request: RunRequest) {
      const events: RuntimeEvent[] = []; let complete = false; let error: unknown; let wake: (() => void) | null = null;
      const task = rpc('run', request, (event) => {events.push(event); wake?.();})
        .catch((reason) => {error = reason;}).finally(() => {complete = true; wake?.();});
      while (!complete || events.length) {
        const event = events.shift(); if (event) yield event;
        else await new Promise<void>((resolve) => {wake = resolve;});
      }
      await task; if (error) throw error;
    },
    async cancel() {dispose(); return {environmentReset: true};},
    async reset(signal) {
      signal.throwIfAborted();
      if (options.hardReset) {if (!context) throw new Error('Falta el contexto de práctica'); await adapter.init(context, signal);}
      else await rpc('reset');
      signal.throwIfAborted();
    },
    async inspect() {const value = await rpc('inspect'); if (!isRuntimeSchema(value)) throw new Error('Esquema de práctica incompatible'); return value;},
    async complete(request: CompletionRequest, signal: AbortSignal) {
      signal.throwIfAborted(); const ticket = ++latestAnalysis; const ownSession = session;
      const task = analysis.catch(() => {}).then(async () => {
        signal.throwIfAborted();
        if (ticket !== latestAnalysis || session !== ownSession || !port) throw new Error('Análisis sustituido');
        const result = await rpc('complete', request);
        if (!isCompletionResult(result, request)) throw new Error('Sugerencias incompatibles'); return result;
      });
      analysis = task.catch(() => {});
      return new Promise((resolve, reject) => {
        const aborted = () => {clean(); reject(signal.reason ?? new Error('Análisis cancelado'));};
        const clean = () => signal.removeEventListener('abort', aborted);
        signal.addEventListener('abort', aborted, {once: true});
        task.then((result) => {clean(); resolve(result);}, (error) => {clean(); reject(error);});
      });
    },
    async dispose() {context = null; dispose();},
  };
  return adapter;
}
