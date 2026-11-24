// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/inferencia/definicion",
    "remember": "Una conclusión estadística depende del diseño y los supuestos.",
    "examples": [
      {
        "id": "scipy/inferencia/definicion/1",
        "title": "Obtener un estadístico y un p-value",
        "code": "r = stats.ttest_1samp(canal_a, popmean=100)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Se contrasta si la media poblacional es 100; la prueba t presupone observaciones independientes y, para muestras pequeñas, normalidad aproximada.",
        "textOutput": "3.8512 0.0063",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/hipotesis",
    "remember": "Define H0 y H1 antes de analizar.",
    "examples": [
      {
        "id": "scipy/inferencia/hipotesis/1",
        "title": "Contrastar una media objetivo",
        "code": "r = stats.ttest_1samp(canal_a, 100)\nprint(round(r.pvalue, 4))",
        "hint": "H0: media = 100; H1: media distinta de 100.",
        "textOutput": "0.0063",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/pvalue",
    "remember": "p menor o igual a alpha permite rechazar H0; no es probabilidad de que H0 sea verdadera.",
    "examples": [
      {
        "id": "scipy/inferencia/pvalue/1",
        "title": "Decidir con alpha de 0.05",
        "code": "r = stats.ttest_1samp(canal_a, 100)\nprint(r.pvalue <= 0.05)",
        "hint": "True significa rechazar H0 bajo el criterio elegido.",
        "textOutput": "True",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/alternative",
    "remember": "Elige la dirección antes de observar los resultados.",
    "examples": [
      {
        "id": "scipy/inferencia/alternative/1",
        "title": "Evaluar si la media supera 100",
        "code": "r = stats.ttest_1samp(canal_a, 100, alternative='greater')\nprint(round(r.pvalue, 4))",
        "hint": "La hipótesis alternativa es media mayor a 100.",
        "textOutput": "0.0031",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/grados-libertad",
    "remember": "En t de una muestra, df = n-1.",
    "examples": [
      {
        "id": "scipy/inferencia/grados-libertad/1",
        "title": "Leer grados de libertad de una prueba t",
        "code": "r = stats.ttest_1samp(canal_a, 100)\nprint(r.df)",
        "hint": "Ocho observaciones producen siete grados de libertad.",
        "textOutput": "7",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/errores",
    "remember": "Potencia = 1-beta; no rechazar no demuestra igualdad.",
    "examples": [
      {
        "id": "scipy/inferencia/errores/1",
        "title": "Simular falsos positivos bajo H0",
        "code": "rng = np.random.default_rng(42)\nx = rng.normal(100, 10, size=(2000, 20))\np = stats.ttest_1samp(x, 100, axis=1).pvalue\nprint(round(np.mean(p <= 0.05), 3))",
        "hint": "Se estima la frecuencia de falsos positivos en un modelo donde H0 es verdadera.",
        "textOutput": "0.046",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/intervalo-confianza",
    "remember": "No significa que el 95% de los datos esté dentro.",
    "examples": [
      {
        "id": "scipy/inferencia/intervalo-confianza/1",
        "title": "Obtener IC de la media",
        "code": "r = stats.ttest_1samp(canal_a, 100).confidence_interval(confidence_level=0.95)\nprint(round(r.low, 2), round(r.high, 2))",
        "hint": "Se usa el intervalo t para media con desviación desconocida.",
        "textOutput": "106.66 127.84",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/t-interval",
    "remember": "Para la media, scale es SEM, no desviación de los datos.",
    "examples": [
      {
        "id": "scipy/inferencia/t-interval/1",
        "title": "Construir IC de la media",
        "code": "ic = stats.t.interval(0.95, df=len(canal_a)-1, loc=np.mean(canal_a), scale=stats.sem(canal_a))\nprint(np.round(ic, 2))",
        "hint": "Coincide con el intervalo de la prueba t.",
        "textOutput": "[106.66 127.84]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/efecto",
    "remember": "Significancia no equivale a magnitud relevante.",
    "note": "Si las varianzas difieren mucho, considera otra medida de efecto.",
    "examples": [
      {
        "id": "scipy/inferencia/efecto/1",
        "title": "Calcular diferencia y Cohen d agrupado",
        "code": "a, b = canal_a, canal_b\nsd = np.sqrt(((len(a)-1)*a.var(ddof=1)+(len(b)-1)*b.var(ddof=1))/(len(a)+len(b)-2))\nprint(round(b.mean()-a.mean(), 2), round((b.mean()-a.mean())/sd, 3))",
        "hint": "Cohen d usa la desviación agrupada de los grupos independientes.",
        "textOutput": "15.12 1.065",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/inferencia/power",
    "remember": "Aumentar n suele aumentar potencia para un efecto fijo.",
    "examples": [
      {
        "id": "scipy/inferencia/power/1",
        "title": "Simular potencia para dos tamaños",
        "code": "rng = np.random.default_rng(42)\nr = stats.power(lambda x, axis: stats.ttest_1samp(x, 0, axis=axis), lambda size: rng.normal(0.5, 1, size=size), n_observations=[20, 50], significance=0.05, n_resamples=2000)\nprint(np.round(r.power, 3))",
        "hint": "El modelo simula un efecto de 0.5 desviaciones estándar; para planear n se comparan tamaños hasta alcanzar la potencia deseada.",
        "textOutput": "[0.569 0.932]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
