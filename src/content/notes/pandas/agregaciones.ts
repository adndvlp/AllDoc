// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/agregaciones/definicion",
    "remember": "A diferencia de una operación elemento a elemento, reducen filas.",
    "examples": [
      {
        "id": "pandas/agregaciones/definicion/1",
        "title": "Comparar conteos de país",
        "code": "clientes['pais'].count(), clientes['pais'].size",
        "hint": "Equivalen a COUNT(columna) y COUNT(*) en una Series.",
        "textOutput": "(4, 5)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/count-y-size",
    "remember": "Equivalen a COUNT(columna) y COUNT(*) en una Series.",
    "examples": [
      {
        "id": "pandas/agregaciones/count-y-size/1",
        "title": "Comparar conteos de país",
        "code": "clientes['pais'].count(), clientes['pais'].size",
        "hint": "Equivalen a COUNT(columna) y COUNT(*) en una Series.",
        "textOutput": "(4, 5)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/sum-y-mean",
    "remember": "Por defecto omiten faltantes; sum(min_count=1) evita sumar un grupo vacío a cero.",
    "examples": [
      {
        "id": "pandas/agregaciones/sum-y-mean/1",
        "title": "Calcular venta total y ticket medio",
        "code": "pedidos['monto'].agg(['sum','mean']).round(2)",
        "hint": "Por defecto omiten faltantes; sum(min_count=1) evita sumar un grupo vacío a cero.",
        "textOutput": "sum     1150.00\nmean     164.29",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/min-max-y-median",
    "remember": "La mediana es menos sensible a extremos que la media.",
    "examples": [
      {
        "id": "pandas/agregaciones/min-max-y-median/1",
        "title": "Resumir montos",
        "code": "pedidos['monto'].agg(['min','max','median'])",
        "hint": "La mediana es menos sensible a extremos que la media.",
        "textOutput": "min        50.0\nmax       300.0\nmedian    150.0",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/std-y-var",
    "remember": "Usa ddof=0 para una población completa cuando proceda.",
    "examples": [
      {
        "id": "pandas/agregaciones/std-y-var/1",
        "title": "Medir dispersión de montos",
        "code": "pedidos['monto'].agg(['std','var']).round(2)",
        "hint": "Usa ddof=0 para una población completa cuando proceda.",
        "textOutput": "std      80.18\nvar    6428.57",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/agg",
    "remember": "Una llamada puede producir varias métricas.",
    "examples": [
      {
        "id": "pandas/agregaciones/agg/1",
        "title": "Resumir precios y cantidades",
        "code": "detalle.agg({'cantidad':'sum','precio_unitario':'mean'}).round(2)",
        "hint": "Una llamada puede producir varias métricas.",
        "textOutput": "cantidad           16.00\nprecio_unitario    94.44",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/axis-y-skipna",
    "remember": "El eje especifica qué dimensión se reduce.",
    "examples": [
      {
        "id": "pandas/agregaciones/axis-y-skipna/1",
        "title": "Sumar ingresos de dos canales por día",
        "code": "t = pd.DataFrame({'web':[100,200],'tienda':[50,np.nan]})\nt.sum(axis=1).tolist()",
        "hint": "El eje especifica qué dimensión se reduce.",
        "textOutput": "[150.0, 200.0]",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/agregaciones/min-count",
    "remember": "Evita convertir un conjunto sin datos en un cero aparente.",
    "examples": [
      {
        "id": "pandas/agregaciones/min-count/1",
        "title": "Distinguir cero de ausencia",
        "code": "s = pd.Series([np.nan,np.nan])\ns.sum(), s.sum(min_count=1)",
        "hint": "Evita convertir un conjunto sin datos en un cero aparente.",
        "textOutput": "(0.0, nan)",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
