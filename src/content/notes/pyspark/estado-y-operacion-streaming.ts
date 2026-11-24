// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/definicion",
    "remember": "No reutilices checkpoints entre consultas incompatibles.",
    "examples": [
      {
        "id": "pyspark/estado-y-operacion-streaming/definicion/1",
        "title": "Persistir una salida de streaming",
        "language": "python",
        "code": "s = spark.readStream.schema(\"id INT, amount INT\").json(str(base / \"events\"))\nq = s.writeStream.format(\"parquet\").option(\"path\",str(base / \"stream_out\")).option(\"checkpointLocation\",str(base / \"stream_cp\")).trigger(availableNow=True).start()\nq.awaitTermination()\nprint(spark.read.parquet(str(base / \"stream_out\")).count())",
        "hint": "",
        "textOutput": "2 filas; reiniciar con el mismo checkpoint y sin nuevos archivos no debería añadir registros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/stream-static-y-stream-stream-joins",
    "remember": "El soporte de outer joins y modos de salida depende de la operación.",
    "examples": [
      {
        "id": "pyspark/estado-y-operacion-streaming/stream-static-y-stream-stream-joins/1",
        "title": "Enriquecer un flujo con clientes",
        "language": "python",
        "code": "s = spark.readStream.format(\"rate\").load().select((F.col(\"value\")%5+1).cast(\"int\").alias(\"customer_id\"))\ns.join(customers,\"customer_id\",\"inner\").printSchema()",
        "hint": "",
        "textOutput": "customer_id, name, country y signup_date; los eventos reciben atributos al ejecutar la consulta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/foreachbatch-e-idempotencia",
    "remember": "Por defecto la escritura personalizada puede repetirse; deduplica por batch_id o por clave según el destino.",
    "note": "Las garantías exactly-once dependen de fuente, checkpoint y sink; foreachBatch ofrece al menos una ejecución y exige diseñar idempotencia.",
    "examples": [
      {
        "id": "pyspark/estado-y-operacion-streaming/foreachbatch-e-idempotencia/1",
        "title": "Guardar cada lote en ruta propia",
        "language": "python",
        "code": "def write_batch(df,batch_id):\n    df.write.mode(\"overwrite\").parquet(str(base / \"batches\" / str(batch_id)))\ns = spark.readStream.schema(\"id INT, amount INT\").json(str(base / \"events\"))\nq = s.writeStream.foreachBatch(write_batch).option(\"checkpointLocation\",str(base / \"batch_cp\")).trigger(availableNow=True).start()\nq.awaitTermination()",
        "hint": "",
        "textOutput": "Se escriben los dos eventos en uno o más directorios de lote; reintentar el mismo lote reemplaza su ruta en lugar de duplicarla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/control-y-monitoreo",
    "remember": "processAllAvailable es útil en pruebas con entradas finitas, no como espera indefinida de fuentes activas.",
    "note": "Usa un nombre nuevo si se repite en la misma sesión.",
    "examples": [
      {
        "id": "pyspark/estado-y-operacion-streaming/control-y-monitoreo/1",
        "title": "Consultar progreso de una consulta terminada",
        "language": "python",
        "code": "s = spark.readStream.schema(\"id INT, amount INT\").json(str(base / \"events\"))\nq = s.writeStream.format(\"memory\").queryName(\"progress_demo\").trigger(availableNow=True).start()\nq.awaitTermination()\nprint(q.isActive)\nprint(q.lastProgress is not None)",
        "hint": "",
        "textOutput": "False, True si se procesó un lote y se generó progreso.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/estado-y-operacion-streaming/state-stores-y-estado-personalizado",
    "remember": "En Spark 4.x, usa la API de estado compatible con tu versión; requiere pandas/PyArrow para la variante pandas.",
    "note": "Ejemplo conceptual: la implementación completa y la firma están en la referencia oficial de transformWithStateInPandas; no es un snippet ejecutable por sí solo.",
    "examples": [
      {
        "id": "pyspark/estado-y-operacion-streaming/state-stores-y-estado-personalizado/1",
        "title": "Diseñar un contador persistente por clave",
        "steps": [
          "definir una clase StatefulProcessor con init, handleInputRows y close",
          "registrar un ValueState por cliente",
          "sumar filas recibidas y emitir el total",
          "llamar grouped.transformWithStateInPandas con esquema de salida, modo de salida y modo de tiempo",
          "iniciar con checkpoint exclusivo."
        ],
        "code": "",
        "external": true,
        "hint": "",
        "textOutput": "Si el cliente 1 recibe dos eventos en el primer lote y uno en el siguiente, el contador persistente debe avanzar de 2 a 3, incluso tras una recuperación compatible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
