// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/definicion",
    "remember": "Separa la lógica HTTP de la transformación.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/definicion/1",
        "title": "Calcular importe de pedidos completados",
        "language": "python",
        "code": "with demo() as c:\n    d = c.get(\"/pedidos\", params={\"estado\": \"completed\", \"limit\": 10}).raise_for_status().json()\n    print(sum(x[\"importe\"] for x in d[\"items\"]))",
        "hint": "Separa la lógica HTTP de la transformación.",
        "textOutput": "`2200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/extraccion-incremental",
    "remember": "La API de prueba usa fecha estrictamente mayor; en producción contempla empates y cambios tardíos.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/extraccion-incremental/1",
        "title": "Extraer pedidos posteriores a una fecha",
        "language": "python",
        "code": "with demo() as c:\n    d = c.get(\"/pedidos\", params={\"desde\": \"2026-08-02\", \"limit\": 10}).json()\n    print([x[\"id\"] for x in d[\"items\"]])",
        "hint": "La API de prueba usa fecha estrictamente mayor; en producción contempla empates y cambios tardíos.",
        "textOutput": "`[3, 4]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/eliminar-duplicados",
    "remember": "No elimines registros distintos solo porque tengan el mismo importe.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/eliminar-duplicados/1",
        "title": "Unificar dos lotes superpuestos",
        "language": "python",
        "code": "lote = PEDIDOS[:2] + PEDIDOS[1:]\nunicos = {x[\"id\"]: x for x in lote}\nprint(sorted(unicos))",
        "hint": "No elimines registros distintos solo porque tengan el mismo importe.",
        "textOutput": "`[1, 2, 3, 4]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/checkpoint-y-recuperacion",
    "remember": "No avances el checkpoint antes de confirmar la escritura del lote.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/checkpoint-y-recuperacion/1",
        "title": "Guardar un marcador de progreso",
        "language": "python",
        "code": "with TemporaryDirectory() as tmp:\n    p = Path(tmp) / \"checkpoint.json\"\n    with demo() as c:\n        d = c.get(\"/pedidos\").raise_for_status().json()\n        (Path(tmp) / \"lote.json\").write_text(json.dumps(d[\"items\"]))\n        p.write_text(json.dumps({\"cursor\": d[\"next_cursor\"]}))\n        cursor = json.loads(p.read_text())[\"cursor\"]\n        print(c.get(\"/pedidos\", params={\"cursor\": cursor}).json()[\"items\"][0][\"id\"])",
        "hint": "No avances el checkpoint antes de confirmar la escritura del lote.",
        "textOutput": "`3`; ejemplo local de reanudación, no una transacción atómica entre archivos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/pandas-y-json-normalize",
    "remember": "Requiere `python -m pip install pandas`.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/pandas-y-json-normalize/1",
        "title": "Crear una tabla de pedidos",
        "language": "python",
        "code": "import pandas as pd\nwith demo() as c:\n    d = c.get(\"/pedidos\", params={\"limit\": 10}).json()\ndf = pd.json_normalize(d[\"items\"])\nprint(df.shape, df[\"importe\"].sum())",
        "hint": "Requiere `python -m pip install pandas`.",
        "textOutput": "`(4, 5) 2500`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/exportacion-csv-y-json",
    "remember": "Los archivos JSON y CSV tienen representaciones distintas de datos anidados y nulos.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/exportacion-csv-y-json/1",
        "title": "Guardar datos en dos formatos",
        "language": "python",
        "code": "import csv\nwith TemporaryDirectory() as tmp:\n    p = Path(tmp)\n    (p / \"pedidos.json\").write_text(json.dumps(PEDIDOS), encoding=\"utf-8\")\n    with (p / \"pedidos.csv\").open(\"w\", newline=\"\", encoding=\"utf-8\") as f:\n        w = csv.DictWriter(f, fieldnames=PEDIDOS[0].keys())\n        w.writeheader()\n        w.writerows(PEDIDOS)\n    print(len((p / \"pedidos.csv\").read_text().splitlines()))",
        "hint": "Los archivos JSON y CSV tienen representaciones distintas de datos anidados y nulos.",
        "textOutput": "`5` líneas: encabezado y cuatro registros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/exportacion-excel",
    "remember": "Requiere pandas y openpyxl.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/exportacion-excel/1",
        "title": "Crear una hoja de pedidos",
        "language": "python",
        "code": "import pandas as pd\nwith TemporaryDirectory() as tmp:\n    p = Path(tmp) / \"pedidos.xlsx\"\n    pd.DataFrame(PEDIDOS).to_excel(p, index=False, engine=\"openpyxl\")\n    print(pd.read_excel(p).shape)",
        "hint": "Requiere pandas y openpyxl.",
        "textOutput": "`(4, 5)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/carga-sql",
    "remember": "Usa parámetros SQL y una clave única para prevenir duplicados.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/carga-sql/1",
        "title": "Cargar pedidos en SQLite de memoria",
        "language": "python",
        "code": "import sqlite3\nfrom contextlib import closing\nwith closing(sqlite3.connect(\":memory:\")) as db, db:\n    db.execute(\"CREATE TABLE pedidos (id INTEGER PRIMARY KEY, importe INTEGER)\")\n    db.executemany(\"INSERT INTO pedidos VALUES (?, ?)\", [(x[\"id\"], x[\"importe\"]) for x in PEDIDOS])\n    print(db.execute(\"SELECT SUM(importe) FROM pedidos\").fetchone()[0])",
        "hint": "Usa parámetros SQL y una clave única para prevenir duplicados.",
        "textOutput": "`2500`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/extraccion-y-etl/cache-condicional-etag-y-last-modified",
    "remember": "HTTPX no mantiene una caché HTTP automática; maneja 304 antes de raise_for_status.",
    "examples": [
      {
        "id": "httpx/extraccion-y-etl/cache-condicional-etag-y-last-modified/1",
        "title": "Reutilizar una respuesta sin cambios",
        "language": "python",
        "code": "with demo() as c:\n    anterior = c.get(\"/cache\").raise_for_status()\n    r = c.get(\"/cache\", headers={\"If-None-Match\": anterior.headers[\"ETag\"]})\n    datos = anterior.json() if r.status_code == 304 else r.raise_for_status().json()\n    print(r.status_code, datos[\"total\"])",
        "hint": "HTTPX no mantiene una caché HTTP automática; maneja 304 antes de raise_for_status.",
        "textOutput": "`304 4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
