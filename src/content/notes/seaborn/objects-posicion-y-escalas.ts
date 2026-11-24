// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/definicion",
    "remember": "Las transformaciones se aplican después de los estadísticos, en el orden indicado.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/definicion/1",
        "title": "Separar barras por canal",
        "language": "python",
        "code": "so.Plot(ventas, x=\"region\", y=\"ingresos\", color=\"canal\").add(so.Bar(), so.Agg(\"sum\"), so.Dodge()).show()",
        "hint": "Dodge coloca lado a lado los grupos de color.",
        "textOutput": "Cuatro barras agrupadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/dodge-y-stack",
    "remember": "Apilar sumas tiene sentido cuando representan componentes aditivos.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/dodge-y-stack/1",
        "title": "Apilar totales por región",
        "language": "python",
        "code": "so.Plot(ventas, x=\"region\", y=\"ingresos\", color=\"canal\").add(so.Bar(), so.Agg(\"sum\"), so.Stack()).show()",
        "hint": "Los totales de canales se suman visualmente.",
        "textOutput": "Dos barras apiladas con alturas 960 y 1120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/jitter-y-shift",
    "remember": "No interpretes la posición desplazada como dato original.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/jitter-y-shift/1",
        "title": "Separar puntos de una categoría",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Dot(), so.Jitter(width=.3, seed=42)).show()",
        "hint": "El desplazamiento lateral ayuda a ver observaciones repetidas.",
        "textOutput": "Ocho puntos por canal con desplazamiento horizontal.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/norm",
    "remember": "Revisa qué grupos forman el denominador antes de interpretar proporciones.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/norm/1",
        "title": "Mostrar proporción de registros",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\").add(so.Bar(), so.Count(), so.Norm()).show()",
        "hint": "Cada conteo se divide por la suma global.",
        "textOutput": "Dos barras de 0.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/scale-y-tipos-de-escala",
    "remember": "La escala controla el mapeo, no transforma el DataFrame original.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/scale-y-tipos-de-escala/1",
        "title": "Fijar la escala de color",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\", color=\"canal\").add(so.Dot()).scale(color=so.Nominal(values={\"Online\":\"#2878B5\", \"Tienda\":\"#E69F00\"})).show()",
        "hint": "Se asignan colores por nombre de categoría.",
        "textOutput": "Dos colores estables.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/label-limit-y-theme",
    "remember": "Mantén separada la configuración visual del cálculo estadístico.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/label-limit-y-theme/1",
        "title": "Personalizar barras",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Bar(), so.Agg(\"sum\")).label(x=\"Canal\", y=\"Ingresos\", title=\"Totales\").limit(y=(0, 1300)).theme({\"axes.grid\": True}).show()",
        "hint": "Se etiquetan los ejes y se fija el rango vertical.",
        "textOutput": "Dos barras con escala 0–1300 y título Totales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/shift",
    "remember": "No modifica el dato almacenado.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/shift/1",
        "title": "Desplazar una capa de etiquetas",
        "language": "python",
        "code": "so.Plot(ventas, x=\"canal\", y=\"ingresos\").add(so.Dot()).add(so.Dash(), so.Agg(\"mean\"), so.Shift(x=.2)).show()",
        "hint": "Se desplaza la marca que indica la media.",
        "textOutput": "Puntos y dos segmentos de media desplazados lateralmente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/objects-posicion-y-escalas/escalas-continuas",
    "remember": "Una escala logarítmica requiere valores positivos.",
    "examples": [
      {
        "id": "seaborn/objects-posicion-y-escalas/escalas-continuas/1",
        "title": "Usar escala logarítmica declarativa",
        "language": "python",
        "code": "so.Plot(ventas, x=\"inversion\", y=\"ingresos\").add(so.Dot()).scale(y=so.Continuous(trans=\"log\")).show()",
        "hint": "Se cambia la escala Y, no los ingresos originales.",
        "textOutput": "Puntos con eje Y logarítmico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
