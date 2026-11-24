// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/proyecciones/definicion",
    "remember": "Usa proyecciones especiales solo si la naturaleza de los datos lo requiere.",
    "examples": [
      {
        "id": "matplotlib/proyecciones/definicion/1",
        "title": "Representar tres variables",
        "language": "python",
        "code": "fig, ax = plt.subplots(subplot_kw={'projection':'3d'})\nax.scatter(publicidad,ventas,pedidos)\nax.set_xlabel('Publicidad')\nax.set_ylabel('Ventas')\nax.set_zlabel('Pedidos')",
        "hint": "El tercer eje representa pedidos.",
        "textOutput": "Seis observaciones en un espacio tridimensional.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/proyecciones/plot-surface",
    "remember": "Las tres matrices deben tener dimensiones compatibles.",
    "examples": [
      {
        "id": "matplotlib/proyecciones/plot-surface/1",
        "title": "Representar una superficie de intensidad",
        "language": "python",
        "code": "fig, ax = plt.subplots(subplot_kw={'projection':'3d'})\nax.plot_surface(X,Y,Z,cmap='viridis')",
        "hint": "Z representa la altura para cada posición de X e Y.",
        "textOutput": "Superficie con forma de cuenco.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/proyecciones/polar",
    "remember": "Convierte grados a radianes si los datos originales están en grados.",
    "examples": [
      {
        "id": "matplotlib/proyecciones/polar/1",
        "title": "Representar magnitudes por dirección",
        "language": "python",
        "code": "fig, ax = plt.subplots(subplot_kw={'projection':'polar'})\nax.scatter(np.deg2rad([0,90,180,270]),[1,2,3,4])",
        "hint": "Los ángulos se convierten antes de dibujar.",
        "textOutput": "Cuatro puntos en direcciones cardinales con radios 1, 2, 3 y 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
