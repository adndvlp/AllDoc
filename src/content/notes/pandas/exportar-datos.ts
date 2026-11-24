// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/exportar-datos/definicion",
    "remember": "Decide si el índice forma parte de los datos a exportar.",
    "examples": [
      {
        "id": "pandas/exportar-datos/definicion/1",
        "title": "Generar CSV de dos pedidos",
        "code": "pedidos[['pedido_id','monto']].head(2).to_csv(index=False).strip()",
        "hint": "Especifica separador y codificación si el consumidor los necesita.",
        "textOutput": "pedido_id,monto\n101,100\n102,200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/exportar-datos/to-csv",
    "remember": "Especifica separador y codificación si el consumidor los necesita.",
    "examples": [
      {
        "id": "pandas/exportar-datos/to-csv/1",
        "title": "Generar CSV de dos pedidos",
        "code": "pedidos[['pedido_id','monto']].head(2).to_csv(index=False).strip()",
        "hint": "Especifica separador y codificación si el consumidor los necesita.",
        "textOutput": "pedido_id,monto\n101,100\n102,200",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/exportar-datos/to-excel",
    "remember": "El archivo puede sobrescribirse; conserva el original cuando sea necesario.",
    "note": "Requiere openpyxl.",
    "examples": [
      {
        "id": "pandas/exportar-datos/to-excel/1",
        "title": "Crear un libro de dos hojas",
        "code": "with TemporaryDirectory() as d:\n    p = Path(d)/'reporte.xlsx'\n    with pd.ExcelWriter(p,engine='openpyxl') as w:\n        clientes.to_excel(w,sheet_name='Clientes',index=False)\n        pedidos.to_excel(w,sheet_name='Pedidos',index=False)\n    with pd.ExcelFile(p) as libro:\n        resultado = libro.sheet_names\nresultado",
        "hint": "El archivo puede sobrescribirse; conserva el original cuando sea necesario.",
        "textOutput": "['Clientes', 'Pedidos']",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/exportar-datos/to-json",
    "remember": "Define date_format cuando exportes fechas.",
    "examples": [
      {
        "id": "pandas/exportar-datos/to-json/1",
        "title": "Exportar dos pedidos a JSON",
        "code": "pedidos[['pedido_id','monto']].head(2).to_json(orient='records')",
        "hint": "Define date_format cuando exportes fechas.",
        "textOutput": "[{\"pedido_id\":101,\"monto\":100},{\"pedido_id\":102,\"monto\":200}]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/exportar-datos/to-sql",
    "remember": "replace elimina y recrea la tabla, append añade filas.",
    "examples": [
      {
        "id": "pandas/exportar-datos/to-sql/1",
        "title": "Crear una tabla de reporte en SQLite",
        "code": "with sqlite3.connect(':memory:') as con:\n    pedidos[['pedido_id','monto']].to_sql('reporte',con,index=False,if_exists='fail')\n    resultado = pd.read_sql('SELECT COUNT(*) AS filas FROM reporte',con)\nresultado",
        "hint": "replace elimina y recrea la tabla, append añade filas.",
        "textOutput": "   filas\n0      7",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/exportar-datos/to-parquet",
    "remember": "Requiere motor Parquet instalado.",
    "note": "Requiere pyarrow o fastparquet.",
    "examples": [
      {
        "id": "pandas/exportar-datos/to-parquet/1",
        "title": "Exportar y recuperar montos",
        "code": "with TemporaryDirectory() as d:\n    p = Path(d)/'montos.parquet'\n    pedidos[['pedido_id','monto']].to_parquet(p,index=False)\n    resultado = pd.read_parquet(p).shape\nresultado",
        "hint": "Requiere motor Parquet instalado.",
        "textOutput": "(7, 2)",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
