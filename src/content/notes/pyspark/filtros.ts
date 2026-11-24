// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/filtros/definicion",
    "remember": "NULL o false no superan el filtro.",
    "examples": [
      {
        "id": "pyspark/filtros/definicion/1",
        "title": "Filtrar por importe",
        "language": "python",
        "code": "orders.filter(F.col(\"amount\") > 300).select(\"order_id\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "101,103,106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/filtros/operadores-y-condiciones-compuestas",
    "remember": "`and`, `or` y `not` de Python no combinan Columns.",
    "examples": [
      {
        "id": "pyspark/filtros/operadores-y-condiciones-compuestas/1",
        "title": "Filtrar pedidos completados costosos",
        "language": "python",
        "code": "orders.where((F.col(\"status\") == \"completed\") & (F.col(\"amount\") >= 500)).select(\"order_id\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "101,103,106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/filtros/isin-y-between",
    "remember": "Para negar una condición, usa ~ sobre la expresión.",
    "examples": [
      {
        "id": "pyspark/filtros/isin-y-between/1",
        "title": "Seleccionar clientes e importes",
        "language": "python",
        "code": "orders.where(F.col(\"customer_id\").isin(1,2) & F.col(\"amount\").between(200,500)).select(\"order_id\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "101,102,105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/filtros/like-rlike-y-texto",
    "remember": "Un patrón regex no usa los mismos comodines que LIKE.",
    "examples": [
      {
        "id": "pyspark/filtros/like-rlike-y-texto/1",
        "title": "Buscar nombres que empiezan por A",
        "language": "python",
        "code": "customers.where(F.col(\"name\").like(\"A%\")).select(\"name\").show()",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/filtros/not-or-y-precedencia",
    "remember": "Los nulos siguen la lógica de tres valores; negar una comparación no recupera automáticamente los nulos.",
    "examples": [
      {
        "id": "pyspark/filtros/not-or-y-precedencia/1",
        "title": "Seleccionar cancelados o pedidos menores a 200",
        "language": "python",
        "code": "orders.where((F.col(\"status\")==\"cancelled\") | (F.col(\"amount\")<200)).select(\"order_id\").orderBy(\"order_id\").show()",
        "hint": "",
        "textOutput": "104 y 105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
