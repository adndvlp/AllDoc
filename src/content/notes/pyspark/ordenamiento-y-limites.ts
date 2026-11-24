// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/definicion",
    "remember": "Para un top N reproducible, ordena antes de limitar.",
    "examples": [
      {
        "id": "pyspark/ordenamiento-y-limites/definicion/1",
        "title": "Obtener dos pedidos mayores",
        "language": "python",
        "code": "orders.orderBy(F.desc(\"amount\"), \"order_id\").select(\"order_id\", \"amount\").limit(2).show()",
        "hint": "",
        "textOutput": "(106,800), (103,700).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/asc-desc-y-desempate",
    "remember": "Sin desempate único, el orden de los empates puede variar.",
    "examples": [
      {
        "id": "pyspark/ordenamiento-y-limites/asc-desc-y-desempate/1",
        "title": "Ordenar fecha e ID",
        "language": "python",
        "code": "orders.orderBy(F.col(\"order_date\").asc(), F.col(\"order_id\").desc()).select(\"order_id\").show()",
        "hint": "",
        "textOutput": "101, 103, 102, 104, 105, 106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ordenamiento-y-limites/nulos-y-offset",
    "remember": "Offset tiene sentido con orden explícito; disponible desde Spark 3.4.",
    "examples": [
      {
        "id": "pyspark/ordenamiento-y-limites/nulos-y-offset/1",
        "title": "Mostrar la segunda página",
        "language": "python",
        "code": "orders.orderBy(\"order_id\").offset(2).limit(2).select(\"order_id\").show()",
        "hint": "",
        "textOutput": "103,104.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
