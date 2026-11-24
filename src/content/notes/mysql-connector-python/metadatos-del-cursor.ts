// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/definicion",
    "remember": "Consulta los atributos después de execute.",
    "examples": [
      {
        "id": "mysql-connector-python/metadatos-del-cursor/definicion/1",
        "title": "Inspeccionar columnas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT customer_id, name FROM customers\")\n    print(cur.column_names)",
        "hint": "",
        "textOutput": "('customer_id', 'name').",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/description",
    "remember": "Es None si la operación no produce columnas.",
    "examples": [
      {
        "id": "mysql-connector-python/metadatos-del-cursor/description/1",
        "title": "Obtener encabezados",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name, amount FROM customers JOIN orders USING(customer_id)\")\n    print([d[0] for d in cur.description])",
        "hint": "",
        "textOutput": "['name', 'amount'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/rowcount",
    "remember": "En un cursor sin búfer puede ser -1 hasta empezar a leer; COUNT(*) es el conteo SQL.",
    "examples": [
      {
        "id": "mysql-connector-python/metadatos-del-cursor/rowcount/1",
        "title": "Contar filas de un resultado buffered",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT * FROM customers\")\n    print(cur.rowcount)",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/lastrowid",
    "remember": "No es el número de filas ni una lista de todos los IDs.",
    "examples": [
      {
        "id": "mysql-connector-python/metadatos-del-cursor/lastrowid/1",
        "title": "Obtener un identificador generado",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_ids (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(40))\")\n    cur.execute(\"INSERT INTO lab_ids(name) VALUES (%s)\", (\"Ana\",))\n    print(cur.lastrowid)",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/metadatos-del-cursor/with-rows-y-statement",
    "remember": "No registres statement con datos sensibles.",
    "examples": [
      {
        "id": "mysql-connector-python/metadatos-del-cursor/with-rows-y-statement/1",
        "title": "Reconocer una consulta con filas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT 1\")\n    print(cur.with_rows, cur.statement)",
        "hint": "",
        "textOutput": "True SELECT 1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
