// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/definicion",
    "remember": "Los conjuntos ignoran la multiplicidad; no sustituyen un join relacional.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/definicion/1",
        "title": "Contar pedidos por estado",
        "code": "valores, cuentas = np.unique(estados, return_counts=True)\nprint(valores, cuentas)",
        "hint": "El primer array contiene los estados y el segundo sus frecuencias en el mismo orden.",
        "textOutput": "['cancelled' 'completed'] [2 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/unique-y-return-counts",
    "remember": "Los conteos corresponden a los valores únicos en el mismo orden.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/unique-y-return-counts/1",
        "title": "Contar pedidos por estado",
        "code": "valores, cuentas = np.unique(estados, return_counts=True)\nprint(valores, cuentas)",
        "hint": "El primer array contiene los estados y el segundo sus frecuencias en el mismo orden.",
        "textOutput": "['cancelled' 'completed'] [2 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/return-inverse-y-return-index",
    "remember": "Los índices devueltos se alinean con los valores únicos.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/return-inverse-y-return-index/1",
        "title": "Codificar y reconstruir categorías",
        "code": "u, idx, inv = np.unique(estados, return_index=True, return_inverse=True)\nprint(u, idx, inv)\nprint(u[inv])",
        "hint": "Los índices devueltos se alinean con los valores únicos.",
        "textOutput": "['cancelled' 'completed'] [1 0] [1 0 1 1 1 0]\n['completed' 'cancelled' 'completed' 'completed' 'completed' 'cancelled']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/bincount",
    "remember": "minlength asegura espacio para códigos que no aparecen.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/bincount/1",
        "title": "Contar y sumar ventas por sucursal codificada",
        "code": "print(np.bincount(codigos, minlength=3))\nprint(np.bincount(codigos, weights=importes, minlength=3))",
        "hint": "minlength asegura espacio para códigos que no aparecen.",
        "textOutput": "[2 2 2]\n[250. 550. 600.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/isin",
    "remember": "Devuelve una máscara con la misma forma de la entrada.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/isin/1",
        "title": "Filtrar pedidos de determinados clientes",
        "code": "print(importes[np.isin(clientes, [1, 3])])",
        "hint": "Devuelve una máscara con la misma forma de la entrada.",
        "textOutput": "[100 150 400 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/union1d-e-intersect1d",
    "remember": "Los resultados se devuelven ordenados y sin duplicados.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/union1d-e-intersect1d/1",
        "title": "Comparar clientes de dos periodos",
        "code": "print(np.union1d([1, 2, 3], [2, 4]))\nprint(np.intersect1d([1, 2, 3], [2, 4]))",
        "hint": "Los resultados se devuelven ordenados y sin duplicados.",
        "textOutput": "[1 2 3 4]\n[2]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/valores-unicos-y-conjuntos/setdiff1d-y-setxor1d",
    "remember": "La diferencia depende del orden de los argumentos.",
    "examples": [
      {
        "id": "numpy/valores-unicos-y-conjuntos/setdiff1d-y-setxor1d/1",
        "title": "Identificar clientes perdidos y exclusivos",
        "code": "print(np.setdiff1d([1, 2, 3], [2, 4]))\nprint(np.setxor1d([1, 2, 3], [2, 4]))",
        "hint": "La diferencia depende del orden de los argumentos.",
        "textOutput": "[1 3]\n[1 3 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
