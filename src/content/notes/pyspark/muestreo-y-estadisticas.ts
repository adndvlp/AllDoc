// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/definicion",
    "remember": "Una fracción no garantiza un número exacto de filas.",
    "examples": [
      {
        "id": "pyspark/muestreo-y-estadisticas/definicion/1",
        "title": "Tomar una muestra completa",
        "language": "python",
        "code": "print(orders.sample(False,1.0,seed=42).count())",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/sampleby-y-randomsplit",
    "remember": "No uses un split aleatorio si introduce fuga temporal en un modelo.",
    "examples": [
      {
        "id": "pyspark/muestreo-y-estadisticas/sampleby-y-randomsplit/1",
        "title": "Separar datos en dos partes",
        "language": "python",
        "code": "train,test = orders.randomSplit([0.8,0.2],seed=42)\nprint(train.count()+test.count())",
        "hint": "",
        "textOutput": "6; los tamaños individuales no se garantizan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/approxquantile-e-iqr",
    "remember": "Un atípico es una señal para investigar, no necesariamente un error.",
    "examples": [
      {
        "id": "pyspark/muestreo-y-estadisticas/approxquantile-e-iqr/1",
        "title": "Obtener cuartiles exactos en datos pequeños",
        "language": "python",
        "code": "print(orders.approxQuantile(\"amount\",[0.25,0.75],0))",
        "hint": "",
        "textOutput": "[200.0,700.0]; IQR=500.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/muestreo-y-estadisticas/freqitems-y-crosstab",
    "remember": "La cardinalidad de columnas puede hacer muy grande una tabla cruzada.",
    "examples": [
      {
        "id": "pyspark/muestreo-y-estadisticas/freqitems-y-crosstab/1",
        "title": "Contar cruces de cliente y estado",
        "language": "python",
        "code": "orders.stat.crosstab(\"customer_id\",\"status\").orderBy(\"customer_id_status\").show()",
        "hint": "",
        "textOutput": "Columnas customer_id_status,cancelled,completed; filas (1,0,2),(2,1,1),(3,0,2).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
