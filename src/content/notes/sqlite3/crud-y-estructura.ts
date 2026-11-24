// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/definicion",
    "remember": "Usa parámetros para los datos y transacciones para cambios relacionados.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/definicion/1",
        "title": "Leer el total de ventas",
        "language": "python",
        "code": "print(con.execute(\"SELECT SUM(monto) FROM pedidos WHERE estado = ?\", (\"completado\",)).fetchone())",
        "hint": "El cálculo se realiza en SQLite.",
        "textOutput": "`(43000,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/create-table-y-create-index",
    "remember": "Un índice no sustituye las restricciones.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/create-table-y-create-index/1",
        "title": "Preparar una tabla de métricas",
        "language": "python",
        "code": "con.execute(\"CREATE TABLE metricas (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL)\")\ncon.execute(\"CREATE INDEX ix_metricas_nombre ON metricas(nombre)\")\nprint(con.execute(\"SELECT name FROM sqlite_schema WHERE name LIKE '%metricas%' ORDER BY name\").fetchall())",
        "hint": "Los nombres aparecen en el catálogo de SQLite.",
        "textOutput": "`[('ix_metricas_nombre',), ('metricas',)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/insert-into",
    "remember": "Vincula datos Python con placeholders.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/insert-into/1",
        "title": "Agregar un cliente",
        "language": "python",
        "code": "con.execute(\"INSERT INTO clientes(id, nombre, pais) VALUES (?, ?, ?)\", (5, \"Elena\", \"Spain\"))\nprint(con.execute(\"SELECT nombre FROM clientes WHERE id = 5\").fetchone())",
        "hint": "Con el modo de la demo el cambio se confirma al terminar la sentencia.",
        "textOutput": "`('Elena',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/select",
    "remember": "Usa fetch o iteración para obtener datos.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/select/1",
        "title": "Consultar ventas por cliente",
        "language": "python",
        "code": "sql = \"\"\"SELECT c.nombre, SUM(p.monto)\nFROM clientes c JOIN pedidos p ON c.id = p.cliente_id\nWHERE p.estado = ? GROUP BY c.id ORDER BY c.id\"\"\"\nprint(con.execute(sql, (\"completado\",)).fetchall())",
        "hint": "SQLite hace JOIN y agregación; Python recibe el resultado.",
        "textOutput": "`[('Ana', 20000), ('Luis', 15000), ('Marta', 8000)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/update",
    "remember": "Sin WHERE se modifican todas las filas.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/update/1",
        "title": "Cambiar el país de un cliente",
        "language": "python",
        "code": "con.execute(\"UPDATE clientes SET pais = ? WHERE id = ?\", (\"Mexico\", 4))\nprint(con.execute(\"SELECT pais FROM clientes WHERE id = 4\").fetchone())",
        "hint": "La condición identifica solo al cliente 4.",
        "textOutput": "`('Mexico',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/delete",
    "remember": "Comprueba el filtro antes de ejecutar.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/delete/1",
        "title": "Eliminar un contacto sin correo",
        "language": "python",
        "code": "cur = con.execute(\"DELETE FROM contactos WHERE email IS NULL\")\nprint(cur.rowcount)",
        "hint": "IS NULL selecciona el dato ausente.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/alter-table-y-drop-table",
    "remember": "DDL cambia la estructura, no solo registros.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/alter-table-y-drop-table/1",
        "title": "Añadir una columna y eliminar una tabla auxiliar",
        "language": "python",
        "code": "con.execute(\"ALTER TABLE contactos ADD COLUMN origen TEXT\")\nprint(con.execute(\"PRAGMA table_info(contactos)\").fetchall()[-1][1])\ncon.execute(\"DROP TABLE contactos\")\nprint(con.execute(\"SELECT name FROM sqlite_schema WHERE name = 'contactos'\").fetchone())",
        "hint": "Los cambios se hacen sobre la copia en memoria.",
        "textOutput": "`origen` y `None`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/crud-y-estructura/on-conflict-y-upsert",
    "remember": "UPSERT no es lo mismo que INSERT OR REPLACE.",
    "note": "SQLite 3.24+ para UPSERT. OR REPLACE puede borrar la fila conflictiva antes de insertar; puede afectar relaciones.",
    "examples": [
      {
        "id": "sqlite3/crud-y-estructura/on-conflict-y-upsert/1",
        "title": "Actualizar un cliente si ya existe",
        "language": "python",
        "code": "con.execute(\"\"\"INSERT INTO clientes(id, nombre) VALUES (?, ?)\nON CONFLICT(id) DO UPDATE SET nombre = excluded.nombre\"\"\", (1, \"Ana Maria\"))\nprint(con.execute(\"SELECT nombre FROM clientes WHERE id = 1\").fetchone())",
        "hint": "excluded contiene los valores que se intentaron insertar.",
        "textOutput": "`('Ana Maria',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
