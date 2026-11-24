// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/exportacion/definicion",
    "remember": "Guarda la figura concreta con `fig.savefig()`.",
    "examples": [
      {
        "id": "matplotlib/exportacion/definicion/1",
        "title": "Guardar una gráfica de ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nfig.savefig(salida/'ventas.png',dpi=150)",
        "hint": "La ruta pertenece al directorio de ejemplos.",
        "textOutput": "Archivo PNG con la línea de ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/exportacion/dpi",
    "remember": "A mayor DPI, más píxeles para un tamaño físico fijo.",
    "examples": [
      {
        "id": "matplotlib/exportacion/dpi/1",
        "title": "Exportar una figura de 4 por 3 pulgadas",
        "language": "python",
        "code": "fig, ax = plt.subplots(figsize=(4,3))\nax.plot(meses,ventas)\nfig.savefig(salida/'ventas-300.png',dpi=300)",
        "hint": "Sin recorte adicional, multiplica las pulgadas por el DPI.",
        "textOutput": "PNG de 1200 × 900 píxeles con la configuración compartida.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/exportacion/recorte-transparencia",
    "remember": "El recorte puede cambiar las dimensiones finales del archivo.",
    "examples": [
      {
        "id": "matplotlib/exportacion/recorte-transparencia/1",
        "title": "Guardar con fondo transparente y recorte",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(regiones,ventas_region)\nfig.savefig(salida/'regiones.png',bbox_inches='tight',transparent=True)",
        "hint": "El fondo no se pinta como opaco.",
        "textOutput": "PNG con canal alfa y área ajustada al contenido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/exportacion/formatos",
    "remember": "JPG no admite transparencia; SVG y PDF pueden incluir elementos rasterizados.",
    "examples": [
      {
        "id": "matplotlib/exportacion/formatos/1",
        "title": "Exportar en varios formatos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(meses,ventas)\nfor ext in ['png','jpg','svg','pdf']:\n    fig.savefig(salida/f'ventas.{ext}')",
        "hint": "La extensión selecciona el formato en los backends compatibles.",
        "textOutput": "Cuatro archivos con la misma gráfica en formatos diferentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
