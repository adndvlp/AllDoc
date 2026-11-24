// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/validacion/definicion",
    "remember": "openpyxl no valida automáticamente los valores escritos por Python.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/definicion/1",
        "title": "Restringir unidades a enteros positivos",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\ndv = DataValidation(type='whole',operator='greaterThan',formula1=0)\nws.add_data_validation(dv)\ndv.add('D2:D100')\nprint(str(dv.sqref))",
        "hint": "",
        "textOutput": "D2:D100; queda registrada la restricción.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/validacion/lista-desplegable",
    "remember": "Para mostrar la flecha no establezcas showDropDown=True, pues Excel lo interpreta como ocultarla.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/lista-desplegable/1",
        "title": "Crear opciones de estado",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\ndv = DataValidation(type='list',formula1='\"Completado,Pendiente,Cancelado\"',allow_blank=False)\ndv.showErrorMessage = True\nws.add_data_validation(dv)\ndv.add('G2:G100')",
        "hint": "",
        "textOutput": "Excel mostraría las tres opciones y podría rechazar otras entradas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/validacion/validar-numeros",
    "remember": "Usa showErrorMessage para presentar el error de validación en Excel.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/validar-numeros/1",
        "title": "Limitar unidades y precios",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\nfor tipo,rango in [('whole','D2:D100'),('decimal','E2:E100')]:\n    dv = DataValidation(type=tipo,operator='between',formula1=1,formula2=10000,showErrorMessage=True)\n    ws.add_data_validation(dv)\n    dv.add(rango)",
        "hint": "",
        "textOutput": "Unidades enteras y precios decimales entre 1 y 10000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/validacion/validar-fechas-texto",
    "remember": "Las fechas de una fórmula pueden expresarse mediante DATE().",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/validar-fechas-texto/1",
        "title": "Restringir fechas y longitud del producto",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\ndv = DataValidation(type='date',operator='between',formula1='DATE(2026,1,1)',formula2='DATE(2026,12,31)')\nws.add_data_validation(dv)\ndv.add('F2:F100')\nt = DataValidation(type='textLength',operator='lessThanOrEqual',formula1=30)\nws.add_data_validation(t)\nt.add('B2:B100')",
        "hint": "",
        "textOutput": "Fecha dentro de 2026 y producto de hasta 30 caracteres; reglas guardadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/validacion/validacion-personalizada",
    "remember": "La referencia relativa se interpreta a partir de la primera celda del rango.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/validacion-personalizada/1",
        "title": "Exigir identificadores únicos",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\ndv = DataValidation(type='custom',formula1='COUNTIF($A$2:$A$100,A2)=1',showErrorMessage=True)\nws.add_data_validation(dv)\ndv.add('A2:A100')",
        "hint": "",
        "textOutput": "Excel comprobaría que cada ID introducido aparece una sola vez.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/validacion/mensajes-validacion",
    "remember": "Una regla sin rango asignado no se conserva al guardar.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/validacion/mensajes-validacion/1",
        "title": "Mostrar mensajes de ayuda y error",
        "language": "python",
        "code": "from openpyxl.worksheet.datavalidation import DataValidation\ndv = DataValidation(type='whole',operator='greaterThan',formula1=0,showErrorMessage=True,showInputMessage=True,errorStyle='stop')\ndv.errorTitle = 'Unidades invalidas'\ndv.error = 'Introduce un entero positivo.'\ndv.promptTitle = 'Unidades'\ndv.prompt = 'Mayor que cero'\nws.add_data_validation(dv)\ndv.add('D2:D100')",
        "hint": "",
        "textOutput": "Excel mostraría una ayuda al seleccionar y un error de tipo stop ante entradas inválidas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
