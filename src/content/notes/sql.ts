// Agregador para validación nativa. Las páginas importan solo su grupo.
import {notes as group0} from './sql/select.ts';
import {notes as group1} from './sql/limit.ts';
import {notes as group2} from './sql/where.ts';
import {notes as group3} from './sql/between.ts';
import {notes as group4} from './sql/in.ts';
import {notes as group5} from './sql/like.ts';
import {notes as group6} from './sql/order-by.ts';
import {notes as group7} from './sql/distinct.ts';
import {notes as group8} from './sql/join.ts';
import {notes as group9} from './sql/outer-joins.ts';
import {notes as group10} from './sql/null.ts';
import {notes as group11} from './sql/coalesce.ts';
import {notes as group12} from './sql/case.ts';
import {notes as group13} from './sql/cast.ts';
export type {SqlConcept,SqlExample} from './sql/factory.ts';
export const sqlBasePath='/apuntes/analisis-de-datos/sql';
export const sqlConcepts=[...group0,...group1,...group2,...group3,...group4,...group5,...group6,...group7,...group8,...group9,...group10,...group11,...group12,...group13];
export function getSqlConcept(id:string){return sqlConcepts.find(c=>c.id===id||c.conceptId===id);}
