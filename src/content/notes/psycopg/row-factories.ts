// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/row-factories/definicion",
    "remember": "No cambia la consulta ni los datos almacenados.",
    "examples": [
      {
        "id": "psycopg/row-factories/definicion/1",
        "title": "Leer un cliente como diccionario",
        "language": "python",
        "code": "from psycopg.rows import dict_row\nwith conn.cursor(row_factory=dict_row) as c:\n    print(c.execute(\"SELECT id, nombre FROM clientes WHERE id=1\").fetchone())",
        "hint": "No cambia la consulta ni los datos almacenados.",
        "textOutput": "`{'id': 1, 'nombre': 'Ana'}`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/tuple-row",
    "remember": "Una consulta de una columna sigue devolviendo una tupla de un elemento.",
    "examples": [
      {
        "id": "psycopg/row-factories/tuple-row/1",
        "title": "Recuperar un nombre como tupla",
        "language": "python",
        "code": "from psycopg.rows import tuple_row\nwith conn.cursor(row_factory=tuple_row) as c:\n    print(c.execute(\"SELECT nombre FROM clientes WHERE id=1\").fetchone())",
        "hint": "Una consulta de una columna sigue devolviendo una tupla de un elemento.",
        "textOutput": "`('Ana',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/dict-row",
    "remember": "Usar alias únicos cuando un JOIN tiene columnas de igual nombre.",
    "examples": [
      {
        "id": "psycopg/row-factories/dict-row/1",
        "title": "Acceder por nombre de columna",
        "language": "python",
        "code": "from psycopg.rows import dict_row\nwith conn.cursor(row_factory=dict_row) as c:\n    fila = c.execute(\"SELECT id, nombre FROM clientes WHERE id=2\").fetchone()\n    print(fila[\"nombre\"])",
        "hint": "Usar alias únicos cuando un JOIN tiene columnas de igual nombre.",
        "textOutput": "`Luis`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/namedtuple-row",
    "remember": "Los nombres pueden ajustarse para que sean atributos Python válidos.",
    "examples": [
      {
        "id": "psycopg/row-factories/namedtuple-row/1",
        "title": "Acceder por atributo",
        "language": "python",
        "code": "from psycopg.rows import namedtuple_row\nwith conn.cursor(row_factory=namedtuple_row) as c:\n    fila = c.execute(\"SELECT id, nombre FROM clientes WHERE id=3\").fetchone()\n    print(fila.id, fila.nombre)",
        "hint": "Los nombres pueden ajustarse para que sean atributos Python válidos.",
        "textOutput": "`3 Marta`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/scalar-row",
    "remember": "Seleccionar solo la columna que se necesita.",
    "examples": [
      {
        "id": "psycopg/row-factories/scalar-row/1",
        "title": "Obtener una lista de IDs",
        "language": "python",
        "code": "from psycopg.rows import scalar_row\nwith conn.cursor(row_factory=scalar_row) as c:\n    print(c.execute(\"SELECT id FROM clientes ORDER BY id\").fetchall())",
        "hint": "Seleccionar solo la columna que se necesita.",
        "textOutput": "`[1, 2, 3, 4]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/class-row",
    "remember": "Los nombres de columnas deben coincidir con los argumentos de la clase.",
    "examples": [
      {
        "id": "psycopg/row-factories/class-row/1",
        "title": "Crear objetos Cliente",
        "language": "python",
        "code": "from dataclasses import dataclass\nfrom psycopg.rows import class_row\n@dataclass\nclass Cliente:\n    id: int\n    nombre: str\nwith conn.cursor(row_factory=class_row(Cliente)) as c:\n    print(c.execute(\"SELECT id, nombre FROM clientes WHERE id=1\").fetchone())",
        "hint": "Los nombres de columnas deben coincidir con los argumentos de la clase.",
        "textOutput": "`Cliente(id=1, nombre='Ana')`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/args-row-y-kwargs-row",
    "remember": "Elegir según la firma de la función.",
    "examples": [
      {
        "id": "psycopg/row-factories/args-row-y-kwargs-row/1",
        "title": "Formar una etiqueta de cliente",
        "language": "python",
        "code": "from psycopg.rows import args_row, kwargs_row\ndef etiqueta(id, nombre):\n    return f\"{id}: {nombre}\"\nfor factory in (args_row(etiqueta), kwargs_row(etiqueta)):\n    with conn.cursor(row_factory=factory) as c:\n        print(c.execute(\"SELECT id, nombre FROM clientes WHERE id=1\").fetchone())",
        "hint": "Elegir según la firma de la función.",
        "textOutput": "`1: Ana` dos veces.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/row-factory-en-conexion-y-cursor",
    "remember": "Cambiar la fábrica antes de recuperar filas de la consulta pertinente.",
    "examples": [
      {
        "id": "psycopg/row-factories/row-factory-en-conexion-y-cursor/1",
        "title": "Usar diccionarios en toda la sesión salvo un cursor",
        "language": "python",
        "code": "from psycopg.rows import dict_row, tuple_row\nwith psycopg.connect(DSN, row_factory=dict_row) as c:\n    print(c.execute(\"SELECT 1 AS n\").fetchone())\n    with c.cursor(row_factory=tuple_row) as t:\n        print(t.execute(\"SELECT 1 AS n\").fetchone())",
        "hint": "Cambiar la fábrica antes de recuperar filas de la consulta pertinente.",
        "textOutput": "`{'n': 1}`, luego `(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/row-factories/custom-row-factories",
    "remember": "La fábrica puede usar description para conocer las columnas.",
    "examples": [
      {
        "id": "psycopg/row-factories/custom-row-factories/1",
        "title": "Convertir cada fila en una etiqueta",
        "language": "python",
        "code": "def etiquetas(cursor):\n    return lambda values: f\"{values[0]} - {values[1]}\"\nwith conn.cursor(row_factory=etiquetas) as c:\n    print(c.execute(\"SELECT id, nombre FROM clientes WHERE id=1\").fetchone())",
        "hint": "La fábrica puede usar description para conocer las columnas.",
        "textOutput": "`1 - Ana`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
