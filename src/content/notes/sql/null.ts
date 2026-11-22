import {defineSqlGroup} from './factory.ts';import results from './results/null.ts';
const absent={title:'Clientes sin teléfono',code:'SELECT nombre, telefono FROM clientes\nWHERE telefono IS NULL ORDER BY id;',hint:'IS NULL busca el dato ausente; telefono = NULL no sirve para comprobarlo.'};
export const notes=defineSqlGroup([
 {key:'null/definicion',examples:[absent],remember:'NULL no es cero ni, en general, una cadena vacía.',note:'Oracle trata la cadena vacía como NULL. WHERE solo conserva condiciones verdaderas; desconocido no es verdadero.'},
 {key:'null/is-null',examples:[absent],remember:'Usa IS NULL para buscar un dato que falta.'},
 {key:'null/is-not-null',examples:[{title:'Clientes con teléfono presente',code:'SELECT nombre, telefono FROM clientes\nWHERE telefono IS NOT NULL ORDER BY id;',hint:'En SQLite una cadena vacía sigue siendo un valor presente.'}],remember:'IS NOT NULL no comprueba que el texto tenga contenido. Oracle trata el texto vacío como NULL.'},
 {key:'null/nullif',examples:[{title:'Tratar el precio cero como ausente',code:'SELECT nombre, NULLIF(precio, 0) AS precio_valido\nFROM productos WHERE id >= 16 ORDER BY id;',hint:'Solo en esta salida: el cero se vuelve NULL; los demás precios se conservan.'}],remember:'NULLIF(a, b): si son iguales devuelve NULL; si no, devuelve a.'},
],results);
