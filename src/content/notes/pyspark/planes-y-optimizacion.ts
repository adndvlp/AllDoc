// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/planes-y-optimizacion/definicion",
    "remember": "Optimiza con evidencia del plan y métricas, no únicamente por intuición.",
    "examples": [
      {
        "id": "pyspark/planes-y-optimizacion/definicion/1",
        "title": "Consultar plan extendido",
        "language": "python",
        "code": "orders.where(\"amount > 300\").select(\"order_id\").explain(\"extended\")",
        "hint": "",
        "textOutput": "Se muestran planes lógico inicial, analizado, optimizado y físico; los detalles varían.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/planes-y-optimizacion/estrategias-de-join-y-hints",
    "remember": "Broadcast solo es razonable para un lado que cabe en memoria; un hint no es garantía absoluta.",
    "examples": [
      {
        "id": "pyspark/planes-y-optimizacion/estrategias-de-join-y-hints/1",
        "title": "Difundir tabla de clientes",
        "language": "python",
        "code": "orders.join(F.broadcast(customers),\"customer_id\").explain()",
        "hint": "",
        "textOutput": "Normalmente BroadcastHashJoin para esta unión equi-join pequeña.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/planes-y-optimizacion/predicate-pushdown-y-pruning",
    "remember": "El soporte depende de la fuente, filtros y plan.",
    "examples": [
      {
        "id": "pyspark/planes-y-optimizacion/predicate-pushdown-y-pruning/1",
        "title": "Inspeccionar lectura selectiva",
        "language": "python",
        "code": "spark.read.parquet(str(base / \"orders.parquet\")).where(\"amount > 300\").select(\"order_id\").explain(\"formatted\")",
        "hint": "",
        "textOutput": "El escaneo normalmente muestra esquema de lectura reducido y filtros enviados o evaluados según la fuente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/planes-y-optimizacion/aqe-estadisticas-y-coste",
    "remember": "Mide el plan final y no asumas que el inicial será idéntico.",
    "examples": [
      {
        "id": "pyspark/planes-y-optimizacion/aqe-estadisticas-y-coste/1",
        "title": "Consultar AQE y CBO",
        "language": "python",
        "code": "print(spark.conf.get(\"spark.sql.adaptive.enabled\"))\nprint(spark.conf.get(\"spark.sql.cbo.enabled\"))",
        "hint": "",
        "textOutput": "true y false en el entorno configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/planes-y-optimizacion/small-files-y-tamano-de-particiones",
    "remember": "El número de archivos de salida no siempre coincide exactamente con particiones; evita coalesce(1) en grandes volúmenes.",
    "examples": [
      {
        "id": "pyspark/planes-y-optimizacion/small-files-y-tamano-de-particiones/1",
        "title": "Reducir archivos en datos pequeños",
        "language": "python",
        "code": "p = base / \"compact\"\norders.coalesce(1).write.mode(\"overwrite\").parquet(str(p))\nprint(len(list(p.glob(\"part-*.parquet\"))))",
        "hint": "",
        "textOutput": "1 archivo de datos en este ejemplo local pequeño.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
