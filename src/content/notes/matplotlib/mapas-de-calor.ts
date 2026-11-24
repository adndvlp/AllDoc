// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/mapas-de-calor/definicion",
    "remember": "Etiqueta filas, columnas y escala de color.",
    "examples": [
      {
        "id": "matplotlib/mapas-de-calor/definicion/1",
        "title": "Comparar ventas por región y mes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nim = ax.imshow(matriz, cmap='viridis')\nax.set_xticks(range(3), meses[:3])\nax.set_yticks(range(3), regiones)\nfig.colorbar(im, ax=ax)",
        "hint": "Cada celda representa ventas de una región en un mes.",
        "textOutput": "Una matriz 3 × 3 y una barra de color.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/mapas-de-calor/imshow-matshow",
    "remember": "En `imshow`, la primera dimensión son filas y la segunda columnas.",
    "examples": [
      {
        "id": "matplotlib/mapas-de-calor/imshow-matshow/1",
        "title": "Mostrar celdas sin suavizado",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.imshow(matriz, interpolation='nearest', origin='upper')",
        "hint": "La primera fila aparece arriba.",
        "textOutput": "Nueve celdas de color, sin interpolación visual.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/mapas-de-calor/imshow-matshow/2",
        "title": "Mostrar una matriz rápidamente",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.matshow(matriz)",
        "hint": "`matshow()` configura la visualización matricial.",
        "textOutput": "La matriz con coordenadas de fila y columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/mapas-de-calor/pcolormesh",
    "remember": "Con `shading='flat'` los bordes tienen una posición más que las celdas.",
    "examples": [
      {
        "id": "matplotlib/mapas-de-calor/pcolormesh/1",
        "title": "Representar intervalos desiguales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\np = ax.pcolormesh([0, 1, 3, 6], [0, 1, 2, 3], matriz, shading='flat')\nfig.colorbar(p, ax=ax)",
        "hint": "Las tres columnas tienen anchuras 1, 2 y 3.",
        "textOutput": "Nueve celdas con anchuras distintas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/mapas-de-calor/colorbar",
    "remember": "Pasa el objeto devuelto por la gráfica para que la escala sea coherente.",
    "examples": [
      {
        "id": "matplotlib/mapas-de-calor/colorbar/1",
        "title": "Etiquetar la escala de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nim = ax.imshow(matriz, vmin=0, vmax=100)\nfig.colorbar(im, ax=ax, label='Ventas')",
        "hint": "`vmin` y `vmax` fijan los límites de la escala.",
        "textOutput": "Una barra de color etiquetada Ventas entre 0 y 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/mapas-de-calor/contour-contourf",
    "remember": "Los niveles son valores de la variable z, no coordenadas x o y.",
    "examples": [
      {
        "id": "matplotlib/mapas-de-calor/contour-contourf/1",
        "title": "Dibujar niveles de intensidad",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.contour(X, Y, Z, levels=[1, 2, 3])",
        "hint": "Cada línea une posiciones con igual intensidad.",
        "textOutput": "Curvas para tres niveles de la superficie `Z`.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/mapas-de-calor/contour-contourf/2",
        "title": "Rellenar intervalos de intensidad",
        "language": "python",
        "code": "fig, ax = plt.subplots()\np = ax.contourf(X, Y, Z, levels=[0, 1, 2, 3, 4, 8])\nfig.colorbar(p, ax=ax)",
        "hint": "Las bandas representan intervalos de z.",
        "textOutput": "Regiones coloreadas entre los niveles indicados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
