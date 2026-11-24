// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const openpyxlCurriculum = [
  {
    "key": "workbook",
    "label": "Workbook y archivos",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/workbook/definicion",
        "label": "Definición",
        "description": "Un Workbook representa un libro de Excel en memoria. Se crea con Workbook() o se carga desde un archivo existente."
      },
      {
        "id": "analisis-de-datos/openpyxl/workbook/crear-y-guardar",
        "label": "Crear y guardar",
        "description": "save() escribe el estado del libro en un archivo .xlsx."
      },
      {
        "id": "analisis-de-datos/openpyxl/workbook/load-workbook",
        "label": "load_workbook()",
        "description": "Abre un libro existente para leerlo o editarlo."
      },
      {
        "id": "analisis-de-datos/openpyxl/workbook/guardar-y-cerrar",
        "label": "Guardar cambios y cerrar",
        "description": "save() persiste cambios y close() cierra los recursos del libro cuando corresponda."
      },
      {
        "id": "analisis-de-datos/openpyxl/workbook/formatos-admitidos",
        "label": "Archivos admitidos",
        "description": "openpyxl trabaja con formatos OOXML de Excel: xlsx, xlsm, xltx y xltm."
      }
    ]
  },
  {
    "key": "worksheet",
    "label": "Hojas de cálculo",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/worksheet/definicion",
        "label": "Definición",
        "description": "Una Worksheet representa una hoja dentro de un libro y permite acceder a sus celdas."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/hoja-activa",
        "label": "active y sheetnames",
        "description": "active devuelve la hoja activa; sheetnames devuelve los títulos en orden."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/acceso-por-nombre",
        "label": "Acceso por nombre",
        "description": "wb[nombre] selecciona una hoja concreta por su título."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/crear-y-renombrar",
        "label": "create_sheet() y title",
        "description": "create_sheet() agrega una hoja; title permite cambiar su nombre."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/eliminar-hoja",
        "label": "remove()",
        "description": "remove() elimina un objeto Worksheet del libro."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/copiar-hoja",
        "label": "copy_worksheet()",
        "description": "Copia celdas y algunas propiedades de una hoja dentro del mismo libro."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/reordenar-hojas",
        "label": "move_sheet()",
        "description": "Mueve una hoja un número de posiciones respecto de su ubicación."
      },
      {
        "id": "analisis-de-datos/openpyxl/worksheet/visibilidad-hoja",
        "label": "sheet_state",
        "description": "Controla si la hoja es visible, hidden o veryHidden."
      }
    ]
  },
  {
    "key": "celdas",
    "label": "Celdas y valores",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/celdas/definicion",
        "label": "Definición",
        "description": "Cell representa una celda y su contenido, coordenadas, tipo y formato."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/acceso-a-celdas",
        "label": "Notación A1 y cell()",
        "description": "Puedes seleccionar una celda por su dirección o por índices de fila y columna."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/escribir-valores",
        "label": "Escribir y limpiar",
        "description": "Asigna un valor a una dirección o a .value; None limpia el contenido."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/tipos-de-celdas",
        "label": "Tipos y data_type",
        "description": "openpyxl reconoce números, cadenas, booleanos, fechas, fórmulas, errores y celdas vacías."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/coordenadas-y-offset",
        "label": "Coordenadas y offset()",
        "description": "row, column y coordinate identifican la posición; offset() accede a una celda relativa."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/propiedades-de-celda",
        "label": "is_date y has_style",
        "description": "is_date reconoce valores o formatos de fecha; has_style indica si hay estilo no predeterminado."
      },
      {
        "id": "analisis-de-datos/openpyxl/celdas/texto-literal",
        "label": "Texto literal que comienza con =",
        "description": "Puedes especificar tipo texto si una cadena no debe convertirse en fórmula."
      }
    ]
  },
  {
    "key": "rangos",
    "label": "Rangos e iteración",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/rangos/definicion",
        "label": "Definición",
        "description": "Un rango reúne varias celdas; iterar permite leer filas o columnas sin escribir una dirección por cada dato."
      },
      {
        "id": "analisis-de-datos/openpyxl/rangos/rows-y-columns",
        "label": "Filas y columnas completas",
        "description": "rows y columns generan grupos de objetos Cell por fila o columna."
      },
      {
        "id": "analisis-de-datos/openpyxl/rangos/iter-rows",
        "label": "iter_rows()",
        "description": "Permite recorrer un rectángulo por filas con límites explícitos."
      },
      {
        "id": "analisis-de-datos/openpyxl/rangos/iter-cols",
        "label": "iter_cols()",
        "description": "Recorre un rectángulo por columnas en modo normal."
      },
      {
        "id": "analisis-de-datos/openpyxl/rangos/solo-valores",
        "label": "values_only y values",
        "description": "values_only=True devuelve valores en lugar de objetos; ws.values recorre los valores de toda la hoja."
      },
      {
        "id": "analisis-de-datos/openpyxl/rangos/dimensiones",
        "label": "Dimensiones",
        "description": "max_row, max_column, min_row, min_column y calculate_dimension() describen el rectángulo de celdas registrado."
      }
    ]
  },
  {
    "key": "edicion",
    "label": "Escritura y edición de estructura",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/edicion/definicion",
        "label": "Definición",
        "description": "La hoja permite añadir registros, insertar o borrar filas y columnas y mover rangos."
      },
      {
        "id": "analisis-de-datos/openpyxl/edicion/append",
        "label": "append()",
        "description": "Agrega una fila a continuación de las filas registradas."
      },
      {
        "id": "analisis-de-datos/openpyxl/edicion/insertar-eliminar-filas",
        "label": "insert_rows() y delete_rows()",
        "description": "Inserta filas antes de un índice o elimina una cantidad desde ese índice."
      },
      {
        "id": "analisis-de-datos/openpyxl/edicion/insertar-eliminar-columnas",
        "label": "insert_cols() y delete_cols()",
        "description": "Inserta o borra columnas por su índice numérico."
      },
      {
        "id": "analisis-de-datos/openpyxl/edicion/mover-rangos",
        "label": "move_range()",
        "description": "Desplaza celdas y puede traducir referencias relativas de fórmulas movidas con translate=True."
      },
      {
        "id": "analisis-de-datos/openpyxl/edicion/combinar-celdas",
        "label": "merge_cells() y unmerge_cells()",
        "description": "Combina un rectángulo en una celda visual; solo conserva el valor de la superior izquierda."
      }
    ]
  },
  {
    "key": "coordenadas",
    "label": "Utilidades de coordenadas",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/definicion",
        "label": "Definición",
        "description": "openpyxl.utils ofrece conversiones entre índices numéricos y referencias de Excel."
      },
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/indices-y-letras",
        "label": "get_column_letter() y column_index_from_string()",
        "description": "Convierten entre números de columna y letras."
      },
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/referencias",
        "label": "coordinate_from_string() y absolute_coordinate()",
        "description": "Descomponen una dirección de celda o convierten una referencia a absoluta."
      },
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/limites-de-rango",
        "label": "range_boundaries()",
        "description": "Devuelve los límites numéricos de un rango."
      },
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/direcciones-de-rango",
        "label": "rows_from_range() y cols_from_range()",
        "description": "Generan direcciones agrupadas por filas o columnas sin acceder a los valores."
      },
      {
        "id": "analisis-de-datos/openpyxl/coordenadas/objetos-rango",
        "label": "CellRange y MultiCellRange",
        "description": "Representan rectángulos y conjuntos de rectángulos; permiten operaciones sobre referencias."
      }
    ]
  },
  {
    "key": "estilos",
    "label": "Formato de celdas",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/estilos/definicion",
        "label": "Definición",
        "description": "Los estilos cambian la presentación de celdas sin cambiar su valor."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/fuente",
        "label": "Font()",
        "description": "Controla negrita, cursiva, tamaño, nombre y color de texto."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/rellenos",
        "label": "PatternFill() y GradientFill()",
        "description": "PatternFill aplica un relleno sólido o patrón; GradientFill aplica una transición de colores."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/bordes",
        "label": "Border() y Side()",
        "description": "Border define los lados de una celda; Side define su línea y color."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/alineacion",
        "label": "Alignment()",
        "description": "Controla alineación horizontal y vertical, sangría, rotación y ajuste de texto."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/formato-numerico",
        "label": "number_format",
        "description": "Controla cómo se presenta un número, porcentaje, moneda o fecha."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/estilo-reutilizable",
        "label": "NamedStyle()",
        "description": "Registra un estilo con nombre y aplícalo a múltiples celdas."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/copiar-estilos",
        "label": "Copiar estilos",
        "description": "copy() duplica un objeto de estilo para asignarlo o cambiarlo sin mutar el estilo de origen."
      },
      {
        "id": "analisis-de-datos/openpyxl/estilos/colores",
        "label": "Colores ARGB, tema e índice",
        "description": "Color admite rgb, indexed y theme; tint aclara u oscurece un color de tema."
      }
    ]
  },
  {
    "key": "vista",
    "label": "Dimensiones y vista",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/vista/definicion",
        "label": "Definición",
        "description": "Las dimensiones y opciones de vista controlan cómo se presenta una hoja al abrirla."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/ancho-y-alto",
        "label": "Ancho y alto",
        "description": "column_dimensions y row_dimensions permiten ajustar anchos y alturas."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/freeze-panes",
        "label": "Inmovilizar paneles",
        "description": "freeze_panes deja fijas las filas superiores y columnas anteriores a una celda."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/ocultar-filas-columnas",
        "label": "Ocultar filas y columnas",
        "description": "hidden controla la visibilidad sin borrar los datos."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/agrupar-dimensiones",
        "label": "Agrupar filas y columnas",
        "description": "group() crea niveles de esquema que se pueden expandir y contraer."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/opciones-de-vista",
        "label": "Cuadrícula, zoom y pestaña",
        "description": "sheet_view y sheet_properties ajustan cuadrícula, zoom y color de pestaña."
      },
      {
        "id": "analisis-de-datos/openpyxl/vista/seleccion-inicial",
        "label": "Selección inicial",
        "description": "La selección de la vista controla qué celda aparece activa al abrir la hoja."
      }
    ]
  },
  {
    "key": "formulas",
    "label": "Fórmulas de Excel",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/formulas/definicion",
        "label": "Definición",
        "description": "openpyxl almacena y recupera fórmulas de Excel; no implementa su motor de cálculo."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/agregaciones-y-condiciones",
        "label": "Fórmulas de agregación y condición",
        "description": "SUM, AVERAGE, IF y otras funciones se escriben como cadenas de fórmula."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/referencias-de-formulas",
        "label": "Referencias relativas, absolutas y mixtas",
        "description": "Las referencias relativas cambian al copiar fórmulas; el signo $ fija fila, columna o ambas."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/referencias-entre-hojas",
        "label": "Referencias entre hojas",
        "description": "Una fórmula puede referirse a una celda de otra hoja usando Hoja!Celda."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/data-only",
        "label": "data_only",
        "description": "load_workbook(data_only=True) devuelve el resultado almacenado por una aplicación de cálculo, si existe."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/traducir-formulas",
        "label": "Translator()",
        "description": "Desplaza referencias relativas desde una celda de origen a otra de destino."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/tokenizar-formulas",
        "label": "Tokenizer",
        "description": "Divide una expresión en tokens para inspeccionar sus componentes."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/recalculo",
        "label": "CalcProperties",
        "description": "Las propiedades de cálculo solicitan cómo debe recalcular el libro una aplicación compatible."
      },
      {
        "id": "analisis-de-datos/openpyxl/formulas/formulas-especiales",
        "label": "ArrayFormula y DataTableFormula",
        "description": "Representan fórmulas matriciales y tablas de hipótesis de Excel."
      }
    ]
  },
  {
    "key": "nombres-definidos",
    "label": "Rangos con nombre",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/nombres-definidos/definicion",
        "label": "Definición",
        "description": "Los nombres definidos asignan un identificador a una referencia, fórmula o constante del libro."
      },
      {
        "id": "analisis-de-datos/openpyxl/nombres-definidos/crear-nombres",
        "label": "Crear y usar nombres",
        "description": "Un nombre global puede utilizarse desde las fórmulas de distintas hojas."
      },
      {
        "id": "analisis-de-datos/openpyxl/nombres-definidos/nombres-locales",
        "label": "Nombres locales y destinos",
        "description": "Un nombre local pertenece a una hoja; destinations permite obtener sus referencias estáticas."
      },
      {
        "id": "analisis-de-datos/openpyxl/nombres-definidos/eliminar-nombres",
        "label": "Eliminar un nombre",
        "description": "Los contenedores de nombres permiten eliminar un identificador por su clave."
      }
    ]
  },
  {
    "key": "limpieza-y-analisis",
    "label": "Limpieza y análisis con Python",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/definicion",
        "label": "Definición",
        "description": "openpyxl entrega valores de Excel; las transformaciones y cálculos se realizan con Python o una biblioteca de análisis."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/valores-faltantes",
        "label": "Detectar y reemplazar vacíos",
        "description": "Comprueba None para localizar celdas vacías y aplica un valor alternativo si corresponde."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/detectar-duplicados",
        "label": "Detectar duplicados",
        "description": "Cuenta repeticiones de una clave con Counter o registra claves vistas con un set."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/eliminar-duplicados",
        "label": "Eliminar duplicados",
        "description": "Reconstruye una hoja con una sola fila por clave, conservando la primera o la última según una regla explícita."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/limpiar-texto",
        "label": "Limpiar texto y reemplazar",
        "description": "Usa métodos de str para quitar espacios, normalizar mayúsculas o reemplazar fragmentos."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/convertir-tipos",
        "label": "Convertir tipos",
        "description": "int, float y str convierten valores si su contenido es compatible."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/filtrar-y-ordenar",
        "label": "Filtrar y ordenar datos reales",
        "description": "Usa condiciones y sorted() para seleccionar y ordenar registros en Python."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/agregaciones",
        "label": "Agregaciones",
        "description": "Calcula métricas con sum, len, min, max y operaciones aritméticas."
      },
      {
        "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/agrupaciones",
        "label": "Agrupar registros",
        "description": "Un diccionario o defaultdict acumula métricas por categoría."
      }
    ]
  },
  {
    "key": "fechas",
    "label": "Fechas y horas",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/fechas/definicion",
        "label": "Definición",
        "description": "Excel representa fechas y horas con valores seriales o formatos ISO; openpyxl los convierte a objetos de datetime cuando corresponde."
      },
      {
        "id": "analisis-de-datos/openpyxl/fechas/leer-escribir-fechas",
        "label": "Leer y escribir fechas",
        "description": "Asigna date o datetime y utiliza number_format para controlar su presentación."
      },
      {
        "id": "analisis-de-datos/openpyxl/fechas/calculos-de-fechas",
        "label": "Parsear y calcular diferencias",
        "description": "Convierte texto a fecha y usa timedelta para calcular intervalos."
      },
      {
        "id": "analisis-de-datos/openpyxl/fechas/calendarios",
        "label": "Calendarios 1900 y 1904",
        "description": "wb.epoch indica el sistema de fechas; las utilidades to_excel y from_excel convierten seriales."
      },
      {
        "id": "analisis-de-datos/openpyxl/fechas/fechas-iso",
        "label": "ISO 8601",
        "description": "iso_dates=True solicita guardar las fechas compatibles como texto ISO en el XML."
      }
    ]
  },
  {
    "key": "tablas",
    "label": "Tablas de Excel",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/tablas/definicion",
        "label": "Definición",
        "description": "Una Table convierte un rango rectangular con cabeceras de texto en una tabla estructurada de Excel."
      },
      {
        "id": "analisis-de-datos/openpyxl/tablas/crear-tabla-con-estilo",
        "label": "Table y TableStyleInfo",
        "description": "TableStyleInfo permite elegir un estilo de tabla y activar bandas de filas o columnas."
      },
      {
        "id": "analisis-de-datos/openpyxl/tablas/consultar-eliminar-tablas",
        "label": "Consultar y eliminar tablas",
        "description": "ws.tables permite buscar tablas por nombre y eliminarlas sin borrar sus celdas."
      },
      {
        "id": "analisis-de-datos/openpyxl/tablas/redimensionar-tabla",
        "label": "Redimensionar una tabla",
        "description": "ref define el área de una tabla; al añadir registros, actualízala y sincroniza su autofiltro si existe."
      }
    ]
  },
  {
    "key": "autofiltros",
    "label": "Autofiltros y criterios de ordenación",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/autofiltros/definicion",
        "label": "Definición",
        "description": "auto_filter configura filtros y ordenaciones que puede aplicar Excel al abrir o interactuar con la hoja."
      },
      {
        "id": "analisis-de-datos/openpyxl/autofiltros/filtrar-por-valores",
        "label": "add_filter_column()",
        "description": "Define los valores aceptados en una columna relativa al rango filtrado."
      },
      {
        "id": "analisis-de-datos/openpyxl/autofiltros/criterio-de-orden",
        "label": "add_sort_condition()",
        "description": "Configura un criterio de ordenación sobre un rango."
      },
      {
        "id": "analisis-de-datos/openpyxl/autofiltros/filtros-numericos",
        "label": "Filtros numéricos personalizados",
        "description": "CustomFilter y NumberFilter expresan comparaciones como mayor que o menor que."
      },
      {
        "id": "analisis-de-datos/openpyxl/autofiltros/filtros-texto-fecha",
        "label": "Filtros de texto y fechas",
        "description": "StringFilter permite patrones de texto y DateGroupItem permite agrupar fechas por componentes."
      }
    ]
  },
  {
    "key": "formato-condicional",
    "label": "Formato condicional",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/definicion",
        "label": "Definición",
        "description": "El formato condicional aplica estilos visuales en Excel si se cumple una regla."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/comparar-celdas",
        "label": "CellIsRule()",
        "description": "Aplica una regla basada en una comparación con el valor de cada celda."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/regla-con-formula",
        "label": "FormulaRule()",
        "description": "Evalúa una fórmula relativa a la primera celda del rango para decidir el formato."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/resaltar-duplicados",
        "label": "Duplicados",
        "description": "Una regla duplicateValues marca celdas con valores repetidos."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/escalas-de-color",
        "label": "ColorScaleRule()",
        "description": "Asigna colores según la posición de cada valor en una escala."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/barras-de-datos",
        "label": "DataBarRule()",
        "description": "Representa magnitudes mediante barras dentro de las celdas."
      },
      {
        "id": "analisis-de-datos/openpyxl/formato-condicional/conjuntos-de-iconos",
        "label": "IconSetRule()",
        "description": "Asigna iconos según umbrales de valor o porcentaje."
      }
    ]
  },
  {
    "key": "validacion",
    "label": "Validación de datos",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/validacion/definicion",
        "label": "Definición",
        "description": "DataValidation define restricciones para valores introducidos por usuarios en Excel."
      },
      {
        "id": "analisis-de-datos/openpyxl/validacion/lista-desplegable",
        "label": "Lista desplegable",
        "description": "type='list' limita la entrada a una lista literal o a un rango."
      },
      {
        "id": "analisis-de-datos/openpyxl/validacion/validar-numeros",
        "label": "Enteros y decimales",
        "description": "whole y decimal restringen números a rangos o comparaciones."
      },
      {
        "id": "analisis-de-datos/openpyxl/validacion/validar-fechas-texto",
        "label": "Fechas y longitud de texto",
        "description": "date y textLength permiten limitar fechas o la cantidad de caracteres."
      },
      {
        "id": "analisis-de-datos/openpyxl/validacion/validacion-personalizada",
        "label": "Validación personalizada",
        "description": "type='custom' utiliza una fórmula que debe evaluarse como verdadera."
      },
      {
        "id": "analisis-de-datos/openpyxl/validacion/mensajes-validacion",
        "label": "Mensajes de entrada y error",
        "description": "prompt, error, promptTitle y errorTitle personalizan el mensaje mostrado al usuario."
      }
    ]
  },
  {
    "key": "graficos",
    "label": "Gráficos: datos y series",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/graficos/definicion",
        "label": "Definición",
        "description": "Un gráfico nativo de Excel se construye con un objeto Chart y referencias a los datos de una hoja."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos/referencia-de-datos",
        "label": "Reference()",
        "description": "Reference define una región de datos usada en series o categorías."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos/series-y-categorias",
        "label": "Series y categorías",
        "description": "add_data incorpora series y set_categories asigna etiquetas a los puntos."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos/titulos-y-ejes",
        "label": "Títulos, ejes y leyenda",
        "description": "Personaliza el título del gráfico, los títulos de ejes y la ubicación de la leyenda."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos/anclaje-y-tamano",
        "label": "Anclaje, tamaño y estilos",
        "description": "add_chart coloca el gráfico en una celda; width y height especifican su tamaño en centímetros."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos/etiquetas-de-datos",
        "label": "Etiquetas de datos",
        "description": "DataLabelList permite mostrar valores o etiquetas de puntos."
      }
    ]
  },
  {
    "key": "tipos-de-graficos",
    "label": "Tipos de gráficos",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/definicion",
        "label": "Definición",
        "description": "Selecciona la clase de gráfico según la pregunta: comparar categorías, mostrar evolución, proporciones o relaciones."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/barras",
        "label": "BarChart()",
        "description": "Compara magnitudes por categorías mediante columnas o barras horizontales."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/lineas-y-areas",
        "label": "LineChart() y AreaChart()",
        "description": "LineChart muestra evolución; AreaChart rellena el área bajo una serie."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/pastel-y-dona",
        "label": "PieChart() y DoughnutChart()",
        "description": "Muestran partes de un total, preferentemente con pocas categorías y datos positivos."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/dispersion",
        "label": "ScatterChart()",
        "description": "Representa pares numéricos X e Y mediante una serie explícita."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/burbujas",
        "label": "BubbleChart()",
        "description": "Agrega una tercera magnitud que determina el tamaño de cada punto."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/radar",
        "label": "RadarChart()",
        "description": "Compara perfiles de varias métricas sobre ejes radiales."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/financiero-y-superficie",
        "label": "StockChart() y SurfaceChart()",
        "description": "StockChart muestra series financieras compatibles; SurfaceChart representa una matriz de valores."
      },
      {
        "id": "analisis-de-datos/openpyxl/tipos-de-graficos/histograma",
        "label": "Histograma por frecuencias",
        "description": "Calcula frecuencias por intervalos en Python y represéntalas con un BarChart."
      }
    ]
  },
  {
    "key": "graficos-avanzados",
    "label": "Gráficos avanzados",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/graficos-avanzados/definicion",
        "label": "Definición",
        "description": "Los gráficos pueden combinar series, modificar sus propiedades y usar ejes adicionales."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos-avanzados/graficos-apilados",
        "label": "Gráficos apilados",
        "description": "grouping='stacked' apila series por categoría; percentStacked muestra proporciones."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos-avanzados/grafico-combinado",
        "label": "Gráfico combinado y eje secundario",
        "description": "Se pueden combinar gráficos y asignar un eje Y secundario mediante un identificador distinto."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos-avanzados/escalas-y-tendencia",
        "label": "Escalas y tendencias",
        "description": "scaling ajusta el dominio de los ejes y Trendline añade una tendencia configurada."
      },
      {
        "id": "analisis-de-datos/openpyxl/graficos-avanzados/hoja-de-grafico",
        "label": "Chartsheet",
        "description": "create_chartsheet() crea una hoja dedicada a un gráfico."
      }
    ]
  },
  {
    "key": "objetos-adicionales",
    "label": "Imágenes, comentarios e hipervínculos",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/objetos-adicionales/definicion",
        "label": "Definición",
        "description": "Una hoja puede incluir imágenes, anotaciones e hipervínculos además de valores."
      },
      {
        "id": "analisis-de-datos/openpyxl/objetos-adicionales/insertar-imagen",
        "label": "Image() y add_image()",
        "description": "Inserta una imagen rasterizada mediante Image y un anclaje de hoja."
      },
      {
        "id": "analisis-de-datos/openpyxl/objetos-adicionales/comentarios",
        "label": "Comment()",
        "description": "Comment añade una anotación de texto y autor a una celda."
      },
      {
        "id": "analisis-de-datos/openpyxl/objetos-adicionales/hipervinculos",
        "label": "Hipervínculos",
        "description": "hyperlink asocia un destino a una celda; su valor puede ser un texto distinto del destino."
      },
      {
        "id": "analisis-de-datos/openpyxl/objetos-adicionales/texto-enriquecido",
        "label": "Texto enriquecido",
        "description": "CellRichText permite combinar fragmentos con estilos distintos dentro de una misma celda."
      }
    ]
  },
  {
    "key": "proteccion",
    "label": "Protección y seguridad",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/proteccion/definicion",
        "label": "Definición",
        "description": "La protección de Excel limita ciertas modificaciones accidentales en hojas y libros."
      },
      {
        "id": "analisis-de-datos/openpyxl/proteccion/proteccion-celdas",
        "label": "Protection()",
        "description": "locked y hidden indican si una celda se bloquea o si su fórmula se oculta al proteger la hoja."
      },
      {
        "id": "analisis-de-datos/openpyxl/proteccion/proteger-hoja",
        "label": "Proteger una hoja",
        "description": "sheet protection permite establecer contraseña y restricciones de edición."
      },
      {
        "id": "analisis-de-datos/openpyxl/proteccion/proteger-libro",
        "label": "Proteger estructura del libro",
        "description": "wb.security.lockStructure limita cambios en la estructura de hojas."
      }
    ]
  },
  {
    "key": "impresion",
    "label": "Impresión y configuración de página",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/impresion/definicion",
        "label": "Definición",
        "description": "Las propiedades de impresión controlan qué se imprime y cómo se distribuye en páginas."
      },
      {
        "id": "analisis-de-datos/openpyxl/impresion/configurar-pagina",
        "label": "Orientación, papel y escala",
        "description": "page_setup define orientación y papel; PageSetupProperties habilita ajustar a páginas."
      },
      {
        "id": "analisis-de-datos/openpyxl/impresion/area-y-titulos",
        "label": "Área y títulos repetidos",
        "description": "print_area limita la impresión; print_title_rows y print_title_cols repiten encabezados."
      },
      {
        "id": "analisis-de-datos/openpyxl/impresion/margenes",
        "label": "Márgenes",
        "description": "page_margins configura márgenes en pulgadas."
      },
      {
        "id": "analisis-de-datos/openpyxl/impresion/encabezados-y-pies",
        "label": "Encabezados y pies",
        "description": "oddHeader y oddFooter permiten añadir textos y códigos de página en páginas impares o todas si no hay diseño diferente."
      },
      {
        "id": "analisis-de-datos/openpyxl/impresion/saltos-de-pagina",
        "label": "Saltos de página",
        "description": "Break agrega saltos manuales de fila o columna."
      }
    ]
  },
  {
    "key": "rendimiento",
    "label": "Archivos grandes y memoria",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/definicion",
        "label": "Definición",
        "description": "Los modos optimizados permiten leer o generar libros grandes de forma incremental."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/solo-lectura",
        "label": "read_only=True",
        "description": "Carga las filas de manera diferida con ReadOnlyWorksheet."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/reset-dimensions",
        "label": "Dimensiones incorrectas",
        "description": "En read_only las dimensiones dependen de metadatos del archivo; reset_dimensions() permite ignorarlos si son erróneos."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/solo-escritura",
        "label": "write_only=True",
        "description": "Genera filas secuencialmente con bajo consumo de memoria."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/celdas-optimizadas",
        "label": "WriteOnlyCell()",
        "description": "Permite preparar estilos o comentarios para una celda en una hoja write_only."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/procesamiento-incremental",
        "label": "Procesamiento incremental",
        "description": "Consume las filas una por una en vez de convertirlas todas en una lista."
      },
      {
        "id": "analisis-de-datos/openpyxl/rendimiento/archivo-en-memoria",
        "label": "BytesIO",
        "description": "BytesIO permite guardar y cargar un libro en un búfer binario sin archivo intermedio."
      }
    ]
  },
  {
    "key": "errores-y-pruebas",
    "label": "Rutas, errores y verificación",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/errores-y-pruebas/definicion",
        "label": "Definición",
        "description": "Una automatización fiable valida rutas, trata errores previsibles y comprueba que el libro final cumple lo solicitado."
      },
      {
        "id": "analisis-de-datos/openpyxl/errores-y-pruebas/rutas",
        "label": "pathlib y os",
        "description": "Path facilita construir rutas, localizar archivos y crear carpetas de salida; os ofrece utilidades equivalentes."
      },
      {
        "id": "analisis-de-datos/openpyxl/errores-y-pruebas/archivos-invalidos",
        "label": "Archivo inexistente o inválido",
        "description": "FileNotFoundError, InvalidFileException y BadZipFile distinguen problemas de ruta, formato o contenido ZIP."
      },
      {
        "id": "analisis-de-datos/openpyxl/errores-y-pruebas/errores-de-celdas",
        "label": "IllegalCharacterError y coordenadas inválidas",
        "description": "Ciertos caracteres de control no pueden almacenarse; las coordenadas deben cumplir la sintaxis de Excel."
      },
      {
        "id": "analisis-de-datos/openpyxl/errores-y-pruebas/verificar-reporte",
        "label": "Verificar valores, estilos y fórmulas",
        "description": "Reabre el archivo con data_only=False y usa assert para comprobar estructura y propiedades."
      }
    ]
  },
  {
    "key": "formatos-avanzados",
    "label": "Formatos avanzados y metadatos",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/definicion",
        "label": "Definición",
        "description": "openpyxl permite trabajar con metadatos y ciertos componentes avanzados del formato OOXML, con límites de conservación."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/propiedades-documento",
        "label": "Propiedades del documento",
        "description": "wb.properties contiene metadatos estándar como título, autor y descripción."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/propiedades-personalizadas",
        "label": "Propiedades personalizadas",
        "description": "custom_doc_props permite registrar propiedades tipadas adicionales en el libro."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/plantillas",
        "label": "Plantillas xltx y xltm",
        "description": "wb.template=True marca un libro como plantilla; la extensión debe corresponder al tipo de archivo."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/macros",
        "label": "Macros existentes",
        "description": "keep_vba=True conserva componentes VBA de un libro existente compatible, pero no los ejecuta ni los edita."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/tablas-dinamicas",
        "label": "Tablas dinámicas existentes",
        "description": "openpyxl puede preservar y modificar algunos atributos de pivots existentes, pero no proporciona una API pública completa para crearlos desde cero."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/referencias-externas",
        "label": "Referencias externas",
        "description": "keep_links controla si se conservan datos almacenados de vínculos externos al cargar."
      },
      {
        "id": "analisis-de-datos/openpyxl/formatos-avanzados/ooxml",
        "label": "Inspeccionar OOXML",
        "description": "Un xlsx contiene partes XML empaquetadas en ZIP que describen hojas, estilos y otros objetos."
      }
    ]
  },
  {
    "key": "integraciones",
    "label": "Integración con otras herramientas",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/integraciones/definicion",
        "label": "Definición",
        "description": "openpyxl se complementa con otras bibliotecas para importar datos, analizarlos y escribir reportes Excel."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/csv-a-excel",
        "label": "CSV a Excel",
        "description": "csv.reader o DictReader carga registros de texto que pueden escribirse con append()."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/sql-a-excel",
        "label": "SQL a Excel",
        "description": "Una consulta devuelve registros que puedes escribir como filas; sqlite3 sirve para demostrar la integración sin servidor externo."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/dataframe-to-rows",
        "label": "DataFrame a hoja",
        "description": "dataframe_to_rows transforma un DataFrame en filas utilizables por append()."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/excel-writer",
        "label": "ExcelWriter y pandas",
        "description": "pandas puede escribir DataFrames con motor openpyxl y luego personalizar la hoja mediante el objeto Workbook."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/leer-con-pandas",
        "label": "Leer Excel con pandas",
        "description": "read_excel importa una hoja como DataFrame para análisis tabular."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/numpy",
        "label": "NumPy y tipos de datos",
        "description": "NumPy realiza cálculos vectorizados; convierte resultados o arrays a valores compatibles con Excel antes de escribir."
      },
      {
        "id": "analisis-de-datos/openpyxl/integraciones/matplotlib",
        "label": "Matplotlib como imagen",
        "description": "Matplotlib produce una imagen que openpyxl puede insertar en una hoja."
      }
    ]
  },
  {
    "key": "automatizacion",
    "label": "Automatización de reportes",
    "children": [
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/definicion",
        "label": "Definición",
        "description": "Un reporte automatizado combina extracción, reglas de negocio, escritura y formato, con controles antes de entregar."
      },
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/actualizar-plantilla",
        "label": "Actualizar una plantilla",
        "description": "Carga una plantilla existente, cambia solo las celdas de entrada y guarda en una ruta nueva."
      },
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/consolidar-archivos",
        "label": "Consolidar varios archivos",
        "description": "Recorre libros con una estructura común y añade sus registros a un nuevo libro."
      },
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/reportes-por-grupo",
        "label": "Reportes por región",
        "description": "Separa registros por una categoría para generar entregables por sucursal o cliente."
      },
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/conciliar-datos",
        "label": "Conciliar información",
        "description": "Compara registros por identificador y detecta diferencias entre fuentes."
      },
      {
        "id": "analisis-de-datos/openpyxl/automatizacion/dashboard",
        "label": "Dashboard sencillo",
        "description": "Combina indicadores, tabla de resumen y gráfico nativo en una hoja de presentación."
      }
    ]
  }
];
