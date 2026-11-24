// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/estados-http-y-validacion/definicion",
    "remember": "Un estado 200 no garantiza datos válidos para tu análisis.",
    "examples": [
      {
        "id": "httpx/estados-http-y-validacion/definicion/1",
        "title": "Identificar éxito y error",
        "language": "python",
        "code": "with demo() as c:\n    print(c.get(\"/status/200\").is_success)\n    print(c.get(\"/status/503\").is_error)",
        "hint": "Un estado 200 no garantiza datos válidos para tu análisis.",
        "textOutput": "`True` y `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/estados-http-y-validacion/familias-y-httpx-codes",
    "remember": "401 y 403 no significan necesariamente lo mismo: autenticación frente a autorización.",
    "examples": [
      {
        "id": "httpx/estados-http-y-validacion/familias-y-httpx-codes/1",
        "title": "Comparar un código por nombre",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/99\")\n    print(r.status_code == httpx.codes.NOT_FOUND)",
        "hint": "401 y 403 no significan necesariamente lo mismo: autenticación frente a autorización.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/estados-http-y-validacion/propiedades-is",
    "remember": "`is_error` cubre 4xx y 5xx, no 3xx.",
    "examples": [
      {
        "id": "httpx/estados-http-y-validacion/propiedades-is/1",
        "title": "Clasificar estados",
        "language": "python",
        "code": "for n in (101, 200, 302, 404, 503):\n    r = httpx.Response(n)\n    print(n, r.is_informational, r.is_success, r.is_redirect, r.is_client_error, r.is_server_error)",
        "hint": "`is_error` cubre 4xx y 5xx, no 3xx.",
        "textOutput": "Cada fila tiene `True` en su familia correspondiente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/estados-http-y-validacion/raise-for-status",
    "remember": "En HTTPX también lanza ante 3xx no seguidos.",
    "examples": [
      {
        "id": "httpx/estados-http-y-validacion/raise-for-status/1",
        "title": "Detectar un 404",
        "language": "python",
        "code": "with demo() as c:\n    try:\n        c.get(\"/pedidos/99\").raise_for_status()\n    except httpx.HTTPStatusError as e:\n        print(e.response.status_code)",
        "hint": "En HTTPX también lanza ante 3xx no seguidos.",
        "textOutput": "`404`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/estados-http-y-validacion/respuestas-vacias-e-invalidas",
    "remember": "Un 204 válido no necesita JSON; un JSON inválido puede producir ValueError.",
    "examples": [
      {
        "id": "httpx/estados-http-y-validacion/respuestas-vacias-e-invalidas/1",
        "title": "Controlar JSON inválido",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/malformado\").raise_for_status()\n    try:\n        print(r.json())\n    except ValueError:\n        print(\"JSON inválido\")",
        "hint": "Un 204 válido no necesita JSON; un JSON inválido puede producir ValueError.",
        "textOutput": "`JSON inválido`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
