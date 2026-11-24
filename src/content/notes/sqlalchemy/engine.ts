// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/engine/definicion",
    "remember": "Crea un Engine por configuración, no uno por fila.",
    "examples": [
      {
        "id": "sqlalchemy/engine/definicion/1",
        "title": "Crear y probar un motor local",
        "language": "python",
        "code": "e = create_engine(\"sqlite+pysqlite:///:memory:\")\nwith e.connect() as conn:\n    print(conn.execute(text(\"SELECT 1\")).scalar_one())\ne.dispose()",
        "hint": "Crea un Engine por configuración, no uno por fila.",
        "textOutput": "1",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/url-de-conexion",
    "remember": "dialecto+driver://usuario:clave@host:puerto/base",
    "examples": [
      {
        "id": "sqlalchemy/engine/url-de-conexion/1",
        "title": "Inspeccionar una URL local",
        "language": "python",
        "code": "print(sa.engine.make_url(\"sqlite+pysqlite:///ventas.db\").database)",
        "hint": "dialecto+driver://usuario:clave@host:puerto/base",
        "textOutput": "ventas.db",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/url-create",
    "remember": "No imprimas contraseñas ni las subas al repositorio.",
    "examples": [
      {
        "id": "sqlalchemy/engine/url-create/1",
        "title": "Construir una URL PostgreSQL sin abrir conexión",
        "language": "python",
        "code": "u = sa.URL.create(\"postgresql+psycopg\", username=\"analista\", password=\"ejemplo@local\", host=\"localhost\", port=5432, database=\"ventas\")\nprint(u.render_as_string(hide_password=True))",
        "hint": "No imprimas contraseñas ni las subas al repositorio.",
        "textOutput": "postgresql+psycopg://analista:***@localhost:5432/ventas",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/drivers-por-motor",
    "remember": "Instalar SQLAlchemy no instala todos los drivers.",
    "note": "Instala psycopg, pymysql o pyodbc según destino; SQL Server requiere además configuración ODBC.",
    "examples": [
      {
        "id": "sqlalchemy/engine/drivers-por-motor/1",
        "title": "Comparar prefijos sin conectarse",
        "language": "python",
        "code": "for url in [\"postgresql+psycopg://host/db\", \"mysql+pymysql://host/db\", \"mssql+pyodbc://host/db\", \"sqlite+pysqlite:///:memory:\"]:\n    print(sa.engine.make_url(url).drivername)",
        "hint": "Instalar SQLAlchemy no instala todos los drivers.",
        "textOutput": "postgresql+psycopg\nmysql+pymysql\nmssql+pyodbc\nsqlite+pysqlite",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/credenciales-y-variables-de-entorno",
    "remember": "No uses f-strings para incrustar claves en URLs.",
    "note": "En producción configura las variables desde el entorno o un gestor de secretos; no las fijes en el código.",
    "examples": [
      {
        "id": "sqlalchemy/engine/credenciales-y-variables-de-entorno/1",
        "title": "Leer una configuración de ejemplo",
        "language": "python",
        "code": "import os\nos.environ[\"DEMO_DB_USER\"] = \"analista\"\nu = sa.URL.create(\"postgresql+psycopg\", username=os.environ[\"DEMO_DB_USER\"], host=\"localhost\", database=\"ventas\")\nprint(u.username)",
        "hint": "No uses f-strings para incrustar claves en URLs.",
        "textOutput": "analista",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/connect-args-creator-y-tls",
    "remember": "Consulta los argumentos del driver, no hay un SSL universal.",
    "examples": [
      {
        "id": "sqlalchemy/engine/connect-args-creator-y-tls/1",
        "title": "Ajustar timeout de SQLite",
        "language": "python",
        "code": "e = create_engine(\"sqlite://\", connect_args={\"timeout\": 10})\nwith e.connect() as conn:\n    print(conn.exec_driver_sql(\"PRAGMA busy_timeout\").scalar())\ne.dispose()",
        "hint": "Consulta los argumentos del driver, no hay un SSL universal.",
        "textOutput": "10000",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/echo-logging-y-hide-parameters",
    "remember": "Ocultar parámetros no protege literales escritos dentro del SQL.",
    "examples": [
      {
        "id": "sqlalchemy/engine/echo-logging-y-hide-parameters/1",
        "title": "Configurar diagnóstico sin imprimir valores",
        "language": "python",
        "code": "e = create_engine(\"sqlite://\", echo=False, hide_parameters=True)\nprint(e.echo, e.hide_parameters)\ne.dispose()",
        "hint": "Ocultar parámetros no protege literales escritos dentro del SQL.",
        "textOutput": "False True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/engine/dispose",
    "remember": "Cierra conexiones antes de desechar el motor.",
    "note": "En SQLite en memoria, desechar el motor puede eliminar los datos. No uses dispose() sobre el dataset compartido.",
    "examples": [
      {
        "id": "sqlalchemy/engine/dispose/1",
        "title": "Desechar un motor de ejemplo",
        "language": "python",
        "code": "e = create_engine(\"sqlite://\")\ne.dispose()\nprint(\"pool reemplazado\")",
        "hint": "Cierra conexiones antes de desechar el motor.",
        "textOutput": "pool reemplazado",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
