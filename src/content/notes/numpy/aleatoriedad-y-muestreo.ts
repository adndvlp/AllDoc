// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/definicion",
    "remember": "Una semilla permite reproducir la secuencia si se conserva el generador, entorno y orden de llamadas.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/definicion/1",
        "title": "Reproducir una simulación",
        "code": "r1 = np.random.default_rng(42)\nr2 = np.random.default_rng(42)\nprint(np.array_equal(r1.integers(0, 100, 5), r2.integers(0, 100, 5)))",
        "hint": "Una semilla permite reproducir la secuencia si se conserva el generador, entorno y orden de llamadas.",
        "textOutput": "True",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/default-rng-y-semillas",
    "remember": "No reinicies la semilla en cada iteración si quieres muestras diferentes.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/default-rng-y-semillas/1",
        "title": "Reproducir una simulación",
        "code": "r1 = np.random.default_rng(42)\nr2 = np.random.default_rng(42)\nprint(np.array_equal(r1.integers(0, 100, 5), r2.integers(0, 100, 5)))",
        "hint": "No reinicies la semilla en cada iteración si quieres muestras diferentes.",
        "textOutput": "True",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/random-integers-y-uniform",
    "remember": "Indica size para producir varios valores o una matriz.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/random-integers-y-uniform/1",
        "title": "Simular tasas, cantidades y descuentos",
        "code": "r = np.random.default_rng(42)\nprint(r.random(3).round(3))\nprint(r.integers(1, 7, size=4))\nprint(r.uniform(0, 20, size=3).round(2))",
        "hint": "Indica size para producir varios valores o una matriz.",
        "textOutput": "[0.774 0.439 0.859]\n[1 5 2 1]\n[19.51 15.22 15.72]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/normal",
    "remember": "Una normal puede generar valores negativos; no siempre es apropiada para demanda.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/normal/1",
        "title": "Simular importes alrededor de 100",
        "code": "r = np.random.default_rng(42)\nprint(r.normal(loc=100, scale=10, size=5).round(2))",
        "hint": "loc fija la media del modelo y scale su desviación estándar; size solicita cinco observaciones.",
        "textOutput": "[103.05  89.6  107.5  109.41  80.49]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/choice",
    "remember": "replace=False evita elegir la misma posición dos veces; con valores repetidos aún puede haber valores iguales.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/choice/1",
        "title": "Tomar una muestra de tickets",
        "code": "r = np.random.default_rng(42)\nprint(r.choice(importes, size=3, replace=False))\nprint(r.choice(['A', 'B'], size=5, p=[0.8, 0.2]))",
        "hint": "replace=False evita elegir la misma posición dos veces; con valores repetidos aún puede haber valores iguales.",
        "textOutput": "[200 100 400]\n['A' 'A' 'B' 'A' 'A']",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/shuffle-y-permutation",
    "remember": "Si tienes columnas relacionadas, permuta los índices y aplícalos a todas.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/shuffle-y-permutation/1",
        "title": "Reordenar observaciones de forma reproducible",
        "code": "r = np.random.default_rng(42)\na = importes.copy()\nr.shuffle(a)\nprint(a)\nprint(r.permutation(importes))",
        "hint": "Si tienes columnas relacionadas, permuta los índices y aplícalos a todas.",
        "textOutput": "[400 150 200 300 250 100]\n[150 300 100 250 400 200]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/binomial-poisson-y-exponential",
    "remember": "En exponential, scale es la media, no la tasa; en poisson, lam es la media de eventos.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/binomial-poisson-y-exponential/1",
        "title": "Simular conversiones, pedidos y esperas",
        "code": "r = np.random.default_rng(42)\nprint(r.binomial(100, 0.2, size=4))\nprint(r.poisson(5, size=4))\nprint(r.exponential(2, size=4).round(2))",
        "hint": "En exponential, scale es la media, no la tasa; en poisson, lam es la media de eventos.",
        "textOutput": "[23 19 24 22]\n[5 7 9 6]\n[1.28 0.69 0.64 1.76]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/monte-carlo",
    "remember": "Los resultados dependen de las distribuciones y supuestos elegidos, no son predicciones garantizadas.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/monte-carlo/1",
        "title": "Estimar probabilidad de ventas superiores al objetivo",
        "code": "r = np.random.default_rng(42)\ndemanda = r.poisson(100, size=10000)\ningresos = demanda * 20\nprint(np.mean(ingresos > 2100).round(3))",
        "hint": "Los resultados dependen de las distribuciones y supuestos elegidos, no son predicciones garantizadas.",
        "textOutput": "0.288",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/aleatoriedad-y-muestreo/bootstrap",
    "remember": "Una muestra bootstrap suele tener el mismo tamaño que la original; requiere observaciones representativas y supuestos de independencia apropiados.",
    "note": "La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.",
    "examples": [
      {
        "id": "numpy/aleatoriedad-y-muestreo/bootstrap/1",
        "title": "Estimar intervalo percentil de la media de tickets",
        "code": "r = np.random.default_rng(42)\nmuestras = r.choice(importes, size=(2000, importes.size), replace=True)\nprint(np.percentile(muestras.mean(axis=1), [2.5, 97.5]).round(2))",
        "hint": "Una muestra bootstrap suele tener el mismo tamaño que la original; requiere observaciones representativas y supuestos de independencia apropiados.",
        "textOutput": "[158.33 316.67]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
