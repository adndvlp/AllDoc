// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/definicion",
    "remember": "Primero esquema y muestra; después análisis.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/definicion/1",
        "title": "Inspeccionar pedidos",
        "language": "python",
        "code": "orders.printSchema()\norders.orderBy(\"order_id\").show(2)",
        "hint": "",
        "textOutput": "order_id y customer_id enteros, amount entero, order_date date, status string, coupon string; se muestran 101 y 102.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/columns-dtypes-y-schema",
    "remember": "`schema` incluye información de nulabilidad y campos anidados.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/columns-dtypes-y-schema/1",
        "title": "Consultar columnas",
        "language": "python",
        "code": "print(orders.columns)",
        "hint": "",
        "textOutput": "['order_id', 'customer_id', 'amount', 'order_date', 'status', 'coupon'].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/count-first-head-y-take",
    "remember": "Sin orden explícito, la primera fila no tiene significado de negocio.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/count-first-head-y-take/1",
        "title": "Recuperar dos IDs",
        "language": "python",
        "code": "print(orders.select(\"order_id\").orderBy(\"order_id\").take(2))\nprint(orders.count())",
        "hint": "",
        "textOutput": "[Row(order_id=101), Row(order_id=102)] y 6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/collect-y-tolocaliterator",
    "remember": "Evita ambos para materializar grandes datos en memoria local.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/collect-y-tolocaliterator/1",
        "title": "Recuperar una muestra controlada",
        "language": "python",
        "code": "print(orders.select(\"order_id\").orderBy(\"order_id\").limit(2).collect())",
        "hint": "",
        "textOutput": "Dos Rows con IDs 101 y 102.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/describe-y-summary",
    "remember": "Son resúmenes exploratorios, no sustituyen validaciones.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/describe-y-summary/1",
        "title": "Resumir importes",
        "language": "python",
        "code": "orders.select(\"amount\").summary(\"count\", \"min\", \"max\").show()",
        "hint": "",
        "textOutput": "count=6, min=100, max=800 (como texto en summary).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/inspeccion-y-acciones/isempty-y-samesemantics",
    "remember": "Para comparar datos, usa pruebas o diferencias entre filas.",
    "examples": [
      {
        "id": "pyspark/inspeccion-y-acciones/isempty-y-samesemantics/1",
        "title": "Comprobar un filtro vacío",
        "language": "python",
        "code": "print(orders.filter(F.col(\"amount\") < 0).isEmpty())\nprint(orders.sameSemantics(orders))",
        "hint": "",
        "textOutput": "True, True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
