// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/definicion",
    "remember": "Define qué representa una fila antes de unir o agregar.",
    "examples": [
      {
        "id": "power-query/modelo-de-datos-y-granularidad/definicion/1",
        "title": "Identificar las entidades del dataset",
        "language": "powerquery",
        "code": "[pedidos=Table.RowCount(Pedidos), clientes=Table.RowCount(Clientes)]",
        "hint": "Pedidos contiene eventos de compra; Clientes contiene entidades descriptivas.",
        "textOutput": "7 pedidos y 4 clientes, con distinta granularidad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/claves-y-dimensiones",
    "remember": "No confundas un índice de posición con una clave estable a través de actualizaciones.",
    "examples": [
      {
        "id": "power-query/modelo-de-datos-y-granularidad/claves-y-dimensiones/1",
        "title": "Validar clave de dimensión",
        "language": "powerquery",
        "code": "Table.RowCount(Clientes) = List.Count(List.Distinct(List.RemoveNulls(Clientes[cliente])))",
        "hint": "Coincidir implica que no faltan ni se repiten claves en esta tabla.",
        "textOutput": "true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/modelo-de-datos-y-granularidad/relaciones-del-modelo-frente-a-merge",
    "remember": "No aplanes todas las dimensiones sin necesidad; preserva la granularidad de hechos.",
    "examples": [
      {
        "id": "power-query/modelo-de-datos-y-granularidad/relaciones-del-modelo-frente-a-merge/1",
        "title": "Crear una relación de clientes a pedidos",
        "code": "",
        "steps": [
          "Carga Pedidos y Clientes sin expandirlos",
          "En la vista Modelo de Power BI Desktop relaciona Clientes[cliente] con Pedidos[cliente]",
          "Comprueba cardinalidad 1 a muchos y dirección de filtro adecuada"
        ],
        "external": true,
        "hint": "El modelo conserva dos tablas y una relación, no una nueva tabla combinada.",
        "textOutput": "Clientes mantiene 4 filas y Pedidos 7; una relación 1:* conecta ambas claves.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
