// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/agregaciones/definicion",
    "remember": "A diferencia de una transformación vectorizada, una reducción suele disminuir dimensiones.",
    "examples": [
      {
        "id": "numpy/agregaciones/definicion/1",
        "title": "Calcular totales y crecimiento compuesto",
        "code": "print(np.sum(importes))\nprint(np.prod([1.1, 1.2]).round(3))",
        "hint": "A diferencia de una transformación vectorizada, una reducción suele disminuir dimensiones.",
        "textOutput": "1400\n1.32",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/agregaciones/sum-y-prod",
    "remember": "Ambas aceptan axis y dtype para controlar reducción y acumulación.",
    "examples": [
      {
        "id": "numpy/agregaciones/sum-y-prod/1",
        "title": "Calcular totales y crecimiento compuesto",
        "code": "print(np.sum(importes))\nprint(np.prod([1.1, 1.2]).round(3))",
        "hint": "Ambas aceptan axis y dtype para controlar reducción y acumulación.",
        "textOutput": "1400\n1.32",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/agregaciones/mean-y-average",
    "remember": "El promedio ponderado divide la suma de valores por pesos entre la suma de pesos.",
    "examples": [
      {
        "id": "numpy/agregaciones/mean-y-average/1",
        "title": "Calcular ticket promedio y precio ponderado",
        "code": "print(np.mean(importes))\nprint(np.average(precios, weights=unidades).round(2))",
        "hint": "El ticket promedio da el mismo peso a cada pedido; el precio ponderado da más peso a los productos con más unidades.",
        "textOutput": "233.33333333333334\n50.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/agregaciones/min-max-y-ptp",
    "remember": "ptp es amplitud, no varianza ni desviación estándar.",
    "examples": [
      {
        "id": "numpy/agregaciones/min-max-y-ptp/1",
        "title": "Medir extremos de importes",
        "code": "print(np.min(importes), np.max(importes), np.ptp(importes))",
        "hint": "ptp es amplitud, no varianza ni desviación estándar.",
        "textOutput": "100 400 300",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/agregaciones/count-nonzero",
    "remember": "size cuenta todos los elementos; count_nonzero solo los verdaderos o no cero.",
    "examples": [
      {
        "id": "numpy/agregaciones/count-nonzero/1",
        "title": "Contar ventas que superan el objetivo",
        "code": "print(np.count_nonzero(importes > 200))\nprint(np.count_nonzero(ventas >= 200, axis=1))",
        "hint": "size cuenta todos los elementos; count_nonzero solo los verdaderos o no cero.",
        "textOutput": "3\n[2 3 3]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/agregaciones/argmin-y-argmax",
    "remember": "Con axis=None el índice corresponde al array aplanado.",
    "examples": [
      {
        "id": "numpy/agregaciones/argmin-y-argmax/1",
        "title": "Identificar la sucursal del mejor primer trimestre",
        "code": "i = np.argmax(ventas[:, 0])\nprint(i, sucursales[i])\nprint(np.argmin(importes))",
        "hint": "Con axis=None el índice corresponde al array aplanado.",
        "textOutput": "2 Sur\n0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
