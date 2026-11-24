// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/definicion",
    "remember": "No confundas filas obtenidas con filas modificadas.",
    "examples": [
      {
        "id": "sqlite3/metadatos-de-cursor-y-conexion/definicion/1",
        "title": "Identificar columnas",
        "language": "python",
        "code": "cur = con.execute(\"SELECT id, nombre FROM clientes\")\nprint([c[0] for c in cur.description])",
        "hint": "description está disponible incluso antes de leer las filas.",
        "textOutput": "`['id', 'nombre']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/description",
    "remember": "El nombre está en la posición 0.",
    "examples": [
      {
        "id": "sqlite3/metadatos-de-cursor-y-conexion/description/1",
        "title": "Construir un encabezado",
        "language": "python",
        "code": "cur = con.execute(\"SELECT monto AS centavos FROM pedidos\")\nprint(cur.description[0])",
        "hint": "Respeta el alias devuelto por SQL.",
        "textOutput": "`('centavos', None, None, None, None, None, None)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/rowcount",
    "remember": "Para contar SELECT usa COUNT o lee las filas.",
    "examples": [
      {
        "id": "sqlite3/metadatos-de-cursor-y-conexion/rowcount/1",
        "title": "Contar modificaciones",
        "language": "python",
        "code": "cur = con.execute(\"UPDATE clientes SET pais = 'Mexico' WHERE id = 4\")\nprint(cur.rowcount)\nprint(con.execute(\"SELECT * FROM clientes\").rowcount)",
        "hint": "Con RETURNING, consume las filas antes de consultar rowcount.",
        "textOutput": "`1`, `-1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/lastrowid",
    "remember": "No es el número de filas insertadas.",
    "examples": [
      {
        "id": "sqlite3/metadatos-de-cursor-y-conexion/lastrowid/1",
        "title": "Recuperar el id automático",
        "language": "python",
        "code": "cur = con.execute(\"INSERT INTO clientes(nombre) VALUES (?)\", (\"Elena\",))\nprint(cur.lastrowid)",
        "hint": "No se actualiza mediante executemany, executescript ni inserciones en tablas WITHOUT ROWID.",
        "textOutput": "`5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/metadatos-de-cursor-y-conexion/total-changes-y-cursor-connection",
    "remember": "Mide el incremento si necesitas cambios de una operación.",
    "examples": [
      {
        "id": "sqlite3/metadatos-de-cursor-y-conexion/total-changes-y-cursor-connection/1",
        "title": "Medir cambios de una escritura",
        "language": "python",
        "code": "antes = con.total_changes\ncur = con.execute(\"UPDATE clientes SET pais = 'Spain' WHERE id = 4\")\nprint(con.total_changes - antes, cur.connection is con)",
        "hint": "El contador no representa necesariamente cambios confirmados.",
        "textOutput": "`1 True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
