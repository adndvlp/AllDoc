// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/definicion",
    "remember": "Ordena antes de usar funciones que dependen de la fila anterior.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/definicion/1",
        "title": "Añadir el total a cada pedido",
        "language": "r",
        "code": "pedidos |> mutate(total = sum(monto)) |> pull(total)",
        "hint": "La suma se añade a cada fila sin reducirlas.",
        "textOutput": "Seis valores iguales a 900.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/row-number-min-rank-y-dense-rank",
    "remember": "Usa `desc()` para que el mayor valor tenga rango 1.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/row-number-min-rank-y-dense-rank/1",
        "title": "Comparar rankings con empate",
        "language": "r",
        "code": "x <- c(200, 100, 100, 50)\ntibble::tibble(x, fila = row_number(desc(x)), rango = min_rank(desc(x)), denso = dense_rank(desc(x)))",
        "hint": "Cada función trata los empates de forma distinta.",
        "textOutput": "Filas `(200,1,1,1)`, `(100,2,2,2)`, `(100,3,2,2)`, `(50,4,4,3)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/lag-y-lead",
    "remember": "El primer lag y último lead suelen ser NA.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/lag-y-lead/1",
        "title": "Comparar cada importe con el anterior",
        "language": "r",
        "code": "pedidos |> arrange(fecha, id) |> mutate(anterior = lag(monto)) |> pull(anterior)",
        "hint": "Se desplaza una posición.",
        "textOutput": "`c(NA, 100, 200, 300, 150, 50)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/acumulados",
    "remember": "Ordena antes de acumular; NA puede propagarse.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/acumulados/1",
        "title": "Acumular pedidos completados",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\") |> arrange(fecha, id) |> mutate(acumulado = cumsum(monto)) |> pull(acumulado)",
        "hint": "Se excluye cancelado antes de acumular.",
        "textOutput": "`c(100, 300, 600, 650, 750)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/ventanas-por-grupo",
    "remember": "Para ventanas cronológicas ordena por fecha y clave.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/ventanas-por-grupo/1",
        "title": "Numerar pedidos por cliente",
        "language": "r",
        "code": "pedidos |> arrange(cliente_id, fecha, id) |> group_by(cliente_id) |> mutate(numero = row_number()) |> ungroup() |> select(id, numero)",
        "hint": "La numeración reinicia al cambiar de cliente.",
        "textOutput": "Filas `(101,1)`, `(102,2)`, `(103,1)`, `(106,2)`, `(104,1)`, `(105,2)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-ventana/promedios-moviles",
    "remember": "Aclara si permites ventanas incompletas.",
    "note": "Requiere slider.",
    "examples": [
      {
        "id": "r/funciones-de-ventana/promedios-moviles/1",
        "title": "Calcular media móvil de tres periodos",
        "language": "r",
        "code": "slider::slide_dbl(c(10, 20, 30, 40), mean, .before = 2, .complete = TRUE)",
        "hint": "Los dos primeros no tienen tres observaciones.",
        "textOutput": "`c(NA, NA, 20, 30)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
