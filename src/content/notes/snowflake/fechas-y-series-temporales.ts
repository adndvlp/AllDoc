// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/definicion",
    "remember": "Mantén DATE/TIMESTAMP en lugar de cadenas para comparar.",
    "examples": [
      {
        "id": "snowflake/fechas-y-series-temporales/definicion/1",
        "title": "Ventas mensuales",
        "language": "sql",
        "code": "SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS MONTH, SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1 ORDER BY 1;",
        "hint": "",
        "textOutput": "2026-02-01:600; 2026-03-01:700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/year-month-y-extract",
    "remember": "Agrupar solo por MONTH mezcla años.",
    "examples": [
      {
        "id": "snowflake/fechas-y-series-temporales/year-month-y-extract/1",
        "title": "Extraer periodo",
        "language": "sql",
        "code": "SELECT YEAR('2026-03-04'::DATE), MONTH('2026-03-04'::DATE), EXTRACT(DAY FROM '2026-03-04'::DATE);",
        "hint": "",
        "textOutput": "2026, 3, 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/dateadd-datediff-y-current-date",
    "remember": "DATEDIFF(unidad,inicio,fin) calcula fin menos inicio.",
    "examples": [
      {
        "id": "snowflake/fechas-y-series-temporales/dateadd-datediff-y-current-date/1",
        "title": "Medir días hasta compra",
        "language": "sql",
        "code": "SELECT DATEDIFF(DAY,c.SIGNUP_DATE,o.ORDER_DATE) AS DAYS FROM CUSTOMERS c JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID WHERE o.ORDER_ID=101;",
        "hint": "",
        "textOutput": "31 días.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/date-trunc-time-slice-y-to-char",
    "remember": "Para agrupar conserva la fecha; para presentar usa texto.",
    "examples": [
      {
        "id": "snowflake/fechas-y-series-temporales/date-trunc-time-slice-y-to-char/1",
        "title": "Crear intervalos de 15 minutos",
        "language": "sql",
        "code": "SELECT TIME_SLICE('2026-03-04 10:22:00'::TIMESTAMP_NTZ,15,'MINUTE'), TO_CHAR('2026-03-04'::DATE,'YYYY-MM');",
        "hint": "",
        "textOutput": "2026-03-04 10:15:00 y 2026-03.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/fechas-y-series-temporales/rangos-de-fechas",
    "remember": "Evita BETWEEN con el último día si hay horas.",
    "examples": [
      {
        "id": "snowflake/fechas-y-series-temporales/rangos-de-fechas/1",
        "title": "Obtener compras completadas de febrero",
        "language": "sql",
        "code": "SELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';",
        "hint": "",
        "textOutput": "600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
