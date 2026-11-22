import type {SqlDialectId} from './contracts.ts';
export const sqlDialectStorageKey='alldoc:sql-dialect:v1';
export type DialectStorage=Pick<Storage,'getItem'|'setItem'>;
const valid=(v:unknown):v is SqlDialectId=>typeof v==='string'&&['sqlite','postgresql','mysql','sqlserver','mariadb','oracle'].includes(v);
export function createSqlDialectStore(storage?:()=>DialectStorage){
  let current:SqlDialectId='sqlite',preferred:SqlDialectId='sqlite';const listeners=new Set<()=>void>();
  const publish=(value:SqlDialectId)=>{if(current!==value){current=value;for(const f of Array.from(listeners))f();}};
  return {getSnapshot:()=>current,getServerSnapshot:():SqlDialectId=>'sqlite',
    subscribe:(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};},
    navigate(search:string){try{const saved=storage?.().getItem(sqlDialectStorageKey);if(valid(saved))preferred=saved;}catch{}
      const values=new URLSearchParams(search).getAll('dialect');publish(values.length?values.length===1&&valid(values[0])?values[0]:'sqlite':preferred);},
    select(value:unknown){if(!valid(value))return;preferred=value;try{storage?.().setItem(sqlDialectStorageKey,value);}catch{}publish(value);}};
}
