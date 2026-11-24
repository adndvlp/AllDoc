// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/transacciones/definicion",
    "remember": "commit confirma; rollback revierte lo pendiente.",
    "examples": [
      {
        "id": "sqlite3/transacciones/definicion/1",
        "title": "Revertir una actualización",
        "language": "python",
        "code": "con.autocommit = False\ncon.execute(\"UPDATE clientes SET pais = 'Mexico' WHERE id = 4\")\ncon.rollback()\nprint(con.execute(\"SELECT pais FROM clientes WHERE id = 4\").fetchone())",
        "hint": "Con autocommit=False Python mantiene una transacción abierta.",
        "textOutput": "`(None,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/commit",
    "remember": "Confirma antes de cerrar.",
    "examples": [
      {
        "id": "sqlite3/transacciones/commit/1",
        "title": "Guardar datos en un archivo",
        "language": "python",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as carpeta:\n    ruta = Path(carpeta) / \"ventas.db\"\n    with closing(sqlite3.connect(ruta, autocommit=False)) as db:\n        db.execute(\"CREATE TABLE ventas(monto INTEGER)\")\n        db.execute(\"INSERT INTO ventas VALUES (12000)\")\n        db.commit()\n    with closing(sqlite3.connect(ruta)) as db:\n        print(db.execute(\"SELECT monto FROM ventas\").fetchone())",
        "hint": "La persistencia se verifica en otra conexión.",
        "textOutput": "`(12000,)` después de reabrir.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/rollback",
    "remember": "No deshace una transacción ya confirmada.",
    "examples": [
      {
        "id": "sqlite3/transacciones/rollback/1",
        "title": "Revertir una inserción",
        "language": "python",
        "code": "con.autocommit = False\ncon.execute(\"INSERT INTO clientes(nombre) VALUES ('Elena')\")\ncon.rollback()\nprint(con.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "La fila nueva no permanece.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/autocommit",
    "remember": "False requiere commit o rollback; True deja el control al motor; legado conserva las reglas históricas.",
    "note": "Python 3.12+. En 3.13–3.14 el valor por defecto es LEGACY_TRANSACTION_CONTROL. Indica el modo explícitamente.",
    "examples": [
      {
        "id": "sqlite3/transacciones/autocommit/1",
        "title": "Cambiar de modo",
        "language": "python",
        "code": "con.autocommit = False\nprint(con.in_transaction)\ncon.autocommit = True\nprint(con.in_transaction)",
        "hint": "Cambiar a True confirma cambios pendientes; commit() y rollback() no tienen efecto en True.",
        "textOutput": "`True`, `False`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/isolation-level",
    "remember": "No tiene efecto fuera del modo legado.",
    "note": "None deshabilita el inicio implícito.",
    "examples": [
      {
        "id": "sqlite3/transacciones/isolation-level/1",
        "title": "Abrir una transacción implícita",
        "language": "python",
        "code": "con.autocommit = sqlite3.LEGACY_TRANSACTION_CONTROL\ncon.isolation_level = \"IMMEDIATE\"\ncon.execute(\"UPDATE clientes SET pais = 'Spain' WHERE id = 4\")\nprint(con.in_transaction)\ncon.rollback()",
        "hint": "El primer DML abre una transacción si no existía.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/begin-commit-y-rollback-sql",
    "remember": "Para BEGIN manual en este modo usa COMMIT o ROLLBACK SQL.",
    "note": "DEFERRED espera hasta acceder a la base; EXCLUSIVE restringe otras lecturas fuera de WAL. En WAL, IMMEDIATE y EXCLUSIVE son equivalentes.",
    "examples": [
      {
        "id": "sqlite3/transacciones/begin-commit-y-rollback-sql/1",
        "title": "Confirmar una transacción explícita",
        "language": "python",
        "code": "con.execute(\"BEGIN IMMEDIATE\")\ncon.execute(\"UPDATE clientes SET pais = 'Spain' WHERE id = 4\")\ncon.execute(\"COMMIT\")\nprint(con.in_transaction)",
        "hint": "IMMEDIATE intenta reservar la escritura desde el comienzo.",
        "textOutput": "`False`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/in-transaction",
    "remember": "No es sinónimo de autocommit de Python.",
    "examples": [
      {
        "id": "sqlite3/transacciones/in-transaction/1",
        "title": "Observar un BEGIN",
        "language": "python",
        "code": "print(con.in_transaction)\ncon.execute(\"BEGIN\")\nprint(con.in_transaction)\ncon.execute(\"ROLLBACK\")",
        "hint": "El atributo no modifica el estado.",
        "textOutput": "`False`, `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/with-connection",
    "remember": "with con no cierra la conexión.",
    "note": "Con autocommit=True el administrador de contexto no confirma ni revierte.",
    "examples": [
      {
        "id": "sqlite3/transacciones/with-connection/1",
        "title": "Revertir un bloque fallido",
        "language": "python",
        "code": "con.autocommit = False\ntry:\n    with con:\n        con.execute(\"UPDATE clientes SET pais = 'Spain' WHERE id = 4\")\n        raise ValueError(\"Validación fallida\")\nexcept ValueError:\n    pass\nprint(con.execute(\"SELECT pais FROM clientes WHERE id = 4\").fetchone())",
        "hint": "El error sale del bloque y provoca rollback.",
        "textOutput": "`(None,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/savepoint",
    "remember": "ROLLBACK TO conserva el punto; RELEASE lo elimina.",
    "examples": [
      {
        "id": "sqlite3/transacciones/savepoint/1",
        "title": "Conservar el primer cambio",
        "language": "python",
        "code": "con.execute(\"BEGIN\")\ncon.execute(\"UPDATE clientes SET pais = 'Spain' WHERE id = 4\")\ncon.execute(\"SAVEPOINT segundo\")\ncon.execute(\"UPDATE clientes SET nombre = 'David' WHERE id = 4\")\ncon.execute(\"ROLLBACK TO segundo\")\ncon.execute(\"RELEASE segundo\")\ncon.execute(\"COMMIT\")\nprint(con.execute(\"SELECT nombre, pais FROM clientes WHERE id = 4\").fetchone())",
        "hint": "Solo se deshace lo posterior al punto.",
        "textOutput": "`('Diego', 'Spain')`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/transacciones/lotes-atomicos",
    "remember": "Agrupa todo el lote en una transacción.",
    "examples": [
      {
        "id": "sqlite3/transacciones/lotes-atomicos/1",
        "title": "Revertir una carga con duplicado",
        "language": "python",
        "code": "con.autocommit = False\ntry:\n    with con:\n        con.executemany(\"INSERT INTO clientes(id, nombre) VALUES (?, ?)\", [(5, \"Elena\"), (1, \"Otro\")])\nexcept sqlite3.IntegrityError:\n    print(con.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "El segundo INSERT falla y el primero también se revierte.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
