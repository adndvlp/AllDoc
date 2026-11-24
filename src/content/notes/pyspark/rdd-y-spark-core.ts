// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/definicion",
    "remember": "Para datos tabulares, prefiere DataFrames; RDD es útil para lógica de bajo nivel en Spark clásico.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/definicion/1",
        "title": "Crear una colección distribuida",
        "language": "python",
        "code": "rdd = spark.sparkContext.parallelize([1,2,3],2)\nprint(rdd.collect())",
        "hint": "",
        "textOutput": "[1,2,3].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/map-flatmap-y-filter",
    "remember": "Estas funciones Python operan sobre objetos, no sobre Column.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/map-flatmap-y-filter/1",
        "title": "Separar etiquetas",
        "language": "python",
        "code": "rdd = spark.sparkContext.parallelize([\"vip new\",\"vip\"])\nprint(rdd.flatMap(str.split).distinct().sortBy(lambda x:x).collect())",
        "hint": "",
        "textOutput": "['new','vip'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/reduce-reducebykey-y-aggregatebykey",
    "remember": "La función de combinación debe ser asociativa; reduceByKey suele mover menos datos que groupByKey.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/reduce-reducebykey-y-aggregatebykey/1",
        "title": "Sumar ventas por clave",
        "language": "python",
        "code": "rdd = spark.sparkContext.parallelize([(1,500),(1,200),(2,700)])\nprint(rdd.reduceByKey(lambda a,b:a+b).sortByKey().collect())",
        "hint": "",
        "textOutput": "[(1,700),(2,700)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/groupbykey-join-y-sortbykey",
    "remember": "Evita groupByKey para sumas simples; puede acumular muchos valores en memoria.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/groupbykey-join-y-sortbykey/1",
        "title": "Unir ventas con nombres",
        "language": "python",
        "code": "a = spark.sparkContext.parallelize([(1,500),(2,700)])\nb = spark.sparkContext.parallelize([(1,\"Ana\"),(2,\"Luis\")])\nprint(a.join(b).sortByKey().collect())",
        "hint": "",
        "textOutput": "[(1,(500,'Ana')),(2,(700,'Luis'))].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/mappartitions-y-foreachpartition",
    "remember": "Los efectos externos pueden repetirse si falla y se reintenta una tarea.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/mappartitions-y-foreachpartition/1",
        "title": "Contar elementos por partición",
        "language": "python",
        "code": "rdd = spark.sparkContext.parallelize([1,2,3,4],2)\nprint(rdd.mapPartitions(lambda it:[sum(1 for _ in it)]).collect())",
        "hint": "",
        "textOutput": "[2,2].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/acciones-y-lectura-de-rdd",
    "remember": "No uses collect para archivos grandes ni foreach para devolver resultados al driver.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/acciones-y-lectura-de-rdd/1",
        "title": "Leer un archivo pequeño",
        "language": "python",
        "code": "rdd = spark.sparkContext.textFile(str(base / \"sample.csv\"))\nprint(rdd.take(2))",
        "hint": "",
        "textOutput": "['id,amount','1,100'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/broadcast-variables-y-accumulators",
    "remember": "No uses acumuladores como registro exacto de negocio ante reintentos o reevaluaciones.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/broadcast-variables-y-accumulators/1",
        "title": "Aplicar un factor compartido",
        "language": "python",
        "code": "bc = spark.sparkContext.broadcast(2)\nprint(spark.sparkContext.parallelize([1,2,3]).map(lambda x:x*bc.value).collect())\nbc.destroy()",
        "hint": "",
        "textOutput": "[2,4,6].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/lineage-y-checkpoint-de-rdd",
    "remember": "Llama una acción después de marcar el checkpoint para materializarlo.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/lineage-y-checkpoint-de-rdd/1",
        "title": "Consultar dependencias",
        "language": "python",
        "code": "rdd = spark.sparkContext.parallelize([1,2,3]).map(lambda x:x*2)\nprint(rdd.toDebugString())",
        "hint": "",
        "textOutput": "Una representación de las dependencias del RDD, con nombres e IDs que varían.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/rdd-y-spark-core/accumulators",
    "remember": "No uses acumuladores para conteos críticos; agrega el dataset directamente.",
    "examples": [
      {
        "id": "pyspark/rdd-y-spark-core/accumulators/1",
        "title": "Contar elementos en una acción pequeña",
        "language": "python",
        "code": "acc=spark.sparkContext.accumulator(0)\nspark.sparkContext.parallelize([1,2,3]).foreach(lambda x:acc.add(1))\nprint(acc.value)",
        "hint": "",
        "textOutput": "3 en una ejecución local sin fallos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
