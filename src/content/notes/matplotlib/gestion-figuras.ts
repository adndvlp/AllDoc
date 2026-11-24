// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/gestion-figuras/definicion",
    "remember": "Conserva referencias explícitas cuando trabajes con varias figuras.",
    "examples": [
      {
        "id": "matplotlib/gestion-figuras/definicion/1",
        "title": "Modificar una línea existente",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nlinea, = ax.plot(meses,ventas)\nlinea.set_ydata(metas)\nax.relim()\nax.autoscale_view()",
        "hint": "La serie se modifica sin crear otra línea.",
        "textOutput": "Una única línea con valores de la meta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/gestion-figuras/figura-ejes-activos",
    "remember": "No dependas del estado activo en composiciones complejas.",
    "examples": [
      {
        "id": "matplotlib/gestion-figuras/figura-ejes-activos/1",
        "title": "Comprobar referencias activas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nprint(plt.gcf() is fig, plt.gca() is ax)",
        "hint": "La figura recién creada está activa.",
        "textOutput": "Salida `True True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/gestion-figuras/limpiar-cerrar",
    "remember": "Limpiar conserva el contenedor correspondiente; cerrar elimina su registro en pyplot.",
    "examples": [
      {
        "id": "matplotlib/gestion-figuras/limpiar-cerrar/1",
        "title": "Limpiar un panel y después la figura",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nplt.cla()\nprint(len(ax.lines))\nplt.clf()\nprint(len(fig.axes))\nplt.close(fig)",
        "hint": "Primero se borran las líneas y luego los ejes de la figura.",
        "textOutput": "Salida `0` y `0`; la figura se cierra.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/gestion-figuras/artists",
    "remember": "Los métodos dependen del tipo de objeto devuelto por cada función.",
    "examples": [
      {
        "id": "matplotlib/gestion-figuras/artists/1",
        "title": "Inspeccionar los tipos de objetos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nlinea, = ax.plot(meses,ventas)\nbarras = ax.bar(meses,ventas,alpha=.2)\npuntos = ax.scatter(meses,ventas)\nprint(type(linea).__name__,type(barras[0]).__name__,type(puntos).__name__)",
        "hint": "Cada función devuelve un objeto o contenedor específico.",
        "textOutput": "Salida `Line2D Rectangle PathCollection`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/gestion-figuras/modificar-artists",
    "remember": "Tras cambiar datos, recalcula límites si es necesario; al retirar un objeto, actualiza la leyenda si procede.",
    "examples": [
      {
        "id": "matplotlib/gestion-figuras/modificar-artists/1",
        "title": "Cambiar y retirar una serie",
        "language": "python",
        "code": "fig, ax = plt.subplots()\na, = ax.plot(meses,ventas)\nb, = ax.plot(meses,metas)\na.set(color='black',linewidth=3)\nprint(a.get_color())\nb.remove()",
        "hint": "La línea de meta desaparece y ventas cambia de estilo.",
        "textOutput": "Salida `black`; queda una sola línea.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
