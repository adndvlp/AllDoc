// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/scipy/regresion/definicion",
    "remember": "La pendiente expresa el cambio estimado de y por unidad de x.",
    "examples": [
      {
        "id": "scipy/regresion/definicion/1",
        "title": "Ajustar ingresos frente a publicidad",
        "code": "r = stats.linregress(publicidad, ingresos)\nprint(round(r.slope, 3), round(r.intercept, 3))",
        "hint": "Los coeficientes describen la recta de mínimos cuadrados.",
        "textOutput": "2.1 0.7",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/regresion/coeficientes",
    "remember": "No interpretes fuera del rango observado sin justificación.",
    "examples": [
      {
        "id": "scipy/regresion/coeficientes/1",
        "title": "Predecir ingresos con inversión de 4",
        "code": "r = stats.linregress(publicidad, ingresos)\nprint(round(r.intercept+r.slope*4, 3))",
        "hint": "Se sustituye x en la recta ajustada.",
        "textOutput": "9.1",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/regresion/r-cuadrado",
    "remember": "R² no prueba causalidad ni garantiza buen pronóstico.",
    "examples": [
      {
        "id": "scipy/regresion/r-cuadrado/1",
        "title": "Medir ajuste lineal",
        "code": "r = stats.linregress(publicidad, ingresos)\nprint(round(r.rvalue**2, 4))",
        "hint": "Se eleva al cuadrado la correlación lineal.",
        "textOutput": "0.9587",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/regresion/significancia-regresion",
    "remember": "La inferencia clásica requiere supuestos sobre errores.",
    "examples": [
      {
        "id": "scipy/regresion/significancia-regresion/1",
        "title": "Consultar incertidumbre de pendiente",
        "code": "r = stats.linregress(publicidad, ingresos)\nprint(round(r.pvalue, 4), round(r.stderr, 4), round(r.intercept_stderr, 4))",
        "hint": "La incertidumbre del intercepto se obtiene por separado.",
        "textOutput": "0.0036 0.2517 0.8347",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/scipy/regresion/residuos",
    "remember": "Examina patrones y valores extremos antes de interpretar.",
    "examples": [
      {
        "id": "scipy/regresion/residuos/1",
        "title": "Calcular residuos del modelo",
        "code": "r = stats.linregress(publicidad, ingresos)\npred = r.intercept+r.slope*publicidad\nprint(np.round(ingresos-pred, 3))",
        "hint": "Un patrón sistemático indicaría que una recta podría ser insuficiente.",
        "textOutput": "[ 0.2  0.1  0.  -1.1  0.8]",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
