// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/definicion",
    "remember": "ForeignKey define integridad; relationship define navegación ORM.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/definicion/1",
        "title": "Navegar pedidos de un cliente",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    print(sorted(p.id for p in c.pedidos))",
        "hint": "ForeignKey define integridad; relationship define navegación ORM.",
        "textOutput": "[101, 102]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-many-y-many-to-one",
    "remember": "La FK suele vivir en el lado muchos.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/one-to-many-y-many-to-one/1",
        "title": "Ir de pedido a cliente",
        "language": "python",
        "code": "with Session(engine) as s:\n    p=s.get(Pedido,103)\n    print(p.cliente.nombre)",
        "hint": "La FK suele vivir en el lado muchos.",
        "textOutput": "Luis",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-one",
    "remember": "uselist=False por sí solo no impone unicidad en SQL.",
    "note": "Requiere la preparación ORM de Datos compartidos. Para uno a uno, declara la FK unique=True y ambos atributos como escalares; la colección del ejemplo compartido es uno a muchos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/one-to-one/1",
        "title": "Comprobar la cardinalidad mapeada",
        "language": "python",
        "code": "print(inspect(Pedido).relationships.cliente.uselist)\nprint(inspect(Cliente).relationships.pedidos.uselist)",
        "hint": "uselist=False por sí solo no impone unicidad en SQL.",
        "textOutput": "False\nTrue",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/many-to-many-y-secondary",
    "remember": "Si la asociación tiene datos propios, considera un modelo de asociación.",
    "note": "detalles es una asociación con cantidad y precio. Un modelo de asociación es más apropiado que secondary para modificar esos atributos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/many-to-many-y-secondary/1",
        "title": "Identificar la tabla puente en el dataset",
        "language": "python",
        "code": "print([fk.target_fullname for fk in detalles.c.pedido_id.foreign_keys])\nprint([fk.target_fullname for fk in detalles.c.producto_id.foreign_keys])",
        "hint": "Si la asociación tiene datos propios, considera un modelo de asociación.",
        "textOutput": "['pedidos.id']\n['productos.id']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/join-con-relaciones-y-aliased",
    "remember": "Usa alias cuando una entidad participa varias veces.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/join-con-relaciones-y-aliased/1",
        "title": "Consultar cliente y pedido por relación",
        "language": "python",
        "code": "with Session(engine) as s:\n    stmt=select(Cliente.nombre,Pedido.id).join(Cliente.pedidos).order_by(Pedido.id)\n    print(s.execute(stmt).all())",
        "hint": "Usa alias cuando una entidad participa varias veces.",
        "textOutput": "[('Ana', 101), ('Ana', 102), ('Luis', 103), ('Luis', 104), ('Marta', 105), ('Marta', 106), ('Noa', 107)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/any-y-has",
    "remember": "Son métodos ORM de relaciones, distintos de any_() y all_() SQL.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/any-y-has/1",
        "title": "Buscar clientes con compras altas",
        "language": "python",
        "code": "with Session(engine) as s:\n    stmt=select(Cliente.nombre).where(Cliente.pedidos.any(Pedido.monto>=300)).order_by(Cliente.id)\n    print(s.scalars(stmt).all())",
        "hint": "Son métodos ORM de relaciones, distintos de any_() y all_() SQL.",
        "textOutput": "['Marta']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/cascade-delete-orphan-y-passive-deletes",
    "remember": "Configura las cascadas según el ciclo de vida real de las entidades.",
    "note": "Requiere la preparación ORM de Datos compartidos. El dataset no configura borrado en cascada. Para usarlo, coordina ondelete de la FK con cascade y passive_deletes.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/cascade-delete-orphan-y-passive-deletes/1",
        "title": "Inspeccionar cascada actual",
        "language": "python",
        "code": "rel=inspect(Cliente).relationships.pedidos\nprint(sorted(rel.cascade),rel.passive_deletes)",
        "hint": "Configura las cascadas según el ciclo de vida real de las entidades.",
        "textOutput": "['merge', 'save-update'] False",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-relaciones/primaryjoin-y-secondaryjoin",
    "remember": "Las condiciones de carga no son restricciones de integridad.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-relaciones/primaryjoin-y-secondaryjoin/1",
        "title": "Inspeccionar el JOIN inferido",
        "language": "python",
        "code": "print(inspect(Cliente).relationships.pedidos.primaryjoin)",
        "hint": "Las condiciones de carga no son restricciones de integridad.",
        "textOutput": "clientes.id = pedidos.cliente_id",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
