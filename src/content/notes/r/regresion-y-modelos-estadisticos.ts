// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/definicion",
    "remember": "Distingue explicación, asociación y predicción.",
    "examples": [
      {
        "id": "r/regresion-y-modelos-estadisticos/definicion/1",
        "title": "Ajustar una recta",
        "language": "r",
        "code": "x <- data.frame(unidades = 1:4, ingreso = c(10, 20, 30, 40))\ncoef(lm(ingreso ~ unidades, data = x))",
        "hint": "Por cada unidad adicional el ingreso ajustado aumenta 10.",
        "textOutput": "Intercepto aproximadamente 0 y pendiente 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/regresion-multiple-e-interacciones",
    "remember": "Un coeficiente se interpreta condicionado al resto del modelo.",
    "examples": [
      {
        "id": "r/regresion-y-modelos-estadisticos/regresion-multiple-e-interacciones/1",
        "title": "Ajustar dos predictores",
        "language": "r",
        "code": "x <- expand.grid(precio = c(10,20), publicidad = c(0,1))\nx$ventas <- 100 - 2*x$precio + 5*x$publicidad\ncoef(lm(ventas ~ precio + publicidad, data = x))",
        "hint": "Los datos fueron construidos con esa relación exacta.",
        "textOutput": "Intercepto 100, precio -2 y publicidad 5 (aprox.).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/prediccion-y-residuos",
    "remember": "Inspecciona residuos y evita extrapolar sin justificación.",
    "examples": [
      {
        "id": "r/regresion-y-modelos-estadisticos/prediccion-y-residuos/1",
        "title": "Predecir ingreso para cinco unidades",
        "language": "r",
        "code": "m <- lm(ingreso ~ unidades, data = data.frame(unidades = 1:4, ingreso = 10*(1:4)))\npredict(m, newdata = data.frame(unidades = 5))",
        "hint": "El modelo extrapola una unidad fuera del rango observado.",
        "textOutput": "`50` aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/regresion-logistica-y-glm",
    "remember": "Usa `type = \"response\"` para obtener probabilidades en el modelo binomial.",
    "examples": [
      {
        "id": "r/regresion-y-modelos-estadisticos/regresion-logistica-y-glm/1",
        "title": "Estimar una probabilidad base",
        "language": "r",
        "code": "x <- data.frame(compra = c(0, 0, 0, 1))\nm <- glm(compra ~ 1, data = x, family = binomial())\nplogis(coef(m))",
        "hint": "Sin predictores, el modelo estima la tasa observada.",
        "textOutput": "`0.25` aproximadamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/regresion-y-modelos-estadisticos/resultados-con-broom",
    "remember": "No confundas el formato tabular con la validación del modelo.",
    "note": "Requiere broom; mtcars es un dataset incluido en R.",
    "examples": [
      {
        "id": "r/regresion-y-modelos-estadisticos/resultados-con-broom/1",
        "title": "Extraer coeficientes en tabla",
        "language": "r",
        "code": "m <- lm(mpg ~ wt, data = mtcars)\nbroom::tidy(m) |> select(term, estimate)",
        "hint": "Cada término ocupa una fila.",
        "textOutput": "Intercepto aproximadamente 37.285 y wt -5.344.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
