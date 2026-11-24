// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/formulas/definicion",
    "remember": "Usa nombres de funciones en inglés y coma como separador de argumentos en el archivo.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/definicion/1",
        "title": "Guardar el cálculo del importe",
        "language": "python",
        "code": "ws['H2'] = '=D2*E2'\nprint(ws['H2'].value)",
        "hint": "",
        "textOutput": "=D2*E2; al recalcular en Excel el valor esperado es 1600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/agregaciones-y-condiciones",
    "remember": "Se guardan las expresiones, no sus resultados calculados.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/agregaciones-y-condiciones/1",
        "title": "Calcular unidades totales y una categoría",
        "language": "python",
        "code": "resumen['B3'] = '=SUM(Ventas!D2:D6)'\nresumen['B4'] = '=IF(B3>10,\"Alto\",\"Bajo\")'\nprint(resumen['B3'].value, resumen['B4'].value)",
        "hint": "",
        "textOutput": "Fórmulas almacenadas; Excel calcularía 13 y Alto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/referencias-de-formulas",
    "remember": "$ fija la parte que sigue; una fórmula asignada manualmente no se traduce sola.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/referencias-de-formulas/1",
        "title": "Fijar la referencia a la meta",
        "language": "python",
        "code": "ws['H2'] = '=D2*E2'\nws['I2'] = '=H2/Resumen!$B$2'\nprint(ws['I2'].value)",
        "hint": "",
        "textOutput": "=H2/Resumen!$B$2; valor calculado esperado 0.8. H2 cambia al copiar la fórmula por filas, pero la referencia $B$2 permanece fija.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/referencias-entre-hojas",
    "remember": "Los nombres de hoja con espacios necesitan comillas simples.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/referencias-entre-hojas/1",
        "title": "Referenciar una hoja con espacios",
        "language": "python",
        "code": "from openpyxl.utils.cell import quote_sheetname\nresumen.title = 'Resumen mensual'\nws['H2'] = f'={quote_sheetname(resumen.title)}!B2'\nprint(ws['H2'].value)",
        "hint": "",
        "textOutput": "='Resumen mensual'!B2; Excel calcularía 2000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/data-only",
    "remember": "No calcula fórmulas; guardar un libro cargado con data_only puede perder las fórmulas originales.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/data-only/1",
        "title": "Comparar fórmula con caché vacía",
        "language": "python",
        "code": "ws['H2'] = '=D2*E2'\nwb.save('formulas.xlsx')\nprint(load_workbook('formulas.xlsx',data_only=False)['Ventas']['H2'].value)\nprint(load_workbook('formulas.xlsx',data_only=True)['Ventas']['H2'].value)",
        "hint": "",
        "textOutput": "=D2*E2; None porque todavía no hay resultado almacenado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/traducir-formulas",
    "remember": "No actualiza todas las dependencias ni traduce nombres definidos.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/traducir-formulas/1",
        "title": "Trasladar una fórmula una fila",
        "language": "python",
        "code": "from openpyxl.formula.translate import Translator\nprint(Translator('=D2*$E$2',origin='H2').translate_formula('H3'))",
        "hint": "",
        "textOutput": "=D3*$E$2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/tokenizar-formulas",
    "remember": "Analizar sintaxis no equivale a calcular el resultado.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/tokenizar-formulas/1",
        "title": "Inspeccionar los tokens de una expresión",
        "language": "python",
        "code": "from openpyxl.formula import Tokenizer\nprint([t.value for t in Tokenizer('=D2*E2').items])",
        "hint": "",
        "textOutput": "['D2', '*', 'E2'].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/recalculo",
    "remember": "Solicitar recálculo no crea una caché desde Python.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/recalculo/1",
        "title": "Solicitar recálculo al abrir",
        "language": "python",
        "code": "from openpyxl.workbook.properties import CalcProperties\nwb.calculation = CalcProperties(calcMode='auto',fullCalcOnLoad=True,forceFullCalc=True)\nprint(wb.calculation.calcMode, wb.calculation.fullCalcOnLoad)",
        "hint": "",
        "textOutput": "auto True; Excel recibe la solicitud de recálculo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/formulas/formulas-especiales",
    "remember": "Son formatos especiales; no son tablas de Excel ni DataFrames, y no se calculan con openpyxl.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/formulas/formulas-especiales/1",
        "title": "Representar fórmulas especiales",
        "language": "python",
        "code": "from openpyxl.worksheet.formula import ArrayFormula, DataTableFormula\nws['H2'] = ArrayFormula('H2:H6','=D2:D6*E2:E6')\nprint(ws.array_formulae)\nprint(DataTableFormula(ref='J2:K4',r1='B2').ref)",
        "hint": "",
        "textOutput": "{'H2': 'H2:H6'}; J2:K4. La tabla de hipótesis solo se ha construido como objeto, no como modelo funcional.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
