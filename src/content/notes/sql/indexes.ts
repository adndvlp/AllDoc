import {defineSqlGroup} from './factory.ts';
import results from './results/indexes.ts';
export const notes=defineSqlGroup([
  {
    "key": "indexes/definicion",
    "examples": [
      {
        "title": "Índice para precio",
        "code": "CREATE INDEX practica_idx_precio ON productos(precio);\nSELECT nombre, precio FROM productos WHERE precio >= 3000 ORDER BY precio, id;",
        "hint": "El resultado de la consulta no cambia por crear el índice."
      }
    ],
    "remember": "El optimizador decide si usarlo; crearlo también cuesta espacio y trabajo al escribir."
  },
  {
    "key": "indexes/simple-y-compuesto",
    "examples": [
      {
        "title": "Categoría y precio",
        "code": "CREATE INDEX practica_idx_categoria_precio ON productos(categoria, precio);\nSELECT nombre, precio FROM productos\nWHERE categoria = 'Accesorios' AND precio >= 500 ORDER BY precio, id;",
        "hint": "Un índice simple usa (precio); este usa primero categoria y luego precio."
      }
    ],
    "remember": "No afirmes que la segunda columna nunca ayuda: existen estrategias como skip-scan.",
    "note": "Que un plan sea posible no garantiza que el optimizador lo elija. Comprueba el plan y mide tu consulta."
  },
  {
    "key": "indexes/unique",
    "examples": [
      {
        "title": "Código único",
        "code": "CREATE TABLE practica_indice_unico (id INTEGER, codigo VARCHAR(80) NOT NULL);\nCREATE UNIQUE INDEX practica_idx_codigo ON practica_indice_unico(codigo);\nINSERT INTO practica_indice_unico VALUES (1, 'A-1');\nSELECT * FROM practica_indice_unico;",
        "hint": "Una segunda fila con A-1 provoca error."
      }
    ],
    "remember": "NOT NULL evita depender de cómo cada motor trata los NULL de un índice único."
  },
  {
    "key": "indexes/consultar",
    "examples": [
      {
        "title": "Ver el índice creado",
        "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT name AS nombre, tbl_name AS tabla FROM sqlite_schema\nWHERE type = 'index' AND name = 'practica_idx_consulta';",
        "hint": "El índice tiene nombre propio y pertenece a productos.",
        "changes": {
          "postgresql": {
            "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT indexname AS nombre, tablename AS tabla FROM pg_indexes\nWHERE schemaname = current_schema() AND indexname = 'practica_idx_consulta';",
            "explanation": "PostgreSQL usa pg_indexes."
          },
          "sqlserver": {
            "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT i.name AS nombre, t.name AS tabla FROM sys.indexes i\nJOIN sys.tables t ON t.object_id = i.object_id\nWHERE t.schema_id = SCHEMA_ID() AND i.name = 'practica_idx_consulta';",
            "explanation": "SQL Server usa sys.indexes y sys.tables."
          },
          "oracle": {
            "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT index_name AS nombre, table_name AS tabla FROM user_indexes\nWHERE index_name = 'PRACTICA_IDX_CONSULTA';",
            "explanation": "Oracle usa USER_INDEXES y nombres sin comillas en mayúsculas."
          },
          "mysql": {
            "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT DISTINCT index_name AS nombre, table_name AS tabla\nFROM information_schema.statistics\nWHERE table_schema = DATABASE() AND index_name = 'practica_idx_consulta';",
            "explanation": "STATISTICS tiene una fila por columna del índice; DISTINCT muestra una por índice."
          },
          "mariadb": {
            "code": "CREATE INDEX practica_idx_consulta ON productos(precio);\nSELECT DISTINCT index_name AS nombre, table_name AS tabla\nFROM information_schema.statistics\nWHERE table_schema = DATABASE() AND index_name = 'practica_idx_consulta';",
            "explanation": "STATISTICS tiene una fila por columna del índice; DISTINCT muestra una por índice."
          }
        }
      }
    ],
    "remember": "Los catálogos del sistema son específicos del RDBMS."
  },
  {
    "key": "indexes/drop",
    "examples": [
      {
        "title": "Quitar un índice",
        "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar;\nSELECT name AS nombre, tbl_name AS tabla FROM sqlite_schema\nWHERE type = 'index' AND name = 'practica_idx_quitar';",
        "hint": "El catálogo devuelve cero filas.",
        "changes": {
          "postgresql": {
            "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar;\nSELECT indexname AS nombre, tablename AS tabla FROM pg_indexes\nWHERE schemaname = current_schema() AND indexname = 'practica_idx_quitar';",
            "explanation": "MySQL, MariaDB y SQL Server requieren la tabla en DROP INDEX; el catálogo muestra que ya no está."
          },
          "sqlserver": {
            "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar ON productos;\nSELECT i.name AS nombre, t.name AS tabla FROM sys.indexes i\nJOIN sys.tables t ON t.object_id = i.object_id\nWHERE t.schema_id = SCHEMA_ID() AND i.name = 'practica_idx_quitar';",
            "explanation": "MySQL, MariaDB y SQL Server requieren la tabla en DROP INDEX; el catálogo muestra que ya no está."
          },
          "oracle": {
            "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar;\nSELECT index_name AS nombre, table_name AS tabla FROM user_indexes\nWHERE index_name = 'PRACTICA_IDX_QUITAR';",
            "explanation": "MySQL, MariaDB y SQL Server requieren la tabla en DROP INDEX; el catálogo muestra que ya no está."
          },
          "mysql": {
            "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar ON productos;\nSELECT DISTINCT index_name AS nombre, table_name AS tabla\nFROM information_schema.statistics\nWHERE table_schema = DATABASE() AND index_name = 'practica_idx_quitar';",
            "explanation": "MySQL, MariaDB y SQL Server requieren la tabla en DROP INDEX; el catálogo muestra que ya no está."
          },
          "mariadb": {
            "code": "CREATE INDEX practica_idx_quitar ON productos(precio);\nDROP INDEX practica_idx_quitar ON productos;\nSELECT DISTINCT index_name AS nombre, table_name AS tabla\nFROM information_schema.statistics\nWHERE table_schema = DATABASE() AND index_name = 'practica_idx_quitar';",
            "explanation": "MySQL, MariaDB y SQL Server requieren la tabla en DROP INDEX; el catálogo muestra que ya no está."
          }
        }
      },
      {
        "title": "Solo si existe",
        "code": "DROP INDEX IF EXISTS practica_idx_ausente;\nSELECT id FROM productos WHERE id = 1;",
        "hint": "Evita el error por un índice ausente cuando el motor lo admite.",
        "changes": {
          "mysql": {
            "code": "SELECT DISTINCT index_name FROM information_schema.statistics\nWHERE table_schema = DATABASE() AND table_name = 'productos'\n  AND index_name = 'practica_idx_ausente';",
            "explanation": "MySQL no admite DROP INDEX IF EXISTS. Esta consulta comprueba su presencia; si aparece, puedes usar DROP INDEX nombre ON productos. La comprobación y el borrado son pasos distintos, no una operación atómica.",
            "external": true
          },
          "mariadb": {
            "code": "DROP INDEX IF EXISTS practica_idx_ausente ON productos;\nSELECT id FROM productos WHERE id = 1;",
            "explanation": "MariaDB sí admite IF EXISTS con ON tabla."
          },
          "sqlserver": {
            "code": "DROP INDEX IF EXISTS practica_idx_ausente ON productos;\nSELECT id FROM productos WHERE id = 1;",
            "explanation": "SQL Server admite IF EXISTS, indicando la tabla."
          }
        }
      }
    ],
    "remember": "No confundas un índice independiente con uno que sostiene una restricción."
  }
],results);
