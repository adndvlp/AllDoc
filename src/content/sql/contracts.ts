/** Contratos de planificación. No habilitan páginas, dialectos ni motores. */
export type SqlDialectId = 'sqlite' | 'postgresql' | 'mysql' | 'sqlserver' | 'mariadb' | 'oracle';
export type SqlLocationId = 'analisis-de-datos' | 'lenguajes';
export type SqlSource = Readonly<{url: string; targetVersion: string; checkedAt: string}>;
export type SqlSupport = 'native' | 'equivalent' | 'unavailable';
export type SqlCapability =
  | Readonly<{status: 'pending'; reason: string}>
  | Readonly<{status: 'reviewed'; support: SqlSupport; syntax: string; explanation: string; sources: readonly SqlSource[]}>;
export type SqlConceptPlan = Readonly<{
  key: string; id: string; label: string; order: number; feature: string;
  canonicalPath: string; file: string; stage: 'planned' | 'published-legacy' | 'published';
}>;
export type SqlGroupPlan = Readonly<{
  key: string; label: string; order: number; collapsed: true; children: readonly SqlConceptPlan[];
}>;
export type LocalSqlExecution =
  | Readonly<{kind: 'sqlite'; exampleId: string}>
  | Readonly<{kind: 'sqlite-equivalent'; exampleId: string; explanation: string}>
  | Readonly<{kind: 'external'; explanation: string}>;
export type SqlVariant = Readonly<{
  conceptId: string; feature: string; dialectId: SqlDialectId; stage: 'draft' | 'reviewed';
  support: SqlSupport; code?: string; explanation?: string; sources: readonly SqlSource[];
  localExecution: LocalSqlExecution;
}>;
/** Evidencia aportada por el registro de ejemplos; no se infiere del resaltado. */
export type VerifiedSqliteExample = Readonly<{
  id:string;conceptId:string;code:string;runtimeId:'sqlite-wasm';status:'verified';
  equivalentTo?:readonly Readonly<{dialectId:SqlDialectId;code:string}>[];
}>;
export type SqlVariantAssessment = Readonly<{status: 'ready' | 'pending' | 'invalid'; reasons: readonly string[]}>;
export type SqlExampleAction = Readonly<{
  kind: 'disabled' | 'sqlite' | 'sqlite-equivalent' | 'external'; label: string; reason?: string;
  code?: string; exampleId?: string; executesAutomatically: false;
}>;

export const sqlOfficialHosts: Readonly<Record<SqlDialectId,readonly string[]>>=Object.freeze({
  sqlite:['sqlite.org','www.sqlite.org'],postgresql:['www.postgresql.org','postgresql.org'],
  mysql:['dev.mysql.com'],sqlserver:['learn.microsoft.com'],mariadb:['mariadb.com'],oracle:['docs.oracle.com'],
});

export function isSqlSource(value:unknown):value is SqlSource {
  if(!value||typeof value!=='object')return false;
  const s=value as Record<string,unknown>;
  if(typeof s.url!=='string'||typeof s.targetVersion!=='string'||!s.targetVersion.trim()||typeof s.checkedAt!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt))return false;
  const date=new Date(s.checkedAt);
  if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==s.checkedAt)return false;
  try{const url=new URL(s.url);return url.protocol==='https:'&&!url.username&&!url.password&&!url.port;}catch{return false;}
}
export function isOfficialSqlSource(source:SqlSource,dialect:SqlDialectId):boolean {
  return isSqlSource(source)&&sqlOfficialHosts[dialect].includes(new URL(source.url).hostname);
}
