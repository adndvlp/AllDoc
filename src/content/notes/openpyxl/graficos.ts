// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/graficos/definicion",
    "remember": "openpyxl guarda gráficos editables; no los renderiza como imágenes.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/definicion/1",
        "title": "Graficar las unidades",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Un gráfico con una serie Unidades, anclado en I2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos/referencia-de-datos",
    "remember": "Incluye la cabecera solo cuando titles_from_data=True la va a consumir.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/referencia-de-datos/1",
        "title": "Referenciar las unidades sin cabecera",
        "language": "python",
        "code": "from openpyxl.chart import Reference\nr = Reference(ws,min_col=4,min_row=2,max_row=6)\nprint(str(r))",
        "hint": "",
        "textOutput": "'Ventas'!$D$2:$D$6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos/series-y-categorias",
    "remember": "Las categorías deben corresponder con las observaciones de cada serie.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/series-y-categorias/1",
        "title": "Crear una serie y sus categorías",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.set_categories(Reference(ws,min_col=1,min_row=2,max_row=6))\nws.add_chart(graf,'I2')\nprint(len(graf.series))",
        "hint": "",
        "textOutput": "1; las categorías son los IDs 101 a 105.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos/titulos-y-ejes",
    "remember": "No todos los tipos de gráfico tienen ambos ejes.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/titulos-y-ejes/1",
        "title": "Identificar ejes y ocultar leyenda",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.title = 'Unidades por venta'\ngraf.x_axis.title = 'Venta'\ngraf.y_axis.title = 'Unidades'\ngraf.legend = None\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Gráfico con título, ejes identificados y sin leyenda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos/anclaje-y-tamano",
    "remember": "El gráfico se superpone a la cuadrícula, no ocupa celdas como un valor.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/anclaje-y-tamano/1",
        "title": "Ajustar tamaño y posición",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.width = 18\ngraf.height = 9\ngraf.style = 10\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Gráfico de 18 × 9 cm anclado en I2 con estilo 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos/etiquetas-de-datos",
    "remember": "La disponibilidad de etiquetas depende del tipo de gráfico y de Excel.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos/etiquetas-de-datos/1",
        "title": "Mostrar valores sobre las barras",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\nfrom openpyxl.chart.label import DataLabelList\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.dLbls = DataLabelList(showVal=True)\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Las barras mostrarían 2, 5, 1, 3 y 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
