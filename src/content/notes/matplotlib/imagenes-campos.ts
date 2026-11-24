// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/imagenes-campos/definicion",
    "remember": "Una matriz de píxeles no es lo mismo que una figura completa exportada.",
    "examples": [
      {
        "id": "matplotlib/imagenes-campos/definicion/1",
        "title": "Mostrar una imagen RGB sintética",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.imshow(np.array([[[1.,0,0],[0,1.,0]],[[0,0,1.],[1.,1.,1.]]]),interpolation='nearest')",
        "hint": "Los tres componentes de cada píxel son rojo, verde y azul.",
        "textOutput": "Imagen de 2 × 2 píxeles: rojo, verde, azul y blanco.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/imagenes-campos/leer-guardar-imagen",
    "remember": "`imsave()` no guarda títulos ni ejes; para eso usa `savefig()`.",
    "examples": [
      {
        "id": "matplotlib/imagenes-campos/leer-guardar-imagen/1",
        "title": "Guardar y recuperar una imagen",
        "language": "python",
        "code": "ruta = salida/'matriz.png'\nplt.imsave(ruta,matriz,cmap='viridis')\nimg = plt.imread(ruta)\nfig, ax = plt.subplots()\nax.imshow(img)\nprint(img.shape)",
        "hint": "La matriz escalar se convirtió a colores al guardarla.",
        "textOutput": "Salida `(3, 3, 4)` para el PNG RGBA y nueve píxeles visibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/imagenes-campos/quiver",
    "remember": "Las componentes U y V indican dirección horizontal y vertical.",
    "examples": [
      {
        "id": "matplotlib/imagenes-campos/quiver/1",
        "title": "Representar direcciones de flujo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.quiver([0,1],[0,0],[1,0],[0,1],angles='xy',scale_units='xy',scale=1)\nax.set_xlim(-.5,2)\nax.set_ylim(-.5,1.5)\nax.set_aspect('equal')",
        "hint": "La primera flecha tiene vector (1,0) y la segunda (0,1).",
        "textOutput": "Una flecha hacia la derecha y otra hacia arriba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/imagenes-campos/streamplot",
    "remember": "Los arrays U y V deben coincidir con las dimensiones de la rejilla.",
    "examples": [
      {
        "id": "matplotlib/imagenes-campos/streamplot/1",
        "title": "Representar circulación",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.streamplot(g,g,-Y,X,density=.8)\nax.set_aspect('equal')",
        "hint": "El campo (-Y,X) gira alrededor del origen.",
        "textOutput": "Líneas de flujo circulares en sentido antihorario.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/imagenes-campos/broken-barh",
    "remember": "Los pares x son `(inicio, duración)`, no `(inicio, fin)`.",
    "examples": [
      {
        "id": "matplotlib/imagenes-campos/broken-barh/1",
        "title": "Mostrar fases de un proyecto",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.broken_barh([(0,2),(3,2)],(10,5))\nax.broken_barh([(1,4)],(20,5))\nax.set_yticks([12.5,22.5],['A','B'])\nax.set_xlabel('Días')",
        "hint": "Cada fila tiene sus propios intervalos.",
        "textOutput": "A ocupa días 0–2 y 3–5; B ocupa 1–5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
