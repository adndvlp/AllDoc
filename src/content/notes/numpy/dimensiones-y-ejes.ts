// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/definicion",
    "remember": "axis indica el eje sobre el que se opera, no necesariamente el que queda.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/definicion/1",
        "title": "Obtener totales globales y por dimensión",
        "code": "print(np.sum(ventas))\nprint(np.sum(ventas, axis=0))\nprint(np.sum(ventas, axis=1))",
        "hint": "Las tres líneas muestran el total general, los totales por trimestre y los totales por sucursal, respectivamente.",
        "textOutput": "2400\n[450 550 650 750]\n[700 950 750]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/axis-none-axis-0-y-axis-1",
    "remember": "axis=0 da un resultado por columna; axis=1 da uno por fila.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/axis-none-axis-0-y-axis-1/1",
        "title": "Obtener totales globales y por dimensión",
        "code": "print(np.sum(ventas))\nprint(np.sum(ventas, axis=0))\nprint(np.sum(ventas, axis=1))",
        "hint": "Las tres líneas muestran el total general, los totales por trimestre y los totales por sucursal, respectivamente.",
        "textOutput": "2400\n[450 550 650 750]\n[700 950 750]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/keepdims",
    "remember": "keepdims=True no conserva todos los elementos, solo el número de dimensiones.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/keepdims/1",
        "title": "Calcular participación de cada trimestre en su sucursal",
        "code": "totales = ventas.sum(axis=1, keepdims=True)\nprint(totales.shape)\nprint((ventas / totales).round(3))",
        "hint": "keepdims=True no conserva todos los elementos, solo el número de dimensiones.",
        "textOutput": "(3, 1)\n[[0.143 0.214 0.286 0.357]\n [0.158 0.211 0.263 0.368]\n [0.267 0.267 0.267 0.2  ]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/reshape",
    "remember": "reshape puede devolver una vista o una copia según la disposición.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/reshape/1",
        "title": "Distribuir 12 periodos en tres filas",
        "code": "print(np.arange(1, 13).reshape(3, -1))",
        "hint": "reshape puede devolver una vista o una copia según la disposición.",
        "textOutput": "[[ 1  2  3  4]\n [ 5  6  7  8]\n [ 9 10 11 12]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/flatten-y-ravel",
    "remember": "Si necesitas independencia de memoria, usa flatten o copy.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/flatten-y-ravel/1",
        "title": "Aplanar ventas",
        "code": "print(ventas.flatten())\nprint(np.shares_memory(ventas, ventas.ravel()))",
        "hint": "Si necesitas independencia de memoria, usa flatten o copy.",
        "textOutput": "[100 150 200 250 150 200 250 350 200 200 200 150]\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/expand-dims-newaxis-y-squeeze",
    "remember": "squeeze no elimina ejes con más de un elemento.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/expand-dims-newaxis-y-squeeze/1",
        "title": "Transformar un vector en columna y recuperarlo",
        "code": "a = np.expand_dims(importes, axis=1)\nprint(a.shape, importes[:, None].shape, a.squeeze().shape)",
        "hint": "squeeze no elimina ejes con más de un elemento.",
        "textOutput": "(6, 1) (6, 1) (6,)",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/transposicion-y-swapaxes",
    "remember": "T en un vector 1D no cambia su forma.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/transposicion-y-swapaxes/1",
        "title": "Intercambiar trimestres y sucursales",
        "code": "print(ventas.T)\nprint(np.transpose(ventas).shape, np.swapaxes(ventas, 0, 1).shape)",
        "hint": "T en un vector 1D no cambia su forma.",
        "textOutput": "[[100 150 200]\n [150 200 200]\n [200 250 200]\n [250 350 150]]\n(4, 3) (4, 3)",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/resize",
    "remember": "resize no es reshape; evita repetir datos accidentalmente.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/resize/1",
        "title": "Comparar dos formas de ampliar un array",
        "code": "a = np.array([1, 2, 3])\nprint(np.resize(a, 5))\na.resize(5, refcheck=False)\nprint(a)",
        "hint": "resize no es reshape; evita repetir datos accidentalmente. Aquí se omite la comprobación de referencias porque a es un array recién creado sin vistas ni alias.",
        "textOutput": "[1 2 3 1 2]\n[1 2 3 0 0]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/dimensiones-y-ejes/moveaxis",
    "remember": "Es útil para reorganizar dimensiones sin reordenar manualmente cada eje.",
    "examples": [
      {
        "id": "numpy/dimensiones-y-ejes/moveaxis/1",
        "title": "Pasar el último eje al comienzo",
        "code": "a = np.zeros((2, 3, 4))\nprint(np.moveaxis(a, -1, 0).shape)",
        "hint": "Es útil para reorganizar dimensiones sin reordenar manualmente cada eje.",
        "textOutput": "(4, 2, 3)",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
