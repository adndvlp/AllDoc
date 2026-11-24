// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const mysqlConnectorPythonCurriculum = [
  {
    "key": "instalacion-y-db-api",
    "label": "Instalación y DB-API",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/definicion",
        "label": "Definición",
        "description": "El controlador comunica Python con MySQL mediante la API de bases de datos DB-API 2.0. SQL se ejecuta en el servidor, no en Python."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/instalacion",
        "label": "Instalación",
        "description": "Instala el controlador en el mismo entorno que ejecutará el script."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/db-api-2-0",
        "label": "DB-API 2.0",
        "description": "Las constantes describen la interfaz y sus límites."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/python-puro-y-extension-c",
        "label": "Python puro y extensión C",
        "description": "use_pure elige la implementación Python o C cuando está disponible."
      }
    ]
  },
  {
    "key": "conexion",
    "label": "Conexión",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/definicion",
        "label": "Definición",
        "description": "connect() abre una sesión autenticada con el servidor y devuelve una conexión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/argumentos-de-conexion",
        "label": "Argumentos de conexión",
        "description": "host y port localizan el servidor; user y password autentican; database selecciona el esquema."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/diccionario-y-kwargs",
        "label": "Diccionario y kwargs",
        "description": "** desempaqueta un diccionario en argumentos nombrados."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/variables-de-entorno",
        "label": "Variables de entorno",
        "description": "Lee credenciales de fuera del código para no incrustarlas en repositorios."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/database-y-connection-id",
        "label": "database y connection_id",
        "description": "database identifica el esquema activo y connection_id identifica la sesión en el servidor."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/cerrar-y-liberar",
        "label": "Cerrar y liberar",
        "description": "close() o disconnect() terminan una conexión normal. Cierra el cursor antes."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/conexion/context-managers",
        "label": "Context managers",
        "description": "with ejecuta el cierre al salir del bloque, incluso ante excepciones."
      }
    ]
  },
  {
    "key": "cursores",
    "label": "Cursores",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/definicion",
        "label": "Definición",
        "description": "cursor() crea un objeto para enviar SQL y leer el resultado de una sesión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/cursor-normal",
        "label": "Cursor normal",
        "description": "Un cursor normal devuelve filas como tuplas con el orden de columnas del SELECT."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/dictionary-true",
        "label": "dictionary=True",
        "description": "Devuelve diccionarios cuyas claves son los nombres o alias de columnas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/buffered-true",
        "label": "buffered=True",
        "description": "Recibe el conjunto de resultados completo al ejecutar la consulta."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/cursor-sin-bufer",
        "label": "Cursor sin búfer",
        "description": "Lee las filas a medida que se solicitan; es el comportamiento por defecto."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/raw-true",
        "label": "raw=True",
        "description": "Evita la conversión normal de valores del servidor a tipos Python."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/cursores/prepared-true",
        "label": "prepared=True",
        "description": "Usa sentencias preparadas por el servidor mediante el protocolo binario."
      }
    ]
  },
  {
    "key": "execute-y-consultas-sql",
    "label": "execute y consultas SQL",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/definicion",
        "label": "Definición",
        "description": "execute() envía una instrucción SQL; las filas se recuperan después con fetch."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/filtros-y-orden",
        "label": "Filtros y orden",
        "description": "La instrucción SQL usa WHERE, ORDER BY y LIMIT igual que en el cliente MySQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/join-y-agregaciones",
        "label": "JOIN y agregaciones",
        "description": "Puedes combinar tablas y calcular métricas antes de transferir las filas a Python."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/cte-y-ventanas",
        "label": "CTE y ventanas",
        "description": "Las consultas analíticas se envían completas al servidor si su versión admite la sintaxis."
      }
    ]
  },
  {
    "key": "parametros-y-sql-dinamico",
    "label": "Parámetros y SQL dinámico",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/definicion",
        "label": "Definición",
        "description": "Los parámetros transmiten valores separados de la plantilla SQL; el controlador se ocupa de adaptarlos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-posicionales",
        "label": "Parámetros posicionales",
        "description": "%s marca un valor, sin importar si es número o texto."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-nombrados",
        "label": "Parámetros nombrados",
        "description": "%(nombre)s permite asociar valores mediante un diccionario en cursores normales."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/none-y-null",
        "label": "None y NULL",
        "description": "None se transmite como SQL NULL; para buscar nulos se usa IS NULL o comparación null-safe."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/in-dinamico",
        "label": "IN dinámico",
        "description": "Genera un marcador por valor; los valores siguen separados del SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/like-parametrizado",
        "label": "LIKE parametrizado",
        "description": "El patrón se envía como valor; % y _ conservan su semántica SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/identificadores-dinamicos",
        "label": "Identificadores dinámicos",
        "description": "Los parámetros representan datos, no nombres de tablas, columnas ni palabras SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/filtros-opcionales",
        "label": "Filtros opcionales",
        "description": "Construye condiciones a partir de reglas conocidas y acumula sus parámetros."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/sql-injection",
        "label": "SQL injection",
        "description": "Un texto de usuario puede alterar una consulta concatenada; parametrizar evita que se interprete como código."
      }
    ]
  },
  {
    "key": "lectura-de-resultados",
    "label": "Lectura de resultados",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/definicion",
        "label": "Definición",
        "description": "fetchone, fetchmany y fetchall recuperan las filas que quedan pendientes en el cursor."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchone",
        "label": "fetchone()",
        "description": "Devuelve la siguiente fila o None si no quedan filas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchmany",
        "label": "fetchmany()",
        "description": "Devuelve hasta size filas pendientes; una lista vacía indica fin."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchall",
        "label": "fetchall()",
        "description": "Recupera todas las filas restantes, no las ya consumidas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/iteracion",
        "label": "Iteración",
        "description": "El cursor puede recorrerse con for para procesar cada fila."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/resultados-pendientes",
        "label": "Resultados pendientes",
        "description": "Un cursor sin búfer puede impedir nuevas operaciones mientras quedan filas sin consumir."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/consumo-automatico",
        "label": "Consumo automático",
        "description": "consume_results=True permite que el controlador descarte resultados pendientes cuando lo necesita."
      }
    ]
  },
  {
    "key": "metadatos-del-cursor",
    "label": "Metadatos del cursor",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/definicion",
        "label": "Definición",
        "description": "El cursor expone información sobre la instrucción y el resultado sin consultar cada fila."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/description",
        "label": "description",
        "description": "Describe las columnas; el primer elemento de cada descriptor es su nombre y el segundo su código de tipo."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/rowcount",
        "label": "rowcount",
        "description": "Indica filas afectadas por DML o filas recuperadas por SELECT, según cursor y momento."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/lastrowid",
        "label": "lastrowid",
        "description": "Expone el identificador AUTO_INCREMENT generado por una inserción."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/with-rows-y-statement",
        "label": "with_rows y statement",
        "description": "with_rows indica si la operación puede devolver filas; statement muestra la instrucción ejecutada."
      }
    ]
  },
  {
    "key": "escritura-de-datos",
    "label": "Escritura de datos",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/definicion",
        "label": "Definición",
        "description": "INSERT, UPDATE y DELETE modifican filas. En InnoDB, con autocommit desactivado, requieren confirmar la transacción para persistir."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/insert",
        "label": "INSERT",
        "description": "Introduce una fila con valores parametrizados."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/update",
        "label": "UPDATE",
        "description": "Modifica las filas que cumplen WHERE."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/delete",
        "label": "DELETE",
        "description": "Elimina filas que cumplen WHERE."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/executemany",
        "label": "executemany()",
        "description": "Ejecuta una operación para una secuencia de parámetros. Puede optimizar INSERT agrupando valores."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/upsert",
        "label": "UPSERT",
        "description": "ON DUPLICATE KEY UPDATE inserta o actualiza según una clave única."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/ddl",
        "label": "DDL",
        "description": "CREATE, ALTER y DROP cambian la estructura; muchas operaciones DDL realizan commits implícitos."
      }
    ]
  },
  {
    "key": "transacciones",
    "label": "Transacciones",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/definicion",
        "label": "Definición",
        "description": "Una transacción reúne operaciones que se confirman o revierten como unidad."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/commit",
        "label": "commit()",
        "description": "Confirma los cambios pendientes de la sesión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/rollback",
        "label": "rollback()",
        "description": "Revierte los cambios no confirmados de la transacción."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/autocommit",
        "label": "autocommit",
        "description": "Con autocommit=True cada instrucción independiente se confirma automáticamente, salvo una transacción explícita."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/start-transaction",
        "label": "start_transaction()",
        "description": "Inicia explícitamente una transacción, con opciones de aislamiento y acceso."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/aislamiento-y-solo-lectura",
        "label": "Aislamiento y solo lectura",
        "description": "El aislamiento regula la visibilidad de cambios concurrentes; readonly limita escrituras en tablas permanentes."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/savepoint",
        "label": "SAVEPOINT",
        "description": "Permite deshacer parte de una transacción conservando operaciones anteriores."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/transacciones/commit-implicito",
        "label": "Commit implícito",
        "description": "DDL ordinario como ALTER TABLE puede confirmar una transacción implícitamente."
      }
    ]
  },
  {
    "key": "tipos-de-datos-y-conversiones",
    "label": "Tipos de datos y conversiones",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/definicion",
        "label": "Definición",
        "description": "El controlador convierte tipos MySQL a objetos Python y adapta parámetros Python a SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/decimal-y-numeros",
        "label": "Decimal y números",
        "description": "DECIMAL conserva precisión decimal; FLOAT y DOUBLE normalmente se convierten a float."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/fechas-y-horas",
        "label": "Fechas y horas",
        "description": "DATE suele convertirse a date, DATETIME/TIMESTAMP a datetime y TIME a timedelta."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/null-y-none",
        "label": "NULL y None",
        "description": "SQL NULL se recibe como None y viceversa."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/blob-y-bytes",
        "label": "BLOB y bytes",
        "description": "Los tipos binarios se recuperan como datos binarios, no necesariamente texto."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/json",
        "label": "JSON",
        "description": "Serializa estructuras Python antes de enviarlas y deserializa texto JSON al recibirlo."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/mysqlconverter",
        "label": "MySQLConverter",
        "description": "converter_class permite personalizar la adaptación de valores mediante una subclase del conversor."
      }
    ]
  },
  {
    "key": "errores-y-excepciones",
    "label": "Errores y excepciones",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/definicion",
        "label": "Definición",
        "description": "mysql.connector.Error es la base de las excepciones del controlador. Captura los errores que sepas gestionar."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/integrityerror",
        "label": "IntegrityError",
        "description": "Se produce ante ciertas violaciones de integridad, como una clave duplicada."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/programmingerror",
        "label": "ProgrammingError",
        "description": "Agrupa errores de programación SQL, como sintaxis inválida o referencias inexistentes."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/familias-de-excepciones",
        "label": "Familias de excepciones",
        "description": "DatabaseError agrupa varias excepciones de base de datos; OperationalError, InterfaceError, DataError, InternalError, NotSupportedError y PoolError representan categorías distintas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/errno-msg-y-sqlstate",
        "label": "errno, msg y sqlstate",
        "description": "Una excepción puede incluir código numérico, mensaje y estado SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/try-except-else-y-finally",
        "label": "try, except, else y finally",
        "description": "except maneja el fallo; else se ejecuta si no hubo excepción; finally libera recursos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/advertencias",
        "label": "Advertencias",
        "description": "Las advertencias de MySQL pueden recuperarse configurando get_warnings; raise_on_warnings permite tratarlas como excepciones."
      }
    ]
  },
  {
    "key": "estado-y-recuperacion-de-conexion",
    "label": "Estado y recuperación de conexión",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/definicion",
        "label": "Definición",
        "description": "Una sesión puede cerrarse por red, servidor o timeout. Comprueba el estado antes de reutilizarla si es necesario."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/is-connected-y-connected",
        "label": "is_connected() y connected",
        "description": "connected comprueba el estado; is_connected() es la forma histórica."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/ping",
        "label": "ping()",
        "description": "Comprueba la comunicación y, opcionalmente, permite intentar reconectar."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reconnect",
        "label": "reconnect()",
        "description": "Intenta restablecer la sesión con los parámetros de conexión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/timeouts",
        "label": "Timeouts",
        "description": "connection_timeout limita la conexión inicial; read_timeout y write_timeout limitan esperas de lectura y escritura."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reintentos-y-backoff",
        "label": "Reintentos y backoff",
        "description": "Reintenta operaciones recuperables con pausas crecientes y límite de intentos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/failover",
        "label": "Failover",
        "description": "connect admite una lista de destinos alternativos para establecer la conexión."
      }
    ]
  },
  {
    "key": "sesion-y-configuracion",
    "label": "Sesión y configuración",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/definicion",
        "label": "Definición",
        "description": "Los parámetros de sesión afectan solo a la conexión que los establece."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/config",
        "label": "config()",
        "description": "config() configura argumentos de una conexión; úsalo antes de conectarla o reconectarla."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/sql-mode",
        "label": "sql_mode",
        "description": "Controla reglas de validación y sintaxis de MySQL para la sesión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/time-zone",
        "label": "time_zone",
        "description": "Configura la zona horaria de sesión para funciones y tipos temporales que dependen de ella."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/charset-collation-y-unicode",
        "label": "charset, collation y Unicode",
        "description": "charset controla la codificación; collation las comparaciones y el orden del texto."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/variables-de-sesion-e-init-command",
        "label": "Variables de sesión e init_command",
        "description": "init_command ejecuta SQL al conectar; las variables @nombre pertenecen a esa sesión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/reset-session",
        "label": "reset_session()",
        "description": "Restablece el estado de una sesión sin que la aplicación tenga que abrir otra conexión."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/archivos-de-opciones",
        "label": "Archivos de opciones",
        "description": "option_files y option_groups leen configuración desde archivos de opciones MySQL."
      }
    ]
  },
  {
    "key": "seguridad-y-transporte",
    "label": "Seguridad y transporte",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/definicion",
        "label": "Definición",
        "description": "La autenticación verifica la cuenta; TLS protege el tráfico y la validación del certificado verifica el servidor."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tls-y-certificados",
        "label": "TLS y certificados",
        "description": "ssl_ca, ssl_verify_cert y ssl_verify_identity validan la cadena y el nombre del servidor."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/auth-plugin-y-autenticacion",
        "label": "auth_plugin y autenticación",
        "description": "El servidor negocia un plugin compatible con la cuenta; auth_plugin permite especificarlo cuando es necesario."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/privilegios-minimos",
        "label": "Privilegios mínimos",
        "description": "La cuenta del proceso debe tener solo los permisos requeridos por su tarea."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/tcp-socket-y-compresion",
        "label": "TCP, socket y compresión",
        "description": "El transporte puede ser TCP o socket Unix; compress=True solicita compresión del protocolo."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/seguridad-y-transporte/atributos-y-flags",
        "label": "Atributos y flags",
        "description": "conn_attrs agrega metadatos de conexión; client_flags configura capacidades del protocolo."
      }
    ]
  },
  {
    "key": "multiples-instrucciones-y-resultados",
    "label": "Múltiples instrucciones y resultados",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/definicion",
        "label": "Definición",
        "description": "Desde Connector/Python 9.2 execute admite scripts SQL con varias instrucciones y el cursor permite recorrer sus resultados."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/nextset",
        "label": "nextset()",
        "description": "Avanza al siguiente conjunto de resultados; devuelve None cuando no queda otro."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/fetchsets-y-map-results",
        "label": "fetchsets() y map_results",
        "description": "fetchsets entrega pares de instrucción y filas; map_results=True vincula cada resultado a su instrucción."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/archivos-sql",
        "label": "Archivos SQL",
        "description": "Lee un archivo de confianza y ejecútalo como script, en lugar de separar manualmente por punto y coma."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/cambios-desde-9-2",
        "label": "Cambios desde 9.2",
        "description": "El argumento multi=True se eliminó en 9.2; nextset y fetchsets son la API moderna."
      }
    ]
  },
  {
    "key": "procedimientos-almacenados",
    "label": "Procedimientos almacenados",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/definicion",
        "label": "Definición",
        "description": "Un procedimiento se define en MySQL y se ejecuta con CALL o callproc."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/callproc-e-in-out-inout",
        "label": "callproc() e IN OUT INOUT",
        "description": "callproc devuelve los argumentos con los valores OUT e INOUT actualizados."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/call-y-conjuntos-de-resultados",
        "label": "CALL y conjuntos de resultados",
        "description": "CALL puede devolver conjuntos de filas y un resultado final sin filas."
      }
    ]
  },
  {
    "key": "connection-pooling",
    "label": "Connection pooling",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/connection-pooling/definicion",
        "label": "Definición",
        "description": "Un pool mantiene conexiones reutilizables y las presta a tareas que las necesitan."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/connection-pooling/pool-name-y-pool-size",
        "label": "pool_name y pool_size",
        "description": "connect puede crear o reutilizar un pool nombrado; su capacidad se fija al crearlo."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/connection-pooling/poolerror",
        "label": "PoolError",
        "description": "Si todas las conexiones están prestadas, get_connection puede lanzar PoolError."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/connection-pooling/pool-reset-session",
        "label": "pool_reset_session",
        "description": "Con True se restablece el estado de sesión al devolver conexiones al pool."
      }
    ]
  },
  {
    "key": "concurrencia-y-asyncio",
    "label": "Concurrencia y asyncio",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/definicion",
        "label": "Definición",
        "description": "Cada tarea concurrente debe usar su propia conexión o un préstamo exclusivo de un pool."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/mysql-connector-aio",
        "label": "mysql.connector.aio",
        "description": "La API asíncrona permite esperar operaciones de red sin bloquear el bucle de eventos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/tareas-asincronas-independientes",
        "label": "Tareas asíncronas independientes",
        "description": "asyncio.gather permite esperar varias operaciones concurrentes; cada una usa su propia sesión."
      }
    ]
  },
  {
    "key": "rendimiento-y-procesamiento-por-lotes",
    "label": "Rendimiento y procesamiento por lotes",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/definicion",
        "label": "Definición",
        "description": "El rendimiento depende del SQL, el volumen transferido y el número de viajes al servidor."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/streaming-y-fetchmany",
        "label": "Streaming y fetchmany",
        "description": "Un cursor sin búfer con fetchmany limita las filas retenidas por cada lote."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/inserciones-por-lotes",
        "label": "Inserciones por lotes",
        "description": "Divide cargas grandes en grupos de parámetros para reducir viajes sin crear sentencias gigantes."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/explain-e-indices",
        "label": "EXPLAIN e índices",
        "description": "EXPLAIN describe el plan del servidor; los índices pueden reducir lecturas según filtros y joins."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/medicion",
        "label": "Medición",
        "description": "perf_counter permite medir el tiempo de una operación en Python."
      }
    ]
  },
  {
    "key": "pandas-numpy-y-archivos",
    "label": "Pandas, NumPy y archivos",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/definicion",
        "label": "Definición",
        "description": "Los resultados de un cursor se pueden convertir a estructuras analíticas o exportar a archivos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/pandas-y-sqlalchemy",
        "label": "Pandas y SQLAlchemy",
        "description": "Para pd.read_sql con MySQL usa un engine SQLAlchemy; el soporte DB-API directo de pandas se limita a sqlite3."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/numpy",
        "label": "NumPy",
        "description": "NumPy puede procesar arreglos numéricos construidos a partir de filas SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-csv",
        "label": "Exportar CSV",
        "description": "csv.writer escribe encabezados y filas en un archivo de texto."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/excel",
        "label": "Excel",
        "description": "pandas u openpyxl pueden guardar resultados en un libro XLSX."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-json",
        "label": "Exportar JSON",
        "description": "json.dumps serializa filas en una representación intercambiable; Decimal y date requieren una política explícita."
      }
    ]
  },
  {
    "key": "etl-y-calidad-de-datos",
    "label": "ETL y calidad de datos",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/definicion",
        "label": "Definición",
        "description": "ETL extrae, transforma y carga datos. El conector interviene en la lectura y escritura de MySQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-csv",
        "label": "Importar CSV",
        "description": "Convierte los campos de texto a sus tipos de destino antes de una inserción parametrizada."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-excel-y-json",
        "label": "Importar Excel y JSON",
        "description": "Extrae filas de formatos externos y adapta los valores antes de pasarlos a executemany."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/datos-de-apis",
        "label": "Datos de APIs",
        "description": "Una API externa proporciona datos que debes validar y transformar antes de cargarlos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/full-load-e-incremental",
        "label": "Full load e incremental",
        "description": "Una carga completa procesa todo el origen; una incremental recupera solo registros nuevos o modificados."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/idempotencia",
        "label": "Idempotencia",
        "description": "Una carga idempotente puede repetirse sin cambiar el resultado final ni duplicar filas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/staging-y-validacion",
        "label": "Staging y validación",
        "description": "Una tabla intermedia permite revisar datos antes de transferirlos a las tablas definitivas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/reconciliacion",
        "label": "Reconciliación",
        "description": "Compara conteos, sumas u otras métricas entre origen y destino para detectar pérdidas o duplicaciones."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/load-data-local-infile",
        "label": "LOAD DATA LOCAL INFILE",
        "description": "Carga un archivo local mediante el protocolo MySQL; requiere habilitación del cliente y del servidor."
      }
    ]
  },
  {
    "key": "organizacion-y-pruebas",
    "label": "Organización y pruebas",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/definicion",
        "label": "Definición",
        "description": "Separa configuración, acceso a datos y lógica de negocio para reutilizar funciones y facilitar pruebas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/inyeccion-de-dependencias",
        "label": "Inyección de dependencias",
        "description": "Recibe una conexión o una fábrica como argumento en lugar de acoplar la función a una configuración global."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/pruebas-de-integracion",
        "label": "Pruebas de integración",
        "description": "Verifican el comportamiento del conector y el SQL contra un MySQL de laboratorio."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/mocking-y-pruebas-unitarias",
        "label": "Mocking y pruebas unitarias",
        "description": "Un mock permite probar la lógica que consume una conexión sin contactar MySQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/logging-y-automatizacion",
        "label": "Logging y automatización",
        "description": "Registra estados, métricas y errores sin exponer credenciales ni datos sensibles."
      }
    ]
  },
  {
    "key": "api-especializada-e-interoperabilidad",
    "label": "API especializada e interoperabilidad",
    "children": [
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/definicion",
        "label": "Definición",
        "description": "La API pública incluye constantes, conversores, metadatos y comandos de nivel inferior para necesidades específicas."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/constantes",
        "label": "Constantes",
        "description": "FieldType, ClientFlag, SQLMode y CharacterSet permiten identificar tipos y opciones sin números mágicos."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/metadatos-del-servidor",
        "label": "Metadatos del servidor",
        "description": "INFORMATION_SCHEMA y SHOW permiten descubrir estructuras y configuraciones mediante SQL."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/query-attributes",
        "label": "Query attributes",
        "description": "Los atributos de consulta transmiten metadatos asociados a una instrucción en servidores compatibles."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/comandos-de-bajo-nivel",
        "label": "Comandos de bajo nivel",
        "description": "cmd_query y otros cmd_* trabajan más cerca del protocolo que la API de cursores."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/extension-c-y-modulos-internos",
        "label": "Extensión C y módulos internos",
        "description": "connection_cext y _mysql_connector implementan la variante C; abstracts, authentication y plugins contienen infraestructura del controlador."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/opentelemetry",
        "label": "OpenTelemetry",
        "description": "La instrumentación permite registrar trazas de operaciones de base de datos con OpenTelemetry."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/django",
        "label": "Django",
        "description": "El conector incluye un backend para Django, distinto del uso directo de cursores en scripts."
      },
      {
        "id": "analisis-de-datos/mysql-connector-python/api-especializada-e-interoperabilidad/api-clasica-y-x-devapi",
        "label": "API clásica y X DevAPI",
        "description": "mysql.connector usa el protocolo clásico; X DevAPI es una interfaz diferente distribuida en mysqlx-connector-python desde 8.3."
      }
    ]
  }
];
