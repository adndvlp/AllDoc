// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/definicion",
    "remember": "Distingue multiplicación elemento a elemento de producto matricial.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/definicion/1",
        "title": "Calcular ingresos por sucursal a partir de cantidades por producto",
        "code": "q = np.array([[2, 3], [4, 1]])\np = np.array([10, 20])\nprint(q @ p)\nprint(np.matmul(q, p))\nprint(np.dot(q, p))",
        "hint": "Distingue multiplicación elemento a elemento de producto matricial.",
        "textOutput": "[80 60]\n[80 60]\n[80 60]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/dot-matmul-y",
    "remember": "Para dimensiones superiores dot y matmul tienen reglas distintas.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/dot-matmul-y/1",
        "title": "Calcular ingresos por sucursal a partir de cantidades por producto",
        "code": "q = np.array([[2, 3], [4, 1]])\np = np.array([10, 20])\nprint(q @ p)\nprint(np.matmul(q, p))\nprint(np.dot(q, p))",
        "hint": "Para dimensiones superiores dot y matmul tienen reglas distintas.",
        "textOutput": "[80 60]\n[80 60]\n[80 60]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/inner-outer-y-tensordot",
    "remember": "Especifica qué dimensiones se multiplican y suman.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/inner-outer-y-tensordot/1",
        "title": "Comparar productos de vectores y contracción",
        "code": "a = np.array([1, 2])\nb = np.array([10, 20])\nprint(np.inner(a, b))\nprint(np.outer(a, b))\nprint(np.tensordot(a, b, axes=1))",
        "hint": "Especifica qué dimensiones se multiplican y suman.",
        "textOutput": "50\n[[10 20]\n [20 40]]\n50",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/einsum",
    "remember": "ij,j->i expresa un producto matriz-vector.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/einsum/1",
        "title": "Calcular un total ponderado por fila",
        "code": "print(np.einsum('ij,j->i', ventas, [1, 2, 3, 4]))\nprint(np.einsum('ij->j', ventas))",
        "hint": "ij,j->i expresa un producto matriz-vector.",
        "textOutput": "[2000 2700 1800]\n[450 550 650 750]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/normas",
    "remember": "La norma euclidiana de un vector es la raíz de la suma de cuadrados.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/normas/1",
        "title": "Medir distancia entre dos perfiles",
        "code": "print(np.linalg.norm([3, 4]))\nprint(np.linalg.norm([[3, 4], [0, 2]], axis=1))",
        "hint": "La norma euclidiana de un vector es la raíz de la suma de cuadrados.",
        "textOutput": "5.0\n[5. 2.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/diag-trace-tril-y-triu",
    "remember": "tril y triu ponen cero fuera del triángulo seleccionado.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/diag-trace-tril-y-triu/1",
        "title": "Inspeccionar una matriz de relaciones",
        "code": "a = np.array([[1, 2], [3, 4]])\nprint(np.diag(a), np.trace(a))\nprint(np.tril(a))\nprint(np.triu(a))",
        "hint": "tril y triu ponen cero fuera del triángulo seleccionado.",
        "textOutput": "[1 4] 5\n[[1 0]\n [3 4]]\n[[1 2]\n [0 4]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/solve-e-inv",
    "remember": "Para resolver un sistema usa solve en vez de calcular explícitamente la inversa.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/solve-e-inv/1",
        "title": "Resolver cantidades de dos productos",
        "code": "a = np.array([[2, 1], [1, 1]])\nb = np.array([70, 45])\nprint(np.linalg.solve(a, b))\nprint(np.linalg.inv(a).round(2))",
        "hint": "Para resolver un sistema usa solve en vez de calcular explícitamente la inversa.",
        "textOutput": "[25. 20.]\n[[ 1. -1.]\n [-1.  2.]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/determinante-y-rango",
    "remember": "Un determinante cercano a cero no basta para diagnosticar estabilidad; usa también rango o condición.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/determinante-y-rango/1",
        "title": "Detectar dependencia lineal",
        "code": "a = np.array([[1, 2], [2, 4]])\nprint(np.linalg.det(a).round(4), np.linalg.matrix_rank(a))",
        "hint": "Un determinante cercano a cero no basta para diagnosticar estabilidad; usa también rango o condición.",
        "textOutput": "0.0 1",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/valores-y-vectores-propios",
    "remember": "Los signos de los vectores propios y el orden de algunos resultados pueden variar.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/valores-y-vectores-propios/1",
        "title": "Obtener componentes principales de una matriz simétrica sencilla",
        "code": "a = np.array([[3, 1], [1, 3]])\nw, v = np.linalg.eigh(a)\nprint(w)\nprint(np.allclose(a @ v, v * w))",
        "hint": "Los signos de los vectores propios y el orden de algunos resultados pueden variar.",
        "textOutput": "[2. 4.]\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/svd-y-qr",
    "remember": "Las descomposiciones se usan en reducción de dimensión y resolución numérica.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/svd-y-qr/1",
        "title": "Verificar reconstrucciones matriciales",
        "code": "a = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])\nu, s, vh = np.linalg.svd(a, full_matrices=False)\nq, r = np.linalg.qr(a)\nprint(s.round(3))\nprint(np.allclose(u * s @ vh, a), np.allclose(q @ r, a))",
        "hint": "Las descomposiciones se usan en reducción de dimensión y resolución numérica.",
        "textOutput": "[9.526 0.514]\nTrue True",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/algebra-lineal/minimos-cuadrados",
    "remember": "No requiere un sistema cuadrado; la calidad de la predicción depende del modelo.",
    "examples": [
      {
        "id": "numpy/algebra-lineal/minimos-cuadrados/1",
        "title": "Ajustar ingresos lineales según inversión",
        "code": "x = np.array([1, 2, 3])\ny = np.array([3, 5, 7])\na = np.column_stack((x, np.ones(3)))\ncoef, *_ = np.linalg.lstsq(a, y, rcond=None)\nprint(coef.round(3))",
        "hint": "No requiere un sistema cuadrado; la calidad de la predicción depende del modelo.",
        "textOutput": "[2. 1.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
