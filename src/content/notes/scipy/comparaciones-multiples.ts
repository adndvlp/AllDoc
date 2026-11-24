// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/comparaciones-multiples/definicion",
    "remember": "Ajustar p-values no soluciona un diseño defectuoso.",
    "examples": [
      {
        "id": "scipy/comparaciones-multiples/definicion/1",
        "title": "Ajustar tres p-values con Benjamini-Hochberg",
        "code": "print(np.round(stats.false_discovery_control([0.01, 0.04, 0.2]), 4))",
        "hint": "El ajuste controla la tasa esperada de falsos descubrimientos bajo condiciones de dependencia apropiadas.",
        "textOutput": "[0.03 0.06 0.2 ]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/comparaciones-multiples/fdr",
    "remember": "FDR no es probabilidad de que una hipótesis concreta sea falsa.",
    "examples": [
      {
        "id": "scipy/comparaciones-multiples/fdr/1",
        "title": "Comparar dos ajustes",
        "code": "p = [0.01, 0.04, 0.2]\nprint(np.round(stats.false_discovery_control(p, method='bh'), 4))\nprint(np.round(stats.false_discovery_control(p, method='by'), 4))",
        "hint": "BY aumenta más los p-values ajustados.",
        "textOutput": "[0.03 0.06 0.2 ]\n[0.055  0.11   0.3667]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/comparaciones-multiples/bonferroni",
    "remember": "Es válido sin requerir independencia.",
    "examples": [
      {
        "id": "scipy/comparaciones-multiples/bonferroni/1",
        "title": "Ajustar tres contrastes",
        "code": "p = np.array([0.01, 0.04, 0.2])\nprint(np.minimum(p*len(p), 1))",
        "hint": "Se comparan los p-values ajustados con alpha.",
        "textOutput": "[0.03 0.12 0.6 ]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/comparaciones-multiples/combine-pvalues",
    "remember": "No equivale a corregir comparaciones múltiples.",
    "examples": [
      {
        "id": "scipy/comparaciones-multiples/combine-pvalues/1",
        "title": "Combinar dos experimentos independientes",
        "code": "r = stats.combine_pvalues([0.03, 0.04], method='fisher')\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "La combinación de Fisher presupone p-values continuos e independientes bajo H0.",
        "textOutput": "13.4509 0.0093",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
