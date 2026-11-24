// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/definicion",
    "remember": "Driver coordina; executor procesa.",
    "examples": [
      {
        "id": "pyspark/arquitectura-y-ejecucion/definicion/1",
        "title": "Identificar el modo local",
        "language": "python",
        "code": "print(spark.sparkContext.master)",
        "hint": "",
        "textOutput": "`local[2]`: simulación local, no un cluster de dos máquinas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/jobs-stages-y-tasks",
    "remember": "Una task procesa normalmente una partición en un stage.",
    "note": "La cantidad exacta de jobs depende del plan y AQE.",
    "examples": [
      {
        "id": "pyspark/arquitectura-y-ejecucion/jobs-stages-y-tasks/1",
        "title": "Consultar una ejecución",
        "language": "python",
        "code": "orders.groupBy(\"status\").count().show()\nprint(spark.sparkContext.uiWebUrl)",
        "hint": "",
        "textOutput": "Dos grupos: completed=5, cancelled=1. La URL de Spark UI permite inspeccionar jobs y stages.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/lazy-evaluation",
    "remember": "`filter` prepara; `show` ejecuta.",
    "examples": [
      {
        "id": "pyspark/arquitectura-y-ejecucion/lazy-evaluation/1",
        "title": "Separar transformación y acción",
        "language": "python",
        "code": "q = orders.filter(F.col(\"amount\") > 300)\nq.show()",
        "hint": "",
        "textOutput": "Tres pedidos: 101, 103 y 106; el primero en sentido de ID no está garantizado sin ordenar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/dag-y-lineage",
    "remember": "El plan no es una lista de bucles Python.",
    "examples": [
      {
        "id": "pyspark/arquitectura-y-ejecucion/dag-y-lineage/1",
        "title": "Examinar dependencias",
        "language": "python",
        "code": "orders.groupBy(\"customer_id\").count().explain()",
        "hint": "",
        "textOutput": "El plan incluye una agregación y normalmente un intercambio de particiones.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/arquitectura-y-ejecucion/batch-y-streaming",
    "remember": "Un DataFrame de streaming no se trata como una tabla finita.",
    "examples": [
      {
        "id": "pyspark/arquitectura-y-ejecucion/batch-y-streaming/1",
        "title": "Distinguir DataFrames",
        "language": "python",
        "code": "print(orders.isStreaming)\nprint(spark.readStream.format(\"rate\").load().isStreaming)",
        "hint": "",
        "textOutput": "`False`, `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
