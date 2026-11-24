// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const numpyCurriculum = [
  {
    "key": "ndarray-y-fundamentos",
    "label": "ndarray y fundamentos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/definicion",
        "label": "Definición",
        "description": "Un ndarray contiene elementos de un mismo dtype organizados en cero o más ejes. Se usa para operar sobre colecciones numéricas sin recorrerlas manualmente."
      },
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/ndarray-y-listas",
        "label": "ndarray y listas",
        "description": "np.array convierte una colección en un ndarray. Los operadores aritméticos de NumPy actúan elemento a elemento, a diferencia de los de una lista de Python."
      },
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/np-array-y-np-asarray",
        "label": "np.array y np.asarray",
        "description": "array crea un array y normalmente copia; asarray evita copiar si la entrada ya es compatible."
      },
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/shape-ndim-y-size",
        "label": "shape, ndim y size",
        "description": "shape da el tamaño de cada eje, ndim cuenta ejes y size cuenta elementos totales."
      },
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/dtype-itemsize-y-nbytes",
        "label": "dtype, itemsize y nbytes",
        "description": "dtype identifica el tipo, itemsize los bytes por elemento y nbytes los bytes del buffer de elementos."
      },
      {
        "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/escalares-y-arrays-0d",
        "label": "Escalares y arrays 0D",
        "description": "Un escalar de NumPy tiene un tipo numérico propio; un array 0D tiene shape (). item extrae el valor Python."
      }
    ]
  },
  {
    "key": "creacion-de-arrays",
    "label": "Creación de arrays",
    "children": [
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/definicion",
        "label": "Definición",
        "description": "Las funciones de creación construyen datos a partir de listas, dimensiones, constantes o intervalos."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/arange",
        "label": "arange",
        "description": "Genera una secuencia con paso fijo, excluyendo el límite final."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/linspace",
        "label": "linspace",
        "description": "Genera una cantidad fija de puntos equidistantes entre dos extremos."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/zeros-ones-y-full",
        "label": "zeros, ones y full",
        "description": "Crean arrays llenos de cero, uno o un valor elegido."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/empty",
        "label": "empty",
        "description": "Reserva memoria sin inicializar sus valores."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/eye-e-identity",
        "label": "eye e identity",
        "description": "Crean matrices con unos en una diagonal y ceros fuera de ella."
      },
      {
        "id": "analisis-de-datos/numpy/creacion-de-arrays/funciones-like",
        "label": "Funciones like",
        "description": "zeros_like, ones_like y full_like reutilizan la forma y normalmente el dtype de otro array."
      }
    ]
  },
  {
    "key": "tipos-de-datos",
    "label": "Tipos de datos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/definicion",
        "label": "Definición",
        "description": "dtype determina representación, rango y operaciones de los elementos. Un ndarray ordinario no almacena un tipo independiente por celda."
      },
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/enteros-flotantes-y-booleanos",
        "label": "Enteros, flotantes y booleanos",
        "description": "Los enteros representan cantidades discretas, los float aproximan números reales y bool representa condiciones."
      },
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/texto-object-y-numeros-complejos",
        "label": "Texto, object y números complejos",
        "description": "Los arrays pueden almacenar cadenas, objetos Python o complejos. object pierde muchas ventajas de la representación numérica homogénea."
      },
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/astype",
        "label": "astype",
        "description": "Convierte los elementos a otro dtype y por defecto crea una copia."
      },
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/promocion-de-tipos",
        "label": "Promoción de tipos",
        "description": "Al combinar dtypes NumPy elige un tipo común según sus reglas de promoción. result_type permite consultarlo."
      },
      {
        "id": "analisis-de-datos/numpy/tipos-de-datos/rango-de-tipos",
        "label": "Rango de tipos",
        "description": "iinfo describe los límites de enteros y finfo la precisión y rango de flotantes."
      }
    ]
  },
  {
    "key": "indexacion-y-slicing",
    "label": "Indexación y slicing",
    "children": [
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/definicion",
        "label": "Definición",
        "description": "La indexación selecciona elementos por posición; slicing selecciona intervalos. Los índices empiezan en cero."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/indices-positivos-y-negativos",
        "label": "Índices positivos y negativos",
        "description": "Los índices positivos cuentan desde cero y los negativos desde el final."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/slicing-start-stop-step",
        "label": "Slicing start:stop:step",
        "description": "Un slice selecciona desde start hasta antes de stop, con el paso indicado."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/filas-y-columnas",
        "label": "Filas y columnas",
        "description": "En dos dimensiones, el primer índice selecciona filas y el segundo columnas."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/slicing-multidimensional",
        "label": "Slicing multidimensional",
        "description": "Combina slices por eje para extraer una región rectangular."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/ellipsis",
        "label": "Ellipsis",
        "description": "Los tres puntos sustituyen los ejes intermedios no indicados."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/fancy-indexing",
        "label": "Fancy indexing",
        "description": "Un array o lista de índices enteros selecciona posiciones concretas y puede repetirlas."
      },
      {
        "id": "analisis-de-datos/numpy/indexacion-y-slicing/indices-emparejados-e-ix",
        "label": "Índices emparejados e ix_",
        "description": "Dos arrays de índices seleccionan pares de posiciones; ix_ construye el producto cartesiano de índices."
      }
    ]
  },
  {
    "key": "comparaciones-y-mascaras",
    "label": "Comparaciones y máscaras",
    "children": [
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/definicion",
        "label": "Definición",
        "description": "Las comparaciones elemento a elemento producen arrays booleanos. Una máscara selecciona los elementos donde la condición es True."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/comparaciones-y-ufuncs-logicas",
        "label": "Comparaciones y ufuncs lógicas",
        "description": "Los operadores ==, !=, >, >=, <, <= y funciones equal, greater o less comparan valores."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/boolean-indexing",
        "label": "Boolean indexing",
        "description": "a[mascara] devuelve los elementos que cumplen una condición."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/and-or-y-not",
        "label": "AND, OR y NOT",
        "description": "&, | y ~ combinan máscaras elemento a elemento; logical_and, logical_or y logical_not son sus equivalentes booleanos."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/mascaras-de-filas",
        "label": "Máscaras de filas",
        "description": "Una máscara unidimensional aplicada a una matriz selecciona filas enteras."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/any-y-all",
        "label": "any y all",
        "description": "any comprueba si al menos un elemento es verdadero; all si todos son verdaderos."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/isclose-y-allclose",
        "label": "isclose y allclose",
        "description": "Comparan números flotantes con tolerancia; allclose resume si todos los pares son cercanos."
      },
      {
        "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/array-equal",
        "label": "array_equal",
        "description": "Comprueba igualdad de forma y elementos entre arrays, con opción equal_nan."
      }
    ]
  },
  {
    "key": "operaciones-vectorizadas",
    "label": "Operaciones vectorizadas",
    "children": [
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/definicion",
        "label": "Definición",
        "description": "NumPy aplica operaciones a arrays completos mediante funciones universales y operadores. Evita ciclos Python cuando la operación se puede expresar sobre los elementos."
      },
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/aritmetica-basica",
        "label": "Aritmética básica",
        "description": "+, -, *, /, //, %, ** calculan sobre cada elemento; add, subtract, multiply y divide ofrecen las mismas operaciones básicas."
      },
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/funciones-matematicas",
        "label": "Funciones matemáticas",
        "description": "sqrt, exp, log y log10 calculan raíces, exponenciales y logaritmos elemento a elemento."
      },
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/redondeo-y-valor-absoluto",
        "label": "Redondeo y valor absoluto",
        "description": "round, floor, ceil, trunc y abs transforman valores numéricos."
      },
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/trigonometria-y-complejos",
        "label": "Trigonometría y complejos",
        "description": "sin, cos y tan reciben radianes; deg2rad convierte grados. real, imag y conj operan sobre complejos."
      },
      {
        "id": "analisis-de-datos/numpy/operaciones-vectorizadas/vectorizacion-frente-a-ciclos",
        "label": "Vectorización frente a ciclos",
        "description": "Una expresión de array aplica la operación en código de NumPy. np.vectorize es una comodidad para funciones Python, no una garantía de rapidez."
      }
    ]
  },
  {
    "key": "broadcasting",
    "label": "Broadcasting",
    "children": [
      {
        "id": "analisis-de-datos/numpy/broadcasting/definicion",
        "label": "Definición",
        "description": "Broadcasting permite operar con formas diferentes alineando sus ejes desde la derecha. Cada par debe ser igual o tener tamaño 1, o faltar un eje."
      },
      {
        "id": "analisis-de-datos/numpy/broadcasting/escalar-con-array",
        "label": "Escalar con array",
        "description": "Un escalar se aplica a todos los elementos de un array sin replicarlo manualmente."
      },
      {
        "id": "analisis-de-datos/numpy/broadcasting/vector-con-matriz",
        "label": "Vector con matriz",
        "description": "Un vector de longitud igual a las columnas se combina con cada fila de la matriz."
      },
      {
        "id": "analisis-de-datos/numpy/broadcasting/vector-columna",
        "label": "Vector columna",
        "description": "Una forma (n, 1) permite aplicar un valor por fila a una matriz (n, m)."
      },
      {
        "id": "analisis-de-datos/numpy/broadcasting/compatibilidad-y-errores",
        "label": "Compatibilidad y errores",
        "description": "Formas incompatibles no pueden difundirse entre sí. broadcast_shapes comprueba las formas sin calcular los datos."
      },
      {
        "id": "analisis-de-datos/numpy/broadcasting/broadcast-to",
        "label": "broadcast_to",
        "description": "Expande lógicamente un array hasta una forma compatible sin copiar sus datos."
      }
    ]
  },
  {
    "key": "dimensiones-y-ejes",
    "label": "Dimensiones y ejes",
    "children": [
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/definicion",
        "label": "Definición",
        "description": "Cada dimensión tiene un eje numerado desde cero. Las operaciones pueden recorrer todo el array o reducir un eje concreto."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/axis-none-axis-0-y-axis-1",
        "label": "axis=None, axis=0 y axis=1",
        "description": "Sin axis se reducen todos los elementos. En una matriz axis=0 reduce filas y axis=1 reduce columnas."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/keepdims",
        "label": "keepdims",
        "description": "Conserva los ejes reducidos con longitud uno, lo que ayuda a operaciones posteriores con broadcasting."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/reshape",
        "label": "reshape",
        "description": "Cambia la forma sin cambiar el número de elementos. -1 infiere el tamaño de un eje."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/flatten-y-ravel",
        "label": "flatten y ravel",
        "description": "Ambas producen un array 1D. flatten siempre copia; ravel intenta usar una vista."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/expand-dims-newaxis-y-squeeze",
        "label": "expand_dims, newaxis y squeeze",
        "description": "expand_dims o newaxis añaden un eje unitario; squeeze quita ejes de tamaño uno."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/transposicion-y-swapaxes",
        "label": "Transposición y swapaxes",
        "description": "T y transpose permutan ejes; swapaxes intercambia dos ejes concretos."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/resize",
        "label": "resize",
        "description": "np.resize crea una forma nueva repitiendo datos si es necesario; el método ndarray.resize cambia el propio array y rellena con ceros al ampliar."
      },
      {
        "id": "analisis-de-datos/numpy/dimensiones-y-ejes/moveaxis",
        "label": "moveaxis",
        "description": "Mueve ejes a nuevas posiciones manteniendo el orden relativo de los demás."
      }
    ]
  },
  {
    "key": "copias-vistas-y-memoria",
    "label": "Copias, vistas y memoria",
    "children": [
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/definicion",
        "label": "Definición",
        "description": "Una vista comparte datos con otro array; una copia posee datos independientes. Esta diferencia afecta modificaciones y rendimiento."
      },
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/slicing-y-vista",
        "label": "Slicing y vista",
        "description": "El slicing básico de un ndarray suele crear una vista; los cambios sobre la vista afectan los datos originales."
      },
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/copy-y-view",
        "label": "copy y view",
        "description": "copy copia los datos; view crea otra representación del mismo buffer de datos."
      },
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/shares-memory-e-indexacion-avanzada",
        "label": "shares_memory e indexación avanzada",
        "description": "shares_memory comprueba si dos arrays comparten memoria; la indexación avanzada normalmente copia."
      },
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/strides-y-orden-c-f",
        "label": "strides y orden C/F",
        "description": "strides indica los bytes que se avanzan al cambiar un índice en cada eje. C ordena contiguamente por filas y F por columnas."
      },
      {
        "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/operaciones-in-place-y-out",
        "label": "Operaciones in-place y out",
        "description": "Operadores como += modifican el array existente; algunas ufuncs aceptan out para escribir en un buffer elegido."
      }
    ]
  },
  {
    "key": "agregaciones",
    "label": "Agregaciones",
    "children": [
      {
        "id": "analisis-de-datos/numpy/agregaciones/definicion",
        "label": "Definición",
        "description": "Las agregaciones resumen varios elementos en un valor o en valores por eje."
      },
      {
        "id": "analisis-de-datos/numpy/agregaciones/sum-y-prod",
        "label": "sum y prod",
        "description": "sum suma elementos y prod multiplica elementos."
      },
      {
        "id": "analisis-de-datos/numpy/agregaciones/mean-y-average",
        "label": "mean y average",
        "description": "mean obtiene la media aritmética; average permite pesos explícitos."
      },
      {
        "id": "analisis-de-datos/numpy/agregaciones/min-max-y-ptp",
        "label": "min, max y ptp",
        "description": "min y max devuelven extremos; ptp calcula máximo menos mínimo."
      },
      {
        "id": "analisis-de-datos/numpy/agregaciones/count-nonzero",
        "label": "count_nonzero",
        "description": "Cuenta elementos distintos de cero, o True cuando recibe una máscara."
      },
      {
        "id": "analisis-de-datos/numpy/agregaciones/argmin-y-argmax",
        "label": "argmin y argmax",
        "description": "Devuelven el índice de la primera aparición de un mínimo o máximo, no el valor."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva",
    "children": [
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "Las funciones estadísticas resumen centro, dispersión y distribución de observaciones."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/median",
        "label": "median",
        "description": "La mediana es el valor central ordenado; con un número par de datos promedia los dos centrales."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/std-var-y-ddof",
        "label": "std, var y ddof",
        "description": "var calcula varianza y std su raíz. ddof=0 divide entre N; ddof=1 divide entre N-1."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/percentile-y-quantile",
        "label": "percentile y quantile",
        "description": "percentile expresa el punto de corte de 0 a 100 y quantile de 0 a 1. method controla la interpolación."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/covarianza-y-corrcoef",
        "label": "Covarianza y corrcoef",
        "description": "cov calcula covarianza; corrcoef normaliza esa relación como correlación de Pearson."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/histogram",
        "label": "histogram",
        "description": "Cuenta observaciones dentro de intervalos y devuelve conteos y bordes."
      },
      {
        "id": "analisis-de-datos/numpy/estadistica-descriptiva/digitize",
        "label": "digitize",
        "description": "Devuelve el índice del intervalo al que pertenece cada valor."
      }
    ]
  },
  {
    "key": "nulos-infinitos-y-datos-invalidos",
    "label": "Nulos, infinitos y datos inválidos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/definicion",
        "label": "Definición",
        "description": "NaN representa un valor flotante indefinido o faltante; inf representa infinito. NumPy dispone de máscaras y reducciones específicas para tratarlos."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/isnan-isinf-e-isfinite",
        "label": "isnan, isinf e isfinite",
        "description": "isnan detecta NaN, isinf detecta infinitos e isfinite detecta números finitos."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nan-to-num",
        "label": "nan_to_num",
        "description": "Sustituye NaN e infinitos por valores elegidos. Por defecto los infinitos se reemplazan por extremos finitos del dtype."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nansum-nanmean-y-nanmedian",
        "label": "nansum, nanmean y nanmedian",
        "description": "Estas reducciones ignoran NaN; no ignoran infinitos automáticamente."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nanmin-nanmax-nanstd-y-nanvar",
        "label": "nanmin, nanmax, nanstd y nanvar",
        "description": "Calculan extremos y dispersión ignorando NaN."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nanpercentile-y-nanquantile",
        "label": "nanpercentile y nanquantile",
        "description": "Calculan puntos de corte ignorando NaN."
      },
      {
        "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/imputacion",
        "label": "Imputación",
        "description": "Imputar consiste en reemplazar datos ausentes por una estimación razonada."
      }
    ]
  },
  {
    "key": "condiciones-y-modificacion-de-elementos",
    "label": "Condiciones y modificación de elementos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/definicion",
        "label": "Definición",
        "description": "Las condiciones vectorizadas construyen valores distintos según reglas de negocio. La asignación indexada cambia elementos existentes."
      },
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/where",
        "label": "where",
        "description": "where(condición, verdadero, falso) elige un valor por elemento."
      },
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/select",
        "label": "select",
        "description": "np.select aplica varias condiciones en orden y devuelve la opción de la primera verdadera."
      },
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/clip",
        "label": "clip",
        "description": "Limita valores a un mínimo y máximo."
      },
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/asignacion-por-indices-y-mascaras",
        "label": "Asignación por índices y máscaras",
        "description": "La asignación a a[índices] o a[máscara] modifica los elementos seleccionados."
      },
      {
        "id": "analisis-de-datos/numpy/condiciones-y-modificacion-de-elementos/put-putmask-y-copyto",
        "label": "put, putmask y copyto",
        "description": "put escribe por índices aplanados; putmask modifica posiciones verdaderas; copyto copia con una máscara opcional."
      }
    ]
  },
  {
    "key": "valores-unicos-y-conjuntos",
    "label": "Valores únicos y conjuntos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/definicion",
        "label": "Definición",
        "description": "NumPy puede obtener valores únicos, contar apariciones y comparar pertenencia entre colecciones."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/unique-y-return-counts",
        "label": "unique y return_counts",
        "description": "unique devuelve valores distintos, por defecto ordenados; return_counts devuelve además sus frecuencias."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/return-inverse-y-return-index",
        "label": "return_inverse y return_index",
        "description": "return_inverse permite reconstruir el array original a partir de los únicos; return_index indica la primera posición de cada valor."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/bincount",
        "label": "bincount",
        "description": "Cuenta apariciones de enteros no negativos y puede sumar pesos por código."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/isin",
        "label": "isin",
        "description": "Comprueba si cada elemento aparece en una colección de referencia."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/union1d-e-intersect1d",
        "label": "union1d e intersect1d",
        "description": "union1d reúne valores únicos; intersect1d conserva los valores compartidos."
      },
      {
        "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/setdiff1d-y-setxor1d",
        "label": "setdiff1d y setxor1d",
        "description": "setdiff1d devuelve lo que está solo en el primer conjunto; setxor1d lo que está en uno u otro, pero no ambos."
      }
    ]
  },
  {
    "key": "ordenamiento-busqueda-y-seleccion",
    "label": "Ordenamiento, búsqueda y selección",
    "children": [
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/definicion",
        "label": "Definición",
        "description": "Las operaciones de ordenamiento devuelven valores o índices que permiten reorganizar otros arrays relacionados."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/sort-y-argsort",
        "label": "sort y argsort",
        "description": "np.sort devuelve una copia ordenada y argsort los índices que producirían ese orden."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/orden-descendente-y-estabilidad",
        "label": "Orden descendente y estabilidad",
        "description": "Puedes invertir el orden ascendente o usar argsort de negativos en datos numéricos apropiados. stable conserva orden de empates."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/lexsort",
        "label": "lexsort",
        "description": "Ordena por varias claves; la última clave de la tupla tiene prioridad."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/partition-y-argpartition",
        "label": "partition y argpartition",
        "description": "Colocan un elemento en su posición ordenada y separan menores y mayores sin ordenar completamente cada parte."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/nonzero-y-argwhere",
        "label": "nonzero y argwhere",
        "description": "nonzero devuelve una tupla de arrays de índices por eje; argwhere devuelve una fila de coordenadas por coincidencia."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/searchsorted",
        "label": "searchsorted",
        "description": "Devuelve posiciones donde insertar valores manteniendo el orden de un array ya ordenado."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/take-y-take-along-axis",
        "label": "take y take_along_axis",
        "description": "take selecciona los mismos índices por un eje; take_along_axis permite índices diferentes en cada fila o sección."
      },
      {
        "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/extract-y-choose",
        "label": "extract y choose",
        "description": "extract selecciona valores con una condición aplanada; choose elige entre arrays según índices enteros."
      }
    ]
  },
  {
    "key": "combinar-y-dividir-arrays",
    "label": "Combinar y dividir arrays",
    "children": [
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/definicion",
        "label": "Definición",
        "description": "Concatenate une arrays por un eje existente; stack crea un eje nuevo. Split separa un array en partes."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/concatenate",
        "label": "concatenate",
        "description": "Une arrays por un eje existente; axis=None aplana antes de unir."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/stack",
        "label": "stack",
        "description": "Apila arrays de la misma forma introduciendo un eje nuevo."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/vstack-hstack-y-column-stack",
        "label": "vstack, hstack y column_stack",
        "description": "vstack apila por filas, hstack une horizontalmente según dimensiones y column_stack convierte vectores en columnas."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/split-y-array-split",
        "label": "split y array_split",
        "description": "split divide en secciones iguales o por índices; array_split permite tamaños desiguales."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/hsplit-y-vsplit",
        "label": "hsplit y vsplit",
        "description": "hsplit divide una matriz horizontalmente por columnas; vsplit verticalmente por filas."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/append-insert-y-delete",
        "label": "append, insert y delete",
        "description": "Devuelven un nuevo array con elementos añadidos, insertados o eliminados."
      },
      {
        "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/repeat-y-tile",
        "label": "repeat y tile",
        "description": "repeat repite cada elemento; tile repite un bloque completo."
      }
    ]
  },
  {
    "key": "ufuncs-y-operaciones-avanzadas",
    "label": "Ufuncs y operaciones avanzadas",
    "children": [
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/definicion",
        "label": "Definición",
        "description": "Una ufunc es una función universal con cálculo elemento a elemento, soporte de broadcasting y métodos de reducción cuando corresponde."
      },
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/reduce-y-accumulate",
        "label": "reduce y accumulate",
        "description": "reduce combina valores de un eje hasta un resultado; accumulate conserva los resultados parciales."
      },
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/outer",
        "label": "outer",
        "description": "El método outer de una ufunc combina cada elemento de un array con cada elemento del otro."
      },
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/at",
        "label": "at",
        "description": "at actualiza posiciones in-place sin perder repeticiones de índices."
      },
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/where-y-out-en-ufuncs",
        "label": "where y out en ufuncs",
        "description": "where indica posiciones donde calcular y out indica el destino del resultado."
      },
      {
        "id": "analisis-de-datos/numpy/ufuncs-y-operaciones-avanzadas/apply-along-axis",
        "label": "apply_along_axis",
        "description": "Aplica una función 1D a cada sección de un eje de un array."
      }
    ]
  },
  {
    "key": "series-acumulados-y-ventanas",
    "label": "Series, acumulados y ventanas",
    "children": [
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/definicion",
        "label": "Definición",
        "description": "Los acumulados y las diferencias describen cambios en observaciones ordenadas. Las ventanas móviles calculan métricas sobre intervalos consecutivos."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/cumsum-y-cumprod",
        "label": "cumsum y cumprod",
        "description": "cumsum suma progresivamente; cumprod multiplica progresivamente."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/diff",
        "label": "diff",
        "description": "Calcula diferencias entre elementos consecutivos; n repite la operación."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/crecimiento-y-cambio-porcentual",
        "label": "Crecimiento y cambio porcentual",
        "description": "El cambio relativo se obtiene dividiendo la diferencia por el valor anterior."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/maximum-accumulate-y-minimum-accumulate",
        "label": "maximum.accumulate y minimum.accumulate",
        "description": "Conservan el máximo o mínimo observado hasta cada posición."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/convolve-y-media-movil",
        "label": "convolve y media móvil",
        "description": "convolve aplica un núcleo de pesos a una serie. Con pesos iguales y mode='valid' calcula promedios de ventanas completas."
      },
      {
        "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/sliding-window-view",
        "label": "sliding_window_view",
        "description": "Crea vistas de todas las ventanas consecutivas de tamaño fijo."
      }
    ]
  },
  {
    "key": "limpieza-escalado-y-metricas",
    "label": "Limpieza, escalado y métricas",
    "children": [
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/definicion",
        "label": "Definición",
        "description": "Las operaciones vectorizadas permiten transformar datos, detectar valores atípicos y calcular indicadores sin recorrer cada fila."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/porcentajes-y-participacion",
        "label": "Porcentajes y participación",
        "description": "Divide cada valor por el total y multiplica por 100 para expresar su participación."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/normalizacion-min-max",
        "label": "Normalización min-max",
        "description": "Reescala datos con (x-min)/(max-min), normalmente al rango de cero a uno."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/estandarizacion-y-z-score",
        "label": "Estandarización y z-score",
        "description": "Un z-score expresa cuántas desviaciones estándar separan un valor de la media."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/outliers-con-iqr",
        "label": "Outliers con IQR",
        "description": "El rango intercuartílico es Q3-Q1; una regla habitual marca valores fuera de Q1-1.5 IQR y Q3+1.5 IQR."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/outliers-con-z-score",
        "label": "Outliers con z-score",
        "description": "Una regla basada en desviaciones estándar marca valores alejados de la media; el umbral es una decisión analítica."
      },
      {
        "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/agrupar-mediante-codigos",
        "label": "Agrupar mediante códigos",
        "description": "Combina unique con return_inverse y bincount para resumir categorías sin un ciclo explícito."
      }
    ]
  },
  {
    "key": "fechas-y-duraciones",
    "label": "Fechas y duraciones",
    "children": [
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/definicion",
        "label": "Definición",
        "description": "datetime64 representa fechas y horas con una unidad de resolución; timedelta64 representa duraciones."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/datetime64-y-unidades",
        "label": "datetime64 y unidades",
        "description": "Un dtype datetime64 puede almacenar días, segundos u otras unidades; convertir a una unidad más gruesa descarta precisión."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/timedelta64-y-diferencias",
        "label": "timedelta64 y diferencias",
        "description": "Restar fechas compatibles produce duraciones; sumar una duración desplaza una fecha."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/nat-e-isnat",
        "label": "NaT e isnat",
        "description": "NaT representa una fecha o duración faltante. isnat crea una máscara de estos valores."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/agrupacion-por-periodo",
        "label": "Agrupación por periodo",
        "description": "Convertir a datetime64[M] o datetime64[Y] permite identificar meses o años de observación."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/is-busday-y-busday-count",
        "label": "is_busday y busday_count",
        "description": "is_busday identifica días laborales y busday_count cuenta días hábiles entre dos fechas, excluyendo la final."
      },
      {
        "id": "analisis-de-datos/numpy/fechas-y-duraciones/busday-offset-y-calendarios",
        "label": "busday_offset y calendarios",
        "description": "Desplaza una fecha en días hábiles, con reglas para fechas inicialmente no laborables. busdaycalendar permite personalizar calendario."
      }
    ]
  },
  {
    "key": "texto-vectorizado",
    "label": "Texto vectorizado",
    "children": [
      {
        "id": "analisis-de-datos/numpy/texto-vectorizado/definicion",
        "label": "Definición",
        "description": "np.strings ofrece operaciones de cadenas elemento a elemento sobre arrays compatibles. No es un sustituto de todos los métodos de texto de pandas."
      },
      {
        "id": "analisis-de-datos/numpy/texto-vectorizado/upper-lower-y-strip",
        "label": "upper, lower y strip",
        "description": "upper y lower cambian mayúsculas y minúsculas; strip elimina caracteres de los extremos, espacios por defecto."
      },
      {
        "id": "analisis-de-datos/numpy/texto-vectorizado/replace-add-y-str-len",
        "label": "replace, add y str_len",
        "description": "replace sustituye fragmentos, add concatena elementos y str_len cuenta caracteres."
      },
      {
        "id": "analisis-de-datos/numpy/texto-vectorizado/busqueda-de-cadenas",
        "label": "Búsqueda de cadenas",
        "description": "find busca la posición de una subcadena; startswith y endswith comprueban prefijos o sufijos."
      },
      {
        "id": "analisis-de-datos/numpy/texto-vectorizado/stringdtype-y-texto-de-longitud-fija",
        "label": "StringDType y texto de longitud fija",
        "description": "Los dtypes U tienen longitud fija en caracteres; StringDType almacena cadenas de longitud variable."
      }
    ]
  },
  {
    "key": "aleatoriedad-y-muestreo",
    "label": "Aleatoriedad y muestreo",
    "children": [
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/definicion",
        "label": "Definición",
        "description": "Generator genera números pseudoaleatorios y muestras. default_rng crea un generador moderno con una semilla opcional."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/default-rng-y-semillas",
        "label": "default_rng y semillas",
        "description": "default_rng inicializa el generador; dos generadores con la misma semilla producen la misma secuencia bajo las mismas condiciones."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/random-integers-y-uniform",
        "label": "random, integers y uniform",
        "description": "random genera valores en [0,1), integers enteros con límite alto excluido por defecto, uniform valores de una distribución uniforme."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/normal",
        "label": "normal",
        "description": "Genera muestras de una distribución normal con media loc y desviación scale."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/choice",
        "label": "choice",
        "description": "Selecciona valores aleatoriamente, con o sin reemplazo y pesos p opcionales."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/shuffle-y-permutation",
        "label": "shuffle y permutation",
        "description": "shuffle modifica la colección in-place; permutation devuelve una versión permutada."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/binomial-poisson-y-exponential",
        "label": "binomial, poisson y exponential",
        "description": "Binomial modela éxitos en ensayos, Poisson conteos de eventos y exponencial tiempos de espera bajo sus hipótesis."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/monte-carlo",
        "label": "Monte Carlo",
        "description": "Monte Carlo estima una magnitud repitiendo simulaciones de un modelo aleatorio."
      },
      {
        "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/bootstrap",
        "label": "Bootstrap",
        "description": "Bootstrap estima variabilidad de una estadística mediante remuestreo con reemplazo de observaciones."
      }
    ]
  },
  {
    "key": "precision-y-errores-numericos",
    "label": "Precisión y errores numéricos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/precision-y-errores-numericos/definicion",
        "label": "Definición",
        "description": "Los tipos numéricos tienen límites y los cálculos flotantes son aproximados. NumPy puede gestionar avisos por operaciones inválidas."
      },
      {
        "id": "analisis-de-datos/numpy/precision-y-errores-numericos/overflow-y-underflow",
        "label": "Overflow y underflow",
        "description": "Overflow ocurre al superar el rango del tipo; underflow flotante ocurre cuando un resultado es demasiado pequeño para conservar precisión o se redondea a cero."
      },
      {
        "id": "analisis-de-datos/numpy/precision-y-errores-numericos/precision-flotante",
        "label": "Precisión flotante",
        "description": "Los números binarios de punto flotante no representan exactamente todos los decimales. finfo.eps mide separación relativa cerca de uno."
      },
      {
        "id": "analisis-de-datos/numpy/precision-y-errores-numericos/errstate-y-seterr",
        "label": "errstate y seterr",
        "description": "errstate cambia temporalmente el tratamiento de errores flotantes; seterr cambia la configuración vigente y devuelve la anterior."
      }
    ]
  },
  {
    "key": "algebra-lineal",
    "label": "Álgebra lineal",
    "children": [
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/definicion",
        "label": "Definición",
        "description": "Las operaciones matriciales combinan filas y columnas mediante productos y transformaciones lineales. np.linalg agrupa operaciones para resolver sistemas y descomponer matrices."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/dot-matmul-y",
        "label": "dot, matmul y @",
        "description": "Para matrices 2D, dot y matmul calculan el producto matricial; @ usa matmul. Para vectores 1D dot da el producto interno."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/inner-outer-y-tensordot",
        "label": "inner, outer y tensordot",
        "description": "inner combina últimos ejes, outer combina pares de elementos aplanados y tensordot contrae los ejes indicados."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/einsum",
        "label": "einsum",
        "description": "Describe contracciones mediante etiquetas de ejes. Las etiquetas omitidas de la salida se suman."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/normas",
        "label": "Normas",
        "description": "linalg.norm mide longitud de vectores o magnitudes matriciales según ord y axis."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/diag-trace-tril-y-triu",
        "label": "diag, trace, tril y triu",
        "description": "diag extrae o construye diagonales, trace suma la diagonal y tril/triu conservan partes triangulares."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/solve-e-inv",
        "label": "solve e inv",
        "description": "solve obtiene x de Ax=b para una matriz cuadrada no singular; inv calcula la inversa."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/determinante-y-rango",
        "label": "Determinante y rango",
        "description": "det calcula el determinante de una matriz cuadrada; matrix_rank estima su rango numérico."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/valores-y-vectores-propios",
        "label": "Valores y vectores propios",
        "description": "eig devuelve valores y vectores propios; eigh se especializa en matrices simétricas reales o hermíticas."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/svd-y-qr",
        "label": "SVD y QR",
        "description": "svd descompone A en U, valores singulares y Vh; qr en Q ortogonal y R triangular."
      },
      {
        "id": "analisis-de-datos/numpy/algebra-lineal/minimos-cuadrados",
        "label": "Mínimos cuadrados",
        "description": "linalg.lstsq encuentra coeficientes que minimizan la norma del residuo Ax-b."
      }
    ]
  },
  {
    "key": "interpolacion-y-calculo-numerico",
    "label": "Interpolación y cálculo numérico",
    "children": [
      {
        "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/definicion",
        "label": "Definición",
        "description": "NumPy aproxima valores entre observaciones y operaciones matemáticas discretas sobre muestras."
      },
      {
        "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/interp",
        "label": "interp",
        "description": "interp hace interpolación lineal 1D entre puntos de referencia ordenados."
      },
      {
        "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/gradient",
        "label": "gradient",
        "description": "gradient aproxima derivadas mediante diferencias finitas, con reglas especiales en bordes."
      },
      {
        "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/trapezoid",
        "label": "trapezoid",
        "description": "Integra aproximadamente valores mediante trapecios. Es útil para sumar áreas entre observaciones."
      }
    ]
  },
  {
    "key": "fourier-y-analisis-de-frecuencias",
    "label": "Fourier y análisis de frecuencias",
    "children": [
      {
        "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/definicion",
        "label": "Definición",
        "description": "np.fft transforma una secuencia de muestras en componentes de frecuencia. Se usa para identificar periodicidad en señales regularmente espaciadas."
      },
      {
        "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/fft-e-ifft",
        "label": "fft e ifft",
        "description": "fft calcula la transformada discreta de Fourier; ifft reconstruye las muestras desde sus coeficientes."
      },
      {
        "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/rfft-y-rfftfreq",
        "label": "rfft y rfftfreq",
        "description": "rfft calcula solo las frecuencias no negativas necesarias para una señal real; rfftfreq indica sus frecuencias físicas."
      }
    ]
  },
  {
    "key": "polinomios",
    "label": "Polinomios",
    "children": [
      {
        "id": "analisis-de-datos/numpy/polinomios/definicion",
        "label": "Definición",
        "description": "numpy.polynomial representa polinomios y permite evaluarlos o ajustarlos a observaciones."
      },
      {
        "id": "analisis-de-datos/numpy/polinomios/polynomial-y-evaluacion",
        "label": "Polynomial y evaluación",
        "description": "Polynomial crea un polinomio con coeficientes constantes, lineales y de grados superiores."
      },
      {
        "id": "analisis-de-datos/numpy/polinomios/polynomial-fit",
        "label": "Polynomial.fit",
        "description": "Ajusta un polinomio de grado indicado por mínimos cuadrados; convert recupera coeficientes en la base estándar."
      },
      {
        "id": "analisis-de-datos/numpy/polinomios/operaciones-y-derivadas",
        "label": "Operaciones y derivadas",
        "description": "Los objetos Polynomial admiten suma, producto, deriv y integ."
      }
    ]
  },
  {
    "key": "arrays-estructurados-y-enmascarados",
    "label": "Arrays estructurados y enmascarados",
    "children": [
      {
        "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/definicion",
        "label": "Definición",
        "description": "Los arrays estructurados almacenan registros con campos de distintos tipos; los enmascarados mantienen datos y una máscara de invalidez."
      },
      {
        "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/structured-arrays",
        "label": "Structured arrays",
        "description": "Un dtype estructurado asigna un tipo y nombre a cada campo. Los campos se acceden por su nombre."
      },
      {
        "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/record-arrays",
        "label": "Record arrays",
        "description": "Un recarray permite acceder a campos mediante atributos además de índices por nombre."
      },
      {
        "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/masked-arrays-y-np-ma",
        "label": "Masked arrays y np.ma",
        "description": "np.ma.array guarda valores junto con una máscara; True indica un elemento oculto o inválido."
      },
      {
        "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/masked-invalid-y-compresion",
        "label": "masked_invalid y compresión",
        "description": "masked_invalid enmascara NaN e infinitos. compressed devuelve un array 1D de los elementos no enmascarados."
      }
    ]
  },
  {
    "key": "archivos-e-intercambio-de-datos",
    "label": "Archivos e intercambio de datos",
    "children": [
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/definicion",
        "label": "Definición",
        "description": "NumPy puede leer y escribir texto numérico, archivos binarios propios y arrays mapeados en memoria."
      },
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/loadtxt-y-savetxt",
        "label": "loadtxt y savetxt",
        "description": "loadtxt lee texto numérico regular; savetxt escribe valores con formato y delimitador configurables."
      },
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/genfromtxt",
        "label": "genfromtxt",
        "description": "Lee texto y permite reconocer valores ausentes, encabezados y tipos. Para float, los datos vacíos suelen convertirse en NaN."
      },
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/save-y-load",
        "label": "save y load",
        "description": "save almacena un array en formato NPY y load lo recupera con su forma y dtype."
      },
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/savez-y-savez-compressed",
        "label": "savez y savez_compressed",
        "description": "Guardan varios arrays nombrados en un archivo NPZ; la segunda función comprime el contenido."
      },
      {
        "id": "analisis-de-datos/numpy/archivos-e-intercambio-de-datos/memmap",
        "label": "memmap",
        "description": "Mapea un archivo binario para acceder a regiones del array sin cargarlo completo de una vez."
      }
    ]
  },
  {
    "key": "integracion-con-pandas",
    "label": "Integración con pandas",
    "children": [
      {
        "id": "analisis-de-datos/numpy/integracion-con-pandas/definicion",
        "label": "Definición",
        "description": "Pandas representa datos tabulares con etiquetas y tipos por columna; NumPy aporta arrays y operaciones numéricas. to_numpy permite pasar de pandas a NumPy."
      },
      {
        "id": "analisis-de-datos/numpy/integracion-con-pandas/series-to-numpy",
        "label": "Series.to_numpy",
        "description": "Convierte una Series a un ndarray. Puede cambiar el dtype o requerir una copia según el tipo original."
      },
      {
        "id": "analisis-de-datos/numpy/integracion-con-pandas/dataframe-to-numpy",
        "label": "DataFrame.to_numpy",
        "description": "Convierte columnas seleccionadas a una matriz con un dtype común. Si hay texto y números, puede resultar object."
      },
      {
        "id": "analisis-de-datos/numpy/integracion-con-pandas/convertir-ndarray-a-series-o-dataframe",
        "label": "Convertir ndarray a Series o DataFrame",
        "description": "Los constructores de pandas aceptan arrays y permiten recuperar etiquetas explícitas."
      }
    ]
  },
  {
    "key": "rendimiento-y-validacion",
    "label": "Rendimiento y validación",
    "children": [
      {
        "id": "analisis-de-datos/numpy/rendimiento-y-validacion/definicion",
        "label": "Definición",
        "description": "La eficiencia de NumPy depende de vectorización, formas, tipos y copias. Antes de optimizar, verifica que las operaciones produzcan resultados equivalentes."
      },
      {
        "id": "analisis-de-datos/numpy/rendimiento-y-validacion/medir-tiempos-con-timeit",
        "label": "Medir tiempos con timeit",
        "description": "timeit repite una operación y permite comparar tiempos bajo el mismo entorno. Los tiempos dependen del equipo y la carga."
      },
      {
        "id": "analisis-de-datos/numpy/rendimiento-y-validacion/consumo-de-memoria-y-dtype",
        "label": "Consumo de memoria y dtype",
        "description": "Reducir el ancho del tipo puede ahorrar memoria si mantiene el rango y precisión requeridos."
      },
      {
        "id": "analisis-de-datos/numpy/rendimiento-y-validacion/validacion-con-numpy-testing",
        "label": "Validación con numpy.testing",
        "description": "assert_array_equal comprueba valores y forma; assert_allclose comprueba aproximación numérica con tolerancias."
      }
    ]
  }
];
