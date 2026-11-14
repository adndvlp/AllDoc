import {copyWorkspace, readDraft, type DraftRepository, type RecoveryDraft, type WriteResult} from './drafts.ts';

/** Una transacción CAS compara y escribe sin ceder el turno a otra conexión. */
export function createIndexedDBDraftRepository(options: {factory?: IDBFactory; name?: string; timeoutMs?: number} = {}): DraftRepository {
  let connection: Promise<IDBDatabase> | undefined; let closed = false;
  const timeoutMs = options.timeoutMs ?? 3000;
  function open(): Promise<IDBDatabase> {
    if (closed) return Promise.reject(new Error('Repositorio cerrado'));
    if (connection) return connection;
    connection = new Promise<IDBDatabase>((resolve, reject) => {
      const factory = options.factory ?? globalThis.indexedDB;
      if (!factory) {reject(new Error('IndexedDB no disponible')); return;}
      const request = factory.open(options.name ?? 'alldoc-practice', 1); let settled = false;
      const fail = (error: unknown) => {if (!settled) {settled = true; clearTimeout(timer); reject(error);}};
      const timer = setTimeout(() => fail(new Error('IndexedDB no responde')), timeoutMs);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('drafts')) db.createObjectStore('drafts', {keyPath: 'workspace.id'});
        if (!db.objectStoreNames.contains('recoveries')) {
          const recovery = db.createObjectStore('recoveries', {keyPath: 'id'});
          recovery.createIndex('workspaceId', 'workspaceId');
        }
      };
      request.onerror = () => fail(request.error);
      request.onblocked = () => fail(new Error('Actualización de IndexedDB bloqueada'));
      request.onsuccess = () => {
        clearTimeout(timer); const db = request.result;
        if (settled || closed) {db.close(); if (!settled) fail(new Error('Repositorio cerrado')); return;}
        settled = true; db.onversionchange = () => {db.close(); connection = undefined;}; resolve(db);
      };
    }).catch((error) => {connection = undefined; throw error;});
    return connection;
  }
  async function transact<T>(stores: string[], mode: IDBTransactionMode, work: (tx: IDBTransaction, result: (value: T) => void) => void): Promise<T> {
    const db = await open();
    return new Promise<T>((resolve, reject) => {
      const tx = db.transaction(stores, mode); let value: T;
      const timer = setTimeout(() => {try {tx.abort();} catch {} reject(new Error('Guardado sin respuesta'));}, timeoutMs);
      tx.oncomplete = () => {clearTimeout(timer); resolve(value);};
      tx.onabort = () => {clearTimeout(timer); reject(tx.error ?? new Error('Transacción cancelada'));};
      try {work(tx, (result) => {value = result;});} catch (error) {clearTimeout(timer); tx.abort(); reject(error);}
    });
  }
  return {
    async read(id) {return transact<unknown>(['drafts'], 'readonly', (tx, result) => {
      const request = tx.objectStore('drafts').get(id); request.onsuccess = () => result(request.result ?? null);
    });},
    async write(value, expectedRevision, savedAt, backup = null) {
      const workspace = copyWorkspace(value);
      const previous = backup === null ? null : copyWorkspace(backup);
      if (previous && previous.id !== workspace.id) throw new Error('Revisión anterior incompatible');
      if (!Number.isSafeInteger(savedAt) || savedAt < 0 || (expectedRevision !== null && (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1))) throw new Error('Revisión de guardado inválida');
      return transact<WriteResult>(['drafts', 'recoveries'], 'readwrite', (tx, result) => {
        const drafts = tx.objectStore('drafts'); const request = drafts.get(workspace.id);
        request.onsuccess = () => {
          const current = readDraft(request.result, workspace.id);
          // Un formato corrupto o futuro se conserva; no se sustituye por un seed vacío.
          if ((request.result != null && !current) || (current?.storageRevision ?? null) !== expectedRevision) {
            const recovery: RecoveryDraft = {id: globalThis.crypto.randomUUID(), workspaceId: workspace.id, savedAt, workspace, previous};
            tx.objectStore('recoveries').put(recovery); result({status: 'conflict', recoveryId: recovery.id});
          } else {
            const record = {formatVersion: 1 as const, storageRevision: (expectedRevision ?? 0) + 1, savedAt, workspace, previous};
            drafts.put(record); result({status: 'saved', record});
          }
        };
      });
    },
    async recoveries(id) {return transact<RecoveryDraft[]>(['recoveries'], 'readonly', (tx, result) => {
      const request = tx.objectStore('recoveries').index('workspaceId').getAll(id);
      request.onsuccess = () => result(request.result.map((item: RecoveryDraft) => ({...item, workspace: copyWorkspace(item.workspace)})));
    });},
    close() {closed = true; void connection?.then((db) => db.close(), () => {});},
  };
}
