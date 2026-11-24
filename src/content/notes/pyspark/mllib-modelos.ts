// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/definicion",
    "remember": "Regresión predice números; clasificación predice clases; clustering agrupa sin etiqueta.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/definicion/1",
        "title": "Ajustar regresión lineal",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.regression import LinearRegression\nd = VectorAssembler(inputCols=[\"x\"],outputCol=\"features\").transform(ml_data)\nm = LinearRegression(labelCol=\"target\").fit(d)\nprint(m.coefficients,m.intercept)",
        "hint": "",
        "textOutput": "Coeficiente aproximadamente 2 e intercepto aproximadamente 0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/clasificacion-y-arboles",
    "remember": "En clasificación binaria la métrica debe considerar desbalance y coste de errores.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/clasificacion-y-arboles/1",
        "title": "Entrenar un árbol de clasificación",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.classification import DecisionTreeClassifier\nd = VectorAssembler(inputCols=[\"x\"],outputCol=\"features\").transform(ml_data)\nm = DecisionTreeClassifier(labelCol=\"label\",maxDepth=2,seed=42).fit(d)\nm.transform(d).select(\"x\",\"prediction\").orderBy(\"x\").show()",
        "hint": "",
        "textOutput": "En este conjunto simple, x=1,2,3 predicen 0 y x=4,5,6 predicen 1; es desempeño sobre entrenamiento.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/clustering",
    "remember": "Escala características si las unidades son muy distintas.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/clustering/1",
        "title": "Agrupar seis observaciones",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.clustering import KMeans\nd = VectorAssembler(inputCols=[\"x\"],outputCol=\"features\").transform(ml_data)\nm = KMeans(k=2,seed=42).fit(d)\nprint(len(m.clusterCenters()))",
        "hint": "",
        "textOutput": "2 centros; sus valores y etiquetas pueden depender del ajuste.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/evaluadores-y-metricas",
    "remember": "Evalúa sobre datos no utilizados para ajustar el modelo.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/evaluadores-y-metricas/1",
        "title": "Calcular RMSE de predicciones conocidas",
        "language": "python",
        "code": "from pyspark.ml.evaluation import RegressionEvaluator\nd = spark.createDataFrame([(2.0,2.0),(4.0,5.0)],\"label DOUBLE, prediction DOUBLE\")\nprint(RegressionEvaluator(metricName=\"rmse\").evaluate(d))",
        "hint": "",
        "textOutput": "Aproximadamente 0.7071.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/crossvalidator-y-trainvalidationsplit",
    "remember": "Ajusta en entrenamiento/validación y conserva una prueba final independiente; el coste crece con combinaciones y folds.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/crossvalidator-y-trainvalidationsplit/1",
        "title": "Construir una cuadrícula",
        "language": "python",
        "code": "from pyspark.ml.regression import LinearRegression\nfrom pyspark.ml.tuning import ParamGridBuilder\nlr = LinearRegression()\ngrid = ParamGridBuilder().addGrid(lr.regParam,[0.0,0.1]).addGrid(lr.maxIter,[10,20]).build()\nprint(len(grid))",
        "hint": "",
        "textOutput": "4 combinaciones; se pasan a CrossValidator o TrainValidationSplit junto con estimador y evaluador.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/guardar-y-cargar-modelos",
    "remember": "Versiona el modelo junto con esquema, preparación y métricas.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/guardar-y-cargar-modelos/1",
        "title": "Persistir un pipeline entrenado",
        "language": "python",
        "code": "from pyspark.ml import Pipeline, PipelineModel\nfrom pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.regression import LinearRegression\nm = Pipeline(stages=[VectorAssembler(inputCols=[\"x\"],outputCol=\"features\"),LinearRegression(labelCol=\"target\")]).fit(ml_data)\np = str(base / \"model\")\nm.write().overwrite().save(p)\nprint(PipelineModel.load(p).transform(ml_data).count())",
        "hint": "",
        "textOutput": "6 predicciones después de recargar el modelo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/mllib-modelos/ajuste-con-validacion-cruzada",
    "remember": "En series temporales, usar folds aleatorios puede producir fuga; construye divisiones adecuadas.",
    "note": "Dataset diminuto didáctico; no usar sus métricas para concluir calidad de producción.",
    "examples": [
      {
        "id": "pyspark/mllib-modelos/ajuste-con-validacion-cruzada/1",
        "title": "Ajustar dos regularizaciones",
        "language": "python",
        "code": "from pyspark.ml.feature import VectorAssembler\nfrom pyspark.ml.regression import LinearRegression\nfrom pyspark.ml.tuning import CrossValidator, ParamGridBuilder\nfrom pyspark.ml.evaluation import RegressionEvaluator\nd=VectorAssembler(inputCols=[\"x\"],outputCol=\"features\").transform(ml_data)\nlr=LinearRegression(labelCol=\"target\")\ncv=CrossValidator(estimator=lr,estimatorParamMaps=ParamGridBuilder().addGrid(lr.regParam,[0.0,0.1]).build(),evaluator=RegressionEvaluator(labelCol=\"target\"),numFolds=2,seed=42)\nprint(len(cv.fit(d).avgMetrics))",
        "hint": "",
        "textOutput": "2 métricas medias, una por configuración, si ambos folds contienen datos suficientes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
