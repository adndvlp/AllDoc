// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/colores-normalizacion/definicion",
    "remember": "Usa el mismo mapa y los mismos límites para comparar magnitudes entre paneles.",
    "examples": [
      {
        "id": "matplotlib/colores-normalizacion/definicion/1",
        "title": "Colorear ventas con una escala común",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nim = ax.imshow(matriz, cmap='viridis', vmin=0, vmax=100)\nfig.colorbar(im, ax=ax)",
        "hint": "Los límites determinan qué color corresponde a cada valor.",
        "textOutput": "Mapa de calor con una escala de 0 a 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/colores-normalizacion/normalizacion",
    "remember": "No confundas una escala de color logarítmica con un eje logarítmico.",
    "examples": [
      {
        "id": "matplotlib/colores-normalizacion/normalizacion/1",
        "title": "Comparar dos magnitudes con escala lineal",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nnorm = colors.Normalize(vmin=0, vmax=100)\nim = ax.imshow(matriz, norm=norm, cmap='viridis')\nfig.colorbar(im, ax=ax)\nprint(norm(50))",
        "hint": "50 ocupa el centro de la escala de color.",
        "textOutput": "Salida `0.5` y una barra de color.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/colores-normalizacion/normalizacion/2",
        "title": "Distinguir órdenes de magnitud",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nim = ax.imshow([[1,10],[100,1000]], norm=colors.LogNorm(vmin=1,vmax=1000))\nfig.colorbar(im, ax=ax)",
        "hint": "Los factores de 10 ocupan intervalos iguales de color.",
        "textOutput": "Cuatro celdas con escala logarítmica de color.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/colores-normalizacion/mapas-personalizados",
    "remember": "Usa una lista discreta para clases y un gradiente para magnitudes continuas.",
    "examples": [
      {
        "id": "matplotlib/colores-normalizacion/mapas-personalizados/1",
        "title": "Mostrar tres clases de riesgo",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ncmap = colors.ListedColormap(['#2166ac','#f7f7f7','#b2182b'])\nax.imshow([[0,1,2]], cmap=cmap, vmin=0,vmax=2)",
        "hint": "Los códigos 0, 1 y 2 reciben colores distintos.",
        "textOutput": "Tres celdas azul, clara y roja.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/colores-normalizacion/mapas-personalizados/2",
        "title": "Crear un gradiente personalizado",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ncmap = colors.LinearSegmentedColormap.from_list('ventas',['white','navy'])\nim = ax.imshow(matriz,cmap=cmap)\nfig.colorbar(im, ax=ax)",
        "hint": "La intensidad pasa gradualmente de blanco a azul oscuro.",
        "textOutput": "Mapa de calor con gradiente personalizado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/colores-normalizacion/boundary-norm",
    "remember": "Define límites y cantidad de colores compatibles.",
    "examples": [
      {
        "id": "matplotlib/colores-normalizacion/boundary-norm/1",
        "title": "Clasificar ventas por umbrales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ncmap = colors.ListedColormap(['#4575b4','#ffffbf','#d73027'])\nnorm = colors.BoundaryNorm([0,50,75,101], cmap.N)\nim = ax.imshow(matriz,cmap=cmap,norm=norm)\nfig.colorbar(im, ax=ax)",
        "hint": "Los intervalos son [0,50), [50,75) y [75,101).",
        "textOutput": "Tres colores discretos para los niveles de ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
