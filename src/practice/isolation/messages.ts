import type {CompletionRequest, RunRequest, RuntimeContext, RuntimeSchema} from '../contracts.ts';
import {counter, datasetReference, identifier, record, text} from '../guards.ts';
import {isRuntimeEvent} from '../protocol.ts';
export const BRIDGE_VERSION = 1;
export type Command = 'init' | 'run' | 'inspect' | 'reset' | 'cancel' | 'dispose' | 'complete';
export type BridgeRequest = {version: 1; session: string; id: number; command: Command; payload?: unknown};
export type BridgeReply = {version: 1; session: string; id: number} & (
  {kind: 'result'; value?: unknown} | {kind: 'failure'; message: string} | {kind: 'event'; event: unknown});
const path = (v: unknown): v is string => identifier(v) && !v.startsWith('/') && !v.includes('\\') && v.split('/').every((part) => !!part && part !== '..' && part !== '.');
export function isRunRequest(v: unknown): v is RunRequest {
  if (!record(v) || !identifier(v.runId) || !identifier(v.workspaceId) || !counter(v.generation) || !counter(v.revision)
    || !Array.isArray(v.files) || !v.files.length || v.files.length > 64 || !path(v.entryFile)) return false;
  const files = Array.from(v.files);
  if (!files.every((f) => record(f) && path(f.path) && ['sql', 'python'].includes(f.languageId as string) && text(f.content))
    || new Set(files.map((f) => f.path)).size !== files.length
    || new Set(files.map((f) => f.languageId)).size !== 1
    || files.reduce((size, f) => size + new TextEncoder().encode(f.content).length, 0) > 1_048_576) return false;
  const file = files.find((f) => f.path === v.entryFile);
  return !!file && (v.selection === undefined || (record(v.selection) && counter(v.selection.from) && counter(v.selection.to)
    && v.selection.from <= v.selection.to && v.selection.to <= file.content.length));
}
export function isRuntimeSchema(v: unknown): v is RuntimeSchema {
  return record(v) && counter(v.version) && Array.isArray(v.entities) && v.entities.length <= 200
    && Array.from(v.entities).every((e) => record(e) && identifier(e.name) && ['table', 'dataframe', 'variable'].includes(e.kind as string)
      && (e.rowCount === undefined || counter(e.rowCount)) && Array.isArray(e.columns) && e.columns.length <= 200
      && Array.from(e.columns).every((c) => record(c) && identifier(c.name) && ['text', 'integer', 'number', 'boolean', 'bigint', 'decimal', 'date', 'datetime'].includes(c.type as string)
        && (c.primaryKey===undefined||typeof c.primaryKey==='boolean'))
      && (e.foreignKeys===undefined||(Array.isArray(e.foreignKeys)&&e.foreignKeys.length<=200&&Array.from(e.foreignKeys).every(key=>record(key)&&identifier(key.table)
        &&Array.isArray(key.columns)&&key.columns.length>0&&key.columns.length<=200&&Array.from(key.columns).every(name=>identifier(name)&&(e.columns as {name:string}[]).some(column=>column.name.toLowerCase()===name.toLowerCase()))
        &&Array.isArray(key.targetColumns)&&key.targetColumns.length===key.columns.length&&Array.from(key.targetColumns).every(name=>name===null||identifier(name)))))
      && (e.preview === undefined || (record(e.preview) && isRuntimeEvent({protocolVersion: 1, runId: 'inspect', generation: 0, revision: 0, type: 'table', ...e.preview}))));
}
export function isRuntimeContext(v: unknown): v is RuntimeContext {
  if (!record(v) || !record(v.profile) || !record(v.environment) || !record(v.dataset)) return false;
  const p = v.profile, e = v.environment, d = v.dataset;
  return p.availability === 'enabled' && ((p.runtimeId === 'sqlite-wasm' && p.languageId === 'sql') || (p.runtimeId === 'pyodide' && p.languageId === 'python')) && p.executionLocation === 'browser'
    && identifier(p.id) && identifier(p.label) && identifier(p.toolKey) && identifier(p.completionId) && identifier(p.defaultExampleId)
    && datasetReference(p.defaultDataset) && record(p.capabilities) && p.capabilities.network === 'none'
    && ['multipleFiles', 'tables', 'figures', 'preview'].every((k) => typeof (p.capabilities as Record<string, unknown>)[k] === 'boolean')
    && identifier(e.version) && record(e.runtime) && e.runtime.id === p.runtimeId && identifier(e.runtime.version)
    && Array.isArray(e.packages) && e.packages.length <= 64 && Array.from(e.packages).every((x) => record(x) && identifier(x.name) && identifier(x.version))
    && datasetReference(d.reference) && record(d.reference) && record(p.defaultDataset) && d.reference.id === p.defaultDataset.id && d.reference.version === p.defaultDataset.version
    && text(d.bootstrap) && isRuntimeSchema(d.schema) && Array.isArray(d.files) && d.files.length <= 64
    && Array.from(d.files).every((f) => record(f) && path(f.path) && f.bytes instanceof Uint8Array && f.bytes.byteLength <= 1_048_576);
}
export function isBridgeRequest(v: unknown, session: string): v is BridgeRequest {
  if (!record(v) || v.version !== BRIDGE_VERSION || v.session !== session || !identifier(session) || !counter(v.id)) return false;
  switch (v.command) {
    case 'init': return isRuntimeContext(v.payload);
    case 'run': return isRunRequest(v.payload);
    case 'complete': return isCompletionRequest(v.payload);
    case 'inspect': case 'reset': case 'dispose': return v.payload === undefined;
    case 'cancel': return identifier(v.payload);
    default: return false;
  }
}
export function isBridgeReply(v: unknown, session: string): v is BridgeReply {
  if (!record(v) || v.version !== BRIDGE_VERSION || v.session !== session || !identifier(session) || !counter(v.id)) return false;
  return v.kind === 'result' || (v.kind === 'failure' && text(v.message)) || (v.kind === 'event' && isRuntimeEvent(v.event));
}

export function isCompletionRequest(v: unknown): v is CompletionRequest {
  return record(v) && identifier(v.requestId) && identifier(v.workspaceId) && counter(v.generation) && counter(v.revision)
    && path(v.file) && text(v.document) && new TextEncoder().encode(v.document).byteLength <= 1_048_576
    && counter(v.position) && v.position <= v.document.length && isRuntimeSchema(v.schema);
}
