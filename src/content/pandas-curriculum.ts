// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const pandasCurriculum = [
  {
    "key": "series-y-dataframe",
    "label": "Series y DataFrame",
    "children": [
      {
        "id": "analisis-de-datos/pandas/series-y-dataframe/definicion",
        "label": "Definición",
        "description": "Una Series contiene valores en una dimensión con etiquetas; un DataFrame organiza columnas y filas con índices."
      },
      {
        "id": "analisis-de-datos/pandas/series-y-dataframe/series",
        "label": "Series",
        "description": "Construye una columna de valores con un índice opcional."
      },
      {
        "id": "analisis-de-datos/pandas/series-y-dataframe/dataframe",
        "label": "DataFrame",
        "description": "Construye una tabla desde un diccionario de columnas o una lista de registros."
      },
      {
        "id": "analisis-de-datos/pandas/series-y-dataframe/index",
        "label": "Index",
        "description": "El Index contiene las etiquetas de un eje, no los valores de las filas."
      },
      {
        "id": "analisis-de-datos/pandas/series-y-dataframe/series-frente-a-dataframe",
        "label": "Series frente a DataFrame",
        "description": "Seleccionar una columna con un nombre devuelve Series; con una lista devuelve DataFrame."
      }
    ]
  },
  {
    "key": "inspeccion",
    "label": "Inspección",
    "children": [
      {
        "id": "analisis-de-datos/pandas/inspeccion/definicion",
        "label": "Definición",
        "description": "Antes de transformar datos conviene conocer sus dimensiones, columnas, tipos y distribución."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/head-y-tail",
        "label": "head y tail",
        "description": "Devuelven las primeras o últimas n filas sin modificar la tabla."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/sample",
        "label": "sample",
        "description": "Selecciona una muestra de filas; random_state permite repetirla."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/shape-size-y-len",
        "label": "shape, size y len",
        "description": "shape devuelve filas y columnas; size cuenta celdas; len cuenta filas."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/columns-y-dtypes",
        "label": "columns y dtypes",
        "description": "columns enumera nombres y dtypes muestra el tipo de cada columna."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/info",
        "label": "info",
        "description": "Imprime el esquema, conteos no nulos y memoria aproximada."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/describe",
        "label": "describe",
        "description": "Resume estadísticas de columnas numéricas; include permite incluir otros tipos."
      },
      {
        "id": "analisis-de-datos/pandas/inspeccion/ultimas-filas",
        "label": "Últimas filas",
        "description": "tail(n) devuelve las últimas n filas en el orden actual."
      }
    ]
  },
  {
    "key": "importar-datos",
    "label": "Importar datos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/importar-datos/definicion",
        "label": "Definición",
        "description": "Las funciones read_* crean DataFrames desde archivos, texto o consultas."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/read-csv",
        "label": "read_csv",
        "description": "Lee datos delimitados; sep define el separador y encoding la codificación."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/opciones-de-read-csv",
        "label": "Opciones de read_csv",
        "description": "usecols, dtype, na_values, parse_dates y sep controlan la importación."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/read-excel",
        "label": "read_excel",
        "description": "Lee una hoja por nombre o posición; sheet_name=None devuelve un diccionario de hojas."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/read-json",
        "label": "read_json",
        "description": "Lee JSON; orient='records' interpreta una lista de objetos como filas."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/read-sql",
        "label": "read_sql",
        "description": "Ejecuta una consulta SQL y devuelve sus filas como DataFrame."
      },
      {
        "id": "analisis-de-datos/pandas/importar-datos/read-parquet",
        "label": "read_parquet",
        "description": "Lee un archivo columnar Parquet que conserva tipos con un motor compatible."
      }
    ]
  },
  {
    "key": "seleccion-de-datos",
    "label": "Selección de datos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/seleccion-de-datos/definicion",
        "label": "Definición",
        "description": "Selecciona columnas y filas por etiqueta con loc o por posición con iloc."
      },
      {
        "id": "analisis-de-datos/pandas/seleccion-de-datos/columnas",
        "label": "Columnas",
        "description": "Una lista de nombres selecciona varias columnas en el orden indicado."
      },
      {
        "id": "analisis-de-datos/pandas/seleccion-de-datos/loc",
        "label": "loc",
        "description": "Selecciona filas y columnas por etiquetas; los extremos de un corte por etiquetas se incluyen."
      },
      {
        "id": "analisis-de-datos/pandas/seleccion-de-datos/iloc",
        "label": "iloc",
        "description": "Selecciona por posiciones enteras desde cero; el extremo final del corte se excluye."
      },
      {
        "id": "analisis-de-datos/pandas/seleccion-de-datos/at-e-iat",
        "label": "at e iat",
        "description": "at accede a una celda por etiqueta e iat por posición."
      }
    ]
  },
  {
    "key": "filtros",
    "label": "Filtros",
    "children": [
      {
        "id": "analisis-de-datos/pandas/filtros/definicion",
        "label": "Definición",
        "description": "Una máscara booleana selecciona filas que cumplen una condición."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/comparaciones",
        "label": "Comparaciones",
        "description": "==, !=, >, >=, < y <= comparan valores de una columna."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/and-or-y-not",
        "label": "AND, OR y NOT",
        "description": "Combina máscaras con &, | y `~`; cada comparación necesita paréntesis."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/negar-una-condicion",
        "label": "Negar una condición",
        "description": "`~` invierte los booleanos de una máscara."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/isin",
        "label": "isin",
        "description": "Comprueba si cada valor pertenece a una colección."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/between",
        "label": "between",
        "description": "Comprueba si un valor está entre dos límites, incluidos por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/filtros/query",
        "label": "query",
        "description": "Filtra con una expresión de texto; @ permite usar una variable de Python."
      }
    ]
  },
  {
    "key": "ordenamiento-y-limites",
    "label": "Ordenamiento y límites",
    "children": [
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/definicion",
        "label": "Definición",
        "description": "sort_values ordena valores; sort_index ordena etiquetas. head y tail limitan filas."
      },
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/sort-values",
        "label": "sort_values",
        "description": "Ordena una o más columnas y permite una dirección por columna."
      },
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/sort-index",
        "label": "sort_index",
        "description": "Ordena según las etiquetas del índice."
      },
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/nlargest-y-nsmallest",
        "label": "nlargest y nsmallest",
        "description": "Seleccionan los n valores extremos de una columna numérica sin ordenar explícitamente toda la tabla."
      },
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/head-tail-y-paginacion",
        "label": "head, tail y paginación",
        "description": "Tras ordenar, head(n) selecciona los primeros n; iloc permite saltar filas."
      },
      {
        "id": "analisis-de-datos/pandas/ordenamiento-y-limites/nsmallest",
        "label": "nsmallest",
        "description": "Devuelve las n filas con valores más bajos de una columna."
      }
    ]
  },
  {
    "key": "indices-y-alineacion",
    "label": "Índices y alineación",
    "children": [
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/definicion",
        "label": "Definición",
        "description": "Pandas identifica filas por etiquetas y alinea operaciones según esas etiquetas."
      },
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/set-index-y-reset-index",
        "label": "set_index y reset_index",
        "description": "set_index convierte columnas en etiquetas; reset_index recupera un índice normal."
      },
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/reindex",
        "label": "reindex",
        "description": "Ajusta las etiquetas al conjunto solicitado, insertando faltantes donde no hay datos."
      },
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/alineacion-automatica",
        "label": "Alineación automática",
        "description": "Las operaciones entre Series emparejan etiquetas, no posiciones."
      },
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/align",
        "label": "align",
        "description": "Alinea dos objetos explícitamente antes de operar."
      },
      {
        "id": "analisis-de-datos/pandas/indices-y-alineacion/multiindex",
        "label": "MultiIndex",
        "description": "Un índice jerárquico contiene varios niveles de etiquetas."
      }
    ]
  },
  {
    "key": "valores-nulos",
    "label": "Valores nulos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/valores-nulos/definicion",
        "label": "Definición",
        "description": "Los datos faltantes pueden representarse mediante None, np.nan, pd.NA o NaT según el tipo."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/isna-y-notna",
        "label": "isna y notna",
        "description": "Identifican valores ausentes o presentes respectivamente."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/conteo-de-faltantes",
        "label": "Conteo de faltantes",
        "description": "isna().sum() cuenta los nulos porque True se suma como uno."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/dropna",
        "label": "dropna",
        "description": "Elimina filas o columnas que contienen nulos; subset restringe las columnas examinadas."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/fillna",
        "label": "fillna",
        "description": "Reemplaza nulos por un valor, una serie o un diccionario de columnas."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/ffill-y-bfill",
        "label": "ffill y bfill",
        "description": "Propagan la observación válida anterior o posterior en el orden actual."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/interpolate",
        "label": "interpolate",
        "description": "Estima valores intermedios según un método, lineal por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/none-nan-na-y-nat",
        "label": "None, NaN, NA y NaT",
        "description": "Son marcadores de ausencia para distintos tipos; pd.NA puede propagar incertidumbre."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/combine-first",
        "label": "combine_first",
        "description": "Conserva valores existentes y rellena ausencias con otro objeto alineado por etiquetas."
      },
      {
        "id": "analisis-de-datos/pandas/valores-nulos/notna",
        "label": "notna",
        "description": "Construye una máscara verdadera para valores presentes."
      }
    ]
  },
  {
    "key": "conversion-de-tipos",
    "label": "Conversión de tipos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/definicion",
        "label": "Definición",
        "description": "Los tipos determinan cómo se comparan, calculan y almacenan los datos."
      },
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/astype",
        "label": "astype",
        "description": "Convierte a un tipo explícito; puede fallar ante valores incompatibles."
      },
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/to-numeric",
        "label": "to_numeric",
        "description": "Convierte texto numérico; errors='coerce' convierte valores inválidos en nulos."
      },
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/to-datetime",
        "label": "to_datetime",
        "description": "Interpreta valores como fechas; format fija el patrón y errors='coerce' marca errores como NaT."
      },
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/tipos-nullable",
        "label": "Tipos nullable",
        "description": "Int64, boolean y string permiten representar ausencias sin perder su tipo lógico."
      },
      {
        "id": "analisis-de-datos/pandas/conversion-de-tipos/convert-dtypes",
        "label": "convert_dtypes",
        "description": "Propone tipos compatibles con ausencias según los valores de cada columna."
      }
    ]
  },
  {
    "key": "texto",
    "label": "Texto",
    "children": [
      {
        "id": "analisis-de-datos/pandas/texto/definicion",
        "label": "Definición",
        "description": "El accesor str aplica operaciones de cadenas elemento por elemento."
      },
      {
        "id": "analisis-de-datos/pandas/texto/strip-lstrip-y-rstrip",
        "label": "strip, lstrip y rstrip",
        "description": "Eliminan caracteres en ambos extremos, izquierda o derecha."
      },
      {
        "id": "analisis-de-datos/pandas/texto/lower-upper-y-casefold",
        "label": "lower, upper y casefold",
        "description": "Normalizan mayúsculas y minúsculas; casefold es útil en comparaciones sin distinción de caja."
      },
      {
        "id": "analisis-de-datos/pandas/texto/len-y-slicing",
        "label": "len y slicing",
        "description": "str.len cuenta caracteres; str[...] extrae posiciones de cada texto."
      },
      {
        "id": "analisis-de-datos/pandas/texto/contains-startswith-y-endswith",
        "label": "contains, startswith y endswith",
        "description": "Prueban patrones o prefijos y sufijos; contains usa regex por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/texto/replace",
        "label": "replace",
        "description": "Sustituye fragmentos de texto; regex decide si el patrón es literal o regular."
      },
      {
        "id": "analisis-de-datos/pandas/texto/split-y-extract",
        "label": "split y extract",
        "description": "split separa por delimitador; extract recupera grupos capturados por una expresión regular."
      },
      {
        "id": "analisis-de-datos/pandas/texto/expresiones-regulares",
        "label": "Expresiones regulares",
        "description": "Los patrones regex permiten capturar partes variables de cadenas."
      },
      {
        "id": "analisis-de-datos/pandas/texto/str-cat",
        "label": "str.cat",
        "description": "Concatena cadenas por fila o reduce una Series a un texto con separador."
      },
      {
        "id": "analisis-de-datos/pandas/texto/str-upper",
        "label": "str.upper",
        "description": "Convierte cada texto a mayúsculas."
      },
      {
        "id": "analisis-de-datos/pandas/texto/str-len",
        "label": "str.len",
        "description": "Cuenta caracteres de cada texto, incluidos espacios."
      },
      {
        "id": "analisis-de-datos/pandas/texto/str-startswith-y-str-endswith",
        "label": "str.startswith y str.endswith",
        "description": "Prueban el prefijo o sufijo literal de cada texto."
      }
    ]
  },
  {
    "key": "duplicados-y-valores-unicos",
    "label": "Duplicados y valores únicos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/definicion",
        "label": "Definición",
        "description": "Identifica valores repetidos según una o varias columnas y decide qué registro conservar."
      },
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/unique-y-nunique",
        "label": "unique y nunique",
        "description": "unique devuelve valores distintos; nunique cuenta distintos y excluye nulos por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/value-counts",
        "label": "value_counts",
        "description": "Cuenta ocurrencias de cada valor; normalize devuelve proporciones."
      },
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/duplicated",
        "label": "duplicated",
        "description": "Marca repeticiones por columnas seleccionadas; keep=False marca todos los miembros de cada grupo repetido."
      },
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/drop-duplicates",
        "label": "drop_duplicates",
        "description": "Elimina filas repetidas según subset y keep."
      },
      {
        "id": "analisis-de-datos/pandas/duplicados-y-valores-unicos/duplicados-de-clave-compuesta",
        "label": "Duplicados de clave compuesta",
        "description": "Una combinación de campos puede definir la identidad aunque cada campo se repita por separado."
      }
    ]
  },
  {
    "key": "modificar-y-transformar-columnas",
    "label": "Modificar y transformar columnas",
    "children": [
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/definicion",
        "label": "Definición",
        "description": "Crea, elimina, renombra o actualiza columnas mediante operaciones que conservan la estructura tabular."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/crear-columna-y-assign",
        "label": "Crear columna y assign",
        "description": "Una asignación o assign añade una columna calculada; assign devuelve un nuevo DataFrame."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/rename-y-set-axis",
        "label": "rename y set_axis",
        "description": "rename cambia etiquetas específicas; set_axis reemplaza todas las de un eje."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/drop",
        "label": "drop",
        "description": "Elimina filas por etiquetas o columnas mediante columns."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/insert",
        "label": "insert",
        "description": "Inserta una columna en una posición concreta y modifica el objeto."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/asignar-con-loc",
        "label": "Asignar con loc",
        "description": "loc permite actualizar filas que cumplen una máscara."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/replace",
        "label": "replace",
        "description": "Sustituye valores completos en celdas, a diferencia de str.replace."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/map",
        "label": "map",
        "description": "Transforma cada valor de una Series mediante diccionario o función."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/apply",
        "label": "apply",
        "description": "Aplica una función a valores de una Series o a filas/columnas de un DataFrame."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/pipe",
        "label": "pipe",
        "description": "Encadena una función que recibe un DataFrame o Series."
      },
      {
        "id": "analisis-de-datos/pandas/modificar-y-transformar-columnas/update",
        "label": "update",
        "description": "Actualiza en el sitio valores existentes con datos no nulos alineados por etiquetas."
      }
    ]
  },
  {
    "key": "condicionales",
    "label": "Condicionales",
    "children": [
      {
        "id": "analisis-de-datos/pandas/condicionales/definicion",
        "label": "Definición",
        "description": "Las máscaras y funciones condicionales crean valores según reglas de negocio."
      },
      {
        "id": "analisis-de-datos/pandas/condicionales/np-where",
        "label": "np.where",
        "description": "Selecciona un valor si la condición es verdadera y otro si es falsa."
      },
      {
        "id": "analisis-de-datos/pandas/condicionales/np-select",
        "label": "np.select",
        "description": "Evalúa varias condiciones en orden y utiliza la primera verdadera."
      },
      {
        "id": "analisis-de-datos/pandas/condicionales/where-y-mask",
        "label": "where y mask",
        "description": "where conserva valores donde la condición es verdadera; mask los reemplaza donde es verdadera."
      },
      {
        "id": "analisis-de-datos/pandas/condicionales/mask",
        "label": "mask",
        "description": "Reemplaza valores donde la condición es verdadera."
      }
    ]
  },
  {
    "key": "funciones-numericas",
    "label": "Funciones numéricas",
    "children": [
      {
        "id": "analisis-de-datos/pandas/funciones-numericas/definicion",
        "label": "Definición",
        "description": "Las operaciones aritméticas y funciones numéricas calculan nuevos valores de forma vectorizada."
      },
      {
        "id": "analisis-de-datos/pandas/funciones-numericas/aritmetica-y-broadcasting",
        "label": "Aritmética y broadcasting",
        "description": "Opera entre columnas o aplica un escalar a todos los valores."
      },
      {
        "id": "analisis-de-datos/pandas/funciones-numericas/round-y-abs",
        "label": "round y abs",
        "description": "round ajusta decimales; abs devuelve magnitudes sin signo."
      },
      {
        "id": "analisis-de-datos/pandas/funciones-numericas/division-segura",
        "label": "División segura",
        "description": "Reemplaza denominadores cero por nulos antes de dividir."
      },
      {
        "id": "analisis-de-datos/pandas/funciones-numericas/clip",
        "label": "clip",
        "description": "Limita valores a un mínimo o máximo elegido."
      }
    ]
  },
  {
    "key": "agregaciones",
    "label": "Agregaciones",
    "children": [
      {
        "id": "analisis-de-datos/pandas/agregaciones/definicion",
        "label": "Definición",
        "description": "Las agregaciones resumen varios valores en uno o varios resultados estadísticos."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/count-y-size",
        "label": "count y size",
        "description": "count cuenta valores no nulos; size cuenta elementos incluidos los nulos."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/sum-y-mean",
        "label": "sum y mean",
        "description": "sum suma; mean calcula la media aritmética de los valores presentes."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/min-max-y-median",
        "label": "min, max y median",
        "description": "min y max devuelven extremos; median el valor central ordenado."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/std-y-var",
        "label": "std y var",
        "description": "Miden dispersión mediante desviación estándar y varianza; ddof=1 es el valor muestral por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/agg",
        "label": "agg",
        "description": "Aplica una o más agregaciones; puede usar un diccionario por columna."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/axis-y-skipna",
        "label": "axis y skipna",
        "description": "axis=0 calcula por columna; axis=1 por fila; skipna controla omisión de faltantes."
      },
      {
        "id": "analisis-de-datos/pandas/agregaciones/min-count",
        "label": "min_count",
        "description": "Controla cuántos valores válidos necesita sum para devolver un resultado."
      }
    ]
  },
  {
    "key": "agrupaciones",
    "label": "Agrupaciones",
    "children": [
      {
        "id": "analisis-de-datos/pandas/agrupaciones/definicion",
        "label": "Definición",
        "description": "groupby divide filas por claves y permite calcular métricas para cada grupo."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/agrupar-por-una-o-varias-columnas",
        "label": "Agrupar por una o varias columnas",
        "description": "Una clave o lista de claves define los grupos de filas."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/agg-con-nombres",
        "label": "agg con nombres",
        "description": "Permite asignar nombres claros a métricas de distintas columnas."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/size-count-y-nunique-por-grupo",
        "label": "size, count y nunique por grupo",
        "description": "size cuenta filas, count no nulos y nunique valores distintos."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/grupos-con-nulos",
        "label": "Grupos con nulos",
        "description": "groupby omite claves nulas por defecto; dropna=False las incluye."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/filter-y-having",
        "label": "filter y HAVING",
        "description": "filter conserva las filas de grupos que cumplen una condición; también puedes filtrar una tabla ya agregada."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/transform",
        "label": "transform",
        "description": "Calcula un valor por grupo y lo devuelve alineado con cada fila original."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/first-last-y-nth",
        "label": "first, last y nth",
        "description": "first y last toman los primeros o últimos valores no nulos por columna; nth selecciona una fila por posición dentro del grupo."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/idxmin-e-idxmax",
        "label": "idxmin e idxmax",
        "description": "Devuelven las etiquetas del índice donde ocurre el mínimo o máximo de cada grupo."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/groupby-apply",
        "label": "groupby.apply",
        "description": "Ejecuta una función sobre cada grupo cuando agg o transform no expresan fácilmente el cálculo."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/filtrar-una-tabla-agregada",
        "label": "Filtrar una tabla agregada",
        "description": "Tras agg puedes seleccionar los grupos que cumplen una condición, como HAVING en SQL."
      },
      {
        "id": "analisis-de-datos/pandas/agrupaciones/first-y-last",
        "label": "first y last",
        "description": "Obtienen el primer o último valor no nulo de cada columna dentro del grupo."
      }
    ]
  },
  {
    "key": "merge-y-relaciones",
    "label": "merge y relaciones",
    "children": [
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/definicion",
        "label": "Definición",
        "description": "merge combina tablas mediante claves compartidas, como un JOIN de SQL."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/inner-y-on",
        "label": "inner y on",
        "description": "inner conserva coincidencias; on indica la clave común."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/left-y-right",
        "label": "left y right",
        "description": "left conserva filas de la izquierda; right las de la derecha, incluso sin pareja."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/outer-y-cross",
        "label": "outer y cross",
        "description": "outer conserva claves de ambos lados; cross genera todas las combinaciones sin clave."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/left-on-right-on-y-suffixes",
        "label": "left_on, right_on y suffixes",
        "description": "Permiten unir columnas con nombres diferentes y distinguir columnas de nombre repetido."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/validate-y-cardinalidad",
        "label": "validate y cardinalidad",
        "description": "validate comprueba si la relación es 1:1, 1:m o m:1."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/indicator-y-anti-join",
        "label": "indicator y anti join",
        "description": "indicator crea una columna con el origen de cada fila; permite localizar claves sin pareja."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/claves-nulas-en-merge",
        "label": "Claves nulas en merge",
        "description": "Pandas puede hacer coincidir claves nulas entre sí, a diferencia del JOIN SQL habitual."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/union-de-varias-tablas",
        "label": "Unión de varias tablas",
        "description": "Encadena merge conservando las claves necesarias para la siguiente relación."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/right-join",
        "label": "RIGHT JOIN",
        "description": "how='right' conserva las filas del DataFrame derecho, tengan pareja o no."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/full-outer-join",
        "label": "FULL OUTER JOIN",
        "description": "how='outer' conserva claves de ambos lados y rellena faltantes."
      },
      {
        "id": "analisis-de-datos/pandas/merge-y-relaciones/sufijos-y-columnas-homonimas",
        "label": "Sufijos y columnas homónimas",
        "description": "suffixes distingue columnas no clave que tienen el mismo nombre."
      }
    ]
  },
  {
    "key": "join-y-concat",
    "label": "join y concat",
    "children": [
      {
        "id": "analisis-de-datos/pandas/join-y-concat/definicion",
        "label": "Definición",
        "description": "join combina principalmente por índice; concat apila objetos por filas o columnas."
      },
      {
        "id": "analisis-de-datos/pandas/join-y-concat/join",
        "label": "join",
        "description": "Combina una tabla con otra usando índices por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/join-y-concat/concat-por-filas",
        "label": "concat por filas",
        "description": "concat con axis=0 apila tablas y alinea columnas por nombre."
      },
      {
        "id": "analisis-de-datos/pandas/join-y-concat/concat-por-columnas",
        "label": "concat por columnas",
        "description": "concat con axis=1 alinea filas por índice y añade columnas."
      },
      {
        "id": "analisis-de-datos/pandas/join-y-concat/merge-ordered",
        "label": "merge_ordered",
        "description": "Combina datos ordenados, especialmente series con claves temporales."
      },
      {
        "id": "analisis-de-datos/pandas/join-y-concat/merge-asof",
        "label": "merge_asof",
        "description": "Une cada fila con la clave temporal más cercana según una dirección y tolerancia."
      }
    ]
  },
  {
    "key": "reestructuracion-de-tablas",
    "label": "Reestructuración de tablas",
    "children": [
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/definicion",
        "label": "Definición",
        "description": "Cambiar la forma permite pasar de registros largos a matrices anchas y viceversa."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/pivot",
        "label": "pivot",
        "description": "Convierte valores de una columna en encabezados; exige una combinación única de índice y columna."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/pivot-table",
        "label": "pivot_table",
        "description": "Construye una tabla dinámica agregando valores repetidos con aggfunc."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/crosstab",
        "label": "crosstab",
        "description": "Construye una tabla de frecuencias entre variables."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/melt",
        "label": "melt",
        "description": "Convierte columnas de medidas en filas, conservando identificadores."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/stack-y-unstack",
        "label": "stack y unstack",
        "description": "Mueven un nivel entre columnas e índice."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/explode",
        "label": "explode",
        "description": "Expande cada elemento de una lista en una celda a una fila."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/transponer",
        "label": "Transponer",
        "description": "T intercambia filas y columnas."
      },
      {
        "id": "analisis-de-datos/pandas/reestructuracion-de-tablas/stack",
        "label": "stack",
        "description": "Mueve un nivel de columnas al índice de filas."
      }
    ]
  },
  {
    "key": "fechas",
    "label": "Fechas",
    "children": [
      {
        "id": "analisis-de-datos/pandas/fechas/definicion",
        "label": "Definición",
        "description": "Los valores datetime permiten filtrar, comparar y extraer componentes temporales con dt."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/componentes-dt",
        "label": "Componentes dt",
        "description": "year, month, day y dayofweek extraen componentes de cada fecha."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/rangos-de-fechas",
        "label": "Rangos de fechas",
        "description": "Filtra mediante límites temporales; un intervalo semiabierto evita errores con horas del último día."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/strftime",
        "label": "strftime",
        "description": "Formatea fechas a texto según un patrón."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/timedelta-y-diferencias",
        "label": "Timedelta y diferencias",
        "description": "Restar fechas produce duraciones; dt.days extrae días enteros."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/dateoffset",
        "label": "DateOffset",
        "description": "Desplaza fechas por unidades de calendario como meses; Timedelta representa duraciones fijas."
      },
      {
        "id": "analisis-de-datos/pandas/fechas/diferencia-en-horas",
        "label": "Diferencia en horas",
        "description": "dt.total_seconds convierte una duración a segundos; divide por 3600 para horas."
      }
    ]
  },
  {
    "key": "series-temporales",
    "label": "Series temporales",
    "children": [
      {
        "id": "analisis-de-datos/pandas/series-temporales/definicion",
        "label": "Definición",
        "description": "Un índice temporal permite seleccionar y agregar observaciones por periodos y frecuencias."
      },
      {
        "id": "analisis-de-datos/pandas/series-temporales/datetimeindex-y-date-range",
        "label": "DatetimeIndex y date_range",
        "description": "date_range genera fechas con frecuencia definida; DatetimeIndex etiqueta observaciones temporales."
      },
      {
        "id": "analisis-de-datos/pandas/series-temporales/period-y-periodindex",
        "label": "Period y PeriodIndex",
        "description": "Un periodo representa un intervalo de calendario y no un instante concreto."
      },
      {
        "id": "analisis-de-datos/pandas/series-temporales/resample",
        "label": "resample",
        "description": "Reagrupa un índice temporal según una frecuencia y luego agrega."
      },
      {
        "id": "analisis-de-datos/pandas/series-temporales/asfreq",
        "label": "asfreq",
        "description": "Ajusta una serie a una frecuencia sin agregar; crea faltantes para etiquetas ausentes."
      },
      {
        "id": "analisis-de-datos/pandas/series-temporales/zonas-horarias",
        "label": "Zonas horarias",
        "description": "tz_localize asigna una zona a fechas sin zona; tz_convert cambia una fecha que ya tiene zona."
      }
    ]
  },
  {
    "key": "rankings",
    "label": "Rankings",
    "children": [
      {
        "id": "analisis-de-datos/pandas/rankings/definicion",
        "label": "Definición",
        "description": "rank asigna posiciones numéricas a valores con distintas reglas para empates."
      },
      {
        "id": "analisis-de-datos/pandas/rankings/rank-min-y-dense",
        "label": "rank min y dense",
        "description": "method='min' conserva puestos con saltos; dense numera niveles sin saltos."
      },
      {
        "id": "analisis-de-datos/pandas/rankings/rank-first-y-average",
        "label": "rank first y average",
        "description": "first resuelve empates por orden de aparición; average promedia los puestos empatados."
      },
      {
        "id": "analisis-de-datos/pandas/rankings/rank-por-grupo",
        "label": "Rank por grupo",
        "description": "groupby().rank() asigna posiciones independientes dentro de cada grupo."
      }
    ]
  },
  {
    "key": "acumulados-y-secuencias",
    "label": "Acumulados y secuencias",
    "children": [
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/definicion",
        "label": "Definición",
        "description": "Los acumulados mantienen las filas y calculan resultados hasta cada observación."
      },
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumsum",
        "label": "cumsum",
        "description": "Suma los valores de forma acumulada."
      },
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumcount",
        "label": "cumcount",
        "description": "Numera filas dentro de cada grupo desde cero."
      },
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cummin-y-cummax",
        "label": "cummin y cummax",
        "description": "Calculan el menor o mayor valor observado hasta cada posición."
      },
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/cumprod",
        "label": "cumprod",
        "description": "Multiplica valores acumulativamente."
      },
      {
        "id": "analisis-de-datos/pandas/acumulados-y-secuencias/acumulado-por-grupo",
        "label": "Acumulado por grupo",
        "description": "groupby().cumsum() reinicia el acumulado por clave sin reducir filas."
      }
    ]
  },
  {
    "key": "comparar-observaciones",
    "label": "Comparar observaciones",
    "children": [
      {
        "id": "analisis-de-datos/pandas/comparar-observaciones/definicion",
        "label": "Definición",
        "description": "shift, diff y pct_change permiten comparar una observación con otra según el orden actual."
      },
      {
        "id": "analisis-de-datos/pandas/comparar-observaciones/shift",
        "label": "shift",
        "description": "Desplaza valores; periods=1 recupera el anterior y periods=-1 el siguiente."
      },
      {
        "id": "analisis-de-datos/pandas/comparar-observaciones/diff",
        "label": "diff",
        "description": "Resta el valor anterior al actual por defecto."
      },
      {
        "id": "analisis-de-datos/pandas/comparar-observaciones/pct-change",
        "label": "pct_change",
        "description": "Calcula cambio relativo, no porcentaje ya multiplicado por cien."
      },
      {
        "id": "analisis-de-datos/pandas/comparar-observaciones/comparaciones-por-grupo",
        "label": "Comparaciones por grupo",
        "description": "groupby().shift() recupera la observación anterior de cada entidad."
      }
    ]
  },
  {
    "key": "ventanas-moviles",
    "label": "Ventanas móviles",
    "children": [
      {
        "id": "analisis-de-datos/pandas/ventanas-moviles/definicion",
        "label": "Definición",
        "description": "Las ventanas calculan métricas sobre observaciones cercanas sin colapsar la serie."
      },
      {
        "id": "analisis-de-datos/pandas/ventanas-moviles/rolling",
        "label": "rolling",
        "description": "Calcula estadísticas en una ventana de observaciones o de tiempo."
      },
      {
        "id": "analisis-de-datos/pandas/ventanas-moviles/ventana-por-duracion",
        "label": "Ventana por duración",
        "description": "rolling con duración utiliza el índice temporal para elegir observaciones."
      },
      {
        "id": "analisis-de-datos/pandas/ventanas-moviles/expanding",
        "label": "expanding",
        "description": "Incluye todas las observaciones desde el inicio hasta la fila actual."
      },
      {
        "id": "analisis-de-datos/pandas/ventanas-moviles/ewm",
        "label": "ewm",
        "description": "Aplica pesos decrecientes a observaciones antiguas; alpha define la velocidad de ajuste."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva",
    "children": [
      {
        "id": "analisis-de-datos/pandas/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "Describe distribución, asociación y dispersión para interpretar métricas."
      },
      {
        "id": "analisis-de-datos/pandas/estadistica-descriptiva/quantile-y-percentiles",
        "label": "quantile y percentiles",
        "description": "Devuelve el valor situado en una fracción de la distribución ordenada."
      },
      {
        "id": "analisis-de-datos/pandas/estadistica-descriptiva/corr-y-cov",
        "label": "corr y cov",
        "description": "corr mide asociación normalizada; cov mide variación conjunta en las unidades originales."
      },
      {
        "id": "analisis-de-datos/pandas/estadistica-descriptiva/iqr-y-outliers",
        "label": "IQR y outliers",
        "description": "El rango intercuartílico es Q3 menos Q1; una regla marca extremos fuera de 1.5 IQR."
      }
    ]
  },
  {
    "key": "categorias-y-discretizacion",
    "label": "Categorías y discretización",
    "children": [
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/definicion",
        "label": "Definición",
        "description": "Los tipos categóricos representan etiquetas; discretizar convierte números en intervalos."
      },
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/categorical",
        "label": "Categorical",
        "description": "Representa categorías finitas que pueden tener un orden explícito."
      },
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/cut",
        "label": "cut",
        "description": "Divide valores según intervalos o límites definidos."
      },
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/qcut",
        "label": "qcut",
        "description": "Crea intervalos según cuantiles de la distribución."
      },
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/get-dummies",
        "label": "get_dummies",
        "description": "Crea una columna indicadora para cada categoría."
      },
      {
        "id": "analisis-de-datos/pandas/categorias-y-discretizacion/factorize",
        "label": "factorize",
        "description": "Asigna códigos enteros a valores distintos y devuelve etiquetas."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/pandas/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "Combina filtros, agregaciones y relaciones para convertir preguntas de negocio en resultados verificables."
      },
      {
        "id": "analisis-de-datos/pandas/metricas-de-negocio/tasa-y-porcentaje",
        "label": "Tasa y porcentaje",
        "description": "Divide casos que cumplen una condición entre la población correspondiente."
      },
      {
        "id": "analisis-de-datos/pandas/metricas-de-negocio/ticket-promedio-y-cliente-unico",
        "label": "Ticket promedio y cliente único",
        "description": "El ticket medio divide ingresos entre pedidos, no entre líneas de producto."
      },
      {
        "id": "analisis-de-datos/pandas/metricas-de-negocio/cuotas-por-grupo",
        "label": "Cuotas por grupo",
        "description": "Divide la métrica de cada entidad por el total del grupo correspondiente."
      },
      {
        "id": "analisis-de-datos/pandas/metricas-de-negocio/variacion-entre-meses",
        "label": "Variación entre meses",
        "description": "Agrupa primero por periodo y calcula el cambio respecto al periodo anterior."
      }
    ]
  },
  {
    "key": "visualizacion",
    "label": "Visualización",
    "children": [
      {
        "id": "analisis-de-datos/pandas/visualizacion/definicion",
        "label": "Definición",
        "description": "plot usa un backend gráfico para convertir Series y DataFrames en visualizaciones."
      },
      {
        "id": "analisis-de-datos/pandas/visualizacion/barras",
        "label": "Barras",
        "description": "Un gráfico de barras compara magnitudes de categorías discretas."
      },
      {
        "id": "analisis-de-datos/pandas/visualizacion/lineas",
        "label": "Líneas",
        "description": "Un gráfico de líneas muestra evolución sobre un eje ordenado."
      },
      {
        "id": "analisis-de-datos/pandas/visualizacion/histogramas",
        "label": "Histogramas",
        "description": "Un histograma representa frecuencias por intervalos numéricos."
      },
      {
        "id": "analisis-de-datos/pandas/visualizacion/dispersion",
        "label": "Dispersión",
        "description": "La dispersión compara dos variables numéricas mediante puntos."
      },
      {
        "id": "analisis-de-datos/pandas/visualizacion/caja",
        "label": "Caja",
        "description": "El diagrama de caja resume mediana, cuartiles y posibles valores atípicos."
      }
    ]
  },
  {
    "key": "exportar-datos",
    "label": "Exportar datos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/exportar-datos/definicion",
        "label": "Definición",
        "description": "Los métodos to_* guardan resultados en formatos externos o los devuelven como texto."
      },
      {
        "id": "analisis-de-datos/pandas/exportar-datos/to-csv",
        "label": "to_csv",
        "description": "Exporta texto delimitado; index=False evita una columna adicional de índice."
      },
      {
        "id": "analisis-de-datos/pandas/exportar-datos/to-excel",
        "label": "to_excel",
        "description": "Exporta una hoja; ExcelWriter permite escribir varias hojas en un libro."
      },
      {
        "id": "analisis-de-datos/pandas/exportar-datos/to-json",
        "label": "to_json",
        "description": "Serializa datos a JSON con orientaciones distintas; records genera una lista de filas."
      },
      {
        "id": "analisis-de-datos/pandas/exportar-datos/to-sql",
        "label": "to_sql",
        "description": "Escribe una tabla mediante una conexión SQL; if_exists controla conflictos."
      },
      {
        "id": "analisis-de-datos/pandas/exportar-datos/to-parquet",
        "label": "to_parquet",
        "description": "Guarda datos en formato columnar, habitualmente comprimido."
      }
    ]
  },
  {
    "key": "validacion-de-datos",
    "label": "Validación de datos",
    "children": [
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/definicion",
        "label": "Definición",
        "description": "Comprueba esquema, unicidad, relaciones y totales antes y después de transformar."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/validar-esquema-y-claves",
        "label": "Validar esquema y claves",
        "description": "Comprueba tipos, columnas obligatorias, nulos y unicidad del identificador."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/integridad-referencial",
        "label": "Integridad referencial",
        "description": "Comprueba que cada clave foránea pertenece al conjunto de claves de su entidad."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/conciliar-totales",
        "label": "Conciliar totales",
        "description": "Agrega datos al nivel correcto antes de comparar dos fuentes."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/equals-y-compare",
        "label": "equals y compare",
        "description": "equals comprueba igualdad de objetos; compare muestra diferencias entre objetos con las mismas etiquetas."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/assert-frame-equal",
        "label": "assert_frame_equal",
        "description": "Comprueba que dos DataFrames coinciden y lanza AssertionError si difieren."
      },
      {
        "id": "analisis-de-datos/pandas/validacion-de-datos/equals",
        "label": "equals",
        "description": "Comprueba si dos objetos tienen los mismos elementos y forma; los nulos coincidentes cuentan como iguales."
      }
    ]
  },
  {
    "key": "copias-y-asignacion",
    "label": "Copias y asignación",
    "children": [
      {
        "id": "analisis-de-datos/pandas/copias-y-asignacion/definicion",
        "label": "Definición",
        "description": "Pandas distingue el objeto original de otros objetos derivados; Copy-on-Write evita cambios indirectos."
      },
      {
        "id": "analisis-de-datos/pandas/copias-y-asignacion/copy",
        "label": "copy",
        "description": "Crea una copia explícita del objeto; modificarla no cambia los datos tabulares simples del original."
      },
      {
        "id": "analisis-de-datos/pandas/copias-y-asignacion/asignacion-encadenada",
        "label": "Asignación encadenada",
        "description": "Seleccionar una columna o subconjunto y asignar otra vez puede modificar un objeto intermedio en lugar del original."
      },
      {
        "id": "analisis-de-datos/pandas/copias-y-asignacion/copy-on-write",
        "label": "Copy-on-Write",
        "description": "Con CoW, un objeto derivado no modifica otro por efectos secundarios cuando se escribe en él."
      }
    ]
  },
  {
    "key": "rendimiento",
    "label": "Rendimiento",
    "children": [
      {
        "id": "analisis-de-datos/pandas/rendimiento/definicion",
        "label": "Definición",
        "description": "Reduce trabajo y memoria mediante operaciones vectorizadas, tipos apropiados y lecturas selectivas."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/vectorizacion",
        "label": "Vectorización",
        "description": "Opera sobre columnas completas en lugar de iterar cada fila en Python."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/iteracion-e-itertuples",
        "label": "Iteración e itertuples",
        "description": "itertuples permite recorrer filas cuando una operación no puede vectorizarse fácilmente."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/memoria-y-tipos-eficientes",
        "label": "Memoria y tipos eficientes",
        "description": "memory_usage(deep=True) estima memoria de columnas; tipos pequeños y category pueden reducirla."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/chunksize",
        "label": "chunksize",
        "description": "read_csv puede devolver un iterador de bloques en lugar de cargar todo a la vez."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/lectura-selectiva",
        "label": "Lectura selectiva",
        "description": "Lee solo columnas necesarias y define tipos cuando el esquema se conoce."
      },
      {
        "id": "analisis-de-datos/pandas/rendimiento/evitar-concatenacion-repetida",
        "label": "Evitar concatenación repetida",
        "description": "Acumula lotes en una lista y concatena una sola vez."
      }
    ]
  }
];
