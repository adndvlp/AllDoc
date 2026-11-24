// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/tablas-y-catalogos/definicion",
    "remember": "Comprueba qué ocurre al borrar una tabla antes de usar DROP TABLE.",
    "note": "Ejecuta únicamente en el entorno local preparado; el nombre es de prueba.",
    "examples": [
      {
        "id": "pyspark/tablas-y-catalogos/definicion/1",
        "title": "Registrar una tabla de práctica",
        "language": "python",
        "code": "orders.write.mode(\"overwrite\").saveAsTable(\"alldoc_orders\")\nprint(spark.table(\"alldoc_orders\").count())",
        "hint": "",
        "textOutput": "6 filas en una tabla gestionada por el catálogo de sesión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tablas-y-catalogos/insertinto-y-saveastable",
    "remember": "Para insertInto, revisa el orden y tipos del destino.",
    "examples": [
      {
        "id": "pyspark/tablas-y-catalogos/insertinto-y-saveastable/1",
        "title": "Añadir una fila a una tabla aislada",
        "language": "python",
        "code": "orders.limit(0).write.mode(\"overwrite\").saveAsTable(\"alldoc_insert\")\norders.where(\"order_id = 101\").write.insertInto(\"alldoc_insert\")\nprint(spark.table(\"alldoc_insert\").count())",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tablas-y-catalogos/dataframewriterv2",
    "remember": "No todos los proveedores admiten reemplazo, escritura dinámica ni MERGE.",
    "note": "Ejemplo externo: requiere catálogo Iceberg llamado demo, namespace sales y dependencias compatibles; no ejecutar contra producción.",
    "examples": [
      {
        "id": "pyspark/tablas-y-catalogos/dataframewriterv2/1",
        "title": "Crear una tabla en catálogo V2",
        "language": "python",
        "code": "orders.writeTo(\"demo.sales.orders\").using(\"iceberg\").createOrReplace()",
        "hint": "",
        "textOutput": "Se crea o reemplaza la tabla de prueba con 6 pedidos si el catálogo y proveedor admiten la operación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tablas-y-catalogos/merge-y-evolucion-de-esquema",
    "remember": "Un DataFrame en memoria no admite UPDATE/DELETE persistente; el proveedor debe soportar operaciones por fila.",
    "note": "Ejemplo externo: ejecutar después de crear la tabla V2 en un proveedor que implemente MERGE; no usar en el catálogo local Parquet por defecto.",
    "examples": [
      {
        "id": "pyspark/tablas-y-catalogos/merge-y-evolucion-de-esquema/1",
        "title": "Actualizar e insertar en una tabla compatible",
        "language": "python",
        "code": "updates = orders.where(\"order_id = 101\").withColumn(\"amount\",F.lit(550))\nupdates.alias(\"s\").mergeInto(\"demo.sales.orders\",F.col(\"s.order_id\")==F.col(\"orders.order_id\")).whenMatched().updateAll().whenNotMatched().insertAll().merge()",
        "hint": "",
        "textOutput": "El pedido 101 queda con amount=550 y no se duplica, si la tabla ya existía con clave única.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/tablas-y-catalogos/namespaces-y-mantenimiento",
    "remember": "Refresh no repara datos ni ejecuta transformaciones de negocio.",
    "examples": [
      {
        "id": "pyspark/tablas-y-catalogos/namespaces-y-mantenimiento/1",
        "title": "Consultar y refrescar una tabla",
        "language": "python",
        "code": "print(spark.catalog.tableExists(\"orders\"))\nspark.catalog.refreshTable(\"orders\")",
        "hint": "",
        "textOutput": "True; la vista existente se refresca sin modificar sus filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
