// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const jsonCurriculum = [
  {
    "key": "formato-json",
    "label": "Formato JSON",
    "children": [
      {
        "id": "analisis-de-datos/json/formato-json/definicion",
        "label": "Definición",
        "description": "JSON es un formato textual para intercambiar datos estructurados. El módulo `json` convierte ese texto en objetos Python y viceversa."
      },
      {
        "id": "analisis-de-datos/json/formato-json/objetos-y-arreglos",
        "label": "Objetos y arreglos",
        "description": "Un objeto JSON contiene pares clave-valor; un arreglo es una secuencia de valores. Pueden contenerse entre sí."
      },
      {
        "id": "analisis-de-datos/json/formato-json/tipos",
        "label": "Tipos JSON y Python",
        "description": "Los objetos se convierten en `dict`, los arreglos en `list`, las cadenas en `str`, los números enteros en `int` y los decimales en `float` por defecto; `true`, `false` y `null` se convierten en `True`, `False` y `None`."
      },
      {
        "id": "analisis-de-datos/json/formato-json/sintaxis",
        "label": "Sintaxis válida",
        "description": "JSON exige comillas dobles en claves y cadenas, sin comentarios ni comas finales. Un documento puede tener un valor escalar en la raíz."
      },
      {
        "id": "analisis-de-datos/json/formato-json/heterogeneas",
        "label": "Estructuras heterogéneas",
        "description": "Un arreglo puede mezclar tipos y los objetos pueden tener campos diferentes; esto no garantiza una estructura tabular consistente."
      }
    ]
  },
  {
    "key": "deserializacion",
    "label": "Deserialización",
    "children": [
      {
        "id": "analisis-de-datos/json/deserializacion/definicion",
        "label": "Definición",
        "description": "Deserializar convierte un documento JSON en valores Python para poder consultarlos o modificarlos."
      },
      {
        "id": "analisis-de-datos/json/deserializacion/loads",
        "label": "json.loads()",
        "description": "`json.loads(s)` interpreta un documento completo contenido en una cadena, bytes o bytearray."
      },
      {
        "id": "analisis-de-datos/json/deserializacion/load",
        "label": "json.load()",
        "description": "`json.load(fp)` interpreta un documento completo desde un objeto de archivo legible."
      },
      {
        "id": "analisis-de-datos/json/deserializacion/tipos-de-entrada",
        "label": "str, bytes y bytearray",
        "description": "`loads` admite texto y datos binarios codificados en UTF-8, UTF-16 o UTF-32."
      }
    ]
  },
  {
    "key": "serializacion",
    "label": "Serialización",
    "children": [
      {
        "id": "analisis-de-datos/json/serializacion/definicion",
        "label": "Definición",
        "description": "Serializar convierte objetos Python compatibles en texto JSON, para almacenarlos o intercambiarlos."
      },
      {
        "id": "analisis-de-datos/json/serializacion/dumps",
        "label": "json.dumps()",
        "description": "`json.dumps(obj)` devuelve una cadena JSON. No crea un archivo."
      },
      {
        "id": "analisis-de-datos/json/serializacion/dump",
        "label": "json.dump()",
        "description": "`json.dump(obj, fp)` escribe texto JSON en un archivo abierto para escritura y devuelve `None`."
      },
      {
        "id": "analisis-de-datos/json/serializacion/round-trip",
        "label": "Round-trip",
        "description": "Un round-trip serializa y deserializa para comprobar si los valores se conservan. No todos los tipos Python tienen una representación idéntica en JSON."
      }
    ]
  },
  {
    "key": "archivos-y-codificacion",
    "label": "Archivos y codificación",
    "children": [
      {
        "id": "analisis-de-datos/json/archivos-y-codificacion/definicion",
        "label": "Definición",
        "description": "La apertura de archivos y su codificación determinan cómo se lee o escribe el documento; son operaciones de Python, no parámetros de `json.load`."
      },
      {
        "id": "analisis-de-datos/json/archivos-y-codificacion/modos",
        "label": "Modos r, w y a",
        "description": "`r` lee; `w` crea o reemplaza; `a` añade al final sin borrar."
      },
      {
        "id": "analisis-de-datos/json/archivos-y-codificacion/utf-8-y-bom",
        "label": "UTF-8 y BOM",
        "description": "UTF-8 es la codificación habitual de intercambio. Un BOM es una marca inicial que puede causar rechazo si queda dentro del texto leído."
      },
      {
        "id": "analisis-de-datos/json/archivos-y-codificacion/modificar-documento",
        "label": "Modificar un documento",
        "description": "Para modificar un arreglo JSON normal, lee el documento, actualiza el objeto Python y vuelve a serializarlo."
      },
      {
        "id": "analisis-de-datos/json/archivos-y-codificacion/multiples-dump",
        "label": "Múltiples llamadas a dump()",
        "description": "JSON no delimita automáticamente documentos consecutivos. Dos llamadas a `dump` en el mismo archivo pueden producir contenido que no representa un documento válido."
      }
    ]
  },
  {
    "key": "formato-de-salida",
    "label": "Formato de salida",
    "children": [
      {
        "id": "analisis-de-datos/json/formato-de-salida/definicion",
        "label": "Definición",
        "description": "Los parámetros de `dump` y `dumps` permiten ajustar la representación textual sin cambiar la estructura de datos."
      },
      {
        "id": "analisis-de-datos/json/formato-de-salida/indent",
        "label": "indent",
        "description": "`indent` agrega sangría y saltos de línea; puede ser un entero o una cadena. `None` mantiene salida sin sangría."
      },
      {
        "id": "analisis-de-datos/json/formato-de-salida/ensure-ascii",
        "label": "ensure_ascii",
        "description": "Con `ensure_ascii=True` (predeterminado) los caracteres no ASCII se escapan; con `False` se conservan visibles."
      },
      {
        "id": "analisis-de-datos/json/formato-de-salida/sort-keys",
        "label": "sort_keys",
        "description": "`sort_keys=True` ordena las claves de cada objeto al generar el JSON."
      },
      {
        "id": "analisis-de-datos/json/formato-de-salida/separators",
        "label": "separators",
        "description": "`separators=(separador_de_elementos, separador_clave_valor)` controla el espacio alrededor de comas y dos puntos."
      }
    ]
  },
  {
    "key": "navegacion",
    "label": "Navegación y transformación",
    "children": [
      {
        "id": "analisis-de-datos/json/navegacion/definicion",
        "label": "Definición",
        "description": "Después de deserializar, trabajas con listas y diccionarios normales de Python."
      },
      {
        "id": "analisis-de-datos/json/navegacion/clave-e-indice",
        "label": "Acceso por clave e índice",
        "description": "Los diccionarios se consultan por clave y las listas por índice entero desde cero."
      },
      {
        "id": "analisis-de-datos/json/navegacion/get",
        "label": "get()",
        "description": "`dict.get(clave, alternativa)` devuelve el valor existente o la alternativa si la clave no existe."
      },
      {
        "id": "analisis-de-datos/json/navegacion/keys-values-items",
        "label": "keys(), values() e items()",
        "description": "Estas operaciones de `dict` permiten consultar claves, valores o pares clave-valor, respectivamente."
      },
      {
        "id": "analisis-de-datos/json/navegacion/iteracion-y-filtrado",
        "label": "Iteración y filtrado",
        "description": "Un `for` recorre registros; una condición `if` permite conservar únicamente los que cumplen una regla."
      },
      {
        "id": "analisis-de-datos/json/navegacion/comprensiones",
        "label": "Comprensiones",
        "description": "Una comprensión crea una nueva lista o diccionario a partir de una iteración, con un filtro opcional."
      },
      {
        "id": "analisis-de-datos/json/navegacion/modificaciones",
        "label": "Agregar, actualizar y eliminar",
        "description": "Los objetos Python deserializados son modificables: asignación para agregar o actualizar, `pop` para retirar claves y `append` para añadir elementos."
      },
      {
        "id": "analisis-de-datos/json/navegacion/aplanamiento-manual",
        "label": "Aplanamiento manual",
        "description": "Aplanar es transformar campos anidados en columnas o generar una fila por elemento de un arreglo interno."
      }
    ]
  },
  {
    "key": "errores-y-validacion",
    "label": "Errores y validación",
    "children": [
      {
        "id": "analisis-de-datos/json/errores-y-validacion/definicion",
        "label": "Definición",
        "description": "Un JSON puede ser sintácticamente válido y aun así tener datos incorrectos para el negocio. Separa errores de lectura, de sintaxis y de estructura."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/json-decode-error",
        "label": "JSONDecodeError",
        "description": "`json.JSONDecodeError` indica que el decodificador no pudo interpretar el documento. Es una subclase de `ValueError`."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/posicion-del-error",
        "label": "Posición del error",
        "description": "`JSONDecodeError` ofrece `msg`, `pos`, `lineno`, `colno` y `doc` para diagnosticar el texto. `pos` comienza en cero; línea y columna en uno."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/errores-de-archivo",
        "label": "FileNotFoundError y UnicodeDecodeError",
        "description": "Un archivo inexistente o bytes incompatibles con la codificación pueden impedir la lectura antes de interpretar JSON."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/type-error-y-key-error",
        "label": "TypeError y KeyError",
        "description": "`TypeError` puede indicar un objeto que el codificador no admite; `KeyError` indica que una clave buscada no existe en un diccionario."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/nulos-y-ausentes",
        "label": "null frente a clave inexistente",
        "description": "Un campo con `null` existe y se convierte en `None`; un campo ausente no está en el diccionario."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/validar-tipos",
        "label": "Campos obligatorios y tipos",
        "description": "`isinstance` y pruebas de pertenencia permiten comprobar campos, tipos y reglas antes de analizar."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/limpieza-de-tipos",
        "label": "Limpieza de tipos",
        "description": "Los datos externos pueden representar un número como texto. Convierte de forma explícita y separa registros no convertibles."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/claves-duplicadas",
        "label": "Claves duplicadas",
        "description": "El decodificador estándar conserva el último valor de una clave repetida en un mismo objeto. Esto puede ocultar datos."
      },
      {
        "id": "analisis-de-datos/json/errores-y-validacion/json-schema",
        "label": "JSON Schema",
        "description": "JSON Schema describe requisitos de estructura y tipos; la biblioteca externa `jsonschema` puede comprobarlos."
      }
    ]
  },
  {
    "key": "tipos-especiales",
    "label": "Tipos especiales y compatibilidad",
    "children": [
      {
        "id": "analisis-de-datos/json/tipos-especiales/definicion",
        "label": "Definición",
        "description": "Algunos tipos Python no tienen equivalente JSON directo; otros cambian de representación. Decide cómo conservar significado antes de serializar."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/tuplas-y-claves",
        "label": "Tuplas y claves numéricas",
        "description": "Las tuplas se convierten en arreglos y las claves numéricas se convierten en cadenas; el round-trip puede cambiar el objeto."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/skipkeys",
        "label": "skipkeys",
        "description": "`skipkeys=True` omite claves no admitidas en vez de lanzar `TypeError`. Las claves admisibles incluyen `str`, `int`, `float`, `bool` y `None`."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/default",
        "label": "default",
        "description": "`default` recibe objetos que no puede serializar el codificador estándar y debe devolver un valor compatible o lanzar `TypeError`."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/datetime",
        "label": "datetime y date",
        "description": "Las fechas no se serializan directamente con `json`; ISO 8601 es una representación textual habitual."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/decimal",
        "label": "Decimal",
        "description": "`Decimal` permite representar importes decimales con precisión, pero no es serializable directamente. Puedes usar una cadena o unidades monetarias enteras según el contrato de intercambio."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/objetos-personalizados",
        "label": "Objetos personalizados",
        "description": "Para serializar instancias de clases propias, define una representación compatible, por ejemplo mediante `dataclasses.asdict`."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/allow-nan",
        "label": "allow_nan",
        "description": "Por defecto, Python permite escribir `NaN`, `Infinity` y `-Infinity`, aunque no son números JSON estándar. `allow_nan=False` rechaza esos valores."
      },
      {
        "id": "analisis-de-datos/json/tipos-especiales/check-circular",
        "label": "check_circular",
        "description": "`check_circular=True` detecta ciclos en estructuras contenedoras durante la serialización. Desactivarlo puede provocar recursión excesiva."
      }
    ]
  },
  {
    "key": "decodificacion-personalizada",
    "label": "Decodificación personalizada",
    "children": [
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/definicion",
        "label": "Definición",
        "description": "Los parámetros del decodificador permiten cambiar cómo se interpretan los números y objetos JSON. Se utilizan cuando el contrato de datos requiere un tratamiento especial."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/parse-float",
        "label": "parse_float",
        "description": "`parse_float` recibe el texto de cada número JSON con parte decimal o exponente. Por defecto se utiliza `float`."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/parse-int",
        "label": "parse_int",
        "description": "`parse_int` recibe el texto de cada número entero JSON. Por defecto se utiliza `int`."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/parse-constant",
        "label": "parse_constant",
        "description": "`parse_constant` se invoca para los tokens no estándar `NaN`, `Infinity` y `-Infinity` aceptados por el decodificador de Python."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/object-hook",
        "label": "object_hook",
        "description": "`object_hook` recibe cada objeto JSON ya convertido en diccionario y su retorno lo reemplaza. No se invoca para arreglos como tales."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/object-pairs-hook",
        "label": "object_pairs_hook",
        "description": "`object_pairs_hook` recibe los pares de cada objeto antes de formar un diccionario. Tiene prioridad sobre `object_hook` si se proporcionan ambos."
      },
      {
        "id": "analisis-de-datos/json/decodificacion-personalizada/strict",
        "label": "strict",
        "description": "`strict=False` permite caracteres de control sin escapar dentro de cadenas JSON. No habilita comas finales ni comentarios."
      }
    ]
  },
  {
    "key": "encoder-y-decoder",
    "label": "JSONEncoder y JSONDecoder",
    "children": [
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/definicion",
        "label": "Definición",
        "description": "`JSONEncoder` y `JSONDecoder` son las clases que realizan la codificación y la decodificación. Se pueden instanciar o extender para personalizar el comportamiento."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/encode",
        "label": "encode()",
        "description": "`JSONEncoder.encode(obj)` devuelve el documento JSON como `str`, aplicando las opciones del codificador."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/decode",
        "label": "decode()",
        "description": "`JSONDecoder.decode(s)` convierte un documento completo en valores Python. En esta interfaz de clase, `s` es texto."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/iterencode",
        "label": "iterencode()",
        "description": "`JSONEncoder.iterencode(obj)` genera fragmentos de texto para escribir o transmitir el documento progresivamente. Los fragmentos no son registros independientes."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/raw-decode",
        "label": "raw_decode()",
        "description": "`JSONDecoder.raw_decode(s)` devuelve el valor inicial y el índice donde termina ese valor. Puede dejar texto posterior sin consumir."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/cls-encoder",
        "label": "cls con JSONEncoder",
        "description": "El parámetro `cls` permite usar una subclase de `JSONEncoder` que personalice `default`."
      },
      {
        "id": "analisis-de-datos/json/encoder-y-decoder/cls-decoder",
        "label": "cls con JSONDecoder",
        "description": "El parámetro `cls` permite usar una subclase de `JSONDecoder` con una configuración propia."
      }
    ]
  },
  {
    "key": "jsonl-y-documentos-grandes",
    "label": "JSON Lines y documentos grandes",
    "children": [
      {
        "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/definicion",
        "label": "Definición",
        "description": "JSON Lines (JSONL) almacena un valor JSON válido por línea, normalmente un registro. Permite procesar archivos sin cargar todos los registros a la vez."
      },
      {
        "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/lectura-lineas",
        "label": "Leer línea por línea",
        "description": "Recorre un archivo JSONL con `for` y deserializa cada línea. El archivo no necesita cargarse entero en memoria."
      },
      {
        "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/escritura-jsonl",
        "label": "Escribir y añadir registros",
        "description": "Para escribir JSONL, serializa cada registro sin sangría y agrega un salto de línea. El modo `a` permite añadir registros al final."
      },
      {
        "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/memoria",
        "label": "Memoria y procesamiento incremental",
        "description": "`json.load` interpreta un documento completo y construye su estructura en memoria. JSONL permite consumir registros uno a uno; para arreglos JSON enormes se necesita un parser incremental externo o cambiar de formato."
      },
      {
        "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/errores-jsonl",
        "label": "Errores por registro",
        "description": "Puedes identificar la línea que falla y decidir si detener el procesamiento o registrar el error."
      }
    ]
  },
  {
    "key": "seguridad-y-terminal",
    "label": "Seguridad y validación en terminal",
    "children": [
      {
        "id": "analisis-de-datos/json/seguridad-y-terminal/definicion",
        "label": "Definición",
        "description": "El módulo analiza datos, no código, pero documentos no confiables pueden consumir memoria y CPU en exceso. Limita recursos y valida el contenido."
      },
      {
        "id": "analisis-de-datos/json/seguridad-y-terminal/limites",
        "label": "Limitar tamaño y profundidad",
        "description": "Limita los bytes antes de parsear; considera límites de profundidad, número de registros y tamaños de campos. El módulo no ofrece un parámetro general `max_depth`."
      },
      {
        "id": "analisis-de-datos/json/seguridad-y-terminal/json-tool",
        "label": "python -m json.tool",
        "description": "`python -m json.tool` permite revisar sintaxis y formatear un documento desde terminal sin escribir un script."
      },
      {
        "id": "analisis-de-datos/json/seguridad-y-terminal/opciones-json-tool",
        "label": "Opciones de json.tool",
        "description": "La interfaz de terminal permite ordenar claves, conservar Unicode, compactar y procesar JSONL mediante opciones de línea de comandos."
      }
    ]
  },
  {
    "key": "apis-http",
    "label": "APIs HTTP",
    "children": [
      {
        "id": "analisis-de-datos/json/apis-http/definicion",
        "label": "Definición",
        "description": "Muchas APIs entregan documentos JSON como respuestas HTTP. La biblioteca externa `requests` permite pedirlos y convertirlos en objetos Python."
      },
      {
        "id": "analisis-de-datos/json/apis-http/requests-get",
        "label": "requests.get()",
        "description": "`requests.get(url, params=..., timeout=...)` realiza una petición HTTP GET. `params` configura parámetros de consulta; `timeout` limita esperas de conexión y lectura."
      },
      {
        "id": "analisis-de-datos/json/apis-http/response-json",
        "label": "response.json() y errores HTTP",
        "description": "`response.json()` deserializa el cuerpo. Puede fallar si el cuerpo no es JSON, y puede devolver JSON aun cuando el estado HTTP indique un error."
      },
      {
        "id": "analisis-de-datos/json/apis-http/registros-y-metadatos",
        "label": "Extraer registros y metadatos",
        "description": "Una API puede devolver un objeto envolvente con registros en una clave y metadatos como total o página en otras."
      },
      {
        "id": "analisis-de-datos/json/apis-http/paginacion",
        "label": "Paginación",
        "description": "Una API paginada divide registros en respuestas. El indicador de página siguiente puede ser una URL, un número o un cursor."
      }
    ]
  },
  {
    "key": "pandas-y-json",
    "label": "Pandas y JSON",
    "children": [
      {
        "id": "analisis-de-datos/json/pandas-y-json/definicion",
        "label": "Definición",
        "description": "Pandas permite representar registros JSON como DataFrames y exportarlos. `json` sigue siendo útil para inspeccionar o transformar estructuras antes de tabularlas."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/read-json",
        "label": "pd.read_json()",
        "description": "`pd.read_json` importa documentos JSON según la orientación de sus datos. Para arreglos de registros planos usa `orient=\"records\"`."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/json-normalize",
        "label": "pd.json_normalize()",
        "description": "`pd.json_normalize` convierte objetos anidados en columnas, usando por defecto un punto para separar niveles de claves."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/record-path-y-meta",
        "label": "record_path y meta",
        "description": "`record_path` indica qué lista anidada se convierte en filas; `meta` conserva campos del objeto padre."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/nulos-pandas",
        "label": "Nulos al tabular",
        "description": "Pandas puede representar campos nulos y ausentes como valores faltantes. Si debes distinguirlos, registra la presencia de la clave antes de convertir a tabla."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/to-json",
        "label": "df.to_json() y orient",
        "description": "`DataFrame.to_json` genera texto o escribe un archivo. `orient` controla la estructura: `records` produce un arreglo de filas; otras orientaciones, como `split`, guardan información separada de columnas e índice."
      },
      {
        "id": "analisis-de-datos/json/pandas-y-json/pandas-jsonl",
        "label": "JSONL con pandas",
        "description": "Pandas lee y escribe JSONL con `lines=True`; al escribir usa `orient=\"records\"`. `chunksize` permite iterar por bloques."
      }
    ]
  },
  {
    "key": "conversion-de-formatos",
    "label": "Conversión entre formatos",
    "children": [
      {
        "id": "analisis-de-datos/json/conversion-de-formatos/definicion",
        "label": "Definición",
        "description": "JSON puede intercambiarse con CSV, Excel y formatos tabulares. Al convertir, selecciona el nivel de filas y las columnas necesarias."
      },
      {
        "id": "analisis-de-datos/json/conversion-de-formatos/json-a-csv",
        "label": "JSON a CSV",
        "description": "`csv.DictWriter` convierte diccionarios planos en filas delimitadas. Declara las columnas para obtener una salida consistente."
      },
      {
        "id": "analisis-de-datos/json/conversion-de-formatos/csv-a-json",
        "label": "CSV a JSON",
        "description": "`csv.DictReader` lee cada fila como diccionario de cadenas. Convierte los campos numéricos explícitamente antes de serializar."
      },
      {
        "id": "analisis-de-datos/json/conversion-de-formatos/json-a-excel",
        "label": "JSON a Excel",
        "description": "Un DataFrame plano se puede guardar en una hoja Excel mediante `to_excel`. Las entidades anidadas pueden ir en hojas separadas."
      },
      {
        "id": "analisis-de-datos/json/conversion-de-formatos/excel-a-json",
        "label": "Excel a JSON",
        "description": "Lee una hoja con pandas y exporta sus filas con `to_json(orient=\"records\")`. Los nulos y fechas requieren una política de conversión."
      }
    ]
  }
];
