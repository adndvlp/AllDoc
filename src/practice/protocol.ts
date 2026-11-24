import {PRACTICE_PROTOCOL_VERSION, type ColumnType, type CompletionRequest, type CompletionResult, type RunIdentity, type RuntimeEvent} from './contracts.ts';
import {record, counter, identifier, text} from './guards.ts';

const columnTypes = new Set<ColumnType>(['text', 'integer', 'number', 'boolean', 'bigint', 'decimal', 'date', 'datetime']);
const MAX_ROWS = 200;
const MAX_COLUMNS = 200;
export const MAX_ARTIFACT_BYTES = 1_048_576;

function safeArtifactPath(path: unknown): path is string {
  return identifier(path) && path.split('/').every(part => /^[\p{L}\p{N}_][\p{L}\p{N}_. -]*$/u.test(part));
}

export function isWorkbookPath(path: unknown): path is string {
  return safeArtifactPath(path) && /\.(xlsx|xltx)$/i.test(path);
}

export function isPlotExportPath(path: unknown): path is string {
  return safeArtifactPath(path) && /\.(png|jpe?g|gif|svg|pdf)$/i.test(path);
}

const starts = (bytes: Uint8Array, signature: readonly number[]) =>
  signature.every((value, index) => bytes[index] === value);
const pngHeader = [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82];

function isFigure(bytes: Uint8Array): boolean {
  if (bytes.length < 24 || !starts(bytes, pngHeader)) return false;
  const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const width = header.getUint32(16), height = header.getUint32(20);
  return width > 0 && height > 0 && width <= 2048 && height <= 2048;
}

export function isArtifactFile(path: unknown, bytes: unknown): boolean {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength > MAX_ARTIFACT_BYTES) return false;
  if (isWorkbookPath(path)) return starts(bytes, [80,75,3,4]);
  if (!isPlotExportPath(path)) return false;
  switch (path.split('.').at(-1)?.toLowerCase()) {
    case 'png': return starts(bytes, pngHeader);
    case 'jpg': case 'jpeg': return starts(bytes, [255,216,255]);
    case 'gif': return starts(bytes, [71,73,70,56,55,97]) || starts(bytes, [71,73,70,56,57,97]);
    case 'pdf': return starts(bytes, [37,80,68,70,45]);
    // Solo descarga binaria. El SVG del usuario nunca entra al DOM como imagen.
    case 'svg': return /^(?:\s*<\?xml[^>]*\?>)?(?:\s*<!DOCTYPE svg[^>]*>)?\s*<svg\b/.test(
      new TextDecoder().decode(bytes.subarray(0, 1024)));
    default: return false;
  }
}

export function eventBytes(event: RuntimeEvent, encoder: TextEncoder): number {
  if (event.type !== 'file' && event.type !== 'figure') return encoder.encode(JSON.stringify(event)).byteLength;
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
    case 'file': return isArtifactFile(value.path, value.bytes);
    case 'figure': return identifier(value.title) && value.bytes instanceof Uint8Array
      && value.bytes.byteLength <= MAX_ARTIFACT_BYTES && isFigure(value.bytes);
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
