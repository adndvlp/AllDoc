// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const sqlite3Curriculum = [
  {
    "key": "conexion-a-sqlite",
    "label": "Conexión a SQLite",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/definicion",
        "label": "Definición",
        "description": "`sqlite3` es la interfaz de Python para el motor SQLite, que trabaja directamente con archivos o memoria sin un servidor independiente."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/connect",
        "label": "connect()",
        "description": "Abre un archivo existente o crea uno nuevo si no existe."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/memory",
        "label": ":memory:",
        "description": "Crea una base privada en RAM para experimentos o pruebas."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/connection-y-cursor",
        "label": "Connection y Cursor",
        "description": "Connection representa la sesión con la base; Cursor representa la ejecución y lectura de una consulta."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/close-y-closing",
        "label": "close() y closing()",
        "description": "Cierran recursos aunque ocurra una excepción si se usa `closing` como administrador de contexto."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/uri-y-modos-de-apertura",
        "label": "URI y modos de apertura",
        "description": "Con `uri=True`, SQLite interpreta rutas `file:` y parámetros como `mode`."
      },
      {
        "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/memoria-compartida",
        "label": "Memoria compartida",
        "description": "Una URI nombrada con `mode=memory&cache=shared` permite compartir una base en RAM entre conexiones del mismo proceso."
      }
    ]
  },
  {
    "key": "ejecutar-sentencias",
    "label": "Ejecutar sentencias",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/definicion",
        "label": "Definición",
        "description": "`execute()` ejecuta una sentencia SQL; devuelve un cursor desde el que leer los resultados."
      },
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/execute-con-cursor",
        "label": "execute() con cursor",
        "description": "Un cursor explícito permite reutilizar el objeto para ejecutar consultas sucesivas."
      },
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/executemany",
        "label": "executemany()",
        "description": "Repite una sentencia DML parametrizada para cada conjunto de valores de un iterable."
      },
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/executescript",
        "label": "executescript()",
        "description": "Ejecuta un texto que contiene varias sentencias SQL separadas por punto y coma."
      },
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/atajos-de-connection",
        "label": "Atajos de Connection",
        "description": "`Connection.execute`, `executemany` y `executescript` crean un cursor implícito."
      },
      {
        "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/complete-statement",
        "label": "complete_statement()",
        "description": "Comprueba si el texto parece una sentencia completa por terminadores y cadenas cerradas."
      }
    ]
  },
  {
    "key": "parametros-sql",
    "label": "Parámetros SQL",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/definicion",
        "label": "Definición",
        "description": "Los parámetros vinculan valores de Python a una sentencia SQL sin construir el texto SQL con esos valores."
      },
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/placeholder",
        "label": "Placeholder ?",
        "description": "Cada `?` recibe un valor de la secuencia en el mismo orden."
      },
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/placeholder-nombre",
        "label": "Placeholder :nombre",
        "description": "Los parámetros nombrados toman valores de un diccionario cuyas claves no llevan dos puntos."
      },
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/in-dinamico",
        "label": "IN dinámico",
        "description": "Para una lista variable se genera un placeholder por elemento y se vinculan los valores por separado."
      },
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/identificadores-dinamicos",
        "label": "Identificadores dinámicos",
        "description": "Los parámetros representan valores, no nombres de tablas, columnas ni palabras clave."
      },
      {
        "id": "analisis-de-datos/sqlite3/parametros-sql/sql-injection",
        "label": "SQL injection",
        "description": "Concatenar entrada externa a SQL permite que el contenido cambie la consulta. Los parámetros mantienen la entrada como dato."
      }
    ]
  },
  {
    "key": "recuperar-filas",
    "label": "Recuperar filas",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/definicion",
        "label": "Definición",
        "description": "Un cursor conserva la posición de lectura de su resultado; los métodos fetch consumen filas."
      },
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchone",
        "label": "fetchone()",
        "description": "Recupera la próxima fila, o None cuando no quedan filas."
      },
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchmany-y-arraysize",
        "label": "fetchmany() y arraysize",
        "description": "`fetchmany(n)` recupera hasta n filas; si se omite n usa `cursor.arraysize`."
      },
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchall",
        "label": "fetchall()",
        "description": "Recupera todas las filas que quedan, no las ya consumidas."
      },
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/iterar-un-cursor",
        "label": "Iterar un cursor",
        "description": "El cursor es iterable y entrega filas sucesivas sin construir una lista completa de resultados."
      },
      {
        "id": "analisis-de-datos/sqlite3/recuperar-filas/returning",
        "label": "RETURNING",
        "description": "SQLite permite devolver columnas de las filas modificadas por INSERT, UPDATE o DELETE."
      }
    ]
  },
  {
    "key": "metadatos-de-cursor-y-conexion",
    "label": "Metadatos de cursor y conexión",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/definicion",
        "label": "Definición",
        "description": "El cursor expone metadatos del resultado y de ciertas modificaciones; la conexión conserva información de sesión."
      },
      {
        "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/description",
        "label": "description",
        "description": "Es una secuencia de tuplas de siete elementos por columna; sqlite3 rellena el nombre y deja los otros campos en None."
      },
      {
        "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/rowcount",
        "label": "rowcount",
        "description": "Indica filas modificadas por INSERT, UPDATE, DELETE o REPLACE; para otras sentencias normalmente es -1."
      },
      {
        "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/lastrowid",
        "label": "lastrowid",
        "description": "Retiene el ROWID de la última inserción exitosa mediante execute con INSERT o REPLACE."
      },
      {
        "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/total-changes-y-cursor-connection",
        "label": "total_changes y cursor.connection",
        "description": "`total_changes` acumula cambios desde que se abrió la conexión; `cursor.connection` devuelve su conexión."
      }
    ]
  },
  {
    "key": "crud-y-estructura",
    "label": "CRUD y estructura",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/definicion",
        "label": "Definición",
        "description": "CRUD reúne crear registros, leerlos, actualizarlos y eliminarlos. SQLite usa SQL para estas operaciones; Python organiza valores y resultados."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/create-table-y-create-index",
        "label": "CREATE TABLE y CREATE INDEX",
        "description": "CREATE TABLE define columnas y restricciones; CREATE INDEX crea una estructura que puede acelerar búsquedas."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/insert-into",
        "label": "INSERT INTO",
        "description": "Inserta registros nuevos, preferiblemente con una lista explícita de columnas."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/select",
        "label": "SELECT",
        "description": "Lee registros o resultados de consultas analíticas."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/update",
        "label": "UPDATE",
        "description": "Cambia registros existentes según una condición."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/delete",
        "label": "DELETE",
        "description": "Elimina filas seleccionadas, sujeto a restricciones y acciones referenciales."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/alter-table-y-drop-table",
        "label": "ALTER TABLE y DROP TABLE",
        "description": "ALTER cambia la estructura; DROP elimina la tabla y sus datos."
      },
      {
        "id": "analisis-de-datos/sqlite3/crud-y-estructura/on-conflict-y-upsert",
        "label": "ON CONFLICT y UPSERT",
        "description": "ON CONFLICT permite actualizar o ignorar una inserción que choca con una clave única."
      }
    ]
  },
  {
    "key": "transacciones",
    "label": "Transacciones",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/transacciones/definicion",
        "label": "Definición",
        "description": "Una transacción agrupa cambios que se confirman juntos o se revierten."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/commit",
        "label": "commit()",
        "description": "Confirma cambios pendientes."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/rollback",
        "label": "rollback()",
        "description": "Descarta cambios no confirmados."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/autocommit",
        "label": "autocommit",
        "description": "Controla el manejo de transacciones: False, True o LEGACY_TRANSACTION_CONTROL."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/isolation-level",
        "label": "isolation_level",
        "description": "En modo legado controla el BEGIN implícito de DML: DEFERRED, IMMEDIATE, EXCLUSIVE o None."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/begin-commit-y-rollback-sql",
        "label": "BEGIN, COMMIT y ROLLBACK SQL",
        "description": "Con autocommit=True se puede controlar una transacción mediante sentencias SQL."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/in-transaction",
        "label": "in_transaction",
        "description": "Indica si SQLite está dentro de una transacción de bajo nivel."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/with-connection",
        "label": "with Connection",
        "description": "Confirma al salir normalmente o revierte al salir con excepción si hay una transacción aplicable."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/savepoint",
        "label": "SAVEPOINT",
        "description": "Permite revertir solo parte de una transacción."
      },
      {
        "id": "analisis-de-datos/sqlite3/transacciones/lotes-atomicos",
        "label": "Lotes atómicos",
        "description": "executemany puede dejar cambios parciales si no hay una transacción apropiada."
      }
    ]
  },
  {
    "key": "tipos-de-datos",
    "label": "Tipos de datos",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/definicion",
        "label": "Definición",
        "description": "SQLite tiene cinco clases de almacenamiento que sqlite3 convierte a tipos Python."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/afinidad-de-tipos",
        "label": "Afinidad de tipos",
        "description": "El tipo declarado orienta conversiones pero no impone siempre una clase de almacenamiento."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/strict-tables",
        "label": "STRICT TABLES",
        "description": "Restringe los valores a tipos admitidos y rechaza conversiones incompatibles."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/none-y-null",
        "label": "None y NULL",
        "description": "None se vincula como NULL; para buscar valores ausentes usa IS NULL."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/fechas-y-horas",
        "label": "Fechas y horas",
        "description": "SQLite no tiene un tipo de almacenamiento específico para fechas; usa texto ISO, día juliano o timestamp Unix."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/rowid-e-integer-primary-key",
        "label": "ROWID e INTEGER PRIMARY KEY",
        "description": "ROWID identifica filas de tablas ordinarias; INTEGER PRIMARY KEY suele ser su alias."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/autoincrement",
        "label": "AUTOINCREMENT",
        "description": "Evita reutilizar ROWID previamente confirmados de esa tabla."
      },
      {
        "id": "analisis-de-datos/sqlite3/tipos-de-datos/without-rowid",
        "label": "WITHOUT ROWID",
        "description": "Almacena una tabla según su clave primaria declarada, sin ROWID interno."
      }
    ]
  },
  {
    "key": "representacion-de-resultados",
    "label": "Representación de resultados",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/definicion",
        "label": "Definición",
        "description": "Una row factory transforma cada fila recuperada; por defecto es una tupla."
      },
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/sqlite3-row-y-keys",
        "label": "sqlite3.Row y keys()",
        "description": "Row permite acceso por nombre sin distinguir mayúsculas, posición y keys()."
      },
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/row-factory-personalizada",
        "label": "row_factory personalizada",
        "description": "Una función recibe el cursor y la tupla de valores y devuelve la representación elegida."
      },
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/namedtuple-y-dataclass",
        "label": "namedtuple y dataclass",
        "description": "Una factory puede devolver objetos con atributos."
      },
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/connection-row-factory-y-cursor-row-factory",
        "label": "Connection.row_factory y Cursor.row_factory",
        "description": "El valor de la conexión se copia al crear el cursor."
      },
      {
        "id": "analisis-de-datos/sqlite3/representacion-de-resultados/text-factory",
        "label": "text_factory",
        "description": "Define cómo convertir los valores TEXT; por defecto es str."
      }
    ]
  },
  {
    "key": "adaptadores-y-convertidores",
    "label": "Adaptadores y convertidores",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/definicion",
        "label": "Definición",
        "description": "Los adaptadores transforman objetos Python para almacenarlos; los convertidores reconstruyen objetos al leer."
      },
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-adapter",
        "label": "register_adapter()",
        "description": "Registra una función que transforma un tipo Python a un valor compatible con SQLite."
      },
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/conform-y-prepareprotocol",
        "label": "__conform__() y PrepareProtocol",
        "description": "Un objeto puede adaptarse mediante __conform__ cuando se solicita PrepareProtocol."
      },
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-converter",
        "label": "register_converter()",
        "description": "Registra una función que recibe bytes y devuelve un objeto Python."
      },
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-decltypes",
        "label": "PARSE_DECLTYPES",
        "description": "Busca convertidores según el tipo declarado de la columna."
      },
      {
        "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-colnames",
        "label": "PARSE_COLNAMES",
        "description": "Busca convertidores en alias de la forma nombre [TIPO]."
      }
    ]
  },
  {
    "key": "errores-y-diagnostico",
    "label": "Errores y diagnóstico",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/definicion",
        "label": "Definición",
        "description": "sqlite3 usa excepciones para distinguir errores de datos, SQL y uso de la API."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/integrityerror",
        "label": "IntegrityError",
        "description": "Indica violaciones de restricciones como claves primarias, foráneas o CHECK."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/operationalerror",
        "label": "OperationalError",
        "description": "Indica problemas operativos como tabla inexistente, SQL inválido o bloqueo."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/programmingerror",
        "label": "ProgrammingError",
        "description": "Indica uso incorrecto de la API, como una cantidad incorrecta de parámetros."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/jerarquia-db-api",
        "label": "Jerarquía DB-API",
        "description": "DatabaseError agrupa DataError, OperationalError, IntegrityError, InternalError, ProgrammingError y NotSupportedError; InterfaceError deriva de Error."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/sqlite-errorcode-y-sqlite-errorname",
        "label": "sqlite_errorcode y sqlite_errorname",
        "description": "Las excepciones procedentes de SQLite pueden exponer un código numérico y un nombre simbólico."
      },
      {
        "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/try-except-y-finally",
        "label": "try, except y finally",
        "description": "finally garantiza ejecutar la liberación de recursos incluso tras un error."
      }
    ]
  },
  {
    "key": "inspeccion-y-validacion-de-sqlite",
    "label": "Inspección y validación de SQLite",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/definicion",
        "label": "Definición",
        "description": "sqlite_schema y PRAGMA permiten conocer estructura y configuración de una base."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-table-info-y-table-list",
        "label": "PRAGMA table_info y table_list",
        "description": "table_info devuelve columnas y restricciones básicas; table_list enumera tablas y vistas."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-keys",
        "label": "PRAGMA foreign_keys",
        "description": "Controla la comprobación de claves foráneas en la conexión."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-key-list",
        "label": "PRAGMA foreign_key_list",
        "description": "Devuelve relaciones declaradas para una tabla."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-integrity-check-y-foreign-key-check",
        "label": "PRAGMA integrity_check y foreign_key_check",
        "description": "integrity_check revisa consistencia interna; foreign_key_check busca violaciones referenciales."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-index-list-e-index-info",
        "label": "PRAGMA index_list e index_info",
        "description": "Permiten consultar índices de una tabla y columnas de un índice."
      },
      {
        "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/attach-y-detach-database",
        "label": "ATTACH y DETACH DATABASE",
        "description": "ATTACH incorpora otra base bajo un nombre de esquema; DETACH la separa."
      }
    ]
  },
  {
    "key": "integracion-con-pandas-y-archivos",
    "label": "Integración con pandas y archivos",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/definicion",
        "label": "Definición",
        "description": "sqlite3 permite combinar SQL con herramientas de análisis y archivos para extraer, transformar y cargar datos (ETL)."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/read-sql-query-y-read-sql",
        "label": "read_sql_query() y read_sql()",
        "description": "pandas puede leer el resultado de SQL directamente como DataFrame a partir de una conexión sqlite3."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/params-y-parse-dates",
        "label": "params y parse_dates",
        "description": "params pasa parámetros a SQL; parse_dates convierte columnas a fechas de pandas."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/to-sql",
        "label": "to_sql()",
        "description": "Escribe un DataFrame en una tabla de SQLite."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/if-exists-dtype-y-chunksize",
        "label": "if_exists, dtype y chunksize",
        "description": "if_exists controla si falla, añade o reemplaza; dtype especifica tipos y chunksize el tamaño del lote."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/lectura-por-bloques",
        "label": "Lectura por bloques",
        "description": "read_sql_query con chunksize devuelve un iterador de DataFrames."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/csv",
        "label": "CSV",
        "description": "csv permite convertir filas SQL en texto tabular e importar registros desde archivos."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-csv",
        "label": "Importar CSV",
        "description": "DictReader interpreta encabezados como claves; executemany carga los registros transformados."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/json",
        "label": "JSON",
        "description": "json convierte registros Python compatibles en JSON y viceversa."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-json",
        "label": "Importar JSON",
        "description": "json.loads interpreta texto JSON como objetos Python; los valores se insertan con parámetros."
      },
      {
        "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/validar-conteos-y-duplicados",
        "label": "Validar conteos y duplicados",
        "description": "La validación compara resultados con reglas de negocio, no solo con la ausencia de errores."
      }
    ]
  },
  {
    "key": "concurrencia-y-rendimiento",
    "label": "Concurrencia y rendimiento",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/definicion",
        "label": "Definición",
        "description": "SQLite permite múltiples lectores pero serializa las escrituras; el rendimiento depende también de índices, transacciones y tamaño de resultados."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/explain-query-plan",
        "label": "EXPLAIN QUERY PLAN",
        "description": "Muestra una descripción de cómo se accede a las tablas e índices."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/pragma-journal-mode-y-wal",
        "label": "PRAGMA journal_mode y WAL",
        "description": "El modo WAL registra cambios en un archivo adicional y permite que lectores y escritor trabajen simultáneamente en más situaciones."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/timeout-y-busy-timeout",
        "label": "timeout y busy_timeout",
        "description": "timeout indica segundos de espera ante ciertos bloqueos; PRAGMA busy_timeout usa milisegundos."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/conexiones-independientes-y-bloqueos",
        "label": "Conexiones independientes y bloqueos",
        "description": "Conexiones a un mismo archivo compiten por el acceso de escritura."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/check-same-thread-y-threadsafety",
        "label": "check_same_thread y threadsafety",
        "description": "Por defecto la conexión solo se usa en el hilo que la creó; threadsafety informa el nivel DB-API soportado por la compilación."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/cached-statements",
        "label": "cached_statements",
        "description": "Configura cuántas sentencias preparadas puede conservar la conexión para reutilizarlas."
      },
      {
        "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/vacuum-analyze-y-pragma-optimize",
        "label": "VACUUM, ANALYZE y PRAGMA optimize",
        "description": "VACUUM reconstruye la base; ANALYZE recopila estadísticas; optimize ayuda a mantenerlas cuando es conveniente."
      }
    ]
  },
  {
    "key": "copias-y-exportacion-de-bases",
    "label": "Copias y exportación de bases",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/definicion",
        "label": "Definición",
        "description": "El módulo permite copiar una base completa o exportar su contenido a SQL o bytes."
      },
      {
        "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/backup",
        "label": "backup()",
        "description": "Copia una base SQLite a otra conexión, incluso si existen accesos concurrentes compatibles."
      },
      {
        "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/iterdump",
        "label": "iterdump()",
        "description": "Genera sentencias SQL que reconstruyen una base."
      },
      {
        "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/serialize-y-deserialize",
        "label": "serialize() y deserialize()",
        "description": "serialize obtiene una representación binaria de una base; deserialize carga esos bytes en una conexión."
      }
    ]
  },
  {
    "key": "funciones-sql-personalizadas",
    "label": "Funciones SQL personalizadas",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/definicion",
        "label": "Definición",
        "description": "SQLite puede ejecutar funciones Python registradas en una conexión para calcular valores dentro de SQL."
      },
      {
        "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-function",
        "label": "create_function()",
        "description": "Registra una función escalar SQL con nombre, número de argumentos y callable Python."
      },
      {
        "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-aggregate",
        "label": "create_aggregate()",
        "description": "Registra una agregación cuya clase implementa step y finalize."
      },
      {
        "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-window-function",
        "label": "create_window_function()",
        "description": "Registra una función agregada de ventana con step, inverse, value y finalize."
      },
      {
        "id": "analisis-de-datos/sqlite3/funciones-sql-personalizadas/create-collation",
        "label": "create_collation()",
        "description": "Registra una comparación de texto personalizada para COLLATE."
      }
    ]
  },
  {
    "key": "callbacks-y-control-de-ejecucion",
    "label": "Callbacks y control de ejecución",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/definicion",
        "label": "Definición",
        "description": "Los callbacks son funciones Python que SQLite invoca durante determinadas operaciones."
      },
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-trace-callback",
        "label": "set_trace_callback()",
        "description": "Recibe el texto de cada sentencia SQL ejecutada por el motor, incluidas algunas sentencias internas."
      },
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-progress-handler",
        "label": "set_progress_handler()",
        "description": "Invoca un callback cada cierto número de instrucciones de la máquina virtual SQLite."
      },
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/set-authorizer",
        "label": "set_authorizer()",
        "description": "Permite aceptar, denegar o ignorar acciones solicitadas por SQL."
      },
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/interrupt",
        "label": "interrupt()",
        "description": "Solicita interrumpir operaciones SQL en ejecución desde otro hilo."
      },
      {
        "id": "analisis-de-datos/sqlite3/callbacks-y-control-de-ejecucion/enable-callback-tracebacks",
        "label": "enable_callback_tracebacks()",
        "description": "Habilita la impresión de trazas de excepciones de callbacks que normalmente no se muestran completas."
      }
    ]
  },
  {
    "key": "blob-y-acceso-binario",
    "label": "BLOB y acceso binario",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/definicion",
        "label": "Definición",
        "description": "Un BLOB conserva bytes sin interpretarlos como texto. sqlite3 acepta bytes directamente."
      },
      {
        "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/blobopen-y-zeroblob",
        "label": "blobopen() y zeroblob()",
        "description": "Abre un BLOB existente para lectura y escritura incremental; zeroblob reserva un tamaño fijo."
      },
      {
        "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/read-write-seek-tell-y-close",
        "label": "read(), write(), seek(), tell() y close()",
        "description": "Blob se comporta como un archivo de tamaño fijo con posición de lectura y escritura."
      }
    ]
  },
  {
    "key": "configuracion-y-extensiones",
    "label": "Configuración y extensiones",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/definicion",
        "label": "Definición",
        "description": "La conexión expone límites y opciones de SQLite; algunas dependen de la versión y compilación."
      },
      {
        "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/getlimit-y-setlimit",
        "label": "getlimit() y setlimit()",
        "description": "Leen o modifican límites de recursos del motor, identificados por constantes SQLITE_LIMIT."
      },
      {
        "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/getconfig-y-setconfig",
        "label": "getconfig() y setconfig()",
        "description": "Consultan o modifican opciones booleanas SQLITE_DBCONFIG de la conexión."
      },
      {
        "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/extensiones-cargables",
        "label": "Extensiones cargables",
        "description": "enable_load_extension habilita o deshabilita la carga; load_extension carga una biblioteca SQLite nativa."
      },
      {
        "id": "analisis-de-datos/sqlite3/configuracion-y-extensiones/factory-de-conexion-y-cursor",
        "label": "factory de conexión y cursor",
        "description": "El parámetro factory permite usar subclases de Connection o Cursor para personalizar su comportamiento."
      }
    ]
  },
  {
    "key": "compatibilidad-y-db-api-2-0",
    "label": "Compatibilidad y DB-API 2.0",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/definicion",
        "label": "Definición",
        "description": "sqlite3 implementa la interfaz DB-API 2.0 de Python y se apoya en una versión concreta del motor SQLite."
      },
      {
        "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/apilevel-y-paramstyle",
        "label": "apilevel y paramstyle",
        "description": "apilevel identifica la versión de DB-API; paramstyle anuncia el estilo de parámetros declarado."
      },
      {
        "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/sqlite-version-y-sqlite-version-info",
        "label": "sqlite_version y sqlite_version_info",
        "description": "Informan la versión del motor como texto y tupla numérica."
      },
      {
        "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/setinputsizes-y-setoutputsize",
        "label": "setinputsizes() y setoutputsize()",
        "description": "Métodos requeridos por DB-API que no realizan ninguna operación en sqlite3."
      },
      {
        "id": "analisis-de-datos/sqlite3/compatibilidad-y-db-api-2-0/cambios-entre-versiones",
        "label": "Cambios entre versiones",
        "description": "La disponibilidad de funciones depende de Python y del motor; algunas API antiguas se deprecian o eliminan."
      }
    ]
  },
  {
    "key": "pruebas-y-flujos-reproducibles",
    "label": "Pruebas y flujos reproducibles",
    "children": [
      {
        "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/definicion",
        "label": "Definición",
        "description": "Una base aislada permite probar consultas, escrituras y reglas de integridad sin tocar datos reales."
      },
      {
        "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/aislamiento-de-pruebas",
        "label": "Aislamiento de pruebas",
        "description": "Cada prueba abre su propia base para que las modificaciones no contaminen otras pruebas."
      },
      {
        "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/procesamiento-incremental-y-generadores",
        "label": "Procesamiento incremental y generadores",
        "description": "Combina iteración o fetchmany con executemany para procesar registros sin cargar todo en memoria."
      },
      {
        "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/cli-de-sqlite3",
        "label": "CLI de sqlite3",
        "description": "Python incluye una interfaz de línea de comandos para ejecutar SQL sin escribir un script Python."
      }
    ]
  }
];
