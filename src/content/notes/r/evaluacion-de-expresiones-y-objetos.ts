// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/definicion",
    "remember": "Distingue un nombre de columna de una variable del entorno.",
    "examples": [
      {
        "id": "r/evaluacion-de-expresiones-y-objetos/definicion/1",
        "title": "Referirse explícitamente a una columna",
        "language": "r",
        "code": "limite <- 200\npedidos |> filter(.data$monto >= .env$limite) |> pull(id)",
        "hint": ".data busca en la tabla y .env en el entorno.",
        "textOutput": "`c(102, 103)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/tidy-evaluation",
    "remember": "Usa `{{ columna }}` para reenviar argumentos de data masking.",
    "examples": [
      {
        "id": "r/evaluacion-de-expresiones-y-objetos/tidy-evaluation/1",
        "title": "Crear una función de resumen",
        "language": "r",
        "code": "resumir <- function(tabla, columna) tabla |> summarise(total = sum({{ columna }}))\nresumir(pedidos, monto)",
        "hint": "La columna se proporciona sin comillas.",
        "textOutput": "Una fila total=900.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/s3",
    "remember": "Una misma función genérica puede comportarse distinto según la clase.",
    "examples": [
      {
        "id": "r/evaluacion-de-expresiones-y-objetos/s3/1",
        "title": "Definir un método para un importe",
        "language": "r",
        "code": "print.importe <- function(x, ...) cat(\"Importe:\", unclass(x), \"\\n\")\nprint(structure(100, class = \"importe\"))",
        "hint": "print despacha a print.importe.",
        "textOutput": "Salida `Importe: 100`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/evaluacion-de-expresiones-y-objetos/s4-y-r6",
    "remember": "R6 permite modificar el mismo objeto a través de referencias.",
    "note": "Requiere R6; S4 usa methods::setClass y methods::setMethod.",
    "examples": [
      {
        "id": "r/evaluacion-de-expresiones-y-objetos/s4-y-r6/1",
        "title": "Crear una clase de contador",
        "language": "r",
        "code": "Contador <- R6::R6Class(\"Contador\", public = list(n = 0, sumar = function() self$n <- self$n + 1))\nx <- Contador$new()\nx$sumar()\nx$n",
        "hint": "El método cambia el estado de la instancia.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
