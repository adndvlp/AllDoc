// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/operadores-y-formulas/definicion",
    "remember": "Los paréntesis controlan el orden de evaluación.",
    "examples": [
      {
        "id": "google-sheets/operadores-y-formulas/definicion/1",
        "title": "Calcular importe",
        "language": "excel-formula",
        "code": "=Ventas!E2*Ventas!F2",
        "hint": "",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/operadores-y-formulas/aritmetica",
    "remember": "Multiplicación y división preceden a suma y resta.",
    "examples": [
      {
        "id": "google-sheets/operadores-y-formulas/aritmetica/1",
        "title": "Calcular utilidad",
        "language": "excel-formula",
        "code": "=Ventas!J2-Ventas!K2",
        "hint": "",
        "textOutput": "80.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/operadores-y-formulas/comparaciones",
    "remember": "Las comparaciones producen valores lógicos.",
    "examples": [
      {
        "id": "google-sheets/operadores-y-formulas/comparaciones/1",
        "title": "Comprobar un umbral",
        "language": "excel-formula",
        "code": "=Ventas!J4>=500",
        "hint": "",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/operadores-y-formulas/concatenacion-con",
    "remember": "Añade separadores explícitos.",
    "examples": [
      {
        "id": "google-sheets/operadores-y-formulas/concatenacion-con/1",
        "title": "Construir etiqueta",
        "language": "excel-formula",
        "code": "=Clientes!B2&\" - \"&Clientes!C2",
        "hint": "",
        "textOutput": "Ana - Mexico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/operadores-y-formulas/porcentajes",
    "remember": "Para mostrar porcentaje aplica formato, no multipliques dos veces.",
    "examples": [
      {
        "id": "google-sheets/operadores-y-formulas/porcentajes/1",
        "title": "Descontar 20%",
        "language": "excel-formula",
        "code": "=Ventas!J2*(1-20%)",
        "hint": "",
        "textOutput": "160.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
