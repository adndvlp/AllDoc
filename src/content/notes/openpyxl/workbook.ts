// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/workbook/definicion",
    "remember": "Libro → hojas → celdas.",
    "examples": [
      {
        "id": "openpyxl/workbook/definicion/1",
        "title": "Crear un libro y consultar sus hojas",
        "language": "python",
        "code": "libro = Workbook()\nprint(libro.sheetnames)",
        "hint": "El editor prepara ventas_base.xlsx. Usa Reiniciar entorno para recuperar los datos iniciales.",
        "textOutput": "['Sheet'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/workbook/crear-y-guardar",
    "remember": "Guardar no es lo mismo que modificar en memoria.",
    "examples": [
      {
        "id": "openpyxl/workbook/crear-y-guardar/1",
        "title": "Guardar un reporte nuevo",
        "language": "python",
        "code": "libro = Workbook()\nlibro.active['A1'] = 'Reporte'\nlibro.save('reporte.xlsx')\nprint(Path('reporte.xlsx').exists())",
        "hint": "",
        "textOutput": "True; reporte.xlsx contiene Sheet!A1 = Reporte.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/workbook/load-workbook",
    "remember": "Carga primero y guarda con otro nombre para no perder el original.",
    "examples": [
      {
        "id": "openpyxl/workbook/load-workbook/1",
        "title": "Leer un producto de un archivo",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx')\nprint(libro['Ventas']['B2'].value)",
        "hint": "",
        "textOutput": "Laptop.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/workbook/guardar-y-cerrar",
    "remember": "close() no sustituye save(); en modo normal apenas tiene efecto, en lectura optimizada sí importa.",
    "examples": [
      {
        "id": "openpyxl/workbook/guardar-y-cerrar/1",
        "title": "Modificar una copia y cerrar",
        "language": "python",
        "code": "libro = load_workbook('ventas_base.xlsx')\nlibro['Ventas']['B2'] = 'Monitor'\nlibro.save('ventas_editadas.xlsx')\nlibro.close()\nprint(load_workbook('ventas_editadas.xlsx')['Ventas']['B2'].value)",
        "hint": "",
        "textOutput": "Monitor; el archivo original no cambia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/workbook/formatos-admitidos",
    "remember": "No basta renombrar un archivo .xls a .xlsx.",
    "examples": [
      {
        "id": "openpyxl/workbook/formatos-admitidos/1",
        "title": "Detectar un archivo XLS no admitido",
        "language": "python",
        "code": "from openpyxl.utils.exceptions import InvalidFileException\ntry:\n    load_workbook('antiguo.xls')\nexcept InvalidFileException:\n    print('Formato no admitido')",
        "hint": "",
        "textOutput": "Formato no admitido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
