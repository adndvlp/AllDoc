// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/definicion",
    "remember": "Elige una fórmula legible antes que una combinación innecesariamente compleja.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/definicion/1",
        "title": "Calcular un total con nombre",
        "language": "excel",
        "code": "=LET(total,SUM(tSales[amount]),total*10%)",
        "hint": "Elige una fórmula legible antes que una combinación innecesariamente compleja.",
        "textOutput": "210.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/let",
    "remember": "El último argumento devuelve el resultado.",
    "note": "Excel 2021/2024 o Microsoft 365.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/let/1",
        "title": "Calcular ticket",
        "language": "excel",
        "code": "=LET(total,SUM(tSales[amount]),n,COUNT(tSales[order_id]),total/n)",
        "hint": "El último argumento devuelve el resultado.",
        "textOutput": "262.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/lambda",
    "remember": "Puede registrarse como nombre de libro para reutilizarla.",
    "note": "Microsoft 365 / Excel 2024.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/lambda/1",
        "title": "Calcular impuesto",
        "language": "excel",
        "code": "=LAMBDA(base,tasa,base*tasa)(200,16%)",
        "hint": "Puede registrarse como nombre de libro para reutilizarla.",
        "textOutput": "32.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/map-y-byrow-bycol",
    "remember": "BYROW debe devolver un valor por fila.",
    "note": "Microsoft 365 / Excel 2024.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/map-y-byrow-bycol/1",
        "title": "Calcular importe fila a fila",
        "language": "excel",
        "code": "=BYROW(Sales!E2:F3,LAMBDA(fila,PRODUCT(fila)))",
        "hint": "BYROW debe devolver un valor por fila. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "200 y 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/reduce-y-scan",
    "remember": "El valor inicial es el primer argumento.",
    "note": "Microsoft 365 / Excel 2024; alternativa clásica: SUM con referencia inicial absoluta.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/reduce-y-scan/1",
        "title": "Acumular importes",
        "language": "excel",
        "code": "=SCAN(0,Sales!I2:I4,LAMBDA(acum,valor,acum+valor))",
        "hint": "El valor inicial es el primer argumento.",
        "textOutput": "200, 500, 1100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/formulas-matriciales-clasicas",
    "remember": "No escribas manualmente las llaves de una fórmula CSE.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/formulas-matriciales-clasicas/1",
        "title": "Multiplicar y sumar rangos",
        "language": "text",
        "code": "",
        "hint": "En Scratch, introduce =SUM(Sales!E2:E3*Sales!F2:F3); en Excel antiguo confirma con Ctrl+Shift+Enter; en 365 usa Enter. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "500. SUMPRODUCT ofrece una alternativa sin CSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/formulas-reutilizables-y-matrices/offset-e-indirect",
    "remember": "Ambas son volátiles; prefiere tablas o referencias directas cuando sea posible.",
    "examples": [
      {
        "id": "excel/formulas-reutilizables-y-matrices/offset-e-indirect/1",
        "title": "Leer celda desplazada",
        "language": "excel",
        "code": "=OFFSET(Sales!I2,1,0)\n=INDIRECT(\"Sales!I3\")",
        "hint": "Ambas son volátiles; prefiere tablas o referencias directas cuando sea posible.",
        "textOutput": "300 y 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
