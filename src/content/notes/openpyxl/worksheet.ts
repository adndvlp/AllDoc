// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/worksheet/definicion",
    "remember": "wb es el libro; ws es una hoja.",
    "examples": [
      {
        "id": "openpyxl/worksheet/definicion/1",
        "title": "Identificar las hojas del libro",
        "language": "python",
        "code": "print(ws.title, wb.sheetnames)",
        "hint": "",
        "textOutput": "Ventas ['Ventas', 'Resumen'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/hoja-activa",
    "remember": "La hoja activa puede cambiar; no presupongas que siempre es la de ventas.",
    "examples": [
      {
        "id": "openpyxl/worksheet/hoja-activa/1",
        "title": "Activar la hoja Resumen",
        "language": "python",
        "code": "wb.active = 1\nprint(wb.active.title, wb.sheetnames)",
        "hint": "",
        "textOutput": "Resumen ['Ventas', 'Resumen'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/acceso-por-nombre",
    "remember": "Usa el título exacto.",
    "examples": [
      {
        "id": "openpyxl/worksheet/acceso-por-nombre/1",
        "title": "Leer la meta por nombre de hoja",
        "language": "python",
        "code": "hoja = wb['Resumen']\nprint(hoja['B2'].value)",
        "hint": "",
        "textOutput": "2000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/crear-y-renombrar",
    "remember": "Puedes elegir su posición con index.",
    "examples": [
      {
        "id": "openpyxl/worksheet/crear-y-renombrar/1",
        "title": "Crear y renombrar una pestaña",
        "language": "python",
        "code": "hoja = wb.create_sheet('Borrador', index=0)\nhoja.title = 'Reporte'\nprint(wb.sheetnames)",
        "hint": "",
        "textOutput": "['Reporte', 'Ventas', 'Resumen'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/eliminar-hoja",
    "remember": "Conserva al menos una hoja visible para guardar.",
    "examples": [
      {
        "id": "openpyxl/worksheet/eliminar-hoja/1",
        "title": "Eliminar Resumen",
        "language": "python",
        "code": "wb.remove(resumen)\nprint(wb.sheetnames)",
        "hint": "",
        "textOutput": "['Ventas'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/copiar-hoja",
    "remember": "No copia todos los objetos (por ejemplo gráficos e imágenes); no funciona entre libros.",
    "examples": [
      {
        "id": "openpyxl/worksheet/copiar-hoja/1",
        "title": "Duplicar Ventas",
        "language": "python",
        "code": "copia = wb.copy_worksheet(ws)\ncopia.title = 'Copia'\nprint(copia['B2'].value, ws.title)",
        "hint": "",
        "textOutput": "Laptop Ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/reordenar-hojas",
    "remember": "offset negativo mueve a la izquierda.",
    "examples": [
      {
        "id": "openpyxl/worksheet/reordenar-hojas/1",
        "title": "Mover Resumen a la primera posición",
        "language": "python",
        "code": "wb.move_sheet(resumen, offset=-1)\nprint(wb.sheetnames)",
        "hint": "",
        "textOutput": "['Resumen', 'Ventas'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/worksheet/visibilidad-hoja",
    "remember": "veryHidden no se muestra mediante el comando normal de desocultar en Excel; no es seguridad.",
    "examples": [
      {
        "id": "openpyxl/worksheet/visibilidad-hoja/1",
        "title": "Ocultar Resumen",
        "language": "python",
        "code": "resumen.sheet_state = 'hidden'\nprint(resumen.sheet_state)",
        "hint": "",
        "textOutput": "hidden; Ventas sigue visible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
