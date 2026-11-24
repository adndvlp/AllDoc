// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/definicion",
    "remember": "Para análisis, usa primero expresiones SQL simples.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/definicion/1",
        "title": "Inspeccionar las columnas mapeadas",
        "language": "python",
        "code": "print([p.key for p in inspect(Cliente).column_attrs])",
        "hint": "Para análisis, usa primero expresiones SQL simples.",
        "textOutput": "['id', 'nombre', 'pais', 'alta']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/hybrid-property",
    "remember": "Si la lógica Python y SQL difiere, define su expresión explícitamente.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/hybrid-property/1",
        "title": "Consultar un cálculo híbrido",
        "language": "python",
        "code": "from sqlalchemy.ext.hybrid import hybrid_property\nclass B(DeclarativeBase):\n    pass\nclass Producto(B):\n    __table__=productos\n    @hybrid_property\n    def doble(self):\n        return self.precio*2\nwith Session(engine) as s:\n    print(s.get(Producto,1).doble)\n    print(s.scalars(select(Producto.doble).where(Producto.id==2)).one())",
        "hint": "Si la lógica Python y SQL difiere, define su expresión explícitamente.",
        "textOutput": "200\n400",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/column-property",
    "remember": "No es una columna física nueva en la base.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/column-property/1",
        "title": "Exponer el doble del precio",
        "language": "python",
        "code": "from sqlalchemy.orm import column_property\nclass B(DeclarativeBase):\n    pass\nclass Producto(B):\n    __table__=productos\n    doble=column_property(productos.c.precio*2)\nwith Session(engine) as s:\n    print(s.get(Producto,3).doble)",
        "hint": "No es una columna física nueva en la base.",
        "textOutput": "600",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/association-proxy",
    "remember": "No sustituye necesariamente a JOIN en consultas complejas.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/association-proxy/1",
        "title": "Exponer los IDs de pedidos de un cliente",
        "language": "python",
        "code": "from sqlalchemy.ext.associationproxy import association_proxy\nCliente.ids_pedidos=association_proxy(\"pedidos\",\"id\")\nwith Session(engine) as s:\n    print(sorted(s.get(Cliente,1).ids_pedidos))",
        "hint": "No sustituye necesariamente a JOIN en consultas complejas.",
        "textOutput": "[101, 102]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/herencia-y-polimorfismo",
    "remember": "Elige estrategia según esquema, integridad y consultas.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/herencia-y-polimorfismo/1",
        "title": "Mapear subtipos en una tabla",
        "language": "python",
        "code": "class B(DeclarativeBase):\n    pass\nclass Persona(B):\n    __tablename__=\"personas\"\n    id: Mapped[int]=mapped_column(primary_key=True)\n    tipo: Mapped[str]=mapped_column()\n    __mapper_args__={\"polymorphic_on\":tipo,\"polymorphic_identity\":\"persona\"}\nclass Analista(Persona):\n    __mapper_args__={\"polymorphic_identity\":\"analista\"}\nB.metadata.create_all(engine)\nwith Session(engine) as s:\n    s.add(Analista(id=1))\n    s.commit()\n    print(type(s.get(Persona,1)).__name__)",
        "hint": "Elige estrategia según esquema, integridad y consultas.",
        "textOutput": "Analista",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/version-id-col",
    "remember": "No protege automáticamente UPDATE/DELETE masivos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/version-id-col/1",
        "title": "Incrementar una versión al modificar",
        "language": "python",
        "code": "class B(DeclarativeBase):\n    pass\nclass Informe(B):\n    __tablename__=\"informes\"\n    id: Mapped[int]=mapped_column(primary_key=True)\n    version: Mapped[int]=mapped_column()\n    nombre: Mapped[str]\n    __mapper_args__={\"version_id_col\":version}\nB.metadata.create_all(engine)\nwith Session(engine) as s:\n    r=Informe(id=1,nombre=\"A\")\n    s.add(r); s.flush(); print(r.version)\n    r.nombre=\"B\"; s.flush(); print(r.version)",
        "hint": "No protege automáticamente UPDATE/DELETE masivos.",
        "textOutput": "1\n2",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/validates",
    "remember": "Las escrituras Core o SQL directo no pasan por este validador.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/validates/1",
        "title": "Normalizar una categoría",
        "language": "python",
        "code": "from sqlalchemy.orm import validates\nclass B(DeclarativeBase):\n    pass\nclass Producto(B):\n    __table__=productos\n    @validates(\"categoria\")\n    def normalizar(self,key,value):\n        return value.strip()\np=Producto(categoria=\" Tech \")\nprint(p.categoria)",
        "hint": "Las escrituras Core o SQL directo no pasan por este validador.",
        "textOutput": "Tech",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-avanzado/automap-y-deferredreflection",
    "remember": "Automap requiere claves identificables y convenciones adecuadas.",
    "examples": [
      {
        "id": "sqlalchemy/orm-avanzado/automap-y-deferredreflection/1",
        "title": "Mapear una tabla ya existente",
        "language": "python",
        "code": "from sqlalchemy.ext.automap import automap_base\nB=automap_base()\nB.prepare(autoload_with=engine)\nwith Session(engine) as s:\n    print(s.get(B.classes.clientes,1).nombre)",
        "hint": "Automap requiere claves identificables y convenciones adecuadas.",
        "textOutput": "Ana",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
