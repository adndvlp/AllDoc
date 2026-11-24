// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/tipos-y-formatos/definicion",
    "remember": "Cambiar formato no equivale a convertir tipo.",
    "examples": [
      {
        "id": "google-sheets/tipos-y-formatos/definicion/1",
        "title": "Mostrar un ratio como porcentaje",
        "language": "text",
        "code": "",
        "hint": "Escribe =6/8 en Practica A1 y aplica Formato > Número > Porcentaje. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "75%; el valor interno sigue siendo 0.75.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tipos-y-formatos/numeros-y-texto",
    "remember": "Un apóstrofo inicial fuerza texto.",
    "examples": [
      {
        "id": "google-sheets/tipos-y-formatos/numeros-y-texto/1",
        "title": "Conservar un código",
        "language": "text",
        "code": "",
        "hint": "Escribe '001 en A1 y =ISNUMBER(A1) en B1. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "A1 muestra 001; B1=FALSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tipos-y-formatos/moneda-y-decimales",
    "remember": "No confundas redondeo visual con ROUND.",
    "examples": [
      {
        "id": "google-sheets/tipos-y-formatos/moneda-y-decimales/1",
        "title": "Mostrar ingresos en MXN",
        "language": "text",
        "code": "",
        "hint": "En A1 escribe 2000.5; aplica moneda personalizada MXN con dos decimales. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se muestra un importe de 2,000.50 con el símbolo de MXN seleccionado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tipos-y-formatos/fechas-y-horas",
    "remember": "Usa fechas reales para ordenar y restar.",
    "examples": [
      {
        "id": "google-sheets/tipos-y-formatos/fechas-y-horas/1",
        "title": "Medir un día",
        "language": "excel-formula",
        "code": "=DATE(2026,9,2)-DATE(2026,9,1)",
        "hint": "",
        "textOutput": "1, con formato número.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tipos-y-formatos/configuracion-regional",
    "remember": "No copies fórmulas de otra región sin revisar separadores.",
    "examples": [
      {
        "id": "google-sheets/tipos-y-formatos/configuracion-regional/1",
        "title": "Configurar los ejemplos",
        "language": "text",
        "code": "",
        "hint": "Archivo > Configuración; selecciona Estados Unidos y zona horaria Ciudad de México; conserva nombres de funciones en inglés. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Las fórmulas de esta guía usan coma y punto decimal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
