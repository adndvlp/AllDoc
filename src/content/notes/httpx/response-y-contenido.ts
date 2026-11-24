// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/definicion",
    "remember": "El contenido de una respuesta puede no ser JSON.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/definicion/1",
        "title": "Leer una respuesta",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/1\")\n    print(r.status_code, r.json()[\"cliente\"])",
        "hint": "El contenido de una respuesta puede no ser JSON.",
        "textOutput": "`200 Ana`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/status-code-y-reason-phrase",
    "remember": "Decide por el código, no por la frase.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/status-code-y-reason-phrase/1",
        "title": "Consultar un recurso inexistente",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/99\")\n    print(r.status_code, r.reason_phrase)",
        "hint": "Decide por el código, no por la frase.",
        "textOutput": "`404 Not Found`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/json",
    "remember": "No comprueba automáticamente que el estado sea exitoso.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/json/1",
        "title": "Leer los registros de una página",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos\")\n    r.raise_for_status()\n    print([x[\"id\"] for x in r.json()[\"items\"]])",
        "hint": "No comprueba automáticamente que el estado sea exitoso.",
        "textOutput": "`[1, 2]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/text-y-encoding",
    "remember": "Cambia la codificación antes de acceder a `.text`.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/text-y-encoding/1",
        "title": "Leer un CSV como texto",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/csv\")\n    print(r.encoding, r.text.splitlines()[0])",
        "hint": "Cambia la codificación antes de acceder a `.text`.",
        "textOutput": "`utf-8 id,importe`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/content",
    "remember": "Útil para escribir archivos binarios sin convertirlos a texto.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/content/1",
        "title": "Inspeccionar bytes",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/csv\")\n    print(type(r.content).__name__, r.content[:2])",
        "hint": "Útil para escribir archivos binarios sin convertirlos a texto.",
        "textOutput": "`bytes b'id'`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/headers",
    "remember": "Usa `.get()` si el encabezado puede faltar.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/headers/1",
        "title": "Consultar formato y campo opcional",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/csv\")\n    print(r.headers.get(\"content-type\"), r.headers.get(\"x-total\"))",
        "hint": "Usa `.get()` si el encabezado puede faltar.",
        "textOutput": "`text/csv; charset=utf-8 None`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/url-y-request",
    "remember": "Después de seguir redirecciones se refiere a la petición final.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/url-y-request/1",
        "title": "Inspeccionar una petición",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/1\")\n    print(r.request.method, r.url.path)",
        "hint": "Después de seguir redirecciones se refiere a la petición final.",
        "textOutput": "`GET /pedidos/1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/elapsed-y-http-version",
    "remember": "En streaming lee elapsed después de cerrar; un mock no mide latencia de red.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/elapsed-y-http-version/1",
        "title": "Consultar metadatos temporales",
        "language": "python",
        "code": "transport = httpx.MockTransport(lambda req: httpx.Response(200, stream=httpx.ByteStream(b\"ok\")))\nwith httpx.Client(transport=transport) as c:\n    r = c.get(BASE)\n    print(r.elapsed.total_seconds() >= 0, r.http_version)",
        "hint": "En streaming lee elapsed después de cerrar; un mock no mide latencia de red.",
        "textOutput": "`True HTTP/1.1` en la simulación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/links",
    "remember": "Consulta la existencia de `next` antes de continuar.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/links/1",
        "title": "Leer el enlace siguiente",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos\")\n    print(r.links[\"next\"][\"url\"])",
        "hint": "Consulta la existencia de `next` antes de continuar.",
        "textOutput": "`https://ventas.example/pedidos?offset=2&limit=2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/response-y-contenido/default-encoding",
    "remember": "Un charset explícito de Content-Type tiene prioridad.",
    "examples": [
      {
        "id": "httpx/response-y-contenido/default-encoding/1",
        "title": "Leer texto sin charset declarado",
        "language": "python",
        "code": "transport = httpx.MockTransport(lambda req: httpx.Response(200, content=bytes([99, 97, 102, 233])))\nwith httpx.Client(transport=transport, default_encoding=\"latin-1\") as c:\n    print(c.get(BASE).text)",
        "hint": "Un charset explícito de Content-Type tiene prioridad.",
        "textOutput": "`café`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
