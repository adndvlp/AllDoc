// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/definicion",
    "remember": "La clase determina las opciones de series, ejes y presentación.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/definicion/1",
        "title": "Representar las unidades con líneas",
        "language": "python",
        "code": "from openpyxl.chart import LineChart, Reference\ngraf = LineChart()\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Gráfico de líneas de unidades.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/barras",
    "remember": "type='bar' horizontal; type='col' vertical.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/barras/1",
        "title": "Comparar unidades con barras horizontales",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\ngraf = BarChart()\ngraf.type = 'bar'\ngraf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\ngraf.set_categories(Reference(ws,min_col=1,min_row=2,max_row=6))\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Cinco barras horizontales de 2, 5, 1, 3 y 2 unidades.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/lineas-y-areas",
    "remember": "Ordena los datos cronológicamente y usa fechas reales cuando corresponda.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/lineas-y-areas/1",
        "title": "Mostrar la evolución de unidades",
        "language": "python",
        "code": "from openpyxl.chart import LineChart, AreaChart, Reference\nfor clase,ancla in [(LineChart,'I2'),(AreaChart,'I18')]:\n    graf = clase()\n    graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)\n    graf.set_categories(Reference(ws,min_col=6,min_row=2,max_row=6))\n    ws.add_chart(graf,ancla)",
        "hint": "",
        "textOutput": "Dos gráficos de evolución de unidades entre el 1 y el 5 de agosto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/pastel-y-dona",
    "remember": "Agrega categorías repetidas antes de graficar.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/pastel-y-dona/1",
        "title": "Mostrar la participación de cada producto",
        "language": "python",
        "code": "from openpyxl.chart import PieChart, DoughnutChart, Reference\nresumen.append(['Laptop',3])\nresumen.append(['Mouse',7])\nresumen.append(['Teclado',3])\nfor clase,ancla in [(PieChart,'D2'),(DoughnutChart,'D18')]:\n    graf = clase()\n    graf.add_data(Reference(resumen,min_col=2,min_row=3,max_row=5))\n    graf.set_categories(Reference(resumen,min_col=1,min_row=3,max_row=5))\n    resumen.add_chart(graf,ancla)",
        "hint": "",
        "textOutput": "Dos gráficos de la distribución 3, 7 y 3 unidades por producto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/dispersion",
    "remember": "No uses set_categories como sustituto de los valores X de una dispersión.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/dispersion/1",
        "title": "Relacionar precio y unidades",
        "language": "python",
        "code": "from openpyxl.chart import ScatterChart, Reference, Series\ngraf = ScatterChart()\nx = Reference(ws,min_col=4,min_row=2,max_row=6)\ny = Reference(ws,min_col=5,min_row=2,max_row=6)\ngraf.series.append(Series(y,x,title='Precio y unidades'))\nws.add_chart(graf,'I2')",
        "hint": "",
        "textOutput": "Puntos (2,800), (5,20), (1,800), (3,50), (2,20).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/burbujas",
    "remember": "Cada serie requiere X, Y y tamaño con igual número de observaciones.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/burbujas/1",
        "title": "Dimensionar puntos por importe",
        "language": "python",
        "code": "from openpyxl.chart import BubbleChart, Reference, Series\nfor r in range(2,7):\n    ws.cell(r,8,ws.cell(r,4).value*ws.cell(r,5).value)\ngraf = BubbleChart()\nx = Reference(ws,min_col=4,min_row=2,max_row=6)\ny = Reference(ws,min_col=5,min_row=2,max_row=6)\nz = Reference(ws,min_col=8,min_row=2,max_row=6)\ngraf.series.append(Series(values=y,xvalues=x,zvalues=z,title='Importe'))\nws.add_chart(graf,'J2')",
        "hint": "",
        "textOutput": "Cinco burbujas con tamaño proporcional al importe de cada venta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/radar",
    "remember": "Usa magnitudes comparables para evitar distorsiones.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/radar/1",
        "title": "Comparar métricas de servicio",
        "language": "python",
        "code": "from openpyxl.chart import RadarChart, Reference\nresumen.append(['Calidad',80])\nresumen.append(['Servicio',90])\nresumen.append(['Velocidad',70])\ngraf = RadarChart()\ngraf.add_data(Reference(resumen,min_col=2,min_row=3,max_row=5))\ngraf.set_categories(Reference(resumen,min_col=1,min_row=3,max_row=5))\nresumen.add_chart(graf,'D2')",
        "hint": "",
        "textOutput": "Perfil de tres métricas: 80, 90 y 70.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/financiero-y-superficie",
    "remember": "El orden de series financieras importa; no basta convertir cualquier gráfico a StockChart.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/financiero-y-superficie/1",
        "title": "Crear un gráfico financiero y una superficie",
        "language": "python",
        "code": "from openpyxl.chart import StockChart, SurfaceChart, Reference\nh = wb.create_sheet(\"Mercado\")\nfor r in [(\"Dia\",\"Apertura\",\"Maximo\",\"Minimo\",\"Cierre\"),(1,100,110,95,105),(2,105,115,100,112)]:\n    h.append(r)\ngraf = StockChart()\ngraf.add_data(Reference(h,min_col=2,max_col=5,min_row=1,max_row=3),titles_from_data=True)\ngraf.set_categories(Reference(h,min_col=1,min_row=2,max_row=3))\nfrom openpyxl.chart.updown_bars import UpDownBars\nfrom openpyxl.chart.axis import ChartLines\ngraf.upDownBars = UpDownBars()\ngraf.hiLowLines = ChartLines()\nh.add_chart(graf,\"G2\")\nm = wb.create_sheet(\"Matriz\")\nfor r in [(\"Mes\",\"Norte\",\"Sur\"),(\"Agosto\",10,20),(\"Septiembre\",15,25)]:\n    m.append(r)\ns = SurfaceChart()\ns.add_data(Reference(m,min_col=2,max_col=3,min_row=1,max_row=3),titles_from_data=True)\ns.set_categories(Reference(m,min_col=1,min_row=2,max_row=3))\nm.add_chart(s,\"E2\")",
        "hint": "",
        "textOutput": "Dos gráficos guardables: OHLC con dos sesiones y una superficie con matriz 2 × 2. La representación final del gráfico financiero depende de Excel.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tipos-de-graficos/histograma",
    "remember": "Este procedimiento produce un gráfico de barras de frecuencias, no el tipo moderno nativo Histogram de Excel.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/tipos-de-graficos/histograma/1",
        "title": "Graficar las frecuencias de precio",
        "language": "python",
        "code": "from openpyxl.chart import BarChart, Reference\nprecios = [r[4] for r in ws.iter_rows(min_row=2,values_only=True)]\nh = wb.create_sheet('Frecuencias')\nh.append(['Intervalo','Frecuencia'])\nfor a,b in [(0,100),(100,500),(500,1000)]:\n    h.append([f'{a}-{b}',sum(a<=v<b for v in precios)])\ngraf = BarChart()\ngraf.add_data(Reference(h,min_col=2,min_row=1,max_row=4),titles_from_data=True)\ngraf.set_categories(Reference(h,min_col=1,min_row=2,max_row=4))\ngraf.gapWidth = 0\nh.add_chart(graf,'D2')",
        "hint": "",
        "textOutput": "Frecuencias 3, 0 y 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
