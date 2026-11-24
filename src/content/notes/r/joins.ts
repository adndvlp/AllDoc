// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/joins/definicion",
    "remember": "Identifica la clave y la granularidad antes de unir.",
    "examples": [
      {
        "id": "r/joins/definicion/1",
        "title": "Añadir nombre del cliente a cada pedido",
        "language": "r",
        "code": "pedidos |> inner_join(clientes, by = c(\"cliente_id\" = \"id\")) |> select(id, nombre)",
        "hint": "La clave de la izquierda se llama cliente_id; la de la derecha id.",
        "textOutput": "6 filas: `(101,Ana)`, `(102,Ana)`, `(103,Luis)`, `(104,Marta)`, `(105,Marta)`, `(106,Luis)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/joins/left-join-right-join-y-full-join",
    "remember": "Los campos sin coincidencia se rellenan con NA.",
    "examples": [
      {
        "id": "r/joins/left-join-right-join-y-full-join/1",
        "title": "Conservar clientes sin pedidos",
        "language": "r",
        "code": "clientes |> left_join(pedidos, by = c(\"id\" = \"cliente_id\")) |> select(nombre, monto)",
        "hint": "La tabla izquierda determina los clientes conservados.",
        "textOutput": "8 filas: Ana 100 y 200; Luis 300 y 100; Marta 150 y 50; Pedro NA; Sofia NA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/joins/semi-join-y-anti-join",
    "remember": "Estas operaciones filtran sin multiplicar filas de la izquierda.",
    "examples": [
      {
        "id": "r/joins/semi-join-y-anti-join/1",
        "title": "Encontrar clientes sin pedidos",
        "language": "r",
        "code": "clientes |> anti_join(pedidos, by = c(\"id\" = \"cliente_id\")) |> pull(nombre)",
        "hint": "No hace falta comprobar una columna NA.",
        "textOutput": "`c(\"Pedro\", \"Sofia\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/joins/cardinalidad-y-claves-multiples",
    "remember": "Comprueba claves antes de sumar importes después de un join.",
    "note": "Requiere dplyr 1.1 o posterior; `na_matches = \"never\"` evita coincidencia entre claves NA.",
    "examples": [
      {
        "id": "r/joins/cardinalidad-y-claves-multiples/1",
        "title": "Exigir una relación muchos a uno",
        "language": "r",
        "code": "pedidos |> left_join(clientes, by = c(\"cliente_id\" = \"id\"), relationship = \"many-to-one\") |> nrow()",
        "hint": "Cada pedido coincide con como máximo un cliente.",
        "textOutput": "`6`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/joins/unir-varias-tablas",
    "remember": "Suma a la granularidad correcta: no repitas el total de un pedido por cada producto.",
    "examples": [
      {
        "id": "r/joins/unir-varias-tablas/1",
        "title": "Calcular ingresos por categoría completada",
        "language": "r",
        "code": "detalle |> inner_join(pedidos, by = c(\"pedido_id\" = \"id\")) |>\n  inner_join(productos, by = c(\"producto_id\" = \"id\")) |>\n  filter(estado == \"completado\") |> group_by(categoria) |>\n  summarise(ingreso = sum(cantidad * precio_unitario), .groups = \"drop\")",
        "hint": "Se suman importes de línea, no el monto repetido del pedido.",
        "textOutput": "Accesorios 450 y Pantallas 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/joins/merge-y-cross-join",
    "remember": "El producto cartesiano de n y m filas tiene n × m filas.",
    "examples": [
      {
        "id": "r/joins/merge-y-cross-join/1",
        "title": "Combinar países y canales",
        "language": "r",
        "code": "cross_join(tibble::tibble(pais = c(\"MX\", \"ES\")), tibble::tibble(canal = c(\"ads\", \"web\")))",
        "hint": "No se requiere clave.",
        "textOutput": "4 filas: MX/ads, MX/web, ES/ads, ES/web.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
