// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/transformaciones-formas/definicion",
    "remember": "Elige coordenadas de datos para valores y relativas para elementos fijos de presentación.",
    "examples": [
      {
        "id": "matplotlib/transformaciones-formas/definicion/1",
        "title": "Colocar una nota fija en un panel",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nax.text(.02,.95,'Reporte',transform=ax.transAxes,va='top')",
        "hint": "En coordenadas de Axes, (0,0) es abajo a la izquierda y (1,1) arriba a la derecha.",
        "textOutput": "Texto en la esquina superior izquierda del área de dibujo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/transformaciones-formas/coordenadas",
    "remember": "Un texto en coordenadas relativas permanece en esa zona aunque cambien los límites de datos.",
    "examples": [
      {
        "id": "matplotlib/transformaciones-formas/coordenadas/1",
        "title": "Comparar tres sistemas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([0,1,2],[10,20,30])\nax.text(1,20,'Dato',transform=ax.transData)\nax.text(.02,.9,'Panel',transform=ax.transAxes)\nfig.text(.02,.02,'Figura',transform=fig.transFigure)",
        "hint": "Cada texto usa un sistema de referencia diferente.",
        "textOutput": "Texto sobre el punto central, dentro del panel y en la esquina de la figura.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/transformaciones-formas/formas",
    "remember": "Las coordenadas por defecto se interpretan como datos; usa aspecto igual para círculos sin deformación.",
    "examples": [
      {
        "id": "matplotlib/transformaciones-formas/formas/1",
        "title": "Añadir formas de referencia",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.add_patch(Rectangle((0,0),2,1,fill=False))\nax.add_patch(Circle((3,1),.5,fill=False))\nax.add_patch(Polygon([[4,0],[5,0],[4.5,1]],fill=False))\nax.set_xlim(-.5,6)\nax.set_ylim(-.5,2)\nax.set_aspect('equal')",
        "hint": "Los parámetros definen posición y dimensiones de las formas.",
        "textOutput": "Un rectángulo, un círculo y un triángulo visibles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
