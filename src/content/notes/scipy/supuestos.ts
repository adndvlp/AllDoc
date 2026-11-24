// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/supuestos/definicion",
    "remember": "Un p alto no demuestra normalidad ni igualdad de varianzas.",
    "examples": [
      {
        "id": "scipy/supuestos/definicion/1",
        "title": "Evaluar normalidad de importes",
        "code": "r = stats.shapiro(canal_a)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "H0 es que la muestra proviene de una distribución normal.",
        "textOutput": "0.9813 0.9691",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/shapiro",
    "remember": "Requiere al menos tres observaciones.",
    "examples": [
      {
        "id": "scipy/supuestos/shapiro/1",
        "title": "Evaluar tiempos antes de un cambio",
        "code": "r = stats.shapiro(antes)\nprint(round(r.pvalue, 4))",
        "hint": "Un p bajo aporta evidencia contra normalidad.",
        "textOutput": "0.8369",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/normaltest",
    "remember": "Necesita al menos ocho observaciones; muestras pequeñas tienen poca potencia.",
    "examples": [
      {
        "id": "scipy/supuestos/normaltest/1",
        "title": "Evaluar muestra simulada de importes",
        "code": "x = np.random.default_rng(42).normal(100, 20, 100)\nr = stats.normaltest(x)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Se usa una muestra de 100 observaciones.",
        "textOutput": "0.4731 0.7893",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/anderson",
    "remember": "Consulta el método de salida de tu versión.",
    "note": "Sin method, la API anterior devuelve valores críticos y niveles de significancia; está en transición.",
    "examples": [
      {
        "id": "scipy/supuestos/anderson/1",
        "title": "Comparar una muestra con normal mediante Anderson-Darling",
        "code": "r = stats.anderson(canal_a, dist='norm', method='interpolate')\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Con SciPy 1.17 se especifica un método que devuelve p-value.",
        "textOutput": "0.1208 0.15",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/probplot",
    "remember": "Observa desviaciones en colas y centro.",
    "examples": [
      {
        "id": "scipy/supuestos/probplot/1",
        "title": "Obtener coordenadas y correlación del gráfico",
        "code": "coords, ajuste = stats.probplot(canal_a, dist='norm')\nprint(len(coords[0]), round(ajuste[2], 4))",
        "hint": "Para dibujar, usa stats.probplot(canal_a, dist='norm', plot=plt) tras importar matplotlib.pyplot as plt.",
        "textOutput": "8 0.9971",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/levene",
    "remember": "H0: varianzas iguales.",
    "examples": [
      {
        "id": "scipy/supuestos/levene/1",
        "title": "Comparar dispersión de canales",
        "code": "r = stats.levene(canal_a, canal_b, center='median')\nprint(round(r.pvalue, 4))",
        "hint": "No rechazar H0 no demuestra igualdad.",
        "textOutput": "0.5146",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/bartlett",
    "remember": "Se prefiere con normalidad razonable.",
    "examples": [
      {
        "id": "scipy/supuestos/bartlett/1",
        "title": "Comparar varianzas bajo normalidad",
        "code": "r = stats.bartlett(canal_a.astype(float), canal_b.astype(float))\nprint(round(r.pvalue, 4))",
        "hint": "Es una prueba diferente de comparar medias.",
        "textOutput": "0.599",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/supuestos/fligner",
    "remember": "Alternativa robusta para igualdad de escala.",
    "examples": [
      {
        "id": "scipy/supuestos/fligner/1",
        "title": "Contrastar dispersión entre canales",
        "code": "r = stats.fligner(canal_a, canal_b)\nprint(round(r.pvalue, 4))",
        "hint": "Se utiliza una transformación basada en rangos.",
        "textOutput": "0.4289",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
