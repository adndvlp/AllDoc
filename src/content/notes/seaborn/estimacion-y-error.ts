// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/definicion",
    "remember": "Identifica qué estima cada gráfico antes de interpretar una barra o una línea.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/definicion/1",
        "title": "Comparar ingresos medios",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=None, color=\"steelblue\")",
        "hint": "Cada barra resume varias observaciones.",
        "textOutput": "Online 140; Tienda 120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/estimator",
    "remember": "`barplot` usa media por defecto; puedes pedir suma o mediana.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/estimator/1",
        "title": "Comparar ingresos totales",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")",
        "hint": "Las barras representan sumas y no promedios.",
        "textOutput": "Online 1120; Tienda 960.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/errorbar-y-none",
    "remember": "No confundas ausencia de barras de error con ausencia de variabilidad.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/errorbar-y-none/1",
        "title": "Mostrar solo la estimación",
        "language": "python",
        "code": "sns.pointplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=None)",
        "hint": "Se eliminan los intervalos visuales.",
        "textOutput": "Dos puntos correspondientes a las medias.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/desviacion-estandar-y-error-estandar",
    "remember": "SD y SE no son equivalentes; SE suele ser menor.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/desviacion-estandar-y-error-estandar/1",
        "title": "Mostrar dispersión alrededor de la media",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=\"sd\", color=\"steelblue\")",
        "hint": "Cada intervalo muestra media ± una desviación estándar muestral.",
        "textOutput": "Dos barras con intervalos de dispersión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/intervalo-percentil",
    "remember": "Describe dispersión de observaciones, no confianza en la media.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/intervalo-percentil/1",
        "title": "Mostrar el intervalo central",
        "language": "python",
        "code": "sns.pointplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=(\"pi\", 90))",
        "hint": "El nivel controla la proporción central de los valores.",
        "textOutput": "Puntos con intervalos percentiles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/intervalo-de-confianza-y-bootstrap",
    "remember": "Un IC del 95 % no significa que el 95 % de las observaciones esté dentro.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/intervalo-de-confianza-y-bootstrap/1",
        "title": "Estimar incertidumbre de la media",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=(\"ci\", 95), n_boot=500, seed=42, color=\"steelblue\")",
        "hint": "El remuestreo aproxima la incertidumbre de cada media.",
        "textOutput": "Barras con intervalos de confianza reproducibles en el mismo entorno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estimacion-y-error/weights",
    "remember": "En 0.13.2, la ponderación restringe el estimador a media y el intervalo a CI o None.",
    "examples": [
      {
        "id": "seaborn/estimacion-y-error/weights/1",
        "title": "Calcular satisfacción ponderada por pedidos",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"satisfaccion\", weights=\"pedidos\", errorbar=None, color=\"steelblue\")",
        "hint": "Los registros con más pedidos tienen más peso.",
        "textOutput": "Dos medias ponderadas, una por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
