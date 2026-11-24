// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/proteccion/definicion",
    "remember": "No cifra los datos ni sustituye un control de acceso.",
    "examples": [
      {
        "id": "openpyxl/proteccion/definicion/1",
        "title": "Activar la protección de Ventas",
        "language": "python",
        "code": "ws.protection.sheet = True\nprint(ws.protection.sheet)",
        "hint": "",
        "textOutput": "True; Excel activaría la protección de hoja.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/proteccion/proteccion-celdas",
    "remember": "Los flags de celda solo se aplican cuando la hoja está protegida.",
    "examples": [
      {
        "id": "openpyxl/proteccion/proteccion-celdas/1",
        "title": "Permitir edición de una celda",
        "language": "python",
        "code": "from openpyxl.styles import Protection\nws['D2'].protection = Protection(locked=False)\nws.protection.sheet = True\nprint(ws['D2'].protection.locked,ws['E2'].protection.locked)",
        "hint": "",
        "textOutput": "False True; D2 sería editable y E2 bloqueada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/proteccion/proteger-hoja",
    "remember": "La contraseña de protección no es cifrado ni una garantía de confidencialidad.",
    "examples": [
      {
        "id": "openpyxl/proteccion/proteger-hoja/1",
        "title": "Proteger la edición de la hoja",
        "language": "python",
        "code": "ws.protection.set_password('practica')\nws.protection.sheet = True\nprint(ws.protection.sheet)",
        "hint": "",
        "textOutput": "True; protección configurada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/proteccion/proteger-libro",
    "remember": "No impide leer los valores del libro.",
    "examples": [
      {
        "id": "openpyxl/proteccion/proteger-libro/1",
        "title": "Bloquear la estructura del libro",
        "language": "python",
        "code": "wb.security.lockStructure = True\nwb.security.set_workbook_password('practica')\nprint(wb.security.lockStructure)",
        "hint": "",
        "textOutput": "True; Excel restringiría cambios de estructura.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
