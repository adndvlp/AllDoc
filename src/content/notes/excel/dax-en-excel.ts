// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/dax-en-excel/definicion",
    "remember": "DAX no es una fórmula de celda de Excel.",
    "note": "Ejemplos para Power Pivot Windows. Define las medidas en el área de cálculo o diálogo Nueva medida; el diálogo puede pedir nombre y fórmula por separado. Usa los nombres de tabla del modelo; conserva las medidas creadas en este grupo para los ejemplos posteriores.",
    "examples": [
      {
        "id": "excel/dax-en-excel/definicion/1",
        "title": "Crear medida",
        "language": "dax",
        "code": "ImporteTotal := SUM(tSales[amount])",
        "hint": "DAX no es una fórmula de celda de Excel. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "2100 sin filtros del modelo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/columnas-calculadas",
    "remember": "Una columna calculada tiene un valor por fila.",
    "examples": [
      {
        "id": "excel/dax-en-excel/columnas-calculadas/1",
        "title": "Calcular importe",
        "language": "dax",
        "code": "=tSales[quantity] * tSales[unit_price]",
        "hint": "Una columna calculada tiene un valor por fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 valores iguales a amount; suma 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/medidas-y-contexto-de-filtro",
    "remember": "La medida no tiene un valor fijo por fila como una columna.",
    "examples": [
      {
        "id": "excel/dax-en-excel/medidas-y-contexto-de-filtro/1",
        "title": "Mostrar ImporteTotal por canal",
        "language": "text",
        "code": "",
        "hint": "Añade channel a Filas de una pivot del modelo e ImporteTotal a Valores. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Online 1400 y Store 700; total 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/sumx",
    "remember": "SUMX calcula primero el producto por fila.",
    "examples": [
      {
        "id": "excel/dax-en-excel/sumx/1",
        "title": "Sumar importes calculados",
        "language": "dax",
        "code": "ImporteCalculado := SUMX(tSales, tSales[quantity] * tSales[unit_price])",
        "hint": "SUMX calcula primero el producto por fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/distinctcount-y-countrows",
    "remember": "DISTINCTCOUNT incluye BLANK si existe; exclúyelo si la definición lo exige.",
    "examples": [
      {
        "id": "excel/dax-en-excel/distinctcount-y-countrows/1",
        "title": "Contar pedidos y clientes",
        "language": "dax",
        "code": "Pedidos := COUNTROWS(tSales)\nClientes := DISTINCTCOUNT(tSales[customer_id])",
        "hint": "DISTINCTCOUNT incluye BLANK si existe; exclúyelo si la definición lo exige. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 pedidos y 4 clientes sin filtros. Crea cada medida por separado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/calculate",
    "remember": "Un filtro nuevo sobre la misma columna puede reemplazar el existente.",
    "examples": [
      {
        "id": "excel/dax-en-excel/calculate/1",
        "title": "Ventas completadas",
        "language": "dax",
        "code": "Ventas := CALCULATE([ImporteTotal], tSales[status] = \"completed\")",
        "hint": "Un filtro nuevo sobre la misma columna puede reemplazar el existente. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1200 sin otros filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/divide",
    "remember": "Usa BLANK para un ratio no definido si no se necesita otro valor.",
    "examples": [
      {
        "id": "excel/dax-en-excel/divide/1",
        "title": "Ticket completado",
        "language": "dax",
        "code": "Ticket := DIVIDE([Ventas], CALCULATE([Pedidos], tSales[status] = \"completed\"))",
        "hint": "Usa BLANK para un ratio no definido si no se necesita otro valor. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "200 sin otros filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/related",
    "remember": "Requiere una relación adecuada y contexto de fila.",
    "examples": [
      {
        "id": "excel/dax-en-excel/related/1",
        "title": "Traer categoría a tSales",
        "language": "dax",
        "code": "=RELATED(tProducts[category])",
        "hint": "Requiere una relación adecuada y contexto de fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Primera fila Electronics; pedido 105 Accessories.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/filter",
    "remember": "FILTER recibe tabla y expresión lógica por fila.",
    "examples": [
      {
        "id": "excel/dax-en-excel/filter/1",
        "title": "Sumar completados grandes",
        "language": "dax",
        "code": "VentasGrandes := SUMX(FILTER(tSales, tSales[status] = \"completed\" && tSales[amount] >= 300), tSales[amount])",
        "hint": "FILTER recibe tabla y expresión lógica por fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/all-y-removefilters",
    "remember": "Quita solo los filtros que deben ignorarse.",
    "note": "ALL como modificador es una alternativa compatible con Power Pivot clásico; REMOVEFILTERS no está disponible en todas las versiones del motor DAX de Excel.",
    "examples": [
      {
        "id": "excel/dax-en-excel/all-y-removefilters/1",
        "title": "Participación de canal",
        "language": "dax",
        "code": "ParticipacionCanal := DIVIDE([Ventas], CALCULATE([Ventas], ALL(tSales[channel])))",
        "hint": "Quita solo los filtros que deben ignorarse. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "En pivot por channel: Online 66.67%, Store 33.33%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/rankx",
    "remember": "El conjunto que se rankea debe corresponder al universo elegido.",
    "examples": [
      {
        "id": "excel/dax-en-excel/rankx/1",
        "title": "Rankear canales",
        "language": "dax",
        "code": "RankingCanal := RANKX(ALL(tSales[channel]), [Ventas], , DESC, Dense)",
        "hint": "El conjunto que se rankea debe corresponder al universo elegido. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "En una pivot por channel: Online 1, Store 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/dax-en-excel/inteligencia-de-tiempo",
    "remember": "Usa la fecha del calendario, no una columna de hechos dispersa.",
    "note": "Requiere tCalendar relacionada y marcada como tabla de fechas según la versión.",
    "examples": [
      {
        "id": "excel/dax-en-excel/inteligencia-de-tiempo/1",
        "title": "Ventas acumuladas del año",
        "language": "dax",
        "code": "VentasYTD := TOTALYTD([Ventas], tCalendar[date])",
        "hint": "Usa la fecha del calendario, no una columna de hechos dispersa. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "En pivot con meses del calendario: enero 500, febrero 1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
