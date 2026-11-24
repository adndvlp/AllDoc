// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/http-y-apis/definicion",
    "remember": "La petición y la respuesta son objetos distintos.",
    "examples": [
      {
        "id": "requests/http-y-apis/definicion/1",
        "title": "Consultar un pedido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.status_code, r.json()[\"amount\"])",
        "hint": "La petición y la respuesta son objetos distintos.",
        "textOutput": "200 800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/http-y-apis/endpoint",
    "remember": "El ID va en la ruta cuando la API lo define así.",
    "examples": [
      {
        "id": "requests/http-y-apis/endpoint/1",
        "title": "Consultar el pedido 103",
        "language": "python",
        "code": "order_id = 103\nr = requests.get(f\"{BASE}/orders/{order_id}\", timeout=5)\nprint(r.json()[\"id\"])",
        "hint": "El ID va en la ruta cuando la API lo define así.",
        "textOutput": "103.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/http-y-apis/rest",
    "remember": "Colección y recurso individual pueden tener rutas distintas.",
    "examples": [
      {
        "id": "requests/http-y-apis/rest/1",
        "title": "Consultar una colección y un recurso",
        "language": "python",
        "code": "a = requests.get(BASE + \"/orders\", timeout=5)\nb = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(a.json()[\"total\"], b.json()[\"id\"])",
        "hint": "Colección y recurso individual pueden tener rutas distintas.",
        "textOutput": "4 101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/http-y-apis/https",
    "remember": "No uses verify=False para solucionar fallos de certificados.",
    "note": "El servidor local usa HTTP; la verificación real necesita un servidor HTTPS.",
    "examples": [
      {
        "id": "requests/http-y-apis/https/1",
        "title": "Preparar una URL HTTPS",
        "language": "python",
        "code": "p = requests.Request(\"GET\", \"https://example.com\").prepare()\nprint(p.url.startswith(\"https://\"))",
        "hint": "No uses verify=False para solucionar fallos de certificados.",
        "textOutput": "True; no se envía tráfico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/http-y-apis/headers-body",
    "remember": "El tipo de contenido ayuda a interpretar el body.",
    "examples": [
      {
        "id": "requests/http-y-apis/headers-body/1",
        "title": "Ver el tipo y tamaño de un CSV",
        "language": "python",
        "code": "r = requests.get(BASE + \"/csv\", timeout=5)\nprint(r.headers[\"Content-Type\"], len(r.content))",
        "hint": "El tipo de contenido ayuda a interpretar el body.",
        "textOutput": "text/csv; charset=utf-8 y 26 bytes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
