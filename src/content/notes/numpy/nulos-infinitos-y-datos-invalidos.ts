// Generado desde specs/numpy.md por scripts/prepare-numpy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/definicion",
    "remember": "NaN no se detecta comparando con ==.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/definicion/1",
        "title": "Identificar valores problemáticos",
        "code": "print(np.isnan(invalidos))\nprint(np.isinf(invalidos))\nprint(np.isfinite(invalidos))",
        "hint": "Las tres máscaras distinguen valores faltantes, infinitos y observaciones numéricas finitas.",
        "textOutput": "[False  True False False False]\n[False False  True  True False]\n[ True False False False  True]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/isnan-isinf-e-isfinite",
    "remember": "Un NaN no es cero ni infinito.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/isnan-isinf-e-isfinite/1",
        "title": "Identificar valores problemáticos",
        "code": "print(np.isnan(invalidos))\nprint(np.isinf(invalidos))\nprint(np.isfinite(invalidos))",
        "hint": "Las tres máscaras distinguen valores faltantes, infinitos y observaciones numéricas finitas.",
        "textOutput": "[False  True False False False]\n[False False  True  True False]\n[ True False False False  True]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nan-to-num",
    "remember": "Es una sustitución, no una imputación estadística; decide el valor según el negocio.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/nan-to-num/1",
        "title": "Limpiar un conjunto de importes",
        "code": "print(np.nan_to_num(invalidos, nan=0, posinf=0, neginf=0))",
        "hint": "Es una sustitución, no una imputación estadística; decide el valor según el negocio.",
        "textOutput": "[100.   0.   0.   0. 300.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nansum-nanmean-y-nanmedian",
    "remember": "Un grupo con todo NaN devuelve NaN para nanmean, mientras nansum devuelve cero.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/nansum-nanmean-y-nanmedian/1",
        "title": "Calcular métricas con un dato faltante",
        "code": "print(np.nansum(faltantes), np.nanmean(faltantes), np.nanmedian(faltantes))",
        "hint": "Un grupo con todo NaN devuelve NaN para nanmean, mientras nansum devuelve cero.",
        "textOutput": "600.0 200.0 200.0",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nanmin-nanmax-nanstd-y-nanvar",
    "remember": "No confundas ignorar nulos con sustituirlos por cero.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/nanmin-nanmax-nanstd-y-nanvar/1",
        "title": "Resumir datos incompletos",
        "code": "print(np.nanmin(faltantes), np.nanmax(faltantes))\nprint(np.nanstd(faltantes).round(2), np.nanvar(faltantes).round(2))",
        "hint": "No confundas ignorar nulos con sustituirlos por cero.",
        "textOutput": "100.0 300.0\n81.65 6666.67",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/nanpercentile-y-nanquantile",
    "remember": "Si no quedan datos válidos, no hay cuantil definido.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/nanpercentile-y-nanquantile/1",
        "title": "Calcular cuartiles con faltantes",
        "code": "print(np.nanpercentile(faltantes, [25, 50, 75]))\nprint(np.nanquantile(faltantes, [0.25, 0.5, 0.75]))",
        "hint": "Si no quedan datos válidos, no hay cuantil definido.",
        "textOutput": "[150. 200. 250.]\n[150. 200. 250.]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  },
  {
    "id": "analisis-de-datos/numpy/nulos-infinitos-y-datos-invalidos/imputacion",
    "remember": "Conserva una máscara para distinguir los datos estimados de los observados.",
    "examples": [
      {
        "id": "numpy/nulos-infinitos-y-datos-invalidos/imputacion/1",
        "title": "Rellenar NaN con la media disponible",
        "code": "a = faltantes.copy()\nm = np.isnan(a)\na[m] = np.nanmean(a)\nprint(a, m)",
        "hint": "Conserva una máscara para distinguir los datos estimados de los observados.",
        "textOutput": "[100. 200. 200. 300.] [False  True False False]",
        "resultLabel": "Ver resultado en NumPy 2.3.5"
      }
    ]
  }
];
