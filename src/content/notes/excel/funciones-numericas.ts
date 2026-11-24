// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/funciones-numericas/definicion",
    "remember": "No confundas cambiar el formato con redondear el valor.",
    "examples": [
      {
        "id": "excel/funciones-numericas/definicion/1",
        "title": "Redondear un ticket",
        "language": "excel",
        "code": "=ROUND(100/3,2)",
        "hint": "No confundas cambiar el formato con redondear el valor.",
        "textOutput": "33.33.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-numericas/round-roundup-y-rounddown",
    "remember": "El segundo argumento define decimales.",
    "examples": [
      {
        "id": "excel/funciones-numericas/round-roundup-y-rounddown/1",
        "title": "Comparar redondeos",
        "language": "excel",
        "code": "=ROUND(12.346,2)\n=ROUNDUP(12.341,2)\n=ROUNDDOWN(12.349,2)",
        "hint": "El segundo argumento define decimales.",
        "textOutput": "12.35, 12.35, 12.34.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-numericas/int-y-trunc",
    "remember": "Difieren con números negativos.",
    "examples": [
      {
        "id": "excel/funciones-numericas/int-y-trunc/1",
        "title": "Comparar negativos",
        "language": "excel",
        "code": "=INT(-2.7)\n=TRUNC(-2.7)",
        "hint": "Difieren con números negativos.",
        "textOutput": "-3 y -2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-numericas/abs-y-sign",
    "remember": "ABS elimina dirección de la variación.",
    "examples": [
      {
        "id": "excel/funciones-numericas/abs-y-sign/1",
        "title": "Magnitud de desviación",
        "language": "excel",
        "code": "=ABS(Targets!C2-Targets!B2)\n=SIGN(Targets!C2-Targets!B2)",
        "hint": "ABS elimina dirección de la variación.",
        "textOutput": "100 y -1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-numericas/ceiling-math-y-floor-math",
    "remember": "Útiles para empaques y lotes.",
    "examples": [
      {
        "id": "excel/funciones-numericas/ceiling-math-y-floor-math/1",
        "title": "Agrupar en cajas de 5",
        "language": "excel",
        "code": "=CEILING.MATH(12,5)\n=FLOOR.MATH(12,5)",
        "hint": "Útiles para empaques y lotes.",
        "textOutput": "15 y 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-numericas/mod-y-quotient",
    "remember": "Distingue cajas completas de sobrantes.",
    "examples": [
      {
        "id": "excel/funciones-numericas/mod-y-quotient/1",
        "title": "Distribuir 17 unidades en cajas de 5",
        "language": "excel",
        "code": "=QUOTIENT(17,5)\n=MOD(17,5)",
        "hint": "Distingue cajas completas de sobrantes.",
        "textOutput": "3 y 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
