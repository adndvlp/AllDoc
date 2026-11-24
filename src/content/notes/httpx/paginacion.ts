// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/paginacion/definicion",
    "remember": "Una primera página exitosa no significa que la extracción esté completa.",
    "examples": [
      {
        "id": "httpx/paginacion/definicion/1",
        "title": "Inspeccionar primera página",
        "language": "python",
        "code": "with demo() as c:\n    datos = c.get(\"/pedidos\").json()\n    print(len(datos[\"items\"]), datos[\"total\"], datos[\"next_cursor\"])",
        "hint": "Una primera página exitosa no significa que la extracción esté completa.",
        "textOutput": "`2 4 2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/paginacion/paginas-numeradas",
    "remember": "El índice inicial puede ser cero o uno.",
    "examples": [
      {
        "id": "httpx/paginacion/paginas-numeradas/1",
        "title": "Recuperar todas las páginas",
        "language": "python",
        "code": "filas = []\nwith demo() as c:\n    page = 1\n    while True:\n        d = c.get(\"/pedidos\", params={\"page\": page, \"limit\": 2}).raise_for_status().json()\n        filas.extend(d[\"items\"])\n        if d[\"next_cursor\"] is None:\n            break\n        page += 1\nprint([x[\"id\"] for x in filas])",
        "hint": "El índice inicial puede ser cero o uno.",
        "textOutput": "`[1, 2, 3, 4]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/paginacion/offset-y-limit",
    "remember": "Los cambios de datos durante la paginación pueden producir omisiones o duplicados.",
    "examples": [
      {
        "id": "httpx/paginacion/offset-y-limit/1",
        "title": "Avanzar de dos en dos",
        "language": "python",
        "code": "filas = []\nwith demo() as c:\n    offset = 0\n    while True:\n        d = c.get(\"/pedidos\", params={\"offset\": offset, \"limit\": 2}).raise_for_status().json()\n        filas.extend(d[\"items\"])\n        if d[\"next_cursor\"] is None:\n            break\n        offset += len(d[\"items\"])\nprint(len(filas))",
        "hint": "Los cambios de datos durante la paginación pueden producir omisiones o duplicados.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/paginacion/cursor",
    "remember": "No fabriques ni incrementes el cursor.",
    "examples": [
      {
        "id": "httpx/paginacion/cursor/1",
        "title": "Recorrer usando el cursor devuelto",
        "language": "python",
        "code": "filas, cursor = [], None\nwith demo() as c:\n    while True:\n        params = {\"cursor\": cursor} if cursor is not None else {}\n        d = c.get(\"/pedidos\", params=params).raise_for_status().json()\n        filas.extend(d[\"items\"])\n        cursor = d[\"next_cursor\"]\n        if cursor is None:\n            break\nprint([x[\"id\"] for x in filas])",
        "hint": "No fabriques ni incrementes el cursor.",
        "textOutput": "`[1, 2, 3, 4]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/paginacion/enlaces-next",
    "remember": "Valida host y esquema de enlaces antes de reenviar credenciales; limita páginas para evitar ciclos.",
    "examples": [
      {
        "id": "httpx/paginacion/enlaces-next/1",
        "title": "Seguir enlaces de paginación",
        "language": "python",
        "code": "filas = []\nurl = BASE + \"/pedidos\"\nwith demo() as c:\n    while url:\n        assert httpx.URL(url).host == \"ventas.example\" and httpx.URL(url).scheme == \"https\"\n        r = c.get(url).raise_for_status()\n        filas.extend(r.json()[\"items\"])\n        url = r.links.get(\"next\", {}).get(\"url\")\nprint(len(filas))",
        "hint": "Valida host y esquema de enlaces antes de reenviar credenciales; limita páginas para evitar ciclos.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
