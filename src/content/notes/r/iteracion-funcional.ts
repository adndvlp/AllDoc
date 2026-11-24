// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/iteracion-funcional/definicion",
    "remember": "Elige según estructura de entrada y tipo de salida.",
    "examples": [
      {
        "id": "r/iteracion-funcional/definicion/1",
        "title": "Aplicar una función a un vector",
        "language": "r",
        "code": "lapply(c(10, 20), function(x) x * 2)",
        "hint": "`lapply()` siempre devuelve lista.",
        "textOutput": "Lista con 20 y 40.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/iteracion-funcional/apply",
    "remember": "1 son filas; 2 son columnas.",
    "note": "Un data frame mixto puede convertirse a matriz de texto: usa otras funciones para tablas heterogéneas.",
    "examples": [
      {
        "id": "r/iteracion-funcional/apply/1",
        "title": "Sumar columnas",
        "language": "r",
        "code": "apply(matrix(1:4, nrow = 2), 2, sum)",
        "hint": "Cada columna se suma por separado.",
        "textOutput": "`c(3, 7)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/iteracion-funcional/lapply-sapply-y-vapply",
    "remember": "Usa vapply si necesitas una salida predecible.",
    "examples": [
      {
        "id": "r/iteracion-funcional/lapply-sapply-y-vapply/1",
        "title": "Contar caracteres",
        "language": "r",
        "code": "vapply(c(\"MX\", \"USA\"), nchar, integer(1))",
        "hint": "`integer(1)` exige un entero por elemento.",
        "textOutput": "Vector entero nombrado MX=2, USA=3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/iteracion-funcional/purrr-map",
    "remember": "El sufijo expresa el tipo de salida.",
    "note": "Requiere purrr.",
    "examples": [
      {
        "id": "r/iteracion-funcional/purrr-map/1",
        "title": "Sumar varias listas de ventas",
        "language": "r",
        "code": "purrr::map_dbl(list(c(10, 20), c(5, 7)), sum)",
        "hint": "Cada lista se reduce a un número.",
        "textOutput": "`c(30, 12)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/iteracion-funcional/reduce-filter-y-map",
    "remember": "Reduce combina; Filter selecciona; Map transforma.",
    "examples": [
      {
        "id": "r/iteracion-funcional/reduce-filter-y-map/1",
        "title": "Combinar ventas y filtrar negativos",
        "language": "r",
        "code": "Reduce(`+`, c(10, 20, 30))\nFilter(function(x) x > 0, c(10, -2, 5))",
        "hint": "Cada función cumple un propósito distinto.",
        "textOutput": "`60` y `c(10, 5)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
