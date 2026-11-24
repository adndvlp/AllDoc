// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const matplotlibCurriculum = [
  {
    "key": "fundamentos",
    "label": "Fundamentos de Matplotlib",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/definicion",
        "label": "Definición",
        "description": "Matplotlib convierte datos numéricos, categóricos o temporales en figuras. `pyplot` es su interfaz de uso habitual."
      },
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/figure-axes-axis",
        "label": "Figure, Axes y Axis",
        "description": "`Figure` es el lienzo completo; `Axes` es la región de dibujo y `Axis` administra la escala y las marcas de cada eje."
      },
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/figure-figsize",
        "label": "plt.figure y figsize",
        "description": "`figure()` crea un lienzo; `figsize` especifica su anchura y altura en pulgadas."
      },
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/subplots",
        "label": "plt.subplots",
        "description": "`subplots()` crea una figura y uno o varios `Axes` en una sola operación."
      },
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/pyplot-y-objetos",
        "label": "pyplot y orientación a objetos",
        "description": "`pyplot` actúa sobre la figura y los ejes activos; la interfaz orientada a objetos usa referencias explícitas a `fig` y `ax`."
      },
      {
        "id": "analisis-de-datos/matplotlib/fundamentos/show-close",
        "label": "show y close",
        "description": "`show()` presenta las figuras abiertas; `close()` libera la figura de la gestión de pyplot."
      }
    ]
  },
  {
    "key": "lineas",
    "label": "Gráficas de líneas",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/lineas/definicion",
        "label": "Definición",
        "description": "`plot()` conecta puntos en el orden recibido. Se usa para tendencias o secuencias ordenadas."
      },
      {
        "id": "analisis-de-datos/matplotlib/lineas/varias-series",
        "label": "Varias series",
        "description": "Cada llamada a `plot()` añade una serie al mismo `Axes`."
      },
      {
        "id": "analisis-de-datos/matplotlib/lineas/step-stairs",
        "label": "step y stairs",
        "description": "`step()` dibuja cambios escalonados entre coordenadas; `stairs()` recibe alturas e intervalos delimitados por bordes."
      },
      {
        "id": "analisis-de-datos/matplotlib/lineas/stem",
        "label": "stem",
        "description": "`stem()` representa valores discretos con segmentos desde una línea base hasta cada punto."
      }
    ]
  },
  {
    "key": "barras",
    "label": "Gráficas de barras",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/barras/definicion",
        "label": "Definición",
        "description": "`bar()` compara magnitudes entre categorías mediante barras verticales. `barh()` las representa horizontalmente."
      },
      {
        "id": "analisis-de-datos/matplotlib/barras/barh",
        "label": "Barras horizontales",
        "description": "`barh()` usa categorías en y y magnitudes en x; ayuda cuando hay etiquetas largas."
      },
      {
        "id": "analisis-de-datos/matplotlib/barras/barras-agrupadas",
        "label": "Barras agrupadas",
        "description": "Desplaza las barras de cada serie sobre el eje x para comparar valores lado a lado."
      },
      {
        "id": "analisis-de-datos/matplotlib/barras/barras-apiladas",
        "label": "Barras apiladas",
        "description": "`bottom` indica dónde empieza cada barra vertical; permite sumar componentes de una categoría."
      }
    ]
  },
  {
    "key": "distribuciones",
    "label": "Histogramas y distribuciones",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/definicion",
        "label": "Definición",
        "description": "`hist()` divide valores numéricos en intervalos y muestra su frecuencia o densidad."
      },
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/bins",
        "label": "bins",
        "description": "`bins` puede ser una cantidad de intervalos, sus bordes o un método automático."
      },
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/density",
        "label": "density",
        "description": "`density=True` normaliza el histograma para que el área total de las barras sea 1."
      },
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/boxplot",
        "label": "boxplot",
        "description": "`boxplot()` resume mediana, cuartiles y valores potencialmente atípicos."
      },
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/violinplot",
        "label": "violinplot",
        "description": "`violinplot()` estima la forma de una distribución mediante densidad suavizada."
      },
      {
        "id": "analisis-de-datos/matplotlib/distribuciones/ecdf",
        "label": "ecdf",
        "description": "`ecdf()` muestra la proporción de observaciones menores o iguales a cada valor sin intervalos arbitrarios."
      }
    ]
  },
  {
    "key": "dispersion",
    "label": "Dispersión y relaciones",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/dispersion/definicion",
        "label": "Definición",
        "description": "`scatter()` representa cada observación con sus coordenadas x e y. Permite explorar asociaciones entre variables."
      },
      {
        "id": "analisis-de-datos/matplotlib/dispersion/tamano-color",
        "label": "Tamaño y color",
        "description": "`s` controla el área de cada marcador en puntos cuadrados y `c` puede representar una variable numérica."
      },
      {
        "id": "analisis-de-datos/matplotlib/dispersion/hist2d",
        "label": "hist2d",
        "description": "`hist2d()` cuenta observaciones en celdas rectangulares de dos dimensiones."
      },
      {
        "id": "analisis-de-datos/matplotlib/dispersion/hexbin",
        "label": "hexbin",
        "description": "`hexbin()` agrupa observaciones en celdas hexagonales y colorea su frecuencia u otra medida agregada."
      }
    ]
  },
  {
    "key": "areas-composicion",
    "label": "Composición, áreas e incertidumbre",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/areas-composicion/definicion",
        "label": "Definición",
        "description": "Las gráficas de áreas, sectores y error ayudan a mostrar acumulación, partes de un total o incertidumbre."
      },
      {
        "id": "analisis-de-datos/matplotlib/areas-composicion/pie",
        "label": "pie",
        "description": "`pie()` muestra componentes mutuamente excluyentes de un total positivo."
      },
      {
        "id": "analisis-de-datos/matplotlib/areas-composicion/fill-between",
        "label": "fill_between",
        "description": "`fill_between()` rellena el espacio entre dos curvas o entre una curva y una línea base."
      },
      {
        "id": "analisis-de-datos/matplotlib/areas-composicion/stackplot",
        "label": "stackplot",
        "description": "`stackplot()` apila áreas para representar componentes que cambian a lo largo de x."
      },
      {
        "id": "analisis-de-datos/matplotlib/areas-composicion/errorbar",
        "label": "errorbar",
        "description": "`errorbar()` dibuja valores con barras de incertidumbre o variabilidad proporcionadas por el usuario."
      }
    ]
  },
  {
    "key": "mapas-de-calor",
    "label": "Mapas de calor e imágenes",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/mapas-de-calor/definicion",
        "label": "Definición",
        "description": "Un mapa de calor asigna colores a una matriz numérica. Permite comparar magnitudes en dos dimensiones."
      },
      {
        "id": "analisis-de-datos/matplotlib/mapas-de-calor/imshow-matshow",
        "label": "imshow y matshow",
        "description": "`imshow()` representa un array como imagen; `matshow()` ofrece valores predeterminados apropiados para matrices."
      },
      {
        "id": "analisis-de-datos/matplotlib/mapas-de-calor/pcolormesh",
        "label": "pcolormesh",
        "description": "`pcolormesh()` colorea celdas de una cuadrícula, que puede tener bordes no uniformes."
      },
      {
        "id": "analisis-de-datos/matplotlib/mapas-de-calor/colorbar",
        "label": "colorbar",
        "description": "`colorbar()` muestra la correspondencia entre valores y colores de un objeto mapeado."
      },
      {
        "id": "analisis-de-datos/matplotlib/mapas-de-calor/contour-contourf",
        "label": "contour y contourf",
        "description": "`contour()` dibuja líneas de igual valor; `contourf()` rellena las bandas entre niveles."
      }
    ]
  },
  {
    "key": "titulos-etiquetas-leyendas",
    "label": "Títulos, etiquetas y leyendas",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/definicion",
        "label": "Definición",
        "description": "Los títulos explican qué se muestra; las etiquetas indican variables y unidades; las leyendas identifican series."
      },
      {
        "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/titulos",
        "label": "set_title y suptitle",
        "description": "`set_title()` titula un panel; `suptitle()` titula la figura completa."
      },
      {
        "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/etiquetas-ejes",
        "label": "set_xlabel y set_ylabel",
        "description": "Los nombres de los ejes describen la variable representada, idealmente con su unidad."
      },
      {
        "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/legend",
        "label": "legend, label y loc",
        "description": "`label` identifica un elemento y `legend()` muestra las etiquetas. `loc` determina la ubicación de la leyenda."
      },
      {
        "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/leyendas-personalizadas",
        "label": "Leyendas personalizadas",
        "description": "`handles` selecciona los objetos de la leyenda; `labels` sus textos; `bbox_to_anchor` ajusta su anclaje."
      }
    ]
  },
  {
    "key": "estilo-visual",
    "label": "Estilo visual",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/definicion",
        "label": "Definición",
        "description": "Las propiedades visuales modifican la apariencia de un objeto sin cambiar los datos que representa."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/color-alpha",
        "label": "color y alpha",
        "description": "`color` fija el color de un objeto y `alpha` su opacidad, de 0 a 1."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/estilo-lineas",
        "label": "linestyle y linewidth",
        "description": "`linestyle` define el patrón de una línea; `linewidth` su grosor en puntos."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/marcadores",
        "label": "marker y markersize",
        "description": "`marker` elige el símbolo de cada punto de una línea; `markersize` su tamaño en puntos."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/tipografia-basica",
        "label": "fontsize y fontweight",
        "description": "`fontsize` controla el tamaño del texto; `fontweight` controla su grosor."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/bordes-y-rellenos",
        "label": "edgecolor, facecolor y hatch",
        "description": "`facecolor` colorea el interior, `edgecolor` el contorno y `hatch` añade un patrón a formas compatibles."
      },
      {
        "id": "analisis-de-datos/matplotlib/estilo-visual/zorder",
        "label": "zorder",
        "description": "`zorder` determina el orden de superposición de los elementos; los valores mayores se dibujan encima."
      }
    ]
  },
  {
    "key": "ejes-escalas",
    "label": "Ejes, límites y escalas",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/definicion",
        "label": "Definición",
        "description": "Los ejes traducen valores a posiciones. Sus límites, escalas y proporciones determinan cómo se interpreta la gráfica."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/limites",
        "label": "set_xlim y set_ylim",
        "description": "`set_xlim()` y `set_ylim()` fijan el intervalo visible de cada eje."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/grid",
        "label": "grid",
        "description": "`grid()` muestra líneas de referencia alineadas con las marcas de los ejes."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/escalas",
        "label": "set_xscale y set_yscale",
        "description": "`set_xscale()` y `set_yscale()` cambian la escala. La logarítmica muestra relaciones multiplicativas."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/symlog-logit",
        "label": "symlog y logit",
        "description": "`symlog` permite valores negativos, cero y positivos con una región lineal central; `logit` representa probabilidades estrictamente entre 0 y 1."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/invertir-ejes",
        "label": "Invertir ejes",
        "description": "`invert_xaxis()` e `invert_yaxis()` invierten el sentido del eje sin reordenar las observaciones."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/margenes-autoescala",
        "label": "margins y autoscale",
        "description": "`margins()` ajusta el espacio adicional alrededor de los datos; `autoscale()` permite recuperar límites automáticos."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/aspecto",
        "label": "set_aspect y set_box_aspect",
        "description": "`set_aspect()` controla la relación entre unidades x e y; `set_box_aspect()` controla la altura/anchura física del panel."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-escalas/spines",
        "label": "spines",
        "description": "Los `spines` son los bordes del área de dibujo; se pueden ocultar o modificar."
      }
    ]
  },
  {
    "key": "marcas-formato",
    "label": "Marcas, etiquetas y formato numérico",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/definicion",
        "label": "Definición",
        "description": "Las marcas (ticks) señalan posiciones de un eje y sus etiquetas muestran cómo leerlas. Los locators eligen posiciones; los formatters el texto."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/ticks",
        "label": "set_xticks y set_yticks",
        "description": "Fijan posiciones de marcas y, opcionalmente, sus etiquetas."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/ticklabels",
        "label": "set_xticklabels y set_yticklabels",
        "description": "Modifican los textos de marcas existentes. Es preferible fijar posiciones y textos juntos con `set_xticks` o `set_yticks`."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/rotacion-tick-params",
        "label": "rotation y tick_params",
        "description": "`tick_params()` configura apariencia de marcas y etiquetas, incluida su rotación."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/locators",
        "label": "MultipleLocator y MaxNLocator",
        "description": "`MultipleLocator` fija una separación regular; `MaxNLocator` limita aproximadamente la cantidad de intervalos con valores adecuados."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/auto-minor-locator",
        "label": "AutoMinorLocator",
        "description": "`AutoMinorLocator` crea subdivisiones de las marcas principales en ejes lineales con separación uniforme."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/formato-numerico",
        "label": "FuncFormatter y StrMethodFormatter",
        "description": "`FuncFormatter` llama una función para cada marca; `StrMethodFormatter` usa una plantilla con `x` y `pos`."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/percent-formatter",
        "label": "PercentFormatter",
        "description": "`PercentFormatter` convierte valores numéricos a etiquetas porcentuales usando `xmax` como equivalente al 100 %."
      },
      {
        "id": "analisis-de-datos/matplotlib/marcas-formato/formatters-adicionales",
        "label": "ScalarFormatter y FormatStrFormatter",
        "description": "`ScalarFormatter` ajusta automáticamente la representación numérica; `FormatStrFormatter` usa formato de estilo `%`."
      }
    ]
  },
  {
    "key": "colores-normalizacion",
    "label": "Colores y normalización",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/colores-normalizacion/definicion",
        "label": "Definición",
        "description": "Un `cmap` transforma valores normalizados en colores. Una normalización define cómo los datos se convierten a la escala del mapa."
      },
      {
        "id": "analisis-de-datos/matplotlib/colores-normalizacion/normalizacion",
        "label": "Normalize y LogNorm",
        "description": "`Normalize` transforma linealmente un rango de datos; `LogNorm` lo hace logarítmicamente y requiere valores positivos."
      },
      {
        "id": "analisis-de-datos/matplotlib/colores-normalizacion/mapas-personalizados",
        "label": "ListedColormap y LinearSegmentedColormap",
        "description": "`ListedColormap` crea una lista de colores; `LinearSegmentedColormap.from_list()` interpola una secuencia de colores."
      },
      {
        "id": "analisis-de-datos/matplotlib/colores-normalizacion/boundary-norm",
        "label": "BoundaryNorm",
        "description": "`BoundaryNorm` asigna valores a intervalos discretos delimitados por bordes."
      }
    ]
  },
  {
    "key": "composicion-figuras",
    "label": "Composición de figuras",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/definicion",
        "label": "Definición",
        "description": "Una figura puede contener varios paneles para mostrar indicadores relacionados de forma coordinada."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/subplot-subplots",
        "label": "subplot y subplots",
        "description": "`subplot()` crea o selecciona un panel individual por posición; `subplots()` devuelve varios paneles a la vez."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/ejes-compartidos",
        "label": "sharex y sharey",
        "description": "`sharex` y `sharey` sincronizan límites y escalas entre paneles."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/gridspec",
        "label": "GridSpec",
        "description": "`GridSpec` define una cuadrícula en la que los paneles pueden ocupar varias celdas."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/subplot-mosaic",
        "label": "subplot_mosaic",
        "description": "`subplot_mosaic()` define una composición por nombres y devuelve un diccionario de `Axes`."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/crear-ejes-manualmente",
        "label": "add_subplot y add_axes",
        "description": "`add_subplot()` ubica ejes en una rejilla; `add_axes()` permite colocar ejes por coordenadas relativas a la figura."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/subfigures",
        "label": "subfigures",
        "description": "`subfigures()` divide una figura en subfiguras que pueden tener paneles y títulos propios."
      },
      {
        "id": "analisis-de-datos/matplotlib/composicion-figuras/espaciado",
        "label": "layout, tight_layout y subplots_adjust",
        "description": "Los motores de layout ajustan posiciones para reducir solapamientos; `subplots_adjust()` ajusta márgenes manualmente."
      }
    ]
  },
  {
    "key": "ejes-secundarios",
    "label": "Ejes secundarios",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/ejes-secundarios/definicion",
        "label": "Definición",
        "description": "Un panel puede incluir un eje adicional para otra variable o para una conversión de unidades."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-secundarios/twinx-twiny",
        "label": "twinx y twiny",
        "description": "`twinx()` comparte x con un y independiente; `twiny()` comparte y con un x independiente."
      },
      {
        "id": "analisis-de-datos/matplotlib/ejes-secundarios/secondary-axis",
        "label": "secondary_xaxis y secondary_yaxis",
        "description": "Un eje secundario representa una transformación invertible de los valores del eje principal."
      }
    ]
  },
  {
    "key": "anotaciones",
    "label": "Anotaciones y referencias",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/definicion",
        "label": "Definición",
        "description": "Las anotaciones, textos y líneas de referencia añaden contexto a puntos, umbrales o periodos."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/text",
        "label": "text",
        "description": "`text()` coloca texto en una posición de datos por defecto."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/annotate",
        "label": "annotate",
        "description": "`annotate()` conecta un texto con una coordenada concreta, opcionalmente mediante una flecha."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/bar-label",
        "label": "bar_label",
        "description": "`bar_label()` añade etiquetas numéricas a las barras de un `BarContainer`."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/lineas-referencia",
        "label": "axhline y axvline",
        "description": "`axhline()` marca un valor y horizontal; `axvline()` marca un valor x vertical."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/segmentos-referencia",
        "label": "hlines y vlines",
        "description": "`hlines()` y `vlines()` dibujan segmentos con extremos en coordenadas de datos."
      },
      {
        "id": "analisis-de-datos/matplotlib/anotaciones/regiones-destacadas",
        "label": "axhspan y axvspan",
        "description": "`axhspan()` sombrea una franja y; `axvspan()` sombrea un intervalo x."
      }
    ]
  },
  {
    "key": "fechas-series-temporales",
    "label": "Fechas y series temporales",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/fechas-series-temporales/definicion",
        "label": "Definición",
        "description": "Matplotlib admite fechas reales y las convierte internamente a coordenadas temporales. Esto permite representar intervalos de tiempo con sus distancias correctas."
      },
      {
        "id": "analisis-de-datos/matplotlib/fechas-series-temporales/date-formatter",
        "label": "DateFormatter",
        "description": "`DateFormatter` aplica un formato de fecha a las etiquetas de las marcas."
      },
      {
        "id": "analisis-de-datos/matplotlib/fechas-series-temporales/date-locators",
        "label": "DateLocator y AutoDateLocator",
        "description": "Los localizadores de fechas eligen marcas según intervalos de calendario. `AutoDateLocator` adapta las marcas a la escala visible."
      }
    ]
  },
  {
    "key": "numpy-pandas",
    "label": "Integración con NumPy y pandas",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/definicion",
        "label": "Definición",
        "description": "Matplotlib recibe arrays de NumPy y datos de pandas. Los métodos de pandas pueden crear gráficas de Matplotlib directamente."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/arrays-numpy",
        "label": "Arrays NumPy",
        "description": "Los arrays permiten calcular nuevas series mediante operaciones vectorizadas y pasarlas a Matplotlib."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/dataframe-plot",
        "label": "DataFrame.plot",
        "description": "`DataFrame.plot()` permite elegir columnas y el tipo de visualización con el backend Matplotlib."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/series-plot",
        "label": "Series.plot",
        "description": "`Series.plot()` usa el índice como coordenada o etiqueta y los valores como magnitud."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/preparacion-datos",
        "label": "Preparación y agregación",
        "description": "Antes de graficar, agrupa, suma y ordena los registros si necesitas comparar categorías resumidas."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/datos-faltantes",
        "label": "NaN y datos enmascarados",
        "description": "`NaN` y los valores enmascarados interrumpen líneas o excluyen marcadores en funciones compatibles."
      },
      {
        "id": "analisis-de-datos/matplotlib/numpy-pandas/correlacion",
        "label": "Correlación",
        "description": "Una matriz de correlación resume asociaciones lineales entre columnas numéricas y puede mostrarse como mapa de calor."
      }
    ]
  },
  {
    "key": "exportacion",
    "label": "Exportación",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/exportacion/definicion",
        "label": "Definición",
        "description": "`savefig()` exporta una figura a un archivo. El formato suele inferirse de la extensión."
      },
      {
        "id": "analisis-de-datos/matplotlib/exportacion/dpi",
        "label": "dpi",
        "description": "`dpi` indica puntos por pulgada para la salida rasterizada y afecta su resolución."
      },
      {
        "id": "analisis-de-datos/matplotlib/exportacion/recorte-transparencia",
        "label": "bbox_inches y transparent",
        "description": "`bbox_inches='tight'` ajusta el área exportada a las decoraciones; `transparent=True` hace transparentes los fondos de figura y ejes durante la exportación."
      },
      {
        "id": "analisis-de-datos/matplotlib/exportacion/formatos",
        "label": "PNG, JPG, SVG y PDF",
        "description": "PNG y JPG son rasterizados; SVG y PDF pueden conservar líneas y texto como elementos vectoriales."
      }
    ]
  },
  {
    "key": "gestion-figuras",
    "label": "Gestión y modificación de figuras",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/gestion-figuras/definicion",
        "label": "Definición",
        "description": "Matplotlib permite acceder a figuras activas, limpiar contenido y modificar objetos después de crearlos."
      },
      {
        "id": "analisis-de-datos/matplotlib/gestion-figuras/figura-ejes-activos",
        "label": "gca y gcf",
        "description": "`gca()` obtiene los ejes actuales; `gcf()` obtiene la figura actual. Pueden crearlos si no existen."
      },
      {
        "id": "analisis-de-datos/matplotlib/gestion-figuras/limpiar-cerrar",
        "label": "cla, clf y close",
        "description": "`cla()` limpia los ejes activos; `clf()` limpia la figura activa; `close()` deja de gestionarla desde pyplot."
      },
      {
        "id": "analisis-de-datos/matplotlib/gestion-figuras/artists",
        "label": "Artist, Line2D, Patch y Collection",
        "description": "`Artist` es la clase base de muchos elementos dibujables. Las líneas son `Line2D`, las formas incluyen `Patch` y los grupos de objetos usan `Collection`."
      },
      {
        "id": "analisis-de-datos/matplotlib/gestion-figuras/modificar-artists",
        "label": "set, get y remove",
        "description": "Los métodos `set_*` o `set()` cambian propiedades, los `get_*` las consultan y `remove()` retira un objeto."
      }
    ]
  },
  {
    "key": "configuracion",
    "label": "Estilos y configuración reutilizable",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/configuracion/definicion",
        "label": "Definición",
        "description": "Los estilos y parámetros globales permiten aplicar una apariencia coherente a varias figuras sin repetir argumentos."
      },
      {
        "id": "analisis-de-datos/matplotlib/configuracion/style-rcparams",
        "label": "plt.style.use y rcParams",
        "description": "`plt.style.use()` carga un conjunto de propiedades; `rcParams` es el diccionario de configuración actual."
      },
      {
        "id": "analisis-de-datos/matplotlib/configuracion/estilos-reutilizables",
        "label": "rc_context y archivos mplstyle",
        "description": "`rc_context()` limita cambios a un bloque; los archivos `.mplstyle` guardan parámetros de estilo reutilizables."
      },
      {
        "id": "analisis-de-datos/matplotlib/configuracion/ciclo-de-propiedades",
        "label": "cycler y set_prop_cycle",
        "description": "`cycler` define secuencias de propiedades que Matplotlib aplica a series sucesivas."
      },
      {
        "id": "analisis-de-datos/matplotlib/configuracion/fuentes-mathtext",
        "label": "font_manager y MathText",
        "description": "`font_manager` localiza fuentes instaladas; MathText interpreta expresiones matemáticas delimitadas por signos `$`."
      }
    ]
  },
  {
    "key": "transformaciones-formas",
    "label": "Transformaciones y formas",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/transformaciones-formas/definicion",
        "label": "Definición",
        "description": "Una transformación indica en qué sistema de coordenadas se interpreta una posición. Las formas se añaden al panel como objetos."
      },
      {
        "id": "analisis-de-datos/matplotlib/transformaciones-formas/coordenadas",
        "label": "transData, transAxes y transFigure",
        "description": "`transData` interpreta valores de datos; `transAxes` usa fracciones del panel; `transFigure` usa fracciones de la figura."
      },
      {
        "id": "analisis-de-datos/matplotlib/transformaciones-formas/formas",
        "label": "Rectangle, Circle, Polygon y add_patch",
        "description": "Los objetos de `matplotlib.patches` representan formas; `add_patch()` los añade a un `Axes`."
      }
    ]
  },
  {
    "key": "imagenes-campos",
    "label": "Imágenes y campos",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/imagenes-campos/definicion",
        "label": "Definición",
        "description": "Matplotlib puede cargar, visualizar y guardar imágenes; también dibuja campos vectoriales y distribuciones temporales especializadas."
      },
      {
        "id": "analisis-de-datos/matplotlib/imagenes-campos/leer-guardar-imagen",
        "label": "imread e imsave",
        "description": "`imread()` carga píxeles desde un archivo; `imsave()` guarda un array como imagen."
      },
      {
        "id": "analisis-de-datos/matplotlib/imagenes-campos/quiver",
        "label": "quiver",
        "description": "`quiver()` dibuja flechas a partir de posiciones y componentes de vectores."
      },
      {
        "id": "analisis-de-datos/matplotlib/imagenes-campos/streamplot",
        "label": "streamplot",
        "description": "`streamplot()` dibuja líneas que siguen un campo vectorial definido sobre una rejilla regular."
      },
      {
        "id": "analisis-de-datos/matplotlib/imagenes-campos/broken-barh",
        "label": "broken_barh",
        "description": "`broken_barh()` dibuja segmentos horizontales con posiciones de inicio y duración."
      }
    ]
  },
  {
    "key": "proyecciones",
    "label": "Proyecciones 3D y polares",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/proyecciones/definicion",
        "label": "Definición",
        "description": "Las proyecciones definen cómo se representan las coordenadas. Matplotlib incluye ejes cartesianos, polares y tridimensionales."
      },
      {
        "id": "analisis-de-datos/matplotlib/proyecciones/plot-surface",
        "label": "plot_surface",
        "description": "`plot_surface()` dibuja una superficie a partir de matrices X, Y y Z compatibles en un Axes 3D."
      },
      {
        "id": "analisis-de-datos/matplotlib/proyecciones/polar",
        "label": "Coordenadas polares",
        "description": "Un eje polar representa un ángulo theta en radianes y una distancia radial r."
      }
    ]
  },
  {
    "key": "interactividad",
    "label": "Interactividad, animación y backends",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/interactividad/definicion",
        "label": "Definición",
        "description": "Los backends determinan cómo se renderizan y presentan figuras. Con un backend interactivo se pueden usar eventos, widgets y animaciones."
      },
      {
        "id": "analisis-de-datos/matplotlib/interactividad/backends",
        "label": "Backends e interacción",
        "description": "`Agg` renderiza imágenes sin ventana; backends GUI o de notebook permiten interacción según el entorno."
      },
      {
        "id": "analisis-de-datos/matplotlib/interactividad/eventos-callbacks",
        "label": "Eventos y callbacks",
        "description": "`mpl_connect()` vincula un evento a una función que se ejecuta cuando ocurre."
      },
      {
        "id": "analisis-de-datos/matplotlib/interactividad/widgets",
        "label": "Widgets: Slider y Button",
        "description": "Los widgets crean controles dentro de la figura. Sus callbacks actualizan los objetos gráficos."
      },
      {
        "id": "analisis-de-datos/matplotlib/interactividad/func-animation",
        "label": "FuncAnimation",
        "description": "`FuncAnimation` actualiza una figura a partir de una función llamada para cada frame."
      }
    ]
  },
  {
    "key": "criterios-visualizacion",
    "label": "Criterios de visualización analítica",
    "children": [
      {
        "id": "analisis-de-datos/matplotlib/criterios-visualizacion/definicion",
        "label": "Definición",
        "description": "La elección de gráfica depende de la pregunta de negocio y del tipo de variable, no solo de la estética."
      },
      {
        "id": "analisis-de-datos/matplotlib/criterios-visualizacion/cuartiles-percentiles",
        "label": "Distribuciones, cuartiles y percentiles",
        "description": "Los percentiles describen posiciones de una distribución y el rango intercuartílico mide la amplitud entre Q1 y Q3."
      },
      {
        "id": "analisis-de-datos/matplotlib/criterios-visualizacion/accesibilidad",
        "label": "Accesibilidad y contraste",
        "description": "Las series deben distinguirse por más de un atributo visual; usa contraste, patrones, marcadores y etiquetas."
      },
      {
        "id": "analisis-de-datos/matplotlib/criterios-visualizacion/escalas-comparacion",
        "label": "Escalas y comparaciones honestas",
        "description": "Los límites, unidades, proporciones y escalas influyen en la percepción de diferencias."
      },
      {
        "id": "analisis-de-datos/matplotlib/criterios-visualizacion/jerarquia-visual",
        "label": "Jerarquía visual y contexto",
        "description": "Un gráfico de negocio comunica una idea principal, identifica unidades y destaca referencias pertinentes."
      }
    ]
  }
];
