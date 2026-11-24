// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/definicion",
    "remember": "Cada panel tiene su propio `Axes`; configura títulos y escalas según su función.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/definicion/1",
        "title": "Combinar ventas y distribución",
        "language": "python",
        "code": "fig, axs = plt.subplots(1,2,figsize=(8,3),layout='constrained')\naxs[0].plot(meses,ventas)\naxs[1].hist(importes)",
        "hint": "`axs[0]` y `axs[1]` son dos regiones distintas.",
        "textOutput": "Una línea y un histograma lado a lado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/subplot-subplots",
    "remember": "`subplot` usa posiciones desde 1; los índices del array de `subplots` empiezan en 0.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/subplot-subplots/1",
        "title": "Crear dos paneles con pyplot",
        "language": "python",
        "code": "plt.figure(figsize=(6,4))\nplt.subplot(2,1,1)\nplt.plot(meses,ventas)\nplt.subplot(2,1,2)\nplt.bar(regiones,ventas_region)",
        "hint": "Cada llamada selecciona una posición de una rejilla de 2 filas y 1 columna.",
        "textOutput": "Dos gráficas colocadas verticalmente.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/composicion-figuras/subplot-subplots/2",
        "title": "Acceder a una rejilla de paneles",
        "language": "python",
        "code": "fig, axs = plt.subplots(nrows=2,ncols=2,squeeze=False)\naxs[0,0].plot(meses,ventas)\naxs[1,1].bar(regiones,ventas_region)",
        "hint": "`squeeze=False` mantiene el array bidimensional.",
        "textOutput": "Dos paneles con datos y dos vacíos en una rejilla de cuatro.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/ejes-compartidos",
    "remember": "Comparte escalas cuando las variables y unidades sean comparables.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/ejes-compartidos/1",
        "title": "Comparar dos series con la misma escala",
        "language": "python",
        "code": "fig, axs = plt.subplots(2,1,sharex=True,sharey=True)\naxs[0].plot(meses,ventas)\naxs[1].plot(meses,metas)\naxs[0].set_ylim(0,250)",
        "hint": "El límite vertical se aplica a ambos paneles.",
        "textOutput": "Dos líneas con la misma escala de 0 a 250 y eje temporal compartido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/gridspec",
    "remember": "Las selecciones de celdas usan índices de Python desde cero.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/gridspec/1",
        "title": "Crear un panel principal ancho",
        "language": "python",
        "code": "fig = plt.figure(layout='constrained')\ngs = fig.add_gridspec(2,2)\na = fig.add_subplot(gs[0,:])\na.plot(meses,ventas)\nfig.add_subplot(gs[1,0]).bar(regiones,ventas_region)\nfig.add_subplot(gs[1,1]).hist(importes)",
        "hint": "El primer panel ocupa ambas columnas de la fila superior.",
        "textOutput": "Tres paneles: uno ancho arriba y dos pequeños abajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/subplot-mosaic",
    "remember": "Repite un nombre en celdas contiguas para crear un panel más grande.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/subplot-mosaic/1",
        "title": "Organizar un reporte por nombre",
        "language": "python",
        "code": "fig, axd = plt.subplot_mosaic([['ventas','ventas'],['region','pedidos']],layout='constrained')\naxd['ventas'].plot(meses,ventas)\naxd['region'].bar(regiones,ventas_region)\naxd['pedidos'].hist(importes)",
        "hint": "Los nombres permiten acceder a los paneles sin índices numéricos.",
        "textOutput": "Un panel ancho arriba y dos abajo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/crear-ejes-manualmente",
    "remember": "En `add_axes`, los cuatro valores son izquierda, abajo, ancho y alto como fracciones de la figura.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/crear-ejes-manualmente/1",
        "title": "Añadir una gráfica pequeña",
        "language": "python",
        "code": "fig = plt.figure()\nax = fig.add_subplot(111)\nax.plot(meses,ventas)\nmini = fig.add_axes([.58,.23,.22,.25])\nmini.bar(['A','B'],[3,5])",
        "hint": "El segundo panel se coloca en una región explícita del lienzo.",
        "textOutput": "Una línea y una gráfica de barras pequeña superpuesta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/subfigures",
    "remember": "Una subfigura comparte el lienzo principal pero organiza sus elementos internos.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/subfigures/1",
        "title": "Separar dos bloques de un informe",
        "language": "python",
        "code": "fig = plt.figure(layout='constrained')\na,b = fig.subfigures(1,2)\na.suptitle('Comercial')\na.subplots().plot(meses,ventas)\nb.suptitle('Pedidos')\nb.subplots().hist(importes)",
        "hint": "Cada subfigura tiene su título y su panel.",
        "textOutput": "Dos bloques titulados Comercial y Pedidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/composicion-figuras/espaciado",
    "remember": "Elige un método; no mezcles `tight_layout()` con layout constrained.",
    "examples": [
      {
        "id": "matplotlib/composicion-figuras/espaciado/1",
        "title": "Ajustar automáticamente dos paneles",
        "language": "python",
        "code": "fig, axs = plt.subplots(1,2,layout='constrained')\naxs[0].bar(meses,ventas)\naxs[1].hist(importes)\naxs[0].tick_params(axis='x',labelrotation=45)",
        "hint": "Constrained reserva espacio para las etiquetas.",
        "textOutput": "Dos paneles con espacio para las marcas rotadas.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/composicion-figuras/espaciado/2",
        "title": "Ajustar una figura después de dibujar",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(meses,ventas)\nax.tick_params(axis='x',labelrotation=45)\nfig.tight_layout()",
        "hint": "El ajuste se calcula con las decoraciones existentes.",
        "textOutput": "Etiquetas rotadas con margen inferior ajustado.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/composicion-figuras/espaciado/3",
        "title": "Fijar márgenes a mano",
        "language": "python",
        "code": "fig, axs = plt.subplots(2,1)\naxs[0].plot(meses,ventas)\naxs[1].plot(meses,metas)\nfig.subplots_adjust(hspace=.5,bottom=.15)",
        "hint": "`hspace` aumenta la separación entre filas.",
        "textOutput": "Dos paneles con separación vertical mayor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
