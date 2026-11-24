// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/definicion",
    "remember": "Elegir según tamaño de consulta, compatibilidad y uso de memoria.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/definicion/1",
        "title": "Comparar cursor normal y nombrado",
        "language": "python",
        "code": "with conn.cursor() as a, conn.cursor(name=\"demo\") as b:\n    print(type(a).__name__, type(b).__name__)",
        "hint": "Elegir según tamaño de consulta, compatibilidad y uso de memoria.",
        "textOutput": "`Cursor ServerCursor`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/cursor-ordinario",
    "remember": "fetchmany no convierte por sí solo un Cursor en ServerCursor.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/cursor-ordinario/1",
        "title": "Leer los dos primeros resultados",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM pedidos ORDER BY id\")\nprint(cur.fetchmany(2))",
        "hint": "fetchmany no convierte por sí solo un Cursor en ServerCursor.",
        "textOutput": "`[(101,), (102,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/clientcursor",
    "remember": "Sigue pasando valores mediante execute; no concatenar manualmente.",
    "note": "ClientCursor no ofrece resultados binarios ni prepared statements.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/clientcursor/1",
        "title": "Configurar una variable de sesión con parámetro",
        "language": "python",
        "code": "from psycopg import ClientCursor\nwith ClientCursor(conn) as c:\n    c.execute(\"SET LOCAL application_name = %s\", (\"alldoc\",))\n    print(c.execute(\"SHOW application_name\").fetchone())",
        "hint": "Sigue pasando valores mediante execute; no concatenar manualmente.",
        "textOutput": "`('alldoc',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/servercursor",
    "remember": "Útil si el conjunto completo no cabe cómodamente en memoria.",
    "note": "Por defecto necesita una transacción activa y se cierra al finalizarla.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/servercursor/1",
        "title": "Recuperar un lote desde el servidor",
        "language": "python",
        "code": "with conn.cursor(name=\"pedidos_lote\") as c:\n    c.execute(\"SELECT id FROM pedidos ORDER BY id\")\n    print(c.fetchmany(2))\n    print(c.fetchmany(2))",
        "hint": "Útil si el conjunto completo no cabe cómodamente en memoria.",
        "textOutput": "`[(101,), (102,)]`, luego `[(103,), (104,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/itersize",
    "remember": "No es el mismo atributo que arraysize.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/itersize/1",
        "title": "Iterar con lotes pequeños",
        "language": "python",
        "code": "with conn.cursor(name=\"lote2\") as c:\n    c.itersize = 2\n    c.execute(\"SELECT id FROM pedidos ORDER BY id\")\n    print([fila[0] for fila in c])",
        "hint": "No es el mismo atributo que arraysize.",
        "textOutput": "`[101, 102, 103, 104, 105]`; recuperados en lotes de hasta dos durante la iteración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/scroll-y-scrollable",
    "remember": "La posición absoluta es de base cero según la interfaz del cursor.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/scroll-y-scrollable/1",
        "title": "Volver al inicio del resultado",
        "language": "python",
        "code": "with conn.cursor(name=\"navegable\", scrollable=True) as c:\n    c.execute(\"SELECT id FROM pedidos ORDER BY id\")\n    print(c.fetchone())\n    c.scroll(0, mode=\"absolute\")\n    print(c.fetchone())",
        "hint": "La posición absoluta es de base cero según la interfaz del cursor.",
        "textOutput": "`(101,)` dos veces.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/withhold",
    "remember": "Cerrar explícitamente un cursor retenido para liberar recursos del servidor.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/withhold/1",
        "title": "Leer después de confirmar",
        "language": "python",
        "code": "with psycopg.connect(DSN) as c:\n    with c.cursor(name=\"retenido\", withhold=True) as s:\n        s.execute(\"SELECT id FROM pedidos ORDER BY id\")\n        c.commit()\n        print(s.fetchone())",
        "hint": "Cerrar explícitamente un cursor retenido para liberar recursos del servidor.",
        "textOutput": "`(101,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/rawcursor-y-rawservercursor",
    "remember": "No mezclar las dos convenciones de parámetros.",
    "note": "Disponibles desde Psycopg 3.2; tienen limitaciones respecto a los cursores normales.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/rawcursor-y-rawservercursor/1",
        "title": "Usar el marcador nativo",
        "language": "python",
        "code": "from psycopg import RawCursor, RawServerCursor\nwith RawCursor(conn) as c:\n    print(c.execute(\"SELECT $1::int\", (7,)).fetchone())\nwith RawServerCursor(conn, \"raw_demo\") as c:\n    c.execute(\"SELECT $1::int\", (8,))\n    print(c.fetchone())",
        "hint": "No mezclar las dos convenciones de parámetros.",
        "textOutput": "`(7,)`, luego `(8,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/resultados-binarios",
    "remember": "El formato del resultado es independiente del marcador %b.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/resultados-binarios/1",
        "title": "Recuperar un entero binario",
        "language": "python",
        "code": "with conn.cursor(binary=True) as c:\n    print(c.execute(\"SELECT 42::int\").fetchone())",
        "hint": "El formato del resultado es independiente del marcador %b.",
        "textOutput": "`(42,)`; se convierte a int gracias al loader.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/stream",
    "remember": "Consumir el iterador por completo o cerrarlo si se abandona antes.",
    "note": "La conexión queda ocupada mientras dura el stream; el modo por lotes de stream depende de libpq.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/stream/1",
        "title": "Procesar una secuencia de IDs",
        "language": "python",
        "code": "for (n,) in cur.stream(\"SELECT generate_series(1,3)\"):\n    print(n)",
        "hint": "Consumir el iterador por completo o cerrarlo si se abandona antes.",
        "textOutput": "`1`, `2`, `3`, uno por línea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/variantes-de-cursores-y-resultados-grandes/cursor-factory-y-propiedades",
    "remember": "Inspeccionar metadatos no sustituye recuperar las filas.",
    "note": "`pgresult` contiene el resultado de bajo nivel cuando está disponible.",
    "examples": [
      {
        "id": "psycopg/variantes-de-cursores-y-resultados-grandes/cursor-factory-y-propiedades/1",
        "title": "Consultar los metadatos del cursor",
        "language": "python",
        "code": "from psycopg import ClientCursor\nwith psycopg.connect(DSN, cursor_factory=ClientCursor) as c:\n    with c.cursor() as s:\n        s.execute(\"SELECT 1\")\n        print(type(s).__name__, s.connection is c, s.format.name)",
        "hint": "Inspeccionar metadatos no sustituye recuperar las filas.",
        "textOutput": "`ClientCursor True TEXT`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
