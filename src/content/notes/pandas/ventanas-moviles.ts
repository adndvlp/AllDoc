// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/ventanas-moviles/definicion",
    "remember": "Define orden, tamaño y número mínimo de observaciones.",
    "examples": [
      {
        "id": "pandas/ventanas-moviles/definicion/1",
        "title": "Calcular media y desviación móvil",
        "code": "pd.DataFrame({'media':diario.rolling(2).mean(),'desviacion':diario.rolling(2).std()}).round(2)",
        "hint": "min_periods controla cuándo existe un resultado válido.",
        "textOutput": "            media  desviacion\n2026-02-01    NaN         NaN\n2026-02-02  150.0       70.71\n2026-02-03  125.0      106.07\n2026-02-04  100.0       70.71",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ventanas-moviles/rolling",
    "remember": "min_periods controla cuándo existe un resultado válido.",
    "examples": [
      {
        "id": "pandas/ventanas-moviles/rolling/1",
        "title": "Calcular media y desviación móvil",
        "code": "pd.DataFrame({'media':diario.rolling(2).mean(),'desviacion':diario.rolling(2).std()}).round(2)",
        "hint": "min_periods controla cuándo existe un resultado válido.",
        "textOutput": "            media  desviacion\n2026-02-01    NaN         NaN\n2026-02-02  150.0       70.71\n2026-02-03  125.0      106.07\n2026-02-04  100.0       70.71",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ventanas-moviles/ventana-por-duracion",
    "remember": "Dos días no siempre contienen dos registros.",
    "examples": [
      {
        "id": "pandas/ventanas-moviles/ventana-por-duracion/1",
        "title": "Sumar ventas de los últimos dos días",
        "code": "diario.rolling('2D').sum()",
        "hint": "Dos días no siempre contienen dos registros.",
        "textOutput": "2026-02-01    100.0\n2026-02-02    300.0\n2026-02-03    250.0\n2026-02-04    200.0\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ventanas-moviles/expanding",
    "remember": "La ventana se amplía con cada registro.",
    "examples": [
      {
        "id": "pandas/ventanas-moviles/expanding/1",
        "title": "Calcular media histórica",
        "code": "diario.expanding().mean().round(2)",
        "hint": "La ventana se amplía con cada registro.",
        "textOutput": "2026-02-01    100.00\n2026-02-02    150.00\n2026-02-03    116.67\n2026-02-04    125.00\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/ventanas-moviles/ewm",
    "remember": "Un alpha alto da más peso a datos recientes.",
    "examples": [
      {
        "id": "pandas/ventanas-moviles/ewm/1",
        "title": "Suavizar ventas con media exponencial",
        "code": "diario.ewm(alpha=0.5,adjust=False).mean().round(2)",
        "hint": "Un alpha alto da más peso a datos recientes.",
        "textOutput": "2026-02-01    100.0\n2026-02-02    150.0\n2026-02-03    100.0\n2026-02-04    125.0\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
