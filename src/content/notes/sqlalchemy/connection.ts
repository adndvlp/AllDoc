// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/connection/definicion",
    "remember": "Usa with para devolver la conexión al pool.",
    "examples": [
      {
        "id": "sqlalchemy/connection/definicion/1",
        "title": "Ejecutar una consulta textual",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.execute(text(\"SELECT COUNT(*) FROM clientes\")).scalar_one())",
        "hint": "Usa with para devolver la conexión al pool.",
        "textOutput": "5",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/connection/connect-y-close",
    "remember": "Prefiere el context manager para liberar recursos.",
    "examples": [
      {
        "id": "sqlalchemy/connection/connect-y-close/1",
        "title": "Comprobar el cierre",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.closed)\nprint(conn.closed)",
        "hint": "Prefiere el context manager para liberar recursos.",
        "textOutput": "False\nTrue",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/connection/text-y-execute",
    "remember": "execute() no recibe directamente una cadena SQL en 2.0.",
    "examples": [
      {
        "id": "sqlalchemy/connection/text-y-execute/1",
        "title": "Leer nombres con SQL escrito a mano",
        "language": "python",
        "code": "ver(text(\"SELECT nombre FROM clientes ORDER BY id\"))",
        "hint": "execute() no recibe directamente una cadena SQL en 2.0.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/connection/exec-driver-sql",
    "remember": "Los placeholders dependen del DBAPI.",
    "examples": [
      {
        "id": "sqlalchemy/connection/exec-driver-sql/1",
        "title": "Usar un placeholder SQLite",
        "language": "python",
        "code": "with engine.connect() as conn:\n    print(conn.exec_driver_sql(\"SELECT nombre FROM clientes WHERE id = ?\", (2,)).scalar_one())",
        "hint": "Los placeholders dependen del DBAPI.",
        "textOutput": "Luis",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/connection/raw-connection",
    "remember": "Cierra el cursor y la conexión aunque trabajes fuera de Core.",
    "examples": [
      {
        "id": "sqlalchemy/connection/raw-connection/1",
        "title": "Consultar con cursor DBAPI",
        "language": "python",
        "code": "raw = engine.raw_connection()\ntry:\n    cur = raw.cursor()\n    cur.execute(\"SELECT COUNT(*) FROM pedidos\")\n    print(cur.fetchone())\n    cur.close()\nfinally:\n    raw.close()",
        "hint": "Cierra el cursor y la conexión aunque trabajes fuera de Core.",
        "textOutput": "(7,)",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/connection/execution-options",
    "remember": "Las opciones de ejecución no cambian necesariamente el SQL.",
    "examples": [
      {
        "id": "sqlalchemy/connection/execution-options/1",
        "title": "Consultar una opción personalizada",
        "language": "python",
        "code": "with engine.connect() as conn:\n    conn.execution_options(reporte=\"ventas\")\n    print(conn.get_execution_options()[\"reporte\"])",
        "hint": "Las opciones de ejecución no cambian necesariamente el SQL.",
        "textOutput": "ventas",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
