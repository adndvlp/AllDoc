// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/definicion",
    "remember": "Usa colores cualitativos para grupos, secuenciales para magnitudes y divergentes para desviaciones respecto a un centro.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/definicion/1",
        "title": "Ver colores disponibles",
        "language": "python",
        "code": "sns.palplot(sns.color_palette(\"deep\", 5))",
        "hint": "Se muestran cinco colores de una paleta cualitativa.",
        "textOutput": "Cinco muestras de color.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/set-palette-y-color-palette",
    "remember": "Puedes usar una paleta temporal mediante `with`.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/set-palette-y-color-palette/1",
        "title": "Aplicar una paleta temporal",
        "language": "python",
        "code": "with sns.color_palette(\"colorblind\"):\n    sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\", hue=\"canal\")",
        "hint": "Se eligen colores diferenciables para los canales.",
        "textOutput": "Dos colores de la paleta colorblind.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-cualitativas-y-accesibilidad",
    "remember": "Combina color y forma para no depender únicamente de la percepción del color.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/paletas-cualitativas-y-accesibilidad/1",
        "title": "Hacer distinguibles los canales",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"canal\", style=\"canal\", palette=\"colorblind\")",
        "hint": "El canal se codifica dos veces.",
        "textOutput": "Puntos con colores y símbolos distintos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-secuenciales-y-divergentes",
    "remember": "Elige centro significativo solo cuando tenga interpretación.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/paletas-secuenciales-y-divergentes/1",
        "title": "Mostrar desviación respecto a una meta",
        "language": "python",
        "code": "sns.heatmap(matriz - 500, cmap=\"vlag\", center=0, annot=True, fmt=\".0f\")",
        "hint": "Cero significa haber alcanzado el objetivo de 500.",
        "textOutput": "Celdas con diferencias de -60, 20 y 100 según combinación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/light-palette-y-dark-palette",
    "remember": "`as_cmap=True` devuelve un mapa de color para valores continuos.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/light-palette-y-dark-palette/1",
        "title": "Crear un gradiente personalizado",
        "language": "python",
        "code": "sns.heatmap(matriz, cmap=sns.light_palette(\"seagreen\", as_cmap=True), annot=True, fmt=\".0f\")",
        "hint": "Los valores se representan mediante intensidad de verde.",
        "textOutput": "Matriz en tonos verdes de distinta intensidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/diverging-palette-y-blend-palette",
    "remember": "Usa colores con contraste suficiente y una escala coherente.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/diverging-palette-y-blend-palette/1",
        "title": "Construir un mapa divergente",
        "language": "python",
        "code": "cmap = sns.diverging_palette(240, 15, as_cmap=True)\nsns.heatmap(matriz - 500, cmap=cmap, center=0, annot=True, fmt=\".0f\")",
        "hint": "Se separan visualmente desviaciones negativas y positivas.",
        "textOutput": "Matriz de dos familias de color.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/paletas-explicitas",
    "remember": "Mantén la asignación entre gráficos de un mismo informe.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/paletas-explicitas/1",
        "title": "Fijar colores de canales",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"canal\", palette={\"Online\":\"#2878B5\", \"Tienda\":\"#E69F00\"})",
        "hint": "Cada canal tiene un color constante.",
        "textOutput": "Puntos con los dos colores especificados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/paletas-y-colores/blend-palette",
    "remember": "Usa una transición que preserve la interpretación de magnitudes.",
    "examples": [
      {
        "id": "seaborn/paletas-y-colores/blend-palette/1",
        "title": "Crear un gradiente propio",
        "language": "python",
        "code": "sns.heatmap(matriz, cmap=sns.blend_palette([\"white\", \"#2975A8\"], as_cmap=True), annot=True, fmt=\".0f\")",
        "hint": "El color varía del blanco al azul.",
        "textOutput": "Mapa de calor con gradiente personalizado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
