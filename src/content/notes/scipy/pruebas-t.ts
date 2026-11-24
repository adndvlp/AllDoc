// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/pruebas-t/definicion",
    "remember": "Identifica primero si los grupos son independientes o emparejados.",
    "examples": [
      {
        "id": "scipy/pruebas-t/definicion/1",
        "title": "Comparar dos canales independientes con Welch",
        "code": "r = stats.ttest_ind(canal_a, canal_b, equal_var=False)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Welch no exige varianzas iguales; sí requiere independencia entre observaciones.",
        "textOutput": "-2.1309 0.0521",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/pruebas-t/ttest-1samp",
    "remember": "Una muestra frente a un objetivo.",
    "examples": [
      {
        "id": "scipy/pruebas-t/ttest-1samp/1",
        "title": "Comprobar si el importe medio difiere de 115",
        "code": "r = stats.ttest_1samp(canal_a, popmean=115)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "El estadístico mide diferencia respecto al objetivo en errores estándar.",
        "textOutput": "0.5023 0.6308",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/pruebas-t/ttest-ind",
    "remember": "No usar para medidas antes/después de las mismas personas.",
    "examples": [
      {
        "id": "scipy/pruebas-t/ttest-ind/1",
        "title": "Comparar medias de dos canales",
        "code": "r = stats.ttest_ind(canal_a, canal_b, equal_var=True)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "La prueba agrupa la estimación de varianza.",
        "textOutput": "-2.1309 0.0513",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/pruebas-t/welch",
    "remember": "Welch suele ser una opción razonable para grupos independientes.",
    "examples": [
      {
        "id": "scipy/pruebas-t/welch/1",
        "title": "Comparar canal B contra A",
        "code": "r = stats.ttest_ind(canal_b, canal_a, equal_var=False)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "El signo positivo corresponde a una media mayor en B.",
        "textOutput": "2.1309 0.0521",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/pruebas-t/ttest-rel",
    "remember": "Cada posición debe corresponder al mismo sujeto.",
    "examples": [
      {
        "id": "scipy/pruebas-t/ttest-rel/1",
        "title": "Evaluar cambio de tiempos",
        "code": "r = stats.ttest_rel(antes, despues)\nprint(round(r.statistic, 4), round(r.pvalue, 4))",
        "hint": "Se analiza la diferencia antes menos después; se supone normalidad aproximada de las diferencias en muestras pequeñas.",
        "textOutput": "6.7803 0.0003",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
