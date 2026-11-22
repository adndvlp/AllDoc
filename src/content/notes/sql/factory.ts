import {sqlConceptPlans,sqlCurriculum} from '../../sql/curriculum.ts';
import {publishedSqlMetadata} from '../../sql/published.ts';
import {getSqlCapability} from '../../sql/capabilities.ts';
import {resolveSqlExampleAction} from '../../sql/variants.ts';
import type {SqlDialectId,SqlVariant,VerifiedSqliteExample} from '../../sql/contracts.ts';

export type SqlOutput={columns:string[];rows:string[][]};
export type ExampleChange={code?:string;explanation:string;unavailable?:boolean;alternative?:{label:string;href:string}};
export type SqlExample={id:string;title:string;code:string;hint:string;output:SqlOutput;changes?:Partial<Record<SqlDialectId,ExampleChange>>};
export type SqlConcept={id:string;conceptId:string;key:string;slug:string;title:string;description:string;number:string;order:number;examples:[SqlExample,...SqlExample[]];remember:string;note?:string};
type Input={key:string;examples:readonly {title:string;code:string;hint:string;id?:string;changes?:SqlExample['changes']}[];remember:string;note?:string};
export function defineSqlGroup(inputs:readonly Input[],outputs:Readonly<Record<string,SqlOutput>>):SqlConcept[]{
 return inputs.map(input=>{const plan=sqlConceptPlans.find(p=>p.key===input.key);if(!plan)throw new Error('Concepto no planificado: '+input.key);const m=publishedSqlMetadata.find(m=>m.id===plan.id);if(!m)throw new Error('Concepto no publicado: '+input.key);
  return {...m,key:input.key,id:m.id.slice('analisis-de-datos/sql/'.length),conceptId:m.id,number:String(m.order),examples:input.examples.map((e,i)=>({...e,id:e.id??'sql/'+input.key+'/ejemplo-'+(i+1),output:outputs[e.id??'sql/'+input.key+'/ejemplo-'+(i+1)]??{columns:[],rows:[]}})) as SqlConcept['examples'],remember:input.remember,...(input.note?{note:input.note}:{})};});
}
export function resolveNoteExample(concept:SqlConcept,example:SqlExample,dialect:SqlDialectId){
 const plan=sqlConceptPlans.find(c=>c.id===concept.conceptId)!;const cell=getSqlCapability(plan.feature,dialect);const change=example.changes?.[dialect];
 const code=change?.unavailable?undefined:change?.code??example.code;
 const examples:VerifiedSqliteExample[]=example.output.columns.length?[{id:example.id,conceptId:concept.conceptId,code:example.code,runtimeId:'sqlite-wasm',status:'verified',
  equivalentTo:code&&code!==example.code?[{dialectId:dialect,code}]:[]}]:[];
 const explanation=change?.explanation??(cell.status==='reviewed'?cell.explanation:'Revisión pendiente.');
 const variant:SqlVariant={conceptId:concept.conceptId,feature:plan.feature,dialectId:dialect,stage:'reviewed',support:cell.status==='reviewed'?cell.support:'native',
  ...(code?{code}:{}),explanation,sources:cell.status==='reviewed'?cell.sources:[],localExecution:!code?{kind:'external',explanation}:code===example.code?{kind:'sqlite',exampleId:example.id}:{kind:'sqlite-equivalent',exampleId:example.id,explanation:'El panel ejecuta SQLite. Se preparará este equivalente: '+example.code}};
 const action=resolveSqlExampleAction(variant,examples);
 return {variant,action,explanation,alternative:action.kind==='external'?(change?.alternative??{label:'Ver variante SQLite',href:concept.slug+'?dialect=sqlite'}):undefined};
}
export function groupForConcept(concept:SqlConcept){return sqlCurriculum.find(g=>g.children.some(c=>c.id===concept.conceptId))!;}
