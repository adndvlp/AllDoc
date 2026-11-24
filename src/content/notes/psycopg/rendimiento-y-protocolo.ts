// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/definicion",
    "remember": "Optimizar consultas y medir antes de modificar opciones del controlador.",
    "note": "EXPLAIN es SQL; EXPLAIN ANALYZE ejecuta la consulta.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/definicion/1",
        "title": "Ver el plan estimado de una consulta",
        "language": "python",
        "code": "cur.execute(\"EXPLAIN SELECT * FROM pedidos WHERE cliente_id=1\")\nprint(cur.fetchone()[0])",
        "hint": "Optimizar consultas y medir antes de modificar opciones del controlador.",
        "textOutput": "Primera línea del plan PostgreSQL, por ejemplo un escaneo de la tabla; depende de estadísticas y configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/prepared-statements",
    "remember": "La preparación se refiere a una sesión concreta.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/prepared-statements/1",
        "title": "Preparar explícitamente una consulta",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes WHERE id=%s\", (1,), prepare=True)\nprint(cur.fetchone())\nprint(cur.execute(\"SELECT COUNT(*) FROM pg_prepared_statements\").fetchone()[0] >= 1)",
        "hint": "La preparación se refiere a una sesión concreta.",
        "textOutput": "`('Ana',)` y `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/prepare-threshold-y-prepared-max",
    "remember": "`prepare=False` evita preparar esa ejecución.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/prepare-threshold-y-prepared-max/1",
        "title": "Desactivar la preparación automática",
        "language": "python",
        "code": "with psycopg.connect(DSN, prepare_threshold=None) as c:\n    c.prepared_max = 50\n    print(c.execute(\"SELECT %s::int\", (1,), prepare=False).fetchone())",
        "hint": "`prepare=False` evita preparar esa ejecución.",
        "textOutput": "`(1,)`; esta consulta no se prepara automáticamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/pipeline-mode",
    "remember": "No implica ejecutar consultas simultáneamente en el servidor.",
    "note": "Requiere soporte de pipeline en libpq; no todos los tipos de operación se admiten, incluido COPY.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/pipeline-mode/1",
        "title": "Enviar dos consultas en pipeline",
        "language": "python",
        "code": "with conn.pipeline():\n    a = conn.execute(\"SELECT 1\")\n    b = conn.execute(\"SELECT 2\")\nprint(a.fetchone(), b.fetchone())",
        "hint": "No implica ejecutar consultas simultáneamente en el servidor.",
        "textOutput": "`(1,) (2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/sync-y-errores-de-pipeline",
    "remember": "Manejar fallos de transacción incluso en pipeline.",
    "note": "Las variantes `Pipeline` y `AsyncPipeline` tienen gestión equivalente; en async se espera sync con await.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/sync-y-errores-de-pipeline/1",
        "title": "Sincronizar dos operaciones",
        "language": "python",
        "code": "with conn.pipeline() as p:\n    a = conn.execute(\"SELECT 10\")\n    p.sync()\n    print(a.fetchone())\n    b = conn.execute(\"SELECT 20\")\nprint(b.fetchone())",
        "hint": "Manejar fallos de transacción incluso en pipeline.",
        "textOutput": "`(10,)` y `(20,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/binding-y-protocolo-extended-simple",
    "remember": "No intentar enviar varias sentencias parametrizadas juntas con un Cursor normal.",
    "note": "ClientCursor permite ciertos usos de SQL múltiple y DDL parametrizado que no acepta el binding del servidor.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/binding-y-protocolo-extended-simple/1",
        "title": "Ejecutar dos sentencias de forma separada",
        "language": "python",
        "code": "cur.execute(\"SELECT %s::int\", (1,))\nprint(cur.fetchone())\ncur.execute(\"SELECT %s::int\", (2,))\nprint(cur.fetchone())",
        "hint": "No intentar enviar varias sentencias parametrizadas juntas con un Cursor normal.",
        "textOutput": "`(1,)` y `(2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/rendimiento-y-protocolo/pgbouncer-y-pooling-externo",
    "remember": "No asumir que un prepared statement o tabla temporal sobreviva entre transacciones en transaction pooling.",
    "note": "El ejemplo funciona también directamente con PostgreSQL. El soporte de prepared statements depende de versiones, modo de PgBouncer y configuración; consultar documentación antes de activarlo.",
    "examples": [
      {
        "id": "psycopg/rendimiento-y-protocolo/pgbouncer-y-pooling-externo/1",
        "title": "Desactivar preparación automática si el proxy no la admite",
        "language": "python",
        "code": "with psycopg.connect(DSN, prepare_threshold=None) as c:\n    print(c.execute(\"SELECT 1\").fetchone())",
        "hint": "No asumir que un prepared statement o tabla temporal sobreviva entre transacciones en transaction pooling.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
