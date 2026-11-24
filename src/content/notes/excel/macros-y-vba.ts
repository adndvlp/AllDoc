// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/macros-y-vba/definicion",
    "remember": "Ejecuta solo macros de origen confiable.",
    "note": "Usa Excel de escritorio compatible y un libro .xlsm para guardar VBA; Excel web no ejecuta macros VBA.",
    "examples": [
      {
        "id": "excel/macros-y-vba/definicion/1",
        "title": "Grabar formato",
        "language": "text",
        "code": "",
        "hint": "En Scratch, graba una macro llamada FormatearTitulo que aplique negrita a A1, detén grabación y ejecútala sobre el libro de prueba. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "A1 queda en negrita.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/macros-y-vba/editor-vba-y-procedimientos",
    "remember": "Especifica libro y hoja para no modificar la hoja activa por accidente.",
    "note": "Inserta un módulo estándar en el libro de prueba y ejecuta el procedimiento.",
    "examples": [
      {
        "id": "excel/macros-y-vba/editor-vba-y-procedimientos/1",
        "title": "Escribir indicador",
        "language": "vba",
        "code": "Sub EscribirIndicador()\n    ThisWorkbook.Worksheets(\"Scratch\").Range(\"A1\").Value = \"Ventas\"\nEnd Sub",
        "hint": "Especifica libro y hoja para no modificar la hoja activa por accidente. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Scratch!A1 contiene Ventas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/macros-y-vba/objetos-rangos-y-variables",
    "remember": "Califica los rangos con su hoja.",
    "examples": [
      {
        "id": "excel/macros-y-vba/objetos-rangos-y-variables/1",
        "title": "Copiar total",
        "language": "vba",
        "code": "Sub CopiarTotal()\n    Dim total As Double\n    total = Application.WorksheetFunction.Sum(ThisWorkbook.Worksheets(\"Sales\").Range(\"I2:I9\"))\n    ThisWorkbook.Worksheets(\"Scratch\").Range(\"B1\").Value = total\nEnd Sub",
        "hint": "Califica los rangos con su hoja. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Scratch!B1 contiene 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/macros-y-vba/condiciones-y-bucles",
    "remember": "Para grandes rangos conviene trabajar con matrices en memoria.",
    "examples": [
      {
        "id": "excel/macros-y-vba/condiciones-y-bucles/1",
        "title": "Contar completados",
        "language": "vba",
        "code": "Sub ContarCompletados()\n    Dim celda As Range, n As Long\n    For Each celda In ThisWorkbook.Worksheets(\"Sales\").Range(\"G2:G9\")\n        If celda.Value = \"completed\" Then n = n + 1\n    Next celda\n    ThisWorkbook.Worksheets(\"Scratch\").Range(\"B2\").Value = n\nEnd Sub",
        "hint": "Para grandes rangos conviene trabajar con matrices en memoria. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Scratch!B2 contiene 6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/macros-y-vba/eventos-y-formularios",
    "remember": "Evita eventos que se disparen a sí mismos; los controles compatibles varían por plataforma.",
    "note": "Coloca el código en ThisWorkbook, no en un módulo estándar. No uses este evento en archivos ajenos.",
    "examples": [
      {
        "id": "excel/macros-y-vba/eventos-y-formularios/1",
        "title": "Registrar apertura",
        "language": "vba",
        "code": "Private Sub Workbook_Open()\n    Me.Worksheets(\"Scratch\").Range(\"A1\").Value = \"Abierto\"\nEnd Sub",
        "hint": "Evita eventos que se disparen a sí mismos; los controles compatibles varían por plataforma. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Al reabrir el .xlsm con macros habilitadas, Scratch!A1 contiene Abierto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
