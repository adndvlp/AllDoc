// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/no-parametricas/definicion",
    "remember": "No paramétrica no significa libre de supuestos.",
    "examples": [
      {
        "id": "scipy/no-parametricas/definicion/1",
        "title": "Comparar dos canales por rangos",
        "code": "r = stats.mannwhitneyu(canal_a, canal_b, alternative=\"two-sided\")\nprint(round(r.statistic, 3), round(r.pvalue, 4))",
        "hint": "Se contrasta igualdad de distribuciones bajo H0; no es en general una prueba exclusiva de medianas.",
        "textOutput": "14.5 0.0736",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/mannwhitneyu",
    "remember": "Una interpretación como desplazamiento requiere distribuciones de forma similar.",
    "examples": [
      {
        "id": "scipy/no-parametricas/mannwhitneyu/1",
        "title": "Evaluar si B tiende a valores mayores",
        "code": "r = stats.mannwhitneyu(canal_b, canal_a, alternative='greater')\nprint(round(r.statistic, 3), round(r.pvalue, 4))",
        "hint": "La alternativa se formula para B frente a A.",
        "textOutput": "49.5 0.0368",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/wilcoxon",
    "remember": "Usa pares de la misma unidad.",
    "examples": [
      {
        "id": "scipy/no-parametricas/wilcoxon/1",
        "title": "Comparar tiempos antes y después",
        "code": "r = stats.wilcoxon(antes, despues)\nprint(round(r.statistic, 3), round(r.pvalue, 4))",
        "hint": "Se utilizan rangos de diferencias no nulas.",
        "textOutput": "0.0 0.0078",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/kruskal",
    "remember": "Un rechazo no identifica los grupos concretos.",
    "examples": [
      {
        "id": "scipy/no-parametricas/kruskal/1",
        "title": "Comparar tres canales",
        "code": "r = stats.kruskal(canal_a, canal_b, canal_c)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Contrasta distribuciones; la interpretación como medianas exige formas similares.",
        "textOutput": "9.9315 0.007",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/kstest",
    "remember": "No uses parámetros estimados de los mismos datos como si fueran conocidos.",
    "examples": [
      {
        "id": "scipy/no-parametricas/kstest/1",
        "title": "Contrastar modelo normal predefinido",
        "code": "r = stats.kstest(canal_a, stats.norm(loc=115, scale=15).cdf)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Los parámetros 115 y 15 se tratan como fijados de antemano.",
        "textOutput": "0.1306 0.9957",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/ks-2samp",
    "remember": "Puede detectar cambios de forma, localización o dispersión.",
    "examples": [
      {
        "id": "scipy/no-parametricas/ks-2samp/1",
        "title": "Comparar distribución de dos canales",
        "code": "r = stats.ks_2samp(canal_a, canal_b)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Con datos discretos o muchos empates, la calibración habitual puede no ser adecuada.",
        "textOutput": "0.375 0.6601",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/friedmanchisquare",
    "remember": "Necesita al menos tres medidas emparejadas.",
    "examples": [
      {
        "id": "scipy/no-parametricas/friedmanchisquare/1",
        "title": "Comparar tres interfaces en ocho sujetos",
        "code": "tercera = np.array([39, 41, 43, 44, 49, 51, 55, 56])\nr = stats.friedmanchisquare(antes, despues, tercera)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "La aproximación chi-cuadrado puede ser imprecisa con pocos sujetos; ejemplo ilustrativo.",
        "textOutput": "16.0 0.0003",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/median-test",
    "remember": "Es menos sensible a extremos, pero pierde información de magnitud.",
    "examples": [
      {
        "id": "scipy/no-parametricas/median-test/1",
        "title": "Contrastar medianas entre canales",
        "code": "r = stats.median_test(canal_a, canal_b)\nprint(round(r.statistic, 4), round(r.pvalue, 4), r.median)",
        "hint": "Se construye una tabla de conteos respecto a la mediana global.",
        "textOutput": "0.25 0.6171 123.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/brunnermunzel",
    "remember": "No exige varianzas o formas idénticas.",
    "examples": [
      {
        "id": "scipy/no-parametricas/brunnermunzel/1",
        "title": "Comparar orden estocástico de dos canales",
        "code": "r = stats.brunnermunzel(canal_a, canal_b)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Se usa la aproximación t por defecto.",
        "textOutput": "2.2714 0.0402",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/no-parametricas/quantile-test",
    "remember": "q es el valor propuesto; p es el nivel del cuantil.",
    "examples": [
      {
        "id": "scipy/no-parametricas/quantile-test/1",
        "title": "Evaluar mediana de referencia 115",
        "code": "r = stats.quantile_test(canal_a, q=115, p=0.5)\nprint(round(r.pvalue, 4))",
        "hint": "H0 se refiere a la mediana poblacional, no a la media.",
        "textOutput": "1.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
