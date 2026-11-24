// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/agregacion/definicion",
    "remember": "El rango define qué datos entran.",
    "examples": [
      {
        "id": "google-sheets/agregacion/definicion/1",
        "title": "Sumar pedidos de cualquier estado",
        "language": "excel-formula",
        "code": "=SUM(Ventas!J2:J9)",
        "hint": "",
        "textOutput": "2400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/sum",
    "remember": "Las celdas vacías y texto del rango no suman.",
    "examples": [
      {
        "id": "google-sheets/agregacion/sum/1",
        "title": "Sumar cantidades",
        "language": "excel-formula",
        "code": "=SUM(Ventas!E2:E9)",
        "hint": "",
        "textOutput": "13.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/average",
    "remember": "Ignora vacíos, pero incluye ceros.",
    "examples": [
      {
        "id": "google-sheets/agregacion/average/1",
        "title": "Calcular importe medio",
        "language": "excel-formula",
        "code": "=AVERAGE(Ventas!J2:J9)",
        "hint": "",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/count",
    "remember": "No cuenta texto.",
    "examples": [
      {
        "id": "google-sheets/agregacion/count/1",
        "title": "Contar pedidos por ID",
        "language": "excel-formula",
        "code": "=COUNT(Ventas!A2:A9)",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/counta",
    "remember": "COUNTA no comprueba calidad del contenido.",
    "examples": [
      {
        "id": "google-sheets/agregacion/counta/1",
        "title": "Contar nombres registrados",
        "language": "excel-formula",
        "code": "=COUNTA(Clientes!B2:B6)",
        "hint": "",
        "textOutput": "5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/countblank",
    "remember": "No equivale a contar ceros.",
    "examples": [
      {
        "id": "google-sheets/agregacion/countblank/1",
        "title": "Contar correos ausentes",
        "language": "excel-formula",
        "code": "=COUNTBLANK(Clientes!E2:E6)",
        "hint": "",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/countunique",
    "remember": "No cuenta filas repetidas como distintas.",
    "examples": [
      {
        "id": "google-sheets/agregacion/countunique/1",
        "title": "Contar compradores con pedidos",
        "language": "excel-formula",
        "code": "=COUNTUNIQUE(Ventas!C2:C9)",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/min-y-max",
    "remember": "No devuelven el identificador de la fila asociada.",
    "examples": [
      {
        "id": "google-sheets/agregacion/min-y-max/1",
        "title": "Encontrar extremos de importe",
        "language": "excel-formula",
        "code": "={MIN(Ventas!J2:J9),MAX(Ventas!J2:J9)}",
        "hint": "",
        "textOutput": "Una fila: 100, 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/product-y-sumsq",
    "remember": "Son operaciones diferentes.",
    "examples": [
      {
        "id": "google-sheets/agregacion/product-y-sumsq/1",
        "title": "Combinar tres cantidades",
        "language": "excel-formula",
        "code": "={PRODUCT(2,3,4),SUMSQ(2,3,4)}",
        "hint": "",
        "textOutput": "24, 29.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/sumproduct",
    "remember": "Los rangos deben tener dimensiones compatibles.",
    "examples": [
      {
        "id": "google-sheets/agregacion/sumproduct/1",
        "title": "Calcular ventas brutas sin columna auxiliar",
        "language": "excel-formula",
        "code": "=SUMPRODUCT(Ventas!E2:E9,Ventas!F2:F9)",
        "hint": "",
        "textOutput": "2400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/average-weighted",
    "remember": "No promedies precios por fila si las cantidades son distintas.",
    "examples": [
      {
        "id": "google-sheets/agregacion/average-weighted/1",
        "title": "Calcular precio medio por unidad",
        "language": "excel-formula",
        "code": "=AVERAGE.WEIGHTED({100;300},{2;1})",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "166.6667 aproximadamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregacion/subtotal",
    "remember": "9 suma; 109 suma sin filas ocultas manualmente.",
    "examples": [
      {
        "id": "google-sheets/agregacion/subtotal/1",
        "title": "Sumar solo filas visibles",
        "language": "text",
        "code": "",
        "hint": "En una copia de Ventas, filtra H por completed; escribe fuera del rango filtrado =SUBTOTAL(109,J2:J9). Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "2000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
