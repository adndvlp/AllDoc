// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/funciones-numericas/definicion",
    "remember": "Haz los cálculos con Columns; no con funciones escalares de Python.",
    "examples": [
      {
        "id": "pyspark/funciones-numericas/definicion/1",
        "title": "Aplicar un descuento",
        "language": "python",
        "code": "orders.select(\"order_id\", (F.col(\"amount\")*0.9).alias(\"net\")).orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101, 450.0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-numericas/round-y-bround",
    "remember": "Elige la regla exigida por el negocio.",
    "examples": [
      {
        "id": "pyspark/funciones-numericas/round-y-bround/1",
        "title": "Comparar reglas de empate",
        "language": "python",
        "code": "spark.range(1).select(F.round(F.lit(2.5)).alias(\"r\"), F.bround(F.lit(2.5)).alias(\"b\")).show()",
        "hint": "",
        "textOutput": "r=3.0, b=2.0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-numericas/abs-ceil-floor-y-matematicas",
    "remember": "El dominio de la función importa.",
    "examples": [
      {
        "id": "pyspark/funciones-numericas/abs-ceil-floor-y-matematicas/1",
        "title": "Calcular diferencias absolutas",
        "language": "python",
        "code": "spark.range(1).select(F.abs(F.lit(-5)).alias(\"a\"), F.ceil(F.lit(2.1)).alias(\"c\"), F.floor(F.lit(2.9)).alias(\"f\")).show()",
        "hint": "",
        "textOutput": "5,3,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/funciones-numericas/division-segura",
    "remember": "NULL no equivale a cero; decide cómo informar un ratio indefinido.",
    "examples": [
      {
        "id": "pyspark/funciones-numericas/division-segura/1",
        "title": "Evitar división entre cero",
        "language": "python",
        "code": "spark.range(1).select(F.try_divide(F.lit(10), F.lit(0)).alias(\"ratio\")).show()",
        "hint": "",
        "textOutput": "NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
