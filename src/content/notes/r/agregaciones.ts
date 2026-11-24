// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/agregaciones/definicion",
    "remember": "Distingue número de filas de número de valores presentes.",
    "examples": [
      {
        "id": "r/agregaciones/definicion/1",
        "title": "Sumar importes",
        "language": "r",
        "code": "sum(pedidos$monto)",
        "hint": "Incluye los seis pedidos, también el cancelado.",
        "textOutput": "`900`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agregaciones/conteos",
    "remember": "`n_distinct()` incluye NA por defecto; usa `na.rm = TRUE` para excluirlo.",
    "examples": [
      {
        "id": "r/agregaciones/conteos/1",
        "title": "Contar pedidos y clientes",
        "language": "r",
        "code": "c(pedidos = nrow(pedidos), clientes = n_distinct(pedidos$cliente_id))",
        "hint": "Los clientes repetidos cuentan una vez.",
        "textOutput": "`c(pedidos = 6, clientes = 3)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agregaciones/suma-media-y-extremos",
    "remember": "Usa na.rm si la regla de negocio permite excluir faltantes.",
    "examples": [
      {
        "id": "r/agregaciones/suma-media-y-extremos/1",
        "title": "Resumir importes",
        "language": "r",
        "code": "c(total = sum(pedidos$monto), media = mean(pedidos$monto),\n  minimo = min(pedidos$monto), maximo = max(pedidos$monto))",
        "hint": "Se calcula cada estadístico sobre los seis importes.",
        "textOutput": "total 900, media 150, mínimo 50, máximo 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/agregaciones/agregacion-condicional",
    "remember": "La condición determina el numerador, no necesariamente el denominador.",
    "examples": [
      {
        "id": "r/agregaciones/agregacion-condicional/1",
        "title": "Sumar solo pedidos completados",
        "language": "r",
        "code": "sum(pedidos$monto[pedidos$estado == \"completado\"])",
        "hint": "Excluye el importe cancelado de 150.",
        "textOutput": "`750`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
