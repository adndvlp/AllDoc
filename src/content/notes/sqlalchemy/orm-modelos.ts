// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orm-modelos/definicion",
    "remember": "Una instancia representa una entidad, normalmente una fila identificada por su clave.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-modelos/definicion/1",
        "title": "Consultar una entidad",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    print(c.id,c.nombre,c.pais)",
        "hint": "Una instancia representa una entidad, normalmente una fila identificada por su clave.",
        "textOutput": "1 Ana MX",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-modelos/declarativebase-mapped-y-mapped-column",
    "remember": "Los atributos anotados no se guardan hasta que existe una operación ORM persistente.",
    "examples": [
      {
        "id": "sqlalchemy/orm-modelos/declarativebase-mapped-y-mapped-column/1",
        "title": "Declarar una entidad nueva",
        "language": "python",
        "code": "class BaseLocal(DeclarativeBase):\n    pass\nclass Region(BaseLocal):\n    __tablename__=\"regiones\"\n    id: Mapped[int]=mapped_column(primary_key=True)\n    nombre: Mapped[str]=mapped_column(String(50))\nBaseLocal.metadata.create_all(engine)\nprint(inspect(engine).has_table(\"regiones\"))",
        "hint": "Los atributos anotados no se guardan hasta que existe una operación ORM persistente.",
        "textOutput": "True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-modelos/tablename-table-y-table-args",
    "remember": "No declares __tablename__ y __table__ para crear dos tablas del mismo modelo.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-modelos/tablename-table-y-table-args/1",
        "title": "Comprobar el mapeo sobre una tabla existente",
        "language": "python",
        "code": "print(Cliente.__table__ is clientes,Pedido.__table__.name)",
        "hint": "No declares __tablename__ y __table__ para crear dos tablas del mismo modelo.",
        "textOutput": "True pedidos",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-modelos/registry-y-mapeo-imperativo",
    "remember": "El mapeo declarativo es la opción habitual para código nuevo.",
    "examples": [
      {
        "id": "sqlalchemy/orm-modelos/registry-y-mapeo-imperativo/1",
        "title": "Mapear productos sin anotaciones declarativas",
        "language": "python",
        "code": "from sqlalchemy.orm import registry\nr=registry()\nclass Producto:\n    pass\nr.map_imperatively(Producto,productos)\nwith Session(engine) as s:\n    print(s.get(Producto,2).nombre)",
        "hint": "El mapeo declarativo es la opción habitual para código nuevo.",
        "textOutput": "Teclado",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-modelos/mapped-as-dataclass",
    "remember": "Los campos generados por la base pueden usar init=False.",
    "examples": [
      {
        "id": "sqlalchemy/orm-modelos/mapped-as-dataclass/1",
        "title": "Construir una entidad como dataclass",
        "language": "python",
        "code": "from sqlalchemy.orm import MappedAsDataclass\nclass B(MappedAsDataclass,DeclarativeBase):\n    pass\nclass Region(B):\n    __tablename__=\"regiones\"\n    id: Mapped[int]=mapped_column(primary_key=True,init=False)\n    nombre: Mapped[str]\nr=Region(nombre=\"Centro\")\nprint(r.nombre,r.id)",
        "hint": "Los campos generados por la base pueden usar init=False.",
        "textOutput": "Centro None",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
