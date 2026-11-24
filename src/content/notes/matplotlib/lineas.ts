// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/lineas/definicion",
    "remember": "Ordena primero los datos cuando el eje represente tiempo.",
    "examples": [
      {
        "id": "matplotlib/lineas/definicion/1",
        "title": "Mostrar las ventas mensuales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)",
        "hint": "El eje x sigue el orden de los meses.",
        "textOutput": "Una línea con valores 120, 150, 130, 180, 160 y 210.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/lineas/varias-series",
    "remember": "Cada serie tiene sus propios valores y puede tener una etiqueta.",
    "examples": [
      {
        "id": "matplotlib/lineas/varias-series/1",
        "title": "Comparar ventas y meta",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, label='Ventas')\nax.plot(meses, metas, label='Meta')\nax.legend()",
        "hint": "`label` identifica cada serie en la leyenda.",
        "textOutput": "Dos líneas, una de ventas y otra de metas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/lineas/step-stairs",
    "remember": "En `stairs` hay un borde más que alturas.",
    "examples": [
      {
        "id": "matplotlib/lineas/step-stairs/1",
        "title": "Mostrar una tarifa por intervalo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.stairs([10, 20, 15], [0, 1, 2, 3])",
        "hint": "Los bordes delimitan tres intervalos consecutivos.",
        "textOutput": "Tres tramos horizontales con alturas 10, 20 y 15.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/lineas/step-stairs/2",
        "title": "Mostrar cambios desde cada mes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.step(meses, ventas, where='post')",
        "hint": "`where='post'` mantiene el valor hasta el siguiente punto.",
        "textOutput": "Una línea escalonada con cambios en las posiciones mensuales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/lineas/stem",
    "remember": "No une valores consecutivos con una curva.",
    "examples": [
      {
        "id": "matplotlib/lineas/stem/1",
        "title": "Mostrar pedidos discretos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.stem([1, 2, 3], [4, 7, 3])",
        "hint": "Cada tallo representa un conteo.",
        "textOutput": "Tres tallos con alturas 4, 7 y 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
