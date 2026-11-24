// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/definicion",
    "remember": "No son un DataFrame; cada uno responde a necesidades diferentes de representación.",
    "examples": [
      {
        "id": "numpy/arrays-estructurados-y-enmascarados/definicion/1",
        "title": "Crear registros de ventas heterogéneos",
        "code": "a = np.array([(1, 100.0), (2, 250.0)], dtype=[('id', 'i4'), ('importe', 'f8')])\nprint(a['id'])\nprint(a['importe'].sum())",
        "hint": "No son un DataFrame; cada uno responde a necesidades diferentes de representación.",
        "textOutput": "[1 2]\n350.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/structured-arrays",
    "remember": "Cada fila es un registro con un esquema fijo.",
    "examples": [
      {
        "id": "numpy/arrays-estructurados-y-enmascarados/structured-arrays/1",
        "title": "Crear registros de ventas heterogéneos",
        "code": "a = np.array([(1, 100.0), (2, 250.0)], dtype=[('id', 'i4'), ('importe', 'f8')])\nprint(a['id'])\nprint(a['importe'].sum())",
        "hint": "Cada fila es un registro con un esquema fijo.",
        "textOutput": "[1 2]\n350.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/record-arrays",
    "remember": "Los atributos pueden chocar con nombres de métodos; el acceso por nombre sigue siendo explícito.",
    "examples": [
      {
        "id": "numpy/arrays-estructurados-y-enmascarados/record-arrays/1",
        "title": "Consultar campos de registros",
        "code": "a = np.rec.array([(1, 100.0), (2, 200.0)], dtype=[('id', 'i4'), ('importe', 'f8')])\nprint(a.importe)\nprint(a['id'])",
        "hint": "Los atributos pueden chocar con nombres de métodos; el acceso por nombre sigue siendo explícito.",
        "textOutput": "[100. 200.]\n[1 2]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/masked-arrays-y-np-ma",
    "remember": "Las reducciones de np.ma excluyen elementos enmascarados; filled los reemplaza por un valor concreto.",
    "examples": [
      {
        "id": "numpy/arrays-estructurados-y-enmascarados/masked-arrays-y-np-ma/1",
        "title": "Calcular una media excluyendo una observación",
        "code": "a = np.ma.array([100, 200, 999], mask=[False, False, True])\nprint(a)\nprint(a.mean())\nprint(a.filled(0))",
        "hint": "Las reducciones de np.ma excluyen elementos enmascarados; filled los reemplaza por un valor concreto.",
        "textOutput": "[100 200 --]\n150.0\n[100 200   0]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/arrays-estructurados-y-enmascarados/masked-invalid-y-compresion",
    "remember": "compressed descarta la estructura original; conserva la máscara si necesitas posiciones.",
    "examples": [
      {
        "id": "numpy/arrays-estructurados-y-enmascarados/masked-invalid-y-compresion/1",
        "title": "Recuperar valores finitos",
        "code": "a = np.ma.masked_invalid(invalidos)\nprint(a.compressed())\nprint(a.mask)",
        "hint": "compressed descarta la estructura original; conserva la máscara si necesitas posiciones.",
        "textOutput": "[100. 300.]\n[False  True  True  True False]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
