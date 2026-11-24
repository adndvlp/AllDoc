// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/pool/definicion",
    "remember": "Devuelve conexiones al pool al terminar.",
    "examples": [
      {
        "id": "sqlalchemy/pool/definicion/1",
        "title": "Identificar el pool de SQLite en memoria",
        "language": "python",
        "code": "print(type(engine.pool).__name__)",
        "hint": "Devuelve conexiones al pool al terminar.",
        "textOutput": "SingletonThreadPool",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pool/queuepool-nullpool-y-staticpool",
    "remember": "SQLite en memoria requiere cuidar qué conexión contiene los datos.",
    "examples": [
      {
        "id": "sqlalchemy/pool/queuepool-nullpool-y-staticpool/1",
        "title": "Crear un motor sin reutilización",
        "language": "python",
        "code": "from sqlalchemy.pool import NullPool\ne=create_engine(\"sqlite://\",poolclass=NullPool)\nprint(type(e.pool).__name__)\ne.dispose()",
        "hint": "SQLite en memoria requiere cuidar qué conexión contiene los datos.",
        "textOutput": "NullPool",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pool/pool-size-max-overflow-y-pool-timeout",
    "remember": "No aumentes el pool sin considerar capacidad de la base.",
    "examples": [
      {
        "id": "sqlalchemy/pool/pool-size-max-overflow-y-pool-timeout/1",
        "title": "Configurar límites del pool",
        "language": "python",
        "code": "from sqlalchemy.pool import QueuePool\ne=create_engine(\"sqlite://\",poolclass=QueuePool,pool_size=2,max_overflow=1,pool_timeout=3)\nprint(e.pool.size(),e.pool.timeout())\ne.dispose()",
        "hint": "No aumentes el pool sin considerar capacidad de la base.",
        "textOutput": "2 3",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pool/pool-recycle-y-pool-pre-ping",
    "remember": "Pre-ping no rescata una transacción interrumpida.",
    "examples": [
      {
        "id": "sqlalchemy/pool/pool-recycle-y-pool-pre-ping/1",
        "title": "Activar controles de conexión",
        "language": "python",
        "code": "e=create_engine(\"sqlite://\",pool_pre_ping=True,pool_recycle=1800)\nwith e.connect() as c:\n    print(c.execute(text(\"SELECT 1\")).scalar_one())\ne.dispose()",
        "hint": "Pre-ping no rescata una transacción interrumpida.",
        "textOutput": "1",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pool/invalidate-y-reconexion",
    "remember": "Una reconexión no recupera cambios no confirmados.",
    "examples": [
      {
        "id": "sqlalchemy/pool/invalidate-y-reconexion/1",
        "title": "Invalidar una conexión de prueba",
        "language": "python",
        "code": "e=create_engine(\"sqlite://\")\nwith e.connect() as c:\n    c.execute(text(\"SELECT 1\"))\n    c.invalidate()\n    c.rollback()\n    print(c.execute(text(\"SELECT 1\")).scalar_one())\ne.dispose()",
        "hint": "Una reconexión no recupera cambios no confirmados.",
        "textOutput": "1",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/pool/hilos-procesos-y-sesiones",
    "remember": "Una sesión por hilo o tarea; motor por proceso o dispose(close=False) en hijo.",
    "note": "No ejecutes transacciones concurrentes sobre el mismo SQLite en memoria de este ejemplo.",
    "examples": [
      {
        "id": "sqlalchemy/pool/hilos-procesos-y-sesiones/1",
        "title": "Crear dos sesiones independientes",
        "language": "python",
        "code": "with Session(engine) as a, Session(engine) as b:\n    print(a is b) ",
        "hint": "Una sesión por hilo o tarea; motor por proceso o dispose(close=False) en hijo.",
        "textOutput": "False",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
