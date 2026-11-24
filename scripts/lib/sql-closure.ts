import {summarize} from './baseline.ts';

export const sqlReferenceDirectories = {
  chromium: 'tests/ui/__screenshots__',
  functional: 'tests/cross-browser/__screenshots__',
  visual: 'tests/sql-browser/app-screenshots',
  sql: 'tests/sql-browser/__screenshots__',
} as const;
export type SqlVerificationSuite = keyof typeof sqlReferenceDirectories;

export const completionScenarios = [
  {id: 'palabra', marked: 'SEL▏', label: 'SELECT'},
  {id: 'columna', marked: 'SELECT ▏ FROM productos;', label: 'precio'},
  {id: 'prefijo', marked: 'SELECT pre▏ FROM productos;', label: 'precio'},
  {id: 'calificada', marked: 'SELECT productos.pre▏', label: 'precio'},
  {id: 'alias-join', marked: 'SELECT p.▏ FROM productos p JOIN proveedores v ON p.proveedor_id=v.id;', label: 'precio'},
  {id: 'cte', marked: 'WITH c AS (SELECT precio AS importe FROM productos) SELECT c.▏ FROM c;', label: 'importe'},
  {id: 'esquema-vivo', marked: 'SELECT ▏ FROM productos;', label: 'precio_extra'},
] as const;

export type SqlSample = {id: string; eventAt: number; observedAt: number; satisfied: boolean; timeOrigin: number};
export const completionBudget = 100;
export const sampleCount = 30;

export function assessCompletionSamples(samples: SqlSample[]) {
  const complete = samples.length === sampleCount
    && new Set(samples.map(sample => sample.id)).size === sampleCount
    && samples.every((sample, index) => sample.id && sample.satisfied
      && Number.isFinite(sample.eventAt) && Number.isFinite(sample.observedAt)
      && Number.isFinite(sample.timeOrigin) && sample.timeOrigin === samples[0].timeOrigin
      && sample.eventAt > (samples[index - 1]?.observedAt ?? 0)
      && sample.observedAt > sample.eventAt);
  if (!complete) return {status: 'incomplete', count: samples.length, p95: null};
  const times = summarize(samples.map(sample => sample.observedAt - sample.eventAt));
  return {status: times.p95 !== null && times.p95 <= completionBudget ? 'passed' : 'failed', ...times};
}
