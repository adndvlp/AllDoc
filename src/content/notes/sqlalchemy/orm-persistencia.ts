// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/definicion",
    "remember": "flush no es commit.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/definicion/1",
        "title": "Modificar y confirmar una entidad",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    c.nombre=\"Ana María\"\n    s.commit()\nvalor(select(clientes.c.nombre).where(clientes.c.id==1))",
        "hint": "flush no es commit.",
        "textOutput": "Ana María",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/add-y-add-all",
    "remember": "Una instancia nueva puede no tener ID hasta el flush.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/add-y-add-all/1",
        "title": "Insertar un cliente",
        "language": "python",
        "code": "with Sesion.begin() as s:\n    c=Cliente(nombre=\"Sol\",alta=date(2026,1,8))\n    s.add(c)\n    s.flush()\n    print(c.id)",
        "hint": "Una instancia nueva puede no tener ID hasta el flush.",
        "textOutput": "6",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/delete-y-actualizacion-por-atributos",
    "remember": "Las relaciones y cascadas pueden alterar qué DML se emite.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/delete-y-actualizacion-por-atributos/1",
        "title": "Eliminar un cliente sin compras",
        "language": "python",
        "code": "with Sesion.begin() as s:\n    s.delete(s.get(Cliente,5))\nvalor(select(func.count()).select_from(clientes))",
        "hint": "Las relaciones y cascadas pueden alterar qué DML se emite.",
        "textOutput": "4",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/flush-commit-y-rollback",
    "remember": "Después de un flush fallido llama rollback() antes de reutilizar la Session.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/flush-commit-y-rollback/1",
        "title": "Ver un ID y revertir su inserción",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=Cliente(nombre=\"Sol\",alta=date(2026,1,8))\n    s.add(c)\n    s.flush()\n    print(c.id)\n    s.rollback()\nvalor(select(func.count()).select_from(clientes))",
        "hint": "Después de un flush fallido llama rollback() antes de reutilizar la Session.",
        "textOutput": "6\n5",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/transient-pending-persistent-deleted-y-detached",
    "remember": "Una entidad detached no puede cargar atributos pendientes sin una sesión.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/transient-pending-persistent-deleted-y-detached/1",
        "title": "Observar tres estados y separación",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=Cliente(nombre=\"Sol\",alta=date(2026,1,8))\n    print(inspect(c).transient)\n    s.add(c)\n    print(inspect(c).pending)\n    s.flush()\n    print(inspect(c).persistent)\n    s.expunge(c)\n    print(inspect(c).detached)\n    s.rollback()",
        "hint": "Una entidad detached no puede cargar atributos pendientes sin una sesión.",
        "textOutput": "True\nTrue\nTrue\nTrue",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/new-dirty-y-deleted",
    "remember": "dirty puede incluir modificaciones que no produzcan un UPDATE real.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/new-dirty-y-deleted/1",
        "title": "Inspeccionar cambios pendientes",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    c.nombre=\"Anita\"\n    print(c in s.dirty,s.is_modified(c))",
        "hint": "dirty puede incluir modificaciones que no produzcan un UPDATE real.",
        "textOutput": "True True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/refresh-expire-y-expire-all",
    "remember": "Pueden descartar cambios locales no enviados.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/refresh-expire-y-expire-all/1",
        "title": "Recuperar un valor original",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    c.nombre=\"Cambio local\"\n    s.refresh(c)\n    print(c.nombre)",
        "hint": "Pueden descartar cambios locales no enviados.",
        "textOutput": "Ana",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/merge-y-expunge",
    "remember": "Usa el objeto devuelto por merge(), no el original.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/merge-y-expunge/1",
        "title": "Reasociar estado de una entidad",
        "language": "python",
        "code": "with Session(engine) as s:\n    c=s.get(Cliente,1)\n    s.expunge(c)\n    c.nombre=\"Anita\"\n    otro=s.merge(c)\n    print(otro is c,otro.nombre,inspect(otro).persistent)",
        "hint": "Usa el objeto devuelto por merge(), no el original.",
        "textOutput": "False Anita True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/autoflush-no-autoflush-y-expire-on-commit",
    "remember": "commit hace flush aunque autoflush esté desactivado.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/autoflush-no-autoflush-y-expire-on-commit/1",
        "title": "Consultar antes y después del flush",
        "language": "python",
        "code": "with Session(engine) as s:\n    s.add(Cliente(nombre=\"Sol\",alta=date(2026,1,8)))\n    with s.no_autoflush:\n        print(s.scalar(select(func.count()).select_from(Cliente)))\n    print(s.scalar(select(func.count()).select_from(Cliente)))",
        "hint": "commit hace flush aunque autoflush esté desactivado.",
        "textOutput": "5\n6",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orm-persistencia/dml-masivo-orm",
    "remember": "No confundir un UPDATE de conjunto con modificar objetos uno por uno.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/orm-persistencia/dml-masivo-orm/1",
        "title": "Actualizar un conjunto de entidades",
        "language": "python",
        "code": "with Sesion.begin() as s:\n    s.execute(update(Cliente).where(Cliente.pais==\"MX\").values(pais=\"Mexico\"))\nver(select(clientes.c.nombre).where(clientes.c.pais==\"Mexico\").order_by(clientes.c.id))",
        "hint": "No confundir un UPDATE de conjunto con modificar objetos uno por uno.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
