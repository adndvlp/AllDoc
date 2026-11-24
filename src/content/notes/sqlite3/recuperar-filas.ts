// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/definicion",
    "remember": "Ejecutar no es lo mismo que recuperar filas.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/definicion/1",
        "title": "Leer una consulta",
        "language": "python",
        "code": "cur = con.execute(\"SELECT id, nombre FROM clientes ORDER BY id\")\nprint(cur.fetchall())",
        "hint": "Cada tupla representa una fila.",
        "textOutput": "`[(1, 'Ana'), (2, 'Luis'), (3, 'Marta'), (4, 'Diego')]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchone",
    "remember": "Cada llamada avanza el cursor.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/fetchone/1",
        "title": "Leer una fila y agotar el resultado",
        "language": "python",
        "code": "cur = con.execute(\"SELECT nombre FROM clientes WHERE id = 1\")\nprint(cur.fetchone())\nprint(cur.fetchone())",
        "hint": "Una tupla con None dentro no equivale a ausencia de fila.",
        "textOutput": "`('Ana',)` y `None`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchmany-y-arraysize",
    "remember": "Lee por lotes sin cargar todo.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/fetchmany-y-arraysize/1",
        "title": "Recuperar dos filas por bloque",
        "language": "python",
        "code": "cur = con.execute(\"SELECT id FROM clientes ORDER BY id\")\ncur.arraysize = 2\nprint(cur.fetchmany())\nprint(cur.fetchmany())\nprint(cur.fetchmany())",
        "hint": "La lista vacía indica fin de lectura.",
        "textOutput": "`[(1,), (2,)]`, `[(3,), (4,)]`, `[]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/fetchall",
    "remember": "Devuelve una lista de filas.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/fetchall/1",
        "title": "Leer lo que queda",
        "language": "python",
        "code": "cur = con.execute(\"SELECT id FROM clientes ORDER BY id\")\nprint(cur.fetchone())\nprint(cur.fetchall())",
        "hint": "La primera fila ya fue consumida.",
        "textOutput": "`(1,)` y `[(2,), (3,), (4,)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/iterar-un-cursor",
    "remember": "Usa for para recorrer filas grandes.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/iterar-un-cursor/1",
        "title": "Recorrer pedidos",
        "language": "python",
        "code": "for (pedido_id,) in con.execute(\"SELECT id FROM pedidos ORDER BY id\"):\n    print(pedido_id)",
        "hint": "La tupla de una columna se desempaqueta.",
        "textOutput": "`101`, `102`, `103`, `104`, `105`, uno por línea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/recuperar-filas/returning",
    "remember": "Usa execute y consume el resultado.",
    "note": "SQLite 3.35 o posterior; executemany descarta las filas de RETURNING.",
    "examples": [
      {
        "id": "sqlite3/recuperar-filas/returning/1",
        "title": "Insertar y devolver el identificador",
        "language": "python",
        "code": "cur = con.execute(\"INSERT INTO clientes(nombre) VALUES (?) RETURNING id, nombre\", (\"Elena\",))\nprint(cur.fetchall())",
        "hint": "No hace falta una consulta adicional para recuperar esos valores.",
        "textOutput": "`[(5, 'Elena')]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
