// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/metricas-de-negocio/definicion",
    "remember": "Fija la granularidad antes de agregar.",
    "examples": [
      {
        "id": "r/metricas-de-negocio/definicion/1",
        "title": "Calcular ingresos y ticket promedio",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\") |> summarise(ingresos = sum(monto), pedidos = n(), ticket = mean(monto))",
        "hint": "Los cancelados no participan.",
        "textOutput": "Ingresos 750, pedidos 5, ticket 150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/metricas-de-negocio/tasas-y-segmentacion",
    "remember": "Evita sumar porcentajes con denominadores diferentes.",
    "examples": [
      {
        "id": "r/metricas-de-negocio/tasas-y-segmentacion/1",
        "title": "Calcular cancelación por cliente",
        "language": "r",
        "code": "pedidos |> group_by(cliente_id) |> summarise(tasa = mean(estado == \"cancelado\"), .groups = \"drop\")",
        "hint": "Cada tasa usa solo los pedidos de su cliente.",
        "textOutput": "Clientes 1:0, 2:0, 3:0.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/metricas-de-negocio/crecimiento-entre-periodos",
    "remember": "Si el periodo anterior es cero o falta, el crecimiento relativo no está definido.",
    "examples": [
      {
        "id": "r/metricas-de-negocio/crecimiento-entre-periodos/1",
        "title": "Comparar ingresos mensuales",
        "language": "r",
        "code": "pedidos |> filter(estado == \"completado\") |> mutate(mes = format(fecha, \"%Y-%m\")) |> group_by(mes) |> summarise(total = sum(monto), .groups = \"drop\") |> arrange(mes) |> mutate(crecimiento = total / lag(total) - 1)",
        "hint": "Abril tiene 75% menos ingresos que marzo.",
        "textOutput": "Marzo: 600 y NA; abril: 150 y -0.75.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/metricas-de-negocio/cohortes-y-retencion",
    "remember": "El denominador de cada cohorte debe ser fijo y explícito.",
    "examples": [
      {
        "id": "r/metricas-de-negocio/cohortes-y-retencion/1",
        "title": "Medir retorno de una cohorte de marzo",
        "language": "r",
        "code": "marzo <- unique(pedidos$cliente_id[pedidos$fecha < as.Date(\"2026-04-01\") & pedidos$estado == \"completado\"])\nabril <- unique(pedidos$cliente_id[pedidos$fecha >= as.Date(\"2026-04-01\") & pedidos$fecha < as.Date(\"2026-05-01\") & pedidos$estado == \"completado\"])\nlength(intersect(marzo, abril)) / length(marzo)",
        "hint": "La cohorte se define aquí por actividad en marzo, no por primera compra.",
        "textOutput": "`0.5`: vuelve Luis, de dos clientes activos en marzo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/metricas-de-negocio/funnel-de-conversion",
    "remember": "Cuenta usuarios elegibles, no eventos duplicados.",
    "examples": [
      {
        "id": "r/metricas-de-negocio/funnel-de-conversion/1",
        "title": "Calcular conversión entre etapas anidadas",
        "language": "r",
        "code": "etapas <- tibble::tibble(etapa = c(\"visita\", \"carrito\", \"compra\"), usuarios = c(100, 40, 20))\netapas |> mutate(conversion_paso = usuarios / lag(usuarios))",
        "hint": "Se supone que los usuarios de cada etapa pertenecen a la anterior.",
        "textOutput": "NA, 0.4, 0.5; conversión total 20% respecto a visita.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
