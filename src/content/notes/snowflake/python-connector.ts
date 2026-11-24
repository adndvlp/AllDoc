// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/python-connector/definicion",
    "remember": "El servidor ejecuta SQL; Python recibe los resultados.",
    "note": "Configura la conexión indicada en Datos compartidos.",
    "examples": [
      {
        "id": "snowflake/python-connector/definicion/1",
        "title": "Abrir conexión y consultar conteo",
        "language": "python",
        "code": "import snowflake.connector\nwith snowflake.connector.connect(connection_name=\"alldoc\") as conn:\n    with conn.cursor() as cur:\n        cur.execute(\"SELECT COUNT(*) FROM ORDERS\")\n        print(cur.fetchone())",
        "hint": "",
        "textOutput": "(8,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/python-connector/execute-parametros-y-executemany",
    "remember": "Con paramstyle predeterminado pyformat usa %s para valores; evita f-strings con entrada de usuario.",
    "note": "executemany es útil para inserciones por lote; no sustituye COPY en cargas grandes.",
    "examples": [
      {
        "id": "snowflake/python-connector/execute-parametros-y-executemany/1",
        "title": "Buscar pedidos con parámetro",
        "language": "python",
        "code": "import snowflake.connector\nwith snowflake.connector.connect(connection_name=\"alldoc\") as conn:\n    with conn.cursor() as cur:\n        cur.execute(\"SELECT ORDER_ID FROM ORDERS WHERE STATUS=%s AND AMOUNT>%s ORDER BY ORDER_ID\", (\"completed\", 200))\n        print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(103,), (107,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/python-connector/fetchone-fetchmany-y-fetchall",
    "remember": "Cada llamada avanza el cursor; evita fetchall para resultados que no caben en memoria.",
    "examples": [
      {
        "id": "snowflake/python-connector/fetchone-fetchmany-y-fetchall/1",
        "title": "Leer resultados por lotes",
        "language": "python",
        "code": "import snowflake.connector\nwith snowflake.connector.connect(connection_name=\"alldoc\") as conn:\n    with conn.cursor() as cur:\n        cur.execute(\"SELECT ORDER_ID FROM ORDERS ORDER BY ORDER_ID\")\n        print(cur.fetchmany(2))\n        print(cur.fetchone())",
        "hint": "",
        "textOutput": "[(101,), (102,)] y después (103,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/python-connector/pandas-fetch-pandas-all-y-batches",
    "remember": "El procesamiento pandas es local y consume memoria del cliente.",
    "note": "Instala el extra pandas del conector.",
    "examples": [
      {
        "id": "snowflake/python-connector/pandas-fetch-pandas-all-y-batches/1",
        "title": "Llevar un resumen a pandas",
        "language": "python",
        "code": "import snowflake.connector\nwith snowflake.connector.connect(connection_name=\"alldoc\") as conn:\n    with conn.cursor() as cur:\n        cur.execute(\"SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1 ORDER BY 1\")\n        df = cur.fetch_pandas_all()\n        print(df.shape)",
        "hint": "",
        "textOutput": "(4, 2), con columnas CUSTOMER_ID y TOTAL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/python-connector/write-pandas",
    "remember": "Revisa nombres, tipos, quoting, éxito y conteos; no sobrescribe por defecto.",
    "note": "Requiere permisos de tabla y staging y dependencias pandas.",
    "examples": [
      {
        "id": "snowflake/python-connector/write-pandas/1",
        "title": "Cargar dos filas en una tabla aislada",
        "language": "python",
        "code": "import pandas as pd\nimport snowflake.connector\nfrom snowflake.connector.pandas_tools import write_pandas\nwith snowflake.connector.connect(connection_name=\"alldoc\") as conn:\n    with conn.cursor() as cur:\n        cur.execute(\"CREATE OR REPLACE TABLE DEMO_PD(ID NUMBER, AMOUNT NUMBER)\")\n    df = pd.DataFrame({\"ID\":[1,2], \"AMOUNT\":[10,20]})\n    success, chunks, rows, output = write_pandas(conn, df, \"DEMO_PD\")\n    print(success, rows)",
        "hint": "",
        "textOutput": "True 2 si la carga termina correctamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
