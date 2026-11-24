// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/definicion",
    "remember": "Se pasan instancias como `so.Agg()` dentro de `add()`.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/definicion/1",
        "title": "Sumar por canal",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Bar(), so.Agg(\"sum\")).show()",
        "hint": "Agg calcula la suma para cada canal.",
        "textOutput": "Dos barras: Online 1120, Tienda 960.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/agg-y-est",
    "remember": "Agg sirve para totales y medias; Est cuando también quieres incertidumbre o dispersión.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/agg-y-est/1",
        "title": "Estimar media con intervalo",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Range(), so.Est(errorbar=(\"ci\",95), seed=42)).add(so.Dot(), so.Agg(\"mean\")).show()",
        "hint": "Se dibuja el intervalo junto a la media.",
        "textOutput": "Dos estimaciones con intervalos de confianza.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/hist-y-count",
    "remember": "Hist es para intervalos numéricos; Count para recuentos por categoría.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/hist-y-count/1",
        "title": "Contar registros por canal",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\").add(so.Bar(), so.Count()).show()",
        "hint": "Count produce un valor de conteo por canal.",
        "textOutput": "Dos barras de 8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/hist-y-kde",
    "remember": "La densidad no representa conteo directo.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/hist-y-kde/1",
        "title": "Visualizar densidad de ingresos",
        "language": "python",
        "code": "so.Plot(ventas, x=\"ingresos\", color=\"canal\").add(so.Line(), so.KDE()).show()",
        "hint": "KDE estima una curva por canal.",
        "textOutput": "Dos curvas suavizadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/perc",
    "remember": "Especifica los niveles que deseas resumir.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/perc/1",
        "title": "Mostrar tres percentiles por canal",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Dot(), so.Perc([25, 50, 75])).show()",
        "hint": "Se obtienen los percentiles 25, 50 y 75 por canal.",
        "textOutput": "Tres puntos por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-estadistica/polyfit",
    "remember": "`order=1` ajusta una recta.",
    "examples": [
      {
        "id": "seaborn/objects-estadistica/polyfit/1",
        "title": "Añadir tendencia a una dispersión",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\").add(so.Dot()).add(so.Line(), so.PolyFit(order=1)).show()",
        "hint": "La curva procede de un ajuste, no de unir observaciones.",
        "textOutput": "Recta superpuesta a los puntos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
