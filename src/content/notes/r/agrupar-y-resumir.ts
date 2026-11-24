// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/agrupar-y-resumir/definicion",
    "remember": "Agrupar no reduce filas hasta que aplicas un resumen.",
    "examples": [
      {
        "id": "r/agrupar-y-resumir/definicion/1",
        "title": "Calcular gasto por cliente",
        "language": "r",
        "code": "pedidos |> group_by(cliente_id) |> summarise(total = sum(monto), .groups = \"drop\")",
        "hint": "Cada cliente tiene su propia suma.",
        "textOutput": "Filas `(1,300)`, `(2,400)`, `(3,200)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agrupar-y-resumir/varias-agregaciones-y-count",
    "remember": "`count(x)` produce una fila por combinación agrupada.",
    "examples": [
      {
        "id": "r/agrupar-y-resumir/varias-agregaciones-y-count/1",
        "title": "Contar por estado",
        "language": "r",
        "code": "pedidos |> count(estado)",
        "hint": "La columna n contiene el conteo.",
        "textOutput": "Filas cancelado=1 y completado=5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agrupar-y-resumir/agrupar-varias-columnas",
    "remember": "Usa `.groups = \"drop\"` si no deseas heredar agrupación.",
    "examples": [
      {
        "id": "r/agrupar-y-resumir/agrupar-varias-columnas/1",
        "title": "Resumir por cliente y estado",
        "language": "r",
        "code": "pedidos |> group_by(cliente_id, estado) |> summarise(total = sum(monto), .groups = \"drop\")",
        "hint": "Marta tiene dos grupos.",
        "textOutput": "Cuatro filas: `(1,completado,300)`, `(2,completado,400)`, `(3,cancelado,150)`, `(3,completado,50)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agrupar-y-resumir/filtrar-antes-y-despues",
    "remember": "El lugar del filtro cambia el universo del cálculo.",
    "examples": [
      {
        "id": "r/agrupar-y-resumir/filtrar-antes-y-despues/1",
        "title": "Mostrar clientes con gasto completado mayor a 200",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\") |>\n  group_by(cliente_id) |> summarise(total = sum(monto), .groups = \"drop\") |>\n  filter(total > 200)",
        "hint": "El último filtro opera sobre el total.",
        "textOutput": "Filas `(1,300)`, `(2,400)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agrupar-y-resumir/agregacion-por-operacion-y-reframe",
    "remember": "reframe devuelve una tabla sin grupos.",
    "note": "Requiere dplyr 1.1 o posterior.",
    "examples": [
      {
        "id": "r/agrupar-y-resumir/agregacion-por-operacion-y-reframe/1",
        "title": "Obtener mínimo y máximo en filas",
        "language": "r",
        "code": "pedidos |> reframe(extremo = range(monto), .by = cliente_id)",
        "hint": "range devuelve dos valores por grupo.",
        "textOutput": "Dos filas por cliente: 1:100,200; 2:100,300; 3:50,150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
