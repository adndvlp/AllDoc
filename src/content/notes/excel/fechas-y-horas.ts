// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/definicion",
    "remember": "Una fecha real admite operaciones aritméticas.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/definicion/1",
        "title": "Crear fecha",
        "language": "excel",
        "code": "=DATE(2026,2,5)",
        "hint": "Una fecha real admite operaciones aritméticas.",
        "textOutput": "5 de febrero de 2026 con formato Fecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/today-y-now",
    "remember": "Son dinámicas y cambian al recalcular.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/today-y-now/1",
        "title": "Mostrar fecha actual",
        "language": "excel",
        "code": "=TODAY()",
        "hint": "Son dinámicas y cambian al recalcular.",
        "textOutput": "Fecha local del equipo en el momento del cálculo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/year-month-y-day",
    "remember": "MONTH devuelve un número del 1 al 12, no identifica el año.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/year-month-y-day/1",
        "title": "Descomponer fecha",
        "language": "excel",
        "code": "=YEAR(Sales!B2)\n=MONTH(Sales!B2)\n=DAY(Sales!B2)",
        "hint": "MONTH devuelve un número del 1 al 12, no identifica el año.",
        "textOutput": "2026, 1, 5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/date-y-datevalue",
    "remember": "DATE es menos ambiguo entre regiones.",
    "note": "Si DATEVALUE no reconoce el texto, usa el formato local o DATE con componentes separados.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/date-y-datevalue/1",
        "title": "Construir fecha",
        "language": "excel",
        "code": "=DATE(2026,2,1)",
        "hint": "DATE es menos ambiguo entre regiones.",
        "textOutput": "1 de febrero de 2026.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "excel/fechas-y-horas/date-y-datevalue/2",
        "title": "Convertir fecha de texto",
        "language": "excel",
        "code": "=DATEVALUE(\"2026-02-01\")",
        "hint": "DATE es menos ambiguo entre regiones.",
        "textOutput": "1 de febrero de 2026 con formato Fecha, si la configuración reconoce ISO.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/edate-y-eomonth",
    "remember": "EOMONTH con 0 obtiene el final del mismo mes.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/edate-y-eomonth/1",
        "title": "Obtener periodo siguiente",
        "language": "excel",
        "code": "=EDATE(DATE(2026,1,5),1)\n=EOMONTH(DATE(2026,2,5),0)",
        "hint": "EOMONTH con 0 obtiene el final del mismo mes.",
        "textOutput": "5 de febrero y 28 de febrero de 2026.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/days-y-datedif",
    "remember": "DATEDIF requiere inicio no posterior al final; evita su unidad MD por limitaciones conocidas.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/days-y-datedif/1",
        "title": "Medir antigüedad",
        "language": "excel",
        "code": "=DAYS(DATE(2026,2,5),DATE(2026,1,5))\n=DATEDIF(DATE(2025,1,5),DATE(2026,2,5),\"m\")",
        "hint": "DATEDIF requiere inicio no posterior al final; evita su unidad MD por limitaciones conocidas.",
        "textOutput": "31 días y 13 meses completos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/networkdays-y-workday",
    "remember": "NETWORKDAYS incluye extremos laborables; WORKDAY desplaza desde el inicio.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/networkdays-y-workday/1",
        "title": "Contar días hábiles",
        "language": "excel",
        "code": "=NETWORKDAYS(DATE(2026,1,5),DATE(2026,1,9))\n=WORKDAY(DATE(2026,1,5),5)",
        "hint": "NETWORKDAYS incluye extremos laborables; WORKDAY desplaza desde el inicio.",
        "textOutput": "5; 12 de enero de 2026.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/weekday-y-weeknum",
    "remember": "Indica el sistema de semana si el negocio lo requiere.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/weekday-y-weeknum/1",
        "title": "Identificar lunes",
        "language": "excel",
        "code": "=WEEKDAY(DATE(2026,1,5),2)\n=WEEKNUM(DATE(2026,1,5),2)",
        "hint": "Indica el sistema de semana si el negocio lo requiere.",
        "textOutput": "1 y 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/time-hour-y-minute",
    "remember": "Las horas son fracciones de un día.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/time-hour-y-minute/1",
        "title": "Calcular duración",
        "language": "excel",
        "code": "=(TIME(10,30,0)-TIME(9,0,0))*24",
        "hint": "Las horas son fracciones de un día.",
        "textOutput": "1.5 horas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/fechas-y-horas/rangos-de-fechas",
    "remember": ">= inicio y < siguiente inicio también admite timestamps.",
    "examples": [
      {
        "id": "excel/fechas-y-horas/rangos-de-fechas/1",
        "title": "Ventas de enero",
        "language": "excel",
        "code": "=SUMIFS(tSales[amount],tSales[status],\"completed\",tSales[order_date],\">=\"&DATE(2026,1,1),tSales[order_date],\"<\"&DATE(2026,2,1))",
        "hint": ">= inicio y < siguiente inicio también admite timestamps.",
        "textOutput": "500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
