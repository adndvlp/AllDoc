// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/definicion",
    "remember": "No conviertas ausencia en cero sin justificación de negocio.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/definicion/1",
        "title": "Contar cupones faltantes",
        "language": "r",
        "code": "sum(is.na(pedidos$cupon))",
        "hint": "Primero se mide la ausencia.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/coalesce-y-replace-na",
    "remember": "El sustituto debe tener un tipo compatible.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/coalesce-y-replace-na/1",
        "title": "Mostrar país desconocido",
        "language": "r",
        "code": "clientes |> mutate(pais = coalesce(pais, \"Desconocido\")) |> pull(pais)",
        "hint": "Solo cambia el NA.",
        "textOutput": "`c(\"MX\", \"MX\", \"ES\", \"Desconocido\", \"ES\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/na-if-drop-na-y-fill",
    "remember": "Ordena y agrupa antes de propagar valores.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/na-if-drop-na-y-fill/1",
        "title": "Convertir código vacío a faltante",
        "language": "r",
        "code": "na_if(c(\"MX\", \"\", \"ES\"), \"\")",
        "hint": "Solo se cambia la cadena vacía.",
        "textOutput": "`c(\"MX\", NA, \"ES\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/complete",
    "remember": "Distingue cero observado de ausencia de registro.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/complete/1",
        "title": "Completar meses sin ventas",
        "language": "r",
        "code": "tibble::tibble(mes = c(1, 3), ventas = c(100, 200)) |> complete(mes = 1:3, fill = list(ventas = 0))",
        "hint": "Se crea el mes 2 bajo el supuesto de cero ventas.",
        "textOutput": "Filas `(1,100)`, `(2,0)`, `(3,200)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/validacion-de-esquema-y-claves",
    "remember": "Comprueba claves, tipos y rangos antes de publicar.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/validacion-de-esquema-y-claves/1",
        "title": "Validar relaciones del dataset",
        "language": "r",
        "code": "stopifnot(!anyDuplicated(clientes$id), all(pedidos$cliente_id %in% clientes$id), all(pedidos$monto >= 0))",
        "hint": "Una condición falsa detiene el script.",
        "textOutput": "Sin error ni salida visible si todas las condiciones se cumplen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/limpieza-y-calidad-de-datos/outliers",
    "remember": "Marcar no significa eliminar.",
    "examples": [
      {
        "id": "r/limpieza-y-calidad-de-datos/outliers/1",
        "title": "Detectar un importe extremo",
        "language": "r",
        "code": "x <- c(10, 11, 12, 13, 100)\nq <- quantile(x, c(.25, .75))\nx[x > q[2] + 1.5 * IQR(x)]",
        "hint": "Se usa el umbral superior del criterio IQR.",
        "textOutput": "`100`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
