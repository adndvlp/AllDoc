// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/definicion",
    "remember": "La versión de Python no identifica por sí sola la de SQLite.",
    "examples": [
      {
        "id": "sqlite3/compatibilidad-y-db-api-2-0/definicion/1",
        "title": "Inspeccionar el entorno",
        "language": "python",
        "code": "import sys\nprint(sys.version_info[:2])\nprint(sqlite3.sqlite_version)",
        "hint": "La segunda determina las características SQL disponibles.",
        "textOutput": "La versión de Python y la versión SQLite realmente instaladas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/apilevel-y-paramstyle",
    "remember": "sqlite3 también admite parámetros nombrados.",
    "examples": [
      {
        "id": "sqlite3/compatibilidad-y-db-api-2-0/apilevel-y-paramstyle/1",
        "title": "Consultar la interfaz",
        "language": "python",
        "code": "print(sqlite3.apilevel, sqlite3.paramstyle)",
        "hint": "Los valores describen la interfaz Python.",
        "textOutput": "`2.0 qmark`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/sqlite-version-y-sqlite-version-info",
    "remember": "Compara tuplas de enteros para verificar versiones.",
    "examples": [
      {
        "id": "sqlite3/compatibilidad-y-db-api-2-0/sqlite-version-y-sqlite-version-info/1",
        "title": "Comprobar soporte de RETURNING",
        "language": "python",
        "code": "print(sqlite3.sqlite_version_info >= (3, 35, 0))",
        "hint": "No compares versiones como cadenas de texto.",
        "textOutput": "`True` si SQLite admite RETURNING.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/setinputsizes-y-setoutputsize",
    "remember": "No modifican tamaños ni reservan memoria en este módulo.",
    "examples": [
      {
        "id": "sqlite3/compatibilidad-y-db-api-2-0/setinputsizes-y-setoutputsize/1",
        "title": "Usar los métodos de compatibilidad",
        "language": "python",
        "code": "cur = con.cursor()\nprint(cur.setinputsizes([10]), cur.setoutputsize(100))",
        "hint": "No se necesitan para trabajar normalmente con SQLite.",
        "textOutput": "`None None`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/cambios-entre-versiones",
    "remember": "Consulta documentación de la versión que ejecutas.",
    "note": "Los adaptadores de fechas por defecto se deprecaron en 3.12; sqlite3.version y version_info se eliminaron en 3.14. En 3.14 los placeholders nombrados exigen diccionarios y fetchmany rechaza tamaños negativos. Se recomienda usar argumentos de configuración por nombre por los cambios anunciados para 3.15.",
    "examples": [
      {
        "id": "sqlite3/compatibilidad-y-db-api-2-0/cambios-entre-versiones/1",
        "title": "Comprobar API moderna",
        "language": "python",
        "code": "print(hasattr(sqlite3.Connection, \"autocommit\"))\nprint(hasattr(sqlite3.Connection, \"blobopen\"))",
        "hint": "autocommit y getconfig/setconfig llegaron en 3.12; blobopen, serialize/deserialize, límites y funciones de ventana en 3.11.",
        "textOutput": "`True`, `True` en Python 3.13–3.14.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
