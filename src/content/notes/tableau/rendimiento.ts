// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/rendimiento/definicion",
    "remember": "Mide antes y después con el mismo escenario.",
    "examples": [
      {
        "id": "tableau/rendimiento/definicion/1",
        "title": "Reducir marcas",
        "code": "",
        "external": true,
        "hint": "Compara vista de líneas de pedido con vista agregada por Region.",
        "textOutput": "La segunda representa 2 marcas en lugar de 8; no implica una mejora medible con tan pocos datos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/rendimiento/performance-recorder",
    "remember": "Identifica el cuello de botella antes de cambiar el modelo.",
    "note": "Los eventos disponibles dependen de conexión y versión.",
    "examples": [
      {
        "id": "tableau/rendimiento/performance-recorder/1",
        "title": "Registrar dashboard",
        "code": "",
        "steps": [
          "En Desktop Help > Settings and Performance > Start Performance Recording",
          "interactúa con dashboard",
          "Stop Performance Recording."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se abre un workbook con eventos y duraciones registrados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/rendimiento/optimizar-modelo-y-filtros",
    "remember": "No declares cardinalidad falsa para acelerar.",
    "examples": [
      {
        "id": "tableau/rendimiento/optimizar-modelo-y-filtros/1",
        "title": "Comparar alternativas",
        "code": "",
        "steps": [
          "Duplica workbook, oculta campos no necesarios, reduce marcas o usa extract",
          "mide ambos con Performance Recorder."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Obtienes tiempos comparables; conserva la alternativa que mantenga resultados y mejore tiempos medidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
