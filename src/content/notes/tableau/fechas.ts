// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/fechas/definicion",
    "remember": "Mes como parte de fecha mezcla años; mes como valor conserva el año.",
    "examples": [
      {
        "id": "tableau/fechas/definicion/1",
        "title": "Obtener mes de una línea",
        "language": "text",
        "code": "DATETRUNC('month',[Fecha])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 2025-01-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/date-parts-y-date-values",
    "remember": "Usa año-mes para series de varios años.",
    "examples": [
      {
        "id": "tableau/fechas/date-parts-y-date-values/1",
        "title": "Construir serie mensual",
        "code": "",
        "external": true,
        "hint": "Fecha en Columns como Month continuo y SUM(Ventas) en Rows.",
        "textOutput": "Enero 600, febrero 250, marzo 900.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/datepart-y-datename",
    "remember": "Ordena por número o fecha, no por nombre alfabético.",
    "examples": [
      {
        "id": "tableau/fechas/datepart-y-datename/1",
        "title": "Extraer número de mes",
        "language": "text",
        "code": "DATEPART('month',[Fecha])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 6: 3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/datetrunc",
    "remember": "Mantiene el año al truncar a mes.",
    "examples": [
      {
        "id": "tableau/fechas/datetrunc/1",
        "title": "Agrupar por mes",
        "code": "",
        "steps": [
          "Crea Mes venta y úsalo en Rows como fecha exacta discreta",
          "Ventas en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "2025-01-01: 600; 2025-02-01: 250; 2025-03-01: 900.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/datediff-y-dateadd",
    "remember": "DATEDIFF cuenta cambios de unidad, no necesariamente duración exacta en segundos.",
    "examples": [
      {
        "id": "tableau/fechas/datediff-y-dateadd/1",
        "title": "Calcular días de entrega",
        "language": "text",
        "code": "DATEDIFF('day',[Fecha],[Entrega])",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Linea 1: 3; linea 6: 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/today-y-now",
    "remember": "El resultado depende del reloj y entorno de ejecución.",
    "examples": [
      {
        "id": "tableau/fechas/today-y-now/1",
        "title": "Calcular antigüedad",
        "language": "text",
        "code": "DATEDIFF('day',[Fecha],TODAY())",
        "instructions": "Crea un campo calculado con esta expresión y muéstralo por `Linea`:",
        "hint": "",
        "textOutput": "Días entre el pedido y la fecha actual; cambia cada día.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/dateparse-y-makedate",
    "remember": "El patrón debe coincidir exactamente con el texto.",
    "note": "DATEPARSE tiene restricciones por conector; un extract compatible permite el ejemplo.",
    "examples": [
      {
        "id": "tableau/fechas/dateparse-y-makedate/1",
        "title": "Convertir una fecha literal",
        "code": "",
        "external": true,
        "hint": "Crea DATEPARSE('dd/MM/yyyy','05/01/2025') y pon el campo como fecha exacta en Text.",
        "textOutput": "2025-01-05.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/fechas/calendario-fiscal",
    "remember": "No confundas calendario fiscal con calendario natural.",
    "examples": [
      {
        "id": "tableau/fechas/calendario-fiscal/1",
        "title": "Cambiar inicio fiscal",
        "code": "",
        "steps": [
          "En propiedades predeterminadas de Fecha, selecciona inicio en abril",
          "usa Fiscal Quarter en la vista de Fecha según opciones disponibles."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero-marzo corresponden al cuarto trimestre fiscal, con año fiscal según etiquetado de Tableau.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
