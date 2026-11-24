// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/definicion",
    "remember": "Los nombres de tablas y columnas no son parámetros de datos.",
    "examples": [
      {
        "id": "psycopg/composicion-sql-dinamica/definicion/1",
        "title": "Seleccionar una columna variable",
        "language": "python",
        "code": "from psycopg import sql\nquery = sql.SQL(\"SELECT {} FROM clientes ORDER BY id\").format(sql.Identifier(\"nombre\"))\ncur.execute(query)\nprint(cur.fetchall())",
        "hint": "Los nombres de tablas y columnas no son parámetros de datos.",
        "textOutput": "`[('Ana',), ('Luis',), ('Marta',), ('Diego',)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/sql-y-identifier",
    "remember": "No poner entrada del usuario directamente en `SQL()`.",
    "note": "Si los nombres proceden del usuario, validar además que pertenecen a una lista autorizada.",
    "examples": [
      {
        "id": "psycopg/composicion-sql-dinamica/sql-y-identifier/1",
        "title": "Consultar una tabla por nombre",
        "language": "python",
        "code": "from psycopg import sql\ntabla = sql.Identifier(\"alldoc_psycopg\", \"clientes\")\ncur.execute(sql.SQL(\"SELECT COUNT(*) FROM {}\").format(tabla))\nprint(cur.fetchone())",
        "hint": "No poner entrada del usuario directamente en `SQL()`.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/literal",
    "remember": "Para valores normales, preferir parámetros; usar Literal si se requiere una sentencia con valor incorporado.",
    "examples": [
      {
        "id": "psycopg/composicion-sql-dinamica/literal/1",
        "title": "Crear un literal de texto",
        "language": "python",
        "code": "from psycopg import sql\nq = sql.SQL(\"SELECT {}::text\").format(sql.Literal(\"O'Connor\"))\ncur.execute(q)\nprint(cur.fetchone())",
        "hint": "Para valores normales, preferir parámetros; usar Literal si se requiere una sentencia con valor incorporado.",
        "textOutput": "`(\"O'Connor\",)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/placeholder",
    "remember": "Construye el marcador, no su valor.",
    "examples": [
      {
        "id": "psycopg/composicion-sql-dinamica/placeholder/1",
        "title": "Construir un filtro parametrizado",
        "language": "python",
        "code": "from psycopg import sql\nq = sql.SQL(\"SELECT nombre FROM clientes WHERE id={}\").format(sql.Placeholder())\ncur.execute(q, (2,))\nprint(cur.fetchone())",
        "hint": "Construye el marcador, no su valor.",
        "textOutput": "`('Luis',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/composicion-sql-dinamica/format-join-y-composed",
    "remember": "Componer identificadores no sustituye los parámetros de valores.",
    "examples": [
      {
        "id": "psycopg/composicion-sql-dinamica/format-join-y-composed/1",
        "title": "Elegir dos columnas",
        "language": "python",
        "code": "from psycopg import sql\ncols = sql.SQL(\", \").join(map(sql.Identifier, [\"id\", \"nombre\"]))\nq = sql.SQL(\"SELECT {} FROM clientes ORDER BY id LIMIT 2\").format(cols)\nprint(q.as_string(conn))\nprint(cur.execute(q).fetchall())",
        "hint": "Componer identificadores no sustituye los parámetros de valores.",
        "textOutput": "SQL con identificadores entre comillas; `[(1, 'Ana'), (2, 'Luis')]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
