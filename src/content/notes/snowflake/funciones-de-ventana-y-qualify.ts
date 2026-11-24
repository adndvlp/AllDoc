// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/definicion",
    "remember": "OVER define partición, orden y, cuando aplica, marco.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/definicion/1",
        "title": "Mostrar ventas totales junto a cada pedido",
        "language": "sql",
        "code": "SELECT ORDER_ID,AMOUNT,SUM(AMOUNT) OVER() AS TOTAL FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "Seis filas y TOTAL=1300 en cada una.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/partition-by-y-order-by",
    "remember": "El ORDER BY de OVER no garantiza el orden de salida.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/partition-by-y-order-by/1",
        "title": "Numerar pedidos por cliente",
        "language": "sql",
        "code": "SELECT ORDER_ID,CUSTOMER_ID,ROW_NUMBER() OVER(PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE,ORDER_ID) AS N FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY N;",
        "hint": "",
        "textOutput": "101:1,102:2,108:3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/row-number-rank-y-dense-rank",
    "remember": "Para ROW_NUMBER añade desempate; para preservar empates en RANK no lo añadas al orden de la ventana.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/row-number-rank-y-dense-rank/1",
        "title": "Comparar puestos de gasto",
        "language": "sql",
        "code": "WITH s AS (SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1) SELECT CUSTOMER_ID,RANK() OVER(ORDER BY TOTAL DESC) AS R,DENSE_RANK() OVER(ORDER BY TOTAL DESC) AS DR,ROW_NUMBER() OVER(ORDER BY TOTAL DESC,CUSTOMER_ID) AS RN FROM s ORDER BY RN;",
        "hint": "",
        "textOutput": "4:1,1,1; 1:2,2,2; 2:2,2,3; 3:2,2,4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/lag-lead-y-first-value",
    "remember": "Define el orden y el marco cuando sea relevante.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/lag-lead-y-first-value/1",
        "title": "Comparar pedidos de Ana",
        "language": "sql",
        "code": "SELECT ORDER_ID,LAG(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID) AS PREV,LEAD(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID) AS NEXT_AMOUNT FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY ORDER_DATE,ORDER_ID;",
        "hint": "",
        "textOutput": "101:NULL,200;102:100,50;108:200,NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/last-value-y-marcos-rows-range",
    "remember": "Declara el marco explícito, especialmente con empates y LAST_VALUE.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/last-value-y-marcos-rows-range/1",
        "title": "Acumulado por pedido",
        "language": "sql",
        "code": "SELECT ORDER_ID,SUM(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RUNNING FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_DATE,ORDER_ID;",
        "hint": "",
        "textOutput": "101:100,102:300,103:600,105:800,106:900,107:1300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/promedio-movil",
    "remember": "Dos filas precedentes no significan dos días si faltan fechas.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/promedio-movil/1",
        "title": "Promedio de hasta dos compras consecutivas",
        "language": "sql",
        "code": "SELECT ORDER_ID,AVG(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MOV FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY ORDER_DATE,ORDER_ID;",
        "hint": "",
        "textOutput": "101:100,102:150,108:125.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/ntile-percent-rank-y-cume-dist",
    "remember": "NTILE puede separar empates; CUME_DIST incluye todos los empates.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/ntile-percent-rank-y-cume-dist/1",
        "title": "Comparar posiciones relativas",
        "language": "sql",
        "code": "SELECT x,NTILE(2) OVER(ORDER BY x) AS B,PERCENT_RANK() OVER(ORDER BY x) AS PR,CUME_DIST() OVER(ORDER BY x) AS CD FROM (SELECT COLUMN1 AS x FROM VALUES(10),(20),(30),(40)) ORDER BY x;",
        "hint": "",
        "textOutput": "Cubetas 1,1,2,2; PR 0,1/3,2/3,1; CD .25,.5,.75,1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/qualify",
    "remember": "WHERE no puede filtrar directamente ROW_NUMBER de la misma consulta.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/qualify/1",
        "title": "Último pedido de cada cliente",
        "language": "sql",
        "code": "SELECT CUSTOMER_ID,ORDER_ID FROM ORDERS QUALIFY ROW_NUMBER() OVER(PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE DESC,ORDER_ID DESC)=1 ORDER BY 1;",
        "hint": "",
        "textOutput": "1:108,2:104,3:106,4:107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/funciones-de-ventana-y-qualify/ratio-to-report",
    "remember": "Multiplica por 100 para expresar porcentaje.",
    "examples": [
      {
        "id": "snowflake/funciones-de-ventana-y-qualify/ratio-to-report/1",
        "title": "Participación de cada pedido completado",
        "language": "sql",
        "code": "SELECT ORDER_ID,ROUND(100*RATIO_TO_REPORT(AMOUNT) OVER(),2) AS PCT FROM ORDERS WHERE STATUS='completed' AND CUSTOMER_ID=1 ORDER BY 1;",
        "hint": "",
        "textOutput": "101:33.33%,102:66.67%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
