// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/funciones-logicas/definicion",
    "remember": "Una condición verdadera o falsa dirige el cálculo.",
    "examples": [
      {
        "id": "excel/funciones-logicas/definicion/1",
        "title": "Etiquetar meta",
        "language": "excel",
        "code": "=IF(Targets!C2>=Targets!B2,\"Cumple\",\"No cumple\")",
        "hint": "Una condición verdadera o falsa dirige el cálculo.",
        "textOutput": "No cumple.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/if",
    "remember": "Orden: condición, valor verdadero, valor falso.",
    "examples": [
      {
        "id": "excel/funciones-logicas/if/1",
        "title": "Clasificar pedido",
        "language": "excel",
        "code": "=IF(Sales!I2>=300,\"Alto\",\"Bajo\")",
        "hint": "Orden: condición, valor verdadero, valor falso.",
        "textOutput": "Bajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/and",
    "remember": "Basta una condición falsa para obtener FALSE.",
    "examples": [
      {
        "id": "excel/funciones-logicas/and/1",
        "title": "Pedido válido",
        "language": "excel",
        "code": "=AND(Sales!G2=\"completed\",Sales!I2>=200)",
        "hint": "Basta una condición falsa para obtener FALSE.",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/or-y-not",
    "remember": "OR acepta cualquiera; NOT niega.",
    "examples": [
      {
        "id": "excel/funciones-logicas/or-y-not/1",
        "title": "Detectar pedido abierto",
        "language": "excel",
        "code": "=OR(Sales!G8=\"pending\",Sales!G8=\"cancelled\")\n=NOT(Sales!G8=\"completed\")",
        "hint": "OR acepta cualquiera; NOT niega.",
        "textOutput": "TRUE y TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/if-anidado-e-ifs",
    "remember": "La primera condición verdadera determina el resultado.",
    "note": "En versiones sin IFS usa =IF(Sales!I2>=300,\"Alto\",IF(Sales!I2>=200,\"Medio\",\"Bajo\")).",
    "examples": [
      {
        "id": "excel/funciones-logicas/if-anidado-e-ifs/1",
        "title": "Segmentar importe",
        "language": "excel",
        "code": "=IFS(Sales!I2>=300,\"Alto\",Sales!I2>=200,\"Medio\",TRUE,\"Bajo\")",
        "hint": "La primera condición verdadera determina el resultado.",
        "textOutput": "Medio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/switch",
    "remember": "Usa IF o IFS para intervalos numéricos.",
    "examples": [
      {
        "id": "excel/funciones-logicas/switch/1",
        "title": "Traducir estado",
        "language": "excel",
        "code": "=SWITCH(Sales!G2,\"completed\",\"Cerrado\",\"cancelled\",\"Cancelado\",\"Otro\")",
        "hint": "Usa IF o IFS para intervalos numéricos.",
        "textOutput": "Cerrado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-logicas/choose",
    "remember": "El índice indica posición, no valor de búsqueda.",
    "examples": [
      {
        "id": "excel/funciones-logicas/choose/1",
        "title": "Etiqueta de trimestre",
        "language": "excel",
        "code": "=CHOOSE(2,\"Q1\",\"Q2\",\"Q3\",\"Q4\")",
        "hint": "El índice indica posición, no valor de búsqueda.",
        "textOutput": "Q2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
