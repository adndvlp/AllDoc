// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/texto-vectorizado/definicion",
    "remember": "Desde NumPy 2 se recomienda np.strings para estas operaciones; np.char es la interfaz antigua.",
    "examples": [
      {
        "id": "numpy/texto-vectorizado/definicion/1",
        "title": "Normalizar etiquetas de regiones",
        "code": "a = np.array([' Norte ', 'SUR', ' centro'])\nprint(np.strings.lower(np.strings.strip(a)))\nprint(np.strings.upper(a))",
        "hint": "Desde NumPy 2 se recomienda np.strings para estas operaciones; np.char es la interfaz antigua.",
        "textOutput": "['norte' 'sur' 'centro']\n[' NORTE ' 'SUR' ' CENTRO']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/texto-vectorizado/upper-lower-y-strip",
    "remember": "strip no elimina espacios internos.",
    "examples": [
      {
        "id": "numpy/texto-vectorizado/upper-lower-y-strip/1",
        "title": "Normalizar etiquetas de regiones",
        "code": "a = np.array([' Norte ', 'SUR', ' centro'])\nprint(np.strings.lower(np.strings.strip(a)))\nprint(np.strings.upper(a))",
        "hint": "strip no elimina espacios internos.",
        "textOutput": "['norte' 'sur' 'centro']\n[' NORTE ' 'SUR' ' CENTRO']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/texto-vectorizado/replace-add-y-str-len",
    "remember": "Las operaciones se aplican por elemento, no a todo el array como una sola cadena.",
    "examples": [
      {
        "id": "numpy/texto-vectorizado/replace-add-y-str-len/1",
        "title": "Limpiar y construir etiquetas",
        "code": "a = np.array(['A-01', 'A-02'])\nprint(np.strings.replace(a, '-', ''))\nprint(np.strings.add('SKU-', a))\nprint(np.strings.str_len(a))",
        "hint": "Las operaciones se aplican por elemento, no a todo el array como una sola cadena.",
        "textOutput": "['A01' 'A02']\n['SKU-A-01' 'SKU-A-02']\n[4 4]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/texto-vectorizado/busqueda-de-cadenas",
    "remember": "find devuelve -1 cuando no hay coincidencia.",
    "examples": [
      {
        "id": "numpy/texto-vectorizado/busqueda-de-cadenas/1",
        "title": "Filtrar códigos por prefijo",
        "code": "a = np.array(['MX-1', 'US-2', 'MX-3'])\nprint(a[np.strings.startswith(a, 'MX')])\nprint(np.strings.find(a, 'X'))\nprint(np.strings.endswith(a, '3'))",
        "hint": "find devuelve -1 cuando no hay coincidencia.",
        "textOutput": "['MX-1' 'MX-3']\n[ 1 -1  1]\n[False False  True]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/texto-vectorizado/stringdtype-y-texto-de-longitud-fija",
    "remember": "Asignar una cadena demasiado larga a un dtype U puede truncarla; StringDType requiere NumPy 2 o posterior.",
    "examples": [
      {
        "id": "numpy/texto-vectorizado/stringdtype-y-texto-de-longitud-fija/1",
        "title": "Comparar asignación de textos largos",
        "code": "a = np.array(['MX'], dtype='U2')\na[0] = 'Mexico'\nb = np.array(['MX'], dtype=np.dtypes.StringDType())\nb[0] = 'Mexico'\nprint(a, b)",
        "hint": "Asignar una cadena demasiado larga a un dtype U puede truncarla; StringDType requiere NumPy 2 o posterior.",
        "textOutput": "['Me'] ['Mexico']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
