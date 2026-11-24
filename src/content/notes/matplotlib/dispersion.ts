// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/dispersion/definicion",
    "remember": "Una asociación visual no implica causalidad.",
    "examples": [
      {
        "id": "matplotlib/dispersion/definicion/1",
        "title": "Relacionar publicidad y ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.scatter(publicidad, ventas)",
        "hint": "Cada mes aporta una observación independiente.",
        "textOutput": "Seis puntos con tendencia general ascendente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/dispersion/tamano-color",
    "remember": "Distingue el color fijo (`color`) de los valores mapeados (`c`).",
    "examples": [
      {
        "id": "matplotlib/dispersion/tamano-color/1",
        "title": "Representar ventas, inversión y pedidos",
        "language": "python",
        "code": "fig, ax = plt.subplots()\np = ax.scatter(publicidad, ventas, s=pedidos*5, c=pedidos, cmap='viridis')\nfig.colorbar(p, ax=ax, label='Pedidos')",
        "hint": "El tamaño y el color codifican el conteo de pedidos.",
        "textOutput": "Seis puntos con tamaños variables y una escala de color.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/dispersion/hist2d",
    "remember": "Cada celda contiene el conteo de pares x-y que caen dentro de sus bordes.",
    "examples": [
      {
        "id": "matplotlib/dispersion/hist2d/1",
        "title": "Contar pares de inversión y ventas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nh = ax.hist2d(publicidad, ventas, bins=3)\nfig.colorbar(h[3], ax=ax)\nprint(h[0].sum())",
        "hint": "La matriz de frecuencias está en `h[0]`.",
        "textOutput": "Una rejilla 3 × 3 y salida `6.0`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/dispersion/hexbin",
    "remember": "Usa `mincnt=1` para ocultar celdas vacías en conteos.",
    "examples": [
      {
        "id": "matplotlib/dispersion/hexbin/1",
        "title": "Mostrar densidad de observaciones",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nh = ax.hexbin(publicidad, ventas, gridsize=4, mincnt=1)\nfig.colorbar(h, ax=ax)",
        "hint": "El color expresa cuántas observaciones caen en cada hexágono.",
        "textOutput": "Hexágonos ocupados por los seis pares de datos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
