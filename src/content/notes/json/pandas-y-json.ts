// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/pandas-y-json/definicion",
    "remember": "Una fila por entidad requiere elegir qué nivel de anidamiento tabular.",
    "note": "Requiere `pip install pandas`. Las fichas de este grupo usan esa dependencia.",
    "examples": [
      {
        "id": "json/pandas-y-json/definicion/1",
        "title": "Crear un DataFrame de registros planos",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.DataFrame(resumen)\nprint(df.to_dict(orient=\"records\"))",
        "hint": "Cada pedido se convierte en una fila.",
        "textOutput": "Tres registros: `(id, monto)` = `(101, 120.5)`, `(102, 80.0)`, `(103, 50.0)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/read-json",
    "remember": "Usa una ruta de archivo o `StringIO` para texto literal.",
    "examples": [
      {
        "id": "json/pandas-y-json/read-json/1",
        "title": "Leer registros de una cadena",
        "language": "python",
        "code": "import pandas as pd\nfrom io import StringIO\ndf = pd.read_json(StringIO(json.dumps(resumen)), orient=\"records\")\nprint(list(df.columns), len(df))",
        "hint": "StringIO presenta el texto como archivo legible.",
        "textOutput": "`['id', 'monto'] 3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/json-normalize",
    "remember": "Los arreglos internos requieren elegir si se expanden a filas.",
    "examples": [
      {
        "id": "json/pandas-y-json/json-normalize/1",
        "title": "Aplanar el cliente",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.json_normalize(pedidos)\nprint(df[[\"id\", \"cliente.nombre\"]].to_dict(orient=\"records\"))",
        "hint": "El nombre anidado se convierte en una columna.",
        "textOutput": "Tres filas: `(101, Ana)`, `(102, Luis)`, `(103, Eva)`; columnas `id` y `cliente.nombre`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/record-path-y-meta",
    "remember": "Cada item genera una fila; pedidos sin items no generan filas.",
    "examples": [
      {
        "id": "json/pandas-y-json/record-path-y-meta/1",
        "title": "Crear una tabla de productos por pedido",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.json_normalize(pedidos, record_path=\"items\", meta=[\"id\"])\nprint(df[[\"id\", \"sku\", \"cantidad\"]].to_dict(orient=\"records\"))",
        "hint": "Se conserva el id del pedido junto con cada producto.",
        "textOutput": "Tres filas: `(101, A1, 2)`, `(101, B2, 1)`, `(102, A1, 1)`; columnas `id`, `sku`, `cantidad`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/nulos-pandas",
    "remember": "No asumas que `None` y una clave ausente se conservan como categorías distintas.",
    "examples": [
      {
        "id": "json/pandas-y-json/nulos-pandas/1",
        "title": "Detectar faltantes de ciudad",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.json_normalize(pedidos)\nprint(df[\"cliente.ciudad\"].isna().tolist())",
        "hint": "Ana tiene ciudad y los otros dos registros carecen de valor útil.",
        "textOutput": "`[False, True, True]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/to-json",
    "remember": "Usa `orient=\"records\"` para una lista de objetos; no conserva el índice por defecto en esa orientación.",
    "note": "`force_ascii` en pandas cumple una función similar a `ensure_ascii` en json; para fechas puede usarse `date_format=\"iso\"`.",
    "examples": [
      {
        "id": "json/pandas-y-json/to-json/1",
        "title": "Exportar filas",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.DataFrame(resumen)\ns = df.to_json(orient=\"records\", force_ascii=False)\nprint(json.loads(s)[0])",
        "hint": "El primer registro contiene los dos campos de la tabla.",
        "textOutput": "`{'id': 101, 'monto': 120.5}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/pandas-y-json/pandas-jsonl",
    "remember": "La lectura por bloques necesita `lines=True`.",
    "examples": [
      {
        "id": "json/pandas-y-json/pandas-jsonl/1",
        "title": "Procesar bloques de dos registros",
        "language": "python",
        "code": "import pandas as pd\nfor bloque in pd.read_json(ruta_jsonl, lines=True, chunksize=2):\n    print(len(bloque))",
        "hint": "El archivo tiene tres registros.",
        "textOutput": "Dos líneas: `2` y `1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
