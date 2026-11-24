// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const seabornCurriculum = [
  {
    "key": "introduccion",
    "label": "Introducción y entorno",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/introduccion/definicion",
        "label": "Definición",
        "description": "Seaborn es una biblioteca de visualización estadística de Python que utiliza Matplotlib y se integra con pandas."
      },
      {
        "id": "analisis-de-datos/seaborn/introduccion/importacion-y-version",
        "label": "Importación y versión",
        "description": "El alias `sns` permite llamar las funciones de Seaborn; la versión determina qué parámetros existen."
      },
      {
        "id": "analisis-de-datos/seaborn/introduccion/datasets-de-ejemplo",
        "label": "Datasets de ejemplo",
        "description": "`load_dataset()` descarga conjuntos de datos de ejemplo de Seaborn."
      },
      {
        "id": "analisis-de-datos/seaborn/introduccion/figure-y-axes",
        "label": "Figure y Axes",
        "description": "Una Figure es el contenedor completo; un Axes es la zona donde se dibuja un gráfico."
      },
      {
        "id": "analisis-de-datos/seaborn/introduccion/axes-level-y-figure-level",
        "label": "Axes-level y figure-level",
        "description": "Las funciones axes-level devuelven un Axes; las figure-level gestionan su propia figura y suelen devolver un objeto de cuadrícula."
      }
    ]
  },
  {
    "key": "estructura-de-datos",
    "label": "Estructura de datos",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/definicion",
        "label": "Definición",
        "description": "Seaborn puede recibir DataFrames, vectores y otras estructuras; `data` identifica la fuente de los datos."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/long-form",
        "label": "Long-form",
        "description": "En formato largo, cada fila es una observación y cada columna una variable."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/wide-form",
        "label": "Wide-form",
        "description": "En formato ancho, las series pueden ocupar columnas distintas."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/melt",
        "label": "melt",
        "description": "`melt()` de pandas convierte columnas de medidas en filas con una etiqueta de variable."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/pivot-y-pivot-table",
        "label": "pivot y pivot_table",
        "description": "`pivot()` reorganiza valores con claves únicas; `pivot_table()` puede agregar combinaciones repetidas."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/groupby",
        "label": "groupby",
        "description": "`groupby()` de pandas permite preparar métricas antes de dibujar."
      },
      {
        "id": "analisis-de-datos/seaborn/estructura-de-datos/datos-faltantes-y-categorias",
        "label": "Datos faltantes y categorías",
        "description": "Conviene revisar nulos, tipos y categorías antes de graficar; las funciones pueden omitir observaciones incompletas."
      }
    ]
  },
  {
    "key": "variables-visuales",
    "label": "Variables visuales",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/variables-visuales/definicion",
        "label": "Definición",
        "description": "Una variable visual representa una columna mediante posición, color, tamaño o forma."
      },
      {
        "id": "analisis-de-datos/seaborn/variables-visuales/hue",
        "label": "hue",
        "description": "`hue` asigna colores a grupos o valores numéricos."
      },
      {
        "id": "analisis-de-datos/seaborn/variables-visuales/size-y-sizes",
        "label": "size y sizes",
        "description": "`size` asigna tamaño a una variable; `sizes` controla el intervalo de tamaños."
      },
      {
        "id": "analisis-de-datos/seaborn/variables-visuales/style-y-markers",
        "label": "style y markers",
        "description": "`style` diferencia grupos mediante formas o estilos de línea."
      },
      {
        "id": "analisis-de-datos/seaborn/variables-visuales/escalas-semanticas",
        "label": "Escalas semánticas",
        "description": "`hue_norm` y `size_norm` fijan el rango de referencia para variables numéricas."
      }
    ]
  },
  {
    "key": "graficos-relacionales",
    "label": "Gráficos relacionales",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/definicion",
        "label": "Definición",
        "description": "Los gráficos relacionales ayudan a estudiar cómo se relacionan variables cuantitativas o cómo cambian a lo largo del tiempo."
      },
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/scatterplot",
        "label": "scatterplot",
        "description": "Representa pares de valores como puntos."
      },
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/lineplot",
        "label": "lineplot",
        "description": "Conecta valores según un orden, y por defecto estima la media de valores repetidos en X para cada grupo."
      },
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/orden-y-sort",
        "label": "Orden y sort",
        "description": "`lineplot` ordena los valores de X por defecto; `sort=False` conserva el orden de entrada dentro de las series."
      },
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/units",
        "label": "units",
        "description": "`units` permite dibujar una trayectoria por unidad de muestreo sin agregar líneas entre unidades."
      },
      {
        "id": "analisis-de-datos/seaborn/graficos-relacionales/relplot",
        "label": "relplot",
        "description": "Interfaz figure-level para dispersión y líneas con facetas."
      }
    ]
  },
  {
    "key": "estimacion-y-error",
    "label": "Estimación y barras de error",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/definicion",
        "label": "Definición",
        "description": "Algunos gráficos calculan un resumen estadístico y un intervalo automáticamente."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/estimator",
        "label": "estimator",
        "description": "Determina la función que resume las observaciones de un grupo."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/errorbar-y-none",
        "label": "errorbar y None",
        "description": "`errorbar` indica el método de intervalo; `None` lo desactiva."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/desviacion-estandar-y-error-estandar",
        "label": "Desviación estándar y error estándar",
        "description": "`sd` representa dispersión de observaciones; `se` representa incertidumbre de la media mediante su error estándar."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/intervalo-percentil",
        "label": "Intervalo percentil",
        "description": "`errorbar=(\"pi\", 90)` muestra el intervalo central de los datos entre percentiles 5 y 95."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/intervalo-de-confianza-y-bootstrap",
        "label": "Intervalo de confianza y bootstrap",
        "description": "`ci` estima incertidumbre del estadístico mediante remuestreo con reemplazo; `n_boot` controla las réplicas y `seed` permite repetirlas."
      },
      {
        "id": "analisis-de-datos/seaborn/estimacion-y-error/weights",
        "label": "weights",
        "description": "En funciones compatibles, `weights` pondera la media para que observaciones con distinto volumen tengan diferente influencia."
      }
    ]
  },
  {
    "key": "histogramas",
    "label": "Histogramas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/histogramas/definicion",
        "label": "Definición",
        "description": "Un histograma agrupa datos numéricos en intervalos y representa su frecuencia o densidad."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/bins-y-binwidth",
        "label": "bins y binwidth",
        "description": "`bins` establece los intervalos o su número; `binwidth` establece su anchura."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/stat",
        "label": "stat",
        "description": "Controla si la altura representa conteo, frecuencia, probabilidad, porcentaje o densidad."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/histograma-con-kde",
        "label": "Histograma con KDE",
        "description": "`kde=True` añade una curva suavizada de distribución."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/multiple",
        "label": "multiple",
        "description": "Controla si los histogramas de varios grupos se superponen, apilan, separan o rellenan proporcionalmente."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/common-bins-y-common-norm",
        "label": "common_bins y common_norm",
        "description": "`common_bins` comparte bordes de intervalos; `common_norm` decide si se normaliza conjuntamente o por grupo."
      },
      {
        "id": "analisis-de-datos/seaborn/histogramas/histograma-acumulado",
        "label": "Histograma acumulado",
        "description": "`cumulative=True` acumula frecuencias a lo largo de los intervalos."
      }
    ]
  },
  {
    "key": "densidad-y-acumulada",
    "label": "Densidad y distribución acumulada",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/definicion",
        "label": "Definición",
        "description": "KDE estima una distribución continua; ECDF muestra la proporción observada hasta cada valor."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/kdeplot-y-bw-adjust",
        "label": "kdeplot y bw_adjust",
        "description": "`bw_adjust` multiplica el ancho de banda seleccionado por el método `bw_method`."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/cut-y-clip",
        "label": "cut y clip",
        "description": "`cut` limita la extensión de la rejilla respecto a los datos; `clip` impone límites de evaluación."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/kde-bivariada-y-levels",
        "label": "KDE bivariada y levels",
        "description": "Una KDE bivariada estima densidad en dos dimensiones; `levels` controla niveles de contorno."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/ecdfplot",
        "label": "ecdfplot",
        "description": "La función de distribución acumulada empírica muestra la fracción de observaciones menor o igual a X."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/rugplot",
        "label": "rugplot",
        "description": "Añade marcas pequeñas en las posiciones de las observaciones."
      },
      {
        "id": "analisis-de-datos/seaborn/densidad-y-acumulada/displot",
        "label": "displot",
        "description": "Interfaz figure-level para histogramas, KDE y ECDF."
      }
    ]
  },
  {
    "key": "barras-y-conteos",
    "label": "Barras y conteos",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/definicion",
        "label": "Definición",
        "description": "Los gráficos de barras comparan estimaciones o recuentos por categoría."
      },
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/barplot",
        "label": "barplot",
        "description": "Muestra una estimación numérica por categoría mediante barras."
      },
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/countplot",
        "label": "countplot",
        "description": "Cuenta observaciones por categoría sin necesitar una columna numérica."
      },
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/conteos-relativos",
        "label": "Conteos relativos",
        "description": "`stat=\"percent\"` en countplot muestra porcentajes respecto al total representado."
      },
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/pointplot",
        "label": "pointplot",
        "description": "Representa estimaciones como puntos, con intervalos opcionales y líneas que facilitan comparar grupos."
      },
      {
        "id": "analisis-de-datos/seaborn/barras-y-conteos/barras-horizontales-y-orden",
        "label": "Barras horizontales y orden",
        "description": "El intercambio de `x` e `y` cambia la orientación; `order` fija el orden de categorías."
      }
    ]
  },
  {
    "key": "distribuciones-categoricas",
    "label": "Distribuciones categóricas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/definicion",
        "label": "Definición",
        "description": "Estos gráficos muestran la distribución de una medida para cada categoría, en vez de resumirla solo por la media."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/boxplot",
        "label": "boxplot",
        "description": "La caja va de Q1 a Q3; la línea interior es la mediana. Los bigotes alcanzan los valores observados dentro del umbral definido."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/whis-showfliers-y-showmeans",
        "label": "whis, showfliers y showmeans",
        "description": "`whis` ajusta el criterio de los bigotes; `showfliers` y `showmeans` controlan puntos extremos y media."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/violinplot",
        "label": "violinplot",
        "description": "Representa densidades suavizadas por categoría; el ancho refleja densidad estimada."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/stripplot",
        "label": "stripplot",
        "description": "Muestra observaciones individuales y permite desplazarlas con `jitter`."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/swarmplot",
        "label": "swarmplot",
        "description": "Coloca puntos sin superposición mediante desplazamiento a lo largo del eje categórico."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/boxenplot",
        "label": "boxenplot",
        "description": "Representa varios cuantiles mediante cajas anidadas para describir mejor las colas."
      },
      {
        "id": "analisis-de-datos/seaborn/distribuciones-categoricas/catplot",
        "label": "catplot",
        "description": "Interfaz figure-level para los gráficos categóricos."
      }
    ]
  },
  {
    "key": "parametros-categoricos",
    "label": "Parámetros categóricos",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/definicion",
        "label": "Definición",
        "description": "Las funciones categóricas permiten controlar el orden, la separación y la representación de los grupos."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/order-y-hue-order",
        "label": "order y hue_order",
        "description": "`order` organiza las categorías del eje; `hue_order` organiza los niveles de color."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/width-dodge-y-gap",
        "label": "width, dodge y gap",
        "description": "`width` controla el ancho; `dodge` desplaza grupos; `gap` deja espacio entre elementos desplazados en funciones compatibles."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/fill-y-split",
        "label": "fill y split",
        "description": "`fill` controla el relleno de figuras compatibles; `split` divide el violín por hue."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/native-scale-y-formatter",
        "label": "native_scale y formatter",
        "description": "`native_scale=True` preserva distancias reales en ejes numéricos o de fecha; `formatter` transforma valores usados para agrupar y etiquetar categorías."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/orient",
        "label": "orient",
        "description": "`orient` indica la orientación o el eje categórico de funciones compatibles."
      },
      {
        "id": "analisis-de-datos/seaborn/parametros-categoricos/formatter",
        "label": "formatter",
        "description": "`formatter` convierte valores en etiquetas categóricas y también interviene en la agrupación."
      }
    ]
  },
  {
    "key": "mapas-de-calor",
    "label": "Mapas de calor y correlación",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/definicion",
        "label": "Definición",
        "description": "Un mapa de calor representa una matriz de valores mediante colores."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/correlacion-con-corr",
        "label": "Correlación con corr",
        "description": "`corr()` de pandas calcula la asociación entre columnas numéricas; Pearson mide asociación lineal y Spearman asociación de rangos."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/annot-y-fmt",
        "label": "annot y fmt",
        "description": "`annot` muestra valores dentro de las celdas; `fmt` determina su formato."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/cmap-center-vmin-y-vmax",
        "label": "cmap, center, vmin y vmax",
        "description": "`cmap` elige la escala de color; `center` fija un punto central y `vmin` y `vmax` fijan los extremos."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/mask",
        "label": "mask",
        "description": "`mask` oculta las celdas donde su valor es verdadero."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/linewidths-square-y-colorbar",
        "label": "linewidths, square y colorbar",
        "description": "`linewidths` separa celdas, `square` iguala su forma y `cbar` controla la barra de color."
      },
      {
        "id": "analisis-de-datos/seaborn/mapas-de-calor/clustermap",
        "label": "clustermap",
        "description": "Agrupa filas y columnas según similitud y las reordena mediante clustering jerárquico."
      }
    ]
  },
  {
    "key": "relaciones-multiples",
    "label": "Relaciones conjuntas y múltiples",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/relaciones-multiples/definicion",
        "label": "Definición",
        "description": "Las vistas conjuntas y matrices de gráficos muestran varias distribuciones y relaciones sin tener que dibujarlas una por una."
      },
      {
        "id": "analisis-de-datos/seaborn/relaciones-multiples/jointplot",
        "label": "jointplot",
        "description": "Combina un gráfico bivariado con gráficos marginales."
      },
      {
        "id": "analisis-de-datos/seaborn/relaciones-multiples/pairplot",
        "label": "pairplot",
        "description": "Genera gráficos para combinaciones de variables numéricas."
      },
      {
        "id": "analisis-de-datos/seaborn/relaciones-multiples/corner-y-diag-kind",
        "label": "corner y diag_kind",
        "description": "`corner=True` elimina la mitad redundante; `diag_kind` define las distribuciones de la diagonal."
      }
    ]
  },
  {
    "key": "regresion",
    "label": "Regresión",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/regresion/definicion",
        "label": "Definición",
        "description": "Las funciones de regresión de Seaborn visualizan una relación ajustada entre variables."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/regplot-y-ci",
        "label": "regplot y ci",
        "description": "`regplot` muestra observaciones, ajuste y, si se solicita, intervalo de confianza mediante `ci`."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/regresion-polinomica",
        "label": "Regresión polinómica",
        "description": "`order` indica el grado del polinomio que se ajusta."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/logistic-lowess-y-robust",
        "label": "logistic, lowess y robust",
        "description": "Las opciones activan respectivamente regresión logística, suavizado local o ajuste robusto frente a valores extremos."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/suavizado-local-y-ajuste-robusto",
        "label": "Suavizado local y ajuste robusto",
        "description": "LOWESS explora relaciones no lineales sin imponer un polinomio global; el ajuste robusto reduce la influencia de observaciones extremas."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/ajuste-robusto",
        "label": "Ajuste robusto",
        "description": "`robust=True` usa un modelo resistente a ciertos valores extremos."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/x-bins",
        "label": "x_bins",
        "description": "`x_bins` agrupa X para mostrar estimaciones de Y por intervalos; el ajuste sigue usando los datos originales."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/lmplot",
        "label": "lmplot",
        "description": "Interfaz figure-level que permite ajustar una regresión por grupo o faceta."
      },
      {
        "id": "analisis-de-datos/seaborn/regresion/residplot",
        "label": "residplot",
        "description": "Grafica los residuos de un ajuste, es decir, valor observado menos valor ajustado."
      }
    ]
  },
  {
    "key": "temas-y-estilos",
    "label": "Temas, estilos y contexto",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/temas-y-estilos/definicion",
        "label": "Definición",
        "description": "Los temas de Seaborn ajustan parámetros globales de Matplotlib para unificar la apariencia de los gráficos."
      },
      {
        "id": "analisis-de-datos/seaborn/temas-y-estilos/set-style-y-axes-style",
        "label": "set_style y axes_style",
        "description": "`set_style` cambia la apariencia de los ejes; `axes_style` puede usarse como contexto temporal."
      },
      {
        "id": "analisis-de-datos/seaborn/temas-y-estilos/set-context-y-plotting-context",
        "label": "set_context y plotting_context",
        "description": "Cambian tamaños de líneas, texto y otros elementos según el medio de presentación."
      },
      {
        "id": "analisis-de-datos/seaborn/temas-y-estilos/rc-y-font-scale",
        "label": "rc y font_scale",
        "description": "`rc` permite ajustar parámetros concretos de Matplotlib; `font_scale` modifica la escala de texto."
      },
      {
        "id": "analisis-de-datos/seaborn/temas-y-estilos/despine",
        "label": "despine",
        "description": "Quita bordes de los ejes, por defecto superior y derecho."
      }
    ]
  },
  {
    "key": "paletas-y-colores",
    "label": "Paletas y colores",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/definicion",
        "label": "Definición",
        "description": "Las paletas asignan colores a valores categóricos o numéricos."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/set-palette-y-color-palette",
        "label": "set_palette y color_palette",
        "description": "`set_palette` modifica la paleta activa; `color_palette` devuelve colores o un mapa de color según la opción."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-cualitativas-y-accesibilidad",
        "label": "Paletas cualitativas y accesibilidad",
        "description": "Las paletas cualitativas distinguen categorías sin indicar magnitud."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-secuenciales-y-divergentes",
        "label": "Paletas secuenciales y divergentes",
        "description": "Una secuencial representa magnitud creciente; una divergente representa dos direcciones respecto a un centro."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/light-palette-y-dark-palette",
        "label": "light_palette y dark_palette",
        "description": "Crean gradientes desde un color claro u oscuro hasta el color elegido."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/diverging-palette-y-blend-palette",
        "label": "diverging_palette y blend_palette",
        "description": "`diverging_palette` construye un gradiente de dos tonos; `blend_palette` interpola una lista de colores."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-explicitas",
        "label": "Paletas explícitas",
        "description": "Un diccionario permite asignar un color estable a cada categoría."
      },
      {
        "id": "analisis-de-datos/seaborn/paletas-y-colores/blend-palette",
        "label": "blend_palette",
        "description": "`blend_palette` interpola colores de una lista para generar una paleta o mapa de color."
      }
    ]
  },
  {
    "key": "personalizacion",
    "label": "Personalización con Matplotlib",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/personalizacion/definicion",
        "label": "Definición",
        "description": "Seaborn devuelve objetos que se pueden ajustar con Matplotlib para controlar títulos, etiquetas, escalas y detalles."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/tamano-y-subplots",
        "label": "Tamaño y subplots",
        "description": "`plt.figure(figsize=...)` configura una figura; `plt.subplots()` crea figura y uno o más Axes."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/titulos-y-etiquetas",
        "label": "Títulos y etiquetas",
        "description": "`set_title`, `set_xlabel` y `set_ylabel` cambian los textos; las funciones `plt.title`, `plt.xlabel` y `plt.ylabel` actúan sobre el Axes actual."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/limites-y-escalas",
        "label": "Límites y escalas",
        "description": "`set_xlim` y `set_ylim` cambian el rango visible; `set_xscale` y `set_yscale` cambian la escala."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/log-scale",
        "label": "log_scale",
        "description": "Varias funciones de Seaborn aceptan `log_scale` para configurar escalas antes o durante el cálculo estadístico."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/rotacion-de-etiquetas",
        "label": "Rotación de etiquetas",
        "description": "`tick_params` o `plt.xticks(rotation=...)` permiten girar etiquetas de los ejes."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/anotaciones",
        "label": "Anotaciones",
        "description": "`annotate` añade texto asociado a una coordenada; `bar_label` etiqueta las barras."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/leyendas-y-move-legend",
        "label": "Leyendas y move_legend",
        "description": "`legend` controla la presencia de la leyenda; `move_legend` vuelve a crearla en otra posición."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/alpha-color-marker-y-linewidth",
        "label": "alpha, color, marker y linewidth",
        "description": "Estos parámetros controlan transparencia, color fijo, símbolos y grosor de líneas o bordes."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/superposicion-de-graficos",
        "label": "Superposición de gráficos",
        "description": "Varias funciones axes-level pueden dibujar sobre el mismo Axes."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/mostrar-y-exportar",
        "label": "Mostrar y exportar",
        "description": "`plt.show()` muestra figuras; `savefig()` exporta imágenes o documentos vectoriales."
      },
      {
        "id": "analisis-de-datos/seaborn/personalizacion/anotacion-de-puntos",
        "label": "Anotación de puntos",
        "description": "`ax.annotate()` sitúa texto asociado a una coordenada, con un desplazamiento opcional."
      }
    ]
  },
  {
    "key": "facetas-y-cuadriculas",
    "label": "Facetas y cuadrículas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/definicion",
        "label": "Definición",
        "description": "Las facetas dividen datos en paneles según categorías para comparar patrones con la misma estructura."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/row-col-y-col-wrap",
        "label": "row, col y col_wrap",
        "description": "`row` separa por filas, `col` por columnas y `col_wrap` distribuye una serie de columnas en varias filas."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/height-y-aspect",
        "label": "height y aspect",
        "description": "`height` es la altura en pulgadas de cada panel; `aspect` es ancho dividido entre altura."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/sharex-y-sharey",
        "label": "sharex y sharey",
        "description": "Controlan si los paneles comparten escalas de eje."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/facetgrid-y-map",
        "label": "FacetGrid y map",
        "description": "`FacetGrid` crea la cuadrícula; `map` aplica una función pasando vectores por panel."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/map-dataframe",
        "label": "map_dataframe",
        "description": "Pasa a la función el DataFrame de cada faceta mediante `data`."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/personalizacion-de-grids",
        "label": "Personalización de grids",
        "description": "Los objetos de cuadrícula permiten definir títulos, etiquetas y acceder a sus Axes."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/pairgrid",
        "label": "PairGrid",
        "description": "Permite elegir una función diferente para la diagonal y para cada triángulo de una matriz de relaciones."
      },
      {
        "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/jointgrid",
        "label": "JointGrid",
        "description": "Permite configurar por separado el gráfico conjunto y las distribuciones marginales."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva para visualizar",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "La estadística descriptiva resume el centro, dispersión y forma de los datos; Seaborn visualiza estas características."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/media-mediana-y-moda",
        "label": "Media, mediana y moda",
        "description": "La media promedia valores, la mediana divide los datos ordenados y la moda identifica los más frecuentes."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/varianza-y-desviacion-estandar",
        "label": "Varianza y desviación estándar",
        "description": "Miden dispersión; la varianza usa unidades al cuadrado y la desviación estándar vuelve a las unidades originales."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/cuartiles-percentiles-e-iqr",
        "label": "Cuartiles, percentiles e IQR",
        "description": "Los cuartiles son percentiles 25, 50 y 75; IQR es Q3 menos Q1."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/outliers",
        "label": "Outliers",
        "description": "Un criterio descriptivo frecuente marca valores fuera de Q1−1.5×IQR y Q3+1.5×IQR."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/frecuencia-y-asimetria",
        "label": "Frecuencia y asimetría",
        "description": "La frecuencia describe cuántas observaciones hay; la asimetría describe el desequilibrio entre las colas de la distribución."
      },
      {
        "id": "analisis-de-datos/seaborn/estadistica-descriptiva/correlacion-y-causalidad",
        "label": "Correlación y causalidad",
        "description": "La correlación mide asociación; una asociación puede surgir por confusión, selección o coincidencia."
      }
    ]
  },
  {
    "key": "objects-plot",
    "label": "Objects API: Plot y capas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/objects-plot/definicion",
        "label": "Definición",
        "description": "`seaborn.objects` ofrece una interfaz declarativa: se define qué variables representar, qué marcas usar y qué transformaciones aplicar."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/plot-y-propiedades",
        "label": "Plot y propiedades",
        "description": "`Plot` asigna variables a propiedades como `x`, `y`, `color` y `pointsize`."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/add-y-capas",
        "label": "add y capas",
        "description": "`add()` añade una marca con cero o más transformaciones; varias llamadas superponen capas."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/marcas-dot-dots-line-y-path",
        "label": "Marcas Dot, Dots, Line y Path",
        "description": "`Dot` y `Dots` representan puntos; `Line` conecta según el orden de orientación y `Path` conserva el orden de entrada."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/bar-bars-y-area",
        "label": "Bar, Bars y Area",
        "description": "Bar y Bars representan magnitudes desde una base; Area rellena el espacio entre la base y la curva."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/text-dash-range-y-band",
        "label": "Text, Dash, Range y Band",
        "description": "Text muestra etiquetas; Dash representa segmentos orientados; Range y Band representan intervalos con líneas o relleno."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/marcas-de-texto",
        "label": "Marcas de texto",
        "description": "`Text` utiliza la propiedad `text` para colocar etiquetas en coordenadas de datos."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-plot/barras-de-histograma-y-marcas-de-intervalo",
        "label": "Barras de histograma y marcas de intervalo",
        "description": "`Bars` es una marca eficiente para histogramas; `Band` representa un intervalo relleno."
      }
    ]
  },
  {
    "key": "objects-estadistica",
    "label": "Objects API: transformaciones estadísticas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/definicion",
        "label": "Definición",
        "description": "Las transformaciones estadísticas de Objects convierten observaciones en resúmenes antes de dibujarlas."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/agg-y-est",
        "label": "Agg y Est",
        "description": "Agg produce un estadístico por grupo; Est añade un intervalo asociado al estadístico."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/hist-y-count",
        "label": "Hist y Count",
        "description": "Hist agrupa una medida en intervalos; Count cuenta observaciones dentro de grupos."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/hist-y-kde",
        "label": "Hist y KDE",
        "description": "Hist estima frecuencias por intervalos; KDE estima densidad suave."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/perc",
        "label": "Perc",
        "description": "`Perc` reemplaza observaciones por percentiles de los grupos."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-estadistica/polyfit",
        "label": "PolyFit",
        "description": "`PolyFit` ajusta un polinomio y genera valores predichos para representarlo."
      }
    ]
  },
  {
    "key": "objects-posicion-y-escalas",
    "label": "Objects API: posición y escalas",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/definicion",
        "label": "Definición",
        "description": "Las transformaciones de posición modifican dónde se dibujan las marcas; las escalas traducen valores a propiedades gráficas."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/dodge-y-stack",
        "label": "Dodge y Stack",
        "description": "Dodge separa marcas que coinciden en posición; Stack las apila."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/jitter-y-shift",
        "label": "Jitter y Shift",
        "description": "Jitter introduce desplazamiento aleatorio controlado; Shift aplica un desplazamiento fijo."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/norm",
        "label": "Norm",
        "description": "Norm divide valores agregados por una referencia, por defecto su suma, dentro de los grupos definidos."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/scale-y-tipos-de-escala",
        "label": "scale y tipos de escala",
        "description": "`Nominal` representa categorías, `Continuous` valores numéricos, `Temporal` fechas y `Boolean` valores lógicos."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/label-limit-y-theme",
        "label": "label, limit y theme",
        "description": "Estos métodos cambian etiquetas, límites visibles y parámetros de apariencia en la interfaz Objects."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/shift",
        "label": "Shift",
        "description": "`Shift` mueve marcas una distancia fija en unidades de la escala correspondiente."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/escalas-continuas",
        "label": "Escalas continuas",
        "description": "`Continuous` permite especificar transformaciones y rangos para escalas numéricas."
      }
    ]
  },
  {
    "key": "objects-composicion",
    "label": "Objects API: composición y exportación",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/objects-composicion/definicion",
        "label": "Definición",
        "description": "Objects puede dividir gráficos en facetas, construir pares de variables y controlar el diseño."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-composicion/facet-y-layout",
        "label": "facet y layout",
        "description": "`facet` especifica variables para filas o columnas; `layout` ajusta el tamaño de la figura y su disposición."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-composicion/pair",
        "label": "pair",
        "description": "`pair()` crea combinaciones de variables en los ejes."
      },
      {
        "id": "analisis-de-datos/seaborn/objects-composicion/show-save-y-on",
        "label": "show, save y on",
        "description": "`show()` muestra el gráfico; `save()` lo exporta; `on()` dirige el dibujo a un objeto de Matplotlib compatible."
      }
    ]
  },
  {
    "key": "analisis-exploratorio",
    "label": "Análisis exploratorio y comunicación",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/definicion",
        "label": "Definición",
        "description": "El análisis exploratorio (EDA) combina resúmenes y gráficos para detectar patrones, valores faltantes y posibles errores antes de extraer conclusiones."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/elegir-el-grafico-adecuado",
        "label": "Elegir el gráfico adecuado",
        "description": "Usa líneas para evolución, barras para comparaciones, histogramas o cajas para distribuciones y dispersión para relaciones."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/kpis-y-tasas",
        "label": "KPIs y tasas",
        "description": "Un KPI debe tener numerador, denominador, periodo y unidad definidos."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/comparacion-temporal",
        "label": "Comparación temporal",
        "description": "Una comparación temporal exige fechas ordenadas y una agregación consistente."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/segmentacion",
        "label": "Segmentación",
        "description": "Segmentar consiste en comparar subconjuntos de negocio sin perder el contexto de las métricas."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/visualizacion-no-enganosa",
        "label": "Visualización no engañosa",
        "description": "Ejes truncados, intervalos inconsistentes y agregaciones incorrectas pueden distorsionar la interpretación."
      },
      {
        "id": "analisis-de-datos/seaborn/analisis-exploratorio/comunicar-conclusiones",
        "label": "Comunicar conclusiones",
        "description": "Una visualización de negocio debe indicar qué se observó, en qué periodo y con qué limitaciones."
      }
    ]
  },
  {
    "key": "compatibilidad",
    "label": "Compatibilidad entre versiones",
    "children": [
      {
        "id": "analisis-de-datos/seaborn/compatibilidad/definicion",
        "label": "Definición",
        "description": "La API de Seaborn cambia entre versiones, por lo que una función o parámetro puede estar disponible o desaconsejado según el entorno."
      },
      {
        "id": "analisis-de-datos/seaborn/compatibilidad/ci-y-errorbar",
        "label": "ci y errorbar",
        "description": "Desde 0.12 las funciones de estimación como barplot y lineplot utilizan `errorbar` en lugar de `ci`; regplot conserva `ci`."
      },
      {
        "id": "analisis-de-datos/seaborn/compatibilidad/distplot-y-sus-reemplazos",
        "label": "distplot y sus reemplazos",
        "description": "`distplot()` está obsoleto; histplot, kdeplot y displot son las alternativas actuales."
      },
      {
        "id": "analisis-de-datos/seaborn/compatibilidad/cambios-categoricos-en-0-13",
        "label": "Cambios categóricos en 0.13",
        "description": "La versión 0.13 introdujo cambios en color, escalas y opciones categóricas; desde 0.13.2 algunas funciones admiten weights."
      }
    ]
  }
];
