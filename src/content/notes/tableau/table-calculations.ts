// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/table-calculations/definicion",
    "remember": "El resultado depende del orden y nivel de detalle de la vista.",
    "examples": [
      {
        "id": "tableau/table-calculations/definicion/1",
        "title": "Acumular ventas mensuales",
        "code": "",
        "steps": [
          "Mes venta en Rows ascendente, SUM(Ventas) en Text",
          "Quick Table Calculation > Running Total",
          "Compute Using Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "600, 850, 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/compute-using",
    "remember": "Las dimensiones no marcadas en Specific Dimensions separan particiones.",
    "examples": [
      {
        "id": "tableau/table-calculations/compute-using/1",
        "title": "Reiniciar acumulado por región",
        "code": "",
        "steps": [
          "Region y Mes venta en Rows",
          "RUNNING_SUM(SUM([Ventas])) en Text",
          "Edit Table Calculation > Specific Dimensions: marca Mes venta y deja Region sin marcar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte: 300, 500, 700; Sur: 300, 350, 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/running-sum",
    "remember": "Ordena cronológicamente antes de acumular.",
    "examples": [
      {
        "id": "tableau/table-calculations/running-sum/1",
        "title": "Acumulado mensual",
        "code": "",
        "steps": [
          "Vista por Mes venta ascendente",
          "fórmula RUNNING_SUM(SUM([Ventas]))",
          "Compute Using Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "600, 850, 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/lookup",
    "remember": "La primera marca no tiene anterior.",
    "examples": [
      {
        "id": "tableau/table-calculations/lookup/1",
        "title": "Comparar mes anterior",
        "code": "",
        "steps": [
          "Vista por Mes venta ascendente",
          "LOOKUP(SUM([Ventas]),-1)",
          "Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "NULL, 600, 250.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/diferencia-y-porcentaje-de-cambio",
    "remember": "Una base cero o ausente no tiene crecimiento porcentual definido.",
    "examples": [
      {
        "id": "tableau/table-calculations/diferencia-y-porcentaje-de-cambio/1",
        "title": "Calcular variación mensual",
        "code": "",
        "steps": [
          "Vista por Mes venta ascendente",
          "fórmula SUM([Ventas])-LOOKUP(SUM([Ventas]),-1)",
          "Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "NULL, -350, +650.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/percent-of-total",
    "remember": "Filtrar marcas antes del cálculo puede cambiar el denominador.",
    "examples": [
      {
        "id": "tableau/table-calculations/percent-of-total/1",
        "title": "Participación regional",
        "code": "",
        "steps": [
          "Region en Rows",
          "SUM([Ventas])/TOTAL(SUM([Ventas]))",
          "Table (Down)",
          "formato Percentage."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Norte 40%, Sur 60%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/rank-y-rank-dense",
    "remember": "No uses INDEX como equivalente de rank por valor.",
    "examples": [
      {
        "id": "tableau/table-calculations/rank-y-rank-dense/1",
        "title": "Rankear productos",
        "code": "",
        "steps": [
          "Producto en Rows",
          "RANK(SUM([Ventas]),'desc')",
          "Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Silla 1, Teclado 2, Lampara 3, Mouse 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/index-first-last-y-size",
    "remember": "INDEX depende del orden de la vista.",
    "examples": [
      {
        "id": "tableau/table-calculations/index-first-last-y-size/1",
        "title": "Numerar meses",
        "code": "",
        "steps": [
          "Mes venta en Rows ascendente",
          "INDEX() en Text",
          "Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1, 2, 3; SIZE() devuelve 3 en cada marca.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/window-sum-y-window-avg",
    "remember": "Los límites -1 y 0 incluyen anterior y actual.",
    "examples": [
      {
        "id": "tableau/table-calculations/window-sum-y-window-avg/1",
        "title": "Promedio móvil de dos meses",
        "code": "",
        "steps": [
          "Vista mensual ascendente",
          "WINDOW_AVG(SUM([Ventas]),-1,0)",
          "Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "600, 425, 575; el primer mes usa solo la marca disponible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/table-calculations/filtros-de-table-calculations",
    "remember": "Puede conservar datos ocultos en el cálculo.",
    "examples": [
      {
        "id": "tableau/table-calculations/filtros-de-table-calculations/1",
        "title": "Mostrar último acumulado",
        "code": "",
        "steps": [
          "Vista mensual con RUNNING_SUM",
          "crea LAST() y filtra a 0, ambos Table (Down)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Solo marzo, con acumulado 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
