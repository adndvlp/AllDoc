// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/criterios-visualizacion/definicion",
    "remember": "Líneas para tendencias, barras para categorías, histogramas para distribuciones y scatter para relaciones.",
    "examples": [
      {
        "id": "matplotlib/criterios-visualizacion/definicion/1",
        "title": "Comparar regiones sin distorsionar magnitudes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones,ventas_region)\nax.set_ylim(0,260)\nax.set_ylabel('Ventas (miles de MXN)')",
        "hint": "La escala empieza en cero y tiene una unidad explícita.",
        "textOutput": "Tres barras proporcionales a sus valores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/criterios-visualizacion/cuartiles-percentiles",
    "remember": "Un valor atípico no es necesariamente un error; examina su contexto antes de eliminarlo.",
    "examples": [
      {
        "id": "matplotlib/criterios-visualizacion/cuartiles-percentiles/1",
        "title": "Mostrar mediana y percentil 75",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.hist(importes,bins=[0,50,100,150])\np50,p75 = np.percentile(importes,[50,75])\nax.axvline(p50,label='Mediana')\nax.axvline(p75,linestyle='--',label='P75')\nax.legend()",
        "hint": "Las líneas marcan percentiles calculados desde los datos.",
        "textOutput": "Mediana en 60 y P75 en 90.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/criterios-visualizacion/accesibilidad",
    "remember": "No dependas exclusivamente del color para comunicar diferencias.",
    "examples": [
      {
        "id": "matplotlib/criterios-visualizacion/accesibilidad/1",
        "title": "Distinguir dos series sin depender del color",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas,color='black',marker='o',label='Real')\nax.plot(meses,metas,color='gray',linestyle='--',marker='s',label='Meta')\nax.legend()",
        "hint": "Las series tienen trazos y marcadores diferentes.",
        "textOutput": "Dos líneas distinguibles incluso en escala de grises.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/criterios-visualizacion/escalas-comparacion",
    "remember": "En barras de magnitudes usa base cero; en líneas un rango acotado puede ser útil si se identifica claramente.",
    "examples": [
      {
        "id": "matplotlib/criterios-visualizacion/escalas-comparacion/1",
        "title": "Comparar indicadores con base común",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(['A','B'],[95,100])\nax.set_ylim(0,110)\nax.bar_label(ax.containers[0])",
        "hint": "La diferencia de cinco unidades mantiene su proporción visual.",
        "textOutput": "Barras de alturas 95 y 100, con diferencia pequeña.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/criterios-visualizacion/jerarquia-visual",
    "remember": "Elimina adornos que no ayuden a responder la pregunta.",
    "examples": [
      {
        "id": "matplotlib/criterios-visualizacion/jerarquia-visual/1",
        "title": "Mostrar el mes de mayor venta frente a la meta",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas,marker='o',label='Real')\nax.plot(meses,metas,linestyle='--',label='Meta')\nax.annotate('Máximo: 210',xy=(5,210),xytext=(2.5,225),arrowprops={'arrowstyle':'->'})\nax.set_title('Ventas mensuales y meta')\nax.set_ylabel('Miles de MXN')\nax.legend()",
        "hint": "Título, unidades y anotación explican la comparación.",
        "textOutput": "Dos series y una anotación que identifica junio como máximo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
