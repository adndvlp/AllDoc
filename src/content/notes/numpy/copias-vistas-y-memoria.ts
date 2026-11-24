// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/definicion",
    "remember": "Asignar b = a no copia; comprueba memoria compartida cuando sea importante.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/definicion/1",
        "title": "Modificar una selección compartida",
        "code": "a = importes.copy()\nb = a[:2]\nb[0] = 999\nprint(a)",
        "hint": "Cambiar b[0] modifica también a[0], porque el slice comparte la memoria de a.",
        "textOutput": "[999 250 150 400 300 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/slicing-y-vista",
    "remember": "Usa copy antes de modificar una selección que debe ser independiente.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/slicing-y-vista/1",
        "title": "Modificar una selección compartida",
        "code": "a = importes.copy()\nb = a[:2]\nb[0] = 999\nprint(a)",
        "hint": "Cambiar b[0] modifica también a[0], porque el slice comparte la memoria de a.",
        "textOutput": "[999 250 150 400 300 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/copy-y-view",
    "remember": "Una vista no es una copia de seguridad; con dtype object la copia es superficial respecto a objetos internos.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/copy-y-view/1",
        "title": "Comparar copia y vista",
        "code": "a = np.array([1, 2])\nb = a.copy()\nc = a.view()\nc[0] = 9\nprint(a, b, c)",
        "hint": "El cambio realizado en c aparece en a, pero b conserva los valores iniciales.",
        "textOutput": "[9 2] [1 2] [9 2]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/shares-memory-e-indexacion-avanzada",
    "remember": "No basta mirar si dos arrays contienen los mismos valores.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/shares-memory-e-indexacion-avanzada/1",
        "title": "Comprobar una vista y una selección de índices",
        "code": "print(np.shares_memory(ventas, ventas[:, :2]))\nprint(np.shares_memory(ventas, ventas[[0, 2]]))",
        "hint": "No basta mirar si dos arrays contienen los mismos valores.",
        "textOutput": "True\nFalse",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/strides-y-orden-c-f",
    "remember": "La transposición puede cambiar contigüidad sin mover los datos.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/strides-y-orden-c-f/1",
        "title": "Inspeccionar disposición de la matriz",
        "code": "print(ventas.strides, ventas.flags.c_contiguous)\nprint(ventas.T.strides, ventas.T.flags.f_contiguous)\nprint(np.asfortranarray(ventas).flags.f_contiguous)",
        "hint": "La transposición puede cambiar contigüidad sin mover los datos.",
        "textOutput": "(32, 8) True\n(8, 32) True\nTrue",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/copias-vistas-y-memoria/operaciones-in-place-y-out",
    "remember": "El dtype de destino debe permitir el resultado; las vistas también ven cambios in-place.",
    "examples": [
      {
        "id": "numpy/copias-vistas-y-memoria/operaciones-in-place-y-out/1",
        "title": "Actualizar importes sin crear otro array de salida",
        "code": "a = importes.copy()\na += 10\nnp.multiply(a, 2, out=a)\nprint(a)",
        "hint": "El dtype de destino debe permitir el resultado; las vistas también ven cambios in-place.",
        "textOutput": "[220 520 320 820 620 420]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
