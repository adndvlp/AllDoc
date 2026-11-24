// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/definicion",
    "remember": "Separa instrucciones de valores.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/definicion/1",
        "title": "Filtrar por nombre",
        "language": "python",
        "code": "nombre = \"Ana\"\nprint(con.execute(\"SELECT id FROM clientes WHERE nombre = ?\", (nombre,)).fetchone())",
        "hint": "La coma forma una tupla de un elemento.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/placeholder",
    "remember": "La cantidad de parámetros debe coincidir.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/placeholder/1",
        "title": "Filtrar por estado y monto",
        "language": "python",
        "code": "filas = con.execute(\"SELECT id FROM pedidos WHERE estado = ? AND monto >= ? ORDER BY id\", (\"completado\", 12000)).fetchall()\nprint(filas)",
        "hint": "No pongas comillas alrededor de ?.",
        "textOutput": "`[(101,), (103,)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/placeholder-nombre",
    "remember": ":nombre en SQL; nombre como clave del diccionario.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/placeholder-nombre/1",
        "title": "Buscar por país",
        "language": "python",
        "code": "filas = con.execute(\"SELECT nombre FROM clientes WHERE pais = :pais ORDER BY id\", {\"pais\": \"Mexico\"}).fetchall()\nprint(filas)",
        "hint": "Permite repetir un nombre de parámetro sin repetir su valor.",
        "textOutput": "`[('Ana',), ('Luis',)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/in-dinamico",
    "remember": "Construye la cantidad de ?, no los valores SQL.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/in-dinamico/1",
        "title": "Buscar varios pedidos",
        "language": "python",
        "code": "ids = [101, 105]\nif ids:\n    marcas = \", \".join(\"?\" for _ in ids)\n    filas = con.execute(f\"SELECT id FROM pedidos WHERE id IN ({marcas}) ORDER BY id\", ids).fetchall()\nelse:\n    filas = []\nprint(filas)",
        "hint": "Se trata la lista vacía explícitamente para mantener la intención.",
        "textOutput": "`[(101,), (105,)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/identificadores-dinamicos",
    "remember": "Selecciona identificadores de una lista permitida.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/identificadores-dinamicos/1",
        "title": "Ordenar por una columna permitida",
        "language": "python",
        "code": "campo = \"nombre\"\npermitidos = {\"nombre\", \"id\"}\nif campo not in permitidos:\n    raise ValueError(\"Columna no permitida\")\nprint(con.execute(f\"SELECT nombre FROM clientes ORDER BY {campo}\").fetchall())",
        "hint": "El texto interpolado se limita a opciones controladas.",
        "textOutput": "`[('Ana',), ('Diego',), ('Luis',), ('Marta',)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/parametros-sql/sql-injection",
    "remember": "No interpolar valores proporcionados por usuarios.",
    "examples": [
      {
        "id": "sqlite3/parametros-sql/sql-injection/1",
        "title": "Buscar texto que contiene comillas",
        "language": "python",
        "code": "nombre = \"Ana' OR 1=1 --\"\nprint(con.execute(\"SELECT id FROM clientes WHERE nombre = ?\", (nombre,)).fetchall())",
        "hint": "El texto completo se interpreta como un nombre, no como una condición SQL.",
        "textOutput": "`[]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
