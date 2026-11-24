// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/definicion",
    "remember": "Elige el tipo según el dato y el rango que necesitas.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/definicion/1",
        "title": "Inspeccionar tres tipos",
        "code": "print(np.array([1, 2], dtype=np.int64).dtype)\nprint(np.array([1.5, 2.5], dtype=np.float64).dtype)\nprint(np.array([True, False]).dtype)",
        "hint": "Elige el tipo según el dato y el rango que necesitas.",
        "textOutput": "int64\nfloat64\nbool",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/enteros-flotantes-y-booleanos",
    "remember": "int64 y float64 usan 8 bytes; bool usa 1.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/enteros-flotantes-y-booleanos/1",
        "title": "Inspeccionar tres tipos",
        "code": "print(np.array([1, 2], dtype=np.int64).dtype)\nprint(np.array([1.5, 2.5], dtype=np.float64).dtype)\nprint(np.array([True, False]).dtype)",
        "hint": "int64 y float64 usan 8 bytes; bool usa 1.",
        "textOutput": "int64\nfloat64\nbool",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/texto-object-y-numeros-complejos",
    "remember": "No mezcles textos y números en una matriz destinada al cálculo.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/texto-object-y-numeros-complejos/1",
        "title": "Comparar tres representaciones",
        "code": "print(np.array(['Norte', 'Sur']).dtype.kind)\nprint(np.array([1, 'Sur'], dtype=object))\nprint(np.array([1 + 2j]).dtype.kind)",
        "hint": "No mezcles textos y números en una matriz destinada al cálculo.",
        "textOutput": "U\n[1 'Sur']\nc",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/astype",
    "remember": "Convertir float a int trunca hacia cero, no redondea.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/astype/1",
        "title": "Convertir unidades estimadas",
        "code": "print(np.array([2.9, -2.9]).astype(int))",
        "hint": "Convertir float a int trunca hacia cero, no redondea.",
        "textOutput": "[ 2 -2]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/promocion-de-tipos",
    "remember": "No supongas que toda mezcla conserva el dtype original; NumPy 2 cambió reglas para escalares Python.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/promocion-de-tipos/1",
        "title": "Combinar enteros con decimales",
        "code": "a = np.array([1, 2], dtype=np.int32)\nb = np.array([0.5, 1.5], dtype=np.float64)\nprint(np.result_type(a, b))\nprint(a + b)",
        "hint": "No supongas que toda mezcla conserva el dtype original; NumPy 2 cambió reglas para escalares Python.",
        "textOutput": "float64\n[1.5 3.5]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/tipos-de-datos/rango-de-tipos",
    "remember": "Antes de reducir bytes, comprueba que los valores caben.",
    "examples": [
      {
        "id": "numpy/tipos-de-datos/rango-de-tipos/1",
        "title": "Consultar límites numéricos",
        "code": "print(np.iinfo(np.int8).min, np.iinfo(np.int8).max)\nprint(np.finfo(np.float64).eps)",
        "hint": "Antes de reducir bytes, comprueba que los valores caben.",
        "textOutput": "-128 127\n2.220446049250313e-16",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
