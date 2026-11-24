// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/definicion",
    "remember": "openpyxl almacena la regla; no evalúa el color final de cada celda.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/definicion/1",
        "title": "Resaltar precios mayores de 100",
        "language": "python",
        "code": "from openpyxl.formatting.rule import CellIsRule\nfrom openpyxl.styles import PatternFill\nws.conditional_formatting.add('E2:E6',CellIsRule(operator='greaterThan',formula=['100'],fill=PatternFill('solid',fgColor='FFFFD966')))\nprint(len(ws.conditional_formatting))",
        "hint": "",
        "textOutput": "1 rango con regla; E2 y E4 se resaltarían en Excel.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/comparar-celdas",
    "remember": "formula recibe una lista de expresiones como texto.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/comparar-celdas/1",
        "title": "Destacar unidades desde 3",
        "language": "python",
        "code": "from openpyxl.formatting.rule import CellIsRule\nfrom openpyxl.styles import Font\nws.conditional_formatting.add('D2:D6',CellIsRule(operator='greaterThanOrEqual',formula=['3'],font=Font(bold=True)))",
        "hint": "",
        "textOutput": "D3 y D5 se mostrarían en negrita.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/regla-con-formula",
    "remember": "Fija la columna con $ cuando la regla se aplica a toda la fila.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/regla-con-formula/1",
        "title": "Resaltar pedidos cancelados",
        "language": "python",
        "code": "from openpyxl.formatting.rule import FormulaRule\nfrom openpyxl.styles import PatternFill\nws.conditional_formatting.add('A2:G6',FormulaRule(formula=['$G2=\"Cancelado\"'],fill=PatternFill('solid',fgColor='FFFFC7CE')))",
        "hint": "",
        "textOutput": "La fila 6 se resaltaría.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/resaltar-duplicados",
    "remember": "Resaltar no elimina datos.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/resaltar-duplicados/1",
        "title": "Marcar productos repetidos",
        "language": "python",
        "code": "from openpyxl.formatting.rule import Rule\nfrom openpyxl.styles import PatternFill\nfrom openpyxl.styles.differential import DifferentialStyle\nregla = Rule(type='duplicateValues',dxf=DifferentialStyle(fill=PatternFill('solid',fgColor='FFFFD966')))\nws.conditional_formatting.add('B2:B6',regla)",
        "hint": "",
        "textOutput": "Laptop y Mouse se resaltarían; Teclado no.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/escalas-de-color",
    "remember": "No cambia los números almacenados.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/escalas-de-color/1",
        "title": "Asignar colores a los precios",
        "language": "python",
        "code": "from openpyxl.formatting.rule import ColorScaleRule\nws.conditional_formatting.add('E2:E6',ColorScaleRule(start_type='min',start_color='FFF8696B',end_type='max',end_color='FF63BE7B'))",
        "hint": "",
        "textOutput": "Los precios de 20 y 800 recibirían los colores de los extremos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/barras-de-datos",
    "remember": "Las barras se dibujan al visualizar el archivo.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/barras-de-datos/1",
        "title": "Comparar unidades con barras",
        "language": "python",
        "code": "from openpyxl.formatting.rule import DataBarRule\nws.conditional_formatting.add('D2:D6',DataBarRule(start_type='min',end_type='max',color='FF638EC6'))",
        "hint": "",
        "textOutput": "La barra de 5 unidades sería la más larga.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formato-condicional/conjuntos-de-iconos",
    "remember": "Los umbrales tienen el significado de type; percent no es percentile.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formato-condicional/conjuntos-de-iconos/1",
        "title": "Clasificar unidades mediante iconos",
        "language": "python",
        "code": "from openpyxl.formatting.rule import IconSetRule\nws.conditional_formatting.add('D2:D6',IconSetRule('3TrafficLights1','num',[0,2,4]))",
        "hint": "",
        "textOutput": "Los iconos separarían los valores inferiores a 2, de 2 a menos de 4 y desde 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
