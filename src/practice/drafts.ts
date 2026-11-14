import type {Workspace} from './contracts.ts';
import {counter, datasetReference, identifier, record, text} from './guards.ts';

export const MAX_CODE_BYTES = 1_048_576;
export type StoredDraft = Readonly<{formatVersion: 1; storageRevision: number; savedAt: number; workspace: Workspace; previous?: Workspace | null}>;
export type RecoveryDraft = Readonly<{id: string; workspaceId: string; savedAt: number; workspace: Workspace; previous?: Workspace | null}>;
export type WriteResult = {status: 'saved'; record: StoredDraft} | {status: 'conflict'; recoveryId: string};
export interface DraftRepository {
  read(id: string): Promise<unknown>;
  write(workspace: Workspace, expectedRevision: number | null, savedAt: number, previous?: Workspace | null): Promise<WriteResult>;
  recoveries(id: string): Promise<readonly RecoveryDraft[]>;
  close(): void;
}
export type DraftState = Readonly<{workspace: Workspace; previous: Workspace | null; status: 'clean' | 'dirty' | 'saving' | 'saved' | 'memory' | 'conflict'; environmentChanged: boolean}>;
export interface DraftStore {
  load(seed: Workspace): Promise<DraftState>;
  get(id: string): DraftState | undefined;
  edit(id: string, path: string, content: string): Workspace;
  activate(id: string, path: string): Workspace;
  replace(id: string, code: Pick<Workspace, 'files' | 'activeFile'>): Workspace;
  restorePrevious(id: string): Workspace;
  retryPersistence(id: string): Promise<void>;
  flush(id?: string): Promise<void>;
  subscribe(listener: () => void): () => void;
  close(): Promise<void>;
}
const encoder = new TextEncoder();
const validPath = (value: unknown): value is string => identifier(value) && !value.startsWith('/')
  && !value.includes('\\') && !value.split('/').some((part) => !part || part === '.' || part === '..');

/** Acepta solo el formato de código persistible, nunca heap ni resultados. */
export function copyWorkspace(value: unknown): Workspace {
  if (!record(value) || !identifier(value.toolKey) || !identifier(value.profileId) || !datasetReference(value.dataset)
    || !counter(value.revision) || !identifier(value.environmentVersion) || !validPath(value.activeFile)
    || !Array.isArray(value.files) || !value.files.length || value.files.length > 64) throw new Error('Borrador inválido');
  const dataset = value.dataset as Workspace['dataset'];
  if (value.id !== JSON.stringify([value.toolKey, value.profileId, dataset.id, dataset.version])) throw new Error('Clave de borrador inválida');
  const paths = new Set<string>(); let bytes = 0;
  const files = Array.from(value.files, (file: unknown) => {
    if (!record(file) || !validPath(file.path) || !identifier(file.languageId) || !text(file.content) || paths.has(file.path)) throw new Error('Archivo de borrador inválido');
    paths.add(file.path); bytes += encoder.encode(file.content).byteLength;
    if (bytes > MAX_CODE_BYTES) throw new Error('El código supera 1 MiB');
    return Object.freeze({path: file.path, languageId: file.languageId, content: file.content});
  });
  if (!paths.has(value.activeFile)) throw new Error('Archivo activo inexistente');
  return Object.freeze({id: value.id as string, toolKey: value.toolKey, profileId: value.profileId,
    dataset: Object.freeze({id: dataset.id, version: dataset.version}), files: Object.freeze(files),
    activeFile: value.activeFile, revision: value.revision, environmentVersion: value.environmentVersion});
}
export function readDraft(value: unknown, id: string): StoredDraft | null {
  if (!record(value) || value.formatVersion !== 1 || !counter(value.storageRevision) || value.storageRevision === 0
    || !counter(value.savedAt)) return null;
  try {
    const workspace = copyWorkspace(value.workspace);
    let previous: Workspace | null = null;
    try {if (value.previous != null) {const candidate = copyWorkspace(value.previous); if (candidate.id === id) previous = candidate;}} catch {}
    return workspace.id === id ? Object.freeze({formatVersion: 1, storageRevision: value.storageRevision, savedAt: value.savedAt, workspace, previous}) : null;
  } catch {return null;}
}
export function createDraftStore(repository: () => DraftRepository, options: {debounceMs?: number; now?: () => number} = {}): DraftStore {
  type Entry = {state: DraftState; expected: number | null; persisted: Workspace | null; timer?: ReturnType<typeof setTimeout>; writing?: Promise<void>};
  const entries = new Map<string, Entry>(); const pending = new Map<string, Promise<DraftState>>();
  const listeners = new Set<() => void>(); let adapter: DraftRepository | undefined; let closed = false;
  const now = options.now ?? Date.now;
  const emit = () => {for (const listener of Array.from(listeners)) listener();};
  const repo = () => adapter ?? (adapter = repository());
  const requireEntry = (id: string) => {
    if (closed) throw new Error('Almacén cerrado');
    const entry = entries.get(id); if (!entry) throw new Error('Borrador sin cargar'); return entry;
  };
  const publish = (entry: Entry, state: DraftState) => {entry.state = Object.freeze(state); emit();};
  const flushEntry = (entry: Entry): Promise<void> => {
    clearTimeout(entry.timer);
    if (entry.writing) return entry.writing;
    entry.writing = (async () => {
      while (entry.persisted !== entry.state.workspace && entry.state.status !== 'memory') {
        const value = entry.state.workspace; const previous = entry.state.previous;
        publish(entry, {...entry.state, status: 'saving'});
        try {
          const result = await repo().write(value, entry.expected, now(), previous);
          if (result.status === 'saved') entry.expected = result.record.storageRevision;
          entry.persisted = value;
          publish(entry, {...entry.state, status: result.status === 'conflict' ? 'conflict'
            : entry.state.workspace === value ? 'saved' : 'dirty'});
        } catch {publish(entry, {...entry.state, status: 'memory'});}
      }
    })().finally(() => {entry.writing = undefined;});
    return entry.writing;
  };
  const change = (entry: Entry, workspace: Workspace, previous = entry.state.previous) => {
    publish(entry, {...entry.state, workspace, previous, status: entry.state.status === 'memory' ? 'memory' : 'dirty'});
    clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {void flushEntry(entry);}, options.debounceMs ?? 300);
    // No impide que terminen procesos de verificación nativos.
    (entry.timer as unknown as {unref?: () => void}).unref?.();
    return workspace;
  };
  return {
    load(seed) {
      if (closed) return Promise.reject(new Error('Almacén cerrado'));
      const initial = copyWorkspace(seed);
      const existing = entries.get(initial.id); if (existing) return Promise.resolve(existing.state);
      const loading = pending.get(initial.id); if (loading) return loading;
      const task = (async () => {
        let saved: StoredDraft | null = null; let failed = false;
        try {const raw = await repo().read(initial.id); saved = readDraft(raw, initial.id); failed = raw != null && !saved;}
        catch {failed = true;}
        const environmentChanged = saved !== null && saved.workspace.environmentVersion !== initial.environmentVersion;
        const value = saved ? copyWorkspace({...saved.workspace, environmentVersion: initial.environmentVersion}) : initial;
        const entry: Entry = {state: Object.freeze({workspace: value, previous: saved?.previous ?? null, status: failed ? 'memory' : 'clean', environmentChanged}),
          expected: saved?.storageRevision ?? null, persisted: value};
        if (closed) throw new Error('Almacén cerrado');
        entries.set(initial.id, entry); emit(); return entry.state;
      })().finally(() => {pending.delete(initial.id);});
      pending.set(initial.id, task); return task;
    },
    get: (id) => entries.get(id)?.state,
    edit(id, path, content) {
      const entry = requireEntry(id); const old = entry.state.workspace;
      if (!old.files.some((file) => file.path === path)) throw new Error('Archivo inexistente');
      if (old.files.find((file) => file.path === path)!.content === content) return old;
      return change(entry, copyWorkspace({...old, revision: old.revision + 1,
        files: old.files.map((file) => file.path === path ? {...file, content} : file)}));
    },
    activate(id, path) {
      const entry = requireEntry(id); const old = entry.state.workspace;
      return old.activeFile === path ? old : change(entry, copyWorkspace({...old, activeFile: path, revision: old.revision + 1}));
    },
    replace(id, code) {
      const entry = requireEntry(id); const old = entry.state.workspace;
      const next = copyWorkspace({...old, files: code.files, activeFile: code.activeFile, revision: old.revision + 1});
      if (old.activeFile === next.activeFile && JSON.stringify(old.files) === JSON.stringify(next.files)) return old;
      return change(entry, next, old);
    },
    restorePrevious(id) {
      const entry = requireEntry(id); const previous = entry.state.previous;
      if (!previous) return entry.state.workspace;
      const old = entry.state.workspace;
      return change(entry, copyWorkspace({...old, files: previous.files, activeFile: previous.activeFile, revision: old.revision + 1}), null);
    },
    async retryPersistence(id) {
      const entry = requireEntry(id); await entry.writing;
      if (closed || entry.state.status !== 'memory') return;
      await Promise.all(Array.from(entries.values(), value => value.writing));
      adapter?.close(); adapter = undefined; entry.persisted = null;
      publish(entry, {...entry.state, status: 'dirty'}); await flushEntry(entry);
    },
    async flush(id) {await Promise.all((id ? [requireEntry(id)] : Array.from(entries.values())).map(flushEntry));},
    subscribe(listener) {listeners.add(listener); return () => {listeners.delete(listener);};},
    async close() {
      if (closed) return;
      await Promise.all(Array.from(entries.values(), flushEntry)); closed = true;
      for (const entry of Array.from(entries.values())) clearTimeout(entry.timer);
      adapter?.close(); listeners.clear();
    },
  };
}
