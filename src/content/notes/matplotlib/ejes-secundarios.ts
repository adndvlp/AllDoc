// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/ejes-secundarios/definicion",
    "remember": "No interpretes el cruce de líneas con unidades distintas como igualdad numérica.",
    "examples": [
      {
        "id": "matplotlib/ejes-secundarios/definicion/1",
        "title": "Mostrar ventas y conversión",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas,color='tab:blue')\nb = ax.twinx()\nb.plot(meses,conversion,color='tab:orange')\nax.set_ylabel('Ventas')\nb.set_ylabel('Conversión')",
        "hint": "Ambas series comparten x, pero tienen escalas y independientes.",
        "textOutput": "Un eje izquierdo de ventas y otro derecho de conversión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-secundarios/twinx-twiny",
    "remember": "Etiqueta ambas escalas y evita comparar sus alturas directamente.",
    "examples": [
      {
        "id": "matplotlib/ejes-secundarios/twinx-twiny/1",
        "title": "Añadir un eje superior independiente",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3],[10,20,30])\nb = ax.twiny()\nb.set_xlim(0,100)\nb.set_xlabel('Índice alternativo')",
        "hint": "El eje superior tiene sus propios límites x.",
        "textOutput": "Dos ejes horizontales con un eje y compartido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/ejes-secundarios/secondary-axis",
    "remember": "Proporciona una función de ida y otra de vuelta.",
    "examples": [
      {
        "id": "matplotlib/ejes-secundarios/secondary-axis/1",
        "title": "Mostrar horas y minutos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3],[10,20,30])\nax.set_xlabel('Horas')\nsec = ax.secondary_xaxis('top',functions=(lambda h:h*60,lambda m:m/60))\nsec.set_xlabel('Minutos')",
        "hint": "60 minutos equivalen a una hora en las dos escalas.",
        "textOutput": "Eje superior en minutos e inferior en horas.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/ejes-secundarios/secondary-axis/2",
        "title": "Mostrar miles de pesos y pesos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones,ventas_region)\nsec = ax.secondary_yaxis('right',functions=(lambda k:k*1000,lambda p:p/1000))\nsec.set_ylabel('MXN')",
        "hint": "La escala derecha equivale a la izquierda multiplicada por 1000.",
        "textOutput": "Dos escalas verticales equivalentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
