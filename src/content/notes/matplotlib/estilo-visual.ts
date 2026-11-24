// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/definicion",
    "remember": "Usa estilos consistentes y reserva el énfasis para información importante.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/definicion/1",
        "title": "Destacar las ventas reales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, color='tab:blue', linewidth=2, marker='o')\nax.plot(meses, metas, color='gray', linestyle='--')",
        "hint": "La línea de ventas se distingue de la referencia.",
        "textOutput": "Una serie azul con puntos y una meta gris discontinua.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/color-alpha",
    "remember": "Una opacidad menor facilita ver superposiciones.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/color-alpha/1",
        "title": "Atenuar los puntos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.scatter(publicidad, ventas, color='#167D9A', alpha=.4)",
        "hint": "Los puntos tienen 40 % de opacidad.",
        "textOutput": "Seis marcadores semitransparentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/estilo-lineas",
    "remember": "Combina patrones con color para distinguir series.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/estilo-lineas/1",
        "title": "Separar una serie de su objetivo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, linestyle='-', linewidth=2)\nax.plot(meses, metas, linestyle=':', linewidth=1)",
        "hint": "La línea continua es más gruesa que la punteada.",
        "textOutput": "Dos líneas visualmente diferenciadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/marcadores",
    "remember": "En `scatter`, `s` representa área en puntos cuadrados, no el mismo tamaño lineal.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/marcadores/1",
        "title": "Marcar las observaciones",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, marker='s', markersize=7)",
        "hint": "Cada observación tiene un marcador cuadrado.",
        "textOutput": "Seis cuadrados conectados por una línea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/tipografia-basica",
    "remember": "Da mayor jerarquía al título que a las etiquetas secundarias.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/tipografia-basica/1",
        "title": "Destacar el título",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_title('Ventas', fontsize=15, fontweight='bold')\nax.set_ylabel('Miles de MXN', fontsize=10)",
        "hint": "El título es más grande y está en negrita.",
        "textOutput": "Un título de 15 puntos y una etiqueta de 10 puntos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/bordes-y-rellenos",
    "remember": "Las tramas ayudan a distinguir categorías sin depender del color.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/bordes-y-rellenos/1",
        "title": "Resaltar el contorno de las barras",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones, ventas_region, facecolor='white', edgecolor='black', hatch='//')",
        "hint": "El patrón diagonal rellena cada barra.",
        "textOutput": "Tres barras blancas con contornos y rayas negras.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/estilo-visual/zorder",
    "remember": "Ajusta las capas si una referencia oculta los datos.",
    "examples": [
      {
        "id": "matplotlib/estilo-visual/zorder/1",
        "title": "Poner puntos encima de una línea",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas, zorder=1)\nax.scatter(meses, ventas, zorder=3)",
        "hint": "Los puntos se dibujan sobre la línea.",
        "textOutput": "Seis marcadores visibles encima de la línea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
