// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/definicion",
    "remember": "Los fetch no vuelven a ejecutar el SQL.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/definicion/1",
        "title": "Leer la primera fila de una consulta",
        "language": "python",
        "code": "cur.execute(\"SELECT id, nombre FROM clientes ORDER BY id\")\nprint(cur.fetchone())",
        "hint": "Los fetch no vuelven a ejecutar el SQL.",
        "textOutput": "`(1, 'Ana')`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchone",
    "remember": "Una fila `(None,)` no es lo mismo que no tener fila.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/fetchone/1",
        "title": "Leer un NULL y luego el final",
        "language": "python",
        "code": "cur.execute(\"SELECT pais FROM clientes WHERE id=4\")\nprint(cur.fetchone())\nprint(cur.fetchone())",
        "hint": "Una fila `(None,)` no es lo mismo que no tener fila.",
        "textOutput": "`(None,)`, luego `None`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchmany-y-arraysize",
    "remember": "Avanza el cursor y devuelve lista vacía al agotarse.",
    "note": "En un cursor ordinario el servidor ya envió el resultado; esto no garantiza bajo consumo de memoria.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/fetchmany-y-arraysize/1",
        "title": "Leer dos lotes de clientes",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM clientes ORDER BY id\")\ncur.arraysize = 2\nprint(cur.fetchmany())\nprint(cur.fetchmany())\nprint(cur.fetchmany())",
        "hint": "Avanza el cursor y devuelve lista vacía al agotarse.",
        "textOutput": "`[(1,), (2,)]`, `[(3,), (4,)]`, `[]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/fetchall",
    "remember": "Después de `fetchone()`, no incluye esa fila.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/fetchall/1",
        "title": "Recuperar las filas restantes",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM clientes ORDER BY id\")\nprint(cur.fetchone())\nprint(cur.fetchall())",
        "hint": "Después de `fetchone()`, no incluye esa fila.",
        "textOutput": "`(1,)`, luego `[(2,), (3,), (4,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/iteracion-de-cursor",
    "remember": "La iteración consume el resultado.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/iteracion-de-cursor/1",
        "title": "Recorrer los nombres",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes ORDER BY id\")\nfor (nombre,) in cur:\n    print(nombre)",
        "hint": "La iteración consume el resultado.",
        "textOutput": "Ana, Luis, Marta y Diego, uno por línea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/rowcount-y-statusmessage",
    "remember": "No asumir que rowcount siempre es conocido; para contar datos usar COUNT.",
    "note": "Algunos cursores u operaciones pueden devolver `-1` si se desconoce la cantidad.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/rowcount-y-statusmessage/1",
        "title": "Inspeccionar el resultado de SELECT",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM clientes\")\nprint(cur.rowcount, cur.statusmessage)",
        "hint": "No asumir que rowcount siempre es conocido; para contar datos usar COUNT.",
        "textOutput": "`4 SELECT 4` en cursor ordinario.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/description-y-column",
    "remember": "Permite construir encabezados sin conocerlos previamente.",
    "note": "Es `None` cuando la operación no devuelve filas.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/description-y-column/1",
        "title": "Extraer nombres de columnas",
        "language": "python",
        "code": "cur.execute(\"SELECT id, nombre FROM clientes LIMIT 1\")\nprint([col.name for col in cur.description])",
        "hint": "Permite construir encabezados sin conocerlos previamente.",
        "textOutput": "`['id', 'nombre']`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/rownumber",
    "remember": "La posición es cero antes de recuperar la primera fila.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/rownumber/1",
        "title": "Inspeccionar el avance",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM clientes ORDER BY id\")\nprint(cur.rownumber)\ncur.fetchone()\nprint(cur.rownumber)",
        "hint": "La posición es cero antes de recuperar la primera fila.",
        "textOutput": "`0`, luego `1`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/nextset",
    "remember": "No confundir varias filas con varios conjuntos de resultados.",
    "note": "Con parámetros vinculados en servidor no se admiten varias sentencias en una sola ejecución de esta forma.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/nextset/1",
        "title": "Leer dos SELECT sin parámetros",
        "language": "python",
        "code": "cur.execute(\"SELECT 1; SELECT 2\")\nprint(cur.fetchone())\nprint(cur.nextset())\nprint(cur.fetchone())\nprint(cur.nextset())",
        "hint": "No confundir varias filas con varios conjuntos de resultados.",
        "textOutput": "`(1,)`, `True`, `(2,)`, `None`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/recuperacion-de-resultados/results-y-set-result",
    "remember": "Una consulta puede tener varios conjuntos, no solo varias filas.",
    "note": "Ambas operaciones están disponibles desde Psycopg 3.3. En versiones anteriores, usar `nextset()`.",
    "examples": [
      {
        "id": "psycopg/recuperacion-de-resultados/results-y-set-result/1",
        "title": "Recorrer todos los conjuntos",
        "language": "python",
        "code": "cur.execute(\"SELECT 1; SELECT 2\")\nprint([c.fetchone()[0] for c in cur.results()])",
        "hint": "Cada iteración selecciona el siguiente conjunto.",
        "textOutput": "`[1, 2]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      },
      {
        "id": "psycopg/recuperacion-de-resultados/results-y-set-result/2",
        "title": "Elegir el segundo conjunto directamente",
        "language": "python",
        "code": "cur.execute(\"SELECT 1; SELECT 2\")\nprint(cur.set_result(1).fetchone())",
        "hint": "El índice 1 selecciona el segundo resultado.",
        "textOutput": "`(2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
