// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/definicion",
    "remember": "Una fila representa un registro; una columna representa un campo.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/definicion/1",
        "title": "Crear una tabla mínima",
        "language": "python",
        "code": "spark.createDataFrame([(1, \"Ana\"), (2, \"Luis\")], \"id INT, name STRING\").show()",
        "hint": "",
        "textOutput": "Columnas id, name; filas (1, Ana), (2, Luis).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/createdataframe-y-row",
    "remember": "El esquema puede inferirse o declararse.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/createdataframe-y-row/1",
        "title": "Crear registros con nombre",
        "language": "python",
        "code": "spark.createDataFrame([Row(id=1, name=\"Ana\")]).show()",
        "hint": "",
        "textOutput": "Una fila: id=1, name=Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/structtype-y-structfield",
    "remember": "Un esquema explícito evita inferencias incorrectas.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/structtype-y-structfield/1",
        "title": "Declarar un esquema",
        "language": "python",
        "code": "schema = T.StructType([T.StructField(\"id\", T.IntegerType(), False), T.StructField(\"name\", T.StringType(), True)])\nspark.createDataFrame([(1, \"Ana\")], schema).printSchema()",
        "hint": "",
        "textOutput": "id integer no nullable; name string nullable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-de-datos",
    "remember": "Usa DecimalType para importes exactos; DoubleType para mediciones aproximadas.",
    "note": "Para fechas y timestamps, usa date/datetime de Python o convierte columnas con funciones Spark.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/tipos-de-datos/1",
        "title": "Crear un importe exacto",
        "language": "python",
        "code": "spark.createDataFrame([(Decimal(\"12.30\"), True)], \"amount DECIMAL(10,2), paid BOOLEAN\").show()",
        "hint": "",
        "textOutput": "amount=12.30, paid=true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-anidados",
    "remember": "No confundas una columna array con varias filas.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/tipos-anidados/1",
        "title": "Crear datos anidados",
        "language": "python",
        "code": "spark.createDataFrame([([\"a\", \"b\"], {\"mx\": 2}, (1, \"Ana\"))], \"tags ARRAY<STRING>, stock MAP<STRING,INT>, person STRUCT<id:INT,name:STRING>\").printSchema()",
        "hint": "",
        "textOutput": "Tres columnas con tipos array, map y struct, respectivamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/range-y-column",
    "remember": "`F.col` referencia un campo; no devuelve sus valores como una lista.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/range-y-column/1",
        "title": "Construir una expresión",
        "language": "python",
        "code": "spark.range(3).select((F.col(\"id\") * 2).alias(\"double\")).show()",
        "hint": "",
        "textOutput": "double=0,2,4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/dataframe-y-esquema/tipos-nulos-intervalos-y-tipos-definidos-por-usuario",
    "remember": "Para almacenamiento persistente, convierte NullType a un tipo concreto.",
    "examples": [
      {
        "id": "pyspark/dataframe-y-esquema/tipos-nulos-intervalos-y-tipos-definidos-por-usuario/1",
        "title": "Tipar una columna inicialmente nula",
        "language": "python",
        "code": "spark.range(1).select(F.lit(None).cast(\"string\").alias(\"comment\")).printSchema()",
        "hint": "",
        "textOutput": "comment string nullable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
