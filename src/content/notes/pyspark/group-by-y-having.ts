// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/group-by-y-having/definicion",
    "remember": "La clave de agrupación decide la granularidad.",
    "examples": [
      {
        "id": "pyspark/group-by-y-having/definicion/1",
        "title": "Contar pedidos por cliente",
        "language": "python",
        "code": "orders.groupBy(\"customer_id\").count().orderBy(\"customer_id\").show()",
        "hint": "",
        "textOutput": "(1,2), (2,2), (3,2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/group-by-y-having/varias-columnas",
    "remember": "Agrupar por cliente y estado distingue dos estados del mismo cliente.",
    "examples": [
      {
        "id": "pyspark/group-by-y-having/varias-columnas/1",
        "title": "Contar por cliente y estado",
        "language": "python",
        "code": "orders.groupBy(\"customer_id\",\"status\").count().orderBy(\"customer_id\",\"status\").show()",
        "hint": "",
        "textOutput": "(1,completed,2), (2,cancelled,1), (2,completed,1), (3,completed,2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/group-by-y-having/having-y-filtros",
    "remember": "El filtro posterior trabaja sobre los agregados, no sobre cada pedido.",
    "examples": [
      {
        "id": "pyspark/group-by-y-having/having-y-filtros/1",
        "title": "Encontrar clientes con gasto completado mayor a 700",
        "language": "python",
        "code": "orders.where(F.col(\"status\")==\"completed\").groupBy(\"customer_id\").agg(F.sum(\"amount\").alias(\"spent\")).where(F.col(\"spent\")>700).show()",
        "hint": "",
        "textOutput": "(3,900).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/group-by-y-having/rollup-cube-y-groupingsets",
    "remember": "Usa grouping/grouping_id para distinguir subtotales de nulos reales.",
    "examples": [
      {
        "id": "pyspark/group-by-y-having/rollup-cube-y-groupingsets/1",
        "title": "Contar pedidos y total general",
        "language": "python",
        "code": "orders.rollup(\"status\").agg(F.count(\"*\").alias(\"n\"), F.grouping(\"status\").alias(\"subtotal\")).orderBy(\"subtotal\",\"status\").show()",
        "hint": "",
        "textOutput": "cancelled=1, completed=5, total general=NULL,6 con subtotal=1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/group-by-y-having/groupingsets-y-cube",
    "remember": "No confundas un subtotal con un valor faltante de una dimensión.",
    "examples": [
      {
        "id": "pyspark/group-by-y-having/groupingsets-y-cube/1",
        "title": "Contar por estado y total",
        "language": "python",
        "code": "orders.groupingSets([(\"status\",),()],\"status\").agg(F.count(\"*\").alias(\"n\")).orderBy(F.col(\"status\").asc_nulls_last()).show()",
        "hint": "",
        "textOutput": "(cancelled,1),(completed,5),(NULL,6).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
