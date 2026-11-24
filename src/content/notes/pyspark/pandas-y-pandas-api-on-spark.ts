// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/definicion",
    "remember": "No son equivalentes: pandas local debe caber en memoria del driver.",
    "note": "Requiere pandas; Arrow es opcional para esta conversión pero útil si está configurado.",
    "examples": [
      {
        "id": "pyspark/pandas-y-pandas-api-on-spark/definicion/1",
        "title": "Convertir una muestra",
        "language": "python",
        "code": "pdf = orders.orderBy(\"order_id\").limit(2).select(\"order_id\",\"amount\").toPandas()\nprint(pdf.to_dict(\"records\"))",
        "hint": "",
        "textOutput": "[{'order_id':101,'amount':500},{'order_id':102,'amount':200}].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/dataframe-series-e-index",
    "remember": "Un índice distribuido puede requerir operaciones costosas; no presupongas orden natural.",
    "note": "Requiere pyspark[pandas_on_spark]. Si la sesión usa ANSI, configura temporalmente spark.sql.ansi.enabled=false o compute.fail_on_ansi_mode=false según la documentación; restaura la configuración después.",
    "examples": [
      {
        "id": "pyspark/pandas-y-pandas-api-on-spark/dataframe-series-e-index/1",
        "title": "Convertir y seleccionar",
        "language": "python",
        "code": "old = spark.conf.get(\"spark.sql.ansi.enabled\")\nspark.conf.set(\"spark.sql.ansi.enabled\",\"false\")\ntry:\n    psdf = orders.select(\"order_id\",\"amount\").pandas_api(index_col=\"order_id\")\n    print(psdf.loc[101,\"amount\"])\nfinally:\n    spark.conf.set(\"spark.sql.ansi.enabled\",old)",
        "hint": "",
        "textOutput": "500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/filtros-groupby-y-remodelacion",
    "remember": "Las operaciones con alineación entre DataFrames pueden generar joins o requerir opciones adicionales.",
    "note": "Requiere pandas API on Spark; to_pandas solo en resultados pequeños.",
    "examples": [
      {
        "id": "pyspark/pandas-y-pandas-api-on-spark/filtros-groupby-y-remodelacion/1",
        "title": "Agrupar con sintaxis pandas",
        "language": "python",
        "code": "old = spark.conf.get(\"spark.sql.ansi.enabled\")\nspark.conf.set(\"spark.sql.ansi.enabled\",\"false\")\ntry:\n    psdf = orders.select(\"customer_id\",\"amount\").pandas_api()\n    print(psdf.groupby(\"customer_id\")[\"amount\"].sum().sort_index().to_pandas())\nfinally:\n    spark.conf.set(\"spark.sql.ansi.enabled\",old)",
        "hint": "",
        "textOutput": "Serie local con cliente 1=700, 2=1000, 3=900.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/pandas-y-pandas-api-on-spark/series-temporales-y-rendimiento",
    "remember": "Ordenar globalmente o utilizar un índice secuencial puede provocar shuffle; evita recolectar datos grandes.",
    "note": "Requiere dependencias de pandas API on Spark y configuración ANSI compatible.",
    "examples": [
      {
        "id": "pyspark/pandas-y-pandas-api-on-spark/series-temporales-y-rendimiento/1",
        "title": "Consultar configuración de índice",
        "language": "python",
        "code": "import pyspark.pandas as ps\nprint(ps.get_option(\"compute.default_index_type\"))",
        "hint": "",
        "textOutput": "El tipo de índice predeterminado de la versión/configuración; normalmente distributed-sequence.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
