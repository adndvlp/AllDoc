// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/estadistica-descriptiva/definicion",
    "remember": "Una asociación no demuestra causalidad.",
    "examples": [
      {
        "id": "pandas/estadistica-descriptiva/definicion/1",
        "title": "Calcular cuartiles",
        "code": "pedidos['monto'].quantile([0.25,0.5,0.75])",
        "hint": "0.5 es la mediana; 0.9 el percentil 90.",
        "textOutput": "0.25    125.0\n0.50    150.0\n0.75    200.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/estadistica-descriptiva/quantile-y-percentiles",
    "remember": "0.5 es la mediana; 0.9 el percentil 90.",
    "examples": [
      {
        "id": "pandas/estadistica-descriptiva/quantile-y-percentiles/1",
        "title": "Calcular cuartiles",
        "code": "pedidos['monto'].quantile([0.25,0.5,0.75])",
        "hint": "0.5 es la mediana; 0.9 el percentil 90.",
        "textOutput": "0.25    125.0\n0.50    150.0\n0.75    200.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/estadistica-descriptiva/corr-y-cov",
    "remember": "Pearson mide asociación lineal y no prueba causalidad.",
    "examples": [
      {
        "id": "pandas/estadistica-descriptiva/corr-y-cov/1",
        "title": "Comparar indicadores",
        "code": "t = pd.DataFrame({'visitas':[10,20,30],'compras':[1,3,2]})\nt.corr().round(2), t.cov().round(2)",
        "hint": "Pearson mide asociación lineal y no prueba causalidad.",
        "textOutput": "1)\n         visitas  compras\nvisitas      1.0      0.5\ncompras      0.5      1.0\n\n2)\n         visitas  compras\nvisitas    100.0      5.0\ncompras      5.0      1.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/estadistica-descriptiva/iqr-y-outliers",
    "remember": "Un atípico no es automáticamente un error.",
    "examples": [
      {
        "id": "pandas/estadistica-descriptiva/iqr-y-outliers/1",
        "title": "Detectar importes atípicos",
        "code": "s = pd.Series([90,100,110,120,1000])\nq1,q3 = s.quantile([0.25,0.75])\niqr = q3-q1\ns[(s<q1-1.5*iqr) | (s>q3+1.5*iqr)]",
        "hint": "Un atípico no es automáticamente un error.",
        "textOutput": "4    1000",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
