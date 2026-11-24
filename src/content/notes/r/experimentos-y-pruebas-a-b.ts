// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/definicion",
    "remember": "Define unidad de aleatorización, ventana, métrica y criterio de decisión.",
    "examples": [
      {
        "id": "r/experimentos-y-pruebas-a-b/definicion/1",
        "title": "Calcular conversión por variante",
        "language": "r",
        "code": "data.frame(variante = c(\"A\", \"B\"), visitas = c(100, 100), compras = c(20, 25)) |> mutate(conversion = compras / visitas)",
        "hint": "El denominador son las visitas en este ejemplo.",
        "textOutput": "A=0.20, B=0.25.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/diferencia-absoluta-y-lift",
    "remember": "5 puntos porcentuales no son lo mismo que 5% relativo.",
    "examples": [
      {
        "id": "r/experimentos-y-pruebas-a-b/diferencia-absoluta-y-lift/1",
        "title": "Comparar dos tasas",
        "language": "r",
        "code": "a <- .20\nb <- .25\nc(puntos = 100 * (b - a), lift_pct = 100 * (b - a) / a)",
        "hint": "La referencia es A.",
        "textOutput": "5 puntos porcentuales y 25% de aumento relativo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/contraste-de-proporciones",
    "remember": "Una diferencia observada no basta para concluir efecto.",
    "note": "Requiere observaciones adecuadamente independientes; con datos agrupados usa un diseño compatible.",
    "examples": [
      {
        "id": "r/experimentos-y-pruebas-a-b/contraste-de-proporciones/1",
        "title": "Comparar conversiones",
        "language": "r",
        "code": "prop.test(c(20, 25), c(100, 100))$estimate",
        "hint": "El contraste utiliza éxitos y totales de cada grupo.",
        "textOutput": "Proporciones 0.20 y 0.25.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/experimentos-y-pruebas-a-b/potencia-y-tamano-de-muestra",
    "remember": "Calcula la muestra antes del experimento; redondea hacia arriba.",
    "examples": [
      {
        "id": "r/experimentos-y-pruebas-a-b/potencia-y-tamano-de-muestra/1",
        "title": "Planificar un experimento",
        "language": "r",
        "code": "ceiling(power.prop.test(p1 = .20, p2 = .25, power = .8, sig.level = .05)$n)",
        "hint": "Se usa la aproximación de dos proporciones.",
        "textOutput": "Aproximadamente 1,094 observaciones por grupo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
