// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/spark-sql/definicion",
    "remember": "Puedes alternar SQL y DataFrames sin exportar datos.",
    "examples": [
      {
        "id": "pyspark/spark-sql/definicion/1",
        "title": "Consultar pedidos",
        "language": "python",
        "code": "orders.createOrReplaceTempView(\"orders\")\nspark.sql(\"SELECT COUNT(*) AS n FROM orders\").show()",
        "hint": "",
        "textOutput": "n=6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-sql/vistas-temporales-y-globales",
    "remember": "Una vista temporal no escribe datos persistentes.",
    "examples": [
      {
        "id": "pyspark/spark-sql/vistas-temporales-y-globales/1",
        "title": "Registrar vista global",
        "language": "python",
        "code": "orders.createOrReplaceGlobalTempView(\"orders_demo\")\nspark.sql(\"SELECT COUNT(*) FROM global_temp.orders_demo\").show()",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-sql/subconsultas-y-ctes",
    "remember": "Un CTE no implica persistencia ni materialización obligatoria.",
    "examples": [
      {
        "id": "pyspark/spark-sql/subconsultas-y-ctes/1",
        "title": "Filtrar gasto por encima del promedio",
        "language": "python",
        "code": "spark.sql(\"\"\"WITH spend AS (SELECT customer_id,SUM(amount) AS total FROM orders GROUP BY customer_id) SELECT * FROM spend WHERE total > (SELECT AVG(total) FROM spend) ORDER BY customer_id\"\"\").show()",
        "hint": "",
        "textOutput": "(2,1000),(3,900).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/spark-sql/catalogo-y-metadatos",
    "remember": "Un nombre de vista no equivale a una ruta de archivos.",
    "examples": [
      {
        "id": "pyspark/spark-sql/catalogo-y-metadatos/1",
        "title": "Comprobar una vista",
        "language": "python",
        "code": "print(spark.catalog.tableExists(\"orders\"))\nprint([t.name for t in spark.catalog.listTables() if t.name==\"orders\"])",
        "hint": "",
        "textOutput": "True y ['orders'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
