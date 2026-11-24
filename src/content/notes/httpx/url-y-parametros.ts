// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/url-y-parametros/definicion",
    "remember": "No construyas manualmente cadenas con valores sin codificar.",
    "examples": [
      {
        "id": "httpx/url-y-parametros/definicion/1",
        "title": "Filtrar pedidos",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos\", params={\"estado\": \"completed\", \"limit\": 10})\n    print([x[\"id\"] for x in r.json()[\"items\"]])",
        "hint": "No construyas manualmente cadenas con valores sin codificar.",
        "textOutput": "`[1, 3, 4]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/url-y-parametros/path-parameters",
    "remember": "Valida identificadores y codifica segmentos de texto cuando haga falta.",
    "examples": [
      {
        "id": "httpx/url-y-parametros/path-parameters/1",
        "title": "Consultar por identificador",
        "language": "python",
        "code": "pedido_id = 3\nwith demo() as c:\n    print(c.get(f\"/pedidos/{pedido_id}\").json()[\"importe\"])",
        "hint": "Valida identificadores y codifica segmentos de texto cuando haga falta.",
        "textOutput": "`500`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/url-y-parametros/params",
    "remember": "El servidor decide el significado de cada parámetro.",
    "examples": [
      {
        "id": "httpx/url-y-parametros/params/1",
        "title": "Enviar filtros y límite",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos\", params={\"estado\": \"completed\", \"limit\": 1})\n    print(r.url)",
        "hint": "El servidor decide el significado de cada parámetro.",
        "textOutput": "`https://ventas.example/pedidos?estado=completed&limit=1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/url-y-parametros/parametros-repetidos",
    "remember": "Un diccionario normal no conserva claves duplicadas.",
    "examples": [
      {
        "id": "httpx/url-y-parametros/parametros-repetidos/1",
        "title": "Enviar dos etiquetas",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/echo\", params=[(\"tag\", \"a\"), (\"tag\", \"b\")])\n    print(r.json()[\"params\"])",
        "hint": "Un diccionario normal no conserva claves duplicadas.",
        "textOutput": "`[['tag', 'a'], ['tag', 'b']]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/url-y-parametros/url-y-queryparams",
    "remember": "No necesitas concatenar `?` ni `&` a mano.",
    "examples": [
      {
        "id": "httpx/url-y-parametros/url-y-queryparams/1",
        "title": "Combinar parámetros y crear una URL",
        "language": "python",
        "code": "q = httpx.QueryParams({\"cliente\": \"Ana Pérez\"})\nu = httpx.URL(BASE + \"/echo\").copy_with(params=q)\nprint(u.params[\"cliente\"])\nprint(str(u))",
        "hint": "No necesitas concatenar `?` ni `&` a mano.",
        "textOutput": "`Ana Pérez` y URL con `cliente=Ana+P%C3%A9rez`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
