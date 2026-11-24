// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/definicion",
    "remember": "Por defecto las operaciones aritméticas son elemento a elemento.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/definicion/1",
        "title": "Calcular importes, diferencias y descuentos",
        "code": "print(unidades * precios)\nprint(np.add(unidades, 1))\nprint(np.subtract(precios, 5))\nprint(np.divide(precios, 2))\nprint(unidades // 3, unidades % 3, unidades ** 2)\nprint(np.multiply(unidades, precios))",
        "hint": "Por defecto las operaciones aritméticas son elemento a elemento.",
        "textOutput": "[100 100 300]\n[3 6 4]\n[45 15 95]\n[25. 10. 50.]\n[0 1 1] [2 2 0] [ 4 25  9]\n[100 100 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/aritmetica-basica",
    "remember": "* multiplica elementos; @ multiplica matrices.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/aritmetica-basica/1",
        "title": "Calcular importes, diferencias y descuentos",
        "code": "print(unidades * precios)\nprint(np.add(unidades, 1))\nprint(np.subtract(precios, 5))\nprint(np.divide(precios, 2))\nprint(unidades // 3, unidades % 3, unidades ** 2)\nprint(np.multiply(unidades, precios))",
        "hint": "* multiplica elementos; @ multiplica matrices.",
        "textOutput": "[100 100 300]\n[3 6 4]\n[45 15 95]\n[25. 10. 50.]\n[0 1 1] [2 2 0] [ 4 25  9]\n[100 100 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/funciones-matematicas",
    "remember": "log es el logaritmo natural; para datos reales requiere entradas positivas para resultados finitos.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/funciones-matematicas/1",
        "title": "Transformar importes y escalas",
        "code": "print(np.sqrt([1, 4, 9]))\nprint(np.exp([0, 1]).round(4))\nprint(np.log([1, np.e]).round(4))\nprint(np.log10([10, 100]))",
        "hint": "log es el logaritmo natural; para datos reales requiere entradas positivas para resultados finitos.",
        "textOutput": "[1. 2. 3.]\n[1.     2.7183]\n[0. 1.]\n[1. 2.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/redondeo-y-valor-absoluto",
    "remember": "floor baja al entero, ceil sube y trunc corta hacia cero; round usa empate al par para mitades exactas.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/redondeo-y-valor-absoluto/1",
        "title": "Redondear ajustes positivos y negativos",
        "code": "a = np.array([2.5, 3.5, -2.7])\nprint(np.round(a))\nprint(np.floor(a))\nprint(np.ceil(a))\nprint(np.trunc(a))\nprint(np.abs(a))",
        "hint": "floor baja al entero, ceil sube y trunc corta hacia cero; round usa empate al par para mitades exactas.",
        "textOutput": "[ 2.  4. -3.]\n[ 2.  3. -3.]\n[ 3.  4. -2.]\n[ 2.  3. -2.]\n[2.5 3.5 2.7]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/trigonometria-y-complejos",
    "remember": "Los ángulos no se expresan en grados directamente en sin y cos.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/trigonometria-y-complejos/1",
        "title": "Calcular una fase y su conjugado",
        "code": "print(np.sin(np.deg2rad([0, 90])).round(4))\nprint(np.cos([0, np.pi]).round(4))\nprint(np.conj([1 + 2j]))",
        "hint": "Los ángulos no se expresan en grados directamente en sin y cos.",
        "textOutput": "[0. 1.]\n[ 1. -1.]\n[1.-2.j]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/operaciones-vectorizadas/vectorizacion-frente-a-ciclos",
    "remember": "Evita confundir vectorize con una ufunc nativa.",
    "examples": [
      {
        "id": "numpy/operaciones-vectorizadas/vectorizacion-frente-a-ciclos/1",
        "title": "Comparar una transformación de precios",
        "code": "print([p * 0.9 for p in precios])\nprint(precios * 0.9)",
        "hint": "Evita confundir vectorize con una ufunc nativa.",
        "textOutput": "[np.float64(45.0), np.float64(18.0), np.float64(90.0)]\n[45. 18. 90.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
