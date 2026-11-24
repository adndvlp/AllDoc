// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/expresiones-regulares/definicion",
    "remember": "Los patrones se escriben como cadenas.",
    "examples": [
      {
        "id": "google-sheets/expresiones-regulares/definicion/1",
        "title": "Detectar código válido",
        "language": "excel-formula",
        "code": "=REGEXMATCH(\"MX-123\",\"^[A-Z]{2}-[0-9]{3}$\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexmatch",
    "remember": "^ y $ anclan inicio y fin.",
    "examples": [
      {
        "id": "google-sheets/expresiones-regulares/regexmatch/1",
        "title": "Identificar dominio de correo",
        "language": "excel-formula",
        "code": "=REGEXMATCH(Clientes!E2,\"@example\\.com$\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexextract",
    "remember": "Usa IFNA si el patrón puede faltar.",
    "examples": [
      {
        "id": "google-sheets/expresiones-regulares/regexextract/1",
        "title": "Extraer dígitos del código",
        "language": "excel-formula",
        "code": "=REGEXEXTRACT(\"MX-123\",\"[0-9]+\")",
        "hint": "",
        "textOutput": "123 como texto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/expresiones-regulares/regexreplace",
    "remember": "No es necesario conocer el texto exacto.",
    "examples": [
      {
        "id": "google-sheets/expresiones-regulares/regexreplace/1",
        "title": "Limpiar teléfono",
        "language": "excel-formula",
        "code": "=REGEXREPLACE(\"(55) 1234-5678\",\"[^0-9]\",\"\")",
        "hint": "",
        "textOutput": "5512345678 como texto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
