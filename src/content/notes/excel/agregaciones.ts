// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/agregaciones/definicion",
    "remember": "Elige la función según la pregunta, no según el tipo de gráfico.",
    "examples": [
      {
        "id": "excel/agregaciones/definicion/1",
        "title": "Importe total",
        "language": "excel",
        "code": "=SUM(Sales!I2:I9)",
        "hint": "Elige la función según la pregunta, no según el tipo de gráfico.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/sum",
    "remember": "El texto de un rango no se suma.",
    "examples": [
      {
        "id": "excel/agregaciones/sum/1",
        "title": "Sumar pedidos",
        "language": "excel",
        "code": "=SUM(tSales[amount])",
        "hint": "El texto de un rango no se suma.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/average",
    "remember": "Los ceros cuentan; las celdas vacías del rango no.",
    "examples": [
      {
        "id": "excel/agregaciones/average/1",
        "title": "Ticket medio sin filtrar",
        "language": "excel",
        "code": "=AVERAGE(tSales[amount])",
        "hint": "Los ceros cuentan; las celdas vacías del rango no.",
        "textOutput": "262.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/count",
    "remember": "COUNT no cuenta identificadores de texto.",
    "examples": [
      {
        "id": "excel/agregaciones/count/1",
        "title": "Contar pedidos numéricos",
        "language": "excel",
        "code": "=COUNT(tSales[order_id])",
        "hint": "COUNT no cuenta identificadores de texto.",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/counta-y-countblank",
    "remember": "Una fórmula que devuelve \"\" puede contarse en ambas.",
    "examples": [
      {
        "id": "excel/agregaciones/counta-y-countblank/1",
        "title": "Contar países registrados",
        "language": "excel",
        "code": "=COUNTA(Customers!C2:C6)\n=COUNTBLANK(Customers!C2:C6)",
        "hint": "Una fórmula que devuelve \"\" puede contarse en ambas.",
        "textOutput": "4 y 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/min-y-max",
    "remember": "No indican por sí mismos la fila que contiene el extremo.",
    "examples": [
      {
        "id": "excel/agregaciones/min-y-max/1",
        "title": "Extremos de importe",
        "language": "excel",
        "code": "=MIN(tSales[amount])\n=MAX(tSales[amount])",
        "hint": "No indican por sí mismos la fila que contiene el extremo.",
        "textOutput": "100 y 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/product",
    "remember": "Sirve cuando hay varios factores.",
    "examples": [
      {
        "id": "excel/agregaciones/product/1",
        "title": "Calcular importe",
        "language": "excel",
        "code": "=PRODUCT(Sales!E2:F2)",
        "hint": "Sirve cuando hay varios factores.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/large-y-small",
    "remember": "k=1 equivale al máximo o mínimo.",
    "examples": [
      {
        "id": "excel/agregaciones/large-y-small/1",
        "title": "Segundo importe mayor",
        "language": "excel",
        "code": "=LARGE(tSales[amount],2)",
        "hint": "k=1 equivale al máximo o mínimo.",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/subtotal",
    "remember": "109 suma omitiendo filas filtradas y ocultas manualmente.",
    "examples": [
      {
        "id": "excel/agregaciones/subtotal/1",
        "title": "Sumar completados visibles",
        "language": "text",
        "code": "",
        "hint": "Filtra tSales[status] por completed y en Scratch escribe =SUBTOTAL(109,tSales[amount]). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones/aggregate",
    "remember": "El primer argumento elige la operación; el segundo la opción.",
    "examples": [
      {
        "id": "excel/agregaciones/aggregate/1",
        "title": "Sumar sin error",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=10, A2 =1/0, A3=20; en B1 escribe =AGGREGATE(9,6,A1:A3). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "30.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
