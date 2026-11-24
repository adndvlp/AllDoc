// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/fft/definicion",
    "remember": "La frecuencia depende del intervalo entre muestras.",
    "examples": [
      {
        "id": "scipy/fft/definicion/1",
        "title": "Encontrar frecuencia dominante",
        "code": "from scipy.fft import rfft, rfftfreq\nt = np.arange(100)/100\nx = np.sin(2*np.pi*5*t)\nf = rfftfreq(len(x), d=0.01)\nprint(f[np.argmax(np.abs(rfft(x)))])",
        "hint": "La señal simulada tiene frecuencia de 5 Hz.",
        "textOutput": "5.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/fft/fft-ifft",
    "remember": "La inversa reconstruye salvo errores de redondeo.",
    "examples": [
      {
        "id": "scipy/fft/fft-ifft/1",
        "title": "Transformar y reconstruir",
        "code": "from scipy.fft import fft, ifft\nx = np.array([1,2,3,4])\nprint(np.round(ifft(fft(x)).real, 6))",
        "hint": "Se recuperan los valores originales.",
        "textOutput": "[1. 2. 3. 4.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/fft/rfft",
    "remember": "Quita la media si solo interesan ciclos no constantes.",
    "examples": [
      {
        "id": "scipy/fft/rfft/1",
        "title": "Detectar periodicidad semanal",
        "code": "from scipy.fft import rfft, rfftfreq\nx = 10+np.sin(2*np.pi*np.arange(28)/7)\nf = rfftfreq(len(x), d=1)\ni = np.argmax(np.abs(rfft(x-x.mean())))\nprint(round(1/f[i], 2))",
        "hint": "Se expresa el periodo en días.",
        "textOutput": "7.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
