// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/indexacion/definicion",
    "remember": "El primer elemento es `[1]`, no `[0]`.",
    "examples": [
      {
        "id": "r/indexacion/definicion/1",
        "title": "Extraer un importe",
        "language": "r",
        "code": "x <- c(100, 200, 300)\nx[2]",
        "hint": "El índice señala la segunda posición.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/indexacion/indices-positivos-y-negativos",
    "remember": "No mezcles positivos y negativos salvo cero.",
    "examples": [
      {
        "id": "r/indexacion/indices-positivos-y-negativos/1",
        "title": "Eliminar el segundo elemento de la vista",
        "language": "r",
        "code": "c(100, 200, 300)[-2]",
        "hint": "La selección no modifica el vector original.",
        "textOutput": "`c(100, 300)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/indexacion/indices-logicos",
    "remember": "Filtra NA explícitamente cuando sea necesario.",
    "examples": [
      {
        "id": "r/indexacion/indices-logicos/1",
        "title": "Seleccionar importes grandes",
        "language": "r",
        "code": "x <- c(100, 200, 300)\nx[x >= 200]",
        "hint": "La comparación construye la máscara.",
        "textOutput": "`c(200, 300)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/indexacion/corchetes-dobles-y-dolar",
    "remember": "En una lista, `[1]` es lista y `[[1]]` es su contenido.",
    "examples": [
      {
        "id": "r/indexacion/corchetes-dobles-y-dolar/1",
        "title": "Extraer una columna como vector",
        "language": "r",
        "code": "pedidos[[\"monto\"]]",
        "hint": "`[[` extrae el contenido de la columna.",
        "textOutput": "`c(100, 200, 300, 150, 50, 100)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/indexacion/filas-y-columnas",
    "remember": "La coma separa filas de columnas.",
    "examples": [
      {
        "id": "r/indexacion/filas-y-columnas/1",
        "title": "Seleccionar dos filas y una columna",
        "language": "r",
        "code": "pedidos[1:2, \"monto\"]",
        "hint": "Un tibble conserva su estructura tabular.",
        "textOutput": "Tibble de 2×1 con montos 100 y 200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
