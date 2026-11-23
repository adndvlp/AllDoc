import {defineSqlGroup} from './factory.ts';
import results from './results/views.ts';
export const notes=defineSqlGroup([
  {
    "key": "views/definicion",
    "examples": [
      {
        "title": "Consultar una vista",
        "code": "CREATE VIEW practica_activos AS\nSELECT id, nombre, precio FROM productos WHERE activo = 1;\nSELECT * FROM practica_activos WHERE id <= 3 ORDER BY id;",
        "hint": "La consulta sigue leyendo las tablas base; no guarda una copia estática de esas filas.",
        "changes": {
          "sqlserver": {
            "code": "CREATE VIEW practica_activos AS\nSELECT id, nombre, precio FROM productos WHERE activo = 1;\nGO\nSELECT * FROM practica_activos WHERE id <= 3 ORDER BY id;",
            "explanation": "GO separa lotes en SSMS/sqlcmd; no es una sentencia del servidor ni de SQLite."
          }
        }
      }
    ],
    "remember": "Una vista normal no equivale a una tabla materializada.",
    "note": "En SQLite las vistas son de solo lectura salvo lógica INSTEAD OF mediante triggers; otros motores tienen reglas propias de actualización."
  },
  {
    "key": "views/create-view",
    "examples": [
      {
        "title": "Crear la vista de activos",
        "code": "CREATE VIEW practica_activos AS\nSELECT id, nombre, precio FROM productos WHERE activo = 1;\nSELECT * FROM practica_activos WHERE id <= 3 ORDER BY id;",
        "hint": "La consulta sigue leyendo las tablas base; no guarda una copia estática de esas filas.",
        "changes": {
          "sqlserver": {
            "code": "CREATE VIEW practica_activos AS\nSELECT id, nombre, precio FROM productos WHERE activo = 1;\nGO\nSELECT * FROM practica_activos WHERE id <= 3 ORDER BY id;",
            "explanation": "GO separa lotes en SSMS/sqlcmd; no es una sentencia del servidor ni de SQLite."
          }
        }
      }
    ],
    "remember": "Una vista normal no equivale a una tabla materializada.",
    "note": "En SQLite las vistas son de solo lectura salvo lógica INSTEAD OF mediante triggers; otros motores tienen reglas propias de actualización."
  },
  {
    "key": "views/con-join",
    "examples": [
      {
        "title": "Vista del catálogo con proveedor",
        "code": "CREATE VIEW practica_catalogo AS\nSELECT p.id, p.nombre, v.nombre AS proveedor\nFROM productos p JOIN proveedores v ON v.id = p.proveedor_id;\nSELECT * FROM practica_catalogo WHERE id <= 3 ORDER BY id;",
        "hint": "El JOIN se aplica cuando consultas la vista.",
        "changes": {
          "sqlserver": {
            "code": "CREATE VIEW practica_catalogo AS\nSELECT p.id, p.nombre, v.nombre AS proveedor\nFROM productos p JOIN proveedores v ON v.id = p.proveedor_id;\nGO\nSELECT * FROM practica_catalogo WHERE id <= 3 ORDER BY id;",
            "explanation": "En SSMS/sqlcmd, GO separa la definición de la consulta posterior."
          }
        }
      }
    ],
    "remember": "Una vista con JOIN no vuelve automáticamente actualizables todas sus columnas."
  },
  {
    "key": "views/if-not-exists",
    "examples": [
      {
        "title": "Vista condicional",
        "code": "CREATE VIEW IF NOT EXISTS practica_v_condicional AS\nSELECT id, nombre FROM productos;\nSELECT * FROM practica_v_condicional WHERE id = 1;",
        "hint": "No reemplaza ni valida la definición de una vista existente.",
        "changes": {
          "postgresql": {
            "unavailable": true,
            "explanation": "Este motor no incluye CREATE VIEW IF NOT EXISTS. Comprueba la existencia o elige explícitamente una estrategia de reemplazo; no se sustituyen automáticamente."
          },
          "mysql": {
            "unavailable": true,
            "explanation": "Este motor no incluye CREATE VIEW IF NOT EXISTS. Comprueba la existencia o elige explícitamente una estrategia de reemplazo; no se sustituyen automáticamente."
          },
          "sqlserver": {
            "unavailable": true,
            "explanation": "Este motor no incluye CREATE VIEW IF NOT EXISTS. Comprueba la existencia o elige explícitamente una estrategia de reemplazo; no se sustituyen automáticamente."
          }
        }
      }
    ],
    "remember": "IF NOT EXISTS y OR REPLACE resuelven necesidades diferentes."
  },
  {
    "key": "views/replace-view",
    "examples": [
      {
        "title": "Nueva definición",
        "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nDROP VIEW practica_v_reemplazo;\nCREATE VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
        "hint": "SQLite requiere DROP VIEW y CREATE VIEW; puede afectar dependencias y permisos.",
        "changes": {
          "postgresql": {
            "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nCREATE OR REPLACE VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
            "explanation": "OR REPLACE conserva las columnas anteriores y añade precio; las restricciones y permisos de reemplazo dependen del motor."
          },
          "mysql": {
            "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nCREATE OR REPLACE VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
            "explanation": "OR REPLACE conserva las columnas anteriores y añade precio; las restricciones y permisos de reemplazo dependen del motor."
          },
          "mariadb": {
            "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nCREATE OR REPLACE VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
            "explanation": "OR REPLACE conserva las columnas anteriores y añade precio; las restricciones y permisos de reemplazo dependen del motor."
          },
          "oracle": {
            "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nCREATE OR REPLACE VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
            "explanation": "OR REPLACE conserva las columnas anteriores y añade precio; las restricciones y permisos de reemplazo dependen del motor."
          },
          "sqlserver": {
            "code": "CREATE VIEW practica_v_reemplazo AS SELECT id, nombre FROM productos;\nGO\nCREATE OR ALTER VIEW practica_v_reemplazo AS SELECT id, nombre, precio FROM productos;\nGO\nSELECT * FROM practica_v_reemplazo WHERE id = 1;",
            "explanation": "CREATE OR ALTER y GO en SSMS/sqlcmd; en SQLite se prepara DROP seguido de CREATE."
          }
        }
      }
    ],
    "remember": "Eliminar y recrear no garantiza conservar permisos ni la misma interfaz."
  },
  {
    "key": "views/drop-view",
    "examples": [
      {
        "title": "Quitar la vista",
        "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM sqlite_schema\nWHERE type = 'view' AND name = 'practica_v_quitar';",
        "hint": "Los productos de la tabla base siguen existiendo.",
        "changes": {
          "postgresql": {
            "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM information_schema.views\nWHERE table_schema = current_schema() AND table_name = 'practica_v_quitar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mysql": {
            "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM information_schema.views\nWHERE table_schema = DATABASE() AND table_name = 'practica_v_quitar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "mariadb": {
            "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM information_schema.views\nWHERE table_schema = DATABASE() AND table_name = 'practica_v_quitar';",
            "explanation": "Consulta el catálogo del esquema o base actual de este motor."
          },
          "sqlserver": {
            "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nGO\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM sys.views\nWHERE schema_id = SCHEMA_ID() AND name = 'practica_v_quitar';",
            "explanation": "GO separa el lote de CREATE VIEW en SSMS/sqlcmd."
          },
          "oracle": {
            "code": "CREATE VIEW practica_v_quitar AS SELECT id FROM productos;\nDROP VIEW IF EXISTS practica_v_quitar;\nSELECT COUNT(*) AS objetos FROM user_views\nWHERE view_name = 'PRACTICA_V_QUITAR';",
            "explanation": "USER_TABLES/USER_VIEWS usa nombres sin comillas en mayúsculas."
          }
        }
      }
    ],
    "remember": "Quitar la vista no borra las filas de sus tablas."
  }
],results);
