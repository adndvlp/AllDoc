// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/definicion",
    "remember": "Cada lectura avanza la posición del cursor.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/definicion/1",
        "title": "Leer todas las filas de un resultado",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT customer_id FROM customers ORDER BY customer_id\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1,), (2,), (3,), (4,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchone",
    "remember": "Comprueba None antes de acceder a una posición.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/fetchone/1",
        "title": "Leer un resultado vacío",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE customer_id=99\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "None.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchmany",
    "remember": "No presupongas que el último lote tiene el tamaño pedido.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/fetchmany/1",
        "title": "Leer en lotes de tres",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT customer_id FROM customers ORDER BY customer_id\")\n    print(cur.fetchmany(3))\n    print(cur.fetchmany(3))\n    print(cur.fetchmany(3))",
        "hint": "",
        "textOutput": "[(1,), (2,), (3,)], [(4,)], [].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/fetchall",
    "remember": "Una segunda lectura no reinicia el resultado.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/fetchall/1",
        "title": "Leer lo que queda",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT customer_id FROM customers ORDER BY customer_id\")\n    print(cur.fetchone())\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "(1,) y [(2,), (3,), (4,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/iteracion",
    "remember": "En un cursor sin búfer evita acumular filas en una lista si no hace falta.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/iteracion/1",
        "title": "Procesar clientes uno a uno",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers ORDER BY customer_id\")\n    for (name,) in cur:\n        print(name)",
        "hint": "",
        "textOutput": "Ana, Luis, Marta y Diego.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/resultados-pendientes",
    "remember": "Consume resultados de todos los sets antes de reutilizar la conexión.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/resultados-pendientes/1",
        "title": "Consumir el resto antes de otra consulta",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT customer_id FROM customers ORDER BY customer_id\")\n    print(cur.fetchone())\n    cur.fetchall()\n    cur.execute(\"SELECT 1\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "(1,) y [(1,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/lectura-de-resultados/consumo-automatico",
    "remember": "No actives descarte automático si todavía necesitas los datos.",
    "examples": [
      {
        "id": "mysql-connector-python/lectura-de-resultados/consumo-automatico/1",
        "title": "Consultar la política de consumo",
        "language": "python",
        "code": "with abrir(consume_results=True) as cnx:\n    print(cnx.can_consume_results)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
