// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const tableauCurriculum = [
  {
    "key": "entorno-de-trabajo",
    "label": "Entorno de trabajo",
    "children": [
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/definicion",
        "label": "Definición",
        "description": "Un workbook contiene hojas de análisis, dashboards e historias. El espacio de trabajo permite conectar datos y construir vistas arrastrando campos."
      },
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/data-source",
        "label": "Data Source",
        "description": "La pestaña Data Source muestra conexiones, modelo y vista previa de registros."
      },
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/rows-y-columns",
        "label": "Rows y Columns",
        "description": "Los estantes determinan la estructura de la vista: filas y columnas, encabezados o ejes."
      },
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/marks-card",
        "label": "Marks card",
        "description": "Controla tipo de marca y codificaciones visuales: Color, Size, Label/Text, Detail, Tooltip y Shape cuando aplica."
      },
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/show-me",
        "label": "Show Me",
        "description": "Sugiere visualizaciones compatibles con los campos seleccionados."
      },
      {
        "id": "analisis-de-datos/tableau/entorno-de-trabajo/analytics-pane",
        "label": "Analytics pane",
        "description": "Permite añadir referencias, distribuciones y modelos a una vista."
      }
    ]
  },
  {
    "key": "conexiones",
    "label": "Conexiones",
    "children": [
      {
        "id": "analisis-de-datos/tableau/conexiones/definicion",
        "label": "Definición",
        "description": "Una fuente de datos conecta Tableau con archivos, bases o fuentes publicadas; puede consultar en vivo o usar una extracción."
      },
      {
        "id": "analisis-de-datos/tableau/conexiones/excel-y-texto",
        "label": "Excel y archivos de texto",
        "description": "Los archivos locales permiten analizar hojas y CSV; la primera fila suele representar encabezados."
      },
      {
        "id": "analisis-de-datos/tableau/conexiones/bases-de-datos-y-custom-sql",
        "label": "Bases de datos y Custom SQL",
        "description": "Un conector SQL consulta tablas o una consulta personalizada del motor remoto."
      },
      {
        "id": "analisis-de-datos/tableau/conexiones/live",
        "label": "Live",
        "description": "Una conexión Live consulta la fuente cuando Tableau necesita datos, sujeta a caché y disponibilidad."
      },
      {
        "id": "analisis-de-datos/tableau/conexiones/extract",
        "label": "Extract",
        "description": "Una extracción es una copia de datos optimizada para consultar con Hyper."
      },
      {
        "id": "analisis-de-datos/tableau/conexiones/refresh-de-datos",
        "label": "Refresh de datos",
        "description": "Actualiza la conexión o vuelve a construir una extracción con datos de origen."
      }
    ]
  },
  {
    "key": "campos",
    "label": "Data pane y campos",
    "children": [
      {
        "id": "analisis-de-datos/tableau/campos/definicion",
        "label": "Definición",
        "description": "El Data pane organiza campos y permite modificar su rol, tipo y propiedades sin modificar necesariamente el archivo de origen."
      },
      {
        "id": "analisis-de-datos/tableau/campos/tipos-de-datos",
        "label": "Tipos de datos",
        "description": "String, Number, Date, Date & Time, Boolean y roles geográficos determinan operaciones disponibles."
      },
      {
        "id": "analisis-de-datos/tableau/campos/dimensions-y-measures",
        "label": "Dimensions y Measures",
        "description": "Una dimensión separa las marcas en grupos; una medida representa valores que suelen agregarse."
      },
      {
        "id": "analisis-de-datos/tableau/campos/discrete-y-continuous",
        "label": "Discrete y Continuous",
        "description": "Los campos discretos (azules) crean encabezados; los continuos (verdes) crean ejes."
      },
      {
        "id": "analisis-de-datos/tableau/campos/measure-names-y-values",
        "label": "Measure Names y Measure Values",
        "description": "Campos generados que permiten mostrar varias medidas en una misma vista."
      },
      {
        "id": "analisis-de-datos/tableau/campos/count-de-tabla",
        "label": "Count de tabla",
        "description": "Desde el modelo lógico de 2020.2, cada tabla tiene un campo generado de conteo de registros."
      },
      {
        "id": "analisis-de-datos/tableau/campos/alias-y-propiedades",
        "label": "Alias y propiedades",
        "description": "Los alias cambian etiquetas de miembros discretos; las propiedades predeterminadas controlan formato y agregación inicial."
      },
      {
        "id": "analisis-de-datos/tableau/campos/carpetas-y-campos-ocultos",
        "label": "Carpetas y campos ocultos",
        "description": "Organizan el panel y reducen campos visibles; ocultar no es una medida de seguridad."
      }
    ]
  },
  {
    "key": "modelo-de-datos",
    "label": "Modelo de datos",
    "children": [
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/definicion",
        "label": "Definición",
        "description": "El modelo define cómo se combinan entidades y qué granularidad tiene cada una. Tableau distingue relaciones lógicas de joins físicos."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/granularidad",
        "label": "Granularidad",
        "description": "El nivel de detalle de una tabla indica qué representa cada registro."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/relationships",
        "label": "Relationships",
        "description": "Una relación mantiene tablas lógicas separadas; Tableau determina las combinaciones requeridas por la vista."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/cardinalidad-e-integridad",
        "label": "Cardinalidad e integridad",
        "description": "Cardinalidad describe cuántas filas pueden corresponder a una clave; integridad referencial indica si hay coincidencias garantizadas."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/capas-logica-y-fisica",
        "label": "Capas lógica y física",
        "description": "El lienzo lógico usa relaciones; abrir una tabla lógica revela su capa física de joins y unions."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/joins",
        "label": "Joins",
        "description": "Un join combina columnas de filas compatibles mediante claves y un tipo explícito de unión."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/tipos-de-join",
        "label": "Tipos de join",
        "description": "Inner conserva coincidencias; Left/Right conservan también el lado correspondiente; Full conserva ambos."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/duplicacion-por-join",
        "label": "Duplicación por join",
        "description": "Un join a una tabla con varias filas por clave puede multiplicar valores agregados."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/union",
        "label": "Union",
        "description": "Una unión apila filas de tablas compatibles, en lugar de añadir columnas."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/data-blending",
        "label": "Data blending",
        "description": "Combina resultados agregados de fuentes independientes mediante campos de enlace en una hoja."
      },
      {
        "id": "analisis-de-datos/tableau/modelo-de-datos/multi-fact-relationships",
        "label": "Multi-fact relationships",
        "description": "Desde 2024.2, el modelo permite varias tablas base de hechos conectadas por dimensiones compartidas."
      }
    ]
  },
  {
    "key": "campos-calculados",
    "label": "Campos calculados",
    "children": [
      {
        "id": "analisis-de-datos/tableau/campos-calculados/definicion",
        "label": "Definición",
        "description": "Un campo calculado deriva valores mediante una expresión que utiliza campos, constantes y funciones."
      },
      {
        "id": "analisis-de-datos/tableau/campos-calculados/calculo-por-fila-y-agregado",
        "label": "Cálculo por fila y agregado",
        "description": "Un cálculo por fila trabaja sobre registros; uno agregado trabaja sobre los valores agrupados en la vista."
      },
      {
        "id": "analisis-de-datos/tableau/campos-calculados/operadores",
        "label": "Operadores",
        "description": "Permiten aritmética, comparación y lógica con AND, OR y NOT."
      },
      {
        "id": "analisis-de-datos/tableau/campos-calculados/mezcla-de-agregados",
        "label": "Mezcla de agregados",
        "description": "Tableau rechaza expresiones que mezclan componentes agregados y no agregados en el mismo nivel cuando no son compatibles."
      },
      {
        "id": "analisis-de-datos/tableau/campos-calculados/conversion-de-tipos",
        "label": "Conversión de tipos",
        "description": "STR, INT, FLOAT, DATE y DATETIME convierten valores entre tipos compatibles."
      }
    ]
  },
  {
    "key": "agregaciones",
    "label": "Agregaciones",
    "children": [
      {
        "id": "analisis-de-datos/tableau/agregaciones/definicion",
        "label": "Definición",
        "description": "Una agregación resume las filas en cada marca de la vista. La dimensión presente determina el grupo."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/sum-y-avg",
        "label": "SUM y AVG",
        "description": "SUM suma valores y AVG obtiene la media aritmética de valores no nulos."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/count-y-countd",
        "label": "COUNT y COUNTD",
        "description": "COUNT cuenta valores no nulos; COUNTD cuenta valores distintos no nulos."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/min-y-max",
        "label": "MIN y MAX",
        "description": "Devuelven el valor menor o mayor de un conjunto."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/median-y-dispersion",
        "label": "MEDIAN y dispersión",
        "description": "MEDIAN devuelve la mediana; STDEV y VAR estiman dispersión muestral, con variantes poblacionales."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/attr",
        "label": "ATTR",
        "description": "Devuelve un único valor si los valores no nulos de la marca coinciden; muestra asterisco si difieren."
      },
      {
        "id": "analisis-de-datos/tableau/agregaciones/desagregar-medidas",
        "label": "Desagregar medidas",
        "description": "Analysis > Aggregate Measures controla si se agregan las medidas en la vista."
      }
    ]
  },
  {
    "key": "nulos-y-logica",
    "label": "Nulos y lógica",
    "children": [
      {
        "id": "analisis-de-datos/tableau/nulos-y-logica/definicion",
        "label": "Definición",
        "description": "Las funciones lógicas permiten clasificar registros, tratar faltantes y crear indicadores."
      },
      {
        "id": "analisis-de-datos/tableau/nulos-y-logica/if-y-elseif",
        "label": "IF y ELSEIF",
        "description": "Evalúan condiciones en orden; ELSE define la alternativa cuando ninguna se cumple."
      },
      {
        "id": "analisis-de-datos/tableau/nulos-y-logica/case",
        "label": "CASE",
        "description": "Compara una expresión con valores concretos mediante WHEN y THEN."
      },
      {
        "id": "analisis-de-datos/tableau/nulos-y-logica/ifnull-y-zn",
        "label": "IFNULL y ZN",
        "description": "IFNULL sustituye un nulo por un valor compatible; ZN devuelve cero si un número es nulo."
      },
      {
        "id": "analisis-de-datos/tableau/nulos-y-logica/iif",
        "label": "IIF",
        "description": "IIF elige una expresión para verdadero, falso y opcionalmente desconocido."
      }
    ]
  },
  {
    "key": "funciones-de-texto",
    "label": "Funciones de texto",
    "children": [
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/definicion",
        "label": "Definición",
        "description": "Las funciones de texto limpian, extraen y combinan cadenas para analizarlas o etiquetarlas."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/upper-lower-y-trim",
        "label": "UPPER, LOWER y TRIM",
        "description": "Cambian mayúsculas/minúsculas o eliminan espacios de extremos."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/left-right-y-mid",
        "label": "LEFT, RIGHT y MID",
        "description": "Extraen caracteres del inicio, final o una posición; MID comienza a contar en 1."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/contains-startswith-y-endswith",
        "label": "CONTAINS, STARTSWITH y ENDSWITH",
        "description": "Comprueban si un texto contiene, empieza o termina con un patrón."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/split-y-replace",
        "label": "SPLIT y REPLACE",
        "description": "SPLIT separa un token por delimitador; REPLACE sustituye coincidencias de texto."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-de-texto/len-y-concatenacion",
        "label": "LEN y concatenación",
        "description": "LEN cuenta caracteres; + concatena cadenas en Tableau."
      }
    ]
  },
  {
    "key": "funciones-numericas",
    "label": "Funciones numéricas",
    "children": [
      {
        "id": "analisis-de-datos/tableau/funciones-numericas/definicion",
        "label": "Definición",
        "description": "Transforman valores numéricos para redondear, calcular magnitudes y construir métricas."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-numericas/round-ceiling-y-floor",
        "label": "ROUND, CEILING y FLOOR",
        "description": "ROUND redondea a cierta precisión; CEILING y FLOOR aproximan hacia arriba y abajo respectivamente."
      },
      {
        "id": "analisis-de-datos/tableau/funciones-numericas/abs-y-division-protegida",
        "label": "ABS y división protegida",
        "description": "ABS elimina el signo; una división debe tratar explícitamente un denominador cero."
      }
    ]
  },
  {
    "key": "fechas",
    "label": "Fechas",
    "children": [
      {
        "id": "analisis-de-datos/tableau/fechas/definicion",
        "label": "Definición",
        "description": "Las fechas permiten agrupar eventos en periodos, comparar tiempos y construir series cronológicas."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/date-parts-y-date-values",
        "label": "Date parts y date values",
        "description": "Una parte de fecha extrae componentes; un valor truncado representa un periodo concreto."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/datepart-y-datename",
        "label": "DATEPART y DATENAME",
        "description": "DATEPART devuelve una parte numérica; DATENAME devuelve su nombre textual."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/datetrunc",
        "label": "DATETRUNC",
        "description": "Lleva la fecha al inicio del periodo elegido."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/datediff-y-dateadd",
        "label": "DATEDIFF y DATEADD",
        "description": "DATEDIFF calcula diferencias en unidades de fecha; DATEADD desplaza fechas."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/today-y-now",
        "label": "TODAY y NOW",
        "description": "Devuelven fecha actual y fecha-hora actual respectivamente."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/dateparse-y-makedate",
        "label": "DATEPARSE y MAKEDATE",
        "description": "DATEPARSE interpreta texto con un patrón; MAKEDATE construye una fecha a partir de año, mes y día."
      },
      {
        "id": "analisis-de-datos/tableau/fechas/calendario-fiscal",
        "label": "Calendario fiscal",
        "description": "Configurar el inicio del año fiscal cambia determinados niveles de fecha utilizados en la vista."
      }
    ]
  },
  {
    "key": "filtros-y-ordenamiento",
    "label": "Filtros y ordenamiento",
    "children": [
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/definicion",
        "label": "Definición",
        "description": "Los filtros limitan datos o marcas; el ordenamiento define la secuencia de presentación."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-dimension",
        "label": "Filtros de dimensión",
        "description": "Seleccionan miembros de una dimensión mediante listas, patrones o condiciones."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-medida",
        "label": "Filtros de medida",
        "description": "Restringen marcas según un agregado o valores no agregados si se elige All Values."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-fecha",
        "label": "Filtros de fecha",
        "description": "Permiten fechas relativas, rangos y partes de calendario."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/top-n-y-contexto",
        "label": "Top N y filtros de contexto",
        "description": "Top N selecciona los mejores miembros por una medida; un filtro de contexto restringe primero el universo considerado."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/filtros-de-fuente-y-extract",
        "label": "Filtros de fuente y extract",
        "description": "Los filtros de fuente limitan los datos disponibles para hojas de esa fuente; los de extract limitan lo extraído."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/show-filter-y-alcance",
        "label": "Show Filter y alcance",
        "description": "Expone controles y permite aplicar el filtro a una hoja o a varias compatibles."
      },
      {
        "id": "analisis-de-datos/tableau/filtros-y-ordenamiento/ordenamiento",
        "label": "Ordenamiento",
        "description": "Sort cambia el orden de los miembros de una dimensión según etiqueta, campo o criterio manual."
      }
    ]
  },
  {
    "key": "agrupar-y-segmentar",
    "label": "Agrupar y segmentar",
    "children": [
      {
        "id": "analisis-de-datos/tableau/agrupar-y-segmentar/definicion",
        "label": "Definición",
        "description": "Groups, sets, bins y jerarquías organizan miembros de dimensiones para distintas preguntas."
      },
      {
        "id": "analisis-de-datos/tableau/agrupar-y-segmentar/groups",
        "label": "Groups",
        "description": "Agrupan miembros discretos bajo un nombre común."
      },
      {
        "id": "analisis-de-datos/tableau/agrupar-y-segmentar/sets",
        "label": "Sets",
        "description": "Un set representa miembros In/Out; puede ser fijo o dinámico según condiciones."
      },
      {
        "id": "analisis-de-datos/tableau/agrupar-y-segmentar/bins",
        "label": "Bins",
        "description": "Dividen una medida numérica en intervalos de tamaño constante."
      },
      {
        "id": "analisis-de-datos/tableau/agrupar-y-segmentar/jerarquias",
        "label": "Jerarquías",
        "description": "Organizan dimensiones en niveles para expandir y contraer detalle."
      }
    ]
  },
  {
    "key": "graficos-basicos",
    "label": "Gráficos básicos",
    "children": [
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/definicion",
        "label": "Definición",
        "description": "La visualización debe corresponder a la pregunta: comparación, evolución, composición, relación o distribución."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/barras-y-apiladas",
        "label": "Barras y barras apiladas",
        "description": "Las barras comparan categorías; apilarlas muestra la composición del total."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/lineas-y-areas",
        "label": "Líneas y áreas",
        "description": "Una línea muestra evolución ordenada; un área enfatiza magnitud acumulando visualmente desde la base."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/dispersion",
        "label": "Dispersión",
        "description": "Compara dos medidas numéricas por entidad o registro."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/tablas-y-crosstabs",
        "label": "Tablas y crosstabs",
        "description": "Una tabla de texto muestra valores exactos cruzando dimensiones y medidas."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/heatmap-y-highlight-table",
        "label": "Heatmap y highlight table",
        "description": "Codifican valores mediante intensidad de color; la tabla resaltada también conserva valores visibles."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/treemap-y-pie",
        "label": "Treemap y pie",
        "description": "Representan partes de un total mediante áreas o ángulos."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-basicos/histogramas-y-box-plots",
        "label": "Histogramas y box plots",
        "description": "Un histograma cuenta registros por intervalo; un box plot resume distribución y posibles extremos."
      }
    ]
  },
  {
    "key": "graficos-con-varias-medidas",
    "label": "Gráficos con varias medidas",
    "children": [
      {
        "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/definicion",
        "label": "Definición",
        "description": "Varias medidas pueden compartir una tabla, un eje o ejes separados según sus unidades."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/combined-axis",
        "label": "Combined axis",
        "description": "Varias medidas comparten una escala mediante Measure Values."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/dual-axis-y-sincronizacion",
        "label": "Dual axis y sincronización",
        "description": "Dual Axis superpone dos ejes con tarjetas Marks separadas; sincronizarlos iguala escalas compatibles."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/totales-y-subtotales",
        "label": "Totales y subtotales",
        "description": "Analysis > Totals añade subtotales y totales de una tabla; Tableau puede recalcular agregados a nivel del total."
      },
      {
        "id": "analisis-de-datos/tableau/graficos-con-varias-medidas/kpi-y-formato",
        "label": "KPI y formato",
        "description": "Una tarjeta KPI resume una métrica y puede incluir contexto comparativo."
      }
    ]
  },
  {
    "key": "mapas",
    "label": "Mapas",
    "children": [
      {
        "id": "analisis-de-datos/tableau/mapas/definicion",
        "label": "Definición",
        "description": "Los mapas usan roles geográficos o coordenadas para representar datos por ubicación."
      },
      {
        "id": "analisis-de-datos/tableau/mapas/roles-geograficos-y-ubicaciones",
        "label": "Roles geográficos y ubicaciones desconocidas",
        "description": "El geocodificador interpreta campos con roles como país, estado o ciudad; Edit Locations resuelve ambigüedades."
      },
      {
        "id": "analisis-de-datos/tableau/mapas/mapas-de-simbolos-y-rellenos",
        "label": "Mapas de símbolos y rellenos",
        "description": "Los símbolos codifican magnitud en puntos; los mapas rellenos colorean polígonos disponibles."
      }
    ]
  },
  {
    "key": "parametros",
    "label": "Parámetros",
    "children": [
      {
        "id": "analisis-de-datos/tableau/parametros/definicion",
        "label": "Definición",
        "description": "Un parámetro es un valor controlado por el usuario que puede participar en cálculos, filtros o referencias."
      },
      {
        "id": "analisis-de-datos/tableau/parametros/lista-rango-y-fechas",
        "label": "Lista, rango y fechas",
        "description": "Los parámetros pueden permitir todos los valores, una lista o un rango, según su tipo."
      },
      {
        "id": "analisis-de-datos/tableau/parametros/selector-de-metricas",
        "label": "Selector de métricas",
        "description": "Un parámetro puede determinar cuál de varios cálculos se muestra."
      },
      {
        "id": "analisis-de-datos/tableau/parametros/top-n-dinamico",
        "label": "Top N dinámico",
        "description": "Un parámetro entero permite modificar cuántos miembros conserva un filtro Top."
      },
      {
        "id": "analisis-de-datos/tableau/parametros/parametros-dinamicos",
        "label": "Parámetros dinámicos",
        "description": "Pueden cargar valores permitidos o un valor inicial desde un campo al abrir el workbook."
      },
      {
        "id": "analisis-de-datos/tableau/parametros/escenarios-what-if",
        "label": "Escenarios what-if",
        "description": "Un parámetro permite simular supuestos sin modificar datos reales."
      }
    ]
  },
  {
    "key": "table-calculations",
    "label": "Table calculations",
    "children": [
      {
        "id": "analisis-de-datos/tableau/table-calculations/definicion",
        "label": "Definición",
        "description": "Los cálculos de tabla operan sobre marcas ya agregadas en la vista, como acumulados, rankings o comparaciones."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/compute-using",
        "label": "Compute Using",
        "description": "Determina qué dimensiones se recorren (addressing) y cuáles separan el cálculo en particiones."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/running-sum",
        "label": "RUNNING_SUM",
        "description": "Suma desde el inicio de la partición hasta la marca actual."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/lookup",
        "label": "LOOKUP",
        "description": "Devuelve el valor de una marca a un desplazamiento relativo; -1 consulta la anterior."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/diferencia-y-porcentaje-de-cambio",
        "label": "Diferencia y porcentaje de cambio",
        "description": "Compara el valor actual con otra marca; el cambio porcentual divide por la base de comparación."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/percent-of-total",
        "label": "Percent of Total",
        "description": "Divide cada marca por la suma de la partición."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/rank-y-rank-dense",
        "label": "RANK y RANK_DENSE",
        "description": "Asignan posiciones por valor; RANK deja huecos tras empates, RANK_DENSE no."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/index-first-last-y-size",
        "label": "INDEX, FIRST, LAST y SIZE",
        "description": "INDEX numera marcas, FIRST y LAST dan desplazamientos a extremos y SIZE cuenta marcas de la partición."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/window-sum-y-window-avg",
        "label": "WINDOW_SUM y WINDOW_AVG",
        "description": "Agregan una ventana de marcas con límites relativos opcionales."
      },
      {
        "id": "analisis-de-datos/tableau/table-calculations/filtros-de-table-calculations",
        "label": "Filtros de table calculations",
        "description": "Un filtro basado en cálculo de tabla oculta marcas después de calcular la partición."
      }
    ]
  },
  {
    "key": "lod-expressions",
    "label": "LOD Expressions",
    "children": [
      {
        "id": "analisis-de-datos/tableau/lod-expressions/definicion",
        "label": "Definición",
        "description": "Una expresión de nivel de detalle (LOD) calcula agregados a una granularidad explícita, independiente o relativa a la vista."
      },
      {
        "id": "analisis-de-datos/tableau/lod-expressions/fixed",
        "label": "FIXED",
        "description": "Calcula al nivel de las dimensiones declaradas, sin depender de las dimensiones de la vista."
      },
      {
        "id": "analisis-de-datos/tableau/lod-expressions/include",
        "label": "INCLUDE",
        "description": "Añade dimensiones al nivel de detalle de la vista y permite reagregar el resultado."
      },
      {
        "id": "analisis-de-datos/tableau/lod-expressions/exclude",
        "label": "EXCLUDE",
        "description": "Quita dimensiones del nivel de detalle de la vista."
      },
      {
        "id": "analisis-de-datos/tableau/lod-expressions/lod-y-filtros",
        "label": "LOD y filtros",
        "description": "FIXED se evalúa después de filtros de fuente/contexto y antes de filtros ordinarios de dimensión; INCLUDE y EXCLUDE después de estos últimos."
      },
      {
        "id": "analisis-de-datos/tableau/lod-expressions/elegir-lod-o-table-calculation",
        "label": "Elegir LOD o table calculation",
        "description": "LOD define granularidad de agregación; table calculation opera sobre marcas de una vista concreta."
      }
    ]
  },
  {
    "key": "orden-de-operaciones",
    "label": "Orden de operaciones",
    "children": [
      {
        "id": "analisis-de-datos/tableau/orden-de-operaciones/definicion",
        "label": "Definición",
        "description": "Tableau aplica operaciones en una secuencia definida; mover un filtro a contexto puede cambiar el significado del resultado."
      },
      {
        "id": "analisis-de-datos/tableau/orden-de-operaciones/top-n-frente-a-dimension",
        "label": "Top N frente a dimensión",
        "description": "Top N y filtros ordinarios de dimensión no forman automáticamente un ranking condicionado uno por otro."
      },
      {
        "id": "analisis-de-datos/tableau/orden-de-operaciones/filtro-de-medida-frente-a-dimension",
        "label": "Filtro de medida frente a dimensión",
        "description": "El filtro de dimensión reduce registros o miembros antes del agregado; el de medida selecciona marcas agregadas."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "Una métrica transforma datos en una medida útil para decidir. Define unidad, población, filtros y denominador antes de calcularla."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/beneficio-y-margen",
        "label": "Beneficio y margen",
        "description": "Beneficio resta costos de ingresos; margen divide beneficio entre ventas."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/ticket-y-compradores",
        "label": "Ticket promedio y compradores",
        "description": "Ticket promedio divide ventas por pedidos distintos; compradores se cuentan por identificador único."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/tasa-de-cancelacion",
        "label": "Tasa de cancelación",
        "description": "Divide pedidos cancelados entre pedidos totales, sin duplicar líneas."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/mom-yoy-y-acumulados",
        "label": "MoM, YoY y acumulados",
        "description": "MoM compara meses consecutivos; YoY compara el mismo periodo del año anterior; MTD/QTD/YTD acumulan desde inicio del periodo correspondiente."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/periodos-a-la-fecha",
        "label": "Periodos a la fecha",
        "description": "MTD, QTD y YTD incluyen fechas desde el inicio del mes, trimestre o año hasta una fecha de corte."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/metas-y-variacion",
        "label": "Metas y variación",
        "description": "El cumplimiento compara resultado con objetivo; la desviación absoluta resta el objetivo."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/cohortes",
        "label": "Cohortes",
        "description": "Agrupan entidades por un evento inicial, como su primera compra."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/retencion",
        "label": "Retención",
        "description": "Mide cuántas entidades de una cohorte vuelven en un periodo posterior."
      },
      {
        "id": "analisis-de-datos/tableau/metricas-de-negocio/conversion-y-funnels",
        "label": "Conversión y funnels",
        "description": "Un funnel compara entidades que pasan por etapas definidas, idealmente en orden y con una misma población."
      }
    ]
  },
  {
    "key": "analisis-estadistico",
    "label": "Análisis estadístico",
    "children": [
      {
        "id": "analisis-de-datos/tableau/analisis-estadistico/definicion",
        "label": "Definición",
        "description": "Las herramientas analíticas añaden referencias, modelos y resúmenes de distribución a las vistas."
      },
      {
        "id": "analisis-de-datos/tableau/analisis-estadistico/reference-lines-y-bands",
        "label": "Reference lines y bands",
        "description": "Las líneas muestran valores de referencia; bandas señalan un intervalo."
      },
      {
        "id": "analisis-de-datos/tableau/analisis-estadistico/trend-lines",
        "label": "Trend lines",
        "description": "Ajustan modelos estadísticos a marcas para describir relación entre variables."
      },
      {
        "id": "analisis-de-datos/tableau/analisis-estadistico/forecast",
        "label": "Forecast",
        "description": "Proyecta series temporales mediante modelos de suavizado exponencial."
      },
      {
        "id": "analisis-de-datos/tableau/analisis-estadistico/clustering",
        "label": "Clustering",
        "description": "Agrupa marcas con características numéricas similares mediante un modelo de clustering."
      }
    ]
  },
  {
    "key": "dashboards",
    "label": "Dashboards",
    "children": [
      {
        "id": "analisis-de-datos/tableau/dashboards/definicion",
        "label": "Definición",
        "description": "Un dashboard reúne hojas, controles y objetos para responder preguntas relacionadas en una sola pantalla."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/contenedores-y-layout",
        "label": "Contenedores y layout",
        "description": "Contenedores horizontales y verticales organizan objetos; tiled comparte espacio y floating permite posicionamiento libre."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/size-y-dispositivo",
        "label": "Size y diseño por dispositivo",
        "description": "El tamaño del dashboard puede ser fijo, automático o rango; Device Designer permite variantes según dispositivo."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/filtros-compartidos",
        "label": "Filtros compartidos",
        "description": "Un filtro mostrado en un dashboard puede afectar varias hojas según configuración."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/tooltips-y-viz-in-tooltip",
        "label": "Tooltips y Viz in Tooltip",
        "description": "Tooltip muestra contexto al pasar por una marca; Viz in Tooltip incorpora una hoja filtrada por la marca."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/diseno-y-accesibilidad",
        "label": "Diseño y accesibilidad",
        "description": "Jerarquía visual, contraste, texto legible y codificación redundante ayudan a interpretar dashboards."
      },
      {
        "id": "analisis-de-datos/tableau/dashboards/stories",
        "label": "Stories",
        "description": "Una historia organiza puntos narrativos con hojas o dashboards y explicaciones."
      }
    ]
  },
  {
    "key": "acciones-e-interactividad",
    "label": "Acciones e interactividad",
    "children": [
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/definicion",
        "label": "Definición",
        "description": "Las acciones conectan una selección, hover o menú con cambios en otras vistas o controles."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/filter-actions",
        "label": "Filter actions",
        "description": "Filtran hojas destino según valores de las marcas seleccionadas."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/highlight-actions",
        "label": "Highlight actions",
        "description": "Resaltan marcas relacionadas sin eliminar las demás."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/url-actions",
        "label": "URL actions",
        "description": "Abren un enlace fijo o construido con valores de una marca."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/parameter-actions",
        "label": "Parameter actions",
        "description": "Cambian un parámetro según el valor de una marca seleccionada."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/set-actions",
        "label": "Set actions",
        "description": "Actualizan miembros de un set mediante interacciones."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/navegacion-y-drill-through",
        "label": "Navegación y drill-through",
        "description": "Los botones Navigation o Go to Sheet llevan a una hoja/dashboard de detalle; una filter action puede transmitir contexto."
      },
      {
        "id": "analisis-de-datos/tableau/acciones-e-interactividad/dynamic-zone-visibility",
        "label": "Dynamic Zone Visibility",
        "description": "Permite mostrar u ocultar zonas del dashboard según un parámetro o campo booleano adecuado."
      }
    ]
  },
  {
    "key": "validacion-de-datos",
    "label": "Validación de datos",
    "children": [
      {
        "id": "analisis-de-datos/tableau/validacion-de-datos/definicion",
        "label": "Definición",
        "description": "Validar una vista consiste en comprobar que sus registros, filtros, granularidad y agregados representan la pregunta correctamente."
      },
      {
        "id": "analisis-de-datos/tableau/validacion-de-datos/view-data-y-exportacion",
        "label": "View Data y exportación",
        "description": "View Data permite examinar datos de una marca; exportar una crosstab facilita contrastar cifras."
      },
      {
        "id": "analisis-de-datos/tableau/validacion-de-datos/duplicados-y-claves",
        "label": "Duplicados y claves",
        "description": "Comparar conteo total y distinto ayuda a distinguir duplicados de una granularidad legítima."
      },
      {
        "id": "analisis-de-datos/tableau/validacion-de-datos/contrastar-contra-sql",
        "label": "Contrastar contra SQL",
        "description": "Una consulta externa con la misma población y granularidad permite verificar agregados."
      }
    ]
  },
  {
    "key": "prep-flujos",
    "label": "Tableau Prep: flujos",
    "children": [
      {
        "id": "analisis-de-datos/tableau/prep-flujos/definicion",
        "label": "Definición",
        "description": "Tableau Prep organiza la preparación en un flujo de pasos que se pueden revisar, combinar y ejecutar."
      },
      {
        "id": "analisis-de-datos/tableau/prep-flujos/input-y-profile-pane",
        "label": "Input y Profile pane",
        "description": "Input configura conexión y campos; Profile pane resume valores y distribución de campos."
      },
      {
        "id": "analisis-de-datos/tableau/prep-flujos/steps-y-ramas",
        "label": "Steps y ramas",
        "description": "Un flujo permite dividir la preparación en ramas con pasos diferentes."
      }
    ]
  },
  {
    "key": "prep-limpieza",
    "label": "Tableau Prep: limpieza",
    "children": [
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/definicion",
        "label": "Definición",
        "description": "La limpieza corrige tipos, faltantes, etiquetas y registros repetidos mediante pasos documentados."
      },
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/tipos-renombrar-y-eliminar",
        "label": "Tipos, renombrar y eliminar",
        "description": "Permite corregir tipo y nombres o retirar campos que no se necesitan."
      },
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/nulos-y-filtros",
        "label": "Nulos y filtros",
        "description": "Los filtros conservan o excluyen registros; se pueden tratar nulos con cálculos o selección de valores."
      },
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/group-values",
        "label": "Group Values",
        "description": "Agrupa variantes de texto bajo un valor elegido, manualmente o con opciones de coincidencia."
      },
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/deduplicar",
        "label": "Deduplicar",
        "description": "Deduplicar conserva un registro por clave según un criterio explícito."
      },
      {
        "id": "analisis-de-datos/tableau/prep-limpieza/split-y-calculos",
        "label": "Split y cálculos",
        "description": "Divide texto en columnas o crea campos derivados en Clean Step."
      }
    ]
  },
  {
    "key": "prep-transformacion",
    "label": "Tableau Prep: transformación",
    "children": [
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/definicion",
        "label": "Definición",
        "description": "Los pasos de transformación cambian la forma o granularidad de los datos y combinan fuentes."
      },
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/pivot-columnas-a-filas",
        "label": "Pivot columnas a filas",
        "description": "Convierte varias columnas de una misma medida en filas con nombre y valor."
      },
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/pivot-filas-a-columnas",
        "label": "Pivot filas a columnas",
        "description": "Convierte valores de una dimensión en columnas y agrega valores cuando es necesario."
      },
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/aggregate-step",
        "label": "Aggregate Step",
        "description": "Reduce filas agrupando dimensiones y calculando agregados."
      },
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/join-step",
        "label": "Join Step",
        "description": "Combina columnas de entradas por claves y muestra filas coincidentes y excluidas."
      },
      {
        "id": "analisis-de-datos/tableau/prep-transformacion/union-step",
        "label": "Union Step",
        "description": "Apila entradas con estructura compatible y permite revisar campos no coincidentes."
      }
    ]
  },
  {
    "key": "prep-salida",
    "label": "Tableau Prep: salida",
    "children": [
      {
        "id": "analisis-de-datos/tableau/prep-salida/definicion",
        "label": "Definición",
        "description": "Un Output Step define dónde se guardarán los datos resultantes; ejecutar el flujo genera esa salida."
      },
      {
        "id": "analisis-de-datos/tableau/prep-salida/archivos-de-flujo-y-salida",
        "label": "Archivos de flujo y salida",
        "description": "Los archivos .tfl guardan el flujo, .tflx pueden empaquetar recursos; los resultados se pueden escribir a CSV, Hyper u otros destinos compatibles."
      },
      {
        "id": "analisis-de-datos/tableau/prep-salida/publicar-y-programar-flujos",
        "label": "Publicar y programar flujos",
        "description": "Publicar un flujo en Cloud/Server permite ejecutarlo y, con permisos y capacidad correspondiente, programar tareas."
      }
    ]
  },
  {
    "key": "archivos-y-publicacion",
    "label": "Archivos y publicación",
    "children": [
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/definicion",
        "label": "Definición",
        "description": "Un workbook puede guardarse localmente o publicarse para que otros usuarios lo consulten según permisos."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/twb-twbx-tds-tdsx",
        "label": "TWB, TWBX, TDS y TDSX",
        "description": "TWB guarda definición del workbook; TWBX puede empaquetar recursos locales. TDS describe una fuente y TDSX puede empaquetarla con datos locales."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/tableau-public",
        "label": "Tableau Public",
        "description": "Servicio para publicar visualizaciones públicamente; las opciones de visibilidad no convierten el contenido publicado en privado."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/tableau-cloud-y-server",
        "label": "Tableau Cloud y Server",
        "description": "Cloud es servicio alojado; Server se despliega y administra en infraestructura propia o gestionada."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/fuentes-publicadas",
        "label": "Fuentes publicadas",
        "description": "Una fuente publicada centraliza conexión, modelo y metadatos para reutilizarlos en varios workbooks."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/refresh-programado-y-bridge",
        "label": "Refresh programado y Bridge",
        "description": "Un sitio puede programar refrescos de extract; Bridge permite ciertas conexiones entre Cloud y fuentes en redes privadas."
      },
      {
        "id": "analisis-de-datos/tableau/archivos-y-publicacion/suscripciones-y-alertas",
        "label": "Suscripciones y alertas",
        "description": "Las suscripciones envían vistas programadas; alertas basadas en datos avisan cuando una medida supera una condición compatible."
      }
    ]
  },
  {
    "key": "seguridad-y-gobernanza",
    "label": "Seguridad y gobernanza",
    "children": [
      {
        "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/definicion",
        "label": "Definición",
        "description": "La gobernanza establece quién usa, modifica y valida datos y contenido."
      },
      {
        "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/roles-y-permisos",
        "label": "Roles y permisos",
        "description": "El rol de sitio limita capacidades máximas y los permisos controlan operaciones sobre contenido."
      },
      {
        "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/row-level-security",
        "label": "Row-level security",
        "description": "Restringe qué filas puede consultar cada usuario mediante una política aplicada a los datos."
      },
      {
        "id": "analisis-de-datos/tableau/seguridad-y-gobernanza/certificacion-y-linaje",
        "label": "Certificación y linaje",
        "description": "Una fuente certificada identifica contenido respaldado por responsables; el linaje muestra dependencias si Catalog está habilitado."
      }
    ]
  },
  {
    "key": "rendimiento",
    "label": "Rendimiento",
    "children": [
      {
        "id": "analisis-de-datos/tableau/rendimiento/definicion",
        "label": "Definición",
        "description": "Optimizar implica reducir trabajo innecesario de consulta y renderizado sin alterar la respuesta del análisis."
      },
      {
        "id": "analisis-de-datos/tableau/rendimiento/performance-recorder",
        "label": "Performance Recorder",
        "description": "Registra eventos y tiempos de construcción de vistas y consultas donde están disponibles."
      },
      {
        "id": "analisis-de-datos/tableau/rendimiento/optimizar-modelo-y-filtros",
        "label": "Optimizar modelo y filtros",
        "description": "Granularidad adecuada, menos campos necesarios y filtros selectivos reducen carga potencial; el beneficio depende de la fuente."
      }
    ]
  },
  {
    "key": "integraciones",
    "label": "Integraciones",
    "children": [
      {
        "id": "analisis-de-datos/tableau/integraciones/definicion",
        "label": "Definición",
        "description": "Tableau se integra con servicios y aplicaciones externas para ampliar cálculos, automatización o visualización embebida."
      },
      {
        "id": "analisis-de-datos/tableau/integraciones/python-y-r",
        "label": "Python y R",
        "description": "Las extensiones analíticas permiten enviar datos agregados a servicios externos como TabPy o Rserve mediante funciones SCRIPT_* compatibles."
      },
      {
        "id": "analisis-de-datos/tableau/integraciones/rest-api-y-automatizacion",
        "label": "REST API y automatización",
        "description": "REST API permite gestionar contenido y tareas de un sitio mediante autenticación y permisos."
      },
      {
        "id": "analisis-de-datos/tableau/integraciones/embedded-analytics-y-extensiones",
        "label": "Embedded Analytics y extensiones",
        "description": "Embedding API integra vistas publicadas en una web; extensiones pueden ampliar la funcionalidad de dashboards."
      }
    ]
  }
];
