// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/definicion",
    "remember": "Separa entrenamiento y prueba antes de aprender transformaciones.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/definicion/1",
        "title": "Separar observaciones de forma reproducible",
        "language": "r",
        "code": "set.seed(42)\nidx <- sample(seq_len(nrow(mtcars)), 24)\nc(train = nrow(mtcars[idx, ]), test = nrow(mtcars[-idx, ]))",
        "hint": "Los conjuntos no comparten posiciones.",
        "textOutput": "train=24 y test=8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/regresion-y-metricas",
    "remember": "Compara modelos con la misma muestra de evaluación.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/regresion-y-metricas/1",
        "title": "Calcular error de predicción",
        "language": "r",
        "code": "real <- c(100, 200)\npred <- c(90, 220)\nc(MAE = mean(abs(real - pred)), RMSE = sqrt(mean((real - pred)^2)))",
        "hint": "Los errores absolutos son 10 y 20.",
        "textOutput": "MAE=15, RMSE≈15.81.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/clasificacion-y-metricas",
    "remember": "En clases desbalanceadas, accuracy sola puede resultar engañosa.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/clasificacion-y-metricas/1",
        "title": "Calcular precisión y recall",
        "language": "r",
        "code": "real <- c(1, 1, 0, 0)\npred <- c(1, 0, 1, 0)\ntp <- sum(real == 1 & pred == 1)\nc(precision = tp / sum(pred == 1), recall = tp / sum(real == 1))",
        "hint": "Hay un verdadero positivo de dos positivos predichos y dos positivos reales.",
        "textOutput": "Ambos 0.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/arboles-y-random-forest",
    "remember": "Evalúa profundidad, complejidad y desempeño fuera de muestra.",
    "note": "Requiere rpart; ranger permite ajustar random forests.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/arboles-y-random-forest/1",
        "title": "Ajustar un árbol a datos de ejemplo",
        "language": "r",
        "code": "m <- rpart::rpart(Species ~ ., data = iris, method = \"class\")\nlength(predict(m, iris[1:5, ], type = \"class\"))",
        "hint": "Cada fila recibe una clase; aquí solo se muestra la interfaz. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "`5` predicciones categóricas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/clustering",
    "remember": "Escala variables cuando sus unidades sean incompatibles.",
    "note": "Los números de etiqueta no tienen significado ordinal.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/clustering/1",
        "title": "Separar dos grupos claros",
        "language": "r",
        "code": "x <- matrix(c(0, 0, 1, 1, 10, 10, 11, 11), ncol = 2, byrow = TRUE)\nm <- kmeans(x, centers = x[c(1, 3), ])\nsort(as.integer(table(m$cluster)))",
        "hint": "Cada grupo contiene dos puntos.",
        "textOutput": "`c(2, 2)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/validacion-cruzada-y-tuning",
    "remember": "Reserva un conjunto final que no participe en el ajuste ni en el tuning.",
    "note": "Requiere rsample.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/validacion-cruzada-y-tuning/1",
        "title": "Crear cinco particiones",
        "language": "r",
        "code": "set.seed(42)\nf <- rsample::vfold_cv(iris, v = 5, strata = Species)\nnrow(f)",
        "hint": "Cada partición tiene un conjunto de análisis y otro de evaluación. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "`5`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/machine-learning-y-evaluacion/tidymodels-y-caret",
    "remember": "Aprende preprocesamiento solo con el conjunto de entrenamiento.",
    "note": "Requiere recipes, parsnip y workflows; para evaluación real usa datos separados.",
    "examples": [
      {
        "id": "r/machine-learning-y-evaluacion/tidymodels-y-caret/1",
        "title": "Crear un workflow de regresión",
        "language": "r",
        "code": "rec <- recipes::recipe(mpg ~ wt, data = mtcars)\nmod <- parsnip::linear_reg() |> parsnip::set_engine(\"lm\")\nw <- workflows::workflow() |> workflows::add_recipe(rec) |> workflows::add_model(mod)\nfit <- parsnip::fit(w, data = mtcars)\npredict(fit, new_data = data.frame(wt = 3))",
        "hint": "El workflow reúne fórmula y modelo. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Predicción de mpg aproximadamente 21.25.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
