// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/mllib-preparacion/definicion",
    "remember": "Un modelo entrenado es un Transformer; no ajustes datos de prueba.",
    "examples": [
      {
        "id": "pyspark/mllib-preparacion/definicion/1",
        "title": "Crear vector de características",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler\nva = VectorAssembler(inputCols=[\"x\"],outputCol=\"features\")\nva.transform(ml_data).select(\"x\",\"features\").orderBy(\"x\").show(2)",
        "hint": "",
        "textOutput": "(1.0,[1.0]),(2.0,[2.0]).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-preparacion/stringindexer-y-onehotencoder",
    "remember": "No interpretes los índices de categorías como cantidades ordinales.",
    "examples": [
      {
        "id": "pyspark/mllib-preparacion/stringindexer-y-onehotencoder/1",
        "title": "Codificar país",
        "language": "python",
        "code": "from pyspark.ml.feature import StringIndexer, OneHotEncoder\nd = spark.createDataFrame([(\"MX\",),(\"MX\",),(\"ES\",)],\"country STRING\")\ni = StringIndexer(inputCol=\"country\",outputCol=\"index\").fit(d).transform(d)\nOneHotEncoder(inputCols=[\"index\"],outputCols=[\"encoded\"]).fit(i).transform(i).distinct().orderBy(\"index\").show()",
        "hint": "",
        "textOutput": "MX index=0, vector [1.0]; ES index=1, vector [0.0] con dropLast=True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-preparacion/escalamiento",
    "remember": "Ajusta el scaler solo con entrenamiento y reutilízalo en validación y prueba.",
    "examples": [
      {
        "id": "pyspark/mllib-preparacion/escalamiento/1",
        "title": "Escalar valores de 1 a 6",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler, MinMaxScaler\nd = VectorAssembler(inputCols=[\"x\"],outputCol=\"features\").transform(ml_data)\nMinMaxScaler(inputCol=\"features\",outputCol=\"scaled\").fit(d).transform(d).select(\"x\",\"scaled\").orderBy(\"x\").show(2)",
        "hint": "",
        "textOutput": "1.0→[0.0], 2.0→[0.2].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-preparacion/pipeline-estimator-y-transformer",
    "remember": "Guarda y aplica la misma preparación que utilizaste en entrenamiento.",
    "examples": [
      {
        "id": "pyspark/mllib-preparacion/pipeline-estimator-y-transformer/1",
        "title": "Entrenar una regresión sencilla",
        "language": "python",
        "code": "from pyspark.ml import Pipeline\nfrom pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.regression import LinearRegression\np = Pipeline(stages=[VectorAssembler(inputCols=[\"x\"],outputCol=\"features\"),LinearRegression(labelCol=\"target\")])\nmodel = p.fit(ml_data)\nmodel.transform(ml_data).select(\"x\",\"prediction\").orderBy(\"x\").show(2)",
        "hint": "",
        "textOutput": "Predicciones aproximadamente 2.0 y 4.0 para x=1 y 2. Es una demostración de ajuste, no evaluación fuera de muestra.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
