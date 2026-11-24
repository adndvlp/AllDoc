// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const powerbiCurriculum = [
  {
    "key": "power-bi-y-flujo-de-trabajo",
    "label": "Power BI y flujo de trabajo",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/definicion",
        "label": "Definición",
        "description": "Power BI transforma datos de distintos orígenes en informes interactivos. Desktop sirve para desarrollar modelos e informes; Service permite distribuirlos y gestionarlos."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/vistas-de-desktop",
        "label": "Vistas de Desktop",
        "description": "Las vistas Informe, Tabla y Modelo permiten diseñar visuales, inspeccionar datos y configurar relaciones respectivamente."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/pbix-y-modelo-semantico",
        "label": "PBIX y modelo semántico",
        "description": "PBIX es el archivo habitual de Desktop. El modelo semántico contiene tablas, relaciones, medidas y metadatos que pueden reutilizar los informes."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/import-directquery-y-direct-lake",
        "label": "Import, DirectQuery y Direct Lake",
        "description": "Import copia datos al modelo; DirectQuery consulta un origen compatible al interactuar; Direct Lake usa tablas Delta de OneLake con los requisitos de Fabric."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-y-flujo-de-trabajo/conexion-a-modelo-compartido",
        "label": "Conexión a modelo compartido",
        "description": "Un informe puede reutilizar un modelo semántico publicado en lugar de importar de nuevo sus tablas."
      }
    ]
  },
  {
    "key": "conexiones-y-carga",
    "label": "Conexiones y carga",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/definicion",
        "label": "Definición",
        "description": "Obtener datos abre conectores; Transformar datos permite preparar los datos antes de cargarlos."
      },
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/excel-y-csv",
        "label": "Excel y CSV",
        "description": "Excel permite seleccionar hojas o tablas; CSV requiere interpretar delimitador, codificación y encabezados."
      },
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/bases-de-datos",
        "label": "Bases de datos",
        "description": "Los conectores SQL Server, PostgreSQL y MySQL solicitan servidor, base y autenticación. El soporte de modos depende del conector."
      },
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/carpetas-y-combinar-archivos",
        "label": "Carpetas y combinar archivos",
        "description": "El conector Folder reúne archivos con estructura compatible y aplica una transformación común."
      },
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/web-json-y-api",
        "label": "Web, JSON y API",
        "description": "El conector Web obtiene recursos HTTP; Power Query puede convertir listas y registros JSON en tablas."
      },
      {
        "id": "analisis-de-datos/powerbi/conexiones-y-carga/credenciales-y-privacidad",
        "label": "Credenciales y privacidad",
        "description": "La configuración del origen gestiona autenticación y niveles de privacidad que controlan combinación de datos."
      }
    ]
  },
  {
    "key": "editor-de-power-query",
    "label": "Editor de Power Query",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/definicion",
        "label": "Definición",
        "description": "Power Query registra transformaciones como pasos de una consulta M que se repiten al actualizar."
      },
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/tipos-y-configuracion-regional",
        "label": "Tipos y configuración regional",
        "description": "Los tipos controlan cómo se interpretan y calculan los datos; la configuración regional define separadores y formatos de entrada."
      },
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/promover-encabezados",
        "label": "Promover encabezados",
        "description": "Convierte la primera fila en nombres de columnas cuando el origen no los reconoce."
      },
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/seleccionar-y-eliminar-columnas",
        "label": "Seleccionar y eliminar columnas",
        "description": "Conserva solo campos necesarios para evitar ruido y reducir tamaño del modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/filtrar-ordenar-y-conservar-filas",
        "label": "Filtrar, ordenar y conservar filas",
        "description": "Los filtros excluyen registros; ordenar cambia la vista previa y operaciones dependientes de posición."
      },
      {
        "id": "analisis-de-datos/powerbi/editor-de-power-query/indice-de-filas",
        "label": "Índice de filas",
        "description": "Agrega una numeración a partir de 0 o 1; depende del orden previo de la consulta."
      }
    ]
  },
  {
    "key": "calidad-y-limpieza",
    "label": "Calidad y limpieza",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/definicion",
        "label": "Definición",
        "description": "La limpieza corrige datos inconsistentes antes de usarlos en medidas o relaciones. El perfilado permite detectarlos."
      },
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/nulos-y-reemplazo-de-valores",
        "label": "Nulos y reemplazo de valores",
        "description": "Un nulo representa ausencia; reemplazarlo es una decisión de negocio, no equivalente automático a cero."
      },
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/duplicados",
        "label": "Duplicados",
        "description": "Quitar duplicados conserva una fila por combinación de columnas elegidas. La selección de qué fila conservar puede no estar garantizada."
      },
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/errores-de-conversion",
        "label": "Errores de conversión",
        "description": "Una conversión incompatible genera Error; se puede conservar, quitar o reemplazar tras revisar su causa."
      },
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/trim-clean-y-mayusculas",
        "label": "Trim, Clean y mayúsculas",
        "description": "Trim recorta espacios extremos; Clean elimina caracteres de control; cambiar mayúsculas normaliza texto."
      },
      {
        "id": "analisis-de-datos/powerbi/calidad-y-limpieza/fill-down-y-fill-up",
        "label": "Fill Down y Fill Up",
        "description": "Rellenar hacia abajo o arriba copia el valor no nulo más cercano en la dirección elegida."
      }
    ]
  },
  {
    "key": "transformar-columnas",
    "label": "Transformar columnas",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/definicion",
        "label": "Definición",
        "description": "Power Query puede derivar columnas o cambiar las existentes antes de construir el modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/dividir-y-combinar-columnas",
        "label": "Dividir y combinar columnas",
        "description": "Dividir usa delimitadores o posiciones; combinar concatena valores con un separador."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/extraer-texto-y-reemplazar",
        "label": "Extraer texto y reemplazar",
        "description": "Extraer una parte o sustituir fragmentos permite estandarizar campos sin cambiar filas."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/columna-condicional",
        "label": "Columna condicional",
        "description": "Evalúa reglas en orden para asignar una categoría por fila."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/columna-personalizada",
        "label": "Columna personalizada",
        "description": "Usa una expresión M para calcular un valor por fila."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/columna-a-partir-de-ejemplos",
        "label": "Columna a partir de ejemplos",
        "description": "Power Query infiere una transformación a partir de resultados introducidos manualmente."
      },
      {
        "id": "analisis-de-datos/powerbi/transformar-columnas/fechas-en-power-query",
        "label": "Fechas en Power Query",
        "description": "Las transformaciones de fecha extraen componentes o calculan duraciones antes de cargar."
      }
    ]
  },
  {
    "key": "agrupar-y-cambiar-forma",
    "label": "Agrupar y cambiar forma",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/definicion",
        "label": "Definición",
        "description": "Power Query resume filas o reorganiza columnas. Estas operaciones cambian la granularidad de la consulta."
      },
      {
        "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/group-by",
        "label": "Group By",
        "description": "Agrupa por claves y calcula agregados como suma, recuento, promedio o todas las filas."
      },
      {
        "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/unpivot",
        "label": "Unpivot",
        "description": "Convierte encabezados de columnas en valores de una columna de atributos y sus celdas en otra columna."
      },
      {
        "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/pivot",
        "label": "Pivot",
        "description": "Convierte los valores de una columna en encabezados. Si hay varias filas por celda, requiere una agregación."
      },
      {
        "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/transpose",
        "label": "Transpose",
        "description": "Intercambia filas y columnas; no equivale a pivotar por una clave."
      }
    ]
  },
  {
    "key": "combinar-consultas",
    "label": "Combinar consultas",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/combinar-consultas/definicion",
        "label": "Definición",
        "description": "Merge une columnas mediante claves; Append apila filas alineando nombres de columnas."
      },
      {
        "id": "analisis-de-datos/powerbi/combinar-consultas/merge-y-tipos-de-union",
        "label": "Merge y tipos de unión",
        "description": "Left outer conserva izquierda; inner solo coincidencias; right/full outer y anti-joins cubren otros casos."
      },
      {
        "id": "analisis-de-datos/powerbi/combinar-consultas/expandir-tablas-y-registros",
        "label": "Expandir tablas y registros",
        "description": "Merge produce una columna de tablas anidadas que se expande para incorporar campos."
      },
      {
        "id": "analisis-de-datos/powerbi/combinar-consultas/append",
        "label": "Append",
        "description": "Combina filas por nombre de columna y rellena con null los campos ausentes."
      },
      {
        "id": "analisis-de-datos/powerbi/combinar-consultas/fuzzy-merge",
        "label": "Fuzzy Merge",
        "description": "Busca coincidencias aproximadas entre columnas de texto; usa umbral configurable y revisión humana."
      }
    ]
  },
  {
    "key": "organizacion-y-parametros-de-consultas",
    "label": "Organización y parámetros de consultas",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/definicion",
        "label": "Definición",
        "description": "Las consultas pueden reutilizar pasos, aceptar parámetros y preparar tablas auxiliares sin cargarlas."
      },
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/reference-y-duplicate",
        "label": "Reference y Duplicate",
        "description": "Reference parte del resultado de otra consulta; Duplicate copia sus pasos existentes."
      },
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/parametros",
        "label": "Parámetros",
        "description": "Un parámetro es un valor configurable que una consulta puede consumir."
      },
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/habilitar-carga-y-dependencias",
        "label": "Habilitar carga y dependencias",
        "description": "Desactivar carga evita crear una tabla de modelo, pero no impide que otras consultas usen ese resultado."
      },
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/query-folding",
        "label": "Query Folding",
        "description": "Intenta traducir transformaciones al lenguaje del origen, reduciendo trabajo local. Puede ser total, parcial o inexistente."
      },
      {
        "id": "analisis-de-datos/powerbi/organizacion-y-parametros-de-consultas/query-diagnostics",
        "label": "Query Diagnostics",
        "description": "Registra actividad y tiempos de evaluación de Power Query para investigar cuellos de botella."
      }
    ]
  },
  {
    "key": "lenguaje-m",
    "label": "Lenguaje M",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/definicion",
        "label": "Definición",
        "description": "M expresa los pasos de Power Query mediante valores, funciones y expresiones `let…in`. Se evalúa durante preparación y actualización."
      },
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/let-in-y-pasos",
        "label": "let, in y pasos",
        "description": "`let` nombra expresiones; `in` define el resultado devuelto. Los nombres con espacios se escriben `#\"Nombre\"`."
      },
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/listas-registros-y-tablas",
        "label": "Listas, registros y tablas",
        "description": "M usa listas `{}`, registros `[]` y tablas de filas y columnas."
      },
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/each-y-funciones-personalizadas",
        "label": "each y funciones personalizadas",
        "description": "`each` abrevia una función de un argumento; una función explícita usa `(x) => expresión`."
      },
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/try-otherwise",
        "label": "try otherwise",
        "description": "Captura un error de evaluación y devuelve una alternativa definida."
      },
      {
        "id": "analisis-de-datos/powerbi/lenguaje-m/funciones-table-text-number-date",
        "label": "Funciones Table, Text, Number, Date",
        "description": "Las bibliotecas de M agrupan funciones según el tipo de valor."
      }
    ]
  },
  {
    "key": "modelo-dimensional",
    "label": "Modelo dimensional",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/definicion",
        "label": "Definición",
        "description": "Un modelo estrella separa dimensiones descriptivas de hechos medibles y los conecta mediante claves."
      },
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/granularidad-y-claves",
        "label": "Granularidad y claves",
        "description": "La granularidad dice qué representa una fila. Una clave identifica una fila o su dimensión relacionada."
      },
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/dimensiones-y-hechos",
        "label": "Dimensiones y hechos",
        "description": "Las dimensiones describen entidades y los hechos registran eventos o mediciones."
      },
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/propiedades-del-modelo",
        "label": "Propiedades del modelo",
        "description": "Ocultar claves, fijar formatos, categorías de datos y resumen predeterminado facilita el autoservicio."
      },
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/jerarquias-y-ordenar-por-columna",
        "label": "Jerarquías y ordenar por columna",
        "description": "Una jerarquía agrupa niveles; Ordenar por columna establece el orden lógico de etiquetas."
      },
      {
        "id": "analisis-de-datos/powerbi/modelo-dimensional/normalizacion-y-dimensiones-historicas",
        "label": "Normalización y dimensiones históricas",
        "description": "Una dimensión puede guardar solo el valor actual (SCD tipo 1) o versiones históricas (tipo 2) con clave sustituta y vigencia."
      }
    ]
  },
  {
    "key": "relaciones",
    "label": "Relaciones",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/relaciones/definicion",
        "label": "Definición",
        "description": "Las relaciones permiten propagar filtros entre tablas a partir de columnas compatibles. No materializan una tabla unida como Merge."
      },
      {
        "id": "analisis-de-datos/powerbi/relaciones/cardinalidad-1-1-y-1",
        "label": "Cardinalidad 1:1 y 1:*",
        "description": "1:* exige unicidad en el lado 1; 1:1 exige unicidad en ambos lados."
      },
      {
        "id": "analisis-de-datos/powerbi/relaciones/direccion-de-filtro",
        "label": "Dirección de filtro",
        "description": "Single propaga normalmente desde dimensión a hechos; Both permite ambos sentidos y puede crear ambigüedad."
      },
      {
        "id": "analisis-de-datos/powerbi/relaciones/relaciones-activas-e-inactivas",
        "label": "Relaciones activas e inactivas",
        "description": "La activa se usa por defecto; una inactiva puede utilizarse en una medida con USERELATIONSHIP."
      },
      {
        "id": "analisis-de-datos/powerbi/relaciones/role-playing-dimensions",
        "label": "Role-playing dimensions",
        "description": "Una dimensión con varios roles puede duplicarse como tablas separadas para filtrar cada rol independientemente."
      },
      {
        "id": "analisis-de-datos/powerbi/relaciones/muchos-a-muchos-y-tablas-puente",
        "label": "Muchos a muchos y tablas puente",
        "description": "Una tabla puente representa asociaciones entre entidades cuando una clave puede tener varios vínculos; controla filtros y duplicaciones."
      }
    ]
  },
  {
    "key": "calendario",
    "label": "Calendario",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/calendario/definicion",
        "label": "Definición",
        "description": "Una tabla de fechas continua y sin duplicados permite agrupar periodos y hacer inteligencia temporal."
      },
      {
        "id": "analisis-de-datos/powerbi/calendario/ano-mes-y-orden-cronologico",
        "label": "Año, mes y orden cronológico",
        "description": "Deriva atributos de la fecha y un orden numérico para etiquetas de mes."
      },
      {
        "id": "analisis-de-datos/powerbi/calendario/marcar-tabla-de-fechas",
        "label": "Marcar tabla de fechas",
        "description": "Identifica la columna de fecha única, continua y sin blancos para inteligencia temporal clásica."
      },
      {
        "id": "analisis-de-datos/powerbi/calendario/calendario-fiscal",
        "label": "Calendario fiscal",
        "description": "El año fiscal puede comenzar en un mes distinto de enero; crea atributos específicos sin alterar la fecha original."
      }
    ]
  },
  {
    "key": "calculos-en-el-modelo",
    "label": "Cálculos en el modelo",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/definicion",
        "label": "Definición",
        "description": "DAX permite crear medidas, columnas y tablas calculadas. El tipo de cálculo determina cuándo se evalúa y qué devuelve."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/medidas-explicitas-e-implicitas",
        "label": "Medidas explícitas e implícitas",
        "description": "Una medida explícita tiene fórmula y nombre; una implícita resume una columna directamente en un visual."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/columnas-calculadas",
        "label": "Columnas calculadas",
        "description": "Una columna DAX evalúa una expresión por fila y en Import almacena el resultado en el modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/tablas-calculadas",
        "label": "Tablas calculadas",
        "description": "Una tabla DAX devuelve filas y columnas derivadas del modelo; no se recalcula con cada segmentador."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/dax-frente-a-power-query",
        "label": "DAX frente a Power Query",
        "description": "M transforma datos antes de cargar; DAX calcula en el modelo y puede aprovechar su contexto y relaciones."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/sintaxis-y-variables-var-return",
        "label": "Sintaxis y variables VAR / RETURN",
        "description": "Una variable guarda un resultado dentro de una expresión y RETURN indica el valor final."
      },
      {
        "id": "analisis-de-datos/powerbi/calculos-en-el-modelo/quick-measures",
        "label": "Quick Measures",
        "description": "Las medidas rápidas generan fórmulas DAX a partir de una plantilla y campos seleccionados."
      }
    ]
  },
  {
    "key": "agregaciones-dax",
    "label": "Agregaciones DAX",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/definicion",
        "label": "Definición",
        "description": "Las agregaciones condensan un conjunto de filas en un valor que responde al contexto de filtro."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/sum-y-average",
        "label": "SUM y AVERAGE",
        "description": "SUM suma valores de una columna; AVERAGE calcula su media excluyendo blancos."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/min-y-max",
        "label": "MIN y MAX",
        "description": "Devuelven el extremo inferior o superior de una columna en el contexto actual."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/count-counta-y-countrows",
        "label": "COUNT, COUNTA y COUNTROWS",
        "description": "COUNT cuenta valores no blancos de tipos admitidos; COUNTA cuenta valores no blancos incluyendo booleanos; COUNTROWS cuenta filas de una tabla."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/distinctcount-y-distinctcountnoblank",
        "label": "DISTINCTCOUNT y DISTINCTCOUNTNOBLANK",
        "description": "DISTINCTCOUNT cuenta valores diferentes incluyendo BLANK; DISTINCTCOUNTNOBLANK excluye el blanco."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/distinct-y-values",
        "label": "DISTINCT y VALUES",
        "description": "Ambas devuelven valores únicos de una columna; VALUES puede añadir el miembro en blanco por integridad referencial en relaciones."
      },
      {
        "id": "analisis-de-datos/powerbi/agregaciones-dax/median-desviacion-y-percentiles",
        "label": "MEDIAN, desviación y percentiles",
        "description": "MEDIAN devuelve el valor central; STDEV.P mide dispersión poblacional; PERCENTILE.INC calcula un percentil interpolado inclusivo."
      }
    ]
  },
  {
    "key": "contexto-de-evaluacion",
    "label": "Contexto de evaluación",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/definicion",
        "label": "Definición",
        "description": "El contexto de fila identifica una fila actual; el de filtro restringe las filas visibles para el cálculo."
      },
      {
        "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/row-context",
        "label": "Row context",
        "description": "Una columna calculada o un iterador dispone de los valores de la fila que evalúa."
      },
      {
        "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/filter-context",
        "label": "Filter context",
        "description": "Filtros de visual, segmentadores, relaciones y fórmulas delimitan las filas para una medida."
      },
      {
        "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/context-transition",
        "label": "Context transition",
        "description": "CALCULATE sin filtros convierte el contexto de fila activo en contexto de filtro; una llamada a una medida dentro de un contexto de fila realiza transición automáticamente."
      },
      {
        "id": "analisis-de-datos/powerbi/contexto-de-evaluacion/totales-y-contexto",
        "label": "Totales y contexto",
        "description": "El total de una medida se recalcula con el contexto del total; no siempre suma los valores visibles."
      }
    ]
  },
  {
    "key": "operadores-condiciones-y-blancos",
    "label": "Operadores, condiciones y blancos",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/definicion",
        "label": "Definición",
        "description": "DAX incluye comparaciones, lógica y funciones condicionales para calcular o clasificar resultados."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/and-or-not-e-in",
        "label": "AND, OR, NOT e IN",
        "description": "`&&` combina condiciones, `OR` o el operador de disyunción de dos barras verticales permiten alternativas, `NOT` niega y `IN` compara contra un conjunto."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/if-y-switch",
        "label": "IF y SWITCH",
        "description": "IF elige dos ramas; SWITCH compara valores o condiciones ordenadas mediante SWITCH(TRUE(),…)."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/blank-isblank-y-coalesce",
        "label": "BLANK, ISBLANK y COALESCE",
        "description": "BLANK representa ausencia en DAX; ISBLANK la detecta; COALESCE toma el primer valor no blanco."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/divide",
        "label": "DIVIDE",
        "description": "Divide y devuelve BLANK o una alternativa constante si el denominador es cero o blanco."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/round-abs-y-formato",
        "label": "ROUND, ABS y formato",
        "description": "ROUND cambia el valor numérico; ABS devuelve magnitud sin signo; el formato visual modifica presentación sin redondear el cálculo subyacente."
      },
      {
        "id": "analisis-de-datos/powerbi/operadores-condiciones-y-blancos/funciones-de-texto-y-conversion",
        "label": "Funciones de texto y conversión",
        "description": "DAX incluye LEFT, RIGHT, MID, LEN, TRIM, UPPER, LOWER, SUBSTITUTE, VALUE y FORMAT para manipular texto y convertir valores."
      }
    ]
  },
  {
    "key": "iteradores-dax",
    "label": "Iteradores DAX",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/iteradores-dax/definicion",
        "label": "Definición",
        "description": "Las funciones terminadas en X evalúan una expresión por cada fila de una tabla y agregan los resultados."
      },
      {
        "id": "analisis-de-datos/powerbi/iteradores-dax/sumx",
        "label": "SUMX",
        "description": "Evalúa una expresión numérica por fila y suma resultados."
      },
      {
        "id": "analisis-de-datos/powerbi/iteradores-dax/averagex",
        "label": "AVERAGEX",
        "description": "Promedia los valores de una expresión evaluada por fila."
      },
      {
        "id": "analisis-de-datos/powerbi/iteradores-dax/minx-maxx-y-countx",
        "label": "MINX, MAXX y COUNTX",
        "description": "Calculan extremos o recuento de valores evaluados en una expresión de fila."
      }
    ]
  },
  {
    "key": "calculate-y-filtros",
    "label": "CALCULATE y filtros",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/calculate-y-filtros/definicion",
        "label": "Definición",
        "description": "CALCULATE evalúa una expresión en un contexto de filtro modificado. CALCULATETABLE hace lo mismo para una expresión que devuelve una tabla."
      },
      {
        "id": "analisis-de-datos/powerbi/calculate-y-filtros/calculate-con-varias-condiciones",
        "label": "CALCULATE con varias condiciones",
        "description": "Los argumentos de filtro se combinan para restringir el cálculo; un filtro sobre la misma columna puede reemplazar el previo."
      },
      {
        "id": "analisis-de-datos/powerbi/calculate-y-filtros/calculatetable",
        "label": "CALCULATETABLE",
        "description": "Modifica contexto al devolver una tabla, no una cifra."
      },
      {
        "id": "analisis-de-datos/powerbi/calculate-y-filtros/filter",
        "label": "FILTER",
        "description": "Devuelve filas de una tabla que cumplen una expresión evaluada fila a fila."
      },
      {
        "id": "analisis-de-datos/powerbi/calculate-y-filtros/keepfilters",
        "label": "KEEPFILTERS",
        "description": "Hace que un filtro de CALCULATE se intersecte con el filtro existente en lugar de sustituirlo sobre la misma columna."
      }
    ]
  },
  {
    "key": "modificar-el-contexto-de-filtro",
    "label": "Modificar el contexto de filtro",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/definicion",
        "label": "Definición",
        "description": "Las funciones de contexto permiten quitar o preservar filtros para obtener totales, porcentajes y comparaciones."
      },
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/removefilters-y-all",
        "label": "REMOVEFILTERS y ALL",
        "description": "REMOVEFILTERS quita filtros; ALL también puede devolver una tabla de valores o filas para otras funciones."
      },
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/allexcept",
        "label": "ALLEXCEPT",
        "description": "Quita filtros de una tabla excepto los aplicados a columnas especificadas."
      },
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/allselected",
        "label": "ALLSELECTED",
        "description": "Recupera el contexto de selección externa y permite calcular totales visuales preservando filtros externos relevantes."
      },
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/selectedvalue-y-hasonevalue",
        "label": "SELECTEDVALUE y HASONEVALUE",
        "description": "SELECTEDVALUE devuelve el valor único visible o una alternativa; HASONEVALUE comprueba si hay exactamente uno."
      },
      {
        "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/isfiltered-e-isinscope",
        "label": "ISFILTERED e ISINSCOPE",
        "description": "ISFILTERED detecta filtro directo; ISINSCOPE detecta si una columna es un nivel de agrupación activo en una jerarquía visual."
      }
    ]
  },
  {
    "key": "funciones-de-relaciones-dax",
    "label": "Funciones de relaciones DAX",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/definicion",
        "label": "Definición",
        "description": "DAX puede recuperar atributos de dimensiones o modificar relaciones para un cálculo sin cambiar permanentemente el modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/related-y-relatedtable",
        "label": "RELATED y RELATEDTABLE",
        "description": "RELATED recupera un valor del lado uno en contexto de fila; RELATEDTABLE devuelve las filas relacionadas de otra tabla."
      },
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/userelationship",
        "label": "USERELATIONSHIP",
        "description": "Activa una relación existente para el cálculo actual, normalmente una relación inactiva."
      },
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/crossfilter",
        "label": "CROSSFILTER",
        "description": "Cambia temporalmente la dirección de filtro de una relación existente para una medida."
      },
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/lookupvalue",
        "label": "LOOKUPVALUE",
        "description": "Busca un resultado por coincidencia de una o varias condiciones, sin requerir necesariamente una relación física."
      },
      {
        "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/treatas",
        "label": "TREATAS",
        "description": "Aplica valores de una expresión de tabla como filtros a columnas de otra tabla, incluso sin relación física."
      }
    ]
  },
  {
    "key": "tablas-virtuales-y-consultas-dax",
    "label": "Tablas virtuales y consultas DAX",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/definicion",
        "label": "Definición",
        "description": "Una expresión tabular puede ser entrada de otra función o una tabla calculada. DAX Query View permite ejecutar consultas con EVALUATE."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/summarize-y-summarizecolumns",
        "label": "SUMMARIZE y SUMMARIZECOLUMNS",
        "description": "Agrupan filas por columnas; SUMMARIZECOLUMNS se usa a menudo para consultas y resúmenes con medidas."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/addcolumns-y-selectcolumns",
        "label": "ADDCOLUMNS y SELECTCOLUMNS",
        "description": "ADDCOLUMNS añade expresiones a una tabla; SELECTCOLUMNS proyecta y renombra campos partiendo de sus filas."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/topn",
        "label": "TOPN",
        "description": "Devuelve las primeras N filas por criterios de orden; puede incluir más de N si hay empate en el límite."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/generateseries-y-parametros-numericos",
        "label": "GENERATESERIES y parámetros numéricos",
        "description": "GENERATESERIES genera una tabla de números; un parámetro de hipótesis permite seleccionar valores en un segmentador."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/contains",
        "label": "CONTAINS",
        "description": "Comprueba si una tabla contiene una fila con determinadas combinaciones de columna y valor."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/union-intersect-y-except",
        "label": "UNION, INTERSECT y EXCEPT",
        "description": "Combinan tablas, obtienen coincidencias o restan filas entre tablas con columnas compatibles. UNION conserva duplicados."
      }
    ]
  },
  {
    "key": "rankings-y-comparaciones",
    "label": "Rankings y comparaciones",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/definicion",
        "label": "Definición",
        "description": "Un ranking asigna posiciones según una métrica dentro de un conjunto de entidades."
      },
      {
        "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/rankx-y-empates",
        "label": "RANKX y empates",
        "description": "RANKX evalúa una expresión para cada fila de una tabla y asigna posición. DENSE no deja huecos; SKIP deja huecos al empatar."
      },
      {
        "id": "analisis-de-datos/powerbi/rankings-y-comparaciones/top-n-visual-vs-ranking",
        "label": "Top N visual vs ranking",
        "description": "El filtro Top N limita categorías visibles por una medida; un ranking es un cálculo que se puede mostrar o usar en otras métricas."
      }
    ]
  },
  {
    "key": "inteligencia-temporal",
    "label": "Inteligencia temporal",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/definicion",
        "label": "Definición",
        "description": "DAX puede recalcular medidas para periodos anteriores, acumulados o ventanas temporales usando el calendario común."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/year-month-today-y-datediff",
        "label": "YEAR, MONTH, TODAY y DATEDIFF",
        "description": "Extraen componentes de fecha, devuelven la fecha actual o cuentan límites de un intervalo entre fechas."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/dateadd-y-sameperiodlastyear",
        "label": "DATEADD y SAMEPERIODLASTYEAR",
        "description": "Desplazan el conjunto de fechas actual por un intervalo o un año para recalcular una medida."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/totalytd-datesytd-qtd-y-mtd",
        "label": "TOTALYTD, DATESYTD, QTD y MTD",
        "description": "Calculan acumulados desde el inicio del año, trimestre o mes hasta la fecha del contexto."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/datesinperiod",
        "label": "DATESINPERIOD",
        "description": "Devuelve fechas de una ventana relativa a una fecha de referencia."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/crecimiento-mensual-e-interanual",
        "label": "Crecimiento mensual e interanual",
        "description": "Compara una métrica con un periodo de referencia y divide su diferencia por ese periodo."
      },
      {
        "id": "analisis-de-datos/powerbi/inteligencia-temporal/acumulado-sin-reinicio-anual",
        "label": "Acumulado sin reinicio anual",
        "description": "Retira el filtro de fechas y conserva solo fechas anteriores o iguales al límite actual."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "Un KPI debe indicar población, periodo, unidad y fórmula; las medidas permiten reproducirlo y verificarlo."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/revenue-coste-y-margen",
        "label": "Revenue, coste y margen",
        "description": "Revenue es ingreso; margen bruto resta coste de ventas y margen porcentual divide por revenue."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/ticket-promedio-y-clientes-unicos",
        "label": "Ticket promedio y clientes únicos",
        "description": "Ticket divide ingresos por pedidos, no por líneas; compradores únicos cuentan clientes que cumplen el criterio."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/objetivos-y-variacion",
        "label": "Objetivos y variación",
        "description": "Compara resultados con una meta en el mismo grano y periodo."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/retencion-y-cohortes",
        "label": "Retención y cohortes",
        "description": "Una cohorte agrupa entidades por un evento inicial; retención mide cuántas vuelven en un periodo posterior."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/conciliacion-y-calidad-de-kpis",
        "label": "Conciliación y calidad de KPIs",
        "description": "Contrasta totales con el origen y verifica filtros, relaciones, duplicados y granularidad."
      },
      {
        "id": "analisis-de-datos/powerbi/metricas-de-negocio/medidas-aditivas-y-semiaditivas",
        "label": "Medidas aditivas y semiaditivas",
        "description": "Una medida aditiva puede sumarse entre dimensiones; una semiaditiva no debe sumarse en algún eje, por ejemplo saldos a través del tiempo."
      }
    ]
  },
  {
    "key": "calculation-groups-y-calculos-visuales",
    "label": "Calculation Groups y cálculos visuales",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/definicion",
        "label": "Definición",
        "description": "Los grupos de cálculo reutilizan transformaciones sobre medidas; los cálculos visuales operan sobre la estructura de un visual."
      },
      {
        "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/calculation-groups",
        "label": "Calculation Groups",
        "description": "Un grupo contiene elementos de cálculo que transforman la medida seleccionada usando SELECTEDMEASURE."
      },
      {
        "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/formatos-dinamicos",
        "label": "Formatos dinámicos",
        "description": "Una expresión de formato dinámico cambia cómo se representa una medida sin convertir el valor a texto."
      },
      {
        "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/visual-calculations",
        "label": "Visual Calculations",
        "description": "Evalúan expresiones DAX en las filas y columnas del visual, no en toda la tabla original."
      }
    ]
  },
  {
    "key": "diseno-de-informes",
    "label": "Diseño de informes",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/diseno-de-informes/definicion",
        "label": "Definición",
        "description": "Un informe presenta páginas interactivas conectadas al modelo semántico. Cada visual responde a una pregunta específica."
      },
      {
        "id": "analisis-de-datos/powerbi/diseno-de-informes/campos-y-agregacion-de-visuales",
        "label": "Campos y agregación de visuales",
        "description": "Cada visual tiene zonas de campos, como eje, valores, leyenda y tooltips; la agregación depende del campo asignado."
      },
      {
        "id": "analisis-de-datos/powerbi/diseno-de-informes/formato-y-temas",
        "label": "Formato y temas",
        "description": "El formato controla etiquetas, colores y tamaños del visual; un tema unifica estilos entre visuales."
      },
      {
        "id": "analisis-de-datos/powerbi/diseno-de-informes/diseno-de-pagina-y-storytelling",
        "label": "Diseño de página y storytelling",
        "description": "Organiza indicadores, tendencias, causas y detalles según el recorrido de lectura del usuario."
      },
      {
        "id": "analisis-de-datos/powerbi/diseno-de-informes/accesibilidad",
        "label": "Accesibilidad",
        "description": "Contraste, texto alternativo, orden de tabulación y etiquetas comprensibles ayudan a usar el informe sin depender de color o ratón."
      }
    ]
  },
  {
    "key": "visuales-basicos",
    "label": "Visuales básicos",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/definicion",
        "label": "Definición",
        "description": "Los gráficos comparan magnitudes, tendencias y proporciones. La elección depende del tipo de pregunta."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/barras-y-columnas",
        "label": "Barras y columnas",
        "description": "Barras horizontales facilitan nombres largos; columnas verticales comparan categorías o periodos discretos."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/lineas-y-areas",
        "label": "Líneas y áreas",
        "description": "La línea muestra tendencia temporal; área enfatiza magnitud bajo la curva y sus variantes apiladas muestran composición."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/apilados-y-100-apilados",
        "label": "Apilados y 100% apilados",
        "description": "Los apilados muestran composición y total; 100% apilados normalizan cada barra a una proporción."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/pie-y-donut",
        "label": "Pie y donut",
        "description": "Representan partes de un total no negativo con pocas categorías."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-basicos/grafico-combinado",
        "label": "Gráfico combinado",
        "description": "Muestra dos series, por ejemplo columnas de valores y línea de referencia."
      }
    ]
  },
  {
    "key": "tablas-matrices-e-indicadores",
    "label": "Tablas, matrices e indicadores",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/definicion",
        "label": "Definición",
        "description": "Tablas muestran registros; matrices agrupan filas y columnas con subtotales; indicadores condensan métricas."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/table-y-matrix",
        "label": "Table y Matrix",
        "description": "Table muestra campos en columnas; Matrix permite ejes de filas/columnas, jerarquías y subtotales."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/card",
        "label": "Card",
        "description": "Una tarjeta presenta una o varias métricas resumidas con formato destacado."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/kpi-y-gauge",
        "label": "KPI y Gauge",
        "description": "KPI muestra indicador con tendencia y objetivo; Gauge sitúa un valor dentro de un intervalo."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/formato-condicional",
        "label": "Formato condicional",
        "description": "Cambia color, icono, barra de datos o formato según valor o medida."
      },
      {
        "id": "analisis-de-datos/powerbi/tablas-matrices-e-indicadores/kpi-con-tendencia-temporal",
        "label": "KPI con tendencia temporal",
        "description": "El visual KPI evalúa un indicador al último punto del eje temporal y lo compara con una meta."
      }
    ]
  },
  {
    "key": "visuales-analiticos",
    "label": "Visuales analíticos",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/definicion",
        "label": "Definición",
        "description": "Los visuales especializados exploran relaciones, contribuciones, causas potenciales y ubicación."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/scatter-y-burbujas",
        "label": "Scatter y burbujas",
        "description": "Dispersión representa dos variables numéricas y puede usar tamaño como tercera magnitud."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/waterfall",
        "label": "Waterfall",
        "description": "Muestra cómo contribuciones positivas o negativas modifican un total acumulado."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/mapas-y-azure-maps",
        "label": "Mapas y Azure Maps",
        "description": "Los visuales geográficos sitúan entidades mediante coordenadas o ubicaciones geocodificadas."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/key-influencers-y-decomposition-tree",
        "label": "Key Influencers y Decomposition Tree",
        "description": "Key Influencers explora asociaciones estadísticas; Decomposition Tree desglosa medidas por dimensiones elegidas."
      },
      {
        "id": "analisis-de-datos/powerbi/visuales-analiticos/small-multiples",
        "label": "Small multiples",
        "description": "Repite el mismo gráfico para cada valor de una dimensión con ejes comparables."
      }
    ]
  },
  {
    "key": "filtros-y-segmentadores",
    "label": "Filtros y segmentadores",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/definicion",
        "label": "Definición",
        "description": "Los filtros delimitan datos de un visual, página o informe; los slicers permiten al usuario elegir valores."
      },
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/filtro-de-visual-pagina-e-informe",
        "label": "Filtro de visual, página e informe",
        "description": "Los tres niveles aplican el filtro al ámbito correspondiente; pueden combinarse con segmentadores."
      },
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/slicers-de-texto-fecha-y-rango",
        "label": "Slicers de texto, fecha y rango",
        "description": "Los segmentadores permiten seleccionar elementos, intervalos o fechas relativas según tipo de campo."
      },
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/sincronizar-slicers",
        "label": "Sincronizar slicers",
        "description": "Sync slicers comparte una selección entre páginas, aunque el control no sea visible en todas."
      },
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/interacciones-entre-visuales",
        "label": "Interacciones entre visuales",
        "description": "Cada selección puede filtrar, resaltar o no afectar otros visuales, según compatibilidad."
      },
      {
        "id": "analisis-de-datos/powerbi/filtros-y-segmentadores/orden-y-top-n",
        "label": "Orden y Top N",
        "description": "Los visuales pueden ordenar por campos o medidas y limitar categorías mediante Top N."
      }
    ]
  },
  {
    "key": "navegacion-y-detalle",
    "label": "Navegación y detalle",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/definicion",
        "label": "Definición",
        "description": "La navegación permite explorar niveles o páginas sin saturar el resumen con todos los registros."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/drill-down-drill-up-y-expandir",
        "label": "Drill down, drill up y expandir",
        "description": "Drill down baja por una rama; drill up regresa; expandir muestra niveles conjuntamente."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/drillthrough",
        "label": "Drillthrough",
        "description": "Una página de detalle recibe un filtro desde un punto de otro visual."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/tooltips-y-paginas-de-tooltip",
        "label": "Tooltips y páginas de tooltip",
        "description": "El tooltip muestra contexto al pasar sobre un punto; una página tooltip puede contener varios visuales."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/bookmarks",
        "label": "Bookmarks",
        "description": "Un marcador captura un estado del informe, como filtros, página o visibilidad de objetos, según sus opciones."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/botones-y-navegacion-de-paginas",
        "label": "Botones y navegación de páginas",
        "description": "Los botones ejecutan acciones como navegar, activar un marcador o retroceder."
      },
      {
        "id": "analisis-de-datos/powerbi/navegacion-y-detalle/panel-seleccion-y-capas",
        "label": "Panel Selección y capas",
        "description": "Permite agrupar, ordenar y mostrar u ocultar visuales; también ayuda a controlar superposiciones."
      }
    ]
  },
  {
    "key": "personalizacion-e-interactividad-avanzada",
    "label": "Personalización e interactividad avanzada",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/definicion",
        "label": "Definición",
        "description": "Los parámetros, títulos y opciones de lectura permiten adaptar un mismo informe a varias necesidades."
      },
      {
        "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/field-parameters",
        "label": "Field Parameters",
        "description": "Un parámetro de campos permite alternar medidas o dimensiones en un visual mediante selección."
      },
      {
        "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/what-if-y-titulos-dinamicos",
        "label": "What-if y títulos dinámicos",
        "description": "Un parámetro numérico simula hipótesis; un título dinámico se vincula a una medida de texto."
      },
      {
        "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/personalizar-visuales",
        "label": "Personalizar visuales",
        "description": "El autor puede permitir que lectores ajusten campos o tipo de visual dentro de límites configurados."
      },
      {
        "id": "analisis-de-datos/powerbi/personalizacion-e-interactividad-avanzada/diseno-movil",
        "label": "Diseño móvil",
        "description": "Permite reorganizar visuales para pantalla vertical sin cambiar la página de escritorio."
      }
    ]
  },
  {
    "key": "analisis-exploratorio-de-visuales",
    "label": "Análisis exploratorio de visuales",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/definicion",
        "label": "Definición",
        "description": "Power BI incluye herramientas para identificar patrones, valores extremos y explicaciones potenciales."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/agrupacion-y-binning",
        "label": "Agrupación y binning",
        "description": "Los grupos reúnen categorías manualmente; los bins crean intervalos para columnas numéricas o fechas compatibles."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/clustering",
        "label": "Clustering",
        "description": "Agrupa observaciones por similitud entre variables; su resultado depende de los datos y método."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/forecast-y-anomalias",
        "label": "Forecast y anomalías",
        "description": "Los pronósticos extrapolan series temporales; la detección de anomalías señala valores inesperados según patrones."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/error-bars-y-analyze",
        "label": "Error bars y Analyze",
        "description": "Barras de error muestran límites de incertidumbre definidos; Analyze explora factores asociados a cambios."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/copilot-y-narrativa",
        "label": "Copilot y narrativa",
        "description": "Copilot puede ayudar a proponer páginas, resúmenes o consultas según capacidades disponibles y permisos."
      },
      {
        "id": "analisis-de-datos/powerbi/analisis-exploratorio-de-visuales/copilot-para-paginas-y-modelos",
        "label": "Copilot para páginas y modelos",
        "description": "Copilot puede proponer visuales para una página o resumir un modelo semántico según las funciones habilitadas."
      }
    ]
  },
  {
    "key": "power-bi-service-y-publicacion",
    "label": "Power BI Service y publicación",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/definicion",
        "label": "Definición",
        "description": "Service aloja informes y modelos, permite compartirlos y administrar su ciclo de vida."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/workspaces-y-roles",
        "label": "Workspaces y roles",
        "description": "Los workspaces agrupan contenido; Admin, Member, Contributor y Viewer tienen permisos diferentes."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/reportes-y-dashboards",
        "label": "Reportes y dashboards",
        "description": "Un reporte contiene una o varias páginas interactivas; un dashboard del Service reúne mosaicos en una única página."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/apps-y-audiencias",
        "label": "Apps y audiencias",
        "description": "Una app distribuye contenido seleccionado del workspace a audiencias definidas."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/compartir-y-permisos-build",
        "label": "Compartir y permisos Build",
        "description": "Compartir da acceso al contenido según permisos; Build permite crear nuevos contenidos a partir de un modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/licencias-y-capacidades",
        "label": "Licencias y capacidades",
        "description": "Free, Pro, PPU y capacidades Fabric tienen condiciones distintas de creación, distribución y consumo."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/suscripciones-y-alertas",
        "label": "Suscripciones y alertas",
        "description": "Las suscripciones envían instantáneas o enlaces según configuración; alertas notifican condiciones compatibles."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/exportar-y-compartir-fuera-del-informe",
        "label": "Exportar y compartir fuera del informe",
        "description": "Los informes admiten exportación según visual, permisos, formato y políticas; Publish to web hace contenido públicamente accesible."
      },
      {
        "id": "analisis-de-datos/powerbi/power-bi-service-y-publicacion/endorsement-y-metricas-de-uso",
        "label": "Endorsement y métricas de uso",
        "description": "Promoción/certificación indican contenido recomendado o validado según políticas; métricas de uso muestran actividad registrada."
      }
    ]
  },
  {
    "key": "actualizacion-y-gateways",
    "label": "Actualización y gateways",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/definicion",
        "label": "Definición",
        "description": "Actualizar recupera cambios del origen para modelos Import; un gateway conecta orígenes que Service no puede alcanzar directamente."
      },
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/scheduled-refresh",
        "label": "Scheduled Refresh",
        "description": "Programa actualización del modelo en Service y utiliza credenciales válidas para sus orígenes."
      },
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/gateway-local",
        "label": "Gateway local",
        "description": "El gateway permite al servicio acceder a datos en una red privada sin exponer directamente el servidor."
      },
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/historial-y-errores-de-actualizacion",
        "label": "Historial y errores de actualización",
        "description": "El historial identifica fallos de autenticación, gateway, esquema, tipos o tiempos de espera."
      },
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/incremental-refresh",
        "label": "Incremental Refresh",
        "description": "Divide la actualización por ventanas de tiempo usando parámetros RangeStart y RangeEnd; conserva histórico y actualiza periodos recientes según política."
      },
      {
        "id": "analisis-de-datos/powerbi/actualizacion-y-gateways/automatic-page-refresh",
        "label": "Automatic Page Refresh",
        "description": "Actualiza visuales periódicamente en páginas compatibles, típicamente con DirectQuery."
      }
    ]
  },
  {
    "key": "seguridad-y-gobierno",
    "label": "Seguridad y gobierno",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/definicion",
        "label": "Definición",
        "description": "Power BI combina permisos de acceso con reglas de seguridad de datos y políticas de protección."
      },
      {
        "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/rls-estatico",
        "label": "RLS estático",
        "description": "Row-level security restringe las filas accesibles a un rol mediante filtros DAX que se propagan por relaciones."
      },
      {
        "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/rls-dinamico",
        "label": "RLS dinámico",
        "description": "Usa la identidad del usuario y una tabla de permisos para decidir qué filas puede ver."
      },
      {
        "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/object-level-security",
        "label": "Object-Level Security",
        "description": "OLS restringe acceso a tablas o columnas y sus metadatos para determinados roles de modelo."
      },
      {
        "id": "analisis-de-datos/powerbi/seguridad-y-gobierno/etiquetas-de-sensibilidad",
        "label": "Etiquetas de sensibilidad",
        "description": "Las etiquetas clasifican contenido y pueden aplicar políticas de protección de Microsoft Purview."
      }
    ]
  },
  {
    "key": "rendimiento-del-modelo",
    "label": "Rendimiento del modelo",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/definicion",
        "label": "Definición",
        "description": "El rendimiento depende del tamaño del modelo, cardinalidad, relaciones, expresiones DAX y origen."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/vertipaq-y-cardinalidad",
        "label": "VertiPaq y cardinalidad",
        "description": "VertiPaq almacena datos Import en columnas comprimidas. Muchas combinaciones únicas y columnas innecesarias pueden aumentar tamaño."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/formula-engine-y-storage-engine",
        "label": "Formula Engine y Storage Engine",
        "description": "El Formula Engine coordina lógica DAX; el Storage Engine recupera/agrega datos desde el almacenamiento o el origen según modo."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/dax-query-view-y-performance-analyzer",
        "label": "DAX Query View y Performance Analyzer",
        "description": "Query View ejecuta consultas DAX; Performance Analyzer ayuda a obtener la consulta generada por un visual."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/optimizacion-de-consultas-y-medidas",
        "label": "Optimización de consultas y medidas",
        "description": "Filtros simples, eliminación de trabajo redundante y un modelo estrella ayudan a evitar cálculos costosos."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/tablas-de-agregacion-y-modelos-compuestos",
        "label": "Tablas de agregación y modelos compuestos",
        "description": "Los modelos compuestos combinan modos de almacenamiento; agregaciones precomputadas pueden resolver consultas sin leer todo el detalle."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/tablas-hibridas-y-particiones",
        "label": "Tablas híbridas y particiones",
        "description": "Una tabla híbrida combina particiones Import con una partición DirectQuery para datos recientes en escenarios compatibles."
      },
      {
        "id": "analisis-de-datos/powerbi/rendimiento-del-modelo/reducir-filas-y-granularidad",
        "label": "Reducir filas y granularidad",
        "description": "Eliminar filas no necesarias o cargar agregados en lugar de detalle reduce volumen, pero puede impedir análisis posteriores."
      }
    ]
  },
  {
    "key": "fabric-e-integracion-de-datos",
    "label": "Fabric e integración de datos",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/definicion",
        "label": "Definición",
        "description": "Fabric integra almacenamiento, ingeniería y análisis alrededor de OneLake; Power BI consume modelos sobre esos datos."
      },
      {
        "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/dataflows-y-dataflows-gen2",
        "label": "Dataflows y Dataflows Gen2",
        "description": "Los dataflows permiten reutilizar transformaciones Power Query en servicio; Gen2 añade destinos de datos de Fabric y otros destinos compatibles."
      },
      {
        "id": "analisis-de-datos/powerbi/fabric-e-integracion-de-datos/lakehouse-warehouse-y-direct-lake",
        "label": "Lakehouse, Warehouse y Direct Lake",
        "description": "Lakehouse combina archivos y tablas Delta; Warehouse ofrece experiencia SQL analítica. Direct Lake consume tablas compatibles de OneLake mediante modelos semánticos."
      }
    ]
  },
  {
    "key": "desarrollo-y-ciclo-de-vida",
    "label": "Desarrollo y ciclo de vida",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/definicion",
        "label": "Definición",
        "description": "Proyectos, herramientas externas y entornos separados facilitan mantener, revisar y desplegar modelos e informes."
      },
      {
        "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/pbip-y-git",
        "label": "PBIP y Git",
        "description": "Power BI Project separa definiciones de informe y modelo en archivos de proyecto aptos para control de versiones."
      },
      {
        "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/tmdl-xmla-y-tabular-editor",
        "label": "TMDL, XMLA y Tabular Editor",
        "description": "TMDL representa metadatos tabulares en texto; XMLA permite conexión al modelo en capacidades compatibles; Tabular Editor administra metadatos avanzados."
      },
      {
        "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/deployment-pipelines",
        "label": "Deployment Pipelines",
        "description": "Permiten promover contenido entre etapas y gestionar reglas de despliegue según recursos compatibles."
      },
      {
        "id": "analisis-de-datos/powerbi/desarrollo-y-ciclo-de-vida/rest-api-y-embedded",
        "label": "REST API y Embedded",
        "description": "Las API permiten automatizar operaciones autorizadas; Embedded integra informes en aplicaciones mediante autenticación y permisos apropiados."
      }
    ]
  },
  {
    "key": "informes-paginados",
    "label": "Informes paginados",
    "children": [
      {
        "id": "analisis-de-datos/powerbi/informes-paginados/definicion",
        "label": "Definición",
        "description": "Los paginated reports tienen diseño de página fijo y están orientados a documentos detallados, impresión y exportación."
      },
      {
        "id": "analisis-de-datos/powerbi/informes-paginados/parametros-y-diseno-de-impresion",
        "label": "Parámetros y diseño de impresión",
        "description": "Los parámetros filtran datasets o controlan presentación; el diseño fija márgenes, encabezados y paginación."
      }
    ]
  }
];
