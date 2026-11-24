// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const sqlalchemyCurriculum = [
  {
    "key": "sqlalchemy-arquitectura",
    "label": "SQLAlchemy y su arquitectura",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/definicion",
        "label": "Definición",
        "description": "SQLAlchemy conecta Python con bases relacionales mediante un motor y un dialecto. Core construye o ejecuta SQL; ORM representa filas como objetos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/instalacion",
        "label": "Instalación",
        "description": "Instala SQLAlchemy 2.0 y las dependencias adicionales solo cuando las necesites."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/core-frente-a-orm",
        "label": "Core frente a ORM",
        "description": "Core usa Table y expresiones; ORM usa clases mapeadas y Session. Ambos comparten el motor de expresiones SQL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/dbapi-dialecto-y-driver",
        "label": "DBAPI, dialecto y driver",
        "description": "DBAPI es la interfaz del controlador Python; el dialecto adapta SQL y tipos al motor."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/api-2-0-y-codigo-legado",
        "label": "API 2.0 y código legado",
        "description": "La API 2.0 ejecuta mediante Connection o Session y usa select() moderno. Query sigue existiendo como API heredada del ORM."
      }
    ]
  },
  {
    "key": "engine",
    "label": "Engine y configuración",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/engine/definicion",
        "label": "Definición",
        "description": "Engine es la entrada reutilizable a una base: administra dialecto y pool de conexiones. create_engine() normalmente no conecta hasta el primer uso."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/url-de-conexion",
        "label": "URL de conexión",
        "description": "La URL indica dialecto, driver y destino. SQLite puede usar un archivo o memoria."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/url-create",
        "label": "URL.create()",
        "description": "Construye la URL con argumentos separados, sin escapar manualmente contraseñas con símbolos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/drivers-por-motor",
        "label": "Drivers por motor",
        "description": "El dialecto y el driver se seleccionan con el prefijo de la URL. SQL Server puede requerir un controlador ODBC instalado en el sistema."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/credenciales-y-variables-de-entorno",
        "label": "Credenciales y variables de entorno",
        "description": "Lee secretos fuera del código y pásalos a URL.create()."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/connect-args-creator-y-tls",
        "label": "connect_args, creator y TLS",
        "description": "connect_args pasa argumentos al driver; creator puede suministrar una conexión DBAPI personalizada. TLS depende del driver."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/echo-logging-y-hide-parameters",
        "label": "echo, logging y hide_parameters",
        "description": "echo registra SQL emitido; hide_parameters oculta parámetros en ciertos logs y errores."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/engine/dispose",
        "label": "dispose()",
        "description": "Libera las conexiones inactivas del pool y lo reemplaza. No cancela automáticamente conexiones ya prestadas."
      }
    ]
  },
  {
    "key": "connection",
    "label": "Connection y SQL textual",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/connection/definicion",
        "label": "Definición",
        "description": "Connection es una conexión prestada por el Engine que permite ejecutar sentencias y controlar transacciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/connection/connect-y-close",
        "label": "connect() y close()",
        "description": "connect() obtiene una conexión; close() la devuelve al pool y revierte una transacción pendiente."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/connection/text-y-execute",
        "label": "text() y execute()",
        "description": "text() convierte una cadena SQL en una sentencia ejecutable de SQLAlchemy."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/connection/exec-driver-sql",
        "label": "exec_driver_sql()",
        "description": "Envía SQL directamente al driver, sin la compilación habitual de expresiones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/connection/raw-connection",
        "label": "raw_connection()",
        "description": "Expone una conexión DBAPI proxificada para APIs específicas del driver."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/connection/execution-options",
        "label": "execution_options()",
        "description": "Configura opciones de ejecución, como streaming o aislamiento, en el nivel que corresponda."
      }
    ]
  },
  {
    "key": "parametros",
    "label": "Parámetros y seguridad",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/definicion",
        "label": "Definición",
        "description": "Los parámetros separan el SQL de los valores y permiten que el driver los trate como datos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/bindparam",
        "label": "bindparam()",
        "description": "Crea un parámetro reutilizable en una expresión de Core o textual."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/bindparams-y-columns",
        "label": "bindparams() y columns()",
        "description": "bindparams() define parámetros de text(); columns() declara columnas y tipos del resultado textual."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/expanding-true",
        "label": "expanding=True",
        "description": "Expande un parámetro que contiene una lista para una condición IN."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/sql-injection-e-identificadores",
        "label": "SQL injection e identificadores",
        "description": "Los parámetros protegen valores, no nombres de tablas ni columnas. Elige identificadores desde una lista permitida."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/parametros/identificadores-dinamicos-permitidos",
        "label": "Identificadores dinámicos permitidos",
        "description": "Un mapa de columnas válidas permite construir consultas dinámicas sin interpolar SQL."
      }
    ]
  },
  {
    "key": "resultados",
    "label": "Result, Row y recuperación",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/definicion",
        "label": "Definición",
        "description": "execute() devuelve un Result que permite leer filas, columnas o valores escalares. Consume los datos mientras la conexión esté disponible."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/all-y-fetchall",
        "label": "all() y fetchall()",
        "description": "Recuperan las filas restantes como una secuencia. Una lectura completa consume el resultado."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/fetchone-y-fetchmany",
        "label": "fetchone() y fetchmany()",
        "description": "fetchone() obtiene la siguiente fila; fetchmany(n) lee hasta n filas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/first",
        "label": "first()",
        "description": "Devuelve la primera fila o None y cierra el resultado. No añade LIMIT al SQL automáticamente."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/one-y-one-or-none",
        "label": "one() y one_or_none()",
        "description": "one() exige exactamente una fila; one_or_none() permite cero o una. Más de una provoca MultipleResultsFound."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/scalar-y-scalars",
        "label": "scalar() y scalars()",
        "description": "scalar() toma la primera columna de la primera fila; scalars() produce un flujo de valores de una columna."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/scalar-one-y-scalar-one-or-none",
        "label": "scalar_one() y scalar_one_or_none()",
        "description": "Exigen un único valor o permiten que no exista ninguna fila, respectivamente."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/row-mappings-y-mapping",
        "label": "Row, mappings() y _mapping",
        "description": "Row tiene acceso posicional y por atributo; mappings() entrega RowMapping con acceso por clave."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/keys-columns-y-unique",
        "label": "keys(), columns() y unique()",
        "description": "keys() enumera nombres; columns() restringe columnas del resultado; unique() filtra duplicados en Python."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/partitions-iteracion-y-close",
        "label": "partitions(), iteración y close()",
        "description": "partitions(n) divide el resultado en lotes; close() libera el cursor."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/resultados/rowcount-y-claves-insertadas",
        "label": "rowcount y claves insertadas",
        "description": "rowcount suele indicar filas coincidentes para UPDATE/DELETE, si el driver lo soporta. inserted_primary_key informa la clave de un INSERT individual sin RETURNING."
      }
    ]
  },
  {
    "key": "transacciones",
    "label": "Transacciones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/definicion",
        "label": "Definición",
        "description": "Una transacción agrupa operaciones que se confirman juntas o se revierten. SQLAlchemy 2.0 inicia una transacción al ejecutar la primera sentencia."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/autobegin-y-begin",
        "label": "Autobegin y begin()",
        "description": "La primera ejecución activa autobegin. begin() permite delimitar explícitamente una transacción antes de ejecutar."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/commit-y-rollback",
        "label": "commit() y rollback()",
        "description": "Con connect() puedes confirmar o revertir explícitamente los cambios."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/engine-begin-y-excepciones",
        "label": "engine.begin() y excepciones",
        "description": "El contexto confirma si termina normalmente y revierte si se propaga una excepción."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/begin-nested-y-savepoints",
        "label": "begin_nested() y savepoints",
        "description": "Un savepoint permite deshacer una parte de una transacción sin cancelar la exterior."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/transacciones/aislamiento-y-autocommit",
        "label": "Aislamiento y AUTOCOMMIT",
        "description": "El aislamiento controla la visibilidad de cambios concurrentes; AUTOCOMMIT es una opción DBAPI separada del autobegin lógico."
      }
    ]
  },
  {
    "key": "errores",
    "label": "Errores y recuperación",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/errores/definicion",
        "label": "Definición",
        "description": "SQLAlchemy agrupa excepciones propias y del driver en sqlalchemy.exc. Captura la clase que corresponda y revierte antes de continuar una transacción fallida."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/errores/dbapierror-y-diagnostico",
        "label": "DBAPIError y diagnóstico",
        "description": "DBAPIError conserva la excepción original del driver en orig; StatementError expone statement y params cuando corresponden."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/errores/integrityerror-dataerror-y-programmingerror",
        "label": "IntegrityError, DataError y ProgrammingError",
        "description": "IntegrityError indica restricciones; DataError suele indicar valores inválidos y ProgrammingError errores de programación SQL. La clasificación exacta depende del driver."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/errores/operationalerror-timeouterror-y-disconnectionerror",
        "label": "OperationalError, TimeoutError y DisconnectionError",
        "description": "OperationalError suele envolver fallos operativos del driver; TimeoutError puede venir del pool; DisconnectionError se usa en gestión de conexiones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/errores/noresultfound-y-multipleresultsfound",
        "label": "NoResultFound y MultipleResultsFound",
        "description": "one() y scalar_one() fallan si no hay exactamente un resultado."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/errores/statementerror-e-invalidrequesterror",
        "label": "StatementError e InvalidRequestError",
        "description": "StatementError informa errores durante preparación o ejecución de una sentencia; InvalidRequestError indica uso inválido de la API."
      }
    ]
  },
  {
    "key": "metadatos",
    "label": "MetaData, Table y Column",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/metadatos/definicion",
        "label": "Definición",
        "description": "MetaData agrupa definiciones de tablas; Table representa una tabla y Column una columna. Definirlas en Python no crea las tablas por sí solo."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/metadatos/table-y-column",
        "label": "Table y Column",
        "description": "Table recibe nombre, metadatos y columnas. Los tipos describen cómo representar datos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/metadatos/create-all-y-drop-all",
        "label": "create_all() y drop_all()",
        "description": "create_all() crea tablas ausentes en orden de dependencias; drop_all() elimina las tablas del metadata."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/metadatos/schema-y-naming-convention",
        "label": "schema y naming_convention",
        "description": "schema indica el espacio de nombres de la tabla; naming_convention genera nombres estables para restricciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/metadatos/ddl-explicito-y-alter-table",
        "label": "DDL explícito y ALTER TABLE",
        "description": "CreateTable y DropTable representan DDL. Para cambios de esquema usa SQL del dialecto o Alembic."
      }
    ]
  },
  {
    "key": "tipos",
    "label": "Tipos de datos y conversiones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/definicion",
        "label": "Definición",
        "description": "Los tipos de SQLAlchemy describen columnas y convierten valores entre Python y la base. Algunos son portables; otros son específicos de un dialecto."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/integer-biginteger-float-y-numeric",
        "label": "Integer, BigInteger, Float y Numeric",
        "description": "Integer y sus variantes son enteros; Float aproxima; Numeric permite precisión y escala decimal."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/string-text-char-y-unicode",
        "label": "String, Text, CHAR y Unicode",
        "description": "String puede limitar longitud; Text permite texto largo; CHAR expresa longitud fija; Unicode y UnicodeText documentan texto Unicode."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/date-datetime-time-y-interval",
        "label": "Date, DateTime, Time y Interval",
        "description": "Los tipos temporales representan fechas, instantes, horas y duraciones. DateTime(timezone=True) solicita soporte de zona horaria."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/boolean-enum-largebinary-y-uuid",
        "label": "Boolean, Enum, LargeBinary y Uuid",
        "description": "Boolean expresa verdadero/falso; Enum restringe opciones según configuración; LargeBinary representa bytes; Uuid permite UUID portables."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/json-y-array",
        "label": "JSON y ARRAY",
        "description": "JSON representa datos estructurados; ARRAY tiene soporte principalmente en PostgreSQL dentro de los dialectos incluidos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/cast-y-type-coerce",
        "label": "cast() y type_coerce()",
        "description": "cast() emite CAST en SQL; type_coerce() cambia la interpretación de tipo sin emitir CAST."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/tipos/with-variant-y-tipos-por-dialecto",
        "label": "with_variant() y tipos por dialecto",
        "description": "with_variant() selecciona una variante de tipo para un dialecto determinado."
      }
    ]
  },
  {
    "key": "restricciones",
    "label": "Restricciones, defaults e índices",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/definicion",
        "label": "Definición",
        "description": "Las restricciones protegen integridad: claves, unicidad, nulos y condiciones. Los índices ayudan a localizar filas y pueden imponer unicidad."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/primary-key-unique-y-not-null",
        "label": "PRIMARY KEY, UNIQUE y NOT NULL",
        "description": "primary_key identifica filas; unique evita duplicados; nullable=False impide NULL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/foreignkey-claves-compuestas-y-cascade",
        "label": "ForeignKey, claves compuestas y CASCADE",
        "description": "ForeignKey enlaza una columna; ForeignKeyConstraint permite enlazar varias. ondelete y onupdate describen acciones de la base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/checkconstraint-y-uniqueconstraint",
        "label": "CheckConstraint y UniqueConstraint",
        "description": "CheckConstraint valida condiciones; UniqueConstraint declara unicidad de una o varias columnas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/default-server-default-y-onupdate",
        "label": "default, server_default y onupdate",
        "description": "default y onupdate se aplican al emitir DML desde SQLAlchemy; server_default forma parte del DDL. server_onupdate describe valores generados por el servidor."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/identity-sequence-y-autoincrement",
        "label": "Identity, Sequence y autoincrement",
        "description": "Configuran generación de claves según el dialecto. Una PK entera en SQLite suele generar el ID si se omite."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/computed",
        "label": "Computed()",
        "description": "Declara una columna generada por la base a partir de una expresión."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/restricciones/index-e-indices-compuestos",
        "label": "Index() e índices compuestos",
        "description": "Index declara un índice de una o varias columnas; unique=True impone unicidad."
      }
    ]
  },
  {
    "key": "reflection",
    "label": "Reflection e Inspector",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/definicion",
        "label": "Definición",
        "description": "Reflection reconstruye definiciones de tablas existentes desde la base. inspect() permite consultar metadatos sin definir modelos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/autoload-with",
        "label": "autoload_with",
        "description": "Carga una sola tabla usando su nombre y el Engine."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/metadata-reflect",
        "label": "metadata.reflect()",
        "description": "Refleja varias tablas de la base en un MetaData."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/get-columns-y-get-foreign-keys",
        "label": "get_columns() y get_foreign_keys()",
        "description": "Inspector devuelve descripciones de columnas y relaciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/vistas-e-indices",
        "label": "Vistas e índices",
        "description": "get_view_names(), get_view_definition() y get_indexes() permiten explorar objetos existentes."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/reflection/reflection-parcial-y-extend-existing",
        "label": "Reflection parcial y extend_existing",
        "description": "include_columns limita las columnas que se reflejan; extend_existing permite actualizar una definición ya registrada."
      }
    ]
  },
  {
    "key": "select",
    "label": "select() y expresiones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/select/definicion",
        "label": "Definición",
        "description": "select() construye una sentencia SELECT sin ejecutarla. Pasa columnas o tablas y después ejecuta mediante Connection."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/columnas-concretas-y-c",
        "label": "Columnas concretas y .c",
        "description": "La colección .c contiene las columnas de Table. Selecciona solo las que necesitas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/select-from",
        "label": "select_from()",
        "description": "Determina el origen FROM explícitamente. Es útil si solo seleccionas una expresión o si necesitas controlar el join."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/label-y-alias",
        "label": "label() y alias()",
        "description": "label() nombra una columna calculada; alias() da otro nombre a una tabla o subconsulta."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/literal-literal-column-y-column",
        "label": "literal(), literal_column() y column()",
        "description": "literal() representa un valor parametrizado; literal_column() representa SQL escrito literalmente; column() crea una referencia de columna sin tabla."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/true-false-y-null",
        "label": "true(), false() y null()",
        "description": "Estas funciones crean constantes SQL booleanas y NULL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/select/add-columns-y-with-only-columns",
        "label": "add_columns() y with_only_columns()",
        "description": "add_columns() añade expresiones; with_only_columns() sustituye la selección. Devuelven otra sentencia."
      }
    ]
  },
  {
    "key": "filtros",
    "label": "Filtros y operadores",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/definicion",
        "label": "Definición",
        "description": "where() filtra filas con expresiones SQL construidas mediante columnas y operadores Python sobrecargados."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/comparaciones-y-fechas",
        "label": "Comparaciones y fechas",
        "description": "==, !=, >, >=, < y <= construyen comparaciones. Para columnas Date usa objetos date."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/and-or-y-not",
        "label": "and_(), or_() y not_()",
        "description": "Combinan condiciones lógicas; varias llamadas where() se combinan con AND."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/operadores-y",
        "label": "Operadores &, | y ~",
        "description": "& representa AND, | representa OR y ~ negación. No uses and, or ni not de Python sobre expresiones SQL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/in-y-not-in",
        "label": "in_() y not_in()",
        "description": "in_() compara contra una lista o subconsulta; not_in() la niega."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/between",
        "label": "between()",
        "description": "between(a,b) incluye ambos extremos. Usa ~ para negar la condición."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/like-e-ilike",
        "label": "like() e ilike()",
        "description": "like() usa patrones % y _; ilike() pide comparación sin distinción de mayúsculas según el dialecto."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/contains-startswith-y-endswith",
        "label": "contains(), startswith() y endswith()",
        "description": "Construyen patrones LIKE para contenido, prefijo y sufijo. autoescape=True trata % y _ de la entrada como caracteres literales."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/filtros/tuple-any-y-all",
        "label": "tuple_(), any_() y all_()",
        "description": "tuple_() compara combinaciones de columnas; any_() y all_() construyen comparaciones cuantificadas según soporte del motor."
      }
    ]
  },
  {
    "key": "null-condiciones",
    "label": "NULL y condicionales",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/null-condiciones/definicion",
        "label": "Definición",
        "description": "NULL representa ausencia de valor. Usa is_(None), is_not(None), coalesce(), nullif() y case() para consultas que lo contemplen."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/null-condiciones/is-e-is-not",
        "label": "is_() e is_not()",
        "description": "is_(None) genera IS NULL; is_not(None) genera IS NOT NULL. == None y != None también se traducen, pero la forma explícita es clara."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/null-condiciones/func-coalesce",
        "label": "func.coalesce()",
        "description": "Devuelve el primer argumento no NULL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/null-condiciones/func-nullif",
        "label": "func.nullif()",
        "description": "Devuelve NULL si ambos valores son iguales; si no, devuelve el primero."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/null-condiciones/case",
        "label": "case()",
        "description": "Construye CASE WHEN con pares condición y resultado, más else_."
      }
    ]
  },
  {
    "key": "orden-paginacion",
    "label": "Ordenamiento, paginación y valores únicos",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orden-paginacion/definicion",
        "label": "Definición",
        "description": "order_by() ordena; limit() limita filas y offset() omite filas iniciales. distinct() elimina filas duplicadas del resultado."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orden-paginacion/asc-desc-y-varios-criterios",
        "label": "asc(), desc() y varios criterios",
        "description": "asc() ordena ascendente; desc() descendente. Las columnas siguientes desempatan."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orden-paginacion/nulls-first-y-nulls-last",
        "label": "nulls_first() y nulls_last()",
        "description": "Solicitan posición explícita de NULL en el orden."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orden-paginacion/limit-y-offset",
        "label": "limit() y offset()",
        "description": "limit() define máximo de filas; offset() salta filas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orden-paginacion/distinct",
        "label": "distinct()",
        "description": "Select.distinct() elimina duplicados de todas las columnas seleccionadas; distinct(columna) puede usarse dentro de agregados."
      }
    ]
  },
  {
    "key": "joins",
    "label": "JOINs y relaciones en Core",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/joins/definicion",
        "label": "Definición",
        "description": "join() combina tablas mediante una condición ON. Puede inferirla a partir de una FK inequívoca."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/join-con-condicion-explicita",
        "label": "join() con condición explícita",
        "description": "Pasa la tabla destino y la expresión que relaciona sus claves."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/outerjoin-y-filtros-on",
        "label": "outerjoin() y filtros ON",
        "description": "outerjoin() crea LEFT OUTER JOIN; añade restricciones del lado derecho en ON si quieres preservar filas sin coincidencia."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/right-join-y-full-outer-join",
        "label": "RIGHT JOIN y FULL OUTER JOIN",
        "description": "Core expresa RIGHT JOIN invirtiendo los lados de un LEFT JOIN. full=True solicita FULL OUTER JOIN."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/anti-join",
        "label": "Anti join",
        "description": "Busca filas de la izquierda sin coincidencia, mediante LEFT JOIN y una clave derecha IS NULL o NOT EXISTS."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/self-join-y-alias",
        "label": "Self join y alias()",
        "description": "Para cruzar una tabla consigo misma, usa alias distintos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/cross-join",
        "label": "CROSS JOIN",
        "description": "Un producto cartesiano combina todas las filas de dos orígenes. join(..., true()) expresa esa combinación explícitamente."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/joins/join-from-y-varias-tablas",
        "label": "join_from() y varias tablas",
        "description": "join_from() fija el origen de un JOIN; encadena joins para atravesar relaciones."
      }
    ]
  },
  {
    "key": "funciones-sql",
    "label": "Funciones SQL y operaciones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/definicion",
        "label": "Definición",
        "description": "func construye llamadas a funciones de la base. SQLAlchemy genera la expresión, pero el motor decide si admite la función."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/texto-upper-lower-trim-y-length",
        "label": "Texto: upper, lower, trim y length",
        "description": "Las funciones de texto limpian o normalizan valores en SQL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/texto-substr-replace-y-concatenacion",
        "label": "Texto: substr, replace y concatenación",
        "description": "substr() extrae texto en SQLite; replace() reemplaza ocurrencias. concat() o el operador + para columnas String construyen concatenación según dialecto."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/numericas-round-abs-ceil-floor-y-mod",
        "label": "Numéricas: round, abs, ceil, floor y mod",
        "description": "func expresa funciones numéricas disponibles en el motor; % construye resto."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/extract-y-funciones-de-fecha",
        "label": "extract() y funciones de fecha",
        "description": "extract() extrae partes de fechas de forma adaptada por el dialecto; func.current_date() solicita la fecha de la base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/funciones-sql/diferencias-de-fechas-y-dialectos",
        "label": "Diferencias de fechas y dialectos",
        "description": "SQLite usa julianday() para diferencias en días; MySQL usa DATEDIFF; PostgreSQL permite restar fechas."
      }
    ]
  },
  {
    "key": "agregaciones",
    "label": "Agregaciones y GROUP BY",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/definicion",
        "label": "Definición",
        "description": "Las funciones de agregación reducen varias filas a un valor. group_by() calcula ese valor por cada combinación de claves."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/count-y-count-distinct",
        "label": "count() y count(distinct())",
        "description": "count() cuenta filas; count(columna) cuenta valores no nulos; count(distinct(columna)) cuenta valores distintos no nulos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/sum-avg-min-y-max",
        "label": "sum(), avg(), min() y max()",
        "description": "Calculan suma, promedio y extremos de un grupo. Generalmente ignoran NULL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/group-by-con-varias-columnas",
        "label": "group_by() con varias columnas",
        "description": "Agrupa por la combinación de columnas seleccionadas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/having-y-where",
        "label": "having() y where()",
        "description": "where() filtra filas antes de agrupar; having() filtra grupos después del cálculo."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/agregacion-condicional-y-porcentajes",
        "label": "Agregación condicional y porcentajes",
        "description": "case() dentro de sum() permite contar condiciones; filter() agrega FILTER WHERE donde el motor lo admite."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/filter-en-agregados",
        "label": "filter() en agregados",
        "description": "func.count().filter(condición) limita solo las filas de esa agregación."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/concatenacion-agregada",
        "label": "Concatenación agregada",
        "description": "aggregate_strings() genera una función de concatenación según el dialecto, como group_concat o string_agg."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/agregaciones/rollup-cube-y-grouping-sets",
        "label": "rollup(), cube() y grouping_sets()",
        "description": "Generan subtotales y distintos niveles de agrupación en motores compatibles."
      }
    ]
  },
  {
    "key": "subconsultas",
    "label": "Subconsultas y EXISTS",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/definicion",
        "label": "Definición",
        "description": "Una subconsulta es una sentencia usada dentro de otra. subquery() crea un origen de filas y scalar_subquery() una expresión de un valor."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/subquery-y-c",
        "label": "subquery() y .c",
        "description": "Una subquery con nombre puede usarse como tabla derivada y expone columnas en .c."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/scalar-subquery-y-correlacion",
        "label": "scalar_subquery() y correlación",
        "description": "Una subconsulta escalar produce una columna y como máximo una fila; una correlacionada hace referencia a la fila exterior. correlate() y correlate_except() controlan qué orígenes se correlacionan."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/in-con-subconsultas",
        "label": "IN con subconsultas",
        "description": "in_() admite directamente una sentencia select que devuelve una columna."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/exists-y-not-exists",
        "label": "exists() y NOT EXISTS",
        "description": "exists() comprueba si una subconsulta devuelve alguna fila; ~exists la niega."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/subconsultas/lateral",
        "label": "lateral()",
        "description": "LATERAL permite que un origen del FROM haga referencia a otro origen situado antes."
      }
    ]
  },
  {
    "key": "cte",
    "label": "CTE",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/cte/definicion",
        "label": "Definición",
        "description": "cte() asigna un nombre a una consulta y la hace disponible mediante WITH dentro de una sentencia."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/cte/ctes-multiples",
        "label": "CTEs múltiples",
        "description": "Una sentencia puede referirse a varios CTE; uno puede usar otro."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/cte/cte-recursivo",
        "label": "CTE recursivo",
        "description": "recursive=True permite definir una parte inicial y otra que vuelve a consultar el CTE."
      }
    ]
  },
  {
    "key": "conjuntos",
    "label": "Operaciones de conjuntos",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/conjuntos/definicion",
        "label": "Definición",
        "description": "union(), union_all(), intersect() y except_() combinan consultas con el mismo número de columnas y tipos compatibles."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/conjuntos/union-y-union-all",
        "label": "union() y union_all()",
        "description": "union() elimina duplicados; union_all() conserva todas las filas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/conjuntos/intersect-y-except",
        "label": "intersect() y except_()",
        "description": "intersect() conserva filas presentes en ambas consultas; except_() conserva las de la primera que no están en la segunda."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/conjuntos/compoundselect-y-orden-final",
        "label": "CompoundSelect y orden final",
        "description": "Las operaciones de conjuntos generan un CompoundSelect; order_by se aplica al resultado combinado."
      }
    ]
  },
  {
    "key": "ventanas",
    "label": "Funciones de ventana",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/definicion",
        "label": "Definición",
        "description": "over() calcula sobre filas relacionadas sin reducirlas a una fila por grupo. partition_by separa grupos y order_by define su orden de cálculo."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/partition-by",
        "label": "partition_by",
        "description": "Reinicia el cálculo para cada valor o combinación de valores."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/row-number",
        "label": "row_number()",
        "description": "Numera filas consecutivamente dentro de cada partición. Añade un criterio único para resolver empates."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/rank-y-dense-rank",
        "label": "rank() y dense_rank()",
        "description": "rank() deja saltos tras empates; dense_rank() no. Ambos asignan el mismo rango a valores empatados."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/lag-y-lead",
        "label": "lag() y lead()",
        "description": "lag() lee un valor anterior; lead() uno posterior según el orden de ventana. Pueden recibir desplazamiento y valor por defecto."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/rows-range-y-groups",
        "label": "ROWS, RANGE y GROUPS",
        "description": "El marco determina qué filas participan en cada cálculo de ventana. rows=(None,0) va desde la primera fila hasta la actual; range_ y groups usan valores o grupos de pares."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/promedio-movil",
        "label": "Promedio móvil",
        "description": "Un marco ROWS limitado incluye un número de filas anteriores o posteriores."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/first-value-last-value-y-ntile",
        "label": "first_value(), last_value() y ntile()",
        "description": "first_value y last_value toman extremos del marco; ntile divide filas ordenadas en grupos de tamaño parecido."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/ventanas/filtrar-resultados-de-ventana",
        "label": "Filtrar resultados de ventana",
        "description": "Las ventanas se evalúan después de WHERE; para filtrar un rango calculado, usa un CTE o subconsulta exterior."
      }
    ]
  },
  {
    "key": "dml",
    "label": "INSERT, UPDATE y DELETE",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/dml/definicion",
        "label": "Definición",
        "description": "insert(), update() y delete() construyen cambios sobre tablas. Ejecuta en una transacción para decidir cuándo se guardan."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/insert-multiple-y-executemany",
        "label": "INSERT múltiple y executemany",
        "description": "Una lista de diccionarios en execute() permite ejecutar DML con varios conjuntos de parámetros."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/insert-from-select",
        "label": "insert().from_select()",
        "description": "INSERT FROM SELECT copia filas de una consulta directamente en la base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/update-where-values",
        "label": "update().where().values()",
        "description": "UPDATE cambia las filas que cumplen WHERE. values() determina qué columnas cambian."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/delete-where",
        "label": "delete().where()",
        "description": "DELETE elimina las filas seleccionadas. Las claves foráneas pueden impedir una eliminación."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/returning-y-return-defaults",
        "label": "returning() y return_defaults()",
        "description": "returning() solicita columnas de las filas modificadas; return_defaults() obtiene defaults generados según soporte."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/upsert-en-sqlite-y-postgresql",
        "label": "Upsert en SQLite y PostgreSQL",
        "description": "El insert específico del dialecto proporciona on_conflict_do_update() y on_conflict_do_nothing()."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/dml/upsert-en-mysql",
        "label": "Upsert en MySQL",
        "description": "El insert del dialecto MySQL ofrece on_duplicate_key_update() para actualizar ante conflicto con una clave única."
      }
    ]
  },
  {
    "key": "consultas-dinamicas",
    "label": "Consultas dinámicas y compilación",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/definicion",
        "label": "Definición",
        "description": "Las sentencias de Core son composables: métodos como where() devuelven una nueva sentencia. compile() permite inspeccionar su SQL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/compile-y-parametros",
        "label": "compile() y parámetros",
        "description": "compile() construye SQL para un dialecto y expone params."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/literal-binds-y-depuracion",
        "label": "literal_binds y depuración",
        "description": "literal_binds intenta incrustar algunos valores en el SQL compilado para inspección."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/lambda-stmt-y-cache-de-compilacion",
        "label": "lambda_stmt() y caché de compilación",
        "description": "lambda_stmt() ayuda a reutilizar construcciones SQL cuando el perfilado lo justifica. La caché de compilación no almacena resultados de consultas."
      }
    ]
  },
  {
    "key": "pandas",
    "label": "Pandas y SQLAlchemy",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/definicion",
        "label": "Definición",
        "description": "Pandas puede leer SQL y escribir DataFrames mediante un Engine o Connection. Es una integración de dos bibliotecas, no una API de SQLAlchemy."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/read-sql-read-sql-query-y-read-sql-table",
        "label": "read_sql(), read_sql_query() y read_sql_table()",
        "description": "read_sql() admite consulta o nombre de tabla; las otras dos expresan cada intención explícitamente."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/params-index-col-y-parse-dates",
        "label": "params, index_col y parse_dates",
        "description": "params transmite valores de filtro; index_col define el índice del DataFrame; parse_dates convierte columnas temporales."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/dtype-dtype-backend-y-coerce-float",
        "label": "dtype, dtype_backend y coerce_float",
        "description": "dtype convierte tipos del DataFrame; dtype_backend elige representación nullable o pyarrow; coerce_float puede convertir Decimal a float."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/chunksize-en-lectura",
        "label": "chunksize en lectura",
        "description": "chunksize devuelve un iterador de DataFrames de hasta ese número de filas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/to-sql-if-exists-e-index",
        "label": "to_sql(), if_exists e index",
        "description": "to_sql() escribe DataFrames; append agrega, fail rechaza tablas existentes y replace elimina y recrea la tabla."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/dtype-schema-index-label-y-escritura-por-bloques",
        "label": "dtype, schema, index_label y escritura por bloques",
        "description": "dtype asigna tipos SQL; schema elige esquema; index_label nombra el índice si se guarda; chunksize limita lotes. method=\"multi\" reúne filas en INSERT cuando el motor lo admite."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pandas/to-sql-en-una-transaccion",
        "label": "to_sql() en una transacción",
        "description": "Al pasar una Connection que ya está en una transacción, Pandas no la confirma por su cuenta."
      }
    ]
  },
  {
    "key": "orm-modelos",
    "label": "ORM: modelos y mapeo",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orm-modelos/definicion",
        "label": "Definición",
        "description": "ORM mapea clases Python a tablas y atributos a columnas. Puedes declarar tablas nuevas o mapear las ya definidas en Core."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-modelos/declarativebase-mapped-y-mapped-column",
        "label": "DeclarativeBase, Mapped y mapped_column()",
        "description": "DeclarativeBase crea la base de modelos; Mapped tipa atributos mapeados; mapped_column configura columnas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-modelos/tablename-table-y-table-args",
        "label": "__tablename__, __table__ y __table_args__",
        "description": "__tablename__ declara una tabla; __table__ reutiliza una Table existente; __table_args__ añade restricciones y opciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-modelos/registry-y-mapeo-imperativo",
        "label": "registry() y mapeo imperativo",
        "description": "registry administra mappers. map_imperatively() enlaza una clase común con una Table."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-modelos/mapped-as-dataclass",
        "label": "mapped_as_dataclass()",
        "description": "Integra modelos ORM con dataclasses, generando métodos como __init__ según configuración."
      }
    ]
  },
  {
    "key": "session",
    "label": "Session y consultas ORM",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/session/definicion",
        "label": "Definición",
        "description": "Session administra la transacción ORM y las entidades que carga o modifica. No es una conexión global ni debe compartirse entre tareas concurrentes."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/session/sessionmaker-y-context-manager",
        "label": "sessionmaker() y context manager",
        "description": "sessionmaker() crea una fábrica de sesiones configuradas. Su begin() abre sesión y transacción."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/session/execute-scalars-y-get",
        "label": "execute(), scalars() y get()",
        "description": "execute() devuelve Result; scalars() devuelve valores o entidades; get() busca por clave primaria."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/session/select-y-filtros-orm",
        "label": "select() y filtros ORM",
        "description": "Usa atributos de clases mapeadas como expresiones SQL."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/session/from-statement-y-sql-textual-orm",
        "label": "from_statement() y SQL textual ORM",
        "description": "from_statement() permite cargar entidades a partir de una sentencia completa compatible con el mapeo."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/session/identity-map-y-unit-of-work",
        "label": "identity map y unit of work",
        "description": "La identity map mantiene una instancia por identidad dentro de una sesión. Unit of work ordena y emite los cambios pendientes al hacer flush."
      }
    ]
  },
  {
    "key": "orm-persistencia",
    "label": "ORM: persistencia y estados",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/definicion",
        "label": "Definición",
        "description": "add(), delete() y cambios de atributos registran operaciones; flush() las envía a la transacción y commit() las confirma."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/add-y-add-all",
        "label": "add() y add_all()",
        "description": "add() registra una instancia; add_all() registra varias. El INSERT ocurre durante flush."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/delete-y-actualizacion-por-atributos",
        "label": "delete() y actualización por atributos",
        "description": "delete() marca una entidad para eliminación; modificar atributos marca cambios."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/flush-commit-y-rollback",
        "label": "flush(), commit() y rollback()",
        "description": "flush sincroniza cambios con la base dentro de la transacción; commit confirma; rollback revierte."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/transient-pending-persistent-deleted-y-detached",
        "label": "Transient, pending, persistent, deleted y detached",
        "description": "inspect(objeto) permite consultar estados del ORM: nuevo, pendiente, persistente, eliminado y separado."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/new-dirty-y-deleted",
        "label": "new, dirty y deleted",
        "description": "Las colecciones de Session muestran objetos nuevos, modificados y marcados para borrar."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/refresh-expire-y-expire-all",
        "label": "refresh(), expire() y expire_all()",
        "description": "refresh() recarga inmediatamente; expire() invalida atributos para recargarlos al acceder."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/merge-y-expunge",
        "label": "merge() y expunge()",
        "description": "merge() copia estado a una instancia administrada y devuelve esa instancia. expunge() separa un objeto de la sesión; expunge_all() separa todos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/autoflush-no-autoflush-y-expire-on-commit",
        "label": "autoflush, no_autoflush y expire_on_commit",
        "description": "autoflush envía cambios antes de ciertas consultas; no_autoflush lo suspende temporalmente. expire_on_commit controla expiración al confirmar."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-persistencia/dml-masivo-orm",
        "label": "DML masivo ORM",
        "description": "Session.execute() puede ejecutar INSERT, UPDATE y DELETE sobre modelos. Las estrategias de sincronización coordinan objetos cargados."
      }
    ]
  },
  {
    "key": "orm-relaciones",
    "label": "ORM: relaciones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/definicion",
        "label": "Definición",
        "description": "relationship() permite navegar entre entidades relacionadas. back_populates conecta los dos lados de la relación en memoria."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-many-y-many-to-one",
        "label": "One-to-many y many-to-one",
        "description": "Una colección Mapped[list[Pedido]] representa el lado uno a muchos; una referencia Mapped[Cliente] representa el lado muchos a uno."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-one",
        "label": "One-to-one",
        "description": "Una relación escalar en ambos lados expresa uno a uno en ORM; una restricción UNIQUE en la FK garantiza la unicidad en la base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/many-to-many-y-secondary",
        "label": "Many-to-many y secondary",
        "description": "Una tabla de asociación contiene las claves de ambos lados. relationship(secondary=...) permite navegar sin mapearla como entidad."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/join-con-relaciones-y-aliased",
        "label": "join() con relaciones y aliased()",
        "description": "ORM puede construir joins con atributos relationship. aliased() crea otro rol para una entidad."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/any-y-has",
        "label": "any() y has()",
        "description": "any() comprueba coincidencias en relaciones de colección; has() en relaciones escalares. Generan EXISTS."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/cascade-delete-orphan-y-passive-deletes",
        "label": "cascade, delete-orphan y passive_deletes",
        "description": "cascade decide qué operaciones ORM se propagan; delete-orphan elimina entidades dependientes retiradas de la relación apropiada. passive_deletes delega parte del trabajo en la base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-relaciones/primaryjoin-y-secondaryjoin",
        "label": "primaryjoin y secondaryjoin",
        "description": "Permiten especificar condiciones de enlace cuando la inferencia por claves no basta."
      }
    ]
  },
  {
    "key": "orm-carga",
    "label": "ORM: carga de relaciones y rendimiento",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/definicion",
        "label": "Definición",
        "description": "Las estrategias de carga determinan cuándo y cómo se consultan relaciones. Lazy loading consulta al acceder; eager loading prepara datos de antemano."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/lazy-loading-y-n-1",
        "label": "Lazy loading y N+1",
        "description": "N+1 ocurre al consultar una lista y disparar una consulta adicional por cada objeto al acceder a su relación."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/selectinload",
        "label": "selectinload()",
        "description": "Carga relaciones mediante una consulta adicional que utiliza las claves de las entidades principales."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/joinedload-y-unique",
        "label": "joinedload() y unique()",
        "description": "joinedload() carga mediante un JOIN adicional. Al cargar colecciones con joinedload, aplica unique() al resultado ORM."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/subqueryload-y-contains-eager",
        "label": "subqueryload() y contains_eager()",
        "description": "subqueryload() carga desde una subconsulta; contains_eager() usa un JOIN escrito explícitamente para poblar una relación."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-carga/raiseload-load-only-defer-y-undefer",
        "label": "raiseload(), load_only(), defer() y undefer()",
        "description": "raiseload() evita cargas lazy accidentales de relaciones. load_only/defer/undefer controlan columnas cargadas."
      }
    ]
  },
  {
    "key": "orm-avanzado",
    "label": "ORM: atributos y patrones avanzados",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/definicion",
        "label": "Definición",
        "description": "Los atributos híbridos y los mapeos especializados amplían cómo se representan y consultan entidades. Son útiles cuando una aplicación requiere más que consultas relacionales directas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/hybrid-property",
        "label": "hybrid_property",
        "description": "Un atributo híbrido puede funcionar como cálculo Python en una instancia y como expresión SQL en una clase."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/column-property",
        "label": "column_property()",
        "description": "Mapea una expresión SQL como atributo ORM que se carga junto a la entidad."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/association-proxy",
        "label": "association_proxy",
        "description": "Expone atributos de entidades relacionadas mediante una propiedad intermediaria."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/herencia-y-polimorfismo",
        "label": "Herencia y polimorfismo",
        "description": "El ORM admite single-table, joined-table y concrete-table inheritance. polymorphic_on selecciona el subtipo al leer."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/version-id-col",
        "label": "version_id_col",
        "description": "Configura una versión de fila para detectar cambios concurrentes al hacer flush de entidades individuales."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/validates",
        "label": "validates()",
        "description": "Un validador ORM intercepta asignaciones normales a atributos. No reemplaza restricciones de base."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/orm-avanzado/automap-y-deferredreflection",
        "label": "Automap y DeferredReflection",
        "description": "Automap genera mapeos a partir de metadatos reflejados; DeferredReflection aplaza la reflexión de clases declaradas."
      }
    ]
  },
  {
    "key": "pool",
    "label": "Pool de conexiones y concurrencia",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/pool/definicion",
        "label": "Definición",
        "description": "El pool reutiliza conexiones físicas para evitar abrir una por consulta. Un Engine puede compartirse; cada hilo o tarea debe manejar su propia Connection o Session."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pool/queuepool-nullpool-y-staticpool",
        "label": "QueuePool, NullPool y StaticPool",
        "description": "QueuePool limita y reutiliza conexiones; NullPool abre y cierra en cada uso; StaticPool mantiene una conexión."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pool/pool-size-max-overflow-y-pool-timeout",
        "label": "pool_size, max_overflow y pool_timeout",
        "description": "Limitan conexiones retenidas, conexiones adicionales y tiempo de espera con QueuePool."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pool/pool-recycle-y-pool-pre-ping",
        "label": "pool_recycle y pool_pre_ping",
        "description": "pool_recycle reemplaza conexiones viejas al volver a prestarlas; pool_pre_ping comprueba disponibilidad al obtener una conexión."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pool/invalidate-y-reconexion",
        "label": "invalidate() y reconexión",
        "description": "invalidate() descarta la conexión DBAPI subyacente. Si existe una transacción pendiente, revierte antes de reconectar."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/pool/hilos-procesos-y-sesiones",
        "label": "Hilos, procesos y sesiones",
        "description": "Engine y pool pueden reutilizarse en un proceso; Connection y Session no se comparten simultáneamente. Tras fork, evita reutilizar conexiones heredadas."
      }
    ]
  },
  {
    "key": "rendimiento",
    "label": "Rendimiento, eventos y extensiones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/definicion",
        "label": "Definición",
        "description": "El rendimiento depende del SQL, índices, volumen de datos, driver y modo de carga. Mide antes de cambiar la arquitectura."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/stream-results-y-yield-per",
        "label": "stream_results y yield_per",
        "description": "Solicitan resultados en streaming o lotes de filas cuando el driver lo permite. yield_per también establece un tamaño de buffer."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/insertmanyvalues-y-cargas-masivas",
        "label": "insertmanyvalues y cargas masivas",
        "description": "SQLAlchemy puede optimizar múltiples INSERT según dialecto, driver y RETURNING. executemany y batching no son idénticos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/event-listen-y-listens-for",
        "label": "event.listen() y listens_for()",
        "description": "Registran callbacks para eventos de Engine, Pool, Session y otros objetos."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/eventos-de-pool-y-sesion",
        "label": "Eventos de pool y sesión",
        "description": "connect, checkout y checkin se refieren a conexiones; before_flush y otros eventos permiten observar el ciclo ORM."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/perfilado-y-tiempos",
        "label": "Perfilado y tiempos",
        "description": "before_cursor_execute y after_cursor_execute permiten medir ejecución en el driver; el tiempo total puede incluir carga y transformación."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/typedecorator-y-userdefinedtype",
        "label": "TypeDecorator y UserDefinedType",
        "description": "TypeDecorator amplía conversiones bind/result de un tipo existente; UserDefinedType describe un tipo SQL propio."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/rendimiento/multiples-engines-y-sharding",
        "label": "Múltiples engines y sharding",
        "description": "Se pueden dirigir operaciones a distintas bases con engines separados o binds de Session. Horizontal sharding distribuye filas de una entidad entre bases."
      }
    ]
  },
  {
    "key": "asyncio",
    "label": "SQLAlchemy asyncio",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/asyncio/definicion",
        "label": "Definición",
        "description": "AsyncEngine y AsyncConnection permiten usar drivers asíncronos mediante await. Requieren un driver compatible con asyncio."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/asyncio/asyncsession-y-async-sessionmaker",
        "label": "AsyncSession y async_sessionmaker()",
        "description": "AsyncSession ofrece operaciones ORM asíncronas; async_sessionmaker crea sesiones configuradas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/asyncio/run-sync-y-asyncresult",
        "label": "run_sync() y AsyncResult",
        "description": "run_sync() permite invocar APIs síncronas adaptadas, como create_all(); stream() devuelve AsyncResult para iterar asíncronamente."
      }
    ]
  },
  {
    "key": "alembic",
    "label": "Alembic y migraciones",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/alembic/definicion",
        "label": "Definición",
        "description": "Alembic es una biblioteca externa que versiona cambios del esquema. SQLAlchemy create_all() no reemplaza migraciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/alembic/revision-y-autogenerate",
        "label": "revision y autogenerate",
        "description": "revision crea un script de migración; --autogenerate compara metadata con el esquema configurado y propone operaciones."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/alembic/upgrade-downgrade-y-revision-history",
        "label": "upgrade(), downgrade() y revision history",
        "description": "upgrade aplica migraciones hasta la revisión indicada; downgrade revierte según el código definido."
      }
    ]
  },
  {
    "key": "etl-pruebas",
    "label": "ETL, calidad de datos y pruebas",
    "children": [
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/definicion",
        "label": "Definición",
        "description": "Un flujo ETL extrae datos, los transforma y los carga en un destino. SQLAlchemy gestiona conexiones, SQL y transacciones durante el proceso."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/carga-de-csv-excel-y-json",
        "label": "Carga de CSV, Excel y JSON",
        "description": "Pandas puede leer archivos y convertirlos en registros; SQLAlchemy inserta esos registros en tablas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/cargas-incrementales-y-watermark",
        "label": "Cargas incrementales y watermark",
        "description": "Una marca de avance identifica datos nuevos o modificados. Una fecha con empates necesita un segundo criterio estable."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/deduplicacion-y-validacion",
        "label": "Deduplicación y validación",
        "description": "Comprueba unicidad, nulos, tipos y conteos antes de persistir resultados."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/exportar-y-automatizar-reportes",
        "label": "Exportar y automatizar reportes",
        "description": "Separa extracción, cálculo y exportación; parametriza fechas y usa rutas controladas."
      },
      {
        "id": "analisis-de-datos/sqlalchemy/etl-pruebas/testing-con-sqlite-en-memoria-y-rollback",
        "label": "Testing con SQLite en memoria y rollback",
        "description": "Una base aislada y una transacción reversible permiten probar consultas y cambios sin tocar producción."
      }
    ]
  }
];
