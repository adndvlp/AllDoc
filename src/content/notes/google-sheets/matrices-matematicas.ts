// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/matrices-matematicas/definicion",
    "remember": "Verifica dimensiones y si la matriz es invertible.",
    "examples": [
      {
        "id": "google-sheets/matrices-matematicas/definicion/1",
        "title": "Crear matriz identidad",
        "language": "excel-formula",
        "code": "=MUNIT(2)",
        "hint": "",
        "textOutput": "1,0; 0,1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/matrices-matematicas/mmult",
    "remember": "No equivale a multiplicación elemento por elemento.",
    "examples": [
      {
        "id": "google-sheets/matrices-matematicas/mmult/1",
        "title": "Combinar cantidades y precios",
        "language": "excel-formula",
        "code": "=MMULT({2,1},{100;300})",
        "hint": "",
        "textOutput": "500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/matrices-matematicas/mdeterm-y-minverse",
    "remember": "Una matriz singular no tiene inversa.",
    "examples": [
      {
        "id": "google-sheets/matrices-matematicas/mdeterm-y-minverse/1",
        "title": "Calcular determinante",
        "language": "excel-formula",
        "code": "=MDETERM({2,0;0,3})",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
