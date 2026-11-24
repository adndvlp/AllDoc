// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/conversiones/definicion",
    "remember": "El formato no reemplaza la conversión.",
    "examples": [
      {
        "id": "google-sheets/conversiones/definicion/1",
        "title": "Convertir monto textual",
        "language": "excel-formula",
        "code": "=VALUE(\"300\")",
        "hint": "",
        "textOutput": "300 numérico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/conversiones/value",
    "remember": "No sirve para texto arbitrario.",
    "examples": [
      {
        "id": "google-sheets/conversiones/value/1",
        "title": "Convertir precio importado",
        "language": "excel-formula",
        "code": "=VALUE(\"1,200.50\")",
        "hint": "",
        "textOutput": "1200.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/conversiones/text-y-to-text",
    "remember": "El resultado de TEXT deja de ser número.",
    "examples": [
      {
        "id": "google-sheets/conversiones/text-y-to-text/1",
        "title": "Crear etiqueta mensual",
        "language": "excel-formula",
        "code": "=TEXT(Ventas!B2,\"yyyy-mm\")",
        "hint": "",
        "textOutput": "2026-08.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/conversiones/to-pure-number-y-n",
    "remember": "N de un texto común devuelve 0, no lo interpreta como VALUE.",
    "examples": [
      {
        "id": "google-sheets/conversiones/to-pure-number-y-n/1",
        "title": "Convertir booleanos a indicadores",
        "language": "excel-formula",
        "code": "={N(TRUE),N(FALSE)}",
        "hint": "",
        "textOutput": "1, 0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/conversiones/conversion-de-separadores-regionales",
    "remember": "NUMBERVALUE no figura en el catálogo oficial de Sheets; no presupongas compatibilidad con Excel.",
    "examples": [
      {
        "id": "google-sheets/conversiones/conversion-de-separadores-regionales/1",
        "title": "Convertir un monto europeo en región de Estados Unidos",
        "language": "excel-formula",
        "code": "=VALUE(SUBSTITUTE(SUBSTITUTE(\"1.234,50\",\".\",\"\"),\",\",\".\"))",
        "hint": "",
        "textOutput": "1234.5 como número.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
