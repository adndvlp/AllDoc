// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/graficos-avanzados/definicion",
    "remember": "Verifica que las series tengan sentido en la misma escala.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos-avanzados/definicion/1",
        "title": "Personalizar una serie",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.series[0].graphicalProperties.solidFill = '4472C4'\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Barras azules.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos-avanzados/graficos-apilados",
    "remember": "Usa magnitudes aditivas con la misma unidad.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos-avanzados/graficos-apilados/1",
        "title": "Apilar canales por mes",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\nh = wb.create_sheet('Canales')\nfor r in [('Mes','Tienda','Web'),('Agosto',10,20),('Septiembre',15,25)]:\n    h.append(r)\ngraf = BarChart(grouping='stacked',overlap=100)\ngraf.add_data(Reference(h,min_col=2,max_col=3,min_row=1,max_row=3),titles_from_data=True)\ngraf.set_categories(Reference(h,min_col=1,min_row=2,max_row=3))\nh.add_chart(graf,'E2')",
        "hint": "",
        "textOutput": "Columnas apiladas con totales 30 y 40.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos-avanzados/grafico-combinado",
    "remember": "Etiqueta ambas unidades para no confundir escalas.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos-avanzados/grafico-combinado/1",
        "title": "Combinar unidades y precio",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, LineChart, Reference\nbarras = BarChart()\nbarras.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\nlinea = LineChart()\nlinea.add_data(Reference(ws,min_col=5,min_row=1,max_row=6),titles_from_data=True)\nbarras.y_axis.title = 'Unidades'\nlinea.y_axis.title = 'Precio'\nlinea.y_axis.axId = 200\nbarras.y_axis.crosses = 'max'\nbarras += linea\nws.add_chart(barras,'I2')",
        "hint": "",
        "textOutput": "Gráfico combinado con barras de unidades y línea de precio en ejes distintos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos-avanzados/escalas-y-tendencia",
    "remember": "Elige límites que no oculten datos relevantes; openpyxl no calcula la regresión.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos-avanzados/escalas-y-tendencia/1",
        "title": "Limitar el eje y agregar tendencia",
        "language": "python",
        "code": "from openpyxl.chart import ScatterChart, Reference, Series\nfrom openpyxl.chart.trendline import Trendline\ngraf = ScatterChart()\ns = Series(Reference(ws,min_col=5,min_row=2,max_row=6),Reference(ws,min_col=4,min_row=2,max_row=6))\ns.trendline = Trendline(trendlineType='linear')\ngraf.series.append(s)\ngraf.y_axis.scaling.min = 0\ngraf.y_axis.scaling.max = 1000\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Dispersión con eje Y de 0 a 1000 y tendencia lineal que Excel calcularía.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/graficos-avanzados/hoja-de-grafico",
    "remember": "No es una Worksheet con celdas; usa referencias a otra hoja.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/graficos-avanzados/hoja-de-grafico/1",
        "title": "Crear una pestaña dedicada a un gráfico",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\nhoja = wb.create_chartsheet('GraficoVentas')\nhoja.add_chart(graf)\nprint(wb.sheetnames)",
        "hint": "",
        "textOutput": "['Ventas', 'Resumen', 'GraficoVentas'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
