// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/definicion",
    "remember": "Comprueba filas afectadas y decide si confirmas.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/definicion/1",
        "title": "Insertar una fila temporal",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))\")\n    cur.execute(\"INSERT INTO lab_write VALUES (%s,%s)\", (1,\"Ana\"))\n    print(cur.rowcount)",
        "hint": "",
        "textOutput": "1 fila afectada; la tabla desaparece al cerrar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/insert",
    "remember": "Especifica las columnas de destino.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/insert/1",
        "title": "Insertar una fila",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))\")\n    cur.execute(\"INSERT INTO lab_write(id,name) VALUES (%s,%s)\", (1,\"Ana\"))\n    cur.execute(\"SELECT * FROM lab_write\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1, 'Ana')].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/update",
    "remember": "Sin WHERE puedes modificar toda la tabla.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/update/1",
        "title": "Actualizar un cliente sin persistir el cambio",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"UPDATE customers SET country=%s WHERE customer_id=%s\", (\"Canada\",1))\n    print(cur.rowcount)\n    cnx.rollback()",
        "hint": "",
        "textOutput": "1; Ana conserva Mexico después del rollback.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/delete",
    "remember": "Valida el filtro y las restricciones referenciales.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/delete/1",
        "title": "Eliminar un pedido y revertir",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"DELETE FROM orders WHERE order_id=%s\", (104,))\n    print(cur.rowcount)\n    cnx.rollback()",
        "hint": "",
        "textOutput": "1; el pedido 104 se conserva.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/executemany",
    "remember": "No es para múltiples instrucciones distintas.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/executemany/1",
        "title": "Insertar tres filas juntas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))\")\n    cur.executemany(\"INSERT INTO lab_write VALUES (%s,%s)\", [(1,\"Ana\"),(2,\"Luis\"),(3,\"Marta\")])\n    print(cur.rowcount)",
        "hint": "",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/upsert",
    "remember": "El conflicto lo define una restricción UNIQUE o PRIMARY KEY.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/upsert/1",
        "title": "Actualizar sin duplicar una fila",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, amount INT)\")\n    cur.execute(\"INSERT INTO lab_write VALUES (1,10)\")\n    cur.execute(\"INSERT INTO lab_write VALUES (%s,%s) ON DUPLICATE KEY UPDATE amount=%s\", (1,20,20))\n    cur.execute(\"SELECT * FROM lab_write\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1, 20)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/escritura-de-datos/ddl",
    "remember": "No confíes en rollback para revertir DDL ordinario.",
    "examples": [
      {
        "id": "mysql-connector-python/escritura-de-datos/ddl/1",
        "title": "Crear e inspeccionar una tabla temporal",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_ddl (id INT PRIMARY KEY)\")\n    cur.execute(\"SHOW COLUMNS FROM lab_ddl\")\n    print([r[0] for r in cur.fetchall()])",
        "hint": "",
        "textOutput": "['id'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
