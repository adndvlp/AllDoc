// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/conversion-de-formatos/definicion",
    "remember": "Una tabla plana no conserva automáticamente toda la jerarquía JSON.",
    "examples": [
      {
        "id": "json/conversion-de-formatos/definicion/1",
        "title": "Preparar filas planas",
        "language": "python",
        "code": "filas = [{\"id\": p[\"id\"], \"nombre\": p[\"cliente\"][\"nombre\"]} for p in pedidos]\nprint(filas[0])",
        "hint": "Se extraen únicamente dos campos por pedido.",
        "textOutput": "`{'id': 101, 'nombre': 'Ana'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/conversion-de-formatos/json-a-csv",
    "remember": "CSV no guarda tipos ni objetos anidados de manera nativa.",
    "examples": [
      {
        "id": "json/conversion-de-formatos/json-a-csv/1",
        "title": "Exportar montos a CSV",
        "language": "python",
        "code": "import csv\np = carpeta / \"resumen.csv\"\nwith open(p, \"w\", encoding=\"utf-8\", newline=\"\") as f:\n    w = csv.DictWriter(f, fieldnames=[\"id\", \"monto\"])\n    w.writeheader()\n    w.writerows(resumen)\nprint(p.read_text(encoding=\"utf-8\"))",
        "hint": "El encabezado y tres filas se escriben sin conservar tipos explícitos.",
        "textOutput": "Líneas `id,monto`, `101,120.5`, `102,80`, `103,50`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/conversion-de-formatos/csv-a-json",
    "remember": "Sin conversiones, los números se exportan como cadenas.",
    "examples": [
      {
        "id": "json/conversion-de-formatos/csv-a-json/1",
        "title": "Convertir un CSV de ejemplo",
        "language": "python",
        "code": "import csv\nfrom io import StringIO\nf = StringIO(\"id,monto\\n101,120.5\\n102,80\\n\")\nfilas = [{\"id\": int(r[\"id\"]), \"monto\": float(r[\"monto\"])}\n         for r in csv.DictReader(f)]\nprint(json.dumps(filas))",
        "hint": "Se recuperan tipos numéricos antes de escribir JSON.",
        "textOutput": "`[{\"id\": 101, \"monto\": 120.5}, {\"id\": 102, \"monto\": 80.0}]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/conversion-de-formatos/json-a-excel",
    "remember": "Usa `index=False` si el índice no forma parte de tus datos.",
    "note": "Requiere `pip install pandas openpyxl`.",
    "examples": [
      {
        "id": "json/conversion-de-formatos/json-a-excel/1",
        "title": "Exportar resumen a Excel",
        "language": "python",
        "code": "import pandas as pd\np = carpeta / \"resumen.xlsx\"\npd.DataFrame(resumen).to_excel(p, index=False, engine=\"openpyxl\")\nprint(pd.read_excel(p, engine=\"openpyxl\").shape)",
        "hint": "Se escribe una hoja con dos columnas y tres filas de datos. Ejecuta este ejemplo en un entorno con pandas y openpyxl.",
        "textOutput": "`(3, 2)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/conversion-de-formatos/excel-a-json",
    "remember": "Escoge explícitamente formato de fechas y columnas de salida.",
    "note": "Requiere pandas y openpyxl.",
    "examples": [
      {
        "id": "json/conversion-de-formatos/excel-a-json/1",
        "title": "Convertir una hoja de práctica",
        "language": "python",
        "code": "import pandas as pd\np = carpeta / \"entrada.xlsx\"\npd.DataFrame(resumen).to_excel(p, index=False, engine=\"openpyxl\")\ndf = pd.read_excel(p, engine=\"openpyxl\")\ns = df.to_json(orient=\"records\", date_format=\"iso\")\nprint(len(json.loads(s)))",
        "hint": "El ejemplo crea su propia hoja de entrada. Ejecuta este ejemplo en un entorno con pandas y openpyxl.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
