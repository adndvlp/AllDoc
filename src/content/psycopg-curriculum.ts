// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const psycopgCurriculum = [
  {
    "key": "instalacion-y-compatibilidad",
    "label": "Instalación y compatibilidad",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/definicion",
        "label": "Definición",
        "description": "Psycopg es un adaptador que permite enviar SQL a PostgreSQL y recibir datos como objetos Python. Implementa DB-API 2.0."
      },
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/instalacion-binaria",
        "label": "Instalación binaria",
        "description": "El extra `binary` incluye una implementación compilada y las bibliotecas necesarias para plataformas compatibles."
      },
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/instalacion-local-y-python-puro",
        "label": "Instalación local y Python puro",
        "description": "El extra `c` compila una extensión ligada a libpq del sistema; `psycopg` sin extras usa la implementación Python y necesita libpq disponible."
      },
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/psycopg-impl",
        "label": "PSYCOPG_IMPL",
        "description": "La variable `PSYCOPG_IMPL` permite exigir una implementación concreta antes de importar."
      },
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/db-api-2-0",
        "label": "DB-API 2.0",
        "description": "El estándar define un contrato común para conexiones, cursores y excepciones de Python."
      },
      {
        "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/psycopg-2-frente-a-psycopg-3",
        "label": "Psycopg 2 frente a Psycopg 3",
        "description": "Psycopg 3 usa el paquete `psycopg`, no `psycopg2`; incorpora APIs distintas para COPY, async y adaptación."
      }
    ]
  },
  {
    "key": "conexiones",
    "label": "Conexiones",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/conexiones/definicion",
        "label": "Definición",
        "description": "Una conexión representa una sesión de Python con PostgreSQL. Permite ejecutar SQL y administrar transacciones."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/connect-y-argumentos",
        "label": "connect y argumentos",
        "description": "`connect()` recibe una cadena de conexión y/o argumentos de libpq para elegir servidor, base y usuario."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/dsn-y-uri",
        "label": "DSN y URI",
        "description": "Una cadena conninfo puede usar pares `clave=valor` o una URI `postgresql://...`."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/variables-de-entorno-y-credenciales",
        "label": "Variables de entorno y credenciales",
        "description": "libpq puede leer sus parámetros de conexión del entorno, y Python puede recibir una URL de un gestor de secretos."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/close-y-estado-de-conexion",
        "label": "close y estado de conexión",
        "description": "`close()` termina la sesión; `closed` y `broken` distinguen una sesión cerrada de una interrumpida."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/context-manager-de-conexion",
        "label": "Context manager de conexión",
        "description": "`with psycopg.connect(...)` confirma al salir normalmente, revierte al salir por excepción y cierra la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/informacion-de-sesion",
        "label": "Información de sesión",
        "description": "`conn.info` expone metadatos de la conexión y del servidor, como base, usuario, versión, backend y estado de transacción."
      },
      {
        "id": "analisis-de-datos/psycopg/conexiones/conninfo-to-dict-y-make-conninfo",
        "label": "conninfo_to_dict y make_conninfo",
        "description": "Estas funciones analizan y ensamblan cadenas de conexión sin abrir una sesión."
      }
    ]
  },
  {
    "key": "cursores-y-ejecucion",
    "label": "Cursores y ejecución",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/definicion",
        "label": "Definición",
        "description": "Un cursor envía una instrucción SQL y permite recorrer sus resultados. Una misma conexión puede crear varios cursores."
      },
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/cursor-y-close",
        "label": "cursor y close",
        "description": "`conn.cursor()` crea un cursor; `close()` libera sus recursos sin cerrar la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/execute",
        "label": "execute",
        "description": "`execute()` envía una consulta y devuelve el propio cursor. En el cursor ordinario, el resultado queda disponible para recuperarlo."
      },
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/conn-execute",
        "label": "conn.execute",
        "description": "Es un atajo que crea un cursor y ejecuta una consulta en la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/context-manager-de-cursor",
        "label": "Context manager de cursor",
        "description": "El bloque `with conn.cursor()` cierra el cursor automáticamente al terminar."
      },
      {
        "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/varios-cursores",
        "label": "Varios cursores",
        "description": "Dos cursores de una conexión conservan resultados independientes, pero comparten la sesión y la transacción."
      }
    ]
  },
  {
    "key": "parametros-y-seguridad-de-consultas",
    "label": "Parámetros y seguridad de consultas",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/definicion",
        "label": "Definición",
        "description": "Una consulta parametrizada mantiene separados el SQL y los valores de entrada. Psycopg adapta los objetos Python al tipo SQL correspondiente."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/parametros-posicionales",
        "label": "Parámetros posicionales",
        "description": "Los marcadores `%s` se rellenan con una secuencia de valores en el mismo orden, independientemente del tipo."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/un-solo-parametro",
        "label": "Un solo parámetro",
        "description": "Una tupla de un elemento lleva una coma final; una lista de un elemento también funciona."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/parametros-nombrados",
        "label": "Parámetros nombrados",
        "description": "`%(nombre)s` permite referirse a los valores de un diccionario y reutilizar una clave."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/formatos-s-b-y-t",
        "label": "Formatos %s, %b y %t",
        "description": "`%s` deja elegir formato al adaptador; `%b` pide binario y `%t` texto."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/comillas-y-porcentaje-literal",
        "label": "Comillas y porcentaje literal",
        "description": "No se ponen comillas alrededor de un marcador. Con parámetros, un `%` literal en la consulta debe escribirse `%%`."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/sql-injection",
        "label": "SQL injection",
        "description": "Concatenar texto de entrada como SQL puede alterar la consulta; vincularlo como parámetro lo conserva como dato."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/any-con-listas",
        "label": "ANY con listas",
        "description": "`= ANY(%s)` compara un valor con los elementos de un arreglo PostgreSQL adaptado desde una lista Python."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/null-como-parametro",
        "label": "NULL como parámetro",
        "description": "`None` se adapta a NULL. Para igualdad que trate NULL como un valor comparable se usa `IS NOT DISTINCT FROM`."
      },
      {
        "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/template-strings-t-strings",
        "label": "Template strings (t-strings)",
        "description": "Desde Psycopg 3.3 y Python 3.14, un literal `t\"...\"` puede expresar consultas parametrizadas sin usar una tupla explícita."
      }
    ]
  },
  {
    "key": "composicion-sql-dinamica",
    "label": "Composición SQL dinámica",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/definicion",
        "label": "Definición",
        "description": "`psycopg.sql` permite construir instrucciones con fragmentos de sintaxis e identificadores variables sin confundirlos con los valores."
      },
      {
        "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/sql-y-identifier",
        "label": "SQL y Identifier",
        "description": "`SQL()` representa sintaxis SQL confiable; `Identifier()` cita correctamente un nombre de tabla, columna o esquema."
      },
      {
        "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/literal",
        "label": "Literal",
        "description": "`Literal()` incorpora un objeto Python como literal SQL usando las reglas de adaptación."
      },
      {
        "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/placeholder",
        "label": "Placeholder",
        "description": "`Placeholder()` genera un marcador `%s` o uno nombrado para una consulta compuesta."
      },
      {
        "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/format-join-y-composed",
        "label": "format, join y Composed",
        "description": "`format()` sustituye fragmentos componibles y `join()` los une con un separador SQL; devuelven un objeto `Composed`."
      }
    ]
  },
  {
    "key": "recuperacion-de-resultados",
    "label": "Recuperación de resultados",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/definicion",
        "label": "Definición",
        "description": "Las operaciones `fetch` consumen las filas disponibles del último resultado del cursor. Por defecto cada fila es una tupla."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchone",
        "label": "fetchone",
        "description": "Devuelve la siguiente fila o `None` cuando no quedan filas."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchmany-y-arraysize",
        "label": "fetchmany y arraysize",
        "description": "`fetchmany(n)` recupera hasta n filas; sin argumento usa `arraysize`."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchall",
        "label": "fetchall",
        "description": "Devuelve todas las filas que todavía no se han consumido."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/iteracion-de-cursor",
        "label": "Iteración de cursor",
        "description": "Un cursor es iterable y permite procesar cada fila de la consulta sin construir una lista adicional."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/rowcount-y-statusmessage",
        "label": "rowcount y statusmessage",
        "description": "`rowcount` indica cuántas filas conoce el cursor para la operación; `statusmessage` contiene la etiqueta del servidor."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/description-y-column",
        "label": "description y Column",
        "description": "`description` describe las columnas de un resultado, con nombre y tipo, entre otros metadatos."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/rownumber",
        "label": "rownumber",
        "description": "Indica la posición actual en el resultado cuando el cursor puede determinarla."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/nextset",
        "label": "nextset",
        "description": "Cambia al siguiente conjunto de resultados, si existe, de una ejecución con varias respuestas."
      },
      {
        "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/results-y-set-result",
        "label": "results y set_result",
        "description": "`results()` recorre los conjuntos de resultados de una ejecución múltiple; `set_result(index)` selecciona uno mediante su posición, que empieza en cero."
      }
    ]
  },
  {
    "key": "operaciones-sql-y-cargas-por-lotes",
    "label": "Operaciones SQL y cargas por lotes",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/definicion",
        "label": "Definición",
        "description": "Psycopg ejecuta SQL de PostgreSQL para leer o modificar datos. Las operaciones de escritura requieren confirmar o revertir la transacción."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/insert-y-returning",
        "label": "INSERT y RETURNING",
        "description": "`INSERT` añade filas; `RETURNING` permite recuperar datos de la fila insertada en la misma instrucción."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/update",
        "label": "UPDATE",
        "description": "Modifica filas que cumplen una condición. Se pueden recuperar sus valores nuevos con RETURNING."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/delete",
        "label": "DELETE",
        "description": "Elimina las filas que cumplen una condición. `rowcount` y `RETURNING` permiten comprobar el cambio."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/create-alter-y-drop",
        "label": "CREATE, ALTER y DROP",
        "description": "Las sentencias DDL modifican estructuras de la base de datos. PostgreSQL permite revertir muchas de ellas dentro de una transacción."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/on-conflict",
        "label": "ON CONFLICT",
        "description": "PostgreSQL permite omitir o actualizar una fila ante un conflicto de unicidad."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/executemany",
        "label": "executemany",
        "description": "Ejecuta la misma sentencia para varios conjuntos de parámetros sin construir SQL manualmente para cada fila."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/executemany-con-returning",
        "label": "executemany con returning",
        "description": "`returning=True` conserva un conjunto de resultados por cada ejecución."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/batch-processing",
        "label": "Batch processing",
        "description": "Un lote agrupa muchas operaciones en una unidad de trabajo y evita acumular todos los registros de origen en memoria."
      },
      {
        "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/consultas-analiticas",
        "label": "Consultas analíticas",
        "description": "Una consulta SQL puede realizar joins, agregaciones, CTEs y ventanas antes de devolver resultados a Python."
      }
    ]
  },
  {
    "key": "transacciones",
    "label": "Transacciones",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/transacciones/definicion",
        "label": "Definición",
        "description": "Una transacción reúne operaciones que se confirman juntas o se revierten. Por defecto Psycopg abre una transacción al ejecutar la primera instrucción, incluso SELECT."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/commit",
        "label": "commit",
        "description": "Confirma los cambios pendientes en la transacción actual para que sean visibles según las reglas de aislamiento."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/rollback",
        "label": "rollback",
        "description": "Revierte todos los cambios no confirmados de la transacción actual y permite reutilizar la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/autocommit",
        "label": "autocommit",
        "description": "Con `autocommit=True` las instrucciones se ejecutan sin la transacción implícita administrada por Psycopg."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/transaction",
        "label": "transaction()",
        "description": "El contexto `conn.transaction()` delimita una transacción o un savepoint si ya existe una transacción activa."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/savepoint-y-transacciones-anidadas",
        "label": "SAVEPOINT y transacciones anidadas",
        "description": "Un savepoint permite revertir una parte de una transacción sin perder operaciones anteriores. Los contextos transaction anidados usan savepoints."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/force-rollback-y-rollback",
        "label": "force_rollback y Rollback",
        "description": "`force_rollback=True` revierte al salir del bloque incluso sin error; `Rollback` solicita la reversión del contexto."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/isolationlevel",
        "label": "IsolationLevel",
        "description": "El nivel de aislamiento determina qué cambios de otras transacciones pueden observarse. PostgreSQL implementa READ COMMITTED, REPEATABLE READ y SERIALIZABLE (READ UNCOMMITTED se comporta como READ COMMITTED)."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/read-only-y-deferrable",
        "label": "read_only y deferrable",
        "description": "`read_only` protege una transacción de escrituras normales; `deferrable` permite esperar una instantánea segura en SERIALIZABLE READ ONLY."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/idle-in-transaction",
        "label": "Idle in transaction",
        "description": "Una conexión abierta después de un SELECT puede mantener una transacción inactiva, con recursos y bloqueos retenidos."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/transacciones-en-dos-fases",
        "label": "Transacciones en dos fases",
        "description": "Two-phase commit coordina una confirmación entre participantes mediante preparar y confirmar o revertir. Usa `xid`, `tpc_begin`, `tpc_prepare`, `tpc_commit`, `tpc_rollback` y `tpc_recover`."
      },
      {
        "id": "analisis-de-datos/psycopg/transacciones/ciclo-tpc-y-recuperacion",
        "label": "Ciclo TPC y recuperación",
        "description": "Tras `tpc_begin(xid)` se ejecutan operaciones; `tpc_prepare()` deja la transacción preparada. `tpc_recover()` enumera las pendientes y se resuelven con `tpc_commit(xid)` o `tpc_rollback(xid)`."
      }
    ]
  },
  {
    "key": "errores-y-recuperacion",
    "label": "Errores y recuperación",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/definicion",
        "label": "Definición",
        "description": "Psycopg traduce fallos del servidor y del controlador en excepciones Python. Se capturan para decidir si se revierte la transacción, se informa o se reintenta."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/try-except-y-finally",
        "label": "try, except y finally",
        "description": "`try` delimita operaciones que pueden fallar; `except` trata excepciones concretas; `finally` ejecuta la limpieza."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/jerarquia-db-api",
        "label": "Jerarquía DB-API",
        "description": "`Error` es la base de los errores; `DatabaseError` agrupa `DataError`, `OperationalError`, `IntegrityError`, `InternalError`, `ProgrammingError` y `NotSupportedError`. `InterfaceError` representa errores de interfaz; `Warning` es otra rama."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/integrityerror-y-uniqueviolation",
        "label": "IntegrityError y UniqueViolation",
        "description": "Las restricciones violadas producen errores de integridad. PostgreSQL distingue duplicados, referencias inválidas, nulos prohibidos y CHECK."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/foreignkeyviolation-y-notnullviolation",
        "label": "ForeignKeyViolation y NotNullViolation",
        "description": "Una llave foránea exige una referencia válida y NOT NULL impide valores ausentes."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/programmingerror-y-dataerror",
        "label": "ProgrammingError y DataError",
        "description": "`ProgrammingError` cubre errores SQL como sintaxis o tablas ausentes; `DataError` incluye conversiones inválidas y desbordamientos."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/sqlstate-y-diag",
        "label": "SQLSTATE y diag",
        "description": "`sqlstate` identifica el error con un código estable; `diag` expone campos como mensaje, tabla o restricción cuando el servidor los proporciona."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/infailedsqltransaction",
        "label": "InFailedSqlTransaction",
        "description": "Después de un error en una transacción, nuevas instrucciones fallan hasta revertirla o volver a un savepoint."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/operationalerror-y-desconexiones",
        "label": "OperationalError y desconexiones",
        "description": "Un fallo de red, servidor no disponible o autenticación fallida puede impedir abrir o seguir usando una sesión."
      },
      {
        "id": "analisis-de-datos/psycopg/errores-y-recuperacion/reintentos-acotados",
        "label": "Reintentos acotados",
        "description": "Algunos fallos de serialización o deadlocks permiten repetir toda la transacción; no todas las operaciones se pueden repetir sin efectos duplicados."
      }
    ]
  },
  {
    "key": "adaptacion-de-tipos-basicos",
    "label": "Adaptación de tipos básicos",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/definicion",
        "label": "Definición",
        "description": "Adaptar consiste en convertir valores Python en parámetros PostgreSQL y convertir resultados SQL en objetos Python. El controlador elige adaptadores según el valor y el tipo del servidor."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/int-y-wrappers-numericos",
        "label": "int y wrappers numéricos",
        "description": "Los enteros Python se adaptan a tipos enteros PostgreSQL según el valor; los wrappers como `Int4` fijan el tipo de parámetro."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/float-y-decimal",
        "label": "float y Decimal",
        "description": "`float` se adapta normalmente a DOUBLE PRECISION; `Decimal` a NUMERIC, apropiado para cantidades monetarias exactas."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/str-y-bool",
        "label": "str y bool",
        "description": "El texto se adapta con la codificación de la conexión; los booleanos se convierten a BOOLEAN."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/none-y-null",
        "label": "None y NULL",
        "description": "Un NULL SQL se recibe como `None`; enviar None lo adapta a NULL."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/date-y-time",
        "label": "date y time",
        "description": "Los objetos `date` y `time` se adaptan a tipos de fecha y hora."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/datetime-y-zonas-horarias",
        "label": "datetime y zonas horarias",
        "description": "Un datetime sin tzinfo corresponde a TIMESTAMP; con tzinfo se adapta a TIMESTAMPTZ. La zona de la sesión afecta la representación de TIMESTAMPTZ recuperado."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/timedelta-e-interval",
        "label": "timedelta e INTERVAL",
        "description": "Un timedelta representa una duración y se adapta a INTERVAL."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/bytes-y-bytea",
        "label": "bytes y BYTEA",
        "description": "`bytes`, `bytearray` y `memoryview` pueden adaptarse a datos binarios PostgreSQL."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/listas-y-array",
        "label": "Listas y ARRAY",
        "description": "Una lista de valores compatibles se adapta a un arreglo PostgreSQL; un ARRAY recuperado se convierte en lista."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/uuid",
        "label": "UUID",
        "description": "El tipo `uuid.UUID` se adapta directamente a UUID de PostgreSQL."
      }
    ]
  },
  {
    "key": "json-y-otros-tipos-postgresql",
    "label": "JSON y otros tipos PostgreSQL",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/definicion",
        "label": "Definición",
        "description": "Psycopg también adapta tipos específicos de PostgreSQL. Algunos necesitan envoltorios o registrar metadatos del tipo en la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/json-y-jsonb",
        "label": "Json y Jsonb",
        "description": "Los wrappers `Json` y `Jsonb` indican cómo serializar un objeto Python como JSON o JSONB."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/set-json-dumps-y-set-json-loads",
        "label": "set_json_dumps y set_json_loads",
        "description": "Permiten personalizar la serialización y la lectura de JSON globalmente o en un contexto de adaptación."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/enums-y-register-enum",
        "label": "Enums y register_enum",
        "description": "Un enum PostgreSQL puede asociarse a una enumeración Python mediante `EnumInfo` y `register_enum`."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/rangos-y-register-range",
        "label": "Rangos y register_range",
        "description": "Los rangos representan intervalos con límites abiertos o cerrados. Los tipos personalizados se registran con `RangeInfo` y `register_range`."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/multirangos-y-register-multirange",
        "label": "Multirangos y register_multirange",
        "description": "Un multirango contiene varios rangos. Los personalizados usan `MultirangeInfo` y `register_multirange`."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/tipos-compuestos-y-register-composite",
        "label": "Tipos compuestos y register_composite",
        "description": "Un tipo compuesto combina campos con tipos distintos. Psycopg puede registrar su estructura y convertirla en un objeto Python."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/hstore-y-register-hstore",
        "label": "HSTORE y register_hstore",
        "description": "HSTORE es una extensión PostgreSQL para pares texto-texto. Su adaptador puede convertir un valor a dict."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/serializador-json-personalizado",
        "label": "Serializador JSON personalizado",
        "description": "`set_json_dumps()` configura cómo se convierte un objeto Python en JSON antes de enviarlo a PostgreSQL."
      },
      {
        "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/registrar-rango-personalizado",
        "label": "Registrar un rango personalizado",
        "description": "`RangeInfo.fetch()` obtiene los metadatos de un rango PostgreSQL y `register_range()` instala su adaptación. `MultirangeInfo.fetch()` y `register_multirange()` hacen lo correspondiente para multirangos personalizados."
      }
    ]
  },
  {
    "key": "row-factories",
    "label": "Row factories",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/row-factories/definicion",
        "label": "Definición",
        "description": "Una row factory decide cómo se convierte cada fila recuperada: tupla, diccionario, objeto u otro resultado."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/tuple-row",
        "label": "tuple_row",
        "description": "Es la fábrica de filas predeterminada: devuelve una tupla con los campos en el orden de SELECT."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/dict-row",
        "label": "dict_row",
        "description": "Devuelve diccionarios cuyas claves son los nombres de columnas del resultado."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/namedtuple-row",
        "label": "namedtuple_row",
        "description": "Crea tuplas nombradas que permiten acceso por posición y atributo."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/scalar-row",
        "label": "scalar_row",
        "description": "Devuelve únicamente la primera columna de cada fila, en lugar de la tupla completa."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/class-row",
        "label": "class_row",
        "description": "Crea instancias de una clase pasando las columnas como argumentos nombrados."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/args-row-y-kwargs-row",
        "label": "args_row y kwargs_row",
        "description": "`args_row` invoca una función con los campos posicionales; `kwargs_row` los pasa por nombre."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/row-factory-en-conexion-y-cursor",
        "label": "row_factory en conexión y cursor",
        "description": "La configuración de conexión es el valor predeterminado de sus cursores; puede sobrescribirse al crear uno."
      },
      {
        "id": "analisis-de-datos/psycopg/row-factories/custom-row-factories",
        "label": "Custom row factories",
        "description": "Una fábrica personalizada recibe el cursor y retorna una función que transforma los valores de una fila."
      }
    ]
  },
  {
    "key": "variantes-de-cursores-y-resultados-grandes",
    "label": "Variantes de cursores y resultados grandes",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/definicion",
        "label": "Definición",
        "description": "Psycopg ofrece cursores que varían en dónde vinculan parámetros y dónde conservan los resultados."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/cursor-ordinario",
        "label": "Cursor ordinario",
        "description": "El `Cursor` recibe el resultado del servidor y lo conserva del lado del cliente. Es adecuado para consultas pequeñas o medianas."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/clientcursor",
        "label": "ClientCursor",
        "description": "Vincula los parámetros en el cliente y envía el SQL compuesto al servidor. Puede ser útil para sentencias que no admiten parámetros del lado del servidor."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/servercursor",
        "label": "ServerCursor",
        "description": "Un cursor nombrado mantiene la consulta en el servidor y recupera filas por partes."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/itersize",
        "label": "itersize",
        "description": "En un ServerCursor, `itersize` fija cuántas filas se recuperan del servidor por lote al iterar."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/scroll-y-scrollable",
        "label": "scroll y scrollable",
        "description": "`scroll()` mueve el cursor; un ServerCursor puede declararse desplazable mediante `scrollable=True`."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/withhold",
        "label": "withhold",
        "description": "Un ServerCursor con `withhold=True` puede conservarse después de un commit."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/rawcursor-y-rawservercursor",
        "label": "RawCursor y RawServerCursor",
        "description": "Utilizan marcadores nativos `$1`, `$2` del protocolo PostgreSQL en lugar del formato `%s`."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/resultados-binarios",
        "label": "Resultados binarios",
        "description": "`binary=True` en el cursor o execute solicita resultados en formato binario. La conversión final depende de los loaders disponibles."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/stream",
        "label": "stream",
        "description": "`stream()` permite consumir resultados progresivamente sin almacenar todo el conjunto en un cursor normal."
      },
      {
        "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/cursor-factory-y-propiedades",
        "label": "cursor_factory y propiedades",
        "description": "La conexión puede configurar una clase de cursor por defecto mediante `cursor_factory`. El cursor expone `connection`, `format` y `pgresult`, además de su estado."
      }
    ]
  },
  {
    "key": "copy-e-importacion-masiva",
    "label": "COPY e importación masiva",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/definicion",
        "label": "Definición",
        "description": "`COPY` transfiere datos entre PostgreSQL y Python con menos sobrecarga que muchas instrucciones INSERT. `cursor.copy()` abre el flujo de transferencia."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/write-row",
        "label": "write_row",
        "description": "Adapta una secuencia de valores Python a una fila COPY. Se usa con COPY FROM STDIN sin opciones de formato CSV."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/write-y-csv",
        "label": "write y CSV",
        "description": "`write()` envía un bloque en el formato solicitado por COPY. Con CSV, el archivo debe contener datos compatibles con el orden y los tipos de columnas."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-to-y-read",
        "label": "COPY TO y read",
        "description": "`read()` recupera el siguiente bloque del flujo de salida; un bloque vacío indica el final."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/read-row-rows-y-set-types",
        "label": "read_row, rows y set_types",
        "description": "`read_row()` obtiene una fila y `rows()` itera por las restantes. COPY TO no informa los tipos de columnas; `set_types()` permite convertirlos."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-binario",
        "label": "COPY binario",
        "description": "El formato binario requiere coincidencia exacta de tipos. `set_types()` es importante porque PostgreSQL no aplica los mismos casts que en INSERT."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-entre-conexiones",
        "label": "COPY entre conexiones",
        "description": "Un flujo COPY TO de una sesión puede alimentar COPY FROM en otra. Es útil para transferir datos entre bases."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/writer-y-filewriter",
        "label": "Writer y FileWriter",
        "description": "Los writers controlan el destino de bloques COPY FROM. `FileWriter` escribe la representación generada en un archivo binario, sin enviar esos bloques a PostgreSQL."
      },
      {
        "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/errores-en-copy",
        "label": "Errores en COPY",
        "description": "Un fallo durante COPY puede invalidar la transacción. El contexto de copy libera el flujo y la transacción debe revertirse o recuperarse."
      }
    ]
  },
  {
    "key": "connection-pools",
    "label": "Connection pools",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/connection-pools/definicion",
        "label": "Definición",
        "description": "Un pool conserva o administra un conjunto limitado de conexiones para reutilizarlas entre trabajos. Se instala como paquete adicional `psycopg_pool`."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/connectionpool-y-connection",
        "label": "ConnectionPool y connection",
        "description": "`ConnectionPool` administra conexiones síncronas; `pool.connection()` presta una conexión y la devuelve al salir del bloque."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/getconn-y-putconn",
        "label": "getconn y putconn",
        "description": "Permiten tomar y devolver conexiones manualmente. No aplican por sí mismos el contexto de confirmación de `connection()`."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/open-wait-y-close",
        "label": "open, wait y close",
        "description": "`open()` inicia el pool, `wait()` espera que alcance su tamaño mínimo y `close()` detiene la entrega de conexiones."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/min-size-max-size-y-resize",
        "label": "min_size, max_size y resize",
        "description": "Los límites determinan cuántas conexiones mantiene o puede crear el pool. resize ajusta el rango."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/timeout-y-max-waiting",
        "label": "timeout y max_waiting",
        "description": "`timeout` limita la espera por conexión; `max_waiting` limita solicitudes en cola. Un límite cero en max_waiting permite una cola sin límite explícito."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/max-lifetime-max-idle-y-reconexiones",
        "label": "max_lifetime, max_idle y reconexiones",
        "description": "El pool puede sustituir conexiones antiguas, reducir conexiones ociosas y reintentar creación de sesiones."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/configure-check-y-reset",
        "label": "configure, check y reset",
        "description": "Los callbacks configuran una sesión nueva, comprueban una conexión antes de prestar y restablecen su estado al devolverla."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/get-stats-y-pop-stats",
        "label": "get_stats y pop_stats",
        "description": "`get_stats()` obtiene métricas acumuladas y estado del pool; `pop_stats()` obtiene las métricas y reinicia los contadores acumulados."
      },
      {
        "id": "analisis-de-datos/psycopg/connection-pools/nullconnectionpool",
        "label": "NullConnectionPool",
        "description": "Controla la concurrencia sin mantener conexiones ociosas para reutilizarlas a largo plazo. Es útil cuando existe otro pool externo o se quiere limitar recursos."
      }
    ]
  },
  {
    "key": "programacion-asincrona",
    "label": "Programación asíncrona",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/definicion",
        "label": "Definición",
        "description": "La API async usa `AsyncConnection` y `AsyncCursor` para integrar operaciones PostgreSQL con un event loop, sin bloquearlo mientras espera E/S."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncconnection-y-asynccursor",
        "label": "AsyncConnection y AsyncCursor",
        "description": "Sus métodos de consulta, recuperación y transacciones tienen equivalentes asíncronos; el contexto de conexión es `async with await connect(...)`."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/async-for-y-stream",
        "label": "async for y stream",
        "description": "`async for` consume filas de un cursor o stream asíncrono sin bloquear el event loop durante E/S."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncservercursor-y-variantes",
        "label": "AsyncServerCursor y variantes",
        "description": "Un cursor async nombrado es un AsyncServerCursor; también existen AsyncClientCursor, AsyncRawCursor y AsyncRawServerCursor."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/transacciones-async",
        "label": "Transacciones async",
        "description": "`async with c.transaction()` delimita un bloque; `await c.commit()` y `await c.rollback()` controlan manualmente la transacción. Las propiedades de configuración se ajustan con métodos async."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/asynccopy",
        "label": "AsyncCopy",
        "description": "`async with cursor.copy()` permite COPY asíncrono; `write_row`, `write`, `read` y `read_row` se esperan con await."
      },
      {
        "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncconnectionpool",
        "label": "AsyncConnectionPool",
        "description": "El pool asíncrono presta AsyncConnection a tareas concurrentes. La apertura, espera y cierre usan las operaciones async correspondientes."
      }
    ]
  },
  {
    "key": "concurrencia-y-cancelacion",
    "label": "Concurrencia y cancelación",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/definicion",
        "label": "Definición",
        "description": "Concurrencia significa que varias tareas o hilos realizan trabajo solapado. Una conexión serializa las operaciones que se envían por ella; para paralelismo de consultas se usan varias conexiones."
      },
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/thread-safety",
        "label": "Thread safety",
        "description": "Las conexiones pueden compartirse entre hilos, pero los cursores no. Las operaciones de una misma conexión se serializan."
      },
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/process-safety",
        "label": "Process safety",
        "description": "Una conexión no se comparte de forma segura entre procesos creados por fork. Cada proceso debe abrir sus propias conexiones."
      },
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/asyncio-gather",
        "label": "asyncio.gather",
        "description": "`gather()` espera varias corutinas; para ejecutar consultas independientes, cada corutina puede obtener una conexión distinta."
      },
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/cancel-y-cancel-safe",
        "label": "cancel y cancel_safe",
        "description": "`cancel()` solicita interrumpir una operación; `cancel_safe()` ofrece una vía más robusta y con timeout en versiones compatibles. La cancelación puede llegar después de que finalice la consulta."
      },
      {
        "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/gevent",
        "label": "Gevent",
        "description": "Gevent permite concurrencia cooperativa mediante greenlets. Psycopg 3 puede cooperar con sockets parcheados desde versiones compatibles."
      }
    ]
  },
  {
    "key": "rendimiento-y-protocolo",
    "label": "Rendimiento y protocolo",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/definicion",
        "label": "Definición",
        "description": "Psycopg permite reducir transferencias, reutilizar consultas preparadas y agrupar mensajes. La mejor opción depende del tamaño de resultados, latencia y trabajo del servidor."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/prepared-statements",
        "label": "Prepared statements",
        "description": "Un prepared statement permite reutilizar la consulta preparada en la sesión. Psycopg puede prepararla automáticamente después de varias ejecuciones."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/prepare-threshold-y-prepared-max",
        "label": "prepare_threshold y prepared_max",
        "description": "`prepare_threshold` controla cuándo se prepara automáticamente; `prepared_max` limita las sentencias preparadas administradas. `None` desactiva la preparación automática."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/pipeline-mode",
        "label": "Pipeline mode",
        "description": "El modo pipeline permite enviar varias operaciones sin esperar cada respuesta individualmente, reduciendo viajes de red."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/sync-y-errores-de-pipeline",
        "label": "sync y errores de pipeline",
        "description": "`sync()` marca un punto de sincronización y procesa respuestas pendientes. Un fallo puede abortar las instrucciones posteriores del segmento hasta la sincronización."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/binding-y-protocolo-extended-simple",
        "label": "Binding y protocolo extended/simple",
        "description": "El binding del servidor transmite parámetros separados de la instrucción mediante protocolo extendido; ClientCursor compone SQL en el cliente."
      },
      {
        "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/pgbouncer-y-pooling-externo",
        "label": "PgBouncer y pooling externo",
        "description": "Un proxy como PgBouncer puede reutilizar sesiones de PostgreSQL entre conexiones cliente. Su modo de pooling determina qué estado de sesión puede conservarse."
      }
    ]
  },
  {
    "key": "seguridad-y-configuracion-de-sesion",
    "label": "Seguridad y configuración de sesión",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/definicion",
        "label": "Definición",
        "description": "Las conexiones admiten opciones de autenticación, cifrado, tiempos de espera y configuración de PostgreSQL. Los permisos efectivos son los del usuario de la base."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/ssl-y-tls",
        "label": "SSL y TLS",
        "description": "libpq permite elegir una política TLS mediante `sslmode` y rutas de certificados. `verify-full` verifica la confianza y el nombre del servidor."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/connect-timeout",
        "label": "connect_timeout",
        "description": "Limita la espera al establecer conexión, por host según libpq. No limita la duración de SELECT."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/statement-timeout",
        "label": "statement_timeout",
        "description": "Es una opción PostgreSQL que limita el tiempo de una instrucción. Puede configurarse por sesión o transacción."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/lock-timeout",
        "label": "lock_timeout",
        "description": "Limita cuánto espera una instrucción por un bloqueo. Es distinto del tiempo total de ejecución."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/parametros-de-sesion-y-encoding",
        "label": "Parámetros de sesión y encoding",
        "description": "La conexión permite leer parámetros enviados por libpq; los ajustes de servidor se pueden consultar o cambiar con SQL cuando está permitido."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/permisos-y-minimo-privilegio",
        "label": "Permisos y mínimo privilegio",
        "description": "Las consultas se ejecutan con los permisos del rol de conexión. Un usuario de reportes normalmente no necesita privilegios para modificar tablas."
      },
      {
        "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/logging",
        "label": "Logging",
        "description": "Psycopg utiliza logging de Python para eventos del controlador; el logger `psycopg.pool` permite observar eventos del pool."
      }
    ]
  },
  {
    "key": "avisos-y-notificaciones",
    "label": "Avisos y notificaciones",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/definicion",
        "label": "Definición",
        "description": "PostgreSQL puede enviar avisos (mensajes diagnósticos) y notificaciones entre sesiones. Psycopg ofrece handlers y generadores para recibirlos."
      },
      {
        "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/add-notice-handler-y-remove-notice-handler",
        "label": "add_notice_handler y remove_notice_handler",
        "description": "El callback recibe un objeto Diagnostic durante el aviso. Debe copiar los datos necesarios dentro de la llamada."
      },
      {
        "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/listen-notify-y-notifies",
        "label": "LISTEN, NOTIFY y notifies",
        "description": "LISTEN suscribe una sesión a un canal; NOTIFY publica una notificación al confirmar. `notifies()` permite consumir los objetos Notify recibidos."
      },
      {
        "id": "analisis-de-datos/psycopg/avisos-y-notificaciones/add-notify-handler-y-remove-notify-handler",
        "label": "add_notify_handler y remove_notify_handler",
        "description": "Un handler recibe las notificaciones cuando la conexión procesa mensajes del servidor durante sus operaciones. No funciona como listener en segundo plano por sí solo."
      }
    ]
  },
  {
    "key": "adaptacion-personalizada",
    "label": "Adaptación personalizada",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/definicion",
        "label": "Definición",
        "description": "La adaptación se configura mediante registros de dumpers (Python a PostgreSQL) y loaders (PostgreSQL a Python). Se pueden ajustar por cursor, conexión o globalmente."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/adaptersmap-y-alcance",
        "label": "AdaptersMap y alcance",
        "description": "`AdaptersMap` contiene asociaciones entre tipos Python, formatos y tipos PostgreSQL. Los contextos nuevos heredan configuración de su origen."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/dumper-y-register-dumper",
        "label": "Dumper y register_dumper",
        "description": "Un Dumper define cómo enviar un objeto Python en un formato PostgreSQL. Se registra para una clase Python y, si hace falta, un OID."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/loader-y-register-loader",
        "label": "Loader y register_loader",
        "description": "Un Loader transforma el valor recibido para un tipo PostgreSQL y formato determinado."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/typeinfo-y-oid",
        "label": "TypeInfo y OID",
        "description": "`TypeInfo` describe un tipo PostgreSQL, incluido su OID (identificador interno) y el OID de su arreglo."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/typesregistry",
        "label": "TypesRegistry",
        "description": "El registro de tipos permite localizar metadatos por nombre u OID. Los tipos personalizados pueden registrarse para que los adaptadores conozcan sus identificadores."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/transformer-y-pyformat",
        "label": "Transformer y PyFormat",
        "description": "Transformer coordina la adaptación de los valores de una consulta; PyFormat distingue selección automática, texto y binario."
      },
      {
        "id": "analisis-de-datos/psycopg/adaptacion-personalizada/registro-de-tipos-personalizados",
        "label": "Registro de tipos personalizados",
        "description": "Los tipos personalizados pueden necesitar recuperar información del servidor y asociar sus adaptadores al contexto que los utiliza."
      }
    ]
  },
  {
    "key": "tipado-estatico",
    "label": "Tipado estático",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/tipado-estatico/definicion",
        "label": "Definición",
        "description": "Psycopg ofrece anotaciones y genéricos para que herramientas como mypy o Pyright puedan comprobar los tipos de conexiones, cursores y filas."
      },
      {
        "id": "analisis-de-datos/psycopg/tipado-estatico/fetchone-y-optional",
        "label": "fetchone y Optional",
        "description": "`fetchone()` puede devolver una fila o None. El tipado obliga a considerar que no haya resultados."
      },
      {
        "id": "analisis-de-datos/psycopg/tipado-estatico/tipado-de-row-factories",
        "label": "Tipado de row factories",
        "description": "Las factories de fila pueden determinar el tipo genérico del cursor y el resultado inferido por el analizador."
      },
      {
        "id": "analisis-de-datos/psycopg/tipado-estatico/genericos-de-pools-y-protocolos",
        "label": "Genéricos de pools y protocolos",
        "description": "Las clases genéricas de conexión y pool permiten conservar información de tipos. `psycopg.abc` contiene protocolos e interfaces para extensiones y composición."
      }
    ]
  },
  {
    "key": "libpq-y-api-de-bajo-nivel",
    "label": "libpq y API de bajo nivel",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/definicion",
        "label": "Definición",
        "description": "`psycopg.pq` expone una interfaz cercana a libpq, la biblioteca cliente de PostgreSQL. Permite inspeccionar detalles del protocolo sin depender únicamente de la capa DB-API."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgconn-y-connstatus",
        "label": "PGconn y ConnStatus",
        "description": "`conn.pgconn` es el objeto PGconn subyacente; ConnStatus describe el estado de la conexión."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgresult-y-execstatus",
        "label": "PGresult y ExecStatus",
        "description": "PGresult representa una respuesta PostgreSQL. ExecStatus identifica el tipo de respuesta, y sus metadatos incluyen número de filas y columnas."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/transactionstatus",
        "label": "TransactionStatus",
        "description": "Describe si la sesión está inactiva, ejecutando, dentro de una transacción, en error o en estado desconocido."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/format-y-pipelinestatus",
        "label": "Format y PipelineStatus",
        "description": "Format representa formato texto/binario; PipelineStatus refleja el estado del modo pipeline."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgcancel-y-pollingstatus",
        "label": "PGcancel y PollingStatus",
        "description": "PGcancel representa un mecanismo de cancelación de libpq; PollingStatus permite interpretar el avance de operaciones no bloqueantes, como una conexión en establecimiento."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/fileno-y-wait",
        "label": "fileno y wait",
        "description": "`fileno()` devuelve el descriptor de conexión; `wait()` consume un generador de operaciones de E/S interno o de extensión hasta finalizarlo."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/escaping",
        "label": "Escaping",
        "description": "La clase Escaping de libpq aplica reglas de escape a fragmentos y valores. Las capas `sql.Identifier()` y parámetros son preferibles para construir consultas."
      },
      {
        "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/capabilities",
        "label": "capabilities",
        "description": "El objeto `psycopg.capabilities` permite detectar características que dependen de la versión o implementación de libpq."
      }
    ]
  },
  {
    "key": "migracion-y-compatibilidad-especializada",
    "label": "Migración y compatibilidad especializada",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/definicion",
        "label": "Definición",
        "description": "Psycopg 3 y Psycopg 2 comparten la idea de conexión y cursor, pero tienen diferencias relevantes de ciclo de vida, adaptación y protocolo."
      },
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/contextos-y-binding-al-migrar",
        "label": "Contextos y binding al migrar",
        "description": "En Psycopg 3, el contexto de conexión cierra la sesión al salir, y los parámetros suelen vincularse en servidor. En Psycopg 2, el contexto de conexión no cerraba la sesión de esa forma."
      },
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/callproc-y-procedimientos",
        "label": "callproc y procedimientos",
        "description": "Psycopg 3 no ofrece el método callproc de Psycopg 2. Se usa SQL: SELECT para funciones y CALL para procedimientos."
      },
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/fechas-infinitas-y-cambios-de-adaptacion",
        "label": "Fechas infinitas y cambios de adaptación",
        "description": "PostgreSQL admite fechas fuera del rango de datetime y valores infinity. La conversión predeterminada de Psycopg 3 no los representa automáticamente como fechas Python finitas."
      },
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/cockroachdb-y-crdb",
        "label": "CockroachDB y crdb",
        "description": "`psycopg.crdb` ofrece clases de conexión y ajustes específicos para CockroachDB, que implementa parte del protocolo PostgreSQL."
      },
      {
        "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/resolucion-dns-y-varios-hosts",
        "label": "Resolución DNS y varios hosts",
        "description": "libpq admite varias direcciones y hosts en conninfo. Psycopg también ofrece utilidades de resolución DNS para integraciones especializadas."
      }
    ]
  },
  {
    "key": "integracion-con-analisis-de-datos",
    "label": "Integración con análisis de datos",
    "children": [
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/definicion",
        "label": "Definición",
        "description": "Psycopg puede recuperar datos para pandas, NumPy, exportaciones y procesos ETL. La conexión y las transacciones se siguen gestionando en el controlador o en SQLAlchemy."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/pandas-con-row-factory",
        "label": "pandas con row_factory",
        "description": "Las filas tipo diccionario pueden convertirse a DataFrame sin obtener los nombres de columnas por separado."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/sqlalchemy-y-pandas-read-sql",
        "label": "SQLAlchemy y pandas.read_sql",
        "description": "SQLAlchemy proporciona el dialecto `postgresql+psycopg`; pandas puede usar su engine o conexión para consultar SQL."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/csv-y-exportacion-de-resultados",
        "label": "CSV y exportación de resultados",
        "description": "Se pueden exportar filas a CSV con csv.writer o COPY. Para resultados pequeños, recuperar columnas y registros desde el cursor es suficiente."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/excel-y-json",
        "label": "Excel y JSON",
        "description": "Pandas puede exportar resultados a Excel o JSON; la biblioteca estándar json también permite serializar objetos compatibles."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/numpy-y-procesamiento-numerico",
        "label": "NumPy y procesamiento numérico",
        "description": "Las filas numéricas pueden transformarse en arrays de NumPy cuando el tipo y la precisión elegidos lo permitan."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/etl-y-validacion",
        "label": "ETL y validación",
        "description": "Un flujo ETL extrae, transforma y carga datos. Antes de escribir, conviene validar campos, claves, tipos y duplicados."
      },
      {
        "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/automatizacion-de-reportes",
        "label": "Automatización de reportes",
        "description": "Un reporte repetible parametriza sus filtros, consulta datos, valida el resultado y exporta el resumen."
      }
    ]
  }
];
