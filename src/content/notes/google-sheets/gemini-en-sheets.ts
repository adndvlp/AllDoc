// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/gemini-en-sheets/definicion",
    "remember": "Comprueba resultados y no expongas datos sensibles.",
    "examples": [
      {
        "id": "google-sheets/gemini-en-sheets/definicion/1",
        "title": "Pedir resumen de ventas",
        "language": "text",
        "code": "",
        "hint": "En una copia sin información sensible, abre Gemini si está disponible y solicita sumar importe por estado usando Ventas A1:K9. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Un resumen sugerido que debe comprobarse contra 400 cancelado y 2000 completado; no se garantiza salida exacta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/gemini-en-sheets/verificacion-de-resultados",
    "remember": "Valida filtros, rangos, denominadores y casos límite.",
    "examples": [
      {
        "id": "google-sheets/gemini-en-sheets/verificacion-de-resultados/1",
        "title": "Contrastar una fórmula sugerida",
        "language": "excel-formula",
        "code": "=SUMIF(Ventas!H2:H9,\"completed\",Ventas!J2:J9)",
        "hint": "",
        "textOutput": "2000; cualquier resumen equivalente debe coincidir con este cálculo para los datos de la guía.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
