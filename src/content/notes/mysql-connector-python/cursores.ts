// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/definicion",
    "remember": "El cursor no es una conexión independiente.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/definicion/1",
        "title": "Consultar un cliente",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE customer_id = 1\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "('Ana',).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/cursor-normal",
    "remember": "Una fila de una columna sigue siendo una tupla.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/cursor-normal/1",
        "title": "Leer dos columnas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT customer_id, name FROM customers ORDER BY customer_id LIMIT 2\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1, 'Ana'), (2, 'Luis')].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/dictionary-true",
    "remember": "Usa alias únicos cuando haya columnas homónimas.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/dictionary-true/1",
        "title": "Leer por nombre de columna",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(dictionary=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE customer_id=1\")\n    print(cur.fetchone()[\"name\"])",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/buffered-true",
    "remember": "Adecuado para resultados pequeños; consume memoria proporcional a las filas.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/buffered-true/1",
        "title": "Ejecutar otra consulta sin leer la primera",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers\")\n    cur.execute(\"SELECT COUNT(*) FROM customers\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(4,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/cursor-sin-bufer",
    "remember": "Consume todo el resultado antes de otra operación en la misma conexión.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/cursor-sin-bufer/1",
        "title": "Procesar filas sin precargarlas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=False) as cur:\n    cur.execute(\"SELECT name FROM customers ORDER BY customer_id\")\n    for row in cur:\n        print(row[0])",
        "hint": "",
        "textOutput": "Ana, Luis, Marta y Diego, una línea por cliente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/raw-true",
    "remember": "Úsalo cuando quieras controlar la conversión.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/raw-true/1",
        "title": "Obtener el valor sin convertir",
        "language": "python",
        "code": "with abrir(use_pure=True) as cnx, cnx.cursor(raw=True) as cur:\n    cur.execute(\"SELECT 800\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(b'800',).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/cursores/prepared-true",
    "remember": "Usa parámetros para los valores; no combines arbitrariamente opciones de cursor.",
    "examples": [
      {
        "id": "mysql-connector-python/cursores/prepared-true/1",
        "title": "Reutilizar una consulta preparada",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(prepared=True) as cur:\n    sql = \"SELECT name FROM customers WHERE customer_id=%s\"\n    for key in (1, 2):\n        cur.execute(sql, (key,))\n        print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('Ana',)] y [('Luis',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
