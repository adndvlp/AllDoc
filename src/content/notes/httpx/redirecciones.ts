// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/redirecciones/definicion",
    "remember": "Valida el destino antes de enviar credenciales a otro host.",
    "examples": [
      {
        "id": "httpx/redirecciones/definicion/1",
        "title": "Leer Location",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/redirect\")\n    print(r.status_code, r.headers[\"location\"])",
        "hint": "Valida el destino antes de enviar credenciales a otro host.",
        "textOutput": "`302 /pedidos/1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/redirecciones/follow-redirects-y-history",
    "remember": "La URL de la última respuesta puede diferir de la inicial.",
    "examples": [
      {
        "id": "httpx/redirecciones/follow-redirects-y-history/1",
        "title": "Seguir una redirección",
        "language": "python",
        "code": "with demo(follow_redirects=True) as c:\n    r = c.get(\"/redirect\")\n    print(r.status_code, [h.status_code for h in r.history], r.url.path)",
        "hint": "La URL de la última respuesta puede diferir de la inicial.",
        "textOutput": "`200 [302] /pedidos/1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/redirecciones/next-request",
    "remember": "Puede ser None cuando no hay redirección pendiente.",
    "examples": [
      {
        "id": "httpx/redirecciones/next-request/1",
        "title": "Seguir un salto manualmente",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/redirect\")\n    if r.next_request is not None:\n        print(c.send(r.next_request).json()[\"id\"])",
        "hint": "Puede ser None cuando no hay redirección pendiente.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/redirecciones/max-redirects",
    "remember": "Configura el límite en el cliente.",
    "examples": [
      {
        "id": "httpx/redirecciones/max-redirects/1",
        "title": "Detectar un bucle",
        "language": "python",
        "code": "with demo(follow_redirects=True, max_redirects=2) as c:\n    try:\n        c.get(\"/loop\")\n    except httpx.TooManyRedirects:\n        print(\"demasiados saltos\")",
        "hint": "Configura el límite en el cliente.",
        "textOutput": "`demasiados saltos`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
