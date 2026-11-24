// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/definicion",
    "remember": "Antes de expandir identifica el tipo de cada valor.",
    "examples": [
      {
        "id": "power-query/listas-registros-y-datos-anidados/definicion/1",
        "title": "Expandir registros de un JSON",
        "language": "powerquery",
        "code": "Table.FromRecords(Json.Document(\"[{\"\"id\"\":1,\"\"importe\"\":100},{\"\"id\"\":2,\"\"importe\"\":200}]\"))",
        "hint": "El JSON contiene una lista de registros con los mismos campos.",
        "textOutput": "2 filas con id e importe: (1,100),(2,200).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-record",
    "remember": "Especifica nombres de salida para evitar conflictos.",
    "examples": [
      {
        "id": "power-query/listas-registros-y-datos-anidados/expandir-record/1",
        "title": "Extraer ciudad y país de un registro",
        "language": "powerquery",
        "code": "let T = #table({\"id\",\"ubicacion\"}, {{1,[ciudad=\"CDMX\",pais=\"México\"]}}) in Table.ExpandRecordColumn(T,\"ubicacion\",{\"ciudad\",\"pais\"})",
        "hint": "La columna de registro se sustituye por dos campos.",
        "textOutput": "Una fila (1,CDMX,México).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-list",
    "remember": "Los campos de la fila original se repiten por cada elemento.",
    "examples": [
      {
        "id": "power-query/listas-registros-y-datos-anidados/expandir-list/1",
        "title": "Expandir etiquetas",
        "language": "powerquery",
        "code": "Table.ExpandListColumn(#table({\"id\",\"etiquetas\"},{{1,{\"A\",\"B\"}},{2,{\"C\"}}}),\"etiquetas\")",
        "hint": "Una lista de dos elementos crea dos registros.",
        "textOutput": "(1,A),(1,B),(2,C).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/expandir-table",
    "remember": "Selecciona solo las columnas necesarias y comprueba el número de filas.",
    "examples": [
      {
        "id": "power-query/listas-registros-y-datos-anidados/expandir-table/1",
        "title": "Recuperar pedidos agrupados",
        "language": "powerquery",
        "code": "let G = Table.Group(Pedidos,{\"cliente\"},{{\"detalle\",each _,type table}}) in Table.ExpandTableColumn(G,\"detalle\",{\"id\",\"importe\"})",
        "hint": "Se recuperan las filas de cada grupo sin duplicar la clave cliente.",
        "textOutput": "7 filas con cliente,id,importe; cliente 1 tiene ids 101,102,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/listas-registros-y-datos-anidados/transformar-listas",
    "remember": "Una transformación cambia valores; un filtro cambia qué elementos quedan.",
    "examples": [
      {
        "id": "power-query/listas-registros-y-datos-anidados/transformar-listas/1",
        "title": "Aumentar importes filtrados en 10 %",
        "language": "powerquery",
        "code": "List.Transform(List.Select({50,100,200}, each _ >= 100), each _ * 1.1)",
        "hint": "Primero filtra y después transforma.",
        "textOutput": "{110,220}, con posible representación decimal aproximada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
