// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const rCurriculum = [
  {
    "key": "entorno-y-paquetes",
    "label": "Entorno y paquetes",
    "children": [
      {
        "id": "analisis-de-datos/r/entorno-y-paquetes/definicion",
        "label": "Definición",
        "description": "R interpreta código y devuelve objetos o resultados; una sesión conserva los objetos creados hasta que se elimina o reinicia."
      },
      {
        "id": "analisis-de-datos/r/entorno-y-paquetes/rstudio-y-proyectos",
        "label": "RStudio y proyectos",
        "description": "Un proyecto de RStudio organiza archivos y establece un directorio de trabajo asociado al proyecto."
      },
      {
        "id": "analisis-de-datos/r/entorno-y-paquetes/instalar-y-cargar-paquetes",
        "label": "Instalar y cargar paquetes",
        "description": "`install.packages()` instala una biblioteca; `library()` la carga para usar sus funciones en la sesión."
      },
      {
        "id": "analisis-de-datos/r/entorno-y-paquetes/namespace-y-ayuda",
        "label": "Namespace y ayuda",
        "description": "`::` accede a una función exportada de un paquete sin adjuntarlo; `?` abre su ayuda."
      },
      {
        "id": "analisis-de-datos/r/entorno-y-paquetes/versiones",
        "label": "Versiones",
        "description": "`R.version.string`, `packageVersion()` y `sessionInfo()` permiten registrar el entorno."
      }
    ]
  },
  {
    "key": "variables-y-operadores",
    "label": "Variables y operadores",
    "children": [
      {
        "id": "analisis-de-datos/r/variables-y-operadores/definicion",
        "label": "Definición",
        "description": "Una variable es un nombre asociado a un objeto; `<-` asigna un valor."
      },
      {
        "id": "analisis-de-datos/r/variables-y-operadores/asignacion-y-comentarios",
        "label": "Asignación y comentarios",
        "description": "`=` también puede asignar en muchos contextos; `#` inicia un comentario hasta el final de la línea."
      },
      {
        "id": "analisis-de-datos/r/variables-y-operadores/operadores-aritmeticos",
        "label": "Operadores aritméticos",
        "description": "`+`, `-`, `*`, `/`, `^`, `%%` y `%/%` calculan suma, resta, producto, división, potencia, resto y cociente entero."
      },
      {
        "id": "analisis-de-datos/r/variables-y-operadores/comparaciones",
        "label": "Comparaciones",
        "description": "`==`, `!=`, `<`, `<=`, `>` y `>=` devuelven valores lógicos."
      },
      {
        "id": "analisis-de-datos/r/variables-y-operadores/operadores-logicos",
        "label": "Operadores lógicos",
        "description": "`&`, `|` y `!` combinan o niegan condiciones elemento a elemento; `&&` y `||` evalúan condiciones escalares con cortocircuito."
      }
    ]
  },
  {
    "key": "tipos-de-datos",
    "label": "Tipos de datos",
    "children": [
      {
        "id": "analisis-de-datos/r/tipos-de-datos/definicion",
        "label": "Definición",
        "description": "R distingue el tipo interno de un objeto de su clase, que determina comportamientos como impresión y métodos."
      },
      {
        "id": "analisis-de-datos/r/tipos-de-datos/numeric-e-integer",
        "label": "Numeric e integer",
        "description": "Los doubles representan números de punto flotante; los integer se crean con sufijo `L`."
      },
      {
        "id": "analisis-de-datos/r/tipos-de-datos/character-y-logical",
        "label": "Character y logical",
        "description": "Character guarda cadenas; logical representa `TRUE`, `FALSE` y valores faltantes lógicos."
      },
      {
        "id": "analisis-de-datos/r/tipos-de-datos/conversion-y-coercion",
        "label": "Conversión y coerción",
        "description": "`as.numeric()`, `as.integer()`, `as.character()` y `as.logical()` convierten tipos; R también puede convertirlos automáticamente."
      },
      {
        "id": "analisis-de-datos/r/tipos-de-datos/date-y-posixct",
        "label": "Date y POSIXct",
        "description": "`Date` representa fechas; `POSIXct` instantes con hora y zona horaria."
      }
    ]
  },
  {
    "key": "vectores",
    "label": "Vectores",
    "children": [
      {
        "id": "analisis-de-datos/r/vectores/definicion",
        "label": "Definición",
        "description": "Un vector atómico contiene elementos del mismo tipo. Es la unidad básica de cálculo de R."
      },
      {
        "id": "analisis-de-datos/r/vectores/secuencias-y-repeticion",
        "label": "Secuencias y repetición",
        "description": "`:` y `seq()` generan secuencias; `rep()` repite valores."
      },
      {
        "id": "analisis-de-datos/r/vectores/nombres-y-longitud",
        "label": "Nombres y longitud",
        "description": "`names()` asigna etiquetas a elementos; `length()` cuenta elementos."
      },
      {
        "id": "analisis-de-datos/r/vectores/vectorizacion-y-reciclaje",
        "label": "Vectorización y reciclaje",
        "description": "Las operaciones vectorizadas actúan elemento a elemento; los vectores cortos pueden repetirse para alcanzar la longitud del largo."
      }
    ]
  },
  {
    "key": "listas-matrices-y-arrays",
    "label": "Listas, matrices y arrays",
    "children": [
      {
        "id": "analisis-de-datos/r/listas-matrices-y-arrays/definicion",
        "label": "Definición",
        "description": "Una lista puede contener objetos de tipos y longitudes diferentes. Una matriz y un array atómico organizan elementos homogéneos por dimensiones."
      },
      {
        "id": "analisis-de-datos/r/listas-matrices-y-arrays/matrices",
        "label": "Matrices",
        "description": "`matrix()` crea una estructura bidimensional; `nrow()`, `ncol()` y `dim()` inspeccionan dimensiones."
      },
      {
        "id": "analisis-de-datos/r/listas-matrices-y-arrays/arrays",
        "label": "Arrays",
        "description": "`array()` organiza datos en dos o más dimensiones; los índices siguen el orden de `dim`."
      },
      {
        "id": "analisis-de-datos/r/listas-matrices-y-arrays/algebra-matricial",
        "label": "Álgebra matricial",
        "description": "`*` multiplica elemento a elemento y `%*%` realiza producto matricial; `t()` transpone."
      }
    ]
  },
  {
    "key": "data-frames-y-tibbles",
    "label": "Data frames y tibbles",
    "children": [
      {
        "id": "analisis-de-datos/r/data-frames-y-tibbles/definicion",
        "label": "Definición",
        "description": "Un data frame es una tabla de columnas con igual número de filas; un tibble es una variante con impresión y reglas de selección más consistentes."
      },
      {
        "id": "analisis-de-datos/r/data-frames-y-tibbles/tibble-y-tribble",
        "label": "Tibble y tribble",
        "description": "`tibble()` crea columnas; `tribble()` permite escribir filas de una tabla pequeña."
      },
      {
        "id": "analisis-de-datos/r/data-frames-y-tibbles/inspeccion-de-tablas",
        "label": "Inspección de tablas",
        "description": "`head()`, `tail()`, `str()`, `glimpse()`, `dim()` y `names()` permiten revisar datos antes de analizarlos."
      }
    ]
  },
  {
    "key": "indexacion",
    "label": "Indexación",
    "children": [
      {
        "id": "analisis-de-datos/r/indexacion/definicion",
        "label": "Definición",
        "description": "R usa índices desde 1 para extraer elementos, filas o columnas."
      },
      {
        "id": "analisis-de-datos/r/indexacion/indices-positivos-y-negativos",
        "label": "Índices positivos y negativos",
        "description": "Los índices positivos incluyen posiciones; los negativos las excluyen."
      },
      {
        "id": "analisis-de-datos/r/indexacion/indices-logicos",
        "label": "Índices lógicos",
        "description": "Un vector lógico selecciona las posiciones TRUE; NA puede producir una posición faltante."
      },
      {
        "id": "analisis-de-datos/r/indexacion/corchetes-dobles-y-dolar",
        "label": "Corchetes dobles y dólar",
        "description": "`[[ ]]` extrae un único componente; `$` accede por nombre; `[ ]` conserva una subestructura."
      },
      {
        "id": "analisis-de-datos/r/indexacion/filas-y-columnas",
        "label": "Filas y columnas",
        "description": "`tabla[filas, columnas]` selecciona ambos ejes; `drop = FALSE` conserva dimensiones en data frames base."
      }
    ]
  },
  {
    "key": "valores-faltantes",
    "label": "Valores faltantes",
    "children": [
      {
        "id": "analisis-de-datos/r/valores-faltantes/definicion",
        "label": "Definición",
        "description": "`NA` representa un valor faltante; `NULL` representa ausencia de objeto o componente; `NaN` es un resultado numérico indefinido."
      },
      {
        "id": "analisis-de-datos/r/valores-faltantes/na-nan-e-inf",
        "label": "NA, NaN e Inf",
        "description": "`is.na()` detecta NA y NaN; `is.nan()` solo NaN; `is.finite()` excluye NA, NaN e infinitos."
      },
      {
        "id": "analisis-de-datos/r/valores-faltantes/eliminar-o-ignorar-na",
        "label": "Eliminar o ignorar NA",
        "description": "`na.omit()` elimina observaciones faltantes; `na.rm = TRUE` las excluye de una agregación compatible."
      },
      {
        "id": "analisis-de-datos/r/valores-faltantes/null",
        "label": "NULL",
        "description": "`is.null()` comprueba ausencia de objeto; una asignación NULL a una columna puede eliminarla."
      }
    ]
  },
  {
    "key": "factores-y-categorias",
    "label": "Factores y categorías",
    "children": [
      {
        "id": "analisis-de-datos/r/factores-y-categorias/definicion",
        "label": "Definición",
        "description": "Un factor representa categorías con niveles definidos; un factor ordenado añade una relación de orden."
      },
      {
        "id": "analisis-de-datos/r/factores-y-categorias/factores-ordenados",
        "label": "Factores ordenados",
        "description": "`ordered()` representa categorías ordinales."
      },
      {
        "id": "analisis-de-datos/r/factores-y-categorias/forcats",
        "label": "forcats",
        "description": "`forcats` permite reordenar, renombrar y agrupar niveles."
      }
    ]
  },
  {
    "key": "condicionales-y-control-de-flujo",
    "label": "Condicionales y control de flujo",
    "children": [
      {
        "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/definicion",
        "label": "Definición",
        "description": "`if` y `else` eligen qué instrucciones ejecutar según una condición de longitud uno."
      },
      {
        "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/else-if-y-switch",
        "label": "else if y switch",
        "description": "`else if` prueba condiciones sucesivas; `switch()` selecciona alternativas por nombre o posición."
      },
      {
        "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/ifelse-y-if-else",
        "label": "ifelse y if_else",
        "description": "`ifelse()` y `dplyr::if_else()` seleccionan un valor por elemento; `if_else()` controla tipos de salida con mayor rigor."
      },
      {
        "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/for-y-while",
        "label": "for y while",
        "description": "`for` recorre elementos de una secuencia; `while` repite mientras se cumpla una condición."
      },
      {
        "id": "analisis-de-datos/r/condicionales-y-control-de-flujo/break-y-next",
        "label": "break y next",
        "description": "`break` termina un bucle; `next` salta a la siguiente iteración."
      }
    ]
  },
  {
    "key": "funciones-y-alcance",
    "label": "Funciones y alcance",
    "children": [
      {
        "id": "analisis-de-datos/r/funciones-y-alcance/definicion",
        "label": "Definición",
        "description": "`function()` define una operación reutilizable con argumentos y un resultado. R devuelve la última expresión evaluada salvo retorno explícito."
      },
      {
        "id": "analisis-de-datos/r/funciones-y-alcance/argumentos-y-valores-por-defecto",
        "label": "Argumentos y valores por defecto",
        "description": "Los parámetros pueden tener valores predeterminados; los argumentos nombrados permiten seleccionar qué parámetro modificar."
      },
      {
        "id": "analisis-de-datos/r/funciones-y-alcance/return-y-funciones-anonimas",
        "label": "Return y funciones anónimas",
        "description": "`return()` termina una función devolviendo un objeto; una función anónima se crea sin asignarle nombre."
      },
      {
        "id": "analisis-de-datos/r/funciones-y-alcance/environments-y-lexical-scoping",
        "label": "Environments y lexical scoping",
        "description": "Un entorno contiene asociaciones entre nombres y objetos. Las funciones buscan nombres libres en el entorno en que fueron definidas."
      }
    ]
  },
  {
    "key": "iteracion-funcional",
    "label": "Iteración funcional",
    "children": [
      {
        "id": "analisis-de-datos/r/iteracion-funcional/definicion",
        "label": "Definición",
        "description": "Las funciones de la familia apply y purrr aplican operaciones repetidas sobre estructuras sin escribir el bucle manualmente."
      },
      {
        "id": "analisis-de-datos/r/iteracion-funcional/apply",
        "label": "apply",
        "description": "`apply()` aplica una función a márgenes de una matriz o array."
      },
      {
        "id": "analisis-de-datos/r/iteracion-funcional/lapply-sapply-y-vapply",
        "label": "lapply, sapply y vapply",
        "description": "`sapply()` intenta simplificar una lista; `vapply()` exige un tipo de salida explícito."
      },
      {
        "id": "analisis-de-datos/r/iteracion-funcional/purrr-map",
        "label": "purrr::map",
        "description": "`map()` devuelve lista; `map_dbl()`, `map_chr()` y `map_int()` devuelven vectores del tipo indicado."
      },
      {
        "id": "analisis-de-datos/r/iteracion-funcional/reduce-filter-y-map",
        "label": "Reduce, Filter y Map",
        "description": "`Reduce()` combina elementos acumulativamente; `Filter()` selecciona por predicado; `Map()` aplica una función en paralelo y devuelve lista."
      }
    ]
  },
  {
    "key": "importacion-y-exportacion",
    "label": "Importación y exportación",
    "children": [
      {
        "id": "analisis-de-datos/r/importacion-y-exportacion/definicion",
        "label": "Definición",
        "description": "R lee archivos a objetos tabulares y exporta resultados a formatos intercambiables."
      },
      {
        "id": "analisis-de-datos/r/importacion-y-exportacion/csv-y-tipos-de-columnas",
        "label": "CSV y tipos de columnas",
        "description": "`read_csv()` admite `col_types`, `na` y `locale`; `read.csv()` es la alternativa base."
      },
      {
        "id": "analisis-de-datos/r/importacion-y-exportacion/excel",
        "label": "Excel",
        "description": "`readxl::read_excel()` lee hojas y rangos de un libro; writexl permite crearlos."
      },
      {
        "id": "analisis-de-datos/r/importacion-y-exportacion/json",
        "label": "JSON",
        "description": "`jsonlite::fromJSON()` convierte JSON en objetos R; `toJSON()` serializa objetos."
      },
      {
        "id": "analisis-de-datos/r/importacion-y-exportacion/exportar-csv-y-rds",
        "label": "Exportar CSV y RDS",
        "description": "`write_csv()` exporta tablas; `saveRDS()` y `readRDS()` guardan y recuperan un objeto con su clase."
      }
    ]
  },
  {
    "key": "pipes-y-dplyr",
    "label": "Pipes y dplyr",
    "children": [
      {
        "id": "analisis-de-datos/r/pipes-y-dplyr/definicion",
        "label": "Definición",
        "description": "El pipe `|>` pasa el resultado de una expresión a la siguiente función, normalmente como primer argumento."
      },
      {
        "id": "analisis-de-datos/r/pipes-y-dplyr/pipe-base-y-magrittr",
        "label": "Pipe base y magrittr",
        "description": "`|>` pertenece a R base; `%>%` es de magrittr y permite usar el marcador `.`."
      },
      {
        "id": "analisis-de-datos/r/pipes-y-dplyr/guardar-transformaciones",
        "label": "Guardar transformaciones",
        "description": "Los verbos de dplyr normalmente devuelven un nuevo objeto; para conservarlo se asigna a un nombre."
      }
    ]
  },
  {
    "key": "seleccion-de-columnas",
    "label": "Selección de columnas",
    "children": [
      {
        "id": "analisis-de-datos/r/seleccion-de-columnas/definicion",
        "label": "Definición",
        "description": "`select()` elige columnas de una tabla sin filtrar sus filas."
      },
      {
        "id": "analisis-de-datos/r/seleccion-de-columnas/excluir-y-seleccionar-por-patron",
        "label": "Excluir y seleccionar por patrón",
        "description": "`-`, `starts_with()`, `ends_with()`, `contains()` y `where()` seleccionan por exclusión, nombre o tipo."
      },
      {
        "id": "analisis-de-datos/r/seleccion-de-columnas/rename-y-relocate",
        "label": "rename y relocate",
        "description": "`rename()` cambia nombres; `relocate()` mueve columnas."
      },
      {
        "id": "analisis-de-datos/r/seleccion-de-columnas/all-of-y-any-of",
        "label": "all_of y any_of",
        "description": "`all_of()` exige que existan todos los nombres de un vector; `any_of()` ignora los ausentes."
      }
    ]
  },
  {
    "key": "filtrar-filas",
    "label": "Filtrar filas",
    "children": [
      {
        "id": "analisis-de-datos/r/filtrar-filas/definicion",
        "label": "Definición",
        "description": "`filter()` conserva filas cuyas condiciones son TRUE; descarta FALSE y NA."
      },
      {
        "id": "analisis-de-datos/r/filtrar-filas/and-or-y-not",
        "label": "AND, OR y NOT",
        "description": "Usa `&`, `|`, `!` o varias condiciones separadas por comas (AND)."
      },
      {
        "id": "analisis-de-datos/r/filtrar-filas/pertenencia-y-rangos",
        "label": "Pertenencia y rangos",
        "description": "`%in%` comprueba pertenencia; `between()` incluye ambos límites."
      },
      {
        "id": "analisis-de-datos/r/filtrar-filas/filtrar-na",
        "label": "Filtrar NA",
        "description": "`is.na()` y `!is.na()` seleccionan faltantes y valores presentes."
      }
    ]
  },
  {
    "key": "ordenamiento-y-primeras-filas",
    "label": "Ordenamiento y primeras filas",
    "children": [
      {
        "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/definicion",
        "label": "Definición",
        "description": "`arrange()` ordena filas; `desc()` invierte un criterio."
      },
      {
        "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/slice-y-head",
        "label": "slice y head",
        "description": "`slice()` selecciona posiciones; `slice_head()` y `slice_tail()` conservan extremos."
      },
      {
        "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/slice-max-y-slice-min",
        "label": "slice_max y slice_min",
        "description": "Seleccionan extremos según una columna; `with_ties` controla si se incluyen empates."
      }
    ]
  },
  {
    "key": "transformar-columnas",
    "label": "Transformar columnas",
    "children": [
      {
        "id": "analisis-de-datos/r/transformar-columnas/definicion",
        "label": "Definición",
        "description": "`mutate()` añade o modifica columnas conservando las filas."
      },
      {
        "id": "analisis-de-datos/r/transformar-columnas/case-when",
        "label": "case_when",
        "description": "`case_when()` clasifica con varias condiciones; gana la primera verdadera."
      },
      {
        "id": "analisis-de-datos/r/transformar-columnas/across",
        "label": "across",
        "description": "`across()` aplica funciones a varias columnas dentro de mutate o summarise."
      },
      {
        "id": "analisis-de-datos/r/transformar-columnas/transmute-y-pick",
        "label": "transmute y pick",
        "description": "`transmute()` devuelve principalmente las columnas creadas; `pick()` selecciona un conjunto dentro de un verbo."
      }
    ]
  },
  {
    "key": "funciones-de-texto",
    "label": "Funciones de texto",
    "children": [
      {
        "id": "analisis-de-datos/r/funciones-de-texto/definicion",
        "label": "Definición",
        "description": "R base y stringr permiten limpiar, comparar y extraer caracteres de cadenas."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-texto/longitud-y-subcadenas",
        "label": "Longitud y subcadenas",
        "description": "`nchar()` y `str_length()` cuentan caracteres; `substr()` y `str_sub()` extraen posiciones."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-texto/espacios-y-reemplazos",
        "label": "Espacios y reemplazos",
        "description": "`trimws()` o `str_trim()` eliminan espacios de los extremos; `str_squish()` normaliza espacios internos."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-texto/concatenacion-y-separacion",
        "label": "Concatenación y separación",
        "description": "`paste()` y `str_c()` unen cadenas; `str_split()` devuelve una lista de fragmentos."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-texto/expresiones-regulares",
        "label": "Expresiones regulares",
        "description": "Un patrón regex describe texto: `^` inicio, `$` final, `.` cualquier carácter, `+` una o más repeticiones."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-texto/extraer-y-sustituir-patrones",
        "label": "Extraer y sustituir patrones",
        "description": "`str_extract()` devuelve la coincidencia; `str_replace_all()` sustituye todas las coincidencias."
      }
    ]
  },
  {
    "key": "funciones-numericas",
    "label": "Funciones numéricas",
    "children": [
      {
        "id": "analisis-de-datos/r/funciones-numericas/definicion",
        "label": "Definición",
        "description": "Las funciones numéricas transforman cantidades sin cambiar su significado tabular."
      },
      {
        "id": "analisis-de-datos/r/funciones-numericas/round-floor-y-ceiling",
        "label": "round, floor y ceiling",
        "description": "`round()` aproxima al número de decimales indicado; `floor()` y `ceiling()` aproximan hacia abajo y arriba."
      },
      {
        "id": "analisis-de-datos/r/funciones-numericas/abs-log-y-sqrt",
        "label": "abs, log y sqrt",
        "description": "`abs()` calcula magnitud; `log()` logaritmo natural por defecto; `sqrt()` raíz cuadrada."
      },
      {
        "id": "analisis-de-datos/r/funciones-numericas/division-y-porcentajes",
        "label": "División y porcentajes",
        "description": "Una proporción divide una parte entre un total; la división por cero puede producir Inf o NaN."
      }
    ]
  },
  {
    "key": "fechas-y-horas",
    "label": "Fechas y horas",
    "children": [
      {
        "id": "analisis-de-datos/r/fechas-y-horas/definicion",
        "label": "Definición",
        "description": "Las fechas permiten ordenar eventos, calcular intervalos y agrupar por periodos."
      },
      {
        "id": "analisis-de-datos/r/fechas-y-horas/parsear-y-extraer-componentes",
        "label": "Parsear y extraer componentes",
        "description": "`ymd()`, `dmy()`, `year()`, `month()` y `day()` son funciones de lubridate para interpretar o extraer partes."
      },
      {
        "id": "analisis-de-datos/r/fechas-y-horas/agrupar-por-periodos",
        "label": "Agrupar por periodos",
        "description": "`floor_date()` aproxima al inicio de un periodo; `format()` representa fechas como texto."
      },
      {
        "id": "analisis-de-datos/r/fechas-y-horas/diferencias-e-intervalos",
        "label": "Diferencias e intervalos",
        "description": "Restar fechas o usar `difftime()` mide tiempo; lubridate distingue duraciones, periodos e intervalos."
      },
      {
        "id": "analisis-de-datos/r/fechas-y-horas/sumar-fechas-y-zonas-horarias",
        "label": "Sumar fechas y zonas horarias",
        "description": "`days()`, `months()` y `%m+%` realizan aritmética de calendario; `with_tz()` cambia la representación de un instante."
      }
    ]
  },
  {
    "key": "agregaciones",
    "label": "Agregaciones",
    "children": [
      {
        "id": "analisis-de-datos/r/agregaciones/definicion",
        "label": "Definición",
        "description": "Una agregación reduce varios valores a un resultado, como suma, promedio o conteo."
      },
      {
        "id": "analisis-de-datos/r/agregaciones/conteos",
        "label": "Conteos",
        "description": "`nrow()` cuenta filas, `length()` elementos, `sum(!is.na(x))` valores presentes y `n_distinct()` valores diferentes."
      },
      {
        "id": "analisis-de-datos/r/agregaciones/suma-media-y-extremos",
        "label": "Suma, media y extremos",
        "description": "`sum()`, `mean()`, `min()`, `max()` calculan distintos resúmenes de un vector."
      },
      {
        "id": "analisis-de-datos/r/agregaciones/agregacion-condicional",
        "label": "Agregación condicional",
        "description": "Se puede filtrar antes de sumar o usar una condición dentro de una agregación."
      }
    ]
  },
  {
    "key": "agrupar-y-resumir",
    "label": "Agrupar y resumir",
    "children": [
      {
        "id": "analisis-de-datos/r/agrupar-y-resumir/definicion",
        "label": "Definición",
        "description": "`group_by()` define grupos; `summarise()` reduce cada grupo a una fila de resumen."
      },
      {
        "id": "analisis-de-datos/r/agrupar-y-resumir/varias-agregaciones-y-count",
        "label": "Varias agregaciones y count",
        "description": "`summarise()` permite varios cálculos; `n()` cuenta filas del grupo y `count()` combina agrupación y conteo."
      },
      {
        "id": "analisis-de-datos/r/agrupar-y-resumir/agrupar-varias-columnas",
        "label": "Agrupar varias columnas",
        "description": "La combinación de valores define cada grupo; `ungroup()` elimina agrupación residual."
      },
      {
        "id": "analisis-de-datos/r/agrupar-y-resumir/filtrar-antes-y-despues",
        "label": "Filtrar antes y después",
        "description": "`filter()` antes de summarise filtra filas originales; después filtra los resultados agregados."
      },
      {
        "id": "analisis-de-datos/r/agrupar-y-resumir/agregacion-por-operacion-y-reframe",
        "label": "Agregación por operación y reframe",
        "description": "`.by` agrupa solo para una operación; `reframe()` permite devolver varias filas por grupo."
      }
    ]
  },
  {
    "key": "valores-unicos-y-duplicados",
    "label": "Valores únicos y duplicados",
    "children": [
      {
        "id": "analisis-de-datos/r/valores-unicos-y-duplicados/definicion",
        "label": "Definición",
        "description": "`distinct()` conserva filas únicas según las columnas elegidas; `duplicated()` señala repeticiones."
      },
      {
        "id": "analisis-de-datos/r/valores-unicos-y-duplicados/detectar-duplicados",
        "label": "Detectar duplicados",
        "description": "Un conteo por clave seguido de un filtro identifica claves repetidas."
      },
      {
        "id": "analisis-de-datos/r/valores-unicos-y-duplicados/conservar-una-fila-por-clave",
        "label": "Conservar una fila por clave",
        "description": "`distinct(clave, .keep_all = TRUE)` mantiene la primera fila por clave."
      }
    ]
  },
  {
    "key": "joins",
    "label": "Joins",
    "children": [
      {
        "id": "analisis-de-datos/r/joins/definicion",
        "label": "Definición",
        "description": "Un join combina tablas mediante claves relacionadas. `inner_join()` conserva coincidencias de ambas tablas."
      },
      {
        "id": "analisis-de-datos/r/joins/left-join-right-join-y-full-join",
        "label": "left_join, right_join y full_join",
        "description": "Conservan respectivamente las filas de la izquierda, derecha o ambas aunque no tengan coincidencia."
      },
      {
        "id": "analisis-de-datos/r/joins/semi-join-y-anti-join",
        "label": "semi_join y anti_join",
        "description": "`semi_join()` conserva filas con coincidencia sin añadir columnas; `anti_join()` conserva las que no coinciden."
      },
      {
        "id": "analisis-de-datos/r/joins/cardinalidad-y-claves-multiples",
        "label": "Cardinalidad y claves múltiples",
        "description": "Las relaciones 1:1, 1:N y N:M determinan cuántas filas produce una unión. `relationship` permite exigir una relación esperada."
      },
      {
        "id": "analisis-de-datos/r/joins/unir-varias-tablas",
        "label": "Unir varias tablas",
        "description": "Se pueden encadenar joins; cada paso cambia las columnas y puede cambiar el número de filas."
      },
      {
        "id": "analisis-de-datos/r/joins/merge-y-cross-join",
        "label": "merge y cross_join",
        "description": "`merge()` es la unión de base R; `cross_join()` genera todas las combinaciones de filas. Un self join une una tabla consigo misma."
      }
    ]
  },
  {
    "key": "combinar-tablas-y-conjuntos",
    "label": "Combinar tablas y conjuntos",
    "children": [
      {
        "id": "analisis-de-datos/r/combinar-tablas-y-conjuntos/definicion",
        "label": "Definición",
        "description": "`bind_rows()` apila filas por nombre de columna; `bind_cols()` coloca columnas lado a lado por posición."
      },
      {
        "id": "analisis-de-datos/r/combinar-tablas-y-conjuntos/operaciones-de-conjuntos",
        "label": "Operaciones de conjuntos",
        "description": "`union()`, `intersect()` y `setdiff()` combinan, intersectan o restan conjuntos, eliminando duplicados."
      }
    ]
  },
  {
    "key": "reestructurar-datos-con-tidyr",
    "label": "Reestructurar datos con tidyr",
    "children": [
      {
        "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/definicion",
        "label": "Definición",
        "description": "En datos ordenados (tidy data), cada variable es una columna y cada observación una fila; tidyr cambia la estructura para conseguirlo."
      },
      {
        "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/pivot-wider",
        "label": "pivot_wider",
        "description": "`pivot_wider()` convierte valores de una columna en encabezados y otra columna en celdas."
      },
      {
        "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/separar-y-unir-columnas",
        "label": "Separar y unir columnas",
        "description": "`separate_wider_delim()` divide cadenas delimitadas; `unite()` combina columnas."
      },
      {
        "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/columnas-lista-y-unnest",
        "label": "Columnas lista y unnest",
        "description": "Una list-column contiene objetos por fila; `unnest_longer()` expande sus elementos en nuevas filas."
      }
    ]
  },
  {
    "key": "limpieza-y-calidad-de-datos",
    "label": "Limpieza y calidad de datos",
    "children": [
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/definicion",
        "label": "Definición",
        "description": "Limpiar datos significa corregir representaciones y tratar inconsistencias con reglas explícitas, preservando el significado original."
      },
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/coalesce-y-replace-na",
        "label": "coalesce y replace_na",
        "description": "`coalesce()` toma el primer valor no faltante por posición; `replace_na()` sustituye faltantes con valores elegidos."
      },
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/na-if-drop-na-y-fill",
        "label": "na_if, drop_na y fill",
        "description": "`na_if()` transforma un valor específico en NA; `drop_na()` elimina filas; `fill()` propaga valores vecinos por orden."
      },
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/complete",
        "label": "complete",
        "description": "`complete()` hace explícitas combinaciones ausentes de variables; puede rellenarlas con valores indicados."
      },
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/validacion-de-esquema-y-claves",
        "label": "Validación de esquema y claves",
        "description": "`stopifnot()` permite comprobar condiciones; la unicidad y la integridad referencial son reglas verificables."
      },
      {
        "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/outliers",
        "label": "Outliers",
        "description": "Un valor extremo puede ser un error o un evento real; el rango intercuartílico permite marcar candidatos a revisión."
      }
    ]
  },
  {
    "key": "funciones-de-ventana",
    "label": "Funciones de ventana",
    "children": [
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/definicion",
        "label": "Definición",
        "description": "Las operaciones de ventana calculan valores usando otras filas sin reducir la tabla. Con dplyr se suelen combinar `mutate()`, orden y agrupación."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/row-number-min-rank-y-dense-rank",
        "label": "row_number, min_rank y dense_rank",
        "description": "`row_number()` asigna posiciones únicas; `min_rank()` conserva empates con saltos; `dense_rank()` conserva empates sin saltos."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/lag-y-lead",
        "label": "lag y lead",
        "description": "`lag()` recupera valores previos; `lead()` siguientes, según orden actual o `order_by`."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/acumulados",
        "label": "Acumulados",
        "description": "`cumsum()`, `cummean()`, `cummin()` y `cummax()` mantienen el resultado acumulado por posición."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/ventanas-por-grupo",
        "label": "Ventanas por grupo",
        "description": "`group_by()` antes de mutate reinicia cálculos dentro de cada grupo."
      },
      {
        "id": "analisis-de-datos/r/funciones-de-ventana/promedios-moviles",
        "label": "Promedios móviles",
        "description": "Una ventana móvil usa un subconjunto de observaciones cercanas; `slider::slide_dbl()` permite definir cuántas anteriores y posteriores."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva",
    "children": [
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "Resume la distribución de una variable mediante tendencia central, dispersión y posición."
      },
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/media-mediana-y-moda",
        "label": "Media, mediana y moda",
        "description": "`mean()` y `median()` calculan media y mediana; la moda estadística es el valor más frecuente."
      },
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/varianza-y-desviacion-estandar",
        "label": "Varianza y desviación estándar",
        "description": "`var()` y `sd()` estiman dispersión muestral usando denominador n−1."
      },
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/cuantiles-y-percentiles",
        "label": "Cuantiles y percentiles",
        "description": "`quantile()` estima puntos de corte de una distribución; `IQR()` calcula Q3−Q1."
      },
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/frecuencias-y-proporciones",
        "label": "Frecuencias y proporciones",
        "description": "`table()` cuenta categorías y `prop.table()` convierte conteos en proporciones."
      },
      {
        "id": "analisis-de-datos/r/estadistica-descriptiva/correlacion-y-covarianza",
        "label": "Correlación y covarianza",
        "description": "`cor()` mide asociación lineal (Pearson) o monotónica (Spearman); `cov()` estima covarianza."
      }
    ]
  },
  {
    "key": "visualizacion-con-ggplot2",
    "label": "Visualización con ggplot2",
    "children": [
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/definicion",
        "label": "Definición",
        "description": "ggplot2 construye gráficos por capas: datos, mapeos estéticos (`aes()`) y geometrías (`geom_*`)."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/barras-y-conteos",
        "label": "Barras y conteos",
        "description": "`geom_bar()` cuenta filas por categoría; `geom_col()` utiliza valores ya calculados."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/lineas-y-series-temporales",
        "label": "Líneas y series temporales",
        "description": "`geom_line()` conecta observaciones según x; `group` define series independientes."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/histogramas-y-boxplots",
        "label": "Histogramas y boxplots",
        "description": "`geom_histogram()` divide valores numéricos en intervalos; `geom_boxplot()` muestra mediana, cuartiles y valores extremos."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/dispersion-y-ajuste",
        "label": "Dispersión y ajuste",
        "description": "`geom_point()` muestra pares numéricos; `geom_smooth()` añade un ajuste."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/facetas-escalas-y-temas",
        "label": "Facetas, escalas y temas",
        "description": "`facet_wrap()` divide en paneles; `scale_*()`, `labs()` y `theme_*()` ajustan ejes, etiquetas y apariencia."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-con-ggplot2/guardar-graficos",
        "label": "Guardar gráficos",
        "description": "`ggsave()` escribe un gráfico a un archivo con tamaño y resolución especificados."
      }
    ]
  },
  {
    "key": "probabilidad-y-muestreo",
    "label": "Probabilidad y muestreo",
    "children": [
      {
        "id": "analisis-de-datos/r/probabilidad-y-muestreo/definicion",
        "label": "Definición",
        "description": "Una distribución describe los valores posibles de una variable aleatoria y sus probabilidades. R ofrece funciones d, p, q y r para densidad o masa, acumulada, cuantiles y simulación."
      },
      {
        "id": "analisis-de-datos/r/probabilidad-y-muestreo/distribuciones-discretas",
        "label": "Distribuciones discretas",
        "description": "La binomial modela éxitos en ensayos independientes de probabilidad fija; Poisson modela conteos bajo ciertas hipótesis."
      },
      {
        "id": "analisis-de-datos/r/probabilidad-y-muestreo/muestreo-y-semillas",
        "label": "Muestreo y semillas",
        "description": "`sample()` selecciona elementos con o sin reemplazo; `set.seed()` fija el estado inicial del generador aleatorio."
      },
      {
        "id": "analisis-de-datos/r/probabilidad-y-muestreo/bootstrap",
        "label": "Bootstrap",
        "description": "El bootstrap estima variabilidad remuestreando con reemplazo las observaciones disponibles."
      }
    ]
  },
  {
    "key": "estadistica-inferencial",
    "label": "Estadística inferencial",
    "children": [
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/definicion",
        "label": "Definición",
        "description": "La inferencia usa una muestra y supuestos para estimar parámetros o contrastar hipótesis de una población."
      },
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/intervalos-de-confianza",
        "label": "Intervalos de confianza",
        "description": "Un intervalo de confianza cuantifica la incertidumbre de una estimación mediante un procedimiento con cobertura nominal."
      },
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/pruebas-t",
        "label": "Pruebas t",
        "description": "`t.test()` compara medias; Welch es la opción independiente por defecto, y `paired = TRUE` compara diferencias emparejadas."
      },
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/chi-cuadrada-y-fisher",
        "label": "Chi-cuadrada y Fisher",
        "description": "`chisq.test()` contrasta independencia en tablas de contingencia; `fisher.test()` ofrece una prueba exacta útil con conteos pequeños."
      },
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/anova",
        "label": "ANOVA",
        "description": "`aov()` ajusta un modelo de análisis de varianza para comparar medias entre grupos."
      },
      {
        "id": "analisis-de-datos/r/estadistica-inferencial/pruebas-no-parametricas",
        "label": "Pruebas no paramétricas",
        "description": "`wilcox.test()` y `kruskal.test()` usan rangos para contrastar distribuciones bajo sus respectivos supuestos."
      }
    ]
  },
  {
    "key": "experimentos-y-pruebas-a-b",
    "label": "Experimentos y pruebas A/B",
    "children": [
      {
        "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/definicion",
        "label": "Definición",
        "description": "Un experimento A/B compara variantes con asignación aleatoria y una métrica definida antes de analizar resultados."
      },
      {
        "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/diferencia-absoluta-y-lift",
        "label": "Diferencia absoluta y lift",
        "description": "La diferencia de tasas mide puntos porcentuales; el lift relativo divide el cambio por la tasa de referencia."
      },
      {
        "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/contraste-de-proporciones",
        "label": "Contraste de proporciones",
        "description": "`prop.test()` compara proporciones y devuelve estimación, intervalo y valor p."
      },
      {
        "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/potencia-y-tamano-de-muestra",
        "label": "Potencia y tamaño de muestra",
        "description": "`power.prop.test()` estima tamaño por grupo para detectar una diferencia de proporciones con potencia y nivel especificados."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/r/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "Un KPI mide un objetivo de negocio mediante una definición explícita de numerador, denominador, unidad y periodo."
      },
      {
        "id": "analisis-de-datos/r/metricas-de-negocio/tasas-y-segmentacion",
        "label": "Tasas y segmentación",
        "description": "Una tasa compara una parte con su población de referencia; segmentar repite la definición por grupo."
      },
      {
        "id": "analisis-de-datos/r/metricas-de-negocio/crecimiento-entre-periodos",
        "label": "Crecimiento entre periodos",
        "description": "El crecimiento relativo compara el valor actual con el anterior, dividiendo la diferencia por el anterior."
      },
      {
        "id": "analisis-de-datos/r/metricas-de-negocio/cohortes-y-retencion",
        "label": "Cohortes y retención",
        "description": "Una cohorte agrupa clientes por fecha de inicio; la retención mide qué proporción sigue activa en un periodo posterior."
      },
      {
        "id": "analisis-de-datos/r/metricas-de-negocio/funnel-de-conversion",
        "label": "Funnel de conversión",
        "description": "Un funnel mide el paso entre etapas ordenadas y exige una regla para identificar usuarios que completaron cada paso."
      }
    ]
  },
  {
    "key": "regresion-y-modelos-estadisticos",
    "label": "Regresión y modelos estadísticos",
    "children": [
      {
        "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/definicion",
        "label": "Definición",
        "description": "Un modelo relaciona una respuesta con variables explicativas bajo supuestos explícitos. En R, la fórmula `y ~ x` describe esa relación."
      },
      {
        "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/regresion-multiple-e-interacciones",
        "label": "Regresión múltiple e interacciones",
        "description": "`lm(y ~ x1 + x2)` añade predictores; `x1 * x2` incluye efectos principales e interacción."
      },
      {
        "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/prediccion-y-residuos",
        "label": "Predicción y residuos",
        "description": "`predict()` calcula valores ajustados o para nuevos datos; `residuals()` devuelve observado menos ajustado en lm."
      },
      {
        "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/regresion-logistica-y-glm",
        "label": "Regresión logística y GLM",
        "description": "`glm(..., family = binomial())` ajusta una respuesta binaria mediante un enlace logit por defecto."
      },
      {
        "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/resultados-con-broom",
        "label": "Resultados con broom",
        "description": "`tidy()` convierte coeficientes a tabla; `glance()` resume el modelo; `augment()` añade predicciones y residuos."
      }
    ]
  },
  {
    "key": "bases-de-datos-y-sql",
    "label": "Bases de datos y SQL",
    "children": [
      {
        "id": "analisis-de-datos/r/bases-de-datos-y-sql/definicion",
        "label": "Definición",
        "description": "DBI proporciona una interfaz para conexiones y consultas; un controlador como RSQLite, RMariaDB o RPostgres implementa el acceso al motor."
      },
      {
        "id": "analisis-de-datos/r/bases-de-datos-y-sql/consultas-parametrizadas",
        "label": "Consultas parametrizadas",
        "description": "Los parámetros de DBI separan los valores de la sentencia SQL y evitan concatenar texto de entrada directamente."
      },
      {
        "id": "analisis-de-datos/r/bases-de-datos-y-sql/dbplyr-y-evaluacion-diferida",
        "label": "dbplyr y evaluación diferida",
        "description": "`tbl()` sobre una conexión representa una tabla remota; dbplyr traduce verbos a SQL y ejecuta al solicitar resultados."
      },
      {
        "id": "analisis-de-datos/r/bases-de-datos-y-sql/transacciones-y-escritura",
        "label": "Transacciones y escritura",
        "description": "`dbExecute()` ejecuta sentencias de modificación; `dbWithTransaction()` confirma si se completa el bloque y revierte si falla."
      }
    ]
  },
  {
    "key": "apis-y-automatizacion",
    "label": "APIs y automatización",
    "children": [
      {
        "id": "analisis-de-datos/r/apis-y-automatizacion/definicion",
        "label": "Definición",
        "description": "Una API HTTP intercambia solicitudes y respuestas; httr2 construye y ejecuta solicitudes, y jsonlite interpreta contenido JSON."
      },
      {
        "id": "analisis-de-datos/r/apis-y-automatizacion/autenticacion-y-respuestas",
        "label": "Autenticación y respuestas",
        "description": "`req_auth_bearer_token()` adjunta un token; `req_perform()` ejecuta; `resp_body_json()` interpreta una respuesta JSON."
      },
      {
        "id": "analisis-de-datos/r/apis-y-automatizacion/paginacion-y-reintentos",
        "label": "Paginación y reintentos",
        "description": "Muchas APIs entregan datos por páginas; la estrategia de avance depende de su contrato. `req_retry()` configura reintentos."
      },
      {
        "id": "analisis-de-datos/r/apis-y-automatizacion/procesar-archivos-por-lotes",
        "label": "Procesar archivos por lotes",
        "description": "`list.files()` localiza archivos y funciones de iteración procesan cada uno."
      }
    ]
  },
  {
    "key": "reportes-reproducibles",
    "label": "Reportes reproducibles",
    "children": [
      {
        "id": "analisis-de-datos/r/reportes-reproducibles/definicion",
        "label": "Definición",
        "description": "Quarto y R Markdown combinan texto, código y resultados en documentos que se pueden regenerar."
      },
      {
        "id": "analisis-de-datos/r/reportes-reproducibles/quarto-y-r-markdown",
        "label": "Quarto y R Markdown",
        "description": "Un archivo `.qmd` o `.Rmd` contiene bloques de código R; el motor ejecuta esos bloques durante el renderizado."
      },
      {
        "id": "analisis-de-datos/r/reportes-reproducibles/semillas-y-dependencias",
        "label": "Semillas y dependencias",
        "description": "`renv` registra versiones de dependencias en un archivo de bloqueo, permitiendo restaurarlas posteriormente."
      },
      {
        "id": "analisis-de-datos/r/reportes-reproducibles/control-de-versiones-y-pipelines",
        "label": "Control de versiones y pipelines",
        "description": "Git registra cambios de archivos; targets ejecuta etapas según dependencias y resultados previamente calculados."
      }
    ]
  },
  {
    "key": "dashboards-y-aplicaciones",
    "label": "Dashboards y aplicaciones",
    "children": [
      {
        "id": "analisis-de-datos/r/dashboards-y-aplicaciones/definicion",
        "label": "Definición",
        "description": "Shiny conecta entradas de usuario con resultados reactivos en aplicaciones web de R."
      },
      {
        "id": "analisis-de-datos/r/dashboards-y-aplicaciones/reactivos-y-salidas",
        "label": "Reactivos y salidas",
        "description": "`reactive()` define un cálculo que se puede reutilizar en múltiples salidas; `renderPlot()` y `renderTable()` generan salidas visibles."
      },
      {
        "id": "analisis-de-datos/r/dashboards-y-aplicaciones/dashboards-de-reportes",
        "label": "Dashboards de reportes",
        "description": "Quarto dashboards y flexdashboard organizan tablas, gráficos e indicadores en una interfaz de reporte."
      }
    ]
  },
  {
    "key": "series-temporales-y-pronosticos",
    "label": "Series temporales y pronósticos",
    "children": [
      {
        "id": "analisis-de-datos/r/series-temporales-y-pronosticos/definicion",
        "label": "Definición",
        "description": "Una serie temporal ordena observaciones en el tiempo; `ts()` representa series regulares con frecuencia conocida."
      },
      {
        "id": "analisis-de-datos/r/series-temporales-y-pronosticos/tendencia-y-estacionalidad",
        "label": "Tendencia y estacionalidad",
        "description": "La tendencia describe cambio persistente; la estacionalidad describe patrones que se repiten con una frecuencia."
      },
      {
        "id": "analisis-de-datos/r/series-temporales-y-pronosticos/pronostico-y-evaluacion-temporal",
        "label": "Pronóstico y evaluación temporal",
        "description": "Un pronóstico estima valores futuros; modelos ETS y ARIMA representan patrones temporales distintos."
      },
      {
        "id": "analisis-de-datos/r/series-temporales-y-pronosticos/zoo-xts-y-tsibble",
        "label": "zoo, xts y tsibble",
        "description": "Estos paquetes representan observaciones indexadas por tiempo; tsibble explicita índice y claves."
      }
    ]
  },
  {
    "key": "machine-learning-y-evaluacion",
    "label": "Machine learning y evaluación",
    "children": [
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/definicion",
        "label": "Definición",
        "description": "El aprendizaje automático ajusta reglas a datos para predecir o descubrir patrones. La evaluación debe realizarse sobre observaciones no usadas para ajustar el modelo."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/regresion-y-metricas",
        "label": "Regresión y métricas",
        "description": "MAE mide error absoluto medio; RMSE penaliza más los errores grandes; R² describe ajuste según la definición utilizada."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/clasificacion-y-metricas",
        "label": "Clasificación y métricas",
        "description": "Una clasificación predice categorías. Exactitud, precisión, recall, F1 y ROC AUC capturan aspectos distintos del rendimiento."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/arboles-y-random-forest",
        "label": "Árboles y random forest",
        "description": "Un árbol divide observaciones mediante reglas; random forest combina muchos árboles para estabilizar predicciones."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/clustering",
        "label": "Clustering",
        "description": "El clustering agrupa observaciones sin una etiqueta objetivo; k-means minimiza distancias cuadráticas a centros."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/validacion-cruzada-y-tuning",
        "label": "Validación cruzada y tuning",
        "description": "La validación cruzada separa varias particiones de entrenamiento y evaluación; el tuning elige hiperparámetros usando solo datos de entrenamiento."
      },
      {
        "id": "analisis-de-datos/r/machine-learning-y-evaluacion/tidymodels-y-caret",
        "label": "tidymodels y caret",
        "description": "tidymodels separa recetas, especificación de modelo, workflows y evaluación; caret ofrece otra interfaz para entrenar y validar modelos."
      }
    ]
  },
  {
    "key": "evaluacion-de-expresiones-y-objetos",
    "label": "Evaluación de expresiones y objetos",
    "children": [
      {
        "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/definicion",
        "label": "Definición",
        "description": "R permite que una función reciba expresiones sin evaluarlas inmediatamente. dplyr usa data masking para interpretar nombres de columnas dentro de verbos."
      },
      {
        "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/tidy-evaluation",
        "label": "Tidy evaluation",
        "description": "`{{ }}` permite pasar un argumento de columna a un verbo de tidyverse; `enquo()` captura una expresión y su entorno."
      },
      {
        "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/s3",
        "label": "S3",
        "description": "S3 despacha métodos según la clase del objeto mediante funciones genéricas como `print()` o `summary()`."
      },
      {
        "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/s4-y-r6",
        "label": "S4 y R6",
        "description": "S4 define clases y métodos formales con slots; R6 crea objetos con métodos y semántica de referencia."
      }
    ]
  },
  {
    "key": "rendimiento-y-datos-grandes",
    "label": "Rendimiento y datos grandes",
    "children": [
      {
        "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/definicion",
        "label": "Definición",
        "description": "Optimizar consiste en medir tiempo y memoria, identificar cuellos de botella y reducir trabajo innecesario sin alterar resultados."
      },
      {
        "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/data-table",
        "label": "data.table",
        "description": "data.table ofrece manipulación tabular mediante `DT[i, j, by]`, donde i filtra, j calcula y by agrupa."
      },
      {
        "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/profiling-y-memoria",
        "label": "Profiling y memoria",
        "description": "`Rprof()` registra muestras de ejecución; `object.size()` estima el tamaño de un objeto."
      },
      {
        "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/arrow-y-parquet",
        "label": "Arrow y Parquet",
        "description": "Arrow facilita leer datos columnares; Parquet conserva tipos y permite lectura eficiente."
      },
      {
        "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/duckdb",
        "label": "DuckDB",
        "description": "DuckDB es un motor analítico embebido que puede consultar archivos y tablas desde R a través de DBI."
      }
    ]
  },
  {
    "key": "pruebas-errores-y-paquetes",
    "label": "Pruebas, errores y paquetes",
    "children": [
      {
        "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/definicion",
        "label": "Definición",
        "description": "El código mantenible comprueba supuestos, maneja fallos y separa funciones reutilizables de scripts de ejecución."
      },
      {
        "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/condiciones-y-trycatch",
        "label": "Condiciones y tryCatch",
        "description": "`stop()` señala error; `warning()` advierte; `tryCatch()` permite manejar condiciones."
      },
      {
        "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/depuracion",
        "label": "Depuración",
        "description": "`traceback()` muestra llamadas tras un error no capturado; `debugonce()` y `browser()` permiten inspeccionar ejecución."
      },
      {
        "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/testthat",
        "label": "testthat",
        "description": "testthat compara resultados reales con expectativas y agrupa comprobaciones en pruebas."
      },
      {
        "id": "analisis-de-datos/r/pruebas-errores-y-paquetes/desarrollo-de-paquetes",
        "label": "Desarrollo de paquetes",
        "description": "Un paquete organiza código en R/, metadatos en DESCRIPTION, exportaciones en NAMESPACE y pruebas en tests/."
      }
    ]
  },
  {
    "key": "visualizacion-interactiva-y-espacial",
    "label": "Visualización interactiva y espacial",
    "children": [
      {
        "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/definicion",
        "label": "Definición",
        "description": "Los gráficos interactivos permiten explorar marcas y escalas; los datos espaciales añaden geometrías y sistemas de coordenadas."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/geometrias-y-crs",
        "label": "Geometrías y CRS",
        "description": "sf combina atributos con geometrías; el CRS define el sistema de referencia de coordenadas."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/mapas-y-uniones-espaciales",
        "label": "Mapas y uniones espaciales",
        "description": "`geom_sf()` dibuja geometrías; `st_join()` relaciona objetos según predicados espaciales."
      },
      {
        "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/animacion",
        "label": "Animación",
        "description": "gganimate crea secuencias de estados a partir de gráficos ggplot2."
      }
    ]
  },
  {
    "key": "analisis-estadistico-especializado",
    "label": "Análisis estadístico especializado",
    "children": [
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/definicion",
        "label": "Definición",
        "description": "Los métodos especializados responden preguntas que necesitan supuestos, estructuras de datos o modelos adicionales a una descripción de negocio."
      },
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/analisis-causal",
        "label": "Análisis causal",
        "description": "La inferencia causal intenta estimar efectos de intervenciones bajo supuestos de identificación; la asignación aleatoria ayuda a controlar confusión."
      },
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/analisis-bayesiano",
        "label": "Análisis bayesiano",
        "description": "Actualiza una distribución previa con evidencia mediante un modelo probabilístico para obtener una distribución posterior."
      },
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/supervivencia",
        "label": "Supervivencia",
        "description": "El análisis de supervivencia estudia tiempo hasta un evento y permite considerar observaciones censuradas."
      },
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/texto-y-nlp",
        "label": "Texto y NLP",
        "description": "El procesamiento de lenguaje natural transforma texto en representaciones útiles para analizar contenido."
      },
      {
        "id": "analisis-de-datos/r/analisis-estadistico-especializado/simulacion-monte-carlo",
        "label": "Simulación Monte Carlo",
        "description": "Monte Carlo aproxima cantidades mediante muchas realizaciones aleatorias de un modelo."
      }
    ]
  }
];
