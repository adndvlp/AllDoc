// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/definicion",
    "remember": "Destaca lo que aporta información, no cada elemento por defecto.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/definicion/1",
        "title": "Mostrar una meta comercial",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas,marker='o')\nax.axhline(180,linestyle='--',label='Meta')\nax.legend()",
        "hint": "La línea horizontal representa una referencia constante.",
        "textOutput": "Una línea de ventas y otra de meta a 180.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/text",
    "remember": "La posición se interpreta en coordenadas de los datos salvo que se indique otra transformación.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/text/1",
        "title": "Etiquetar el último mes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nax.text(5,210,'210',ha='right',va='bottom')",
        "hint": "La posición categórica 5 corresponde a junio.",
        "textOutput": "Texto 210 junto al punto de junio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/annotate",
    "remember": "`xy` apunta al dato y `xytext` ubica la etiqueta.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/annotate/1",
        "title": "Destacar el máximo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas,marker='o')\nax.annotate('Máximo',xy=(5,210),xytext=(3.5,220),arrowprops={'arrowstyle':'->'})",
        "hint": "La flecha apunta a junio.",
        "textOutput": "Una anotación Máximo sobre el último punto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/bar-label",
    "remember": "Guarda el resultado de `bar()` o `barh()` para pasarlo a `bar_label()`.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/bar-label/1",
        "title": "Mostrar el valor sobre cada barra",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nb = ax.bar(regiones,ventas_region)\nax.bar_label(b,padding=3)\nax.set_ylim(0,280)",
        "hint": "El espacio superior evita que se recorten etiquetas.",
        "textOutput": "Etiquetas 240, 180 y 120 sobre las barras.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/lineas-referencia",
    "remember": "Sus extremos por defecto abarcan el panel, no un rango de datos específico.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/lineas-referencia/1",
        "title": "Marcar una meta y un cambio",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nax.axhline(180,color='gray',linestyle='--')\nax.axvline(3,color='gray',linestyle=':')",
        "hint": "La posición 3 corresponde a abril.",
        "textOutput": "Referencias en y=180 y x=abril.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/segmentos-referencia",
    "remember": "Usa estas funciones cuando necesites limitar la longitud de las referencias.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/segmentos-referencia/1",
        "title": "Mostrar segmentos de control",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([0,1,2,3],[10,20,15,30])\nax.hlines([12,25],xmin=0,xmax=2)\nax.vlines([1,3],ymin=0,ymax=[20,30])",
        "hint": "Los extremos se expresan en las unidades de cada eje.",
        "textOutput": "Dos segmentos horizontales y dos verticales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/anotaciones/regiones-destacadas",
    "remember": "Las franjas cubren por defecto toda la extensión perpendicular del panel.",
    "examples": [
      {
        "id": "matplotlib/anotaciones/regiones-destacadas/1",
        "title": "Destacar periodo y rango objetivo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nax.axhspan(150,180,alpha=.15)\nax.axvspan(2,3,alpha=.1)",
        "hint": "La franja vertical abarca marzo a abril.",
        "textOutput": "Una banda horizontal de 150 a 180 y una vertical entre ambos meses.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
