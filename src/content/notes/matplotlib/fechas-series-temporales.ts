// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/fechas-series-temporales/definicion",
    "remember": "Convierte textos a fechas y ordena cronológicamente antes de dibujar.",
    "examples": [
      {
        "id": "matplotlib/fechas-series-temporales/definicion/1",
        "title": "Dibujar ventas con fechas reales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(fechas,ventas,marker='o')\nfig.autofmt_xdate()",
        "hint": "Las fechas proceden del dataset compartido.",
        "textOutput": "Seis puntos entre enero y junio de 2026, con etiquetas temporales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fechas-series-temporales/date-formatter",
    "remember": "El formato de las etiquetas no cambia las fechas originales.",
    "examples": [
      {
        "id": "matplotlib/fechas-series-temporales/date-formatter/1",
        "title": "Mostrar año y mes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(fechas,ventas)\nax.xaxis.set_major_locator(mdates.MonthLocator())\nax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))\nfig.autofmt_xdate()",
        "hint": "Se muestra una marca por mes.",
        "textOutput": "Etiquetas como 2026-01 y 2026-02.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fechas-series-temporales/date-locators",
    "remember": "Combina el localizador con un formato de fecha adecuado.",
    "examples": [
      {
        "id": "matplotlib/fechas-series-temporales/date-locators/1",
        "title": "Mostrar marcas bimestrales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(fechas,ventas)\nax.xaxis.set_major_locator(mdates.MonthLocator(bymonth=[1,3,5]))\nax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))",
        "hint": "Se fijan los meses 1, 3 y 5.",
        "textOutput": "Marcas en enero, marzo y mayo de 2026.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/fechas-series-temporales/date-locators/2",
        "title": "Adaptar etiquetas automáticamente",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(fechas,ventas)\nloc = mdates.AutoDateLocator()\nax.xaxis.set_major_locator(loc)\nax.xaxis.set_major_formatter(mdates.ConciseDateFormatter(loc))",
        "hint": "El formato evita repetir información innecesaria.",
        "textOutput": "Etiquetas abreviadas que se ajustan al rango temporal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
