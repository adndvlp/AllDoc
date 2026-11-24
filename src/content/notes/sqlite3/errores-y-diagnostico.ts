// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/definicion",
    "remember": "Captura el error más específico posible.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/definicion/1",
        "title": "Capturar una consulta inválida",
        "language": "python",
        "code": "try:\n    con.execute(\"SELECT * FROM inexistente\")\nexcept sqlite3.Error as exc:\n    print(type(exc).__name__)",
        "hint": "Error es la base de las excepciones del módulo salvo Warning.",
        "textOutput": "`OperationalError`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/integrityerror",
    "remember": "No ignores restricciones fallidas.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/integrityerror/1",
        "title": "Detectar clave repetida",
        "language": "python",
        "code": "try:\n    con.execute(\"INSERT INTO clientes(id, nombre) VALUES (1, 'Otra')\")\nexcept sqlite3.IntegrityError as exc:\n    print(type(exc).__name__)",
        "hint": "La fila original permanece.",
        "textOutput": "`IntegrityError`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/operationalerror",
    "remember": "Distingue fallos recuperables de errores de SQL.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/operationalerror/1",
        "title": "Consultar una tabla inexistente",
        "language": "python",
        "code": "try:\n    con.execute(\"SELECT * FROM ventas_2020\")\nexcept sqlite3.OperationalError as exc:\n    print(type(exc).__name__)",
        "hint": "Comprueba el esquema.",
        "textOutput": "`OperationalError`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/programmingerror",
    "remember": "Comprueba cantidad y forma de los parámetros.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/programmingerror/1",
        "title": "Detectar parámetros faltantes",
        "language": "python",
        "code": "try:\n    con.execute(\"SELECT ? + ?\", (1,))\nexcept sqlite3.ProgrammingError as exc:\n    print(type(exc).__name__)",
        "hint": "Hay dos placeholders y un valor.",
        "textOutput": "`ProgrammingError`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/jerarquia-db-api",
    "remember": "Usa clases de error en vez de comparar mensajes.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/jerarquia-db-api/1",
        "title": "Comprobar la jerarquía",
        "language": "python",
        "code": "print(issubclass(sqlite3.IntegrityError, sqlite3.DatabaseError))\nprint(issubclass(sqlite3.InterfaceError, sqlite3.Error))\nprint(issubclass(sqlite3.Warning, sqlite3.Error))",
        "hint": "DataError se refiere a datos problemáticos, InternalError a fallos internos, InterfaceError a la interfaz, NotSupportedError a características no soportadas. Warning es una clase separada.",
        "textOutput": "`True`, `True`, `False`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/sqlite-errorcode-y-sqlite-errorname",
    "remember": "Usa constantes para distinguir errores.",
    "note": "Python 3.11+. No todos los errores generados por Python los incluyen.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/sqlite-errorcode-y-sqlite-errorname/1",
        "title": "Identificar una clave primaria repetida",
        "language": "python",
        "code": "try:\n    con.execute(\"INSERT INTO clientes(id, nombre) VALUES (1, 'Otra')\")\nexcept sqlite3.IntegrityError as exc:\n    print(exc.sqlite_errorname)\n    print(exc.sqlite_errorcode == sqlite3.SQLITE_CONSTRAINT_PRIMARYKEY)",
        "hint": "Los atributos identifican el error del motor.",
        "textOutput": "`SQLITE_CONSTRAINT_PRIMARYKEY`, `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/errores-y-diagnostico/try-except-y-finally",
    "remember": "Cierra aunque falle una consulta.",
    "examples": [
      {
        "id": "sqlite3/errores-y-diagnostico/try-except-y-finally/1",
        "title": "Cerrar una conexión al fallar",
        "language": "python",
        "code": "db = abrir_demo()\ntry:\n    db.execute(\"SELECT * FROM inexistente\")\nexcept sqlite3.OperationalError:\n    print(\"Consulta inválida\")\nfinally:\n    db.close()",
        "hint": "Combina cierre y transacciones si hay escrituras relacionadas.",
        "textOutput": "`Consulta inválida`; conexión cerrada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
