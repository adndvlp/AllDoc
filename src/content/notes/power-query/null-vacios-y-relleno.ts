// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/null-vacios-y-relleno/definicion",
    "remember": "null, texto vacío y cero son valores diferentes.",
    "examples": [
      {
        "id": "power-query/null-vacios-y-relleno/definicion/1",
        "title": "Encontrar clientes sin país",
        "language": "powerquery",
        "code": "Table.SelectRows(Clientes, each [pais] = null)",
        "hint": "Se compara con el literal null, sin comillas.",
        "textOutput": "Una fila: Diego, cliente 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/null-vacios-y-relleno/texto-vacio-y-espacios",
    "remember": "Normaliza espacios antes de decidir qué falta.",
    "examples": [
      {
        "id": "power-query/null-vacios-y-relleno/texto-vacio-y-espacios/1",
        "title": "Contar leads sin correo útil",
        "language": "powerquery",
        "code": "Table.RowCount(Table.SelectRows(Leads, each [correo] = null or Text.Trim([correo]) = \"\"))",
        "hint": "Se detecta ausencia o texto vacío después de limpiar.",
        "textOutput": "2, ids 5 y 6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/null-vacios-y-relleno/reemplazar-null",
    "remember": "Reemplaza solo cuando la alternativa tenga significado de negocio.",
    "examples": [
      {
        "id": "power-query/null-vacios-y-relleno/reemplazar-null/1",
        "title": "Mostrar país desconocido",
        "language": "powerquery",
        "code": "Table.ReplaceValue(Clientes, null, \"Desconocido\", Replacer.ReplaceValue, {\"pais\"})",
        "hint": "El cambio se limita a la columna pais.",
        "textOutput": "Diego tiene pais=Desconocido; los otros tres no cambian.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/null-vacios-y-relleno/operador-de-coalescencia",
    "remember": "No reemplaza errores ni cadenas vacías.",
    "examples": [
      {
        "id": "power-query/null-vacios-y-relleno/operador-de-coalescencia/1",
        "title": "Crear canal de reporte",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"canal_reporte\", each [canal] ?? \"Sin canal\", type text)",
        "hint": "La columna original se conserva.",
        "textOutput": "id 105 tiene Sin canal; los otros seis conservan su canal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/null-vacios-y-relleno/fill-down-y-fill-up",
    "remember": "Dependen del orden actual y rellenan null, no cualquier vacío.",
    "examples": [
      {
        "id": "power-query/null-vacios-y-relleno/fill-down-y-fill-up/1",
        "title": "Completar etiquetas de región",
        "language": "powerquery",
        "code": "Table.FillDown(#table({\"region\",\"importe\"}, {{\"Norte\",100},{null,200},{\"Sur\",50},{null,80}}), {\"region\"})",
        "hint": "Se propaga la región hacia las filas inferiores.",
        "textOutput": "Norte,Norte,Sur,Sur con importes 100,200,50,80.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
