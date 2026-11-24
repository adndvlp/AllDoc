// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/definicion",
    "remember": "Python usa el módulo; SQLite ejecuta SQL.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/definicion/1",
        "title": "Abrir y consultar una base vacía",
        "language": "python",
        "code": "import sqlite3\nwith closing(sqlite3.connect(\":memory:\")) as db:\n    print(db.execute(\"SELECT 1\").fetchone())",
        "hint": "`connect()` devuelve la conexión; `execute()` ejecuta SQL y `fetchone()` recupera una fila. El editor abre `con` con los datos de tienda. Datos muestra los cambios confirmados. Usa Reiniciar entorno para recuperar los datos iniciales.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/connect",
    "remember": "La ruta identifica la base; no hay host ni puerto.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/connect/1",
        "title": "Crear un archivo local",
        "language": "python",
        "code": "from tempfile import TemporaryDirectory\nfrom pathlib import Path\nwith TemporaryDirectory() as carpeta:\n    ruta = Path(carpeta) / \"ventas.db\"\n    with closing(sqlite3.connect(ruta)) as db:\n        db.execute(\"CREATE TABLE prueba(id INTEGER)\")\n    print(ruta.exists())",
        "hint": "Se acepta un objeto de ruta. Las extensiones .db, .sqlite y .sqlite3 son convenciones, no requisitos.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/memory",
    "remember": "Dos conexiones normales a :memory: no comparten datos.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/memory/1",
        "title": "Comprobar el aislamiento",
        "language": "python",
        "code": "with closing(sqlite3.connect(\":memory:\")) as a, \\\n     closing(sqlite3.connect(\":memory:\")) as b:\n    a.execute(\"CREATE TABLE prueba(id INTEGER)\")\n    print(b.execute(\"SELECT count(*) FROM sqlite_schema\").fetchone())",
        "hint": "La tabla solo pertenece a la conexión a.",
        "textOutput": "`(0,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/connection-y-cursor",
    "remember": "La conexión administra transacciones; el cursor consume filas.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/connection-y-cursor/1",
        "title": "Crear un cursor explícito",
        "language": "python",
        "code": "cur = con.cursor()\ncur.execute(\"SELECT nombre FROM clientes WHERE id = 1\")\nprint(cur.fetchone())\ncur.close()",
        "hint": "Puedes crear varios cursores de una conexión.",
        "textOutput": "`('Ana',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/close-y-closing",
    "remember": "Cerrar no equivale a confirmar una transacción.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/close-y-closing/1",
        "title": "Cerrar automáticamente una conexión",
        "language": "python",
        "code": "with closing(abrir_demo()) as db:\n    print(db.execute(\"SELECT COUNT(*) FROM clientes\").fetchone())",
        "hint": "`with con` por sí solo administra transacciones, no cierra la conexión.",
        "textOutput": "`(4,)`; la conexión se cierra al salir.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/uri-y-modos-de-apertura",
    "remember": "ro exige lectura; rw exige archivo existente; rwc permite crearlo.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/uri-y-modos-de-apertura/1",
        "title": "Abrir una base en solo lectura",
        "language": "python",
        "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\nwith TemporaryDirectory() as carpeta:\n    ruta = Path(carpeta) / \"ventas.db\"\n    with closing(sqlite3.connect(ruta)) as db:\n        db.execute(\"CREATE TABLE ventas(id INTEGER)\")\n    with closing(sqlite3.connect(ruta.as_uri() + \"?mode=ro\", uri=True)) as db:\n        print(db.execute(\"SELECT COUNT(*) FROM ventas\").fetchone())",
        "hint": "El modo ro protege contra escrituras accidentales.",
        "textOutput": "`(0,)`; una escritura produciría OperationalError.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/conexion-a-sqlite/memoria-compartida",
    "remember": "La base vive mientras quede abierta al menos una conexión.",
    "examples": [
      {
        "id": "sqlite3/conexion-a-sqlite/memoria-compartida/1",
        "title": "Compartir una tabla de prueba",
        "language": "python",
        "code": "uri = \"file:demo?mode=memory&cache=shared\"\nwith closing(sqlite3.connect(uri, uri=True)) as a, \\\n     closing(sqlite3.connect(uri, uri=True)) as b:\n    a.execute(\"CREATE TABLE prueba(id INTEGER)\")\n    print(b.execute(\"SELECT COUNT(*) FROM prueba\").fetchone())",
        "hint": "Ambas conexiones usan exactamente la misma URI.",
        "textOutput": "`(0,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
