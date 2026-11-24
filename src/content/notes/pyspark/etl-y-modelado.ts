// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/definicion",
    "remember": "Separa entrada, reglas de limpieza y salida reproducible.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/definicion/1",
        "title": "Preparar un resumen de ventas",
        "language": "python",
        "code": "raw = spark.read.parquet(str(base / \"orders.parquet\"))\nclean = raw.where(\"amount > 0 AND status = 'completed'\")\nclean.groupBy(\"customer_id\").agg(F.sum(\"amount\").alias(\"total\")).orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,700),(2,700),(3,900).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/cargas-incrementales-e-idempotencia",
    "remember": "Un watermark de extracción no sustituye reglas para cambios tardíos y eliminaciones.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/cargas-incrementales-e-idempotencia/1",
        "title": "Seleccionar pedidos desde una fecha de corte",
        "language": "python",
        "code": "orders.where(F.col(\"order_date\") >= F.lit(\"2026-09-01\")).select(\"order_id\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "104,105,106. Reprocesar el intervalo requiere reemplazarlo o hacer upsert, no append ciego.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/hechos-dimensiones-y-esquema-estrella",
    "remember": "Declara qué representa cada fila antes de calcular métricas.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/hechos-dimensiones-y-esquema-estrella/1",
        "title": "Enriquecer hechos con dimensión",
        "language": "python",
        "code": "orders.join(customers,\"customer_id\").select(\"order_id\",\"country\",\"amount\").orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,MX,500),(102,MX,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/bronze-silver-y-gold",
    "remember": "Las capas deben tener contratos y controles de calidad.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/bronze-silver-y-gold/1",
        "title": "Crear tres capas en rutas locales",
        "language": "python",
        "code": "bronze = spark.read.parquet(str(base / \"orders.parquet\"))\nsilver = bronze.where(\"amount > 0\")\ngold = silver.where(\"status = 'completed'\").groupBy(\"customer_id\").agg(F.sum(\"amount\").alias(\"total\"))\ngold.write.mode(\"overwrite\").parquet(str(base / \"gold\"))",
        "hint": "",
        "textOutput": "Una salida Gold con 3 clientes y 2300 de ventas totales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/data-lake-warehouse-y-lakehouse",
    "remember": "Parquet por sí solo no aporta transacciones de tabla ni MERGE.",
    "note": "Requiere instalar y configurar el proveedor; no hay un comando universal para los tres.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/data-lake-warehouse-y-lakehouse/1",
        "title": "Inspeccionar capacidades de una tabla",
        "steps": [
          "elegir un proveedor de tabla compatible",
          "registrar un catálogo de prueba",
          "escribir una tabla",
          "consultar su historial, esquema y operaciones soportadas según documentación del proveedor."
        ],
        "code": "",
        "external": true,
        "hint": "",
        "textOutput": "Se obtiene una tabla gestionada con las capacidades ofrecidas por el proveedor, no por todo DataFrame genérico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/etl-y-modelado/cohortes-retencion-y-metricas-temporales",
    "remember": "Define población, periodo y denominador antes de escribir código.",
    "examples": [
      {
        "id": "pyspark/etl-y-modelado/cohortes-retencion-y-metricas-temporales/1",
        "title": "Identificar mes de primera compra",
        "language": "python",
        "code": "orders.where(\"status = 'completed'\").groupBy(\"customer_id\").agg(F.trunc(F.min(\"order_date\"),\"month\").alias(\"cohort\")).orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,2026-08-01),(2,2026-08-01),(3,2026-09-01).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
