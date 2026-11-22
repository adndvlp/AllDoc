import {defineSqlGroup} from './factory.ts';import results from './results/between.ts';
const range={title:'De 250 a 1000 pesos',code:'SELECT nombre, precio FROM productos\nWHERE precio BETWEEN 250 AND 1000;',hint:'Incluye los productos de 250 y de 1000 pesos.'};
export const notes=defineSqlGroup([
 {key:'between/definicion',examples:[range],remember:'BETWEEN a AND b equivale a >= a y <= b.'},
 {key:'between/rango',examples:[range],remember:'Escribe primero el extremo menor. Los dos extremos están incluidos.'},
 {key:'between/not-between',examples:[{title:'Fuera de ese rango',code:'SELECT nombre, precio FROM productos\nWHERE precio NOT BETWEEN 250 AND 1000;',hint:'Deja precios menores que 250 o mayores que 1000.'}],remember:'Un precio NULL seguiría siendo desconocido y WHERE no lo incluiría.'},
],results);
