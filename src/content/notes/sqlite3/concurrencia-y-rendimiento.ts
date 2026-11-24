// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/definicion",
    "remember": "Mantén transacciones de escritura breves.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/definicion/1",
        "title": "Comprobar el plan de una búsqueda",
        "language": "python",
        "code": "print(con.execute(\"EXPLAIN QUERY PLAN SELECT * FROM clientes WHERE id = 1\").fetchall()[0][3])",
        "hint": "El texto exacto del plan depende de la versión de SQLite.",
        "textOutput": "Una descripción de búsqueda por INTEGER PRIMARY KEY.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/explain-query-plan",
    "remember": "SEARCH indica búsqueda restringida; SCAN recorre una fuente.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/explain-query-plan/1",
        "title": "Comparar el uso de un índice",
        "language": "python",
        "code": "con.execute(\"CREATE INDEX ix_estado ON pedidos(estado)\")\nplan = con.execute(\"EXPLAIN QUERY PLAN SELECT * FROM pedidos WHERE estado = ?\", (\"cancelado\",)).fetchall()\nprint([r[3] for r in plan])",
        "hint": "El optimizador elige el plan; no dependas de su formato exacto.",
        "textOutput": "Un plan que normalmente incluye SEARCH pedidos USING INDEX ix_estado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/pragma-journal-mode-y-wal",
    "remember": "WAL sigue permitiendo un solo escritor a la vez.",
    "note": "WAL requiere un entorno compatible con archivos compartidos locales y puede generar archivos -wal y -shm.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/pragma-journal-mode-y-wal/1",
        "title": "Activar WAL en un archivo temporal",
        "language": "python",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as carpeta:\n    with closing(sqlite3.connect(Path(carpeta) / \"ventas.db\", autocommit=True)) as db:\n        print(db.execute(\"PRAGMA journal_mode=WAL\").fetchone())",
        "hint": "No se puede activar WAL real en :memory:.",
        "textOutput": "`('wal',)` en un sistema de archivos compatible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/timeout-y-busy-timeout",
    "remember": "Esperar no elimina la causa del bloqueo.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/timeout-y-busy-timeout/1",
        "title": "Configurar la espera",
        "language": "python",
        "code": "with closing(sqlite3.connect(\":memory:\", timeout=2.0)) as db:\n    print(db.execute(\"PRAGMA busy_timeout\").fetchone())\n    db.execute(\"PRAGMA busy_timeout=500\")\n    print(db.execute(\"PRAGMA busy_timeout\").fetchone())",
        "hint": "El PRAGMA cambia el manejador de espera de esa conexión.",
        "textOutput": "`(2000,)`, `(500,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/conexiones-independientes-y-bloqueos",
    "remember": "Libera el bloqueo confirmando o revirtiendo.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/conexiones-independientes-y-bloqueos/1",
        "title": "Detectar un escritor ocupado",
        "language": "python",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as carpeta:\n    ruta = Path(carpeta) / \"ventas.db\"\n    with closing(sqlite3.connect(ruta, autocommit=True)) as a, closing(sqlite3.connect(ruta, timeout=0, autocommit=True)) as b:\n        a.execute(\"BEGIN IMMEDIATE\")\n        try:\n            b.execute(\"BEGIN IMMEDIATE\")\n        except sqlite3.OperationalError as exc:\n            print(exc.sqlite_errorname)\n        finally:\n            a.execute(\"ROLLBACK\")",
        "hint": "La segunda conexión no puede obtener el permiso de escritura.",
        "textOutput": "`SQLITE_BUSY`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/check-same-thread-y-threadsafety",
    "remember": "Desactivar la comprobación no vuelve seguras todas las operaciones concurrentes.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/check-same-thread-y-threadsafety/1",
        "title": "Inspeccionar el nivel de seguridad",
        "language": "python",
        "code": "print(sqlite3.threadsafety in (0, 1, 3))\nwith closing(sqlite3.connect(\":memory:\", check_same_thread=False)) as db:\n    print(db.execute(\"SELECT 1\").fetchone())",
        "hint": "Si compartes una conexión entre hilos debes coordinar accesos según el modo del motor; prefiere conexiones independientes.",
        "textOutput": "`True`, `(1,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/cached-statements",
    "remember": "Reutiliza consultas parametrizadas en vez de generar SQL distinto por cada valor.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/cached-statements/1",
        "title": "Repetir la misma plantilla",
        "language": "python",
        "code": "with closing(sqlite3.connect(\":memory:\", cached_statements=64)) as db:\n    for n in (1, 2):\n        print(db.execute(\"SELECT ? * 2\", (n,)).fetchone())",
        "hint": "El texto SQL es idéntico; solo cambia el parámetro.",
        "textOutput": "`(2,)`, `(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/concurrencia-y-rendimiento/vacuum-analyze-y-pragma-optimize",
    "remember": "VACUUM no se ejecuta dentro de una transacción activa.",
    "note": "En archivos grandes, VACUUM puede requerir tiempo y espacio adicional; optimize es preferible para mantenimiento rutinario en SQLite moderno.",
    "examples": [
      {
        "id": "sqlite3/concurrencia-y-rendimiento/vacuum-analyze-y-pragma-optimize/1",
        "title": "Mantener una copia de práctica",
        "language": "python",
        "code": "con.execute(\"CREATE INDEX ix_estado ON pedidos(estado)\")\ncon.execute(\"ANALYZE\")\ncon.execute(\"PRAGMA optimize\")\ncon.execute(\"VACUUM\")\nprint(con.execute(\"PRAGMA integrity_check\").fetchone())",
        "hint": "Las operaciones no cambian los registros de negocio.",
        "textOutput": "`('ok',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
