// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/extraccion-etl/definicion",
    "remember": "Una petición exitosa no garantiza una extracción completa.",
    "examples": [
      {
        "id": "requests/extraccion-etl/definicion/1",
        "title": "Calcular ingresos completados",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"limit\": 10, \"status\": \"completed\"}, timeout=5)\nr.raise_for_status()\nprint(sum(x[\"amount\"] for x in r.json()[\"data\"]))",
        "hint": "Una petición exitosa no garantiza una extracción completa.",
        "textOutput": "2450; tres pedidos completados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/incremental",
    "remember": "El parámetro de fecha depende de la API; pagina también la extracción incremental.",
    "examples": [
      {
        "id": "requests/extraccion-etl/incremental/1",
        "title": "Solicitar pedidos desde una fecha",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"since\": \"2026-08-03\", \"limit\": 10}, timeout=5)\nr.raise_for_status()\nprint([x[\"id\"] for x in r.json()[\"data\"]])",
        "hint": "El parámetro de fecha depende de la API; pagina también la extracción incremental.",
        "textOutput": "[103, 104].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/checkpoints",
    "remember": "Avanza el punto solo después de persistir datos; contempla empates y retrasos.",
    "examples": [
      {
        "id": "requests/extraccion-etl/checkpoints/1",
        "title": "Calcular el siguiente watermark",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\nrows = r.json()[\"data\"]\nwatermark = max((x[\"updated_at\"], x[\"id\"]) for x in rows)\nprint(watermark)",
        "hint": "Avanza el punto solo después de persistir datos; contempla empates y retrasos.",
        "textOutput": "('2026-08-04', 104); todavía no se guarda el checkpoint.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/batch",
    "remember": "Deduplicar por ID requiere decidir qué versión conservar.",
    "examples": [
      {
        "id": "requests/extraccion-etl/batch/1",
        "title": "Procesar un lote repetido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"limit\": 2}, timeout=5)\nr.raise_for_status()\nbatch = r.json()[\"data\"]\nstore = {}\nfor rows in (batch, batch):\n    store.update({x[\"id\"]: x for x in rows})\nprint(len(store))",
        "hint": "Deduplicar por ID requiere decidir qué versión conservar.",
        "textOutput": "2 registros aunque el lote se procese dos veces; almacenamiento simulado en memoria.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/schema-drift",
    "remember": "Define columnas requeridas y reglas para cambios compatibles.",
    "examples": [
      {
        "id": "requests/extraccion-etl/schema-drift/1",
        "title": "Detectar ausencia de una clave",
        "language": "python",
        "code": "expected = {\"id\", \"amount\", \"status\"}\nrow = {\"id\": 101, \"amount\": 800}\nprint(sorted(expected - row.keys()))",
        "hint": "Define columnas requeridas y reglas para cambios compatibles.",
        "textOutput": "['status']; registro simulado incompleto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/etag",
    "remember": "Requests no mantiene por defecto una caché HTTP de respuestas.",
    "examples": [
      {
        "id": "requests/extraccion-etl/etag/1",
        "title": "Reutilizar datos si no cambiaron",
        "language": "python",
        "code": "a = requests.get(BASE + \"/versioned\", timeout=5)\na.raise_for_status()\nb = requests.get(BASE + \"/versioned\", headers={\"If-None-Match\": a.headers[\"ETag\"]}, timeout=5)\nb.raise_for_status()\nprint(b.status_code, a.json() if b.status_code == 304 else b.json())",
        "hint": "Requests no mantiene por defecto una caché HTTP de respuestas.",
        "textOutput": "304 {'version': 1}.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/last-modified",
    "remember": "Prefiere ETag si está disponible y el contrato lo admite.",
    "examples": [
      {
        "id": "requests/extraccion-etl/last-modified/1",
        "title": "Consultar cambios desde la última respuesta",
        "language": "python",
        "code": "a = requests.get(BASE + \"/versioned\", timeout=5)\na.raise_for_status()\nb = requests.get(BASE + \"/versioned\", headers={\"If-Modified-Since\": a.headers[\"Last-Modified\"]}, timeout=5)\nprint(b.status_code)",
        "hint": "Prefiere ETag si está disponible y el contrato lo admite.",
        "textOutput": "304.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/extraccion-etl/automatizacion",
    "remember": "Registra fallos, evita ejecuciones solapadas y define un presupuesto de reintentos.",
    "examples": [
      {
        "id": "requests/extraccion-etl/automatizacion/1",
        "title": "Encapsular una extracción reutilizable",
        "language": "python",
        "code": "def extract_orders():\n    r = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\n    r.raise_for_status()\n    return r.json()[\"data\"]\nprint(len(extract_orders()))",
        "hint": "Registra fallos, evita ejecuciones solapadas y define un presupuesto de reintentos.",
        "textOutput": "4; solo se ejecuta una vez, no se programa ninguna tarea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
