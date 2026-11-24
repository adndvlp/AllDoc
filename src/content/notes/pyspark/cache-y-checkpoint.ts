// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/cache-y-checkpoint/definicion",
    "remember": "La caché se materializa al ejecutar una acción y consume recursos.",
    "examples": [
      {
        "id": "pyspark/cache-y-checkpoint/definicion/1",
        "title": "Reutilizar pedidos filtrados",
        "language": "python",
        "code": "d = orders.where(\"status = 'completed'\").cache()\nprint(d.count(),d.is_cached)\nd.unpersist()",
        "hint": "",
        "textOutput": "5, True; después se libera la caché.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/cache-y-checkpoint/storage-levels",
    "remember": "No caches indiscriminadamente DataFrames utilizados una sola vez.",
    "examples": [
      {
        "id": "pyspark/cache-y-checkpoint/storage-levels/1",
        "title": "Persistir en disco",
        "language": "python",
        "code": "from pyspark import StorageLevel\nd = orders.persist(StorageLevel.DISK_ONLY)\nprint(d.count(),d.storageLevel.useDisk)\nd.unpersist()",
        "hint": "",
        "textOutput": "6, True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/cache-y-checkpoint/checkpoint-y-localcheckpoint",
    "remember": "Checkpoint no es caché ni copia de seguridad de negocio.",
    "note": "En cluster usa almacenamiento accesible y fiable; este ejemplo local no cubre recuperación del driver.",
    "examples": [
      {
        "id": "pyspark/cache-y-checkpoint/checkpoint-y-localcheckpoint/1",
        "title": "Cortar un plan largo",
        "language": "python",
        "code": "spark.sparkContext.setCheckpointDir(str(base / \"checkpoints\"))\nd = orders.checkpoint(eager=True)\nprint(d.count())",
        "hint": "",
        "textOutput": "6; se materializa un checkpoint en la ruta indicada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
