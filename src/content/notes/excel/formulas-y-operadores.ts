// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/definicion",
    "remember": "Excel recalcula las fórmulas cuando cambian sus dependencias si el cálculo es automático.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/definicion/1",
        "title": "Calcular importe",
        "language": "excel",
        "code": "=Sales!E2*Sales!F2",
        "hint": "Excel recalcula las fórmulas cuando cambian sus dependencias si el cálculo es automático.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/operadores-aritmeticos",
    "remember": "* multiplica y / divide.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/operadores-aritmeticos/1",
        "title": "Aplicar descuento",
        "language": "excel",
        "code": "=200*(1-10%)",
        "hint": "* multiplica y / divide.",
        "textOutput": "180.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/comparaciones",
    "remember": "Una comparación no es una asignación.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/comparaciones/1",
        "title": "Comprobar meta",
        "language": "excel",
        "code": "=Targets!C2>=Targets!B2",
        "hint": "Una comparación no es una asignación.",
        "textOutput": "FALSE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/precedencia-y-parentesis",
    "remember": "Usa paréntesis para expresar la intención.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/precedencia-y-parentesis/1",
        "title": "Comparar cálculos",
        "language": "excel",
        "code": "=2+3*4\n=(2+3)*4",
        "hint": "Usa paréntesis para expresar la intención.",
        "textOutput": "14 y 20 respectivamente (introduce cada fórmula en una celda).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/concatenacion-con",
    "remember": "& no suma cantidades.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/concatenacion-con/1",
        "title": "Crear etiqueta",
        "language": "excel",
        "code": "=Customers!A2&\" - \"&Customers!B2",
        "hint": "& no suma cantidades.",
        "textOutput": "C1 - Ana.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-y-operadores/argumentos-y-funciones",
    "remember": "Los separadores dependen de la configuración regional.",
    "examples": [
      {
        "id": "excel/formulas-y-operadores/argumentos-y-funciones/1",
        "title": "Elegir máximo",
        "language": "excel",
        "code": "=MAX(10,30,20)",
        "hint": "Los separadores dependen de la configuración regional.",
        "textOutput": "30.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
