import type {CompletionAdapter, CompletionResult, EnvironmentManifest, PracticeEditorContext, PracticeRegistry, RunRequest, RuntimeAdapter, RuntimeEvent, RuntimeSchema, Workspace} from './contracts.ts';
import type {DraftState, DraftStore} from './drafts.ts';
import {isCompletionResult, isRuntimeEvent} from './protocol.ts';

export type SessionSnapshot = Readonly<{
  context: PracticeEditorContext | null; openRequested: boolean; visible: boolean;
  phase: 'hidden' | 'collapsed' | 'loading' | 'ready' | 'running' | 'error';
  generation: number; draft: DraftState | null; schema: RuntimeSchema;
  events: readonly RuntimeEvent[]; notice: string | null; error: string | null;
}>;
export type SessionOptions = {
  registry: PracticeRegistry; drafts: DraftStore;
  bootstrap(context: PracticeEditorContext): Promise<{workspace: Workspace; environment: EnvironmentManifest | null; schema?: RuntimeSchema}>;
  idleMs?: number; timeoutMs?: number; cancelGraceMs?: number; maxOutputBytes?: number;
};
export interface PracticeSessionManager {
  getSnapshot(): SessionSnapshot;
  subscribe(listener: () => void): () => void;
  setContext(context: PracticeEditorContext | null): Promise<void>;
  open(): Promise<void>;
  collapse(): Promise<void>;
  retry(): Promise<void>;
  edit(path: string, content: string): Workspace;
  execute(selection?: RunRequest['selection']): Promise<void>;
  stop(): Promise<void>;
  resetEnvironment(): Promise<void>;
  complete(position: number): Promise<CompletionResult | null>;
  dispose(): Promise<void>;
}
export function createPracticeSessionManager(options: SessionOptions): PracticeSessionManager {
  type Resource = {runtime: RuntimeAdapter; completion: CompletionAdapter; controller: AbortController; retired: boolean; ready: boolean};
  type Run = {request: RunRequest; resource: Resource; accepting: boolean; done: Promise<void>; resolve: () => void;
    timer: ReturnType<typeof setTimeout>; stopping?: Promise<void>; bytes: number};
  let state: SessionSnapshot = Object.freeze({context: null, openRequested: false, visible: false, phase: 'hidden', generation: 0,
    draft: null, schema: {version: 0, entities: []}, events: [], notice: null, error: null});
  const listeners = new Set<() => void>(); const visited = new Set<string>(); const encoder = new TextEncoder();
  let disposed = false; let resource: Resource | null = null; let loading: Promise<void> | null = null;
  let resetting: Promise<void> | null = null;
  let controller: AbortController | null = null; let completionAbort: AbortController | null = null;
  let retirement: Promise<void> = Promise.resolve(); let retirementError: Error | null = null;
  let idle: ReturnType<typeof setTimeout> | undefined; let activeRun: Run | null = null; let sequence = 0;
  const publish = (patch: Partial<SessionSnapshot>) => {
    if (disposed) return;
    state = Object.freeze({...state, ...patch}); for (const listener of Array.from(listeners)) listener();
  };
  const live = (generation: number) => !disposed && state.generation === generation;
  const phase = () => !state.context ? 'hidden' as const : !state.openRequested ? 'collapsed' as const : 'ready' as const;
  const bounded = async <T>(promise: Promise<T>, ms = options.cancelGraceMs ?? 250): Promise<T> => {
    let timer: ReturnType<typeof setTimeout>;
    try {return await Promise.race([promise, new Promise<never>((_, reject) => {timer = setTimeout(() => reject(new Error('El adaptador no responde')), ms);})]);}
    finally {clearTimeout(timer!);}
  };
  function release(target: Resource): Promise<void> {
    if (target.retired) return retirement;
    target.retired = true; target.controller.abort();
    if (resource === target) resource = null;
    // Una liberación fallida bloquea crear otro motor: nunca asumimos que el anterior murió.
    retirement = retirement.then(async () => {
      try {await bounded(Promise.all([target.runtime.dispose(), target.completion.dispose()]).then(() => {}));}
      catch (error) {retirementError = error instanceof Error ? error : new Error(String(error));}
    });
    return retirement;
  }
  function finish(run: Run, status: 'success' | 'error' | 'cancelled' | 'timeout', environmentReset: boolean) {
    clearTimeout(run.timer); run.accepting = false;
    if (activeRun === run) activeRun = null;
    if (live(run.request.generation)) {
      const end: RuntimeEvent = {protocolVersion: 1, runId: run.request.runId, generation: run.request.generation,
        revision: run.request.revision, type: 'end', status, environmentReset};
      publish({phase: phase(), events: Object.freeze([...state.events, Object.freeze(end)]),
        ...(environmentReset ? {notice: `${state.notice ? state.notice + ' ' : ''}Entorno reiniciado; tu código se conserva.`} : {})});
    }
    run.resolve();
  }
  function stopRun(run: Run, status: 'cancelled' | 'timeout' | 'error'): Promise<void> {
    if (run.stopping) return run.stopping;
    run.accepting = false; clearTimeout(run.timer);
    run.stopping = (async () => {
      let reset = true;
      try {reset = (await bounded(run.resource.runtime.cancel(run.request.runId))).environmentReset;}
      catch {await release(run.resource);}
      // El contrato cancel devuelve si perdió su entorno; reconstruir antes del próximo run.
      if (reset) await release(run.resource);
      finish(run, status, reset);
    })();
    return run.stopping;
  }
  function invalidate() {
    clearTimeout(idle); controller?.abort(); completionAbort?.abort(); loading = null; resetting = null;
    publish({generation: state.generation + 1});
  }
  async function retireCurrent() {
    const running = activeRun; const target = resource;
    if (running) await stopRun(running, 'cancelled');
    if (target) await release(target); await retirement;
  }
  const unsubscribe = options.drafts.subscribe(() => {
    const key = state.context?.workspaceKey;
    if (key && state.draft) publish({draft: options.drafts.get(key) ?? state.draft});
  });

  async function prepare(duringReset = false): Promise<void> {
    if (disposed || !state.context || !state.openRequested) return;
    if (resetting && !duringReset) return resetting;
    if (resource?.ready) {publish({phase: activeRun ? 'running' : 'ready'}); return;}
    if (loading) return loading;
    const ctx = state.context; const generation = state.generation;
    const abort = new AbortController(); controller = abort;
    publish({phase: 'loading', error: null});
    const task = (async () => {
      let own: Resource | null = null; let allocatedCompletion: CompletionAdapter | null = null;
      try {
        const seed = await options.bootstrap(ctx);
        if (!live(generation) || abort.signal.aborted) return;
        if (seed.workspace.id !== ctx.workspaceKey || (seed.environment && seed.workspace.environmentVersion !== seed.environment.version)) throw new Error('Contexto inicial incompatible');
        const draft = await options.drafts.load(seed.workspace);
        if (!live(generation) || abort.signal.aborted) return;
        publish({draft, ...(draft.environmentChanged ? {notice: 'El entorno cambió de versión; tu código se conserva.'} : {})});
        if (ctx.profile.availability === 'planned') {
          publish({phase: 'ready', schema: seed.schema ?? {version: 0, entities: []}}); return;
        }
        if (!seed.environment) throw new Error('Falta el manifiesto del entorno');
        const factories = await options.registry.loadProviders(ctx.profile.id);
        if (!live(generation) || abort.signal.aborted) return;
        const dataset = await factories.createDataset().materialize(ctx.profile.defaultDataset, ctx.profile.runtimeId, abort.signal);
        await retirement;
        if (!live(generation) || abort.signal.aborted) return;
        if (retirementError) throw retirementError;
        if (dataset.reference.id !== ctx.profile.defaultDataset.id || dataset.reference.version !== ctx.profile.defaultDataset.version) throw new Error('Dataset incompatible');
        // Publicar el recurso antes de await init permite disponer una inicialización cancelada.
        allocatedCompletion = factories.createCompletion();
        own = {runtime: factories.createRuntime(), completion: allocatedCompletion, controller: abort, ready: false, retired: false};
        resource = own;
        await own.runtime.init({profile: ctx.profile, environment: seed.environment, dataset}, abort.signal);
        if (!live(generation) || abort.signal.aborted || own.retired) return;
        const schema = await own.runtime.inspect();
        if (!live(generation) || abort.signal.aborted || own.retired) return;
        own.ready = true;
        publish({phase: 'ready', schema,
          ...(visited.has(ctx.workspaceKey) ? {notice: 'Entorno restaurado con los datos iniciales; tu código se conserva.'} : {})});
        visited.add(ctx.workspaceKey);
      } catch (error) {
        const cancelled = abort.signal.aborted;
        if (own && !own.retired) await release(own);
        else if (!own && allocatedCompletion) await bounded(allocatedCompletion.dispose()).catch(() => {});
        if (live(generation) && !cancelled) publish({phase: 'error', error: error instanceof Error ? error.message : String(error)});
      }
    })();
    loading = task;
    try {await task;} finally {if (loading === task) loading = null;}
  }
  async function refresh(target: Resource, generation: number, runSequence: number) {
    try {
      const schema = await target.runtime.inspect();
      if (live(generation) && resource === target && !target.retired && !activeRun && sequence === runSequence) publish({schema});
    } catch {if (live(generation) && resource === target) publish({notice: 'No se pudo actualizar el esquema.'});}
  }
  const manager: PracticeSessionManager = {
    getSnapshot: () => state,
    subscribe(listener) {listeners.add(listener); return () => {listeners.delete(listener);};},
    async setContext(context) {
      if (disposed) return;
      if (context?.workspaceKey === state.context?.workspaceKey) {publish({context}); return;}
      const previous = state.context?.workspaceKey; invalidate();
      publish({context, draft: null, events: [], schema: {version: 0, entities: []}, error: null, notice: null,
        visible: context !== null && state.openRequested, phase: !context ? 'hidden' : state.openRequested ? 'loading' : 'collapsed'});
      // Encolar el último texto no bloquea publicar el contexto nuevo.
      if (previous && options.drafts.get(previous)) void options.drafts.flush(previous);
      const generation = state.generation;
      await retireCurrent();
      if (live(generation)) await prepare();
    },
    async open() {
      if (disposed) return;
      clearTimeout(idle); publish({openRequested: true, visible: state.context !== null}); await prepare();
    },
    async collapse() {
      if (disposed) return;
      const pending = state.phase === 'loading';
      publish({openRequested: false, visible: false, phase: state.context ? 'collapsed' : 'hidden'});
      if (pending) {invalidate(); await retireCurrent();}
      else {
        if (activeRun) await stopRun(activeRun, 'cancelled');
        idle = setTimeout(() => {void retireCurrent();}, options.idleMs ?? 60_000);
        (idle as unknown as {unref?: () => void}).unref?.();
      }
      if (state.context && options.drafts.get(state.context.workspaceKey)) await options.drafts.flush(state.context.workspaceKey);
    },
    async retry() {if (!disposed) {invalidate(); await retireCurrent(); await prepare();}},
    edit(path, content) {
      if (!state.draft || disposed) throw new Error('No hay borrador activo');
      completionAbort?.abort(); return options.drafts.edit(state.draft.workspace.id, path, content);
    },
    async execute(selection) {
      if (disposed || activeRun || !state.openRequested || state.context?.profile.availability !== 'enabled') return;
      const generation = state.generation;
      await prepare();
      if (!live(generation) || !resource?.ready || !state.draft || activeRun || !state.openRequested) return;
      const value = state.draft.workspace; const file = value.files.find((entry) => entry.path === value.activeFile)!;
      if (selection && (!Number.isSafeInteger(selection.from) || !Number.isSafeInteger(selection.to)
        || selection.from < 0 || selection.to <= selection.from || selection.to > file.content.length)) throw new Error('Selección inválida');
      completionAbort?.abort(); const target = resource;
      const request: RunRequest = Object.freeze({runId: `run-${++sequence}`, generation: state.generation,
        workspaceId: value.id, revision: value.revision, files: value.files, entryFile: value.activeFile,
        ...(selection ? {selection: Object.freeze({...selection})} : {})});
      let resolve!: () => void; const done = new Promise<void>((yes) => {resolve = yes;});
      const run: Run = {request, resource: target, accepting: true, done, resolve, bytes: 0,
        timer: setTimeout(() => {void stopRun(run, 'timeout');}, options.timeoutMs ?? 10_000)};
      activeRun = run; publish({phase: 'running', events: [], notice: null, error: null});
      void (async () => {
        try {
          for await (const event of target.runtime.run(request)) {
            if (!run.accepting || !live(request.generation)) break;
            // Identidades ajenas se descartan; payload inválido del run actual es un error.
            if (event && (event.runId !== request.runId || event.generation !== request.generation || event.revision !== request.revision)) continue;
            if (!isRuntimeEvent(event, request)) {publish({notice: 'Respuesta inválida del protocolo.'}); await stopRun(run, 'error'); return;}
            if (event.type === 'end') {
              run.accepting = false; clearTimeout(run.timer);
              run.stopping = (async () => {
                if (event.environmentReset) await release(target);
                finish(run, event.status, event.environmentReset);
                if (!event.environmentReset) void refresh(target, request.generation, sequence);
              })();
              await run.stopping;
              return;
            }
            const bytes = encoder.encode(JSON.stringify(event)).byteLength;
            if (run.bytes + bytes > (options.maxOutputBytes ?? 1_048_576)) {
              await stopRun(run, 'cancelled');
              if (live(request.generation)) publish({notice: 'Salida truncada: se alcanzó el límite de la ejecución.'}); return;
            }
            run.bytes += bytes;
            // Separar la salida del adaptador impide mutaciones posteriores del mismo objeto.
            publish({events: Object.freeze([...state.events, structuredClone(event)])});
          }
          if (run.accepting) {await stopRun(run, 'error'); if (live(request.generation)) publish({notice: 'El motor terminó sin un evento de fin.'});}
        } catch (error) {
          if (run.accepting && live(request.generation)) {
            publish({error: error instanceof Error ? error.message : String(error)}); await stopRun(run, 'error');
          }
        }
      })();
      await done;
    },
    async stop() {if (activeRun) await stopRun(activeRun, 'cancelled');},
    async resetEnvironment() {
      if (disposed || !state.openRequested || state.context?.profile.availability !== 'enabled') return;
      if (resetting) return resetting;
      const generation = state.generation;
      // Reservar el reinicio antes del primer await, también frente a llamadas simultáneas.
      const task = (async () => {
        if (activeRun) await stopRun(activeRun, 'cancelled'); await prepare(true);
        if (!live(generation) || !state.openRequested) return;
        const target = resource;
        if (!target?.ready) return;
        target.ready = false; publish({phase: 'loading'});
        try {
          await target.runtime.reset(target.controller.signal);
          if (live(generation) && resource === target) {
            target.ready = true; publish({phase: 'ready', events: [], notice: 'Entorno reiniciado; tu código se conserva.'});
            void refresh(target, generation, sequence);
          }
        } catch (error) {
          await release(target);
          if (live(generation)) publish({phase: 'error', error: error instanceof Error ? error.message : String(error)});
        }
      })();
      resetting = task;
      try {await task;} finally {if (resetting === task) resetting = null;}
    },
    async complete(position) {
      const target = resource; const value = state.draft?.workspace;
      if (!target?.ready || !value || activeRun || !state.openRequested || disposed) return null;
      const file = value.files.find((entry) => entry.path === value.activeFile)!;
      if (!Number.isSafeInteger(position) || position < 0 || position > file.content.length) return null;
      completionAbort?.abort(); const abort = new AbortController(); completionAbort = abort;
      const request = {requestId: `completion-${++sequence}`, generation: state.generation, workspaceId: value.id,
        revision: value.revision, file: file.path, document: file.content, position, schema: state.schema};
      try {
        const result = await target.completion.complete(request, abort.signal);
        return !abort.signal.aborted && live(request.generation) && resource === target
          && state.draft?.workspace.revision === request.revision && isCompletionResult(result, request) ? result : null;
      } catch {return null;}
    },
    async dispose() {
      if (disposed) return;
      invalidate(); unsubscribe(); disposed = true;
      await retireCurrent(); await options.drafts.flush(); listeners.clear();
    },
  };
  return manager;
}
