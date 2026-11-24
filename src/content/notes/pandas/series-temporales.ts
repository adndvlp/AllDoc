// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/series-temporales/definicion",
    "remember": "Ordena fechas y define la frecuencia del análisis.",
    "examples": [
      {
        "id": "pandas/series-temporales/definicion/1",
        "title": "Generar cuatro fechas diarias",
        "code": "pd.date_range('2026-02-01',periods=4,freq='D').strftime('%Y-%m-%d').tolist()",
        "hint": "Una frecuencia diaria se expresa con D.",
        "textOutput": "['2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-temporales/datetimeindex-y-date-range",
    "remember": "Una frecuencia diaria se expresa con D.",
    "examples": [
      {
        "id": "pandas/series-temporales/datetimeindex-y-date-range/1",
        "title": "Generar cuatro fechas diarias",
        "code": "pd.date_range('2026-02-01',periods=4,freq='D').strftime('%Y-%m-%d').tolist()",
        "hint": "Una frecuencia diaria se expresa con D.",
        "textOutput": "['2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04']",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-temporales/period-y-periodindex",
    "remember": "to_period('M') representa meses completos.",
    "examples": [
      {
        "id": "pandas/series-temporales/period-y-periodindex/1",
        "title": "Sumar ventas por mes sin mezclar años",
        "code": "pedidos.groupby(pedidos['fecha'].dt.to_period('M'))['monto'].sum()",
        "hint": "to_period('M') representa meses completos.",
        "textOutput": "fecha\n2026-02    700\n2026-03    450\nFreq: M",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-temporales/resample",
    "remember": "MS representa inicio de mes; ME fin de mes en pandas 2.2+.",
    "examples": [
      {
        "id": "pandas/series-temporales/resample/1",
        "title": "Calcular ingresos mensuales",
        "code": "pedidos.set_index('fecha')['monto'].resample('MS').sum()",
        "hint": "MS representa inicio de mes; ME fin de mes en pandas 2.2+.",
        "textOutput": "fecha\n2026-02-01    700\n2026-03-01    450\nFreq: MS",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-temporales/asfreq",
    "remember": "asfreq no suma observaciones; resample sí puede hacerlo.",
    "examples": [
      {
        "id": "pandas/series-temporales/asfreq/1",
        "title": "Restaurar días ausentes",
        "code": "diario.iloc[[0,2,3]].asfreq('D')",
        "hint": "asfreq no suma observaciones; resample sí puede hacerlo.",
        "textOutput": "2026-02-01    100.0\n2026-02-02      NaN\n2026-02-03     50.0\n2026-02-04    150.0\nFreq: D",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/series-temporales/zonas-horarias",
    "remember": "Localizar y convertir son operaciones distintas.",
    "examples": [
      {
        "id": "pandas/series-temporales/zonas-horarias/1",
        "title": "Convertir hora de Ciudad de México a UTC",
        "code": "from pytz import timezone\n\npd.Timestamp('2026-02-01 09:00').tz_localize(timezone('America/Mexico_City')).tz_convert('UTC')",
        "hint": "Localizar y convertir son operaciones distintas.",
        "textOutput": "Timestamp('2026-02-01 15:00:00+0000', tz='UTC')",
        "resultLabel": "Ver resultado en pandas 2.2.3"
      }
    ]
  }
];
