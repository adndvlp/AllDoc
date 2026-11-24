// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/tipos-y-conversiones/definicion",
    "remember": "Comprueba el tipo original y la configuración ANSI.",
    "examples": [
      {
        "id": "pyspark/tipos-y-conversiones/definicion/1",
        "title": "Convertir importe a decimal",
        "language": "python",
        "code": "orders.select(F.col(\"amount\").cast(\"decimal(10,2)\").alias(\"amount\")).orderBy(\"amount\").show(1)",
        "hint": "",
        "textOutput": "100.00.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tipos-y-conversiones/astype-y-try-cast",
    "remember": "En Spark 4.0+ existe Column.try_cast; el modo ANSI está activo por defecto en Spark 4.x.",
    "examples": [
      {
        "id": "pyspark/tipos-y-conversiones/astype-y-try-cast/1",
        "title": "Convertir texto defectuoso",
        "language": "python",
        "code": "spark.createDataFrame([(\"12\",), (\"x\",)], \"raw STRING\").select(F.col(\"raw\").try_cast(\"int\").alias(\"value\")).show()",
        "hint": "",
        "textOutput": "12, NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tipos-y-conversiones/coercion-ansi-y-sensibilidad-a-mayusculas",
    "remember": "No confíes en conversiones implícitas para datos críticos.",
    "examples": [
      {
        "id": "pyspark/tipos-y-conversiones/coercion-ansi-y-sensibilidad-a-mayusculas/1",
        "title": "Consultar configuración",
        "language": "python",
        "code": "print(spark.conf.get(\"spark.sql.ansi.enabled\"))\nprint(spark.conf.get(\"spark.sql.caseSensitive\"))",
        "hint": "",
        "textOutput": "En la sesión preparada: true y false.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
