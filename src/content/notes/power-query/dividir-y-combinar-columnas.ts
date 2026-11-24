// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/definicion",
    "remember": "No confundas combinar columnas con Merge Queries, que une tablas.",
    "examples": [
      {
        "id": "power-query/dividir-y-combinar-columnas/definicion/1",
        "title": "Separar código y canal",
        "language": "powerquery",
        "code": "Table.SplitColumn(#table({\"codigo\"}, {{\"101-Web\"},{\"102-Tienda\"}}), \"codigo\", Splitter.SplitTextByDelimiter(\"-\"), {\"id\",\"canal\"})",
        "hint": "Transformar > Dividir columna > Por delimitador.",
        "textOutput": "Dos filas: (\"101\",\"Web\"), (\"102\",\"Tienda\").",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/dividir-por-posiciones",
    "remember": "Úsalo cuando todos los códigos comparten estructura.",
    "examples": [
      {
        "id": "power-query/dividir-y-combinar-columnas/dividir-por-posiciones/1",
        "title": "Separar prefijo y número",
        "language": "powerquery",
        "code": "Table.SplitColumn(#table({\"codigo\"}, {{\"PED101\"},{\"PED102\"}}), \"codigo\", Splitter.SplitTextByPositions({0,3}), {\"prefijo\",\"numero\"})",
        "hint": "El corte ocurre antes del carácter de índice 3.",
        "textOutput": "(PED,101), (PED,102), ambos campos como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/combinar-columnas",
    "remember": "Si quieres conservar las columnas originales, agrega una personalizada en vez de combinar.",
    "examples": [
      {
        "id": "power-query/dividir-y-combinar-columnas/combinar-columnas/1",
        "title": "Unir nombre y país",
        "language": "powerquery",
        "code": "Table.CombineColumns(Table.SelectRows(Clientes, each [pais] <> null), {\"nombre\",\"pais\"}, Combiner.CombineTextByDelimiter(\" - \", QuoteStyle.None), \"etiqueta\")",
        "hint": "Las dos columnas originales se sustituyen por etiqueta.",
        "textOutput": "3 filas; Ana - México, Luis - México, Marta - España; cliente y alta se conservan.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/dividir-y-combinar-columnas/dividir-en-filas",
    "remember": "Una fila puede convertirse en varias; revisa conteos y totales.",
    "examples": [
      {
        "id": "power-query/dividir-y-combinar-columnas/dividir-en-filas/1",
        "title": "Separar canales de una campaña",
        "language": "powerquery",
        "code": "let T = #table({\"campana\",\"canales\"}, {{\"A\",\"Web,Tienda\"}}), L = Table.TransformColumns(T, {{\"canales\", each Text.Split(_, \",\"), type list}}) in Table.ExpandListColumn(L, \"canales\")",
        "hint": "La división crea una lista y la expansión crea una fila por elemento.",
        "textOutput": "(A,Web) y (A,Tienda).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
