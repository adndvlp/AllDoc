import type {Database, PreparedStatement, Sqlite3Static} from '@sqlite.org/sqlite-wasm';
import type {Cell, ColumnType, DataColumn, MaterializedDataset, RunRequest, RuntimeEvent, RuntimeSchema} from '../../contracts.ts';
import {record, text} from '../../guards.ts';

export interface SQLiteEngine {
  init(dataset: MaterializedDataset): void;
  run(request: RunRequest, emit: (event: RuntimeEvent) => void): void;
  inspect(): RuntimeSchema;
  reset(): void;
  dispose(): void;
}
export function createSQLiteEngine(sqlite: Sqlite3Static): SQLiteEngine {
  // API pública desde SQLite 3.51, aún ausente en las declaraciones del wrapper npm.
  const extra = sqlite as Sqlite3Static & {oo1: {Stmt: {wrapHandle(db: Database, pointer: number, own: boolean): PreparedStatement}};
    wasm: {peekPtr(pointer: number): number}};
  const {capi, wasm} = sqlite; const encoder = new TextEncoder(); const decoder = new TextDecoder();
  let db: Database | null = null; let seed: MaterializedDataset | null = null; let schemaVersion = 0;
  const quote = (value: string) => '"' + value.replaceAll('"', '""') + '"';
  const requireDB = () => {if (!db) throw new Error('El entorno SQL no está preparado'); return db;};
  const raw = (value: unknown): null | string | number | bigint => {
    if (value === null || typeof value === 'string') return value;
    if (typeof value === 'bigint') return value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER) ? Number(value) : value;
    if (typeof value === 'number') return Number.isFinite(value) ? value : String(value);
    if (value instanceof Uint8Array) return '0x' + Array.from(value, (byte) => byte.toString(16).padStart(2, '0')).join('');
    throw new Error('Valor SQL no representable');
  };
  type Raw = ReturnType<typeof raw>;
  function table(names: string[], rows: Raw[][]): {columns: DataColumn[]; rows: Cell[][]} {
    if (names.some((name) => name.length > 256)) throw new Error('Nombre de columna demasiado largo');
    const types: ColumnType[] = names.map((_, index) => {
      const values = rows.map((row) => row[index]).filter((value) => value !== null);
      if (!values.length) return 'text';
      if (values.every((value) => typeof value === 'number')) return values.every(Number.isSafeInteger) ? 'integer' : 'number';
      if (values.every((value) => typeof value === 'bigint' || (typeof value === 'number' && Number.isSafeInteger(value)))) return 'bigint';
      return 'text';
    });
    return {columns: names.map((name, index) => ({name, type: types[index]})),
      rows: rows.map((row) => row.map((value, index) => value === null ? null : types[index] === 'text' || types[index] === 'bigint' ? String(value) : value as number))};
  }
  function prepare() {
    if (!seed) throw new Error('Faltan los datos iniciales');
    db?.close(); db = new sqlite.oo1.DB(':memory:', 'c');
    const connection = db;
    try {
      connection.exec('PRAGMA hard_heap_limit=33554432; PRAGMA temp_store=MEMORY;');
      for (const [id, value] of [[capi.SQLITE_LIMIT_LENGTH, 1_048_576], [capi.SQLITE_LIMIT_SQL_LENGTH, 1_048_576],
        [capi.SQLITE_LIMIT_COLUMN, 200], [capi.SQLITE_LIMIT_ATTACHED, 0], [capi.SQLITE_LIMIT_EXPR_DEPTH, 200],
        [capi.SQLITE_LIMIT_VDBE_OP, 200_000]] as const) capi.sqlite3_limit(connection.pointer!, id, value);
      const parsed: unknown = JSON.parse(seed.bootstrap);
      if (!record(parsed) || parsed.format !== 'alldoc/sql-seed@1' || !Array.isArray(parsed.statements) || parsed.statements.length > 1000) throw new Error('Preparación SQL inválida');
      for (const statement of parsed.statements) {
        if (!record(statement) || !text(statement.sql) || !Array.isArray(statement.parameters)
          || !statement.parameters.every((value: unknown) => value === null || typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value)))) throw new Error('Parámetros SQL inválidos');
        connection.exec(statement.sql, {bind: statement.parameters});
      }
      capi.sqlite3_set_authorizer(connection.pointer!, (_arg, action, a, b) => {
        if (action === capi.SQLITE_ATTACH || action === capi.SQLITE_DETACH) return capi.SQLITE_DENY;
        if (action === capi.SQLITE_PRAGMA && ['hard_heap_limit', 'soft_heap_limit', 'temp_store_directory', 'data_store_directory', 'writable_schema'].includes(String(a).toLowerCase())) return capi.SQLITE_DENY;
        if (action === capi.SQLITE_FUNCTION && ['load_extension', 'readfile', 'writefile'].includes(String(b).toLowerCase())) return capi.SQLITE_DENY;
        return capi.SQLITE_OK;
      }, 0);
      schemaVersion++;
    } catch (error) {connection.close(); db = null; throw error;}
  }
  return {
    init(dataset) {seed = dataset; prepare();},
    run(request, emit) {
      const identity = {protocolVersion: 1 as const, runId: request.runId, generation: request.generation, revision: request.revision};
      let bytes = 0; let statementOffset = 0; let sql = ''; let base = 0; let input: Uint8Array = new Uint8Array();
      const send = (event: RuntimeEvent) => {
        const length = encoder.encode(JSON.stringify(event)).byteLength;
        if (bytes + length > 1_048_576 - 4096) throw new Error('Se alcanzó el límite de salida; no se ejecutaron las sentencias restantes.');
        bytes += length; emit(event);
      };
      try {
        const connection = requireDB(); const file = request.files.find((entry) => entry.path === request.entryFile);
        if (!file) throw new Error('Archivo SQL inexistente');
        const selection = request.selection;
        if (selection && (!Number.isSafeInteger(selection.from) || !Number.isSafeInteger(selection.to) || selection.from < 0 || selection.to <= selection.from || selection.to > file.content.length)) throw new Error('Selección inválida');
        base = selection?.from ?? 0; sql = selection ? file.content.slice(selection.from, selection.to) : file.content;
        if (sql.includes('\0')) throw new Error('El código SQL no admite caracteres NUL');
        input = encoder.encode(sql); if (input.byteLength > 1_048_576) throw new Error('El código supera 1 MiB');
        send({...identity, type: 'progress', phase: 'Ejecutando SQL'});
        const scope = wasm.scopedAllocPush();
        try {
          const [start, length] = wasm.scopedAllocCString(sql, true);
          const [statementPointer, tailPointer] = wasm.scopedAllocPtr(2);
          let pointer = start;
          while (pointer < start + length) {
            statementOffset = pointer - start;
            const rc = capi.sqlite3_prepare_v3(connection.pointer!, pointer, start + length - pointer, 0, statementPointer, tailPointer);
            const handle = extra.wasm.peekPtr(statementPointer);
            const tail = extra.wasm.peekPtr(tailPointer);
            if (rc !== capi.SQLITE_OK) throw new Error(capi.sqlite3_errmsg(connection.pointer!));
            if (tail <= pointer) throw new Error('El parser SQL no avanzó');
            pointer = tail;
            if (!handle) continue; // Comentarios y sentencias vacías: el parser decide sus límites.
            const statement = extra.oo1.Stmt.wrapHandle(connection, handle, true);
            try {
              const names = statement.columnCount ? statement.getColumnNames() : [];
              const rows: Raw[][] = []; let truncated = false; let previewBytes = 0;
              const before = connection.changes(true, true);
              while (statement.step()) {
                if (!names.length) continue;
                if (rows.length === 200) {truncated = true; break;}
                const row = statement.get([]).map(raw);
                const size = encoder.encode(JSON.stringify(row.map((value) => value === null ? null : String(value)))).byteLength;
                if (previewBytes + size > 1_048_576 - bytes - 16_384) {truncated = true; break;}
                rows.push(row); previewBytes += size;
              }
              if (names.length) send({...identity, type: 'table', ...table(names, rows), truncated});
              else {
                const changes = BigInt(connection.changes(true, true)) - BigInt(before);
                send({...identity, type: 'stream', channel: 'stdout', text: changes ? `Cambios registrados: ${changes}\n` : 'Sentencia completada.\n'});
              }
            } finally {statement.finalize();}
          }
        } finally {wasm.scopedAllocPop(scope);}
        schemaVersion++; emit({...identity, type: 'end', status: 'success', environmentReset: false});
      } catch (error) {
        schemaVersion++;
        const offset = db ? capi.sqlite3_error_offset(db.pointer!) : -1;
        let position: {line: number; column: number} | undefined;
        if (offset >= 0 && input.byteLength) {
          const file = request.files.find((entry) => entry.path === request.entryFile)!;
          const absolute = base + decoder.decode(input.subarray(0, statementOffset + offset)).length;
          const prefix = file.content.slice(0, absolute); position = {line: prefix.split('\n').length, column: absolute - prefix.lastIndexOf('\n')};
        }
        emit({...identity, type: 'error', message: (error instanceof Error ? error.message : String(error)).slice(0, 2048), file: request.entryFile, ...position});
        emit({...identity, type: 'end', status: 'error', environmentReset: false});
      }
    },
    inspect() {
      const connection = requireDB();
      const objects = connection.selectArrays("SELECT name, type FROM sqlite_schema WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY name LIMIT 201");
      if (objects.length > 200) throw new Error('El esquema supera 200 entidades');
      let remainingBytes = 524_288; let remainingRows = 200;
      const entities: RuntimeSchema['entities'] = objects.map(([name, kind]) => {
        const columns = connection.selectArrays(`PRAGMA table_xinfo(${quote(String(name))})`).filter((row) => row[6] !== 1).map((row) => {
          const declared = String(row[2]).toUpperCase();
          const type: ColumnType = declared.includes('INT') ? 'integer' : /REAL|FLOA|DOUB/.test(declared) ? 'number' : 'text';
          return {name: String(row[1]), type};
        });
        // Las vistas pueden ejecutar programas arbitrariamente costosos. Solo se previsualizan tablas físicas.
        if (kind !== 'table') return {name: String(name), kind: 'table' as const, columns};
        const rowCount = Number(connection.selectValue(`SELECT count(*) FROM ${quote(String(name))}`));
        const rows: Raw[][] = [];
        const statement = connection.prepare(`SELECT * FROM ${quote(String(name))} LIMIT ${Math.min(20, remainingRows)}`);
        const names = statement.getColumnNames();
        try {
          while (remainingRows && statement.step()) {
            const row = statement.get([]).map(raw);
            const size = encoder.encode(JSON.stringify(row.map((v) => v === null ? null : String(v)))).byteLength;
            if (size > remainingBytes) break;
            rows.push(row); remainingBytes -= size; remainingRows--;
          }
        } finally {statement.finalize();}
        return {name: String(name), kind: 'table' as const, columns, rowCount,
          preview: {...table(names, rows), truncated: rows.length < rowCount}};
      });
      return {version: schemaVersion, entities};
    },
    reset() {prepare();},
    dispose() {db?.close(); db = null; seed = null;},
  };
}
