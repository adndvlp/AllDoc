// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/special/definicion",
    "remember": "Usa funciones especializadas para estabilidad numérica.",
    "examples": [
      {
        "id": "scipy/special/definicion/1",
        "title": "Transformar puntuación en probabilidad",
        "code": "from scipy.special import expit\nprint(expit(0))",
        "hint": "La función logística transforma cero en 0.5.",
        "textOutput": "0.5",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/special/expit-logit",
    "remember": "logit de 0 o 1 produce infinito.",
    "examples": [
      {
        "id": "scipy/special/expit-logit/1",
        "title": "Convertir probabilidad en log-odds y volver",
        "code": "from scipy.special import expit, logit\nz = logit(0.8)\nprint(round(z, 4), round(expit(z), 4))",
        "hint": "Se recupera la probabilidad inicial.",
        "textOutput": "1.3863 0.8",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/special/gamma",
    "remember": "Usa gammaln para evitar desbordamientos en cálculos logarítmicos.",
    "examples": [
      {
        "id": "scipy/special/gamma/1",
        "title": "Calcular gamma de cinco",
        "code": "from scipy.special import gamma, gammaln\nprint(gamma(5), round(gammaln(5), 4))",
        "hint": "Gamma de cinco equivale a 4 factorial.",
        "textOutput": "24.0 3.1781",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
