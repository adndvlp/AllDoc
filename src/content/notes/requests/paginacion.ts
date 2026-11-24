// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/paginacion/definicion",
    "remember": "No confundas el número de registros recibidos con el total.",
    "examples": [
      {
        "id": "requests/paginacion/definicion/1",
        "title": "Comparar tamaño y total",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", timeout=5).json()\nprint(len(r[\"data\"]), r[\"total\"])",
        "hint": "No confundas el número de registros recibidos con el total.",
        "textOutput": "2 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/paginacion/page",
    "remember": "Empieza en 0 o 1 según el contrato.",
    "examples": [
      {
        "id": "requests/paginacion/page/1",
        "title": "Recorrer todas las páginas",
        "language": "python",
        "code": "rows = []\nfor page in range(1, 10):\n    r = requests.get(BASE + \"/orders\", params={\"page\": page, \"per_page\": 2}, timeout=5)\n    r.raise_for_status()\n    payload = r.json()\n    rows.extend(payload[\"data\"])\n    if not payload[\"next\"]:\n        break\nelse:\n    raise RuntimeError(\"Límite de páginas\")\nprint([x[\"id\"] for x in rows])",
        "hint": "Empieza en 0 o 1 según el contrato.",
        "textOutput": "[101, 102, 103, 104].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/paginacion/offset",
    "remember": "Las inserciones concurrentes pueden provocar omisiones o duplicados.",
    "examples": [
      {
        "id": "requests/paginacion/offset/1",
        "title": "Avanzar por desplazamiento",
        "language": "python",
        "code": "rows = []\nfor offset in range(0, 20, 2):\n    r = requests.get(BASE + \"/orders\", params={\"limit\": 2, \"offset\": offset}, timeout=5)\n    r.raise_for_status()\n    payload = r.json()\n    rows.extend(payload[\"data\"])\n    if not payload[\"next\"]:\n        break\nelse:\n    raise RuntimeError(\"Límite de páginas\")\nprint(len(rows))",
        "hint": "Las inserciones concurrentes pueden provocar omisiones o duplicados.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/paginacion/cursor",
    "remember": "Reenvía el cursor recibido sin modificarlo.",
    "examples": [
      {
        "id": "requests/paginacion/cursor/1",
        "title": "Avanzar mediante cursor",
        "language": "python",
        "code": "cursor = None\nrows = []\nfor _ in range(10):\n    r = requests.get(BASE + \"/orders\", params={\"limit\": 2, \"cursor\": cursor}, timeout=5)\n    r.raise_for_status()\n    payload = r.json()\n    rows.extend(payload[\"data\"])\n    cursor = payload[\"next_cursor\"]\n    if cursor is None:\n        break\nelse:\n    raise RuntimeError(\"Límite de páginas\")\nprint(len(rows))",
        "hint": "Reenvía el cursor recibido sin modificarlo.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/paginacion/next-url",
    "remember": "Valida el destino antes de reenviar credenciales.",
    "examples": [
      {
        "id": "requests/paginacion/next-url/1",
        "title": "Seguir enlaces del encabezado",
        "language": "python",
        "code": "from urllib.parse import urljoin, urlsplit\nurl = BASE + \"/orders\"\nrows = []\nfor _ in range(10):\n    r = requests.get(url, timeout=5)\n    r.raise_for_status()\n    rows.extend(r.json()[\"data\"])\n    nxt = r.links.get(\"next\", {}).get(\"url\")\n    if not nxt:\n        break\n    url = urljoin(r.url, nxt)\n    if urlsplit(url).netloc != urlsplit(BASE).netloc or urlsplit(url).scheme != urlsplit(BASE).scheme:\n        raise ValueError(\"Destino inesperado\")\nelse:\n    raise RuntimeError(\"Límite de páginas\")\nprint(len(rows))",
        "hint": "Valida el destino antes de reenviar credenciales.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/paginacion/terminacion",
    "remember": "Un límite alcanzado sin terminar debe informarse como fallo o extracción parcial.",
    "examples": [
      {
        "id": "requests/paginacion/terminacion/1",
        "title": "Eliminar un registro repetido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\nrows = r.json()[\"data\"]\nunique = {x[\"id\"]: x for x in rows + rows[:1]}\nprint(len(unique))",
        "hint": "Un límite alcanzado sin terminar debe informarse como fallo o extracción parcial.",
        "textOutput": "4 registros únicos de 5 entradas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
