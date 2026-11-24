// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/definicion",
    "remember": "La frecuencia se interpreta según la unidad y separación de las muestras.",
    "examples": [
      {
        "id": "numpy/fourier-y-analisis-de-frecuencias/definicion/1",
        "title": "Transformar y reconstruir un patrón periódico",
        "code": "a = np.array([0, 1, 0, -1])\nf = np.fft.fft(a)\nprint(np.abs(f).round(3))\nprint(np.fft.ifft(f).real.round(3))",
        "hint": "La frecuencia se interpreta según la unidad y separación de las muestras.",
        "textOutput": "[0. 2. 0. 2.]\n[ 0.  1.  0. -1.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/fft-e-ifft",
    "remember": "Los coeficientes suelen ser complejos, aunque los datos originales sean reales.",
    "examples": [
      {
        "id": "numpy/fourier-y-analisis-de-frecuencias/fft-e-ifft/1",
        "title": "Transformar y reconstruir un patrón periódico",
        "code": "a = np.array([0, 1, 0, -1])\nf = np.fft.fft(a)\nprint(np.abs(f).round(3))\nprint(np.fft.ifft(f).real.round(3))",
        "hint": "Los coeficientes suelen ser complejos, aunque los datos originales sean reales.",
        "textOutput": "[0. 2. 0. 2.]\n[ 0.  1.  0. -1.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/fourier-y-analisis-de-frecuencias/rfft-y-rfftfreq",
    "remember": "La magnitud no equivale directamente a amplitud sin una normalización adecuada.",
    "examples": [
      {
        "id": "numpy/fourier-y-analisis-de-frecuencias/rfft-y-rfftfreq/1",
        "title": "Detectar una periodicidad de cuatro días",
        "code": "t = np.arange(16)\na = np.sin(2 * np.pi * t / 4)\nf = np.fft.rfftfreq(a.size, d=1)\nprint(f[np.argmax(np.abs(np.fft.rfft(a)))])",
        "hint": "La magnitud no equivale directamente a amplitud sin una normalización adecuada.",
        "textOutput": "0.25",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
