// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/definicion",
    "remember": "Los parámetros disponibles dependen de la función concreta.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/definicion/1",
        "title": "Separar canales por región",
        "language": "python",
        "code": "sns.boxplot(data=ventas, x=\"region\", y=\"ingresos\", hue=\"canal\", dodge=True)",
        "hint": "Los grupos de hue se colocan lado a lado.",
        "textOutput": "Dos cajas por región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/order-y-hue-order",
    "remember": "Ambos parámetros fijan un orden explícito y reproducible.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/order-y-hue-order/1",
        "title": "Fijar orden de regiones y canales",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"region\", y=\"ingresos\", hue=\"canal\", order=[\"Sur\", \"Norte\"], hue_order=[\"Tienda\", \"Online\"], errorbar=None)",
        "hint": "El orden del eje y de los grupos se define por separado.",
        "textOutput": "Sur antes de Norte, Tienda antes de Online.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/width-dodge-y-gap",
    "remember": "La separación visual no cambia el cálculo.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/width-dodge-y-gap/1",
        "title": "Separar barras agrupadas",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"region\", y=\"ingresos\", hue=\"canal\", width=.8, dodge=True, gap=.15, errorbar=None)",
        "hint": "El espacio facilita distinguir canales.",
        "textOutput": "Cuatro barras agrupadas con separación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/fill-y-split",
    "remember": "En un violín dividido, cada lado puede representar un grupo distinto.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/fill-y-split/1",
        "title": "Comparar canales dentro del mismo violín",
        "language": "python",
        "code": "sns.violinplot(data=ventas, x=\"region\", y=\"ingresos\", hue=\"canal\", split=True, fill=False, cut=0)",
        "hint": "Se contraponen las dos densidades por región.",
        "textOutput": "Dos violines divididos, dibujados con contornos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/native-scale-y-formatter",
    "remember": "Un formatter puede unir categorías que produzcan la misma etiqueta.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/native-scale-y-formatter/1",
        "title": "Mantener distancias temporales reales",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"fecha\", y=\"ingresos\", estimator=\"sum\", native_scale=True, errorbar=None, color=\"steelblue\")",
        "hint": "Las fechas conservan su escala temporal.",
        "textOutput": "Cuatro barras con posiciones de fecha reales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/orient",
    "remember": "Útil cuando ambas variables son numéricas y no se puede inferir la orientación deseada.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/orient/1",
        "title": "Comparar ingresos por volumen de pedidos",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"pedidos\", y=\"ingresos\", orient=\"x\", errorbar=None, color=\"steelblue\")",
        "hint": "Los valores de pedidos se tratan como niveles del eje X.",
        "textOutput": "Una barra de ingreso medio por volumen observado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/parametros-categoricos/formatter",
    "remember": "Si dos valores producen la misma etiqueta, se agrupan.",
    "examples": [
      {
        "id": "seaborn/parametros-categoricos/formatter/1",
        "title": "Agrupar las fechas en un solo mes",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"fecha\", y=\"ingresos\", formatter=lambda d: d.strftime(\"%Y-%m\"), estimator=\"sum\", errorbar=None, color=\"steelblue\")",
        "hint": "Todas las fechas de septiembre se asignan a una categoría.",
        "textOutput": "Una barra de 2080.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
