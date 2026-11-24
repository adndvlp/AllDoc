// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/definicion",
    "remember": "a[fila, columna] accede a una matriz por sus ejes.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/definicion/1",
        "title": "Obtener ventas de los extremos",
        "code": "print(importes[0], importes[-1])",
        "hint": "a[fila, columna] accede a una matriz por sus ejes.",
        "textOutput": "100 200",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/indices-positivos-y-negativos",
    "remember": "-1 selecciona el último elemento.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/indices-positivos-y-negativos/1",
        "title": "Obtener ventas de los extremos",
        "code": "print(importes[0], importes[-1])",
        "hint": "-1 selecciona el último elemento.",
        "textOutput": "100 200",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/slicing-start-stop-step",
    "remember": "El extremo stop queda excluido; omitirlo llega al final.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/slicing-start-stop-step/1",
        "title": "Seleccionar meses y saltar posiciones",
        "code": "print(importes[1:4])\nprint(importes[::2])\nprint(importes[::-1])",
        "hint": "El extremo stop queda excluido; omitirlo llega al final.",
        "textOutput": "[250 150 400]\n[100 150 300]\n[200 300 400 150 250 100]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/filas-y-columnas",
    "remember": "Los dos puntos conservan todo el eje correspondiente.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/filas-y-columnas/1",
        "title": "Ver una sucursal y un trimestre",
        "code": "print(ventas[1, :])\nprint(ventas[:, 2])\nprint(ventas[0, 1])",
        "hint": "Los dos puntos conservan todo el eje correspondiente.",
        "textOutput": "[150 200 250 350]\n[200 250 200]\n150",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/slicing-multidimensional",
    "remember": "Seleccionar 0:2 en filas y 1:3 en columnas produce un bloque de 2 × 2.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/slicing-multidimensional/1",
        "title": "Seleccionar dos sucursales y dos trimestres",
        "code": "print(ventas[:2, 1:3])",
        "hint": "Seleccionar 0:2 en filas y 1:3 en columnas produce un bloque de 2 × 2.",
        "textOutput": "[[150 200]\n [200 250]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/ellipsis",
    "remember": "a[..., -1] elige el último elemento del último eje.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/ellipsis/1",
        "title": "Consultar el último trimestre",
        "code": "print(ventas[..., -1])",
        "hint": "a[..., -1] elige el último elemento del último eje.",
        "textOutput": "[250 350 150]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/fancy-indexing",
    "remember": "La indexación avanzada devuelve una copia, no una vista.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/fancy-indexing/1",
        "title": "Reordenar sucursales",
        "code": "print(ventas[[2, 0, 2]])",
        "hint": "La indexación avanzada devuelve una copia, no una vista.",
        "textOutput": "[[200 200 200 150]\n [100 150 200 250]\n [200 200 200 150]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/indexacion-y-slicing/indices-emparejados-e-ix",
    "remember": "No confundas pares fila-columna con una submatriz de todas las combinaciones.",
    "examples": [
      {
        "id": "numpy/indexacion-y-slicing/indices-emparejados-e-ix/1",
        "title": "Comparar selección emparejada y rectangular",
        "code": "print(ventas[[0, 2], [1, 3]])\nprint(ventas[np.ix_([0, 2], [1, 3])])",
        "hint": "No confundas pares fila-columna con una submatriz de todas las combinaciones.",
        "textOutput": "[150 150]\n[[150 250]\n [200 150]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
