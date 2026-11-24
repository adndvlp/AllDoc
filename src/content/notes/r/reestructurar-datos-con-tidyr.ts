// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/definicion",
    "remember": "Identifica qué representa una fila antes de pivotar.",
    "examples": [
      {
        "id": "r/reestructurar-datos-con-tidyr/definicion/1",
        "title": "Convertir meses de columnas a filas",
        "language": "r",
        "code": "tibble::tibble(pais = \"MX\", marzo = 300, abril = 100) |>\n  pivot_longer(c(marzo, abril), names_to = \"mes\", values_to = \"ventas\")",
        "hint": "Los nombres de meses pasan a una columna.",
        "textOutput": "Dos filas `(MX,marzo,300)`, `(MX,abril,100)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/pivot-wider",
    "remember": "Si varias filas apuntan a la misma celda, define una agregación con `values_fn`.",
    "examples": [
      {
        "id": "r/reestructurar-datos-con-tidyr/pivot-wider/1",
        "title": "Crear columnas por mes",
        "language": "r",
        "code": "tibble::tibble(pais = c(\"MX\", \"MX\"), mes = c(\"marzo\", \"abril\"), ventas = c(300, 100)) |>\n  pivot_wider(names_from = mes, values_from = ventas)",
        "hint": "Cada mes se vuelve una columna.",
        "textOutput": "Una fila MX, marzo=300, abril=100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/separar-y-unir-columnas",
    "remember": "Define el separador y controla piezas faltantes.",
    "note": "separate_wider_delim requiere tidyr 1.3 o posterior.",
    "examples": [
      {
        "id": "r/reestructurar-datos-con-tidyr/separar-y-unir-columnas/1",
        "title": "Separar país y código",
        "language": "r",
        "code": "tibble::tibble(codigo = c(\"MX-001\", \"ES-002\")) |>\n  separate_wider_delim(codigo, delim = \"-\", names = c(\"pais\", \"id\"))",
        "hint": "El identificador sigue siendo texto.",
        "textOutput": "Filas `(MX,\"001\")`, `(ES,\"002\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reestructurar-datos-con-tidyr/columnas-lista-y-unnest",
    "remember": "Expandir puede multiplicar el número de filas.",
    "examples": [
      {
        "id": "r/reestructurar-datos-con-tidyr/columnas-lista-y-unnest/1",
        "title": "Expandir etiquetas de clientes",
        "language": "r",
        "code": "tibble::tibble(id = 1:2, etiquetas = list(c(\"web\", \"app\"), \"web\")) |> unnest_longer(etiquetas)",
        "hint": "El cliente 1 produce dos filas.",
        "textOutput": "Tres filas `(1,web)`, `(1,app)`, `(2,web)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
