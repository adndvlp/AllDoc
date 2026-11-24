// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/ventanas/definicion",
    "remember": "groupBy reduce filas; Window las conserva.",
    "note": "Una ventana global puede concentrar datos en una partición; evita en grandes volúmenes si no es necesaria.",
    "examples": [
      {
        "id": "pyspark/ventanas/definicion/1",
        "title": "Mostrar total global junto a cada pedido",
        "language": "python",
        "code": "w = Window.partitionBy()\norders.select(\"order_id\",F.sum(\"amount\").over(w).alias(\"total\")).orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,2600),(102,2600).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/partition-by-y-order-by",
    "remember": "El orderBy de Window no garantiza el orden de presentación final.",
    "examples": [
      {
        "id": "pyspark/ventanas/partition-by-y-order-by/1",
        "title": "Numerar pedidos dentro de cliente",
        "language": "python",
        "code": "w = Window.partitionBy(\"customer_id\").orderBy(\"order_date\",\"order_id\")\norders.select(\"customer_id\",\"order_id\",F.row_number().over(w).alias(\"n\")).orderBy(\"customer_id\",\"n\").show()",
        "hint": "",
        "textOutput": "(1,101,1),(1,102,2),(2,103,1),(2,105,2),(3,104,1),(3,106,2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/row-number-rank-y-dense-rank",
    "remember": "Para row_number, añade desempate si necesitas un resultado reproducible; para rank no rompas los empates de negocio.",
    "examples": [
      {
        "id": "pyspark/ventanas/row-number-rank-y-dense-rank/1",
        "title": "Comparar rankings con empate",
        "language": "python",
        "code": "d = spark.createDataFrame([(1,100),(2,90),(3,90),(4,80)],\"id INT, score INT\")\nw = Window.orderBy(F.desc(\"score\"))\nd.select(\"id\",F.rank().over(w).alias(\"r\"),F.dense_rank().over(w).alias(\"dr\"),F.row_number().over(Window.orderBy(F.desc(\"score\"),\"id\")).alias(\"rn\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "r=1,2,2,4; dr=1,2,2,3; rn=1,2,3,4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/lag-y-lead",
    "remember": "Sin una fila vecina, el resultado por defecto es NULL.",
    "examples": [
      {
        "id": "pyspark/ventanas/lag-y-lead/1",
        "title": "Comparar pedidos consecutivos",
        "language": "python",
        "code": "w = Window.partitionBy(\"customer_id\").orderBy(\"order_date\",\"order_id\")\norders.select(\"order_id\",F.lag(\"amount\").over(w).alias(\"previous\"),F.lead(\"amount\").over(w).alias(\"next\")).orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,NULL,200), (102,500,NULL).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/rows-y-range",
    "remember": "Con orden y agregación, el marco predeterminado suele ser RANGE hasta la fila actual; empates pueden compartir acumulado.",
    "note": "El orden cronológico usa el ID ascendente para desempatar.",
    "examples": [
      {
        "id": "pyspark/ventanas/rows-y-range/1",
        "title": "Calcular acumulado fila por fila",
        "language": "python",
        "code": "w = Window.orderBy(\"order_date\",\"order_id\").rowsBetween(Window.unboundedPreceding,Window.currentRow)\norders.select(\"order_id\",F.sum(\"amount\").over(w).alias(\"running\")).orderBy(\"order_date\",\"order_id\").show()",
        "hint": "",
        "textOutput": "101=500,102=700,103=1400,104=1500,105=1800,106=2600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/first-last-y-valores-de-ventana",
    "remember": "Para obtener el último de toda la partición, extiende el marco hasta unboundedFollowing.",
    "examples": [
      {
        "id": "pyspark/ventanas/first-last-y-valores-de-ventana/1",
        "title": "Mostrar último importe de cada cliente",
        "language": "python",
        "code": "w = Window.partitionBy(\"customer_id\").orderBy(\"order_date\",\"order_id\").rowsBetween(Window.unboundedPreceding,Window.unboundedFollowing)\norders.select(\"order_id\",F.last_value(\"amount\").over(w).alias(\"last_amount\")).orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "(101,200),(102,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/ntile-percent-rank-y-cume-dist",
    "remember": "No confundas posición relativa con porcentaje del importe total.",
    "examples": [
      {
        "id": "pyspark/ventanas/ntile-percent-rank-y-cume-dist/1",
        "title": "Dividir pedidos en dos niveles",
        "language": "python",
        "code": "w = Window.orderBy(\"amount\",\"order_id\")\norders.select(\"order_id\",F.ntile(2).over(w).alias(\"bucket\")).orderBy(\"bucket\",\"order_id\").show()",
        "hint": "",
        "textOutput": "Grupo 1: 102,104,105; grupo 2: 101,103,106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/top-n-por-grupo",
    "remember": "El ranking debe existir antes de filtrarlo.",
    "examples": [
      {
        "id": "pyspark/ventanas/top-n-por-grupo/1",
        "title": "Obtener pedido mayor por cliente",
        "language": "python",
        "code": "w = Window.partitionBy(\"customer_id\").orderBy(F.desc(\"amount\"),\"order_id\")\norders.withColumn(\"rn\",F.row_number().over(w)).where(\"rn = 1\").select(\"customer_id\",\"order_id\").orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,101),(2,103),(3,106).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/promedios-moviles",
    "remember": "Dos filas no equivalen necesariamente a dos días.",
    "examples": [
      {
        "id": "pyspark/ventanas/promedios-moviles/1",
        "title": "Promediar pedido actual y anterior",
        "language": "python",
        "code": "w = Window.partitionBy(\"customer_id\").orderBy(\"order_date\",\"order_id\").rowsBetween(-1,0)\norders.select(\"order_id\",F.avg(\"amount\").over(w).alias(\"moving_avg\")).orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "101=500.0,102=350.0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/rangebetween",
    "remember": "Dos filas empatadas pueden tener el mismo marco de valores.",
    "examples": [
      {
        "id": "pyspark/ventanas/rangebetween/1",
        "title": "Sumar importes cercanos",
        "language": "python",
        "code": "d=spark.createDataFrame([(100,),(150,),(300,)],\"amount INT\")\nw=Window.orderBy(\"amount\").rangeBetween(-50,0)\nd.select(\"amount\",F.sum(\"amount\").over(w).alias(\"nearby\")).orderBy(\"amount\").show()",
        "hint": "",
        "textOutput": "(100,100),(150,250),(300,300).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/ventanas/percent-rank-y-cume-dist",
    "remember": "Los empates comparten resultados; cume_dist incluye a todos los empatados.",
    "examples": [
      {
        "id": "pyspark/ventanas/percent-rank-y-cume-dist/1",
        "title": "Comparar posiciones relativas",
        "language": "python",
        "code": "d=spark.createDataFrame([(10,),(20,),(30,)],\"amount INT\")\nw=Window.orderBy(\"amount\")\nd.select(\"amount\",F.percent_rank().over(w).alias(\"pr\"),F.cume_dist().over(w).alias(\"cd\")).orderBy(\"amount\").show()",
        "hint": "",
        "textOutput": "10: 0,1/3; 20: 0.5,2/3; 30: 1,1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
