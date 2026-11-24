// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/pipes-y-dplyr/definicion",
    "remember": "Lee las operaciones de izquierda a derecha.",
    "examples": [
      {
        "id": "r/pipes-y-dplyr/definicion/1",
        "title": "Calcular un total en dos pasos",
        "language": "r",
        "code": "c(10, 20, 30) |> sum()",
        "hint": "El vector pasa a sum.",
        "textOutput": "`60`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pipes-y-dplyr/pipe-base-y-magrittr",
    "remember": "No todos los usos de `.` se traducen directamente a `|>`.",
    "note": "Pipe base desde R 4.1.",
    "examples": [
      {
        "id": "r/pipes-y-dplyr/pipe-base-y-magrittr/1",
        "title": "Encadenar dos operaciones",
        "language": "r",
        "code": "c(10, 20) |> mean() |> round(1)",
        "hint": "La salida de mean entra en round.",
        "textOutput": "`15`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/pipes-y-dplyr/guardar-transformaciones",
    "remember": "Sin `<-` no reemplazas la tabla original.",
    "examples": [
      {
        "id": "r/pipes-y-dplyr/guardar-transformaciones/1",
        "title": "Guardar pedidos completados",
        "language": "r",
        "code": "validos <- pedidos |> filter(estado == \"completado\")\nnrow(validos)\nnrow(pedidos)",
        "hint": "La tabla original conserva sus seis filas.",
        "textOutput": "5 y 6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
