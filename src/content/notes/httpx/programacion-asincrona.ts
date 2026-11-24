// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/definicion",
    "remember": "No hace más rápidos automáticamente los cálculos intensivos de CPU.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/definicion/1",
        "title": "Consultar un pedido de forma asíncrona",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c:\n        r = await c.get(\"/pedidos/1\")\n        print(r.json()[\"importe\"])\nasyncio.run(main())",
        "hint": "No hace más rápidos automáticamente los cálculos intensivos de CPU.",
        "textOutput": "`800`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c:\n        r = await c.get(\"/pedidos/1\")\n        print(r.json()[\"importe\"])\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/asyncclient-async-with-y-aclose",
    "remember": "Reutiliza el cliente; evita crear uno por petición en un bucle.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/asyncclient-async-with-y-aclose/1",
        "title": "Cerrar un cliente explícitamente",
        "language": "python",
        "code": "async def main():\n    c = demo_async()\n    try:\n        print((await c.get(\"/pedidos/1\")).status_code)\n    finally:\n        await c.aclose()\n    print(c.is_closed)\nasyncio.run(main())",
        "hint": "Reutiliza el cliente; evita crear uno por petición en un bucle.",
        "textOutput": "`200` y `True`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    c = demo_async()\n    try:\n        print((await c.get(\"/pedidos/1\")).status_code)\n    finally:\n        await c.aclose()\n    print(c.is_closed)\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/asyncio-gather",
    "remember": "El orden de finalización puede ser distinto del orden de resultados.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/asyncio-gather/1",
        "title": "Obtener tres pedidos",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c:\n        rs = await asyncio.gather(*(c.get(f\"/pedidos/{i}\") for i in (1, 3, 4)))\n        print([r.json()[\"id\"] for r in rs])\nasyncio.run(main())",
        "hint": "El orden de finalización puede ser distinto del orden de resultados.",
        "textOutput": "`[1, 3, 4]`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c:\n        rs = await asyncio.gather(*(c.get(f\"/pedidos/{i}\") for i in (1, 3, 4)))\n        print([r.json()[\"id\"] for r in rs])\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/semaphore",
    "remember": "Comparte el semáforo y el cliente entre tareas.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/semaphore/1",
        "title": "Limitar consultas simultáneas",
        "language": "python",
        "code": "async def main():\n    sem = asyncio.Semaphore(2)\n    async with demo_async() as c:\n        async def obtener(i):\n            async with sem:\n                return (await c.get(f\"/pedidos/{i}\")).json()[\"id\"]\n        print(await asyncio.gather(*(obtener(i) for i in (1, 2, 3, 4))))\nasyncio.run(main())",
        "hint": "Comparte el semáforo y el cliente entre tareas.",
        "textOutput": "`[1, 2, 3, 4]`; como máximo dos tareas entran a la sección protegida.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    sem = asyncio.Semaphore(2)\n    async with demo_async() as c:\n        async def obtener(i):\n            async with sem:\n                return (await c.get(f\"/pedidos/{i}\")).json()[\"id\"]\n        print(await asyncio.gather(*(obtener(i) for i in (1, 2, 3, 4))))\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/cancelacion-y-plazo-total",
    "remember": "No confundas este plazo con los timeouts por fase de HTTPX.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/cancelacion-y-plazo-total/1",
        "title": "Cancelar una espera simulada",
        "language": "python",
        "code": "async def main():\n    try:\n        await asyncio.wait_for(asyncio.sleep(1), timeout=0.01)\n    except asyncio.TimeoutError:\n        print(\"plazo agotado\")\nasyncio.run(main())",
        "hint": "No confundas este plazo con los timeouts por fase de HTTPX.",
        "textOutput": "`plazo agotado`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    try:\n        await asyncio.wait_for(asyncio.sleep(1), timeout=0.01)\n    except asyncio.TimeoutError:\n        print(\"plazo agotado\")\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/programacion-asincrona/anyio-y-trio",
    "remember": "Trio requiere instalar `trio`; no mezcles primitivas asyncio con un backend Trio.",
    "examples": [
      {
        "id": "httpx/programacion-asincrona/anyio-y-trio/1",
        "title": "Ejecutar mediante AnyIO",
        "language": "python",
        "code": "import anyio\nasync def main():\n    async with demo_async() as c:\n        print((await c.get(\"/pedidos/1\")).status_code)\nanyio.run(main)",
        "hint": "Trio requiere instalar `trio`; no mezcles primitivas asyncio con un backend Trio.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "import anyio\nasync def main():\n    async with demo_async() as c:\n        print((await c.get(\"/pedidos/1\")).status_code)\nawait main()"
      }
    ]
  }
];
