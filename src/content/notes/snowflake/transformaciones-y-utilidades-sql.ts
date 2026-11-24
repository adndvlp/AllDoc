// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/definicion",
    "remember": "Distingue la forma del resultado del almacenamiento físico.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/definicion/1",
        "title": "Generar tres filas",
        "language": "sql",
        "code": "SELECT ROW_NUMBER() OVER(ORDER BY SEQ4()) AS N FROM TABLE(GENERATOR(ROWCOUNT=>3)) ORDER BY N;",
        "hint": "",
        "textOutput": "1,2,3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/pivot",
    "remember": "Define categorías conocidas o revisa la variación de columnas de un pivot dinámico.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/pivot/1",
        "title": "Ventas por estado en columnas",
        "language": "sql",
        "code": "SELECT * FROM (SELECT CUSTOMER_ID,STATUS,AMOUNT FROM ORDERS) PIVOT(SUM(AMOUNT) FOR STATUS IN ('completed' AS DONE,'cancelled' AS CANCELLED,'pending' AS PENDING)) ORDER BY CUSTOMER_ID;",
        "hint": "",
        "textOutput": "Cuatro filas: cliente 1 DONE=300 PENDING=50; 2 DONE=300 CANCELLED=100; 3 DONE=300; 4 DONE=400; celdas ausentes NULL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/unpivot",
    "remember": "Las columnas de valores deben tener tipos compatibles.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/unpivot/1",
        "title": "Pasar meses a filas",
        "language": "sql",
        "code": "SELECT MONTH_NAME,SALES FROM (SELECT 600 AS FEB,700 AS MAR) UNPIVOT(SALES FOR MONTH_NAME IN (FEB,MAR)) ORDER BY MONTH_NAME;",
        "hint": "",
        "textOutput": "FEB:600, MAR:700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/tablesample",
    "remember": "Una muestra aleatoria no es lo mismo que LIMIT; no garantiza representatividad.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/tablesample/1",
        "title": "Explorar una muestra pequeña",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS SAMPLE (3 ROWS);",
        "hint": "",
        "textOutput": "Tres filas de ORDERS, selección variable.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/result-scan-y-last-query-id",
    "remember": "Ejecuta las dos sentencias consecutivamente; el orden original no se garantiza.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/result-scan-y-last-query-id/1",
        "title": "Filtrar salida previa",
        "language": "sql",
        "code": "SELECT ORDER_ID,AMOUNT FROM ORDERS;\nSELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID())) WHERE AMOUNT>300;",
        "hint": "",
        "textOutput": "107,400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/match-recognize",
    "remember": "Es para secuencias, no expresiones regulares de texto.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/match-recognize/1",
        "title": "Encontrar finalización seguida de cancelación",
        "language": "sql",
        "code": "SELECT * FROM ORDERS MATCH_RECOGNIZE (PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE,ORDER_ID MEASURES FIRST(A.ORDER_ID) AS START_ID, LAST(B.ORDER_ID) AS END_ID ONE ROW PER MATCH PATTERN (A B) DEFINE A AS STATUS='completed', B AS STATUS='cancelled');",
        "hint": "",
        "textOutput": "Cliente 2, START_ID=103, END_ID=104.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/transformaciones-y-utilidades-sql/orden-logico-y-fisico",
    "remember": "No deduzcas el plan físico solo del orden textual.",
    "examples": [
      {
        "id": "snowflake/transformaciones-y-utilidades-sql/orden-logico-y-fisico/1",
        "title": "Consultar un plan",
        "language": "sql",
        "code": "EXPLAIN USING TEXT SELECT CUSTOMER_ID,SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed' GROUP BY 1;",
        "hint": "",
        "textOutput": "Plan compilado con operaciones de lectura, filtro y agregación; detalles pueden cambiar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
