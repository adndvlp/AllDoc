// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/definicion",
    "remember": "Ordena los datos temporalmente antes de calcular; NumPy no conoce por sí mismo las fechas.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/definicion/1",
        "title": "Calcular ventas acumuladas y factores compuestos",
        "code": "print(np.cumsum(importes))\nprint(np.cumprod([1.1, 1.2, 0.9]).round(3))",
        "hint": "Cada posición incluye el valor actual y los anteriores; el producto usa factores en lugar de importes.",
        "textOutput": "[ 100  350  500  900 1200 1400]\n[1.1   1.32  1.188]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/cumsum-y-cumprod",
    "remember": "Sin axis, estas funciones operan sobre la versión aplanada del array.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/cumsum-y-cumprod/1",
        "title": "Calcular ventas acumuladas y factores compuestos",
        "code": "print(np.cumsum(importes))\nprint(np.cumprod([1.1, 1.2, 0.9]).round(3))",
        "hint": "Cada posición incluye el valor actual y los anteriores; el producto usa factores en lugar de importes.",
        "textOutput": "[ 100  350  500  900 1200 1400]\n[1.1   1.32  1.188]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/diff",
    "remember": "El resultado tiene un elemento menos en el eje por cada diferencia, salvo que añadas prepend o append.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/diff/1",
        "title": "Calcular cambios entre meses",
        "code": "print(np.diff(serie))\nprint(np.diff(serie, prepend=serie[0]))",
        "hint": "diff resta cada mes del anterior en el sentido actual menos previo; prepend conserva la longitud con una diferencia inicial de cero.",
        "textOutput": "[ 20 -10  50 -20  60]\n[  0  20 -10  50 -20  60]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/crecimiento-y-cambio-porcentual",
    "remember": "Si el valor anterior es cero, el crecimiento relativo no está definido.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/crecimiento-y-cambio-porcentual/1",
        "title": "Calcular crecimiento mensual",
        "code": "print((np.diff(serie) / serie[:-1] * 100).round(2))",
        "hint": "serie[:-1] alinea cada diferencia con el valor del periodo inmediatamente anterior.",
        "textOutput": "[ 20.    -8.33  45.45 -12.5   42.86]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/maximum-accumulate-y-minimum-accumulate",
    "remember": "No son máximos o mínimos de una ventana de tamaño fijo.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/maximum-accumulate-y-minimum-accumulate/1",
        "title": "Seguir máximos y mínimos históricos",
        "code": "print(np.maximum.accumulate(serie))\nprint(np.minimum.accumulate(serie))",
        "hint": "No son máximos o mínimos de una ventana de tamaño fijo.",
        "textOutput": "[100 120 120 160 160 200]\n[100 100 100 100 100 100]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/convolve-y-media-movil",
    "remember": "valid evita resultados de bordes incompletos; un núcleo asimétrico se invierte en la convolución.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/convolve-y-media-movil/1",
        "title": "Suavizar tres meses de ventas",
        "code": "print(np.convolve(serie, np.ones(3) / 3, mode='valid').round(2))",
        "hint": "valid evita resultados de bordes incompletos; un núcleo asimétrico se invierte en la convolución.",
        "textOutput": "[110.   130.   136.67 166.67]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/series-acumulados-y-ventanas/sliding-window-view",
    "remember": "Las ventanas solapadas comparten memoria; la vista es de solo lectura por defecto.",
    "examples": [
      {
        "id": "numpy/series-acumulados-y-ventanas/sliding-window-view/1",
        "title": "Observar ventanas de tres meses y sus medias",
        "code": "from numpy.lib.stride_tricks import sliding_window_view\nw = sliding_window_view(serie, 3)\nprint(w)\nprint(w.mean(axis=1).round(2))",
        "hint": "Las ventanas solapadas comparten memoria; la vista es de solo lectura por defecto.",
        "textOutput": "[[100 120 110]\n [120 110 160]\n [110 160 140]\n [160 140 200]]\n[110.   130.   136.67 166.67]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
