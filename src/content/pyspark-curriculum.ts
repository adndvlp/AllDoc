// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const pysparkCurriculum = [
  {
    "key": "spark-session",
    "label": "SparkSession",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/spark-session/definicion",
        "label": "Definición",
        "description": "`SparkSession` es la entrada para crear DataFrames, leer datos y ejecutar Spark SQL."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-session/sparkcontext",
        "label": "SparkContext",
        "description": "`SparkContext` comunica el driver con Spark Core y permite trabajar con RDDs en Spark clásico."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-session/configuracion-y-ciclo-de-vida",
        "label": "Configuración y ciclo de vida",
        "description": "`builder.config()` establece opciones iniciales; `spark.conf` consulta o cambia opciones SQL modificables. `stop()` finaliza la sesión."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-session/cerrar-la-sesion",
        "label": "Cerrar la sesión",
        "description": "`stop()` libera la sesión y, en Spark clásico, detiene el contexto subyacente."
      }
    ]
  },
  {
    "key": "arquitectura-y-ejecucion",
    "label": "Arquitectura y ejecución",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/definicion",
        "label": "Definición",
        "description": "El driver coordina el trabajo y los executors ejecutan tareas sobre particiones. En un cluster, el gestor asigna recursos a la aplicación."
      },
      {
        "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/jobs-stages-y-tasks",
        "label": "Jobs, stages y tasks",
        "description": "Una acción puede generar uno o varios jobs; los jobs se dividen en stages y cada stage ejecuta tasks sobre particiones."
      },
      {
        "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/lazy-evaluation",
        "label": "Lazy evaluation",
        "description": "Una transformación describe trabajo; una acción solicita un resultado y desencadena su ejecución cuando es necesario."
      },
      {
        "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/dag-y-lineage",
        "label": "DAG y lineage",
        "description": "Spark representa las dependencias del procesamiento mediante un grafo dirigido sin ciclos (DAG); el lineage registra cómo reconstruir datos perdidos."
      },
      {
        "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/batch-y-streaming",
        "label": "Batch y streaming",
        "description": "Batch procesa datos acotados; streaming procesa entradas que siguen llegando usando consultas incrementales."
      }
    ]
  },
  {
    "key": "dataframe-y-esquema",
    "label": "DataFrame y esquema",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/definicion",
        "label": "Definición",
        "description": "Un DataFrame es una colección distribuida de filas con columnas nombradas y tipos definidos."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/createdataframe-y-row",
        "label": "createDataFrame y Row",
        "description": "`createDataFrame()` convierte registros de Python en un DataFrame; `Row` permite nombrar campos."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/structtype-y-structfield",
        "label": "StructType y StructField",
        "description": "`StructType` describe el conjunto de campos; `StructField` define nombre, tipo y si admite NULL."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-de-datos",
        "label": "Tipos de datos",
        "description": "Los tipos controlan qué operaciones son válidas y cómo se representan los valores: enteros, decimales, texto, booleanos, fechas y timestamps."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-anidados",
        "label": "Tipos anidados",
        "description": "ArrayType guarda listas, MapType pares clave-valor y StructType registros con campos internos."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/range-y-column",
        "label": "range y Column",
        "description": "`range()` crea una secuencia distribuida; `Column` representa una expresión que Spark evaluará sobre filas."
      },
      {
        "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-nulos-intervalos-y-tipos-definidos-por-usuario",
        "label": "Tipos nulos, intervalos y tipos definidos por usuario",
        "description": "NullType representa valores sin tipo concreto; los intervalos describen duración; UserDefinedType permite representar objetos de dominio con un tipo SQL subyacente."
      }
    ]
  },
  {
    "key": "inspeccion-y-acciones",
    "label": "Inspección y acciones",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/definicion",
        "label": "Definición",
        "description": "Inspeccionar permite conocer el esquema, ejemplos de filas y tamaño de los datos sin traer necesariamente el dataset completo al driver."
      },
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/columns-dtypes-y-schema",
        "label": "columns, dtypes y schema",
        "description": "Estas propiedades describen las columnas y sus tipos sin convertir las filas a Python."
      },
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/count-first-head-y-take",
        "label": "count, first, head y take",
        "description": "`count()` cuenta filas; `first()`, `head()` y `take(n)` recuperan pocas filas como objetos Row."
      },
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/collect-y-tolocaliterator",
        "label": "collect y toLocalIterator",
        "description": "`collect()` trae todas las filas al driver; `toLocalIterator()` permite consumirlas por particiones."
      },
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/describe-y-summary",
        "label": "describe y summary",
        "description": "`describe()` resume count, mean, stddev, min y max; `summary()` admite estadísticas y percentiles adicionales."
      },
      {
        "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/isempty-y-samesemantics",
        "label": "isEmpty y sameSemantics",
        "description": "`isEmpty()` comprueba si hay filas; `sameSemantics()` compara planes lógicos de DataFrames, no garantiza equivalencia de todos los resultados posibles."
      }
    ]
  },
  {
    "key": "lectura-de-datos",
    "label": "Lectura de datos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/definicion",
        "label": "Definición",
        "description": "`spark.read` crea un lector batch; el formato y las opciones determinan cómo interpretar archivos o fuentes externas."
      },
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/csv-y-opciones",
        "label": "CSV y opciones",
        "description": "`header`, `sep`, `inferSchema` y `mode` controlan encabezados, delimitadores, inferencia y registros mal formados."
      },
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/json-y-texto",
        "label": "JSON y texto",
        "description": "`json()` interpreta JSON por línea por defecto; `text()` devuelve una columna value por línea."
      },
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/parquet-y-orc",
        "label": "Parquet y ORC",
        "description": "Parquet y ORC son formatos columnares que conservan el esquema y permiten leer columnas selectivamente."
      },
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/format-option-y-load",
        "label": "format, option y load",
        "description": "`format()` elige la fuente; `option()` añade parámetros y `load()` inicia la construcción de la lectura."
      },
      {
        "id": "analisis-de-datos/pyspark/lectura-de-datos/jdbc",
        "label": "JDBC",
        "description": "JDBC lee tablas de bases relacionales mediante un driver Java; se pueden configurar particiones y predicados."
      }
    ]
  },
  {
    "key": "seleccionar-y-modificar-columnas",
    "label": "Seleccionar y modificar columnas",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/definicion",
        "label": "Definición",
        "description": "`select()` elige columnas o expresiones; `withColumn()` añade o reemplaza una columna sin modificar el DataFrame original."
      },
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/col-lit-y-alias",
        "label": "col, lit y alias",
        "description": "`col()` referencia una columna; `lit()` construye una constante; `alias()` nombra el resultado."
      },
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/selectexpr-y-expr",
        "label": "selectExpr y expr",
        "description": "Estas interfaces interpretan expresiones de Spark SQL dentro del DataFrame API."
      },
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/withcolumn-y-withcolumns",
        "label": "withColumn y withColumns",
        "description": "Añaden o sustituyen columnas mediante expresiones; `withColumns` permite definir varias a la vez."
      },
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/renombrar-y-eliminar",
        "label": "Renombrar y eliminar",
        "description": "`withColumnRenamed`, `withColumnsRenamed` y `drop` cambian las columnas del nuevo DataFrame."
      },
      {
        "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/transform",
        "label": "transform",
        "description": "`transform()` encadena una función que recibe y devuelve un DataFrame."
      }
    ]
  },
  {
    "key": "filtros",
    "label": "Filtros",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/filtros/definicion",
        "label": "Definición",
        "description": "`filter()` y `where()` conservan filas cuya condición sea verdadera."
      },
      {
        "id": "analisis-de-datos/pyspark/filtros/operadores-y-condiciones-compuestas",
        "label": "Operadores y condiciones compuestas",
        "description": "Usa ==, !=, >, >= y los demás comparadores; combina Columns con &, | y ~, colocando paréntesis."
      },
      {
        "id": "analisis-de-datos/pyspark/filtros/isin-y-between",
        "label": "isin y between",
        "description": "`isin()` compara con una lista; `between()` incluye ambos límites."
      },
      {
        "id": "analisis-de-datos/pyspark/filtros/like-rlike-y-texto",
        "label": "like, rlike y texto",
        "description": "`like()` usa % y _; `rlike()` usa expresiones regulares; `contains`, `startswith` y `endswith` buscan texto literal."
      },
      {
        "id": "analisis-de-datos/pyspark/filtros/not-or-y-precedencia",
        "label": "NOT, OR y precedencia",
        "description": "`~` niega una expresión, `|` combina alternativas y `&` exige ambas; los paréntesis hacen explícita la precedencia."
      }
    ]
  },
  {
    "key": "ordenamiento-y-limites",
    "label": "Ordenamiento y límites",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/definicion",
        "label": "Definición",
        "description": "`orderBy()` y `sort()` ordenan por una o varias expresiones; `limit()` limita la cantidad de filas."
      },
      {
        "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/asc-desc-y-desempate",
        "label": "ASC, DESC y desempate",
        "description": "Cada columna puede tener su propia dirección; una clave secundaria resuelve empates."
      },
      {
        "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/nulos-y-offset",
        "label": "Nulos y offset",
        "description": "`asc_nulls_last()` y `desc_nulls_first()` controlan nulos; `offset()` descarta las primeras n filas."
      }
    ]
  },
  {
    "key": "nulos-y-condicionales",
    "label": "Valores nulos y condicionales",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/definicion",
        "label": "Definición",
        "description": "NULL representa un valor ausente; usa `isNull()` e `isNotNull()` para detectarlo y funciones condicionales para tratarlo."
      },
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/fillna-dropna-y-replace",
        "label": "fillna, dropna y replace",
        "description": "`fillna` rellena nulos; `dropna` elimina filas según nulos; `replace` sustituye valores concretos."
      },
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/coalesce-y-nullif",
        "label": "coalesce y nullif",
        "description": "`F.coalesce()` devuelve el primer valor no nulo; `F.nullif()` devuelve NULL cuando dos expresiones son iguales."
      },
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/nan-y-eqnullsafe",
        "label": "NaN y eqNullSafe",
        "description": "NaN es un valor de punto flotante distinto de NULL; `isnan()` lo detecta. `eqNullSafe()` compara incluso dos nulos."
      },
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/when-y-otherwise",
        "label": "when y otherwise",
        "description": "`when()` encadena condiciones como CASE WHEN; `otherwise()` define el valor si ninguna se cumple."
      },
      {
        "id": "analisis-de-datos/pyspark/nulos-y-condicionales/is-not-null-y-nullif",
        "label": "IS NOT NULL y NULLIF",
        "description": "`isNotNull` selecciona valores presentes; `nullif` convierte en NULL cuando se cumple la igualdad."
      }
    ]
  },
  {
    "key": "tipos-y-conversiones",
    "label": "Tipos y conversiones",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/tipos-y-conversiones/definicion",
        "label": "Definición",
        "description": "`cast()` convierte una Column al tipo solicitado. La conversión puede fallar cuando el valor no es válido para el tipo."
      },
      {
        "id": "analisis-de-datos/pyspark/tipos-y-conversiones/astype-y-try-cast",
        "label": "astype y try_cast",
        "description": "`astype()` es alias de cast; `try_cast()` devuelve NULL para conversiones inválidas admitidas en lugar de fallar."
      },
      {
        "id": "analisis-de-datos/pyspark/tipos-y-conversiones/coercion-ansi-y-sensibilidad-a-mayusculas",
        "label": "Coerción, ANSI y sensibilidad a mayúsculas",
        "description": "Spark puede convertir tipos implícitamente. ANSI controla errores aritméticos y conversiones; caseSensitive afecta resolución de nombres."
      }
    ]
  },
  {
    "key": "funciones-de-texto",
    "label": "Funciones de texto",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/funciones-de-texto/definicion",
        "label": "Definición",
        "description": "Las funciones de `pyspark.sql.functions` transforman columnas de texto sin bucles Python."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-de-texto/trim-lower-upper-e-initcap",
        "label": "trim, lower, upper e initcap",
        "description": "Normalizan espacios extremos o capitalización; ltrim y rtrim actúan sobre un extremo."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-de-texto/concat-concat-ws-substring-y-length",
        "label": "concat, concat_ws, substring y length",
        "description": "`concat` combina valores; `concat_ws` utiliza separador; `substring` extrae texto desde una posición basada en 1; `length` cuenta caracteres."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-de-texto/split-y-expresiones-regulares",
        "label": "split y expresiones regulares",
        "description": "`split` separa por un patrón regex; `regexp_replace` reemplaza coincidencias y `regexp_extract` extrae un grupo."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-de-texto/extraer-y-separar-campos",
        "label": "Extraer y separar campos",
        "description": "`substring` comienza en 1; `split` devuelve un array; regexp_extract devuelve texto del grupo indicado, o cadena vacía si no coincide."
      }
    ]
  },
  {
    "key": "funciones-numericas",
    "label": "Funciones numéricas",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/funciones-numericas/definicion",
        "label": "Definición",
        "description": "Las expresiones aritméticas y funciones numéricas calculan columnas, como descuentos o diferencias."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-numericas/round-y-bround",
        "label": "round y bround",
        "description": "`round` redondea HALF_UP; `bround` usa HALF_EVEN, que en empates elige el valor par."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-numericas/abs-ceil-floor-y-matematicas",
        "label": "abs, ceil, floor y matemáticas",
        "description": "`abs` calcula magnitud; ceil y floor redondean a entero superior e inferior; pow, sqrt y log son operaciones matemáticas."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-numericas/division-segura",
        "label": "División segura",
        "description": "`try_divide()` devuelve NULL si el divisor es cero; es útil para ratios con denominadores variables."
      }
    ]
  },
  {
    "key": "fechas-y-timestamps",
    "label": "Fechas y timestamps",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/definicion",
        "label": "Definición",
        "description": "DateType representa fechas; TimestampType representa instantes interpretados según la zona horaria de sesión al mostrarlos."
      },
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/parseo-y-formato",
        "label": "Parseo y formato",
        "description": "`to_date`, `to_timestamp` y `try_to_timestamp` convierten texto; `date_format` produce texto."
      },
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/extraccion-de-componentes",
        "label": "Extracción de componentes",
        "description": "year, month, quarter, dayofmonth, dayofweek y weekofyear extraen partes de la fecha."
      },
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/diferencias-y-desplazamientos",
        "label": "Diferencias y desplazamientos",
        "description": "`datediff(fin,inicio)` calcula días; date_add/date_sub desplazan días; add_months y months_between trabajan con meses."
      },
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/trunc-date-trunc-y-last-day",
        "label": "trunc, date_trunc y last_day",
        "description": "`trunc` corta una fecha al inicio del periodo; `date_trunc` produce timestamp; `last_day` devuelve el último día del mes."
      },
      {
        "id": "analisis-de-datos/pyspark/fechas-y-timestamps/fecha-actual-y-zona-horaria",
        "label": "Fecha actual y zona horaria",
        "description": "current_date/current_timestamp se evalúan al ejecutar la consulta; la zona de sesión afecta timestamps. `from_utc_timestamp` y `to_utc_timestamp` convierten según zona."
      }
    ]
  },
  {
    "key": "agregacion",
    "label": "Agregación",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/agregacion/definicion",
        "label": "Definición",
        "description": "Una agregación resume muchas filas en uno o varios valores; `agg()` permite combinar funciones."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/count-y-valores-distintos",
        "label": "COUNT y valores distintos",
        "description": "`count(\"*\")` cuenta filas; `count(\"coupon\")` omite NULL; `count_distinct()` (alias countDistinct) cuenta valores únicos no nulos."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/sum-avg-min-y-max",
        "label": "SUM, AVG, MIN y MAX",
        "description": "Estas agregaciones suman, promedian o encuentran extremos; ignoran NULL."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/agregacion-condicional-y-ratios",
        "label": "Agregación condicional y ratios",
        "description": "Combina `when` con `sum` o `count` para calcular métricas de un subconjunto sin perder el denominador total."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/collect-list-y-collect-set",
        "label": "collect_list y collect_set",
        "description": "`collect_list` crea un array con los valores de un grupo; `collect_set` elimina repetidos."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/estadistica-descriptiva",
        "label": "Estadística descriptiva",
        "description": "`stddev` y `variance` calculan dispersión muestral; `stddev_pop` y `var_pop` son poblacionales; `corr` y `covar_pop` estudian dos variables."
      },
      {
        "id": "analisis-de-datos/pyspark/agregacion/percentiles-y-aproximaciones",
        "label": "Percentiles y aproximaciones",
        "description": "`median()` calcula la mediana; `percentile_approx` aproxima cuantiles; `approx_count_distinct` estima cardinalidad."
      }
    ]
  },
  {
    "key": "group-by-y-having",
    "label": "GROUP BY y HAVING",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/group-by-y-having/definicion",
        "label": "Definición",
        "description": "`groupBy()` divide filas por claves y `agg()` calcula valores por grupo. El resultado contiene una fila por combinación de claves."
      },
      {
        "id": "analisis-de-datos/pyspark/group-by-y-having/varias-columnas",
        "label": "Varias columnas",
        "description": "Agrupar por varias columnas produce grupos por combinación, no un cálculo independiente para cada columna."
      },
      {
        "id": "analisis-de-datos/pyspark/group-by-y-having/having-y-filtros",
        "label": "HAVING y filtros",
        "description": "En DataFrame API, filtrar después de agg equivale a HAVING; filtrar antes equivale a WHERE."
      },
      {
        "id": "analisis-de-datos/pyspark/group-by-y-having/rollup-cube-y-groupingsets",
        "label": "rollup, cube y groupingSets",
        "description": "`rollup` calcula subtotales jerárquicos; `cube` genera todas las combinaciones de dimensiones; `groupingSets` elige combinaciones concretas."
      },
      {
        "id": "analisis-de-datos/pyspark/group-by-y-having/groupingsets-y-cube",
        "label": "groupingSets y cube",
        "description": "`groupingSets()` (Spark 4.0+) permite pedir agrupaciones específicas; cube genera todas las combinaciones posibles de dimensiones."
      }
    ]
  },
  {
    "key": "valores-unicos-y-calidad",
    "label": "Valores únicos y calidad",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/definicion",
        "label": "Definición",
        "description": "`distinct()` elimina filas repetidas completas; `dropDuplicates()` permite indicar las claves para detectar repetición."
      },
      {
        "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/detectar-duplicados",
        "label": "Detectar duplicados",
        "description": "Agrupa por la clave de negocio y filtra los conteos mayores a uno."
      },
      {
        "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/eliminar-duplicados-deterministicamente",
        "label": "Eliminar duplicados determinísticamente",
        "description": "`dropDuplicates([clave])` conserva un representante sin prometer cuál. Si importa cuál queda, usa `row_number` con un orden explícito."
      },
      {
        "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/validaciones",
        "label": "Validaciones",
        "description": "Comprueba nulos, rangos, unicidad y referencias entre tablas como reglas separadas."
      }
    ]
  },
  {
    "key": "join",
    "label": "JOIN",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/join/definicion",
        "label": "Definición",
        "description": "`join()` combina filas de dos DataFrames según una condición o claves comunes."
      },
      {
        "id": "analisis-de-datos/pyspark/join/condicion-y-alias",
        "label": "Condición y alias",
        "description": "Una condición Column permite comparar nombres distintos o varias expresiones; `alias()` desambigua referencias de ambos lados."
      },
      {
        "id": "analisis-de-datos/pyspark/join/left-right-y-full",
        "label": "LEFT, RIGHT y FULL",
        "description": "LEFT conserva todo lo de la izquierda; RIGHT lo de la derecha; FULL ambas. Las columnas sin coincidencia se rellenan con NULL."
      },
      {
        "id": "analisis-de-datos/pyspark/join/semi-y-anti-join",
        "label": "Semi y anti join",
        "description": "`left_semi` devuelve solo filas izquierdas con coincidencia; `left_anti` las que no coinciden. Ninguno añade columnas derechas."
      },
      {
        "id": "analisis-de-datos/pyspark/join/cross-join-y-self-join",
        "label": "CROSS JOIN y self join",
        "description": "`crossJoin` forma el producto cartesiano; un self join une un DataFrame consigo mismo con alias distintos."
      },
      {
        "id": "analisis-de-datos/pyspark/join/cardinalidad-y-joins-multiples",
        "label": "Cardinalidad y joins múltiples",
        "description": "Una relación 1:N repite campos del lado 1; N:M puede multiplicarlos aún más. Agrega a la granularidad correcta antes de sumar."
      },
      {
        "id": "analisis-de-datos/pyspark/join/self-join",
        "label": "Self join",
        "description": "Un self join usa dos alias del mismo DataFrame para relacionar filas entre sí."
      },
      {
        "id": "analisis-de-datos/pyspark/join/right-y-full-en-la-practica",
        "label": "RIGHT y FULL en la práctica",
        "description": "RIGHT es equivalente a LEFT intercambiando los lados; FULL conserva filas sin coincidencia de ambos lados."
      }
    ]
  },
  {
    "key": "operaciones-de-conjuntos",
    "label": "Operaciones de conjuntos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/definicion",
        "label": "Definición",
        "description": "Las operaciones de conjuntos combinan DataFrames con esquemas compatibles; pueden preservar o eliminar duplicados según el método."
      },
      {
        "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/unionbyname",
        "label": "unionByName",
        "description": "`unionByName()` alinea columnas por nombre en lugar de posición; allowMissingColumns completa campos ausentes con NULL."
      },
      {
        "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/intersect-intersectall-subtract-y-exceptall",
        "label": "intersect, intersectAll, subtract y exceptAll",
        "description": "intersect y subtract eliminan duplicados en el resultado; intersectAll y exceptAll respetan multiplicidades."
      }
    ]
  },
  {
    "key": "muestreo-y-estadisticas",
    "label": "Muestreo y estadísticas de exploración",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/definicion",
        "label": "Definición",
        "description": "El muestreo permite explorar parte de los datos; las estadísticas aproximadas reducen coste para distribuciones grandes."
      },
      {
        "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/sampleby-y-randomsplit",
        "label": "sampleBy y randomSplit",
        "description": "sampleBy aplica fracciones por estrato; randomSplit divide aleatoriamente usando pesos normalizados."
      },
      {
        "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/approxquantile-e-iqr",
        "label": "approxQuantile e IQR",
        "description": "approxQuantile estima cuantiles; el rango intercuartílico es Q3−Q1 y permite construir límites de exploración de atípicos."
      },
      {
        "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/freqitems-y-crosstab",
        "label": "freqItems y crosstab",
        "description": "freqItems busca elementos frecuentes y puede incluir falsos positivos; crosstab construye una tabla de contingencia de dos columnas."
      }
    ]
  },
  {
    "key": "ventanas",
    "label": "Ventanas",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/ventanas/definicion",
        "label": "Definición",
        "description": "Una función de ventana calcula valores relacionados con otras filas sin reducirlas a una fila por grupo. `over()` recibe una especificación Window."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/partition-by-y-order-by",
        "label": "PARTITION BY y ORDER BY",
        "description": "`Window.partitionBy()` separa ventanas por clave y `orderBy()` define el orden de cálculo dentro de cada una."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/row-number-rank-y-dense-rank",
        "label": "ROW_NUMBER, RANK y DENSE_RANK",
        "description": "row_number numera filas; rank comparte rango con empates y salta puestos; dense_rank no salta puestos."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/lag-y-lead",
        "label": "LAG y LEAD",
        "description": "`lag()` trae el valor anterior y `lead()` el siguiente según el orden de la ventana; se puede indicar distancia y valor por defecto."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/rows-y-range",
        "label": "ROWS y RANGE",
        "description": "`rowsBetween()` usa posiciones físicas relativas; `rangeBetween()` usa valores de la expresión de ordenamiento."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/first-last-y-valores-de-ventana",
        "label": "first, last y valores de ventana",
        "description": "`first_value` y `last_value` recuperan valores de los extremos del marco; `first` y `last` también existen como agregaciones."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/ntile-percent-rank-y-cume-dist",
        "label": "NTILE, PERCENT_RANK y CUME_DIST",
        "description": "ntile distribuye filas en grupos numerados; percent_rank mide rango relativo; cume_dist mide proporción acumulada incluyendo empates."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/top-n-por-grupo",
        "label": "Top N por grupo",
        "description": "Calcula una función de ranking dentro de cada clave y luego filtra el resultado."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/promedios-moviles",
        "label": "Promedios móviles",
        "description": "Una ventana con marco deslizante permite calcular métricas sobre las últimas filas o un rango temporal."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/rangebetween",
        "label": "rangeBetween",
        "description": "`rangeBetween` usa un rango de valores alrededor de la clave de ordenamiento, no una cantidad fija de filas. Los límites finitos requieren normalmente una sola expresión de orden numérica."
      },
      {
        "id": "analisis-de-datos/pyspark/ventanas/percent-rank-y-cume-dist",
        "label": "percent_rank y cume_dist",
        "description": "percent_rank calcula (rank−1)/(n−1), con 0 para una única fila; cume_dist cuenta filas hasta el valor actual inclusive y divide por n."
      }
    ]
  },
  {
    "key": "spark-sql",
    "label": "Spark SQL",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/spark-sql/definicion",
        "label": "Definición",
        "description": "`spark.sql()` ejecuta consultas SQL y devuelve DataFrames, usando el mismo motor de expresiones y optimización que el DataFrame API."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-sql/vistas-temporales-y-globales",
        "label": "Vistas temporales y globales",
        "description": "`createOrReplaceTempView()` registra un nombre en la sesión; `createOrReplaceGlobalTempView()` comparte una vista dentro de la aplicación usando global_temp."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-sql/subconsultas-y-ctes",
        "label": "Subconsultas y CTEs",
        "description": "Una subconsulta usa el resultado de otra consulta; WITH nombra resultados lógicos dentro de una sentencia."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-sql/catalogo-y-metadatos",
        "label": "Catálogo y metadatos",
        "description": "`spark.catalog` permite consultar tablas, bases, vistas y caché; el catálogo resuelve nombres de objetos."
      }
    ]
  },
  {
    "key": "remodelacion",
    "label": "Remodelación de datos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/remodelacion/definicion",
        "label": "Definición",
        "description": "Pivot transforma valores de una columna en columnas; unpivot o melt convierte columnas de medida en filas."
      },
      {
        "id": "analisis-de-datos/pyspark/remodelacion/unpivot-y-melt",
        "label": "Unpivot y melt",
        "description": "`unpivot()`/`melt()` convierten columnas de medidas compatibles en pares variable/valor conservando identificadores."
      }
    ]
  },
  {
    "key": "datos-anidados",
    "label": "Arrays, maps y structs",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/definicion",
        "label": "Definición",
        "description": "Spark permite columnas anidadas con listas, diccionarios y registros. Las funciones nativas manipulan estas estructuras sin convertirlas a Python."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/arrays-y-pertenencia",
        "label": "Arrays y pertenencia",
        "description": "`array`, `array_contains`, `size`, `array_distinct`, `array_sort` y operaciones de conjuntos trabajan sobre listas en columnas."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/explode-explode-outer-y-posexplode",
        "label": "explode, explode_outer y posexplode",
        "description": "explode genera una fila por elemento; explode_outer conserva una fila nula cuando la colección está vacía o es NULL; posexplode añade posición."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/struct-y-withfield",
        "label": "Struct y withField",
        "description": "`struct()` crea un registro; `Column.withField()` añade o sustituye un campo interno."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/mapas-y-acceso-a-elementos",
        "label": "Mapas y acceso a elementos",
        "description": "create_map, map_from_arrays y map_from_entries construyen mapas; map_keys/map_values extraen colecciones; element_at obtiene un elemento."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/operaciones-entre-arrays-y-maps",
        "label": "Operaciones entre arrays y maps",
        "description": "array_union, array_intersect y array_except comparan listas; flatten aplana listas; arrays_zip combina posiciones; map_concat une mapas."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/higher-order-functions",
        "label": "Higher-order functions",
        "description": "`transform`, `filter`, `aggregate`, `exists` y `forall` expresan operaciones sobre arrays mediante lambdas de Column."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/sequence",
        "label": "sequence",
        "description": "`sequence` construye arrays con valores consecutivos, incluidos los extremos."
      },
      {
        "id": "analisis-de-datos/pyspark/datos-anidados/filter-aggregate-exists-y-forall",
        "label": "filter, aggregate, exists y forall",
        "description": "Estas funciones evalúan expresiones sobre elementos de un array: seleccionan, acumulan o comprueban condiciones existenciales/universales."
      }
    ]
  },
  {
    "key": "json-y-otros-tipos",
    "label": "JSON y otros tipos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/json-y-otros-tipos/definicion",
        "label": "Definición",
        "description": "`from_json` interpreta texto JSON usando un esquema; `to_json` serializa columnas anidadas a texto."
      },
      {
        "id": "analisis-de-datos/pyspark/json-y-otros-tipos/get-json-object-y-schema-of-json",
        "label": "get_json_object y schema_of_json",
        "description": "get_json_object extrae una ruta JSON como texto; schema_of_json infiere un esquema a partir de una muestra literal."
      },
      {
        "id": "analisis-de-datos/pyspark/json-y-otros-tipos/varianttype-e-intervalos",
        "label": "VariantType e intervalos",
        "description": "VariantType representa valores semiestructurados de esquema variable en Spark 4.x; los tipos de intervalo representan duraciones de calendario o tiempo."
      },
      {
        "id": "analisis-de-datos/pyspark/json-y-otros-tipos/binarios-codificacion-y-hashing",
        "label": "Binarios, codificación y hashing",
        "description": "encode/decode convierten texto y bytes; base64/unbase64 representan bytes como texto; hash, xxhash64, md5 y sha2 generan huellas."
      },
      {
        "id": "analisis-de-datos/pyspark/json-y-otros-tipos/serializar-y-consultar-json",
        "label": "Serializar y consultar JSON",
        "description": "`to_json` serializa un struct, map o array; `schema_of_json` devuelve un esquema DDL a partir de JSON literal."
      }
    ]
  },
  {
    "key": "escritura-de-datos",
    "label": "Escritura de datos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/escritura-de-datos/definicion",
        "label": "Definición",
        "description": "`DataFrame.write` configura un escritor batch. El formato, destino y modo determinan cómo se guardan los datos."
      },
      {
        "id": "analisis-de-datos/pyspark/escritura-de-datos/formatos-y-modos",
        "label": "Formatos y modos",
        "description": "`append` añade, `overwrite` reemplaza, `ignore` omite si ya existe y `errorifexists` falla si existe. `format`, `option`, `save` configuran el escritor."
      },
      {
        "id": "analisis-de-datos/pyspark/escritura-de-datos/orc-avro-y-compresion",
        "label": "ORC, Avro y compresión",
        "description": "ORC y Parquet almacenan datos por columnas; Avro por registros. El codec de compresión es una opción del formato."
      },
      {
        "id": "analisis-de-datos/pyspark/escritura-de-datos/partitionby-bucketing-y-sorting",
        "label": "partitionBy, bucketing y sorting",
        "description": "`write.partitionBy` organiza archivos en directorios según valores; bucketBy distribuye en cubetas por hash y sortBy ordena dentro de cubetas en tablas compatibles."
      }
    ]
  },
  {
    "key": "tablas-y-catalogos",
    "label": "Tablas y catálogos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/tablas-y-catalogos/definicion",
        "label": "Definición",
        "description": "Las tablas registradas en un catálogo tienen nombre, esquema y ubicación o proveedor; las gestionadas y externas difieren en quién controla los datos."
      },
      {
        "id": "analisis-de-datos/pyspark/tablas-y-catalogos/insertinto-y-saveastable",
        "label": "insertInto y saveAsTable",
        "description": "`insertInto` escribe en una tabla existente y resuelve columnas por posición; `saveAsTable` al añadir permite alinear por nombre."
      },
      {
        "id": "analisis-de-datos/pyspark/tablas-y-catalogos/dataframewriterv2",
        "label": "DataFrameWriterV2",
        "description": "`writeTo()` ofrece create, replace, createOrReplace, append y overwritePartitions para tablas y catálogos V2 que implementen esas operaciones."
      },
      {
        "id": "analisis-de-datos/pyspark/tablas-y-catalogos/merge-y-evolucion-de-esquema",
        "label": "MERGE y evolución de esquema",
        "description": "`mergeInto()` (Spark 4.0+) construye operaciones de actualización/inserción por condición; schema enforcement valida tipos y schema evolution permite cambios según el proveedor."
      },
      {
        "id": "analisis-de-datos/pyspark/tablas-y-catalogos/namespaces-y-mantenimiento",
        "label": "Namespaces y mantenimiento",
        "description": "Los namespaces agrupan tablas; listTables/tableExists consultan metadatos y refreshTable invalida datos y metadatos en caché de una tabla."
      }
    ]
  },
  {
    "key": "funciones-personalizadas",
    "label": "Funciones personalizadas",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/definicion",
        "label": "Definición",
        "description": "Una UDF permite aplicar una función Python a valores de columnas cuando no hay una expresión nativa adecuada."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/pandas-udf-y-arrow",
        "label": "Pandas UDF y Arrow",
        "description": "`pandas_udf` utiliza Series de pandas o iteradores de lotes; Arrow permite transferir datos en formato columnar."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/applyinpandas-y-mapinpandas",
        "label": "applyInPandas y mapInPandas",
        "description": "`applyInPandas` llama una función por grupo después de agrupar; `mapInPandas` procesa un iterador de lotes de pandas."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/udtf-y-tvf",
        "label": "UDTF y TVF",
        "description": "Las funciones tabulares devuelven filas, no un valor escalar. Una UDTF define lógica personalizada; una TVF expone operaciones tabulares como range."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/serializacion-y-limites-de-udf",
        "label": "Serialización y límites de UDF",
        "description": "Spark serializa funciones y variables para enviarlas a procesos Python; CloudPickle y Arrow intervienen según API. Las UDF normales cruzan la frontera JVM/Python."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/python-data-source-api",
        "label": "Python Data Source API",
        "description": "Permite registrar lectores/escritores personalizados en Python mediante DataSource, DataSourceReader y contratos de partición."
      },
      {
        "id": "analisis-de-datos/pyspark/funciones-personalizadas/mapinpandas",
        "label": "mapInPandas",
        "description": "Procesa un iterador de DataFrames de pandas por lotes y devuelve otro iterador según un esquema explícito."
      }
    ]
  },
  {
    "key": "particiones-y-shuffle",
    "label": "Particiones y shuffle",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/definicion",
        "label": "Definición",
        "description": "Una partición es una porción de datos procesable por una tarea. Shuffle redistribuye datos entre particiones, por ejemplo al agrupar o unir claves."
      },
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/repartition-coalesce-y-repartitionbyrange",
        "label": "repartition, coalesce y repartitionByRange",
        "description": "`repartition` redistribuye normalmente mediante shuffle; `coalesce` reduce particiones sin shuffle completo; `repartitionByRange` distribuye según rangos aproximados."
      },
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/narrow-y-wide-transformations",
        "label": "Narrow y wide transformations",
        "description": "Las transformaciones narrow dependen de pocas particiones de entrada, como filter; las wide necesitan redistribución, como groupBy global."
      },
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/ids-de-particiones-y-filas",
        "label": "IDs de particiones y filas",
        "description": "`spark_partition_id()` identifica la partición en la ejecución; `monotonically_increasing_id()` produce IDs crecientes únicos dentro de su evaluación, no consecutivos."
      },
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/data-skew-y-salting",
        "label": "Data skew y salting",
        "description": "Skew ocurre cuando unas claves concentran muchas filas y provocan tareas más lentas. Salting reparte claves calientes y exige una agregación posterior correcta."
      },
      {
        "id": "analisis-de-datos/pyspark/particiones-y-shuffle/coalesce-y-repartitionbyrange",
        "label": "coalesce y repartitionByRange",
        "description": "Coalesce reduce particiones con poca redistribución; repartitionByRange intenta distribuir valores de orden en rangos."
      }
    ]
  },
  {
    "key": "cache-y-checkpoint",
    "label": "Caché y checkpoint",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/cache-y-checkpoint/definicion",
        "label": "Definición",
        "description": "`cache()` y `persist()` permiten reutilizar datos calculados en memoria o disco; `unpersist()` los libera."
      },
      {
        "id": "analisis-de-datos/pyspark/cache-y-checkpoint/storage-levels",
        "label": "Storage levels",
        "description": "`persist()` permite elegir un StorageLevel; los niveles especifican memoria, disco y serialización según la API."
      },
      {
        "id": "analisis-de-datos/pyspark/cache-y-checkpoint/checkpoint-y-localcheckpoint",
        "label": "checkpoint y localCheckpoint",
        "description": "Checkpoint guarda un resultado para cortar el lineage; localCheckpoint usa almacenamiento local de executors y no ofrece igual tolerancia a fallos."
      }
    ]
  },
  {
    "key": "planes-y-optimizacion",
    "label": "Planes y optimización",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/planes-y-optimizacion/definicion",
        "label": "Definición",
        "description": "Catalyst analiza y optimiza consultas estructuradas y el plan físico indica cómo ejecutarlas. Tungsten agrupa técnicas internas de ejecución eficiente, memoria y generación de código."
      },
      {
        "id": "analisis-de-datos/pyspark/planes-y-optimizacion/estrategias-de-join-y-hints",
        "label": "Estrategias de JOIN y hints",
        "description": "Spark puede elegir broadcast hash join, sort-merge join o shuffled hash join. `broadcast()` y hints orientan el optimizador."
      },
      {
        "id": "analisis-de-datos/pyspark/planes-y-optimizacion/predicate-pushdown-y-pruning",
        "label": "Predicate pushdown y pruning",
        "description": "Pushdown intenta aplicar filtros en la fuente; column pruning lee solo columnas necesarias; partition pruning omite particiones de archivos irrelevantes."
      },
      {
        "id": "analisis-de-datos/pyspark/planes-y-optimizacion/aqe-estadisticas-y-coste",
        "label": "AQE, estadísticas y coste",
        "description": "Adaptive Query Execution modifica decisiones físicas con estadísticas de ejecución; CBO usa estadísticas de tablas. Dynamic partition pruning puede usar resultados de un join para omitir particiones."
      },
      {
        "id": "analisis-de-datos/pyspark/planes-y-optimizacion/small-files-y-tamano-de-particiones",
        "label": "Small files y tamaño de particiones",
        "description": "Muchos archivos diminutos elevan coste de metadatos y planificación; particiones muy grandes elevan memoria y duración por tarea."
      }
    ]
  },
  {
    "key": "recursos-y-observabilidad",
    "label": "Recursos y observabilidad",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/definicion",
        "label": "Definición",
        "description": "Spark UI muestra jobs, stages, tasks, almacenamiento, SQL y executors; los logs completan el diagnóstico."
      },
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/memoria-cores-y-asignacion-dinamica",
        "label": "Memoria, cores y asignación dinámica",
        "description": "Driver memory y executor memory controlan recursos distintos; cores determinan concurrencia de tasks; memory overhead contempla memoria externa al heap; dynamic allocation ajusta executors si el cluster lo permite."
      },
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/spill-gc-y-oom",
        "label": "Spill, GC y OOM",
        "description": "Spill usa disco cuando estructuras de ejecución exceden memoria disponible; garbage collection recupera objetos JVM; OOM indica memoria insuficiente en un proceso."
      },
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/retries-speculative-execution-y-event-logs",
        "label": "Retries, speculative execution y event logs",
        "description": "Spark puede reintentar tareas fallidas; la ejecución especulativa duplica tareas lentas bajo condiciones configuradas. Los event logs permiten revisar ejecuciones en History Server."
      },
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/observation-y-observe",
        "label": "Observation y observe",
        "description": "`Observation` recoge agregados de un DataFrame batch durante una acción, sin construir una consulta separada para esas métricas."
      },
      {
        "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/profiling-y-errores",
        "label": "Profiling y errores",
        "description": "El profiling identifica coste CPU o memoria de código Python; los errores de análisis suelen indicar columnas o tipos incorrectos."
      }
    ]
  },
  {
    "key": "rdd-y-spark-core",
    "label": "RDD y Spark Core",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/definicion",
        "label": "Definición",
        "description": "RDD es una colección distribuida e inmutable de objetos, con dependencias que permiten reconstruir particiones perdidas."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/map-flatmap-y-filter",
        "label": "map, flatMap y filter",
        "description": "`map` transforma cada elemento en uno; `flatMap` produce cero o varios; `filter` conserva los que cumplen una condición."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/reduce-reducebykey-y-aggregatebykey",
        "label": "reduce, reduceByKey y aggregateByKey",
        "description": "reduce combina elementos; reduceByKey combina valores de una clave; aggregateByKey admite acumuladores por clave de tipo distinto."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/groupbykey-join-y-sortbykey",
        "label": "groupByKey, join y sortByKey",
        "description": "groupByKey reúne todos los valores de cada clave; join combina pares de claves; sortByKey ordena por clave."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/mappartitions-y-foreachpartition",
        "label": "mapPartitions y foreachPartition",
        "description": "mapPartitions recibe un iterador por partición; foreachPartition ejecuta efectos secundarios por partición."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/acciones-y-lectura-de-rdd",
        "label": "Acciones y lectura de RDD",
        "description": "`collect`, `count`, `take`, `first` y `foreach` son acciones; `textFile` construye RDD de líneas."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/broadcast-variables-y-accumulators",
        "label": "Broadcast variables y accumulators",
        "description": "Una variable broadcast distribuye una copia de solo lectura; un accumulator recibe contribuciones de tareas y se consulta en driver."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/lineage-y-checkpoint-de-rdd",
        "label": "Lineage y checkpoint de RDD",
        "description": "El lineage registra transformaciones para reconstruir particiones; checkpoint puede truncar ese historial en almacenamiento fiable."
      },
      {
        "id": "analisis-de-datos/pyspark/rdd-y-spark-core/accumulators",
        "label": "Accumulators",
        "description": "Los accumulators permiten acumular métricas desde tareas y leerlas en el driver. Las contribuciones pueden verse afectadas por cómo se reejecuta la lógica."
      }
    ]
  },
  {
    "key": "etl-y-modelado",
    "label": "ETL y modelado",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/definicion",
        "label": "Definición",
        "description": "ETL extrae, transforma y carga datos; ELT carga primero y transforma en el sistema destino. Spark permite construir ambos flujos."
      },
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/cargas-incrementales-e-idempotencia",
        "label": "Cargas incrementales e idempotencia",
        "description": "Una carga incremental procesa registros nuevos o modificados; una carga idempotente puede repetirse sin duplicar resultados."
      },
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/hechos-dimensiones-y-esquema-estrella",
        "label": "Hechos, dimensiones y esquema estrella",
        "description": "La tabla de hechos guarda eventos a una granularidad; las dimensiones añaden atributos descriptivos. SCD tipo 1 reemplaza atributos; tipo 2 conserva versiones con vigencia."
      },
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/bronze-silver-y-gold",
        "label": "Bronze, Silver y Gold",
        "description": "Bronze conserva datos crudos; Silver los limpia y valida; Gold publica métricas y entidades de consumo. Son convenciones arquitectónicas, no clases de PySpark."
      },
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/data-lake-warehouse-y-lakehouse",
        "label": "Data Lake, Warehouse y Lakehouse",
        "description": "Un lake almacena datos en archivos; un warehouse ofrece datos gestionados para consulta; un lakehouse combina almacenamiento de lake con capacidades de tablas gestionadas. Delta Lake, Iceberg y Hudi son formatos o capas de tablas externas a Spark Core."
      },
      {
        "id": "analisis-de-datos/pyspark/etl-y-modelado/cohortes-retencion-y-metricas-temporales",
        "label": "Cohortes, retención y métricas temporales",
        "description": "Una cohorte agrupa entidades por fecha de inicio; retención mide actividad posterior. Funnels miden avance entre eventos definidos."
      }
    ]
  },
  {
    "key": "testing-y-depuracion",
    "label": "Testing y depuración",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/testing-y-depuracion/definicion",
        "label": "Definición",
        "description": "Las pruebas de DataFrames comparan datos y esquema usando conjuntos pequeños con resultados conocidos. Las pruebas de integración comprueban fuentes y destinos reales de prueba."
      },
      {
        "id": "analisis-de-datos/pyspark/testing-y-depuracion/assertschemaequal",
        "label": "assertSchemaEqual",
        "description": "Compara la estructura del esquema; algunas opciones permiten ignorar nulabilidad, nombres u orden según la versión."
      },
      {
        "id": "analisis-de-datos/pyspark/testing-y-depuracion/reglas-de-negocio-y-regresion",
        "label": "Reglas de negocio y regresión",
        "description": "Una prueba de regresión protege comportamientos acordados frente a cambios; una validación de datos comprueba condiciones sobre una ejecución."
      },
      {
        "id": "analisis-de-datos/pyspark/testing-y-depuracion/excepciones-y-compatibilidad",
        "label": "Excepciones y compatibilidad",
        "description": "PySparkException agrupa errores de PySpark; AnalysisException indica problemas de análisis, PythonException fallos de código Python remoto y StreamingQueryException fallos de streaming."
      }
    ]
  },
  {
    "key": "despliegue-y-ecosistema",
    "label": "Despliegue y ecosistema",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/definicion",
        "label": "Definición",
        "description": "Spark puede ejecutarse localmente o en clusters gestionados por Standalone, YARN o Kubernetes. Plataformas como Databricks, EMR, Glue, Dataproc, Synapse y Fabric proporcionan entornos gestionados con restricciones propias."
      },
      {
        "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/spark-submit-y-dependencias",
        "label": "spark-submit y dependencias",
        "description": "spark-submit lanza aplicaciones y configura master, recursos, paquetes JVM y archivos Python. En modo cluster el driver se ejecuta en infraestructura del cluster según el gestor."
      },
      {
        "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/almacenamiento-distribuido",
        "label": "Almacenamiento distribuido",
        "description": "HDFS, S3, ADLS y GCS requieren conectores, credenciales y URIs adecuados. El catálogo y Hive Metastore gestionan metadatos, no necesariamente los datos físicos."
      },
      {
        "id": "analisis-de-datos/pyspark/despliegue-y-ecosistema/orquestacion-y-seguridad",
        "label": "Orquestación y seguridad",
        "description": "Airflow u otro orquestador programa dependencias, reintentos y monitoreo; Spark ejecuta transformaciones. Autenticación y permisos controlan acceso a recursos."
      }
    ]
  },
  {
    "key": "structured-streaming",
    "label": "Structured Streaming",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/definicion",
        "label": "Definición",
        "description": "Structured Streaming procesa continuamente fuentes no acotadas utilizando operaciones DataFrame incrementales y un motor que normalmente ejecuta micro-batches."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/readstream-writestream-y-triggers",
        "label": "readStream, writeStream y triggers",
        "description": "readStream declara fuente; writeStream configura destino, modo y trigger. availableNow procesa datos disponibles y termina si la fuente lo admite."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/modos-de-salida",
        "label": "Modos de salida",
        "description": "append publica filas nuevas finalizadas; update publica filas modificadas; complete publica toda la tabla de resultados. No todas las combinaciones de operación y sink son compatibles."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/fuentes-y-sinks-kafka-y-archivos",
        "label": "Fuentes y sinks: Kafka y archivos",
        "description": "Kafka proporciona mensajes con key, value y metadatos; los archivos permiten lectura incremental con esquema fijo. Los sinks escriben archivos, Kafka u otros destinos compatibles."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/event-time-y-processing-time",
        "label": "Event time y processing time",
        "description": "Event time es cuándo sucedió el evento; processing time es cuándo Spark lo procesa. Las ventanas temporales suelen basarse en event time."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/ventanas-tumbling-sliding-y-session",
        "label": "Ventanas tumbling, sliding y session",
        "description": "Tumbling usa intervalos fijos sin solapamiento; sliding permite solapamiento; session agrupa eventos separados por menos de un intervalo de inactividad."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/watermarks-y-datos-tardios",
        "label": "Watermarks y datos tardíos",
        "description": "`withWatermark` establece un umbral basado en el tiempo de evento observado para acotar estado y permitir finalizar ciertas agregaciones."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/deduplicacion-con-watermark",
        "label": "Deduplicación con watermark",
        "description": "`dropDuplicatesWithinWatermark()` elimina duplicados por claves dentro del horizonte de watermark; el estado no crece indefinidamente para eventos antiguos."
      },
      {
        "id": "analisis-de-datos/pyspark/structured-streaming/session-windows",
        "label": "Session windows",
        "description": "`session_window` crea grupos de eventos por intervalos de inactividad, con una duración de separación fija o derivada de una expresión."
      }
    ]
  },
  {
    "key": "estado-y-operacion-streaming",
    "label": "Estado y operación de streaming",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/definicion",
        "label": "Definición",
        "description": "Las operaciones con estado mantienen información entre micro-batches; el checkpoint conserva progreso y estado necesario para recuperación según la consulta."
      },
      {
        "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/stream-static-y-stream-stream-joins",
        "label": "Stream-static y stream-stream joins",
        "description": "Una unión stream-static enriquece eventos con una tabla fija. Una stream-stream requiere mantener estado y, para acotarlo según el tipo de join, condiciones temporales y watermarks."
      },
      {
        "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/foreachbatch-e-idempotencia",
        "label": "foreachBatch e idempotencia",
        "description": "foreachBatch ejecuta una función por micro-batch con un DataFrame batch y batch_id. Permite destinos personalizados, incluyendo upsert."
      },
      {
        "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/control-y-monitoreo",
        "label": "Control y monitoreo",
        "description": "StreamingQuery expone isActive, lastProgress, recentProgress, status, awaitTermination, processAllAvailable y stop; StreamingQueryListener recibe eventos."
      },
      {
        "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/state-stores-y-estado-personalizado",
        "label": "State stores y estado personalizado",
        "description": "State stores mantienen datos por clave. `StatefulProcessor` con `transformWithStateInPandas()` implementa lógica de estado personalizada con ciclo de vida, temporizadores y estado tipado."
      }
    ]
  },
  {
    "key": "pandas-y-pandas-api-on-spark",
    "label": "Pandas y pandas API on Spark",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/definicion",
        "label": "Definición",
        "description": "`toPandas()` materializa datos en pandas local; pandas API on Spark ofrece una interfaz similar a pandas sobre ejecución distribuida."
      },
      {
        "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/dataframe-series-e-index",
        "label": "DataFrame, Series e Index",
        "description": "La API pandas on Spark usa DataFrame, Series e Index (incluido MultiIndex), con semántica de alineación de índices. `pandas_api()` y `to_spark()` convierten entre APIs."
      },
      {
        "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/filtros-groupby-y-remodelacion",
        "label": "Filtros, groupby y remodelación",
        "description": "La API ofrece selección, asignación, groupby/agg, transform, pivot, melt, stack y unstack. Algunos comportamientos no son idénticos a pandas local."
      },
      {
        "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/series-temporales-y-rendimiento",
        "label": "Series temporales y rendimiento",
        "description": "resample, rolling y expanding permiten calcular por frecuencia o ventana; el coste depende del índice y del plan de Spark. get_option y set_option consultan o ajustan opciones."
      }
    ]
  },
  {
    "key": "spark-connect",
    "label": "Spark Connect",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/spark-connect/definicion",
        "label": "Definición",
        "description": "Spark Connect separa cliente Python y servidor Spark mediante un protocolo remoto basado en gRPC y Protocol Buffers. El servidor ejecuta los planes de DataFrame."
      },
      {
        "id": "analisis-de-datos/pyspark/spark-connect/sesiones-y-compatibilidad",
        "label": "Sesiones y compatibilidad",
        "description": "El servidor mantiene sesiones lógicas y catálogos; el cliente envía planes. La disponibilidad de métodos depende de las versiones del cliente y del servidor."
      }
    ]
  },
  {
    "key": "pipelines-declarativos",
    "label": "Pipelines declarativos",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/pipelines-declarativos/definicion",
        "label": "Definición",
        "description": "Spark Declarative Pipelines (SDP) define datasets y dependencias como funciones, delegando al motor la planificación del flujo batch/streaming. En Apache Spark se incorpora en 4.1."
      },
      {
        "id": "analisis-de-datos/pyspark/pipelines-declarativos/streaming-tables-temporary-views-y-flows",
        "label": "Streaming tables, temporary views y flows",
        "description": "Una streaming table recibe flujos incrementales; una materialized view deriva de una consulta batch; una temporary_view organiza cálculos internos. Un flow define escritura hacia un destino."
      },
      {
        "id": "analisis-de-datos/pyspark/pipelines-declarativos/cli-y-validacion",
        "label": "CLI y validación",
        "description": "`spark-pipelines init`, `run` y `dry-run` inicializan, ejecutan o validan un proyecto SDP. La configuración fija código, catálogo y destinos."
      },
      {
        "id": "analisis-de-datos/pyspark/pipelines-declarativos/vista-temporal-y-dependencias",
        "label": "Vista temporal y dependencias",
        "description": "Una temporary_view declara una consulta intermedia que puede reutilizarse en otros datasets del pipeline; no se publica como tabla persistente."
      }
    ]
  },
  {
    "key": "mllib-preparacion",
    "label": "MLlib: preparación y pipelines",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/mllib-preparacion/definicion",
        "label": "Definición",
        "description": "MLlib ofrece aprendizaje automático distribuido; la API principal utiliza DataFrames (`pyspark.ml`). Un Transformer transforma filas y un Estimator aprende un modelo con fit."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-preparacion/stringindexer-y-onehotencoder",
        "label": "StringIndexer y OneHotEncoder",
        "description": "StringIndexer convierte categorías en índices; OneHotEncoder crea vectores de indicadores. Ajusta ambos con entrenamiento y define tratamiento de categorías desconocidas."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-preparacion/escalamiento",
        "label": "Escalamiento",
        "description": "StandardScaler centra opcionalmente y escala por desviación estándar; MinMaxScaler lleva características a un intervalo (por defecto 0–1)."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-preparacion/pipeline-estimator-y-transformer",
        "label": "Pipeline, Estimator y Transformer",
        "description": "Pipeline encadena etapas de preparación y entrenamiento; `fit()` ajusta estimadores y `transform()` aplica el PipelineModel resultante."
      }
    ]
  },
  {
    "key": "mllib-modelos",
    "label": "MLlib: modelos y evaluación",
    "children": [
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/definicion",
        "label": "Definición",
        "description": "Spark ML incluye algoritmos de regresión, clasificación y clustering. La elección depende del objetivo y de los datos, no de una función universal."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/clasificacion-y-arboles",
        "label": "Clasificación y árboles",
        "description": "LogisticRegression, DecisionTreeClassifier, RandomForestClassifier y GBTClassifier aprenden clases. Hay variantes de regresión de varios de estos modelos."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/clustering",
        "label": "Clustering",
        "description": "KMeans agrupa vectores por cercanía a centros; el identificador numérico de cluster no representa una jerarquía."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/evaluadores-y-metricas",
        "label": "Evaluadores y métricas",
        "description": "RegressionEvaluator calcula RMSE/MAE/R²; BinaryClassificationEvaluator calcula AUC; MulticlassClassificationEvaluator admite accuracy y F1, entre otras métricas."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/crossvalidator-y-trainvalidationsplit",
        "label": "CrossValidator y TrainValidationSplit",
        "description": "ParamGridBuilder construye combinaciones de hiperparámetros; CrossValidator usa varios folds y TrainValidationSplit una separación para validación."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/guardar-y-cargar-modelos",
        "label": "Guardar y cargar modelos",
        "description": "Los modelos y PipelineModel pueden persistirse mediante write/save y recuperarse con load de la clase correspondiente."
      },
      {
        "id": "analisis-de-datos/pyspark/mllib-modelos/ajuste-con-validacion-cruzada",
        "label": "Ajuste con validación cruzada",
        "description": "CrossValidator ejecuta entrenamiento y evaluación por folds y parámetros; TrainValidationSplit hace una sola división de validación."
      }
    ]
  }
];
