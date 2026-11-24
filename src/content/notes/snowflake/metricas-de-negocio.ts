// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/metricas-de-negocio/definicion",
    "remember": "Aclara denominador, estados válidos y unidad de análisis antes de escribir SQL.",
    "examples": [
      {
        "id": "snowflake/metricas-de-negocio/definicion/1",
        "title": "Calcular ticket promedio",
        "language": "sql",
        "code": "SELECT ROUND(SUM(AMOUNT)/NULLIF(COUNT(*),0),2) AS AOV FROM ORDERS WHERE STATUS='completed';",
        "hint": "",
        "textOutput": "216.67 por pedido completado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/metricas-de-negocio/cohortes-y-retencion",
    "remember": "Define actividad y denominador, no confundas usuarios con eventos.",
    "examples": [
      {
        "id": "snowflake/metricas-de-negocio/cohortes-y-retencion/1",
        "title": "Medir clientes de febrero que vuelven en marzo",
        "language": "sql",
        "code": "WITH f AS (SELECT DISTINCT CUSTOMER_ID FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01'), m AS (SELECT DISTINCT CUSTOMER_ID FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-03-01' AND ORDER_DATE<'2026-04-01') SELECT COUNT(m.CUSTOMER_ID) AS RETAINED,COUNT(*) AS COHORT_SIZE,100.0*COUNT(m.CUSTOMER_ID)/NULLIF(COUNT(*),0) AS PCT FROM f LEFT JOIN m USING(CUSTOMER_ID);",
        "hint": "",
        "textOutput": "0 retenidos de 2, 0%. La cohorte se define por actividad en febrero, no por registro inicial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/metricas-de-negocio/funnels-y-conversion",
    "remember": "Para un funnel secuencial, comprueba timestamps y orden; contar eventos no equivale a contar usuarios.",
    "examples": [
      {
        "id": "snowflake/metricas-de-negocio/funnels-y-conversion/1",
        "title": "Medir conversión simple de clientes registrados",
        "language": "sql",
        "code": "SELECT COUNT(DISTINCT IFF(o.STATUS='completed',c.CUSTOMER_ID,NULL)) AS BUYERS,COUNT(DISTINCT c.CUSTOMER_ID) AS SIGNUPS,100.0*BUYERS/NULLIF(SIGNUPS,0) AS PCT FROM CUSTOMERS c LEFT JOIN ORDERS o USING(CUSTOMER_ID);",
        "hint": "",
        "textOutput": "4 compradores de 6 registrados, aproximadamente 66.67%. Es una conversión de dos estados, no un funnel temporal completo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/metricas-de-negocio/comparacion-entre-periodos",
    "remember": "Si faltan periodos, crea calendario antes de LAG si necesitas meses consecutivos.",
    "examples": [
      {
        "id": "snowflake/metricas-de-negocio/comparacion-entre-periodos/1",
        "title": "Comparar ventas mensuales",
        "language": "sql",
        "code": "WITH m AS (SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS M,SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1), p AS (SELECT *,LAG(SALES) OVER(ORDER BY M) AS PREV FROM m) SELECT M,SALES,PREV,ROUND(100*(SALES-PREV)/NULLIF(PREV,0),2) AS GROWTH FROM p ORDER BY M;",
        "hint": "",
        "textOutput": "Febrero:600,NULL,NULL; marzo:700,600,16.67%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
