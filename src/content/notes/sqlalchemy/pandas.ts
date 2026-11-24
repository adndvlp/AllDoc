// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/definicion",
    "remember": "Filtra y agrega en SQL cuando evite transportar datos innecesarios.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/definicion/1",
        "title": "Leer pedidos completados en un DataFrame",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.read_sql_query(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.estado==\"completed\").order_by(pedidos.c.id),engine)\nprint(df.to_string(index=False))",
        "hint": "Filtra y agrega en SQL cuando evite transportar datos innecesarios.",
        "textOutput": "id  monto\n101    100\n102    200\n103    200\n105    300\n106    100",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/read-sql-read-sql-query-y-read-sql-table",
    "remember": "read_sql_table() requiere conexión SQLAlchemy o compatible, no una conexión sqlite3 directa.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/read-sql-read-sql-query-y-read-sql-table/1",
        "title": "Leer una tabla y seleccionar un subconjunto",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.read_sql_table(\"productos\",engine,columns=[\"id\",\"precio\"])\nprint(df.sort_values(\"id\").to_string(index=False))",
        "hint": "read_sql_table() requiere conexión SQLAlchemy o compatible, no una conexión sqlite3 directa.",
        "textOutput": "id  precio\n  1     100\n  2     200\n  3     300",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/params-index-col-y-parse-dates",
    "remember": "No construyas SQL mediante concatenación de parámetros.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/params-index-col-y-parse-dates/1",
        "title": "Leer pedidos con fecha e índice",
        "language": "python",
        "code": "import pandas as pd\ns=text(\"SELECT id, fecha, monto FROM pedidos WHERE monto >= :m ORDER BY id\")\ndf=pd.read_sql_query(s,engine,params={\"m\":200},index_col=\"id\",parse_dates=[\"fecha\"])\nprint(df.to_string())\nprint(str(df.fecha.dtype))",
        "hint": "No construyas SQL mediante concatenación de parámetros.",
        "textOutput": "fecha  monto\nid                   \n102 2026-02-03    200\n103 2026-02-03    200\n105 2026-03-01    300\ndatetime64[us]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/dtype-dtype-backend-y-coerce-float",
    "remember": "No pierdas precisión monetaria por una conversión inadvertida.",
    "note": "dtype_backend requiere Pandas 2.0+; pyarrow requiere instalar pyarrow.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/dtype-dtype-backend-y-coerce-float/1",
        "title": "Leer valores con tipo nullable",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.read_sql_query(select(clientes.c.id,clientes.c.pais).order_by(clientes.c.id),engine,dtype_backend=\"numpy_nullable\")\nprint(df.dtypes.astype(str).to_dict())\nprint(df.pais.isna().sum())",
        "hint": "No pierdas precisión monetaria por una conversión inadvertida.",
        "textOutput": "{'id': 'Int64', 'pais': 'string'}\n1",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/chunksize-en-lectura",
    "remember": "Mantén la conexión abierta hasta terminar de iterar.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/chunksize-en-lectura/1",
        "title": "Leer pedidos por lotes",
        "language": "python",
        "code": "import pandas as pd\nwith engine.connect() as conn:\n    for lote in pd.read_sql_query(select(pedidos.c.id).order_by(pedidos.c.id),conn,chunksize=3):\n        print(lote.id.tolist())",
        "hint": "Mantén la conexión abierta hasta terminar de iterar.",
        "textOutput": "[101, 102, 103]\n[104, 105, 106]\n[107]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/to-sql-if-exists-e-index",
    "remember": "index=False evita guardar un índice de Pandas innecesario; replace puede perder restricciones.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/to-sql-if-exists-e-index/1",
        "title": "Guardar un resumen nuevo",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.DataFrame({\"pais\":[\"MX\",\"ES\"],\"ventas\":[500,400]})\ndf.to_sql(\"resumen\",engine,if_exists=\"fail\",index=False)\nver(text(\"SELECT pais, ventas FROM resumen ORDER BY pais\"))",
        "hint": "index=False evita guardar un índice de Pandas innecesario; replace puede perder restricciones.",
        "textOutput": "('pais', 'ventas')\n[('ES', 400), ('MX', 500)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/dtype-schema-index-label-y-escritura-por-bloques",
    "remember": "Ajusta el tamaño del lote a los límites del driver.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/dtype-schema-index-label-y-escritura-por-bloques/1",
        "title": "Escribir con tipos explícitos",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.DataFrame({\"codigo\":[\"A\",\"B\"],\"total\":[10,20]})\ndf.to_sql(\"carga\",engine,index=False,dtype={\"codigo\":String(10),\"total\":Integer},chunksize=1,method=\"multi\")\nprint([(c[\"name\"],str(c[\"type\"])) for c in inspect(engine).get_columns(\"carga\")])",
        "hint": "Ajusta el tamaño del lote a los límites del driver.",
        "textOutput": "[('codigo', 'VARCHAR(10)'), ('total', 'INTEGER')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pandas/to-sql-en-una-transaccion",
    "remember": "Usa engine.begin() si varias escrituras deben confirmarse juntas.",
    "examples": [
      {
        "id": "sqlalchemy/pandas/to-sql-en-una-transaccion/1",
        "title": "Agregar una fila y verificar",
        "language": "python",
        "code": "import pandas as pd\nwith engine.begin() as conn:\n    pd.DataFrame({\"id\":[4],\"nombre\":[\"Mesa\"],\"categoria\":[\"Hogar\"],\"precio\":[400]}).to_sql(\"productos\",conn,if_exists=\"append\",index=False)\nvalor(select(func.count()).select_from(productos))",
        "hint": "Usa engine.begin() si varias escrituras deben confirmarse juntas.",
        "textOutput": "4",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
