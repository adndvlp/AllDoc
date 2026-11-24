// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/seleccion-de-columnas/definicion",
    "remember": "Seleccionar columnas no elimina registros.",
    "examples": [
      {
        "id": "r/seleccion-de-columnas/definicion/1",
        "title": "Mostrar identificador e importe",
        "language": "r",
        "code": "pedidos |> select(id, monto)",
        "hint": "El orden de columnas sigue la selección.",
        "textOutput": "6 filas; columnas id y monto: `(101,100)` a `(106,100)` con montos 100, 200, 300, 150, 50, 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/seleccion-de-columnas/excluir-y-seleccionar-por-patron",
    "remember": "`where(is.numeric)` selecciona columnas numéricas, no filas.",
    "examples": [
      {
        "id": "r/seleccion-de-columnas/excluir-y-seleccionar-por-patron/1",
        "title": "Mostrar columnas numéricas",
        "language": "r",
        "code": "pedidos |> select(where(is.numeric)) |> names()",
        "hint": "Date no es una columna numérica según is.numeric.",
        "textOutput": "`c(\"id\", \"cliente_id\", \"monto\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/seleccion-de-columnas/rename-y-relocate",
    "remember": "En rename usa `nuevo = anterior`.",
    "examples": [
      {
        "id": "r/seleccion-de-columnas/rename-y-relocate/1",
        "title": "Renombrar el importe",
        "language": "r",
        "code": "pedidos |> rename(importe = monto) |> names()",
        "hint": "No cambia valores.",
        "textOutput": "id, cliente_id, fecha, importe, estado, cupon.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/seleccion-de-columnas/all-of-y-any-of",
    "remember": "Usa all_of para detectar cambios de esquema.",
    "examples": [
      {
        "id": "r/seleccion-de-columnas/all-of-y-any-of/1",
        "title": "Seleccionar nombres almacenados",
        "language": "r",
        "code": "cols <- c(\"id\", \"monto\")\npedidos |> select(all_of(cols))",
        "hint": "El vector cols define la selección.",
        "textOutput": "6 filas, dos columnas id y monto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
