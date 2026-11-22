import {defineSqlGroup} from './factory.ts';import results from './results/coalesce.ts';
export const notes=defineSqlGroup([
 {key:'coalesce/definicion',examples:[{title:'Mostrar un valor de reserva',code:"SELECT nombre, COALESCE(telefono, 'Sin teléfono') AS contacto\nFROM clientes ORDER BY id;",hint:'Usa telefono si está presente; si es NULL, muestra el texto de reserva.'}],remember:'COALESCE no reemplaza por sí solo una cadena vacía.'},
 {key:'coalesce/alternativas',examples:[{title:'Teléfono, email y valor de reserva',code:"SELECT nombre,\n  COALESCE(NULLIF(telefono, ''), email, 'Sin contacto') AS contacto\nFROM clientes ORDER BY id;",hint:'NULLIF convierte el teléfono vacío en NULL. COALESCE prueba después el email.'}],remember:'Gana el primer valor no nulo. Usa alternativas de tipos compatibles.'},
],results);
