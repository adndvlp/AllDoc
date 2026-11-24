// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/definicion",
    "remember": "No uses multi=True en 9.2+. Consume todos los resultados.",
    "examples": [
      {
        "id": "mysql-connector-python/multiples-instrucciones-y-resultados/definicion/1",
        "title": "Ejecutar dos consultas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT 1; SELECT 2\")\n    print(cur.fetchall())\n    cur.nextset()\n    print(cur.fetchall())\n    cur.nextset()",
        "hint": "",
        "textOutput": "[(1,)] y [(2,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/nextset",
    "remember": "Comprueba with_rows antes de recuperar filas de instrucciones sin resultado.",
    "examples": [
      {
        "id": "mysql-connector-python/multiples-instrucciones-y-resultados/nextset/1",
        "title": "Recorrer instrucciones heterogéneas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SET @x=5; SELECT @x; SELECT 9\")\n    while True:\n        if cur.with_rows:\n            print(cur.fetchall())\n        if not cur.nextset():\n            break",
        "hint": "",
        "textOutput": "[(5,)] y [(9,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/fetchsets-y-map-results",
    "remember": "Sin mapeo no asumas que statement cambia entre resultados.",
    "examples": [
      {
        "id": "mysql-connector-python/multiples-instrucciones-y-resultados/fetchsets-y-map-results/1",
        "title": "Identificar cada SELECT",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT 1; SELECT 2\", map_results=True)\n    for sentencia, filas in cur.fetchsets():\n        print(filas)",
        "hint": "",
        "textOutput": "[(1,)] y [(2,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/archivos-sql",
    "remember": "No ejecutes archivos de usuarios sin validación; el SQL puede modificar datos.",
    "examples": [
      {
        "id": "mysql-connector-python/multiples-instrucciones-y-resultados/archivos-sql/1",
        "title": "Ejecutar un archivo de laboratorio",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    from pathlib import Path\n    from tempfile import TemporaryDirectory\n    with TemporaryDirectory() as tmp:\n        ruta = Path(tmp) / \"consulta.sql\"\n        ruta.write_text(\"SELECT 7; SELECT 8;\", encoding=\"utf-8\")\n        cur.execute(ruta.read_text(encoding=\"utf-8\"))\n        for _, filas in cur.fetchsets():\n            print(filas)",
        "hint": "",
        "textOutput": "[(7,)] y [(8,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/multiples-instrucciones-y-resultados/cambios-desde-9-2",
    "remember": "Consulta __version__ antes de adaptar código antiguo.",
    "examples": [
      {
        "id": "mysql-connector-python/multiples-instrucciones-y-resultados/cambios-desde-9-2/1",
        "title": "Mostrar la versión instalada",
        "language": "python",
        "code": "print(mysql.connector.__version__)",
        "hint": "",
        "textOutput": "Una versión 9.4 o posterior si se sigue el entorno propuesto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
