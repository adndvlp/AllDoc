// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/definicion",
    "remember": "Ordena primero si la posición tiene significado.",
    "examples": [
      {
        "id": "power-query/conservar-y-quitar-filas/definicion/1",
        "title": "Conservar los dos primeros pedidos por id",
        "language": "powerquery",
        "code": "Table.FirstN(Table.Sort(Pedidos, {{\"id\", Order.Ascending}}), 2)",
        "hint": "Inicio > Conservar filas > Conservar filas superiores.",
        "textOutput": "Ids 101 y 102.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/primeras-y-ultimas-filas",
    "remember": "Elige un orden antes de tomar extremos.",
    "examples": [
      {
        "id": "power-query/conservar-y-quitar-filas/primeras-y-ultimas-filas/1",
        "title": "Conservar los dos últimos por id",
        "language": "powerquery",
        "code": "Table.LastN(Table.Sort(Pedidos, {{\"id\", Order.Ascending}}), 2)",
        "hint": "El orden ascendente determina el final de la tabla.",
        "textOutput": "Ids 106 y 107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/quitar-filas-por-posicion",
    "remember": "No confundas quitar una posición con eliminar un registro del origen.",
    "examples": [
      {
        "id": "power-query/conservar-y-quitar-filas/quitar-filas-por-posicion/1",
        "title": "Omitir los dos primeros pedidos",
        "language": "powerquery",
        "code": "Table.Skip(Table.Sort(Pedidos, {{\"id\", Order.Ascending}}), 2)",
        "hint": "Se omiten ids 101 y 102.",
        "textOutput": "5 filas, ids 103 a 107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/conservar-y-quitar-filas/filas-vacias",
    "remember": "Comprueba todos los campos relevantes.",
    "examples": [
      {
        "id": "power-query/conservar-y-quitar-filas/filas-vacias/1",
        "title": "Eliminar filas totalmente vacías",
        "language": "powerquery",
        "code": "let T = #table({\"a\",\"b\"}, {{null,\"\"},{1,null},{null,null}}) in Table.SelectRows(T, each List.NonNullCount(List.RemoveMatchingItems(Record.FieldValues(_), {\"\"})) > 0)",
        "hint": "Se eliminan filas cuyos campos son todos null o texto vacío.",
        "textOutput": "Una fila (1,null).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
