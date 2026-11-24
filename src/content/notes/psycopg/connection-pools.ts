// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/connection-pools/definicion",
    "remember": "El pool administra conexiones, no cursores.",
    "note": "El pool tiene versión y ciclo de publicación independientes. Los ejemplos usan la API 3.x del pool.",
    "examples": [
      {
        "id": "psycopg/connection-pools/definicion/1",
        "title": "Instalar el complemento",
        "language": "bash",
        "code": "python -m pip install \"psycopg[pool]\"",
        "hint": "El pool administra conexiones, no cursores.",
        "textOutput": "`from psycopg_pool import ConnectionPool` queda disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/connectionpool-y-connection",
    "remember": "No cerrar manualmente una conexión prestada si deseas que se reutilice.",
    "examples": [
      {
        "id": "psycopg/connection-pools/connectionpool-y-connection/1",
        "title": "Reutilizar una sesión para una consulta",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\nwith ConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:\n    pool.wait()\n    with pool.connection() as c:\n        print(c.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "No cerrar manualmente una conexión prestada si deseas que se reutilice.",
        "textOutput": "`(4,)`. El contexto de préstamo gestiona commit o rollback y devolución; el exterior cierra el pool.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/getconn-y-putconn",
    "remember": "Toda conexión prestada debe devolverse con putconn, incluso ante error.",
    "examples": [
      {
        "id": "psycopg/connection-pools/getconn-y-putconn/1",
        "title": "Devolver explícitamente una conexión",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\nwith ConnectionPool(DSN, min_size=1, open=False) as pool:\n    c = pool.getconn()\n    try:\n        print(c.execute(\"SELECT 1\").fetchone())\n    finally:\n        c.rollback()\n        pool.putconn(c)",
        "hint": "Toda conexión prestada debe devolverse con putconn, incluso ante error.",
        "textOutput": "`(1,)`; la sesión se devuelve sin transacción abierta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/open-wait-y-close",
    "remember": "`open=False` evita depender del comportamiento predeterminado de apertura.",
    "examples": [
      {
        "id": "psycopg/connection-pools/open-wait-y-close/1",
        "title": "Iniciar y cerrar explícitamente",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\npool = ConnectionPool(DSN, min_size=1, open=False)\ntry:\n    pool.open()\n    pool.wait(timeout=10)\n    print(pool.closed)\nfinally:\n    pool.close()\nprint(pool.closed)",
        "hint": "`open=False` evita depender del comportamiento predeterminado de apertura.",
        "textOutput": "`False`, luego `True`, con servidor disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/min-size-max-size-y-resize",
    "remember": "Dimensionar según capacidad del servidor, no solo según cantidad de solicitudes.",
    "examples": [
      {
        "id": "psycopg/connection-pools/min-size-max-size-y-resize/1",
        "title": "Cambiar el tamaño del pool",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\nwith ConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:\n    pool.resize(1, 3)\n    print(pool.min_size, pool.max_size)",
        "hint": "Dimensionar según capacidad del servidor, no solo según cantidad de solicitudes.",
        "textOutput": "`1 3`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/timeout-y-max-waiting",
    "remember": "No confundir tiempo de espera del pool con tiempo de ejecución SQL.",
    "note": "`TooManyRequests` indica cola llena; `PoolClosed`, pool cerrado.",
    "examples": [
      {
        "id": "psycopg/connection-pools/timeout-y-max-waiting/1",
        "title": "Detectar saturación controlada",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool, PoolTimeout\nwith ConnectionPool(DSN, min_size=1, max_size=1, open=False) as pool:\n    with pool.connection():\n        try:\n            with pool.connection(timeout=0.1):\n                pass\n        except PoolTimeout:\n            print(\"Pool ocupado\")",
        "hint": "No confundir tiempo de espera del pool con tiempo de ejecución SQL.",
        "textOutput": "`Pool ocupado`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/max-lifetime-max-idle-y-reconexiones",
    "remember": "Estos límites no son garantías de duración de una consulta.",
    "note": "`reconnect_failed` permite registrar fallos tras agotar la política de reconexión; no repite automáticamente una transacción de negocio.",
    "examples": [
      {
        "id": "psycopg/connection-pools/max-lifetime-max-idle-y-reconexiones/1",
        "title": "Configurar rotación de sesiones",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\nwith ConnectionPool(DSN, min_size=1, max_size=3, max_lifetime=600, max_idle=120, reconnect_timeout=30, num_workers=2, open=False) as pool:\n    with pool.connection() as c:\n        print(c.execute(\"SELECT 1\").fetchone())",
        "hint": "Estos límites no son garantías de duración de una consulta.",
        "textOutput": "`(1,)` si hay disponibilidad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/configure-check-y-reset",
    "remember": "configure y reset deben dejar la conexión sin transacción activa.",
    "note": "Usar `reset=` si hace falta limpiar estado adicional; `pool.check()` comprueba las conexiones disponibles.",
    "examples": [
      {
        "id": "psycopg/connection-pools/configure-check-y-reset/1",
        "title": "Asignar el nombre de aplicación del pool",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\ndef configurar(c):\n    c.execute(\"SET application_name='alldoc_pool'\")\n    c.commit()\nwith ConnectionPool(DSN, min_size=1, configure=configurar, check=ConnectionPool.check_connection, open=False) as pool:\n    with pool.connection() as c:\n        print(c.execute(\"SHOW application_name\").fetchone())",
        "hint": "configure y reset deben dejar la conexión sin transacción activa.",
        "textOutput": "`('alldoc_pool',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/get-stats-y-pop-stats",
    "remember": "Las métricas dependen del trabajo real; no asumir valores constantes.",
    "examples": [
      {
        "id": "psycopg/connection-pools/get-stats-y-pop-stats/1",
        "title": "Consultar solicitudes atendidas",
        "language": "python",
        "code": "from psycopg_pool import ConnectionPool\nwith ConnectionPool(DSN, min_size=1, open=False) as pool:\n    with pool.connection() as c:\n        c.execute(\"SELECT 1\")\n    print(pool.get_stats().get(\"requests_num\", 0))",
        "hint": "Las métricas dependen del trabajo real; no asumir valores constantes.",
        "textOutput": "Un número de solicitudes de conexión, normalmente `1` en este pool nuevo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/connection-pools/nullconnectionpool",
    "remember": "No equivale a mantener una conexión abierta permanentemente.",
    "note": "Disponible en psycopg_pool 3.1+.",
    "examples": [
      {
        "id": "psycopg/connection-pools/nullconnectionpool/1",
        "title": "Limitar conexiones sin conservar un pool ocioso",
        "language": "python",
        "code": "from psycopg_pool import NullConnectionPool\nwith NullConnectionPool(DSN, max_size=2, open=False) as pool:\n    with pool.connection() as c:\n        print(c.execute(\"SELECT 1\").fetchone())",
        "hint": "No equivale a mantener una conexión abierta permanentemente.",
        "textOutput": "`(1,)`; cuando no hay solicitudes esperando, la conexión se cierra al devolverla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
