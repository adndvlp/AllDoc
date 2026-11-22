import {defineSqlGroup} from './factory.ts';import results from './results/case.ts';
const item={title:'Etiquetar el precio',code:"SELECT nombre, CASE WHEN precio >= 1000 THEN 'Alto'\n                    ELSE 'Accesible' END AS nivel\nFROM productos ORDER BY id;",hint:'WHEN es la condición, THEN su valor y ELSE la alternativa.'};
export const notes=defineSqlGroup([
 {key:'case/definicion',examples:[item],remember:'CASE calcula una columna; no modifica el precio de la tabla.'},
 {key:'case/condiciones',examples:[{title:'Varias condiciones, en orden',code:"SELECT nombre, CASE WHEN precio = 0 THEN 'Sin precio'\n  WHEN precio >= 1000 THEN 'Alto' ELSE 'Accesible' END AS nivel\nFROM productos ORDER BY id;",hint:'Se utiliza el primer WHEN verdadero. END termina el CASE.'}],remember:'Sin ELSE y sin coincidencia, CASE devuelve NULL.'},
],results);
