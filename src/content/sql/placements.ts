import {sqlConceptPlans} from './curriculum.ts';
import type {SqlLocationId} from './contracts.ts';
export const sqlPracticeIdentity=Object.freeze({toolId:'sql',toolKey:'analisis-de-datos/sql',profileId:'sql-sqlite'});
export const sqlLocations=Object.freeze([
  Object.freeze({id:'analisis-de-datos' as const,basePath:'/apuntes/analisis-de-datos/sql',stage:'existing' as const}),
  Object.freeze({id:'lenguajes' as const,basePath:'/apuntes/lenguajes/sql',stage:'existing' as const}),
]);
const byId=new Map(sqlConceptPlans.map(c=>[c.id,c]));
export type SqlPlacement=Readonly<{
  conceptId:string;canonicalPath:string;path:string;locationId:SqlLocationId;
  stage:'planned'|'published-legacy'|'published';locationStage:'existing'|'planned';practice:typeof sqlPracticeIdentity;
}>;

/** Las ubicaciones presentan el mismo concepto y workspace SQL. */
export function resolveSqlPlacement(pathname:string):SqlPlacement|null {
  if(!pathname.startsWith('/')||pathname.startsWith('//')||pathname.includes('\\'))return null;
  const path=pathname.split(/[?#]/,1)[0].replace(/\/$/,'');
  for(const location of sqlLocations){
    if(!path.startsWith(location.basePath+'/'))continue;
    const suffix=path.slice(location.basePath.length);
    const c=sqlConceptPlans.find(c=>c.canonicalPath===sqlLocations[0].basePath+suffix);
    return c?Object.freeze({conceptId:c.id,canonicalPath:c.canonicalPath,path,locationId:location.id,
      stage:c.stage,locationStage:location.stage,practice:sqlPracticeIdentity}):null;
  }
  return null;
}

export function sqlPathForLocation(conceptId:string,locationId:SqlLocationId):string|null {
 const concept=byId.get(conceptId),location=sqlLocations.find(l=>l.id===locationId);
 return concept&&concept.stage!=='planned'&&location?location.basePath+concept.canonicalPath.slice(sqlLocations[0].basePath.length):null;
}
export function sqlDocIdForLocation(conceptId:string,locationId:SqlLocationId):string|null {
 const concept=byId.get(conceptId);if(!concept||concept.stage==='planned'||!sqlLocations.some(l=>l.id===locationId))return null;
 return locationId==='analisis-de-datos'&&concept.stage==='published-legacy'?concept.id:locationId+'/sql/'+concept.file.replace(/\.mdx$/,'');
}
export function sqlHrefInLocation(href:string,locationId:SqlLocationId):string {
 const placement=resolveSqlPlacement(href);if(!placement)return href;
 const rawPath=href.split(/[?#]/,1)[0];return sqlPathForLocation(placement.conceptId,locationId)!+href.slice(rawPath.length);
}
export function resolveSqlDocument(docId:string):SqlPlacement|null {
 for(const location of sqlLocations){const concept=sqlConceptPlans.find(c=>sqlDocIdForLocation(c.id,location.id)===docId);if(concept)return resolveSqlPlacement(sqlPathForLocation(concept.id,location.id)!);}
 return null;
}
export function sqlAreaTarget(pathname:string,areaId:string):string {
 const current=resolveSqlPlacement(pathname);return current&&sqlLocations.some(l=>l.id===areaId)?sqlPathForLocation(current.conceptId,areaId as SqlLocationId)!:'/apuntes/'+areaId;
}
