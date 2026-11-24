// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/definicion",
    "remember": "Las variantes IFS aceptan varios criterios simultáneos.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/definicion/1",
        "title": "Ventas completadas",
        "language": "excel",
        "code": "=SUMIF(tSales[status],\"completed\",tSales[amount])",
        "hint": "Las variantes IFS aceptan varios criterios simultáneos.",
        "textOutput": "1200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/sumif",
    "remember": "Orden: rango de criterio, criterio, rango de suma.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/sumif/1",
        "title": "Sumar Online",
        "language": "excel",
        "code": "=SUMIF(tSales[channel],\"Online\",tSales[amount])",
        "hint": "Orden: rango de criterio, criterio, rango de suma.",
        "textOutput": "1400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/sumifs",
    "remember": "El rango de suma va primero.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/sumifs/1",
        "title": "Ventas Online completadas",
        "language": "excel",
        "code": "=SUMIFS(tSales[amount],tSales[channel],\"Online\",tSales[status],\"completed\")",
        "hint": "El rango de suma va primero.",
        "textOutput": "800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/countif",
    "remember": "No requiere rango de suma.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/countif/1",
        "title": "Contar cancelados",
        "language": "excel",
        "code": "=COUNTIF(tSales[status],\"cancelled\")",
        "hint": "No requiere rango de suma.",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/countifs",
    "remember": "Los criterios se combinan con AND.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/countifs/1",
        "title": "Contar completados Online",
        "language": "excel",
        "code": "=COUNTIFS(tSales[status],\"completed\",tSales[channel],\"Online\")",
        "hint": "Los criterios se combinan con AND.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/averageif-y-averageifs",
    "remember": "AVERAGEIFS recibe el rango del promedio primero.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/averageif-y-averageifs/1",
        "title": "Ticket de Store completado",
        "language": "excel",
        "code": "=AVERAGEIFS(tSales[amount],tSales[channel],\"Store\",tSales[status],\"completed\")",
        "hint": "AVERAGEIFS recibe el rango del promedio primero.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/minifs-y-maxifs",
    "remember": "No confundir máximo filtrado con máximo de toda la tabla.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/minifs-y-maxifs/1",
        "title": "Extremos completados",
        "language": "excel",
        "code": "=MINIFS(tSales[amount],tSales[status],\"completed\")\n=MAXIFS(tSales[amount],tSales[status],\"completed\")",
        "hint": "No confundir máximo filtrado con máximo de toda la tabla.",
        "textOutput": "100 y 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/criterios-operadores-y-comodines",
    "remember": "Concatena el operador y la referencia con &; ~ escapa comodines.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/criterios-operadores-y-comodines/1",
        "title": "Contar importes altos",
        "language": "excel",
        "code": "=COUNTIF(tSales[amount],\">=\"&300)",
        "hint": "Concatena el operador y la referencia con &; ~ escapa comodines.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "excel/agregaciones-condicionales/criterios-operadores-y-comodines/2",
        "title": "Contar correos con ana",
        "language": "excel",
        "code": "=COUNTIF(tLeads[email],\"ana*\")",
        "hint": "Concatena el operador y la referencia con &; ~ escapa comodines.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/agregaciones-condicionales/sumproduct",
    "remember": "Los rangos deben tener dimensiones compatibles.",
    "examples": [
      {
        "id": "excel/agregaciones-condicionales/sumproduct/1",
        "title": "Calcular importe desde unidades",
        "language": "excel",
        "code": "=SUMPRODUCT(tSales[quantity],tSales[unit_price])",
        "hint": "Los rangos deben tener dimensiones compatibles.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
