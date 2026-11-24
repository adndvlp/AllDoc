// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/objects-plot/definicion",
    "remember": "Es una API distinta de `sns.scatterplot`; `add()` añade capas.",
    "examples": [
      {
        "id": "seaborn/objects-plot/definicion/1",
        "title": "Crear un gráfico declarativo",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\").add(so.Dot()).show()",
        "hint": "Plot asigna variables y Dot define la marca.",
        "textOutput": "Diagrama de dispersión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/plot-y-propiedades",
    "remember": "En Objects el mapeo de color se llama `color`, no `hue`.",
    "examples": [
      {
        "id": "seaborn/objects-plot/plot-y-propiedades/1",
        "title": "Colorear puntos por canal",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\", color=\"canal\").add(so.Dot()).show()",
        "hint": "Cada canal recibe un color.",
        "textOutput": "Dispersión con leyenda de canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/add-y-capas",
    "remember": "Una capa puede tener su propio dataset o variables.",
    "examples": [
      {
        "id": "seaborn/objects-plot/add-y-capas/1",
        "title": "Mostrar puntos y tendencia",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\").add(so.Dot()).add(so.Line(), so.PolyFit(order=1)).show()",
        "hint": "Una capa muestra datos y la otra un ajuste lineal.",
        "textOutput": "Puntos y recta de tendencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/marcas-dot-dots-line-y-path",
    "remember": "Usa Line para tendencias ordenadas y Path cuando importa el recorrido original.",
    "examples": [
      {
        "id": "seaborn/objects-plot/marcas-dot-dots-line-y-path/1",
        "title": "Mostrar ingresos diarios",
        "language": "python",
        "code": "so.Plot(diarias.reset_index(), x=\"fecha\", y=\"Online\").add(so.Line()).add(so.Dot()).show()",
        "hint": "La línea conecta las fechas y los puntos muestran las observaciones.",
        "textOutput": "Cuatro puntos conectados con valores 220, 260, 300 y 340.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/bar-bars-y-area",
    "remember": "Selecciona la marca según el objetivo y no por la apariencia únicamente.",
    "examples": [
      {
        "id": "seaborn/objects-plot/bar-bars-y-area/1",
        "title": "Dibujar ingresos diarios como área",
        "language": "python",
        "code": "so.Plot(diarias.reset_index(), x=\"fecha\", y=\"Online\").add(so.Area()).show()",
        "hint": "Area rellena bajo la serie de ingresos diarios.",
        "textOutput": "Área con alturas 220, 260, 300 y 340 (no es un acumulado matemático).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/text-dash-range-y-band",
    "remember": "Range y Band necesitan límites o una transformación que los produzca.",
    "examples": [
      {
        "id": "seaborn/objects-plot/text-dash-range-y-band/1",
        "title": "Mostrar intervalos de dispersión",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Range(), so.Est(errorbar=\"sd\")).add(so.Dot(), so.Agg()).show()",
        "hint": "Est genera límites alrededor de la media y Agg calcula el punto central.",
        "textOutput": "Dos puntos con intervalos de una desviación estándar.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/marcas-de-texto",
    "remember": "Text no calcula ni formatea automáticamente un total de negocio.",
    "examples": [
      {
        "id": "seaborn/objects-plot/marcas-de-texto/1",
        "title": "Etiquetar ingresos diarios",
        "language": "python",
        "code": "d = diarias.reset_index()\nso.Plot(d, x=\"fecha\", y=\"Online\", text=\"Online\").add(so.Dot()).add(so.Text(color=\"black\")).show()",
        "hint": "El texto representa el valor de cada punto.",
        "textOutput": "Cuatro puntos con etiquetas numéricas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-plot/barras-de-histograma-y-marcas-de-intervalo",
    "remember": "Las marcas se combinan con una transformación que genere sus coordenadas.",
    "examples": [
      {
        "id": "seaborn/objects-plot/barras-de-histograma-y-marcas-de-intervalo/1",
        "title": "Dibujar un histograma declarativo",
        "language": "python",
        "code": "so.Plot(ventas, x=\"ingresos\").add(so.Bars(), so.Hist(bins=4)).show()",
        "hint": "Hist calcula frecuencias y Bars las representa.",
        "textOutput": "Cuatro barras de frecuencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
