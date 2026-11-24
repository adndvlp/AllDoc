// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/definicion",
    "remember": "La coincidencia exacta es el comportamiento predeterminado.",
    "note": "Excel 2021/2024 y Microsoft 365; no disponible en Excel 2016/2019. Usa INDEX/MATCH como alternativa.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/definicion/1",
        "title": "Cruzar cliente",
        "language": "excel",
        "code": "=XLOOKUP(\"C2\",tCustomers[customer_id],tCustomers[name])",
        "hint": "La coincidencia exacta es el comportamiento predeterminado.",
        "textOutput": "Luis.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/busqueda-en-cualquier-direccion",
    "remember": "No necesitas contar columnas.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/busqueda-en-cualquier-direccion/1",
        "title": "Obtener id de producto",
        "language": "excel",
        "code": "=XLOOKUP(\"Cable\",tProducts[product_name],tProducts[product_id])",
        "hint": "No necesitas contar columnas.",
        "textOutput": "P3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/valor-si-no-se-encuentra",
    "remember": "No uses 0 como sustituto si podría confundirse con un precio real.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/valor-si-no-se-encuentra/1",
        "title": "Detectar código inexistente",
        "language": "excel",
        "code": "=XLOOKUP(\"P9\",tProducts[product_id],tProducts[price],\"No existe\")",
        "hint": "No uses 0 como sustituto si podría confundirse con un precio real.",
        "textOutput": "No existe.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/primera-o-ultima-coincidencia",
    "remember": "El modo -1 busca desde el final; no equivale a más reciente si los datos no están ordenados.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/primera-o-ultima-coincidencia/1",
        "title": "Última fila de C1",
        "language": "excel",
        "code": "=XLOOKUP(\"C1\",tSales[customer_id],tSales[order_id],\"\",0,-1)",
        "hint": "El modo -1 busca desde el final; no equivale a más reciente si los datos no están ordenados.",
        "textOutput": "106.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/multiples-criterios",
    "remember": "Multiplicar condiciones booleanas representa AND.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/multiples-criterios/1",
        "title": "Encontrar pedido C2 de P3",
        "language": "excel",
        "code": "=XLOOKUP(1,(tSales[customer_id]=\"C2\")*(tSales[product_id]=\"P3\"),tSales[order_id],\"No existe\")",
        "hint": "Multiplicar condiciones booleanas representa AND. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "105.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/xlookup-y-xmatch/xmatch",
    "remember": "Por defecto busca coincidencia exacta.",
    "examples": [
      {
        "id": "excel/xlookup-y-xmatch/xmatch/1",
        "title": "Posición de C3",
        "language": "excel",
        "code": "=XMATCH(\"C3\",tCustomers[customer_id])",
        "hint": "Por defecto busca coincidencia exacta.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
