// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/definicion",
    "remember": "Dispersión para relación; líneas para evolución.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/definicion/1",
        "title": "Relacionar inversión e ingresos",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"inversion\", y=\"ingresos\")",
        "hint": "No se unen las observaciones.",
        "textOutput": "Una nube de puntos con asociación positiva.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/scatterplot",
    "remember": "No demuestra causalidad aunque exista un patrón.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/scatterplot/1",
        "title": "Comparar pedidos e ingresos por región",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\", hue=\"region\", alpha=.7)",
        "hint": "La transparencia facilita ver superposiciones.",
        "textOutput": "Nube de puntos diferenciada por región.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/lineplot",
    "remember": "Si quieres totales, agrega antes o utiliza un estimador adecuado.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/lineplot/1",
        "title": "Mostrar ingresos diarios totales",
        "language": "python",
        "code": "sns.lineplot(data=ventas, x=\"fecha\", y=\"ingresos\", estimator=\"sum\", errorbar=None, marker=\"o\")",
        "hint": "La suma sustituye la media por defecto.",
        "textOutput": "Cuatro fechas con 400, 480, 560 y 640.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/orden-y-sort",
    "remember": "Para una serie temporal convierte las fechas al tipo adecuado.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/orden-y-sort/1",
        "title": "Conectar fechas en orden",
        "language": "python",
        "code": "sns.lineplot(data=ventas, x=\"fecha\", y=\"ingresos\", hue=\"canal\", sort=True, errorbar=None)",
        "hint": "El orden de fecha define la evolución.",
        "textOutput": "Dos series cronológicas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/units",
    "remember": "Con `lineplot`, utiliza `estimator=None` cuando pasas `units`.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/units/1",
        "title": "Trazar una línea por tienda",
        "language": "python",
        "code": "sns.lineplot(data=ventas, x=\"fecha\", y=\"ingresos\", hue=\"canal\", units=\"sucursal\", estimator=None)",
        "hint": "La sucursal separa las trayectorias sin crear una leyenda por cada una.",
        "textOutput": "Cuatro líneas agrupadas por canal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/graficos-relacionales/relplot",
    "remember": "`kind=\"scatter\"` o `kind=\"line\"` elige el tipo.",
    "examples": [
      {
        "id": "seaborn/graficos-relacionales/relplot/1",
        "title": "Separar regiones",
        "language": "python",
        "code": "sns.relplot(data=ventas, x=\"fecha\", y=\"ingresos\", hue=\"canal\", col=\"region\", kind=\"line\", errorbar=None)",
        "hint": "Cada región tiene su propio panel.",
        "textOutput": "Dos paneles con dos series cada uno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
