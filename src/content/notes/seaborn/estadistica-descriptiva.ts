// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/definicion",
    "remember": "No interpretes una media sin conocer la distribución y el tamaño de la muestra.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/definicion/1",
        "title": "Consultar un resumen",
        "language": "python",
        "code": "print(ventas[\"ingresos\"].describe())",
        "hint": "Pandas calcula conteo, media, desviación, extremos y cuartiles.",
        "textOutput": "Conteo 16, media 130, mínimo 80 y máximo 180.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/media-mediana-y-moda",
    "remember": "La media suele ser más sensible a valores extremos.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/media-mediana-y-moda/1",
        "title": "Comparar medidas de centro",
        "language": "python",
        "code": "s = ventas[\"ingresos\"]\nprint(s.mean(), s.median(), s.mode().tolist())",
        "hint": "Se calculan tres medidas con pandas.",
        "textOutput": "Media 130, mediana 130 y modas 120 y 140.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/varianza-y-desviacion-estandar",
    "remember": "Indica si usas población (`ddof=0`) o muestra (`ddof=1`).",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/varianza-y-desviacion-estandar/1",
        "title": "Calcular dispersión muestral",
        "language": "python",
        "code": "s = ventas[\"ingresos\"]\nprint(round(s.var(ddof=1), 2), round(s.std(ddof=1), 2))",
        "hint": "Pandas utiliza el denominador n-1.",
        "textOutput": "Varianza 746.67 y desviación estándar 27.33.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/cuartiles-percentiles-e-iqr",
    "remember": "El IQR mide el ancho de la mitad central.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/cuartiles-percentiles-e-iqr/1",
        "title": "Calcular rango intercuartílico",
        "language": "python",
        "code": "q = ventas[\"ingresos\"].quantile([.25, .5, .75])\nprint(q.tolist(), q.loc[.75] - q.loc[.25])",
        "hint": "Se calculan los percentiles mediante pandas.",
        "textOutput": "Q1=115, mediana=130, Q3=145; IQR=30.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/outliers",
    "remember": "No elimines valores automáticamente: investiga su origen y relevancia.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/outliers/1",
        "title": "Detectar extremos simulados",
        "language": "python",
        "code": "s = pd.concat([ventas[\"ingresos\"], pd.Series([500])], ignore_index=True)\nq1, q3 = s.quantile([.25, .75])\niqr = q3 - q1\nprint(s[(s < q1-1.5*iqr) | (s > q3+1.5*iqr)].tolist())",
        "hint": "El cálculo usa una copia ampliada con un extremo.",
        "textOutput": "`[500]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/frecuencia-y-asimetria",
    "remember": "Un histograma puede ocultar o exagerar asimetrías según sus intervalos.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/frecuencia-y-asimetria/1",
        "title": "Explorar una distribución asimétrica",
        "language": "python",
        "code": "sns.histplot(data=simulacion, x=\"ingresos\", bins=20, kde=True, color=\"steelblue\")",
        "hint": "Se usa una muestra lognormal simulada.",
        "textOutput": "Distribución con cola a la derecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estadistica-descriptiva/correlacion-y-causalidad",
    "remember": "Una recta de regresión no demuestra que X cause Y.",
    "examples": [
      {
        "id": "seaborn/estadistica-descriptiva/correlacion-y-causalidad/1",
        "title": "Explorar asociación sin inferir causa",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"region\")",
        "hint": "La región permite explorar diferencias de grupos.",
        "textOutput": "Asociación positiva visual; no prueba causal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
