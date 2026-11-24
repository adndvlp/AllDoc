// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const snowflakeCurriculum = [
  {
    "key": "arquitectura",
    "label": "Arquitectura",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/arquitectura/definicion",
        "label": "Definición",
        "description": "Snowflake separa los datos persistentes, el cómputo y los servicios de control para que puedan administrarse independientemente."
      },
      {
        "id": "analisis-de-datos/snowflake/arquitectura/storage",
        "label": "Storage",
        "description": "El almacenamiento conserva los datos de las tablas estándar en un formato columnar administrado por Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/arquitectura/compute-y-cloud-services",
        "label": "Compute y Cloud Services",
        "description": "Compute aporta CPU y memoria para procesar; Cloud Services coordina autenticación, catálogo, optimización y otros servicios."
      },
      {
        "id": "analisis-de-datos/snowflake/arquitectura/organizacion-y-nube",
        "label": "Organización y nube",
        "description": "Una organización agrupa cuentas; cada cuenta pertenece a una región y plataforma cloud (AWS, Azure o Google Cloud)."
      },
      {
        "id": "analisis-de-datos/snowflake/arquitectura/micro-partitions",
        "label": "Micro-partitions",
        "description": "Snowflake divide automáticamente los datos de tablas estándar en unidades físicas columnares con metadatos."
      }
    ]
  },
  {
    "key": "contexto-y-snowsight",
    "label": "Contexto y Snowsight",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/definicion",
        "label": "Definición",
        "description": "Una sesión conserva el rol, warehouse, base y esquema que se usan al resolver nombres y ejecutar operaciones."
      },
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/database-y-schema",
        "label": "Database y Schema",
        "description": "Una base contiene esquemas; un esquema contiene objetos como tablas y vistas."
      },
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/use-role-y-use-warehouse",
        "label": "USE ROLE y USE WAREHOUSE",
        "description": "USE cambia el rol o warehouse activo y también permite seleccionar base y esquema."
      },
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/identificadores-y-mayusculas",
        "label": "Identificadores y mayúsculas",
        "description": "Los nombres sin comillas dobles se normalizan a mayúsculas; entre comillas conservan su escritura por defecto."
      },
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/snowsight-y-worksheets",
        "label": "Snowsight y Worksheets",
        "description": "Snowsight permite explorar objetos, ejecutar SQL y revisar resultados e historial."
      },
      {
        "id": "analisis-de-datos/snowflake/contexto-y-snowsight/notebooks",
        "label": "Notebooks",
        "description": "Los notebooks combinan celdas SQL, Python y texto para análisis reproducible."
      }
    ]
  },
  {
    "key": "virtual-warehouses",
    "label": "Virtual Warehouses",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/virtual-warehouses/definicion",
        "label": "Definición",
        "description": "Un virtual warehouse es un recurso de cómputo independiente que ejecuta consultas, cargas y DML."
      },
      {
        "id": "analisis-de-datos/snowflake/virtual-warehouses/sizing-y-scale-up",
        "label": "Sizing y scale up",
        "description": "Aumentar el tamaño asigna más recursos a cada clúster para cargas que lo necesitan."
      },
      {
        "id": "analisis-de-datos/snowflake/virtual-warehouses/auto-suspend-y-auto-resume",
        "label": "Auto-suspend y auto-resume",
        "description": "La suspensión automática detiene el cómputo tras inactividad; la reanudación automática lo activa cuando una operación lo requiere."
      },
      {
        "id": "analisis-de-datos/snowflake/virtual-warehouses/scale-out-y-multi-cluster",
        "label": "Scale out y multi-cluster",
        "description": "Un warehouse multi-cluster puede añadir clústeres para atender consultas concurrentes."
      },
      {
        "id": "analisis-de-datos/snowflake/virtual-warehouses/suspender-y-reanudar",
        "label": "Suspender y reanudar",
        "description": "SUSPEND y RESUME permiten controlar manualmente el estado del warehouse."
      }
    ]
  },
  {
    "key": "select-y-filtros",
    "label": "SELECT y filtros",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/definicion",
        "label": "Definición",
        "description": "SELECT elige columnas o expresiones; FROM indica la fuente, WHERE filtra filas."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/alias-y-comentarios",
        "label": "Alias y comentarios",
        "description": "AS asigna un nombre al resultado; los comentarios -- y /* */ documentan consultas."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/select-exclude-replace-y-rename",
        "label": "SELECT EXCLUDE, REPLACE y RENAME",
        "description": "Snowflake amplía SELECT * para excluir, sustituir expresiones o renombrar columnas del resultado."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/operadores-and-or-not",
        "label": "Operadores AND, OR, NOT",
        "description": "Los operadores lógicos combinan condiciones; AND tiene precedencia sobre OR."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/in-y-between",
        "label": "IN y BETWEEN",
        "description": "IN compara con una lista; BETWEEN incluye ambos límites."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/like-ilike-y-patrones",
        "label": "LIKE, ILIKE y patrones",
        "description": "LIKE compara patrones sensibles a mayúsculas; ILIKE ignora esa diferencia. % representa cero o más caracteres y _ uno."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/order-by-limit-y-offset",
        "label": "ORDER BY, LIMIT y OFFSET",
        "description": "ORDER BY ordena el resultado; LIMIT limita filas y OFFSET omite las primeras."
      },
      {
        "id": "analisis-de-datos/snowflake/select-y-filtros/distinct",
        "label": "DISTINCT",
        "description": "DISTINCT elimina combinaciones de valores repetidas del resultado."
      }
    ]
  },
  {
    "key": "null-y-condicionales",
    "label": "NULL y condicionales",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/null-y-condicionales/definicion",
        "label": "Definición",
        "description": "NULL representa un valor ausente o desconocido; una condición puede ser TRUE, FALSE o UNKNOWN."
      },
      {
        "id": "analisis-de-datos/snowflake/null-y-condicionales/is-not-null-e-igualdad-segura",
        "label": "IS NOT NULL e igualdad segura",
        "description": "IS NOT NULL descarta ausentes; IS NOT DISTINCT FROM compara también dos NULL como iguales."
      },
      {
        "id": "analisis-de-datos/snowflake/null-y-condicionales/coalesce-nvl-y-nullif",
        "label": "COALESCE, NVL y NULLIF",
        "description": "COALESCE elige el primer valor no nulo, NVL ofrece dos alternativas y NULLIF devuelve NULL si dos valores son iguales."
      },
      {
        "id": "analisis-de-datos/snowflake/null-y-condicionales/case-e-iff",
        "label": "CASE e IFF",
        "description": "CASE elige entre varias condiciones; IFF(condición, valor_si_true, otro) resuelve dos ramas."
      }
    ]
  },
  {
    "key": "tipos-y-conversiones",
    "label": "Tipos y conversiones",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/tipos-y-conversiones/definicion",
        "label": "Definición",
        "description": "Los tipos definen cómo se almacenan e interpretan valores; convertir explícitamente evita ambigüedades."
      },
      {
        "id": "analisis-de-datos/snowflake/tipos-y-conversiones/number-float-varchar-boolean",
        "label": "NUMBER, FLOAT, VARCHAR, BOOLEAN",
        "description": "NUMBER representa números de precisión fija, FLOAT aproximados, VARCHAR texto y BOOLEAN valores lógicos."
      },
      {
        "id": "analisis-de-datos/snowflake/tipos-y-conversiones/cast-y-try-cast",
        "label": "CAST, :: y TRY_CAST",
        "description": "CAST y :: convierten tipos; TRY_CAST devuelve NULL para conversiones admitidas que fallan."
      },
      {
        "id": "analisis-de-datos/snowflake/tipos-y-conversiones/date-y-timestamp",
        "label": "DATE y TIMESTAMP",
        "description": "DATE representa un día; TIMESTAMP_NTZ no guarda zona, LTZ usa zona de sesión al mostrar y TZ conserva un offset."
      }
    ]
  },
  {
    "key": "funciones-de-texto-y-numeros",
    "label": "Funciones de texto y números",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/definicion",
        "label": "Definición",
        "description": "Las funciones escalares calculan un valor por fila, sin agrupar el resultado."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/upper-lower-length-y-trim",
        "label": "UPPER, LOWER, LENGTH y TRIM",
        "description": "Cambian capitalización, miden caracteres y eliminan espacios de los extremos."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/substring-replace-y-concat",
        "label": "SUBSTRING, REPLACE y CONCAT",
        "description": "SUBSTRING extrae parte del texto, REPLACE sustituye apariciones y CONCAT une cadenas."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/split-y-regexp",
        "label": "SPLIT y REGEXP",
        "description": "SPLIT devuelve un ARRAY; REGEXP_LIKE prueba una expresión regular y REGEXP_REPLACE transforma coincidencias."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-texto-y-numeros/round-abs-ceil-floor-y-mod",
        "label": "ROUND, ABS, CEIL, FLOOR y MOD",
        "description": "Redondean, obtienen magnitud, techo, piso y residuo."
      }
    ]
  },
  {
    "key": "fechas-y-series-temporales",
    "label": "Fechas y series temporales",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/definicion",
        "label": "Definición",
        "description": "Las funciones de fechas extraen componentes, agrupan periodos y calculan diferencias."
      },
      {
        "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/year-month-y-extract",
        "label": "YEAR, MONTH y EXTRACT",
        "description": "Extraen componentes de una fecha; EXTRACT permite elegir la unidad."
      },
      {
        "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/dateadd-datediff-y-current-date",
        "label": "DATEADD, DATEDIFF y CURRENT_DATE",
        "description": "DATEADD desplaza una fecha; DATEDIFF mide la diferencia en la unidad elegida; CURRENT_DATE usa la zona de sesión."
      },
      {
        "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/date-trunc-time-slice-y-to-char",
        "label": "DATE_TRUNC, TIME_SLICE y TO_CHAR",
        "description": "DATE_TRUNC baja a una unidad; TIME_SLICE asigna intervalos regulares; TO_CHAR formatea texto."
      },
      {
        "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/rangos-de-fechas",
        "label": "Rangos de fechas",
        "description": "Los filtros semiabiertos incluyen el comienzo y excluyen el inicio del periodo siguiente."
      }
    ]
  },
  {
    "key": "agregacion-y-group-by",
    "label": "Agregación y GROUP BY",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/definicion",
        "label": "Definición",
        "description": "Una agregación reduce varias filas a un valor; GROUP BY define grupos sobre los que se calcula."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/count-y-count-distinct",
        "label": "COUNT y COUNT DISTINCT",
        "description": "COUNT(*) cuenta filas, COUNT(columna) cuenta valores no nulos y COUNT(DISTINCT columna) cuenta distintos no nulos."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/sum-avg-min-y-max",
        "label": "SUM, AVG, MIN y MAX",
        "description": "Suman, promedian y encuentran extremos, ignorando NULL."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/count-if-y-agregacion-condicional",
        "label": "COUNT_IF y agregación condicional",
        "description": "COUNT_IF cuenta condiciones verdaderas; SUM de CASE permite construir métricas condicionadas."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/listagg",
        "label": "LISTAGG",
        "description": "LISTAGG concatena valores en un grupo como texto y WITHIN GROUP fija el orden."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/having-y-group-by-all",
        "label": "HAVING y GROUP BY ALL",
        "description": "HAVING filtra grupos; GROUP BY ALL agrupa por las expresiones no agregadas del SELECT."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/rollup-cube-y-grouping-sets",
        "label": "ROLLUP, CUBE y GROUPING SETS",
        "description": "Generan subtotales por distintas combinaciones de dimensiones; GROUPING identifica columnas agregadas a un nivel superior."
      },
      {
        "id": "analisis-de-datos/snowflake/agregacion-y-group-by/median-percentiles-y-aproximaciones",
        "label": "MEDIAN, percentiles y aproximaciones",
        "description": "MEDIAN obtiene el centro; PERCENTILE_CONT interpola un percentil; APPROX_COUNT_DISTINCT estima cardinalidad."
      }
    ]
  },
  {
    "key": "join-y-cardinalidad",
    "label": "JOIN y cardinalidad",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/definicion",
        "label": "Definición",
        "description": "JOIN combina filas según una condición; el número de coincidencias determina cuántas filas genera."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/inner-join-on-y-using",
        "label": "INNER JOIN, ON y USING",
        "description": "INNER JOIN devuelve coincidencias; USING simplifica la igualdad cuando las columnas tienen el mismo nombre."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/left-right-y-full-outer-join",
        "label": "LEFT, RIGHT y FULL OUTER JOIN",
        "description": "Los joins externos conservan filas sin coincidencia del lado elegido (o de ambos lados en FULL)."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/anti-join-y-semi-join",
        "label": "Anti join y semi join",
        "description": "Un anti join busca filas sin coincidencia; un semi join comprueba existencia sin multiplicar filas."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/filtros-en-on-y-where",
        "label": "Filtros en ON y WHERE",
        "description": "En un LEFT JOIN un filtro en ON limita coincidencias sin eliminar la fila izquierda; en WHERE puede eliminarla."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/cross-join-y-self-join",
        "label": "CROSS JOIN y self join",
        "description": "CROSS JOIN combina cada fila con todas las de la otra fuente; self join une una tabla consigo misma mediante alias."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/join-multiple-y-granularidad",
        "label": "JOIN múltiple y granularidad",
        "description": "Cada join puede cambiar la granularidad: pedido, línea o cliente."
      },
      {
        "id": "analisis-de-datos/snowflake/join-y-cardinalidad/asof-join",
        "label": "ASOF JOIN",
        "description": "Busca la fila temporal más cercana de la derecha que satisface la dirección definida en MATCH_CONDITION."
      }
    ]
  },
  {
    "key": "subconsultas-conjuntos-y-cte",
    "label": "Subconsultas, conjuntos y CTE",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/definicion",
        "label": "Definición",
        "description": "Una consulta puede consumir el resultado de otra mediante subconsultas, CTE o tablas derivadas."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/subconsulta-escalar-y-correlacionada",
        "label": "Subconsulta escalar y correlacionada",
        "description": "Una escalar devuelve un único valor; una correlacionada depende de la fila exterior."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/in-exists-any-y-all",
        "label": "IN, EXISTS, ANY y ALL",
        "description": "IN verifica pertenencia, EXISTS existencia, ANY/SOME al menos una comparación y ALL todas las comparaciones."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/cte-y-multiples-with",
        "label": "CTE y múltiples WITH",
        "description": "WITH define resultados con nombre para una sola sentencia; los CTE posteriores pueden leer los anteriores."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/cte-recursivo-y-connect-by",
        "label": "CTE recursivo y CONNECT BY",
        "description": "Un CTE recursivo usa un término inicial y otro que consume la iteración anterior; CONNECT BY permite recorrer jerarquías."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/union-union-all-y-by-name",
        "label": "UNION, UNION ALL y BY NAME",
        "description": "UNION elimina duplicados; UNION ALL los conserva; BY NAME alinea columnas por nombre en Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/subconsultas-conjuntos-y-cte/intersect-y-except",
        "label": "INTERSECT y EXCEPT",
        "description": "INTERSECT conserva filas compartidas; EXCEPT (MINUS) conserva las de la izquierda que no están a la derecha."
      }
    ]
  },
  {
    "key": "funciones-de-ventana-y-qualify",
    "label": "Funciones de ventana y QUALIFY",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/definicion",
        "label": "Definición",
        "description": "Una ventana calcula sobre filas relacionadas sin colapsarlas como GROUP BY."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/partition-by-y-order-by",
        "label": "PARTITION BY y ORDER BY",
        "description": "PARTITION BY separa ventanas; ORDER BY establece el orden del cálculo dentro de cada una."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/row-number-rank-y-dense-rank",
        "label": "ROW_NUMBER, RANK y DENSE_RANK",
        "description": "ROW_NUMBER da posiciones únicas; RANK comparte puestos con saltos; DENSE_RANK comparte puestos sin saltos."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/lag-lead-y-first-value",
        "label": "LAG, LEAD y FIRST_VALUE",
        "description": "LAG/LEAD leen filas anteriores/siguientes; FIRST_VALUE obtiene el primer valor del marco."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/last-value-y-marcos-rows-range",
        "label": "LAST_VALUE y marcos ROWS/RANGE",
        "description": "ROWS cuenta filas físicas de la ventana; RANGE agrupa por valores del orden; LAST_VALUE lee el último valor del marco."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/promedio-movil",
        "label": "Promedio móvil",
        "description": "Un marco acotado aplica una agregación a las últimas filas o a un intervalo."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/ntile-percent-rank-y-cume-dist",
        "label": "NTILE, PERCENT_RANK y CUME_DIST",
        "description": "NTILE divide filas en cubetas; PERCENT_RANK mide posición relativa y CUME_DIST proporción acumulada de filas."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/qualify",
        "label": "QUALIFY",
        "description": "QUALIFY filtra después de calcular las funciones de ventana, sin requerir un CTE adicional."
      },
      {
        "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/ratio-to-report",
        "label": "RATIO_TO_REPORT",
        "description": "Calcula el valor de una fila dividido por la suma de su partición."
      }
    ]
  },
  {
    "key": "transformaciones-y-utilidades-sql",
    "label": "Transformaciones y utilidades SQL",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/definicion",
        "label": "Definición",
        "description": "Las transformaciones reorganizan resultados, generan filas o reutilizan salidas sin cambiar necesariamente tablas fuente."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/pivot",
        "label": "PIVOT",
        "description": "PIVOT convierte valores de una dimensión en columnas mediante una agregación."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/unpivot",
        "label": "UNPIVOT",
        "description": "UNPIVOT transforma columnas en filas de atributo y valor; por defecto excluye NULL."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/tablesample",
        "label": "TABLESAMPLE",
        "description": "SAMPLE/TABLESAMPLE obtiene una muestra por filas o bloques según el método."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/result-scan-y-last-query-id",
        "label": "RESULT_SCAN y LAST_QUERY_ID",
        "description": "RESULT_SCAN permite consultar un resultado previo autorizado, normalmente hasta 24 horas después."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/match-recognize",
        "label": "MATCH_RECOGNIZE",
        "description": "Busca patrones de secuencias de filas con PARTITION BY, ORDER BY, PATTERN y DEFINE."
      },
      {
        "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/orden-logico-y-fisico",
        "label": "Orden lógico y físico",
        "description": "FROM/JOIN, WHERE, GROUP BY, HAVING, ventanas, QUALIFY, DISTINCT, ORDER BY y LIMIT describen el procesamiento lógico; el optimizador decide el plan real."
      }
    ]
  },
  {
    "key": "objetos-y-ddl",
    "label": "Objetos y DDL",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/definicion",
        "label": "Definición",
        "description": "DDL define objetos de la base de datos; CREATE, ALTER y DROP cambian su estructura."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/create-alter-drop-y-truncate",
        "label": "CREATE, ALTER, DROP y TRUNCATE",
        "description": "CREATE crea objetos, ALTER modifica estructura, DROP elimina el objeto y TRUNCATE vacía sus filas."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/permanent-temporary-y-transient",
        "label": "Permanent, Temporary y Transient",
        "description": "Las permanentes persisten y tienen protección de recuperación; las temporales viven en la sesión y las transient persisten sin Fail-safe."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/primary-key-foreign-key-y-unique",
        "label": "PRIMARY KEY, FOREIGN KEY y UNIQUE",
        "description": "En tablas estándar PK, FK y UNIQUE describen relaciones pero no se comprueban automáticamente; las tablas hybrid sí aplican esas restricciones."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/not-null-default-y-check",
        "label": "NOT NULL, DEFAULT y CHECK",
        "description": "NOT NULL impide ausentes, DEFAULT asigna un valor omitido y CHECK impone condiciones en tablas estándar compatibles con la funcionalidad actual."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/sequences-nextval-e-identity",
        "label": "Sequences, NEXTVAL e IDENTITY",
        "description": "Las secuencias y las columnas IDENTITY/AUTOINCREMENT generan identificadores numéricos."
      },
      {
        "id": "analisis-de-datos/snowflake/objetos-y-ddl/show-describe-y-get-ddl",
        "label": "SHOW, DESCRIBE y GET_DDL",
        "description": "SHOW lista objetos visibles, DESCRIBE muestra estructura y GET_DDL devuelve SQL de definición."
      }
    ]
  },
  {
    "key": "dml-y-transacciones",
    "label": "DML y transacciones",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/dml-y-transacciones/definicion",
        "label": "Definición",
        "description": "DML modifica filas; INSERT agrega, UPDATE cambia, DELETE elimina y MERGE combina operaciones según coincidencia."
      },
      {
        "id": "analisis-de-datos/snowflake/dml-y-transacciones/insert-update-y-delete",
        "label": "INSERT, UPDATE y DELETE",
        "description": "INSERT agrega filas; UPDATE y DELETE actúan sobre las filas que cumplen WHERE."
      },
      {
        "id": "analisis-de-datos/snowflake/dml-y-transacciones/merge-y-upsert",
        "label": "MERGE y upsert",
        "description": "MERGE modifica o inserta registros según una clave de coincidencia; también puede eliminar con una rama adecuada."
      },
      {
        "id": "analisis-de-datos/snowflake/dml-y-transacciones/begin-commit-y-rollback",
        "label": "BEGIN, COMMIT y ROLLBACK",
        "description": "BEGIN inicia una transacción explícita; COMMIT confirma sus cambios y ROLLBACK los deshace."
      },
      {
        "id": "analisis-de-datos/snowflake/dml-y-transacciones/autocommit-y-aislamiento",
        "label": "AUTOCOMMIT y aislamiento",
        "description": "AUTOCOMMIT confirma sentencias fuera de una transacción explícita por defecto; Snowflake emplea READ COMMITTED en tablas estándar."
      }
    ]
  },
  {
    "key": "vistas-y-tablas-especializadas",
    "label": "Vistas y tablas especializadas",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/definicion",
        "label": "Definición",
        "description": "Una vista almacena una definición de consulta y una tabla almacena datos; hay variantes para necesidades de acceso, frescura y compatibilidad."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/secure-views",
        "label": "Secure Views",
        "description": "Una secure view reduce la exposición de su definición y de ciertos detalles internos ante consumidores no propietarios."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/materialized-views",
        "label": "Materialized Views",
        "description": "Una vista materializada mantiene resultados persistidos para consultas compatibles y requiere mantenimiento automático."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/external-tables",
        "label": "External Tables",
        "description": "Una external table expone archivos externos mediante metadatos, sin cargar las filas a una tabla estándar de Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/hybrid-tables-e-indices",
        "label": "Hybrid Tables e índices",
        "description": "Hybrid Tables están orientadas a cargas operativas de baja latencia y aplican PK/FK/UNIQUE; admiten índices secundarios."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/iceberg-external-volumes-y-catalogo",
        "label": "Iceberg, External Volumes y catálogo",
        "description": "Iceberg es un formato abierto de tablas; un external volume autoriza almacenamiento de nube y una catalog integration conecta catálogos compatibles cuando procede."
      },
      {
        "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/delta-direct",
        "label": "Delta Direct",
        "description": "Permite consultar datos Delta Lake mediante las opciones de interoperabilidad de Snowflake compatibles con ese formato."
      }
    ]
  },
  {
    "key": "time-travel-y-clonacion",
    "label": "Time Travel y clonación",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/definicion",
        "label": "Definición",
        "description": "Time Travel permite consultar estados históricos y restaurar objetos dentro de su retención configurada."
      },
      {
        "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/at-y-before",
        "label": "AT y BEFORE",
        "description": "AT consulta un instante histórico; BEFORE recupera el estado anterior a un punto o sentencia."
      },
      {
        "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/undrop",
        "label": "UNDROP",
        "description": "UNDROP recupera objetos eliminados durante el periodo de Time Travel."
      },
      {
        "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/zero-copy-cloning",
        "label": "Zero-copy Cloning",
        "description": "CLONE crea una copia lógica de un objeto compatible compartiendo inicialmente almacenamiento, hasta que las modificaciones divergen."
      },
      {
        "id": "analisis-de-datos/snowflake/time-travel-y-clonacion/fail-safe",
        "label": "Fail-safe",
        "description": "Fail-safe ofrece recuperación gestionada por Snowflake después de Time Travel para datos elegibles de tablas permanentes."
      }
    ]
  },
  {
    "key": "variables-y-snowflake-scripting",
    "label": "Variables y Snowflake Scripting",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/definicion",
        "label": "Definición",
        "description": "Las variables permiten reutilizar valores y Snowflake Scripting añade bloques procedimentales al SQL."
      },
      {
        "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/identifier-y-sql-dinamico",
        "label": "IDENTIFIER y SQL dinámico",
        "description": "IDENTIFIER interpreta una variable como nombre de objeto; EXECUTE IMMEDIATE ejecuta una sentencia construida o almacenada."
      },
      {
        "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/bloques-variables-y-if",
        "label": "Bloques, variables y IF",
        "description": "Un bloque SQL Scripting declara variables, ejecuta sentencias y puede devolver un valor."
      },
      {
        "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/bucles-cursores-y-excepciones",
        "label": "Bucles, cursores y excepciones",
        "description": "FOR permite recorrer intervalos o resultados; un cursor recorre filas; EXCEPTION maneja errores previstos."
      },
      {
        "id": "analisis-de-datos/snowflake/variables-y-snowflake-scripting/execute-immediate-y-binds",
        "label": "EXECUTE IMMEDIATE y binds",
        "description": "USING suministra parámetros a SQL dinámico sin interpolarlos como texto."
      }
    ]
  },
  {
    "key": "stages-y-formatos-de-archivos",
    "label": "Stages y formatos de archivos",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/definicion",
        "label": "Definición",
        "description": "Un stage es una ubicación de archivos para importar, exportar o procesar datos."
      },
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/user-table-y-named-stage",
        "label": "User, Table y Named Stage",
        "description": "@~ identifica el stage del usuario, @%tabla el de una tabla y @nombre un stage con objeto propio."
      },
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/external-stage-y-storage-integration",
        "label": "External Stage y Storage Integration",
        "description": "Una storage integration permite a Snowflake acceder a ubicaciones cloud autorizadas sin guardar claves de nube en SQL de cada stage."
      },
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/file-format-para-csv",
        "label": "FILE FORMAT para CSV",
        "description": "Un file format define cómo interpretar archivos; CSV necesita delimitador, encabezado y reglas para vacíos."
      },
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/json-parquet-avro-orc-y-xml",
        "label": "JSON, Parquet, Avro, ORC y XML",
        "description": "Los formatos estructurados o semiestructurados requieren opciones de lectura específicas; Parquet conserva tipos y almacena por columnas."
      },
      {
        "id": "analisis-de-datos/snowflake/stages-y-formatos-de-archivos/put-get-list-y-remove",
        "label": "PUT, GET, LIST y REMOVE",
        "description": "PUT sube archivos a stages internos; GET descarga; LIST enumera y REMOVE elimina archivos del stage."
      }
    ]
  },
  {
    "key": "copy-into-y-calidad-de-carga",
    "label": "COPY INTO y calidad de carga",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/definicion",
        "label": "Definición",
        "description": "COPY INTO tabla importa archivos desde un stage; COPY INTO ubicación exporta resultados a archivos."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/consultar-archivos-y-metadatos",
        "label": "Consultar archivos y metadatos",
        "description": "Las columnas $1, $2... representan campos del archivo; METADATA$FILENAME y METADATA$FILE_ROW_NUMBER identifican su origen."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/validation-mode-y-on-error",
        "label": "VALIDATION_MODE y ON_ERROR",
        "description": "VALIDATION_MODE comprueba archivos sin cargar; ON_ERROR decide qué hacer ante errores durante la carga."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/transformar-durante-copy",
        "label": "Transformar durante COPY",
        "description": "COPY puede seleccionar campos y aplicar transformaciones compatibles antes de insertar."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/infer-schema-y-schema-evolution",
        "label": "INFER_SCHEMA y Schema Evolution",
        "description": "INFER_SCHEMA detecta columnas y tipos de archivos compatibles; Schema Evolution permite incorporar ciertos cambios de estructura en cargas configuradas."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/historial-e-idempotencia-de-copy",
        "label": "Historial e idempotencia de COPY",
        "description": "Snowflake registra archivos cargados y puede evitar su recarga; esa protección tiene límites temporales y depende del destino."
      },
      {
        "id": "analisis-de-datos/snowflake/copy-into-y-calidad-de-carga/unloading-y-exportacion",
        "label": "Unloading y exportación",
        "description": "COPY INTO @stage escribe datos de una tabla o consulta en archivos de salida."
      }
    ]
  },
  {
    "key": "datos-semiestructurados",
    "label": "Datos semiestructurados",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/datos-semiestructurados/definicion",
        "label": "Definición",
        "description": "VARIANT conserva valores de estructura flexible, incluidos objetos y arreglos, sin exigir una columna física por atributo."
      },
      {
        "id": "analisis-de-datos/snowflake/datos-semiestructurados/parse-json-object-y-array",
        "label": "PARSE_JSON, OBJECT y ARRAY",
        "description": "PARSE_JSON interpreta texto JSON; OBJECT_CONSTRUCT y ARRAY_CONSTRUCT crean estructuras a partir de expresiones SQL."
      },
      {
        "id": "analisis-de-datos/snowflake/datos-semiestructurados/rutas-y-tipos",
        "label": "Rutas y tipos",
        "description": "Los operadores : y [] navegan propiedades y arreglos; los nombres JSON distinguen mayúsculas."
      },
      {
        "id": "analisis-de-datos/snowflake/datos-semiestructurados/null-sql-y-null-json",
        "label": "NULL SQL y null JSON",
        "description": "NULL SQL representa ausencia; JSON null es un valor dentro de VARIANT y puede detectarse con IS_NULL_VALUE."
      },
      {
        "id": "analisis-de-datos/snowflake/datos-semiestructurados/lateral-y-flatten",
        "label": "LATERAL y FLATTEN",
        "description": "FLATTEN convierte un arreglo u objeto en filas; LATERAL permite usar columnas de la fila izquierda como entrada."
      }
    ]
  },
  {
    "key": "snowpipe-y-streaming",
    "label": "Snowpipe y streaming",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/definicion",
        "label": "Definición",
        "description": "Snowpipe carga archivos de forma continua; Snowpipe Streaming ingiere filas directamente sin exigir archivos intermedios."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/pipes-y-auto-ingest",
        "label": "Pipes y AUTO_INGEST",
        "description": "Un pipe define un COPY; AUTO_INGEST permite dispararlo con notificaciones cloud configuradas."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/snowpipe-streaming-y-kafka",
        "label": "Snowpipe Streaming y Kafka",
        "description": "Streaming ingiere filas con SDK/API compatibles; el conector Kafka facilita enviar eventos de topics a Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/notification-integrations-y-monitorizacion",
        "label": "Notification Integrations y monitorización",
        "description": "Una integración de notificación conecta servicios de mensajería o notificaciones soportados; el historial y estado permiten detectar retrasos."
      }
    ]
  },
  {
    "key": "streams-y-cdc",
    "label": "Streams y CDC",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/streams-y-cdc/definicion",
        "label": "Definición",
        "description": "Un stream expone cambios desde un offset de una tabla u objeto compatible, facilitando procesamiento incremental (CDC)."
      },
      {
        "id": "analisis-de-datos/snowflake/streams-y-cdc/standard-y-append-only-streams",
        "label": "Standard y Append-only Streams",
        "description": "Standard captura el delta neto de inserciones y eliminaciones, incluidas actualizaciones; append-only captura inserciones de tablas compatibles."
      },
      {
        "id": "analisis-de-datos/snowflake/streams-y-cdc/consumir-cambios-y-offsets",
        "label": "Consumir cambios y offsets",
        "description": "Insertar desde el stream a una tabla en una transacción confirmada avanza su offset."
      },
      {
        "id": "analisis-de-datos/snowflake/streams-y-cdc/staleness-y-recuperacion",
        "label": "Staleness y recuperación",
        "description": "Un stream puede quedar obsoleto si no se consume antes de perderse la historia necesaria de su fuente."
      }
    ]
  },
  {
    "key": "tasks-y-orquestacion",
    "label": "Tasks y orquestación",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/definicion",
        "label": "Definición",
        "description": "Una task ejecuta SQL o procedimientos con un horario, un disparador o dependencias de otras tasks."
      },
      {
        "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/schedule-cron-y-ejecucion-manual",
        "label": "SCHEDULE, CRON y ejecución manual",
        "description": "SCHEDULE admite intervalos o CRON con zona horaria; EXECUTE TASK inicia una ejecución bajo demanda."
      },
      {
        "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/triggered-tasks-y-system-stream-has-data",
        "label": "Triggered Tasks y SYSTEM$STREAM_HAS_DATA",
        "description": "Una triggered task puede ejecutar trabajo cuando un stream contiene cambios, evitando sondeos continuos en la consulta de negocio."
      },
      {
        "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/task-graphs-y-dependencias",
        "label": "Task Graphs y dependencias",
        "description": "AFTER define dependencias en un grafo de tasks; una raíz coordina la ejecución de sus descendientes."
      },
      {
        "id": "analisis-de-datos/snowflake/tasks-y-orquestacion/serverless-errores-y-limpieza",
        "label": "Serverless, errores y limpieza",
        "description": "Una task serverless usa cómputo administrado; las tasks también admiten configuraciones de reintento, timeout y suspensión tras fallos."
      }
    ]
  },
  {
    "key": "dynamic-tables",
    "label": "Dynamic Tables",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/dynamic-tables/definicion",
        "label": "Definición",
        "description": "Una dynamic table mantiene resultados de una consulta con una meta de frescura y un warehouse de refresco."
      },
      {
        "id": "analisis-de-datos/snowflake/dynamic-tables/target-lag-y-downstream",
        "label": "TARGET_LAG y DOWNSTREAM",
        "description": "TARGET_LAG expresa una meta de atraso respecto a datos fuente; DOWNSTREAM delega el momento de refresco a consumidores dependientes."
      },
      {
        "id": "analisis-de-datos/snowflake/dynamic-tables/refresh-mode-e-historial",
        "label": "REFRESH_MODE e historial",
        "description": "INCREMENTAL procesa cambios compatibles; FULL recalcula el conjunto; AUTO selecciona un modo soportado al crear el objeto. Otros modos dependen de la versión."
      },
      {
        "id": "analisis-de-datos/snowflake/dynamic-tables/elegir-dynamic-tables-streams-o-tasks",
        "label": "Elegir Dynamic Tables, Streams o Tasks",
        "description": "Dynamic Tables sirven para resultados declarativos; Streams y Tasks permiten controlar cambios, procedimientos, MERGE y efectos laterales."
      }
    ]
  },
  {
    "key": "elt-y-modelado-analitico",
    "label": "ELT y modelado analítico",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/definicion",
        "label": "Definición",
        "description": "ELT carga datos primero y los transforma dentro de Snowflake; ETL transforma antes de cargar."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/hechos-dimensiones-y-granularidad",
        "label": "Hechos, dimensiones y granularidad",
        "description": "Una tabla de hechos contiene eventos o medidas; una dimensión aporta atributos de negocio para filtrar o agrupar."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/star-schema-y-snowflake-schema",
        "label": "Star Schema y Snowflake Schema",
        "description": "El esquema estrella conecta hechos con dimensiones relativamente desnormalizadas; snowflake schema normaliza dimensiones en tablas adicionales."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/scd-tipo-1",
        "label": "SCD tipo 1",
        "description": "Una Slowly Changing Dimension tipo 1 sobrescribe atributos y conserva solo el estado actual."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/scd-tipo-2",
        "label": "SCD tipo 2",
        "description": "SCD2 conserva versiones de atributos mediante fechas de vigencia y una clave de versión o equivalente."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/incrementales-backfills-e-idempotencia",
        "label": "Incrementales, backfills e idempotencia",
        "description": "Una carga incremental procesa datos nuevos o modificados; un backfill reprocesa periodos anteriores."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/deduplicacion-y-validaciones",
        "label": "Deduplicación y validaciones",
        "description": "La calidad de datos comprueba unicidad, campos obligatorios, relaciones, valores permitidos y consistencia de métricas."
      },
      {
        "id": "analisis-de-datos/snowflake/elt-y-modelado-analitico/data-metric-functions",
        "label": "Data Metric Functions",
        "description": "Las DMF son funciones de métricas de calidad que pueden ejecutarse o asociarse a objetos compatibles con programación y expectativas."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "El análisis transforma preguntas de negocio en medidas, dimensiones, filtros, periodo y granularidad definidos."
      },
      {
        "id": "analisis-de-datos/snowflake/metricas-de-negocio/cohortes-y-retencion",
        "label": "Cohortes y retención",
        "description": "Una cohorte agrupa entidades por fecha de inicio; retención mide cuántas vuelven a estar activas en un periodo posterior."
      },
      {
        "id": "analisis-de-datos/snowflake/metricas-de-negocio/funnels-y-conversion",
        "label": "Funnels y conversión",
        "description": "Un funnel mide cuántas entidades alcanzan pasos definidos, normalmente en orden y dentro de un periodo."
      },
      {
        "id": "analisis-de-datos/snowflake/metricas-de-negocio/comparacion-entre-periodos",
        "label": "Comparación entre periodos",
        "description": "Una métrica por periodo puede compararse con la anterior mediante LAG; el crecimiento se divide entre el periodo base."
      }
    ]
  },
  {
    "key": "rendimiento-y-diagnostico",
    "label": "Rendimiento y diagnóstico",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/definicion",
        "label": "Definición",
        "description": "Optimizar implica identificar el trabajo costoso y reducir lecturas, movimiento de datos o esperas sin cambiar el resultado."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/query-history-y-query-profile",
        "label": "Query History y Query Profile",
        "description": "Query History muestra ejecuciones; Query Profile desglosa operadores y estadísticas de la ejecución real."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/pruning-y-filtros",
        "label": "Pruning y filtros",
        "description": "El optimizador puede descartar micro-partitions con metadatos incompatibles con un filtro."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/clustering-keys-y-automatic-clustering",
        "label": "Clustering Keys y Automatic Clustering",
        "description": "Una clave de clustering ayuda a mantener proximidad física de datos con valores relacionados; el mantenimiento automático puede reorganizarlos."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/caches",
        "label": "Cachés",
        "description": "Snowflake puede reutilizar resultados persistidos y datos locales del warehouse; Cloud Services también mantiene metadatos."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/search-optimization-y-query-acceleration",
        "label": "Search Optimization y Query Acceleration",
        "description": "Search Optimization acelera patrones selectivos elegibles con estructuras administradas; Query Acceleration aporta cómputo adicional a partes elegibles de consultas."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/spilling-y-query-queuing",
        "label": "Spilling y Query Queuing",
        "description": "Spilling ocurre cuando datos intermedios desbordan memoria a almacenamiento; queuing indica espera por recursos u otros factores."
      },
      {
        "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/query-insights-query-hash-y-estadisticas",
        "label": "Query Insights, Query Hash y estadísticas",
        "description": "Query Insights señala patrones diagnosticables; los hashes agrupan consultas similares y las estadísticas describen operadores ejecutados."
      }
    ]
  },
  {
    "key": "costos-y-monitoreo",
    "label": "Costos y monitoreo",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/definicion",
        "label": "Definición",
        "description": "El costo combina cómputo medido en créditos, almacenamiento y otros servicios o transferencias según modalidad."
      },
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/resource-monitors",
        "label": "Resource Monitors",
        "description": "Un resource monitor vigila créditos de warehouses y permite notificar o suspender según umbrales."
      },
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/budgets",
        "label": "Budgets",
        "description": "Budgets permiten vigilar gasto y previsiones de recursos y servicios admitidos, incluidos determinados serverless."
      },
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/account-usage-e-information-schema",
        "label": "ACCOUNT_USAGE e INFORMATION_SCHEMA",
        "description": "ACCOUNT_USAGE ofrece historial y metadatos a escala de cuenta con latencia; INFORMATION_SCHEMA describe objetos de una base y funciones de historial de alcance específico."
      },
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/alerts-event-tables-y-observabilidad",
        "label": "Alerts, Event Tables y observabilidad",
        "description": "Alerts ejecutan acciones ante condiciones; Event Tables recopilan telemetría de código instrumentado, como logs, trazas y métricas."
      },
      {
        "id": "analisis-de-datos/snowflake/costos-y-monitoreo/limites-timeouts-y-parametros",
        "label": "Límites, timeouts y parámetros",
        "description": "Los parámetros de cuenta, usuario, sesión u objeto controlan comportamientos y ciertos límites."
      }
    ]
  },
  {
    "key": "roles-y-privilegios",
    "label": "Roles y privilegios",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/roles-y-privilegios/definicion",
        "label": "Definición",
        "description": "El control de acceso de Snowflake combina roles y propiedad de objetos; los privilegios se conceden según una jerarquía."
      },
      {
        "id": "analisis-de-datos/snowflake/roles-y-privilegios/roles-del-sistema",
        "label": "Roles del sistema",
        "description": "ACCOUNTADMIN concentra administración superior; SYSADMIN administra objetos/warehouses; SECURITYADMIN gestiona concesiones; USERADMIN administra usuarios/roles; PUBLIC se concede a todos."
      },
      {
        "id": "analisis-de-datos/snowflake/roles-y-privilegios/grant-revoke-y-jerarquia",
        "label": "GRANT, REVOKE y jerarquía",
        "description": "GRANT concede privilegios o roles; REVOKE los retira. Un rol superior hereda privilegios de roles concedidos a él."
      },
      {
        "id": "analisis-de-datos/snowflake/roles-y-privilegios/future-grants-y-ownership",
        "label": "Future Grants y OWNERSHIP",
        "description": "Future Grants aplican permisos a objetos que se creen posteriormente; OWNERSHIP controla el objeto y su transferencia."
      },
      {
        "id": "analisis-de-datos/snowflake/roles-y-privilegios/database-roles-y-managed-access-schemas",
        "label": "Database Roles y Managed Access Schemas",
        "description": "Un database role agrupa privilegios dentro de una base; un managed access schema centraliza decisiones de concesión en el propietario del esquema o rol autorizado."
      }
    ]
  },
  {
    "key": "autenticacion-y-redes",
    "label": "Autenticación y redes",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/autenticacion-y-redes/definicion",
        "label": "Definición",
        "description": "La autenticación verifica la identidad; el control de acceso decide qué puede hacer y la red limita desde dónde puede conectarse."
      },
      {
        "id": "analisis-de-datos/snowflake/autenticacion-y-redes/mfa-y-sso",
        "label": "MFA y SSO",
        "description": "MFA añade un factor de verificación; SSO delega autenticación a un proveedor de identidad mediante configuración federada."
      },
      {
        "id": "analisis-de-datos/snowflake/autenticacion-y-redes/oauth-y-key-pair-authentication",
        "label": "OAuth y Key-pair Authentication",
        "description": "OAuth usa tokens autorizados; key-pair autentica mediante un par criptográfico y una clave pública registrada."
      },
      {
        "id": "analisis-de-datos/snowflake/autenticacion-y-redes/network-policies-y-conectividad-privada",
        "label": "Network Policies y conectividad privada",
        "description": "Las network policies restringen orígenes de conexión; la conectividad privada permite tráfico mediante enlaces cloud compatibles (como PrivateLink)."
      },
      {
        "id": "analisis-de-datos/snowflake/autenticacion-y-redes/external-access-integrations-y-secrets",
        "label": "External Access Integrations y Secrets",
        "description": "Las integraciones de acceso externo autorizan destinos de red para código ejecutado en Snowflake; Secrets almacenan valores sensibles gestionados."
      }
    ]
  },
  {
    "key": "gobernanza-y-auditoria",
    "label": "Gobernanza y auditoría",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/definicion",
        "label": "Definición",
        "description": "La gobernanza define qué datos son sensibles, quién puede verlos, cómo se transforman y cómo se controla su uso."
      },
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/masking-policies",
        "label": "Masking Policies",
        "description": "Una masking policy transforma valores de una columna según el contexto de acceso."
      },
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/row-access-policies",
        "label": "Row Access Policies",
        "description": "Una row access policy decide qué filas son visibles mediante una expresión booleana evaluada al consultar."
      },
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/tags-clasificacion-y-lineage",
        "label": "Tags, clasificación y lineage",
        "description": "Los tags etiquetan objetos; la clasificación identifica datos sensibles y lineage rastrea dependencias y flujos."
      },
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/aggregation-projection-y-join-policies",
        "label": "Aggregation, Projection y Join Policies",
        "description": "Estas políticas limitan, respectivamente, la extracción de grupos demasiado pequeños, la proyección de columnas y el uso de joins según condiciones definidas."
      },
      {
        "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/access-history-y-login-history",
        "label": "Access History y Login History",
        "description": "Access History permite investigar acceso y cambios a objetos; Login History muestra intentos de autenticación."
      }
    ]
  },
  {
    "key": "comparticion-y-recuperacion-ante-desastres",
    "label": "Compartición y recuperación ante desastres",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/definicion",
        "label": "Definición",
        "description": "Snowflake puede compartir objetos autorizados sin exportar copias tradicionales y replicar recursos compatibles entre cuentas."
      },
      {
        "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/secure-data-sharing-y-reader-accounts",
        "label": "Secure Data Sharing y Reader Accounts",
        "description": "Un share concede acceso a objetos al consumidor; una reader account permite acceso a consumidores sin su propia cuenta Snowflake bajo condiciones del proveedor."
      },
      {
        "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/marketplace-listings-y-auto-fulfillment",
        "label": "Marketplace, Listings y Auto-Fulfillment",
        "description": "Listings publican productos de datos a consumidores; auto-fulfillment puede entregar productos entre regiones/clouds soportadas."
      },
      {
        "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/data-clean-rooms",
        "label": "Data Clean Rooms",
        "description": "Un clean room permite colaboración analítica con controles sobre consultas, datos y resultados entre participantes."
      },
      {
        "id": "analisis-de-datos/snowflake/comparticion-y-recuperacion-ante-desastres/replication-failover-y-disaster-recovery",
        "label": "Replication, Failover y Disaster Recovery",
        "description": "Los replication/failover groups replican objetos compatibles y permiten promover secundarios cuando corresponde; DR define objetivos de pérdida (RPO) y recuperación (RTO)."
      }
    ]
  },
  {
    "key": "python-connector",
    "label": "Python Connector",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/python-connector/definicion",
        "label": "Definición",
        "description": "snowflake-connector-python conecta Python con una cuenta y ejecuta SQL mediante la API DB-API."
      },
      {
        "id": "analisis-de-datos/snowflake/python-connector/execute-parametros-y-executemany",
        "label": "execute, parámetros y executemany",
        "description": "execute ejecuta una sentencia; los parámetros separan valores de la sintaxis; executemany aplica una operación a múltiples conjuntos de valores."
      },
      {
        "id": "analisis-de-datos/snowflake/python-connector/fetchone-fetchmany-y-fetchall",
        "label": "fetchone, fetchmany y fetchall",
        "description": "fetchone recupera una fila, fetchmany un lote y fetchall todas las filas restantes."
      },
      {
        "id": "analisis-de-datos/snowflake/python-connector/pandas-fetch-pandas-all-y-batches",
        "label": "Pandas: fetch_pandas_all y batches",
        "description": "El conector puede convertir resultados a pandas mediante fetch_pandas_all o iterar DataFrames con fetch_pandas_batches."
      },
      {
        "id": "analisis-de-datos/snowflake/python-connector/write-pandas",
        "label": "write_pandas",
        "description": "write_pandas carga un DataFrame pandas en una tabla Snowflake usando archivos y carga administrada por el conector."
      }
    ]
  },
  {
    "key": "snowpark-python",
    "label": "Snowpark Python",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/definicion",
        "label": "Definición",
        "description": "Snowpark ofrece DataFrames y expresiones que se traducen en operaciones ejecutadas en Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/session-sql-y-session-table",
        "label": "session.sql y session.table",
        "description": "session.sql construye un DataFrame desde una consulta; session.table lo construye desde una tabla o vista."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/select-filter-y-order-by",
        "label": "select, filter y order_by",
        "description": "Estas operaciones proyectan, filtran y ordenan un DataFrame Snowpark mediante expresiones de columna."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/group-by-y-agg",
        "label": "group_by y agg",
        "description": "group_by forma grupos y agg aplica agregaciones usando funciones Snowpark."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/join-y-granularidad",
        "label": "join y granularidad",
        "description": "join combina DataFrames por claves o expresiones; sus cardinalidades son las mismas que en SQL."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/lazy-evaluation-pushdown-y-acciones",
        "label": "Lazy Evaluation, Pushdown y acciones",
        "description": "Snowpark compone un plan lazy y envía operaciones compatibles al servidor (pushdown); collect, count, show y to_pandas materializan resultados de distintas formas."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-python/save-as-table-y-modos-de-escritura",
        "label": "save_as_table y modos de escritura",
        "description": "DataFrame.write.save_as_table persiste resultados en Snowflake; mode determina si reemplaza, agrega o rechaza la existencia del destino."
      }
    ]
  },
  {
    "key": "udf-udtf-y-procedimientos",
    "label": "UDF, UDTF y procedimientos",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/definicion",
        "label": "Definición",
        "description": "Una UDF devuelve un valor por llamada, una UDTF devuelve filas y un stored procedure encapsula operaciones ejecutables con CALL."
      },
      {
        "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/python-udf",
        "label": "Python UDF",
        "description": "Una UDF Python ejecuta una función handler dentro de un runtime admitido por Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/udtf",
        "label": "UDTF",
        "description": "Una función de tabla devuelve un conjunto de filas y se consulta mediante TABLE; puede implementarse en SQL o lenguajes soportados como Python."
      },
      {
        "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/stored-procedures-y-derechos",
        "label": "Stored Procedures y derechos",
        "description": "Un procedimiento puede ejecutar SQL y lógica procedimental; EXECUTE AS OWNER o CALLER define el contexto de derechos."
      },
      {
        "id": "analisis-de-datos/snowflake/udf-udtf-y-procedimientos/python-stored-procedures",
        "label": "Python Stored Procedures",
        "description": "Un procedimiento Python usa un handler que recibe una sesión Snowpark y puede consultar o modificar objetos autorizados."
      }
    ]
  },
  {
    "key": "integracion-y-herramientas-de-desarrollo",
    "label": "Integración y herramientas de desarrollo",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/definicion",
        "label": "Definición",
        "description": "Snowflake admite clientes SQL, controladores, APIs y herramientas de ingeniería que operan sobre la misma cuenta y permisos."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/snowflake-cli-y-snowsql",
        "label": "Snowflake CLI y SnowSQL",
        "description": "Snowflake CLI permite ejecutar SQL y administrar proyectos desde terminal; SnowSQL es otro cliente SQL de Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/jdbc-odbc-y-sqlalchemy",
        "label": "JDBC, ODBC y SQLAlchemy",
        "description": "JDBC/ODBC permiten acceso desde Java, BI u otros clientes; SQLAlchemy usa un dialecto Snowflake sobre el conector Python."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/sql-api-rest-apis-y-python-apis",
        "label": "SQL API, REST APIs y Python APIs",
        "description": "SQL API recibe sentencias mediante HTTP; las REST/Python APIs de recursos permiten administrar objetos y servicios soportados."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/dbt",
        "label": "dbt",
        "description": "dbt transforma datos mediante modelos SQL, dependencias y tests; Snowflake ejecuta las consultas compiladas."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/airflow",
        "label": "Airflow",
        "description": "Airflow orquesta tareas y dependencias; puede ejecutar SQL de Snowflake mediante providers y conexiones configuradas."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/openflow",
        "label": "Openflow",
        "description": "Openflow integra fuentes, conectores y flujos de datos administrados según despliegue y conectores disponibles."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/git-ci-cd-y-migraciones",
        "label": "Git, CI/CD y migraciones",
        "description": "Git conserva versiones; CI/CD prueba y despliega cambios; una migración aplica cambios de esquema de forma controlada."
      },
      {
        "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/terraform-e-infraestructura-como-codigo",
        "label": "Terraform e infraestructura como código",
        "description": "Terraform representa recursos de infraestructura declarativamente y compara estado deseado con estado real mediante un provider."
      }
    ]
  },
  {
    "key": "bi-y-capa-semantica",
    "label": "BI y capa semántica",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/definicion",
        "label": "Definición",
        "description": "BI convierte datos en informes y dashboards; una capa semántica centraliza definiciones de entidades y métricas para mantener coherencia."
      },
      {
        "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/semantic-views",
        "label": "Semantic Views",
        "description": "Una semantic view describe entidades lógicas, relaciones, dimensiones, hechos y métricas de negocio sobre tablas de Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/power-bi-tableau-y-looker",
        "label": "Power BI, Tableau y Looker",
        "description": "Los conectores BI ejecutan consultas o importan datos según su modalidad; algunos permiten modelos semánticos propios."
      },
      {
        "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/snowsight-dashboards-y-streamlit",
        "label": "Snowsight dashboards y Streamlit",
        "description": "Snowsight ofrece visualizaciones de consultas según interfaz; Streamlit in Snowflake permite construir aplicaciones Python interactivas dentro de la plataforma."
      }
    ]
  },
  {
    "key": "snowpark-ml-y-cortex-ai",
    "label": "Snowpark ML y Cortex AI",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/definicion",
        "label": "Definición",
        "description": "Snowpark ML ofrece herramientas de machine learning; Cortex ofrece servicios y funciones de IA para texto, búsqueda y análisis."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/snowpark-ml-feature-store-y-model-registry",
        "label": "Snowpark ML, Feature Store y Model Registry",
        "description": "Snowpark ML permite desarrollar modelos; Feature Store organiza variables reutilizables y Model Registry registra versiones y metadatos de modelos."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-ai-functions",
        "label": "Cortex AI Functions",
        "description": "Las funciones AI procesan contenido con modelos administrados, por ejemplo generación o clasificación de texto."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-analyst",
        "label": "Cortex Analyst",
        "description": "Cortex Analyst traduce preguntas de negocio a SQL usando definiciones semánticas y metadatos."
      },
      {
        "id": "analisis-de-datos/snowflake/snowpark-ml-y-cortex-ai/cortex-search",
        "label": "Cortex Search",
        "description": "Cortex Search indexa contenido textual para recuperación relevante por consulta y admite filtros de atributos según configuración."
      }
    ]
  },
  {
    "key": "aplicaciones-y-servicios-especializados",
    "label": "Aplicaciones y servicios especializados",
    "children": [
      {
        "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/definicion",
        "label": "Definición",
        "description": "La plataforma ofrece mecanismos para distribuir aplicaciones, ejecutar contenedores y trabajar con distintos tipos de cargas además del SQL analítico."
      },
      {
        "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/native-apps",
        "label": "Native Apps",
        "description": "Native Apps permite empaquetar lógica y datos autorizados para instalar una aplicación en cuentas consumidoras."
      },
      {
        "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/snowpark-container-services",
        "label": "Snowpark Container Services",
        "description": "Permite ejecutar imágenes de contenedor y servicios en compute pools administrados por Snowflake."
      },
      {
        "id": "analisis-de-datos/snowflake/aplicaciones-y-servicios-especializados/ediciones-regiones-y-disponibilidad",
        "label": "Ediciones, regiones y disponibilidad",
        "description": "La edición de cuenta y la región condicionan funcionalidades, retención, seguridad, rendimiento y servicios especializados."
      }
    ]
  }
];
