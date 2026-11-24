// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/definicion",
    "remember": "commit conserva; rollback revierte DML no confirmado.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/definicion/1",
        "title": "Revertir una actualización",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"UPDATE orders SET amount=1 WHERE order_id=101\")\n    cnx.rollback()\n    cur.execute(\"SELECT amount FROM orders WHERE order_id=101\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(Decimal('800.00'),).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/commit",
    "remember": "Cerrar una conexión no es confirmar.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/commit/1",
        "title": "Confirmar una operación de laboratorio",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB\")\n    cur.execute(\"INSERT INTO lab_tx VALUES (1)\")\n    cnx.commit()\n    cnx.rollback()\n    cur.execute(\"SELECT * FROM lab_tx\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1,)]; un rollback posterior no deshace lo confirmado. La tabla temporal se elimina al cerrar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/rollback",
    "remember": "No revierte transacciones confirmadas.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/rollback/1",
        "title": "Revertir una inserción",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB\")\n    cur.execute(\"INSERT INTO lab_tx VALUES (1)\")\n    cnx.rollback()\n    cur.execute(\"SELECT COUNT(*) FROM lab_tx\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(0,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/autocommit",
    "remember": "El conector usa False por defecto.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/autocommit/1",
        "title": "Consultar autocommit",
        "language": "python",
        "code": "with abrir(autocommit=True) as cnx:\n    print(cnx.autocommit)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/start-transaction",
    "remember": "Iníciala antes de que otra instrucción abra una transacción.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/start-transaction/1",
        "title": "Comprobar si hay una transacción activa",
        "language": "python",
        "code": "with abrir() as cnx:\n    cnx.start_transaction()\n    print(cnx.in_transaction)\n    cnx.rollback()\n    print(cnx.in_transaction)",
        "hint": "",
        "textOutput": "True y False.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/aislamiento-y-solo-lectura",
    "remember": "Se aplica a la transacción iniciada.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/aislamiento-y-solo-lectura/1",
        "title": "Abrir una lectura explícita",
        "language": "python",
        "code": "with abrir() as cnx:\n    cnx.start_transaction(isolation_level=\"READ COMMITTED\", readonly=True)\n    print(cnx.in_transaction)\n    cnx.rollback()",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/savepoint",
    "remember": "No confirma lo anterior; aún debes decidir commit o rollback.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/savepoint/1",
        "title": "Revertir solamente el segundo cambio",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB\")\n    cur.execute(\"INSERT INTO lab_tx VALUES (1)\")\n    cur.execute(\"SAVEPOINT paso1\")\n    cur.execute(\"INSERT INTO lab_tx VALUES (2)\")\n    cur.execute(\"ROLLBACK TO SAVEPOINT paso1\")\n    cur.execute(\"SELECT * FROM lab_tx\")\n    print(cur.fetchall())\n    cnx.rollback()",
        "hint": "",
        "textOutput": "[(1,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/transacciones/commit-implicito",
    "remember": "No mezcles migraciones con DML que quieras revertir.",
    "note": "Consulta la lista de instrucciones con commit implícito del manual de MySQL.",
    "examples": [
      {
        "id": "mysql-connector-python/transacciones/commit-implicito/1",
        "title": "Consultar estado sin ejecutar DDL destructivo",
        "language": "python",
        "code": "with abrir() as cnx:\n    cnx.start_transaction()\n    print(cnx.in_transaction)\n    cnx.rollback()",
        "hint": "",
        "textOutput": "True antes de revertir. Este ejemplo no ejecuta DDL persistente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
