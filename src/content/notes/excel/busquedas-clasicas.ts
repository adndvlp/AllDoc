// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/definicion",
    "remember": "Una clave repetida puede producir una coincidencia no deseada.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/definicion/1",
        "title": "Buscar precio",
        "language": "excel",
        "code": "=VLOOKUP(\"P2\",Products!A2:D4,4,FALSE)",
        "hint": "Una clave repetida puede producir una coincidencia no deseada.",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/vlookup",
    "remember": "FALSE exige coincidencia exacta.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/vlookup/1",
        "title": "Buscar nombre de cliente",
        "language": "excel",
        "code": "=VLOOKUP(\"C3\",Customers!A2:C6,2,FALSE)",
        "hint": "FALSE exige coincidencia exacta.",
        "textOutput": "Marta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/hlookup",
    "remember": "El índice indica la fila dentro del rango.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/hlookup/1",
        "title": "Buscar meta horizontal",
        "language": "text",
        "code": "",
        "hint": "En Scratch escribe A1=Jan, B1=Feb, A2=600, B2=650; en D1 usa =HLOOKUP(\"Feb\",A1:B2,2,FALSE). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "650.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/coincidencia-aproximada",
    "remember": "Con VLOOKUP TRUE ordena la primera columna ascendente.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/coincidencia-aproximada/1",
        "title": "Asignar comisión por tramo",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1:B3 escribe filas (0,0%), (100,5%), (500,10%); en D1 usa =VLOOKUP(300,A1:B3,2,TRUE). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "5%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/match",
    "remember": "0 solicita igualdad exacta.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/match/1",
        "title": "Localizar P3",
        "language": "excel",
        "code": "=MATCH(\"P3\",Products!A2:A4,0)",
        "hint": "0 solicita igualdad exacta.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/index",
    "remember": "La posición es relativa al rango indicado.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/index/1",
        "title": "Obtener segundo producto",
        "language": "excel",
        "code": "=INDEX(Products!B2:B4,2)",
        "hint": "La posición es relativa al rango indicado.",
        "textOutput": "Monitor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/index-y-match",
    "remember": "MATCH encuentra la posición; INDEX devuelve el valor.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/index-y-match/1",
        "title": "Recuperar código a partir del nombre",
        "language": "excel",
        "code": "=INDEX(Products!A2:A4,MATCH(\"Monitor\",Products!B2:B4,0))",
        "hint": "MATCH encuentra la posición; INDEX devuelve el valor.",
        "textOutput": "P2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/busquedas-clasicas/busqueda-bidimensional",
    "remember": "Se necesitan dos posiciones relativas.",
    "examples": [
      {
        "id": "excel/busquedas-clasicas/busqueda-bidimensional/1",
        "title": "Buscar precio de Monitor",
        "language": "excel",
        "code": "=INDEX(Products!A2:D4,MATCH(\"P2\",Products!A2:A4,0),MATCH(\"price\",Products!A1:D1,0))",
        "hint": "Se necesitan dos posiciones relativas.",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
