// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const mysqlConnectorPythonKeywords: Readonly<Record<string, readonly string[]>> = {
  "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/definicion": [
    "mysql connector python",
    "driver",
    "DB-API"
  ],
  "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/instalacion": [
    "pip install",
    "dependencia",
    "entorno virtual"
  ],
  "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/db-api-2-0": [
    "PEP 249",
    "apilevel",
    "paramstyle",
    "threadsafety"
  ],
  "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/python-puro-y-extension-c": [
    "use_pure",
    "HAVE_CEXT"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/definicion": [
    "connect",
    "conexión",
    "host"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/argumentos-de-conexion": [
    "host",
    "port",
    "user",
    "password",
    "database"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/diccionario-y-kwargs": [
    "config",
    "kwargs",
    "diccionario"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/variables-de-entorno": [
    "os.getenv",
    ".env",
    "password",
    "secretos"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/database-y-connection-id": [
    "base activa",
    "id sesión",
    "server_info"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/cerrar-y-liberar": [
    "close",
    "disconnect",
    "recursos"
  ],
  "analisis-de-datos/mysql-connector-python/conexion/context-managers": [
    "with",
    "context manager",
    "cierre"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/definicion": [
    "cursor",
    "objeto cursor"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/cursor-normal": [
    "tuple",
    "cursor normal"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/dictionary-true": [
    "dictionary cursor",
    "dict"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/buffered-true": [
    "buffered",
    "prefetch",
    "memoria"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/cursor-sin-bufer": [
    "unbuffered",
    "streaming",
    "unread result"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/raw-true": [
    "raw cursor",
    "bytes"
  ],
  "analisis-de-datos/mysql-connector-python/cursores/prepared-true": [
    "prepared cursor",
    "statement preparado"
  ],
  "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/definicion": [
    "execute",
    "query",
    "SQL"
  ],
  "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/filtros-y-orden": [
    "where",
    "order by",
    "limit"
  ],
  "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/join-y-agregaciones": [
    "join",
    "group by",
    "sum"
  ],
  "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/cte-y-ventanas": [
    "with",
    "cte",
    "rank",
    "window function"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/definicion": [
    "parameterized query",
    "placeholders",
    "SQL injection"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-posicionales": [
    "%s",
    "tupla",
    "posición"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-nombrados": [
    "pyformat",
    "dict",
    "parámetros nombrados"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/none-y-null": [
    "None",
    "NULL",
    "IS NULL",
    "<=>"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/in-dinamico": [
    "IN",
    "placeholders",
    "lista vacía"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/like-parametrizado": [
    "like",
    "comodín",
    "búsqueda"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/identificadores-dinamicos": [
    "order by dinámico",
    "whitelist",
    "identifiers"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/filtros-opcionales": [
    "query builder",
    "filtros opcionales"
  ],
  "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/sql-injection": [
    "inyección SQL",
    "seguridad",
    "escape"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/definicion": [
    "fetch",
    "resultados"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchone": [
    "fetchone",
    "None"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchmany": [
    "fetchmany",
    "lotes"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchall": [
    "fetchall",
    "cursor agotado"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/iteracion": [
    "for row in cursor",
    "iteración"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/resultados-pendientes": [
    "Unread result found",
    "unread_result",
    "consume_results"
  ],
  "analisis-de-datos/mysql-connector-python/lectura-de-resultados/consumo-automatico": [
    "consume_results",
    "can_consume_results"
  ],
  "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/definicion": [
    "metadata",
    "cursor attributes"
  ],
  "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/description": [
    "description",
    "FieldType"
  ],
  "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/rowcount": [
    "rowcount",
    "affected rows"
  ],
  "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/lastrowid": [
    "lastrowid",
    "auto increment"
  ],
  "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/with-rows-y-statement": [
    "with_rows",
    "statement"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/definicion": [
    "DML",
    "insert",
    "update",
    "delete"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/insert": [
    "insert into",
    "values"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/update": [
    "update",
    "set",
    "where"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/delete": [
    "delete",
    "where"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/executemany": [
    "executemany",
    "bulk insert"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/upsert": [
    "upsert",
    "duplicate key"
  ],
  "analisis-de-datos/mysql-connector-python/escritura-de-datos/ddl": [
    "create table",
    "alter table",
    "drop table"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/definicion": [
    "transaction",
    "ACID",
    "InnoDB"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/commit": [
    "commit",
    "persistencia"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/rollback": [
    "rollback",
    "deshacer"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/autocommit": [
    "autocommit",
    "commit automático"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/start-transaction": [
    "start_transaction",
    "begin",
    "in_transaction"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/aislamiento-y-solo-lectura": [
    "READ COMMITTED",
    "REPEATABLE READ",
    "readonly"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/savepoint": [
    "savepoint",
    "rollback to savepoint"
  ],
  "analisis-de-datos/mysql-connector-python/transacciones/commit-implicito": [
    "implicit commit",
    "DDL",
    "rollback"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/definicion": [
    "type mapping",
    "tipos",
    "conversión"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/decimal-y-numeros": [
    "Decimal",
    "int",
    "float",
    "precisión"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/fechas-y-horas": [
    "datetime",
    "date",
    "time",
    "timedelta"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/null-y-none": [
    "null",
    "none",
    "nulos"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/blob-y-bytes": [
    "blob",
    "bytes",
    "bytearray"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/json": [
    "json.dumps",
    "json.loads",
    "JSON"
  ],
  "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/mysqlconverter": [
    "MySQLConverter",
    "converter_class"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/definicion": [
    "Error",
    "try except"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/integrityerror": [
    "IntegrityError",
    "duplicate key",
    "foreign key"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/programmingerror": [
    "ProgrammingError",
    "SQL syntax"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/familias-de-excepciones": [
    "DatabaseError",
    "OperationalError",
    "InterfaceError",
    "DataError",
    "InternalError",
    "NotSupportedError",
    "PoolError"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/errno-msg-y-sqlstate": [
    "errno",
    "msg",
    "sqlstate",
    "errorcode"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/try-except-else-y-finally": [
    "try except else finally",
    "rollback"
  ],
  "analisis-de-datos/mysql-connector-python/errores-y-excepciones/advertencias": [
    "warnings",
    "get_warnings",
    "raise_on_warnings",
    "Warning"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/definicion": [
    "connected",
    "ping",
    "reconnect"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/is-connected-y-connected": [
    "is_connected",
    "connected"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/ping": [
    "ping",
    "reconnect",
    "attempts",
    "delay"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reconnect": [
    "reconnect",
    "attempts",
    "delay"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/timeouts": [
    "connection_timeout",
    "read_timeout",
    "write_timeout"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reintentos-y-backoff": [
    "retry",
    "exponential backoff",
    "error 1213",
    "1205"
  ],
  "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/failover": [
    "failover",
    "alta disponibilidad"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/definicion": [
    "session",
    "sql_mode",
    "timezone",
    "charset"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/config": [
    "config",
    "configuración"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/sql-mode": [
    "ONLY_FULL_GROUP_BY",
    "strict mode",
    "sql_mode"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/time-zone": [
    "time_zone",
    "timestamp",
    "UTC"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/charset-collation-y-unicode": [
    "utf8mb4",
    "collation",
    "use_unicode"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/variables-de-sesion-e-init-command": [
    "init_command",
    "variables sesión"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/reset-session": [
    "reset_session",
    "cmd_reset_connection"
  ],
  "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/archivos-de-opciones": [
    "my.cnf",
    "option_files",
    "option_groups"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/definicion": [
    "TLS",
    "SSL",
    "autenticación"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tls-y-certificados": [
    "ssl_ca",
    "ssl_cert",
    "ssl_key",
    "tls_versions"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/auth-plugin-y-autenticacion": [
    "caching_sha2_password",
    "auth_plugin",
    "MFA",
    "LDAP",
    "Kerberos",
    "OpenID Connect"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/privilegios-minimos": [
    "grant",
    "permisos",
    "solo lectura"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tcp-socket-y-compresion": [
    "unix_socket",
    "compress",
    "TCP/IP"
  ],
  "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/atributos-y-flags": [
    "conn_attrs",
    "ClientFlag",
    "client_flags"
  ],
  "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/definicion": [
    "multi statement",
    "execute",
    "nextset"
  ],
  "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/nextset": [
    "nextset",
    "result set"
  ],
  "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/fetchsets-y-map-results": [
    "fetchsets",
    "map_results",
    "statement"
  ],
  "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/archivos-sql": [
    "pathlib",
    "archivo .sql",
    "delimiters"
  ],
  "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/cambios-desde-9-2": [
    "multi=True",
    "migración",
    "versión"
  ],
  "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/definicion": [
    "stored procedure",
    "callproc"
  ],
  "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/callproc-e-in-out-inout": [
    "callproc",
    "IN",
    "OUT",
    "INOUT"
  ],
  "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/call-y-conjuntos-de-resultados": [
    "call",
    "nextset",
    "stored_results"
  ],
  "analisis-de-datos/mysql-connector-python/connection-pooling/definicion": [
    "pool",
    "connection pooling"
  ],
  "analisis-de-datos/mysql-connector-python/connection-pooling/pool-name-y-pool-size": [
    "pool_name",
    "pool_size",
    "get_connection"
  ],
  "analisis-de-datos/mysql-connector-python/connection-pooling/poolerror": [
    "PoolError",
    "pool agotado"
  ],
  "analisis-de-datos/mysql-connector-python/connection-pooling/pool-reset-session": [
    "pool_reset_session",
    "reset"
  ],
  "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/definicion": [
    "concurrencia",
    "threadsafety",
    "asyncio"
  ],
  "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/mysql-connector-aio": [
    "aio",
    "async",
    "await",
    "async with"
  ],
  "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/tareas-asincronas-independientes": [
    "gather",
    "concurrency"
  ],
  "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/definicion": [
    "performance",
    "batch",
    "round trip"
  ],
  "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/streaming-y-fetchmany": [
    "chunking",
    "streaming",
    "memory"
  ],
  "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/inserciones-por-lotes": [
    "executemany",
    "batch",
    "packet size"
  ],
  "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/explain-e-indices": [
    "explain",
    "index",
    "plan",
    "sargabilidad"
  ],
  "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/medicion": [
    "benchmark",
    "latency",
    "perf_counter"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/definicion": [
    "DataFrame",
    "CSV",
    "Excel",
    "JSON"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/pandas-y-sqlalchemy": [
    "read_sql",
    "engine",
    "mysql+mysqlconnector"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/numpy": [
    "numpy",
    "array",
    "mean"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-csv": [
    "csv",
    "writer",
    "exportar"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/excel": [
    "to_excel",
    "openpyxl",
    "xlsx"
  ],
  "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-json": [
    "json",
    "serialize",
    "dictionary"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/definicion": [
    "ETL",
    "extract transform load"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-csv": [
    "csv.DictReader",
    "import",
    "batch"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-excel-y-json": [
    "read_excel",
    "openpyxl",
    "json.loads"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/datos-de-apis": [
    "requests",
    "httpx",
    "API",
    "JSON"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/full-load-e-incremental": [
    "full load",
    "watermark",
    "incremental load"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/idempotencia": [
    "idempotent",
    "upsert",
    "unique key"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/staging-y-validacion": [
    "staging",
    "data quality",
    "duplicates",
    "nulls"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/reconciliacion": [
    "reconciliation",
    "data validation",
    "control totals"
  ],
  "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/load-data-local-infile": [
    "load data local infile",
    "allow_local_infile"
  ],
  "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/definicion": [
    "connection factory",
    "repository",
    "modularización"
  ],
  "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/inyeccion-de-dependencias": [
    "dependency injection",
    "repository",
    "factory"
  ],
  "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/pruebas-de-integracion": [
    "integration test",
    "assert",
    "testing"
  ],
  "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/mocking-y-pruebas-unitarias": [
    "unittest.mock",
    "unit test"
  ],
  "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/logging-y-automatizacion": [
    "logging",
    "report",
    "scheduler"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/definicion": [
    "constants",
    "conversion",
    "abstracts",
    "connection_cext"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/constantes": [
    "FieldType",
    "ClientFlag",
    "SQLMode",
    "CharacterSet"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/metadatos-del-servidor": [
    "information_schema",
    "show columns",
    "metadata"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/query-attributes": [
    "add_attribute",
    "get_attributes",
    "clear_attributes"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/comandos-de-bajo-nivel": [
    "cmd_query",
    "cmd_reset_connection",
    "get_rows"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/extension-c-y-modulos-internos": [
    "C extension",
    "_mysql_connector",
    "plugins",
    "abstracts"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/opentelemetry": [
    "telemetry",
    "tracing",
    "instrumentor"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/django": [
    "django",
    "mysql.connector.django",
    "ORM"
  ],
  "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/api-clasica-y-x-devapi": [
    "mysqlx",
    "X DevAPI",
    "classic protocol"
  ]
};
