// Generado desde specs/seaborn.md por scripts/prepare-seaborn-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/definicion",
    "remember": "En un DataFrame, los nombres de columnas se pasan como cadenas.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/definicion/1",
        "title": "Elegir columnas",
        "language": "python",
        "code": "sns.scatterplot(data=ventas, x=\"pedidos\", y=\"ingresos\")",
        "hint": "`x` e `y` seleccionan variables del DataFrame.",
        "textOutput": "Un punto por observación de ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/long-form",
    "remember": "Es el formato más flexible para `x`, `y`, `hue`, `row` y `col`.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/long-form/1",
        "title": "Comparar canales",
        "language": "python",
        "code": "sns.lineplot(data=ventas, x=\"fecha\", y=\"ingresos\", hue=\"canal\", errorbar=None)",
        "hint": "El canal es una columna y no un conjunto de columnas independientes.",
        "textOutput": "Una línea por canal con el ingreso medio diario.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/wide-form",
    "remember": "Sin `x` e `y`, varias funciones interpretan `data` como formato ancho.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/wide-form/1",
        "title": "Mostrar series por canal",
        "language": "python",
        "code": "sns.lineplot(data=diarias)",
        "hint": "El índice contiene fechas y cada columna un canal.",
        "textOutput": "Dos líneas de ingresos diarios totales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/melt",
    "remember": "`id_vars` conserva los identificadores; `value_vars` indica las columnas que se transforman.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/melt/1",
        "title": "Convertir ingresos por canal a formato largo",
        "language": "python",
        "code": "largo = diarias.reset_index().melt(id_vars=\"fecha\", var_name=\"canal\", value_name=\"ingresos\")\nsns.lineplot(data=largo, x=\"fecha\", y=\"ingresos\", hue=\"canal\")",
        "hint": "La estructura larga permite mapear el canal a color.",
        "textOutput": "Dos líneas y un DataFrame largo con ocho filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/pivot-y-pivot-table",
    "remember": "Si una combinación se repite, usa `pivot_table` con una agregación explícita.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/pivot-y-pivot-table/1",
        "title": "Crear una matriz de ventas",
        "language": "python",
        "code": "tabla = ventas.pivot_table(index=\"region\", columns=\"canal\", values=\"ingresos\", aggfunc=\"sum\")\nprint(tabla)",
        "hint": "Agrupa los ingresos por región y canal.",
        "textOutput": "Norte: Online 520, Tienda 440; Sur: Online 600, Tienda 520.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/groupby",
    "remember": "Agrega primero si tu pregunta necesita una unidad distinta a la fila original.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/groupby/1",
        "title": "Calcular totales por fecha",
        "language": "python",
        "code": "totales = ventas.groupby(\"fecha\", as_index=False)[\"ingresos\"].sum()\nsns.lineplot(data=totales, x=\"fecha\", y=\"ingresos\", marker=\"o\")",
        "hint": "Cada fecha queda representada por un total calculado previamente.",
        "textOutput": "Cuatro puntos: 400, 480, 560 y 640.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/seaborn/estructura-de-datos/datos-faltantes-y-categorias",
    "remember": "Un nulo no equivale a cero; el orden de categorías puede ser de negocio.",
    "examples": [
      {
        "id": "seaborn/estructura-de-datos/datos-faltantes-y-categorias/1",
        "title": "Excluir ingresos desconocidos",
        "language": "python",
        "code": "limpio = ventas.assign(ingresos=ventas[\"ingresos\"].mask(ventas.index == 0)).dropna(subset=[\"ingresos\"])\nprint(len(limpio))",
        "hint": "Se simula un ingreso faltante sin modificar el dataset original.",
        "textOutput": "15 filas en lugar de 16.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
