import {defineSqlGroup} from './factory.ts';
import results from './results/numeric-functions.ts';
export const notes=defineSqlGroup([
  {
    "key": "numeric-functions/definicion",
    "examples": [
      {
        "title": "Precio entre tres",
        "code": "SELECT nombre, ROUND(precio * 1.0 / 3, 2) AS tercera_parte\nFROM productos WHERE id = 1;",
        "hint": "Multiplicar por 1.0 conserva decimales antes de redondear."
      }
    ],
    "remember": "El cálculo de SELECT no modifica el precio guardado."
  },
  {
    "key": "numeric-functions/round",
    "examples": [
      {
        "title": "Dos decimales",
        "code": "SELECT ROUND(precio * 1.0 / 3, 2) AS importe\nFROM productos WHERE id = 1;",
        "hint": "500 / 3 se muestra como 166.67."
      }
    ],
    "remember": "Redondea al final; los flotantes no representan todos los decimales exactamente."
  },
  {
    "key": "numeric-functions/abs",
    "examples": [
      {
        "title": "Diferencia sin signo",
        "code": "SELECT ABS(precio - 600) AS diferencia\nFROM productos WHERE id = 1;",
        "hint": "Entre 500 y 600 hay una diferencia de 100."
      }
    ],
    "remember": "ABS(-100) y ABS(100) dan 100."
  },
  {
    "key": "numeric-functions/division",
    "examples": [
      {
        "title": "División con decimales",
        "code": "SELECT precio * 1.0 / 3 AS tercera_parte\nFROM productos WHERE id = 1;",
        "hint": "Evita perder la fracción por dividir enteros."
      }
    ],
    "remember": "SQLite y PostgreSQL truncan la división entre enteros; MySQL usa DIV para truncar."
  }
],results);
