// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/definicion",
    "remember": "No escondas errores sin saber su causa.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/definicion/1",
        "title": "Detectar email faltante",
        "language": "excel-formula",
        "code": "=ISBLANK(Clientes!E6)",
        "hint": "",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/isblank",
    "remember": "Una fórmula que devuelve \"\" no está realmente vacía.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/isblank/1",
        "title": "Diferenciar vacío y cadena vacía",
        "language": "text",
        "code": "",
        "hint": "En Practica A1 escribe =\"\" y en B1 =ISBLANK(A1). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "FALSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/isnumber-e-istext",
    "remember": "Un ID escrito como texto no es número.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/isnumber-e-istext/1",
        "title": "Diagnosticar un valor",
        "language": "excel-formula",
        "code": "={ISNUMBER(Ventas!A2),ISTEXT(Clientes!B2)}",
        "hint": "",
        "textOutput": "TRUE, TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/iferror",
    "remember": "Puede ocultar errores de calidad o de referencia.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/iferror/1",
        "title": "Evitar dividir por cero",
        "language": "excel-formula",
        "code": "=IFERROR(100/0,\"Sin denominador\")",
        "hint": "",
        "textOutput": "Sin denominador.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/ifna-e-isna",
    "remember": "Útil para búsquedas sin coincidencia.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/ifna-e-isna/1",
        "title": "Gestionar ausencia",
        "language": "excel-formula",
        "code": "=IFNA(NA(),\"No encontrado\")",
        "hint": "",
        "textOutput": "No encontrado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/iserror-y-error-type",
    "remember": "#DIV/0! tiene código 2.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/iserror-y-error-type/1",
        "title": "Identificar una división inválida",
        "language": "excel-formula",
        "code": "={ISERROR(1/0),ERROR.TYPE(1/0)}",
        "hint": "",
        "textOutput": "TRUE, 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/errores-frecuentes",
    "remember": "Revisa el mensaje antes de modificar la fórmula.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/errores-frecuentes/1",
        "title": "Provocar un error identificable",
        "language": "excel-formula",
        "code": "=1/0",
        "hint": "",
        "textOutput": "#DIV/0!.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/type-e-isformula",
    "remember": "TYPE de número es 1; de texto es 2.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/type-e-isformula/1",
        "title": "Inspeccionar el importe",
        "language": "excel-formula",
        "code": "={TYPE(Ventas!J2),ISFORMULA(Ventas!J2)}",
        "hint": "",
        "textOutput": "1, TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/vacios-errores-y-diagnostico/formulatext-isref-y-cell",
    "remember": "FORMULATEXT necesita una celda con fórmula.",
    "examples": [
      {
        "id": "google-sheets/vacios-errores-y-diagnostico/formulatext-isref-y-cell/1",
        "title": "Leer una fórmula de origen",
        "language": "excel-formula",
        "code": "=FORMULATEXT(Ventas!J2)",
        "hint": "",
        "textOutput": "=E2*F2, como texto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
