import {defineSqlGroup} from './factory.ts';
import results from './results/drop-table.ts';
export const notes=defineSqlGroup([
  {
    "key": "drop-table/definicion",
    "examples": [
      {
        "title": "Quitar una tabla de práctica",
        "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM sqlite_schema\nWHERE type = 'table' AND name = 'practica_borrar';",
        "hint": "El catálogo confirma que queda 0 objetos con ese nombre.",
        "changes": {
          "postgresql": {
            "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = current_schema() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mysql": {
            "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = DATABASE() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mariadb": {
            "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = DATABASE() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "sqlserver": {
            "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM sys.tables\nWHERE schema_id = SCHEMA_ID() AND name = 'practica_borrar';",
            "explanation": "SQL Server inspecciona sys.tables/sys.views en el esquema predeterminado."
          },
          "oracle": {
            "code": "CREATE TABLE practica_borrar (id INTEGER);\nINSERT INTO practica_borrar VALUES (1);\nDROP TABLE practica_borrar;\nSELECT COUNT(*) AS objetos FROM user_tables\nWHERE table_name = 'PRACTICA_BORRAR';",
            "explanation": "USER_TABLES/USER_VIEWS usa nombres sin comillas en mayúsculas."
          }
        }
      }
    ],
    "remember": "DELETE borra filas; DROP TABLE elimina también la estructura.",
    "note": "Las FK pueden impedir el borrado. MySQL, MariaDB y Oracle pueden confirmar implícitamente DDL; no presupongas que ROLLBACK lo recuperará."
  },
  {
    "key": "drop-table/if-exists",
    "examples": [
      {
        "title": "Borrar solo si existe",
        "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM sqlite_schema\nWHERE type = 'table' AND name = 'practica_borrar';",
        "hint": "Si no existía, queda igualmente ausente.",
        "changes": {
          "postgresql": {
            "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = current_schema() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mysql": {
            "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = DATABASE() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mariadb": {
            "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM information_schema.tables\nWHERE table_schema = DATABASE() AND table_name = 'practica_borrar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "sqlserver": {
            "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM sys.tables\nWHERE schema_id = SCHEMA_ID() AND name = 'practica_borrar';",
            "explanation": "SQL Server inspecciona sys.tables/sys.views en el esquema predeterminado."
          },
          "oracle": {
            "code": "DROP TABLE IF EXISTS practica_borrar;\nSELECT COUNT(*) AS objetos FROM user_tables\nWHERE table_name = 'PRACTICA_BORRAR';",
            "explanation": "USER_TABLES/USER_VIEWS usa nombres sin comillas en mayúsculas."
          }
        }
      }
    ],
    "remember": "IF EXISTS no ignora permisos ni dependencias inválidas."
  }
],results);
