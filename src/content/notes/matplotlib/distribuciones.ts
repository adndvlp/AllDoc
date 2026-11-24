// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/definicion",
    "remember": "Las barras representan intervalos, no categorías independientes.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/definicion/1",
        "title": "Distribuir importes de pedidos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.hist(importes, bins=[0, 50, 100, 150])",
        "hint": "Los bordes definen tres intervalos.",
        "textOutput": "Frecuencias 3, 4 y 2 en los tres intervalos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/bins",
    "remember": "Cambiar los intervalos puede cambiar la percepción de la distribución.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/bins/1",
        "title": "Contar pedidos en dos rangos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nn, bordes, _ = ax.hist(importes, bins=[0, 100, 150])\nprint(n)",
        "hint": "El último intervalo incluye su extremo derecho.",
        "textOutput": "Salida `[7. 2.]` y dos barras.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/density",
    "remember": "La altura no es necesariamente una proporción; depende de la anchura del intervalo.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/density/1",
        "title": "Comparar una distribución normalizada",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nn, bordes, _ = ax.hist(importes, bins=[0, 50, 100, 150], density=True)\nprint(round(np.sum(n*np.diff(bordes)), 2))",
        "hint": "Multiplica cada altura por su anchura para obtener su área.",
        "textOutput": "Salida `1.0`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/boxplot",
    "remember": "Por defecto los bigotes llegan a observaciones dentro de 1.5 IQR desde los cuartiles.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/boxplot/1",
        "title": "Detectar importes extremos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.boxplot([10, 12, 13, 14, 15, 16, 80])",
        "hint": "El 80 queda fuera de los bigotes con la regla predeterminada.",
        "textOutput": "Una caja con mediana 14 y un punto atípico en 80.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/violinplot",
    "remember": "La anchura refleja densidad estimada; no el conteo exacto.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/violinplot/1",
        "title": "Comparar dos canales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.violinplot([importes[:4], importes[4:]], showmedians=True)\nax.set_xticks([1, 2], ['A', 'B'])",
        "hint": "Cada violín representa una muestra de importes.",
        "textOutput": "Dos siluetas con sus medianas marcadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/distribuciones/ecdf",
    "remember": "El último escalón alcanza 1 para una muestra válida.",
    "examples": [
      {
        "id": "matplotlib/distribuciones/ecdf/1",
        "title": "Ver la proporción acumulada de pedidos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.ecdf([20, 40, 60, 80])",
        "hint": "Cada observación aporta una cuarta parte.",
        "textOutput": "Escalones que alcanzan 0.25, 0.50, 0.75 y 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
