// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/personalizacion/definicion",
    "remember": "Usa métodos del Axes para gráficos axes-level y del grid para figure-level.",
    "examples": [
      {
        "id": "seaborn/personalizacion/definicion/1",
        "title": "Titular un gráfico",
        "language": "python",
        "code": "ax = sns.countplot(data=ventas, x=\"canal\", color=\"steelblue\")\nax.set_title(\"Registros por canal\")",
        "hint": "Se modifica el Axes devuelto.",
        "textOutput": "Gráfico con título Registros por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/tamano-y-subplots",
    "remember": "En funciones figure-level el tamaño se configura con `height` y `aspect`.",
    "examples": [
      {
        "id": "seaborn/personalizacion/tamano-y-subplots/1",
        "title": "Crear dos vistas complementarias",
        "language": "python",
        "code": "fig, axs = plt.subplots(1, 2, figsize=(9, 4))\nsns.countplot(data=ventas, x=\"canal\", ax=axs[0], color=\"steelblue\")\nsns.boxplot(data=ventas, x=\"canal\", y=\"ingresos\", ax=axs[1])\nfig.tight_layout()",
        "hint": "Cada función recibe su propio Axes.",
        "textOutput": "Dos gráficos en una misma figura.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/titulos-y-etiquetas",
    "remember": "Incluye unidades en las etiquetas cuando importan.",
    "examples": [
      {
        "id": "seaborn/personalizacion/titulos-y-etiquetas/1",
        "title": "Etiquetar ingresos y región",
        "language": "python",
        "code": "ax = sns.barplot(data=ventas, x=\"region\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")\nax.set(title=\"Ingresos por región\", xlabel=\"Región\", ylabel=\"Ingresos (unidades monetarias)\")",
        "hint": "Se documenta qué representa cada barra.",
        "textOutput": "Gráfico con título y etiquetas descriptivas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/limites-y-escalas",
    "remember": "No recortes el origen de barras si eso exagera diferencias; la escala log requiere valores positivos.",
    "examples": [
      {
        "id": "seaborn/personalizacion/limites-y-escalas/1",
        "title": "Mostrar ingresos en escala logarítmica",
        "language": "python",
        "code": "ax = sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\")\nax.set_yscale(\"log\")",
        "hint": "El eje Y representa razones multiplicativas.",
        "textOutput": "Dispersión con eje Y logarítmico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/log-scale",
    "remember": "Un histograma con escala logarítmica puede usar intervalos en el espacio transformado.",
    "examples": [
      {
        "id": "seaborn/personalizacion/log-scale/1",
        "title": "Mostrar distribución en escala log",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", log_scale=True, bins=4, color=\"steelblue\")",
        "hint": "Se construye una distribución en escala logarítmica.",
        "textOutput": "Histograma con eje X logarítmico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/rotacion-de-etiquetas",
    "remember": "Girar es preferible a dejar textos superpuestos.",
    "examples": [
      {
        "id": "seaborn/personalizacion/rotacion-de-etiquetas/1",
        "title": "Girar fechas",
        "language": "python",
        "code": "ax = sns.lineplot(data=diarias)\nax.tick_params(axis=\"x\", labelrotation=45)\nplt.tight_layout()",
        "hint": "Se rotan las marcas de fecha.",
        "textOutput": "Etiquetas temporales inclinadas 45 grados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/anotaciones",
    "remember": "Anota el dato relevante, no todas las observaciones si dificulta leer el gráfico.",
    "examples": [
      {
        "id": "seaborn/personalizacion/anotaciones/1",
        "title": "Etiquetar totales",
        "language": "python",
        "code": "ax = sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")\nax.bar_label(ax.containers[0], fmt=\"%.0f\")\nax.set_ylim(0, 1300)",
        "hint": "Se muestran valores sobre las barras.",
        "textOutput": "Etiquetas 1120 y 960.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/leyendas-y-move-legend",
    "remember": "La leyenda no debe tapar los datos.",
    "examples": [
      {
        "id": "seaborn/personalizacion/leyendas-y-move-legend/1",
        "title": "Mover leyenda al exterior",
        "language": "python",
        "code": "ax = sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\", hue=\"canal\")\nsns.move_legend(ax, \"upper left\", bbox_to_anchor=(1, 1))\nplt.tight_layout()",
        "hint": "Se desplaza la leyenda a la derecha.",
        "textOutput": "Leyenda fuera de la zona de puntos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/alpha-color-marker-y-linewidth",
    "remember": "Su efecto depende de la función; no equivalen a mapear variables mediante hue o style.",
    "examples": [
      {
        "id": "seaborn/personalizacion/alpha-color-marker-y-linewidth/1",
        "title": "Ajustar estilo de una serie",
        "language": "python",
        "code": "sns.lineplot(data=diarias[\"Online\"], color=\"teal\", marker=\"o\", linewidth=2, alpha=.8)",
        "hint": "Todas las observaciones usan el estilo fijo.",
        "textOutput": "Línea verde con cuatro marcadores circulares.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/superposicion-de-graficos",
    "remember": "Comprueba que los ejes y categorías sean compatibles antes de combinar capas.",
    "examples": [
      {
        "id": "seaborn/personalizacion/superposicion-de-graficos/1",
        "title": "Mostrar cajas y datos originales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nsns.boxplot(data=ventas, x=\"canal\", y=\"ingresos\", ax=ax)\nsns.stripplot(data=ventas, x=\"canal\", y=\"ingresos\", color=\"black\", alpha=.6, ax=ax)",
        "hint": "Los puntos complementan el resumen de la distribución.",
        "textOutput": "Dos cajas con ocho observaciones superpuestas cada una.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/mostrar-y-exportar",
    "remember": "Guarda antes de mostrar o cerrar; `dpi` afecta principalmente a la salida ráster.",
    "examples": [
      {
        "id": "seaborn/personalizacion/mostrar-y-exportar/1",
        "title": "Exportar un gráfico de ventas",
        "language": "python",
        "code": "ax = sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", estimator=\"sum\", errorbar=None, color=\"steelblue\")\nax.figure.savefig(\"ventas.png\", dpi=150, bbox_inches=\"tight\")\nax.figure.savefig(\"ventas.svg\", bbox_inches=\"tight\")\nplt.show()",
        "hint": "PNG es ráster y SVG vectorial; también puedes usar PDF.",
        "textOutput": "Archivos `ventas.png` y `ventas.svg` en el directorio actual.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/personalizacion/anotacion-de-puntos",
    "remember": "Usa coordenadas de datos para señalar una observación concreta.",
    "examples": [
      {
        "id": "seaborn/personalizacion/anotacion-de-puntos/1",
        "title": "Señalar el mayor ingreso",
        "language": "python",
        "code": "ax = sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\")\nfila = ventas.loc[ventas[\"ingresos\"].idxmax()]\nax.annotate(\"Mayor ingreso\", xy=(fila[\"inversion\"], fila[\"ingresos\"]), xytext=(-80, -20), textcoords=\"offset points\", arrowprops={\"arrowstyle\":\"->\"})",
        "hint": "La flecha señala el punto de mayor ingreso.",
        "textOutput": "Etiqueta asociada al ingreso de 180.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
