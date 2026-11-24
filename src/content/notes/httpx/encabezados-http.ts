// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/encabezados-http/definicion",
    "remember": "Los nombres de headers no distinguen mayúsculas.",
    "examples": [
      {
        "id": "httpx/encabezados-http/definicion/1",
        "title": "Solicitar JSON",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/echo\", headers={\"Accept\": \"application/json\"})\n    print(r.json()[\"accept\"])",
        "hint": "Los nombres de headers no distinguen mayúsculas.",
        "textOutput": "`application/json`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/encabezados-http/accept-y-content-type",
    "remember": "Pedir JSON no garantiza que el servidor lo devuelva.",
    "examples": [
      {
        "id": "httpx/encabezados-http/accept-y-content-type/1",
        "title": "Enviar JSON y pedir JSON",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", json={\"id\": 1}, headers={\"Accept\": \"application/json\"})\n    print(r.json()[\"accept\"], r.json()[\"content_type\"])",
        "hint": "Pedir JSON no garantiza que el servidor lo devuelva.",
        "textOutput": "`application/json application/json`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/encabezados-http/httpx-headers",
    "remember": "No dividas encabezados complejos por comas sin conocer su sintaxis.",
    "examples": [
      {
        "id": "httpx/encabezados-http/httpx-headers/1",
        "title": "Leer encabezados repetidos",
        "language": "python",
        "code": "h = httpx.Headers([(\"X-Tag\", \"a\"), (\"X-Tag\", \"b\")])\nprint(h.get_list(\"x-tag\"))",
        "hint": "No dividas encabezados complejos por comas sin conocer su sintaxis.",
        "textOutput": "`['a', 'b']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/encabezados-http/authorization",
    "remember": "Nunca registres un token real en logs.",
    "examples": [
      {
        "id": "httpx/encabezados-http/authorization/1",
        "title": "Enviar un token de prueba",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/private\", headers={\"Authorization\": \"Bearer demo\"})\n    print(r.status_code)",
        "hint": "Nunca registres un token real en logs.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
