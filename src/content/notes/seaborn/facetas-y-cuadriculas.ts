// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/definicion",
    "remember": "Usa `row` y `col` en funciones figure-level.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/definicion/1",
        "title": "Comparar regiones en paneles",
        "language": "python",
        "code": "sns.relplot(data=ventas, x=\"inversion\", y=\"ingresos\", col=\"region\", hue=\"canal\")",
        "hint": "Cada región conserva sus observaciones.",
        "textOutput": "Dos diagramas de dispersión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/row-col-y-col-wrap",
    "remember": "`col_wrap` se usa con col sin row.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/row-col-y-col-wrap/1",
        "title": "Mostrar las cuatro sucursales",
        "language": "python",
        "code": "sns.relplot(data=ventas, x=\"fecha\", y=\"ingresos\", col=\"sucursal\", col_wrap=2, kind=\"line\", errorbar=None)",
        "hint": "Se limita cada fila a dos facetas.",
        "textOutput": "Cuadrícula 2 × 2 de series temporales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/height-y-aspect",
    "remember": "No equivalen al figsize de una figura completa.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/height-y-aspect/1",
        "title": "Hacer paneles horizontales",
        "language": "python",
        "code": "sns.displot(data=ventas, x=\"ingresos\", col=\"region\", height=3, aspect=1.5)",
        "hint": "Cada panel mide aproximadamente 4.5 × 3 pulgadas.",
        "textOutput": "Dos histogramas de formato horizontal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/sharex-y-sharey",
    "remember": "Las escalas compartidas permiten comparar magnitudes directamente.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/sharex-y-sharey/1",
        "title": "Comparar escalas comunes",
        "language": "python",
        "code": "sns.catplot(data=ventas, x=\"canal\", y=\"ingresos\", col=\"region\", kind=\"box\", sharey=True)",
        "hint": "Se comparte el eje Y.",
        "textOutput": "Dos paneles con la misma escala vertical.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/facetgrid-y-map",
    "remember": "La función debe poder recibir los argumentos en el formato utilizado por map.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/facetgrid-y-map/1",
        "title": "Dibujar histogramas por región",
        "language": "python",
        "code": "g = sns.FacetGrid(ventas, col=\"region\")\ng.map(plt.hist, \"ingresos\", bins=4)",
        "hint": "Se aplica un histograma de Matplotlib a cada subconjunto.",
        "textOutput": "Dos histogramas, uno por región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/map-dataframe",
    "remember": "Es adecuado para funciones con parámetros de nombres de columnas.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/map-dataframe/1",
        "title": "Aplicar dispersión por región",
        "language": "python",
        "code": "g = sns.FacetGrid(ventas, col=\"region\", hue=\"canal\")\ng.map_dataframe(sns.scatterplot, x=\"inversion\", y=\"ingresos\")\ng.add_legend()",
        "hint": "Se mantienen los nombres de columnas y la semántica de canal.",
        "textOutput": "Dos paneles y leyenda de canales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/personalizacion-de-grids",
    "remember": "Usa `g.figure` para la figura y `g.axes` para paneles.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/personalizacion-de-grids/1",
        "title": "Titular facetas",
        "language": "python",
        "code": "g = sns.relplot(data=ventas, x=\"fecha\", y=\"ingresos\", col=\"region\", kind=\"line\", errorbar=None)\ng.set_axis_labels(\"Fecha\", \"Ingresos medios\")\ng.set_titles(\"Región: {col_name}\")",
        "hint": "Se actualizan textos en todos los paneles.",
        "textOutput": "Títulos Región: Norte y Región: Sur.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/pairgrid",
    "remember": "`map_diag`, `map_upper` y `map_lower` controlan las zonas por separado.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/pairgrid/1",
        "title": "Construir una matriz personalizada",
        "language": "python",
        "code": "g = sns.PairGrid(ventas, vars=[\"ingresos\", \"inversion\", \"pedidos\"])\ng.map_diag(sns.histplot, color=\"steelblue\")\ng.map_upper(sns.scatterplot)\ng.map_lower(sns.kdeplot, color=\"steelblue\")",
        "hint": "Se combina distribución, dispersión y densidad conjunta.",
        "textOutput": "Cuadrícula con tres tipos de gráficos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/facetas-y-cuadriculas/jointgrid",
    "remember": "Usa `plot_joint` y `plot_marginals` para controlar las capas.",
    "examples": [
      {
        "id": "seaborn/facetas-y-cuadriculas/jointgrid/1",
        "title": "Combinar dispersión y densidades",
        "language": "python",
        "code": "g = sns.JointGrid(data=ventas, x=\"inversion\", y=\"ingresos\")\ng.plot_joint(sns.scatterplot)\ng.plot_marginals(sns.kdeplot, color=\"steelblue\")",
        "hint": "Cada zona recibe una función independiente.",
        "textOutput": "Dispersión con dos curvas marginales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
