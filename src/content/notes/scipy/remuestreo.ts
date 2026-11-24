// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/remuestreo/definicion",
    "remember": "Bootstrap remuestrea observaciones; permutación reorganiza etiquetas bajo H0.",
    "examples": [
      {
        "id": "scipy/remuestreo/definicion/1",
        "title": "Estimar incertidumbre de una media con bootstrap",
        "code": "r = stats.bootstrap((ventas,), np.mean, n_resamples=2000, method=\"percentile\", rng=np.random.default_rng(42))\nprint(round(r.confidence_interval.low, 2), round(r.confidence_interval.high, 2))",
        "hint": "Se generan muestras con reemplazo del mismo tamaño.",
        "textOutput": "112.0 180.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/remuestreo/bootstrap",
    "remember": "Las unidades remuestreadas deben corresponder al diseño.",
    "examples": [
      {
        "id": "scipy/remuestreo/bootstrap/1",
        "title": "Estimar IC de la mediana",
        "code": "r = stats.bootstrap((ventas,), np.median, n_resamples=3000, method='percentile', rng=np.random.default_rng(42))\nprint(round(r.confidence_interval.low, 2), round(r.confidence_interval.high, 2))",
        "hint": "El intervalo percentil es ilustrativo; muestras pequeñas pueden producir intervalos poco fiables.",
        "textOutput": "100.0 220.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/remuestreo/permutation-test",
    "remember": "Para datos emparejados elige una permutación apropiada.",
    "examples": [
      {
        "id": "scipy/remuestreo/permutation-test/1",
        "title": "Contrastar diferencia de medias de canales",
        "code": "def diferencia(a, b):\n    return np.mean(b)-np.mean(a)\nr = stats.permutation_test((canal_a, canal_b), diferencia, permutation_type='independent', n_resamples=1999, rng=np.random.default_rng(42))\nprint(round(r.statistic, 3), round(r.pvalue, 4))",
        "hint": "Se permutan etiquetas de los grupos independientes.",
        "textOutput": "15.125 0.048",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/remuestreo/monte-carlo-test",
    "remember": "La calidad de la prueba depende del modelo nulo.",
    "examples": [
      {
        "id": "scipy/remuestreo/monte-carlo-test/1",
        "title": "Contrastar media con modelo normal conocido",
        "code": "rng = np.random.default_rng(42)\ndef rvs(size):\n    return rng.normal(100, 20, size=size)\nr = stats.monte_carlo_test(canal_a, rvs, np.mean, alternative='greater', n_resamples=1999)\nprint(round(r.statistic, 3), round(r.pvalue, 4))",
        "hint": "El modelo nulo fija media 100 y desviación 20.",
        "textOutput": "117.25 0.0075",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/remuestreo/gaussian-kde",
    "remember": "El ancho de banda determina el suavizado.",
    "examples": [
      {
        "id": "scipy/remuestreo/gaussian-kde/1",
        "title": "Consultar densidad estimada en 120",
        "code": "kde = stats.gaussian_kde(ventas)\nprint(round(kde([120])[0], 6))",
        "hint": "El resultado es densidad, no probabilidad de un importe exacto.",
        "textOutput": "0.008673",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
