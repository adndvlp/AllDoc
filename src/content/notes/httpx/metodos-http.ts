// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/metodos-http/definicion",
    "remember": "El método y la URL identifican la operación.",
    "examples": [
      {
        "id": "httpx/metodos-http/definicion/1",
        "title": "Enviar una petición genérica",
        "language": "python",
        "code": "with demo() as c:\n    print(c.request(\"GET\", \"/pedidos/1\").status_code)",
        "hint": "El método y la URL identifican la operación.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/get",
    "remember": "Usa `params` para filtros de consulta.",
    "note": "Requiere Internet; el servicio puede cambiar. El mismo método existe en `Client`.",
    "examples": [
      {
        "id": "httpx/metodos-http/get/1",
        "title": "Consultar con la API directa",
        "language": "python",
        "code": "r = httpx.get(\"https://example.com\", timeout=10)\nprint(r.status_code)",
        "hint": "Usa `params` para filtros de consulta. Ejecuta este ejemplo en Python local con acceso a Internet.",
        "textOutput": "Normalmente `200` si el sitio está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/post",
    "remember": "Un 201 es habitual al crear, pero depende de la API.",
    "examples": [
      {
        "id": "httpx/metodos-http/post/1",
        "title": "Enviar un pedido",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/pedidos\", json={\"importe\": 100})\n    print(r.status_code, r.json()[\"method\"])",
        "hint": "Un 201 es habitual al crear, pero depende de la API.",
        "textOutput": "`201 POST`; la simulación no persiste el pedido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/put",
    "remember": "Envía la representación completa cuando el contrato lo exige.",
    "examples": [
      {
        "id": "httpx/metodos-http/put/1",
        "title": "Reemplazar un pedido",
        "language": "python",
        "code": "with demo() as c:\n    print(c.put(\"/pedidos/1\", json={\"importe\": 900, \"estado\": \"completed\"}).json()[\"method\"])",
        "hint": "Envía la representación completa cuando el contrato lo exige.",
        "textOutput": "`PUT`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/patch",
    "remember": "No asumas que todos los PATCH son idempotentes.",
    "examples": [
      {
        "id": "httpx/metodos-http/patch/1",
        "title": "Cambiar un estado",
        "language": "python",
        "code": "with demo() as c:\n    print(c.patch(\"/pedidos/2\", json={\"estado\": \"completed\"}).json()[\"body\"])",
        "hint": "No asumas que todos los PATCH son idempotentes.",
        "textOutput": "JSON con `estado: completed`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/delete",
    "remember": "Una respuesta 204 no tiene cuerpo JSON.",
    "examples": [
      {
        "id": "httpx/metodos-http/delete/1",
        "title": "Solicitar eliminación",
        "language": "python",
        "code": "with demo() as c:\n    r = c.delete(\"/pedidos/2\")\n    print(r.status_code, r.content)",
        "hint": "Una respuesta 204 no tiene cuerpo JSON.",
        "textOutput": "`204 b''`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/head",
    "remember": "No uses `.json()` en una respuesta HEAD vacía.",
    "examples": [
      {
        "id": "httpx/metodos-http/head/1",
        "title": "Consultar un total anunciado",
        "language": "python",
        "code": "with demo() as c:\n    r = c.head(\"/echo\")\n    print(r.headers[\"X-Total\"], r.content)",
        "hint": "No uses `.json()` en una respuesta HEAD vacía.",
        "textOutput": "`4 b''`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/options",
    "remember": "El servidor puede anunciar métodos en `Allow`.",
    "examples": [
      {
        "id": "httpx/metodos-http/options/1",
        "title": "Consultar métodos permitidos",
        "language": "python",
        "code": "with demo() as c:\n    print(c.options(\"/echo\").headers[\"Allow\"])",
        "hint": "El servidor puede anunciar métodos en `Allow`.",
        "textOutput": "`GET, POST, OPTIONS`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/metodos-http/request",
    "remember": "Utiliza los atajos cuando el método es fijo.",
    "examples": [
      {
        "id": "httpx/metodos-http/request/1",
        "title": "Elegir el método en una variable",
        "language": "python",
        "code": "metodo = \"GET\"\nwith demo() as c:\n    print(c.request(metodo, \"/pedidos/3\").json()[\"id\"])",
        "hint": "Utiliza los atajos cuando el método es fijo.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
