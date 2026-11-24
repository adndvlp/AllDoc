// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/definicion",
    "remember": "Sin GROUP BY, el conjunto filtrado es un grupo global.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/definicion/1",
        "title": "Calcular ventas por cliente",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY CUSTOMER_ID ORDER BY CUSTOMER_ID;",
        "hint": "",
        "textOutput": "1:300, 2:300, 3:300, 4:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/count-y-count-distinct",
    "remember": "Los NULL no cuentan en COUNT(columna).",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/count-y-count-distinct/1",
        "title": "Comparar tres conteos",
        "language": "sql",
        "code": "SELECT COUNT(*), COUNT(COUPON), COUNT(DISTINCT CUSTOMER_ID) FROM ORDERS;",
        "hint": "",
        "textOutput": "8, 2, 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/sum-avg-min-y-max",
    "remember": "AVG divide entre los valores no nulos, no necesariamente COUNT(*).",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/sum-avg-min-y-max/1",
        "title": "Resumir compras completadas",
        "language": "sql",
        "code": "SELECT SUM(AMOUNT), ROUND(AVG(AMOUNT),2), MIN(AMOUNT), MAX(AMOUNT) FROM ORDERS WHERE STATUS='completed';",
        "hint": "",
        "textOutput": "1300, 216.67, 100, 400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/count-if-y-agregacion-condicional",
    "remember": "Usa COALESCE si necesitas cero en lugar de NULL cuando no hay coincidencias.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/count-if-y-agregacion-condicional/1",
        "title": "Medir tasa de finalización",
        "language": "sql",
        "code": "SELECT COUNT_IF(STATUS='completed') AS COMPLETED, 100.0*SUM(IFF(STATUS='completed',1,0))/NULLIF(COUNT(*),0) AS PCT FROM ORDERS;",
        "hint": "",
        "textOutput": "6 y 75%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/listagg",
    "remember": "No confundir con GROUP_CONCAT de MySQL.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/listagg/1",
        "title": "Enumerar países distintos",
        "language": "sql",
        "code": "SELECT LISTAGG(DISTINCT COUNTRY,', ') WITHIN GROUP (ORDER BY COUNTRY) FROM CUSTOMERS;",
        "hint": "",
        "textOutput": "Mexico, Spain, USA.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/having-y-group-by-all",
    "remember": "WHERE filtra antes de calcular grupos.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/having-y-group-by-all/1",
        "title": "Clientes con más de una compra completada",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID,COUNT(*) AS N FROM ORDERS WHERE STATUS='completed' GROUP BY ALL HAVING COUNT(*)>1 ORDER BY CUSTOMER_ID;",
        "hint": "",
        "textOutput": "1:2, 3:2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/rollup-cube-y-grouping-sets",
    "remember": "ROLLUP es jerárquico; CUBE incluye todas las combinaciones; GROUPING SETS elige combinaciones concretas.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/rollup-cube-y-grouping-sets/1",
        "title": "Ventas por cliente y total general",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID,SUM(AMOUNT),GROUPING(CUSTOMER_ID) AS IS_TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY ROLLUP(CUSTOMER_ID) ORDER BY IS_TOTAL,CUSTOMER_ID;",
        "hint": "",
        "textOutput": "1:300,2:300,3:300,4:400 y NULL:1300 con IS_TOTAL=1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/agregacion-y-group-by/median-percentiles-y-aproximaciones",
    "remember": "Un percentil no es un porcentaje de ventas; una estimación no es un conteo exacto.",
    "examples": [
      {
        "id": "snowflake/agregacion-y-group-by/median-percentiles-y-aproximaciones/1",
        "title": "Medir distribución de importes",
        "language": "sql",
        "code": "SELECT MEDIAN(AMOUNT), PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY AMOUNT), APPROX_COUNT_DISTINCT(CUSTOMER_ID) FROM ORDERS WHERE STATUS='completed';",
        "hint": "",
        "textOutput": "200, 200 y una estimación cercana a 4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
