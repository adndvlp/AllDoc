// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/duplicados-y-unicidad/definicion",
    "remember": "Define primero qué columnas hacen único un registro.",
    "examples": [
      {
        "id": "power-query/duplicados-y-unicidad/definicion/1",
        "title": "Obtener clientes que aparecen en pedidos",
        "language": "powerquery",
        "code": "Table.Distinct(Table.SelectColumns(Pedidos, {\"cliente\"}))",
        "hint": "Primero limita la tabla a la clave que te interesa.",
        "textOutput": "3 filas: clientes 1,2,3, sin orden garantizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/duplicados-y-unicidad/quitar-duplicados",
    "remember": "No garantiza por sí sola cuál de las filas equivalentes conservará.",
    "examples": [
      {
        "id": "power-query/duplicados-y-unicidad/quitar-duplicados/1",
        "title": "Obtener combinaciones cliente y estado",
        "language": "powerquery",
        "code": "Table.Distinct(Table.SelectColumns(Pedidos, {\"cliente\",\"estado\"}))",
        "hint": "Se deduplica la combinación completa.",
        "textOutput": "5 filas: (1,completado), (2,cancelado), (2,completado), (3,completado), (3,pendiente).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/duplicados-y-unicidad/detectar-duplicados",
    "remember": "Normaliza claves y excluye ausencias si no son identidades válidas.",
    "examples": [
      {
        "id": "power-query/duplicados-y-unicidad/detectar-duplicados/1",
        "title": "Encontrar correos repetidos",
        "language": "powerquery",
        "code": "let T = Table.TransformColumns(Leads, {{\"correo\", each Text.Lower(Text.Trim(_)), type nullable text}}), V = Table.SelectRows(T, each [correo] <> null and [correo] <> \"\"), G = Table.Group(V, {\"correo\"}, {{\"veces\", each Table.RowCount(_), Int64.Type}}) in Table.SelectRows(G, each [veces] > 1)",
        "hint": "Se cuenta cada correo limpio antes de filtrar.",
        "textOutput": "ana@ejemplo.com=2; luis@ejemplo.com=2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/duplicados-y-unicidad/conservar-el-registro-mas-reciente",
    "remember": "No supongas que ordenar y quitar duplicados siempre conserva la primera fila.",
    "examples": [
      {
        "id": "power-query/duplicados-y-unicidad/conservar-el-registro-mas-reciente/1",
        "title": "Elegir el lead más reciente de cada correo",
        "language": "powerquery",
        "code": "let T = Table.TransformColumns(Leads, {{\"correo\", each Text.Lower(Text.Trim(_)), type nullable text}}), V = Table.SelectRows(T, each [correo] <> null and [correo] <> \"\"), G = Table.Group(V, {\"correo\"}, {{\"ultimo\", each Table.Max(_, \"fecha\"), type record}}) in Table.ExpandRecordColumn(G, \"ultimo\", {\"id\",\"origen\",\"fecha\"})",
        "hint": "Cada grupo selecciona su registro de fecha máxima; aquí no hay empates por correo.",
        "textOutput": "2 filas, ids 2 y 4; ambos origen Web.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
