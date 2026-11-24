// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/importar-datos/definicion",
    "remember": "Leer no modifica el archivo de origen.",
    "examples": [
      {
        "id": "pandas/importar-datos/definicion/1",
        "title": "Leer CSV desde texto",
        "code": "pd.read_csv(StringIO('id,monto\\n1,100\\n2,200'))",
        "hint": "Revisa encabezados, delimitador y tipos.",
        "textOutput": "   id  monto\n0   1    100\n1   2    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/read-csv",
    "remember": "Revisa encabezados, delimitador y tipos.",
    "examples": [
      {
        "id": "pandas/importar-datos/read-csv/1",
        "title": "Leer CSV desde texto",
        "code": "pd.read_csv(StringIO('id,monto\\n1,100\\n2,200'))",
        "hint": "Revisa encabezados, delimitador y tipos.",
        "textOutput": "   id  monto\n0   1    100\n1   2    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/opciones-de-read-csv",
    "remember": "Define tipos y nulos al ingresar cuando conozcas el esquema.",
    "examples": [
      {
        "id": "pandas/importar-datos/opciones-de-read-csv/1",
        "title": "Conservar ceros iniciales y detectar nulos",
        "code": "pd.read_csv(StringIO('id;importe;fecha\\n001;NA;2026-02-01'), sep=';', dtype={'id': 'string'}, na_values=['NA'], parse_dates=['fecha'], usecols=['id','importe','fecha'])",
        "hint": "Define tipos y nulos al ingresar cuando conozcas el esquema.",
        "textOutput": "    id  importe      fecha\n0  001      NaN 2026-02-01",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/read-excel",
    "remember": "Una hoja no equivale a todo el libro.",
    "note": "Requiere openpyxl; la escritura prepara el archivo de prueba.",
    "examples": [
      {
        "id": "pandas/importar-datos/read-excel/1",
        "title": "Leer una hoja creada en memoria",
        "code": "with TemporaryDirectory() as d:\n    p = Path(d) / 'ventas.xlsx'\n    pedidos[['pedido_id','monto']].head(2).to_excel(p, sheet_name='Ventas', index=False)\n    resultado = pd.read_excel(p, sheet_name='Ventas')\nresultado",
        "hint": "Una hoja no equivale a todo el libro.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/read-json",
    "remember": "La orientación debe coincidir con la estructura.",
    "examples": [
      {
        "id": "pandas/importar-datos/read-json/1",
        "title": "Leer registros JSON",
        "code": "pd.read_json(StringIO('[{\"id\":1,\"monto\":100},{\"id\":2,\"monto\":200}]'), orient='records')",
        "hint": "La orientación debe coincidir con la estructura.",
        "textOutput": "   id  monto\n0   1    100\n1   2    200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/read-sql",
    "remember": "Usa parámetros para valores externos, no concatenación de texto.",
    "examples": [
      {
        "id": "pandas/importar-datos/read-sql/1",
        "title": "Consultar una base SQLite local",
        "code": "with sqlite3.connect(':memory:') as con:\n    pedidos[['pedido_id','monto']].to_sql('ventas', con, index=False)\n    resultado = pd.read_sql('SELECT * FROM ventas WHERE monto > ? ORDER BY pedido_id', con, params=[200])\nresultado",
        "hint": "Usa parámetros para valores externos, no concatenación de texto.",
        "textOutput": "   pedido_id  monto\n0        106    300",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/importar-datos/read-parquet",
    "remember": "Puedes solicitar solo las columnas necesarias.",
    "note": "Requiere pyarrow o fastparquet.",
    "examples": [
      {
        "id": "pandas/importar-datos/read-parquet/1",
        "title": "Leer dos columnas de Parquet",
        "code": "with TemporaryDirectory() as d:\n    p = Path(d) / 'ventas.parquet'\n    pedidos.to_parquet(p, index=False)\n    resultado = pd.read_parquet(p, columns=['pedido_id','monto']).head(2)\nresultado",
        "hint": "Puedes solicitar solo las columnas necesarias.",
        "textOutput": "   pedido_id  monto\n0        101    100\n1        102    200",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
