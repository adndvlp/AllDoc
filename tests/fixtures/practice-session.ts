import type {AdapterFactories, CompletionRequest, CompletionResult, EnvironmentManifest, PracticeContext, RunRequest, RuntimeAdapter, RuntimeEvent, Workspace} from '../../src/practice/contracts.ts';
import type {DraftRepository, RecoveryDraft, StoredDraft} from '../../src/practice/drafts.ts';
import {createPracticeRegistry} from '../../src/practice/registry.ts';
import {sqlProfile} from './practice.ts';

export function deferred<T = void>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {resolve = yes; reject = no;});
  return {promise, resolve, reject};
}
export async function until(predicate: () => boolean) {
  const end = Date.now() + 2000;
  while (!predicate()) {
    if (Date.now() > end) throw new Error('La condición no se cumplió');
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}
export function context(tool = 'sql', concept = 'select'): PracticeContext {
  const profile = tool === 'sql' ? sqlProfile : {...sqlProfile, id: 'python-pandas', toolKey: 'analisis-de-datos/pandas', languageId: 'python', runtimeId: 'pyodide'};
  return {conceptId: `${profile.toolKey}/${concept}`, conceptSlug: `/apuntes/${profile.toolKey}/${concept}`,
    toolKey: profile.toolKey, profile, workspaceKey: JSON.stringify([profile.toolKey, profile.id, profile.defaultDataset.id, profile.defaultDataset.version])};
}
export function workspace(ctx = context(), content = ctx.profile.languageId === 'sql' ? 'SELECT * FROM productos;' : 'productos.head()'): Workspace {
  const path = ctx.profile.languageId === 'sql' ? 'main.sql' : 'main.py';
  return {id: ctx.workspaceKey, toolKey: ctx.toolKey, profileId: ctx.profile.id, dataset: ctx.profile.defaultDataset,
    files: [{path, languageId: ctx.profile.languageId, content}], activeFile: path, revision: 0, environmentVersion: 'test-env@1'};
}
export const environment: EnvironmentManifest = {version: 'test-env@1', runtime: {id: 'test-only', version: '1'}, packages: []};
export function memoryRepository() {
  const records = new Map<string, StoredDraft>();
  const recoveries: RecoveryDraft[] = [];
  const calls = {reads: 0, writes: 0, closes: 0};
  const repository: DraftRepository = {
    async read(id) {calls.reads++; return structuredClone(records.get(id) ?? null);},
    async write(value, expected, savedAt) {
      calls.writes++;
      const current = records.get(value.id);
      if ((current?.storageRevision ?? null) !== expected) {
        const recovery = {id: `recovery-${recoveries.length}`, workspaceId: value.id, savedAt, workspace: structuredClone(value)};
        recoveries.push(recovery);
        return {status: 'conflict', recoveryId: recovery.id};
      }
      const record: StoredDraft = {formatVersion: 1, storageRevision: (expected ?? 0) + 1, savedAt, workspace: structuredClone(value)};
      records.set(value.id, record);
      return {status: 'saved', record};
    },
    async recoveries(id) {return structuredClone(recoveries.filter((item) => item.workspaceId === id));},
    close() {calls.closes++;},
  };
  return {repository, records, recoveries, calls};
}

/** Dobles controlados: no ejecutan SQL/Python ni habilitan perfiles de producción. */
export function engineFixture() {
  const calls = {created: 0, active: 0, maxActive: 0, init: 0, disposed: 0, cancelled: 0, runs: [] as RunRequest[], resets: 0, completion: [] as CompletionRequest[]};
  let nextInit: Promise<void> | undefined;
  let nextCompletion: Promise<CompletionResult> | undefined;
  let nextCancel: Promise<{environmentReset: boolean}> | undefined;
  let nextReset: Promise<void> | undefined;
  let nextDispose: Promise<void> | undefined;
  let nextInspect: Promise<import('../../src/practice/contracts.ts').RuntimeSchema> | undefined;
  const queues: {request: RunRequest; events: RuntimeEvent[]; wake: (() => void) | null; closed: boolean}[] = [];
  const factories: AdapterFactories = {
    createRuntime() {
      calls.created++; calls.active++; calls.maxActive = Math.max(calls.maxActive, calls.active);
      let disposed = false;
      const runtime: RuntimeAdapter = {
        async init() {calls.init++; const wait = nextInit; nextInit = undefined; await wait;},
        async *run(request) {
          calls.runs.push(request);
          const queue = {request, events: [] as RuntimeEvent[], wake: null as (() => void) | null, closed: false};
          queues.push(queue);
          while (!queue.closed) {
            const event = queue.events.shift();
            if (event) yield event;
            else await new Promise<void>((resolve) => {queue.wake = resolve;});
          }
        },
        async cancel() {calls.cancelled++; const wait = nextCancel; nextCancel = undefined; return wait ? await wait : {environmentReset: true};},
        async reset() {calls.resets++; const wait = nextReset; nextReset = undefined; await wait;},
        async inspect() {const wait = nextInspect; nextInspect = undefined; return wait ? await wait : {version: calls.runs.length, entities: []};},
        async dispose() {const wait = nextDispose; nextDispose = undefined; await wait; if (!disposed) {disposed = true; calls.disposed++; calls.active--;}}
      };
      return runtime;
    },
    createCompletion: () => ({async complete(request) {
      calls.completion.push(request); const wait = nextCompletion; nextCompletion = undefined;
      return wait ? await wait : {...request, from: request.position, to: request.position, items: [{label: 'productos', insertText: 'productos'}]};
    }, async dispose() {}}),
    createDataset: () => ({async materialize(reference) {return {reference, files: [], bootstrap: '', schema: {version: 0, entities: []}};}}),
  };
  const registry = createPracticeRegistry(['sql', 'pandas'].map((tool) => ({profile: context(tool).profile,
    loaders: {runtime: async () => factories.createRuntime, completion: async () => factories.createCompletion, dataset: async () => factories.createDataset}})));
  return {registry, calls, factories, deferInit: (promise: Promise<void>) => {nextInit = promise;},
    deferCompletion: (promise: Promise<CompletionResult>) => {nextCompletion = promise;},
    deferCancel: (promise: Promise<{environmentReset: boolean}>) => {nextCancel = promise;},
    deferReset: (promise: Promise<void>) => {nextReset = promise;},
    deferDispose: (promise: Promise<void>) => {nextDispose = promise;},
    deferInspect: (promise: Promise<import('../../src/practice/contracts.ts').RuntimeSchema>) => {nextInspect = promise;},
    emit(index: number, event: Record<string, unknown>) {
      const queue = queues[index];
      queue.events.push({protocolVersion: 1, runId: queue.request.runId, generation: queue.request.generation, revision: queue.request.revision, ...event} as RuntimeEvent);
      queue.wake?.(); queue.wake = null;
    },
    finish(index: number) {queues[index].closed = true; queues[index].wake?.();},
  };
}
