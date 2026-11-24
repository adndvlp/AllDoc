// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/errores-y-pruebas/definicion",
    "remember": "Guarda en una ruta distinta y reabre el archivo para comprobarlo.",
    "examples": [
      {
        "id": "openpyxl/errores-y-pruebas/definicion/1",
        "title": "Guardar y comprobar el identificador",
        "language": "python",
        "code": "wb.save('verificado.xlsx')\nlibro = load_workbook('verificado.xlsx')\nassert libro['Ventas']['A2'].value == 101\nprint('OK')",
        "hint": "",
        "textOutput": "OK.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/errores-y-pruebas/rutas",
    "remember": "Usa rutas explícitas y separa archivos de entrada y salida.",
    "examples": [
      {
        "id": "openpyxl/errores-y-pruebas/rutas/1",
        "title": "Crear una carpeta de salida",
        "language": "python",
        "code": "import os\nsalida = Path('salidas')\nsalida.mkdir(exist_ok=True)\nwb.save(salida/'ventas.xlsx')\nprint(os.path.isfile(salida/'ventas.xlsx'))",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/errores-y-pruebas/archivos-invalidos",
    "remember": "Un xlsx es un paquete ZIP; una extensión correcta no garantiza contenido válido.",
    "examples": [
      {
        "id": "openpyxl/errores-y-pruebas/archivos-invalidos/1",
        "title": "Detectar un archivo dañado",
        "language": "python",
        "code": "from zipfile import BadZipFile\nfrom openpyxl.utils.exceptions import InvalidFileException\nPath('danado.xlsx').write_text('no es un libro')\ntry:\n    load_workbook('danado.xlsx')\nexcept (FileNotFoundError,InvalidFileException,BadZipFile) as e:\n    print(type(e).__name__)",
        "hint": "",
        "textOutput": "BadZipFile.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/errores-y-pruebas/errores-de-celdas",
    "remember": "Limpia caracteres de control ilegales sin borrar caracteres válidos como tildes.",
    "examples": [
      {
        "id": "openpyxl/errores-y-pruebas/errores-de-celdas/1",
        "title": "Capturar entradas de celda inválidas",
        "language": "python",
        "code": "from openpyxl.utils.exceptions import IllegalCharacterError, CellCoordinatesException\nfrom openpyxl.utils.cell import coordinate_from_string\ntry:\n    ws['H1'] = 'dato'+chr(1)\nexcept IllegalCharacterError:\n    print('Caracter ilegal')\ntry:\n    coordinate_from_string('A0')\nexcept CellCoordinatesException:\n    print('Coordenada invalida')",
        "hint": "",
        "textOutput": "Caracter ilegal; Coordenada invalida.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/errores-y-pruebas/verificar-reporte",
    "remember": "Comprueba la fórmula almacenada y, por separado, resultados calculados cuando tengas un motor de Excel.",
    "examples": [
      {
        "id": "openpyxl/errores-y-pruebas/verificar-reporte/1",
        "title": "Reabrir y comprobar un reporte",
        "language": "python",
        "code": "from openpyxl.styles import Font\nws['H2'] = '=D2*E2'\nws['A1'].font = Font(bold=True)\nwb.save('control.xlsx')\nh = load_workbook('control.xlsx')['Ventas']\nassert h['H2'].value == '=D2*E2'\nassert h['A1'].font.bold\nassert h['A2'].value == 101\nprint('Verificado')",
        "hint": "",
        "textOutput": "Verificado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
