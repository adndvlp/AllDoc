// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/definicion",
    "remember": "No compartas un cursor ni una conexión simultáneamente.",
    "examples": [
      {
        "id": "mysql-connector-python/concurrencia-y-asyncio/definicion/1",
        "title": "Ejecutar dos lecturas en hilos",
        "language": "python",
        "code": "from concurrent.futures import ThreadPoolExecutor\ndef nombre(key):\n    with abrir() as cnx, cnx.cursor() as cur:\n        cur.execute(\"SELECT name FROM customers WHERE customer_id=%s\", (key,))\n        return cur.fetchall()[0][0]\nwith ThreadPoolExecutor(max_workers=2) as ex:\n    print(list(ex.map(nombre, [1,2])))",
        "hint": "",
        "textOutput": "['Ana', 'Luis'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/mysql-connector-aio",
    "remember": "Usa asyncio.run en un script, no dentro de otro loop activo.",
    "note": "aio está disponible desde 8.3; en notebooks con loop activo usa await main().",
    "examples": [
      {
        "id": "mysql-connector-python/concurrencia-y-asyncio/mysql-connector-aio/1",
        "title": "Consultar de forma asíncrona",
        "language": "python",
        "code": "import asyncio\nfrom mysql.connector.aio import connect\nasync def main():\n    async with await connect(**CONFIG) as cnx:\n        async with await cnx.cursor() as cur:\n            await cur.execute(\"SELECT COUNT(*) FROM orders\")\n            print(await cur.fetchall())\nasyncio.run(main())",
        "hint": "",
        "textOutput": "[(5,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/concurrencia-y-asyncio/tareas-asincronas-independientes",
    "remember": "Limita concurrencia según capacidad del servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/concurrencia-y-asyncio/tareas-asincronas-independientes/1",
        "title": "Consultar dos clientes en paralelo",
        "language": "python",
        "code": "import asyncio\nfrom mysql.connector.aio import connect\nasync def nombre(key):\n    async with await connect(**CONFIG) as cnx:\n        async with await cnx.cursor() as cur:\n            await cur.execute(\"SELECT name FROM customers WHERE customer_id=%s\", (key,))\n            return (await cur.fetchall())[0][0]\nasync def main():\n    print(await asyncio.gather(nombre(1), nombre(2)))\nasyncio.run(main())",
        "hint": "",
        "textOutput": "['Ana', 'Luis'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
