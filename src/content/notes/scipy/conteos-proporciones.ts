// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/definicion",
    "remember": "Usa conteos, no porcentajes como entrada de tablas de contingencia.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/definicion/1",
        "title": "Evaluar asociación entre grupo y conversión",
        "code": "r = stats.chi2_contingency(conversiones)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "H0 es independencia entre grupo y conversión.",
        "textOutput": "4.8133 0.0282",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/chi2-contingency",
    "remember": "Revisa que los conteos esperados sean suficientes.",
    "note": "La regla habitual de conteos esperados de al menos cinco es orientativa.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/chi2-contingency/1",
        "title": "Comparar conversiones A/B sin corrección de Yates",
        "code": "r = stats.chi2_contingency(conversiones, correction=False)\nprint(round(r.pvalue, 4))\nprint(r.expected_freq)",
        "hint": "Sin asociación se esperan 50 conversiones por grupo.",
        "textOutput": "0.0209\n[[ 50. 150.]\n [ 50. 150.]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/chisquare",
    "remember": "Los totales observado y esperado deben coincidir por defecto.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/chisquare/1",
        "title": "Contrastar reparto uniforme de solicitudes",
        "code": "r = stats.chisquare([30, 45, 25], f_exp=[100/3]*3)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "H0 supone la misma probabilidad para las tres categorías.",
        "textOutput": "6.5 0.0388",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/fisher-exact",
    "remember": "Útil cuando la aproximación chi-cuadrado no es adecuada.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/fisher-exact/1",
        "title": "Comparar incidencias escasas",
        "code": "r = stats.fisher_exact([[1, 9], [5, 5]])\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "El estadístico por defecto es la odds ratio muestral para la tabla 2x2.",
        "textOutput": "0.1111 0.1409",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/binomtest",
    "remember": "k éxitos de n ensayos independientes.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/binomtest/1",
        "title": "Comparar 60 conversiones de 200 con objetivo de 20%",
        "code": "r = stats.binomtest(60, n=200, p=0.2, alternative='greater')\nprint(round(r.statistic, 3), round(r.pvalue, 5))",
        "hint": "statistic contiene la proporción observada; pvalue evalúa H0.",
        "textOutput": "0.3 0.0005",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/conteos-proporciones/proporcion-ic",
    "remember": "El intervalo exacto binomial puede ser conservador.",
    "examples": [
      {
        "id": "scipy/conteos-proporciones/proporcion-ic/1",
        "title": "Estimar conversión de B",
        "code": "r = stats.binomtest(60, 200).proportion_ci(confidence_level=0.95, method='exact')\nprint(round(r.low, 4), round(r.high, 4))",
        "hint": "Los extremos están en escala de 0 a 1.",
        "textOutput": "0.2374 0.3686",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
