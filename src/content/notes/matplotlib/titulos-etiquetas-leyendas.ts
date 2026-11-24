// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/definicion",
    "remember": "Una gráfica debe poder interpretarse sin leer su código.",
    "examples": [
      {
        "id": "matplotlib/titulos-etiquetas-leyendas/definicion/1",
        "title": "Identificar una gráfica de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, label='Ventas reales')\nax.set_title('Ventas del semestre')\nax.set_xlabel('Mes')\nax.set_ylabel('Ventas (miles de MXN)')\nax.legend()",
        "hint": "El título y las etiquetas dan contexto a los datos.",
        "textOutput": "Una línea con título, dos etiquetas de ejes y leyenda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/titulos",
    "remember": "Usa `fig.suptitle` para un encabezado común a varios paneles.",
    "examples": [
      {
        "id": "matplotlib/titulos-etiquetas-leyendas/titulos/1",
        "title": "Titular un reporte y su panel",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_title('Evolución mensual')\nfig.suptitle('Reporte comercial')",
        "hint": "Cada título pertenece a un objeto distinto.",
        "textOutput": "Dos títulos visibles, uno general y uno del panel.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/etiquetas-ejes",
    "remember": "No confundas la etiqueta del eje con sus marcas individuales.",
    "examples": [
      {
        "id": "matplotlib/titulos-etiquetas-leyendas/etiquetas-ejes/1",
        "title": "Indicar unidades de una gráfica",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.scatter(publicidad, ventas)\nax.set_xlabel('Publicidad (miles de MXN)')\nax.set_ylabel('Ventas (miles de MXN)')",
        "hint": "Los textos identifican las dos variables.",
        "textOutput": "Un diagrama de dispersión con ambos ejes identificados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/legend",
    "remember": "Declara las etiquetas antes de llamar a `legend()`.",
    "examples": [
      {
        "id": "matplotlib/titulos-etiquetas-leyendas/legend/1",
        "title": "Distinguir ventas de metas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, label='Real')\nax.plot(meses, metas, label='Meta')\nax.legend(loc='upper left')",
        "hint": "La leyenda usa los elementos etiquetados.",
        "textOutput": "Dos entradas en la esquina superior izquierda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/titulos-etiquetas-leyendas/leyendas-personalizadas",
    "remember": "El orden de objetos y etiquetas debe coincidir.",
    "examples": [
      {
        "id": "matplotlib/titulos-etiquetas-leyendas/leyendas-personalizadas/1",
        "title": "Colocar la leyenda sobre el panel",
        "language": "python",
        "code": "fig, ax = plt.subplots()\na, = ax.plot(meses, ventas)\nb, = ax.plot(meses, metas)\nax.legend(handles=[a,b], labels=['Real','Meta'], loc='lower center', bbox_to_anchor=(.5,1), ncols=2)",
        "hint": "La leyenda queda anclada al centro del borde superior del panel.",
        "textOutput": "Dos entradas en una sola fila, sobre la gráfica.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
