// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/definicion",
    "remember": "execute no devuelve la lista de filas.",
    "examples": [
      {
        "id": "mysql-connector-python/execute-y-consultas-sql/definicion/1",
        "title": "Ejecutar un SELECT",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT COUNT(*) FROM orders\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(5,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/filtros-y-orden",
    "remember": "Python envía SQL; MySQL resuelve la consulta.",
    "examples": [
      {
        "id": "mysql-connector-python/execute-y-consultas-sql/filtros-y-orden/1",
        "title": "Obtener el pedido completado más caro",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT order_id FROM orders WHERE status='completed' ORDER BY amount DESC LIMIT 1\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(103,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/join-y-agregaciones",
    "remember": "Agrega en SQL cuando solo necesitas el resumen.",
    "examples": [
      {
        "id": "mysql-connector-python/execute-y-consultas-sql/join-y-agregaciones/1",
        "title": "Calcular ventas por cliente",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"\"\"SELECT c.name, SUM(o.amount) FROM customers c\n    JOIN orders o ON c.customer_id=o.customer_id\n    WHERE o.status='completed' GROUP BY c.customer_id,c.name\n    ORDER BY c.customer_id\"\"\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "Ana 1100.00, Luis 1200.00, Marta 450.00 (importes Decimal).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/execute-y-consultas-sql/cte-y-ventanas",
    "remember": "El conector no implementa las funciones SQL.",
    "examples": [
      {
        "id": "mysql-connector-python/execute-y-consultas-sql/cte-y-ventanas/1",
        "title": "Ordenar clientes por gasto",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"\"\"WITH t AS (SELECT customer_id,SUM(amount) total FROM orders\n    WHERE status='completed' GROUP BY customer_id)\n    SELECT customer_id,RANK() OVER (ORDER BY total DESC) AS puesto FROM t\n    ORDER BY puesto\"\"\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(2, 1), (1, 2), (3, 3)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
