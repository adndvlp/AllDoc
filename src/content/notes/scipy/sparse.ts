// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/sparse/definicion",
    "remember": "Evita convertir a denso si la matriz es grande.",
    "examples": [
      {
        "id": "scipy/sparse/definicion/1",
        "title": "Crear una matriz dispersa de interacciones",
        "code": "from scipy.sparse import csr_array\nx = csr_array([[0,1,0],[2,0,0]])\nprint(x.shape, x.nnz)",
        "hint": "Hay dos valores almacenados en una matriz 2x3.",
        "textOutput": "(2, 3) 2",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/sparse/csr",
    "remember": "@ es producto matricial; * es elemento a elemento en sparse arrays.",
    "examples": [
      {
        "id": "scipy/sparse/csr/1",
        "title": "Multiplicar por un vector",
        "code": "from scipy.sparse import csr_array\nx = csr_array([[0,1,0],[2,0,0]])\nprint(x @ np.array([10,20,30]))",
        "hint": "Se devuelve el producto de cada fila.",
        "textOutput": "[20 20]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/sparse/csc",
    "remember": "Convierte de CSR a CSC cuando convenga.",
    "examples": [
      {
        "id": "scipy/sparse/csc/1",
        "title": "Consultar columna",
        "code": "from scipy.sparse import csc_array\nx = csc_array([[0,1,0],[2,0,0]])\nprint(x[:,1:2].toarray())",
        "hint": "Se usa formato denso solo para mostrar este ejemplo pequeño.",
        "textOutput": "[[1]\n [0]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/sparse/coo",
    "remember": "Al convertir a CSR se suman coordenadas duplicadas.",
    "examples": [
      {
        "id": "scipy/sparse/coo/1",
        "title": "Construir matriz de interacciones",
        "code": "from scipy.sparse import coo_array\nx = coo_array(([2,3],([0,1],[1,0])), shape=(2,3))\nprint(x.tocsr().toarray())",
        "hint": "Los dos valores se ubican en sus coordenadas.",
        "textOutput": "[[0 2 0]\n [3 0 0]]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
