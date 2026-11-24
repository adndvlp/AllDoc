// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/nombres-definidos/definicion",
    "remember": "En openpyxl 3.1 se usa defined_names.add().",
    "examples": [
      {
        "id": "openpyxl/nombres-definidos/definicion/1",
        "title": "Nombrar la meta de ventas",
        "language": "python",
        "code": "from openpyxl.workbook.defined_name import DefinedName\nwb.defined_names.add(DefinedName('Meta',attr_text=\"'Resumen'!$B$2\"))\nprint(list(wb.defined_names['Meta'].destinations))",
        "hint": "",
        "textOutput": "[('Resumen', '$B$2')].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/nombres-definidos/crear-nombres",
    "remember": "Usa referencias absolutas y el título de hoja correcto.",
    "examples": [
      {
        "id": "openpyxl/nombres-definidos/crear-nombres/1",
        "title": "Referenciar la meta mediante un nombre",
        "language": "python",
        "code": "from openpyxl.workbook.defined_name import DefinedName\nwb.defined_names.add(DefinedName('Meta',attr_text=\"'Resumen'!$B$2\"))\nws['H2'] = '=D2*E2/Meta'\nprint(ws['H2'].value)",
        "hint": "",
        "textOutput": "=D2*E2/Meta; resultado calculado esperado 0.8.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/nombres-definidos/nombres-locales",
    "remember": "Los nombres dinámicos pueden no ser resolubles por openpyxl.",
    "examples": [
      {
        "id": "openpyxl/nombres-definidos/nombres-locales/1",
        "title": "Crear un nombre local en Ventas",
        "language": "python",
        "code": "from openpyxl.workbook.defined_name import DefinedName\nws.defined_names.add(DefinedName('PrimeraVenta',attr_text=\"'Ventas'!$A$2\"))\nprint(list(ws.defined_names['PrimeraVenta'].destinations))",
        "hint": "",
        "textOutput": "[('Ventas', '$A$2')].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/nombres-definidos/eliminar-nombres",
    "remember": "Eliminarlo no repara las fórmulas que lo utilizan.",
    "examples": [
      {
        "id": "openpyxl/nombres-definidos/eliminar-nombres/1",
        "title": "Eliminar el nombre Meta",
        "language": "python",
        "code": "from openpyxl.workbook.defined_name import DefinedName\nwb.defined_names.add(DefinedName('Meta',attr_text=\"'Resumen'!$B$2\"))\ndel wb.defined_names['Meta']\nprint('Meta' in wb.defined_names)",
        "hint": "",
        "textOutput": "False.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
