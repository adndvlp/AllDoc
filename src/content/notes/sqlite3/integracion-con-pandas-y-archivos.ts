// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/definicion",
    "remember": "SQL filtra y agrega; Python transforma y exporta.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/definicion/1",
        "title": "Extraer ventas para Python",
        "language": "python",
        "code": "filas = con.execute(\"SELECT cliente_id, SUM(monto) FROM pedidos WHERE estado = 'completado' GROUP BY cliente_id ORDER BY cliente_id\").fetchall()\nprint(dict(filas))",
        "hint": "La consulta reduce los datos antes de traerlos a Python.",
        "textOutput": "`{1: 20000, 2: 15000, 3: 8000}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/read-sql-query-y-read-sql",
    "remember": "Con sqlite3 usa una consulta SQL, no solo el nombre de tabla.",
    "note": "Requiere pandas instalado: python -m pip install pandas.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/read-sql-query-y-read-sql/1",
        "title": "Crear un DataFrame",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.read_sql_query(\"SELECT id, nombre FROM clientes ORDER BY id\", con)\nprint(df.to_dict(\"records\")[:2])",
        "hint": "pd.read_sql con esa misma consulta también funciona.",
        "textOutput": "`[{'id': 1, 'nombre': 'Ana'}, {'id': 2, 'nombre': 'Luis'}]`; cuatro filas en total.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/params-y-parse-dates",
    "remember": "Mantén los parámetros separados de la consulta.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/params-y-parse-dates/1",
        "title": "Cargar pedidos con fecha tipada",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.read_sql_query(\"SELECT fecha, monto FROM pedidos WHERE id = ?\", con, params=(101,), parse_dates=[\"fecha\"])\nprint(df.loc[0, \"fecha\"].strftime(\"%Y-%m-%d\"), df.loc[0, \"monto\"])",
        "hint": "fecha es un timestamp de pandas.",
        "textOutput": "`2026-08-01 12000`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/to-sql",
    "remember": "index=False evita guardar el índice de pandas como columna.",
    "note": "Con una conexión sqlite3 directa, pandas documenta que no se puede revertir la inserción mediante rollback de to_sql; no presupongas atomicidad externa.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/to-sql/1",
        "title": "Cargar metas comerciales",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.DataFrame({\"pais\": [\"Mexico\", \"Spain\"], \"meta\": [40000, 10000]})\ndf.to_sql(\"metas\", con, index=False, if_exists=\"fail\")\nprint(con.execute(\"SELECT * FROM metas ORDER BY pais\").fetchall())",
        "hint": "Los datos pasan de pandas a SQLite.",
        "textOutput": "`[('Mexico', 40000), ('Spain', 10000)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/if-exists-dtype-y-chunksize",
    "remember": "replace elimina y recrea la tabla, incluidas sus restricciones anteriores.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/if-exists-dtype-y-chunksize/1",
        "title": "Añadir métricas en lotes",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.DataFrame({\"meta\": [10000, 20000]})\ndf.to_sql(\"metas\", con, index=False, dtype={\"meta\": \"INTEGER\"}, chunksize=1)\ndf.to_sql(\"metas\", con, index=False, if_exists=\"append\")\nprint(con.execute(\"SELECT COUNT(*) FROM metas\").fetchone())",
        "hint": "append conserva las filas existentes.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/lectura-por-bloques",
    "remember": "Procesa cada bloque antes de pedir otro.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/lectura-por-bloques/1",
        "title": "Leer cinco pedidos por bloques de dos",
        "language": "python",
        "code": "import pandas as pd\nbloques = pd.read_sql_query(\"SELECT id FROM pedidos ORDER BY id\", con, chunksize=2)\nprint([len(bloque) for bloque in bloques])",
        "hint": "No es necesario cargar todo el resultado de una vez.",
        "textOutput": "`[2, 2, 1]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/csv",
    "remember": "Convierte tipos antes de insertar y usa parámetros.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/csv/1",
        "title": "Exportar clientes a CSV",
        "language": "python",
        "code": "import csv, io\narchivo = io.StringIO()\nwriter = csv.writer(archivo, lineterminator=\"\\n\")\nwriter.writerow([\"id\", \"nombre\"])\nwriter.writerows(con.execute(\"SELECT id, nombre FROM clientes WHERE id <= 2 ORDER BY id\"))\nprint(archivo.getvalue(), end=\"\")",
        "hint": "StringIO representa un archivo de texto en memoria.",
        "textOutput": "Tres líneas: `id,nombre`, `1,Ana`, `2,Luis`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-csv",
    "remember": "Los campos del CSV se leen como texto.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/importar-csv/1",
        "title": "Cargar clientes desde CSV",
        "language": "python",
        "code": "import csv, io\narchivo = io.StringIO(\"id,nombre,pais\\n5,Elena,Spain\\n6,Pablo,Mexico\\n\")\nfilas = ((int(r[\"id\"]), r[\"nombre\"], r[\"pais\"]) for r in csv.DictReader(archivo))\ncon.executemany(\"INSERT INTO clientes VALUES (?, ?, ?)\", filas)\nprint(con.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "El generador convierte los ids antes de vincularlos.",
        "textOutput": "`(6,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/json",
    "remember": "Convierte Row a dict para conservar los nombres.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/json/1",
        "title": "Exportar un cliente",
        "language": "python",
        "code": "import json\ncon.row_factory = sqlite3.Row\nfila = con.execute(\"SELECT id, nombre FROM clientes WHERE id = 1\").fetchone()\nprint(json.dumps(dict(fila), ensure_ascii=False))",
        "hint": "Para fechas, Decimal o bytes se necesita una representación JSON explícita.",
        "textOutput": "`{\"id\": 1, \"nombre\": \"Ana\"}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/importar-json",
    "remember": "Valida campos y tipos antes de cargar.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/importar-json/1",
        "title": "Importar un cliente",
        "language": "python",
        "code": "import json\ndatos = json.loads('[{\"id\": 5, \"nombre\": \"Elena\", \"pais\": null}]')\ncon.executemany(\"INSERT INTO clientes VALUES (:id, :nombre, :pais)\", datos)\nprint(con.execute(\"SELECT nombre, pais FROM clientes WHERE id = 5\").fetchone())",
        "hint": "null se convierte a None y después a NULL.",
        "textOutput": "`('Elena', None)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/integracion-con-pandas-y-archivos/validar-conteos-y-duplicados",
    "remember": "Comprueba conteos, claves y valores ausentes.",
    "examples": [
      {
        "id": "sqlite3/integracion-con-pandas-y-archivos/validar-conteos-y-duplicados/1",
        "title": "Detectar correos repetidos",
        "language": "python",
        "code": "print(con.execute(\"SELECT email, COUNT(*) FROM contactos WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1\").fetchall())",
        "hint": "Se excluyen ausentes antes de buscar repeticiones.",
        "textOutput": "`[('ana@example.com', 2)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
