// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/definicion",
    "remember": "Selecciona solo lo necesario y agrega en el servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/rendimiento-y-procesamiento-por-lotes/definicion/1",
        "title": "Transferir un resumen en lugar de todas las filas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT status, COUNT(*) FROM orders GROUP BY status ORDER BY status\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('cancelled', 1), ('completed', 4)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/streaming-y-fetchmany",
    "remember": "No uses fetchall para resultados enormes si solo necesitas procesarlos secuencialmente.",
    "examples": [
      {
        "id": "mysql-connector-python/rendimiento-y-procesamiento-por-lotes/streaming-y-fetchmany/1",
        "title": "Contar filas por lotes",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=False) as cur:\n    cur.execute(\"SELECT order_id FROM orders ORDER BY order_id\")\n    while lote := cur.fetchmany(2):\n        print(len(lote))",
        "hint": "",
        "textOutput": "2, 2, 1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/inserciones-por-lotes",
    "remember": "Ajusta el tamaño según memoria, max_allowed_packet y duración de la transacción.",
    "examples": [
      {
        "id": "mysql-connector-python/rendimiento-y-procesamiento-por-lotes/inserciones-por-lotes/1",
        "title": "Insertar en lotes de dos",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"CREATE TEMPORARY TABLE lab_batch (id INT PRIMARY KEY)\")\n    filas = [(i,) for i in range(1,6)]\n    for i in range(0,len(filas),2):\n        cur.executemany(\"INSERT INTO lab_batch VALUES (%s)\", filas[i:i+2])\n    cnx.commit()\n    cur.execute(\"SELECT COUNT(*) FROM lab_batch\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "(5,).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/explain-e-indices",
    "remember": "No evalúes el rendimiento por una sola medición ni por el número de líneas de Python.",
    "examples": [
      {
        "id": "mysql-connector-python/rendimiento-y-procesamiento-por-lotes/explain-e-indices/1",
        "title": "Inspeccionar un acceso por clave",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"EXPLAIN SELECT * FROM orders WHERE order_id=101\")\n    print(cur.column_names)\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "Columnas del plan y una fila de acceso a orders; el optimizador puede usar PRIMARY.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/rendimiento-y-procesamiento-por-lotes/medicion",
    "remember": "Distingue ejecución, transferencia y transformación; repite mediciones representativas.",
    "examples": [
      {
        "id": "mysql-connector-python/rendimiento-y-procesamiento-por-lotes/medicion/1",
        "title": "Medir consulta y recuperación",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    from time import perf_counter\n    inicio = perf_counter()\n    cur.execute(\"SELECT * FROM orders\")\n    filas = cur.fetchall()\n    print(len(filas), perf_counter()-inicio)",
        "hint": "",
        "textOutput": "5 y una duración variable en segundos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
