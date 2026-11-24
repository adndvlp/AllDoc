// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/fundamentos-http/definicion",
    "remember": "El cliente solicita; el servidor responde.",
    "examples": [
      {
        "id": "httpx/fundamentos-http/definicion/1",
        "title": "Consultar un pedido",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/1\")\n    print(r.status_code, r.json()[\"importe\"])",
        "hint": "El cliente solicita; el servidor responde.",
        "textOutput": "`200 800`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/fundamentos-http/instalacion-e-importacion",
    "remember": "`httpx` es una dependencia externa, no parte de la biblioteca estándar.",
    "examples": [
      {
        "id": "httpx/fundamentos-http/instalacion-e-importacion/1",
        "title": "Comprobar la instalación",
        "language": "python",
        "code": "import httpx\nprint(httpx.__version__)",
        "hint": "`httpx` es una dependencia externa, no parte de la biblioteca estándar.",
        "textOutput": "`0.28.1` en el entorno de referencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/fundamentos-http/cliente-servidor-y-endpoint",
    "remember": "La documentación de la API define qué rutas y métodos existen.",
    "examples": [
      {
        "id": "httpx/fundamentos-http/cliente-servidor-y-endpoint/1",
        "title": "Identificar un recurso",
        "language": "python",
        "code": "u = httpx.URL(BASE + \"/pedidos/3\")\nprint(u.scheme, u.host, u.path)",
        "hint": "La documentación de la API define qué rutas y métodos existen.",
        "textOutput": "`https ventas.example /pedidos/3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/fundamentos-http/metodos-seguros-e-idempotentes",
    "remember": "No reintentes escrituras automáticamente sin conocer el contrato.",
    "examples": [
      {
        "id": "httpx/fundamentos-http/metodos-seguros-e-idempotentes/1",
        "title": "Consultar dos veces",
        "language": "python",
        "code": "with demo() as c:\n    print(c.get(\"/pedidos/1\").json() == c.get(\"/pedidos/1\").json())",
        "hint": "No reintentes escrituras automáticamente sin conocer el contrato.",
        "textOutput": "`True`; la consulta no cambia los datos de la simulación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
