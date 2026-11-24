// Generado desde specs/matplotlib.md por scripts/prepare-matplotlib-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/definicion",
    "remember": "Prepara los datos primero; visualiza después.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/definicion/1",
        "title": "Dibujar una columna del DataFrame",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot(df['mes'],df['ventas'])",
        "hint": "Cada fila del DataFrame aporta un punto.",
        "textOutput": "La línea de las seis ventas mensuales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/arrays-numpy",
    "remember": "Los arrays x e y de una serie deben tener dimensiones compatibles.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/arrays-numpy/1",
        "title": "Calcular la desviación respecto a la meta",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.bar(meses,ventas-metas)\nax.axhline(0,color='gray')",
        "hint": "La resta calcula la diferencia mes a mes.",
        "textOutput": "Barras de -10, 10, -20, 10, -20 y 20.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/dataframe-plot",
    "remember": "Pasa `ax` para controlar la ubicación de la gráfica.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/dataframe-plot/1",
        "title": "Dibujar ventas y metas desde columnas",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ndf.plot(x='mes',y=['ventas','meta'],ax=ax,kind='line')",
        "hint": "Pandas envía las dos columnas al mismo panel.",
        "textOutput": "Dos líneas y una leyenda con los nombres de las columnas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/series-plot",
    "remember": "Configura el índice cuando quieras que aparezcan nombres de categorías.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/series-plot/1",
        "title": "Dibujar ventas regionales",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ns = pd.Series(ventas_region,index=regiones)\ns.plot(kind='bar',ax=ax)",
        "hint": "El índice contiene los nombres de regiones.",
        "textOutput": "Barras de 240, 180 y 120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/preparacion-datos",
    "remember": "Una barra debe representar la unidad de análisis que indica su etiqueta.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/preparacion-datos/1",
        "title": "Resumir transacciones por región",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ntotales = transacciones.groupby('region')['importe'].sum().sort_values(ascending=False)\nax.bar(totales.index,totales.values)",
        "hint": "Se suman las transacciones antes de dibujar.",
        "textOutput": "Barras Norte 240, Centro 180 y Sur 120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/datos-faltantes",
    "remember": "No reemplaces automáticamente un faltante por cero: significan cosas diferentes.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/datos-faltantes/1",
        "title": "Mostrar una ausencia de información",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nax.plot([1,2,3,4],[120,np.nan,150,180],marker='o')",
        "hint": "El segundo dato no se dibuja ni se conecta a través de la ausencia.",
        "textOutput": "Un punto aislado en x=1 y un tramo entre x=3 y x=4.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "matplotlib/numpy-pandas/datos-faltantes/2",
        "title": "Ocultar observaciones por condición",
        "language": "python",
        "code": "fig, ax = plt.subplots()\nserie = np.ma.masked_where(ventas<150,ventas)\nax.plot(meses,serie,marker='o')",
        "hint": "La máscara excluye los valores menores a 150.",
        "textOutput": "Cuatro puntos visibles; la línea se interrumpe donde faltan datos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/matplotlib/numpy-pandas/correlacion",
    "remember": "Los coeficientes de Pearson están entre -1 y 1; correlación no implica causalidad.",
    "examples": [
      {
        "id": "matplotlib/numpy-pandas/correlacion/1",
        "title": "Visualizar correlaciones",
        "language": "python",
        "code": "fig, ax = plt.subplots()\ncorr = df[['ventas','meta','publicidad']].corr()\nim = ax.imshow(corr,vmin=-1,vmax=1,cmap='coolwarm')\nax.set_xticks(range(3),corr.columns)\nax.set_yticks(range(3),corr.columns)\nfig.colorbar(im,ax=ax)",
        "hint": "La escala simétrica permite distinguir signos.",
        "textOutput": "Matriz 3 × 3 simétrica con diagonal igual a 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
