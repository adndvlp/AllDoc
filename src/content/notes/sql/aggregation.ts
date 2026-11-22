import {defineSqlGroup} from './factory.ts';
import results from './results/aggregation.ts';
export const notes=defineSqlGroup([
  {
    "key": "aggregation/definicion",
    "examples": [
      {
        "title": "Cuántos productos hay",
        "code": "SELECT COUNT(*) AS total FROM productos;",
        "hint": "Las 18 filas se resumen en una sola."
      }
    ],
    "remember": "Sin GROUP BY se resume todo el conjunto filtrado."
  },
  {
    "key": "aggregation/count",
    "examples": [
      {
        "title": "Filas y valores presentes",
        "code": "SELECT COUNT(*) AS filas, COUNT(proveedor_id) AS con_proveedor\nFROM productos;",
        "hint": "Hay 18 productos, pero solo 16 tienen proveedor."
      },
      {
        "title": "Valores distintos",
        "code": "SELECT COUNT(DISTINCT categoria) AS categorias\nFROM productos;",
        "hint": "Cuenta las categorías presentes una vez; omite NULL."
      }
    ],
    "remember": "COUNT(columna) omite NULL; COUNT(*) cuenta todas las filas."
  },
  {
    "key": "aggregation/sum",
    "examples": [
      {
        "title": "Unidades en stock",
        "code": "SELECT SUM(stock) AS unidades FROM productos;",
        "hint": "Un total para todos los productos."
      }
    ],
    "remember": "SUM omite NULL; sin valores devuelve NULL, no cero."
  },
  {
    "key": "aggregation/avg",
    "examples": [
      {
        "title": "Precio promedio",
        "code": "SELECT AVG(precio * 1.0) AS precio_promedio FROM productos;",
        "hint": "El 1.0 conserva la parte decimal también en SQL Server."
      }
    ],
    "remember": "NULL no cuenta en el divisor; cero sí cuenta."
  },
  {
    "key": "aggregation/min",
    "examples": [
      {
        "title": "Precio mínimo",
        "code": "SELECT MIN(precio) AS menor_precio FROM productos;",
        "hint": "El producto sin costo tiene precio 0: es un valor presente."
      }
    ],
    "remember": "MIN(columna) resume filas. MIN(a, b) de SQLite no es portátil."
  },
  {
    "key": "aggregation/max",
    "examples": [
      {
        "title": "Precio máximo",
        "code": "SELECT MAX(precio) AS mayor_precio FROM productos;",
        "hint": "Devuelve el precio más alto, no el producto completo."
      }
    ],
    "remember": "MAX omite NULL; para conocer su fila necesitas otra consulta."
  },
  {
    "key": "aggregation/string-aggregate",
    "examples": [
      {
        "title": "Tres nombres en una celda",
        "code": "SELECT GROUP_CONCAT(nombre, ', ' ORDER BY id) AS nombres\nFROM productos WHERE id <= 3;",
        "hint": "Resultado: Teclado, Mouse, Monitor.",
        "changes": {
          "postgresql": {
            "code": "SELECT STRING_AGG(nombre, ', ' ORDER BY id) AS nombres\nFROM productos WHERE id <= 3;",
            "explanation": "PostgreSQL usa STRING_AGG; el orden está dentro del agregado."
          },
          "sqlserver": {
            "code": "SELECT STRING_AGG(nombre, ', ') WITHIN GROUP (ORDER BY id) AS nombres\nFROM productos WHERE id <= 3;",
            "explanation": "SQL Server usa STRING_AGG con WITHIN GROUP."
          },
          "oracle": {
            "code": "SELECT LISTAGG(nombre, ', ') WITHIN GROUP (ORDER BY id) AS nombres\nFROM productos WHERE id <= 3;",
            "explanation": "Oracle usa LISTAGG con WITHIN GROUP."
          },
          "mysql": {
            "code": "SELECT GROUP_CONCAT(nombre ORDER BY id SEPARATOR ', ') AS nombres\nFROM productos WHERE id <= 3;",
            "explanation": "Usa SEPARATOR para el separador; el tamaño máximo depende de group_concat_max_len."
          },
          "mariadb": {
            "code": "SELECT GROUP_CONCAT(nombre ORDER BY id SEPARATOR ', ') AS nombres\nFROM productos WHERE id <= 3;",
            "explanation": "Usa SEPARATOR para el separador; el tamaño máximo depende de group_concat_max_len."
          }
        }
      }
    ],
    "remember": "El orden de la lista debe ir dentro del agregado.",
    "note": "Los límites de longitud y el tratamiento de un desbordamiento dependen del motor."
  },
  {
    "key": "aggregation/combinaciones",
    "examples": [
      {
        "title": "Cantidad y extremos",
        "code": "SELECT COUNT(*) AS total, MIN(precio) AS minimo,\n       MAX(precio) AS maximo\nFROM productos;",
        "hint": "Cada agregado aporta una columna a la misma fila."
      }
    ],
    "remember": "No mezcles una columna cualquiera sin agrupar con estos resúmenes."
  },
  {
    "key": "aggregation/con-where",
    "examples": [
      {
        "title": "Solo productos activos",
        "code": "SELECT AVG(precio * 1.0) AS promedio\nFROM productos WHERE activo = 1;",
        "hint": "Primero se filtran las filas; después se calcula su promedio."
      },
      {
        "title": "Sin coincidencias",
        "code": "SELECT COUNT(*) AS filas, SUM(precio) AS suma,\n       AVG(precio * 1.0) AS promedio,\n       MIN(precio) AS minimo, MAX(precio) AS maximo\nFROM productos WHERE id < 0;",
        "hint": "La salida aún tiene una fila de resumen: 0 y cuatro NULL."
      }
    ],
    "remember": "Sin filas, COUNT devuelve 0; SUM, AVG, MIN y MAX devuelven NULL."
  }
],results);
