// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/definicion",
    "remember": "Una respuesta 404 no lanza automáticamente una excepción.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/definicion/1",
        "title": "Capturar un error HTTP",
        "language": "python",
        "code": "try:\n    r = requests.get(BASE + \"/orders/999\", timeout=5)\n    r.raise_for_status()\nexcept requests.exceptions.HTTPError as e:\n    print(e.response.status_code)",
        "hint": "Una respuesta 404 no lanza automáticamente una excepción.",
        "textOutput": "404.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/timeout",
    "remember": "Especifica timeout en cada petición.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/timeout/1",
        "title": "Interrumpir una respuesta lenta",
        "language": "python",
        "code": "try:\n    requests.get(BASE + \"/slow\", timeout=0.05)\nexcept requests.exceptions.Timeout:\n    print(\"Tiempo agotado\")",
        "hint": "Especifica timeout en cada petición.",
        "textOutput": "Tiempo agotado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/timeout-tuple",
    "remember": "Durante streaming algunos fallos de lectura aparecen como ConnectionError.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/timeout-tuple/1",
        "title": "Separar los límites",
        "language": "python",
        "code": "try:\n    requests.get(BASE + \"/slow\", timeout=(2, 0.05))\nexcept requests.exceptions.ReadTimeout:\n    print(\"Lectura lenta\")",
        "hint": "Durante streaming algunos fallos de lectura aparecen como ConnectionError.",
        "textOutput": "Lectura lenta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/http-error",
    "remember": "Llama al método antes de procesar los datos.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/http-error/1",
        "title": "Rechazar un error del servidor",
        "language": "python",
        "code": "try:\n    r = requests.get(BASE + \"/status/503\", timeout=5)\n    r.raise_for_status()\nexcept requests.exceptions.HTTPError as e:\n    print(e.response.status_code)",
        "hint": "Llama al método antes de procesar los datos.",
        "textOutput": "503.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/connection-error",
    "remember": "Distingue fallo de red de respuesta HTTP.",
    "note": "Mock: prueba sin tráfico real.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/connection-error/1",
        "title": "Simular una conexión rechazada",
        "language": "python",
        "code": "from unittest.mock import patch\nwith patch(\"requests.get\", side_effect=requests.exceptions.ConnectionError):\n    try:\n        requests.get(BASE, timeout=5)\n    except requests.exceptions.ConnectionError:\n        print(\"Sin conexión\")",
        "hint": "Distingue fallo de red de respuesta HTTP.",
        "textOutput": "Sin conexión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/json-decode-error",
    "remember": "Un 200 también puede traer texto o HTML.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/json-decode-error/1",
        "title": "Capturar un formato incorrecto",
        "language": "python",
        "code": "r = requests.get(BASE + \"/text\", timeout=5)\ntry:\n    r.json()\nexcept requests.exceptions.JSONDecodeError:\n    print(\"No es JSON\")",
        "hint": "Un 200 también puede traer texto o HTML.",
        "textOutput": "No es JSON.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/too-many-redirects",
    "remember": "Configura el límite en Session.max_redirects.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/too-many-redirects/1",
        "title": "Detener un ciclo de redirecciones",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.max_redirects = 2\n    try:\n        s.get(BASE + \"/loop\", timeout=5)\n    except requests.exceptions.TooManyRedirects:\n        print(\"Ciclo detectado\")",
        "hint": "Configura el límite en Session.max_redirects.",
        "textOutput": "Ciclo detectado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/otros-errores",
    "remember": "No desactives seguridad para silenciar el error.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/otros-errores/1",
        "title": "Probar el manejo de URL inválida",
        "language": "python",
        "code": "try:\n    requests.get(\"http://\", timeout=5)\nexcept requests.exceptions.InvalidURL:\n    print(\"URL inválida\")",
        "hint": "No desactives seguridad para silenciar el error.",
        "textOutput": "URL inválida.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/errores-y-timeout/request-exception",
    "remember": "No ocultes errores ni devuelvas datos vacíos como si fueran correctos.",
    "examples": [
      {
        "id": "requests/errores-y-timeout/request-exception/1",
        "title": "Manejar un fallo sin perder la causa",
        "language": "python",
        "code": "try:\n    r = requests.get(BASE + \"/status/500\", timeout=5)\n    r.raise_for_status()\nexcept requests.exceptions.RequestException as e:\n    print(type(e).__name__)\nfinally:\n    print(\"Fin\")",
        "hint": "No ocultes errores ni devuelvas datos vacíos como si fueran correctos.",
        "textOutput": "HTTPError y Fin, en líneas separadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
