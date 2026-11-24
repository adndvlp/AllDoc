// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/edicion/definicion",
    "remember": "Inserciones y eliminaciones no reparan automáticamente todas las fórmulas, gráficos o tablas dependientes.",
    "examples": [
      {
        "id": "openpyxl/edicion/definicion/1",
        "title": "Agregar una venta",
        "language": "python",
        "code": "ws.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Pendiente'])\nprint(ws['A7'].value)",
        "hint": "",
        "textOutput": "106.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/edicion/append",
    "remember": "Usa el orden de campos de la cabecera.",
    "examples": [
      {
        "id": "openpyxl/edicion/append/1",
        "title": "Añadir el pedido 106",
        "language": "python",
        "code": "ws.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Completado'])\nprint(ws.max_row, ws['G7'].value)",
        "hint": "",
        "textOutput": "7 Completado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/edicion/insertar-eliminar-filas",
    "remember": "amount indica cuántas filas se insertan o eliminan.",
    "examples": [
      {
        "id": "openpyxl/edicion/insertar-eliminar-filas/1",
        "title": "Insertar y retirar una fila vacía",
        "language": "python",
        "code": "ws.insert_rows(2, amount=1)\nprint(ws['A2'].value, ws['A3'].value)\nws.delete_rows(2, amount=1)\nprint(ws['A2'].value)",
        "hint": "",
        "textOutput": "None 101; luego 101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/edicion/insertar-eliminar-columnas",
    "remember": "Insertar en 2 desplaza la antigua B a C.",
    "examples": [
      {
        "id": "openpyxl/edicion/insertar-eliminar-columnas/1",
        "title": "Insertar y retirar una columna vacía",
        "language": "python",
        "code": "ws.insert_cols(2)\nprint(ws['B1'].value, ws['C1'].value)\nws.delete_cols(2)\nprint(ws['B1'].value)",
        "hint": "",
        "textOutput": "None Producto; luego Producto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/edicion/mover-rangos",
    "remember": "Sobrescribe el destino; no actualiza las referencias de otras celdas hacia el rango.",
    "examples": [
      {
        "id": "openpyxl/edicion/mover-rangos/1",
        "title": "Mover el resumen dos filas",
        "language": "python",
        "code": "resumen.move_range('A1:B2',rows=2,cols=0)\nprint(resumen['A3'].value, resumen['B4'].value)",
        "hint": "",
        "textOutput": "Indicador 2000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/edicion/combinar-celdas",
    "remember": "Las demás celdas combinadas no son editables y sus valores previos se pierden.",
    "examples": [
      {
        "id": "openpyxl/edicion/combinar-celdas/1",
        "title": "Combinar el título de un reporte",
        "language": "python",
        "code": "resumen['A4'] = 'Reporte mensual'\nresumen.merge_cells('A4:C4')\nprint(resumen['A4'].value, type(resumen['B4']).__name__)\nresumen.unmerge_cells('A4:C4')\nprint(resumen['B4'].value)",
        "hint": "",
        "textOutput": "Reporte mensual MergedCell; después None.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
