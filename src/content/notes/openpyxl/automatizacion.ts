// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/definicion",
    "remember": "Distingue los cálculos de negocio de la presentación del archivo.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/definicion/1",
        "title": "Calcular el importe completado",
        "language": "python",
        "code": "total = sum(r[3]*r[4] for r in ws.iter_rows(min_row=2,values_only=True) if r[6]=='Completado')\nresumen.append(['Ventas completadas',total])\nprint(resumen['B3'].value)",
        "hint": "",
        "textOutput": "1850.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/actualizar-plantilla",
    "remember": "Comprueba las fórmulas y estilos existentes; no sobrescribas el original.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/actualizar-plantilla/1",
        "title": "Actualizar valores de un reporte existente",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx')\nh = libro['Resumen']\nh['A3'] = 'Ventas completadas'\nh['B3'] = 1850\nh['A4'] = 'Cumplimiento'\nh['B4'] = '=B3/B2'\nh['B4'].number_format = '0.0%'\nlibro.save('reporte_agosto.xlsx')",
        "hint": "",
        "textOutput": "B3 = 1850, B4 almacena =B3/B2; Excel mostraría 92.5%.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/consolidar-archivos",
    "remember": "Comprueba cabeceras y claves; consolidar no implica deduplicar automáticamente.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/consolidar-archivos/1",
        "title": "Consolidar dos libros con la misma cabecera",
        "language": "python",
        "code": "carpeta = Path('entradas')\ncarpeta.mkdir(exist_ok=True)\nfor n,filas in [('norte',[(101,'Laptop')]),('sur',[(102,'Mouse')])]:\n    b = Workbook()\n    b.active.append(['ID','Producto'])\n    for r in filas:\n        b.active.append(r)\n    b.save(carpeta/f'{n}.xlsx')\nh = wb.create_sheet('Consolidado')\nh.append(['ID','Producto'])\nfor ruta in sorted(carpeta.glob('*.xlsx')):\n    b = load_workbook(ruta,read_only=True)\n    try:\n        assert next(b.active.values) == ('ID','Producto')\n        for r in b.active.iter_rows(min_row=2,values_only=True):\n            h.append(r)\n    finally:\n        b.close()\nprint(list(h.values))",
        "hint": "",
        "textOutput": "[('ID', 'Producto'), (101, 'Laptop'), (102, 'Mouse')].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/reportes-por-grupo",
    "remember": "Usa una lista de nombres de archivo controlados; no utilices texto externo sin validar rutas.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/reportes-por-grupo/1",
        "title": "Generar un archivo por región",
        "language": "python",
        "code": "from collections import defaultdict\ngrupos = defaultdict(list)\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    grupos[r[2] or 'Sin_region'].append(r)\nfor region,filas in grupos.items():\n    b = Workbook()\n    b.active.append(next(ws.values))\n    for r in filas:\n        b.active.append(r)\n    b.save(f'ventas_{region}.xlsx')\nprint(sorted(grupos))",
        "hint": "",
        "textOutput": "['Norte', 'Sin_region', 'Sur']; tres archivos con 2, 1 y 2 ventas respectivamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/conciliar-datos",
    "remember": "Aclara si faltantes son discrepancias o registros válidos; verifica unicidad de claves.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/conciliar-datos/1",
        "title": "Encontrar un importe discrepante",
        "language": "python",
        "code": "esperados = {101:1600,102:100,103:800,104:155,105:40}\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    importe = r[3]*r[4]\n    if esperados.get(r[0]) != importe:\n        print(r[0],importe,esperados.get(r[0]))",
        "hint": "",
        "textOutput": "104 150 155; diferencia de 5 en el registro 104.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/automatizacion/dashboard",
    "remember": "Calcula métricas con Python si necesitas valores correctos sin depender del recálculo de Excel.",
    "examples": [
      {
        "id": "openpyxl/automatizacion/dashboard/1",
        "title": "Crear un dashboard de ventas completadas",
        "language": "python",
        "code": "from collections import defaultdict\nfrom openpyxl.styles import Font\nfrom openpyxl.chart import BarChart, Reference\ntotales = defaultdict(int)\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    if r[6]=='Completado':\n        totales[r[1]] += r[3]*r[4]\nh = wb.create_sheet('Dashboard')\nh.append(['Producto','Ventas completadas'])\nfor nombre,total in sorted(totales.items()):\n    h.append([nombre,total])\nfor c in h[1]:\n    c.font = Font(bold=True)\nfor (c,) in h.iter_rows(min_row=2,min_col=2,max_col=2):\n    c.number_format = '#,##0.00'\ngraf = BarChart()\ngraf.add_data(Reference(h,min_col=2,min_row=1,max_row=h.max_row),titles_from_data=True)\ngraf.set_categories(Reference(h,min_col=1,min_row=2,max_row=h.max_row))\nh.add_chart(graf,'D2')\nh.freeze_panes = 'A2'\nwb.save('dashboard.xlsx')",
        "hint": "",
        "textOutput": "Tabla Laptop 1600, Mouse 100, Teclado 150; gráfico de tres barras y cabecera inmovilizada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
