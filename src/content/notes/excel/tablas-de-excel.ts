// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/tablas-de-excel/definicion",
    "remember": "Un rango con formato no es necesariamente una tabla.",
    "examples": [
      {
        "id": "excel/tablas-de-excel/definicion/1",
        "title": "Crear tabla",
        "language": "text",
        "code": "",
        "hint": "Selecciona Sales!A1:I9 > Insertar > Tabla; confirma encabezados y nómbrala tSales. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Tabla de 8 filas de datos y 9 columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-de-excel/referencias-estructuradas",
    "remember": "tSales[amount] representa la columna de datos sin encabezado.",
    "examples": [
      {
        "id": "excel/tablas-de-excel/referencias-estructuradas/1",
        "title": "Sumar columna",
        "language": "excel",
        "code": "=SUM(tSales[amount])",
        "hint": "tSales[amount] representa la columna de datos sin encabezado.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-de-excel/columna-calculada-y",
    "remember": "@ significa esta fila.",
    "examples": [
      {
        "id": "excel/tablas-de-excel/columna-calculada-y/1",
        "title": "Calcular importe",
        "language": "text",
        "code": "",
        "hint": "Añade una columna calc_amount en tSales y escribe =[@quantity]*[@unit_price] en la primera fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 resultados: 200, 300, 600, 300, 100, 200, 300, 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-de-excel/fila-de-totales",
    "remember": "Puede cambiar con el filtro aplicado.",
    "examples": [
      {
        "id": "excel/tablas-de-excel/fila-de-totales/1",
        "title": "Total de importes",
        "language": "text",
        "code": "",
        "hint": "Activa Fila de totales en Diseño de tabla y selecciona Suma para amount. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "2100 sin filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/tablas-de-excel/expansion-y-redimensionamiento",
    "remember": "Comprueba que los nuevos registros pertenecen al objeto tabla.",
    "examples": [
      {
        "id": "excel/tablas-de-excel/expansion-y-redimensionamiento/1",
        "title": "Añadir pedido",
        "language": "text",
        "code": "",
        "hint": "En copia de tSales, añade la fila 109, 2026-02-16, C5, P3, 1, 50, completed, Store, 50 inmediatamente debajo de los datos (sin fila de totales). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "9 filas; la suma de amount es 2150 si la tabla incluye la nueva fila.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
