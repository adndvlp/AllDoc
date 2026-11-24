// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/vista/definicion",
    "remember": "El formato visual no cambia los valores.",
    "examples": [
      {
        "id": "openpyxl/vista/definicion/1",
        "title": "Ajustar el ancho de Producto",
        "language": "python",
        "code": "ws.column_dimensions['B'].width = 18\nprint(ws.column_dimensions['B'].width)",
        "hint": "",
        "textOutput": "18.0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/ancho-y-alto",
    "remember": "openpyxl no calcula el AutoFit real de Excel; puedes aproximar el ancho a partir del texto.",
    "examples": [
      {
        "id": "openpyxl/vista/ancho-y-alto/1",
        "title": "Ajustar la columna Producto y la cabecera",
        "language": "python",
        "code": "ws.column_dimensions['B'].width = 20\nws.row_dimensions[1].height = 28\nprint(ws.column_dimensions['B'].width, ws.row_dimensions[1].height)",
        "hint": "",
        "textOutput": "20.0 28.0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/freeze-panes",
    "remember": "B2 fija la fila 1 y columna A; None desactiva.",
    "examples": [
      {
        "id": "openpyxl/vista/freeze-panes/1",
        "title": "Fijar la primera fila y columna",
        "language": "python",
        "code": "ws.freeze_panes = 'B2'\nprint(ws.freeze_panes)",
        "hint": "",
        "textOutput": "B2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/ocultar-filas-columnas",
    "remember": "Los datos ocultos siguen en el archivo.",
    "examples": [
      {
        "id": "openpyxl/vista/ocultar-filas-columnas/1",
        "title": "Ocultar una región y una fila",
        "language": "python",
        "code": "ws.column_dimensions['C'].hidden = True\nws.row_dimensions[3].hidden = True\nprint(ws['C2'].value, ws.row_dimensions[3].hidden)",
        "hint": "",
        "textOutput": "Norte True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/agrupar-dimensiones",
    "remember": "Agrupar no resume datos; solo organiza la vista.",
    "examples": [
      {
        "id": "openpyxl/vista/agrupar-dimensiones/1",
        "title": "Agrupar tres filas de datos",
        "language": "python",
        "code": "ws.row_dimensions.group(2,4,outline_level=1,hidden=True)\nprint(ws.row_dimensions[3].outlineLevel, ws.row_dimensions[3].hidden)",
        "hint": "",
        "textOutput": "1 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/opciones-de-vista",
    "remember": "Son preferencias de visualización del libro.",
    "examples": [
      {
        "id": "openpyxl/vista/opciones-de-vista/1",
        "title": "Configurar la vista inicial",
        "language": "python",
        "code": "ws.sheet_view.showGridLines = False\nws.sheet_view.zoomScale = 90\nws.sheet_properties.tabColor = 'FF24527A'\nprint(ws.sheet_view.showGridLines, ws.sheet_view.zoomScale)",
        "hint": "",
        "textOutput": "False 90.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/vista/seleccion-inicial",
    "remember": "La selección no modifica el contenido.",
    "examples": [
      {
        "id": "openpyxl/vista/seleccion-inicial/1",
        "title": "Seleccionar la celda D2",
        "language": "python",
        "code": "sel = ws.sheet_view.selection[0]\nsel.activeCell = 'D2'\nsel.sqref = 'D2'\nprint(sel.activeCell)",
        "hint": "",
        "textOutput": "D2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
