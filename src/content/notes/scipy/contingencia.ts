// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/contingencia/definicion",
    "remember": "Distingue conteos, riesgos y odds.",
    "examples": [
      {
        "id": "scipy/contingencia/definicion/1",
        "title": "Obtener frecuencias esperadas",
        "code": "print(stats.contingency.expected_freq(conversiones))",
        "hint": "Los esperados se calculan con marginales suponiendo independencia.",
        "textOutput": "[[ 50. 150.]\n [ 50. 150.]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/crosstab",
    "remember": "Las etiquetas indican qué representa cada posición.",
    "examples": [
      {
        "id": "scipy/contingencia/crosstab/1",
        "title": "Construir tabla de resultados de campaña",
        "code": "r = stats.contingency.crosstab(['A','A','B','B','B'], ['si','no','si','si','no'])\nprint(r.elements)\nprint(r.count)",
        "hint": "Las filas y columnas se ordenan por sus niveles.",
        "textOutput": "(array(['A', 'B'], dtype='<U1'), array(['no', 'si'], dtype='<U2'))\n[[1 1]\n [1 2]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/expected-freq",
    "remember": "En 2D: total fila por total columna / total general.",
    "examples": [
      {
        "id": "scipy/contingencia/expected-freq/1",
        "title": "Calcular esperados A/B",
        "code": "print(stats.contingency.expected_freq(conversiones))",
        "hint": "Las dos filas tienen el mismo total.",
        "textOutput": "[[ 50. 150.]\n [ 50. 150.]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/relative-risk",
    "remember": "RR=1 significa igualdad de riesgos observados.",
    "examples": [
      {
        "id": "scipy/contingencia/relative-risk/1",
        "title": "Comparar conversión B frente a A",
        "code": "r = stats.contingency.relative_risk(exposed_cases=60, exposed_total=200, control_cases=40, control_total=200)\nprint(round(r.relative_risk, 3))",
        "hint": "B tiene 1.5 veces la tasa de A.",
        "textOutput": "1.5",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/odds-ratio",
    "remember": "Odds ratio no es riesgo relativo.",
    "examples": [
      {
        "id": "scipy/contingencia/odds-ratio/1",
        "title": "Calcular odds ratio B frente a A",
        "code": "r = stats.contingency.odds_ratio(conversiones[::-1], kind='sample')\nprint(round(r.statistic, 4))",
        "hint": "Se pone B en la primera fila para obtener B/A.",
        "textOutput": "1.7143",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/cramer",
    "remember": "Va de 0 a 1; no indica dirección.",
    "examples": [
      {
        "id": "scipy/contingencia/cramer/1",
        "title": "Medir asociación grupo-conversión",
        "code": "print(round(stats.contingency.association(conversiones, method='cramer'), 4))",
        "hint": "Se calcula sin interpretar causalidad.",
        "textOutput": "0.1155",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/contingencia/tschuprow",
    "remember": "Puede diferir de V de Cramér en tablas rectangulares.",
    "examples": [
      {
        "id": "scipy/contingencia/tschuprow/1",
        "title": "Calcular T de Tschuprow",
        "code": "tabla = [[30, 20, 10], [15, 25, 20]]\nprint(round(stats.contingency.association(tabla, method='tschuprow'), 4))",
        "hint": "Resume intensidad de asociación de una tabla 2x3.",
        "textOutput": "0.2289",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
