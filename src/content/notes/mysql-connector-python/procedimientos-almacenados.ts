// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/definicion",
    "remember": "Requiere permisos CREATE ROUTINE y EXECUTE según la acción.",
    "note": "Ejecuta en Workbench una sola vez después de USE alldoc_connector_lab; los ejemplos siguientes dependen de él. Elimínalo con DROP PROCEDURE lab_double al terminar.",
    "examples": [
      {
        "id": "mysql-connector-python/procedimientos-almacenados/definicion/1",
        "title": "Preparar un procedimiento de laboratorio",
        "language": "sql",
        "code": "CREATE PROCEDURE lab_double(IN x INT, OUT y INT) SET y = x * 2;",
        "hint": "",
        "textOutput": "Se crea lab_double en la base activa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/callproc-e-in-out-inout",
    "remember": "IN entra, OUT sale e INOUT entra y puede cambiar.",
    "note": "Requiere lab_double de la ficha Definición.",
    "examples": [
      {
        "id": "mysql-connector-python/procedimientos-almacenados/callproc-e-in-out-inout/1",
        "title": "Obtener un parámetro de salida",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    resultado = cur.callproc(\"lab_double\", (7, 0))\n    print(resultado[1])",
        "hint": "",
        "textOutput": "14.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/procedimientos-almacenados/call-y-conjuntos-de-resultados",
    "remember": "stored_results está deprecado desde 9.3; para nuevos scripts con CALL recorre nextset/fetchsets.",
    "note": "Requiere lab_double; para procedimientos que devuelvan filas consume también el primer conjunto.",
    "examples": [
      {
        "id": "mysql-connector-python/procedimientos-almacenados/call-y-conjuntos-de-resultados/1",
        "title": "Ejecutar CALL y recuperar OUT",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CALL lab_double(7,@salida)\")\n    while cur.nextset():\n        if cur.with_rows:\n            cur.fetchall()\n    cur.execute(\"SELECT @salida\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(14,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
