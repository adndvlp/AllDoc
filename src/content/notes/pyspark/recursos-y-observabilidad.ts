// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/definicion",
    "remember": "Mide duración, shuffle, spill y distribución antes de aumentar recursos.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/definicion/1",
        "title": "Consultar interfaz de ejecución",
        "language": "python",
        "code": "orders.count()\nprint(spark.sparkContext.uiWebUrl)",
        "hint": "",
        "textOutput": "Una URL local si la interfaz está habilitada; abre SQL/Stages para revisar la acción.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/memoria-cores-y-asignacion-dinamica",
    "remember": "Más memoria no arregla siempre skew o un collect gigante.",
    "note": "En cluster configura recursos antes de lanzar la aplicación mediante spark-submit o plataforma.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/memoria-cores-y-asignacion-dinamica/1",
        "title": "Consultar configuración de inicio",
        "language": "python",
        "code": "print(spark.sparkContext.getConf().get(\"spark.master\"))\nprint(spark.sparkContext.getConf().get(\"spark.executor.memory\",\"no definida\"))",
        "hint": "",
        "textOutput": "local[2] y no definida salvo configuración externa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/spill-gc-y-oom",
    "remember": "Identifica si falla driver, executor o Python worker antes de ajustar.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/spill-gc-y-oom/1",
        "title": "Diagnosticar una agregación lenta",
        "steps": [
          "ejecutar una agregación",
          "abrir Spark UI > Stages > etapa lenta",
          "revisar Peak Execution Memory, Spill y GC Time."
        ],
        "code": "",
        "external": true,
        "hint": "",
        "textOutput": "Se identifican métricas del stage; los datos pequeños pueden mostrar spill cero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/retries-speculative-execution-y-event-logs",
    "remember": "Las tareas con efectos externos deben tolerar reintentos.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/retries-speculative-execution-y-event-logs/1",
        "title": "Consultar límites de reintento",
        "language": "python",
        "code": "print(spark.sparkContext.getConf().get(\"spark.task.maxFailures\",\"4\"))\nprint(spark.sparkContext.getConf().get(\"spark.speculation\",\"false\"))",
        "hint": "",
        "textOutput": "4 y false como valores de referencia si no se configuraron; el comportamiento local puede diferir.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/observation-y-observe",
    "remember": "Lee las métricas después de la primera acción sobre el DataFrame observado.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/observation-y-observe/1",
        "title": "Medir filas y total",
        "language": "python",
        "code": "from pyspark.sql import Observation\nobs = Observation(\"quality\")\nd = orders.observe(obs,F.count(F.lit(1)).alias(\"rows\"),F.sum(\"amount\").alias(\"total\"))\nd.count()\nprint(obs.get)",
        "hint": "",
        "textOutput": "Diccionario con rows=6 y total=2600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/recursos-y-observabilidad/profiling-y-errores",
    "remember": "Lee la clase de excepción, no solo el texto del stack trace.",
    "note": "Para perfilar UDF en Spark 4.x, consulta spark.sql.pyspark.udf.profiler y spark.profile; no son un sustituto de Spark UI.",
    "examples": [
      {
        "id": "pyspark/recursos-y-observabilidad/profiling-y-errores/1",
        "title": "Identificar una columna inexistente",
        "language": "python",
        "code": "from pyspark.errors import AnalysisException\ntry:\n    orders.select(\"missing\").show()\nexcept AnalysisException as e:\n    print(e.getCondition())",
        "hint": "",
        "textOutput": "UNRESOLVED_COLUMN.WITH_SUGGESTION (o clase equivalente según resolución).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
