// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/series-temporales-y-pronosticos/definicion",
    "remember": "Comprueba frecuencia y huecos antes de ajustar un pronóstico.",
    "examples": [
      {
        "id": "r/series-temporales-y-pronosticos/definicion/1",
        "title": "Representar ventas mensuales",
        "language": "r",
        "code": "x <- ts(c(100, 120, 140), start = c(2026, 1), frequency = 12)\nfrequency(x)",
        "hint": "La serie representa doce periodos por año.",
        "textOutput": "`12`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/series-temporales-y-pronosticos/tendencia-y-estacionalidad",
    "remember": "Necesitas suficientes ciclos observados para separar componentes.",
    "examples": [
      {
        "id": "r/series-temporales-y-pronosticos/tendencia-y-estacionalidad/1",
        "title": "Descomponer una serie trimestral simulada",
        "language": "r",
        "code": "x <- ts(rep(c(10, 20, 30, 40), 3) + 1:12, frequency = 4)\nd <- decompose(x)\nround(d$figure, 1)",
        "hint": "El modelo aditivo separa tendencia y efecto estacional.",
        "textOutput": "Patrón estacional trimestral -15, -5, 5, 15.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/series-temporales-y-pronosticos/pronostico-y-evaluacion-temporal",
    "remember": "Evalúa con periodos posteriores a los de entrenamiento, sin fuga de futuro.",
    "examples": [
      {
        "id": "r/series-temporales-y-pronosticos/pronostico-y-evaluacion-temporal/1",
        "title": "Pronosticar una serie con suavizamiento simple",
        "language": "r",
        "code": "x <- ts(c(100, 100, 100, 100, 100))\nfit <- HoltWinters(x, alpha = .5, beta = FALSE, gamma = FALSE)\nas.numeric(predict(fit, n.ahead = 2))",
        "hint": "El nivel constante permanece igual.",
        "textOutput": "Dos pronósticos de 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/series-temporales-y-pronosticos/zoo-xts-y-tsibble",
    "remember": "No asumas intervalos regulares si las fechas son irregulares.",
    "note": "Requiere zoo; xts y tsibble son alternativas.",
    "examples": [
      {
        "id": "r/series-temporales-y-pronosticos/zoo-xts-y-tsibble/1",
        "title": "Crear observaciones indexadas",
        "language": "r",
        "code": "x <- zoo::zoo(c(100, 200), as.Date(c(\"2026-03-01\", \"2026-03-05\")))\nzoo::index(x)",
        "hint": "El índice conserva el hueco de cuatro días.",
        "textOutput": "Fechas 2026-03-01 y 2026-03-05.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
