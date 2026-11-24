// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/definicion",
    "remember": "La conexión administra la sesión; el cursor administra el resultado.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/definicion/1",
        "title": "Consultar el identificador de un cliente",
        "language": "python",
        "code": "with conn.cursor() as c:\n    c.execute(\"SELECT id FROM clientes WHERE id = 1\")\n    print(c.fetchone())",
        "hint": "La conexión administra la sesión; el cursor administra el resultado.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/cursor-y-close",
    "remember": "Cerrar el cursor no confirma ni revierte una transacción.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/cursor-y-close/1",
        "title": "Comprobar el ciclo de vida",
        "language": "python",
        "code": "c = conn.cursor()\nc.close()\nprint(c.closed, conn.closed)",
        "hint": "Cerrar el cursor no confirma ni revierte una transacción.",
        "textOutput": "`True False`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/execute",
    "remember": "Ejecutar no es lo mismo que recuperar filas.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/execute/1",
        "title": "Consultar los clientes por ID",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM clientes ORDER BY id\")\nprint(cur.fetchall())",
        "hint": "Ejecutar no es lo mismo que recuperar filas.",
        "textOutput": "`[(1,), (2,), (3,), (4,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/conn-execute",
    "remember": "Útil cuando solo necesitas una instrucción y su resultado.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/conn-execute/1",
        "title": "Obtener la cantidad de pedidos",
        "language": "python",
        "code": "print(conn.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone())",
        "hint": "Útil cuando solo necesitas una instrucción y su resultado.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/context-manager-de-cursor",
    "remember": "No cierra la conexión ni decide commit o rollback.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/context-manager-de-cursor/1",
        "title": "Liberar solo el cursor",
        "language": "python",
        "code": "with conn.cursor() as c:\n    c.execute(\"SELECT 1\")\nprint(c.closed, conn.closed)",
        "hint": "No cierra la conexión ni decide commit o rollback.",
        "textOutput": "`True False`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/cursores-y-ejecucion/varios-cursores",
    "remember": "Para transacciones realmente independientes, abre conexiones distintas.",
    "examples": [
      {
        "id": "psycopg/cursores-y-ejecucion/varios-cursores/1",
        "title": "Leer dos resultados independientes",
        "language": "python",
        "code": "with conn.cursor() as a, conn.cursor() as b:\n    a.execute(\"SELECT 1\")\n    b.execute(\"SELECT 2\")\n    print(a.fetchone(), b.fetchone())",
        "hint": "Para transacciones realmente independientes, abre conexiones distintas.",
        "textOutput": "`(1,) (2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
