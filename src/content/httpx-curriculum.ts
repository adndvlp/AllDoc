// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const httpxCurriculum = [
  {
    "key": "fundamentos-http",
    "label": "Fundamentos HTTP",
    "children": [
      {
        "id": "analisis-de-datos/httpx/fundamentos-http/definicion",
        "label": "Definición",
        "description": "HTTP es el protocolo de intercambio entre un cliente y un servidor. HTTPX permite construir peticiones y leer respuestas en Python."
      },
      {
        "id": "analisis-de-datos/httpx/fundamentos-http/instalacion-e-importacion",
        "label": "Instalación e importación",
        "description": "Instala HTTPX en el entorno de Python que ejecuta tu código e impórtalo como módulo."
      },
      {
        "id": "analisis-de-datos/httpx/fundamentos-http/cliente-servidor-y-endpoint",
        "label": "Cliente, servidor y endpoint",
        "description": "Un endpoint es una ruta que ofrece una operación de una API; la URL incluye el esquema, host y ruta."
      },
      {
        "id": "analisis-de-datos/httpx/fundamentos-http/metodos-seguros-e-idempotentes",
        "label": "Métodos seguros e idempotentes",
        "description": "Un método seguro no solicita cambios de estado; uno idempotente tiene el mismo efecto pretendido si se repite. GET es seguro; PUT y DELETE son idempotentes por semántica HTTP, POST normalmente no."
      }
    ]
  },
  {
    "key": "metodos-http",
    "label": "Métodos HTTP",
    "children": [
      {
        "id": "analisis-de-datos/httpx/metodos-http/definicion",
        "label": "Definición",
        "description": "Los métodos indican qué operación deseas realizar sobre un recurso. HTTPX ofrece funciones directas (`httpx.get`, `httpx.post`, `httpx.put`, `httpx.patch`, `httpx.delete`, `httpx.head`, `httpx.options`, `httpx.request`) y métodos equivalentes de Client."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/get",
        "label": "GET",
        "description": "GET solicita una representación del recurso, normalmente sin cuerpo."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/post",
        "label": "POST",
        "description": "POST envía datos para que el servidor los procese; a menudo crea un recurso."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/put",
        "label": "PUT",
        "description": "PUT solicita crear o sustituir la representación del recurso identificado."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/patch",
        "label": "PATCH",
        "description": "PATCH solicita una modificación parcial según el formato que acepta el servidor."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/delete",
        "label": "DELETE",
        "description": "DELETE solicita eliminar la asociación del recurso con su URI."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/head",
        "label": "HEAD",
        "description": "HEAD solicita los encabezados que corresponderían a GET sin el cuerpo de respuesta."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/options",
        "label": "OPTIONS",
        "description": "OPTIONS solicita las opciones de comunicación disponibles para un recurso."
      },
      {
        "id": "analisis-de-datos/httpx/metodos-http/request",
        "label": "request()",
        "description": "`httpx.request()` y `client.request()` permiten seleccionar el método dinámicamente."
      }
    ]
  },
  {
    "key": "url-y-parametros",
    "label": "URL y parámetros",
    "children": [
      {
        "id": "analisis-de-datos/httpx/url-y-parametros/definicion",
        "label": "Definición",
        "description": "La ruta identifica el recurso y los parámetros de consulta ajustan la selección solicitada."
      },
      {
        "id": "analisis-de-datos/httpx/url-y-parametros/path-parameters",
        "label": "Path parameters",
        "description": "Un valor en la ruta identifica un recurso particular; no es un argumento especial de HTTPX."
      },
      {
        "id": "analisis-de-datos/httpx/url-y-parametros/params",
        "label": "params",
        "description": "`params` acepta pares clave-valor que HTTPX incorpora en la query de la URL."
      },
      {
        "id": "analisis-de-datos/httpx/url-y-parametros/parametros-repetidos",
        "label": "Parámetros repetidos",
        "description": "Una lista de pares permite repetir el mismo nombre de parámetro."
      },
      {
        "id": "analisis-de-datos/httpx/url-y-parametros/url-y-queryparams",
        "label": "URL y QueryParams",
        "description": "`httpx.URL` y `httpx.QueryParams` representan URLs y parámetros como objetos. Sus operaciones de modificación devuelven nuevas instancias."
      }
    ]
  },
  {
    "key": "encabezados-http",
    "label": "Encabezados HTTP",
    "children": [
      {
        "id": "analisis-de-datos/httpx/encabezados-http/definicion",
        "label": "Definición",
        "description": "Los headers son metadatos de una petición o respuesta, como el formato o las credenciales."
      },
      {
        "id": "analisis-de-datos/httpx/encabezados-http/accept-y-content-type",
        "label": "Accept y Content-Type",
        "description": "Accept indica formatos que acepta el cliente; Content-Type describe el formato del cuerpo enviado o recibido."
      },
      {
        "id": "analisis-de-datos/httpx/encabezados-http/httpx-headers",
        "label": "httpx.Headers",
        "description": "Es una colección de encabezados que permite recuperar valores repetidos."
      },
      {
        "id": "analisis-de-datos/httpx/encabezados-http/authorization",
        "label": "Authorization",
        "description": "Este encabezado transporta credenciales según el esquema de autenticación."
      }
    ]
  },
  {
    "key": "cuerpo-de-la-peticion",
    "label": "Cuerpo de la petición",
    "children": [
      {
        "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/definicion",
        "label": "Definición",
        "description": "El cuerpo contiene los datos enviados al servidor. HTTPX permite serializar JSON, formularios, bytes y archivos."
      },
      {
        "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/json",
        "label": "json",
        "description": "Serializa un objeto Python compatible con JSON y asigna el Content-Type correspondiente."
      },
      {
        "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/data",
        "label": "data",
        "description": "Codifica campos de formulario, normalmente como application/x-www-form-urlencoded."
      },
      {
        "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/content",
        "label": "content",
        "description": "Envía texto, bytes o un iterable de bytes como contenido directo."
      },
      {
        "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/files-y-multipart",
        "label": "files y multipart",
        "description": "`files` crea un cuerpo multipart para adjuntar archivos; puede combinarse con `data` para campos adicionales."
      }
    ]
  },
  {
    "key": "response-y-contenido",
    "label": "Response y contenido",
    "children": [
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/definicion",
        "label": "Definición",
        "description": "Cada petición devuelve un objeto `httpx.Response` con estado, encabezados, contenido y metadatos."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/status-code-y-reason-phrase",
        "label": "status_code y reason_phrase",
        "description": "El código numérico expresa el estado HTTP; la frase es una descripción auxiliar."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/json",
        "label": "json()",
        "description": "Interpreta el cuerpo como JSON y devuelve objetos Python."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/text-y-encoding",
        "label": "text y encoding",
        "description": "`text` decodifica bytes como texto; `encoding` indica o permite establecer la codificación antes de leerlo."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/content",
        "label": "content",
        "description": "`content` devuelve el cuerpo en bytes después de decodificar la compresión HTTP."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/headers",
        "label": "headers",
        "description": "La respuesta ofrece los encabezados enviados por el servidor."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/url-y-request",
        "label": "url y request",
        "description": "`response.url` identifica la URL de la petición asociada y `response.request` permite inspeccionarla."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/elapsed-y-http-version",
        "label": "elapsed y http_version",
        "description": "`elapsed` mide el tiempo hasta que se cierra la respuesta; `http_version` informa el protocolo de esa respuesta."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/links",
        "label": "links",
        "description": "`response.links` interpreta los enlaces del encabezado Link, útiles para paginación."
      },
      {
        "id": "analisis-de-datos/httpx/response-y-contenido/default-encoding",
        "label": "default_encoding",
        "description": "Configura la codificación de respaldo para respuestas de texto que no indican charset. Acepta un nombre de codificación o una función de detección."
      }
    ]
  },
  {
    "key": "estados-http-y-validacion",
    "label": "Estados HTTP y validación",
    "children": [
      {
        "id": "analisis-de-datos/httpx/estados-http-y-validacion/definicion",
        "label": "Definición",
        "description": "Los estados HTTP distinguen respuestas informativas, exitosas, redirecciones y errores."
      },
      {
        "id": "analisis-de-datos/httpx/estados-http-y-validacion/familias-y-httpx-codes",
        "label": "Familias y httpx.codes",
        "description": "Los códigos 1xx informan, 2xx indican éxito, 3xx redirección u otro estado de esa familia, 4xx problemas del cliente y 5xx del servidor. `httpx.codes` da nombres a códigos comunes."
      },
      {
        "id": "analisis-de-datos/httpx/estados-http-y-validacion/propiedades-is",
        "label": "Propiedades is_*",
        "description": "`is_informational`, `is_success`, `is_redirect`, `is_client_error`, `is_server_error` e `is_error` clasifican el código."
      },
      {
        "id": "analisis-de-datos/httpx/estados-http-y-validacion/raise-for-status",
        "label": "raise_for_status()",
        "description": "Lanza `HTTPStatusError` si la respuesta no es 2xx; requiere que la respuesta esté asociada con una petición."
      },
      {
        "id": "analisis-de-datos/httpx/estados-http-y-validacion/respuestas-vacias-e-invalidas",
        "label": "Respuestas vacías e inválidas",
        "description": "Comprueba el estado y el formato antes de interpretar el cuerpo."
      }
    ]
  },
  {
    "key": "client-y-sesiones",
    "label": "Client y sesiones",
    "children": [
      {
        "id": "analisis-de-datos/httpx/client-y-sesiones/definicion",
        "label": "Definición",
        "description": "`httpx.Client` conserva configuración, cookies y conexiones entre peticiones."
      },
      {
        "id": "analisis-de-datos/httpx/client-y-sesiones/context-manager-y-close",
        "label": "Context manager y close()",
        "description": "`with` cierra el cliente al terminar; si se crea manualmente, llama a `close()` en un `finally`."
      },
      {
        "id": "analisis-de-datos/httpx/client-y-sesiones/base-url",
        "label": "base_url",
        "description": "Permite resolver rutas relativas contra una URL base del cliente."
      },
      {
        "id": "analisis-de-datos/httpx/client-y-sesiones/configuracion-compartida",
        "label": "Configuración compartida",
        "description": "Headers, params, cookies y auth pueden definirse en el cliente; los ajustes por petición pueden completar o sustituir valores según el parámetro."
      },
      {
        "id": "analisis-de-datos/httpx/client-y-sesiones/connection-pooling-y-limits",
        "label": "Connection pooling y Limits",
        "description": "Un cliente real reutiliza conexiones. `Limits` ajusta conexiones totales, persistentes y caducidad de conexiones inactivas."
      }
    ]
  },
  {
    "key": "cookies-y-sesiones-http",
    "label": "Cookies y sesiones HTTP",
    "children": [
      {
        "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/definicion",
        "label": "Definición",
        "description": "Las cookies son valores que el servidor puede establecer y que el cliente devuelve cuando corresponden al dominio y ruta."
      },
      {
        "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/cookies-por-peticion-y-por-cliente",
        "label": "Cookies por petición y por cliente",
        "description": "`cookies` permite inicializar valores; un cliente conserva cookies de las respuestas."
      },
      {
        "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/httpx-cookies",
        "label": "httpx.Cookies",
        "description": "Permite gestionar valores con `set`, `get` y `delete`, teniendo en cuenta dominio y ruta."
      }
    ]
  },
  {
    "key": "redirecciones",
    "label": "Redirecciones",
    "children": [
      {
        "id": "analisis-de-datos/httpx/redirecciones/definicion",
        "label": "Definición",
        "description": "Una redirección indica que el cliente debe consultar otra URL; HTTPX no las sigue por defecto."
      },
      {
        "id": "analisis-de-datos/httpx/redirecciones/follow-redirects-y-history",
        "label": "follow_redirects y history",
        "description": "Activa el seguimiento automático y consulta `history` para ver las respuestas intermedias."
      },
      {
        "id": "analisis-de-datos/httpx/redirecciones/next-request",
        "label": "next_request",
        "description": "Permite inspeccionar y enviar manualmente la petición que continuaría una redirección."
      },
      {
        "id": "analisis-de-datos/httpx/redirecciones/max-redirects",
        "label": "max_redirects",
        "description": "Limita los saltos automáticos; un exceso produce `TooManyRedirects`."
      }
    ]
  },
  {
    "key": "timeouts",
    "label": "Timeouts",
    "children": [
      {
        "id": "analisis-de-datos/httpx/timeouts/definicion",
        "label": "Definición",
        "description": "Un timeout limita cuánto se espera en una fase de la comunicación. HTTPX usa por defecto cinco segundos de inactividad de red, no un plazo total de ejecución."
      },
      {
        "id": "analisis-de-datos/httpx/timeouts/timeout-por-peticion",
        "label": "Timeout por petición",
        "description": "`timeout` puede definirse al llamar una petición o como configuración del cliente."
      },
      {
        "id": "analisis-de-datos/httpx/timeouts/httpx-timeout",
        "label": "httpx.Timeout",
        "description": "Permite distinguir espera de conexión, lectura, escritura y adquisición de una conexión del pool."
      },
      {
        "id": "analisis-de-datos/httpx/timeouts/excepciones-de-timeout",
        "label": "Excepciones de timeout",
        "description": "ConnectTimeout, ReadTimeout, WriteTimeout y PoolTimeout heredan de TimeoutException."
      }
    ]
  },
  {
    "key": "excepciones",
    "label": "Excepciones",
    "children": [
      {
        "id": "analisis-de-datos/httpx/excepciones/definicion",
        "label": "Definición",
        "description": "HTTPX distingue una respuesta HTTP no exitosa de una petición que no pudo completarse por problemas de transporte."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/httpstatuserror",
        "label": "HTTPStatusError",
        "description": "Se genera al llamar `raise_for_status()` sobre una respuesta no 2xx. Incluye request y response."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/requesterror-y-httperror",
        "label": "RequestError y HTTPError",
        "description": "RequestError agrupa fallos de petición; HTTPError es la base común de RequestError y HTTPStatusError."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/transporterror-y-networkerror",
        "label": "TransportError y NetworkError",
        "description": "TransportError agrupa fallos del transporte. NetworkError incluye ConnectError, ReadError, WriteError y CloseError."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/protocolo-y-otros-errores",
        "label": "Protocolo y otros errores",
        "description": "ProtocolError agrupa LocalProtocolError y RemoteProtocolError; ProxyError y UnsupportedProtocol son errores de transporte; DecodingError y TooManyRedirects son RequestError."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/invalidurl-y-cookieconflict",
        "label": "InvalidURL y CookieConflict",
        "description": "Son excepciones específicas de URL y cookies, fuera de HTTPError."
      },
      {
        "id": "analisis-de-datos/httpx/excepciones/streamerror",
        "label": "StreamError",
        "description": "Agrupa errores de uso de streams: StreamConsumed, StreamClosed, ResponseNotRead y RequestNotRead."
      }
    ]
  },
  {
    "key": "autenticacion",
    "label": "Autenticación",
    "children": [
      {
        "id": "analisis-de-datos/httpx/autenticacion/definicion",
        "label": "Definición",
        "description": "La autenticación identifica al cliente frente a un servicio. HTTPX permite headers y mecanismos integrados mediante `auth`."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/api-key",
        "label": "API Key",
        "description": "La API puede pedir una clave en un header o parámetro definido por su contrato. No existe un parámetro universal de API key en HTTPX."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/bearer-token",
        "label": "Bearer Token",
        "description": "Un token Bearer se envía normalmente como `Authorization: Bearer TOKEN`."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/basicauth",
        "label": "BasicAuth",
        "description": "HTTPX acepta `auth=(usuario, contraseña)` o `httpx.BasicAuth`. Basic codifica las credenciales, no las cifra."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/digestauth",
        "label": "DigestAuth",
        "description": "Digest responde a un desafío de autenticación del servidor; no requiere construir manualmente el header de respuesta al desafío."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/netrcauth",
        "label": "NetRCAuth",
        "description": "Lee credenciales desde un archivo netrc, mediante la biblioteca estándar de Python."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/variables-de-entorno",
        "label": "Variables de entorno",
        "description": "Lee credenciales de configuración externa en lugar de incluirlas en el código fuente."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/oauth-2-0-y-renovacion",
        "label": "OAuth 2.0 y renovación",
        "description": "OAuth 2.0 define flujos para obtener tokens de acceso. HTTPX transporta solicitudes y tokens, pero no implementa por sí solo todo el flujo OAuth."
      },
      {
        "id": "analisis-de-datos/httpx/autenticacion/autenticacion-personalizada",
        "label": "Autenticación personalizada",
        "description": "Subclasifica `httpx.Auth` y define `auth_flow` para modificar o encadenar peticiones."
      }
    ]
  },
  {
    "key": "https-y-configuracion-del-entorno",
    "label": "HTTPS y configuración del entorno",
    "children": [
      {
        "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/definicion",
        "label": "Definición",
        "description": "HTTPS usa TLS para proteger la comunicación y autenticar el servidor con certificados. HTTPX verifica certificados de forma predeterminada."
      },
      {
        "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/sslcontext-y-ca-personalizada",
        "label": "SSLContext y CA personalizada",
        "description": "`verify` acepta un `ssl.SSLContext` para elegir autoridades de confianza o configurar TLS."
      },
      {
        "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/certificados-de-cliente",
        "label": "Certificados de cliente",
        "description": "En TLS mutuo el cliente también presenta un certificado y su clave. Usa un contexto SSL con `load_cert_chain`."
      },
      {
        "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/trust-env",
        "label": "trust_env",
        "description": "HTTPX usa por defecto variables de entorno de proxies y certificados. `trust_env=False` desactiva esa configuración implícita."
      },
      {
        "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/ssl-cert-file-y-ssl-cert-dir",
        "label": "SSL_CERT_FILE y SSL_CERT_DIR",
        "description": "Permiten señalar un archivo de CA o un directorio preparado para OpenSSL cuando se confía en el entorno."
      }
    ]
  },
  {
    "key": "proxies-y-protocolos",
    "label": "Proxies y protocolos",
    "children": [
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/definicion",
        "label": "Definición",
        "description": "Un proxy intermedia las conexiones entre cliente y destino. HTTPX admite configuración explícita o desde el entorno."
      },
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/http-proxy-https-proxy-all-proxy-y-no-proxy",
        "label": "HTTP_PROXY, HTTPS_PROXY, ALL_PROXY y NO_PROXY",
        "description": "Las primeras tres variables definen proxies para esquemas concretos o para todos; NO_PROXY excluye destinos."
      },
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/socks",
        "label": "SOCKS",
        "description": "HTTPX admite proxy SOCKS con la dependencia opcional correspondiente."
      },
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/mounts",
        "label": "mounts",
        "description": "Permite seleccionar transportes por esquema o patrón de URL."
      },
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/http-1-1-y-http-2",
        "label": "HTTP/1.1 y HTTP/2",
        "description": "HTTPX admite HTTP/1.1 y puede habilitar HTTP/2 con `http2=True`; la versión efectiva depende del servidor y la negociación."
      },
      {
        "id": "analisis-de-datos/httpx/proxies-y-protocolos/compresion-y-dependencias-opcionales",
        "label": "Compresión y dependencias opcionales",
        "description": "HTTPX decodifica formatos HTTP de compresión admitidos; Brotli y Zstandard requieren extras opcionales."
      }
    ]
  },
  {
    "key": "streaming-y-archivos",
    "label": "Streaming y archivos",
    "children": [
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/definicion",
        "label": "Definición",
        "description": "El streaming procesa el cuerpo progresivamente, sin necesitar cargarlo completo en memoria."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/httpx-stream-y-client-stream",
        "label": "httpx.stream() y client.stream()",
        "description": "Son context managers de respuestas en streaming; la forma directa crea su propio cliente."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-bytes-y-descarga",
        "label": "iter_bytes() y descarga",
        "description": "Itera bytes decodificados y permite escribir cada bloque en disco."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-text-e-iter-lines",
        "label": "iter_text() e iter_lines()",
        "description": "`iter_text` produce texto por bloques; `iter_lines` devuelve líneas de texto sin sus terminadores."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-raw",
        "label": "iter_raw()",
        "description": "Produce bytes sin decodificar Content-Encoding. No equivale a capturar todos los bytes del protocolo de red."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/read-y-cierre",
        "label": "read() y cierre",
        "description": "`read()` consume y almacena el cuerpo; tras leerlo puedes consultar content o text. `close()` cierra una respuesta síncrona."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/num-bytes-downloaded",
        "label": "num_bytes_downloaded",
        "description": "Cuenta los bytes del cuerpo recibidos mientras se consume el stream; puede diferir del tamaño descomprimido."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/subir-archivos-desde-disco",
        "label": "Subir archivos desde disco",
        "description": "Abre el archivo en modo binario y mantenlo abierto durante la petición multipart."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-text",
        "label": "iter_text()",
        "description": "Lee el cuerpo de un stream como bloques de texto decodificado."
      }
    ]
  },
  {
    "key": "programacion-asincrona",
    "label": "Programación asíncrona",
    "children": [
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/definicion",
        "label": "Definición",
        "description": "AsyncClient permite esperar operaciones de red sin bloquear el bucle de eventos. La concurrencia ayuda cuando hay varias esperas de I/O."
      },
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/asyncclient-async-with-y-aclose",
        "label": "AsyncClient, async with y aclose()",
        "description": "Usa `async with` para liberar el cliente o llama a `await c.aclose()` en finally."
      },
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/asyncio-gather",
        "label": "asyncio.gather()",
        "description": "Ejecuta varias corutinas concurrentemente y devuelve sus resultados en el orden de los argumentos."
      },
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/semaphore",
        "label": "Semaphore",
        "description": "Limita cuántas tareas pueden acceder simultáneamente a una sección; no impone por sí mismo una tasa de peticiones por segundo."
      },
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/cancelacion-y-plazo-total",
        "label": "Cancelación y plazo total",
        "description": "Una tarea asíncrona puede cancelarse; `asyncio.wait_for` limita el tiempo total esperado de una operación y solicita cancelación al vencer."
      },
      {
        "id": "analisis-de-datos/httpx/programacion-asincrona/anyio-y-trio",
        "label": "AnyIO y Trio",
        "description": "HTTPX AsyncClient puede funcionar en backends asyncio y Trio; AnyIO facilita código compatible con ambos."
      }
    ]
  },
  {
    "key": "streaming-asincrono",
    "label": "Streaming asíncrono",
    "children": [
      {
        "id": "analisis-de-datos/httpx/streaming-asincrono/definicion",
        "label": "Definición",
        "description": "Los métodos de streaming asíncronos entregan bloques con `async for` y mantienen abierta la respuesta con `async with`."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-bytes-aiter-text-y-aiter-lines",
        "label": "aiter_bytes(), aiter_text() y aiter_lines()",
        "description": "Son las variantes asíncronas de los iteradores de bytes, texto y líneas."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-raw",
        "label": "aiter_raw()",
        "description": "Itera los bytes del cuerpo sin decodificar compresión HTTP."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-asincrono/aread-y-aclose",
        "label": "aread() y aclose()",
        "description": "`aread` lee el cuerpo completo; `aclose` libera el stream. Con `send(stream=True)` debes garantizar el cierre manual."
      },
      {
        "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-text",
        "label": "aiter_text()",
        "description": "Itera texto decodificado de una respuesta asíncrona."
      }
    ]
  },
  {
    "key": "paginacion",
    "label": "Paginación",
    "children": [
      {
        "id": "analisis-de-datos/httpx/paginacion/definicion",
        "label": "Definición",
        "description": "Una API paginada devuelve una parte de los registros en cada respuesta. Debes solicitar las páginas restantes según el contrato del servicio."
      },
      {
        "id": "analisis-de-datos/httpx/paginacion/paginas-numeradas",
        "label": "Páginas numeradas",
        "description": "Envía page y el tamaño definido por la API. Detén el bucle según los metadatos o la regla de terminación documentada."
      },
      {
        "id": "analisis-de-datos/httpx/paginacion/offset-y-limit",
        "label": "Offset y limit",
        "description": "Offset señala cuántos registros omitir y limit el máximo que se solicita."
      },
      {
        "id": "analisis-de-datos/httpx/paginacion/cursor",
        "label": "Cursor",
        "description": "El cursor es un token que el servidor entrega para continuar; trátalo como opaco, aunque parezca un número."
      },
      {
        "id": "analisis-de-datos/httpx/paginacion/enlaces-next",
        "label": "Enlaces next",
        "description": "Algunas APIs entregan la URL de la próxima página en Link o en el JSON."
      }
    ]
  },
  {
    "key": "limites-y-reintentos",
    "label": "Límites y reintentos",
    "children": [
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/definicion",
        "label": "Definición",
        "description": "Los servicios pueden limitar el ritmo de consultas o fallar temporalmente. Reintenta solo operaciones adecuadas, con límite y pausas."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/retry-after",
        "label": "Retry-After",
        "description": "El servidor puede indicar una espera en segundos o una fecha HTTP. Interpreta el formato y respeta el límite antes de volver a consultar."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/retries-del-transporte",
        "label": "Retries del transporte",
        "description": "`HTTPTransport(retries=n)` reintenta ConnectError y ConnectTimeout en el transporte real. No reintenta por sí mismo 429 ni 503."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/backoff-exponencial-y-jitter",
        "label": "Backoff exponencial y jitter",
        "description": "El backoff aumenta las pausas tras fallos; el jitter agrega variación para reducir reintentos simultáneos de múltiples clientes."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/reintentar-una-consulta",
        "label": "Reintentar una consulta",
        "description": "Repite una consulta ante estados transitorios definidos por la política. Para POST verifica idempotencia o usa una clave de idempotencia si la API la admite."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/control-de-ritmo",
        "label": "Control de ritmo",
        "description": "Limita la frecuencia de inicio de peticiones según el contrato de la API, incluso si las conexiones son rápidas."
      },
      {
        "id": "analisis-de-datos/httpx/limites-y-reintentos/retry-after-como-fecha",
        "label": "Retry-After como fecha",
        "description": "Cuando Retry-After es una fecha HTTP, calcula los segundos restantes respecto a la hora actual UTC."
      }
    ]
  },
  {
    "key": "datos-de-api-y-validacion",
    "label": "Datos de API y validación",
    "children": [
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/definicion",
        "label": "Definición",
        "description": "El formato del cuerpo y la estructura de los registros dependen de la API. HTTPX transporta datos; Python y otras bibliotecas los interpretan."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/json-anidado-y-modulo-json",
        "label": "JSON anidado y módulo json",
        "description": "`.json()` interpreta el cuerpo HTTP; `json.dumps` y `json.loads` serializan e interpretan texto JSON fuera de la petición."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/validacion-de-estructura",
        "label": "Validación de estructura",
        "description": "Comprueba que el resultado tenga los campos y tipos requeridos antes de usarlo."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/csv-xml-y-html",
        "label": "CSV, XML y HTML",
        "description": "Selecciona el parser según el formato real: csv, ElementTree o una biblioteca HTML. HTTPX no analiza automáticamente estos formatos."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/rest-y-graphql",
        "label": "REST y GraphQL",
        "description": "REST suele exponer recursos mediante rutas y métodos; GraphQL recibe una consulta que selecciona campos según su esquema."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/interpretar-xml",
        "label": "Interpretar XML",
        "description": "ElementTree interpreta documentos XML y permite seleccionar elementos."
      },
      {
        "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/interpretar-html",
        "label": "Interpretar HTML",
        "description": "Un parser HTML extrae elementos de páginas; HTTPX solo recupera el documento."
      }
    ]
  },
  {
    "key": "extraccion-y-etl",
    "label": "Extracción y ETL",
    "children": [
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/definicion",
        "label": "Definición",
        "description": "ETL significa extraer, transformar y cargar datos. HTTPX se encarga principalmente de la extracción y del envío de resultados cuando la API lo requiere."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/extraccion-incremental",
        "label": "Extracción incremental",
        "description": "Recupera registros nuevos o modificados usando un marcador de fecha, ID o cursor que admita la API."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/eliminar-duplicados",
        "label": "Eliminar duplicados",
        "description": "Al combinar páginas o reintentos, identifica registros por una clave estable y aplica una regla de actualización."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/checkpoint-y-recuperacion",
        "label": "Checkpoint y recuperación",
        "description": "Persiste el cursor o marcador después de guardar cada lote correctamente. Una carga idempotente permite reanudar sin duplicar registros."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/pandas-y-json-normalize",
        "label": "Pandas y json_normalize",
        "description": "Convierte registros JSON en un DataFrame para limpiar, agregar y analizar datos tabulares."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/exportacion-csv-y-json",
        "label": "Exportación CSV y JSON",
        "description": "Guarda los registros en un formato que pueda utilizar otra herramienta."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/exportacion-excel",
        "label": "Exportación Excel",
        "description": "Utiliza pandas con un motor Excel para guardar un DataFrame como hoja de cálculo."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/carga-sql",
        "label": "Carga SQL",
        "description": "Usa un driver o biblioteca de base de datos para guardar los registros extraídos. HTTPX no reemplaza al cliente SQL."
      },
      {
        "id": "analisis-de-datos/httpx/extraccion-y-etl/cache-condicional-etag-y-last-modified",
        "label": "Caché condicional: ETag y Last-Modified",
        "description": "Un servidor puede devolver 304 si la representación no cambió. Guarda la respuesta anterior y envía su validador en la siguiente consulta."
      }
    ]
  },
  {
    "key": "request-y-response-explicitos",
    "label": "Request y Response explícitos",
    "children": [
      {
        "id": "analisis-de-datos/httpx/request-y-response-explicitos/definicion",
        "label": "Definición",
        "description": "`Request` representa una petición preparada y `Response` una respuesta. Son útiles para inspección, pruebas y transportes."
      },
      {
        "id": "analisis-de-datos/httpx/request-y-response-explicitos/build-request",
        "label": "build_request()",
        "description": "Construye una petición aplicando la URL base y configuración compartida del cliente."
      },
      {
        "id": "analisis-de-datos/httpx/request-y-response-explicitos/send",
        "label": "send()",
        "description": "Envía una petición ya construida; no vuelve a combinar todos los ajustes como build_request."
      },
      {
        "id": "analisis-de-datos/httpx/request-y-response-explicitos/response-construida",
        "label": "Response construida",
        "description": "`httpx.Response` permite crear una respuesta artificial con estado, headers y contenido."
      }
    ]
  },
  {
    "key": "event-hooks-y-diagnostico",
    "label": "Event hooks y diagnóstico",
    "children": [
      {
        "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/definicion",
        "label": "Definición",
        "description": "Los event hooks ejecutan funciones en etapas de la petición y la respuesta. Sirven para métricas, registro y validaciones compartidas."
      },
      {
        "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hook-request",
        "label": "Hook request",
        "description": "El hook request se ejecuta antes de enviar la petición; recibe un Request."
      },
      {
        "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hook-response",
        "label": "Hook response",
        "description": "Se ejecuta al recibir la respuesta, antes de leer automáticamente el cuerpo. Puede centralizar raise_for_status."
      },
      {
        "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hooks-asincronos",
        "label": "Hooks asíncronos",
        "description": "AsyncClient requiere funciones hook asíncronas."
      },
      {
        "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/logging-y-monitoreo",
        "label": "Logging y monitoreo",
        "description": "Usa logging para registrar fallos, estados, latencia y progreso; HTTPX y httpcore también emiten logs diagnósticos."
      }
    ]
  },
  {
    "key": "transportes",
    "label": "Transportes",
    "children": [
      {
        "id": "analisis-de-datos/httpx/transportes/definicion",
        "label": "Definición",
        "description": "Un transporte ejecuta la petición a bajo nivel y devuelve una respuesta. HTTPX permite sustituirlo para pruebas o configuraciones especiales."
      },
      {
        "id": "analisis-de-datos/httpx/transportes/httptransport-y-asynchttptransport",
        "label": "HTTPTransport y AsyncHTTPTransport",
        "description": "Son transportes de red síncrono y asíncrono; permiten configurar parámetros de bajo nivel como retries y local_address."
      },
      {
        "id": "analisis-de-datos/httpx/transportes/unix-domain-sockets",
        "label": "Unix Domain Sockets",
        "description": "`uds` permite conectar a un servicio local mediante un socket Unix en lugar de TCP."
      },
      {
        "id": "analisis-de-datos/httpx/transportes/wsgitransport",
        "label": "WSGITransport",
        "description": "Conecta un cliente síncrono directamente a una aplicación WSGI de Python, sin servidor de red."
      },
      {
        "id": "analisis-de-datos/httpx/transportes/asgitransport",
        "label": "ASGITransport",
        "description": "Conecta AsyncClient a una aplicación ASGI sin servidor de red."
      },
      {
        "id": "analisis-de-datos/httpx/transportes/transportes-personalizados",
        "label": "Transportes personalizados",
        "description": "Subclasifica BaseTransport o AsyncBaseTransport para implementar `handle_request` o `handle_async_request`."
      }
    ]
  },
  {
    "key": "extensiones-de-bajo-nivel",
    "label": "Extensiones de bajo nivel",
    "children": [
      {
        "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/definicion",
        "label": "Definición",
        "description": "Las extensiones son diccionarios de datos auxiliares asociados con peticiones y respuestas. Su interpretación depende del transporte."
      },
      {
        "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/request-extensions-y-response-extensions",
        "label": "request.extensions y response.extensions",
        "description": "Permiten acceder a información de bajo nivel como timeout, versión HTTP y metadatos específicos del transporte."
      },
      {
        "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/tracing",
        "label": "Tracing",
        "description": "La extensión trace permite observar eventos internos de httpcore cuando el transporte lo soporta."
      }
    ]
  },
  {
    "key": "pruebas-de-integraciones-http",
    "label": "Pruebas de integraciones HTTP",
    "children": [
      {
        "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/definicion",
        "label": "Definición",
        "description": "Las pruebas con respuestas simuladas comprueban cómo el código procesa datos y errores sin depender de un servicio externo."
      },
      {
        "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/mocktransport",
        "label": "MockTransport",
        "description": "Recibe una función que transforma Request en Response, o que lanza errores de prueba."
      },
      {
        "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/respx",
        "label": "RESPX",
        "description": "Biblioteca externa para interceptar peticiones HTTPX y verificar rutas y llamadas mediante mocks."
      },
      {
        "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/pytest-httpx",
        "label": "pytest-httpx",
        "description": "Plugin de pytest que proporciona la fixture `httpx_mock` para registrar respuestas y comprobar peticiones."
      }
    ]
  },
  {
    "key": "compatibilidad-con-requests",
    "label": "Compatibilidad con Requests",
    "children": [
      {
        "id": "analisis-de-datos/httpx/compatibilidad-con-requests/definicion",
        "label": "Definición",
        "description": "HTTPX y Requests comparten muchas convenciones, pero difieren en opciones, excepciones y soporte asíncrono."
      },
      {
        "id": "analisis-de-datos/httpx/compatibilidad-con-requests/diferencias-de-configuracion",
        "label": "Diferencias de configuración",
        "description": "HTTPX no sigue redirecciones por defecto, tiene timeouts predeterminados y usa `proxy` para un proxy único; Requests usa otras opciones."
      },
      {
        "id": "analisis-de-datos/httpx/compatibilidad-con-requests/diferencias-de-excepciones-y-sesiones",
        "label": "Diferencias de excepciones y sesiones",
        "description": "HTTPX usa `HTTPError`, `RequestError` y `HTTPStatusError`; Client corresponde funcionalmente a Session de Requests. HTTPX ofrece AsyncClient nativo."
      }
    ]
  }
];
