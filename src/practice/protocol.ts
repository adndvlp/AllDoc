import {PRACTICE_PROTOCOL_VERSION, type ColumnType, type CompletionRequest, type CompletionResult, type RunIdentity, type RuntimeEvent} from './contracts.ts';
import {record, counter, identifier, text} from './guards.ts';

const columnTypes = new Set<ColumnType>(['text', 'integer', 'number', 'boolean', 'bigint', 'decimal', 'date', 'datetime']);
const MAX_ROWS = 200;
const MAX_COLUMNS = 200;
export const MAX_WORKBOOK_BYTES = 1_048_576;

export function isWorkbookPath(path: unknown): path is string {
  return identifier(path) && /\.(xlsx|xltx)$/i.test(path)
    && path.split('/').every(part => /^[\p{L}\p{N}_][\p{L}\p{N}_. -]*$/u.test(part));
}

export function eventBytes(event: RuntimeEvent, encoder: TextEncoder): number {
  if (event.type !== 'file') return encoder.encode(JSON.stringify(event)).byteLength;
  const {bytes, ...metadata} = event;
  return bytes.byteLength + encoder.encode(JSON.stringify(metadata)).byteLength;
}

function cell(value: unknown, type: ColumnType): boolean {
  if (value === null) return true;
  switch (type) {
    case 'integer': return Number.isSafeInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'boolean': return typeof value === 'boolean';
    case 'bigint': return text(value) && /^-?\d+$/.test(value);
    case 'decimal': return text(value) && /^-?\d+(?:\.\d+)?$/.test(value);
    // El adaptador es responsable de normalizar las fechas del motor a texto.
    case 'date': case 'datetime': case 'text': return text(value);
  }
}

export function isRuntimeEvent(value: unknown, expected?: RunIdentity): value is RuntimeEvent {
  if (!record(value) || value.protocolVersion !== PRACTICE_PROTOCOL_VERSION
    || !identifier(value.runId) || !counter(value.generation) || !counter(value.revision)) return false;
  if (expected && (value.runId !== expected.runId || value.generation !== expected.generation || value.revision !== expected.revision)) return false;
  switch (value.type) {
    case 'progress': return identifier(value.phase);
    case 'stream': return (value.channel === 'stdout' || value.channel === 'stderr') && text(value.text);
    case 'error': return text(value.message)
      && (value.file === undefined || identifier(value.file))
      && (value.line === undefined || (counter(value.line) && value.line > 0))
      && (value.column === undefined || (counter(value.column) && value.column > 0));
    case 'end': return ['success', 'error', 'cancelled', 'timeout'].includes(value.status as string) && typeof value.environmentReset === 'boolean';
    case 'file': return isWorkbookPath(value.path) && value.bytes instanceof Uint8Array
      && value.bytes.byteLength <= MAX_WORKBOOK_BYTES
      && value.bytes[0] === 80 && value.bytes[1] === 75 && value.bytes[2] === 3 && value.bytes[3] === 4;
    case 'table': {
      if (typeof value.truncated !== 'boolean' || !Array.isArray(value.columns) || value.columns.length > MAX_COLUMNS
        || !Array.isArray(value.rows) || value.rows.length > MAX_ROWS) return false;
      // Array.from materializa huecos como undefined para no saltarlos con every.
      const columns = Array.from(value.columns);
      if (!columns.every((column) => record(column) && typeof column.name === 'string' && column.name.length <= 256 && columnTypes.has(column.type as ColumnType))) return false;
      return Array.from(value.rows).every((row) => Array.isArray(row) && row.length === columns.length
        && Array.from(row).every((value, index) => cell(value, columns[index].type as ColumnType)));
    }
    default: return false;
  }
}

export function isCompletionResult(value: unknown, request: CompletionRequest): value is CompletionResult {
  if (!record(value) || !identifier(value.requestId) || !identifier(value.workspaceId) || !identifier(value.file)
    || value.requestId !== request.requestId || value.workspaceId !== request.workspaceId
    || value.file !== request.file || value.generation !== request.generation || value.revision !== request.revision
    || !counter(value.generation) || !counter(value.revision)
    || !counter(request.position) || request.position > request.document.length
    || !counter(value.from) || !counter(value.to) || value.from > request.position || value.to < request.position || value.to > request.document.length
    || !Array.isArray(value.items) || value.items.length > 200) return false;
  return Array.from(value.items).every((item) => record(item) && identifier(item.label) && text(item.insertText)
    && (item.detail === undefined || text(item.detail)));
}
