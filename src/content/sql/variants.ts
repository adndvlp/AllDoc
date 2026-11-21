import {getSqlCapability,sqlDialects} from './capabilities.ts';
import {sqlConceptPlans} from './curriculum.ts';
import {isSqlSource,isOfficialSqlSource,type SqlVariant,type SqlVariantAssessment,type SqlExampleAction,type VerifiedSqliteExample,type SqlDialectId} from './contracts.ts';

const object=(v:unknown):Record<string,unknown>|null=>v!==null&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:null;
const text=(v:unknown):v is string=>typeof v==='string'&&Boolean(v.trim());

export function assessSqlVariant(input:unknown,examples:readonly VerifiedSqliteExample[]=[]):SqlVariantAssessment {
  const v=object(input),errors:string[]=[];
  if(!v)return {status:'invalid',reasons:['Variante inválida']};
  const plan=sqlConceptPlans.find(c=>c.id===v.conceptId);
  if(!plan||!text(v.feature)||!Object.hasOwn(v,'feature'))errors.push('Identidad de concepto o capacidad inválida');
  if(plan&&v.feature!==plan.feature)errors.push('La capacidad no pertenece al concepto');
  if(!sqlDialects.some(d=>d.id===v.dialectId))errors.push('Dialecto desconocido');
  if(typeof v.stage!=='string'||!['draft','reviewed'].includes(v.stage)||typeof v.support!=='string'||!['native','equivalent','unavailable'].includes(v.support))errors.push('Estado documental inválido');
  if(errors.length)return {status:'invalid',reasons:errors};
  if(v.stage==='draft')return {status:'pending',reasons:['Contenido todavía en borrador']};
  const dialect=v.dialectId as SqlDialectId;
  const sources=Array.isArray(v.sources)?v.sources:[];
  if(!sources.length||!sources.every(isSqlSource)||!sources.some(s=>isSqlSource(s)&&isOfficialSqlSource(s,dialect)))errors.push('Faltan fuentes oficiales con fecha y versión válidas');
  if(v.support==='unavailable'){
    if(!text(v.explanation)||v.code!==undefined)errors.push('Una operación no disponible requiere explicación y no publica SQL ejecutable');
  }else if(!text(v.code))errors.push('Falta el SQL del dialecto documental');
  const local=object(v.localExecution);
  if(!local||typeof local.kind!=='string'||!['sqlite','sqlite-equivalent','external'].includes(local.kind))errors.push('Compatibilidad de ejecución inválida');
  else if(local.kind==='external'){
    if(!text(local.explanation))errors.push('Falta explicar la ejecución externa');
  }else{
    if(v.support==='unavailable')errors.push('Una operación no disponible no habilita ejecución local');
    const matches=examples.filter(e=>e.id===local.exampleId);
    const binding=matches[0];
    if(matches.length!==1||binding.runtimeId!=='sqlite-wasm'||binding.status!=='verified'||!text(binding.code)||binding.conceptId!==v.conceptId)errors.push('Falta un único ejemplo SQLite verificado para este concepto');
    else if(local.kind==='sqlite'&&binding.code!==v.code)errors.push('El ejemplo local no coincide con el SQL publicado');
    else if(local.kind==='sqlite-equivalent'&&!binding.equivalentTo?.some(e=>e.dialectId===dialect&&e.code===v.code))errors.push('La equivalencia con el código y dialecto documentales no está revisada');
    if(local.kind==='sqlite-equivalent'&&!text(local.explanation))errors.push('El equivalente local debe explicarse');
  }
  if(errors.length)return {status:'invalid',reasons:errors};
  const capability=getSqlCapability(v.feature as string,dialect);
  if(capability.status==='pending')return {status:'pending',reasons:[capability.reason]};
  if(capability.support!==v.support)return {status:'invalid',reasons:['La variante contradice la capacidad revisada']};
  return {status:'ready',reasons:[]};
}

/** Una acción prepara/copia código. Nunca ejecuta ni modifica el workspace. */
export function resolveSqlExampleAction(input:unknown,examples:readonly VerifiedSqliteExample[]=[]):SqlExampleAction {
  const assessment=assessSqlVariant(input,examples);
  if(assessment.status!=='ready')return Object.freeze({kind:'disabled',label:'Pendiente de revisión',reason:assessment.reasons.join('; '),executesAutomatically:false});
  const v=input as SqlVariant,local=v.localExecution;
  if(local.kind==='external')return Object.freeze({kind:'external',label:v.support==='unavailable'?'Ver alternativa':'Copiar SQL',reason:local.explanation,...(v.code?{code:v.code}:{}),executesAutomatically:false});
  const binding=examples.find(e=>e.id===local.exampleId)!;
  return Object.freeze({kind:local.kind,label:local.kind==='sqlite'?'Probar en SQLite':'Probar equivalente en SQLite',
    code:binding.code,exampleId:binding.id,...(local.kind==='sqlite-equivalent'?{reason:local.explanation}:{}),executesAutomatically:false});
}
