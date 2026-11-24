// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/client-y-sesiones/definicion",
    "remember": "Reutiliza un cliente durante una extracción.",
    "examples": [
      {
        "id": "httpx/client-y-sesiones/definicion/1",
        "title": "Consultar dos recursos con el mismo cliente",
        "language": "python",
        "code": "with demo() as c:\n    print(c.get(\"/pedidos/1\").status_code, c.get(\"/pedidos/3\").status_code)",
        "hint": "Reutiliza un cliente durante una extracción.",
        "textOutput": "`200 200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/client-y-sesiones/context-manager-y-close",
    "remember": "No reutilices un cliente cerrado.",
    "examples": [
      {
        "id": "httpx/client-y-sesiones/context-manager-y-close/1",
        "title": "Cerrar explícitamente",
        "language": "python",
        "code": "c = demo()\ntry:\n    print(c.get(\"/pedidos/1\").status_code)\nfinally:\n    c.close()\nprint(c.is_closed)",
        "hint": "No reutilices un cliente cerrado.",
        "textOutput": "`200` y `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/client-y-sesiones/base-url",
    "remember": "Evita repetir el mismo host en cada petición.",
    "examples": [
      {
        "id": "httpx/client-y-sesiones/base-url/1",
        "title": "Configurar una URL base",
        "language": "python",
        "code": "with httpx.Client(base_url=BASE, transport=httpx.MockTransport(handler)) as c:\n    print(c.get(\"/pedidos/1\").url)",
        "hint": "Evita repetir el mismo host en cada petición.",
        "textOutput": "`https://ventas.example/pedidos/1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/client-y-sesiones/configuracion-compartida",
    "remember": "Headers, params y cookies se combinan; auth por petición puede sustituir la del cliente.",
    "examples": [
      {
        "id": "httpx/client-y-sesiones/configuracion-compartida/1",
        "title": "Combinar parámetros de cliente y petición",
        "language": "python",
        "code": "with demo(params={\"limit\": 5}, headers={\"Accept\": \"application/json\"}) as c:\n    r = c.get(\"/echo\", params={\"estado\": \"completed\"}, headers={\"Accept\": \"text/csv\"})\n    print(r.url.params[\"limit\"], r.json()[\"accept\"])",
        "hint": "Headers, params y cookies se combinan; auth por petición puede sustituir la del cliente.",
        "textOutput": "`5 text/csv`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/client-y-sesiones/connection-pooling-y-limits",
    "remember": "Un mock no establece conexiones reales.",
    "examples": [
      {
        "id": "httpx/client-y-sesiones/connection-pooling-y-limits/1",
        "title": "Configurar límites de un cliente real",
        "language": "python",
        "code": "limites = httpx.Limits(max_connections=10, max_keepalive_connections=5, keepalive_expiry=30)\nwith httpx.Client(limits=limites) as c:\n    print(c.is_closed)",
        "hint": "Un mock no establece conexiones reales.",
        "textOutput": "`False` mientras está abierto; no se realizan peticiones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
