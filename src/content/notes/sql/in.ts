import {defineSqlGroup} from './factory.ts';import results from './results/in.ts';
const list={title:'Elegir categorías',code:"SELECT nombre FROM productos\nWHERE categoria IN ('Audio', 'Pantallas');",hint:'Conserva cualquiera de los valores de la lista.'};
export const notes=defineSqlGroup([
 {key:'in/definicion',examples:[list],remember:'IN evita repetir la misma columna con varios OR.'},
 {key:'in/lista',examples:[list],remember:'Usa paréntesis y comas. No escribas toda la lista como una sola cadena.'},
 {key:'in/not-in',examples:[{title:'Excluir dos proveedores',code:'SELECT nombre FROM productos\nWHERE proveedor_id NOT IN (1, 2);',hint:'Un proveedor_id NULL tampoco pasa este filtro.'},{title:'Por qué un NULL cambia la comparación',code:'SELECT nombre FROM productos\nWHERE proveedor_id NOT IN (1, NULL);',hint:'Aquí no se devuelve ninguna fila: no se puede asegurar que el valor esté fuera de una lista que contiene un desconocido.'}],remember:'NOT IN con NULL no equivale a «todo lo demás». IS NULL permite tratar los datos ausentes por separado.'},
],results);
