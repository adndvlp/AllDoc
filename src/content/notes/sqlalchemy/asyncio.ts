// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/asyncio/definicion",
    "remember": "AsyncSession no debe compartirse entre tareas concurrentes.",
    "note": "Requiere pip install aiosqlite. Ejecuta como script; en un notebook con loop activo usa await main().",
    "examples": [
      {
        "id": "sqlalchemy/asyncio/definicion/1",
        "title": "Ejecutar SQL asíncrono con SQLite",
        "language": "python",
        "code": "import asyncio\nfrom sqlalchemy.ext.asyncio import create_async_engine\nasync def main():\n    e=create_async_engine(\"sqlite+aiosqlite:///:memory:\")\n    async with e.connect() as c:\n        print((await c.execute(text(\"SELECT 1\"))).scalar_one())\n    await e.dispose()\nasyncio.run(main())",
        "hint": "AsyncSession no debe compartirse entre tareas concurrentes. Ejecuta este ejemplo en Python local con `sqlalchemy[asyncio]` y `aiosqlite`.",
        "textOutput": "1",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/asyncio/asyncsession-y-async-sessionmaker",
    "remember": "await execute(), commit() y rollback() cuando corresponda.",
    "note": "Requiere aiosqlite; usa un script independiente.",
    "examples": [
      {
        "id": "sqlalchemy/asyncio/asyncsession-y-async-sessionmaker/1",
        "title": "Consultar un valor en una sesión asíncrona",
        "language": "python",
        "code": "import asyncio\nfrom sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker\nasync def main():\n    e=create_async_engine(\"sqlite+aiosqlite://\")\n    Fabrica=async_sessionmaker(e,expire_on_commit=False)\n    async with Fabrica() as s:\n        print(await s.scalar(text(\"SELECT 2\")))\n    await e.dispose()\nasyncio.run(main())",
        "hint": "await execute(), commit() y rollback() cuando corresponda. Ejecuta este ejemplo en Python local con `sqlalchemy[asyncio]` y `aiosqlite`.",
        "textOutput": "2",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/asyncio/run-sync-y-asyncresult",
    "remember": "No uses run_sync() para código bloqueante ajeno a SQLAlchemy.",
    "note": "Requiere aiosqlite y la preparación compartida para metadata. Las tablas se crean en otro motor, sin datos.",
    "examples": [
      {
        "id": "sqlalchemy/asyncio/run-sync-y-asyncresult/1",
        "title": "Crear tablas con un motor asíncrono",
        "language": "python",
        "code": "import asyncio\nfrom sqlalchemy.ext.asyncio import create_async_engine\nasync def main():\n    e=create_async_engine(\"sqlite+aiosqlite://\")\n    async with e.begin() as c:\n        await c.run_sync(metadata.create_all)\n        async with c.stream(text(\"SELECT 1\")) as r:\n            async for row in r:\n                print(tuple(row))\n    await e.dispose()\nasyncio.run(main())",
        "hint": "No uses run_sync() para código bloqueante ajeno a SQLAlchemy. Ejecuta este ejemplo en Python local con `sqlalchemy[asyncio]` y `aiosqlite`.",
        "textOutput": "(1,)",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
