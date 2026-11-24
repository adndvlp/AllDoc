// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/temas-y-estilos/definicion",
    "remember": "Configura el tema antes de dibujar.",
    "examples": [
      {
        "id": "seaborn/temas-y-estilos/definicion/1",
        "title": "Aplicar un tema de análisis",
        "language": "python",
        "code": "sns.set_theme(style=\"whitegrid\", context=\"notebook\", palette=\"deep\")\nsns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\", hue=\"canal\")",
        "hint": "El tema afecta a gráficos posteriores.",
        "textOutput": "Gráfico con fondo blanco y cuadrícula.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/temas-y-estilos/set-style-y-axes-style",
    "remember": "`whitegrid`, `darkgrid`, `white`, `dark` y `ticks` son estilos disponibles.",
    "examples": [
      {
        "id": "seaborn/temas-y-estilos/set-style-y-axes-style/1",
        "title": "Usar estilo temporal",
        "language": "python",
        "code": "with sns.axes_style(\"ticks\"):\n    sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\")",
        "hint": "Al salir del bloque se restauran los parámetros previos.",
        "textOutput": "Gráfico con marcas de ejes y sin cuadrícula de fondo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/temas-y-estilos/set-context-y-plotting-context",
    "remember": "`paper`, `notebook`, `talk` y `poster` escalan la presentación.",
    "examples": [
      {
        "id": "seaborn/temas-y-estilos/set-context-y-plotting-context/1",
        "title": "Aumentar tamaños para una exposición",
        "language": "python",
        "code": "with sns.plotting_context(\"talk\", font_scale=1.1):\n    sns.countplot(data=ventas, x=\"canal\", color=\"steelblue\")",
        "hint": "El cambio es temporal y aumenta legibilidad.",
        "textOutput": "Gráfico con etiquetas y elementos de mayor tamaño.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/temas-y-estilos/rc-y-font-scale",
    "remember": "Usa parámetros globales con cuidado si dibujas varios estilos en una sesión.",
    "examples": [
      {
        "id": "seaborn/temas-y-estilos/rc-y-font-scale/1",
        "title": "Configurar texto y grosor",
        "language": "python",
        "code": "sns.set_theme(font_scale=1.2, rc={\"axes.linewidth\": 1.2})\nsns.lineplot(data=diarias)",
        "hint": "El tema establece propiedades antes de crear los ejes.",
        "textOutput": "Gráfico con texto ampliado y bordes más gruesos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/temas-y-estilos/despine",
    "remember": "No elimina los datos ni modifica las escalas.",
    "examples": [
      {
        "id": "seaborn/temas-y-estilos/despine/1",
        "title": "Simplificar un gráfico",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=None, color=\"steelblue\")\nsns.despine()",
        "hint": "Se reducen elementos decorativos.",
        "textOutput": "Barras sin bordes superior y derecho.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
