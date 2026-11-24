// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/precision-y-errores-numericos/definicion",
    "remember": "Comprueba el rango, dtype y tolerancia antes de confiar en un cálculo.",
    "examples": [
      {
        "id": "numpy/precision-y-errores-numericos/definicion/1",
        "title": "Observar límites de representación",
        "code": "a = np.array([127], dtype=np.int8)\nprint(a + np.int8(1))\nprint(np.exp(-1000.0))",
        "hint": "Comprueba el rango, dtype y tolerancia antes de confiar en un cálculo.",
        "textOutput": "[-128]\n0.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/precision-y-errores-numericos/overflow-y-underflow",
    "remember": "Un entero de ancho fijo puede desbordarse sin aviso en operaciones de array.",
    "examples": [
      {
        "id": "numpy/precision-y-errores-numericos/overflow-y-underflow/1",
        "title": "Observar límites de representación",
        "code": "a = np.array([127], dtype=np.int8)\nprint(a + np.int8(1))\nprint(np.exp(-1000.0))",
        "hint": "Un entero de ancho fijo puede desbordarse sin aviso en operaciones de array.",
        "textOutput": "[-128]\n0.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/precision-y-errores-numericos/precision-flotante",
    "remember": "Para dinero exacto, considera enteros en centavos o Decimal según el entorno.",
    "examples": [
      {
        "id": "numpy/precision-y-errores-numericos/precision-flotante/1",
        "title": "Comparar cálculo aproximado y centavos",
        "code": "print(format(0.1 + 0.2, '.17f'))\nprint(10 + 20)\nprint(np.finfo(np.float32).eps)",
        "hint": "Para dinero exacto, considera enteros en centavos o Decimal según el entorno.",
        "textOutput": "0.30000000000000004\n30\n1.1920929e-07",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/precision-y-errores-numericos/errstate-y-seterr",
    "remember": "raise convierte ciertos errores flotantes en FloatingPointError; no garantiza detectar todo overflow entero.",
    "examples": [
      {
        "id": "numpy/precision-y-errores-numericos/errstate-y-seterr/1",
        "title": "Controlar una división inválida",
        "code": "try:\n    with np.errstate(divide='raise'):\n        np.divide(1.0, 0.0)\nexcept FloatingPointError:\n    print('FloatingPointError')\nanterior = np.seterr(invalid='ignore')\ntry:\n    print(np.sqrt(-1.0))\nfinally:\n    np.seterr(**anterior)",
        "hint": "raise convierte ciertos errores flotantes en FloatingPointError; no garantiza detectar todo overflow entero. Ejecuta este ejemplo en Python local para observar FloatingPointError. El editor omite esa excepción en esta división.",
        "textOutput": "FloatingPointError\nnan",
        "resultLabel": "Ver resultado en NumPy 2.3.5",
        "external": true
      }
    ]
  }
];
