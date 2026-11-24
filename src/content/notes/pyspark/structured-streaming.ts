// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/definicion",
    "remember": "Una consulta de streaming se inicia con writeStream.start(), no con show().",
    "examples": [
      {
        "id": "pyspark/structured-streaming/definicion/1",
        "title": "Crear un flujo de prueba",
        "language": "python",
        "code": "stream = spark.readStream.format(\"rate\").option(\"rowsPerSecond\",2).load()\nprint(stream.isStreaming)\nstream.printSchema()",
        "hint": "",
        "textOutput": "True; timestamp timestamp y value long. No se ha iniciado la consulta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/readstream-writestream-y-triggers",
    "remember": "Cada consulta persistente requiere su propio checkpoint; detén consultas de prueba.",
    "note": "Usa una sesión limpia o un queryName nuevo si repites el ejemplo; el sink memory es solo para demostraciones.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/readstream-writestream-y-triggers/1",
        "title": "Procesar un archivo de entrada disponible",
        "language": "python",
        "code": "stream = spark.readStream.schema(\"id INT, amount INT\").json(str(base / \"events\"))\nq = stream.writeStream.format(\"memory\").queryName(\"stream_demo\").outputMode(\"append\").trigger(availableNow=True).start()\nq.awaitTermination()\nspark.table(\"stream_demo\").orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,100),(2,200) en memoria tras finalizar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/modos-de-salida",
    "remember": "Elige modo según la semántica del destino y el estado de la consulta.",
    "note": "Usa una sesión limpia o un nombre nuevo; no es un destino de producción.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/modos-de-salida/1",
        "title": "Publicar un total acumulado",
        "language": "python",
        "code": "stream = spark.readStream.schema(\"id INT, amount INT\").json(str(base / \"events\"))\nq = stream.agg(F.sum(\"amount\").alias(\"total\")).writeStream.format(\"memory\").queryName(\"stream_total\").outputMode(\"complete\").trigger(availableNow=True).start()\nq.awaitTermination()\nspark.table(\"stream_total\").show()",
        "hint": "",
        "textOutput": "total=300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/fuentes-y-sinks-kafka-y-archivos",
    "remember": "Kafka requiere conector, brokers y gestión de offsets; value suele ser binario.",
    "note": "Ejemplo externo: define brokers y topic de prueba e instala spark-sql-kafka para la versión Spark/Scala correspondiente.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/fuentes-y-sinks-kafka-y-archivos/1",
        "title": "Leer valores de Kafka como texto",
        "language": "python",
        "code": "stream = spark.readStream.format(\"kafka\").option(\"kafka.bootstrap.servers\",brokers).option(\"subscribe\",topic).load()\nstream.selectExpr(\"CAST(value AS STRING) AS message\").printSchema()",
        "hint": "",
        "textOutput": "message string; las filas dependen de los mensajes al iniciar la consulta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/event-time-y-processing-time",
    "remember": "No confundas timestamp de ingestión con el de ocurrencia.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/event-time-y-processing-time/1",
        "title": "Crear una ventana por evento",
        "language": "python",
        "code": "s = spark.readStream.format(\"rate\").load()\ns.groupBy(F.window(\"timestamp\",\"1 minute\")).count().printSchema()",
        "hint": "",
        "textOutput": "Columnas window (struct start/end) y count long; todavía no hay ejecución.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/ventanas-tumbling-sliding-y-session",
    "remember": "Un evento puede contar en varias ventanas sliding; no sumes indiscriminadamente sus resultados.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/ventanas-tumbling-sliding-y-session/1",
        "title": "Definir ventanas deslizantes",
        "language": "python",
        "code": "s = spark.readStream.format(\"rate\").load()\ns.groupBy(F.window(\"timestamp\",\"10 minutes\",\"5 minutes\")).count().printSchema()",
        "hint": "",
        "textOutput": "window con start/end y count. Un evento pertenece a dos ventanas de 10 minutos que comienzan cada 5 minutos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/watermarks-y-datos-tardios",
    "remember": "No es una promesa de aceptar todos los eventos más tardíos que el umbral; depende de operación y progreso.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/watermarks-y-datos-tardios/1",
        "title": "Definir tolerancia y agregación",
        "language": "python",
        "code": "s = spark.readStream.format(\"rate\").load()\ns.withWatermark(\"timestamp\",\"10 minutes\").groupBy(F.window(\"timestamp\",\"5 minutes\")).count().printSchema()",
        "hint": "",
        "textOutput": "Esquema de ventanas y conteos; al ejecutar, Spark podrá liberar estado de ventanas finalizadas según watermark.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/deduplicacion-con-watermark",
    "remember": "La deduplicación ilimitada en streaming puede acumular mucho estado.",
    "note": "Disponible desde Spark 3.5. La fuente rate ya genera valores únicos; úsala para observar estructura, no para simular duplicados.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/deduplicacion-con-watermark/1",
        "title": "Deduplicar identificadores de eventos",
        "language": "python",
        "code": "s = spark.readStream.format(\"rate\").load()\nd = s.withWatermark(\"timestamp\",\"10 minutes\").dropDuplicatesWithinWatermark([\"value\"])\nprint(d.isStreaming)",
        "hint": "",
        "textOutput": "True; se construye un flujo deduplicado por value.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/structured-streaming/session-windows",
    "remember": "Una sesión puede crecer al recibir nuevos eventos; la finalización depende de watermark y modo de salida.",
    "examples": [
      {
        "id": "pyspark/structured-streaming/session-windows/1",
        "title": "Definir sesión de actividad",
        "language": "python",
        "code": "s=spark.readStream.format(\"rate\").load().withColumn(\"customer_id\",F.col(\"value\")%2)\ns.groupBy(\"customer_id\",F.session_window(\"timestamp\",\"5 minutes\")).count().printSchema()",
        "hint": "",
        "textOutput": "customer_id, session_window (start/end) y count.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
