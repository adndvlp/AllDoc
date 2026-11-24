// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/definicion",
    "remember": "Las transformaciones devuelven otro DataFrame.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/definicion/1",
        "title": "Mostrar campos",
        "language": "python",
        "code": "orders.select(\"order_id\", \"amount\").orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,500), (102,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/col-lit-y-alias",
    "remember": "Una cadena pasada a col es nombre de columna, no texto literal.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/col-lit-y-alias/1",
        "title": "Añadir una moneda",
        "language": "python",
        "code": "orders.select(F.col(\"amount\").alias(\"total\"), F.lit(\"MXN\").alias(\"currency\")).orderBy(\"total\").show(1)",
        "hint": "",
        "textOutput": "total=100, currency=MXN.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/selectexpr-y-expr",
    "remember": "Útiles si ya sabes SQL; no interpolar texto no confiable.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/selectexpr-y-expr/1",
        "title": "Calcular un importe",
        "language": "python",
        "code": "orders.selectExpr(\"order_id\", \"amount * 2 AS double\").orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101,1000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/withcolumn-y-withcolumns",
    "remember": "Cada expresión de withColumns referencia el DataFrame de entrada.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/withcolumn-y-withcolumns/1",
        "title": "Crear dos indicadores",
        "language": "python",
        "code": "orders.withColumns({\"double\": F.col(\"amount\")*2, \"paid\": F.col(\"status\")==\"completed\"}).select(\"order_id\", \"double\", \"paid\").orderBy(\"order_id\").show(1)",
        "hint": "",
        "textOutput": "101,1000,true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/renombrar-y-eliminar",
    "remember": "No alteran el DataFrame original.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/renombrar-y-eliminar/1",
        "title": "Renombrar importe y quitar cupón",
        "language": "python",
        "code": "print(orders.withColumnRenamed(\"amount\", \"total\").drop(\"coupon\").columns)",
        "hint": "",
        "textOutput": "order_id, customer_id, total, order_date, status.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/seleccionar-y-modificar-columnas/transform",
    "remember": "Separa una transformación reutilizable de la consulta principal.",
    "examples": [
      {
        "id": "pyspark/seleccionar-y-modificar-columnas/transform/1",
        "title": "Reutilizar un filtro",
        "language": "python",
        "code": "def completed(df):\n    return df.filter(F.col(\"status\") == \"completed\")\nprint(orders.transform(completed).count())",
        "hint": "",
        "textOutput": "5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
