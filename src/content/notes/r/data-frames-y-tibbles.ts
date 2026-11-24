// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/data-frames-y-tibbles/definicion",
    "remember": "Cada columna puede tener su propio tipo.",
    "examples": [
      {
        "id": "r/data-frames-y-tibbles/definicion/1",
        "title": "Crear una tabla pequeña",
        "language": "r",
        "code": "data.frame(id = 1:2, monto = c(100, 200))",
        "hint": "Cada argumento nombrado crea una columna.",
        "textOutput": "Columnas id y monto; filas `(1,100)`, `(2,200)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/data-frames-y-tibbles/tibble-y-tribble",
    "remember": "Los nombres con `~` en tribble son encabezados.",
    "examples": [
      {
        "id": "r/data-frames-y-tibbles/tibble-y-tribble/1",
        "title": "Escribir una tabla por filas",
        "language": "r",
        "code": "tibble::tribble(\n  ~pais, ~ventas,\n  \"MX\", 300,\n  \"ES\", 100\n)",
        "hint": "Cada línea de datos representa una fila.",
        "textOutput": "Filas `(MX,300)` y `(ES,100)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/data-frames-y-tibbles/inspeccion-de-tablas",
    "remember": "Inspecciona tipos y dimensiones antes de transformar.",
    "examples": [
      {
        "id": "r/data-frames-y-tibbles/inspeccion-de-tablas/1",
        "title": "Ver tamaño y nombres",
        "language": "r",
        "code": "dim(pedidos)\nnames(pedidos)",
        "hint": "`dim()` devuelve filas y columnas en ese orden.",
        "textOutput": "6 filas, 6 columnas: id, cliente_id, fecha, monto, estado, cupon.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
