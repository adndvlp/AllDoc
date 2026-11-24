// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const powerQueryCurriculum = [
  {
    "key": "power-query-y-etl",
    "label": "Power Query y ETL",
    "children": [
      {
        "id": "analisis-de-datos/power-query/power-query-y-etl/definicion",
        "label": "Definición",
        "description": "Power Query obtiene y transforma datos antes de cargarlos. ETL significa extraer, transformar y cargar."
      },
      {
        "id": "analisis-de-datos/power-query/power-query-y-etl/power-query-m-y-dax",
        "label": "Power Query, M y DAX",
        "description": "M prepara datos; DAX calcula sobre el modelo de Power BI o Power Pivot."
      },
      {
        "id": "analisis-de-datos/power-query/power-query-y-etl/editor-y-vista-previa",
        "label": "Editor y vista previa",
        "description": "El editor muestra las consultas, la vista previa y los pasos aplicados."
      }
    ]
  },
  {
    "key": "obtener-datos-y-conectores",
    "label": "Obtener datos y conectores",
    "children": [
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/definicion",
        "label": "Definición",
        "description": "Un conector obtiene datos de un archivo, servicio o base de datos y devuelve los objetos disponibles."
      },
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/excel",
        "label": "Excel",
        "description": "El conector Excel lee hojas, tablas y rangos con nombre de un libro."
      },
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/csv-y-txt",
        "label": "CSV y TXT",
        "description": "Los archivos delimitados separan campos mediante caracteres como coma, punto y coma o tabulador."
      },
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/sql",
        "label": "SQL",
        "description": "Un conector de base de datos permite navegar tablas y vistas con credenciales autorizadas."
      },
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/json-y-xml",
        "label": "JSON y XML",
        "description": "Los conectores de documentos estructurados conservan listas, registros o tablas que se pueden expandir."
      },
      {
        "id": "analisis-de-datos/power-query/obtener-datos-y-conectores/web-y-sharepoint",
        "label": "Web y SharePoint",
        "description": "Web consulta recursos HTTP; SharePoint dispone de conectores para listas y archivos."
      }
    ]
  },
  {
    "key": "encabezados-y-esquema-inicial",
    "label": "Encabezados y esquema inicial",
    "children": [
      {
        "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/definicion",
        "label": "Definición",
        "description": "El esquema indica nombres y tipos de columnas. Antes de transformar, identifica encabezados, filas útiles y formatos."
      },
      {
        "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/quitar-encabezados-incorrectos",
        "label": "Quitar encabezados incorrectos",
        "description": "La degradación vuelve a colocar los nombres de columnas como primera fila de datos."
      },
      {
        "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/quitar-filas-de-metadatos",
        "label": "Quitar filas de metadatos",
        "description": "Algunos archivos empiezan con títulos o comentarios antes de los datos reales."
      }
    ]
  },
  {
    "key": "lenguaje-m",
    "label": "Lenguaje M",
    "children": [
      {
        "id": "analisis-de-datos/power-query/lenguaje-m/definicion",
        "label": "Definición",
        "description": "M es un lenguaje de expresiones que devuelve valores; los pasos del editor son expresiones con nombre."
      },
      {
        "id": "analisis-de-datos/power-query/lenguaje-m/let-e-in",
        "label": "let e in",
        "description": "`let` define valores con nombre; `in` selecciona el valor que devuelve la expresión."
      },
      {
        "id": "analisis-de-datos/power-query/lenguaje-m/identificadores-y-comentarios",
        "label": "Identificadores y comentarios",
        "description": "Los nombres con espacios pueden escribirse como `#\"Nombre con espacios\"`; `//` comenta una línea y `/* */` un bloque."
      },
      {
        "id": "analisis-de-datos/power-query/lenguaje-m/operadores",
        "label": "Operadores",
        "description": "M usa `=`, `<>`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, operaciones aritméticas y `&` para concatenar."
      },
      {
        "id": "analisis-de-datos/power-query/lenguaje-m/funciones-y-each",
        "label": "Funciones y each",
        "description": "Una función recibe argumentos y devuelve un valor; `each` abrevia una función de un argumento."
      }
    ]
  },
  {
    "key": "valores-estructurados-de-m",
    "label": "Valores estructurados de M",
    "children": [
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/definicion",
        "label": "Definición",
        "description": "M representa colecciones como listas, registros y tablas. Una lista tiene posiciones, un registro campos y una tabla filas y columnas."
      },
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/list",
        "label": "List",
        "description": "Una lista contiene elementos en secuencia y usa llaves; sus posiciones empiezan en cero."
      },
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/record",
        "label": "Record",
        "description": "Un registro agrupa campos por nombre entre corchetes."
      },
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/table",
        "label": "Table",
        "description": "Una tabla contiene filas con columnas nombradas y puede tener tipos definidos."
      },
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/acceso-a-columnas-y-filas",
        "label": "Acceso a columnas y filas",
        "description": "`Tabla[columna]` devuelve una lista y `Tabla{posición}` devuelve un registro de fila."
      },
      {
        "id": "analisis-de-datos/power-query/valores-estructurados-de-m/conversion-entre-estructuras",
        "label": "Conversión entre estructuras",
        "description": "`Table.FromRecords`, `Table.FromList` y `Table.ToRecords` permiten cambiar la forma del dato."
      }
    ]
  },
  {
    "key": "tipos-de-datos",
    "label": "Tipos de datos",
    "children": [
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/definicion",
        "label": "Definición",
        "description": "Los tipos determinan qué operaciones y comparaciones se pueden aplicar. Power Query puede inferirlos, pero conviene revisarlos."
      },
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/texto-y-numeros",
        "label": "Texto y números",
        "description": "`text`, `number`, `Int64.Type` y `Currency.Type` representan texto y distintos formatos numéricos."
      },
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/fecha-hora-y-duracion",
        "label": "Fecha, hora y duración",
        "description": "`date`, `time`, `datetime`, `datetimezone` y `duration` representan valores temporales diferentes."
      },
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/logical-y-nullable",
        "label": "Logical y nullable",
        "description": "`logical` representa true/false; un tipo `nullable` permite además null."
      },
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/conversion-explicita",
        "label": "Conversión explícita",
        "description": "Las funciones `Number.From`, `Number.FromText`, `Text.From` y `Date.From` convierten valores individuales."
      },
      {
        "id": "analisis-de-datos/power-query/tipos-de-datos/configuracion-regional",
        "label": "Configuración regional",
        "description": "La cultura indica cómo interpretar separadores decimales, fechas y otros formatos regionales."
      }
    ]
  },
  {
    "key": "columnas",
    "label": "Columnas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/columnas/definicion",
        "label": "Definición",
        "description": "Las transformaciones de columnas cambian qué campos se conservan y cómo se llaman."
      },
      {
        "id": "analisis-de-datos/power-query/columnas/eliminar-columnas",
        "label": "Eliminar columnas",
        "description": "`Table.RemoveColumns` descarta los campos indicados."
      },
      {
        "id": "analisis-de-datos/power-query/columnas/renombrar-columnas",
        "label": "Renombrar columnas",
        "description": "`Table.RenameColumns` cambia nombres sin cambiar valores."
      },
      {
        "id": "analisis-de-datos/power-query/columnas/duplicar-columna",
        "label": "Duplicar columna",
        "description": "`Table.DuplicateColumn` crea una copia para conservar el original."
      },
      {
        "id": "analisis-de-datos/power-query/columnas/reordenar-columnas",
        "label": "Reordenar columnas",
        "description": "`Table.ReorderColumns` modifica la posición visible de las columnas."
      },
      {
        "id": "analisis-de-datos/power-query/columnas/columnas-ausentes",
        "label": "Columnas ausentes",
        "description": "Las opciones `MissingField.UseNull` e `Ignore` permiten manejar campos que no existen en una tabla."
      }
    ]
  },
  {
    "key": "filtrar-filas",
    "label": "Filtrar filas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/filtrar-filas/definicion",
        "label": "Definición",
        "description": "`Table.SelectRows` conserva las filas que cumplen una condición."
      },
      {
        "id": "analisis-de-datos/power-query/filtrar-filas/comparaciones-y-rangos",
        "label": "Comparaciones y rangos",
        "description": "Los operadores numéricos y temporales permiten limitar filas a intervalos."
      },
      {
        "id": "analisis-de-datos/power-query/filtrar-filas/and-or-y-not",
        "label": "AND, OR y NOT",
        "description": "`and` exige ambas condiciones, `or` acepta cualquiera y `not` niega una condición."
      },
      {
        "id": "analisis-de-datos/power-query/filtrar-filas/lista-de-valores",
        "label": "Lista de valores",
        "description": "`List.Contains` comprueba si un valor pertenece a una lista."
      },
      {
        "id": "analisis-de-datos/power-query/filtrar-filas/filtros-de-texto",
        "label": "Filtros de texto",
        "description": "`Text.Contains`, `Text.StartsWith` y `Text.EndsWith` buscan patrones sin comodines SQL."
      }
    ]
  },
  {
    "key": "conservar-y-quitar-filas",
    "label": "Conservar y quitar filas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/definicion",
        "label": "Definición",
        "description": "Las operaciones posicionales conservan o descartan filas por su posición, no por una condición de negocio."
      },
      {
        "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/primeras-y-ultimas-filas",
        "label": "Primeras y últimas filas",
        "description": "`Table.FirstN` y `Table.LastN` toman filas desde los extremos."
      },
      {
        "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/quitar-filas-por-posicion",
        "label": "Quitar filas por posición",
        "description": "`Table.Skip` omite filas iniciales y `Table.RemoveLastN` elimina filas finales."
      },
      {
        "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/filas-vacias",
        "label": "Filas vacías",
        "description": "Una fila completamente vacía no contiene datos útiles; un null aislado no convierte toda la fila en vacía."
      }
    ]
  },
  {
    "key": "ordenamiento-e-indices-de-fila",
    "label": "Ordenamiento e índices de fila",
    "children": [
      {
        "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/definicion",
        "label": "Definición",
        "description": "`Table.Sort` ordena una tabla por una o más columnas; un índice numera filas en un orden elegido."
      },
      {
        "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/varios-criterios",
        "label": "Varios criterios",
        "description": "Los criterios se aplican en el orden indicado; el siguiente resuelve empates del anterior."
      },
      {
        "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/columna-de-indice",
        "label": "Columna de índice",
        "description": "`Table.AddIndexColumn` añade una secuencia con inicio e incremento configurables."
      },
      {
        "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/invertir-filas",
        "label": "Invertir filas",
        "description": "`Table.ReverseRows` invierte la secuencia actual."
      }
    ]
  },
  {
    "key": "texto",
    "label": "Texto",
    "children": [
      {
        "id": "analisis-de-datos/power-query/texto/definicion",
        "label": "Definición",
        "description": "Las funciones `Text.*` limpian y transforman cadenas, especialmente claves y campos descriptivos."
      },
      {
        "id": "analisis-de-datos/power-query/texto/trim-y-clean",
        "label": "Trim y Clean",
        "description": "`Text.Trim` quita caracteres de los extremos y `Text.Clean` elimina caracteres de control."
      },
      {
        "id": "analisis-de-datos/power-query/texto/mayusculas-minusculas-y-capitalizacion",
        "label": "Mayúsculas, minúsculas y capitalización",
        "description": "`Text.Upper`, `Text.Lower` y `Text.Proper` cambian la capitalización."
      },
      {
        "id": "analisis-de-datos/power-query/texto/reemplazar-texto",
        "label": "Reemplazar texto",
        "description": "`Text.Replace` reemplaza todas las apariciones literales de un fragmento dentro del texto."
      },
      {
        "id": "analisis-de-datos/power-query/texto/longitud-y-extraccion",
        "label": "Longitud y extracción",
        "description": "`Text.Length`, `Text.Start`, `Text.End` y `Text.Middle` miden o extraen caracteres."
      },
      {
        "id": "analisis-de-datos/power-query/texto/delimitadores",
        "label": "Delimitadores",
        "description": "`Text.BeforeDelimiter`, `Text.AfterDelimiter` y `Text.BetweenDelimiters` extraen segmentos delimitados."
      },
      {
        "id": "analisis-de-datos/power-query/texto/concatenacion",
        "label": "Concatenación",
        "description": "`&` une textos; `Text.Combine` une una lista con un separador."
      }
    ]
  },
  {
    "key": "dividir-y-combinar-columnas",
    "label": "Dividir y combinar columnas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/definicion",
        "label": "Definición",
        "description": "Dividir separa un campo en varios; combinar reúne varios campos en uno."
      },
      {
        "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/dividir-por-posiciones",
        "label": "Dividir por posiciones",
        "description": "`Splitter.SplitTextByPositions` divide en posiciones fijas."
      },
      {
        "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/combinar-columnas",
        "label": "Combinar columnas",
        "description": "`Table.CombineColumns` sustituye las columnas elegidas por una nueva cadena."
      },
      {
        "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/dividir-en-filas",
        "label": "Dividir en filas",
        "description": "Separar una lista de elementos en filas aumenta la granularidad."
      }
    ]
  },
  {
    "key": "null-vacios-y-relleno",
    "label": "NULL, vacíos y relleno",
    "children": [
      {
        "id": "analisis-de-datos/power-query/null-vacios-y-relleno/definicion",
        "label": "Definición",
        "description": "`null` indica ausencia de valor. A diferencia de SQL, M permite comprobarlo mediante `= null` y `<> null`."
      },
      {
        "id": "analisis-de-datos/power-query/null-vacios-y-relleno/texto-vacio-y-espacios",
        "label": "Texto vacío y espacios",
        "description": "`\"\"` es una cadena de longitud cero; un texto con espacios no es vacío hasta limpiarlo."
      },
      {
        "id": "analisis-de-datos/power-query/null-vacios-y-relleno/reemplazar-null",
        "label": "Reemplazar null",
        "description": "`Table.ReplaceValue` con `Replacer.ReplaceValue` sustituye valores completos."
      },
      {
        "id": "analisis-de-datos/power-query/null-vacios-y-relleno/operador-de-coalescencia",
        "label": "Operador de coalescencia",
        "description": "`??` devuelve el valor izquierdo si no es null; si es null, devuelve el derecho."
      },
      {
        "id": "analisis-de-datos/power-query/null-vacios-y-relleno/fill-down-y-fill-up",
        "label": "Fill Down y Fill Up",
        "description": "`Table.FillDown` y `Table.FillUp` rellenan null con el valor no nulo anterior o siguiente."
      }
    ]
  },
  {
    "key": "errores",
    "label": "Errores",
    "children": [
      {
        "id": "analisis-de-datos/power-query/errores/definicion",
        "label": "Definición",
        "description": "Un error es un fallo al evaluar un valor o paso; no es lo mismo que null. Puede originarse en una conversión, un campo faltante o una conexión."
      },
      {
        "id": "analisis-de-datos/power-query/errores/conservar-y-quitar-errores",
        "label": "Conservar y quitar errores",
        "description": "`Table.SelectRowsWithErrors` y `Table.RemoveRowsWithErrors` permiten aislar o descartar filas con error."
      },
      {
        "id": "analisis-de-datos/power-query/errores/reemplazar-errores",
        "label": "Reemplazar errores",
        "description": "`Table.ReplaceErrorValues` sustituye los errores de columnas específicas por un valor."
      },
      {
        "id": "analisis-de-datos/power-query/errores/try-otherwise",
        "label": "try otherwise",
        "description": "`try ... otherwise` usa un valor alternativo cuando falla una expresión."
      },
      {
        "id": "analisis-de-datos/power-query/errores/registro-de-try",
        "label": "Registro de try",
        "description": "`try` sin otherwise devuelve un registro con `HasError` y `Value` o `Error` según el resultado."
      }
    ]
  },
  {
    "key": "duplicados-y-unicidad",
    "label": "Duplicados y unicidad",
    "children": [
      {
        "id": "analisis-de-datos/power-query/duplicados-y-unicidad/definicion",
        "label": "Definición",
        "description": "Un duplicado es una repetición según las columnas que definen la identidad de un dato."
      },
      {
        "id": "analisis-de-datos/power-query/duplicados-y-unicidad/quitar-duplicados",
        "label": "Quitar duplicados",
        "description": "`Table.Distinct` conserva una fila por combinación de valores de las columnas seleccionadas."
      },
      {
        "id": "analisis-de-datos/power-query/duplicados-y-unicidad/detectar-duplicados",
        "label": "Detectar duplicados",
        "description": "Agrupar por clave y contar permite localizar valores repetidos sin borrar información."
      },
      {
        "id": "analisis-de-datos/power-query/duplicados-y-unicidad/conservar-el-registro-mas-reciente",
        "label": "Conservar el registro más reciente",
        "description": "Para elegir un duplicado concreto, define un criterio explícito y selecciona una fila dentro de cada grupo."
      }
    ]
  },
  {
    "key": "columnas-personalizadas-y-condicionales",
    "label": "Columnas personalizadas y condicionales",
    "children": [
      {
        "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/definicion",
        "label": "Definición",
        "description": "`Table.AddColumn` calcula una columna nueva para cada fila sin quitar las existentes."
      },
      {
        "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/if-then-else",
        "label": "if then else",
        "description": "Una expresión condicional elige un resultado según una condición lógica."
      },
      {
        "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/condiciones-encadenadas",
        "label": "Condiciones encadenadas",
        "description": "Puedes colocar otro `if` en el `else` para evaluar varias categorías."
      },
      {
        "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/transformar-o-agregar",
        "label": "Transformar o agregar",
        "description": "`Table.TransformColumns` modifica valores de columnas existentes; `Table.AddColumn` crea otra columna."
      },
      {
        "id": "analisis-de-datos/power-query/columnas-personalizadas-y-condicionales/columna-a-partir-de-ejemplos",
        "label": "Columna a partir de ejemplos",
        "description": "Column From Examples intenta deducir una transformación a partir de salidas que introduces."
      }
    ]
  },
  {
    "key": "calculos-numericos",
    "label": "Cálculos numéricos",
    "children": [
      {
        "id": "analisis-de-datos/power-query/calculos-numericos/definicion",
        "label": "Definición",
        "description": "M ofrece operaciones aritméticas y funciones `Number.*` para calcular, redondear y transformar importes."
      },
      {
        "id": "analisis-de-datos/power-query/calculos-numericos/round-y-modos-de-redondeo",
        "label": "ROUND y modos de redondeo",
        "description": "`Number.Round` redondea a la precisión indicada; permite elegir un modo para los empates."
      },
      {
        "id": "analisis-de-datos/power-query/calculos-numericos/valor-absoluto-techo-y-piso",
        "label": "Valor absoluto, techo y piso",
        "description": "`Number.Abs`, `Number.RoundUp` y `Number.RoundDown` calculan magnitud o redondean hacia arriba o abajo."
      },
      {
        "id": "analisis-de-datos/power-query/calculos-numericos/division-y-porcentajes",
        "label": "División y porcentajes",
        "description": "Un porcentaje se obtiene como parte dividida entre total, multiplicada por 100 si necesitas escala 0–100."
      }
    ]
  },
  {
    "key": "fechas-y-tiempos",
    "label": "Fechas y tiempos",
    "children": [
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/definicion",
        "label": "Definición",
        "description": "Las funciones `Date.*`, `Time.*`, `DateTime.*` y `Duration.*` extraen componentes y calculan periodos."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/ano-mes-trimestre-y-dia",
        "label": "Año, mes, trimestre y día",
        "description": "`Date.Year`, `Date.Month`, `Date.QuarterOfYear` y `Date.Day` extraen componentes del calendario."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/inicio-y-fin-de-periodo",
        "label": "Inicio y fin de periodo",
        "description": "`Date.StartOfMonth` y `Date.EndOfMonth` devuelven los límites del mes; existen equivalentes para otras unidades."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/sumar-dias-y-meses",
        "label": "Sumar días y meses",
        "description": "`Date.AddDays`, `Date.AddMonths` y `Date.AddYears` desplazan fechas por unidades de calendario."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/diferencia-de-fechas",
        "label": "Diferencia de fechas",
        "description": "Restar fechas del mismo tipo devuelve una duración; `Duration.Days` o `Duration.TotalDays` extraen días."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/formatear-fechas",
        "label": "Formatear fechas",
        "description": "`Date.ToText` devuelve texto; se puede indicar formato y cultura."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/fecha-actual-y-zona-horaria",
        "label": "Fecha actual y zona horaria",
        "description": "`DateTime.LocalNow` depende del entorno; `DateTimeZone.FixedUtcNow` devuelve un instante UTC fijo durante la evaluación."
      },
      {
        "id": "analisis-de-datos/power-query/fechas-y-tiempos/calendario",
        "label": "Calendario",
        "description": "Una tabla calendario contiene una fila por fecha, útil para periodos sin ventas y modelos de datos."
      }
    ]
  },
  {
    "key": "agregaciones-y-listas",
    "label": "Agregaciones y listas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/definicion",
        "label": "Definición",
        "description": "Las funciones `List.*` resumen los valores de una lista; `Table.RowCount` cuenta filas de una tabla."
      },
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/conteo-de-filas-y-no-nulos",
        "label": "Conteo de filas y no nulos",
        "description": "`Table.RowCount` cuenta filas; `List.Count` cuenta elementos, incluidos null, y `List.NonNullCount` cuenta los no nulos."
      },
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/suma-promedio-minimo-y-maximo",
        "label": "Suma, promedio, mínimo y máximo",
        "description": "`List.Sum`, `List.Average`, `List.Min` y `List.Max` resumen números."
      },
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/valores-distintos",
        "label": "Valores distintos",
        "description": "`List.Distinct` conserva valores diferentes; se puede combinar con conteo y quitar null."
      },
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/concatenacion-agregada",
        "label": "Concatenación agregada",
        "description": "`Text.Combine` une una lista de textos y omite null."
      },
      {
        "id": "analisis-de-datos/power-query/agregaciones-y-listas/estadistica-descriptiva",
        "label": "Estadística descriptiva",
        "description": "`List.Median`, `List.StandardDeviation` y `List.Percentile` resumen distribución además de promedio."
      }
    ]
  },
  {
    "key": "agrupar-filas-group-by",
    "label": "Agrupar filas (Group By)",
    "children": [
      {
        "id": "analisis-de-datos/power-query/agrupar-filas-group-by/definicion",
        "label": "Definición",
        "description": "`Table.Group` crea un grupo por combinación de claves y devuelve agregaciones o tablas de cada grupo."
      },
      {
        "id": "analisis-de-datos/power-query/agrupar-filas-group-by/varias-agregaciones",
        "label": "Varias agregaciones",
        "description": "Un grupo puede devolver varias métricas mediante una lista de definiciones."
      },
      {
        "id": "analisis-de-datos/power-query/agrupar-filas-group-by/varias-claves",
        "label": "Varias claves",
        "description": "Agrupar por varias columnas crea un grupo por cada combinación, no por cada columna de manera independiente."
      },
      {
        "id": "analisis-de-datos/power-query/agrupar-filas-group-by/filtros-antes-y-despues",
        "label": "Filtros antes y después",
        "description": "Filtrar antes de agrupar cambia las filas que entran; filtrar después cambia qué grupos aparecen."
      },
      {
        "id": "analisis-de-datos/power-query/agrupar-filas-group-by/all-rows",
        "label": "All Rows",
        "description": "La opción Todas las filas guarda la tabla de registros de cada grupo dentro de una columna."
      }
    ]
  },
  {
    "key": "merge-queries",
    "label": "Merge Queries",
    "children": [
      {
        "id": "analisis-de-datos/power-query/merge-queries/definicion",
        "label": "Definición",
        "description": "Merge combina tablas mediante claves y un tipo de unión. `Table.NestedJoin` devuelve una columna de tablas con las coincidencias."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/expandir-coincidencias",
        "label": "Expandir coincidencias",
        "description": "`Table.ExpandTableColumn` extrae columnas de las tablas anidadas que devuelve Merge."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/inner-join",
        "label": "Inner Join",
        "description": "`JoinKind.Inner` conserva solamente las coincidencias entre ambas tablas."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/left-outer-y-right-outer",
        "label": "Left Outer y Right Outer",
        "description": "Left Outer conserva todas las filas izquierdas y Right Outer las derechas, con coincidencias cuando existan."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/full-outer",
        "label": "Full Outer",
        "description": "Full Outer conserva las coincidencias y las filas sin pareja de ambos lados."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/left-anti-y-right-anti",
        "label": "Left Anti y Right Anti",
        "description": "Una unión anti devuelve filas de un lado que no tienen coincidencia en el otro."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/claves-multiples",
        "label": "Claves múltiples",
        "description": "Merge permite seleccionar varias columnas como clave compuesta; su orden debe corresponder entre las tablas."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/cardinalidad-y-duplicacion",
        "label": "Cardinalidad y duplicación",
        "description": "La cardinalidad indica si una clave tiene una o varias coincidencias. Expandir una relación uno a varios repite valores del lado uno."
      },
      {
        "id": "analisis-de-datos/power-query/merge-queries/fuzzy-merge",
        "label": "Fuzzy Merge",
        "description": "La unión aproximada busca similitud textual cuando no existe una coincidencia exacta."
      }
    ]
  },
  {
    "key": "append-queries",
    "label": "Append Queries",
    "children": [
      {
        "id": "analisis-de-datos/power-query/append-queries/definicion",
        "label": "Definición",
        "description": "Append combina filas de varias tablas alineando columnas por nombre. En M se usa `Table.Combine`."
      },
      {
        "id": "analisis-de-datos/power-query/append-queries/esquemas-distintos",
        "label": "Esquemas distintos",
        "description": "Si una columna falta en una tabla anexada, el resultado la incluye con null en esas filas."
      },
      {
        "id": "analisis-de-datos/power-query/append-queries/anexar-varias-tablas",
        "label": "Anexar varias tablas",
        "description": "`Table.Combine` acepta una lista de tablas, no solo dos."
      }
    ]
  },
  {
    "key": "pivot-y-unpivot",
    "label": "Pivot y Unpivot",
    "children": [
      {
        "id": "analisis-de-datos/power-query/pivot-y-unpivot/definicion",
        "label": "Definición",
        "description": "Pivot convierte valores de una columna en encabezados; Unpivot convierte encabezados en valores de filas."
      },
      {
        "id": "analisis-de-datos/power-query/pivot-y-unpivot/unpivot-de-otras-columnas",
        "label": "Unpivot de otras columnas",
        "description": "`Table.UnpivotOtherColumns` mantiene las claves indicadas y transforma las demás columnas en atributo y valor."
      },
      {
        "id": "analisis-de-datos/power-query/pivot-y-unpivot/pivot-con-agregacion",
        "label": "Pivot con agregación",
        "description": "`Table.Pivot` crea columnas a partir de atributos; una función de agregación resuelve varias filas para la misma celda."
      },
      {
        "id": "analisis-de-datos/power-query/pivot-y-unpivot/transpose",
        "label": "Transpose",
        "description": "`Table.Transpose` intercambia filas por columnas sin usar una clave de negocio."
      }
    ]
  },
  {
    "key": "listas-registros-y-datos-anidados",
    "label": "Listas, registros y datos anidados",
    "children": [
      {
        "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/definicion",
        "label": "Definición",
        "description": "Una columna puede contener listas, registros o tablas; la expansión convierte su contenido en filas o columnas."
      },
      {
        "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-record",
        "label": "Expandir Record",
        "description": "`Table.ExpandRecordColumn` extrae campos de registros en columnas."
      },
      {
        "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-list",
        "label": "Expandir List",
        "description": "`Table.ExpandListColumn` produce una fila por elemento de cada lista."
      },
      {
        "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-table",
        "label": "Expandir Table",
        "description": "`Table.ExpandTableColumn` añade campos de cada tabla anidada a la salida."
      },
      {
        "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/transformar-listas",
        "label": "Transformar listas",
        "description": "`List.Transform` aplica una función a cada elemento y `List.Select` conserva los que cumplen una condición."
      }
    ]
  },
  {
    "key": "perfil-y-validacion-de-datos",
    "label": "Perfil y validación de datos",
    "children": [
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/definicion",
        "label": "Definición",
        "description": "El perfilado describe la calidad y distribución de los datos; la validación comprueba reglas de negocio explícitas."
      },
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/calidad-de-columna",
        "label": "Calidad de columna",
        "description": "Column Quality muestra proporciones de valores válidos, errores y vacíos."
      },
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/distribucion-de-columna",
        "label": "Distribución de columna",
        "description": "Column Distribution muestra frecuencias, valores distintos y valores que aparecen una sola vez."
      },
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/perfil-de-columna-y-alcance",
        "label": "Perfil de columna y alcance",
        "description": "Column Profile muestra estadísticas más detalladas; normalmente el perfilado inicia sobre las primeras 1000 filas."
      },
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/reglas-de-calidad",
        "label": "Reglas de calidad",
        "description": "Las reglas de calidad se pueden expresar como filtros, conteos o indicadores para comprobar claves, rangos y faltantes."
      },
      {
        "id": "analisis-de-datos/power-query/perfil-y-validacion-de-datos/conciliacion-antes-y-despues",
        "label": "Conciliación antes y después",
        "description": "Compara conteos y totales antes y después de una transformación para detectar pérdida o multiplicación accidental."
      }
    ]
  },
  {
    "key": "pasos-aplicados-y-editor-avanzado",
    "label": "Pasos aplicados y Editor avanzado",
    "children": [
      {
        "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/definicion",
        "label": "Definición",
        "description": "Cada paso del editor representa una expresión M. Los pasos suelen formar una cadena de transformaciones sobre el resultado anterior."
      },
      {
        "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/editar-y-eliminar-pasos",
        "label": "Editar y eliminar pasos",
        "description": "Puedes editar pasos con engranaje, barra de fórmulas o Editor avanzado; eliminarlos puede romper dependencias."
      },
      {
        "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/reordenar-y-dependencia",
        "label": "Reordenar y dependencia",
        "description": "Mover transformaciones altera los datos disponibles y puede cambiar resultados o producir errores."
      },
      {
        "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/barra-de-formulas-y-editor-avanzado",
        "label": "Barra de fórmulas y Editor avanzado",
        "description": "La barra de fórmulas muestra la expresión del paso; el Editor avanzado muestra la consulta M completa."
      }
    ]
  },
  {
    "key": "organizar-y-reutilizar-consultas",
    "label": "Organizar y reutilizar consultas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/definicion",
        "label": "Definición",
        "description": "Las consultas se pueden dividir por etapas, nombrar y reutilizar para separar extracción, limpieza y salida."
      },
      {
        "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/duplicate-y-reference",
        "label": "Duplicate y Reference",
        "description": "Duplicate copia los pasos de una consulta; Reference crea otra consulta que usa su salida."
      },
      {
        "id": "analisis-de-datos/power-query/organizar-y-reutilizar-consultas/grupos-y-dependencias",
        "label": "Grupos y dependencias",
        "description": "Los grupos de consultas ordenan el proyecto y la vista de dependencias muestra qué consultas usan otras."
      }
    ]
  },
  {
    "key": "parametros",
    "label": "Parámetros",
    "children": [
      {
        "id": "analisis-de-datos/power-query/parametros/definicion",
        "label": "Definición",
        "description": "Un parámetro es un valor configurable que otras consultas pueden usar para cambiar filtros, rutas u opciones sin editar toda la lógica."
      },
      {
        "id": "analisis-de-datos/power-query/parametros/administrar-parametros",
        "label": "Administrar parámetros",
        "description": "El editor permite crear parámetros con nombre, tipo, valor actual y valores sugeridos."
      },
      {
        "id": "analisis-de-datos/power-query/parametros/parametros-de-fecha-y-ruta",
        "label": "Parámetros de fecha y ruta",
        "description": "Un parámetro puede representar una fecha límite o una ruta de origen."
      }
    ]
  },
  {
    "key": "funciones-personalizadas",
    "label": "Funciones personalizadas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/funciones-personalizadas/definicion",
        "label": "Definición",
        "description": "Una función personalizada encapsula lógica reutilizable. Puede recibir un valor o tabla y devolver otro valor o tabla."
      },
      {
        "id": "analisis-de-datos/power-query/funciones-personalizadas/invocar-una-funcion-por-fila",
        "label": "Invocar una función por fila",
        "description": "Una función guardada como consulta se puede invocar en una columna personalizada para procesar cada fila."
      },
      {
        "id": "analisis-de-datos/power-query/funciones-personalizadas/funciones-que-reciben-tablas",
        "label": "Funciones que reciben tablas",
        "description": "Una función puede aplicar un conjunto de transformaciones a tablas con un esquema común."
      },
      {
        "id": "analisis-de-datos/power-query/funciones-personalizadas/argumentos-opcionales",
        "label": "Argumentos opcionales",
        "description": "Un parámetro declarado `optional` puede omitirse; si falta, su valor es null."
      }
    ]
  },
  {
    "key": "combinar-archivos-de-una-carpeta",
    "label": "Combinar archivos de una carpeta",
    "children": [
      {
        "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/definicion",
        "label": "Definición",
        "description": "El conector de carpeta devuelve metadatos y contenido binario de archivos; Combine Files aplica una transformación común y anexa las salidas."
      },
      {
        "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/filtrar-archivos-antes-de-combinar",
        "label": "Filtrar archivos antes de combinar",
        "description": "Se pueden filtrar extensión, nombre, ruta y atributos antes de leer el contenido."
      },
      {
        "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/archivo-de-ejemplo-y-funcion",
        "label": "Archivo de ejemplo y función",
        "description": "El asistente genera consultas auxiliares y una función para transformar cada binario según el archivo de ejemplo."
      },
      {
        "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/trazabilidad-y-archivos-nuevos",
        "label": "Trazabilidad y archivos nuevos",
        "description": "Guardar el nombre o periodo del archivo permite rastrear errores y distinguir lotes. La actualización vuelve a leer la carpeta."
      }
    ]
  },
  {
    "key": "apis-rest-y-web-contents",
    "label": "APIs REST y Web.Contents",
    "children": [
      {
        "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/definicion",
        "label": "Definición",
        "description": "Una API expone datos a través de una interfaz, a menudo HTTP y JSON. `Web.Contents` obtiene el contenido binario de una petición."
      },
      {
        "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/ruta-relativa-y-parametros-http",
        "label": "Ruta relativa y parámetros HTTP",
        "description": "Las opciones `RelativePath` y `Query` de Web.Contents separan la URL base de la ruta y los parámetros."
      },
      {
        "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/autenticacion-y-credenciales",
        "label": "Autenticación y credenciales",
        "description": "Los conectores gestionan credenciales como anónimo, básico, cuenta organizativa o clave de API según el servicio."
      },
      {
        "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/paginacion",
        "label": "Paginación",
        "description": "Una API paginada devuelve los datos por lotes. Debes solicitar páginas hasta alcanzar una condición de fin."
      },
      {
        "id": "analisis-de-datos/power-query/apis-rest-y-web-contents/errores-http-y-respuestas-inesperadas",
        "label": "Errores HTTP y respuestas inesperadas",
        "description": "Las APIs pueden devolver códigos de error, límites de tasa o un esquema diferente. Registra el problema sin convertirlo silenciosamente en cero filas."
      }
    ]
  },
  {
    "key": "carga-actualizacion-y-credenciales",
    "label": "Carga, actualización y credenciales",
    "children": [
      {
        "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/definicion",
        "label": "Definición",
        "description": "La carga entrega el resultado al destino; la actualización vuelve a evaluar la consulta con el origen disponible."
      },
      {
        "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/carga-de-consultas-auxiliares",
        "label": "Carga de consultas auxiliares",
        "description": "Una consulta intermedia puede participar en otras sin aparecer como tabla final del modelo."
      },
      {
        "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/actualizar-vista-previa-o-destino",
        "label": "Actualizar vista previa o destino",
        "description": "Actualizar vista previa consulta datos para el editor; actualizar el destino vuelve a procesar las consultas que lo alimentan."
      },
      {
        "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/configuracion-del-origen",
        "label": "Configuración del origen",
        "description": "La configuración de origen administra rutas, autenticación y permisos guardados."
      },
      {
        "id": "analisis-de-datos/power-query/carga-actualizacion-y-credenciales/gateway-y-actualizacion-programada",
        "label": "Gateway y actualización programada",
        "description": "En Power BI Service un gateway puede conectar un modelo con orígenes que el servicio no alcanza directamente; la actualización programada ejecuta refrescos periódicos."
      }
    ]
  },
  {
    "key": "cambios-de-esquema-y-mantenimiento",
    "label": "Cambios de esquema y mantenimiento",
    "children": [
      {
        "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/definicion",
        "label": "Definición",
        "description": "Un cambio de esquema ocurre cuando un origen añade, elimina, renombra o cambia el tipo de una columna. Puede romper pasos posteriores."
      },
      {
        "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/campos-obligatorios-y-opcionales",
        "label": "Campos obligatorios y opcionales",
        "description": "`Table.HasColumns` comprueba requisitos y `MissingField.UseNull` permite construir columnas opcionales ausentes."
      },
      {
        "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/cambios-de-tipos-y-archivos-inconsistentes",
        "label": "Cambios de tipos y archivos inconsistentes",
        "description": "Dos archivos con las mismas columnas pueden tener formatos incompatibles. Controla conversiones por lote y conserva evidencia de errores."
      }
    ]
  },
  {
    "key": "modelo-de-datos-y-granularidad",
    "label": "Modelo de datos y granularidad",
    "children": [
      {
        "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/definicion",
        "label": "Definición",
        "description": "La granularidad describe qué representa una fila. En un modelo analítico, una tabla de hechos registra eventos y una dimensión describe entidades."
      },
      {
        "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/claves-y-dimensiones",
        "label": "Claves y dimensiones",
        "description": "Una dimensión debe tener una clave apropiada para relacionarse con una tabla de hechos. Las claves pueden ser naturales o sustitutas."
      },
      {
        "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/relaciones-del-modelo-frente-a-merge",
        "label": "Relaciones del modelo frente a Merge",
        "description": "Merge materializa campos en una consulta; una relación del modelo conecta tablas cargadas para el análisis."
      }
    ]
  },
  {
    "key": "query-folding-y-rendimiento",
    "label": "Query Folding y rendimiento",
    "children": [
      {
        "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/definicion",
        "label": "Definición",
        "description": "Query Folding permite que el motor delegue transformaciones al origen cuando el conector y la operación lo admiten."
      },
      {
        "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/plegado-completo-parcial-y-sin-plegado",
        "label": "Plegado completo, parcial y sin plegado",
        "description": "Un flujo puede delegar todas, algunas o ninguna de las transformaciones posteriores al origen."
      },
      {
        "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/reducir-datos-temprano",
        "label": "Reducir datos temprano",
        "description": "Filtrar filas y seleccionar columnas pronto puede reducir memoria, transferencia y trabajo posterior."
      },
      {
        "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/table-buffer",
        "label": "Table.Buffer",
        "description": "`Table.Buffer` materializa superficialmente una tabla en memoria; puede impedir plegado posterior y no siempre mejora velocidad."
      },
      {
        "id": "analisis-de-datos/power-query/query-folding-y-rendimiento/consulta-nativa",
        "label": "Consulta nativa",
        "description": "Algunos conectores permiten enviar SQL escrito manualmente mediante opciones de origen o Value.NativeQuery."
      }
    ]
  },
  {
    "key": "privacidad-y-data-privacy-firewall",
    "label": "Privacidad y Data Privacy Firewall",
    "children": [
      {
        "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/definicion",
        "label": "Definición",
        "description": "Los niveles de privacidad controlan cómo Power Query puede combinar datos de orígenes distintos y evitar transferencias no deseadas."
      },
      {
        "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/public-organizational-y-private",
        "label": "Public, Organizational y Private",
        "description": "Público admite datos de libre difusión; Organizacional corresponde al ámbito de confianza de la organización; Privado protege información sensible frente a transferencias a otros orígenes."
      },
      {
        "id": "analisis-de-datos/power-query/privacidad-y-data-privacy-firewall/formula-firewall",
        "label": "Formula.Firewall",
        "description": "Un error de firewall puede aparecer cuando las particiones de evaluación combinan referencias y accesos a orígenes de manera incompatible con las reglas de privacidad."
      }
    ]
  },
  {
    "key": "diagnostico-de-consultas",
    "label": "Diagnóstico de consultas",
    "children": [
      {
        "id": "analisis-de-datos/power-query/diagnostico-de-consultas/definicion",
        "label": "Definición",
        "description": "Query Diagnostics registra operaciones de evaluación para ayudar a identificar consultas costosas o inesperadas en Power BI Desktop."
      },
      {
        "id": "analisis-de-datos/power-query/diagnostico-de-consultas/duracion-y-consultas-al-origen",
        "label": "Duración y consultas al origen",
        "description": "Los registros detallados permiten inspeccionar operaciones, duración y, cuando se informa, peticiones al origen."
      }
    ]
  },
  {
    "key": "power-query-online-y-dataflows",
    "label": "Power Query Online y Dataflows",
    "children": [
      {
        "id": "analisis-de-datos/power-query/power-query-online-y-dataflows/definicion",
        "label": "Definición",
        "description": "Power Query Online ofrece preparación de datos en servicios web de Microsoft. Un dataflow guarda una definición de transformación reutilizable en el servicio."
      },
      {
        "id": "analisis-de-datos/power-query/power-query-online-y-dataflows/destinos-y-reutilizacion",
        "label": "Destinos y reutilización",
        "description": "Un dataflow permite preparar tablas para consumo posterior, con destinos y conectores específicos de cada generación."
      }
    ]
  },
  {
    "key": "m-avanzado",
    "label": "M avanzado",
    "children": [
      {
        "id": "analisis-de-datos/power-query/m-avanzado/definicion",
        "label": "Definición",
        "description": "M admite funciones como valores, evaluación por dependencias y construcción programática de listas y tablas."
      },
      {
        "id": "analisis-de-datos/power-query/m-avanzado/funciones-de-orden-superior",
        "label": "Funciones de orden superior",
        "description": "Una función de orden superior recibe o devuelve otra función, como List.Transform."
      },
      {
        "id": "analisis-de-datos/power-query/m-avanzado/list-accumulate",
        "label": "List.Accumulate",
        "description": "Acumula un estado inicial mientras recorre una lista. La función recibe el estado anterior y el elemento actual."
      },
      {
        "id": "analisis-de-datos/power-query/m-avanzado/list-generate",
        "label": "List.Generate",
        "description": "Genera elementos mientras se cumpla una condición, a partir de un estado inicial y una regla de avance."
      },
      {
        "id": "analisis-de-datos/power-query/m-avanzado/recursividad",
        "label": "Recursividad",
        "description": "Una función recursiva se llama a sí misma; `@` permite referenciarse desde su definición."
      }
    ]
  }
];
