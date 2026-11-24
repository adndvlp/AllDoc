// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const googleSheetsCurriculum = [
  {
    "key": "celdas-y-rangos",
    "label": "Celdas y rangos",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/celdas-y-rangos/definicion",
        "label": "Definición",
        "description": "Una celda guarda un valor o una fórmula; un rango identifica un conjunto de celdas."
      },
      {
        "id": "analisis-de-datos/google-sheets/celdas-y-rangos/rango-contiguo",
        "label": "Rango contiguo",
        "description": "Los dos puntos indican desde la primera hasta la última celda, incluidas."
      },
      {
        "id": "analisis-de-datos/google-sheets/celdas-y-rangos/hojas-y-libros",
        "label": "Hojas y libros",
        "description": "Un archivo contiene varias hojas; el signo ! separa hoja y referencia."
      },
      {
        "id": "analisis-de-datos/google-sheets/celdas-y-rangos/seleccionar-y-editar",
        "label": "Seleccionar y editar",
        "description": "El cuadro de nombre permite ir a una celda o rango; la barra de fórmulas muestra su contenido."
      },
      {
        "id": "analisis-de-datos/google-sheets/celdas-y-rangos/autorrelleno",
        "label": "Autorrelleno",
        "description": "Copiar o arrastrar una fórmula adapta sus referencias relativas."
      }
    ]
  },
  {
    "key": "referencias",
    "label": "Referencias",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/referencias/definicion",
        "label": "Definición",
        "description": "Las referencias permiten utilizar valores de otras celdas en fórmulas."
      },
      {
        "id": "analisis-de-datos/google-sheets/referencias/relativas",
        "label": "Relativas",
        "description": "Una referencia sin $ cambia al copiar la fórmula a otra posición."
      },
      {
        "id": "analisis-de-datos/google-sheets/referencias/absolutas",
        "label": "Absolutas",
        "description": "Una referencia con $ en fila y columna permanece fija al copiar."
      },
      {
        "id": "analisis-de-datos/google-sheets/referencias/mixtas",
        "label": "Mixtas",
        "description": "Fijan solamente la fila o la columna; sirven en matrices de cálculo."
      },
      {
        "id": "analisis-de-datos/google-sheets/referencias/rangos-con-nombre",
        "label": "Rangos con nombre",
        "description": "Asignan un identificador legible a un rango."
      }
    ]
  },
  {
    "key": "tipos-y-formatos",
    "label": "Tipos y formatos",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/tipos-y-formatos/definicion",
        "label": "Definición",
        "description": "El tipo determina qué operaciones se pueden hacer; el formato controla cómo se ve un valor."
      },
      {
        "id": "analisis-de-datos/google-sheets/tipos-y-formatos/numeros-y-texto",
        "label": "Números y texto",
        "description": "Un número permite operaciones aritméticas; el texto conserva caracteres, como ceros iniciales."
      },
      {
        "id": "analisis-de-datos/google-sheets/tipos-y-formatos/moneda-y-decimales",
        "label": "Moneda y decimales",
        "description": "El formato moneda añade símbolo y controla decimales sin alterar la cifra."
      },
      {
        "id": "analisis-de-datos/google-sheets/tipos-y-formatos/fechas-y-horas",
        "label": "Fechas y horas",
        "description": "Sheets representa fechas y horas mediante números de serie; la hora es una fracción de día."
      },
      {
        "id": "analisis-de-datos/google-sheets/tipos-y-formatos/configuracion-regional",
        "label": "Configuración regional",
        "description": "Determina convenciones de fecha, separadores y moneda del libro."
      }
    ]
  },
  {
    "key": "operadores-y-formulas",
    "label": "Operadores y fórmulas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/operadores-y-formulas/definicion",
        "label": "Definición",
        "description": "Una fórmula empieza con = y combina valores, referencias, operadores y funciones."
      },
      {
        "id": "analisis-de-datos/google-sheets/operadores-y-formulas/aritmetica",
        "label": "Aritmética",
        "description": "+ suma, - resta, * multiplica, / divide y ^ eleva a potencia."
      },
      {
        "id": "analisis-de-datos/google-sheets/operadores-y-formulas/comparaciones",
        "label": "Comparaciones",
        "description": "=, <>, >, <, >= y <= devuelven TRUE o FALSE."
      },
      {
        "id": "analisis-de-datos/google-sheets/operadores-y-formulas/concatenacion-con",
        "label": "Concatenación con &",
        "description": "Une texto y valores en una cadena."
      },
      {
        "id": "analisis-de-datos/google-sheets/operadores-y-formulas/porcentajes",
        "label": "Porcentajes",
        "description": "Un porcentaje es una proporción; 20% equivale a 0.2."
      }
    ]
  },
  {
    "key": "agregacion",
    "label": "Agregación",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/agregacion/definicion",
        "label": "Definición",
        "description": "Resume varios valores en uno, como una suma o una media."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/sum",
        "label": "SUM",
        "description": "Suma los valores numéricos del rango."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/average",
        "label": "AVERAGE",
        "description": "Divide la suma por el número de valores numéricos."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/count",
        "label": "COUNT",
        "description": "Cuenta las celdas con números, incluidas fechas numéricas."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/counta",
        "label": "COUNTA",
        "description": "Cuenta valores presentes, incluidos textos y fórmulas que producen cadena vacía."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/countblank",
        "label": "COUNTBLANK",
        "description": "Cuenta celdas vacías y cadenas de longitud cero."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/countunique",
        "label": "COUNTUNIQUE",
        "description": "Cuenta valores diferentes; filtra vacíos cuando no deban ser una categoría."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/min-y-max",
        "label": "MIN y MAX",
        "description": "Devuelven el menor y mayor número."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/product-y-sumsq",
        "label": "PRODUCT y SUMSQ",
        "description": "PRODUCT multiplica valores; SUMSQ suma sus cuadrados."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/sumproduct",
        "label": "SUMPRODUCT",
        "description": "Multiplica elementos de rangos compatibles y suma los productos."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/average-weighted",
        "label": "AVERAGE.WEIGHTED",
        "description": "Calcula una media dando a cada valor su peso."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregacion/subtotal",
        "label": "SUBTOTAL",
        "description": "Resume un rango ignorando filas excluidas por un filtro; los códigos 101–111 ignoran también filas ocultas manualmente."
      }
    ]
  },
  {
    "key": "agregaciones-con-condiciones",
    "label": "Agregaciones con condiciones",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/definicion",
        "label": "Definición",
        "description": "Calculan un resumen solo de filas que cumplen criterios."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/sumif-y-sumifs",
        "label": "SUMIF y SUMIFS",
        "description": "SUMIF usa un criterio; SUMIFS combina varios con AND."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/countif-y-countifs",
        "label": "COUNTIF y COUNTIFS",
        "description": "Cuentan las filas que cumplen uno o varios criterios."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/averageif-y-averageifs",
        "label": "AVERAGEIF y AVERAGEIFS",
        "description": "Promedian valores de filas que cumplen condiciones."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/minifs-y-maxifs",
        "label": "MINIFS y MAXIFS",
        "description": "Obtienen extremos entre las filas elegibles."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/countuniqueifs",
        "label": "COUNTUNIQUEIFS",
        "description": "Cuenta valores distintos restringidos por criterios."
      },
      {
        "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/criterios-con-operadores-y-comodines",
        "label": "Criterios con operadores y comodines",
        "description": "Los criterios pueden combinar operadores, referencias, * para varios caracteres y ? para uno."
      }
    ]
  },
  {
    "key": "funciones-logicas",
    "label": "Funciones lógicas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/definicion",
        "label": "Definición",
        "description": "Evalúan condiciones para decidir qué valor mostrar."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/if",
        "label": "IF",
        "description": "Devuelve un valor si la condición es verdadera y otro si es falsa."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/ifs",
        "label": "IFS",
        "description": "Evalúa condiciones en orden y devuelve el valor de la primera verdadera."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/switch",
        "label": "SWITCH",
        "description": "Compara una expresión con varios valores exactos."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/and-or-not-xor",
        "label": "AND OR NOT XOR",
        "description": "AND requiere todas, OR alguna, NOT invierte, XOR indica paridad impar de condiciones verdaderas."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-logicas/true-y-false",
        "label": "TRUE y FALSE",
        "description": "Son valores booleanos, no cadenas de texto."
      }
    ]
  },
  {
    "key": "vacios-errores-y-diagnostico",
    "label": "Vacíos, errores y diagnóstico",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/definicion",
        "label": "Definición",
        "description": "Distingue datos ausentes, tipos incorrectos y fallas de cálculo."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/isblank",
        "label": "ISBLANK",
        "description": "Comprueba si una celda está realmente vacía."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/isnumber-e-istext",
        "label": "ISNUMBER e ISTEXT",
        "description": "Comprueban tipos de valores."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/iferror",
        "label": "IFERROR",
        "description": "Reemplaza cualquier error de una expresión."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/ifna-e-isna",
        "label": "IFNA e ISNA",
        "description": "IFNA reemplaza exclusivamente #N/A; ISNA lo detecta."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/iserror-y-error-type",
        "label": "ISERROR y ERROR.TYPE",
        "description": "ISERROR detecta errores; ERROR.TYPE identifica su categoría."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/errores-frecuentes",
        "label": "Errores frecuentes",
        "description": "#N/A indica ausencia; #REF! referencia inválida o salida bloqueada; #VALUE! tipo incorrecto; #DIV/0! división inválida; #NAME? nombre desconocido."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/type-e-isformula",
        "label": "TYPE e ISFORMULA",
        "description": "TYPE devuelve un código del tipo de dato; ISFORMULA comprueba si una celda contiene una fórmula."
      },
      {
        "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/formulatext-isref-y-cell",
        "label": "FORMULATEXT, ISREF y CELL",
        "description": "Permiten inspeccionar expresiones, referencias válidas y metadatos de una celda."
      }
    ]
  },
  {
    "key": "busqueda-y-referencia",
    "label": "Búsqueda y referencia",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/definicion",
        "label": "Definición",
        "description": "Recupera información de otra tabla usando una clave, como un JOIN de consulta."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/vlookup",
        "label": "VLOOKUP",
        "description": "Busca en la primera columna del rango y devuelve una columna a la derecha."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/hlookup",
        "label": "HLOOKUP",
        "description": "Busca horizontalmente en la primera fila y devuelve otra fila."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/xlookup",
        "label": "XLOOKUP",
        "description": "Busca en un rango y devuelve el elemento correspondiente de otro rango."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/index",
        "label": "INDEX",
        "description": "Recupera un valor por número de fila y columna dentro de un rango."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/match-y-xmatch",
        "label": "MATCH y XMATCH",
        "description": "Devuelven la posición de una coincidencia; XMATCH usa exacta por defecto."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/index-y-match",
        "label": "INDEX y MATCH",
        "description": "Combina posición de una clave con extracción de un valor."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/lookup-y-coincidencia-aproximada",
        "label": "LOOKUP y coincidencia aproximada",
        "description": "Encuentra el valor asociado al umbral inferior en un rango ordenado."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/choose",
        "label": "CHOOSE",
        "description": "Selecciona una opción según su índice numérico."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/offset-e-indirect",
        "label": "OFFSET e INDIRECT",
        "description": "OFFSET desplaza una referencia; INDIRECT interpreta texto como dirección."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/row-column-rows-columns",
        "label": "ROW COLUMN ROWS COLUMNS",
        "description": "ROW y COLUMN indican posición; ROWS y COLUMNS cuentan dimensiones."
      },
      {
        "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/address",
        "label": "ADDRESS",
        "description": "Construye una referencia como texto."
      }
    ]
  },
  {
    "key": "texto",
    "label": "Texto",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/texto/definicion",
        "label": "Definición",
        "description": "Las funciones de texto extraen y transforman cadenas."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/left-right-mid",
        "label": "LEFT RIGHT MID",
        "description": "Extraen caracteres del inicio, final o posición indicada."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/len",
        "label": "LEN",
        "description": "Cuenta caracteres incluidos espacios."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/trim-y-clean",
        "label": "TRIM y CLEAN",
        "description": "TRIM ajusta espacios normales; CLEAN elimina caracteres de control ASCII no imprimibles."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/upper-lower-proper",
        "label": "UPPER LOWER PROPER",
        "description": "Cambian mayúsculas, minúsculas o capitalización de palabras."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/find-y-search",
        "label": "FIND y SEARCH",
        "description": "Devuelven la posición de un fragmento; FIND distingue mayúsculas, SEARCH no."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/replace-y-substitute",
        "label": "REPLACE y SUBSTITUTE",
        "description": "REPLACE cambia por posición; SUBSTITUTE por coincidencia textual."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/concat-y-concatenate",
        "label": "CONCAT y CONCATENATE",
        "description": "CONCAT une dos valores; CONCATENATE puede unir varios."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/textjoin-y-join",
        "label": "TEXTJOIN y JOIN",
        "description": "Unen elementos con delimitador; TEXTJOIN permite ignorar vacíos."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/split",
        "label": "SPLIT",
        "description": "Divide texto por un delimitador y devuelve columnas."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/exact",
        "label": "EXACT",
        "description": "Compara texto distinguiendo mayúsculas."
      },
      {
        "id": "analisis-de-datos/google-sheets/texto/char-code-rept-t",
        "label": "CHAR CODE REPT T",
        "description": "CHAR convierte código en carácter, CODE hace lo inverso, REPT repite texto y T devuelve texto o cadena vacía."
      }
    ]
  },
  {
    "key": "conversiones",
    "label": "Conversiones",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/conversiones/definicion",
        "label": "Definición",
        "description": "Transforman un valor entre representaciones numéricas y textuales."
      },
      {
        "id": "analisis-de-datos/google-sheets/conversiones/value",
        "label": "VALUE",
        "description": "Interpreta texto según los formatos reconocidos por la región."
      },
      {
        "id": "analisis-de-datos/google-sheets/conversiones/text-y-to-text",
        "label": "TEXT y TO_TEXT",
        "description": "TEXT aplica un patrón y devuelve texto; TO_TEXT convierte a texto sin elegir patrón explícito."
      },
      {
        "id": "analisis-de-datos/google-sheets/conversiones/to-pure-number-y-n",
        "label": "TO_PURE_NUMBER y N",
        "description": "TO_PURE_NUMBER elimina formato de valores numéricos; N convierte números y booleanos, entre otros tipos, a números."
      },
      {
        "id": "analisis-de-datos/google-sheets/conversiones/conversion-de-separadores-regionales",
        "label": "Conversión de separadores regionales",
        "description": "Si el texto importado usa separadores distintos a los del archivo, normalízalos antes de VALUE."
      }
    ]
  },
  {
    "key": "expresiones-regulares",
    "label": "Expresiones regulares",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/expresiones-regulares/definicion",
        "label": "Definición",
        "description": "Las expresiones regulares describen patrones de texto; Sheets usa RE2."
      },
      {
        "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexmatch",
        "label": "REGEXMATCH",
        "description": "Devuelve si un texto cumple un patrón."
      },
      {
        "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexextract",
        "label": "REGEXEXTRACT",
        "description": "Extrae la primera coincidencia o los grupos de captura."
      },
      {
        "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexreplace",
        "label": "REGEXREPLACE",
        "description": "Sustituye coincidencias del patrón."
      }
    ]
  },
  {
    "key": "funciones-numericas",
    "label": "Funciones numéricas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/definicion",
        "label": "Definición",
        "description": "Transforman cifras y controlan precisión matemática."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/round-roundup-rounddown",
        "label": "ROUND ROUNDUP ROUNDDOWN",
        "description": "Redondean al más cercano, lejos de cero o hacia cero, respectivamente."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/ceiling-y-floor",
        "label": "CEILING y FLOOR",
        "description": "Ajustan a múltiplos superiores o inferiores para números positivos."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/int-y-trunc",
        "label": "INT y TRUNC",
        "description": "INT redondea hacia menos infinito; TRUNC elimina decimales hacia cero."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/abs-y-mod",
        "label": "ABS y MOD",
        "description": "ABS devuelve magnitud; MOD devuelve residuo de división."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/power-y-sqrt",
        "label": "POWER y SQRT",
        "description": "Calculan potencia y raíz cuadrada."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/iseven-e-isodd",
        "label": "ISEVEN e ISODD",
        "description": "Comprueban si un entero es par o impar."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-numericas/rand-y-randbetween",
        "label": "RAND y RANDBETWEEN",
        "description": "Generan valores aleatorios, continuo entre 0 y 1 o entero en un intervalo inclusivo."
      }
    ]
  },
  {
    "key": "fechas-y-horas",
    "label": "Fechas y horas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/definicion",
        "label": "Definición",
        "description": "Las fechas reales permiten filtrar, agrupar, calcular duraciones y comparar periodos."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/today-y-now",
        "label": "TODAY y NOW",
        "description": "Devuelven la fecha actual o fecha y hora actuales según la zona del archivo."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/date-y-datevalue",
        "label": "DATE y DATEVALUE",
        "description": "DATE construye fecha con componentes numéricos; DATEVALUE interpreta una cadena reconocida."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/year-month-day",
        "label": "YEAR MONTH DAY",
        "description": "Extraen año, mes y día de una fecha."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/time-hour-minute-second",
        "label": "TIME HOUR MINUTE SECOND",
        "description": "TIME construye una hora; las otras funciones extraen sus componentes."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/weekday-weeknum-isoweeknum",
        "label": "WEEKDAY WEEKNUM ISOWEEKNUM",
        "description": "Devuelven día de semana o número de semana; ISOWEEKNUM sigue ISO 8601."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/days-y-datedif",
        "label": "DAYS y DATEDIF",
        "description": "DAYS calcula diferencia en días; DATEDIF puede contar unidades completas entre fechas."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/edate-y-eomonth",
        "label": "EDATE y EOMONTH",
        "description": "Desplazan meses o devuelven el último día del mes desplazado."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/networkdays-y-workday",
        "label": "NETWORKDAYS y WORKDAY",
        "description": "Calculan días hábiles o desplazan una fecha por días laborales; permiten festivos."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/yearfrac",
        "label": "YEARFRAC",
        "description": "Expresa la fracción de año entre dos fechas según una convención de días."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/periodos-mensuales",
        "label": "Periodos mensuales",
        "description": "Normaliza cada fecha al inicio de su mes para agrupar sin mezclar años."
      },
      {
        "id": "analisis-de-datos/google-sheets/fechas-y-horas/rangos-de-fechas",
        "label": "Rangos de fechas",
        "description": "Usa inicio incluido y fin excluido para cubrir periodos completos, incluso horas."
      }
    ]
  },
  {
    "key": "ordenar-y-filtrar",
    "label": "Ordenar y filtrar",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/definicion",
        "label": "Definición",
        "description": "Ordenar cambia la posición de filas; filtrar muestra un subconjunto sin borrar el resto."
      },
      {
        "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/ordenamiento-de-rango",
        "label": "Ordenamiento de rango",
        "description": "Ordena datos según una o varias columnas y conserva las relaciones entre celdas."
      },
      {
        "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/vistas-de-filtro",
        "label": "Vistas de filtro",
        "description": "Guardan un filtro u orden personal sin imponerlo a colaboradores."
      },
      {
        "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/congelar-y-agrupar",
        "label": "Congelar y agrupar",
        "description": "Congelar conserva encabezados a la vista; agrupar filas o columnas permite plegarlas."
      }
    ]
  },
  {
    "key": "arrays-y-expansion",
    "label": "Arrays y expansión",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/definicion",
        "label": "Definición",
        "description": "Un array contiene varios valores y puede ocupar más de una celda como resultado de una fórmula."
      },
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/literales-de-arrays",
        "label": "Literales de arrays",
        "description": "Con la región indicada, la coma separa columnas y el punto y coma filas."
      },
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/arrayformula",
        "label": "ARRAYFORMULA",
        "description": "Permite aplicar ciertas expresiones a rangos y expandir resultados."
      },
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/sequence",
        "label": "SEQUENCE",
        "description": "Genera números consecutivos con filas, columnas, inicio y paso."
      },
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/transpose",
        "label": "TRANSPOSE",
        "description": "Intercambia filas y columnas."
      },
      {
        "id": "analisis-de-datos/google-sheets/arrays-y-expansion/errores-de-expansion",
        "label": "Errores de expansión",
        "description": "Si una fórmula de matriz necesita celdas ocupadas, puede producir #REF!."
      }
    ]
  },
  {
    "key": "filter-sort-unique",
    "label": "FILTER SORT UNIQUE",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/definicion",
        "label": "Definición",
        "description": "Generan tablas derivadas que se actualizan cuando cambia el origen."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/filter",
        "label": "FILTER",
        "description": "Devuelve filas o columnas que cumplen condiciones booleanas."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/sort",
        "label": "SORT",
        "description": "Ordena una salida por índice de columna o rango de ordenación."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/sortn",
        "label": "SORTN",
        "description": "Devuelve los primeros n registros según el orden y el tratamiento de empates."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/unique",
        "label": "UNIQUE",
        "description": "Elimina filas duplicadas en el resultado; con varios campos considera la fila completa."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/unique-exactamente-una-vez",
        "label": "UNIQUE exactamente una vez",
        "description": "El tercer argumento TRUE devuelve valores que solo aparecen una vez."
      },
      {
        "id": "analisis-de-datos/google-sheets/filter-sort-unique/combinacion-de-funciones",
        "label": "Combinación de funciones",
        "description": "Puedes filtrar, deduplicar y ordenar la salida en una expresión."
      }
    ]
  },
  {
    "key": "manipulacion-de-matrices",
    "label": "Manipulación de matrices",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/definicion",
        "label": "Definición",
        "description": "Las funciones de matrices apilan, seleccionan o reorganizan bloques sin copiar manualmente."
      },
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/vstack-y-hstack",
        "label": "VSTACK y HSTACK",
        "description": "Apilan rangos vertical u horizontalmente."
      },
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/tocol-torow-flatten",
        "label": "TOCOL TOROW FLATTEN",
        "description": "TOCOL y TOROW convierten una matriz en una columna o fila; FLATTEN apila elementos por filas."
      },
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/choosecols-y-chooserows",
        "label": "CHOOSECOLS y CHOOSEROWS",
        "description": "Seleccionan posiciones concretas de columnas o filas."
      },
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/array-constrain",
        "label": "ARRAY_CONSTRAIN",
        "description": "Limita el tamaño de una salida a un número de filas y columnas."
      },
      {
        "id": "analisis-de-datos/google-sheets/manipulacion-de-matrices/wraprows-y-wrapcols",
        "label": "WRAPROWS y WRAPCOLS",
        "description": "Reorganizan una fila o columna en bloques de tamaño fijo."
      }
    ]
  },
  {
    "key": "let-y-lambda",
    "label": "LET y LAMBDA",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/definicion",
        "label": "Definición",
        "description": "LET nombra resultados intermedios; LAMBDA define cálculos parametrizados."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/let",
        "label": "LET",
        "description": "Asigna nombres locales a expresiones dentro de una fórmula."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/lambda",
        "label": "LAMBDA",
        "description": "Define una función con parámetros y una expresión; se puede invocar directamente o desde funciones auxiliares."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/map",
        "label": "MAP",
        "description": "Aplica una LAMBDA a cada valor o combinación de valores de arrays alineados."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/reduce",
        "label": "REDUCE",
        "description": "Recorre un array y actualiza un acumulador hasta producir un resultado final."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/scan",
        "label": "SCAN",
        "description": "Devuelve cada resultado intermedio del acumulador."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/byrow-y-bycol",
        "label": "BYROW y BYCOL",
        "description": "Aplican una LAMBDA a cada fila o columna de una matriz."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/makearray",
        "label": "MAKEARRAY",
        "description": "Crea una matriz calculando cada posición con una LAMBDA de fila y columna."
      },
      {
        "id": "analisis-de-datos/google-sheets/let-y-lambda/named-functions",
        "label": "Named Functions",
        "description": "Guardan una fórmula reutilizable con nombre y argumentos definidos desde la interfaz."
      }
    ]
  },
  {
    "key": "query",
    "label": "QUERY",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/query/definicion",
        "label": "Definición",
        "description": "QUERY consulta una tabla mediante el lenguaje de Google Visualization."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/select-y-columnas",
        "label": "SELECT y columnas",
        "description": "Selecciona columnas por identificador, no necesariamente por encabezado visible."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/where",
        "label": "WHERE",
        "description": "Filtra según comparaciones, operadores lógicos y valores."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/fechas-en-query",
        "label": "Fechas en QUERY",
        "description": "Los literales de fecha se escriben date 'yyyy-mm-dd'."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/group-by-y-agregaciones",
        "label": "GROUP BY y agregaciones",
        "description": "Agrupa filas y calcula sum, avg, count, min o max."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/order-by-limit-offset",
        "label": "ORDER BY LIMIT OFFSET",
        "description": "Ordena, limita y omite filas del resultado."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/pivot",
        "label": "PIVOT",
        "description": "Convierte valores distintos de una columna en columnas agregadas."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/label-y-format",
        "label": "LABEL y FORMAT",
        "description": "LABEL cambia encabezados y FORMAT cambia representación visual en la salida."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/patrones-y-nulos",
        "label": "Patrones y nulos",
        "description": "WHERE admite contains, starts with, ends with, matches, like e is null."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/parametros-dinamicos",
        "label": "Parámetros dinámicos",
        "description": "Puedes construir el texto de la consulta a partir de celdas; valida entradas de usuario."
      },
      {
        "id": "analisis-de-datos/google-sheets/query/tipos-y-limites-de-query",
        "label": "Tipos y límites de QUERY",
        "description": "No es SQL completo: no tiene JOIN, HAVING, DISTINCT ni funciones de ventana; en columnas mixtas el tipo mayoritario determina el tipo y los valores minoritarios se tratan como nulos."
      }
    ]
  },
  {
    "key": "funciones-de-base-de-datos",
    "label": "Funciones de base de datos",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/definicion",
        "label": "Definición",
        "description": "Las funciones D* resumen registros de una tabla con encabezados según un rango de criterios."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dsum-y-daverage",
        "label": "DSUM y DAVERAGE",
        "description": "Suman o promedian un campo de los registros filtrados."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dcount-y-dcounta",
        "label": "DCOUNT y DCOUNTA",
        "description": "Cuentan valores numéricos o no vacíos en un campo de registros filtrados."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dmin-y-dmax",
        "label": "DMIN y DMAX",
        "description": "Devuelven extremos de un campo filtrado."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/dget",
        "label": "DGET",
        "description": "Extrae un valor cuando exactamente un registro satisface el criterio."
      },
      {
        "id": "analisis-de-datos/google-sheets/funciones-de-base-de-datos/criterios-and-y-or",
        "label": "Criterios AND y OR",
        "description": "En el rango de criterios, una fila combina columnas con AND; varias filas representan OR."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "Describe centro, dispersión, posición y distribución de datos."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/median-y-mode",
        "label": "MEDIAN y MODE",
        "description": "MEDIAN encuentra el centro ordenado; MODE el valor más frecuente."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/stdev-s-stdev-p-var-s-var-p",
        "label": "STDEV.S STDEV.P VAR.S VAR.P",
        "description": "Miden dispersión muestral o poblacional; varianza usa unidades al cuadrado."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/percentile-y-quartile",
        "label": "PERCENTILE y QUARTILE",
        "description": "Calculan umbrales de posición interpolando valores."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/rank-rank-eq-rank-avg",
        "label": "RANK RANK.EQ RANK.AVG",
        "description": "Asignan posición; RANK.EQ comparte el mejor puesto en empates y RANK.AVG promedia posiciones empatadas."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/large-y-small",
        "label": "LARGE y SMALL",
        "description": "Devuelven el k-ésimo mayor o menor valor, incluyendo empates."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/frequency",
        "label": "FREQUENCY",
        "description": "Cuenta observaciones por límites superiores de intervalos y agrega un intervalo final."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/valores-atipicos-e-iqr",
        "label": "Valores atípicos e IQR",
        "description": "El rango intercuartílico Q3−Q1 permite definir límites orientativos de valores atípicos."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-descriptiva/promedio-movil",
        "label": "Promedio móvil",
        "description": "Promedia una ventana de observaciones consecutivas."
      }
    ]
  },
  {
    "key": "estadistica-y-pronostico",
    "label": "Estadística y pronóstico",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/definicion",
        "label": "Definición",
        "description": "Las funciones estadísticas permiten medir relación, ajustar tendencias y evaluar evidencia bajo supuestos."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/correl-y-covariance",
        "label": "CORREL y COVARIANCE",
        "description": "CORREL mide asociación lineal normalizada; COVARIANCE.P y COVARIANCE.S miden covariación."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/slope-intercept-rsq",
        "label": "SLOPE INTERCEPT RSQ",
        "description": "Obtienen pendiente, intercepto y coeficiente de determinación de una regresión lineal simple."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/forecast-y-trend",
        "label": "FORECAST y TREND",
        "description": "Proyectan valores suponiendo una relación lineal estimada."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/linest",
        "label": "LINEST",
        "description": "Devuelve coeficientes de regresión lineal y opcionalmente estadísticas adicionales."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/t-test",
        "label": "T.TEST",
        "description": "Devuelve un valor p de una prueba t según colas y tipo de muestra."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/z-test",
        "label": "Z.TEST",
        "description": "Devuelve la probabilidad unilateral de una prueba z sobre la media."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/chisq-test",
        "label": "CHISQ.TEST",
        "description": "Compara frecuencias observadas con esperadas y devuelve valor p."
      },
      {
        "id": "analisis-de-datos/google-sheets/estadistica-y-pronostico/intervalos-de-confianza",
        "label": "Intervalos de confianza",
        "description": "CONFIDENCE.T y CONFIDENCE.NORM calculan márgenes de error bajo supuestos diferentes."
      }
    ]
  },
  {
    "key": "matrices-matematicas",
    "label": "Matrices matemáticas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/matrices-matematicas/definicion",
        "label": "Definición",
        "description": "Operaciones de álgebra lineal sobre arreglos numéricos."
      },
      {
        "id": "analisis-de-datos/google-sheets/matrices-matematicas/mmult",
        "label": "MMULT",
        "description": "Multiplica matrices; columnas de la primera deben igualar filas de la segunda."
      },
      {
        "id": "analisis-de-datos/google-sheets/matrices-matematicas/mdeterm-y-minverse",
        "label": "MDETERM y MINVERSE",
        "description": "Calculan determinante e inversa de una matriz cuadrada."
      }
    ]
  },
  {
    "key": "calidad-y-limpieza-de-datos",
    "label": "Calidad y limpieza de datos",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/definicion",
        "label": "Definición",
        "description": "Detecta duplicados, vacíos, tipos incorrectos e inconsistencias antes de calcular indicadores."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/detectar-duplicados",
        "label": "Detectar duplicados",
        "description": "Cuenta apariciones de una clave de negocio para marcar repeticiones."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/eliminar-duplicados",
        "label": "Eliminar duplicados",
        "description": "La herramienta de limpieza modifica el rango y conserva un registro por combinación seleccionada."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/normalizacion-de-claves",
        "label": "Normalización de claves",
        "description": "Ajusta tipo, espacios y caso antes de buscar o agrupar."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/dividir-texto-y-sugerencias-de-limpieza",
        "label": "Dividir texto y sugerencias de limpieza",
        "description": "Las herramientas visuales detectan inconsistencias o separan campos por delimitador."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/reconciliacion",
        "label": "Reconciliación",
        "description": "Compara claves y totales entre tablas para encontrar diferencias."
      },
      {
        "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/granularidad-y-doble-conteo",
        "label": "Granularidad y doble conteo",
        "description": "Define qué representa una fila antes de combinar fuentes."
      }
    ]
  },
  {
    "key": "tablas-estructuradas",
    "label": "Tablas estructuradas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/tablas-estructuradas/definicion",
        "label": "Definición",
        "description": "Las tablas de Sheets organizan rangos con encabezados, tipos de columna y referencias por nombre."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-estructuradas/referencias-de-tabla",
        "label": "Referencias de tabla",
        "description": "Permiten referir una columna por nombre en vez de coordenadas fijas."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-estructuradas/tipos-de-columna-y-vistas",
        "label": "Tipos de columna y vistas",
        "description": "Los tipos ayudan a identificar entradas inconsistentes; las vistas permiten filtrar o agrupar sin modificar la tabla base."
      }
    ]
  },
  {
    "key": "tablas-dinamicas",
    "label": "Tablas dinámicas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/definicion",
        "label": "Definición",
        "description": "Resumen interactivo que agrupa registros por dimensiones y calcula métricas sin escribir fórmulas."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/filas-columnas-valores-filtros",
        "label": "Filas columnas valores filtros",
        "description": "Filas y columnas son dimensiones, valores son agregaciones, filtros limitan registros."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/agrupar-fechas",
        "label": "Agrupar fechas",
        "description": "Agrupa fechas reales por año, mes u otros periodos desde la tabla dinámica."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/porcentajes-y-campos-calculados",
        "label": "Porcentajes y campos calculados",
        "description": "La opción Mostrar como transforma agregados en porcentajes; un campo calculado permite derivar métricas."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/getpivotdata",
        "label": "GETPIVOTDATA",
        "description": "Extrae un agregado de una tabla dinámica por campos y elementos."
      },
      {
        "id": "analisis-de-datos/google-sheets/tablas-dinamicas/segmentadores",
        "label": "Segmentadores",
        "description": "Filtran tablas dinámicas y gráficos compatibles que comparten datos."
      }
    ]
  },
  {
    "key": "visualizacion",
    "label": "Visualización",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/definicion",
        "label": "Definición",
        "description": "Los gráficos representan comparaciones, tendencias y distribuciones."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/barras-y-columnas",
        "label": "Barras y columnas",
        "description": "Comparan magnitudes entre categorías."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/lineas",
        "label": "Líneas",
        "description": "Representan evolución de una métrica ordenada en el tiempo."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/dispersion-e-histogramas",
        "label": "Dispersión e histogramas",
        "description": "Dispersión compara pares numéricos; histograma cuenta observaciones por intervalos."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/graficos-combinados-y-ejes",
        "label": "Gráficos combinados y ejes",
        "description": "Combinan series de distinto tipo y permiten un eje secundario si unidades difieren."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/sparkline",
        "label": "SPARKLINE",
        "description": "Dibuja un gráfico compacto dentro de una celda."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/formato-condicional",
        "label": "Formato condicional",
        "description": "Cambia apariencia según una condición, sin alterar el valor."
      },
      {
        "id": "analisis-de-datos/google-sheets/visualizacion/escalas-de-color",
        "label": "Escalas de color",
        "description": "Representan magnitudes relativas mediante colores."
      }
    ]
  },
  {
    "key": "validacion-y-control",
    "label": "Validación y control",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/validacion-y-control/definicion",
        "label": "Definición",
        "description": "Controla entradas, protege fórmulas y conserva consistencia."
      },
      {
        "id": "analisis-de-datos/google-sheets/validacion-y-control/listas-desplegables",
        "label": "Listas desplegables",
        "description": "Ofrecen opciones predefinidas o tomadas de un rango."
      },
      {
        "id": "analisis-de-datos/google-sheets/validacion-y-control/checkboxes",
        "label": "Checkboxes",
        "description": "Representan estados booleanos o valores personalizados."
      },
      {
        "id": "analisis-de-datos/google-sheets/validacion-y-control/validacion-personalizada",
        "label": "Validación personalizada",
        "description": "Una fórmula booleana establece criterios más específicos."
      },
      {
        "id": "analisis-de-datos/google-sheets/validacion-y-control/proteccion-de-hojas-y-rangos",
        "label": "Protección de hojas y rangos",
        "description": "Limita quién puede editar rangos o muestra advertencias."
      }
    ]
  },
  {
    "key": "colaboracion-y-auditoria",
    "label": "Colaboración y auditoría",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/definicion",
        "label": "Definición",
        "description": "Sheets permite trabajo simultáneo, comentarios, versiones y permisos de archivo."
      },
      {
        "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/permisos-y-acceso-externo",
        "label": "Permisos y acceso externo",
        "description": "Lector, comentarista y editor tienen capacidades distintas; acceso general puede ampliar exposición."
      },
      {
        "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/historial-de-versiones",
        "label": "Historial de versiones",
        "description": "Permite revisar cambios y restaurar versiones anteriores."
      },
      {
        "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/comentarios-y-notas",
        "label": "Comentarios y notas",
        "description": "Comentarios permiten conversaciones y asignación según permisos; notas añaden información local a la celda."
      },
      {
        "id": "analisis-de-datos/google-sheets/colaboracion-y-auditoria/auditoria-de-formulas",
        "label": "Auditoría de fórmulas",
        "description": "Inspecciona fórmulas, dependencias y resultados anómalos mediante barra de fórmulas, FORMULATEXT y búsqueda."
      }
    ]
  },
  {
    "key": "metricas-de-negocio",
    "label": "Métricas de negocio",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/definicion",
        "label": "Definición",
        "description": "Una métrica convierte datos en una medida útil para tomar decisiones."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/ingresos-costos-y-utilidad",
        "label": "Ingresos costos y utilidad",
        "description": "Utilidad bruta es ingreso menos costo de mercancía para las mismas ventas."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/margen-y-markup",
        "label": "Margen y markup",
        "description": "Margen divide utilidad por ingresos; markup divide utilidad por costo."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/ticket-promedio",
        "label": "Ticket promedio",
        "description": "Divide ingresos entre cantidad de pedidos elegibles."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/tasas-y-ratios",
        "label": "Tasas y ratios",
        "description": "Dividen un numerador por una base definida; el formato porcentaje solo cambia presentación."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/conversion-y-funnel",
        "label": "Conversión y funnel",
        "description": "Mide avance entre etapas de una población de eventos o usuarios."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/crecimiento-mom-qoq-yoy",
        "label": "Crecimiento MoM QoQ YoY",
        "description": "Compara una métrica con el mes, trimestre o año anterior mediante actual/anterior−1."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/segmentacion",
        "label": "Segmentación",
        "description": "Divide registros en grupos útiles para el análisis según reglas definidas."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/retencion-y-churn",
        "label": "Retención y churn",
        "description": "Retención mide cuántos integrantes de una cohorte siguen activos; churn mide bajas de esa cohorte."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/cohortes",
        "label": "Cohortes",
        "description": "Agrupa personas según un evento de entrada y mide resultados en periodos posteriores."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/pareto",
        "label": "Pareto",
        "description": "Ordena contribuciones de mayor a menor y calcula su proporción acumulada."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/presupuesto-y-variaciones",
        "label": "Presupuesto y variaciones",
        "description": "Compara valores reales con objetivos en importe y porcentaje."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/escenarios-y-punto-de-equilibrio",
        "label": "Escenarios y punto de equilibrio",
        "description": "Cambia supuestos controlados para estimar resultados alternativos; equilibrio cubre costos totales."
      },
      {
        "id": "analisis-de-datos/google-sheets/metricas-de-negocio/kpis-y-dashboards",
        "label": "KPIs y dashboards",
        "description": "Un tablero combina indicadores definidos, dimensiones, filtros y series para supervisar resultados."
      }
    ]
  },
  {
    "key": "finanzas",
    "label": "Finanzas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/finanzas/definicion",
        "label": "Definición",
        "description": "Las funciones financieras modelan dinero a través del tiempo con flujos y tasas."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/pv-fv-pmt",
        "label": "PV FV PMT",
        "description": "PV y FV calculan valor presente y futuro; PMT calcula pago periódico."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/rate",
        "label": "RATE",
        "description": "Estima la tasa periódica que hace compatibles los flujos."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/npv-e-irr",
        "label": "NPV e IRR",
        "description": "NPV descuenta flujos al final de periodos regulares; IRR estima la tasa que hace su valor presente neto cero."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/xnpv-y-xirr",
        "label": "XNPV y XIRR",
        "description": "Descuentan y calculan rentabilidad usando fechas explícitas para flujos irregulares."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/roi-y-depreciacion",
        "label": "ROI y depreciación",
        "description": "ROI relaciona ganancia con inversión; SLN distribuye depreciación lineal sobre vida útil."
      },
      {
        "id": "analisis-de-datos/google-sheets/finanzas/sensibilidad-y-goal-seek",
        "label": "Sensibilidad y Goal Seek",
        "description": "La sensibilidad compara resultados para distintos supuestos; Goal Seek busca un valor de entrada para alcanzar una meta."
      }
    ]
  },
  {
    "key": "importacion-y-fuentes-externas",
    "label": "Importación y fuentes externas",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/definicion",
        "label": "Definición",
        "description": "Sheets puede importar archivos, leer hojas externas y conectar datos de servicios."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/csv-tsv-xlsx",
        "label": "CSV TSV XLSX",
        "description": "CSV y TSV son texto delimitado; XLSX conserva estructura y fórmulas con posibles incompatibilidades."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importrange",
        "label": "IMPORTRANGE",
        "description": "Trae un rango de otro archivo de Sheets autorizado."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importdata",
        "label": "IMPORTDATA",
        "description": "Lee datos CSV o TSV de una URL accesible por Sheets."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importhtml",
        "label": "IMPORTHTML",
        "description": "Extrae una tabla o lista HTML por índice."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importxml",
        "label": "IMPORTXML",
        "description": "Extrae contenido HTML/XML mediante XPath."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/importfeed",
        "label": "IMPORTFEED",
        "description": "Importa elementos o metadatos de una fuente RSS o Atom."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/googlefinance",
        "label": "GOOGLEFINANCE",
        "description": "Consulta determinados datos financieros actuales o históricos."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/google-forms",
        "label": "Google Forms",
        "description": "Puede enviar respuestas a una hoja de cálculo vinculada."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/connected-sheets-y-bigquery",
        "label": "Connected Sheets y BigQuery",
        "description": "Permiten explorar conjuntos de datos de BigQuery desde Sheets sin importar necesariamente todas las filas."
      },
      {
        "id": "analisis-de-datos/google-sheets/importacion-y-fuentes-externas/looker-studio",
        "label": "Looker Studio",
        "description": "Consume hojas de cálculo como fuentes para reportes interactivos."
      }
    ]
  },
  {
    "key": "rendimiento-y-calculo",
    "label": "Rendimiento y cálculo",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/definicion",
        "label": "Definición",
        "description": "El tiempo de recálculo depende de rangos, dependencias, funciones externas y tamaño del archivo."
      },
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/rangos-abiertos-y-dependencias",
        "label": "Rangos abiertos y dependencias",
        "description": "Referencias de columna completa pueden procesar muchas celdas; cadenas largas introducen dependencias."
      },
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/funciones-volatiles",
        "label": "Funciones volátiles",
        "description": "NOW, TODAY, RAND y RANDBETWEEN pueden recalcularse y propagar cambios."
      },
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/referencias-circulares",
        "label": "Referencias circulares",
        "description": "Una fórmula circular depende de sí misma directa o indirectamente."
      },
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/calculo-iterativo-y-recalculo",
        "label": "Cálculo iterativo y recálculo",
        "description": "La configuración permite controlar recálculo y, opcionalmente, iteración de referencias circulares."
      },
      {
        "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/optimizacion-de-importaciones",
        "label": "Optimización de importaciones",
        "description": "Importa rangos pequeños o resultados resumidos en origen; evita dependencias entre muchos archivos."
      }
    ]
  },
  {
    "key": "macros-y-apps-script",
    "label": "Macros y Apps Script",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/definicion",
        "label": "Definición",
        "description": "Apps Script usa JavaScript para automatizar hojas y ampliar su interfaz; las macros registran acciones repetibles."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/macros",
        "label": "Macros",
        "description": "Registran acciones de la interfaz y generan un script reutilizable."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/spreadsheetapp-y-rangos",
        "label": "SpreadsheetApp y rangos",
        "description": "El servicio permite leer y escribir celdas mediante objetos de archivo, hoja y rango."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/escritura-por-lotes",
        "label": "Escritura por lotes",
        "description": "setValues escribe una matriz con las mismas dimensiones que el rango; evita llamadas celda por celda."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/funciones-personalizadas",
        "label": "Funciones personalizadas",
        "description": "Una función JavaScript puede invocarse desde una celda y devolver un valor o matriz."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/triggers-simples",
        "label": "Triggers simples",
        "description": "Funciones como onOpen y onEdit se ejecutan ante eventos definidos y tienen restricciones de autorización."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/triggers-instalables",
        "label": "Triggers instalables",
        "description": "Permiten programar ejecuciones o responder a eventos con la autorización del creador."
      },
      {
        "id": "analisis-de-datos/google-sheets/macros-y-apps-script/apis-externas-desde-script",
        "label": "APIs externas desde script",
        "description": "UrlFetchApp realiza solicitudes HTTP desde Apps Script con autorización según contexto."
      }
    ]
  },
  {
    "key": "google-sheets-api-y-python",
    "label": "Google Sheets API y Python",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/definicion",
        "label": "Definición",
        "description": "La API permite leer o modificar archivos de Sheets desde otros programas con credenciales autorizadas."
      },
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/autenticacion-y-oauth",
        "label": "Autenticación y OAuth",
        "description": "OAuth delega permisos de un usuario; una cuenta de servicio actúa con su propia identidad y necesita acceso al archivo."
      },
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/lectura-y-escritura-de-valores",
        "label": "Lectura y escritura de valores",
        "description": "values.get lee rangos; values.update y append escriben con modo RAW o USER_ENTERED."
      },
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/peticiones-por-lotes",
        "label": "Peticiones por lotes",
        "description": "values.batchUpdate escribe múltiples rangos; spreadsheets.batchUpdate cambia estructura, formatos y otros objetos."
      },
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/cuotas-y-reintentos",
        "label": "Cuotas y reintentos",
        "description": "La API limita solicitudes; ante 429 aplica espera exponencial con variación aleatoria y límite de intentos."
      },
      {
        "id": "analisis-de-datos/google-sheets/google-sheets-api-y-python/gspread-y-pandas",
        "label": "gspread y pandas",
        "description": "gspread facilita acceso a Sheets y pandas permite transformar los registros en DataFrames."
      }
    ]
  },
  {
    "key": "gemini-en-sheets",
    "label": "Gemini en Sheets",
    "children": [
      {
        "id": "analisis-de-datos/google-sheets/gemini-en-sheets/definicion",
        "label": "Definición",
        "description": "Gemini puede asistir en generación de fórmulas, tablas, gráficos y análisis según cuenta, región y edición."
      },
      {
        "id": "analisis-de-datos/google-sheets/gemini-en-sheets/verificacion-de-resultados",
        "label": "Verificación de resultados",
        "description": "Una propuesta de IA puede contener referencias incorrectas o supuestos no declarados."
      }
    ]
  }
];
