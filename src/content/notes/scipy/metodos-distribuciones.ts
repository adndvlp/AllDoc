// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/definicion",
    "remember": "CDF convierte valor en probabilidad; PPF hace lo inverso.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/definicion/1",
        "title": "Calcular percentil 90 de un modelo",
        "code": "print(round(stats.norm.ppf(0.9, loc=100, scale=20), 2))",
        "hint": "El 90% de la distribución queda hasta ese importe.",
        "textOutput": "125.63",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/pdf-pmf",
    "remember": "Una densidad en un punto no es una probabilidad puntual.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/pdf-pmf/1",
        "title": "Consultar densidad y masa",
        "code": "print(round(stats.norm.pdf(0), 4))\nprint(stats.binom.pmf(0, n=2, p=0.5))",
        "hint": "La primera salida es densidad; la segunda, probabilidad.",
        "textOutput": "0.3989\n0.25",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/cdf",
    "remember": "Para un intervalo continuo resta dos CDF.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/cdf/1",
        "title": "Probabilidad de importe entre 80 y 120",
        "code": "d = stats.norm(loc=100, scale=20)\nprint(round(d.cdf(120)-d.cdf(80), 4))",
        "hint": "La resta mide el área entre ambos límites.",
        "textOutput": "0.6827",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/sf",
    "remember": "SF puede ser más precisa que 1-CDF en colas.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/sf/1",
        "title": "Probabilidad de tres o más conversiones",
        "code": "print(round(stats.binom.sf(2, n=5, p=0.2), 4))",
        "hint": "Para X >= 3 discreto, se usa sf(2).",
        "textOutput": "0.0579",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/ppf",
    "remember": "La probabilidad debe estar entre 0 y 1.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/ppf/1",
        "title": "Calcular límite del 95%",
        "code": "print(round(stats.norm.ppf(0.95, loc=100, scale=20), 2))",
        "hint": "El 95% del modelo queda por debajo.",
        "textOutput": "132.9",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/rvs",
    "remember": "Fija semilla para reproducir.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/rvs/1",
        "title": "Simular demanda de cuatro días",
        "code": "print(stats.poisson.rvs(mu=3, size=4, random_state=np.random.default_rng(7)))",
        "hint": "Cada salida es un conteo simulado.",
        "textOutput": "[4 1 4 3]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/fit",
    "remember": "Ajustar parámetros no demuestra que el modelo sea correcto.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/fit/1",
        "title": "Ajustar normal a importes",
        "code": "loc, scale = stats.norm.fit(ventas)\nprint(round(loc, 2), round(scale, 2))",
        "hint": "La desviación estimada por máxima verosimilitud usa divisor n.",
        "textOutput": "140.0 41.95",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/metodos-distribuciones/interval",
    "remember": "No es automáticamente un intervalo de confianza para la media.",
    "examples": [
      {
        "id": "scipy/metodos-distribuciones/interval/1",
        "title": "Obtener intervalo central de importes",
        "code": "print(np.round(stats.norm.interval(0.95, loc=100, scale=20), 2))",
        "hint": "El modelo asigna 95% de probabilidad al intervalo.",
        "textOutput": "[ 60.8 139.2]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
