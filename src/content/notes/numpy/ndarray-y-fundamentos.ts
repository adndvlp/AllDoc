// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/definicion",
    "remember": "Un array tiene forma, tipo y elementos; una lista de Python es una colección general.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/definicion/1",
        "title": "Comparar dos formas de multiplicar ventas",
        "code": "print([10, 20] * 2)\nprint(np.array([10, 20]) * 2)",
        "hint": "La primera línea repite los elementos; la segunda multiplica los importes por dos.",
        "textOutput": "[10, 20, 10, 20]\n[20 40]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/ndarray-y-listas",
    "remember": "Multiplicar una lista la repite; multiplicar un array escala sus elementos.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/ndarray-y-listas/1",
        "title": "Comparar dos formas de multiplicar ventas",
        "code": "print([10, 20] * 2)\nprint(np.array([10, 20]) * 2)",
        "hint": "La primera línea repite los elementos; la segunda multiplica los importes por dos.",
        "textOutput": "[10, 20, 10, 20]\n[20 40]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/np-array-y-np-asarray",
    "remember": "asarray no garantiza independencia de memoria.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/np-array-y-np-asarray/1",
        "title": "Convertir ventas existentes",
        "code": "a = np.array([100, 200])\nb = np.asarray(a)\nprint(b)\nprint(b is a)",
        "hint": "`b is a` confirma que en este caso asarray devolvió el mismo objeto.",
        "textOutput": "[100 200]\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/shape-ndim-y-size",
    "remember": "Una matriz de 3 filas y 4 columnas tiene shape (3, 4) y size 12.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/shape-ndim-y-size/1",
        "title": "Inspeccionar la matriz de ventas",
        "code": "print(ventas.shape, ventas.ndim, ventas.size)",
        "hint": "La matriz compartida tiene tres sucursales y cuatro trimestres: dos ejes y doce elementos.",
        "textOutput": "(3, 4) 2 12",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/dtype-itemsize-y-nbytes",
    "remember": "nbytes no incluye toda la sobrecarga de Python ni objetos referenciados.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/dtype-itemsize-y-nbytes/1",
        "title": "Medir espacio de ventas",
        "code": "print(ventas.dtype, ventas.itemsize, ventas.nbytes)",
        "hint": "Los doce elementos int64 ocupan ocho bytes cada uno: 96 bytes en el buffer.",
        "textOutput": "int64 8 96",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/ndarray-y-fundamentos/escalares-y-arrays-0d",
    "remember": "Un array 0D tiene un elemento pero ningún eje.",
    "examples": [
      {
        "id": "numpy/ndarray-y-fundamentos/escalares-y-arrays-0d/1",
        "title": "Extraer un único importe",
        "code": "a = np.array(200)\nprint(a.shape, a.ndim, a.item(), type(a.item()).__name__)",
        "hint": "Un array 0D tiene un elemento pero ningún eje.",
        "textOutput": "() 0 200 int",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
