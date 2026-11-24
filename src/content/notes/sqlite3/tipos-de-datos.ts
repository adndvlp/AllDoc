// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/definicion",
    "remember": "None corresponde a NULL; bytes a BLOB.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/definicion/1",
        "title": "Observar los tipos",
        "language": "python",
        "code": "fila = con.execute(\"SELECT NULL, 42, 2.5, 'Ana', x'4142'\").fetchone()\nprint(fila)\nprint([type(v).__name__ for v in fila])",
        "hint": "La conversión ocurre al recuperar valores.",
        "textOutput": "`(None, 42, 2.5, 'Ana', b'AB')`; `['NoneType', 'int', 'float', 'str', 'bytes']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/afinidad-de-tipos",
    "remember": "El tipo real puede diferir del declarado.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/afinidad-de-tipos/1",
        "title": "Observar la afinidad INTEGER",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE prueba(valor INTEGER)\")\ncon.executemany(\"INSERT INTO prueba VALUES (?)\", [(\"123\",), (\"abc\",)])\nprint(con.execute(\"SELECT valor, typeof(valor) FROM prueba ORDER BY rowid\").fetchall())",
        "hint": "El texto numérico se convierte; el otro permanece.",
        "textOutput": "`[(123, 'integer'), ('abc', 'text')]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/strict-tables",
    "remember": "Admite conversiones sin pérdida.",
    "note": "SQLite 3.37+.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/strict-tables/1",
        "title": "Rechazar texto incompatible",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE prueba(valor INTEGER) STRICT\")\ntry:\n    con.execute(\"INSERT INTO prueba VALUES (?)\", (\"abc\",))\nexcept sqlite3.IntegrityError:\n    print(\"Tipo rechazado\")",
        "hint": "Los tipos admitidos son INT, INTEGER, REAL, TEXT, BLOB y ANY.",
        "textOutput": "`Tipo rechazado`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/none-y-null",
    "remember": "NULL no se compara con =.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/none-y-null/1",
        "title": "Buscar país ausente",
        "language": "python",
        "code": "print(con.execute(\"SELECT nombre FROM clientes WHERE pais IS NULL\").fetchall())\nprint(con.execute(\"SELECT nombre FROM clientes WHERE pais = ?\", (None,)).fetchall())",
        "hint": "La igualdad con NULL no devuelve verdadero.",
        "textOutput": "`[('Diego',)]` y `[]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/fechas-y-horas",
    "remember": "Mantén una representación consistente.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/fechas-y-horas/1",
        "title": "Agrupar fechas por mes y medir días",
        "language": "python",
        "code": "print(con.execute(\"SELECT strftime('%Y-%m', fecha), COUNT(*) FROM pedidos GROUP BY 1 ORDER BY 1\").fetchall())\nprint(con.execute(\"SELECT julianday('2026-08-03') - julianday('2026-08-01')\").fetchone())\nprint(con.execute(\"SELECT date('2026-08-01'), datetime('2026-08-01', '+1 day')\").fetchone())",
        "hint": "strftime formatea, julianday convierte a días y date/datetime devuelven texto.",
        "textOutput": "`[('2026-08', 3), ('2026-09', 2)]`; `(2.0,)`; `('2026-08-01', '2026-08-02 00:00:00')`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/rowid-e-integer-primary-key",
    "remember": "No toda PRIMARY KEY es alias de ROWID.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/rowid-e-integer-primary-key/1",
        "title": "Obtener un identificador generado",
        "language": "python",
        "code": "con.execute(\"INSERT INTO clientes(nombre) VALUES ('Elena')\")\nprint(con.execute(\"SELECT rowid, id FROM clientes WHERE nombre = 'Elena'\").fetchone())",
        "hint": "SQLite asigna el identificador omitido.",
        "textOutput": "`(5, 5)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/autoincrement",
    "remember": "INTEGER PRIMARY KEY suele bastar; AUTOINCREMENT cuesta más.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/autoincrement/1",
        "title": "Comprobar que no se reutiliza un id",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE secuencia(id INTEGER PRIMARY KEY AUTOINCREMENT)\")\ncon.execute(\"INSERT INTO secuencia DEFAULT VALUES\")\ncon.execute(\"DELETE FROM secuencia\")\nprint(con.execute(\"INSERT INTO secuencia DEFAULT VALUES\").lastrowid)",
        "hint": "El identificador 1 no se reutiliza.",
        "textOutput": "`2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/tipos-de-datos/without-rowid",
    "remember": "lastrowid no registra inserciones en estas tablas.",
    "examples": [
      {
        "id": "sqlite3/tipos-de-datos/without-rowid/1",
        "title": "Crear una tabla con clave textual",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE codigos(codigo TEXT PRIMARY KEY) WITHOUT ROWID\")\ncon.execute(\"INSERT INTO codigos VALUES ('MX')\")\nprint(con.execute(\"SELECT codigo FROM codigos\").fetchone())",
        "hint": "La clave textual identifica la fila.",
        "textOutput": "`('MX',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
