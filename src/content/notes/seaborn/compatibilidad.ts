// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/compatibilidad/definicion",
    "remember": "Consulta la versión instalada y su documentación correspondiente.",
    "examples": [
      {
        "id": "seaborn/compatibilidad/definicion/1",
        "title": "Consultar el entorno",
        "language": "python",
        "code": "print(sns.__version__)",
        "hint": "La versión ayuda a identificar qué sintaxis usar.",
        "textOutput": "`0.13.2` en el entorno propuesto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/compatibilidad/ci-y-errorbar",
    "remember": "No hagas un reemplazo automático en todas las funciones.",
    "examples": [
      {
        "id": "seaborn/compatibilidad/ci-y-errorbar/1",
        "title": "Desactivar intervalos en la API actual",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", errorbar=None, color=\"steelblue\")",
        "hint": "Sustituye el uso anterior `ci=None` en barplot.",
        "textOutput": "Barras sin intervalos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/compatibilidad/distplot-y-sus-reemplazos",
    "remember": "Elige según la representación estadística que necesites.",
    "examples": [
      {
        "id": "seaborn/compatibilidad/distplot-y-sus-reemplazos/1",
        "title": "Reemplazar distplot",
        "language": "python",
        "code": "sns.histplot(data=ventas, x=\"ingresos\", kde=True, color=\"steelblue\")",
        "hint": "Se conserva la combinación de histograma y densidad.",
        "textOutput": "Barras y curva suavizada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/compatibilidad/cambios-categoricos-en-0-13",
    "remember": "Para asignar una paleta por categoría, define hue explícitamente.",
    "examples": [
      {
        "id": "seaborn/compatibilidad/cambios-categoricos-en-0-13/1",
        "title": "Asignar color por categoría",
        "language": "python",
        "code": "sns.barplot(data=ventas, x=\"canal\", y=\"ingresos\", hue=\"canal\", palette=\"colorblind\", legend=False, errorbar=None)",
        "hint": "El color tiene un mapeo explícito a canal.",
        "textOutput": "Dos barras de colores diferentes sin leyenda redundante.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
