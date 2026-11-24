// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/definicion",
    "remember": "`barplot` resume una medida; `countplot` cuenta filas.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/definicion/1",
        "title": "Contar registros por canal",
        "language": "python",
        "code": "sns.countplot(data=ventas, x=\"canal\", color=\"steelblue\")",
        "hint": "Cada registro aporta una unidad.",
        "textOutput": "Online 8; Tienda 8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/barplot",
    "remember": "La media es el estimador predeterminado, no la suma.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/barplot/1",
        "title": "Comparar pedidos medios",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"region\", y=\"pedidos\", errorbar=None, color=\"steelblue\")",
        "hint": "Se promedian los pedidos dentro de cada región.",
        "textOutput": "Norte 12; Sur 14.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/countplot",
    "remember": "No cuenta clientes únicos ni suma la columna `pedidos`.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/countplot/1",
        "title": "Contar registros por región y canal",
        "language": "python",
        "code": "sns.countplot(data=ventas, x=\"region\", hue=\"canal\")",
        "hint": "Cada combinación tiene cuatro filas.",
        "textOutput": "Cuatro barras de altura 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/conteos-relativos",
    "remember": "No supone automáticamente un porcentaje dentro de cada categoría de X.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/conteos-relativos/1",
        "title": "Medir la participación de canales",
        "language": "python",
        "code": "sns.countplot(data=ventas, x=\"canal\", stat=\"percent\", color=\"steelblue\")",
        "hint": "Se normaliza el conteo total.",
        "textOutput": "Dos barras de 50 %.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/pointplot",
    "remember": "Las líneas entre categorías no implican continuidad numérica.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/pointplot/1",
        "title": "Comparar medias por región y canal",
        "language": "python",
        "code": "sns.pointplot(data=ventas, x=\"region\", y=\"ingresos\", hue=\"canal\", errorbar=None)",
        "hint": "Cada punto muestra una media de grupo.",
        "textOutput": "Norte: Online 130, Tienda 110; Sur: Online 150, Tienda 130.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/barras-y-conteos/barras-horizontales-y-orden",
    "remember": "Ordena según el objetivo, no necesariamente alfabéticamente.",
    "examples": [
      {
        "id": "seaborn/barras-y-conteos/barras-horizontales-y-orden/1",
        "title": "Mostrar canales en un orden fijo",
        "language": "python",
        "code": "sns.barplot(data=ventas, y=\"canal\", x=\"ingresos\", order=[\"Tienda\", \"Online\"], estimator=\"sum\", errorbar=None, color=\"steelblue\")",
        "hint": "La lista define el orden de las categorías.",
        "textOutput": "Dos barras horizontales: Tienda 960 y Online 1120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
