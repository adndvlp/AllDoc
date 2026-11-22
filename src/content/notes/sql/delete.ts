import {defineSqlGroup} from './factory.ts';
import results from './results/delete.ts';
export const notes=defineSqlGroup([
  {
    "key": "delete/definicion",
    "examples": [
      {
        "title": "Eliminar un movimiento",
        "code": "DELETE FROM movimientos_stock WHERE id = 1;\nSELECT COUNT(*) AS quedan FROM movimientos_stock WHERE id = 1;",
        "hint": "La cuenta queda en 0; la tabla sigue existiendo."
      }
    ],
    "remember": "Sin WHERE se eliminan todas las filas. Las claves foráneas pueden impedirlo o propagar el borrado."
  },
  {
    "key": "delete/condiciones",
    "examples": [
      {
        "title": "Solo movimientos antiguos",
        "code": "DELETE FROM movimientos_stock\nWHERE fecha < '2025-01-01' AND tipo = 'entrada';\nSELECT COUNT(*) AS restantes FROM movimientos_stock;",
        "hint": "Afecta a los movimientos que cumplen ambas condiciones.",
        "changes": {
          "oracle": {
            "code": "DELETE FROM movimientos_stock\nWHERE fecha < DATE '2025-01-01' AND tipo = 'entrada';\nSELECT COUNT(*) AS restantes FROM movimientos_stock;",
            "explanation": "DATE evita depender del formato de fecha de la sesión Oracle."
          },
          "postgresql": {
            "code": "DELETE FROM movimientos_stock\nWHERE fecha < DATE '2025-01-01' AND tipo = 'entrada';\nSELECT COUNT(*) AS restantes FROM movimientos_stock;",
            "explanation": "Declara explícitamente un literal de fecha."
          },
          "sqlserver": {
            "code": "DELETE FROM movimientos_stock\nWHERE fecha < CONVERT(date, '20250101', 112) AND tipo = 'entrada';\nSELECT COUNT(*) AS restantes FROM movimientos_stock;",
            "explanation": "CONVERT con estilo 112 no depende del formato de fecha de la sesión."
          }
        }
      }
    ],
    "remember": "Sin WHERE se eliminan todas las filas. Las claves foráneas pueden impedirlo o propagar el borrado."
  },
  {
    "key": "delete/comprobar-con-select",
    "examples": [
      {
        "title": "Revisar antes de borrar",
        "code": "SELECT * FROM movimientos_stock WHERE id = 1;\n-- Ejecuta primero solo el SELECT; después, el DELETE.\nDELETE FROM movimientos_stock WHERE id = 1;\nSELECT COUNT(*) AS quedan FROM movimientos_stock WHERE id = 1;",
        "hint": "Selecciona y ejecuta solo el primer SELECT si aún no quieres borrar."
      }
    ],
    "remember": "Sin WHERE se eliminan todas las filas. Las claves foráneas pueden impedirlo o propagar el borrado.",
    "note": "El resultado editorial corresponde al último SELECT; ejecutar todo sí borra."
  }
],results);
