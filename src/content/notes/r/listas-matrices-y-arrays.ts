// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/listas-matrices-y-arrays/definicion",
    "remember": "Lista: objetos heterogéneos; matriz: dos dimensiones.",
    "examples": [
      {
        "id": "r/listas-matrices-y-arrays/definicion/1",
        "title": "Guardar datos heterogéneos",
        "language": "r",
        "code": "list(nombre = \"Ana\", ventas = c(100, 200))",
        "hint": "Cada componente conserva su tipo.",
        "textOutput": "Lista con nombre Ana y vector de dos ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/listas-matrices-y-arrays/matrices",
    "remember": "R rellena matrices por columnas salvo `byrow = TRUE`.",
    "examples": [
      {
        "id": "r/listas-matrices-y-arrays/matrices/1",
        "title": "Construir ventas por sucursal",
        "language": "r",
        "code": "m <- matrix(1:6, nrow = 2, byrow = TRUE)\nm",
        "hint": "`byrow` cambia el orden de llenado.",
        "textOutput": "Filas `(1,2,3)` y `(4,5,6)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/listas-matrices-y-arrays/arrays",
    "remember": "Cada dimensión necesita su propio índice.",
    "examples": [
      {
        "id": "r/listas-matrices-y-arrays/arrays/1",
        "title": "Consultar una capa",
        "language": "r",
        "code": "a <- array(1:8, dim = c(2, 2, 2))\na[1, 2, 2]",
        "hint": "Se extrae fila 1, columna 2, capa 2.",
        "textOutput": "`7`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/listas-matrices-y-arrays/algebra-matricial",
    "remember": "Las dimensiones internas deben coincidir para `%*%`.",
    "examples": [
      {
        "id": "r/listas-matrices-y-arrays/algebra-matricial/1",
        "title": "Calcular un total ponderado",
        "language": "r",
        "code": "matrix(c(2, 3), nrow = 1) %*% matrix(c(10, 20), ncol = 1)",
        "hint": "Multiplica cantidades por precios y suma.",
        "textOutput": "Matriz 1×1 con `80`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
