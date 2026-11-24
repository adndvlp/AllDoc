// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/definicion",
    "remember": "Usa BLOB para contenido binario y TEXT para texto.",
    "examples": [
      {
        "id": "sqlite3/blob-y-acceso-binario/definicion/1",
        "title": "Guardar un contenido binario",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)\")\ncon.execute(\"INSERT INTO archivos VALUES (?, ?)\", (1, b\"ABC\"))\nprint(con.execute(\"SELECT datos FROM archivos WHERE id=1\").fetchone())",
        "hint": "El valor se recupera sin decodificar.",
        "textOutput": "`(b'ABC',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/blobopen-y-zeroblob",
    "remember": "No puedes aumentar el tamaño mediante Blob.write.",
    "note": "Python 3.11+. No funciona con tablas WITHOUT ROWID; readonly=True abre un BLOB sin permitir escritura.",
    "examples": [
      {
        "id": "sqlite3/blob-y-acceso-binario/blobopen-y-zeroblob/1",
        "title": "Escribir tres bytes en un BLOB reservado",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)\")\ncon.execute(\"INSERT INTO archivos VALUES (1, zeroblob(3))\")\nwith con.blobopen(\"archivos\", \"datos\", 1) as blob:\n    blob.write(b\"ABC\")\nprint(con.execute(\"SELECT datos FROM archivos\").fetchone())",
        "hint": "El identificador pasado es el ROWID de la fila.",
        "textOutput": "`(b'ABC',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/blob-y-acceso-binario/read-write-seek-tell-y-close",
    "remember": "Usa with o close para liberar el recurso.",
    "examples": [
      {
        "id": "sqlite3/blob-y-acceso-binario/read-write-seek-tell-y-close/1",
        "title": "Leer y modificar parte del contenido",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)\")\ncon.execute(\"INSERT INTO archivos VALUES (1, x'41424344')\")\nwith con.blobopen(\"archivos\", \"datos\", 1) as blob:\n    print(blob.read(2), blob.tell())\n    blob.seek(1)\n    blob.write(b\"X\")\n    print(blob[:], blob[0], len(blob))",
        "hint": "Se puede usar indexación y slicing; el tamaño permanece en cuatro bytes.",
        "textOutput": "`b'AB' 2`; `b'AXCD' 65 4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
