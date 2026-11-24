// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/definicion",
    "remember": "Define siempre el denominador, la política de nulos y la población que analizas.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/definicion/1",
        "title": "Calcular participación por sucursal",
        "code": "t = ventas.sum(axis=1)\nprint((t / t.sum() * 100).round(2))",
        "hint": "Define siempre el denominador, la política de nulos y la población que analizas.",
        "textOutput": "[29.17 39.58 31.25]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/porcentajes-y-participacion",
    "remember": "Si el total vale cero, el porcentaje no está definido.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/porcentajes-y-participacion/1",
        "title": "Calcular participación por sucursal",
        "code": "t = ventas.sum(axis=1)\nprint((t / t.sum() * 100).round(2))",
        "hint": "Si el total vale cero, el porcentaje no está definido.",
        "textOutput": "[29.17 39.58 31.25]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/normalizacion-min-max",
    "remember": "Una columna constante tiene rango cero y requiere una política específica.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/normalizacion-min-max/1",
        "title": "Reescalar tickets",
        "code": "a = importes.astype(float)\nprint(((a - a.min()) / np.ptp(a)).round(3))",
        "hint": "El importe menor pasa a cero, el mayor a uno y los demás quedan entre esos extremos.",
        "textOutput": "[0.    0.5   0.167 1.    0.667 0.333]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/estandarizacion-y-z-score",
    "remember": "Usa el mismo ddof y parámetros de referencia cuando compares conjuntos; si std=0, el z-score no está definido.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/estandarizacion-y-z-score/1",
        "title": "Estandarizar los importes",
        "code": "z = (importes - importes.mean()) / importes.std()\nprint(z.round(3))\nprint(z.mean().round(8), z.std().round(8))",
        "hint": "Usa el mismo ddof y parámetros de referencia cuando compares conjuntos; si std=0, el z-score no está definido.",
        "textOutput": "[-1.352  0.169 -0.845  1.69   0.676 -0.338]\n-0.0 1.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/outliers-con-iqr",
    "remember": "Un valor atípico no es automáticamente un error; investiga su causa.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/outliers-con-iqr/1",
        "title": "Marcar tickets extremos",
        "code": "a = np.array([100, 110, 120, 130, 140, 1000])\nq1, q3 = np.percentile(a, [25, 75])\niqr = q3 - q1\nprint(a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)])",
        "hint": "Un valor atípico no es automáticamente un error; investiga su causa.",
        "textOutput": "[1000]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/outliers-con-z-score",
    "remember": "Funciona mejor con distribuciones apropiadas y puede ser sensible a los propios extremos.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/outliers-con-z-score/1",
        "title": "Identificar valores alejados más de tres desviaciones",
        "code": "a = np.array([100] * 15 + [1000])\nz = (a - a.mean()) / a.std()\nprint(a[np.abs(z) > 3])",
        "hint": "Funciona mejor con distribuciones apropiadas y puede ser sensible a los propios extremos.",
        "textOutput": "[1000]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/limpieza-escalado-y-metricas/agrupar-mediante-codigos",
    "remember": "Para tablas heterogéneas, joins o agrupaciones complejas suele convenir pandas.",
    "examples": [
      {
        "id": "numpy/limpieza-escalado-y-metricas/agrupar-mediante-codigos/1",
        "title": "Calcular ventas y ticket promedio por estado",
        "code": "u, i = np.unique(estados, return_inverse=True)\nt = np.bincount(i, weights=importes)\nn = np.bincount(i)\nprint(u, t, n, (t / n).round(2))",
        "hint": "Para tablas heterogéneas, joins o agrupaciones complejas suele convenir pandas.",
        "textOutput": "['cancelled' 'completed'] [450. 950.] [2 4] [225.  237.5]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
