// Generado desde specs/pandas.md por scripts/prepare-pandas-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pandas/visualizacion/definicion",
    "remember": "Agrega y ordena según la pregunta antes de graficar.",
    "note": "Requiere matplotlib; la expresión final comprueba las alturas.",
    "examples": [
      {
        "id": "pandas/visualizacion/definicion/1",
        "title": "Comparar montos por estado",
        "code": "ax = pedidos.groupby('estado')['monto'].sum().plot.bar(title='Monto por estado',ylabel='Monto')\n[p.get_height() for p in ax.patches]",
        "hint": "Una barra por grupo, no por registro sin agregar.",
        "textOutput": "[np.int64(200), np.int64(950)]",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/visualizacion/barras",
    "remember": "Una barra por grupo, no por registro sin agregar.",
    "note": "Requiere matplotlib; la expresión final comprueba las alturas.",
    "examples": [
      {
        "id": "pandas/visualizacion/barras/1",
        "title": "Comparar montos por estado",
        "code": "ax = pedidos.groupby('estado')['monto'].sum().plot.bar(title='Monto por estado',ylabel='Monto')\n[p.get_height() for p in ax.patches]",
        "hint": "Una barra por grupo, no por registro sin agregar.",
        "textOutput": "[np.int64(200), np.int64(950)]",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/visualizacion/lineas",
    "remember": "Usa un índice temporal ordenado.",
    "note": "Requiere matplotlib.",
    "examples": [
      {
        "id": "pandas/visualizacion/lineas/1",
        "title": "Visualizar ventas diarias",
        "code": "ax = diario.plot.line(title='Ventas diarias')\nax.lines[0].get_ydata().tolist()",
        "hint": "Usa un índice temporal ordenado.",
        "textOutput": "[100, 200, 50, 150]",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/visualizacion/histogramas",
    "remember": "El número de intervalos cambia la resolución de la distribución.",
    "note": "Requiere matplotlib.",
    "examples": [
      {
        "id": "pandas/visualizacion/histogramas/1",
        "title": "Visualizar distribución de montos",
        "code": "ax = pedidos['monto'].plot.hist(bins=[0,100,200,300],title='Montos')\n[p.get_height() for p in ax.patches]",
        "hint": "El número de intervalos cambia la resolución de la distribución.",
        "textOutput": "[np.float64(1.0), np.float64(3.0), np.float64(3.0)]",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/visualizacion/dispersion",
    "remember": "La asociación visual no establece causalidad.",
    "note": "Requiere matplotlib.",
    "examples": [
      {
        "id": "pandas/visualizacion/dispersion/1",
        "title": "Comparar cantidad y precio unitario",
        "code": "ax = detalle.plot.scatter(x='cantidad',y='precio_unitario')\nlen(ax.collections[0].get_offsets())",
        "hint": "La asociación visual no establece causalidad.",
        "textOutput": "9",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pandas/visualizacion/caja",
    "remember": "Los bigotes no siempre equivalen al mínimo y máximo.",
    "note": "Requiere matplotlib; la expresión final comprueba la mediana.",
    "examples": [
      {
        "id": "pandas/visualizacion/caja/1",
        "title": "Mostrar distribución de montos",
        "code": "ax = pedidos['monto'].plot.box()\npedidos['monto'].median()",
        "hint": "Los bigotes no siempre equivalen al mínimo y máximo.",
        "textOutput": "150.0",
        "resultLabel": "Ver resultado en pandas 2.2.3",
        "external": true
      }
    ]
  }
];
