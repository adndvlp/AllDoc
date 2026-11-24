// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/ndimage/definicion",
    "remember": "Los filtros cambian valores y pueden alterar los bordes.",
    "examples": [
      {
        "id": "scipy/ndimage/definicion/1",
        "title": "Suavizar un mapa de intensidad",
        "code": "from scipy.ndimage import gaussian_filter\nx = np.array([[0.,0.,0.],[0.,9.,0.],[0.,0.,0.]])\nprint(np.round(gaussian_filter(x, sigma=1), 2))",
        "hint": "La intensidad central se reparte entre vecinos.",
        "textOutput": "[[0.79 1.09 0.79]\n [1.09 1.5  1.09]\n [0.79 1.09 0.79]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ndimage/gaussian-filter",
    "remember": "Sigma mayor produce más suavizado.",
    "examples": [
      {
        "id": "scipy/ndimage/gaussian-filter/1",
        "title": "Suavizar una línea de intensidad",
        "code": "from scipy.ndimage import gaussian_filter\nprint(np.round(gaussian_filter(np.array([0.,0.,9.,0.,0.]), sigma=1), 2))",
        "hint": "La salida conserva el tamaño.",
        "textOutput": "[0.53 2.18 3.59 2.18 0.53]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ndimage/label",
    "remember": "La conectividad define qué píxeles son vecinos.",
    "examples": [
      {
        "id": "scipy/ndimage/label/1",
        "title": "Contar zonas de actividad",
        "code": "from scipy.ndimage import label\nr, n = label([[1,0,1],[1,0,0]])\nprint(r)\nprint(n)",
        "hint": "Hay dos componentes separadas.",
        "textOutput": "[[1 0 2]\n [1 0 0]]\n2",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
