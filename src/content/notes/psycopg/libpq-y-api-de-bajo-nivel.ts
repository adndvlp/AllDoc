// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/definicion",
    "remember": "Usar la API de alto nivel salvo que necesites control especializado.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/definicion/1",
        "title": "Inspeccionar la versión de libpq",
        "language": "python",
        "code": "from psycopg import pq\nprint(pq.version())",
        "hint": "Usar la API de alto nivel salvo que necesites control especializado.",
        "textOutput": "Un entero que codifica la versión de libpq instalada o incluida por el controlador.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgconn-y-connstatus",
    "remember": "No mezclar llamadas que alteren el protocolo de PGconn con una consulta activa de Connection.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/pgconn-y-connstatus/1",
        "title": "Consultar el estado de bajo nivel",
        "language": "python",
        "code": "from psycopg import pq\nprint(isinstance(conn.pgconn, pq.PGconn))\nprint(conn.pgconn.status == pq.ConnStatus.OK)",
        "hint": "No mezclar llamadas que alteren el protocolo de PGconn con una consulta activa de Connection.",
        "textOutput": "`True`, `True` para una conexión operativa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgresult-y-execstatus",
    "remember": "La capa DB-API transforma PGresult en filas Python.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/pgresult-y-execstatus/1",
        "title": "Inspeccionar una respuesta sin modificarla",
        "language": "python",
        "code": "from psycopg import pq\ncur.execute(\"SELECT id,nombre FROM clientes WHERE id=1\")\nr = cur.pgresult\nprint(r.status == pq.ExecStatus.TUPLES_OK, r.ntuples, r.nfields)",
        "hint": "La capa DB-API transforma PGresult en filas Python.",
        "textOutput": "`True 1 2`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/transactionstatus",
    "remember": "Consultar el estado antes de reutilizar una sesión tras un fallo.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/transactionstatus/1",
        "title": "Identificar una transacción abierta",
        "language": "python",
        "code": "from psycopg import pq\ncur.execute(\"SELECT 1\")\nprint(conn.pgconn.transaction_status == pq.TransactionStatus.INTRANS)",
        "hint": "Consultar el estado antes de reutilizar una sesión tras un fallo.",
        "textOutput": "`True` con autocommit desactivado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/format-y-pipelinestatus",
    "remember": "Son enumeraciones del protocolo, no tipos SQL.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/format-y-pipelinestatus/1",
        "title": "Inspeccionar formato y estado",
        "language": "python",
        "code": "from psycopg import pq\ncur.execute(\"SELECT 1\")\nprint(cur.format == pq.Format.TEXT)\nprint(conn.pgconn.pipeline_status == pq.PipelineStatus.OFF)",
        "hint": "Son enumeraciones del protocolo, no tipos SQL.",
        "textOutput": "`True` y `True` en un cursor ordinario sin pipeline.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/pgcancel-y-pollingstatus",
    "remember": "Preferir `cancel_safe()` y las conexiones async para no manipular manualmente el protocolo.",
    "note": "La cancelación de bajo nivel tiene requisitos de versión; no llamar métodos privados de la conexión.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/pgcancel-y-pollingstatus/1",
        "title": "Consultar constantes sin iniciar una operación",
        "language": "python",
        "code": "from psycopg import pq\nprint(pq.PollingStatus.OK.name)\nprint(pq.PollingStatus.READING.name)",
        "hint": "Preferir `cancel_safe()` y las conexiones async para no manipular manualmente el protocolo.",
        "textOutput": "`OK`, `READING`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/fileno-y-wait",
    "remember": "No hacer lecturas manuales del socket mientras Psycopg gestiona la conexión.",
    "note": "`wait()` es para integraciones avanzadas; usar execute o AsyncConnection para el trabajo normal.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/fileno-y-wait/1",
        "title": "Obtener el descriptor de una conexión abierta",
        "language": "python",
        "code": "print(conn.fileno() >= 0)",
        "hint": "No hacer lecturas manuales del socket mientras Psycopg gestiona la conexión.",
        "textOutput": "`True` si existe un descriptor válido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/escaping",
    "remember": "No usar escape manual como sustituto de parámetros.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/escaping/1",
        "title": "Inspeccionar un identificador escapado",
        "language": "python",
        "code": "from psycopg import pq\nescape = pq.Escaping(conn.pgconn)\nprint(escape.escape_identifier(b'mi tabla'))",
        "hint": "No usar escape manual como sustituto de parámetros.",
        "textOutput": "`b'\"mi tabla\"'`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/libpq-y-api-de-bajo-nivel/capabilities",
    "remember": "Comprobar capacidades en vez de asumir que todos los entornos tienen las mismas.",
    "examples": [
      {
        "id": "psycopg/libpq-y-api-de-bajo-nivel/capabilities/1",
        "title": "Comprobar disponibilidad de pipeline",
        "language": "python",
        "code": "print(psycopg.capabilities.has_pipeline())",
        "hint": "Comprobar capacidades en vez de asumir que todos los entornos tienen las mismas.",
        "textOutput": "`True` o `False` según libpq y la implementación instalada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
