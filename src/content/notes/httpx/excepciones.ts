// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/excepciones/definicion",
    "remember": "Un 404 es una respuesta; un fallo de conexión puede no tener respuesta.",
    "examples": [
      {
        "id": "httpx/excepciones/definicion/1",
        "title": "Manejar ambos casos",
        "language": "python",
        "code": "with demo() as c:\n    for ruta in (\"/status/404\", \"/conexion\"):\n        try:\n            c.get(ruta).raise_for_status()\n        except httpx.HTTPStatusError:\n            print(\"estado\")\n        except httpx.RequestError:\n            print(\"petición\")",
        "hint": "Un 404 es una respuesta; un fallo de conexión puede no tener respuesta.",
        "textOutput": "`estado` y `petición`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/httpstatuserror",
    "remember": "No se genera automáticamente por un 404.",
    "examples": [
      {
        "id": "httpx/excepciones/httpstatuserror/1",
        "title": "Inspeccionar un error HTTP",
        "language": "python",
        "code": "with demo() as c:\n    try:\n        c.get(\"/status/403\").raise_for_status()\n    except httpx.HTTPStatusError as e:\n        print(e.response.status_code, e.request.url.path)",
        "hint": "No se genera automáticamente por un 404.",
        "textOutput": "`403 /status/403`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/requesterror-y-httperror",
    "remember": "Captura primero las excepciones específicas.",
    "examples": [
      {
        "id": "httpx/excepciones/requesterror-y-httperror/1",
        "title": "Capturar una conexión fallida",
        "language": "python",
        "code": "with demo() as c:\n    try:\n        c.get(\"/conexion\")\n    except httpx.RequestError as e:\n        print(type(e).__name__, e.request.url.path)",
        "hint": "Captura primero las excepciones específicas.",
        "textOutput": "`ConnectError /conexion`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/transporterror-y-networkerror",
    "remember": "No asumas que todos los errores son transitorios.",
    "examples": [
      {
        "id": "httpx/excepciones/transporterror-y-networkerror/1",
        "title": "Comprobar la jerarquía",
        "language": "python",
        "code": "print(issubclass(httpx.ConnectError, httpx.NetworkError))\nprint(issubclass(httpx.NetworkError, httpx.TransportError))",
        "hint": "No asumas que todos los errores son transitorios.",
        "textOutput": "`True` y `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/protocolo-y-otros-errores",
    "remember": "Registra la clase para distinguir una mala petición de un fallo remoto.",
    "examples": [
      {
        "id": "httpx/excepciones/protocolo-y-otros-errores/1",
        "title": "Identificar clases de error",
        "language": "python",
        "code": "for cls in (httpx.RemoteProtocolError, httpx.ProxyError, httpx.DecodingError):\n    print(cls.__name__, issubclass(cls, httpx.RequestError))",
        "hint": "Registra la clase para distinguir una mala petición de un fallo remoto.",
        "textOutput": "Las tres clases imprimen `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/invalidurl-y-cookieconflict",
    "remember": "No supongas que `except HTTPError` cubre todas las excepciones de HTTPX.",
    "examples": [
      {
        "id": "httpx/excepciones/invalidurl-y-cookieconflict/1",
        "title": "Detectar una URL con puerto inválido",
        "language": "python",
        "code": "try:\n    httpx.URL(\"https://example.com:no-numero\")\nexcept httpx.InvalidURL:\n    print(\"URL inválida\")",
        "hint": "No supongas que `except HTTPError` cubre todas las excepciones de HTTPX.",
        "textOutput": "`URL inválida`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/excepciones/streamerror",
    "remember": "Lee el cuerpo dentro del contexto de streaming cuando lo necesites.",
    "examples": [
      {
        "id": "httpx/excepciones/streamerror/1",
        "title": "Consultar la jerarquía",
        "language": "python",
        "code": "print(issubclass(httpx.ResponseNotRead, httpx.StreamError))",
        "hint": "Lee el cuerpo dentro del contexto de streaming cuando lo necesites.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
