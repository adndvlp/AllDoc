// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/definicion",
    "remember": "Parte de datos conocidos y verifica resultados concretos.",
    "examples": [
      {
        "id": "sqlite3/pruebas-y-flujos-reproducibles/definicion/1",
        "title": "Validar una métrica de ventas",
        "language": "python",
        "code": "total = con.execute(\"SELECT SUM(monto) FROM pedidos WHERE estado = 'completado'\").fetchone()[0]\nassert total == 43000\nprint(\"Validación correcta\")",
        "hint": "La prueba falla si cambia la lógica o el dataset.",
        "textOutput": "`Validación correcta`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/aislamiento-de-pruebas",
    "remember": "Una conexión nueva equivale a un estado inicial nuevo en la demo.",
    "examples": [
      {
        "id": "sqlite3/pruebas-y-flujos-reproducibles/aislamiento-de-pruebas/1",
        "title": "Comprobar independencia",
        "language": "python",
        "code": "with closing(abrir_demo()) as a, closing(abrir_demo()) as b:\n    a.execute(\"DELETE FROM contactos\")\n    print(a.execute(\"SELECT COUNT(*) FROM contactos\").fetchone())\n    print(b.execute(\"SELECT COUNT(*) FROM contactos\").fetchone())",
        "hint": "La segunda conexión conserva sus filas originales.",
        "textOutput": "`(0,)`, `(4,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/procesamiento-incremental-y-generadores",
    "remember": "Si origen y destino son distintos, conserva sus cursores separados.",
    "examples": [
      {
        "id": "sqlite3/pruebas-y-flujos-reproducibles/procesamiento-incremental-y-generadores/1",
        "title": "Copiar ids por lotes",
        "language": "python",
        "code": "with closing(sqlite3.connect(\":memory:\", autocommit=False)) as destino:\n    with destino:\n        destino.execute(\"CREATE TABLE ids(id INTEGER PRIMARY KEY)\")\n        cur = con.execute(\"SELECT id FROM pedidos ORDER BY id\")\n        while bloque := cur.fetchmany(2):\n            destino.executemany(\"INSERT INTO ids VALUES (?)\", bloque)\n    print(destino.execute(\"SELECT COUNT(*) FROM ids\").fetchone())",
        "hint": "Cada bloque se inserta sin construir una lista con todos los registros.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/pruebas-y-flujos-reproducibles/cli-de-sqlite3",
    "remember": "La CLI usa el SQLite integrado en Python.",
    "note": "La CLI está disponible desde Python 3.12.",
    "examples": [
      {
        "id": "sqlite3/pruebas-y-flujos-reproducibles/cli-de-sqlite3/1",
        "title": "Consultar desde la terminal",
        "language": "bash",
        "code": "python -m sqlite3 :memory: \"SELECT 2 + 3;\"",
        "hint": "El comando puede recibir una ruta de base de datos y una sentencia SQL. Ejecútalo en una terminal, no dentro del intérprete Python.",
        "textOutput": "`(5,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
