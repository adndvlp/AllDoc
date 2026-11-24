// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/definicion",
    "remember": "Los criterios siguientes desempatan a los anteriores.",
    "examples": [
      {
        "id": "r/ordenamiento-y-primeras-filas/definicion/1",
        "title": "Ordenar importes descendentes",
        "language": "r",
        "code": "pedidos |> arrange(desc(monto), id) |> pull(id)",
        "hint": "Los dos importes 100 se ordenan por id.",
        "textOutput": "`c(103, 102, 104, 101, 106, 105)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/slice-y-head",
    "remember": "Ordena antes de tomar las primeras filas si importa el criterio.",
    "examples": [
      {
        "id": "r/ordenamiento-y-primeras-filas/slice-y-head/1",
        "title": "Tomar dos pedidos más caros",
        "language": "r",
        "code": "pedidos |> arrange(desc(monto), id) |> slice_head(n = 2) |> pull(id)",
        "hint": "Se limita después de ordenar.",
        "textOutput": "`c(103, 102)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/ordenamiento-y-primeras-filas/slice-max-y-slice-min",
    "remember": "Con empates, la cantidad puede superar n.",
    "examples": [
      {
        "id": "r/ordenamiento-y-primeras-filas/slice-max-y-slice-min/1",
        "title": "Obtener los pedidos de menor importe",
        "language": "r",
        "code": "pedidos |> slice_min(monto, n = 1) |> pull(id)",
        "hint": "El mínimo es 50.",
        "textOutput": "`105`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
