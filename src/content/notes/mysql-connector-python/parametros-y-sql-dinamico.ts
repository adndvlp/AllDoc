// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/definicion",
    "remember": "No interpoles valores con f-strings ni concatenación.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/definicion/1",
        "title": "Filtrar por un valor Python",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE customer_id=%s\", (1,))\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "('Ana',).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-posicionales",
    "remember": "No pongas comillas alrededor de %s; una tupla individual lleva coma.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/parametros-posicionales/1",
        "title": "Filtrar por estado y monto",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT order_id FROM orders WHERE status=%s AND amount>%s ORDER BY order_id\", (\"completed\",500))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(101,), (103,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/parametros-nombrados",
    "remember": "La clave del diccionario coincide con el marcador.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/parametros-nombrados/1",
        "title": "Buscar por país",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE country=%(pais)s ORDER BY customer_id\", {\"pais\":\"Mexico\"})\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('Ana',), ('Luis',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/none-y-null",
    "remember": "WHERE col = NULL no encuentra nulos.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/none-y-null/1",
        "title": "Buscar un país nulo",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE country <=> %s\", (None,))\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "('Diego',).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/in-dinamico",
    "remember": "Trata la lista vacía antes de construir IN ().",
    "note": "Solo se interpola una secuencia de marcadores generada por el programa.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/in-dinamico/1",
        "title": "Buscar varios clientes",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    ids = [1, 3]\n    markers = \",\".join([\"%s\"] * len(ids))\n    cur.execute(f\"SELECT name FROM customers WHERE customer_id IN ({markers}) ORDER BY customer_id\", tuple(ids))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('Ana',), ('Marta',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/like-parametrizado",
    "remember": "Construye el patrón en Python y pásalo como parámetro.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/like-parametrizado/1",
        "title": "Buscar nombres con M inicial",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT name FROM customers WHERE name LIKE %s\", (\"M%\",))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('Marta',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/identificadores-dinamicos",
    "remember": "Valida los identificadores contra una lista cerrada.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/identificadores-dinamicos/1",
        "title": "Elegir una columna de orden segura",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    permitidas = {\"name\", \"customer_id\"}\n    col = \"name\"\n    if col not in permitidas:\n        raise ValueError(\"Columna no permitida\")\n    cur.execute(f\"SELECT name FROM customers ORDER BY {col}\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "Ana, Diego, Luis, Marta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/filtros-opcionales",
    "remember": "Los fragmentos SQL son del programa; los valores son parámetros.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/filtros-opcionales/1",
        "title": "Aplicar un filtro si se proporciona",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    pais = \"Spain\"\n    sql = \"SELECT name FROM customers WHERE 1=1\"\n    params = []\n    if pais is not None:\n        sql += \" AND country=%s\"\n        params.append(pais)\n    cur.execute(sql, tuple(params))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('Marta',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/parametros-y-sql-dinamico/sql-injection",
    "remember": "Nunca fabriques manualmente las comillas de los valores.",
    "examples": [
      {
        "id": "mysql-connector-python/parametros-y-sql-dinamico/sql-injection/1",
        "title": "Tratar un texto con comillas como dato",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    texto = \"Ana' OR 1=1 -- \"\n    cur.execute(\"SELECT name FROM customers WHERE name=%s\", (texto,))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[]: no coincide ningún nombre.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
