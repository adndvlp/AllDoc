// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/definicion",
    "remember": "No ocultes excepciones ni continúes como si la operación hubiera funcionado.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/definicion/1",
        "title": "Capturar un error SQL",
        "language": "python",
        "code": "try:\n    with abrir() as cnx, cnx.cursor() as cur:\n        cur.execute(\"SELECT columna_inexistente FROM customers\")\nexcept mysql.connector.Error as exc:\n    print(exc.errno)",
        "hint": "",
        "textOutput": "1054.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/integrityerror",
    "remember": "Una clave duplicada puede requerir upsert o rechazar el registro.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/integrityerror/1",
        "title": "Capturar una clave duplicada",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    try:\n        cur.execute(\"INSERT INTO customers VALUES (1,'Otra',NULL,'2026-01-01')\")\n    except mysql.connector.IntegrityError as exc:\n        cnx.rollback()\n        print(exc.errno)",
        "hint": "",
        "textOutput": "1062.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/programmingerror",
    "remember": "Corrige el SQL; reintentar sin modificarlo no ayuda.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/programmingerror/1",
        "title": "Capturar una instrucción inválida",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    try:\n        cur.execute(\"SELEC 1\")\n    except mysql.connector.ProgrammingError as exc:\n        print(exc.errno)",
        "hint": "",
        "textOutput": "1064.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/familias-de-excepciones",
    "remember": "No todos los fallos de red pertenecen a una única clase; revisa errno y sqlstate.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/familias-de-excepciones/1",
        "title": "Consultar la jerarquía",
        "language": "python",
        "code": "from mysql.connector import errors\nprint(issubclass(errors.IntegrityError, errors.DatabaseError))\nprint(issubclass(errors.OperationalError, errors.Error))\nprint(issubclass(errors.PoolError, errors.Error))",
        "hint": "",
        "textOutput": "True en las tres líneas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/errno-msg-y-sqlstate",
    "remember": "Clasifica por código, no por texto traducido.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/errno-msg-y-sqlstate/1",
        "title": "Reconocer una tabla inexistente",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    from mysql.connector import errorcode\n    try:\n        cur.execute(\"SELECT * FROM tabla_que_no_existe\")\n    except mysql.connector.Error as exc:\n        print(exc.errno == errorcode.ER_NO_SUCH_TABLE, exc.sqlstate)",
        "hint": "",
        "textOutput": "True 42S02.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/try-except-else-y-finally",
    "remember": "Si una operación de escritura falla, revierte la transacción antes de reutilizarla.",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/try-except-else-y-finally/1",
        "title": "Confirmar solo si no hubo error",
        "language": "python",
        "code": "cnx = abrir()\ntry:\n    with cnx.cursor() as cur:\n        cur.execute(\"CREATE TEMPORARY TABLE lab_err (id INT PRIMARY KEY)\")\n        cur.execute(\"INSERT INTO lab_err VALUES (1)\")\nexcept mysql.connector.Error:\n    cnx.rollback()\n    raise\nelse:\n    cnx.commit()\n    print(\"confirmado\")\nfinally:\n    cnx.close()",
        "hint": "",
        "textOutput": "confirmado; se libera la conexión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/errores-y-excepciones/advertencias",
    "remember": "Desde 9.3 usa la propiedad warnings en lugar de fetchwarnings().",
    "examples": [
      {
        "id": "mysql-connector-python/errores-y-excepciones/advertencias/1",
        "title": "Consultar una advertencia de conversión",
        "language": "python",
        "code": "with abrir(get_warnings=True) as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT CAST('abc' AS UNSIGNED)\")\n    print(cur.fetchall())\n    print(cur.warnings)",
        "hint": "",
        "textOutput": "[(0,)] y una advertencia de conversión (puede emitirse también un aviso Python).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
