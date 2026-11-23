import {defineSqlGroup} from './factory.ts';
import results from './results/union.ts';
export const notes=defineSqlGroup([
  {
    "key": "union/definicion",
    "examples": [
      {
        "title": "Categorías de dos selecciones",
        "code": "SELECT categoria FROM productos WHERE id IN (1, 3)\nUNION\nSELECT categoria FROM productos WHERE id IN (2, 4)\nORDER BY categoria;",
        "hint": "Accesorios aparece una vez aunque esté en ambos resultados."
      }
    ],
    "remember": "Se compara la fila completa, no solo su primera columna."
  },
  {
    "key": "union/union-all",
    "examples": [
      {
        "title": "Conservar todas las categorías",
        "code": "SELECT categoria FROM productos WHERE id IN (1, 3)\nUNION ALL\nSELECT categoria FROM productos WHERE id IN (2, 4)\nORDER BY categoria;",
        "hint": "Accesorios aparece dos veces."
      }
    ],
    "remember": "Usa ALL cuando las repeticiones formen parte de lo que necesitas."
  },
  {
    "key": "union/order-by",
    "examples": [
      {
        "title": "Ordenar ambas selecciones juntas",
        "code": "SELECT nombre, precio FROM productos WHERE id <= 2\nUNION ALL\nSELECT nombre, precio FROM productos WHERE id = 3\nORDER BY precio DESC, nombre;",
        "hint": "El orden se aplica después de unir las dos selecciones."
      }
    ],
    "remember": "Las columnas deben ser compatibles y los alias vienen de la primera consulta."
  }
],results);
