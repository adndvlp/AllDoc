// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/barras/definicion",
    "remember": "La longitud de la barra representa su valor; usa una base cero para comparar magnitudes.",
    "examples": [
      {
        "id": "matplotlib/barras/definicion/1",
        "title": "Comparar ventas por región",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region)",
        "hint": "Cada categoría tiene una barra.",
        "textOutput": "Norte 240, Centro 180 y Sur 120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/barras/barh",
    "remember": "Ordena los datos y, si quieres el mayor arriba, invierte el eje y.",
    "examples": [
      {
        "id": "matplotlib/barras/barh/1",
        "title": "Mostrar regiones de mayor a menor",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.barh(regiones, ventas_region)\nax.invert_yaxis()",
        "hint": "Las regiones ya están ordenadas por ventas descendentes.",
        "textOutput": "Norte arriba, Centro en medio y Sur abajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/barras/barras-agrupadas",
    "remember": "Usa posiciones numéricas y offsets; las categorías van en las marcas del eje.",
    "examples": [
      {
        "id": "matplotlib/barras/barras-agrupadas/1",
        "title": "Comparar ventas y metas regionales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nx = np.arange(len(regiones))\nw = 0.35\nax.bar(x-w/2, ventas_region, width=w, label='Ventas')\nax.bar(x+w/2, meta_region, width=w, label='Meta')\nax.set_xticks(x, regiones)\nax.legend()",
        "hint": "Los desplazamientos evitan que se superpongan las barras.",
        "textOutput": "Tres pares de barras: 240/220, 180/200 y 120/150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/barras/barras-apiladas",
    "remember": "La altura total es la suma de los componentes, no el valor de la última serie.",
    "examples": [
      {
        "id": "matplotlib/barras/barras-apiladas/1",
        "title": "Separar ventas por canal",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, online, label='Online')\nax.bar(regiones, tienda, bottom=online, label='Tienda')\nax.legend()",
        "hint": "La segunda serie comienza encima de la primera.",
        "textOutput": "Tres barras con alturas totales 240, 180 y 120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
