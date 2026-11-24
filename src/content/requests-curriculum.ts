// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const requestsCurriculum = [
  {
    "key": "http-y-apis",
    "label": "HTTP y APIs",
    "children": [
      {
        "id": "analisis-de-datos/requests/http-y-apis/definicion",
        "label": "Definición",
        "description": "HTTP permite a un cliente pedir recursos a un servidor. Requests construye la petición y devuelve un objeto Response."
      },
      {
        "id": "analisis-de-datos/requests/http-y-apis/endpoint",
        "label": "Endpoint y ruta",
        "description": "Un endpoint combina una ruta y un método para acceder a una operación. Un identificador en la ruta selecciona un recurso."
      },
      {
        "id": "analisis-de-datos/requests/http-y-apis/rest",
        "label": "REST y recursos",
        "description": "REST organiza recursos y operaciones mediante una interfaz uniforme. JSON es frecuente, pero no es requisito de REST."
      },
      {
        "id": "analisis-de-datos/requests/http-y-apis/https",
        "label": "HTTPS y TLS",
        "description": "HTTPS añade cifrado y autenticación del servidor mediante TLS. Requests verifica certificados por defecto."
      },
      {
        "id": "analisis-de-datos/requests/http-y-apis/headers-body",
        "label": "Headers y body",
        "description": "Los encabezados describen el mensaje; el body contiene los datos. Pueden existir en peticiones y respuestas."
      }
    ]
  },
  {
    "key": "metodos-http",
    "label": "Métodos HTTP",
    "children": [
      {
        "id": "analisis-de-datos/requests/metodos-http/definicion",
        "label": "Definición",
        "description": "Los métodos expresan la intención de la petición. GET consulta y POST suele enviar datos para crear o procesar."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/get",
        "label": "GET",
        "description": "Recupera la representación de un recurso."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/post",
        "label": "POST",
        "description": "Envía datos para crear un recurso o ejecutar una operación."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/put",
        "label": "PUT",
        "description": "Solicita reemplazar el estado del recurso según el contrato de la API."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/patch",
        "label": "PATCH",
        "description": "Solicita aplicar cambios parciales al recurso."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/delete",
        "label": "DELETE",
        "description": "Solicita eliminar un recurso."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/head",
        "label": "HEAD",
        "description": "Solicita los encabezados que corresponderían a GET sin recibir el cuerpo."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/options",
        "label": "OPTIONS",
        "description": "Consulta las opciones de comunicación del recurso; puede informar métodos permitidos."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/request",
        "label": "request()",
        "description": "Permite elegir el método mediante una cadena."
      },
      {
        "id": "analisis-de-datos/requests/metodos-http/idempotencia",
        "label": "Idempotencia",
        "description": "Una operación idempotente tiene el mismo efecto previsto al repetirse. GET, PUT y DELETE son idempotentes por semántica HTTP; POST y PATCH no necesariamente."
      }
    ]
  },
  {
    "key": "parametros",
    "label": "Parámetros y URL",
    "children": [
      {
        "id": "analisis-de-datos/requests/parametros/definicion",
        "label": "Definición",
        "description": "params añade parámetros de consulta a la URL sin construirla manualmente."
      },
      {
        "id": "analisis-de-datos/requests/parametros/params",
        "label": "params",
        "description": "Un diccionario o lista de tuplas permite enviar filtros y otros parámetros de consulta."
      },
      {
        "id": "analisis-de-datos/requests/parametros/listas-none",
        "label": "Valores repetidos y None",
        "description": "Una lista genera un parámetro repetido por cada elemento. Los valores None en un diccionario params se omiten."
      },
      {
        "id": "analisis-de-datos/requests/parametros/url-encoding",
        "label": "URL encoding",
        "description": "Requests codifica los caracteres especiales al preparar parámetros."
      }
    ]
  },
  {
    "key": "encabezados-y-body",
    "label": "Encabezados y formatos de envío",
    "children": [
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/definicion",
        "label": "Definición",
        "description": "headers configura los metadatos HTTP y json, data o files configuran el contenido enviado."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/headers",
        "label": "headers",
        "description": "Recibe un diccionario de encabezados. Los nombres HTTP no distinguen mayúsculas."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/accept-content-type",
        "label": "Accept y Content-Type",
        "description": "Accept expresa formatos de respuesta deseados; Content-Type describe el cuerpo realmente enviado o recibido."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/user-agent-accept-encoding",
        "label": "User-Agent y Accept-Encoding",
        "description": "User-Agent identifica el cliente y Accept-Encoding anuncia compresiones aceptadas. Requests establece valores predeterminados."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/json",
        "label": "json",
        "description": "Serializa automáticamente objetos Python a JSON y establece Content-Type si no se fijó."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/data-form",
        "label": "data: formulario",
        "description": "data con diccionario se codifica como formulario URL-encoded."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/data-raw",
        "label": "data: texto y bytes",
        "description": "data también permite enviar un cuerpo ya construido. Si corresponde, establece su tipo de contenido."
      },
      {
        "id": "analisis-de-datos/requests/encabezados-y-body/files",
        "label": "files y multipart",
        "description": "files construye un cuerpo multipart/form-data para enviar archivos y campos."
      }
    ]
  },
  {
    "key": "response",
    "label": "Response y contenido",
    "children": [
      {
        "id": "analisis-de-datos/requests/response/definicion",
        "label": "Definición",
        "description": "Response contiene código, encabezados y cuerpo devueltos por el servidor. No es directamente un diccionario."
      },
      {
        "id": "analisis-de-datos/requests/response/status-code",
        "label": "status_code, reason y ok",
        "description": "status_code es el número HTTP, reason su texto y ok indica código inferior a 400."
      },
      {
        "id": "analisis-de-datos/requests/response/json",
        "label": "json()",
        "description": "Convierte un cuerpo JSON a objetos Python. Puede producir una excepción aunque el código sea 200."
      },
      {
        "id": "analisis-de-datos/requests/response/text-encoding",
        "label": "text y encoding",
        "description": "text decodifica el cuerpo como str usando encoding, inferido de encabezados o estimado. apparent_encoding ofrece una estimación."
      },
      {
        "id": "analisis-de-datos/requests/response/content",
        "label": "content",
        "description": "content devuelve el cuerpo como bytes, apropiado para archivos y datos binarios."
      },
      {
        "id": "analisis-de-datos/requests/response/headers",
        "label": "headers",
        "description": "response.headers permite consultar metadatos recibidos sin distinguir mayúsculas."
      },
      {
        "id": "analisis-de-datos/requests/response/url-request-elapsed",
        "label": "url, request y elapsed",
        "description": "url contiene la dirección final, request la petición preparada enviada y elapsed mide hasta recibir y analizar encabezados."
      },
      {
        "id": "analisis-de-datos/requests/response/links",
        "label": "links",
        "description": "links interpreta el encabezado Link como relaciones de enlaces."
      },
      {
        "id": "analisis-de-datos/requests/response/cookies",
        "label": "cookies",
        "description": "response.cookies contiene las cookies establecidas por esa respuesta."
      },
      {
        "id": "analisis-de-datos/requests/response/compresion",
        "label": "Compresión",
        "description": "Requests descomprime gzip y deflate en content; Brotli se admite si está instalada una biblioteca compatible."
      }
    ]
  },
  {
    "key": "estados-y-redirecciones",
    "label": "Códigos de estado y redirecciones",
    "children": [
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/definicion",
        "label": "Definición",
        "description": "Los códigos HTTP clasifican resultados: 1xx informativos, 2xx éxito, 3xx redirección, 4xx error de cliente y 5xx error de servidor."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/exito",
        "label": "200, 201, 202 y 204",
        "description": "200 indica éxito, 201 creación, 202 aceptación sin completar necesariamente y 204 éxito sin cuerpo."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/errores-cliente",
        "label": "400, 401, 403, 404, 405, 408, 409 y 422",
        "description": "400 petición incorrecta; 401 credenciales; 403 acceso denegado; 404 no encontrado; 405 método no permitido; 408 espera del servidor agotada; 409 conflicto; 422 contenido no procesable."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/rate-limit-status",
        "label": "429 y Retry-After",
        "description": "429 indica demasiadas peticiones. Retry-After puede indicar segundos o una fecha HTTP para volver a intentar."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/errores-servidor",
        "label": "500, 502, 503 y 504",
        "description": "500 error interno; 502 respuesta inválida de upstream; 503 no disponible; 504 espera agotada en gateway."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/redirecciones",
        "label": "301, 302, 303, 307, 308",
        "description": "301 y 308 son permanentes; 302 y 307 temporales; 303 orienta a consultar otro recurso. 307 y 308 preservan método y cuerpo."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/control-redirecciones",
        "label": "allow_redirects, history e is_redirect",
        "description": "allow_redirects=False devuelve la redirección sin seguirla; history conserva las respuestas previas. is_redirect indica una redirección con Location."
      },
      {
        "id": "analisis-de-datos/requests/estados-y-redirecciones/not-modified",
        "label": "304 y caché condicional",
        "description": "304 indica que la representación almacenada sigue vigente ante una petición condicional."
      }
    ]
  },
  {
    "key": "errores-y-timeout",
    "label": "Errores y timeout",
    "children": [
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/definicion",
        "label": "Definición",
        "description": "Requests distingue fallos de transporte de respuestas HTTP con error. raise_for_status() convierte códigos 4xx y 5xx en HTTPError."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/timeout",
        "label": "timeout",
        "description": "Limita tiempos de conexión y de espera de datos. No es un límite total de duración y Requests no impone uno por defecto."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/timeout-tuple",
        "label": "ConnectTimeout y ReadTimeout",
        "description": "Una tupla (connect, read) configura ambos tiempos. ConnectTimeout indica fallo al conectar y ReadTimeout espera de datos agotada."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/http-error",
        "label": "raise_for_status y HTTPError",
        "description": "raise_for_status no devuelve los datos: lanza HTTPError si la respuesta es 4xx o 5xx."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/connection-error",
        "label": "ConnectionError",
        "description": "Representa problemas de conexión, por ejemplo conexión rechazada o resolución fallida."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/json-decode-error",
        "label": "JSONDecodeError",
        "description": "Se produce cuando el cuerpo no se puede interpretar como JSON."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/too-many-redirects",
        "label": "TooManyRedirects",
        "description": "Se lanza cuando una petición supera el máximo de redirecciones."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/otros-errores",
        "label": "SSLError, ProxyError e InvalidURL",
        "description": "SSLError y ProxyError identifican problemas TLS y de proxy; InvalidURL indica una URL no válida."
      },
      {
        "id": "analisis-de-datos/requests/errores-y-timeout/request-exception",
        "label": "RequestException y finally",
        "description": "RequestException es la base de las excepciones propias de Requests. Captura primero los tipos específicos. finally se ejecuta al salir del bloque."
      }
    ]
  },
  {
    "key": "autenticacion",
    "label": "Autenticación y credenciales",
    "children": [
      {
        "id": "analisis-de-datos/requests/autenticacion/definicion",
        "label": "Definición",
        "description": "La autenticación acredita quién realiza la petición. La API especifica si necesita una clave, usuario o token."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/api-key",
        "label": "API Key",
        "description": "Una clave de API puede viajar en un encabezado o parámetro según el contrato. Prefiere encabezados cuando estén disponibles."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/bearer",
        "label": "Bearer Token",
        "description": "El encabezado Authorization: Bearer transporta un token de acceso."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/basic-auth",
        "label": "Basic Auth y HTTPBasicAuth",
        "description": "Basic Auth transmite usuario y contraseña codificados en base64. Requests acepta una tupla o HTTPBasicAuth."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/digest-auth",
        "label": "HTTPDigestAuth",
        "description": "Digest usa un reto del servidor para construir la autenticación. Requests dispone de HTTPDigestAuth."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/oauth",
        "label": "OAuth 2.0 y refresh token",
        "description": "OAuth 2.0 permite obtener tokens de acceso según un flujo autorizado. Requests puede enviarlos, pero no gestiona por sí solo todo el flujo."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/variables-entorno",
        "label": "Variables de entorno",
        "description": "Las variables de entorno permiten mantener claves fuera del código fuente."
      },
      {
        "id": "analisis-de-datos/requests/autenticacion/auth-base",
        "label": "Autenticación personalizada y AuthBase",
        "description": "Una subclase de AuthBase modifica la petición preparada para implementar un esquema de autenticación."
      }
    ]
  },
  {
    "key": "sesiones",
    "label": "Cookies y sesiones",
    "children": [
      {
        "id": "analisis-de-datos/requests/sesiones/definicion",
        "label": "Definición",
        "description": "Session conserva configuración y cookies entre peticiones, y reutiliza conexiones HTTP cuando es posible."
      },
      {
        "id": "analisis-de-datos/requests/sesiones/cookie-jar",
        "label": "cookies y RequestsCookieJar",
        "description": "cookies permite enviar cookies; RequestsCookieJar conserva nombre, valor y restricciones de dominio y ruta."
      },
      {
        "id": "analisis-de-datos/requests/sesiones/configuracion-sesion",
        "label": "Session.headers y Session.auth",
        "description": "Los encabezados y autenticación de Session se aplican a sus peticiones; las opciones por llamada pueden reemplazarlos."
      },
      {
        "id": "analisis-de-datos/requests/sesiones/session-params",
        "label": "Session.params y métodos",
        "description": "Session permite configurar parámetros predeterminados y usar get, post, put y demás métodos."
      },
      {
        "id": "analisis-de-datos/requests/sesiones/pooling",
        "label": "Connection pooling y keep-alive",
        "description": "La sesión puede reutilizar conexiones persistentes al mismo host, reduciendo el coste de abrir nuevas conexiones."
      },
      {
        "id": "analisis-de-datos/requests/sesiones/close",
        "label": "close y context manager",
        "description": "Session.close libera sus adaptadores y pools. El bloque with lo ejecuta al salir, incluso ante excepciones."
      }
    ]
  },
  {
    "key": "paginacion",
    "label": "Paginación",
    "children": [
      {
        "id": "analisis-de-datos/requests/paginacion/definicion",
        "label": "Definición",
        "description": "Una API paginada devuelve solo una parte de los registros por petición. Hay que recorrer las páginas hasta cumplir la condición final."
      },
      {
        "id": "analisis-de-datos/requests/paginacion/page",
        "label": "Page y per_page",
        "description": "La paginación por página incrementa un número y usa un tamaño de página definido por la API."
      },
      {
        "id": "analisis-de-datos/requests/paginacion/offset",
        "label": "Limit y offset",
        "description": "limit controla el tamaño y offset cuántos registros saltar. El servidor debe ofrecer un orden estable."
      },
      {
        "id": "analisis-de-datos/requests/paginacion/cursor",
        "label": "Cursor",
        "description": "Un cursor identifica la posición siguiente según el servidor. Puede ser un token opaco, no un número que deba incrementarse."
      },
      {
        "id": "analisis-de-datos/requests/paginacion/next-url",
        "label": "Next URL y Link",
        "description": "Algunas APIs entregan la ruta siguiente en el JSON o en el encabezado Link. urljoin resuelve rutas relativas."
      },
      {
        "id": "analisis-de-datos/requests/paginacion/terminacion",
        "label": "Terminación y deduplicación",
        "description": "La extracción debe detectar el final y limitar ciclos; deduplicar por ID evita repetir registros, pero no recupera los omitidos."
      }
    ]
  },
  {
    "key": "reintentos",
    "label": "Reintentos y rate limits",
    "children": [
      {
        "id": "analisis-de-datos/requests/reintentos/definicion",
        "label": "Definición",
        "description": "Un reintento repite una petición tras un fallo transitorio. El límite de peticiones exige controlar frecuencia, esperas y número de intentos."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/retry-after",
        "label": "Retry-After y sleep",
        "description": "Retry-After expresa una espera en segundos o una fecha HTTP. time.sleep permite pausar antes de repetir."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/http-adapter",
        "label": "HTTPAdapter y urllib3.Retry",
        "description": "HTTPAdapter configura el transporte de una sesión. Retry, de urllib3, define las condiciones de reintento automático."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/retry-budgets",
        "label": "total, connect, read y status",
        "description": "Retry permite límites globales y por tipo de fallo. El límite total restringe el conjunto de reintentos."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/retry-conditions",
        "label": "allowed_methods y status_forcelist",
        "description": "allowed_methods limita métodos que pueden reintentarse según el tipo de fallo; status_forcelist indica códigos HTTP elegidos."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/backoff",
        "label": "Backoff y jitter",
        "description": "El backoff exponencial aumenta la espera tras fallos consecutivos; jitter introduce variación para evitar reintentos simultáneos."
      },
      {
        "id": "analisis-de-datos/requests/reintentos/retry-exhausted",
        "label": "Agotamiento de reintentos",
        "description": "Cuando se agotan reintentos por estado HTTP, el adaptador puede lanzar RetryError; con raise_on_status=False entrega la última respuesta."
      }
    ]
  },
  {
    "key": "archivos-y-streaming",
    "label": "Archivos y streaming",
    "children": [
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/definicion",
        "label": "Definición",
        "description": "Requests descarga el cuerpo completo por defecto. stream=True permite consumirlo progresivamente y controlar el uso de memoria."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/guardar-archivo",
        "label": "Guardar bytes en disco",
        "description": "content contiene bytes que pueden guardarse con write_bytes o open en modo wb."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/iter-content",
        "label": "iter_content y chunk_size",
        "description": "iter_content produce fragmentos de bytes; chunk_size indica el tamaño de lectura solicitado, no garantiza que cada fragmento tenga ese tamaño."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/iter-lines",
        "label": "iter_lines y decode_unicode",
        "description": "iter_lines separa líneas del flujo. decode_unicode=True devuelve texto si está definida una codificación."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/raw",
        "label": "raw y close",
        "description": "raw expone el objeto de transporte subyacente; para leer bytes originales usa stream=True y evita la decodificación automática."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/metadatos-archivo",
        "label": "Content-Length y Content-Disposition",
        "description": "Content-Length indica longitud declarada del mensaje si existe; Content-Disposition puede sugerir un nombre de archivo."
      },
      {
        "id": "analisis-de-datos/requests/archivos-y-streaming/stream-upload",
        "label": "Streaming de subida",
        "description": "data acepta un archivo abierto para transmitirlo sin cargar todo su contenido. Un iterador sin longitud conocida puede usar transferencia chunked."
      }
    ]
  },
  {
    "key": "transporte",
    "label": "Peticiones preparadas y transporte",
    "children": [
      {
        "id": "analisis-de-datos/requests/transporte/definicion",
        "label": "Definición",
        "description": "Request describe una petición; PreparedRequest contiene su representación lista para enviar. Session.send ejecuta esa petición preparada."
      },
      {
        "id": "analisis-de-datos/requests/transporte/prepare-send",
        "label": "Session.prepare_request y send",
        "description": "prepare_request incorpora los ajustes de la sesión. send transmite el objeto preparado."
      },
      {
        "id": "analisis-de-datos/requests/transporte/mount-pool",
        "label": "mount y tamaño del pool",
        "description": "mount selecciona un adaptador por prefijo de URL. pool_connections controla pools conservados, pool_maxsize conexiones conservadas por pool, pool_block la espera cuando se agotan."
      },
      {
        "id": "analisis-de-datos/requests/transporte/hooks",
        "label": "Event hooks",
        "description": "Un hook response ejecuta una función al recibir la respuesta. Puede inspeccionarla o transformarla."
      }
    ]
  },
  {
    "key": "seguridad-entorno",
    "label": "Seguridad y entorno",
    "children": [
      {
        "id": "analisis-de-datos/requests/seguridad-entorno/definicion",
        "label": "Definición",
        "description": "Requests puede usar certificados, proxies y credenciales configurados por el entorno. Estas opciones afectan cómo se establece la conexión."
      },
      {
        "id": "analisis-de-datos/requests/seguridad-entorno/verify",
        "label": "verify, CA bundles y certifi",
        "description": "verify=True valida certificados y nombre del servidor en HTTPS; verify también acepta la ruta de un bundle de autoridades de confianza."
      },
      {
        "id": "analisis-de-datos/requests/seguridad-entorno/cert",
        "label": "cert y mTLS",
        "description": "cert permite indicar un certificado de cliente y, si corresponde, una clave privada para autenticación mutua TLS."
      },
      {
        "id": "analisis-de-datos/requests/seguridad-entorno/proxies",
        "label": "proxies y variables del entorno",
        "description": "proxies permite configurar intermediarios por esquema. HTTP_PROXY, HTTPS_PROXY, ALL_PROXY y NO_PROXY pueden influir en la selección."
      },
      {
        "id": "analisis-de-datos/requests/seguridad-entorno/trust-env",
        "label": "trust_env y .netrc",
        "description": "trust_env controla el uso de configuraciones del entorno, incluidos proxies, certificados CA de entorno y autenticación netrc."
      }
    ]
  },
  {
    "key": "pruebas",
    "label": "Pruebas y depuración",
    "children": [
      {
        "id": "analisis-de-datos/requests/pruebas/definicion",
        "label": "Definición",
        "description": "Las pruebas con mocks sustituyen la comunicación real para verificar el comportamiento de una función. La depuración inspecciona la petición y respuesta."
      },
      {
        "id": "analisis-de-datos/requests/pruebas/debug-request",
        "label": "Inspeccionar la petición",
        "description": "response.request permite ver método, URL, encabezados y cuerpo que se prepararon para el envío."
      },
      {
        "id": "analisis-de-datos/requests/pruebas/logging",
        "label": "Logging",
        "description": "logging registra eventos operativos como estado, duración y errores sin necesidad de imprimir datos completos."
      },
      {
        "id": "analisis-de-datos/requests/pruebas/mock-response",
        "label": "Mock de respuesta y excepciones",
        "description": "unittest.mock permite devolver valores controlados o lanzar excepciones para probar rutas de éxito y fallo."
      },
      {
        "id": "analisis-de-datos/requests/pruebas/librerias-mock",
        "label": "requests-mock y responses",
        "description": "Estas bibliotecas externas interceptan peticiones Requests y permiten simular respuestas con URL, código y contenido definidos."
      },
      {
        "id": "analisis-de-datos/requests/pruebas/pytest",
        "label": "pytest y asserts",
        "description": "pytest ejecuta funciones de prueba y muestra fallos de aserciones. También puedes usar assert en scripts sencillos."
      }
    ]
  },
  {
    "key": "transformacion",
    "label": "Transformación de respuestas",
    "children": [
      {
        "id": "analisis-de-datos/requests/transformacion/definicion",
        "label": "Definición",
        "description": "Los datos de una respuesta deben convertirse y validarse antes del análisis. pandas permite construir tablas a partir de registros JSON o archivos."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/json-anidado",
        "label": "Diccionarios, listas y JSON anidado",
        "description": "json() devuelve listas, diccionarios u otros tipos JSON convertidos a Python. Accede a los campos siguiendo la estructura."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/json-normalize",
        "label": "pd.DataFrame y json_normalize",
        "description": "DataFrame convierte registros en filas; json_normalize expande diccionarios anidados en columnas separadas."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/read-csv",
        "label": "BytesIO y read_csv",
        "description": "BytesIO convierte bytes en un objeto de archivo en memoria que pandas puede leer."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/read-excel",
        "label": "Excel y otros binarios",
        "description": "Los archivos Excel pueden leerse con pd.read_excel(BytesIO(response.content)) tras comprobar el estado y formato."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/validacion",
        "label": "Validación de estructura",
        "description": "Antes de usar JSON, comprueba tipos y claves obligatorias. Una API puede devolver errores de negocio con HTTP 200."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/limpieza",
        "label": "Limpieza y valores ausentes",
        "description": "La limpieza convierte tipos, trata ausencias y elimina duplicados conforme a reglas de negocio."
      },
      {
        "id": "analisis-de-datos/requests/transformacion/exportacion",
        "label": "Exportar CSV, JSON, Excel y SQL",
        "description": "El resultado limpio puede persistirse mediante to_csv, to_json, to_excel o to_sql, según el destino."
      }
    ]
  },
  {
    "key": "extraccion-etl",
    "label": "Extracción de datos y ETL",
    "children": [
      {
        "id": "analisis-de-datos/requests/extraccion-etl/definicion",
        "label": "Definición",
        "description": "ETL extrae registros de una fuente, los transforma y los carga en un destino. Requests cubre principalmente la extracción HTTP."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/incremental",
        "label": "Extracción completa e incremental",
        "description": "Una extracción completa recorre toda la fuente; una incremental solicita datos nuevos o actualizados desde un punto de control."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/checkpoints",
        "label": "Watermarks y checkpoints",
        "description": "Un watermark identifica el último punto confirmado; un checkpoint permite reanudar la extracción tras un fallo."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/batch",
        "label": "Batch processing y deduplicación",
        "description": "Procesar por lotes acota el tamaño de cada operación. Una clave estable permite detectar o actualizar registros repetidos."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/schema-drift",
        "label": "Schema drift y calidad",
        "description": "Schema drift es un cambio en campos o tipos respecto al contrato. Las comprobaciones de calidad detectan diferencias antes de cargar datos."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/etag",
        "label": "Caché y ETag",
        "description": "ETag identifica una versión de una representación. If-None-Match permite comprobar si la copia local sigue vigente."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/last-modified",
        "label": "Last-Modified",
        "description": "Last-Modified indica cuándo se modificó una representación; If-Modified-Since permite una consulta condicional basada en esa fecha."
      },
      {
        "id": "analisis-de-datos/requests/extraccion-etl/automatizacion",
        "label": "Automatización y tareas periódicas",
        "description": "Requests puede integrarse en scripts programados mediante cron, Task Scheduler u otro orquestador. No incluye un planificador."
      }
    ]
  },
  {
    "key": "otros-tipos-api",
    "label": "Otros tipos de API",
    "children": [
      {
        "id": "analisis-de-datos/requests/otros-tipos-api/definicion",
        "label": "Definición",
        "description": "Requests transporta mensajes HTTP independientemente de si la API usa REST, GraphQL, SOAP u otro contrato."
      },
      {
        "id": "analisis-de-datos/requests/otros-tipos-api/openapi-versionado",
        "label": "OpenAPI, Swagger y versionado",
        "description": "OpenAPI describe rutas, métodos, parámetros, autenticación y esquemas. Las versiones pueden expresarse en ruta, encabezado u otra convención."
      },
      {
        "id": "analisis-de-datos/requests/otros-tipos-api/graphql",
        "label": "GraphQL",
        "description": "GraphQL suele recibir una consulta y variables en un cuerpo JSON. Puede devolver errores de aplicación junto con HTTP 200."
      },
      {
        "id": "analisis-de-datos/requests/otros-tipos-api/soap-xml",
        "label": "SOAP y XML",
        "description": "SOAP usa mensajes XML con una envoltura y reglas definidas por el servicio. Requests puede transmitirlos como bytes."
      },
      {
        "id": "analisis-de-datos/requests/otros-tipos-api/webhooks",
        "label": "Webhooks",
        "description": "Un webhook envía notificaciones HTTP a un receptor. Requests puede enviar una notificación, pero no es un servidor que escuche webhooks."
      }
    ]
  },
  {
    "key": "concurrencia",
    "label": "Concurrencia",
    "children": [
      {
        "id": "analisis-de-datos/requests/concurrencia/definicion",
        "label": "Definición",
        "description": "Requests es síncrono y bloquea el hilo que realiza la petición. Para solicitudes independientes pueden usarse hilos, con límites de concurrencia."
      },
      {
        "id": "analisis-de-datos/requests/concurrencia/thread-pool",
        "label": "ThreadPoolExecutor",
        "description": "ThreadPoolExecutor ejecuta tareas independientes en varios hilos. Limita trabajadores y conserva el manejo de excepciones."
      },
      {
        "id": "analisis-de-datos/requests/concurrencia/limites-cliente",
        "label": "Límites y elección de cliente",
        "description": "El número de trabajadores controla concurrencia, no peticiones por segundo. Para asyncio nativo se puede usar HTTPX o aiohttp en lugar de Requests."
      }
    ]
  }
];
