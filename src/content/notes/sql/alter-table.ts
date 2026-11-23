import {defineSqlGroup} from './factory.ts';
import results from './results/alter-table.ts';
export const notes=defineSqlGroup([
  {
    "key": "alter-table/definicion",
    "examples": [
      {
        "title": "Añadir una columna",
        "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD COLUMN prioridad INTEGER DEFAULT 0;\nSELECT * FROM practica_cambios;",
        "hint": "La fila existente recibe prioridad 0.",
        "changes": {
          "sqlserver": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD prioridad INTEGER DEFAULT 0 WITH VALUES;\nSELECT * FROM practica_cambios;",
            "explanation": "SQL Server usa ADD sin COLUMN; WITH VALUES llena con 0 las filas existentes."
          },
          "oracle": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD (prioridad INTEGER DEFAULT 0);\nSELECT * FROM practica_cambios;",
            "explanation": "Oracle añade la columna con ADD (...); muchas operaciones DDL confirman implícitamente."
          }
        }
      }
    ],
    "remember": "La sintaxis y las restricciones permitidas dependen del motor.",
    "note": "El programa prepara su propia tabla. Si ya existe, reinicia el entorno o usa otro nombre; cambiar de ficha conserva los datos."
  },
  {
    "key": "alter-table/add-column",
    "examples": [
      {
        "title": "Nueva columna con valor inicial",
        "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD COLUMN prioridad INTEGER DEFAULT 0;\nSELECT * FROM practica_cambios;",
        "hint": "El DEFAULT se usa para la nueva columna de la fila existente.",
        "changes": {
          "sqlserver": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD prioridad INTEGER DEFAULT 0 WITH VALUES;\nSELECT * FROM practica_cambios;",
            "explanation": "SQL Server usa ADD sin COLUMN; WITH VALUES llena con 0 las filas existentes."
          },
          "oracle": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios ADD (prioridad INTEGER DEFAULT 0);\nSELECT * FROM practica_cambios;",
            "explanation": "Oracle añade la columna con ADD (...); muchas operaciones DDL confirman implícitamente."
          }
        }
      }
    ],
    "remember": "La sintaxis y las restricciones permitidas dependen del motor.",
    "note": "El programa prepara su propia tabla. Si ya existe, reinicia el entorno o usa otro nombre; cambiar de ficha conserva los datos."
  },
  {
    "key": "alter-table/rename-column",
    "examples": [
      {
        "title": "Renombrar nombre",
        "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios RENAME COLUMN nombre TO departamento;\nSELECT id, departamento FROM practica_cambios;",
        "hint": "Los datos permanecen; las consultas deben usar departamento.",
        "changes": {
          "sqlserver": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nEXEC sys.sp_rename 'dbo.practica_cambios.nombre', 'departamento', 'COLUMN';\nSELECT id, departamento FROM practica_cambios;",
            "explanation": "SQL Server usa sp_rename; revisa el esquema si tu tabla no está en dbo."
          }
        }
      }
    ],
    "remember": "Revisa las consultas y dependencias que usaban el nombre anterior.",
    "note": "El programa prepara su propia tabla. Si ya existe, reinicia el entorno o usa otro nombre; cambiar de ficha conserva los datos."
  },
  {
    "key": "alter-table/rename-table",
    "examples": [
      {
        "title": "Renombrar la tabla",
        "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios RENAME TO practica_departamentos;\nSELECT * FROM practica_departamentos;",
        "hint": "Sus filas siguen presentes bajo el nuevo nombre.",
        "changes": {
          "sqlserver": {
            "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nEXEC sys.sp_rename 'dbo.practica_cambios', 'practica_departamentos';\nSELECT * FROM practica_departamentos;",
            "explanation": "sp_rename cambia el nombre; no reescribe todas las dependencias."
          }
        }
      }
    ],
    "remember": "Renombrar no equivale a copiar ni borrar los datos.",
    "note": "El programa prepara su propia tabla. Si ya existe, reinicia el entorno o usa otro nombre; cambiar de ficha conserva los datos."
  },
  {
    "key": "alter-table/drop-column",
    "examples": [
      {
        "title": "Quitar nombre",
        "code": "CREATE TABLE practica_cambios (id INTEGER, nombre VARCHAR(80));\nINSERT INTO practica_cambios VALUES (1, 'Compras');\nALTER TABLE practica_cambios DROP COLUMN nombre;\nSELECT * FROM practica_cambios;",
        "hint": "Queda solo id."
      }
    ],
    "remember": "Una columna usada por restricciones, vistas o índices puede impedir la operación.",
    "note": "El programa prepara su propia tabla. Si ya existe, reinicia el entorno o usa otro nombre; cambiar de ficha conserva los datos."
  }
],results);
