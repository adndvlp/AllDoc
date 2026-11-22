import {defineSqlGroup} from './factory.ts';
import results from './results/group-by.ts';
export const notes=defineSqlGroup([
  {
    "key": "group-by/definicion",
    "examples": [
      {
        "title": "Productos por categoría",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos GROUP BY categoria ORDER BY categoria;",
        "hint": "Una fila por categoría presente en productos."
      }
    ],
    "remember": "Cada columna sin agregar debe formar parte del GROUP BY."
  },
  {
    "key": "group-by/varias-columnas",
    "examples": [
      {
        "title": "Categoría y estado",
        "code": "SELECT categoria, activo, COUNT(*) AS total\nFROM productos\nGROUP BY categoria, activo ORDER BY categoria, activo;",
        "hint": "Audio activo y Audio inactivo son grupos diferentes."
      }
    ],
    "remember": "Agrupar no ordena la salida: usa ORDER BY."
  },
  {
    "key": "group-by/having",
    "examples": [
      {
        "title": "Categorías con varios productos",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos GROUP BY categoria\nHAVING COUNT(*) >= 3 ORDER BY categoria;",
        "hint": "Deja solo las categorías que tienen al menos tres productos."
      }
    ],
    "remember": "WHERE filtra filas; HAVING filtra grupos."
  },
  {
    "key": "group-by/where-y-having",
    "examples": [
      {
        "title": "Grupos de productos activos",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos WHERE activo = 1\nGROUP BY categoria HAVING COUNT(*) >= 3\nORDER BY categoria;",
        "hint": "No cuenta los productos inactivos al formar los grupos."
      }
    ],
    "remember": "WHERE va antes de GROUP BY; HAVING va después."
  }
],results);
