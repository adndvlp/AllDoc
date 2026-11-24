// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/append-queries/definicion",
    "remember": "Append suma filas; Merge añade coincidencias entre tablas.",
    "examples": [
      {
        "id": "power-query/append-queries/definicion/1",
        "title": "Anexar pedidos de dos periodos",
        "language": "powerquery",
        "code": "let E = Table.SelectRows(Pedidos, each Date.Month([fecha]) = 1), F = Table.SelectRows(Pedidos, each Date.Month([fecha]) = 2) in Table.Combine({E,F})",
        "hint": "Inicio > Anexar consultas.",
        "textOutput": "7 filas con las 6 columnas originales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/append-queries/esquemas-distintos",
    "remember": "Los nombres deben coincidir exactamente para alinear campos.",
    "examples": [
      {
        "id": "power-query/append-queries/esquemas-distintos/1",
        "title": "Anexar datos con un campo opcional",
        "language": "powerquery",
        "code": "Table.Combine({#table({\"id\",\"importe\"},{{1,100}}),#table({\"id\",\"canal\"},{{2,\"Web\"}})})",
        "hint": "La unión contiene los nombres de ambas tablas.",
        "textOutput": "id, importe, canal: (1,100,null),(2,null,Web).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/append-queries/anexar-varias-tablas",
    "remember": "No elimina duplicados automáticamente.",
    "examples": [
      {
        "id": "power-query/append-queries/anexar-varias-tablas/1",
        "title": "Anexar tres lotes de registros",
        "language": "powerquery",
        "code": "Table.Combine({#table({\"id\"},{{1}}),#table({\"id\"},{{2}}),#table({\"id\"},{{2}})})",
        "hint": "Se mantienen los registros repetidos.",
        "textOutput": "3 filas con ids 1,2,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
