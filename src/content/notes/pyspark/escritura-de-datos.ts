// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/escritura-de-datos/definicion",
    "remember": "Escribir es una acción; utiliza destinos de prueba aislados.",
    "examples": [
      {
        "id": "pyspark/escritura-de-datos/definicion/1",
        "title": "Guardar pedidos como Parquet",
        "language": "python",
        "code": "path = str(base / \"write_demo\")\norders.write.mode(\"overwrite\").parquet(path)\nprint(spark.read.parquet(path).count())",
        "hint": "",
        "textOutput": "6 filas y esquema conservado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/escritura-de-datos/formatos-y-modos",
    "remember": "Overwrite puede eliminar datos; limita el alcance al destino correcto.",
    "examples": [
      {
        "id": "pyspark/escritura-de-datos/formatos-y-modos/1",
        "title": "Guardar CSV con encabezado",
        "language": "python",
        "code": "p = str(base / \"csv_out\")\norders.select(\"order_id\").write.format(\"csv\").option(\"header\",True).mode(\"overwrite\").save(p)\nprint(spark.read.option(\"header\",True).csv(p).count())",
        "hint": "",
        "textOutput": "6 filas; Spark escribe un directorio con archivos part-*, no un único CSV.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/escritura-de-datos/orc-avro-y-compresion",
    "remember": "Avro requiere que el módulo spark-avro correspondiente esté disponible.",
    "examples": [
      {
        "id": "pyspark/escritura-de-datos/orc-avro-y-compresion/1",
        "title": "Guardar en ORC",
        "language": "python",
        "code": "p = str(base / \"orc_out\")\norders.write.mode(\"overwrite\").option(\"compression\",\"snappy\").orc(p)\nprint(spark.read.orc(p).count())",
        "hint": "",
        "textOutput": "6 filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/escritura-de-datos/partitionby-bucketing-y-sorting",
    "remember": "No confundas particiones de archivos, de ejecución y de ventanas.",
    "examples": [
      {
        "id": "pyspark/escritura-de-datos/partitionby-bucketing-y-sorting/1",
        "title": "Separar archivos por estado",
        "language": "python",
        "code": "p = base / \"by_status\"\norders.write.mode(\"overwrite\").partitionBy(\"status\").parquet(str(p))\nprint(sorted(x.name for x in p.glob(\"status=*\")))",
        "hint": "",
        "textOutput": "['status=cancelled','status=completed'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
