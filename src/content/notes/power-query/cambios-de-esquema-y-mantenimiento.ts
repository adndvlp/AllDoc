// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/definicion",
    "remember": "Distingue campos obligatorios de opcionales.",
    "examples": [
      {
        "id": "power-query/cambios-de-esquema-y-mantenimiento/definicion/1",
        "title": "Comprobar columnas requeridas",
        "language": "powerquery",
        "code": "Table.HasColumns(Pedidos,{\"id\",\"importe\",\"estado\"})",
        "hint": "La validación comprueba nombres, no tipos ni valores.",
        "textOutput": "true.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/campos-obligatorios-y-opcionales",
    "remember": "Falla explícitamente si falta una clave o medida imprescindible.",
    "examples": [
      {
        "id": "power-query/cambios-de-esquema-y-mantenimiento/campos-obligatorios-y-opcionales/1",
        "title": "Validar antes de seleccionar",
        "language": "powerquery",
        "code": "let T = #table({\"id\"},{{1}}) in if Table.HasColumns(T,{\"id\",\"importe\"}) then T else error \"Falta importe\"",
        "hint": "El importe es obligatorio en esta consulta.",
        "textOutput": "Error con mensaje Falta importe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/cambios-de-esquema-y-mantenimiento/cambios-de-tipos-y-archivos-inconsistentes",
    "remember": "No descartes un archivo entero sin saber por qué falló.",
    "examples": [
      {
        "id": "power-query/cambios-de-esquema-y-mantenimiento/cambios-de-tipos-y-archivos-inconsistentes/1",
        "title": "Marcar importes no convertibles",
        "language": "powerquery",
        "code": "let T = Table.AddColumn(Importacion,\"conversion\",each try Number.FromText([importe],\"es-ES\")), E = Table.AddColumn(T,\"invalido\",each [conversion][HasError],type logical) in Table.SelectColumns(E,{\"id\",\"invalido\"})",
        "hint": "El indicador conserva la información de fallo sin sustituir el importe original.",
        "textOutput": "(1,false),(2,true),(3,false), ids como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
