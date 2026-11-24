// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/definicion",
    "remember": "Configura la factory antes de crear el cursor.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/definicion/1",
        "title": "Leer una columna por nombre",
        "language": "python",
        "code": "con.row_factory = sqlite3.Row\nfila = con.execute(\"SELECT id, nombre FROM clientes WHERE id = 1\").fetchone()\nprint(fila[\"nombre\"])",
        "hint": "Row permite acceso por nombre y posición.",
        "textOutput": "`Ana`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/sqlite3-row-y-keys",
    "remember": "Row no es un dict, pero dict(row) funciona.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/sqlite3-row-y-keys/1",
        "title": "Convertir una fila a diccionario",
        "language": "python",
        "code": "con.row_factory = sqlite3.Row\nfila = con.execute(\"SELECT id, nombre FROM clientes WHERE id = 1\").fetchone()\nprint(fila.keys(), fila[0], dict(fila))",
        "hint": "Los alias SQL determinan los nombres.",
        "textOutput": "`['id', 'nombre'] 1 {'id': 1, 'nombre': 'Ana'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/row-factory-personalizada",
    "remember": "Obtén los nombres desde description.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/row-factory-personalizada/1",
        "title": "Devolver diccionarios",
        "language": "python",
        "code": "def como_dict(cur, fila):\n    return {c[0]: v for c, v in zip(cur.description, fila)}\ncon.row_factory = como_dict\nprint(con.execute(\"SELECT id, nombre FROM clientes WHERE id = 2\").fetchone())",
        "hint": "La función se aplica por fila.",
        "textOutput": "`{'id': 2, 'nombre': 'Luis'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/namedtuple-y-dataclass",
    "remember": "Alinea los campos de la clase con las columnas.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/namedtuple-y-dataclass/1",
        "title": "Leer un cliente como objeto",
        "language": "python",
        "code": "from collections import namedtuple\nCliente = namedtuple(\"Cliente\", \"id nombre\")\ncur = con.cursor()\ncur.row_factory = lambda cur, fila: Cliente(*fila)\nprint(cur.execute(\"SELECT id, nombre FROM clientes WHERE id = 1\").fetchone().nombre)",
        "hint": "Una dataclass con esos mismos campos puede sustituir a Cliente.",
        "textOutput": "`Ana`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/connection-row-factory-y-cursor-row-factory",
    "remember": "Cambiar la conexión no altera los cursores existentes.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/connection-row-factory-y-cursor-row-factory/1",
        "title": "Comparar dos cursores",
        "language": "python",
        "code": "cur = con.cursor()\ncon.row_factory = sqlite3.Row\nprint(type(cur.execute(\"SELECT 1\").fetchone()).__name__)\nprint(type(con.execute(\"SELECT 1\").fetchone()).__name__)",
        "hint": "Cada cursor conserva su configuración.",
        "textOutput": "`tuple`, `Row`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/representacion-de-resultados/text-factory",
    "remember": "Afecta TEXT, no BLOB.",
    "examples": [
      {
        "id": "sqlite3/representacion-de-resultados/text-factory/1",
        "title": "Recuperar texto como bytes",
        "language": "python",
        "code": "con.text_factory = bytes\nprint(con.execute(\"SELECT nombre FROM clientes WHERE id = 1\").fetchone())",
        "hint": "bytes evita la decodificación habitual a str.",
        "textOutput": "`(b'Ana',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
