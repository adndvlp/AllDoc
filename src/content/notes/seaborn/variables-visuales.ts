// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/variables-visuales/definicion",
    "remember": "`hue`, `size` y `style` mapean datos; `color` y `marker` fijan propiedades.",
    "examples": [
      {
        "id": "seaborn/variables-visuales/definicion/1",
        "title": "Diferenciar regiones",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"region\")",
        "hint": "El color identifica a qué región pertenece el punto.",
        "textOutput": "Dos colores con leyenda Norte y Sur.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/variables-visuales/hue",
    "remember": "Una categoría produce colores discretos; un número puede producir una escala continua.",
    "examples": [
      {
        "id": "seaborn/variables-visuales/hue/1",
        "title": "Colorear por canal",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\", hue=\"canal\")",
        "hint": "Los canales se distinguen sin separar gráficos.",
        "textOutput": "Dos colores y una leyenda de canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/variables-visuales/size-y-sizes",
    "remember": "El tamaño representa magnitud, no una categoría necesariamente.",
    "examples": [
      {
        "id": "seaborn/variables-visuales/size-y-sizes/1",
        "title": "Representar volumen de pedidos",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", size=\"pedidos\", sizes=(30, 180))",
        "hint": "Los registros con más pedidos se dibujan con mayor área.",
        "textOutput": "Puntos de tamaños variables y leyenda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/variables-visuales/style-y-markers",
    "remember": "Puede duplicar el significado de `hue` para mejorar la accesibilidad.",
    "examples": [
      {
        "id": "seaborn/variables-visuales/style-y-markers/1",
        "title": "Distinguir canales por forma",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"canal\", style=\"canal\", markers={\"Online\":\"o\", \"Tienda\":\"s\"})",
        "hint": "Cada canal tiene un símbolo propio.",
        "textOutput": "Círculos y cuadrados además de dos colores.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/variables-visuales/escalas-semanticas",
    "remember": "Usa los mismos límites para comparar gráficos con la misma escala.",
    "examples": [
      {
        "id": "seaborn/variables-visuales/escalas-semanticas/1",
        "title": "Fijar una escala de inversión",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\", hue=\"inversion\", hue_norm=(0, 60), palette=\"viridis\")",
        "hint": "El color depende de una escala de inversión fija.",
        "textOutput": "Gradiente de color para los montos de inversión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
