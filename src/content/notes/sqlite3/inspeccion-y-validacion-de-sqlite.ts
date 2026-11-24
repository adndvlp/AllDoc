// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/definicion",
    "remember": "Consulta el esquema antes de asumir nombres.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/definicion/1",
        "title": "Listar tablas",
        "language": "python",
        "code": "print(con.execute(\"SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name\").fetchall())",
        "hint": "sqlite_schema es el catálogo de objetos.",
        "textOutput": "`[('clientes',), ('contactos',), ('pedidos',)]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-table-info-y-table-list",
    "remember": "table_xinfo incluye columnas generadas u ocultas.",
    "note": "table_list requiere SQLite 3.37+.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/pragma-table-info-y-table-list/1",
        "title": "Inspeccionar tablas y columnas",
        "language": "python",
        "code": "print([r[1] for r in con.execute(\"PRAGMA table_info(clientes)\")])\nprint(sorted(r[1] for r in con.execute(\"PRAGMA table_list\") if r[0] == \"main\" and not r[1].startswith(\"sqlite_\")))",
        "hint": "Extraemos los nombres de los resultados de PRAGMA.",
        "textOutput": "`['id', 'nombre', 'pais']`; `['clientes', 'contactos', 'pedidos']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-keys",
    "remember": "Habilita antes de iniciar una transacción.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-keys/1",
        "title": "Rechazar un cliente inexistente",
        "language": "python",
        "code": "print(con.execute(\"PRAGMA foreign_keys\").fetchone())\ntry:\n    con.execute(\"INSERT INTO pedidos VALUES (999, 99, 100, '2026-08-01', 'completado')\")\nexcept sqlite3.IntegrityError:\n    print(\"Cliente inexistente\")",
        "hint": "La demo habilita esta comprobación al conectar.",
        "textOutput": "`(1,)`, `Cliente inexistente`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-key-list",
    "remember": "Distingue declaración de activación.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/pragma-foreign-key-list/1",
        "title": "Inspeccionar relación de pedidos",
        "language": "python",
        "code": "for fila in con.execute(\"PRAGMA foreign_key_list(pedidos)\"):\n    print(fila[2:5])",
        "hint": "Las posiciones 2 a 4 identifican tabla destino, columna origen y columna destino.",
        "textOutput": "`('clientes', 'cliente_id', 'id')`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-integrity-check-y-foreign-key-check",
    "remember": "Una prueba no sustituye a la otra.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/pragma-integrity-check-y-foreign-key-check/1",
        "title": "Validar la demo",
        "language": "python",
        "code": "print(con.execute(\"PRAGMA integrity_check\").fetchall())\nprint(con.execute(\"PRAGMA foreign_key_check\").fetchall())",
        "hint": "La lista vacía indica que no hay violaciones detectadas.",
        "textOutput": "`[('ok',)]`, `[]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/pragma-index-list-e-index-info",
    "remember": "Comprueba índices existentes antes de duplicarlos.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/pragma-index-list-e-index-info/1",
        "title": "Inspeccionar un índice compuesto",
        "language": "python",
        "code": "con.execute(\"CREATE INDEX ix_pedidos ON pedidos(cliente_id, fecha)\")\nprint([r[1] for r in con.execute(\"PRAGMA index_list(pedidos)\")])\nprint([r[2] for r in con.execute(\"PRAGMA index_info(ix_pedidos)\")])",
        "hint": "El orden de columnas del índice importa.",
        "textOutput": "`['ix_pedidos']`; `['cliente_id', 'fecha']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/inspeccion-y-validacion-de-sqlite/attach-y-detach-database",
    "remember": "Usa esquema.tabla para distinguir bases.",
    "examples": [
      {
        "id": "sqlite3/inspeccion-y-validacion-de-sqlite/attach-y-detach-database/1",
        "title": "Consultar una base auxiliar",
        "language": "python",
        "code": "con.execute(\"ATTACH DATABASE ? AS auxiliar\", (\":memory:\",))\ncon.execute(\"CREATE TABLE auxiliar.metas(monto INTEGER)\")\ncon.execute(\"INSERT INTO auxiliar.metas VALUES (10000)\")\nprint(con.execute(\"SELECT monto FROM auxiliar.metas\").fetchone())\nprint([r[1] for r in con.execute(\"PRAGMA database_list\")])\ncon.execute(\"DETACH DATABASE auxiliar\")",
        "hint": "DETACH libera la base auxiliar.",
        "textOutput": "`(10000,)`; `['main', 'auxiliar']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
