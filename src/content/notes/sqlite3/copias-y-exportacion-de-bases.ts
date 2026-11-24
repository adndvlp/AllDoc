// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/definicion",
    "remember": "Una copia de base no es lo mismo que exportar una consulta.",
    "examples": [
      {
        "id": "sqlite3/copias-y-exportacion-de-bases/definicion/1",
        "title": "Copiar la demo a otra conexión",
        "language": "python",
        "code": "with closing(sqlite3.connect(\":memory:\")) as destino:\n    con.backup(destino)\n    print(destino.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone())",
        "hint": "backup copia el contenido de la base seleccionada.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/backup",
    "remember": "La conexión de destino recibe la copia.",
    "note": "No uses como origen una conexión con una escritura pendiente que impida completar el respaldo.",
    "examples": [
      {
        "id": "sqlite3/copias-y-exportacion-de-bases/backup/1",
        "title": "Crear un respaldo en disco",
        "language": "python",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as carpeta:\n    ruta = Path(carpeta) / \"respaldo.db\"\n    with closing(sqlite3.connect(ruta)) as destino:\n        con.backup(destino, pages=2)\n    with closing(sqlite3.connect(ruta)) as verificacion:\n        print(verificacion.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "pages define el tamaño de cada paso de copia; progress puede observar el avance.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/iterdump",
    "remember": "El resultado es texto SQL, no un archivo binario.",
    "note": "Python 3.13+ admite filter para seleccionar objetos por patrón LIKE; considera dependencias de claves foráneas.",
    "examples": [
      {
        "id": "sqlite3/copias-y-exportacion-de-bases/iterdump/1",
        "title": "Reconstruir desde un script",
        "language": "python",
        "code": "script = \"\\n\".join(con.iterdump())\nwith closing(sqlite3.connect(\":memory:\")) as destino:\n    destino.executescript(script)\n    print(destino.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone())",
        "hint": "El volcado incluye estructura y registros.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/copias-y-exportacion-de-bases/serialize-y-deserialize",
    "remember": "No equivale a JSON ni a un dump SQL.",
    "note": "Python 3.11+ y compilación con las API de serialización de SQLite. No deserialices durante una transacción de lectura o respaldo activo.",
    "examples": [
      {
        "id": "sqlite3/copias-y-exportacion-de-bases/serialize-y-deserialize/1",
        "title": "Clonar una base con bytes",
        "language": "python",
        "code": "datos = con.serialize()\nwith closing(sqlite3.connect(\":memory:\")) as destino:\n    destino.deserialize(datos)\n    print(destino.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "La conexión de destino queda asociada a la base deserializada.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
