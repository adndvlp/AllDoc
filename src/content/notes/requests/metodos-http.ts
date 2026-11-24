// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/metodos-http/definicion",
    "remember": "La API decide qué métodos acepta.",
    "examples": [
      {
        "id": "requests/metodos-http/definicion/1",
        "title": "Consultar un registro",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.json()[\"id\"])",
        "hint": "La API decide qué métodos acepta.",
        "textOutput": "101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/get",
    "remember": "Consulta la documentación del endpoint antes de elegir el método.",
    "examples": [
      {
        "id": "requests/metodos-http/get/1",
        "title": "Enviar GET",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.status_code)",
        "hint": "Consulta la documentación del endpoint antes de elegir el método.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/post",
    "remember": "Consulta la documentación del endpoint antes de elegir el método.",
    "examples": [
      {
        "id": "requests/metodos-http/post/1",
        "title": "Enviar POST",
        "language": "python",
        "code": "r = requests.post(BASE + \"/orders/101\", json={'amount': 500}, timeout=5)\nprint(r.status_code)",
        "hint": "Consulta la documentación del endpoint antes de elegir el método.",
        "textOutput": "201. La API demo no modifica registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/put",
    "remember": "Consulta la documentación del endpoint antes de elegir el método.",
    "examples": [
      {
        "id": "requests/metodos-http/put/1",
        "title": "Enviar PUT",
        "language": "python",
        "code": "r = requests.put(BASE + \"/orders/101\", json={'amount': 500, 'status': 'completed'}, timeout=5)\nprint(r.status_code)",
        "hint": "Consulta la documentación del endpoint antes de elegir el método.",
        "textOutput": "200. La API demo no modifica registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/patch",
    "remember": "Consulta la documentación del endpoint antes de elegir el método.",
    "examples": [
      {
        "id": "requests/metodos-http/patch/1",
        "title": "Enviar PATCH",
        "language": "python",
        "code": "r = requests.patch(BASE + \"/orders/101\", json={'status': 'completed'}, timeout=5)\nprint(r.status_code)",
        "hint": "Consulta la documentación del endpoint antes de elegir el método.",
        "textOutput": "200. La API demo no modifica registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/delete",
    "remember": "Consulta la documentación del endpoint antes de elegir el método.",
    "examples": [
      {
        "id": "requests/metodos-http/delete/1",
        "title": "Enviar DELETE",
        "language": "python",
        "code": "r = requests.delete(BASE + \"/orders/101\", timeout=5)\nprint(r.status_code)",
        "hint": "Consulta la documentación del endpoint antes de elegir el método.",
        "textOutput": "200. La API demo no modifica registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/head",
    "remember": "HEAD no descarga el body.",
    "examples": [
      {
        "id": "requests/metodos-http/head/1",
        "title": "Consultar metadatos de un CSV",
        "language": "python",
        "code": "r = requests.head(BASE + \"/csv\", timeout=5)\nprint(r.status_code, len(r.content))",
        "hint": "HEAD no descarga el body.",
        "textOutput": "200 0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/options",
    "remember": "No todos los servidores publican la misma información.",
    "examples": [
      {
        "id": "requests/metodos-http/options/1",
        "title": "Consultar métodos permitidos",
        "language": "python",
        "code": "r = requests.options(BASE + \"/orders\", timeout=5)\nprint(r.headers[\"Allow\"])",
        "hint": "No todos los servidores publican la misma información.",
        "textOutput": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/request",
    "remember": "Útil si el método se determina por configuración.",
    "examples": [
      {
        "id": "requests/metodos-http/request/1",
        "title": "Ejecutar GET dinámicamente",
        "language": "python",
        "code": "r = requests.request(\"GET\", BASE + \"/orders/101\", timeout=5)\nprint(r.status_code)",
        "hint": "Útil si el método se determina por configuración.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/metodos-http/idempotencia",
    "remember": "No repitas escrituras sin conocer el contrato de la API.",
    "note": "La clave solo funciona si el servidor implementa esa garantía; la demo no lo hace.",
    "examples": [
      {
        "id": "requests/metodos-http/idempotencia/1",
        "title": "Preparar una clave de idempotencia",
        "language": "python",
        "code": "p = requests.Request(\"POST\", BASE + \"/orders\", json={\"amount\": 500}, headers={\"Idempotency-Key\": \"demo-101\"}).prepare()\nprint(p.headers[\"Idempotency-Key\"])",
        "hint": "No repitas escrituras sin conocer el contrato de la API.",
        "textOutput": "demo-101; no se envía.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
