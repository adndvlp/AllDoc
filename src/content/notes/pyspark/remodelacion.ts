// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/remodelacion/definicion",
    "remember": "Cambia la forma de la tabla, no los hechos originales.",
    "examples": [
      {
        "id": "pyspark/remodelacion/definicion/1",
        "title": "Mostrar estados como columnas",
        "language": "python",
        "code": "orders.groupBy(\"customer_id\").pivot(\"status\",[\"completed\",\"cancelled\"]).sum(\"amount\").orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,700,NULL),(2,700,300),(3,900,NULL).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/remodelacion/unpivot-y-melt",
    "remember": "Los tipos de las medidas deben tener un tipo común.",
    "examples": [
      {
        "id": "pyspark/remodelacion/unpivot-y-melt/1",
        "title": "Convertir meses en filas",
        "language": "python",
        "code": "d = spark.createDataFrame([(1,100,200)],\"id INT, aug INT, sep INT\")\nd.unpivot(\"id\",[\"aug\",\"sep\"],\"month\",\"sales\").orderBy(\"month\").show()",
        "hint": "",
        "textOutput": "(1,aug,100),(1,sep,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
