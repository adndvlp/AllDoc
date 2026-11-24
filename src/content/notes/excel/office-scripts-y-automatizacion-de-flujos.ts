// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/office-scripts-y-automatizacion-de-flujos/definicion",
    "remember": "No es VBA: su API y entorno son distintos.",
    "note": "Requiere una cuenta, plataforma y configuración de Microsoft 365 que admitan Office Scripts. Abre Automatizar > Nuevo script en un libro de prueba.",
    "examples": [
      {
        "id": "excel/office-scripts-y-automatizacion-de-flujos/definicion/1",
        "title": "Escribir etiqueta",
        "language": "typescript",
        "code": "function main(workbook: ExcelScript.Workbook) {\n  workbook.getWorksheet(\"Scratch\").getRange(\"A1\").setValue(\"Ventas\");\n}",
        "hint": "No es VBA: su API y entorno son distintos. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Scratch!A1 contiene Ventas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/office-scripts-y-automatizacion-de-flujos/leer-y-escribir-matrices",
    "remember": "Las matrices deben coincidir con las dimensiones del rango.",
    "examples": [
      {
        "id": "excel/office-scripts-y-automatizacion-de-flujos/leer-y-escribir-matrices/1",
        "title": "Copiar clientes",
        "language": "typescript",
        "code": "function main(workbook: ExcelScript.Workbook) {\n  const data = workbook.getWorksheet(\"Customers\").getRange(\"A2:B6\").getValues();\n  workbook.getWorksheet(\"Scratch\").getRange(\"A2:B6\").setValues(data);\n}",
        "hint": "Las matrices deben coincidir con las dimensiones del rango. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Cinco filas de identificadores y nombres, de C1/Ana a C5/Eva.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/office-scripts-y-automatizacion-de-flujos/power-automate",
    "remember": "Prueba entradas, permisos, concurrencia y salida antes de programar.",
    "note": "Requiere acceso a Power Automate, conector y licencia compatibles; las políticas de organización pueden limitar la acción.",
    "examples": [
      {
        "id": "excel/office-scripts-y-automatizacion-de-flujos/power-automate/1",
        "title": "Ejecutar script de prueba",
        "language": "text",
        "code": "",
        "hint": "Guarda el libro de prueba y el primer script en una ubicación compatible; en Power Automate crea un flujo manual con acción Ejecutar script de Excel Online (Business), selecciona archivo y script, y ejecuta. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Si cuenta y permisos lo admiten, el flujo termina correctamente y Scratch!A1 contiene Ventas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
