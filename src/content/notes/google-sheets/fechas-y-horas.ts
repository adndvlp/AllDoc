// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/definicion",
    "remember": "DATE construye fechas sin depender del texto regional.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/definicion/1",
        "title": "Construir inicio de mes",
        "language": "excel-formula",
        "code": "=DATE(2026,9,1)",
        "hint": "",
        "textOutput": "1 de septiembre de 2026 con formato fecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/today-y-now",
    "remember": "Se recalculan y no son una marca de tiempo fija.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/today-y-now/1",
        "title": "Obtener fecha de corte",
        "language": "excel-formula",
        "code": "=TODAY()",
        "hint": "",
        "textOutput": "Fecha local del momento de recálculo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/date-y-datevalue",
    "remember": "Una fecha real es numérica.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/date-y-datevalue/1",
        "title": "Convertir fecha textual",
        "language": "excel-formula",
        "code": "=DATEVALUE(\"9/1/2026\")",
        "hint": "",
        "textOutput": "Fecha 2026-09-01 si se aplica formato fecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/year-month-day",
    "remember": "MONTH devuelve número de mes.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/year-month-day/1",
        "title": "Descomponer fecha del pedido",
        "language": "excel-formula",
        "code": "={YEAR(Ventas!B2),MONTH(Ventas!B2),DAY(Ventas!B2)}",
        "hint": "",
        "textOutput": "2026, 8, 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/time-hour-minute-second",
    "remember": "Una hora es fracción de día.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/time-hour-minute-second/1",
        "title": "Obtener hora y minuto",
        "language": "excel-formula",
        "code": "={HOUR(TIME(14,30,15)),MINUTE(TIME(14,30,15)),SECOND(TIME(14,30,15))}",
        "hint": "",
        "textOutput": "14, 30, 15.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/weekday-weeknum-isoweeknum",
    "remember": "WEEKDAY con modo 2 comienza en lunes.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/weekday-weeknum-isoweeknum/1",
        "title": "Identificar día de semana",
        "language": "excel-formula",
        "code": "=WEEKDAY(DATE(2026,9,1),2)",
        "hint": "",
        "textOutput": "2 (martes).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/days-y-datedif",
    "remember": "DATEDIF recibe inicio antes de fin.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/days-y-datedif/1",
        "title": "Medir antigüedad en días",
        "language": "excel-formula",
        "code": "=DAYS(DATE(2026,9,1),DATE(2026,8,1))",
        "hint": "",
        "textOutput": "31.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/edate-y-eomonth",
    "remember": "Usa fechas reales, no etiquetas.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/edate-y-eomonth/1",
        "title": "Encontrar cierre mensual",
        "language": "excel-formula",
        "code": "=EOMONTH(Ventas!B2,0)",
        "hint": "",
        "textOutput": "2026-08-31 con formato fecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/networkdays-y-workday",
    "remember": "NETWORKDAYS cuenta extremos hábiles; WORKDAY parte del día siguiente al inicio para desplazamiento positivo.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/networkdays-y-workday/1",
        "title": "Medir días hábiles de una semana",
        "language": "excel-formula",
        "code": "=NETWORKDAYS(DATE(2026,9,1),DATE(2026,9,4))",
        "hint": "",
        "textOutput": "4, sin festivos adicionales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/yearfrac",
    "remember": "La base 3 usa días reales/365.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/yearfrac/1",
        "title": "Medir fracción anual",
        "language": "excel-formula",
        "code": "=YEARFRAC(DATE(2026,1,1),DATE(2026,7,1),3)",
        "hint": "",
        "textOutput": "181/365, aproximadamente 0.49589.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/periodos-mensuales",
    "remember": "Conserva fecha real y aplica formato yyyy-mm.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/periodos-mensuales/1",
        "title": "Obtener clave de mes",
        "language": "excel-formula",
        "code": "=DATE(YEAR(Ventas!B2),MONTH(Ventas!B2),1)",
        "hint": "",
        "textOutput": "2026-08-01, visualizable como 2026-08.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/fechas-y-horas/rangos-de-fechas",
    "remember": "Evita comparar solo MONTH si hay varios años.",
    "examples": [
      {
        "id": "google-sheets/fechas-y-horas/rangos-de-fechas/1",
        "title": "Sumar septiembre completado",
        "language": "excel-formula",
        "code": "=SUMIFS(Ventas!J2:J9,Ventas!H2:H9,\"completed\",Ventas!B2:B9,\">=\"&DATE(2026,9,1),Ventas!B2:B9,\"<\"&DATE(2026,10,1))",
        "hint": "",
        "textOutput": "900.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
