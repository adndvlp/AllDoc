// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/definicion",
    "remember": "SQL va en una cadena de Python.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/definicion/1",
        "title": "Consultar un cliente",
        "language": "python",
        "code": "cur = con.execute(\"SELECT nombre FROM clientes WHERE id = 2\")\nprint(cur.fetchone())",
        "hint": "La conexión ofrece un atajo que crea el cursor automáticamente.",
        "textOutput": "`('Luis',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/execute-con-cursor",
    "remember": "Cada execute reemplaza el resultado pendiente del cursor.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/execute-con-cursor/1",
        "title": "Consultar dos totales",
        "language": "python",
        "code": "cur = con.cursor()\ncur.execute(\"SELECT COUNT(*) FROM clientes\")\nprint(cur.fetchone())\ncur.execute(\"SELECT COUNT(*) FROM pedidos\")\nprint(cur.fetchone())",
        "hint": "Se recupera el primer resultado antes de ejecutar la segunda consulta.",
        "textOutput": "`(4,)` y `(5,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/executemany",
    "remember": "Una plantilla SQL y muchos conjuntos de parámetros.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/executemany/1",
        "title": "Cargar dos clientes",
        "language": "python",
        "code": "con.executemany(\"INSERT INTO clientes VALUES (?, ?, ?)\", [\n    (5, \"Elena\", \"Mexico\"), (6, \"Pablo\", None)\n])\nprint(con.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "También acepta generadores. Las filas de RETURNING se descartan con executemany.",
        "textOutput": "`(6,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/executescript",
    "remember": "No admite parámetros; usa solo SQL de confianza.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/executescript/1",
        "title": "Crear una tabla y poblarla",
        "language": "python",
        "code": "con.executescript(\"\"\"\nCREATE TABLE metas (monto INTEGER);\nINSERT INTO metas VALUES (5000);\n\"\"\")\nprint(con.execute(\"SELECT monto FROM metas\").fetchone())",
        "hint": "El script no garantiza atomicidad por sí solo; en modo legado puede confirmar antes una transacción pendiente.",
        "textOutput": "`(5000,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/atajos-de-connection",
    "remember": "No hace falta cursor() para consultas sencillas.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/atajos-de-connection/1",
        "title": "Leer directamente desde la conexión",
        "language": "python",
        "code": "print(con.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone())",
        "hint": "El cursor retornado permite encadenar la lectura.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/ejecutar-sentencias/complete-statement",
    "remember": "No comprueba que el SQL sea válido.",
    "examples": [
      {
        "id": "sqlite3/ejecutar-sentencias/complete-statement/1",
        "title": "Detectar el final de una sentencia",
        "language": "python",
        "code": "print(sqlite3.complete_statement(\"SELECT 1\"))\nprint(sqlite3.complete_statement(\"SELECT 1;\"))",
        "hint": "Sirve para reunir entradas multilínea, no para validar sintaxis.",
        "textOutput": "`False`, `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
