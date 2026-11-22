import {defineSqlGroup} from './factory.ts';import results from './results/distinct.ts';
const one={title:'Categorías que tienen productos',code:'SELECT DISTINCT categoria FROM productos\nORDER BY categoria;',hint:'Cada categoría aparece una vez, aunque tenga varios productos.'};
export const notes=defineSqlGroup([
 {key:'distinct/definicion',examples:[one],remember:'DISTINCT actúa sobre todas las columnas seleccionadas.'},
 {key:'distinct/columna',examples:[one],remember:'No cambia las filas originales; elimina repeticiones de esta salida.'},
 {key:'distinct/varias-columnas',examples:[{title:'Pares de categoría y proveedor',code:'SELECT DISTINCT categoria, proveedor_id FROM productos\nORDER BY categoria, proveedor_id;',hint:'La categoría puede repetirse si cambia el proveedor.'}],remember:'Se elimina una fila solo cuando se repite toda su combinación de valores.'},
],results);
