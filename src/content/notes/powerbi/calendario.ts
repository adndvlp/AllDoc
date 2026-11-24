// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/calendario/definicion",
    "remember": "Usa un calendario común y completo.",
    "examples": [
      {
        "id": "powerbi/calendario/definicion/1",
        "title": "Crear calendario continuo",
        "language": "dax",
        "code": "Calendario = CALENDAR(DATE(2025,1,1), DATE(2026,12,31))",
        "hint": "",
        "textOutput": "730 fechas, de 2025-01-01 a 2026-12-31.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calendario/ano-mes-y-orden-cronologico",
    "remember": "AñoMes debe distinguir años.",
    "note": "Crea cada columna por separado; ordena Mes por MesN y AñoMes por AñoMesN.",
    "examples": [
      {
        "id": "powerbi/calendario/ano-mes-y-orden-cronologico/1",
        "title": "Crear columnas de calendario",
        "language": "dax",
        "code": "Año = YEAR(Calendario[Date])\nMesN = MONTH(Calendario[Date])\nMes = FORMAT(Calendario[Date], \"mmmm\", \"es-MX\")\nAñoMes = FORMAT(Calendario[Date], \"yyyy-MM\")\nAñoMesN = YEAR(Calendario[Date]) * 100 + MONTH(Calendario[Date])",
        "hint": "",
        "textOutput": "2026-02-10: Año 2026, MesN 2, Mes febrero, AñoMes 2026-02, AñoMesN 202602.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calendario/marcar-tabla-de-fechas",
    "remember": "No dependas de jerarquías automáticas para un modelo compartido.",
    "examples": [
      {
        "id": "powerbi/calendario/marcar-tabla-de-fechas/1",
        "title": "Marcar Calendario",
        "code": "",
        "steps": [
          "Selecciona Calendario > Herramientas de tabla > Marcar como tabla de fechas > Date."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Calendario queda identificado como tabla de fechas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calendario/calendario-fiscal",
    "remember": "Define si el año se etiqueta por inicio o cierre.",
    "examples": [
      {
        "id": "powerbi/calendario/calendario-fiscal/1",
        "title": "Año fiscal que comienza en julio",
        "language": "dax",
        "code": "AñoFiscalInicio = YEAR(Calendario[Date]) - IF(MONTH(Calendario[Date]) < 7, 1, 0)",
        "hint": "",
        "textOutput": "Febrero de 2026 pertenece al ejercicio iniciado en 2025.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
