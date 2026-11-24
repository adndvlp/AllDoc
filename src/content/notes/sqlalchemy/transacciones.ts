// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/definicion",
    "remember": "commit confirma; rollback descarta los cambios pendientes.",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/definicion/1",
        "title": "Confirmar un cambio",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=120))\nvalor(select(pedidos.c.monto).where(pedidos.c.id==101))",
        "hint": "commit confirma; rollback descarta los cambios pendientes.",
        "textOutput": "120",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/autobegin-y-begin",
    "remember": "No llames begin() si ya existe una transacción activa.",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/autobegin-y-begin/1",
        "title": "Inspeccionar el inicio automático",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.in_transaction())\n    conn.execute(text(\"SELECT 1\"))\n    print(conn.in_transaction(), conn.get_transaction() is not None)",
        "hint": "No llames begin() si ya existe una transacción activa.",
        "textOutput": "False\nTrue True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/commit-y-rollback",
    "remember": "Salir de connect() sin commit revierte los cambios pendientes.",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/commit-y-rollback/1",
        "title": "Revertir una modificación",
        "language": "python",
        "code": "with engine.connect() as conn:\n    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))\n    conn.rollback()\nvalor(select(pedidos.c.monto).where(pedidos.c.id==101))",
        "hint": "Salir de connect() sin commit revierte los cambios pendientes.",
        "textOutput": "100",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/engine-begin-y-excepciones",
    "remember": "Captura excepciones fuera del bloque si quieres que se revierta automáticamente.",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/engine-begin-y-excepciones/1",
        "title": "Cancelar una carga fallida",
        "language": "python",
        "code": "try:\n    with engine.begin() as conn:\n        conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))\n        raise ValueError(\"validación fallida\")\nexcept ValueError:\n    pass\nvalor(select(pedidos.c.monto).where(pedidos.c.id==101))",
        "hint": "Captura excepciones fuera del bloque si quieres que se revierta automáticamente.",
        "textOutput": "100",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/begin-nested-y-savepoints",
    "remember": "Confirma o revierte el objeto savepoint, no conn.commit().",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/begin-nested-y-savepoints/1",
        "title": "Revertir únicamente el segundo cambio",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=120))\n    sp = conn.begin_nested()\n    conn.execute(update(pedidos).where(pedidos.c.id==102).values(monto=999))\n    sp.rollback()\nver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.id.in_([101,102])).order_by(pedidos.c.id))",
        "hint": "Confirma o revierte el objeto savepoint, no conn.commit().",
        "textOutput": "('id', 'monto')\n[(101, 120), (102, 200)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/transacciones/aislamiento-y-autocommit",
    "remember": "Los niveles disponibles dependen del motor. Configúralos antes de iniciar la transacción.",
    "note": "PostgreSQL y MySQL ofrecen, entre otros, READ COMMITTED y REPEATABLE READ; SQLite tiene otras reglas. No supongas que todos ofrecen los mismos niveles.",
    "examples": [
      {
        "id": "sqlalchemy/transacciones/aislamiento-y-autocommit/1",
        "title": "Consultar aislamiento SQLite",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.get_isolation_level())",
        "hint": "Los niveles disponibles dependen del motor. Configúralos antes de iniciar la transacción.",
        "textOutput": "SERIALIZABLE",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
