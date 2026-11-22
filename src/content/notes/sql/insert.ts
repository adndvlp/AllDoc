import {defineSqlGroup} from './factory.ts';
import results from './results/insert.ts';
export const notes=defineSqlGroup([
  {
    "key": "insert/definicion",
    "examples": [
      {
        "title": "Añadir un producto",
        "code": "INSERT INTO productos (id, nombre, categoria, precio)\nVALUES (101, 'Base para laptop', 'Accesorios', 650);\nSELECT id, nombre, stock FROM productos WHERE id = 101;",
        "hint": "Indica columnas y valores en el mismo orden. stock usa su DEFAULT 0."
      }
    ],
    "remember": "Una clave repetida produce error; cambiar de apunte no reinicia los datos."
  },
  {
    "key": "insert/columnas",
    "examples": [
      {
        "title": "Columnas y valores",
        "code": "INSERT INTO productos (id, nombre, categoria, precio)\nVALUES (101, 'Base para laptop', 'Accesorios', 650);\nSELECT id, nombre, stock FROM productos WHERE id = 101;",
        "hint": "Las columnas omitidas necesitan un DEFAULT o admitir NULL."
      }
    ],
    "remember": "Una clave repetida produce error; cambiar de apunte no reinicia los datos."
  },
  {
    "key": "insert/varias-filas",
    "examples": [
      {
        "title": "Dos productos nuevos",
        "code": "INSERT INTO categorias (id, nombre)\nVALUES (101, 'Papelería'), (102, 'Limpieza');\nSELECT id, nombre FROM categorias WHERE id >= 101 ORDER BY id;",
        "hint": "Cada paréntesis contiene los valores de una fila."
      }
    ],
    "remember": "Todos los grupos deben tener la misma cantidad de valores."
  },
  {
    "key": "insert/sin-lista",
    "examples": [
      {
        "title": "Todas las columnas",
        "code": "INSERT INTO departamentos VALUES (101, 'Compras');\nSELECT id, nombre FROM departamentos WHERE id = 101;",
        "hint": "departamentos tiene id y nombre, en ese orden."
      }
    ],
    "remember": "Nombrar columnas evita depender del orden físico de la tabla."
  },
  {
    "key": "insert/ignore",
    "examples": [
      {
        "title": "Conservar la fila existente",
        "code": "CREATE TABLE practica_conflictos (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_conflictos VALUES (1, 'Original');\nINSERT OR IGNORE INTO practica_conflictos VALUES (1, 'Otro');\nSELECT * FROM practica_conflictos;",
        "hint": "La fila con id 1 sigue diciendo Original.",
        "changes": {
          "mysql": {
            "code": "CREATE TABLE practica_conflictos (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_conflictos VALUES (1, 'Original');\nINSERT IGNORE INTO practica_conflictos VALUES (1, 'Otro');\nSELECT * FROM practica_conflictos;",
            "explanation": "INSERT IGNORE también puede convertir otros errores en avisos y ajustar valores. No lo uses para ocultarlos."
          },
          "mariadb": {
            "code": "CREATE TABLE practica_conflictos (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_conflictos VALUES (1, 'Original');\nINSERT IGNORE INTO practica_conflictos VALUES (1, 'Otro');\nSELECT * FROM practica_conflictos;",
            "explanation": "INSERT IGNORE también puede convertir otros errores en avisos y ajustar valores. No lo uses para ocultarlos."
          },
          "postgresql": {
            "code": "CREATE TABLE practica_conflictos (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_conflictos VALUES (1, 'Original');\nINSERT INTO practica_conflictos VALUES (1, 'Otro')\nON CONFLICT (id) DO NOTHING;\nSELECT * FROM practica_conflictos;",
            "explanation": "DO NOTHING con (id) omite ese conflicto único; no ignora todos los errores de INSERT."
          },
          "sqlserver": {
            "unavailable": true,
            "explanation": "No existe INSERT OR IGNORE con esta semántica. Una estrategia de inserción condicional requiere tratar concurrencia y conflictos explícitamente. Consulta la variante SQLite para practicar el caso."
          },
          "oracle": {
            "unavailable": true,
            "explanation": "No existe INSERT OR IGNORE con esta semántica. Una estrategia de inserción condicional requiere tratar concurrencia y conflictos explícitamente. Consulta la variante SQLite para practicar el caso."
          }
        }
      }
    ],
    "remember": "SQLite IGNORE no ignora una violación de clave foránea."
  },
  {
    "key": "insert/replace",
    "examples": [
      {
        "title": "Los valores omitidos se pierden",
        "code": "CREATE TABLE practica_reemplazo (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80), stock INTEGER DEFAULT 0);\nINSERT INTO practica_reemplazo VALUES (1, 'Original', 9);\nINSERT OR REPLACE INTO practica_reemplazo (id, nombre) VALUES (1, 'Nuevo');\nSELECT * FROM practica_reemplazo;",
        "hint": "Nuevo queda con stock 0, no con el 9 anterior.",
        "changes": {
          "mysql": {
            "code": "CREATE TABLE practica_reemplazo (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80), stock INTEGER DEFAULT 0);\nINSERT INTO practica_reemplazo VALUES (1, 'Original', 9);\nREPLACE INTO practica_reemplazo (id, nombre) VALUES (1, 'Nuevo');\nSELECT * FROM practica_reemplazo;",
            "explanation": "REPLACE elimina la fila conflictiva e inserta otra: stock vuelve a DEFAULT 0. Puede activar cascadas y triggers."
          },
          "mariadb": {
            "code": "CREATE TABLE practica_reemplazo (id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80), stock INTEGER DEFAULT 0);\nINSERT INTO practica_reemplazo VALUES (1, 'Original', 9);\nREPLACE INTO practica_reemplazo (id, nombre) VALUES (1, 'Nuevo');\nSELECT * FROM practica_reemplazo;",
            "explanation": "REPLACE elimina la fila conflictiva e inserta otra: stock vuelve a DEFAULT 0. Puede activar cascadas y triggers."
          },
          "postgresql": {
            "unavailable": true,
            "explanation": "No hay un REPLACE de filas equivalente nativo. Un upsert actualiza o inserta y tiene otra semántica; no se presenta como sustituto automático."
          },
          "sqlserver": {
            "unavailable": true,
            "explanation": "No hay un REPLACE de filas equivalente nativo. Un upsert actualiza o inserta y tiene otra semántica; no se presenta como sustituto automático."
          },
          "oracle": {
            "unavailable": true,
            "explanation": "No hay un REPLACE de filas equivalente nativo. Un upsert actualiza o inserta y tiene otra semántica; no se presenta como sustituto automático."
          }
        }
      }
    ],
    "remember": "OR REPLACE no es UPDATE: puede borrar dependencias por cascada."
  }
],results);
