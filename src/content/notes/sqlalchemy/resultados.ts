// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/definicion",
    "remember": "Result es el cursor de resultados; Row representa una fila.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/definicion/1",
        "title": "Leer una fila",
        "language": "python",
        "code": "with engine.connect() as conn:\n    row = conn.execute(select(clientes.c.id, clientes.c.nombre).order_by(clientes.c.id)).first()\n    print(tuple(row))",
        "hint": "Result es el cursor de resultados; Row representa una fila.",
        "textOutput": "(1, 'Ana')",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/all-y-fetchall",
    "remember": "No llames all() dos veces esperando los mismos datos.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/all-y-fetchall/1",
        "title": "Leer todos los nombres",
        "language": "python",
        "code": "with engine.connect() as conn:\n    r = conn.execute(select(clientes.c.nombre).order_by(clientes.c.id))\n    print(r.all())\n    print(r.fetchall())",
        "hint": "No llames all() dos veces esperando los mismos datos.",
        "textOutput": "[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]\n[]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/fetchone-y-fetchmany",
    "remember": "Cada llamada avanza en el resultado.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/fetchone-y-fetchmany/1",
        "title": "Leer una fila y luego dos",
        "language": "python",
        "code": "with engine.connect() as conn:\n    r = conn.execute(select(clientes.c.id).order_by(clientes.c.id))\n    print(r.fetchone())\n    print(r.fetchmany(2))",
        "hint": "Cada llamada avanza en el resultado.",
        "textOutput": "(1,)\n[(2,), (3,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/first",
    "remember": "Para limitar lo que consulta la base usa limit(1).",
    "examples": [
      {
        "id": "sqlalchemy/resultados/first/1",
        "title": "Leer el primer cliente",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(select(clientes.c.nombre).order_by(clientes.c.id).limit(1)).first())",
        "hint": "Para limitar lo que consulta la base usa limit(1).",
        "textOutput": "('Ana',)",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/one-y-one-or-none",
    "remember": "Usa one() cuando la unicidad sea un requisito.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/one-y-one-or-none/1",
        "title": "Validar una búsqueda única",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==1)).one())\n    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).one_or_none())",
        "hint": "Usa one() cuando la unicidad sea un requisito.",
        "textOutput": "('Ana',)\nNone",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/scalar-y-scalars",
    "remember": "scalars().all() devuelve valores, no filas.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/scalar-y-scalars/1",
        "title": "Obtener IDs como lista",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(select(clientes.c.id).order_by(clientes.c.id)).scalars().all())\n    print(conn.execute(select(func.count()).select_from(clientes)).scalar())",
        "hint": "scalars().all() devuelve valores, no filas.",
        "textOutput": "[1, 2, 3, 4, 5]\n5",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/scalar-one-y-scalar-one-or-none",
    "remember": "No confundir un valor NULL con ausencia de fila.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/scalar-one-y-scalar-one-or-none/1",
        "title": "Buscar una clave inexistente",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).scalar_one_or_none())",
        "hint": "No confundir un valor NULL con ausencia de fila.",
        "textOutput": "None",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/row-mappings-y-mapping",
    "remember": "dict(row._mapping) convierte una fila en diccionario.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/row-mappings-y-mapping/1",
        "title": "Convertir filas a diccionarios",
        "language": "python",
        "code": "with engine.connect() as conn:\n    stmt = select(clientes.c.id, clientes.c.nombre).where(clientes.c.id==1)\n    row = conn.execute(stmt).one()\n    print(row.nombre, dict(row._mapping), row._asdict())\n    print(dict(conn.execute(stmt).mappings().one()))",
        "hint": "dict(row._mapping) convierte una fila en diccionario.",
        "textOutput": "Ana {'id': 1, 'nombre': 'Ana'} {'id': 1, 'nombre': 'Ana'}\n{'id': 1, 'nombre': 'Ana'}",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/keys-columns-y-unique",
    "remember": "unique() no es SELECT DISTINCT.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/keys-columns-y-unique/1",
        "title": "Elegir una columna y deduplicar",
        "language": "python",
        "code": "with engine.connect() as conn:\n    r = conn.execute(select(clientes.c.id, clientes.c.pais).order_by(clientes.c.id))\n    print(list(r.keys()))\n    print(r.columns(\"pais\").unique().all())",
        "hint": "unique() no es SELECT DISTINCT.",
        "textOutput": "['id', 'pais']\n[('MX',), ('ES',), (None,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/partitions-iteracion-y-close",
    "remember": "Consume por bloques para no construir una lista completa.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/partitions-iteracion-y-close/1",
        "title": "Leer IDs por lotes",
        "language": "python",
        "code": "with engine.connect() as conn:\n    with conn.execute(select(clientes.c.id).order_by(clientes.c.id)) as r:\n        for lote in r.partitions(2):\n            print(lote)",
        "hint": "Consume por bloques para no construir una lista completa.",
        "textOutput": "[(1,), (2,)]\n[(3,), (4,)]\n[(5,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/resultados/rowcount-y-claves-insertadas",
    "remember": "No uses rowcount para contar SELECT.",
    "examples": [
      {
        "id": "sqlalchemy/resultados/rowcount-y-claves-insertadas/1",
        "title": "Insertar y comprobar clave",
        "language": "python",
        "code": "with engine.begin() as conn:\n    r = conn.execute(insert(clientes).values(nombre=\"Sol\", alta=date(2026,1,10)))\n    print(tuple(r.inserted_primary_key))\n    print(conn.execute(update(clientes).where(clientes.c.id==1).values(pais=\"MX\")).rowcount)",
        "hint": "No uses rowcount para contar SELECT.",
        "textOutput": "(6,)\n1",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
