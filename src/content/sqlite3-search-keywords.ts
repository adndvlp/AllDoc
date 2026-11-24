// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const sqlite3Keywords: Readonly<Record<string, readonly string[]>> = {
  "analisis-de-datos/sqlite3/conexion-a-sqlite/definicion": [
    "sqlite3",
    "conectar base de datos",
    "biblioteca estándar"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/connect": [
    "connect",
    "archivo db",
    "abrir sqlite"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/memory": [
    "memory",
    "base temporal",
    "pruebas"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/connection-y-cursor": [
    "connection",
    "cursor",
    "cursor()"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/close-y-closing": [
    "close",
    "cerrar conexión",
    "contextlib"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/uri-y-modos-de-apertura": [
    "uri",
    "mode ro rw rwc memory",
    "solo lectura"
  ],
  "analisis-de-datos/sqlite3/conexion-a-sqlite/memoria-compartida": [
    "shared cache",
    "memoria compartida"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/definicion": [
    "execute",
    "ejecutar consulta"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/execute-con-cursor": [
    "cursor.execute",
    "consulta individual"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/executemany": [
    "executemany",
    "insertar varias filas",
    "lotes"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/executescript": [
    "executescript",
    "script sql",
    "varias sentencias"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/atajos-de-connection": [
    "connection.execute",
    "sin cursor",
    "atajo"
  ],
  "analisis-de-datos/sqlite3/ejecutar-sentencias/complete-statement": [
    "complete_statement",
    "consola sql"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/definicion": [
    "binding",
    "parámetros",
    "SQL injection"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/placeholder": [
    "qmark",
    "parámetros posicionales",
    "tupla"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/placeholder-nombre": [
    "named placeholders",
    "dict"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/in-dinamico": [
    "IN",
    "lista de parámetros",
    "placeholders dinámicos"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/identificadores-dinamicos": [
    "tabla dinámica",
    "ORDER BY dinámico",
    "whitelist"
  ],
  "analisis-de-datos/sqlite3/parametros-sql/sql-injection": [
    "SQL injection",
    "evitar f-string",
    "seguridad"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/definicion": [
    "fetch",
    "leer SELECT",
    "resultados"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/fetchone": [
    "fetchone",
    "una fila",
    "None"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/fetchmany-y-arraysize": [
    "fetchmany",
    "arraysize",
    "bloques"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/fetchall": [
    "fetchall",
    "todas las filas"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/iterar-un-cursor": [
    "for cursor",
    "streaming",
    "lectura incremental"
  ],
  "analisis-de-datos/sqlite3/recuperar-filas/returning": [
    "returning",
    "insertar y recuperar"
  ],
  "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/definicion": [
    "metadata",
    "cursor",
    "columnas"
  ],
  "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/description": [
    "cursor.description",
    "nombres de columnas"
  ],
  "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/rowcount": [
    "rowcount",
    "filas afectadas"
  ],
  "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/lastrowid": [
    "lastrowid",
    "id generado"
  ],
  "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/total-changes-y-cursor-connection": [
    "total_changes",
    "cursor.connection"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/definicion": [
    "CRUD",
    "DML",
    "DDL"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/create-table-y-create-index": [
    "crear tabla",
    "índice",
    "DDL"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/insert-into": [
    "insert",
    "insertar fila"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/select": [
    "select",
    "join",
    "SQL desde Python"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/update": [
    "update",
    "modificar",
    "where"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/delete": [
    "delete",
    "borrar registro"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/alter-table-y-drop-table": [
    "alter",
    "drop",
    "esquema"
  ],
  "analisis-de-datos/sqlite3/crud-y-estructura/on-conflict-y-upsert": [
    "upsert",
    "do update",
    "do nothing",
    "ignore",
    "replace"
  ],
  "analisis-de-datos/sqlite3/transacciones/definicion": [
    "transacción",
    "atomicidad",
    "ACID"
  ],
  "analisis-de-datos/sqlite3/transacciones/commit": [
    "commit",
    "persistencia"
  ],
  "analisis-de-datos/sqlite3/transacciones/rollback": [
    "rollback",
    "revertir"
  ],
  "analisis-de-datos/sqlite3/transacciones/autocommit": [
    "autocommit",
    "PEP 249",
    "modo legado"
  ],
  "analisis-de-datos/sqlite3/transacciones/isolation-level": [
    "isolation_level",
    "legacy"
  ],
  "analisis-de-datos/sqlite3/transacciones/begin-commit-y-rollback-sql": [
    "BEGIN DEFERRED IMMEDIATE EXCLUSIVE"
  ],
  "analisis-de-datos/sqlite3/transacciones/in-transaction": [
    "in_transaction",
    "estado activo"
  ],
  "analisis-de-datos/sqlite3/transacciones/with-connection": [
    "with",
    "context manager"
  ],
  "analisis-de-datos/sqlite3/transacciones/savepoint": [
    "savepoint",
    "rollback to",
    "release"
  ],
  "analisis-de-datos/sqlite3/transacciones/lotes-atomicos": [
    "executemany rollback",
    "carga atómica"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/definicion": [
    "NULL INTEGER REAL TEXT BLOB"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/afinidad-de-tipos": [
    "type affinity",
    "INTEGER TEXT REAL NUMERIC BLOB"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/strict-tables": [
    "strict",
    "tipos estrictos"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/none-y-null": [
    "None",
    "NULL",
    "valor ausente"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/fechas-y-horas": [
    "date datetime strftime julianday unixepoch"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/rowid-e-integer-primary-key": [
    "rowid",
    "id automático"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/autoincrement": [
    "autoincrement",
    "secuencia"
  ],
  "analisis-de-datos/sqlite3/tipos-de-datos/without-rowid": [
    "without rowid",
    "clave natural"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/definicion": [
    "row_factory",
    "tupla",
    "diccionario"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/sqlite3-row-y-keys": [
    "Row",
    "keys",
    "dict"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/row-factory-personalizada": [
    "row factory",
    "diccionarios"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/namedtuple-y-dataclass": [
    "namedtuple",
    "dataclass",
    "clase personalizada"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/connection-row-factory-y-cursor-row-factory": [
    "row_factory por cursor"
  ],
  "analisis-de-datos/sqlite3/representacion-de-resultados/text-factory": [
    "text_factory",
    "bytes",
    "codificación"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/definicion": [
    "adapter",
    "converter",
    "objetos"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-adapter": [
    "register_adapter",
    "Decimal"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/conform-y-prepareprotocol": [
    "__conform__",
    "PrepareProtocol"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-converter": [
    "register_converter",
    "conversión",
    "bytes"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-decltypes": [
    "detect_types",
    "PARSE_DECLTYPES"
  ],
  "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-colnames": [
    "PARSE_COLNAMES",
    "alias",
    "detect_types"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/definicion": [
    "sqlite3.Error",
    "try except"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/integrityerror": [
    "integrityerror",
    "constraint"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/operationalerror": [
    "operationalerror",
    "database locked"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/programmingerror": [
    "programmingerror",
    "binding count"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/jerarquia-db-api": [
    "DatabaseError DataError InternalError InterfaceError NotSupportedError Warning"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/sqlite-errorcode-y-sqlite-errorname": [
    "sqlite_errorcode",
    "sqlite_errorname",
    "SQLITE_*"
  ],
  "analisis-de-datos/sqlite3/errores-y-diagnostico/try-except-y-finally": [
    "finally",
    "cerrar conexión"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/definicion": [
    "pragma",
    "sqlite_schema",
    "inspección"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-table-info-y-table-list": [
    "table_info",
    "table_list",
    "table_xinfo"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-keys": [
    "foreign_keys",
    "integridad referencial"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-key-list": [
    "foreign_key_list",
    "FK"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-integrity-check-y-foreign-key-check": [
    "integrity_check",
    "foreign_key_check"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-index-list-e-index-info": [
    "index_list",
    "index_info"
  ],
  "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/attach-y-detach-database": [
    "attach database",
    "detach",
    "database_list"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/definicion": [
    "ETL",
    "pandas",
    "CSV",
    "JSON"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/read-sql-query-y-read-sql": [
    "pandas",
    "read_sql_query",
    "read_sql",
    "dataframe"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/params-y-parse-dates": [
    "read_sql_query params parse_dates"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/to-sql": [
    "to_sql",
    "index",
    "DataFrame a SQL"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/if-exists-dtype-y-chunksize": [
    "to_sql append replace fail dtype chunksize"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/lectura-por-bloques": [
    "pandas chunksize",
    "datos grandes"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/csv": [
    "csv",
    "DictReader",
    "writer",
    "importar exportar"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-csv": [
    "csv.DictReader",
    "ETL",
    "carga masiva"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/json": [
    "json.dumps",
    "json.loads",
    "exportar"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-json": [
    "json.loads",
    "insertar diccionarios"
  ],
  "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/validar-conteos-y-duplicados": [
    "validación",
    "duplicados",
    "calidad de datos"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/definicion": [
    "concurrencia",
    "bloqueo",
    "optimización"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/explain-query-plan": [
    "explain",
    "scan",
    "search",
    "query plan"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/pragma-journal-mode-y-wal": [
    "WAL",
    "journal_mode",
    "write ahead log"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/timeout-y-busy-timeout": [
    "timeout",
    "busy_timeout",
    "database locked"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/conexiones-independientes-y-bloqueos": [
    "database locked",
    "writer",
    "transacciones"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/check-same-thread-y-threadsafety": [
    "threadsafety",
    "check_same_thread",
    "hilos"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/cached-statements": [
    "cached_statements",
    "caché SQL"
  ],
  "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/vacuum-analyze-y-pragma-optimize": [
    "vacuum",
    "analyze",
    "optimize",
    "mantenimiento"
  ],
  "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/definicion": [
    "backup",
    "iterdump",
    "serialize"
  ],
  "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/backup": [
    "backup",
    "pages",
    "progress",
    "name",
    "sleep"
  ],
  "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/iterdump": [
    "iterdump",
    "dump",
    "exportar SQL"
  ],
  "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/serialize-y-deserialize": [
    "serialize",
    "deserialize",
    "bytes"
  ],
  "analisis-de-datos/sqlite3/funciones-sql-personalizadas/definicion": [
    "create_function",
    "UDF",
    "funciones personalizadas"
  ],
  "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-function": [
    "create_function",
    "narg",
    "deterministic"
  ],
  "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-aggregate": [
    "create_aggregate",
    "step",
    "finalize"
  ],
  "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-window-function": [
    "create_window_function",
    "inverse",
    "value",
    "ventana"
  ],
  "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-collation": [
    "create_collation",
    "ordenar texto",
    "comparación"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/definicion": [
    "callback",
    "traza",
    "autorización",
    "progreso"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-trace-callback": [
    "trace callback",
    "depuración SQL"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-progress-handler": [
    "progress handler",
    "cancelar consulta"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-authorizer": [
    "authorizer",
    "SQLITE_OK",
    "SQLITE_DENY",
    "SQLITE_IGNORE"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/interrupt": [
    "interrupt",
    "cancelar",
    "hilos"
  ],
  "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/enable-callback-tracebacks": [
    "enable_callback_tracebacks",
    "depurar UDF"
  ],
  "analisis-de-datos/sqlite3/blob-y-acceso-binario/definicion": [
    "BLOB",
    "binario",
    "bytes"
  ],
  "analisis-de-datos/sqlite3/blob-y-acceso-binario/blobopen-y-zeroblob": [
    "blobopen",
    "zeroblob",
    "Blob"
  ],
  "analisis-de-datos/sqlite3/blob-y-acceso-binario/read-write-seek-tell-y-close": [
    "Blob.read Blob.write Blob.seek Blob.tell Blob.close"
  ],
  "analisis-de-datos/sqlite3/configuracion-y-extensiones/definicion": [
    "getlimit",
    "setlimit",
    "getconfig",
    "setconfig"
  ],
  "analisis-de-datos/sqlite3/configuracion-y-extensiones/getlimit-y-setlimit": [
    "getlimit setlimit SQLITE_LIMIT_VARIABLE_NUMBER"
  ],
  "analisis-de-datos/sqlite3/configuracion-y-extensiones/getconfig-y-setconfig": [
    "getconfig setconfig SQLITE_DBCONFIG"
  ],
  "analisis-de-datos/sqlite3/configuracion-y-extensiones/extensiones-cargables": [
    "enable_load_extension",
    "load_extension",
    "entrypoint"
  ],
  "analisis-de-datos/sqlite3/configuracion-y-extensiones/factory-de-conexion-y-cursor": [
    "factory",
    "Connection",
    "Cursor",
    "subclase"
  ],
  "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/definicion": [
    "PEP 249",
    "DB-API 2.0",
    "versión SQLite"
  ],
  "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/apilevel-y-paramstyle": [
    "apilevel",
    "paramstyle",
    "qmark"
  ],
  "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/sqlite-version-y-sqlite-version-info": [
    "sqlite_version",
    "sqlite_version_info",
    "compatibilidad"
  ],
  "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/setinputsizes-y-setoutputsize": [
    "setinputsizes",
    "setoutputsize",
    "DB-API"
  ],
  "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/cambios-entre-versiones": [
    "versiones",
    "deprecaciones",
    "Python 3.11 3.12 3.13 3.14"
  ],
  "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/definicion": [
    "testing",
    "fixtures",
    "base en memoria"
  ],
  "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/aislamiento-de-pruebas": [
    "testing",
    "fixture",
    "aislamiento"
  ],
  "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/procesamiento-incremental-y-generadores": [
    "batch",
    "streaming",
    "generador",
    "ETL"
  ],
  "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/cli-de-sqlite3": [
    "python -m sqlite3",
    "terminal",
    "consola"
  ]
};
