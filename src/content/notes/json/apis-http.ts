// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/apis-http/definicion",
    "remember": "Revisa estado HTTP y formato de respuesta antes de confiar en los datos.",
    "note": "Requiere `pip install requests`. Las respuestas simuladas usan `_content` solo para preparar la demostración.",
    "examples": [
      {
        "id": "json/apis-http/definicion/1",
        "title": "Simular una respuesta JSON",
        "language": "python",
        "code": "from requests import Response\nr = Response()\nr.status_code = 200\nr._content = b'{\"total\":3}'\nprint(r.json()[\"total\"])",
        "hint": "La respuesta simulada permite practicar sin internet. Ejecuta este ejemplo en un entorno con requests.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/apis-http/requests-get",
    "remember": "Una respuesta HTTP no garantiza éxito ni formato JSON.",
    "note": "Requiere requests e internet. Endpoint externo; ejemplo no ejecutado en la revisión.",
    "examples": [
      {
        "id": "json/apis-http/requests-get/1",
        "title": "Consultar un endpoint de prueba",
        "language": "python",
        "code": "import requests\nr = requests.get(\"https://httpbin.org/get\", params={\"page\": 1}, timeout=10)\nr.raise_for_status()\nprint(r.json()[\"args\"][\"page\"])",
        "hint": "El servicio de prueba devuelve los parámetros recibidos. Ejecuta este ejemplo en un entorno con requests y acceso a internet.",
        "textOutput": "`1` como texto, si el servicio está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/apis-http/response-json",
    "remember": "`raise_for_status()` antes de procesar una respuesta de éxito esperada.",
    "note": "`requests.exceptions.JSONDecodeError` identifica respuestas no interpretables como JSON.",
    "examples": [
      {
        "id": "json/apis-http/response-json/1",
        "title": "Distinguir estado y contenido",
        "language": "python",
        "code": "from requests import Response, exceptions\nr = Response()\nr.status_code = 404\nr._content = b'{\"error\":\"Not found\"}'\nprint(r.json()[\"error\"])\ntry:\n    r.raise_for_status()\nexcept exceptions.HTTPError:\n    print(\"Error HTTP\")",
        "hint": "El cuerpo es JSON válido, aunque la solicitud falló. Requiere requests en tu entorno de Python.",
        "textOutput": "`Not found` y `Error HTTP`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/apis-http/registros-y-metadatos",
    "remember": "Inspecciona el contrato antes de asumir que la raíz es una lista.",
    "examples": [
      {
        "id": "json/apis-http/registros-y-metadatos/1",
        "title": "Separar datos y total",
        "language": "python",
        "code": "respuesta = json.loads('{\"data\":[{\"id\":101}],\"meta\":{\"total\":3}}')\nprint(respuesta[\"data\"], respuesta[\"meta\"][\"total\"])",
        "hint": "`data` contiene la página, no todos los registros necesariamente.",
        "textOutput": "`[{'id': 101}] 3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/apis-http/paginacion",
    "remember": "Sigue el contrato, controla errores y limita el número de páginas.",
    "note": "En una API real, establece timeout, verifica códigos HTTP y evita ciclos de cursores.",
    "examples": [
      {
        "id": "json/apis-http/paginacion/1",
        "title": "Recorrer páginas simuladas",
        "language": "python",
        "code": "paginas = {\n    1: '{\"data\":[{\"id\":101},{\"id\":102}],\"next\":2}',\n    2: '{\"data\":[{\"id\":103}],\"next\":null}'\n}\npagina = 1\nregistros = []\nwhile pagina is not None:\n    r = json.loads(paginas[pagina])\n    registros.extend(r[\"data\"])\n    pagina = r[\"next\"]\nprint([r[\"id\"] for r in registros])",
        "hint": "Se simula una API con dos páginas; no se necesita red.",
        "textOutput": "`[101, 102, 103]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
