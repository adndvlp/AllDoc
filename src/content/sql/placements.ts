import {sqlConceptPlans} from './curriculum.ts';
import type {SqlLocationId} from './contracts.ts';
export const sqlPracticeIdentity=Object.freeze({toolId:'sql',toolKey:'analisis-de-datos/sql',profileId:'sql-sqlite'});
export const sqlLocations=Object.freeze([
  Object.freeze({id:'analisis-de-datos' as const,basePath:'/apuntes/analisis-de-datos/sql',stage:'existing' as const}),
  Object.freeze({id:'lenguajes' as const,basePath:'/apuntes/lenguajes/sql',stage:'planned' as const}),
]);
export type SqlPlacement=Readonly<{
  conceptId:string;canonicalPath:string;path:string;locationId:SqlLocationId;
  stage:'planned'|'published-legacy';locationStage:'existing'|'planned';practice:typeof sqlPracticeIdentity;
}>;

/** Resuelve el plan; no registra rutas ni habilita el área en Docusaurus. */
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
