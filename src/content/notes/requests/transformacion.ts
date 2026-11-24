// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/transformacion/definicion",
    "remember": "Verifica el estado y la estructura antes de transformar.",
    "examples": [
      {
        "id": "requests/transformacion/definicion/1",
        "title": "Obtener una tabla de pedidos",
        "language": "python",
        "code": "import pandas as pd\nr = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\ndf = pd.DataFrame(r.json()[\"data\"])\nprint(df.shape)",
        "hint": "Verifica el estado y la estructura antes de transformar.",
        "textOutput": "(4, 5).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/json-anidado",
    "remember": "Un objeto con data no es la lista de registros directamente.",
    "examples": [
      {
        "id": "requests/transformacion/json-anidado/1",
        "title": "Extraer ID y país",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nr.raise_for_status()\nrow = r.json()\nprint(row[\"id\"], row[\"customer\"][\"country\"])",
        "hint": "Un objeto con data no es la lista de registros directamente.",
        "textOutput": "101 MX.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/json-normalize",
    "remember": "El nombre de las columnas depende de las claves y del separador.",
    "examples": [
      {
        "id": "requests/transformacion/json-normalize/1",
        "title": "Aplanar el cliente anidado",
        "language": "python",
        "code": "import pandas as pd\nr = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\ndf = pd.json_normalize(r.json()[\"data\"])\nprint(df.loc[0, [\"id\", \"customer.country\"]].tolist())",
        "hint": "El nombre de las columnas depende de las claves y del separador.",
        "textOutput": "[101, 'MX'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/read-csv",
    "remember": "No necesitas guardar el CSV si es pequeño y solo vas a analizarlo.",
    "examples": [
      {
        "id": "requests/transformacion/read-csv/1",
        "title": "Leer un CSV descargado",
        "language": "python",
        "code": "from io import BytesIO\nimport pandas as pd\nr = requests.get(BASE + \"/csv\", timeout=5)\nr.raise_for_status()\ndf = pd.read_csv(BytesIO(r.content))\nprint(df[\"amount\"].sum())",
        "hint": "No necesitas guardar el CSV si es pequeño y solo vas a analizarlo.",
        "textOutput": "1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/read-excel",
    "remember": "El cuerpo debe ser un archivo Excel válido; no basta un Content-Type declarado.",
    "examples": [
      {
        "id": "requests/transformacion/read-excel/1",
        "title": "Reproducir una lectura de Excel en memoria",
        "language": "python",
        "code": "from io import BytesIO\nimport pandas as pd\nbuf = BytesIO()\npd.DataFrame({\"id\": [101], \"amount\": [800]}).to_excel(buf, index=False, engine=\"openpyxl\")\ncontent = buf.getvalue()\nprint(pd.read_excel(BytesIO(content), engine=\"openpyxl\")[\"amount\"].iloc[0])",
        "hint": "El cuerpo debe ser un archivo Excel válido; no basta un Content-Type declarado.",
        "textOutput": "800. Se simulan los bytes descargados; requiere openpyxl.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/validacion",
    "remember": "Una estructura distinta debe producir un error visible.",
    "examples": [
      {
        "id": "requests/transformacion/validacion/1",
        "title": "Verificar los registros recibidos",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", timeout=5)\nr.raise_for_status()\nrows = r.json()[\"data\"]\nif not isinstance(rows, list) or not all(isinstance(x, dict) and {\"id\", \"amount\"} <= x.keys() for x in rows):\n    raise ValueError(\"Esquema inesperado\")\nprint(len(rows))",
        "hint": "Una estructura distinta debe producir un error visible.",
        "textOutput": "2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/limpieza",
    "remember": "No conviertas automáticamente un valor ausente a cero sin justificarlo.",
    "examples": [
      {
        "id": "requests/transformacion/limpieza/1",
        "title": "Completar el país desconocido",
        "language": "python",
        "code": "import pandas as pd\nr = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\ndf = pd.json_normalize(r.json()[\"data\"])\ndf[\"customer.country\"] = df[\"customer.country\"].fillna(\"Unknown\")\nprint(df.loc[df[\"id\"] == 104, \"customer.country\"].iloc[0])",
        "hint": "No conviertas automáticamente un valor ausente a cero sin justificarlo.",
        "textOutput": "Unknown.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transformacion/exportacion",
    "remember": "Conserva tipos, encoding y claves de identificación.",
    "examples": [
      {
        "id": "requests/transformacion/exportacion/1",
        "title": "Exportar un resumen a CSV",
        "language": "python",
        "code": "import pandas as pd\nr = requests.get(BASE + \"/orders\", params={\"limit\": 10}, timeout=5)\nr.raise_for_status()\ndf = pd.DataFrame(r.json()[\"data\"])\nprint(df[[\"id\", \"amount\"]].to_csv(index=False))",
        "hint": "Conserva tipos, encoding y claves de identificación.",
        "textOutput": "CSV con encabezado id,amount y cuatro filas: 101,800; 102,300; 103,1200; 104,450. Sin escribir archivo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
