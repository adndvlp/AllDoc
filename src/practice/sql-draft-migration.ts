import type {Workspace} from './contracts.ts';
export function sqlDraftMigrationCandidates(seed:Workspace):readonly string[]{
  if(seed.toolKey!=='analisis-de-datos/sql'||seed.profileId!=='sql-sqlite'||seed.dataset.id!=='negocio-relacional'||seed.dataset.version!==1
    ||seed.id!==JSON.stringify([seed.toolKey,seed.profileId,seed.dataset.id,seed.dataset.version]))return [];
  return [JSON.stringify([seed.toolKey,seed.profileId,'productos-basico',1])];
}
