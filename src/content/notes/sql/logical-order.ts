import {defineSqlGroup} from './factory.ts';
import results from './results/logical-order.ts';
export const notes=defineSqlGroup([
  {
    "key": "logical-order/definicion",
    "examples": [
      {
        "title": "Filtrar, agrupar y ordenar",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos WHERE precio > 0\nGROUP BY categoria HAVING COUNT(*) >= 3\nORDER BY total DESC, categoria;",
        "hint": "FROM reúne; WHERE filtra; GROUP BY agrupa; HAVING filtra grupos; SELECT calcula; ORDER BY ordena."
      }
    ],
    "remember": "Orden lógico y plan físico no son lo mismo."
  },
  {
    "key": "logical-order/orden-logico",
    "examples": [
      {
        "title": "Pasos del resumen",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos WHERE precio > 0\nGROUP BY categoria HAVING COUNT(*) >= 3\nORDER BY total DESC, categoria;",
        "hint": "FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → límite."
      }
    ],
    "remember": "El alias total se usa en ORDER BY; no asumas que está disponible en WHERE."
  },
  {
    "key": "logical-order/plan-fisico",
    "examples": [
      {
        "title": "Una consulta, varios planes posibles",
        "code": "SELECT categoria, COUNT(*) AS total\nFROM productos WHERE precio > 0\nGROUP BY categoria HAVING COUNT(*) >= 3\nORDER BY total DESC, categoria;",
        "hint": "El optimizador puede usar índices o cambiar el recorrido; el orden lógico explica la consulta."
      }
    ],
    "remember": "La sintaxis no obliga al motor a recorrer todas las tablas en ese orden."
  }
],results);
