// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/definicion",
    "remember": "Distingue media, mediana, cuantiles y medidas de dispersión.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/definicion/1",
        "title": "Comparar media y mediana de tickets",
        "code": "a = np.array([100, 110, 120, 130, 1000])\nprint(np.mean(a), np.median(a))",
        "hint": "El importe de 1000 eleva la media a 292, mientras que el valor central permanece en 120.",
        "textOutput": "292.0 120.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/median",
    "remember": "Suele ser menos sensible a valores extremos que mean.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/median/1",
        "title": "Comparar media y mediana de tickets",
        "code": "a = np.array([100, 110, 120, 130, 1000])\nprint(np.mean(a), np.median(a))",
        "hint": "El importe de 1000 eleva la media a 292, mientras que el valor central permanece en 120.",
        "textOutput": "292.0 120.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/std-var-y-ddof",
    "remember": "Usa ddof=1 para la varianza muestral convencional; la desviación resultante no es un estimador insesgado exacto.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/std-var-y-ddof/1",
        "title": "Comparar dispersión poblacional y muestral",
        "code": "a = np.array([10, 20, 30])\nprint(np.var(a).round(2), np.std(a).round(2))\nprint(np.var(a, ddof=1), np.std(a, ddof=1))",
        "hint": "Usa ddof=1 para la varianza muestral convencional; la desviación resultante no es un estimador insesgado exacto.",
        "textOutput": "66.67 8.16\n100.0 10.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/percentile-y-quantile",
    "remember": "El percentil 50 equivale a la mediana con el método lineal por defecto.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/percentile-y-quantile/1",
        "title": "Obtener cuartiles y percentil 90",
        "code": "print(np.percentile(importes, [25, 50, 75, 90]))\nprint(np.quantile(importes, [0.25, 0.5, 0.75]))",
        "hint": "El percentil 50 equivale a la mediana con el método lineal por defecto.",
        "textOutput": "[162.5 225.  287.5 350. ]\n[162.5 225.  287.5]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/covarianza-y-corrcoef",
    "remember": "Correlación no implica causalidad; una variable constante hace indefinida la correlación.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/covarianza-y-corrcoef/1",
        "title": "Medir relación lineal entre inversión e ingresos",
        "code": "x = [1, 2, 3]\ny = [2, 4, 6]\nprint(np.cov(x, y))\nprint(np.corrcoef(x, y))",
        "hint": "Correlación no implica causalidad; una variable constante hace indefinida la correlación.",
        "textOutput": "[[1. 2.]\n [2. 4.]]\n[[1. 1.]\n [1. 1.]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/histogram",
    "remember": "Los intervalos son cerrados a la izquierda y abiertos a la derecha salvo el último, que incluye el extremo derecho.",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/histogram/1",
        "title": "Distribuir tickets por rango",
        "code": "cuentas, bordes = np.histogram(importes, bins=[0, 200, 400, 600])\nprint(cuentas, bordes)",
        "hint": "Los intervalos son cerrados a la izquierda y abiertos a la derecha salvo el último, que incluye el extremo derecho.",
        "textOutput": "[2 3 1] [  0 200 400 600]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/estadistica-descriptiva/digitize",
    "remember": "Con right=False y bordes crecientes, usa bordes izquierdos incluidos; puede devolver 0 o len(bins).",
    "examples": [
      {
        "id": "numpy/estadistica-descriptiva/digitize/1",
        "title": "Asignar segmentos de importe",
        "code": "print(np.digitize(importes, bins=[150, 300]))",
        "hint": "Con right=False y bordes crecientes, usa bordes izquierdos incluidos; puede devolver 0 o len(bins).",
        "textOutput": "[0 1 1 2 2 1]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
