// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/definicion",
    "remember": "sort ordena valores; argsort devuelve posiciones.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/definicion/1",
        "title": "Ordenar tickets y sus clientes",
        "code": "i = np.argsort(importes, kind='stable')\nprint(np.sort(importes))\nprint(clientes[i])",
        "hint": "sort ordena valores; argsort devuelve posiciones.",
        "textOutput": "[100 150 200 250 300 400]\n[1 1 3 2 2 3]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/sort-y-argsort",
    "remember": "ndarray.sort modifica el array; para preservar relaciones aplica los mismos índices a todas las columnas.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/sort-y-argsort/1",
        "title": "Ordenar tickets y sus clientes",
        "code": "i = np.argsort(importes, kind='stable')\nprint(np.sort(importes))\nprint(clientes[i])",
        "hint": "ndarray.sort modifica el array; para preservar relaciones aplica los mismos índices a todas las columnas.",
        "textOutput": "[100 150 200 250 300 400]\n[1 1 3 2 2 3]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/orden-descendente-y-estabilidad",
    "remember": "Invertir un orden ascendente también invierte empates; para importes positivos usa argsort(-a, kind='stable').",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/orden-descendente-y-estabilidad/1",
        "title": "Obtener importes de mayor a menor",
        "code": "a = np.array([200, 300, 300, 100])\ni = np.argsort(-a, kind='stable')\nprint(i)\nprint(a[i])",
        "hint": "Invertir un orden ascendente también invierte empates; para importes positivos usa argsort(-a, kind='stable').",
        "textOutput": "[1 2 0 3]\n[300 300 200 100]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/lexsort",
    "remember": "Pasa primero la clave secundaria y al final la principal.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/lexsort/1",
        "title": "Ordenar por cliente y después por importe descendente",
        "code": "i = np.lexsort((-importes, clientes))\nprint(np.column_stack((clientes[i], importes[i])))",
        "hint": "Pasa primero la clave secundaria y al final la principal.",
        "textOutput": "[[  1 150]\n [  1 100]\n [  2 300]\n [  2 250]\n [  3 400]\n [  3 200]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/partition-y-argpartition",
    "remember": "Sirven para top-k; el bloque seleccionado no necesariamente está ordenado.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/partition-y-argpartition/1",
        "title": "Encontrar los tres mayores importes",
        "code": "k = 3\ni = np.argpartition(importes, -k)[-k:]\nprint(np.sort(importes[i])[::-1])\nprint(np.sort(np.partition(importes, -k)[-k:]))",
        "hint": "Sirven para top-k; el bloque seleccionado no necesariamente está ordenado.",
        "textOutput": "[400 300 250]\n[250 300 400]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/nonzero-y-argwhere",
    "remember": "Usa nonzero para indexar; argwhere para inspeccionar coordenadas.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/nonzero-y-argwhere/1",
        "title": "Localizar ventas que superan 300",
        "code": "m = ventas > 300\nprint(np.nonzero(m))\nprint(np.argwhere(m))",
        "hint": "Usa nonzero para indexar; argwhere para inspeccionar coordenadas.",
        "textOutput": "(array([1]), array([3]))\n[[1 3]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/searchsorted",
    "remember": "side='left' elige antes de iguales y side='right' después de iguales.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/searchsorted/1",
        "title": "Ubicar un importe en una escala ordenada",
        "code": "a = np.array([100, 200, 200, 400])\nprint(np.searchsorted(a, [200, 350]))\nprint(np.searchsorted(a, 200, side='right'))",
        "hint": "side='left' elige antes de iguales y side='right' después de iguales.",
        "textOutput": "[1 3]\n3",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/take-y-take-along-axis",
    "remember": "take_along_axis es útil junto con argsort por eje.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/take-y-take-along-axis/1",
        "title": "Obtener los dos mejores trimestres por sucursal",
        "code": "i = np.argsort(ventas, axis=1)[:, -2:]\nprint(np.take(ventas, [0, 2], axis=1))\nprint(np.take_along_axis(ventas, i, axis=1))",
        "hint": "take_along_axis es útil junto con argsort por eje.",
        "textOutput": "[[100 200]\n [150 250]\n [200 200]]\n[[200 250]\n [250 350]\n [200 200]]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ordenamiento-busqueda-y-seleccion/extract-y-choose",
    "remember": "choose recibe códigos, no condiciones booleanas múltiples.",
    "examples": [
      {
        "id": "numpy/ordenamiento-busqueda-y-seleccion/extract-y-choose/1",
        "title": "Extraer importes altos y traducir códigos",
        "code": "print(np.extract(importes > 300, importes))\nprint(np.choose(codigos, ['Norte', 'Centro', 'Sur']))",
        "hint": "choose recibe códigos, no condiciones booleanas múltiples.",
        "textOutput": "[400]\n['Norte' 'Centro' 'Norte' 'Sur' 'Centro' 'Sur']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
