// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/objects-composicion/definicion",
    "remember": "`facet()` separa subconjuntos y `pair()` repite el gráfico para diferentes variables.",
    "examples": [
      {
        "id": "seaborn/objects-composicion/definicion/1",
        "title": "Comparar regiones",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\").facet(col=\"region\").add(so.Dot()).show()",
        "hint": "Se crea un panel por región.",
        "textOutput": "Dos dispersiones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-composicion/facet-y-layout",
    "remember": "`layout(size=(ancho, alto))` usa pulgadas.",
    "examples": [
      {
        "id": "seaborn/objects-composicion/facet-y-layout/1",
        "title": "Comparar cuatro sucursales",
        "language": "python",
        "code": "so.Plot(ventas, x=\"fecha\", y=\"ingresos\").facet(col=\"sucursal\", wrap=2).add(so.Line()).layout(size=(8, 6)).show()",
        "hint": "Se distribuyen cuatro facetas en dos columnas.",
        "textOutput": "Cuadrícula 2 × 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-composicion/pair",
    "remember": "Especifica listas para controlar las combinaciones.",
    "examples": [
      {
        "id": "seaborn/objects-composicion/pair/1",
        "title": "Comparar predictores de ingresos",
        "language": "python",
        "code": "so.Plot(ventas, y=\"ingresos\").pair(x=[\"inversion\", \"pedidos\"]).add(so.Dot()).show()",
        "hint": "Se repite el gráfico para cada variable X.",
        "textOutput": "Dos dispersiones con ingresos en Y.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-composicion/show-save-y-on",
    "remember": "Objects no devuelve un Axes del mismo modo que scatterplot.",
    "examples": [
      {
        "id": "seaborn/objects-composicion/show-save-y-on/1",
        "title": "Exportar gráfico declarativo",
        "language": "python",
        "code": "p = so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Bar(), so.Agg(\"sum\"))\np.save(\"totales-objects.png\", dpi=150)\np.show()",
        "hint": "Se reutiliza la misma especificación para mostrar y exportar.",
        "textOutput": "Archivo PNG y gráfico de dos barras.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
