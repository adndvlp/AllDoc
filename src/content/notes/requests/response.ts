// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/response/definicion",
    "remember": "Inspecciona el estado antes de usar los datos.",
    "examples": [
      {
        "id": "requests/response/definicion/1",
        "title": "Leer estado y JSON",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nr.raise_for_status()\nprint(r.json()[\"amount\"])",
        "hint": "Inspecciona el estado antes de usar los datos.",
        "textOutput": "800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/status-code",
    "remember": "ok no significa necesariamente 200 ni confirma éxito de negocio.",
    "examples": [
      {
        "id": "requests/response/status-code/1",
        "title": "Inspeccionar un 404",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/999\", timeout=5)\nprint(r.status_code, r.reason, r.ok)",
        "hint": "ok no significa necesariamente 200 ni confirma éxito de negocio.",
        "textOutput": "404 Not Found False.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/json",
    "remember": "Decodificar JSON no equivale a comprobar éxito HTTP.",
    "examples": [
      {
        "id": "requests/response/json/1",
        "title": "Leer una propiedad anidada",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.json()[\"customer\"][\"country\"])",
        "hint": "Decodificar JSON no equivale a comprobar éxito HTTP.",
        "textOutput": "MX.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/text-encoding",
    "remember": "Ajusta encoding si conoces la codificación real.",
    "examples": [
      {
        "id": "requests/response/text-encoding/1",
        "title": "Leer caracteres acentuados",
        "language": "python",
        "code": "r = requests.get(BASE + \"/text\", timeout=5)\nr.encoding = \"utf-8\"\nprint(r.text, r.encoding)",
        "hint": "Ajusta encoding si conoces la codificación real.",
        "textOutput": "México utf-8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/content",
    "remember": "No decodifiques un Excel o una imagen como texto.",
    "examples": [
      {
        "id": "requests/response/content/1",
        "title": "Inspeccionar bytes de CSV",
        "language": "python",
        "code": "r = requests.get(BASE + \"/csv\", timeout=5)\nprint(r.content[:9])",
        "hint": "No decodifiques un Excel o una imagen como texto.",
        "textOutput": "b'id,amount'.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/headers",
    "remember": "Usa get si un encabezado podría faltar.",
    "examples": [
      {
        "id": "requests/response/headers/1",
        "title": "Leer el tipo de contenido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/csv\", timeout=5)\nprint(r.headers.get(\"content-type\"))",
        "hint": "Usa get si un encabezado podría faltar.",
        "textOutput": "text/csv; charset=utf-8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/url-request-elapsed",
    "remember": "elapsed no mide necesariamente la descarga completa.",
    "examples": [
      {
        "id": "requests/response/url-request-elapsed/1",
        "title": "Inspeccionar la petición",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.url, r.request.method, r.elapsed.total_seconds() >= 0)",
        "hint": "elapsed no mide necesariamente la descarga completa.",
        "textOutput": "http://127.0.0.1:8765/orders/101 GET True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/links",
    "remember": "La API puede devolver enlaces relativos.",
    "examples": [
      {
        "id": "requests/response/links/1",
        "title": "Obtener el enlace siguiente",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", timeout=5)\nprint(r.links[\"next\"][\"url\"])",
        "hint": "La API puede devolver enlaces relativos.",
        "textOutput": "Una ruta /orders?offset=2&limit=2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/cookies",
    "remember": "Una sesión conserva cookies entre peticiones.",
    "examples": [
      {
        "id": "requests/response/cookies/1",
        "title": "Leer una cookie de respuesta",
        "language": "python",
        "code": "r = requests.get(BASE + \"/login\", timeout=5)\nprint(r.cookies.get(\"sid\"))",
        "hint": "Una sesión conserva cookies entre peticiones.",
        "textOutput": "demo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/response/compresion",
    "remember": "content no contiene necesariamente los bytes comprimidos originales.",
    "examples": [
      {
        "id": "requests/response/compresion/1",
        "title": "Leer contenido comprimido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/gzip\", timeout=5)\nprint(r.headers[\"Content-Encoding\"], r.content)",
        "hint": "content no contiene necesariamente los bytes comprimidos originales.",
        "textOutput": "gzip b'ventas'.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
