// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/definicion",
    "remember": "Compartir conexión implica compartir transacción.",
    "note": "En producción, utilizar un pool limitado en vez de abrir conexiones ilimitadas.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/definicion/1",
        "title": "Ejecutar dos consultas independientes",
        "language": "python",
        "code": "from concurrent.futures import ThreadPoolExecutor\ndef consultar(id):\n    with psycopg.connect(DSN) as c:\n        return c.execute(\"SELECT nombre FROM clientes WHERE id=%s\", (id,)).fetchone()[0]\nwith ThreadPoolExecutor(max_workers=2) as ex:\n    print(list(ex.map(consultar, [1,2])))",
        "hint": "Compartir conexión implica compartir transacción.",
        "textOutput": "`['Ana', 'Luis']`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/thread-safety",
    "remember": "Usar cursores separados; una excepción de SQL afecta la transacción compartida.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/thread-safety/1",
        "title": "Procesar dos cursores de una sesión compartida",
        "language": "python",
        "code": "from concurrent.futures import ThreadPoolExecutor\ndef leer(n):\n    with conn.cursor() as c:\n        return c.execute(\"SELECT %s::int\", (n,)).fetchone()[0]\nwith ThreadPoolExecutor(max_workers=2) as ex:\n    print(list(ex.map(leer, [1,2])))",
        "hint": "Usar cursores separados; una excepción de SQL afecta la transacción compartida.",
        "textOutput": "`[1, 2]`; ambas consultas usan la misma transacción.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/process-safety",
    "remember": "Crear el pool o la conexión después de iniciar el proceso hijo.",
    "note": "En el archivo incluye los imports y la definición de DSN a nivel de módulo, pero no la preparación destructiva del dataset.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/process-safety/1",
        "title": "Abrir una conexión dentro de un proceso",
        "language": "python",
        "code": "# Ejecutar como archivo .py, no como fragmento dentro de un notebook.\nimport multiprocessing as mp\ndef hijo():\n    with psycopg.connect(DSN) as c:\n        print(c.execute(\"SELECT 1\").fetchone())\nif __name__ == \"__main__\":\n    p = mp.Process(target=hijo)\n    p.start()\n    p.join()\n    print(p.exitcode)",
        "hint": "Crear el pool o la conexión después de iniciar el proceso hijo.",
        "textOutput": "`(1,)` y `0` si el hijo conecta correctamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/asyncio-gather",
    "remember": "Una AsyncConnection compartida no hace simultáneas las consultas.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/asyncio-gather/1",
        "title": "Consultar dos clientes concurrentemente",
        "language": "python",
        "code": "import asyncio\nasync def leer(id):\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        s = await c.execute(\"SELECT nombre FROM clientes WHERE id=%s\", (id,))\n        return (await s.fetchone())[0]\nasync def main():\n    print(await asyncio.gather(leer(1), leer(2)))\nasyncio.run(main())",
        "hint": "Una AsyncConnection compartida no hace simultáneas las consultas.",
        "textOutput": "`['Ana', 'Luis']`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/cancel-y-cancel-safe",
    "remember": "Tras QueryCanceled, revertir la transacción si no se usa autocommit.",
    "note": "`cancel_safe()` está disponible desde 3.2 y aprovecha las capacidades de libpq 17; en async se puede esperar con await. No cancelar una sesión que otra tarea use sin coordinación.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/cancel-y-cancel-safe/1",
        "title": "Cancelar una consulta larga en una sesión dedicada",
        "language": "python",
        "code": "from threading import Timer\nwith psycopg.connect(DSN) as c:\n    timer = Timer(0.5, c.cancel)\n    timer.start()\n    try:\n        c.execute(\"SELECT pg_sleep(5)\")\n    except psycopg.errors.QueryCanceled:\n        c.rollback()\n        print(\"Consulta cancelada\")\n    finally:\n        timer.cancel()\n        timer.join()",
        "hint": "Tras QueryCanceled, revertir la transacción si no se usa autocommit.",
        "textOutput": "Normalmente `Consulta cancelada`; si la cancelación llega tarde o falla, no se garantiza ese resultado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/concurrencia-y-cancelacion/gevent",
    "remember": "No confundir greenlets con asyncio; aplicar monkey patch antes de los imports de E/S.",
    "note": "Definir DSN sin abrir conexiones antes del monkey patch; revisar soporte en el entorno y la versión.",
    "examples": [
      {
        "id": "psycopg/concurrencia-y-cancelacion/gevent/1",
        "title": "Consultar con dos greenlets",
        "language": "python",
        "code": "# Ejecutar en un proceso nuevo con gevent instalado.\nfrom gevent import monkey\nmonkey.patch_all()\nimport gevent\nimport psycopg\ndef leer(n):\n    with psycopg.connect(DSN) as c:\n        return c.execute(\"SELECT %s::int\", (n,)).fetchone()[0]\ntrabajos = [gevent.spawn(leer, n) for n in (1,2)]\ngevent.joinall(trabajos, raise_error=True)\nprint([g.value for g in trabajos])",
        "hint": "No confundir greenlets con asyncio; aplicar monkey patch antes de los imports de E/S.",
        "textOutput": "`[1, 2]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
