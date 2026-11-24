// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/integracion-con-pandas/definicion",
    "remember": "Al convertir, las etiquetas del índice y columnas no se conservan dentro del ndarray.",
    "examples": [
      {
        "id": "numpy/integracion-con-pandas/definicion/1",
        "title": "Extraer una columna de importes",
        "code": "import pandas as pd\ns = pd.Series(importes)\na = s.to_numpy()\nprint(a)\nprint(type(a).__name__)",
        "hint": "Al convertir, las etiquetas del índice y columnas no se conservan dentro del ndarray.",
        "textOutput": "[100 250 150 400 300 200]\nndarray",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/integracion-con-pandas/series-to-numpy",
    "remember": "copy=False no garantiza que no haya copia; copy=True solicita independencia de los datos del array.",
    "note": "Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.",
    "examples": [
      {
        "id": "numpy/integracion-con-pandas/series-to-numpy/1",
        "title": "Extraer una columna de importes",
        "code": "import pandas as pd\ns = pd.Series(importes)\na = s.to_numpy()\nprint(a)\nprint(type(a).__name__)",
        "hint": "copy=False no garantiza que no haya copia; copy=True solicita independencia de los datos del array.",
        "textOutput": "[100 250 150 400 300 200]\nndarray",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/integracion-con-pandas/dataframe-to-numpy",
    "remember": "Selecciona columnas numéricas antes de calcular; especifica dtype si es necesario.",
    "note": "Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.",
    "examples": [
      {
        "id": "numpy/integracion-con-pandas/dataframe-to-numpy/1",
        "title": "Extraer columnas para cálculo numérico",
        "code": "import pandas as pd\ndf = pd.DataFrame({'cliente': clientes, 'importe': importes, 'estado': estados.astype(object)})\nprint(df[['cliente', 'importe']].to_numpy())\nprint(df.to_numpy().dtype)",
        "hint": "La selección de dos columnas produce una matriz numérica; incluir el estado textual produce dtype object en este ejemplo.",
        "textOutput": "[[  1 100]\n [  2 250]\n [  1 150]\n [  3 400]\n [  2 300]\n [  3 200]]\nobject",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/integracion-con-pandas/convertir-ndarray-a-series-o-dataframe",
    "remember": "Asigna nombres coherentes con el significado de cada eje.",
    "note": "Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.",
    "examples": [
      {
        "id": "numpy/integracion-con-pandas/convertir-ndarray-a-series-o-dataframe/1",
        "title": "Crear un reporte con sucursales y trimestres",
        "code": "import pandas as pd\ndf = pd.DataFrame(ventas, index=sucursales, columns=['T1', 'T2', 'T3', 'T4'])\nprint(df)",
        "hint": "Asigna nombres coherentes con el significado de cada eje.",
        "textOutput": "T1   T2   T3   T4\nNorte   100  150  200  250\nCentro  150  200  250  350\nSur     200  200  200  150",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
