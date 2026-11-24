// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/definicion",
    "remember": "Comprueba que las dimensiones no combinadas sean compatibles.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/definicion/1",
        "title": "Unir dos periodos de ventas",
        "code": "print(np.concatenate([ventas[:, :2], ventas[:, 2:]], axis=1))\nprint(np.concatenate([[100, 200], [300]]))",
        "hint": "Comprueba que las dimensiones no combinadas sean compatibles.",
        "textOutput": "[[100 150 200 250]\n [150 200 250 350]\n [200 200 200 150]]\n[100 200 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/concatenate",
    "remember": "La forma debe coincidir en todos los ejes salvo el elegido.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/concatenate/1",
        "title": "Unir dos periodos de ventas",
        "code": "print(np.concatenate([ventas[:, :2], ventas[:, 2:]], axis=1))\nprint(np.concatenate([[100, 200], [300]]))",
        "hint": "La forma debe coincidir en todos los ejes salvo el elegido.",
        "textOutput": "[[100 150 200 250]\n [150 200 250 350]\n [200 200 200 150]]\n[100 200 300]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/stack",
    "remember": "A diferencia de concatenate, aumenta ndim en uno.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/stack/1",
        "title": "Comparar dos escenarios de ventas",
        "code": "a = np.stack([ventas, ventas + 10], axis=0)\nprint(a.shape)\nprint(a[1])",
        "hint": "A diferencia de concatenate, aumenta ndim en uno.",
        "textOutput": "(2, 3, 4)\n[[110 160 210 260]\n [160 210 260 360]\n [210 210 210 160]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/vstack-hstack-y-column-stack",
    "remember": "Para datos 1D, hstack concatena y column_stack crea una matriz.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/vstack-hstack-y-column-stack/1",
        "title": "Combinar precios y cantidades",
        "code": "print(np.vstack([unidades, precios]))\nprint(np.hstack([unidades, precios]))\nprint(np.column_stack([unidades, precios]))",
        "hint": "Para datos 1D, hstack concatena y column_stack crea una matriz.",
        "textOutput": "[[  2   5   3]\n [ 50  20 100]]\n[  2   5   3  50  20 100]\n[[  2  50]\n [  5  20]\n [  3 100]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/split-y-array-split",
    "remember": "split falla si pides un número de partes iguales que no divide el eje.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/split-y-array-split/1",
        "title": "Separar semestres y lotes de tamaños distintos",
        "code": "print([a.tolist() for a in np.split(ventas, 2, axis=1)])\nprint([a.tolist() for a in np.array_split(importes, 4)])",
        "hint": "split falla si pides un número de partes iguales que no divide el eje.",
        "textOutput": "[[[100, 150], [150, 200], [200, 200]], [[200, 250], [250, 350], [200, 150]]]\n[[100, 250], [150, 400], [300], [200]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/hsplit-y-vsplit",
    "remember": "Son atajos para split con los ejes habituales de una matriz.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/hsplit-y-vsplit/1",
        "title": "Separar sucursales y trimestres",
        "code": "print([a.shape for a in np.hsplit(ventas, 2)])\nprint([a.shape for a in np.vsplit(ventas, 3)])",
        "hint": "Son atajos para split con los ejes habituales de una matriz.",
        "textOutput": "[(3, 2), (3, 2)]\n[(1, 4), (1, 4), (1, 4)]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/append-insert-y-delete",
    "remember": "No modifican el original; omitir axis en estas funciones puede aplanar los datos.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/append-insert-y-delete/1",
        "title": "Modificar una serie sin alterar la fuente",
        "code": "print(np.append(importes, 800))\nprint(np.insert(importes, 1, 50))\nprint(np.delete(importes, [0, 2]))",
        "hint": "No modifican el original; omitir axis en estas funciones puede aplanar los datos.",
        "textOutput": "[100 250 150 400 300 200 800]\n[100  50 250 150 400 300 200]\n[250 400 300 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/combinar-y-dividir-arrays/repeat-y-tile",
    "remember": "Para cálculos suele ser preferible broadcasting a replicar grandes arrays.",
    "examples": [
      {
        "id": "numpy/combinar-y-dividir-arrays/repeat-y-tile/1",
        "title": "Expandir dos escenarios de precios",
        "code": "print(np.repeat([10, 20], 3))\nprint(np.tile([10, 20], 3))",
        "hint": "Para cálculos suele ser preferible broadcasting a replicar grandes arrays.",
        "textOutput": "[10 10 10 20 20 20]\n[10 20 10 20 10 20]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
