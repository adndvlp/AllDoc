import {defineSqlGroup} from './factory.ts';
import results from './results/intersect.ts';
export const notes=defineSqlGroup([
  {
    "key": "intersect/definicion",
    "examples": [
      {
        "title": "Clientes con pedidos y saldo alto",
        "code": "SELECT cliente_id FROM pedidos\nINTERSECT\nSELECT cliente_id FROM cuentas WHERE saldo >= 13000\nORDER BY cliente_id;",
        "hint": "La fila debe aparecer en las dos consultas."
      }
    ],
    "remember": "Sin ALL elimina duplicados; no se trata de unir columnas como JOIN."
  },
  {
    "key": "intersect/columnas",
    "examples": [
      {
        "title": "Comparar parejas de valores",
        "code": "SELECT nombre, categoria FROM productos WHERE precio >= 500\nINTERSECT\nSELECT nombre, categoria FROM productos WHERE activo = 1\nORDER BY nombre, categoria;",
        "hint": "Compara la pareja nombre/categoria completa."
      }
    ],
    "remember": "No mezcles tipos incompatibles esperando la misma conversión en todos los motores."
  }
],results);
