// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/tablas/definicion",
    "remember": "El nombre debe ser único en el libro; no confundir con una tabla dinámica.",
    "examples": [
      {
        "id": "openpyxl/tablas/definicion/1",
        "title": "Convertir las ventas en una tabla",
        "language": "python",
        "code": "from openpyxl.worksheet.table import Table\nws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))\nprint(list(ws.tables))",
        "hint": "",
        "textOutput": "['TablaVentas'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tablas/crear-tabla-con-estilo",
    "remember": "La cabecera del rango debe contener texto.",
    "examples": [
      {
        "id": "openpyxl/tablas/crear-tabla-con-estilo/1",
        "title": "Crear una tabla con filas alternadas",
        "language": "python",
        "code": "from openpyxl.worksheet.table import Table, TableStyleInfo\nt = Table(displayName='TablaVentas',ref='A1:G6')\nt.tableStyleInfo = TableStyleInfo(name='TableStyleMedium2',showRowStripes=True)\nws.add_table(t)\nprint(t.ref,t.tableStyleInfo.showRowStripes)",
        "hint": "",
        "textOutput": "A1:G6 True; Excel muestra filas alternadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tablas/consultar-eliminar-tablas",
    "remember": "Quitar una tabla no borra los datos de su rango.",
    "examples": [
      {
        "id": "openpyxl/tablas/consultar-eliminar-tablas/1",
        "title": "Quitar la tabla sin perder datos",
        "language": "python",
        "code": "from openpyxl.worksheet.table import Table\nws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))\nprint(ws.tables['TablaVentas'].ref)\ndel ws.tables['TablaVentas']\nprint(ws['A2'].value)",
        "hint": "",
        "textOutput": "A1:G6; 101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/tablas/redimensionar-tabla",
    "remember": "Si cambian columnas, cabeceras o totales, también revisa sus metadatos.",
    "examples": [
      {
        "id": "openpyxl/tablas/redimensionar-tabla/1",
        "title": "Ampliar la tabla a una nueva venta",
        "language": "python",
        "code": "from openpyxl.worksheet.table import Table\nws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))\nwb.save('tabla.xlsx')\nlibro = load_workbook('tabla.xlsx')\nhoja = libro['Ventas']\nhoja.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Pendiente'])\nt = hoja.tables['TablaVentas']\nt.ref = 'A1:G7'\nt.autoFilter.ref = t.ref\nprint(t.ref,t.autoFilter.ref)",
        "hint": "",
        "textOutput": "A1:G7 A1:G7.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
