// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/definicion",
    "remember": "Empieza por la pregunta de negocio, la unidad de análisis y la métrica.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/definicion/1",
        "title": "Examinar los ingresos",
        "language": "python",
        "code": "print(ventas[[\"ingresos\", \"pedidos\"]].describe())\nsns.histplot(data=ventas, x=\"ingresos\", color=\"steelblue\")",
        "hint": "El resumen numérico complementa la forma de la distribución.",
        "textOutput": "Estadísticos de dos variables e histograma de ingresos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/elegir-el-grafico-adecuado",
    "remember": "El tipo de dato y la pregunta determinan la visualización.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/elegir-el-grafico-adecuado/1",
        "title": "Comparar facturación regional",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"region\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")",
        "hint": "La pregunta requiere totales por categoría, no promedios.",
        "textOutput": "Norte 960 y Sur 1120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/kpis-y-tasas",
    "remember": "La razón de sumas no equivale necesariamente a la media de razones.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/kpis-y-tasas/1",
        "title": "Mostrar ticket promedio ponderado por pedidos",
        "language": "python",
        "code": "kpi = ventas.groupby(\"canal\", as_index=False).agg(ingresos=(\"ingresos\", \"sum\"), pedidos=(\"pedidos\", \"sum\"))\nkpi[\"ticket\"] = kpi[\"ingresos\"] / kpi[\"pedidos\"]\nsns.barplot(data=kpi, x=\"canal\", y=\"ticket\", errorbar=None, color=\"steelblue\")",
        "hint": "Primero se calcula el KPI correcto y luego se visualiza.",
        "textOutput": "Dos barras de ingresos por pedido, una por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/comparacion-temporal",
    "remember": "Si cada fecha tiene varias filas, define si quieres suma o media.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/comparacion-temporal/1",
        "title": "Identificar evolución de ingresos diarios",
        "language": "python",
        "code": "sns.lineplot(data=ventas, x=\"fecha\", y=\"ingresos\", estimator=\"sum\", errorbar=None, marker=\"o\")",
        "hint": "Se usa la misma métrica para cada día.",
        "textOutput": "Tendencia creciente de 400 a 640.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/segmentacion",
    "remember": "El tamaño de los grupos puede cambiar las conclusiones.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/segmentacion/1",
        "title": "Comparar variación de satisfacción",
        "language": "python",
        "code": "sns.boxplot(data=ventas, x=\"region\", y=\"satisfaccion\", hue=\"canal\")",
        "hint": "Las cajas muestran diferencias en centro y dispersión por segmento.",
        "textOutput": "Cuatro cajas con sus medianas y bigotes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/visualizacion-no-enganosa",
    "remember": "En barras de magnitud conserva una base cero y especifica qué se mide.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/visualizacion-no-enganosa/1",
        "title": "Comparar totales con una base común",
        "language": "python",
        "code": "ax = sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")\nax.set_ylim(0, 1300)\nax.set_ylabel(\"Ingresos totales\")",
        "hint": "El origen y la unidad quedan definidos.",
        "textOutput": "Comparación proporcional entre 1120 y 960.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/analisis-exploratorio/comunicar-conclusiones",
    "remember": "Distingue descripción de explicación causal.",
    "examples": [
      {
        "id": "seaborn/analisis-exploratorio/comunicar-conclusiones/1",
        "title": "Resumir el canal líder",
        "language": "python",
        "code": "totales = ventas.groupby(\"canal\")[\"ingresos\"].sum()\nprint(totales.idxmax(), totales.max())",
        "hint": "Se extrae un resultado comprobable del conjunto de datos.",
        "textOutput": "`Online 1120`; lidera en ingresos del periodo observado, sin implicar causalidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
