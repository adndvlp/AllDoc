// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/definicion",
    "remember": "El conector trae filas; las bibliotecas analíticas hacen la transformación.",
    "note": "Instala pandas con python -m pip install pandas.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/definicion/1",
        "title": "Crear un DataFrame a partir del cursor",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import pandas as pd\n    cur.execute(\"SELECT customer_id,name FROM customers ORDER BY customer_id\")\n    df = pd.DataFrame(cur.fetchall(), columns=cur.column_names)\n    print(df.shape)",
        "hint": "",
        "textOutput": "(4, 2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/pandas-y-sqlalchemy",
    "remember": "SQLAlchemy puede usar este conector como driver; no es el mismo paquete.",
    "note": "Instala pandas y sqlalchemy; URL.create evita construir manualmente una URL con credenciales.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/pandas-y-sqlalchemy/1",
        "title": "Leer una consulta parametrizada",
        "language": "python",
        "code": "import pandas as pd\nfrom sqlalchemy import create_engine, URL, text\nurl = URL.create(\"mysql+mysqlconnector\", username=CONFIG[\"user\"], password=CONFIG[\"password\"], host=CONFIG[\"host\"], port=CONFIG[\"port\"], database=CONFIG[\"database\"])\nengine = create_engine(url)\ntry:\n    with engine.connect() as conn:\n        df = pd.read_sql(text(\"SELECT name FROM customers WHERE customer_id=:id\"), conn, params={\"id\":1})\n        print(df.iloc[0,0])\nfinally:\n    engine.dispose()",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/numpy",
    "remember": "La conversión a float puede perder precisión monetaria.",
    "note": "Instala numpy. Para dinero exacto usa Decimal o SQL DECIMAL.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/numpy/1",
        "title": "Calcular una media numérica",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import numpy as np\n    cur.execute(\"SELECT amount FROM orders WHERE status='completed'\")\n    values = np.array([float(r[0]) for r in cur.fetchall()])\n    print(values.mean())",
        "hint": "",
        "textOutput": "687.5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-csv",
    "remember": "Especifica encoding y newline; el CSV no conserva tipos ni distingue por sí solo NULL de texto vacío.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/exportar-csv/1",
        "title": "Exportar clientes",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import csv\n    from pathlib import Path\n    from tempfile import TemporaryDirectory\n    cur.execute(\"SELECT customer_id,name FROM customers ORDER BY customer_id\")\n    with TemporaryDirectory() as tmp:\n        path = Path(tmp)/\"customers.csv\"\n        with path.open(\"w\", encoding=\"utf-8\", newline=\"\") as f:\n            w = csv.writer(f)\n            w.writerow(cur.column_names)\n            w.writerows(cur)\n        print(path.read_text(encoding=\"utf-8\"))",
        "hint": "",
        "textOutput": "Encabezado customer_id,name y cuatro filas: 1,Ana; 2,Luis; 3,Marta; 4,Diego. El archivo temporal se elimina al salir.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/excel",
    "remember": "Controla encabezados, tipos y precisión; no uses Excel como base transaccional.",
    "note": "Instala pandas y openpyxl; el archivo temporal desaparece al terminar.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/excel/1",
        "title": "Crear un libro de clientes",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import pandas as pd\n    from pathlib import Path\n    from tempfile import TemporaryDirectory\n    cur.execute(\"SELECT customer_id,name FROM customers ORDER BY customer_id\")\n    df = pd.DataFrame(cur.fetchall(), columns=cur.column_names)\n    with TemporaryDirectory() as tmp:\n        path = Path(tmp)/\"customers.xlsx\"\n        df.to_excel(path,index=False)\n        print(pd.read_excel(path).shape)",
        "hint": "",
        "textOutput": "(4, 2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/pandas-numpy-y-archivos/exportar-json",
    "remember": "Define cómo representar fechas y dinero; no pierdas precisión sin querer.",
    "examples": [
      {
        "id": "mysql-connector-python/pandas-numpy-y-archivos/exportar-json/1",
        "title": "Exportar un pedido como objeto JSON",
        "language": "python",
        "code": "import json\nwith abrir() as cnx, cnx.cursor(dictionary=True) as cur:\n    cur.execute(\"SELECT order_id,amount,order_date FROM orders WHERE order_id=101\")\n    print(json.dumps(cur.fetchall()[0], default=str))",
        "hint": "",
        "textOutput": "{\"order_id\": 101, \"amount\": \"800.00\", \"order_date\": \"2026-02-01\"} (orden de claves según el SELECT).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
