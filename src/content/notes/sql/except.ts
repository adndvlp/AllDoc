import {defineSqlGroup} from './factory.ts';
import results from './results/except.ts';
export const notes=defineSqlGroup([
  {
    "key": "except/definicion",
    "examples": [
      {
        "title": "Clientes sin pedidos",
        "code": "SELECT id AS cliente_id FROM clientes\nEXCEPT\nSELECT cliente_id FROM pedidos\nORDER BY cliente_id;",
        "hint": "La resta es primera menos segunda; invertirlas cambia el resultado."
      }
    ],
    "remember": "La comparación es por filas completas y elimina duplicados."
  },
  {
    "key": "except/equivalentes",
    "examples": [
      {
        "title": "Diferencia con nombre equivalente",
        "code": "SELECT id AS cliente_id FROM clientes\nEXCEPT\nSELECT cliente_id FROM pedidos\nORDER BY cliente_id;",
        "hint": "SQLite usa EXCEPT; en Oracle también existe el nombre MINUS.",
        "changes": {
          "oracle": {
            "code": "SELECT id AS cliente_id FROM clientes\nMINUS\nSELECT cliente_id FROM pedidos\nORDER BY cliente_id;",
            "explanation": "MINUS es el nombre tradicional de Oracle; Oracle 26 también admite EXCEPT."
          }
        }
      }
    ],
    "remember": "Oracle 26 admite EXCEPT y MINUS; verifica la versión de tu propio servidor."
  }
],results);
