// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/definicion",
    "remember": "Elige el método por la pregunta y los supuestos, no por su complejidad.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/definicion/1",
        "title": "Comparar dimensiones de un análisis multivariante",
        "language": "r",
        "code": "p <- prcomp(iris[, 1:4], scale. = TRUE)\ndim(p$x)",
        "hint": "PCA transforma variables numéricas correlacionadas en componentes ortogonales.",
        "textOutput": "150 filas y 4 componentes principales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/analisis-causal",
    "remember": "Una asociación observacional no es por sí sola un efecto causal.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/analisis-causal/1",
        "title": "Calcular una diferencia de medias experimental",
        "language": "r",
        "code": "x <- data.frame(tratamiento = c(0,0,1,1), y = c(10,12,14,16))\nmean(x$y[x$tratamiento == 1]) - mean(x$y[x$tratamiento == 0])",
        "hint": "Es una diferencia observada; sería un estimador del efecto bajo un diseño aleatorio apropiado.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/analisis-bayesiano",
    "remember": "Explicita prior, verosimilitud y supuestos.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/analisis-bayesiano/1",
        "title": "Actualizar una tasa de conversión",
        "language": "r",
        "code": "a <- 1 + 20\nb <- 1 + 80\na / (a + b)",
        "hint": "Un prior Beta(1,1) y 20 éxitos de 100 dan Beta(21,81).",
        "textOutput": "Media posterior 21/102, aproximadamente 0.2059.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/supervivencia",
    "remember": "Una observación censurada no equivale a un evento observado.",
    "note": "Requiere survival; survfit ajusta curvas y coxph modelos de riesgos proporcionales.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/supervivencia/1",
        "title": "Crear respuesta de tiempo a evento",
        "language": "r",
        "code": "survival::Surv(time = c(2, 4, 5), event = c(1, 0, 1))",
        "hint": "event=0 representa censura derecha. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Tres tiempos: 2, 4+ y 5; el signo + indica censura.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/texto-y-nlp",
    "remember": "La tokenización depende de idioma y objetivo; cuenta términos sin perder contexto de interpretación.",
    "note": "Requiere tidytext.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/texto-y-nlp/1",
        "title": "Separar reseñas en palabras",
        "language": "r",
        "code": "x <- tibble::tibble(id = 1:2, reseña = c(\"muy bueno\", \"buen precio\"))\ntidytext::unnest_tokens(x, palabra, reseña) |> count(palabra)",
        "hint": "Cada palabra pasa a una fila. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Cuatro términos con frecuencia 1: buen, bueno, muy, precio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/analisis-estadistico-especializado/simulacion-monte-carlo",
    "remember": "Una simulación refleja los supuestos de entrada, no predice automáticamente la realidad.",
    "examples": [
      {
        "id": "r/analisis-estadistico-especializado/simulacion-monte-carlo/1",
        "title": "Simular ingresos por conversiones",
        "language": "r",
        "code": "set.seed(42)\nx <- rbinom(10000, size = 100, prob = .2) * 10\nmean(x)",
        "hint": "Cada réplica simula 100 visitas y 10 unidades monetarias por conversión.",
        "textOutput": "Valor cercano a 200; varía por simulación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
