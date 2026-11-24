// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/definicion",
    "remember": "Usar await para operaciones de E/S; cursor() crea el objeto sin await.",
    "note": "En notebooks con event loop activo usar `await main()` en lugar de asyncio.run; en Windows revisar el loop compatible indicado en la documentación.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/definicion/1",
        "title": "Consultar un dato desde asyncio",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        async with c.cursor() as s:\n            await s.execute(\"SELECT 1\")\n            print(await s.fetchone())\nasyncio.run(main())",
        "hint": "Usar await para operaciones de E/S; cursor() crea el objeto sin await.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncconnection-y-asynccursor",
    "remember": "No olvidar await antes de execute o fetch.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/asyncconnection-y-asynccursor/1",
        "title": "Recuperar varios clientes",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        async with c.cursor() as s:\n            await s.execute(\"SELECT nombre FROM clientes ORDER BY id LIMIT 2\")\n            print(await s.fetchall())\nasyncio.run(main())",
        "hint": "No olvidar await antes de execute o fetch.",
        "textOutput": "`[('Ana',), ('Luis',)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/async-for-y-stream",
    "remember": "La conexión permanece ocupada por el stream hasta agotarlo o cerrarlo.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/async-for-y-stream/1",
        "title": "Iterar números de forma asíncrona",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        async with c.cursor() as s:\n            async for (n,) in s.stream(\"SELECT generate_series(1,3)\"):\n                print(n)\nasyncio.run(main())",
        "hint": "La conexión permanece ocupada por el stream hasta agotarlo o cerrarlo.",
        "textOutput": "`1`, `2`, `3`, uno por línea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncservercursor-y-variantes",
    "remember": "Los cursores de servidor recuperan resultados por lotes.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/asyncservercursor-y-variantes/1",
        "title": "Leer un lote async",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        async with c.cursor(name=\"async_lote\") as s:\n            await s.execute(\"SELECT id FROM pedidos ORDER BY id\")\n            print(await s.fetchmany(2))\nasyncio.run(main())",
        "hint": "Los cursores de servidor recuperan resultados por lotes.",
        "textOutput": "`[(101,), (102,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/transacciones-async",
    "remember": "Usar `await c.set_autocommit(...)` y métodos `set_isolation_level`, `set_read_only`, `set_deferrable` cuando proceda.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/transacciones-async/1",
        "title": "Revertir una escritura async",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        await c.set_autocommit(True)\n        async with c.transaction(force_rollback=True):\n            await c.execute(\"UPDATE pedidos SET estado='completed' WHERE id=104\")\n        s = await c.execute(\"SELECT estado FROM pedidos WHERE id=104\")\n        print(await s.fetchone())\nasyncio.run(main())",
        "hint": "Usar `await c.set_autocommit(...)` y métodos `set_isolation_level`, `set_read_only`, `set_deferrable` cuando proceda.",
        "textOutput": "`('cancelled',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/asynccopy",
    "remember": "El flujo de copia no debe intercalarse con otra consulta de la misma conexión.",
    "note": "`AsyncCopy` y `AsyncWriter` son las contrapartes asíncronas; existen writers para libpq y cola async.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/asynccopy/1",
        "title": "Cargar dos filas async",
        "language": "python",
        "code": "import asyncio\nasync def main():\n    async with await psycopg.AsyncConnection.connect(DSN) as c:\n        await c.execute(\"CREATE TEMP TABLE carga_async (id int)\")\n        async with c.cursor() as s:\n            async with s.copy(\"COPY carga_async FROM STDIN\") as cp:\n                await cp.write_row((1,))\n                await cp.write_row((2,))\n            await s.execute(\"SELECT COUNT(*) FROM carga_async\")\n            print(await s.fetchone())\nasyncio.run(main())",
        "hint": "El flujo de copia no debe intercalarse con otra consulta de la misma conexión.",
        "textOutput": "`(2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/programacion-asincrona/asyncconnectionpool",
    "remember": "Una conexión por tarea cuando necesitas consultas o transacciones independientes.",
    "note": "También existe AsyncNullConnectionPool para limitar conexiones sin conservarlas ociosas.",
    "examples": [
      {
        "id": "psycopg/programacion-asincrona/asyncconnectionpool/1",
        "title": "Pedir una conexión al pool async",
        "language": "python",
        "code": "import asyncio\nfrom psycopg_pool import AsyncConnectionPool\nasync def main():\n    async with AsyncConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:\n        await pool.wait()\n        async with pool.connection() as c:\n            s = await c.execute(\"SELECT COUNT(*) FROM clientes\")\n            print(await s.fetchone())\nasyncio.run(main())",
        "hint": "Una conexión por tarea cuando necesitas consultas o transacciones independientes.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
