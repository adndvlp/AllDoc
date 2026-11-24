// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/definicion",
    "remember": "Engine conecta; Core trabaja con sentencias; ORM con entidades.",
    "examples": [
      {
        "id": "sqlalchemy/sqlalchemy-arquitectura/definicion/1",
        "title": "Contar pedidos con SQL directo",
        "language": "python",
        "code": "valor(text(\"SELECT COUNT(*) FROM pedidos\"))",
        "hint": "Engine conecta; Core trabaja con sentencias; ORM con entidades.",
        "textOutput": "7",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/instalacion",
    "remember": "Usa el mismo entorno Python donde ejecutarás el código.",
    "note": "SQLite utiliza sqlite3 de la biblioteca estándar; no requiere servidor.",
    "examples": [
      {
        "id": "sqlalchemy/sqlalchemy-arquitectura/instalacion/1",
        "title": "Instalar en el entorno activo",
        "language": "bash",
        "code": "python -m pip install \"sqlalchemy>=2.0,<2.1\"\npython -m pip install pandas",
        "hint": "Usa el mismo entorno Python donde ejecutarás el código. Ejecuta este comando en tu terminal.",
        "textOutput": "SQLAlchemy 2.0.x y Pandas quedan disponibles si la instalación finaliza correctamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/core-frente-a-orm",
    "remember": "No necesitas ORM para consultar datos de análisis.",
    "note": "Requiere la preparación ORM de Datos compartidos.",
    "examples": [
      {
        "id": "sqlalchemy/sqlalchemy-arquitectura/core-frente-a-orm/1",
        "title": "Comparar dos consultas equivalentes",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).order_by(clientes.c.id))\nwith Session(engine) as s:\n    print(s.scalars(select(Cliente.nombre).order_by(Cliente.id)).all())",
        "hint": "No necesitas ORM para consultar datos de análisis.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]\n['Ana', 'Luis', 'Marta', 'Noa', 'Eva']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/dbapi-dialecto-y-driver",
    "remember": "El driver transporta; el dialecto adapta.",
    "examples": [
      {
        "id": "sqlalchemy/sqlalchemy-arquitectura/dbapi-dialecto-y-driver/1",
        "title": "Identificar SQLite y su controlador",
        "language": "python",
        "code": "print(engine.dialect.name, engine.dialect.driver)",
        "hint": "El driver transporta; el dialecto adapta.",
        "textOutput": "sqlite pysqlite",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/api-2-0-y-codigo-legado",
    "remember": "No uses engine.execute() ni select([columna]) en código nuevo.",
    "examples": [
      {
        "id": "sqlalchemy/sqlalchemy-arquitectura/api-2-0-y-codigo-legado/1",
        "title": "Consultar con la API 2.0",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id == 1)).scalar_one())",
        "hint": "No uses engine.execute() ni select([columna]) en código nuevo.",
        "textOutput": "Ana",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
