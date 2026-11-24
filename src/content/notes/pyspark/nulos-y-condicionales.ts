// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/definicion",
    "remember": "Comparar con == None no sustituye isNull.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/definicion/1",
        "title": "Buscar clientes sin país",
        "language": "python",
        "code": "customers.where(F.col(\"country\").isNull()).select(\"customer_id\").show()",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/fillna-dropna-y-replace",
    "remember": "Especifica columnas para no modificar campos ajenos.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/fillna-dropna-y-replace/1",
        "title": "Completar países faltantes",
        "language": "python",
        "code": "customers.fillna({\"country\":\"Unknown\"}).select(\"customer_id\", \"country\").orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,MX), (2,MX), (3,ES), (4,Unknown), (5,ES).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/coalesce-y-nullif",
    "remember": "No confundas F.coalesce con DataFrame.coalesce de particiones.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/coalesce-y-nullif/1",
        "title": "Normalizar cupones ausentes",
        "language": "python",
        "code": "orders.select(\"order_id\", F.coalesce(\"coupon\", F.lit(\"none\")).alias(\"coupon_label\")).orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,none), (102,SAVE).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/nan-y-eqnullsafe",
    "remember": "En Spark, NaN tiene reglas especiales de comparación.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/nan-y-eqnullsafe/1",
        "title": "Comprobar ambos casos",
        "language": "python",
        "code": "d = spark.createDataFrame([(float(\"nan\"),), (None,)], \"x DOUBLE\")\nd.select(F.isnan(\"x\").alias(\"nan\"), F.col(\"x\").isNull().alias(\"null\")).show()",
        "hint": "",
        "textOutput": "(true,false), (false,true), sin orden garantizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/when-y-otherwise",
    "remember": "Las condiciones se evalúan en el orden escrito; sin otherwise el resto queda NULL.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/when-y-otherwise/1",
        "title": "Clasificar pedidos",
        "language": "python",
        "code": "orders.select(\"order_id\", F.when(F.col(\"amount\") >= 500,\"high\").otherwise(\"low\").alias(\"segment\")).orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "101 high, 102 low, 103 high, 104 low, 105 low, 106 high.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/nulos-y-condicionales/is-not-null-y-nullif",
    "remember": "Los valores vacíos de texto no son NULL hasta que se normalizan.",
    "examples": [
      {
        "id": "pyspark/nulos-y-condicionales/is-not-null-y-nullif/1",
        "title": "Detectar cupones informados",
        "language": "python",
        "code": "orders.where(F.col(\"coupon\").isNotNull()).select(\"order_id\",\"coupon\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "(102,SAVE),(105,SAVE),(106,VIP).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
