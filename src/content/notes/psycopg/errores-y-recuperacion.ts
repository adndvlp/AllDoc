// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/definicion",
    "remember": "Un error SQL normalmente invalida la transacción hasta rollback.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/definicion/1",
        "title": "Capturar una tabla inexistente",
        "language": "python",
        "code": "try:\n    cur.execute(\"SELECT * FROM tabla_que_no_existe\")\nexcept psycopg.Error as exc:\n    print(type(exc).__name__)\n    conn.rollback()",
        "hint": "Un error SQL normalmente invalida la transacción hasta rollback.",
        "textOutput": "`UndefinedTable`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/try-except-y-finally",
    "remember": "No ocultar errores con except vacío.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/try-except-y-finally/1",
        "title": "Cerrar la conexión incluso si falla una consulta",
        "language": "python",
        "code": "c = psycopg.connect(DSN)\ntry:\n    c.execute(\"SELECT * FROM tabla_que_no_existe\")\nexcept psycopg.errors.UndefinedTable:\n    print(\"Tabla inexistente\")\nfinally:\n    c.close()",
        "hint": "No ocultar errores con except vacío.",
        "textOutput": "`Tabla inexistente`; la sesión queda cerrada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/jerarquia-db-api",
    "remember": "Captura la clase más específica que puedas resolver.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/jerarquia-db-api/1",
        "title": "Inspeccionar dos relaciones de herencia",
        "language": "python",
        "code": "print(issubclass(psycopg.IntegrityError, psycopg.DatabaseError))\nprint(issubclass(psycopg.InterfaceError, psycopg.Error))",
        "hint": "Captura la clase más específica que puedas resolver.",
        "textOutput": "`True`, `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/integrityerror-y-uniqueviolation",
    "remember": "Una clave duplicada no es necesariamente un fallo de conexión.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/integrityerror-y-uniqueviolation/1",
        "title": "Detectar un ID existente",
        "language": "python",
        "code": "try:\n    cur.execute(\"INSERT INTO clientes VALUES (1,'Otra Ana',NULL)\")\nexcept psycopg.errors.UniqueViolation:\n    conn.rollback()\n    print(\"ID duplicado\")",
        "hint": "Una clave duplicada no es necesariamente un fallo de conexión.",
        "textOutput": "`ID duplicado`; se conserva la Ana original.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/foreignkeyviolation-y-notnullviolation",
    "remember": "Validar relaciones y campos obligatorios antes de cargar datos.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/foreignkeyviolation-y-notnullviolation/1",
        "title": "Detectar un cliente inexistente en un pedido",
        "language": "python",
        "code": "try:\n    cur.execute(\"UPDATE pedidos SET cliente_id=999 WHERE id=101\")\nexcept psycopg.errors.ForeignKeyViolation:\n    conn.rollback()\n    print(\"Referencia inválida\")",
        "hint": "Validar relaciones y campos obligatorios antes de cargar datos.",
        "textOutput": "`Referencia inválida`. Insertar un cliente con nombre NULL produciría `NotNullViolation`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/programmingerror-y-dataerror",
    "remember": "Corrige la instrucción o el dato antes de reintentar.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/programmingerror-y-dataerror/1",
        "title": "Detectar texto inválido para un entero",
        "language": "python",
        "code": "try:\n    cur.execute(\"SELECT %s::integer\", (\"abc\",))\nexcept psycopg.DataError as exc:\n    print(type(exc).__name__)\n    conn.rollback()",
        "hint": "Corrige la instrucción o el dato antes de reintentar.",
        "textOutput": "`InvalidTextRepresentation`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/sqlstate-y-diag",
    "remember": "No depender del texto traducido del error.",
    "note": "Algunos errores locales no tienen sqlstate ni diagnóstico del servidor.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/sqlstate-y-diag/1",
        "title": "Identificar una violación de unicidad",
        "language": "python",
        "code": "try:\n    cur.execute(\"INSERT INTO clientes VALUES (1,'Otra Ana',NULL)\")\nexcept psycopg.Error as exc:\n    print(exc.sqlstate, exc.diag.constraint_name)\n    conn.rollback()",
        "hint": "No depender del texto traducido del error.",
        "textOutput": "`23505 clientes_pkey`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/infailedsqltransaction",
    "remember": "Un except sin rollback no restablece la transacción.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/infailedsqltransaction/1",
        "title": "Restablecer el cursor después de un error",
        "language": "python",
        "code": "try:\n    cur.execute(\"SELECT 1/0\")\nexcept psycopg.errors.DivisionByZero:\n    try:\n        cur.execute(\"SELECT 1\")\n    except psycopg.errors.InFailedSqlTransaction:\n        print(\"Transacción abortada\")\n    conn.rollback()\nprint(cur.execute(\"SELECT 1\").fetchone())",
        "hint": "Un except sin rollback no restablece la transacción.",
        "textOutput": "`Transacción abortada`, luego `(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/operationalerror-y-desconexiones",
    "remember": "Comprobar el estado y abrir una conexión nueva cuando la anterior esté rota.",
    "note": "No asumir que todo OperationalError sea transitorio.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/operationalerror-y-desconexiones/1",
        "title": "Tratar un fallo de conexión",
        "language": "python",
        "code": "try:\n    with psycopg.connect(DSN, connect_timeout=3) as c:\n        print(c.execute(\"SELECT 1\").fetchone())\nexcept psycopg.OperationalError:\n    print(\"No se pudo consultar el servidor\")",
        "hint": "Comprobar el estado y abrir una conexión nueva cuando la anterior esté rota.",
        "textOutput": "`(1,)` si el servidor está disponible, o el mensaje de fallo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/errores-y-recuperacion/reintentos-acotados",
    "remember": "Reintentar la unidad de trabajo completa, con límite y espera.",
    "note": "Ante una desconexión durante commit puede desconocerse si se confirmó; no repetir escrituras no idempotentes a ciegas.",
    "examples": [
      {
        "id": "psycopg/errores-y-recuperacion/reintentos-acotados/1",
        "title": "Reintentar una lectura transaccional",
        "language": "python",
        "code": "import time\nfor intento in range(3):\n    try:\n        with psycopg.connect(DSN) as c:\n            total = c.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone()[0]\n        break\n    except (psycopg.errors.SerializationFailure, psycopg.errors.DeadlockDetected):\n        if intento == 2:\n            raise\n        time.sleep(0.1 * (2 ** intento))\nprint(total)",
        "hint": "Reintentar la unidad de trabajo completa, con límite y espera.",
        "textOutput": "`5` en ejecución normal; si persiste un fallo permitido, se propaga en el tercer intento.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
