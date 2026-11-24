// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/definicion",
    "remember": "Importa `pyplot` como `plt`; proporciona los datos y muestra la figura.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/definicion/1",
        "title": "Mostrar la evolución de ventas",
        "language": "python",
        "code": "plt.plot(meses, ventas)\nplt.show()",
        "hint": "Cada posición de `meses` se relaciona con el valor de `ventas` del mismo índice. En AllDoc la gráfica aparece en Resultado y se puede descargar en PNG.",
        "textOutput": "Una línea con seis puntos, de enero (120) a junio (210).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/figure-axes-axis",
    "remember": "Una figura puede tener varios `Axes`; cada `Axes` cartesiano normalmente tiene `xaxis` y `yaxis`.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/figure-axes-axis/1",
        "title": "Identificar los componentes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nprint(type(fig).__name__, type(ax).__name__, type(ax.xaxis).__name__)",
        "hint": "`ax.xaxis` es el eje horizontal, no toda la gráfica.",
        "textOutput": "Una línea y salida `Figure Axes XAxis` (el nombre concreto de Axes puede variar según versión).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/figure-figsize",
    "remember": "El tamaño físico y el DPI determinan el tamaño en píxeles de una salida rasterizada.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/figure-figsize/1",
        "title": "Crear un lienzo ancho",
        "language": "python",
        "code": "fig = plt.figure(figsize=(8, 3))\nax = fig.add_subplot(111)\nax.plot(meses, ventas)",
        "hint": "`(8, 3)` controla las dimensiones del lienzo.",
        "textOutput": "Una gráfica en una figura de 8 × 3 pulgadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/subplots",
    "remember": "Con un solo panel, devuelve `(fig, ax)`.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/subplots/1",
        "title": "Crear una figura y su gráfica",
        "language": "python",
        "code": "fig, ax = plt.subplots(figsize=(6, 3))\nax.plot(meses, ventas)",
        "hint": "El objeto `ax` recibe las instrucciones de dibujo.",
        "textOutput": "Una gráfica de ventas de seis meses.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/pyplot-y-objetos",
    "remember": "Usa `ax` cuando necesites controlar varios paneles sin ambigüedad.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/pyplot-y-objetos/1",
        "title": "Dibujar con pyplot",
        "language": "python",
        "code": "plt.figure()\nplt.plot(meses, ventas)\nplt.title('Ventas')\nplt.show()",
        "hint": "`plt.title()` afecta a los ejes activos.",
        "textOutput": "Una figura titulada Ventas.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/fundamentos/pyplot-y-objetos/2",
        "title": "Dibujar con Axes",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nax.set_title('Ventas')",
        "hint": "La referencia `ax` indica exactamente dónde se dibuja.",
        "textOutput": "Una figura equivalente a la anterior.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/fundamentos/show-close",
    "remember": "En un script guarda antes de un `show()` bloqueante; cierra las figuras que ya no necesitas.",
    "examples": [
      {
        "id": "matplotlib/fundamentos/show-close/1",
        "title": "Mostrar y cerrar una figura",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses, ventas)\nplt.show()\nplt.close(fig)",
        "hint": "`close(fig)` cierra esa figura, no las demás.",
        "textOutput": "Se presenta la gráfica si hay un backend gráfico; al cerrar deja de estar registrada en pyplot.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
