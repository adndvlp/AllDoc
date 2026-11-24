// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/ab-testing/definicion",
    "remember": "Analiza magnitud, incertidumbre y diseño además del p-value.",
    "examples": [
      {
        "id": "scipy/ab-testing/definicion/1",
        "title": "Calcular tasas de dos variantes",
        "code": "tasas = conversiones[:, 0]/conversiones.sum(axis=1)\nprint(tasas)",
        "hint": "A y B tienen 200 observaciones independientes cada uno.",
        "textOutput": "[0.2 0.3]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ab-testing/lift",
    "remember": "10 puntos porcentuales no equivalen a 10% relativo.",
    "examples": [
      {
        "id": "scipy/ab-testing/lift/1",
        "title": "Calcular cambio absoluto y relativo",
        "code": "a, b = conversiones[:, 0]/conversiones.sum(axis=1)\nprint(round((b-a)*100, 2), round((b/a-1)*100, 2))",
        "hint": "La primera salida son puntos porcentuales y la segunda porcentaje relativo.",
        "textOutput": "10.0 50.0",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ab-testing/ab-proporciones",
    "remember": "Cada participante debe pertenecer a una sola variante.",
    "examples": [
      {
        "id": "scipy/ab-testing/ab-proporciones/1",
        "title": "Evaluar diferencia de conversiones",
        "code": "r = stats.chi2_contingency(conversiones, correction=False)\nprint(round(r.pvalue, 4))",
        "hint": "La prueba es bilateral; usa Fisher si los conteos son escasos.",
        "textOutput": "0.0209",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ab-testing/ab-continuas",
    "remember": "No confundas ventas por usuario con ventas por pedido.",
    "examples": [
      {
        "id": "scipy/ab-testing/ab-continuas/1",
        "title": "Estimar cambio de importe B-A",
        "code": "r = stats.ttest_ind(canal_b, canal_a, equal_var=False)\nic = r.confidence_interval()\nprint(round(canal_b.mean()-canal_a.mean(), 2), round(ic.low, 2), round(ic.high, 2))",
        "hint": "La unidad de análisis debe ser independiente.",
        "textOutput": "15.12 -0.16 30.41",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ab-testing/significancia-practica",
    "remember": "Compara el efecto y su IC con un umbral de negocio predefinido.",
    "note": "No se debe elegir el umbral después de ver los datos.",
    "examples": [
      {
        "id": "scipy/ab-testing/significancia-practica/1",
        "title": "Evaluar mejora mínima de 20 unidades",
        "code": "r = stats.ttest_ind(canal_b, canal_a, equal_var=False)\nic = r.confidence_interval()\nprint(ic.low > 20)",
        "hint": "True solo si el límite inferior supera la mejora mínima propuesta.",
        "textOutput": "False",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/ab-testing/planificacion",
    "remember": "No detengas un test fijo por p-value sin un método secuencial válido.",
    "examples": [
      {
        "id": "scipy/ab-testing/planificacion/1",
        "title": "Comprobar tamaño de grupos",
        "code": "print(conversiones.sum(axis=1))",
        "hint": "Ambos grupos tienen 200 observaciones; el balance por sí solo no demuestra aleatorización.",
        "textOutput": "[200 200]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
