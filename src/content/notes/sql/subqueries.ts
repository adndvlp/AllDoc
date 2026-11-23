import {defineSqlGroup} from './factory.ts';
import results from './results/subqueries.ts';
export const notes=defineSqlGroup([
  {
    "key": "subqueries/definicion",
    "examples": [
      {
        "title": "El producto de mayor precio",
        "code": "SELECT nombre, precio FROM productos\nWHERE precio = (SELECT MAX(precio) FROM productos) ORDER BY id;",
        "hint": "La consulta interna obtiene el máximo; la externa devuelve todos los empates."
      }
    ],
    "remember": "Una subconsulta usada como valor debe producir como máximo una fila."
  },
  {
    "key": "subqueries/where",
    "examples": [
      {
        "title": "Comparar con el máximo",
        "code": "SELECT nombre, precio FROM productos\nWHERE precio = (SELECT MAX(precio) FROM productos) ORDER BY id;",
        "hint": "La consulta interna obtiene el máximo; la externa devuelve todos los empates."
      }
    ],
    "remember": "Una subconsulta usada como valor debe producir como máximo una fila."
  },
  {
    "key": "subqueries/in",
    "examples": [
      {
        "title": "Categorías con varios productos",
        "code": "SELECT nombre, categoria FROM productos\nWHERE categoria IN (SELECT categoria FROM productos\n  GROUP BY categoria HAVING COUNT(*) >= 3) ORDER BY id;",
        "hint": "La consulta interna elige categorías, no productos individuales."
      }
    ],
    "remember": "La subconsulta de IN devuelve una columna; recuerda las reglas de NULL."
  },
  {
    "key": "subqueries/select",
    "examples": [
      {
        "title": "Precio y máximo global",
        "code": "SELECT nombre, precio,\n  (SELECT MAX(precio) FROM productos) AS maximo\nFROM productos WHERE id <= 3 ORDER BY id;",
        "hint": "El máximo aparece en cada fila de la consulta principal."
      }
    ],
    "remember": "No conviertas una consulta de varias filas en un valor sin definir cuál necesitas."
  },
  {
    "key": "subqueries/exists",
    "examples": [
      {
        "title": "Clientes con pedidos",
        "code": "SELECT c.id, c.nombre FROM clientes c\nWHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id)\nORDER BY c.id;",
        "hint": "Devuelve al cliente una sola vez aunque tenga muchos pedidos."
      }
    ],
    "remember": "Importa que exista una fila; SELECT 1 no cuenta los pedidos."
  },
  {
    "key": "subqueries/not-exists",
    "examples": [
      {
        "title": "Clientes sin pedidos",
        "code": "SELECT c.id, c.nombre FROM clientes c\nWHERE NOT EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id)\nORDER BY c.id;",
        "hint": "Incluye los clientes 19 a 24."
      }
    ],
    "remember": "NOT EXISTS evita la trampa de NOT IN con un NULL en su lista."
  }
],results);
