// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/transacciones/definicion",
    "remember": "El estado de la transacción pertenece a la conexión.",
    "examples": [
      {
        "id": "psycopg/transacciones/definicion/1",
        "title": "Observar el inicio implícito",
        "language": "python",
        "code": "print(conn.info.transaction_status.name)\ncur.execute(\"SELECT 1\")\nprint(conn.info.transaction_status.name)",
        "hint": "El estado de la transacción pertenece a la conexión.",
        "textOutput": "`IDLE`, luego `INTRANS` si la conexión era nueva.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/commit",
    "remember": "Un commit no cierra la conexión.",
    "examples": [
      {
        "id": "psycopg/transacciones/commit/1",
        "title": "Confirmar una escritura en una tabla temporal",
        "language": "python",
        "code": "with psycopg.connect(DSN) as c:\n    c.execute(\"CREATE TEMP TABLE demo_commit (id int)\")\n    c.execute(\"INSERT INTO demo_commit VALUES (1)\")\n    c.commit()\n    print(c.execute(\"SELECT id FROM demo_commit\").fetchall())",
        "hint": "Un commit no cierra la conexión.",
        "textOutput": "`[(1,)]`; la tabla temporal desaparece al cerrar la sesión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/rollback",
    "remember": "No deshace un commit anterior.",
    "examples": [
      {
        "id": "psycopg/transacciones/rollback/1",
        "title": "Revertir una actualización",
        "language": "python",
        "code": "cur.execute(\"UPDATE pedidos SET estado='completed' WHERE id=104\")\nconn.rollback()\nprint(conn.execute(\"SELECT estado FROM pedidos WHERE id=104\").fetchone())",
        "hint": "No deshace un commit anterior.",
        "textOutput": "`('cancelled',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/autocommit",
    "remember": "No garantiza atomicidad entre varias instrucciones; para ello usa transaction().",
    "examples": [
      {
        "id": "psycopg/transacciones/autocommit/1",
        "title": "Consultar sin dejar transacción abierta",
        "language": "python",
        "code": "with psycopg.connect(DSN, autocommit=True) as c:\n    print(c.execute(\"SELECT 1\").fetchone())\n    print(c.info.transaction_status.name)",
        "hint": "No garantiza atomicidad entre varias instrucciones; para ello usa transaction().",
        "textOutput": "`(1,)` e `IDLE`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/transaction",
    "remember": "Si se inicia desde IDLE, el bloque confirma o revierte la transacción completa.",
    "examples": [
      {
        "id": "psycopg/transacciones/transaction/1",
        "title": "Agrupar dos instrucciones atómicas",
        "language": "python",
        "code": "with psycopg.connect(DSN, autocommit=True) as c:\n    with c.transaction():\n        c.execute(\"CREATE TEMP TABLE demo_tx (id int)\")\n        c.execute(\"INSERT INTO demo_tx VALUES (1)\")\n    print(c.execute(\"SELECT id FROM demo_tx\").fetchall())",
        "hint": "Si se inicia desde IDLE, el bloque confirma o revierte la transacción completa.",
        "textOutput": "`[(1,)]`; la tabla es temporal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/savepoint-y-transacciones-anidadas",
    "remember": "La transacción exterior decide si confirma todo.",
    "examples": [
      {
        "id": "psycopg/transacciones/savepoint-y-transacciones-anidadas/1",
        "title": "Revertir solo una operación interna",
        "language": "python",
        "code": "from psycopg import Rollback\nwith psycopg.connect(DSN, autocommit=True) as c:\n    with c.transaction():\n        c.execute(\"CREATE TEMP TABLE demo_sp (id int)\")\n        c.execute(\"INSERT INTO demo_sp VALUES (1)\")\n        with c.transaction():\n            c.execute(\"INSERT INTO demo_sp VALUES (2)\")\n            raise Rollback()\n        print(c.execute(\"SELECT id FROM demo_sp\").fetchall())",
        "hint": "La transacción exterior decide si confirma todo.",
        "textOutput": "`[(1,)]`; el bloque interior descarta el 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/force-rollback-y-rollback",
    "remember": "Útiles para ensayos o para cancelar un bloque deliberadamente.",
    "examples": [
      {
        "id": "psycopg/transacciones/force-rollback-y-rollback/1",
        "title": "Probar una escritura sin guardarla",
        "language": "python",
        "code": "with psycopg.connect(DSN, autocommit=True) as c:\n    with c.transaction(force_rollback=True):\n        c.execute(\"UPDATE pedidos SET estado='completed' WHERE id=104\")\n    print(c.execute(\"SELECT estado FROM pedidos WHERE id=104\").fetchone())",
        "hint": "Útiles para ensayos o para cancelar un bloque deliberadamente.",
        "textOutput": "`('cancelled',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/isolationlevel",
    "remember": "Configurar antes de iniciar la transacción.",
    "examples": [
      {
        "id": "psycopg/transacciones/isolationlevel/1",
        "title": "Configurar una lectura repetible",
        "language": "python",
        "code": "from psycopg import IsolationLevel\nwith psycopg.connect(DSN) as c:\n    c.isolation_level = IsolationLevel.REPEATABLE_READ\n    print(c.execute(\"SHOW transaction_isolation\").fetchone())",
        "hint": "Configurar antes de iniciar la transacción.",
        "textOutput": "`('repeatable read',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/read-only-y-deferrable",
    "remember": "Son características de transacción, no permisos permanentes.",
    "note": "El efecto de deferrable se aplica en transacciones SERIALIZABLE READ ONLY.",
    "examples": [
      {
        "id": "psycopg/transacciones/read-only-y-deferrable/1",
        "title": "Configurar una transacción analítica de solo lectura",
        "language": "python",
        "code": "from psycopg import IsolationLevel\nwith psycopg.connect(DSN) as c:\n    c.isolation_level = IsolationLevel.SERIALIZABLE\n    c.read_only = True\n    c.deferrable = True\n    print(c.execute(\"SHOW transaction_read_only\").fetchone())",
        "hint": "Son características de transacción, no permisos permanentes.",
        "textOutput": "`('on',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/idle-in-transaction",
    "remember": "Cerrar o finalizar la transacción cuando termines de consultar.",
    "examples": [
      {
        "id": "psycopg/transacciones/idle-in-transaction/1",
        "title": "Liberar una transacción de lectura",
        "language": "python",
        "code": "cur.execute(\"SELECT COUNT(*) FROM pedidos\")\nprint(conn.info.transaction_status.name)\nconn.rollback()\nprint(conn.info.transaction_status.name)",
        "hint": "Cerrar o finalizar la transacción cuando termines de consultar.",
        "textOutput": "`INTRANS`, luego `IDLE`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/transacciones-en-dos-fases",
    "remember": "No dejar transacciones preparadas huérfanas; requieren un coordinador y recuperación.",
    "note": "La preparación real requiere `max_prepared_transactions` mayor que cero; el ejemplo no prepara ninguna transacción.",
    "examples": [
      {
        "id": "psycopg/transacciones/transacciones-en-dos-fases/1",
        "title": "Crear e inspeccionar un identificador de transacción",
        "language": "python",
        "code": "with psycopg.connect(DSN) as c:\n    xid = c.xid(42, \"lote-ventas\", \"postgres-a\")\n    print(xid.format_id, xid.gtrid, xid.bqual)",
        "hint": "No dejar transacciones preparadas huérfanas; requieren un coordinador y recuperación.",
        "textOutput": "`42 lote-ventas postgres-a`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/transacciones/ciclo-tpc-y-recuperacion",
    "remember": "Una transacción preparada puede sobrevivir al cierre de la conexión.",
    "note": "No ejecutar `tpc_prepare()` en un servidor no configurado; en una prueba real, garantizar recuperación aunque se pierda la sesión. No usar commit/rollback ordinarios dentro de TPC.",
    "examples": [
      {
        "id": "psycopg/transacciones/ciclo-tpc-y-recuperacion/1",
        "title": "Ensayar el ciclo sin dejar cambios preparados",
        "language": "python",
        "code": "from uuid import uuid4\nwith psycopg.connect(DSN) as c:\n    xid = c.xid(42, uuid4().hex, \"demo\")\n    c.tpc_begin(xid)\n    c.execute(\"SELECT 1\")\n    c.tpc_rollback()\n    print(c.info.transaction_status.name)",
        "hint": "Una transacción preparada puede sobrevivir al cierre de la conexión.",
        "textOutput": "`IDLE` después de revertir.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
