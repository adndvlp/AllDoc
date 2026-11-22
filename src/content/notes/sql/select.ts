import {defineSqlGroup} from './factory.ts';import results from './results/select.ts';
const all={title:'Todas las columnas',code:'SELECT * FROM productos;',hint:'FROM indica la tabla. El asterisco (*) pide todas sus columnas.'};
const columns={title:'Columnas concretas',code:'SELECT nombre, precio FROM productos;',hint:'Separa los nombres de las columnas con comas.'};
export const notes=defineSqlGroup([
 {key:'select/definicion',examples:[{...all,id:'sql/select/todas-las-columnas'},{...columns,id:'sql/select/columnas-concretas'}],remember:'SELECT elige las columnas. FROM indica la tabla.'},
 {key:'select/todas-las-columnas',examples:[all],remember:'* pide todas las columnas, no una cantidad de filas.'},
 {key:'select/columnas-concretas',examples:[columns],remember:'Las columnas aparecen en el orden en que las escribes.'},
 {key:'select/alias',examples:[{title:'Un nombre claro en el resultado',code:'SELECT nombre AS producto, precio AS precio_mxn\nFROM productos;',hint:'AS solo cambia el encabezado de la salida; no renombra la columna de la tabla.'}],remember:'Un alias no modifica tus datos.'},
 {key:'select/comentarios',examples:[{id:'sql/comentarios/una-linea',title:'Una línea o al final',code:'-- Consultar productos\nSELECT * FROM productos; -- Nota',hint:'-- comenta hasta el final de la línea. Deja un espacio después de los guiones.'},{id:'sql/comentarios/varias-lineas',title:'Varias líneas',code:'/* Esta consulta obtiene\n   todos los productos */\nSELECT * FROM productos;',hint:'Encierra el comentario entre /* y */.'}],remember:'Los comentarios no se ejecutan.',note:'No anides bloques: su compatibilidad cambia entre motores.'},
],results);
