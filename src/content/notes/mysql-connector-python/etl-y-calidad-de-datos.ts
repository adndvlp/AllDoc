// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/definicion",
    "remember": "Valida antes de cargar y confirma solo cuando la unidad de trabajo esté completa.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/definicion/1",
        "title": "Extraer nombres y normalizarlos",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers ORDER BY customer_id\")\n    nombres = [r[0].strip().upper() for r in cur.fetchall()]\n    print(nombres)",
        "hint": "",
        "textOutput": "['ANA', 'LUIS', 'MARTA', 'DIEGO'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-csv",
    "remember": "Valida campos obligatorios y claves; no concatenes los valores al SQL.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/importar-csv/1",
        "title": "Cargar un CSV mínimo en una tabla de trabajo",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import csv\n    from io import StringIO\n    reader = csv.DictReader(StringIO(\"id,amount\\n1,10.50\\n2,20.00\\n\"))\n    rows = [(int(r[\"id\"]), Decimal(r[\"amount\"])) for r in reader]\n    cur.execute(\"CREATE TEMPORARY TABLE lab_csv (id INT PRIMARY KEY, amount DECIMAL(10,2))\")\n    cur.executemany(\"INSERT INTO lab_csv VALUES (%s,%s)\", rows)\n    cnx.commit()\n    cur.execute(\"SELECT SUM(amount) FROM lab_csv\")\n    print(cur.fetchone()[0])",
        "hint": "",
        "textOutput": "30.50.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/importar-excel-y-json",
    "remember": "Convierte NaN a None cuando corresponda y respeta tipos de datos.",
    "note": "Para Excel, lee con pd.read_excel y convierte sus filas a tuplas validadas antes de aplicar el mismo patrón.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/importar-excel-y-json/1",
        "title": "Cargar registros JSON",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import json\n    rows = json.loads('[ {\"id\": 1, \"name\": \"Ana\"}, {\"id\": 2, \"name\": \"Luis\"} ]')\n    cur.execute(\"CREATE TEMPORARY TABLE lab_load (id INT PRIMARY KEY, name VARCHAR(80))\")\n    cur.executemany(\"INSERT INTO lab_load VALUES (%s,%s)\", [(r[\"id\"],r[\"name\"]) for r in rows])\n    cnx.commit()\n    cur.execute(\"SELECT COUNT(*) FROM lab_load\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(2,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/datos-de-apis",
    "remember": "Comprueba HTTP, esquema, paginación y duplicados; una respuesta JSON no garantiza datos válidos.",
    "note": "En una API real usa timeout y raise_for_status() antes de leer response.json(); esta ficha simula la respuesta.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/datos-de-apis/1",
        "title": "Simular una respuesta de una API sin red",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    respuesta = {\"items\":[{\"id\":1,\"name\":\"Ana\"}]}\n    cur.execute(\"CREATE TEMPORARY TABLE lab_api (id INT PRIMARY KEY, name VARCHAR(80))\")\n    cur.executemany(\"INSERT INTO lab_api VALUES (%s,%s)\", [(int(r[\"id\"]),r[\"name\"]) for r in respuesta[\"items\"]])\n    cnx.commit()\n    cur.execute(\"SELECT * FROM lab_api\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1, 'Ana')].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/full-load-e-incremental",
    "remember": "Un ID creciente sirve para nuevas inserciones, no para detectar modificaciones anteriores.",
    "note": "En producción usa updated_at y una clave de desempate si necesitas detectar actualizaciones.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/full-load-e-incremental/1",
        "title": "Extraer pedidos posteriores a una marca",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    ultimo_id = 103\n    cur.execute(\"SELECT order_id FROM orders WHERE order_id>%s ORDER BY order_id\",(ultimo_id,))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(104,), (105,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/idempotencia",
    "remember": "Guarda la marca de avance después de confirmar la carga.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/idempotencia/1",
        "title": "Repetir una carga sin duplicados",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_idem (id INT PRIMARY KEY, amount INT)\")\n    for _ in range(2):\n        cur.execute(\"INSERT INTO lab_idem VALUES (%s,%s) ON DUPLICATE KEY UPDATE amount=%s\", (1,50,50))\n    cnx.commit()\n    cur.execute(\"SELECT COUNT(*),SUM(amount) FROM lab_idem\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(1, Decimal('50')).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/staging-y-validacion",
    "remember": "Valida nulos, rangos y unicidad antes de escribir en destino.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/staging-y-validacion/1",
        "title": "Detectar IDs repetidos en staging",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_stage (id INT, amount INT)\")\n    cur.executemany(\"INSERT INTO lab_stage VALUES (%s,%s)\",[(1,10),(1,10),(2,20)])\n    cur.execute(\"SELECT id,COUNT(*) FROM lab_stage GROUP BY id HAVING COUNT(*)>1\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1, 2)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/reconciliacion",
    "remember": "Un conteo igual no demuestra que todos los valores coincidan.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/reconciliacion/1",
        "title": "Comparar un resumen de control",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT COUNT(*), SUM(amount) FROM orders\")\n    count, total = cur.fetchone()\n    print(count == 5, total == Decimal(\"3000.00\"))",
        "hint": "",
        "textOutput": "True True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/etl-y-calidad-de-datos/load-data-local-infile",
    "remember": "Habilita LOCAL solo para servidores de confianza y restringe rutas cuando sea posible.",
    "note": "No actives LOCAL globalmente solo para practicar; el ejemplo restringe el directorio. Si la política del servidor lo impide, usa executemany.",
    "examples": [
      {
        "id": "mysql-connector-python/etl-y-calidad-de-datos/load-data-local-infile/1",
        "title": "Importar un archivo CSV local de laboratorio",
        "language": "python",
        "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\nwith TemporaryDirectory() as tmp:\n    path = Path(tmp)/\"load.csv\"\n    path.write_text(\"1,Ana\\n2,Luis\\n\", encoding=\"utf-8\")\n    with abrir(allow_local_infile=False, allow_local_infile_in_path=tmp) as cnx, cnx.cursor() as cur:\n        cur.execute(\"CREATE TEMPORARY TABLE lab_local (id INT PRIMARY KEY, name VARCHAR(80))\")\n        cur.execute(\"LOAD DATA LOCAL INFILE %s INTO TABLE lab_local FIELDS TERMINATED BY %s LINES TERMINATED BY %s\", (str(path),\",\",\"\\n\"))\n        cnx.commit()\n        cur.execute(\"SELECT COUNT(*) FROM lab_local\")\n        print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(2,)] si el servidor tiene local_infile habilitado y la cuenta puede cargar datos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
