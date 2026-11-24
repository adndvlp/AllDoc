// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/definicion",
    "remember": "Prefiere la API de alto nivel cuando exista.",
    "examples": [
      {
        "id": "httpx/extensiones-de-bajo-nivel/definicion/1",
        "title": "Inspeccionar extensiones de petición",
        "language": "python",
        "code": "with demo(timeout=7) as c:\n    req = c.build_request(\"GET\", \"/pedidos/1\")\n    print(req.extensions[\"timeout\"][\"connect\"])",
        "hint": "Prefiere la API de alto nivel cuando exista.",
        "textOutput": "`7`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/request-extensions-y-response-extensions",
    "remember": "No todas las claves están presentes en todos los transportes.",
    "examples": [
      {
        "id": "httpx/extensiones-de-bajo-nivel/request-extensions-y-response-extensions/1",
        "title": "Crear una respuesta con metadato de protocolo",
        "language": "python",
        "code": "r = httpx.Response(200, extensions={\"http_version\": b\"HTTP/2\"})\nprint(r.http_version)",
        "hint": "No todas las claves están presentes en todos los transportes.",
        "textOutput": "`HTTP/2`; metadato simulado, no negociación real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extensiones-de-bajo-nivel/tracing",
    "remember": "Los eventos pueden variar; el callback asíncrono debe ser async.",
    "note": "Requiere Internet; MockTransport no genera estos eventos.",
    "examples": [
      {
        "id": "httpx/extensiones-de-bajo-nivel/tracing/1",
        "title": "Registrar eventos de una conexión real",
        "language": "python",
        "code": "def trace(name, info):\n    print(name)\nwith httpx.Client() as c:\n    req = c.build_request(\"GET\", \"https://example.com\", extensions={\"trace\": trace})\n    c.send(req)",
        "hint": "Los eventos pueden variar; el callback asíncrono debe ser async. Ejecuta las trazas en Python local con acceso a Internet.",
        "textOutput": "Nombres de eventos de red y protocolo; dependen de la conexión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
