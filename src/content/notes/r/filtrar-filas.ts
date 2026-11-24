// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/filtrar-filas/definicion",
    "remember": "El filtro opera sobre filas y no cambia las columnas.",
    "examples": [
      {
        "id": "r/filtrar-filas/definicion/1",
        "title": "Conservar pedidos completados",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\") |> pull(id)",
        "hint": "`pull()` extrae la columna como vector.",
        "textOutput": "`c(101, 102, 103, 105, 106)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/filtrar-filas/and-or-y-not",
    "remember": "Agrupa OR con paréntesis si se combina con AND.",
    "examples": [
      {
        "id": "r/filtrar-filas/and-or-y-not/1",
        "title": "Filtrar por estado e importe",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\", monto >= 200) |> pull(id)",
        "hint": "Ambas condiciones deben ser verdaderas.",
        "textOutput": "`c(102, 103)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/filtrar-filas/pertenencia-y-rangos",
    "remember": "`between(x, a, b)` incluye a y b.",
    "examples": [
      {
        "id": "r/filtrar-filas/pertenencia-y-rangos/1",
        "title": "Seleccionar pedidos de dos clientes en un rango",
        "language": "r",
        "code": "pedidos |> filter(cliente_id %in% c(1, 2), between(monto, 100, 200)) |> pull(id)",
        "hint": "Combina una lista de clientes y un intervalo.",
        "textOutput": "`c(101, 102, 106)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/filtrar-filas/filtrar-na",
    "remember": "`filter()` descarta condiciones NA, no toda fila que contenga NA.",
    "examples": [
      {
        "id": "r/filtrar-filas/filtrar-na/1",
        "title": "Encontrar pedidos con cupón",
        "language": "r",
        "code": "pedidos |> filter(!is.na(cupon)) |> pull(id)",
        "hint": "Solo se exige cupón informado.",
        "textOutput": "`c(102, 105, 106)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
