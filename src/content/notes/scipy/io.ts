// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/io/definicion",
    "remember": "Usa el lector específico del formato.",
    "examples": [
      {
        "id": "scipy/io/definicion/1",
        "title": "Guardar y recuperar una matriz MAT en memoria",
        "code": "from scipy.io import savemat, loadmat\nfrom io import BytesIO\nb = BytesIO()\nsavemat(b, {\"ventas\": ventas})\nb.seek(0)\nprint(loadmat(b)[\"ventas\"].ravel())",
        "hint": "BytesIO evita crear archivos en el disco.",
        "textOutput": "[100. 120. 120. 140. 220.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/io/mat",
    "remember": "El formato MAT v7.3 usa HDF5 y no lo lee loadmat directamente.",
    "examples": [
      {
        "id": "scipy/io/mat/1",
        "title": "Recuperar variable desde MAT",
        "code": "from scipy.io import savemat, loadmat\nfrom io import BytesIO\nb = BytesIO()\nsavemat(b, {'x': np.array([1,2,3])})\nb.seek(0)\nprint(loadmat(b)['x'].shape)",
        "hint": "El vector se recupera como matriz fila con la configuración usada.",
        "textOutput": "(1, 3)",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/io/matrix-market",
    "remember": "Conserva dimensiones y valores de matrices.",
    "examples": [
      {
        "id": "scipy/io/matrix-market/1",
        "title": "Guardar y recuperar matriz",
        "code": "from scipy.io import mmwrite, mmread\nfrom io import BytesIO\nb = BytesIO()\nmmwrite(b, np.array([[1,0],[0,2]]))\nb.seek(0)\nprint(mmread(b))",
        "hint": "El contenido se recupera sin archivos externos. Ejecuta este ejemplo en Python local: Matrix Market requiere hilos que el editor web no admite.",
        "textOutput": "[[1 0]\n [0 2]]",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
