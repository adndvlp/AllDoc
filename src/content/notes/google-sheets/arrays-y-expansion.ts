// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/definicion",
    "remember": "La zona de salida debe estar libre.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/definicion/1",
        "title": "Crear una columna de tres valores",
        "language": "excel-formula",
        "code": "={10;20;30}",
        "hint": "",
        "textOutput": "A1:A3 muestra 10, 20, 30.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/literales-de-arrays",
    "remember": "Todas las filas deben tener el mismo ancho.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/literales-de-arrays/1",
        "title": "Crear una matriz",
        "language": "excel-formula",
        "code": "={\"A\",\"B\";1,2}",
        "hint": "",
        "textOutput": "Dos filas: A,B; 1,2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/arrayformula",
    "remember": "Muchas funciones de arrays ya se expanden sin ARRAYFORMULA.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/arrayformula/1",
        "title": "Calcular importes en bloque",
        "language": "excel-formula",
        "code": "=ARRAYFORMULA(Ventas!E2:E9*Ventas!F2:F9)",
        "hint": "",
        "textOutput": "Columna: 200,300,600,100,300,400,200,300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/sequence",
    "remember": "No es necesario rellenar manualmente.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/sequence/1",
        "title": "Generar cuatro IDs",
        "language": "excel-formula",
        "code": "=SEQUENCE(4,1,101,1)",
        "hint": "",
        "textOutput": "101,102,103,104 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/transpose",
    "remember": "Cambia la orientación, no el contenido.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/transpose/1",
        "title": "Convertir fila a columna",
        "language": "excel-formula",
        "code": "=TRANSPOSE({\"Ene\",\"Feb\",\"Mar\"})",
        "hint": "",
        "textOutput": "Ene, Feb, Mar en tres filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/arrays-y-expansion/errores-de-expansion",
    "remember": "Limpia la zona de salida sin borrar la fórmula.",
    "examples": [
      {
        "id": "google-sheets/arrays-y-expansion/errores-de-expansion/1",
        "title": "Provocar expansión bloqueada",
        "language": "text",
        "code": "",
        "hint": "En Practica A2 escribe ocupado; en A1 escribe =SEQUENCE(3). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "A1 muestra #REF! hasta liberar A2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
