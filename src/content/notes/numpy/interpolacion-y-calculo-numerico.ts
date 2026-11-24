// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/definicion",
    "remember": "Los resultados dependen del espaciado, la escala y el modelo elegido.",
    "examples": [
      {
        "id": "numpy/interpolacion-y-calculo-numerico/definicion/1",
        "title": "Estimar ventas entre dos periodos",
        "code": "print(np.interp([1.5, 2.5], [1, 2, 3], [100, 200, 400]))",
        "hint": "Los resultados dependen del espaciado, la escala y el modelo elegido.",
        "textOutput": "[150. 300.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/interp",
    "remember": "Por defecto fuera del rango devuelve el valor del extremo, no extrapola linealmente.",
    "examples": [
      {
        "id": "numpy/interpolacion-y-calculo-numerico/interp/1",
        "title": "Estimar ventas entre dos periodos",
        "code": "print(np.interp([1.5, 2.5], [1, 2, 3], [100, 200, 400]))",
        "hint": "Por defecto fuera del rango devuelve el valor del extremo, no extrapola linealmente.",
        "textOutput": "[150. 300.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/gradient",
    "remember": "Indica el espaciado si las observaciones no están separadas por una unidad.",
    "examples": [
      {
        "id": "numpy/interpolacion-y-calculo-numerico/gradient/1",
        "title": "Estimar cambio por unidad de tiempo",
        "code": "print(np.gradient([0.0, 4.0, 16.0], 2))",
        "hint": "Indica el espaciado si las observaciones no están separadas por una unidad.",
        "textOutput": "[2. 4. 6.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/interpolacion-y-calculo-numerico/trapezoid",
    "remember": "Indica x o dx; no ordena automáticamente las coordenadas. Disponible desde NumPy 2.0.",
    "examples": [
      {
        "id": "numpy/interpolacion-y-calculo-numerico/trapezoid/1",
        "title": "Estimar unidades acumuladas a partir de tasas",
        "code": "print(np.trapezoid([10, 20, 30], x=[0, 1, 2]))",
        "hint": "Indica x o dx; no ordena automáticamente las coordenadas. Disponible desde NumPy 2.0.",
        "textOutput": "40.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
