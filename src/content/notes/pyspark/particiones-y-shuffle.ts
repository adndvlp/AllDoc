// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/definicion",
    "remember": "Distribuir mejor datos no significa crear tantas particiones como filas.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/definicion/1",
        "title": "Consultar particiones de un rango",
        "language": "python",
        "code": "print(spark.range(10,numPartitions=2).rdd.getNumPartitions())",
        "hint": "",
        "textOutput": "2 en Spark clásico.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/repartition-coalesce-y-repartitionbyrange",
    "remember": "Coalesce no aumenta efectivamente el número de particiones y puede concentrar trabajo.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/repartition-coalesce-y-repartitionbyrange/1",
        "title": "Redistribuir por cliente",
        "language": "python",
        "code": "d = orders.repartition(3,\"customer_id\")\nprint(d.rdd.getNumPartitions())",
        "hint": "",
        "textOutput": "3 con repartition explícito.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/narrow-y-wide-transformations",
    "remember": "Shuffle implica tráfico, serialización y posible disco.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/narrow-y-wide-transformations/1",
        "title": "Comparar filtro y agregación",
        "language": "python",
        "code": "orders.filter(\"amount > 100\").explain()\norders.groupBy(\"customer_id\").count().explain()",
        "hint": "",
        "textOutput": "El segundo plan normalmente contiene Exchange; el primero no necesita intercambio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/ids-de-particiones-y-filas",
    "remember": "No uses estos valores como clave de negocio estable entre ejecuciones.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/ids-de-particiones-y-filas/1",
        "title": "Inspeccionar distribución",
        "language": "python",
        "code": "spark.range(4,numPartitions=2).select(\"id\",F.spark_partition_id().alias(\"partition\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(0,0),(1,0),(2,1),(3,1) en el rango de dos particiones; el ID puede cambiar tras redistribuir.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/data-skew-y-salting",
    "remember": "Primero mide el sesgo; AQE puede resolver parte del problema sin salting manual.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/data-skew-y-salting/1",
        "title": "Detectar claves desiguales",
        "language": "python",
        "code": "d = spark.createDataFrame([(1,)]*5+[(2,)],\"key INT\")\nd.groupBy(\"key\").count().orderBy(F.desc(\"count\")).show()",
        "hint": "",
        "textOutput": "(1,5),(2,1); es una señal de distribución desigual, no prueba suficiente de cuello de botella.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/particiones-y-shuffle/coalesce-y-repartitionbyrange",
    "remember": "Revisa tamaño de particiones y skew antes de compactar.",
    "examples": [
      {
        "id": "pyspark/particiones-y-shuffle/coalesce-y-repartitionbyrange/1",
        "title": "Reducir particiones",
        "language": "python",
        "code": "d=spark.range(10,numPartitions=4).coalesce(2)\nprint(d.rdd.getNumPartitions())",
        "hint": "",
        "textOutput": "2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
