// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/ordenar-y-filtrar/definicion",
    "remember": "Ordena filas completas para conservar la integridad de los registros.",
    "examples": [
      {
        "id": "excel/ordenar-y-filtrar/definicion/1",
        "title": "Filtrar pedidos completados",
        "language": "text",
        "code": "",
        "hint": "Activa el filtro de status y marca solo completed. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "6 registros visibles; los otros dos siguen en la tabla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/ordenar-y-filtrar/orden-ascendente-y-descendente",
    "remember": "Incluye todas las columnas de la tabla al ordenar.",
    "examples": [
      {
        "id": "excel/ordenar-y-filtrar/orden-ascendente-y-descendente/1",
        "title": "Ordenar importes",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales, ordena amount de mayor a menor. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Primer pedido 103 con 600; los últimos importes son 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/ordenar-y-filtrar/orden-por-varias-columnas",
    "remember": "El primer criterio tiene prioridad.",
    "examples": [
      {
        "id": "excel/ordenar-y-filtrar/orden-por-varias-columnas/1",
        "title": "Ordenar por fecha e id",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales, Datos > Ordenar: order_date ascendente; agrega nivel order_id ascendente. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "En el empate del 5 de febrero aparece 105 antes de 106.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/ordenar-y-filtrar/filtros-por-valor-y-condicion",
    "remember": "Filtros de columnas distintas se combinan.",
    "examples": [
      {
        "id": "excel/ordenar-y-filtrar/filtros-por-valor-y-condicion/1",
        "title": "Filtrar importes",
        "language": "text",
        "code": "",
        "hint": "En tSales filtra status=completed e importe mayor o igual a 200. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "101, 102, 104 y 106 visibles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/ordenar-y-filtrar/top-n-y-filtro-avanzado",
    "remember": "El filtro por Top N puede incluir empates; no es un límite estricto de filas.",
    "note": "La interfaz de filtro avanzado puede variar según plataforma; UNIQUE es una alternativa moderna para generar una lista.",
    "examples": [
      {
        "id": "excel/ordenar-y-filtrar/top-n-y-filtro-avanzado/1",
        "title": "Seleccionar importes mayores",
        "language": "text",
        "code": "",
        "hint": "En tSales, Filtros de número > Diez mejores; selecciona 2 elementos superiores. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Pedidos 103, 102, 104 y 107 visibles (empate en 300).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      },
      {
        "id": "excel/ordenar-y-filtrar/top-n-y-filtro-avanzado/2",
        "title": "Seleccionar registros únicos",
        "language": "text",
        "code": "",
        "hint": "En Scratch escribe country en A1 y Mexico, Mexico, Spain, Mexico en A2:A5; Datos > Avanzadas; copia a otro lugar y activa Solo registros únicos. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Mexico y Spain.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
