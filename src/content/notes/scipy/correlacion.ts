// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/correlacion/definicion",
    "remember": "Correlación no implica causalidad.",
    "examples": [
      {
        "id": "scipy/correlacion/definicion/1",
        "title": "Medir asociación entre inversión e ingresos",
        "code": "r = stats.pearsonr(publicidad, ingresos)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "El coeficiente está entre -1 y 1; la prueba clásica de Pearson supone pares independientes bajo un modelo normal bivariado.",
        "textOutput": "0.9791 0.0036",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/correlacion/pearsonr",
    "remember": "Cerca de cero no descarta relaciones no lineales.",
    "examples": [
      {
        "id": "scipy/correlacion/pearsonr/1",
        "title": "Medir correlación lineal",
        "code": "r = stats.pearsonr(publicidad, ingresos)\nprint(round(r.statistic, 4))",
        "hint": "Los valores crecen aproximadamente juntos.",
        "textOutput": "0.9791",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/correlacion/spearmanr",
    "remember": "Una relación creciente no tiene que ser lineal.",
    "note": "Para muestras pequeñas considera una prueba de permutación en lugar del p-value asintótico.",
    "examples": [
      {
        "id": "scipy/correlacion/spearmanr/1",
        "title": "Medir asociación por rangos",
        "code": "r = stats.spearmanr(publicidad, ingresos)\nprint(round(r.statistic, 4))",
        "hint": "Todos los rangos coinciden.",
        "textOutput": "1.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/correlacion/kendalltau",
    "remember": "Compara el orden relativo de pares.",
    "examples": [
      {
        "id": "scipy/correlacion/kendalltau/1",
        "title": "Medir concordancia de rankings",
        "code": "r = stats.kendalltau([1, 2, 3, 4], [1, 3, 2, 4])\nprint(round(r.statistic, 4))",
        "hint": "Hay un par discordante entre seis pares.",
        "textOutput": "0.6667",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
