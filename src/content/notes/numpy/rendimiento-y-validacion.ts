// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/rendimiento-y-validacion/definicion",
    "remember": "No afirmes que una operación es más rápida sin medir en tu contexto.",
    "examples": [
      {
        "id": "numpy/rendimiento-y-validacion/definicion/1",
        "title": "Comparar una operación Python y NumPy",
        "code": "from timeit import timeit\na = np.arange(1000)\nt1 = timeit(lambda: [int(x) * 2 for x in a], number=100)\nt2 = timeit(lambda: a * 2, number=100)\nprint(np.array_equal([int(x) * 2 for x in a], a * 2))\nprint(t1 >= 0 and t2 >= 0)",
        "hint": "No afirmes que una operación es más rápida sin medir en tu contexto.",
        "textOutput": "True\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/rendimiento-y-validacion/medir-tiempos-con-timeit",
    "remember": "Compara operaciones equivalentes; no uses un solo tiempo como conclusión general.",
    "examples": [
      {
        "id": "numpy/rendimiento-y-validacion/medir-tiempos-con-timeit/1",
        "title": "Comparar una operación Python y NumPy",
        "code": "from timeit import timeit\na = np.arange(1000)\nt1 = timeit(lambda: [int(x) * 2 for x in a], number=100)\nt2 = timeit(lambda: a * 2, number=100)\nprint(np.array_equal([int(x) * 2 for x in a], a * 2))\nprint(t1 >= 0 and t2 >= 0)",
        "hint": "Compara operaciones equivalentes; no uses un solo tiempo como conclusión general.",
        "textOutput": "True\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/rendimiento-y-validacion/consumo-de-memoria-y-dtype",
    "remember": "Comprueba límites antes de convertir y evita conversiones repetidas.",
    "examples": [
      {
        "id": "numpy/rendimiento-y-validacion/consumo-de-memoria-y-dtype/1",
        "title": "Comparar almacenamiento con dos dtypes",
        "code": "a = np.arange(1000, dtype=np.int64)\nb = a.astype(np.int32)\nprint(a.nbytes, b.nbytes, np.array_equal(a, b))",
        "hint": "Comprueba límites antes de convertir y evita conversiones repetidas.",
        "textOutput": "8000 4000 True",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/rendimiento-y-validacion/validacion-con-numpy-testing",
    "remember": "Una aserción fallida produce AssertionError; una prueba correcta no imprime nada por sí sola.",
    "examples": [
      {
        "id": "numpy/rendimiento-y-validacion/validacion-con-numpy-testing/1",
        "title": "Verificar totales y resultados aproximados",
        "code": "np.testing.assert_array_equal(ventas.sum(axis=0), [450, 550, 650, 750])\nnp.testing.assert_allclose(np.array([0.1 + 0.2]), [0.3])\nprint('Validación correcta')",
        "hint": "Una aserción fallida produce AssertionError; una prueba correcta no imprime nada por sí sola.",
        "textOutput": "Validación correcta",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
