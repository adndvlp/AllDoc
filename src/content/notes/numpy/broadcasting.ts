// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/broadcasting/definicion",
    "remember": "Comprueba las formas antes de sumar o multiplicar arrays.",
    "examples": [
      {
        "id": "numpy/broadcasting/definicion/1",
        "title": "Aplicar un impuesto uniforme",
        "code": "print((importes * 1.1).round(2))",
        "hint": "Comprueba las formas antes de sumar o multiplicar arrays.",
        "textOutput": "[110. 275. 165. 440. 330. 220.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/broadcasting/escalar-con-array",
    "remember": "No hace falta construir un array de constantes.",
    "examples": [
      {
        "id": "numpy/broadcasting/escalar-con-array/1",
        "title": "Aplicar un impuesto uniforme",
        "code": "print((importes * 1.1).round(2))",
        "hint": "No hace falta construir un array de constantes.",
        "textOutput": "[110. 275. 165. 440. 330. 220.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/broadcasting/vector-con-matriz",
    "remember": "Se comparan formas desde el último eje.",
    "examples": [
      {
        "id": "numpy/broadcasting/vector-con-matriz/1",
        "title": "Ajustar ventas por trimestre",
        "code": "print(ventas + np.array([10, 20, 30, 40]))",
        "hint": "Se comparan formas desde el último eje.",
        "textOutput": "[[110 170 230 290]\n [160 220 280 390]\n [210 220 230 190]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/broadcasting/vector-columna",
    "remember": "None o np.newaxis añade un eje de longitud uno.",
    "examples": [
      {
        "id": "numpy/broadcasting/vector-columna/1",
        "title": "Aplicar un factor distinto por sucursal",
        "code": "factores = np.array([1, 2, 3])\nprint(ventas * factores[:, None])",
        "hint": "None o np.newaxis añade un eje de longitud uno.",
        "textOutput": "[[100 150 200 250]\n [300 400 500 700]\n [600 600 600 450]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/broadcasting/compatibilidad-y-errores",
    "remember": "Si las dimensiones enfrentadas son diferentes y ninguna vale 1, la operación falla.",
    "examples": [
      {
        "id": "numpy/broadcasting/compatibilidad-y-errores/1",
        "title": "Comprobar formas compatibles e incompatibles",
        "code": "print(np.broadcast_shapes((3, 4), (4,)))\ntry:\n    np.broadcast_shapes((3, 4), (3,))\nexcept ValueError:\n    print('ValueError: formas incompatibles')",
        "hint": "Si las dimensiones enfrentadas son diferentes y ninguna vale 1, la operación falla.",
        "textOutput": "(3, 4)\nValueError: formas incompatibles",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/broadcasting/broadcast-to",
    "remember": "broadcast_to devuelve una vista de solo lectura; copia si necesitas modificarla.",
    "examples": [
      {
        "id": "numpy/broadcasting/broadcast-to/1",
        "title": "Repetir una previsión de forma lógica",
        "code": "a = np.broadcast_to([100, 200], (3, 2))\nprint(a)\nprint(a.flags.writeable)",
        "hint": "broadcast_to devuelve una vista de solo lectura; copia si necesitas modificarla.",
        "textOutput": "[[100 200]\n [100 200]\n [100 200]]\nFalse",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
