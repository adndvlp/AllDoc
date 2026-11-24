// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/definicion",
    "remember": "Elige según cardinalidad y volumen, no cargues todo siempre.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/definicion/1",
        "title": "Cargar clientes y pedidos en lotes",
        "language": "python",
        "code": "from sqlalchemy.orm import selectinload\nwith Session(engine) as s:\n    cs=s.scalars(select(Cliente).options(selectinload(Cliente.pedidos)).order_by(Cliente.id)).all()\n    print([(c.nombre,len(c.pedidos)) for c in cs])",
        "hint": "Elige según cardinalidad y volumen, no cargues todo siempre.",
        "textOutput": "[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/lazy-loading-y-n-1",
    "remember": "Inspecciona el SQL antes de optimizar.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/lazy-loading-y-n-1/1",
        "title": "Contar consultas lazy de clientes y pedidos",
        "language": "python",
        "code": "n=[]\n@sa.event.listens_for(engine,\"before_cursor_execute\")\ndef contar(*args):\n    n.append(1)\nwith Session(engine) as s:\n    cs=s.scalars(select(Cliente).order_by(Cliente.id)).all()\n    print(sum(len(c.pedidos) for c in cs),len(n))",
        "hint": "Inspecciona el SQL antes de optimizar.",
        "textOutput": "7 6",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/selectinload",
    "remember": "Es útil para colecciones; las claves compuestas requieren soporte de tuple IN.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/selectinload/1",
        "title": "Reducir consultas de colecciones",
        "language": "python",
        "code": "from sqlalchemy.orm import selectinload\nn=[]\n@sa.event.listens_for(engine,\"before_cursor_execute\")\ndef contar(*args):\n    n.append(1)\nwith Session(engine) as s:\n    cs=s.scalars(select(Cliente).options(selectinload(Cliente.pedidos))).all()\n    print(sum(len(c.pedidos) for c in cs),len(n))",
        "hint": "Es útil para colecciones; las claves compuestas requieren soporte de tuple IN.",
        "textOutput": "7 2",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/joinedload-y-unique",
    "remember": "El JOIN de carga no sustituye el JOIN que filtra la consulta.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/joinedload-y-unique/1",
        "title": "Cargar clientes con sus pedidos",
        "language": "python",
        "code": "from sqlalchemy.orm import joinedload\nwith Session(engine) as s:\n    cs=s.scalars(select(Cliente).options(joinedload(Cliente.pedidos)).order_by(Cliente.id)).unique().all()\n    print([(c.nombre,len(c.pedidos)) for c in cs])",
        "hint": "El JOIN de carga no sustituye el JOIN que filtra la consulta.",
        "textOutput": "[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/subqueryload-y-contains-eager",
    "remember": "Con contains_eager() el filtro del JOIN puede dejar una colección parcial.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/subqueryload-y-contains-eager/1",
        "title": "Reutilizar un JOIN para cargar una colección",
        "language": "python",
        "code": "from sqlalchemy.orm import contains_eager\nwith Session(engine) as s:\n    stmt=select(Cliente).join(Cliente.pedidos).options(contains_eager(Cliente.pedidos)).where(Cliente.id==1)\n    c=s.scalars(stmt).unique().one()\n    print(sorted(p.id for p in c.pedidos))",
        "hint": "Con contains_eager() el filtro del JOIN puede dejar una colección parcial.",
        "textOutput": "[101, 102]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-carga/raiseload-load-only-defer-y-undefer",
    "remember": "Acceder a una columna diferida puede generar SQL adicional.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-carga/raiseload-load-only-defer-y-undefer/1",
        "title": "Consultar solo atributos necesarios",
        "language": "python",
        "code": "from sqlalchemy.orm import load_only,raiseload\nwith Session(engine) as s:\n    c=s.scalars(select(Cliente).options(load_only(Cliente.nombre),raiseload(Cliente.pedidos)).where(Cliente.id==1)).one()\n    print(c.nombre, \"pais\" in inspect(c).unloaded)\n    try:\n        print(c.pedidos)\n    except sa.exc.InvalidRequestError:\n        print(\"carga lazy bloqueada\")",
        "hint": "Acceder a una columna diferida puede generar SQL adicional.",
        "textOutput": "Ana True\ncarga lazy bloqueada",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
