// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/signal/definicion",
    "remember": "Conoce la frecuencia de muestreo antes de diseñar filtros.",
    "examples": [
      {
        "id": "scipy/signal/definicion/1",
        "title": "Detectar picos de demanda",
        "code": "from scipy.signal import find_peaks\np, prop = find_peaks([1,5,2,6,1], height=4)\nprint(p)",
        "hint": "Los índices de los dos máximos locales son 1 y 3.",
        "textOutput": "[1 3]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/signal/find-peaks",
    "remember": "No confundir picos detectados con causas de negocio.",
    "examples": [
      {
        "id": "scipy/signal/find-peaks/1",
        "title": "Detectar picos prominentes",
        "code": "from scipy.signal import find_peaks\np, prop = find_peaks([1,5,2,6,1], prominence=3)\nprint(p, prop['prominences'])",
        "hint": "La prominencia mide cuánto sobresale el pico del entorno.",
        "textOutput": "[1 3] [3. 5.]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/signal/savgol-filter",
    "remember": "La ventana debe ser adecuada para la escala temporal.",
    "examples": [
      {
        "id": "scipy/signal/savgol-filter/1",
        "title": "Suavizar una secuencia",
        "code": "from scipy.signal import savgol_filter\nprint(np.round(savgol_filter([10,12,9,13,11,14,12], 5, 2), 2))",
        "hint": "Se devuelve una serie del mismo largo.",
        "textOutput": "[10.26 10.77 11.14 10.94 12.8  13.   12.2 ]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/signal/butter",
    "remember": "Un filtro causal puede introducir retraso.",
    "examples": [
      {
        "id": "scipy/signal/butter/1",
        "title": "Atenuar alternancia rápida",
        "code": "from scipy.signal import butter, sosfilt\nsos = butter(2, 2, fs=20, output='sos')\nx = 10+np.tile([1.,-1.], 50)\ny = sosfilt(sos, x)\nprint(round(float(np.std(y[-40:])), 3))",
        "hint": "Se mide dispersión final evitando el transitorio inicial.",
        "textOutput": "0.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
