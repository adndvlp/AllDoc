// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/definicion",
    "remember": "La máscara debe tener una forma compatible con el eje seleccionado.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/definicion/1",
        "title": "Detectar importes superiores a 200",
        "code": "print(importes > 200)\nprint(np.equal(importes, 200))\nprint(np.less(importes, 200))\nprint(np.greater(importes, 200))",
        "hint": "La máscara debe tener una forma compatible con el eje seleccionado.",
        "textOutput": "[False  True False  True  True False]\n[False False False False False  True]\n[ True False  True False False False]\n[False  True False  True  True False]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/comparaciones-y-ufuncs-logicas",
    "remember": "La respuesta es un array de True y False, no un único booleano.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/comparaciones-y-ufuncs-logicas/1",
        "title": "Detectar importes superiores a 200",
        "code": "print(importes > 200)\nprint(np.equal(importes, 200))\nprint(np.less(importes, 200))\nprint(np.greater(importes, 200))",
        "hint": "La respuesta es un array de True y False, no un único booleano.",
        "textOutput": "[False  True False  True  True False]\n[False False False False False  True]\n[ True False  True False False False]\n[False  True False  True  True False]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/boolean-indexing",
    "remember": "El resultado de seleccionar por máscara es una copia.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/boolean-indexing/1",
        "title": "Filtrar ventas superiores a 200",
        "code": "print(importes[importes > 200])",
        "hint": "La comparación genera una máscara y los corchetes conservan únicamente los valores que la cumplen.",
        "textOutput": "[250 400 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/and-or-y-not",
    "remember": "Usa paréntesis alrededor de las comparaciones; no uses and/or con arrays de varios elementos.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/and-or-y-not/1",
        "title": "Filtrar importes en un intervalo",
        "code": "m = (importes >= 150) & (importes <= 300)\nprint(importes[m])\nprint(importes[(importes < 150) | (importes > 300)])\nprint(importes[~m])\nprint(np.array_equal(m, np.logical_and(importes >= 150, importes <= 300)))\nprint(np.logical_or(importes < 150, importes > 300))\nprint(np.logical_not(m))",
        "hint": "Usa paréntesis alrededor de las comparaciones; no uses and/or con arrays de varios elementos.",
        "textOutput": "[250 150 300 200]\n[100 400]\n[100 400]\nTrue\n[ True False False  True False False]\n[ True False False  True False False]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/mascaras-de-filas",
    "remember": "Construye la condición con una columna si quieres mantener las demás.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/mascaras-de-filas/1",
        "title": "Filtrar sucursales por primer trimestre",
        "code": "print(ventas[ventas[:, 0] >= 150])",
        "hint": "Construye la condición con una columna si quieres mantener las demás.",
        "textOutput": "[[150 200 250 350]\n [200 200 200 150]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/any-y-all",
    "remember": "Ambas aceptan axis para comprobar grupos.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/any-y-all/1",
        "title": "Comprobar objetivos por sucursal",
        "code": "print(np.any(ventas >= 300, axis=1))\nprint(np.all(ventas >= 100, axis=1))",
        "hint": "Ambas aceptan axis para comprobar grupos.",
        "textOutput": "[False  True False]\n[ True  True  True]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/isclose-y-allclose",
    "remember": "Para decimales calculados evita depender siempre de ==.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/isclose-y-allclose/1",
        "title": "Comparar dos totales flotantes",
        "code": "print(0.1 + 0.2 == 0.3)\nprint(np.isclose(0.1 + 0.2, 0.3))\nprint(np.allclose([0.1 + 0.2, 1.0], [0.3, 1.0]))",
        "hint": "Para decimales calculados evita depender siempre de ==.",
        "textOutput": "False\nTrue\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/comparaciones-y-mascaras/array-equal",
    "remember": "No confundir con ==, que devuelve una máscara y permite broadcasting.",
    "examples": [
      {
        "id": "numpy/comparaciones-y-mascaras/array-equal/1",
        "title": "Validar que dos reportes coincidan",
        "code": "print(np.array_equal([1, 2], [1, 2]))\nprint(np.array_equal([1, 2], [[1, 2]]))",
        "hint": "No confundir con ==, que devuelve una máscara y permite broadcasting.",
        "textOutput": "True\nFalse",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
