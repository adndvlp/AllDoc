// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/agregacion/definicion",
    "remember": "Sin groupBy, todo el DataFrame es un grupo.",
    "examples": [
      {
        "id": "pyspark/agregacion/definicion/1",
        "title": "Calcular ventas completadas",
        "language": "python",
        "code": "orders.where(F.col(\"status\")==\"completed\").agg(F.sum(\"amount\").alias(\"sales\")).show()",
        "hint": "",
        "textOutput": "sales=2300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/count-y-valores-distintos",
    "remember": "DataFrame.count es acción; F.count es expresión agregada.",
    "examples": [
      {
        "id": "pyspark/agregacion/count-y-valores-distintos/1",
        "title": "Comparar tres conteos",
        "language": "python",
        "code": "orders.agg(F.count(\"*\").alias(\"rows\"), F.count(\"coupon\").alias(\"coupons\"), F.count_distinct(\"customer_id\").alias(\"customers\")).show()",
        "hint": "",
        "textOutput": "6,3,3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/sum-avg-min-y-max",
    "remember": "AVG no divide por todas las filas si hay nulos en la columna.",
    "examples": [
      {
        "id": "pyspark/agregacion/sum-avg-min-y-max/1",
        "title": "Resumir importes",
        "language": "python",
        "code": "orders.agg(F.sum(\"amount\").alias(\"total\"), F.avg(\"amount\").alias(\"avg\"), F.min(\"amount\").alias(\"min\"), F.max(\"amount\").alias(\"max\")).show()",
        "hint": "",
        "textOutput": "2600, 433.333333… ,100,800.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/agregacion-condicional-y-ratios",
    "remember": "No filtres antes si el denominador necesita todas las filas.",
    "examples": [
      {
        "id": "pyspark/agregacion/agregacion-condicional-y-ratios/1",
        "title": "Medir tasa de completados",
        "language": "python",
        "code": "orders.agg(F.round(100*F.avg(F.when(F.col(\"status\")==\"completed\",1).otherwise(0)),2).alias(\"pct\")).show()",
        "hint": "",
        "textOutput": "83.33.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/collect-list-y-collect-set",
    "remember": "El orden tras un shuffle no está garantizado; usa sort_array si importa.",
    "examples": [
      {
        "id": "pyspark/agregacion/collect-list-y-collect-set/1",
        "title": "Listar estados distintos",
        "language": "python",
        "code": "orders.agg(F.sort_array(F.collect_set(\"status\")).alias(\"statuses\")).show(truncate=False)",
        "hint": "",
        "textOutput": "[cancelled, completed].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/estadistica-descriptiva",
    "remember": "Correlación no implica causalidad.",
    "examples": [
      {
        "id": "pyspark/agregacion/estadistica-descriptiva/1",
        "title": "Medir correlación de dos columnas",
        "language": "python",
        "code": "d = spark.createDataFrame([(1,2),(2,4),(3,6)], \"x INT, y INT\")\nd.agg(F.corr(\"x\",\"y\").alias(\"r\"), F.variance(\"x\").alias(\"var\")).show()",
        "hint": "",
        "textOutput": "r=1.0, var=1.0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/agregacion/percentiles-y-aproximaciones",
    "remember": "Las aproximaciones intercambian precisión por coste.",
    "examples": [
      {
        "id": "pyspark/agregacion/percentiles-y-aproximaciones/1",
        "title": "Obtener mediana y cuantil aproximado",
        "language": "python",
        "code": "orders.agg(F.median(\"amount\").alias(\"median\"), F.percentile_approx(\"amount\",0.5).alias(\"p50\")).show()",
        "hint": "",
        "textOutput": "median=400.0; p50 aproximado normalmente 300 con esta muestra. La aproximación no tiene que coincidir con median().",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
