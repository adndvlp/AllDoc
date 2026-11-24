// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/fechas/definicion",
    "remember": "Excel no admite zonas horarias en sus fechas nativas.",
    "examples": [
      {
        "id": "openpyxl/fechas/definicion/1",
        "title": "Inspeccionar una fecha de venta",
        "language": "python",
        "code": "print(ws['F2'].value, ws['F2'].is_date)",
        "hint": "",
        "textOutput": "2026-08-01 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/fechas/leer-escribir-fechas",
    "remember": "Al recargar una fecha, puede recibirse datetime a medianoche.",
    "examples": [
      {
        "id": "openpyxl/fechas/leer-escribir-fechas/1",
        "title": "Guardar una fecha con hora",
        "language": "python",
        "code": "ws['H2'] = datetime(2026,8,1,14,30)\nws['H2'].number_format = 'yyyy-mm-dd hh:mm'\nprint(ws['H2'].value)",
        "hint": "",
        "textOutput": "2026-08-01 14:30:00.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/fechas/calculos-de-fechas",
    "remember": "Normaliza los tipos antes de restarlos.",
    "examples": [
      {
        "id": "openpyxl/fechas/calculos-de-fechas/1",
        "title": "Medir días hasta el corte",
        "language": "python",
        "code": "corte = datetime.strptime('2026-08-10','%Y-%m-%d').date()\nprint((corte-ws['F2'].value).days)",
        "hint": "",
        "textOutput": "9.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/fechas/calendarios",
    "remember": "Un mismo serial significa otra fecha según el calendario; Excel conserva una anomalía histórica de 1900.",
    "examples": [
      {
        "id": "openpyxl/fechas/calendarios/1",
        "title": "Comparar seriales de ambos calendarios",
        "language": "python",
        "code": "from openpyxl.utils.datetime import to_excel, WINDOWS_EPOCH, MAC_EPOCH\nf = date(2026,8,1)\nprint(to_excel(f,WINDOWS_EPOCH)-to_excel(f,MAC_EPOCH))",
        "hint": "",
        "textOutput": "1462.0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/fechas/fechas-iso",
    "remember": "El formato visual sigue controlado por number_format.",
    "examples": [
      {
        "id": "openpyxl/fechas/fechas-iso/1",
        "title": "Guardar fechas en ISO",
        "language": "python",
        "code": "wb.iso_dates = True\nwb.save('fechas_iso.xlsx')\nprint(load_workbook('fechas_iso.xlsx')['Ventas']['F2'].value)",
        "hint": "",
        "textOutput": "2026-08-01.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
