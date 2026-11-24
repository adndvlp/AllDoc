// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/definicion",
    "remember": "El valor p no es la probabilidad de que la hipótesis nula sea verdadera.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/definicion/1",
        "title": "Contrastar una media contra una referencia",
        "language": "r",
        "code": "t.test(c(8, 9, 10, 11, 12), mu = 10)$p.value",
        "hint": "La media observada coincide con la referencia.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/intervalos-de-confianza",
    "remember": "Un intervalo del 95% no garantiza que el parámetro esté dentro de este intervalo concreto.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/intervalos-de-confianza/1",
        "title": "Estimar la media de una muestra",
        "language": "r",
        "code": "round(t.test(c(8, 9, 10, 11, 12))$conf.int, 2)",
        "hint": "Se utiliza el intervalo t para una media.",
        "textOutput": "Límites aproximados 8.04 y 11.96.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/pruebas-t",
    "remember": "El diseño determina si las muestras son independientes o pareadas.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/pruebas-t/1",
        "title": "Comparar dos muestras independientes",
        "language": "r",
        "code": "t.test(c(10, 12, 14), c(8, 10, 12))$estimate",
        "hint": "El test contrasta la diferencia de medias; también devuelve p-value e intervalo.",
        "textOutput": "Medias 12 y 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/chi-cuadrada-y-fisher",
    "remember": "Revisa las frecuencias esperadas y el diseño de muestreo.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/chi-cuadrada-y-fisher/1",
        "title": "Contrastar asociación en una tabla 2×2",
        "language": "r",
        "code": "x <- matrix(c(30, 20, 30, 20), nrow = 2)\nchisq.test(x)$p.value",
        "hint": "Las dos columnas tienen proporciones idénticas.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/anova",
    "remember": "Un resultado global significativo no identifica qué pares difieren.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/anova/1",
        "title": "Comparar tres grupos",
        "language": "r",
        "code": "x <- data.frame(grupo = factor(rep(LETTERS[1:3], each = 3)), y = c(1,2,3,4,5,6,7,8,9))\nsummary(aov(y ~ grupo, data = x))",
        "hint": "Se compara variación entre grupos con variación interna.",
        "textOutput": "Estadístico F=27, grados de libertad 2 y 6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/estadistica-inferencial/pruebas-no-parametricas",
    "remember": "No interpretes automáticamente una prueba de rangos como prueba de medias.",
    "examples": [
      {
        "id": "r/estadistica-inferencial/pruebas-no-parametricas/1",
        "title": "Comparar dos grupos por rangos",
        "language": "r",
        "code": "wilcox.test(c(1, 2, 3), c(4, 5, 6), exact = TRUE)$p.value",
        "hint": "No hay empates; todos los valores del primer grupo son menores.",
        "textOutput": "`0.1` para alternativa bilateral.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
