import {defineSqlGroup} from './factory.ts';
import results from './results/cte.ts';
export const notes=defineSqlGroup([
  {
    "key": "cte/definicion",
    "examples": [
      {
        "title": "Consulta intermedia con nombre",
        "code": "WITH activos AS (\n  SELECT id, nombre, precio FROM productos WHERE activo = 1\n)\nSELECT nombre, precio FROM activos WHERE precio >= 1000 ORDER BY precio, id;",
        "hint": "activos solo está disponible para esta sentencia.",
        "changes": {
          "sqlserver": {
            "code": ";WITH activos AS (\n  SELECT id, nombre, precio FROM productos WHERE activo = 1\n)\nSELECT nombre, precio FROM activos WHERE precio >= 1000 ORDER BY precio, id;",
            "explanation": "El ; cierra la sentencia previa antes de WITH en T-SQL."
          }
        }
      }
    ],
    "remember": "Una CTE no es una variable ni garantiza materializar o acelerar el resultado."
  },
  {
    "key": "cte/with",
    "examples": [
      {
        "title": "Definir activos con WITH",
        "code": "WITH activos AS (\n  SELECT id, nombre, precio FROM productos WHERE activo = 1\n)\nSELECT nombre, precio FROM activos WHERE precio >= 1000 ORDER BY precio, id;",
        "hint": "activos solo está disponible para esta sentencia.",
        "changes": {
          "sqlserver": {
            "code": ";WITH activos AS (\n  SELECT id, nombre, precio FROM productos WHERE activo = 1\n)\nSELECT nombre, precio FROM activos WHERE precio >= 1000 ORDER BY precio, id;",
            "explanation": "El ; cierra la sentencia previa antes de WITH en T-SQL."
          }
        }
      }
    ],
    "remember": "Una CTE no es una variable ni garantiza materializar o acelerar el resultado."
  },
  {
    "key": "cte/multiples",
    "examples": [
      {
        "title": "Reutilizar una CTE anterior",
        "code": "WITH activos AS (\n  SELECT id, nombre, categoria FROM productos WHERE activo = 1\n), totales AS (\n  SELECT categoria, COUNT(*) AS total FROM activos GROUP BY categoria\n)\nSELECT a.nombre, t.total FROM activos a\nJOIN totales t ON t.categoria = a.categoria WHERE a.id <= 3 ORDER BY a.id;",
        "hint": "totales usa activos; la consulta final usa las dos.",
        "changes": {
          "sqlserver": {
            "code": ";WITH activos AS (\n  SELECT id, nombre, categoria FROM productos WHERE activo = 1\n), totales AS (\n  SELECT categoria, COUNT(*) AS total FROM activos GROUP BY categoria\n)\nSELECT a.nombre, t.total FROM activos a\nJOIN totales t ON t.categoria = a.categoria WHERE a.id <= 3 ORDER BY a.id;",
            "explanation": "En T-SQL, el ; antes de WITH cierra una sentencia anterior."
          }
        }
      }
    ],
    "remember": "Define primero las CTE de las que dependen las siguientes."
  }
],results);
