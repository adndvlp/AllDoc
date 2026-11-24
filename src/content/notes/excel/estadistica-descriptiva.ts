// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/definicion",
    "remember": "La media sola no describe toda la distribución.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/definicion/1",
        "title": "Mediana de importes",
        "language": "excel",
        "code": "=MEDIAN(tSales[amount])",
        "hint": "La media sola no describe toda la distribución.",
        "textOutput": "250.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/median-y-mode-sngl",
    "remember": "La moda no equivale al promedio.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/median-y-mode-sngl/1",
        "title": "Mediana y moda",
        "language": "excel",
        "code": "=MEDIAN(tSales[amount])\n=MODE.SNGL(tSales[amount])",
        "hint": "La moda no equivale al promedio.",
        "textOutput": "250 y 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/stdev-s-y-stdev-p",
    "remember": "Usa .S si tus datos son una muestra de una población más grande.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/stdev-s-y-stdev-p/1",
        "title": "Comparar dispersión",
        "language": "excel",
        "code": "=STDEV.S(10,20,30)\n=STDEV.P(10,20,30)",
        "hint": "Usa .S si tus datos son una muestra de una población más grande.",
        "textOutput": "10 y aproximadamente 8.165.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/var-s-y-var-p",
    "remember": "La varianza tiene unidades al cuadrado.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/var-s-y-var-p/1",
        "title": "Calcular varianza",
        "language": "excel",
        "code": "=VAR.S(10,20,30)",
        "hint": "La varianza tiene unidades al cuadrado.",
        "textOutput": "100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/percentile-inc-y-quartile-inc",
    "remember": "Un percentil puede interpolar valores no observados.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/percentile-inc-y-quartile-inc/1",
        "title": "Obtener tercer cuartil",
        "language": "excel",
        "code": "=QUARTILE.INC(tSales[amount],3)\n=PERCENTILE.INC(tSales[amount],0.75)",
        "hint": "Un percentil puede interpolar valores no observados.",
        "textOutput": "300 y 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/correl",
    "remember": "Correlación no demuestra causalidad.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/correl/1",
        "title": "Relacionar volumen e ingreso",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:A3=1,2,3 y B1:B3=100,200,300; escribe =CORREL(A1:A3,B1:B3). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/rank-eq-y-rank-avg",
    "remember": "Con orden 0, mayor valor recibe 1.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/rank-eq-y-rank-avg/1",
        "title": "Rankear importe de 300",
        "language": "excel",
        "code": "=RANK.EQ(300,tSales[amount],0)\n=RANK.AVG(300,tSales[amount],0)",
        "hint": "Con orden 0, mayor valor recibe 1.",
        "textOutput": "2 y 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/estadistica-descriptiva/deteccion-de-valores-atipicos",
    "remember": "Un outlier no es automáticamente un error.",
    "note": "LET requiere Excel 2021/2024 o 365; puede sustituirse por cálculos separados.",
    "examples": [
      {
        "id": "excel/estadistica-descriptiva/deteccion-de-valores-atipicos/1",
        "title": "Aplicar regla IQR",
        "language": "excel",
        "code": "=LET(cuartiluno,QUARTILE.INC(tSales[amount],1),cuartiltres,QUARTILE.INC(tSales[amount],3),MAX(tSales[amount])>cuartiltres+1.5*(cuartiltres-cuartiluno))",
        "hint": "Un outlier no es automáticamente un error.",
        "textOutput": "TRUE (Q1=175, Q3=300, límite superior=487.5).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
