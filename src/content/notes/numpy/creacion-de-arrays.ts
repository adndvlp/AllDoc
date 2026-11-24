// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/definicion",
    "remember": "Elige la función según necesites valores concretos, una forma o una secuencia.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/definicion/1",
        "title": "Crear números de trimestre",
        "code": "print(np.arange(1, 5))",
        "hint": "El intervalo empieza en 1 y se detiene antes de 5.",
        "textOutput": "[1 2 3 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/arange",
    "remember": "arange se parece a range; con pasos flotantes puede haber imprecisión.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/arange/1",
        "title": "Crear números de trimestre",
        "code": "print(np.arange(1, 5))",
        "hint": "El intervalo empieza en 1 y se detiene antes de 5.",
        "textOutput": "[1 2 3 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/linspace",
    "remember": "El tercer argumento es el número de puntos, no el paso; incluye el final por defecto.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/linspace/1",
        "title": "Crear cinco tasas de descuento",
        "code": "print(np.linspace(0, 0.2, 5))",
        "hint": "El tercer argumento es el número de puntos, no el paso; incluye el final por defecto.",
        "textOutput": "[0.   0.05 0.1  0.15 0.2 ]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/zeros-ones-y-full",
    "remember": "La forma se indica con un entero o una tupla.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/zeros-ones-y-full/1",
        "title": "Inicializar previsiones",
        "code": "print(np.zeros((2, 3), dtype=int))\nprint(np.ones(3, dtype=int))\nprint(np.full(3, 150))",
        "hint": "La forma se indica con un entero o una tupla.",
        "textOutput": "[[0 0 0]\n [0 0 0]]\n[1 1 1]\n[150 150 150]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/empty",
    "remember": "No leas empty antes de llenar todos los elementos.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/empty/1",
        "title": "Reservar y completar importes",
        "code": "a = np.empty(3, dtype=int)\na[:] = [100, 200, 300]\nprint(a)",
        "hint": "No leas empty antes de llenar todos los elementos.",
        "textOutput": "[100 200 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/eye-e-identity",
    "remember": "eye permite una matriz rectangular o desplazar la diagonal; identity es cuadrada.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/eye-e-identity/1",
        "title": "Crear una matriz identidad",
        "code": "print(np.eye(3, dtype=int))\nprint(np.eye(2, 3, k=1, dtype=int))\nprint(np.identity(2, dtype=int))",
        "hint": "eye permite una matriz rectangular o desplazar la diagonal; identity es cuadrada.",
        "textOutput": "[[1 0 0]\n [0 1 0]\n [0 0 1]]\n[[0 1 0]\n [0 0 1]]\n[[1 0]\n [0 1]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/creacion-de-arrays/funciones-like",
    "remember": "Indica dtype si el valor nuevo requiere otro tipo.",
    "examples": [
      {
        "id": "numpy/creacion-de-arrays/funciones-like/1",
        "title": "Inicializar una previsión del mismo tamaño",
        "code": "print(np.full_like(ventas, 50))",
        "hint": "Indica dtype si el valor nuevo requiere otro tipo.",
        "textOutput": "[[50 50 50 50]\n [50 50 50 50]\n [50 50 50 50]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
