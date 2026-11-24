// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/tablas-estructuradas/definicion",
    "remember": "No son tablas dinámicas; verifica tipos y nombres únicos.",
    "examples": [
      {
        "id": "google-sheets/tablas-estructuradas/definicion/1",
        "title": "Convertir ventas en tabla",
        "language": "text",
        "code": "",
        "hint": "En una copia de Ventas selecciona A1:K9; Formato > Convertir en tabla; nómbrala Pedidos. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Se crea una tabla Pedidos con encabezados y filas de datos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-estructuradas/referencias-de-tabla",
    "remember": "Usa los nombres reales de tabla y encabezado.",
    "examples": [
      {
        "id": "google-sheets/tablas-estructuradas/referencias-de-tabla/1",
        "title": "Sumar columna estructurada",
        "language": "text",
        "code": "",
        "hint": "Tras crear Pedidos como en la ficha Definición, escribe =SUM(Pedidos[importe]) fuera de la tabla. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "2400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/tablas-estructuradas/tipos-de-columna-y-vistas",
    "remember": "Una advertencia de tipo no equivale necesariamente a restricción estricta.",
    "examples": [
      {
        "id": "google-sheets/tablas-estructuradas/tipos-de-columna-y-vistas/1",
        "title": "Configurar tipo numérico",
        "language": "text",
        "code": "",
        "hint": "En Pedidos abre el menú de encabezado cantidad, elige tipo número; crea una vista agrupada por estado si está disponible. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "La columna queda tipada y la vista agrupa completed y cancelled.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
