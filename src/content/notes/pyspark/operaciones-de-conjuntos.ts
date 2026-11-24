// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/definicion",
    "remember": "`union()` conserva repetidos, como SQL UNION ALL.",
    "examples": [
      {
        "id": "pyspark/operaciones-de-conjuntos/definicion/1",
        "title": "Combinar dos listas",
        "language": "python",
        "code": "a = spark.createDataFrame([(1,),(2,)],\"id INT\")\nb = spark.createDataFrame([(2,),(3,)],\"id INT\")\na.union(b).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "1,2,2,3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/unionbyname",
    "remember": "No uses union por posición si los esquemas están reordenados.",
    "examples": [
      {
        "id": "pyspark/operaciones-de-conjuntos/unionbyname/1",
        "title": "Combinar tablas con columnas invertidas",
        "language": "python",
        "code": "a = spark.createDataFrame([(1,\"MX\")],\"id INT, country STRING\")\nb = spark.createDataFrame([(\"ES\",2)],\"country STRING, id INT\")\na.unionByName(b).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,MX),(2,ES).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/operaciones-de-conjuntos/intersect-intersectall-subtract-y-exceptall",
    "remember": "Estas operaciones alinean por posición; revisa el orden de columnas.",
    "examples": [
      {
        "id": "pyspark/operaciones-de-conjuntos/intersect-intersectall-subtract-y-exceptall/1",
        "title": "Restar filas preservando multiplicidad",
        "language": "python",
        "code": "a = spark.createDataFrame([(1,),(1,),(2,)],\"id INT\")\nb = spark.createDataFrame([(1,)],\"id INT\")\na.exceptAll(b).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "1,2. Con subtract quedaría solo 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
