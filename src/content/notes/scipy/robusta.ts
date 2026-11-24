// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/robusta/definicion",
    "remember": "Investiga los extremos antes de eliminarlos.",
    "examples": [
      {
        "id": "scipy/robusta/definicion/1",
        "title": "Calcular el rango intercuartílico",
        "code": "print(stats.iqr(ventas))",
        "hint": "IQR es Q3 menos Q1.",
        "textOutput": "20.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/percentiles",
    "remember": "Percentil 50 = mediana.",
    "examples": [
      {
        "id": "scipy/robusta/percentiles/1",
        "title": "Calcular cuartiles",
        "code": "print(stats.scoreatpercentile(ventas, 25))\nprint(stats.scoreatpercentile(ventas, 75))",
        "hint": "Se usa interpolación por defecto; NumPy ofrece np.percentile como alternativa.",
        "textOutput": "120.0\n140.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/percentileofscore",
    "remember": "weak incluye los iguales; strict no.",
    "examples": [
      {
        "id": "scipy/robusta/percentileofscore/1",
        "title": "Situar un pedido de 120",
        "code": "print(stats.percentileofscore(ventas, 120, kind='weak'))\nprint(stats.percentileofscore(ventas, 120, kind='strict'))",
        "hint": "Los empates explican la diferencia.",
        "textOutput": "60.0\n20.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/iqr",
    "remember": "Los límites son criterios exploratorios, no pruebas de error.",
    "note": "Los extremos de muestras pequeñas pueden ser legítimos.",
    "examples": [
      {
        "id": "scipy/robusta/iqr/1",
        "title": "Identificar importes fuera de límites",
        "code": "q1, q3 = np.percentile(ventas, [25, 75])\nr = stats.iqr(ventas)\nprint(ventas[np.logical_or(ventas < q1-1.5*r, ventas > q3+1.5*r)])",
        "hint": "Se conservan solo los importes fuera del rango.",
        "textOutput": "[220.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/zscore",
    "remember": "Z positivo está por encima de la media.",
    "examples": [
      {
        "id": "scipy/robusta/zscore/1",
        "title": "Estandarizar importes",
        "code": "print(np.round(stats.zscore(ventas), 3))",
        "hint": "El promedio de los Z es cero; su desviación con ddof=0 es uno.",
        "textOutput": "[-0.953 -0.477 -0.477  0.     1.907]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/mad",
    "remember": "MAD resiste valores extremos.",
    "examples": [
      {
        "id": "scipy/robusta/mad/1",
        "title": "Medir dispersión robusta",
        "code": "print(stats.median_abs_deviation(ventas))",
        "hint": "No utiliza distancias cuadráticas a la media.",
        "textOutput": "20.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/trim-mean",
    "remember": "0.2 recorta el 20% de cada cola.",
    "examples": [
      {
        "id": "scipy/robusta/trim-mean/1",
        "title": "Reducir influencia de extremos",
        "code": "print(stats.trim_mean(ventas, 0.2))",
        "hint": "Con cinco datos, elimina el menor y el mayor.",
        "textOutput": "126.66666666666667",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/winsorize",
    "remember": "Recorta valores, no filas.",
    "examples": [
      {
        "id": "scipy/robusta/winsorize/1",
        "title": "Limitar importes extremos",
        "code": "r = stats.mstats.winsorize(ventas, limits=(0.2, 0.2))\nprint(np.asarray(r))",
        "hint": "Se conserva el número de observaciones.",
        "textOutput": "[120. 120. 120. 140. 140.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/robusta/rankdata",
    "remember": "method controla qué ocurre con empates.",
    "examples": [
      {
        "id": "scipy/robusta/rankdata/1",
        "title": "Comparar rangos promedio y densos",
        "code": "print(stats.rankdata(ventas, method='average'))\nprint(stats.rankdata(ventas, method='dense'))",
        "hint": "Los dos importes 120 reciben la misma posición con estas reglas.",
        "textOutput": "[1.  2.5 2.5 4.  5. ]\n[1. 2. 2. 3. 4.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
