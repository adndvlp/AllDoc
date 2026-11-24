// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/request-y-response-explicitos/definicion",
    "remember": "Crear Request no realiza ninguna llamada de red.",
    "examples": [
      {
        "id": "httpx/request-y-response-explicitos/definicion/1",
        "title": "Construir una petición sin enviarla",
        "language": "python",
        "code": "req = httpx.Request(\"GET\", BASE + \"/pedidos/1\")\nprint(req.method, req.url.path)",
        "hint": "Crear Request no realiza ninguna llamada de red.",
        "textOutput": "`GET /pedidos/1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/request-y-response-explicitos/build-request",
    "remember": "Es preferible a Request directo si necesitas heredar los ajustes del cliente.",
    "examples": [
      {
        "id": "httpx/request-y-response-explicitos/build-request/1",
        "title": "Preparar una consulta con filtro",
        "language": "python",
        "code": "with demo(params={\"limit\": 2}) as c:\n    req = c.build_request(\"GET\", \"/pedidos\", params={\"estado\": \"completed\"})\n    print(req.url.params[\"limit\"], req.url.params[\"estado\"])",
        "hint": "Es preferible a Request directo si necesitas heredar los ajustes del cliente.",
        "textOutput": "`2 completed`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/request-y-response-explicitos/send",
    "remember": "Para enviar manualmente con streaming, cierra la respuesta.",
    "examples": [
      {
        "id": "httpx/request-y-response-explicitos/send/1",
        "title": "Enviar una petición preparada",
        "language": "python",
        "code": "with demo() as c:\n    req = c.build_request(\"GET\", \"/pedidos/1\")\n    r = c.send(req)\n    print(r.json()[\"id\"])",
        "hint": "Para enviar manualmente con streaming, cierra la respuesta.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/request-y-response-explicitos/response-construida",
    "remember": "Asocia una Request si necesitas usar raise_for_status o response.request.",
    "examples": [
      {
        "id": "httpx/request-y-response-explicitos/response-construida/1",
        "title": "Construir una respuesta de prueba",
        "language": "python",
        "code": "req = httpx.Request(\"GET\", BASE)\nr = httpx.Response(200, json={\"total\": 4}, request=req)\nprint(r.raise_for_status().json())",
        "hint": "Asocia una Request si necesitas usar raise_for_status o response.request.",
        "textOutput": "`{'total': 4}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
