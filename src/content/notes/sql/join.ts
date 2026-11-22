import {defineSqlGroup} from './factory.ts';import results from './results/join.ts';
const inner={title:'Pedidos con el nombre del cliente',code:'SELECT pedidos.id, clientes.nombre\nFROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id\nORDER BY pedidos.id;',hint:'INNER JOIN y JOIN expresan aquí la misma unión: conserva coincidencias.'};
export const notes=defineSqlGroup([
 {key:'join/definicion',examples:[inner],remember:'Una fila puede aparecer varias veces si tiene varias coincidencias.'},
 {key:'join/on',examples:[inner],remember:'ON relaciona las tablas. WHERE filtra las filas de la salida.'},
 {key:'join/alias',examples:[{title:'Nombres cortos para las tablas',code:'SELECT p.id, c.nombre\nFROM pedidos p JOIN clientes c ON p.cliente_id = c.id\nORDER BY p.id;',hint:'p identifica pedidos; c identifica clientes. No cambia los nombres reales.'}],remember:'Escribe alias.columna cuando dos tablas tengan una columna con el mismo nombre.',note:'Se omite AS en los alias de tablas para que el ejemplo también funcione en Oracle.'},
 {key:'join/self-join',examples:[{title:'Empleado y su gerente',code:'SELECT e.nombre AS empleado, g.nombre AS gerente\nFROM empleados e JOIN empleados g ON e.gerente_id = g.id\nORDER BY e.id;',hint:'La misma tabla participa dos veces con papeles diferentes.'}],remember:'Este INNER JOIN deja fuera a empleados sin gerente. LEFT JOIN permite conservarlos.'},
 {key:'join/cross-join',examples:[{title:'Todas las parejas de almacén y cliente',code:'SELECT a.nombre AS almacen, c.nombre AS cliente\nFROM almacenes a CROSS JOIN clientes c\nORDER BY a.id, c.id;',hint:'3 almacenes × 24 clientes producen 72 combinaciones.'}],remember:'CROSS JOIN no necesita ON. La cantidad de filas puede crecer muy rápido.'},
],results);
