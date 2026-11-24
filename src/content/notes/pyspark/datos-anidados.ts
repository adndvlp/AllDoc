// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/definicion",
    "remember": "Conserva la estructura hasta que necesites expandirla.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/definicion/1",
        "title": "Consultar datos anidados",
        "language": "python",
        "code": "nested.select(\"id\",\"person.name\").orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,Ana),(2,Luis).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/arrays-y-pertenencia",
    "remember": "Una lista vacía no es NULL.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/arrays-y-pertenencia/1",
        "title": "Buscar etiqueta vip",
        "language": "python",
        "code": "nested.select(\"id\",F.array_contains(\"tags\",\"vip\").alias(\"vip\"),F.size(\"tags\").alias(\"n\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,true,3),(2,false,0).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/explode-explode-outer-y-posexplode",
    "remember": "Expandir arrays modifica la granularidad.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/explode-explode-outer-y-posexplode/1",
        "title": "Expandir etiquetas incluyendo listas vacías",
        "language": "python",
        "code": "nested.select(\"id\",F.explode_outer(\"tags\").alias(\"tag\")).orderBy(\"id\",\"tag\").show()",
        "hint": "",
        "textOutput": "(1,new),(1,vip),(1,vip),(2,NULL).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/struct-y-withfield",
    "remember": "Los campos de un struct tienen nombres y tipos independientes.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/struct-y-withfield/1",
        "title": "Añadir campo a persona",
        "language": "python",
        "code": "nested.select(F.col(\"person\").withField(\"active\",F.lit(True)).alias(\"person\")).printSchema()",
        "hint": "",
        "textOutput": "person contiene id, name y active boolean.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/mapas-y-acceso-a-elementos",
    "remember": "Los arrays usan posiciones de base 1 en element_at, los mapas usan claves.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/mapas-y-acceso-a-elementos/1",
        "title": "Consultar stock por país",
        "language": "python",
        "code": "nested.select(\"id\",F.element_at(\"stock\",F.lit(\"MX\")).alias(\"mx_stock\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,2),(2,NULL).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/operaciones-entre-arrays-y-maps",
    "remember": "Para claves de map repetidas revisa spark.sql.mapKeyDedupPolicy.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/operaciones-entre-arrays-y-maps/1",
        "title": "Eliminar etiquetas repetidas y ordenar",
        "language": "python",
        "code": "nested.select(\"id\",F.array_sort(F.array_distinct(\"tags\")).alias(\"tags\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,[new,vip]),(2,[]).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/higher-order-functions",
    "remember": "Estas lambdas construyen expresiones Spark, no bucles Python por fila.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/higher-order-functions/1",
        "title": "Convertir etiquetas a mayúsculas",
        "language": "python",
        "code": "nested.select(\"id\",F.transform(\"tags\",lambda x:F.upper(x)).alias(\"tags\")).orderBy(\"id\").show()",
        "hint": "",
        "textOutput": "(1,[VIP,NEW,VIP]),(2,[]).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/sequence",
    "remember": "Se puede combinar con explode para generar fechas o posiciones.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/sequence/1",
        "title": "Generar tres días",
        "language": "python",
        "code": "spark.range(1).select(F.explode(F.sequence(F.to_date(F.lit(\"2026-09-01\")),F.to_date(F.lit(\"2026-09-03\")))).alias(\"day\")).show()",
        "hint": "",
        "textOutput": "2026-09-01,2026-09-02,2026-09-03.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/datos-anidados/filter-aggregate-exists-y-forall",
    "remember": "No confundas F.filter de arrays con DataFrame.filter de filas.",
    "examples": [
      {
        "id": "pyspark/datos-anidados/filter-aggregate-exists-y-forall/1",
        "title": "Contar elementos positivos de una lista",
        "language": "python",
        "code": "d=spark.createDataFrame([([1,-2,3],)],\"values ARRAY<INT>\")\nd.select(F.filter(\"values\",lambda x:x>0).alias(\"positive\"),F.aggregate(\"values\",F.lit(0),lambda a,x:a+x).alias(\"sum\"),F.exists(\"values\",lambda x:x<0).alias(\"negative\")).show()",
        "hint": "",
        "textOutput": "positive=[1,3], sum=2, negative=true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
