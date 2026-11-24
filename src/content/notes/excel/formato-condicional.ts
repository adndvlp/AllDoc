// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/formato-condicional/definicion",
    "remember": "El formato resalta; no filtra ni corrige.",
    "examples": [
      {
        "id": "excel/formato-condicional/definicion/1",
        "title": "Resaltar importes altos",
        "language": "text",
        "code": "",
        "hint": "Selecciona Sales!I2:I9; Inicio > Formato condicional > Mayor que 300. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se resalta 600 del pedido 103.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formato-condicional/reglas-con-formulas",
    "remember": "Fija la columna con $ cuando la regla deba evaluarse por fila.",
    "examples": [
      {
        "id": "excel/formato-condicional/reglas-con-formulas/1",
        "title": "Resaltar cancelados",
        "language": "text",
        "code": "",
        "hint": "Selecciona Sales!A2:I9 con A2 activa; nueva regla basada en fórmula =$G2=\"cancelled\". Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se resalta la fila completa del pedido 103.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formato-condicional/duplicados",
    "remember": "Permite inspeccionar antes de eliminar.",
    "examples": [
      {
        "id": "excel/formato-condicional/duplicados/1",
        "title": "Resaltar correos",
        "language": "text",
        "code": "",
        "hint": "Aplica Valores duplicados a Leads!B2:B6. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se resaltan B2, B4 y B6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formato-condicional/barras-escalas-e-iconos",
    "remember": "Revisa los umbrales y unidades antes de interpretar colores.",
    "examples": [
      {
        "id": "excel/formato-condicional/barras-escalas-e-iconos/1",
        "title": "Comparar importes",
        "language": "text",
        "code": "",
        "hint": "Aplica barras de datos a Sales!I2:I9. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "600 tiene la barra más larga; los valores 100 comparten la más corta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formato-condicional/administrar-reglas",
    "remember": "Reglas superpuestas pueden competir.",
    "examples": [
      {
        "id": "excel/formato-condicional/administrar-reglas/1",
        "title": "Corregir alcance",
        "language": "text",
        "code": "",
        "hint": "En Administrar reglas fija Se aplica a =Sales!$I$2:$I$9 (o la referencia local equivalente). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "La regla de importes afecta únicamente las ocho celdas previstas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
