// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/definicion",
    "remember": "Ordena explícitamente antes de depender de la posición.",
    "examples": [
      {
        "id": "power-query/ordenamiento-e-indices-de-fila/definicion/1",
        "title": "Ordenar por importe descendente",
        "language": "powerquery",
        "code": "Table.Sort(Pedidos, {{\"importe\", Order.Descending}, {\"id\", Order.Ascending}})",
        "hint": "La segunda columna desempata.",
        "textOutput": "Ids 107,102,104,105,101,103,106 en ese orden.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/varios-criterios",
    "remember": "El primer criterio manda; los siguientes desempatan.",
    "examples": [
      {
        "id": "power-query/ordenamiento-e-indices-de-fila/varios-criterios/1",
        "title": "Ordenar por fecha y luego id",
        "language": "powerquery",
        "code": "Table.Sort(Pedidos, {{\"fecha\", Order.Ascending}, {\"id\", Order.Descending}})",
        "hint": "Los pedidos del mismo día quedan por id descendente.",
        "textOutput": "Ids 101,103,102,105,104,106,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/columna-de-indice",
    "remember": "Un índice representa el orden de este resultado, no una clave estable del negocio.",
    "examples": [
      {
        "id": "power-query/ordenamiento-e-indices-de-fila/columna-de-indice/1",
        "title": "Numerar pedidos desde 1",
        "language": "powerquery",
        "code": "Table.AddIndexColumn(Table.Sort(Pedidos, {{\"id\", Order.Ascending}}), \"indice\", 1, 1, Int64.Type)",
        "hint": "Agregar columna > Columna de índice > Desde 1.",
        "textOutput": "id 101 tiene índice 1; id 107 tiene 7.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/ordenamiento-e-indices-de-fila/invertir-filas",
    "remember": "Invertir no equivale a ordenar si no había un orden definido.",
    "examples": [
      {
        "id": "power-query/ordenamiento-e-indices-de-fila/invertir-filas/1",
        "title": "Invertir los pedidos por id",
        "language": "powerquery",
        "code": "Table.ReverseRows(Table.Sort(Pedidos, {{\"id\", Order.Ascending}}))",
        "hint": "Se invierte una secuencia explícita.",
        "textOutput": "Ids 107 a 101.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
