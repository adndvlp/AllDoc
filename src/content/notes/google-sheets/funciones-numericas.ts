// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/definicion",
    "remember": "Los decimales visibles no necesariamente son los internos.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/definicion/1",
        "title": "Redondear una media",
        "language": "excel-formula",
        "code": "=ROUND(10/3,2)",
        "hint": "",
        "textOutput": "3.33.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/round-roundup-rounddown",
    "remember": "El segundo argumento determina decimales.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/round-roundup-rounddown/1",
        "title": "Comparar redondeos",
        "language": "excel-formula",
        "code": "={ROUND(2.345,2),ROUNDUP(2.341,2),ROUNDDOWN(2.349,2)}",
        "hint": "",
        "textOutput": "2.35, 2.35, 2.34.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/ceiling-y-floor",
    "remember": "Útiles para lotes o empaques.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/ceiling-y-floor/1",
        "title": "Calcular múltiplos de 5",
        "language": "excel-formula",
        "code": "={CEILING(12,5),FLOOR(12,5)}",
        "hint": "",
        "textOutput": "15, 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/int-y-trunc",
    "remember": "Difieren con negativos.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/int-y-trunc/1",
        "title": "Comparar negativos",
        "language": "excel-formula",
        "code": "={INT(-2.7),TRUNC(-2.7)}",
        "hint": "",
        "textOutput": "-3, -2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/abs-y-mod",
    "remember": "Útiles en diferencias y ciclos.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/abs-y-mod/1",
        "title": "Medir desviación y residuo",
        "language": "excel-formula",
        "code": "={ABS(-20),MOD(13,5)}",
        "hint": "",
        "textOutput": "20, 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/power-y-sqrt",
    "remember": "No confundir raíz con división.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/power-y-sqrt/1",
        "title": "Calcular crecimiento y raíz",
        "language": "excel-formula",
        "code": "={POWER(2,3),SQRT(81)}",
        "hint": "",
        "textOutput": "8, 9.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/iseven-e-isodd",
    "remember": "Sirven para clasificar índices y ciclos alternos.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/iseven-e-isodd/1",
        "title": "Comprobar paridad",
        "language": "excel-formula",
        "code": "={ISEVEN(8),ISODD(7)}",
        "hint": "",
        "textOutput": "TRUE, TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/funciones-numericas/rand-y-randbetween",
    "remember": "Pueden recalcularse; pega valores para congelarlos.",
    "examples": [
      {
        "id": "google-sheets/funciones-numericas/rand-y-randbetween/1",
        "title": "Simular una demanda",
        "language": "excel-formula",
        "code": "=RANDBETWEEN(10,20)",
        "hint": "",
        "textOutput": "Un entero entre 10 y 20, inclusive; cambia al recalcular.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
