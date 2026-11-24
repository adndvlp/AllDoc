// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/session/definicion",
    "remember": "Una Session por unidad de trabajo; ciérrala al terminar.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/definicion/1",
        "title": "Consultar una lista de entidades",
        "language": "python",
        "code": "with Session(engine) as s:\n    cs=s.scalars(select(Cliente).order_by(Cliente.id)).all()\n    print([c.nombre for c in cs])",
        "hint": "Una Session por unidad de trabajo; ciérrala al terminar.",
        "textOutput": "['Ana', 'Luis', 'Marta', 'Noa', 'Eva']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/session/sessionmaker-y-context-manager",
    "remember": "No confundas la fábrica con una sesión activa.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/sessionmaker-y-context-manager/1",
        "title": "Crear y cerrar una sesión",
        "language": "python",
        "code": "with Sesion() as s:\n    print(s.get(Cliente,2).nombre)",
        "hint": "No confundas la fábrica con una sesión activa.",
        "textOutput": "Luis",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/session/execute-scalars-y-get",
    "remember": "get() puede aprovechar la identity map sin emitir SQL.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/execute-scalars-y-get/1",
        "title": "Comparar lectura escalar y por PK",
        "language": "python",
        "code": "with Session(engine) as s:\n    print(s.scalars(select(Cliente.nombre).where(Cliente.id==3)).one())\n    print(s.get(Cliente,3).nombre)",
        "hint": "get() puede aprovechar la identity map sin emitir SQL.",
        "textOutput": "Marta\nMarta",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/session/select-y-filtros-orm",
    "remember": "select(Cliente) devuelve entidades; select(Cliente.nombre) devuelve columnas.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/select-y-filtros-orm/1",
        "title": "Consultar clientes de México",
        "language": "python",
        "code": "with Session(engine) as s:\n    print(s.scalars(select(Cliente.nombre).where(Cliente.pais==\"MX\").order_by(Cliente.id)).all())",
        "hint": "select(Cliente) devuelve entidades; select(Cliente.nombre) devuelve columnas.",
        "textOutput": "['Ana', 'Luis']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/session/from-statement-y-sql-textual-orm",
    "remember": "La consulta debe devolver la clave y las columnas necesarias para la entidad.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/from-statement-y-sql-textual-orm/1",
        "title": "Leer entidades desde SQL textual",
        "language": "python",
        "code": "with Session(engine) as s:\n    stmt=select(Cliente).from_statement(text(\"SELECT * FROM clientes WHERE id = :id\"))\n    print(s.scalars(stmt,{\"id\":1}).one().nombre)",
        "hint": "La consulta debe devolver la clave y las columnas necesarias para la entidad.",
        "textOutput": "Ana",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/session/identity-map-y-unit-of-work",
    "remember": "Dos lecturas de la misma identidad suelen compartir la misma instancia.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/session/identity-map-y-unit-of-work/1",
        "title": "Comprobar identidad",
        "language": "python",
        "code": "with Session(engine) as s:\n    a=s.get(Cliente,1)\n    b=s.get(Cliente,1)\n    print(a is b)",
        "hint": "Dos lecturas de la misma identidad suelen compartir la misma instancia.",
        "textOutput": "True",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
