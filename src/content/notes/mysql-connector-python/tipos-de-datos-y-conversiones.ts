// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/definicion",
    "remember": "No confundas texto formateado con un valor numérico o temporal.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/definicion/1",
        "title": "Inspeccionar tipos de una fila",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT order_id,amount,order_date,status FROM orders WHERE order_id=101\")\n    print([type(v).__name__ for v in cur.fetchone()])",
        "hint": "",
        "textOutput": "['int', 'Decimal', 'date', 'str'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/decimal-y-numeros",
    "remember": "Para dinero evita convertir a float si necesitas exactitud.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/decimal-y-numeros/1",
        "title": "Calcular un descuento exacto",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT amount FROM orders WHERE order_id=101\")\n    amount = cur.fetchone()[0]\n    print(amount * Decimal(\"0.90\"))",
        "hint": "",
        "textOutput": "720.0000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/fechas-y-horas",
    "remember": "TIMESTAMP depende de la zona horaria de sesión.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/fechas-y-horas/1",
        "title": "Enviar una fecha Python",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT order_id FROM orders WHERE order_date >= %s ORDER BY order_id\", (date(2026,3,1),))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(105,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/null-y-none",
    "remember": "Comprueba con is None en Python.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/null-y-none/1",
        "title": "Detectar un valor nulo",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT country FROM customers WHERE customer_id=4\")\n    print(cur.fetchone()[0] is None)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/blob-y-bytes",
    "remember": "No decodifiques bytes sin conocer su formato.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/blob-y-bytes/1",
        "title": "Comprobar contenido binario",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_blob (v BLOB)\")\n    cur.execute(\"INSERT INTO lab_blob VALUES (%s)\", (b\"ABC\",))\n    cur.execute(\"SELECT v FROM lab_blob\")\n    print(bytes(cur.fetchone()[0]))",
        "hint": "",
        "textOutput": "b'ABC'.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/json",
    "remember": "Un dict de parámetros no equivale a una columna JSON.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/json/1",
        "title": "Guardar y recuperar un documento",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import json\n    cur.execute(\"CREATE TEMPORARY TABLE lab_json (v JSON)\")\n    cur.execute(\"INSERT INTO lab_json VALUES (%s)\", (json.dumps({\"channel\":\"web\"}),))\n    cur.execute(\"SELECT v FROM lab_json\")\n    print(json.loads(cur.fetchone()[0])[\"channel\"])",
        "hint": "",
        "textOutput": "web.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/tipos-de-datos-y-conversiones/mysqlconverter",
    "remember": "Personaliza solo conversiones necesarias; prueba ambos sentidos.",
    "examples": [
      {
        "id": "mysql-connector-python/tipos-de-datos-y-conversiones/mysqlconverter/1",
        "title": "Configurar el conversor en Python puro",
        "language": "python",
        "code": "from mysql.connector.conversion import MySQLConverter\nclass MiConversor(MySQLConverter):\n    pass\nwith abrir(use_pure=True, converter_class=MiConversor) as cnx:\n    with cnx.cursor() as cur:\n        cur.execute(\"SELECT 1\")\n        print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1,)]; la subclase conserva el comportamiento original.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
