import {defineSqlGroup} from './factory.ts';
import results from './results/update.ts';
export const notes=defineSqlGroup([
  {
    "key": "update/definicion",
    "examples": [
      {
        "title": "Subir el precio de un producto",
        "code": "UPDATE productos SET precio = precio + 10 WHERE id = 1;\nSELECT id, precio FROM productos WHERE id = 1;",
        "hint": "El precio del id 1 pasa de 500 a 510 con los datos iniciales."
      }
    ],
    "remember": "Sin WHERE se modifican todas las filas. Revisa antes con SELECT."
  },
  {
    "key": "update/varias-columnas",
    "examples": [
      {
        "title": "Precio y estado",
        "code": "UPDATE productos SET precio = 520, activo = 0 WHERE id = 1;\nSELECT id, precio, activo FROM productos WHERE id = 1;",
        "hint": "Separa las asignaciones con comas; ambas afectan a la misma fila."
      }
    ],
    "remember": "Sin WHERE se modifican todas las filas. Revisa antes con SELECT."
  },
  {
    "key": "update/comprobar-con-select",
    "examples": [
      {
        "title": "Selecciona primero; modifica después",
        "code": "SELECT id, nombre, precio FROM productos WHERE id = 1;\n-- Ejecuta primero solo el SELECT; después, el UPDATE.\nUPDATE productos SET precio = 520 WHERE id = 1;\nSELECT id, nombre, precio FROM productos WHERE id = 1;",
        "hint": "Selecciona la primera consulta en el editor y ejecútala por separado para revisar. Ejecutar todo también modifica."
      }
    ],
    "remember": "Sin WHERE se modifican todas las filas. Revisa antes con SELECT.",
    "note": "El desplegable muestra la última consulta del programa, con los datos iniciales."
  }
],results);
