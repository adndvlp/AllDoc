// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/streaming-asincrono/definicion",
    "remember": "No olvides cerrar las respuestas si usas streaming manual.",
    "examples": [
      {
        "id": "httpx/streaming-asincrono/definicion/1",
        "title": "Leer líneas asíncronamente",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/ndjson\") as r:\n        async for linea in r.aiter_lines():\n            print(json.loads(linea)[\"id\"])\nasyncio.run(main())",
        "hint": "No olvides cerrar las respuestas si usas streaming manual.",
        "textOutput": "`1` y `3`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/ndjson\") as r:\n        async for linea in r.aiter_lines():\n            print(json.loads(linea)[\"id\"])\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-bytes-aiter-text-y-aiter-lines",
    "remember": "Elige el iterador según el formato del recurso.",
    "examples": [
      {
        "id": "httpx/streaming-asincrono/aiter-bytes-aiter-text-y-aiter-lines/1",
        "title": "Contar bytes de un CSV",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/csv\") as r:\n        total = 0\n        async for bloque in r.aiter_bytes():\n            total += len(bloque)\n        print(total)\nasyncio.run(main())",
        "hint": "Elige el iterador según el formato del recurso.",
        "textOutput": "`23` bytes.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/csv\") as r:\n        total = 0\n        async for bloque in r.aiter_bytes():\n            total += len(bloque)\n        print(total)\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-raw",
    "remember": "El stream debe estar abierto y no consumido.",
    "examples": [
      {
        "id": "httpx/streaming-asincrono/aiter-raw/1",
        "title": "Leer bloques crudos",
        "language": "python",
        "code": "class Bloques(httpx.AsyncByteStream):\n    async def __aiter__(self):\n        yield b\"abc\"\nasync def main():\n    async with httpx.AsyncClient(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:\n        async with c.stream(\"GET\", BASE) as r:\n            print([b async for b in r.aiter_raw()])\nasyncio.run(main())",
        "hint": "El stream debe estar abierto y no consumido.",
        "textOutput": "`[b'abc']`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "class Bloques(httpx.AsyncByteStream):\n    async def __aiter__(self):\n        yield b\"abc\"\nasync def main():\n    async with httpx.AsyncClient(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:\n        async with c.stream(\"GET\", BASE) as r:\n            print([b async for b in r.aiter_raw()])\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-asincrono/aread-y-aclose",
    "remember": "Prefiere `async with` si no necesitas administrar manualmente el ciclo de vida.",
    "examples": [
      {
        "id": "httpx/streaming-asincrono/aread-y-aclose/1",
        "title": "Leer una respuesta manualmente",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c:\n        r = await c.send(c.build_request(\"GET\", \"/csv\"), stream=True)\n        try:\n            await r.aread()\n            print(r.text.splitlines()[0])\n        finally:\n            await r.aclose()\nasyncio.run(main())",
        "hint": "Prefiere `async with` si no necesitas administrar manualmente el ciclo de vida.",
        "textOutput": "`id,importe`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c:\n        r = await c.send(c.build_request(\"GET\", \"/csv\"), stream=True)\n        try:\n            await r.aread()\n            print(r.text.splitlines()[0])\n        finally:\n            await r.aclose()\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-asincrono/aiter-text",
    "remember": "Consume el stream dentro del contexto asíncrono.",
    "examples": [
      {
        "id": "httpx/streaming-asincrono/aiter-text/1",
        "title": "Leer texto de un CSV",
        "language": "python",
        "code": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/csv\") as r:\n        async for bloque in r.aiter_text():\n            print(bloque.splitlines()[0])\nasyncio.run(main())",
        "hint": "Consume el stream dentro del contexto asíncrono.",
        "textOutput": "`id,importe` con el mock.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with demo_async() as c, c.stream(\"GET\", \"/csv\") as r:\n        async for bloque in r.aiter_text():\n            print(bloque.splitlines()[0])\nawait main()"
      }
    ]
  }
];
