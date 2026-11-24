// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/definicion",
    "remember": "No ofrecen todas las operaciones del modo normal.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/definicion/1",
        "title": "Leer la cabecera sin cargar todo el libro",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx',read_only=True)\nprint(next(libro['Ventas'].values))\nlibro.close()",
        "hint": "",
        "textOutput": "('ID', 'Producto', 'Region', 'Unidades', 'Precio', 'Fecha', 'Estado').",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/solo-lectura",
    "remember": "No permite editar y requiere close() explícito; iter_cols no está disponible.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/solo-lectura/1",
        "title": "Sumar unidades en lectura optimizada",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx',read_only=True)\ntry:\n    hoja = libro['Ventas']\n    print(sum(r[3] for r in hoja.iter_rows(min_row=2,values_only=True)))\nfinally:\n    libro.close()",
        "hint": "",
        "textOutput": "13 unidades.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/reset-dimensions",
    "remember": "No resetees dimensiones correctas sin motivo; force=True puede recorrer la hoja.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/reset-dimensions/1",
        "title": "Recalcular límites de una hoja",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx',read_only=True)\nhoja = libro['Ventas']\nprint(hoja.calculate_dimension())\nhoja.reset_dimensions()\nprint(hoja.calculate_dimension(force=True))\nlibro.close()",
        "hint": "",
        "textOutput": "A1:G6 antes y después del recálculo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/solo-escritura",
    "remember": "No tiene hoja inicial, no permite acceso aleatorio y solo se guarda una vez.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/solo-escritura/1",
        "title": "Exportar importes de forma secuencial",
        "language": "python",
        "code": "libro = Workbook(write_only=True)\nhoja = libro.create_sheet('Exportacion')\nhoja.append(['ID','Importe'])\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    hoja.append([r[0],r[3]*r[4]])\nlibro.save('exportacion.xlsx')\nprint(load_workbook('exportacion.xlsx').active['B2'].value)",
        "hint": "",
        "textOutput": "1600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/celdas-optimizadas",
    "remember": "Configura vistas y otras propiedades previas a las celdas antes de append().",
    "examples": [
      {
        "id": "openpyxl/rendimiento/celdas-optimizadas/1",
        "title": "Crear una cabecera con estilo en streaming",
        "language": "python",
        "code": "from openpyxl.cell import WriteOnlyCell\nfrom openpyxl.styles import Font\nlibro = Workbook(write_only=True)\nhoja = libro.create_sheet()\nhoja.freeze_panes = 'A2'\nc = WriteOnlyCell(hoja,value='Importe')\nc.font = Font(bold=True)\nhoja.append([c])\nhoja.append([1600])\nlibro.save('stream.xlsx')\nprint(load_workbook('stream.xlsx').active['A1'].font.bold)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/procesamiento-incremental",
    "remember": "list() materializa datos; un acumulador puede mantener memoria constante.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/procesamiento-incremental/1",
        "title": "Acumular ventas sin materializar filas",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx',read_only=True)\ntry:\n    total = 0\n    for r in libro['Ventas'].iter_rows(min_row=2,values_only=True):\n        if r[6]=='Completado':\n            total += r[3]*r[4]\n    print(total)\nfinally:\n    libro.close()",
        "hint": "",
        "textOutput": "1850.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/rendimiento/archivo-en-memoria",
    "remember": "Rebobina con seek(0) antes de entregar o leer el contenido.",
    "examples": [
      {
        "id": "openpyxl/rendimiento/archivo-en-memoria/1",
        "title": "Guardar el libro en un búfer",
        "language": "python",
        "code": "from io import BytesIO\nbuf = BytesIO()\nwb.save(buf)\nbuf.seek(0)\nprint(load_workbook(buf)['Ventas']['A2'].value)",
        "hint": "",
        "textOutput": "101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
