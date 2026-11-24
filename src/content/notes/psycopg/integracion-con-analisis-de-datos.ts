// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/definicion",
    "remember": "Extraer solo las columnas y filas necesarias.",
    "note": "Requiere pandas instalado; no se debe pasar un objeto Psycopg directamente a read_sql como si estuviera soportado universalmente por pandas.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/definicion/1",
        "title": "Construir un DataFrame con el resumen SQL",
        "language": "python",
        "code": "import pandas as pd\ncur.execute(\"SELECT estado, COUNT(*) AS total FROM pedidos GROUP BY estado ORDER BY estado\")\ndf = pd.DataFrame(cur.fetchall(), columns=[c.name for c in cur.description])\nprint(df)",
        "hint": "Extraer solo las columnas y filas necesarias.",
        "textOutput": "Dos filas: `cancelled, 1` y `completed, 4`; columnas `estado`, `total`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/pandas-con-row-factory",
    "remember": "Si no hay filas, indicar columns explícitamente para conservar el esquema esperado.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/pandas-con-row-factory/1",
        "title": "Transformar clientes en DataFrame",
        "language": "python",
        "code": "import pandas as pd\nfrom psycopg.rows import dict_row\nwith conn.cursor(row_factory=dict_row) as c:\n    filas = c.execute(\"SELECT id,nombre FROM clientes ORDER BY id\").fetchall()\ndf = pd.DataFrame(filas, columns=[\"id\",\"nombre\"])\nprint(df.shape)",
        "hint": "Si no hay filas, indicar columns explícitamente para conservar el esquema esperado.",
        "textOutput": "`(4, 2)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/sqlalchemy-y-pandas-read-sql",
    "remember": "SQLAlchemy y pandas no forman parte de Psycopg.",
    "note": "Instalar pandas y SQLAlchemy 2.x. El estilo `:estado` corresponde a sqlalchemy.text(), no a cursor.execute de Psycopg.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/sqlalchemy-y-pandas-read-sql/1",
        "title": "Leer una consulta parametrizada con SQLAlchemy",
        "language": "python",
        "code": "import pandas as pd\nfrom sqlalchemy import create_engine, text\nfrom sqlalchemy.engine import URL\n# URL base de SQLAlchemy; Psycopg usa DSN para establecer cada conexión.\nengine = create_engine(URL.create(\"postgresql+psycopg\"), creator=lambda: psycopg.connect(DSN))\ntry:\n    with engine.connect() as c:\n        df = pd.read_sql(text(\"SELECT id FROM pedidos WHERE estado=:estado ORDER BY id\"), c, params={\"estado\":\"completed\"})\n        print(df[\"id\"].tolist())\nfinally:\n    engine.dispose()",
        "hint": "SQLAlchemy y pandas no forman parte de Psycopg.",
        "textOutput": "`[101, 102, 103, 105]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/csv-y-exportacion-de-resultados",
    "remember": "CSV no conserva automáticamente tipos ni diferencia siempre NULL de texto vacío.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/csv-y-exportacion-de-resultados/1",
        "title": "Crear un CSV de clientes en memoria",
        "language": "python",
        "code": "import csv\nfrom io import StringIO\ncur.execute(\"SELECT id,nombre FROM clientes ORDER BY id\")\narchivo = StringIO(newline=\"\")\nwriter = csv.writer(archivo)\nwriter.writerow([col.name for col in cur.description])\nwriter.writerows(cur)\nprint(archivo.getvalue())",
        "hint": "CSV no conserva automáticamente tipos ni diferencia siempre NULL de texto vacío.",
        "textOutput": "Encabezado `id,nombre` seguido de cuatro filas con Ana, Luis, Marta y Diego.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/excel-y-json",
    "remember": "Decimal y fechas necesitan una política explícita de conversión.",
    "note": "Para Excel: convertir a DataFrame y usar `to_excel(..., index=False)` con openpyxl u otro motor compatible; no convertir importes a float sin revisar precisión.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/excel-y-json/1",
        "title": "Exportar los clientes en JSON",
        "language": "python",
        "code": "import json\nfrom psycopg.rows import dict_row\nwith conn.cursor(row_factory=dict_row) as c:\n    datos = c.execute(\"SELECT id,nombre FROM clientes ORDER BY id LIMIT 2\").fetchall()\nprint(json.dumps(datos, ensure_ascii=False))",
        "hint": "Decimal y fechas necesitan una política explícita de conversión.",
        "textOutput": "`[{\"id\": 1, \"nombre\": \"Ana\"}, {\"id\": 2, \"nombre\": \"Luis\"}]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/numpy-y-procesamiento-numerico",
    "remember": "Un array NumPy no es lo mismo que un ARRAY PostgreSQL.",
    "note": "El cast a int se usa solo porque los importes de este dataset son enteros exactos. No aplicarlo a datos monetarios arbitrarios.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/numpy-y-procesamiento-numerico/1",
        "title": "Analizar importes enteros de ejemplo",
        "language": "python",
        "code": "import numpy as np\ncur.execute(\"SELECT importe::int FROM pedidos ORDER BY id\")\nvalores = np.array([fila[0] for fila in cur], dtype=np.int64)\nprint(valores.sum(), valores.max())",
        "hint": "Un array NumPy no es lo mismo que un ARRAY PostgreSQL.",
        "textOutput": "`2300 800`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/etl-y-validacion",
    "remember": "El controlador ejecuta la carga; las reglas de calidad se deciden según el negocio.",
    "note": "Si un mismo ID contiene datos contradictorios, definir una regla de resolución en lugar de descartar registros sin revisión.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/etl-y-validacion/1",
        "title": "Deduplicar un lote antes de cargar",
        "language": "python",
        "code": "lote = [(9,\"Eva\"),(9,\"Eva\"),(10,\"Leo\")]\nunicos = list(dict.fromkeys(lote))\ncur.execute(\"CREATE TEMP TABLE etl_clientes (id int PRIMARY KEY, nombre text)\")\ncur.executemany(\"INSERT INTO etl_clientes VALUES (%s,%s)\", unicos)\nprint(cur.execute(\"SELECT COUNT(*) FROM etl_clientes\").fetchone())",
        "hint": "El controlador ejecuta la carga; las reglas de calidad se deciden según el negocio.",
        "textOutput": "`(2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/integracion-con-analisis-de-datos/automatizacion-de-reportes",
    "remember": "Separar credenciales, SQL, transformación y presentación.",
    "note": "Para automatizar, envolver en una función y programar su ejecución externamente; no incluir secretos en el reporte.",
    "examples": [
      {
        "id": "psycopg/integracion-con-analisis-de-datos/automatizacion-de-reportes/1",
        "title": "Obtener ingresos de un mes con intervalo semiabierto",
        "language": "python",
        "code": "from datetime import date\ninicio, fin = date(2026,1,1), date(2026,2,1)\ncur.execute(\"\"\"SELECT COUNT(*), SUM(importe) FROM pedidos\nWHERE estado=%s AND fecha >= %s AND fecha < %s\"\"\", (\"completed\",inicio,fin))\nprint(cur.fetchone())",
        "hint": "Separar credenciales, SQL, transformación y presentación.",
        "textOutput": "`(3, Decimal('1500.00'))`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
